"""Episodes 12/13: browser scene, bounds, tap release and character regression checks.
Run: python dojo/tests/defenders.py. Screenshots go to /tmp/dojo-defenders-preview.
Synthetic/no narration checks do not verify real Korean speech.
"""
import functools
import http.server
import json
import os
from pathlib import Path
import threading
from playwright.sync_api import sync_playwright

from dragon import ROOT, HOOK, Quiet
OUT = Path('/tmp/dojo-defenders-preview')

def main():
    OUT.mkdir(exist_ok=True)
    server=http.server.ThreadingHTTPServer(('127.0.0.1',0),functools.partial(Quiet,directory=str(ROOT)))
    threading.Thread(target=server.serve_forever,daemon=True).start()
    source=(ROOT/'dojo/index.html').read_text()
    marker='gT=.9;requestAnimationFrame(loop);prefetch();'
    assert marker in source
    errors=[]
    with sync_playwright() as p:
        browser=p.chromium.launch(executable_path=os.environ.get('CHROMIUM_PATH','/usr/bin/chromium'),args=['--no-sandbox','--disable-dev-shm-usage'])
        page=browser.new_page(viewport={'width':1200,'height':1000})
        page.add_init_script('localStorage.setItem("insect-dojo.prefs",JSON.stringify({on:false}));')
        page.on('pageerror',lambda e:errors.append(str(e)))
        page.route('**/dojo/',lambda r:r.fulfill(body=source.replace(marker,HOOK+marker),content_type='text/html'))
        page.goto(f'http://127.0.0.1:{server.server_port}/dojo/',wait_until='networkidle')
        assert page.locator('#eps button').nth(13).inner_text()=='13화'
        for epi in [12,13]:
            page.set_viewport_size({'width':1200,'height':1000})
            page.locator('#eps button').nth(epi).click()
            chapters=page.locator('#chap button')
            scenes=page.evaluate('(ep)=>__dragon.EPS[ep].beats.map(b=>({id:b.id,dur:b.dur,action:b.action}))',epi)
            assert chapters.count()==len(scenes)
            for i in range(chapters.count()):
                chapters.nth(i).click()
                assert page.locator('#line').inner_text()
            audit=page.evaluate('(ep)=>__dragon.audit(ep)',epi)
            print(json.dumps({'episode':epi,**audit},ensure_ascii=False),flush=True)
            assert not audit['errors'],audit['errors'][:20]
            for scene in scenes:
                times=[scene['dur']*.55]
                if scene.get('action'):times=[2,6,10,scene['dur']-.1]
                for t in times:
                    page.evaluate('([id,t,ep])=>__dragon.show(id,t,ep)',[scene['id'],t,epi])
                    page.locator('#cv').screenshot(path=str(OUT/f'{scene["id"]}-{t:.1f}.png'))
            for width in [390,768]:
                page.set_viewport_size({'width':width,'height':900})
                for i in range(chapters.count()):chapters.nth(i).click()
                assert page.evaluate('document.documentElement.scrollWidth<=innerWidth')
                page.screenshot(path=str(OUT/f'ep{epi}-mobile-{width}.png'))
        assert page.evaluate("['pine','amber','tarantula','huntsman','bat','rat','centipede'].every(id=>__dragon.ORDER.includes(id))")
        assert page.evaluate("__dragon.EPS[12].beats.filter(b=>b.bout?.startsWith('judo-')).every(b=>b.actors.every(([id])=>__dragon.SP[id].arts.includes('judo')))")
        assert page.locator('#grid').inner_text().find('빠른 깃 잡기 · 허리후리기 · 삼각조르기 연결')>=0
        # A rear counter must send the attacker behind the direction they face.
        assert page.evaluate("""()=>{const b=__dragon.EPS[12].beats.find(b=>b.id==='tani12');const P=__dragon.samp(b.actors[0][1],8);return P.f===-1 && P.rot<0}""")
        assert not errors,errors
        browser.close()
    server.shutdown()
    print('PASS: long episodes, continuous bouts, buttons, mobile/tablet, bounds, limbs, single chip, tap release, family card')
if __name__=='__main__':main()
