"""Browser regression checks. Synthetic WAV fixtures test playback, NOT Korean voice quality.

Run: python dojo/tests/browser.py (requires Playwright and Chromium).
"""
import base64
import functools
import http.server
import io
import json
import math
import os
from pathlib import Path
import struct
import threading
import wave
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[2]
SOURCE = (ROOT / 'dojo/index.html').read_text()
HOOK = '''window.__test={
 state:()=>({cur,ep:EPI,time:gT,playing:PLAY,narr:NARR.state,profile:NARR.profile,src:AU.src}),
 endWhileSpeaking:()=>{gT=SC[cur].start+SC[cur].dur-.01;hold=100;},
 poses:()=>{const errors=[];let samples=0;
  for(const [ep,id] of [[5,'tap5'],[5,'standing5'],[4,'mmdad'],[4,'kidrhino']]){
   const b=EPS[ep].beats.find(b=>b.id===id);
   for(let t=0;t<b.dur;t+=.1){
    const actors=new Map(b.actors.map(([id,F])=>{const sp=SP[id],P={...samp(F,t)};place(sp,P);return[id,{sp,P}]}));
    if(b.rig)b.rig(actors,t);
    for(const [actor,a] of actors){samples++;if(a.P.x<80||a.P.x>880)errors.push(id+': x '+actor);
     const k=a.sp.s*(a.P.sc||1);
     for(const [limb,root,mid,end,l1,l2] of [['fa','sh','el','hd','ua','fa'],['ba','sh','el','hd','ua','fa'],['fl','hip','kn','ft','th','sn'],['bl','hip','kn','ft','th','sn']]){
      const pts=[root,mid,end].map(j=>jointWorld(a,limb+'.'+j));
      if(pts.flat().some(n=>!Number.isFinite(n)))errors.push(id+': nonfinite');
      for(let j=0;j<2;j++)if(Math.hypot(pts[j+1][0]-pts[j][0],pts[j+1][1]-pts[j][1])>a.sp.L[j?l2:l1]*k+.02)errors.push(id+': stretched '+limb);
      if((limb==='fl'||limb==='bl')&&pts.slice(1).some(p=>p[1]>G+1))errors.push(id+': leg below mat '+actor+' '+t.toFixed(1));
     }
    }
   }
  }return{samples,errors};
 }};'''

class QuietHandler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass

def wav_fixture():
    buf = io.BytesIO()
    with wave.open(buf, 'wb') as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(24000)
        w.writeframes(b''.join(struct.pack('<h', int(600 * math.sin(i * math.tau * 220 / 24000))) for i in range(48000)))
    return base64.b64encode(buf.getvalue()).decode()

