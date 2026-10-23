/* One provider, model and narrator per profile. Never substitute a voice on failure.
 * API contracts: ai.google.dev/gemini-api/docs/generate-content/speech-generation
 * docs.cloud.google.com/text-to-speech/docs/chirp3-hd (whole-scene plain text)
 */
(function(root){
  'use strict';
  const VERSION='ko-natural-story-v4';
  const NARRATOR_REVISION='ko-warm-story-v3';
  const DEFAULT_VOICE='Sulafat';
  const PREVIEW='맴맴이가 조심조심 팔을 톡톡 두드렸어요.\n콩콩이 형이 바로 놓아 주었지요.\n\n“괜찮아, 맴맴아. 처음이라 떨렸지? 우리 같이 조금씩 배워 보자.”';
  const MODEL='gemini-3.8-flash-tts';
  const VOICES=['Leda','Zephyr','Sulafat','Puck'];
  const STYLE='따뜻하고 편안한 한국어 대화체. 아이에게 이야기를 들려주듯 자연스러운 속도로 말한다. 선택한 목소리의 음색을 유지하고 등장인물을 흉내 내지 않는다. 단어와 조사를 이어 읽고, 짧은 구절은 한 호흡으로 읽는다. 쉼표에서는 가볍게 쉬고 문장이 끝나면 자연스럽게 쉰다. 감탄문도 소리치거나 과장하지 않는다.';
  // Apply the requested narrator change once on existing devices; later choices persist.
  function migratePrefs(saved={}){
    const next={...saved};
    if(next.narratorRevision!==NARRATOR_REVISION){next.gv=DEFAULT_VOICE;next.narratorRevision=NARRATOR_REVISION}
    if(!VOICES.includes(next.gv))next.gv=DEFAULT_VOICE;
    return next;
  }
  const EL_MODEL='eleven_v4';
  function profile(source,voice,model){
    if(source==='eleven'){if(!voice)throw new Error('Unknown voice profile');return Object.freeze({version:VERSION,source,model:model||EL_MODEL,voice,rate:1})}
    if(!['gemini','cloud'].includes(source)||!VOICES.includes(voice))throw new Error('Unknown voice profile');
    return Object.freeze({version:VERSION,source,model:source==='gemini'?MODEL:'chirp3-hd',voice,style:STYLE,rate:1});
  }
  const profileKey=p=>JSON.stringify(p);
  const cacheKey=(p,text)=>JSON.stringify([profileKey(p),text]);
  // Newlines format the script, not a timer. Preserve paragraph boundaries and
  // Korean word spacing; punctuation, not an injected pause after every line,
  // lets the provider produce each whole scene with its own prosody.
  function transcript(text){return text.trim().replace(/\r\n?/g,'\n').replace(/[ \t]*\n[ \t]*/g,'\n').replace(/\n{3,}/g,'\n\n').replace(/([^\n])\n(?!\n)/g,'$1 ')}
  function requestSpec(p,text){
    if(p.source==='eleven')return{url:`https://api.elevenlabs.io/v1/text-to-speech/${encodeURIComponent(p.voice)}?output_format=mp3_44100_128`,body:{text:transcript(text),model_id:p.model,language_code:'ko',voice_settings:p.model==='eleven_multilingual_v2'?{stability:0.5,similarity_boost:0.75,style:0.15,use_speaker_boost:true,speed:0.95}:{stability:0.5,similarity_boost:0.75}}};
    if(p.source==='cloud')return{url:'https://texttospeech.googleapis.com/v1/text:synthesize',body:{input:{text:transcript(text)},voice:{languageCode:'ko-KR',name:'ko-KR-Chirp3-HD-'+p.voice},audioConfig:{audioEncoding:'MP3',speakingRate:p.rate}}};
    return{url:`https://generativelanguage.googleapis.com/v1beta/models/${p.model}:generateContent`,body:{contents:[{role:'user',parts:[{text:transcript(text),speech_metadata:{style:p.style}}]}],generationConfig:{responseModalities:['AUDIO'],speechConfig:{voiceConfig:{voice:p.voice}}}}};
  }
  function bytes(b64){const s=atob(b64),u=new Uint8Array(s.length);for(let i=0;i<s.length;i++)u[i]=s.charCodeAt(i);return u}
  function pcmToWav(u,rate){
    if(!u.length||u.length%2||!Number.isInteger(rate)||rate<8000||rate>96000)throw{code:'audio_format'};
    const out=new Uint8Array(44+u.length),d=new DataView(out.buffer),str=(o,s)=>{for(let i=0;i<s.length;i++)d.setUint8(o+i,s.charCodeAt(i))};
    str(0,'RIFF');d.setUint32(4,36+u.length,true);str(8,'WAVE');str(12,'fmt ');d.setUint32(16,16,true);d.setUint16(20,1,true);d.setUint16(22,1,true);d.setUint32(24,rate,true);d.setUint32(28,rate*2,true);d.setUint16(32,2,true);d.setUint16(34,16,true);str(36,'data');d.setUint32(40,u.length,true);out.set(u,44);return out.buffer;
  }
  function decode(json,p){
    let data,mime;
    if(p.source==='cloud'){data=json.audioContent;mime='audio/mpeg'}
    else{const parts=json.candidates?.[0]?.content?.parts||[],a=parts.filter(x=>x.inlineData);if(a.length!==1)throw{code:'empty_audio'};({data,mimeType:mime}=a[0].inlineData)}
    if(!data||!mime)throw{code:'empty_audio'};
    let u;try{u=bytes(data)}catch(e){throw{code:'audio_format'}}
    if(/^audio\/(wav|x-wav|wave)(;|$)/i.test(mime)){
      if(u.length<44||String.fromCharCode(...u.slice(0,4))!=='RIFF'||String.fromCharCode(...u.slice(8,12))!=='WAVE')throw{code:'audio_format'};
      return{buffer:u.buffer,mime:'audio/wav'};
    }
    if(/^audio\/(mpeg|mp3)(;|$)/i.test(mime)){
      if(u.length<4||!(String.fromCharCode(...u.slice(0,3))==='ID3'||(u[0]===255&&(u[1]&224)===224)))throw{code:'audio_format'};
      return{buffer:u.buffer,mime:'audio/mpeg'};
    }
    if(/^audio\/(l16|pcm)(;|$)/i.test(mime))return{buffer:pcmToWav(u,Number((mime.match(/rate=(\d+)/i)||[])[1])||24000),mime:'audio/wav'};
    throw{code:'audio_format'};
  }
  async function synth(p,text,key,options={}){
    if(!key)throw{code:'no_key',source:p.source};
    const fetcher=options.fetch||fetch,wait=options.sleep||(ms=>new Promise(r=>setTimeout(r,ms))),spec=requestSpec(p,text);
    for(let attempt=0;attempt<2;attempt++){
      const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),options.timeoutMs||30000);
      let response,json;
      const el=p.source==='eleven',headers=el?{'content-type':'application/json',accept:'audio/mpeg','xi-api-key':key}:{'content-type':'application/json','x-goog-api-key':key};
      let audio=null,errText='';
      try{response=await fetcher(spec.url,{method:'POST',headers,body:JSON.stringify(spec.body),signal:controller.signal});
        if(el){if(response.ok)audio=await response.arrayBuffer();else errText=await response.text().catch(()=>'')}else json=await response.json()}
      catch(e){throw{code:controller.signal.aborted?'timeout':'network',source:p.source}}
      finally{clearTimeout(timer)}
      if(response.ok){
        if(!el)return decode(json,p);
        if(!audio||audio.byteLength<200)throw{code:'empty_audio',source:p.source};
        return{buffer:audio,mime:'audio/mpeg'};
      }
      if(el&&(/quota|credit/i.test(errText)||response.status===402))throw{code:'el_quota',status:response.status,source:p.source};
      // No key or provider message is persisted or printed. Keep the status for diagnostics.
      const code=response.status===429?'rate_limited':response.status===401||response.status===403?'bad_key':'tts_failed';
      if(attempt===0&&(response.status===429||response.status>=500)){await wait(2500);continue}
      throw{code,status:response.status,source:p.source};
    }
  }
  function createClient(cache,options={}){
    const entries=new Map();let queue=Promise.resolve();
    function ensure(p,text,key){
      const k=cacheKey(p,text),old=entries.get(k);if(old&&old.state!=='fail')return old.promise;
      const e={state:'busy'};entries.set(k,e);
      e.promise=(async()=>{
        const saved=await cache.get(k);
        if(saved?.profile===profileKey(p)&&saved.buffer instanceof ArrayBuffer&&['audio/wav','audio/mpeg'].includes(saved.mime)){e.state='ready';return saved}
        // Serialize requests to avoid foreground + prefetch causing a quota burst.
        const work=queue.then(()=>synth(p,text,key,options));queue=work.catch(()=>{});
        const clip={...await work,profile:profileKey(p)};await cache.put(k,clip);e.state='ready';return clip;
      })().catch(err=>{e.state='fail';throw err});
      return e.promise;
    }
    return{ensure,ready:(p,text)=>entries.get(cacheKey(p,text))?.state==='ready'};
  }
  const api={EL_MODEL,VERSION,MODEL,STYLE,VOICES,DEFAULT_VOICE,PREVIEW,migratePrefs,profile,profileKey,cacheKey,transcript,requestSpec,decode,pcmToWav,synth,createClient};
  if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.DojoSpeech=api;
})(typeof globalThis!=='undefined'?globalThis:this);
