# 곤충 무술 도장 각 화의 장면(자세·내레이션)을 eps.json으로 뽑아요: python3 lily/tools/dump_eps.py eps.json  (playwright 필요)
import json, threading, http.server, socketserver, sys
from playwright.sync_api import sync_playwright
import os
ROOT=os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..")); PORT=8765
class H(http.server.SimpleHTTPRequestHandler):
    def __init__(s,*a,**k): super().__init__(*a,directory=ROOT,**k)
    def log_message(s,*a): pass
srv=socketserver.TCPServer(("127.0.0.1",PORT),H); threading.Thread(target=srv.serve_forever,daemon=True).start()
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page()
    pg.route("**/generativelanguage.googleapis.com/**", lambda r: r.abort()); pg.route("**/texttospeech.googleapis.com/**", lambda r: r.abort())
    html=open(ROOT+"/dojo/index.html",encoding="utf-8").read()
    marker="EPS.forEach(e=>{let a=0;"
    assert marker in html
    html=html.replace(marker,"window.__EPS=EPS;window.__samp=samp;"+marker,1)
    pg.route("**/dojo/", lambda r: r.fulfill(status=200, content_type="text/html; charset=utf-8", body=html))
    errs=[]; pg.on("pageerror", lambda e: errs.append(str(e)))
    pg.goto(f"http://127.0.0.1:{PORT}/dojo/"); pg.wait_for_timeout(800); print("errs", errs[:3])
    data=pg.evaluate("""() => window.__EPS.map(e => ({ name: e.name, next: e.next, total: e.total, ch: e.ch, beats: e.beats.map(b => {
        const fr = [0.15,0.3,0.45,0.55,0.7,0.85,0.97];
        const acts = fr.map(q => (b.actors || []).map(a => { const [id, F, o] = a; const P = window.__samp(F, (b.dur||8)*q); return { id, pose: null, x: Math.round(P.x), y: Math.round(P.y||0), f: P.f, rot: +(P.rot||0).toFixed(2), ex: P.ex, rust: P.rust||0, gl: P.gl||0, P: Object.fromEntries(['tl','flh','flk','blh','blk','fah','fae','bah','bae','sc'].filter(k=>P[k]!=null).map(k=>[k,+(+P[k]).toFixed(2)])) }; }));
        return { id: b.id, dur: b.dur, bg: b.bg || '', who: b.who || [], cap: b.cap || '', say: typeof b.say === 'function' ? '' : (b.say || ''), acts };
      }) }))""")
    json.dump(data, open(sys.argv[1],"w",encoding="utf-8"), ensure_ascii=False, indent=1)
    print([ (e["name"], len(e["beats"]), round(e["total"])) for e in data])
    b.close()
srv.shutdown()
