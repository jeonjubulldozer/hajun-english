/* One provider, model and narrator per profile. Never substitute a voice on failure.
 * API contracts: ai.google.dev/gemini-api/docs/generate-content/speech-generation
 * docs.cloud.google.com/text-to-speech/docs/chirp3-hd (synchronous SSML)
 */
(function(root){
  'use strict';
  const VERSION='ko-story-v2';
  const MODEL='gemini-3.8-flash-tts';
  const VOICES=['Leda','Zephyr','Sulafat','Puck'];
  const STYLE='한국어 원어민 이야기 해설자가 일곱 살 아이에게 들려주는 따뜻한 동화입니다. 선택된 한 사람의 목소리와 음색을 처음부터 끝까지 유지하세요. 대화도 같은 해설자가 자연스럽게 읽고, 인물마다 다른 목소리를 흉내 내지 마세요. 문장 끝에서는 충분히 숨을 쉬고, 쉼표에서는 뜻 단위로 가볍게 쉬세요. 조사와 앞말, 주어와 서술어를 어색하게 끊지 마세요. 물음표는 자연스럽게 묻고, 느낌표도 소리 지르지 마세요. 낮고 편안한 에너지로 또박또박 읽되, 단어마다 끊거나 기계처럼 일정하게 읽지 마세요. 정해진 시간에 맞추려고 서두르지 마세요.';
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
  const api={VERSION,MODEL,STYLE,VOICES,profile,profileKey,cacheKey,ssml,transcript,requestSpec,decode,pcmToWav,synth,createClient};
  if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.DojoSpeech=api;
})(typeof globalThis!=='undefined'?globalThis:this);
