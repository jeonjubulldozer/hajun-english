const {test}=require('node:test');
const assert=require('node:assert/strict');
const voice=require('../voice.js');
const p=voice.profile('gemini','Leda');
const wav=voice.pcmToWav(new Uint8Array(4800),24000);
const audio={candidates:[{content:{parts:[{inlineData:{mimeType:'audio/wav',data:Buffer.from(wav).toString('base64')}}]}}]};
const ok=()=>({ok:true,json:async()=>audio});
const memory=()=>{const m=new Map();return{get:async k=>m.get(k),put:async(k,v)=>m.set(k,v),m}};

test('429 retries the identical provider/model/voice; it never falls back',async()=>{
  const calls=[];
  await assert.rejects(voice.synth(p,'같이 해 보자.','test-key',{sleep:async()=>{},fetch:async(url,options)=>{calls.push({url,body:JSON.parse(options.body)});return{ok:false,status:429,json:async()=>({})}}}),e=>e.code==='rate_limited');
  assert.equal(calls.length,2);assert.deepEqual(calls[0],calls[1]);
  assert.match(calls[0].url,/gemini-3\.8-flash-tts:generateContent$/);
  assert.equal(calls[0].body.generationConfig.speechConfig.voiceConfig.voice,'Leda');
});
test('request timeout fails explicitly; no replacement speech',async()=>{
  await assert.rejects(voice.synth(p,'다시 해 보자.','test',{timeoutMs:10,fetch:async(url,{signal})=>new Promise((resolve,reject)=>signal.addEventListener('abort',()=>reject(new Error('abort'))))}),e=>e.code==='timeout');
});
test('cache identity separates provider, model, voice, style and old mixed clips',()=>{
  const text='고맙습니다!';const keys=[p,voice.profile('cloud','Leda'),voice.profile('gemini','Puck'),{...p,model:'another-model'},{...p,style:'another-style'}].map(x=>voice.cacheKey(x,text));
  assert.equal(new Set(keys).size,keys.length);assert.ok(keys.every(k=>k!=='Leda|'+text));
});
test('Korean spacing is not converted into fixed pauses or vocal tags',()=>{
  const text='맴맴이가 말했어요.\n\n“아빠, 같이 해요!”\n아빠가 웃었어요.';
  const expected='맴맴이가 말했어요.\n\n“아빠, 같이 해요!” 아빠가 웃었어요.';
  for(const name of voice.VOICES){
    const a=voice.requestSpec(voice.profile('gemini',name),text);
    const b=voice.requestSpec(voice.profile('cloud',name),text);
    assert.equal(a.body.contents[0].parts.length,1);
    assert.equal(a.body.contents[0].parts[0].text,expected);
    assert.equal(a.body.generationConfig.speechConfig.voiceConfig.voice,name);
    assert.equal(b.body.input.text,expected);
    assert.equal(b.body.input.ssml,undefined);
    assert.equal(b.body.voice.name,'ko-KR-Chirp3-HD-'+name);
    assert.equal(b.body.voice.languageCode,'ko-KR');
    assert.equal(b.body.audioConfig.speakingRate,1);
  }
  assert.equal(voice.transcript('  몸을 낮춰\r\n두 다리를 잡아요.  '),'몸을 낮춰 두 다리를 잡아요.');
  assert.equal(voice.transcript('하나…\n둘…\n셋…\n넷.'),'하나… 둘… 셋… 넷.');
  assert.doesNotMatch(voice.STYLE,/여성|남성|중간 음역|예시/);
});
test('prosody update invalidates old audio without resetting a chosen narrator',()=>{
  const saved={source:'cloud',gv:'Zephyr',narratorRevision:'ko-warm-story-v3'};
  assert.deepEqual(voice.migratePrefs(saved),saved);
  assert.notEqual(voice.cacheKey({...p,version:'ko-warm-story-v3'},'안녕.'),voice.cacheKey(p,'안녕.'));
});
test('compressed MP3 is never wrapped as raw PCM; unknown formats fail',()=>{
  const mp3=Buffer.from([255,251,144,0,1,2,3,4]);
  const response={candidates:[{content:{parts:[{inlineData:{mimeType:'audio/mpeg',data:mp3.toString('base64')}}]}}]};
  const clip=voice.decode(response,p);assert.equal(clip.mime,'audio/mpeg');assert.deepEqual(Buffer.from(clip.buffer),mp3);
  response.candidates[0].content.parts[0].inlineData.mimeType='audio/unknown';
  assert.throws(()=>voice.decode(response,p),e=>e.code==='audio_format');
});
test('PCM sample rate and WAV headers are preserved',()=>{
  const data=Buffer.alloc(3200).toString('base64');
  const clip=voice.decode({candidates:[{content:{parts:[{inlineData:{mimeType:'audio/L16;rate=16000',data}}]}}]},p);
  assert.equal(new DataView(clip.buffer).getUint32(24,true),16000);
  assert.equal(new DataView(clip.buffer).getUint32(40,true),3200);
  assert.throws(()=>voice.pcmToWav(new Uint8Array(3),24000),e=>e.code==='audio_format');
});
test('concurrent foreground/prefetch deduplicate and serialize synthesis',async()=>{
  let active=0,max=0,count=0;
  const client=voice.createClient(memory(),{fetch:async()=>{count++;active++;max=Math.max(active,max);await new Promise(r=>setTimeout(r,5));active--;return ok()}});
  await Promise.all([client.ensure(p,'하나','test'),client.ensure(p,'하나','test'),client.ensure(p,'둘','test')]);
  assert.equal(count,2);assert.equal(max,1);assert.equal(client.ready(p,'하나'),true);
});
test('old mixed cache is ignored; a valid profile cache plays without a key',async()=>{
  const cache=memory();cache.m.set('Leda|하나',wav);let requests=0;
  const client=voice.createClient(cache,{fetch:async()=>{requests++;return ok()}});
  await client.ensure(p,'하나','test');assert.equal(requests,1);
  const offline=voice.createClient(cache,{fetch:async()=>{throw Error('must not fetch')}});
  assert.equal((await offline.ensure(p,'하나','')).mime,'audio/wav');
});
test('a profile change during a pending request cannot relabel its cached audio',async()=>{
  const cache=memory(),calls=[];
  const client=voice.createClient(cache,{fetch:async(url,opts)=>{calls.push(JSON.parse(opts.body).generationConfig.speechConfig.voiceConfig.voice);await new Promise(r=>setTimeout(r,5));return ok()}});
  const other=voice.profile('gemini','Puck');
  const [first,second]=await Promise.all([client.ensure(p,'같이 하자.','test'),client.ensure(other,'같이 하자.','test')]);
  assert.deepEqual(calls,['Leda','Puck']);assert.equal(first.profile,voice.profileKey(p));assert.equal(second.profile,voice.profileKey(other));
  assert.equal(cache.m.size,2);
});


test('warm narrator migration replaces old defaults once, preserving credentials and later choices',()=>{
  const old={gv:'Leda',gkey:'private-test-value',on:false};
  const updated=voice.migratePrefs(old);
  assert.equal(updated.gv,'Sulafat');assert.equal(updated.gkey,old.gkey);assert.equal(updated.on,false);
  assert.equal(old.gv,'Leda');
  assert.equal(voice.migratePrefs({...updated,gv:'Puck'}).gv,'Puck');
  assert.equal(voice.migratePrefs().gv,'Sulafat');
  const p=voice.profile('gemini',updated.gv);
  assert.notEqual(voice.cacheKey(p,'같이 해 보자.'),voice.cacheKey({...p,version:'ko-story-v2'},'같이 해 보자.'));
});
