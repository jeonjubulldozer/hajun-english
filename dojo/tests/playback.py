"""Continuous ep13 narration and storage/media interruption regressions.
Synthetic tones only; no real Korean speech or API credentials.
"""
import functools
import http.server
import json
import threading
from pathlib import Path
from playwright.sync_api import sync_playwright
from browser import ROOT, QuietHandler, wav_fixture, HOOK

SOURCE=(ROOT/'dojo/index.html').read_text()
EXTRA='''window.__recovery={
 end:()=>{gT=SC[cur].start+SC[cur].dur-.01},
 missedEnd:()=>{AU.onended=null},
 stall:()=>{AU.pause();NARR.audioTime=AU.currentTime;NARR.resumeTried=true;NARR.progressAt=performance.now()-16000},
 paused:()=>{AU.pause();NARR.audioTime=AU.currentTime;NARR.progressAt=performance.now()-2500},
 audio:()=>({paused:AU.paused,time:AU.currentTime})
};'''
# A hanging storage read at scene 14 (3:02), then storage writes that never finish.
FAULT='''const realGet=IDB.get;IDB.get=k=>k.includes('밤날개가 매트에 앉아')?new Promise(()=>{}):realGet(k);
IDB.put=()=>new Promise(()=>{});
'''
def main():
    server=http.server.ThreadingHTTPServer(('127.0.0.1',0),functools.partial(QuietHandler,directory=str(ROOT)))
    threading.Thread(target=server.serve_forever,daemon=True).start()
    with sync_playwright() as p:
        b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-dev-shm-usage'])
        page=b.new_page();errors=[];calls=[]
        page.on('pageerror',lambda e:errors.append(str(e)))
        page.add_init_script('localStorage.setItem("insect-dojo.ep","13");localStorage.setItem("insect-dojo.prefs",JSON.stringify({on:true,source:"gemini",gkey:"synthetic-test"}));')
        source=SOURCE.replace('const voiceClient=',FAULT+'const voiceClient=',1).replace('gT=.9;requestAnimationFrame(loop);prefetch();',HOOK+EXTRA+'gT=.9;requestAnimationFrame(loop);prefetch();')
        page.route('**/dojo/',lambda r:r.fulfill(body=source,content_type='text/html'))
        fixture=wav_fixture()
        def audio(r):
            calls.append(r.request.post_data_json)
            r.fulfill(json={'candidates':[{'content':{'parts':[{'inlineData':{'mimeType':'audio/wav','data':fixture}}]}}]})
        page.route('https://generativelanguage.googleapis.com/**',audio)
        page.goto(f'http://127.0.0.1:{server.server_port}/dojo/',wait_until='domcontentloaded')
        page.locator('#big').click()
        seen=[]
        for i in range(27):
            page.wait_for_function('(i)=>__test.state().cur===i && __test.state().narr==="play"',arg=i)
            seen.append(i)
            if i==13:page.evaluate('__recovery.missedEnd()')
            page.evaluate('__recovery.end()')
            page.wait_for_function('(i)=>__test.state().cur>i || !__test.state().playing',arg=i)
            if i<26:page.wait_for_function('(i)=>__test.state().cur===i+1',arg=i)
        page.wait_for_function('!__test.state().playing')
        assert page.locator('#bigt').inner_text()=='↻ 다시 보기'
        assert len(seen)==27 and not errors,errors
        print('PASS: ep13 all 27 clips finish, including hanging cache at 3:02, pending writes, missed ended event',flush=True)
        page.locator('#chap button').nth(14).click()
        page.wait_for_function('__test.state().narr==="play"')
        page.evaluate('__recovery.paused()')
        page.wait_for_function('!__recovery.audio().paused')
        assert page.evaluate('__test.state().playing')
        page.evaluate('__recovery.stall()')
        page.wait_for_function('__test.state().narr==="error"')
        assert not page.evaluate('__test.state().playing')
        assert page.locator('#big').is_visible() and page.locator('#voiceRetry').is_visible()
        page.locator('#big').click()
        page.wait_for_function('__test.state().narr==="play" && __test.state().playing')
        assert page.evaluate('__test.state().cur')==14
        assert all(c['generationConfig']['speechConfig']['voiceConfig']['voice']=='Sulafat' for c in calls)
        assert not errors,errors
        print('PASS: unexpected pause resumes; persistent stall offers visible same-voice retry without skipping the scene',flush=True)
        b.close()
    server.shutdown()
if __name__=='__main__':main()
