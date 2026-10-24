"""Episodes 10/11: browser scene, bounds, tap release and character regression checks.
Run: python dojo/tests/dragon.py. Screenshots go to /tmp/dojo10-preview.
Synthetic/no narration checks do not verify real Korean speech.
"""
import functools
import http.server
import json
import os
from pathlib import Path
import threading
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[2]
OUT = Path('/tmp/dojo10-preview')
HOOK = '''window.__dragon={EPS,SP,ORDER,samp,place,drawBug,PO,
 show:(id,t,ep=10)=>{PLAY=false;useEp(ep);gT=SC.find(b=>b.id===id).start+t;SEEK=true;render()},
 audit:(epi=10)=>{let samples=0;const errors=[];const ep=EPS[epi];
  for(const b of ep.beats)for(let t=0;t<b.dur;t+=.1){
   const a=new Map(b.actors.map(([id,F])=>{const sp=SP[id],P={...samp(F,t)};place(sp,P);return[id,{sp,P}]}));
   if(b.rig)b.rig(a,t);
   for(const [id,v] of a){samples++;if(v.P.x<80||v.P.x>880)errors.push(b.id+': x '+id);
    for(const [limb,root,mid,end,l1,l2] of [['fa','sh','el','hd','ua','fa'],['ba','sh','el','hd','ua','fa'],['fl','hip','kn','ft','th','sn'],['bl','hip','kn','ft','th','sn']]){
     const pts=[root,mid,end].map(j=>jointWorld(v,limb+'.'+j)),k=v.sp.s*(v.P.sc||1);
     if(pts.flat().some(n=>!Number.isFinite(n)))errors.push(b.id+': nonfinite');
     if(pts.some(p=>p[0]<0||p[0]>960))errors.push(b.id+': clipped limb '+id);
     for(let j=0;j<2;j++)if(Math.hypot(pts[j+1][0]-pts[j][0],pts[j+1][1]-pts[j][1])>v.sp.L[j?l2:l1]*k+.02)errors.push(b.id+': stretched '+limb);
     if((limb==='fl'||limb==='bl')&&pts.slice(1).some(p=>p[1]>G+1))errors.push(b.id+': below mat '+id+' '+t.toFixed(1));
    }
   }
   let active=0;const old=chip;chip=(start,end)=>{if(t>=start&&t<=end)active++};try{LT=t;if(b.fx)b.fx()}finally{chip=old}
   if(active>1)errors.push(b.id+': overlapping chips');
  }
  for(const b of ep.beats.filter(b=>b.tapAt!=null))for(const t of [b.tapAt,b.tapAt+.1,b.tapAt+.3,b.tapAt+1]){
   const a=new Map(b.actors.map(([id,F])=>{const sp=SP[id],P={...samp(F,t)};place(sp,P);return[id,{sp,P}]}));
   const before=JSON.stringify([...a].map(([id,v])=>v.P.g));b.rig(a,t);
   if(before!==JSON.stringify([...a].map(([id,v])=>v.P.g)))errors.push(b.id+': contact after tap '+t);
  }
  let continuous=0;
  for(let i=1;i<ep.beats.length;i++){
   const prev=ep.beats[i-1],b=ep.beats[i];if(!b.bout||prev.bout!==b.bout)continue;
   continuous++;
   for(let k=0;k<b.actors.length;k++){
    const a=samp(prev.actors[k][1],prev.dur),c=samp(b.actors[k][1],0);
    for(const key of ['x','y','rot','f','tl','flh','flk','blh','blk','fah','fae','bah','bae'])if(Math.abs(a[key]-c[key])>.0001)errors.push(b.id+': discontinuity '+key);
   }
  }
  const actionSeconds=ep.beats.filter(b=>b.action).reduce((s,b)=>s+b.dur,0);
  if(ep.total<300)errors.push('episode shorter than 5 minutes');
  if(actionSeconds<ep.total*.6)errors.push('too little sparring');
  return{samples,errors,total:ep.total,count:ep.beats.length,continuous,actionSeconds};
 }};'''
class Quiet(http.server.SimpleHTTPRequestHandler):
    def log_message(self,*args): pass

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
        assert page.locator('#eps button').last.inner_text()=='11화'
        for epi in [10,11]:
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
        assert page.evaluate('__dragon.ORDER.at(-1)')=='dragon'
        assert page.locator('#grid').inner_text().find('빠른 깃 잡기 · 허리후리기 · 삼각조르기 연결')>=0
        assert not errors,errors
        browser.close()
    server.shutdown()
    print('PASS: long episodes, continuous bouts, buttons, mobile/tablet, bounds, limbs, single chip, tap release, family card')
if __name__=='__main__':main()