def main():
    server = http.server.ThreadingHTTPServer(('127.0.0.1', 0), functools.partial(QuietHandler, directory=str(ROOT)))
    threading.Thread(target=server.serve_forever, daemon=True).start()
    url = f'http://127.0.0.1:{server.server_port}/dojo/'
    with sync_playwright() as p:
        browser = p.chromium.launch(executable_path=os.environ.get('CHROMIUM_PATH', '/usr/bin/chromium'), args=['--no-sandbox', '--disable-dev-shm-usage'])
        errors = []
        def page_for(prefs, instrument=False):
            context = browser.new_context(viewport={'width':1200, 'height':900})
            page = context.new_page()
            page.on('pageerror', lambda e: errors.append(str(e)))
            page.add_init_script('localStorage.setItem("insect-dojo.prefs",'+json.dumps(json.dumps(prefs))+');')
            if instrument:
                page.route('**/dojo/', lambda r:r.fulfill(body=SOURCE.replace('gT=.9;requestAnimationFrame(loop);prefetch();', HOOK+'gT=.9;requestAnimationFrame(loop);prefetch();'), content_type='text/html'))
            return context, page

        context, page = page_for({'on':False}, True)
        page.goto(url, wait_until='networkidle')
        chapters = 0
        for i in range(page.locator('#eps button').count()):
            page.locator('#eps button').nth(i).click()
            for j in range(page.locator('#chap button').count()):
                page.locator('#chap button').nth(j).click()
                page.wait_for_timeout(35)
                assert page.locator('#line').inner_text()
                assert 'on' in page.locator('#chap button').nth(j).get_attribute('class')
                chapters += 1
        page.locator('#pp').click()
        audit = page.evaluate('__test.poses()')
        assert not audit['errors'], audit['errors'][:20]
        for width in [390, 768]:
            page.set_viewport_size({'width':width,'height':900})
            for ep in [4, 5]:
                page.locator('#eps button').nth(ep).click()
                for j in range(page.locator('#chap button').count()):
                    page.locator('#chap button').nth(j).click()
                    page.wait_for_timeout(25)
                assert page.evaluate('document.documentElement.scrollWidth<=innerWidth')
        print(f'PASS: {chapters} chapter buttons, 4/5 on mobile/tablet; {audit["samples"]} motion samples')
        context.close()

        # A real HTMLAudioElement decodes a synthetic WAV; no live API credentials are used.
        context, page = page_for({'on':True,'gv':'Leda','source':'gemini','gkey':'test-only-not-a-real-key'}, True)
        requests = []
        def success(route):
            requests.append((route.request.url, route.request.post_data_json))
            route.fulfill(json={'candidates':[{'content':{'parts':[{'inlineData':{'mimeType':'audio/wav','data':wav_fixture()}}]}}]})
        page.route('https://generativelanguage.googleapis.com/**', success)
        page.goto(url, wait_until='networkidle')
        page.locator('#chap button').nth(7).click()
        page.wait_for_function('__test.state().narr==="play"')
        before = page.evaluate('__test.state()')
        page.evaluate('__test.endWhileSpeaking()')
        page.wait_for_timeout(180)
        after = page.evaluate('__test.state()')
        assert after['cur']==before['cur'] and after['narr']=='play', after
        page.locator('#pp').click()
        paused = page.evaluate('__test.state().time')
        page.wait_for_timeout(150)
        assert page.evaluate('__test.state().time')==paused
        page.locator('#pp').click()
        page.wait_for_function('__test.state().cur!==7')
        assert all('/gemini-3.8-flash-tts:' in u for u,b in requests)
        assert all(b['generationConfig']['speechConfig']['voiceConfig']['voice']=='Sulafat' for u,b in requests)
        print('PASS: playback pauses/resumes and waits for complete audio, even after 100s extra hold')
        assert page.locator('#gv').input_value()=='Sulafat'
        page.locator('#voicePreview').click()
        page.wait_for_function('__test.state().narr==="play"')
        paused = page.evaluate('__test.state().time')
        assert not page.evaluate('__test.state().playing')
        page.wait_for_function('__test.state().narr==="done"')
        assert page.evaluate('__test.state().time')==paused
        assert any('처음이라 떨렸지?' in b['contents'][0]['parts'][0]['text'] for u,b in requests)
        page.locator('#pp').click()
        page.wait_for_function('__test.state().narr==="play" && __test.state().playing')
        page.locator('#gv').select_option('Zephyr')
        saved = page.evaluate('JSON.parse(localStorage.getItem("insect-dojo.prefs"))')
        assert saved['gv']=='Zephyr' and saved['narratorRevision']=='ko-warm-story-v3'
        # A real reload must keep a choice made after migration.
        page.add_init_script('localStorage.setItem("insect-dojo.prefs",'+json.dumps(json.dumps(saved))+');')
        page.reload(wait_until='networkidle')
        assert page.locator('#gv').input_value()=='Zephyr'
        print('PASS: old narrator migrates to Sulafat; preview holds the story; later voice choices survive reload')

        context.close()

        context, page = page_for({'on':True,'gv':'Leda','source':'gemini','gkey':'test-only-not-a-real-key'}, True)
        failures = []
        def quota(route):
            failures.append(route.request.url)
            route.fulfill(status=429,json={'error':{'message':'test quota'}})
        page.route('https://generativelanguage.googleapis.com/**', quota)
        page.route('https://texttospeech.googleapis.com/**', lambda r: (_ for _ in ()).throw(AssertionError('Unexpected fallback')))
        page.goto(url, wait_until='domcontentloaded')
        page.locator('#big').click()
        page.wait_for_function('__test.state().narr==="error"')
        assert not page.evaluate('__test.state().playing')
        assert page.locator('#voiceRetry').is_visible()
        assert '같은 목소리' in page.locator('#vstat').inner_text()
        assert len(failures)==2 and len(set(failures))==1, failures
        print('PASS: quota failure stops playback and exposes same-voice retry; no fallback')
        context.close()
        assert not errors, errors
        browser.close()
    server.shutdown()

if __name__=='__main__':
    main()
