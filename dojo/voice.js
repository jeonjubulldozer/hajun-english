/* One provider, model and narrator per profile. Never substitute a voice on failure.
 * API contracts: ai.google.dev/gemini-api/docs/generate-content/speech-generation
 * docs.cloud.google.com/text-to-speech/docs/chirp3-hd (synchronous SSML)
 */
(function(root){
  'use strict';
  const VERSION='ko-warm-story-v3';
  const DEFAULT_VOICE='Sulafat';
  const PREVIEW='맴맴이가 조심조심 팔을 톡톡 두드렸어요.\n콩콩이 형이 바로 놓아 주었지요.\n\n“괜찮아, 맴맴아. 처음이라 떨렸지? 우리 같이 조금씩 배워 보자.”';
  const MODEL='gemini-3.8-flash-tts';
  const VOICES=['Leda','Zephyr','Sulafat','Puck'];
  const STYLE='당신은 일곱 살 아이 곁에 앉아 그림책을 함께 보는 다정한 한국인 어른입니다. 편안한 여성 목소리로, 아이와 눈을 맞추고 살짝 미소 지으며 이야기를 건네세요. 설명을 발표하기보다 사랑하는 아이에게 오늘 있었던 일을 들려주듯 자연스럽게 읽으세요. 중간 음역에서 부드럽고 따뜻하게, 일상 대화의 속도로 말하세요. 문장마다 똑같이 올리고 내리지 말고, 뜻을 따라 자연스럽게 이어 주세요. 문장 안에서는 말의 흐름을 살리고, 끝에서는 아이가 이해할 만큼 한 박자 쉬세요. 격려하는 대사는 아이의 마음을 알아주는 진심을 담아 조금 더 포근하게 말하세요. 인물의 대사도 같은 해설자의 음색으로 읽으세요. 과장된 애교, 만화 성우 연기, 속삭임, 방송 안내 같은 또박또박한 낭독은 피하세요. “괜찮아, 맴맴아.”는 옆에 있는 아이를 안심시키듯, “우리 같이 해 보자.”는 함께하고 싶은 마음으로 읽으세요. 예시 문장은 추가로 읽지 말고 주어진 대본만 읽으세요.';
  // Apply the requested narrator change once on existing devices; later choices persist.
  function migratePrefs(saved={}){
    const next={...saved};
    if(next.narratorRevision!==VERSION){next.gv=DEFAULT_VOICE;next.narratorRevision=VERSION}
    if(!VOICES.includes(next.gv))next.gv=DEFAULT_VOICE;
    return next;
  }
  function profile(source,voice){
    if(!['gemini','cloud'].includes(source)||!VOICES.includes(voice))throw new Error('Unknown voice profile');
    return Object.freeze({version:VERSION,source,model:source==='gemini'?MODEL:'chirp3-hd',voice,style:STYLE,rate:source==='cloud'?.94:1});
  }
  const profileKey=p=>JSON.stringify(p);
  const cacheKey=(p,text)=>JSON.stringify([profileKey(p),text]);
  const escapeXML=s=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]));
  // Authors put a newline at a breath, and a blank line before a change of speaker.
  // Keep each complete scene in one request so words retain their Korean prosody.
  function ssml(text){return '<speak>'+text.trim().split(/(\n+)/).map(s=>/^\n+$/.test(s)?`<break time="${s.length>1?650:400}ms"/>`:escapeXML(s)).join('')+'</speak>'}
  function transcript(text){return text.trim().replace(/\n+/g,' <short pause> ')}
  function requestSpec(p,text){
    if(p.source==='cloud')return{url:'https://texttospeech.googleapis.com/v1/text:synthesize',body:{input:{ssml:ssml(text)},voice:{languageCode:'ko-KR',name:'ko-KR-Chirp3-HD-'+p.voice},audioConfig:{audioEncoding:'MP3',speakingRate:p.rate}}};
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
      try{response=await fetcher(spec.url,{method:'POST',headers:{'content-type':'application/json','x-goog-api-key':key},body:JSON.stringify(spec.body),signal:controller.signal});json=await response.json()}
      catch(e){throw{code:controller.signal.aborted?'timeout':'network',source:p.source}}
      finally{clearTimeout(timer)}
      if(response.ok)return decode(json,p);
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
  const api={VERSION,MODEL,STYLE,VOICES,DEFAULT_VOICE,PREVIEW,migratePrefs,profile,profileKey,cacheKey,ssml,transcript,requestSpec,decode,pcmToWav,synth,createClient};
  if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.DojoSpeech=api;
})(typeof globalThis!=='undefined'?globalThis:this);
