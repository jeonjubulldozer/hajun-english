// 곤충 무술 도장: 앱으로 설치했을 때 인터넷이 없어도 화면이 열리게 해 주는 도우미
const CACHE = 'insect-dojo-v6';
const CORE = ['./', './index.html', './voice.js?v=natural4', './manifest.webmanifest', './icon-192.png', './icon-512.png', './icon-maskable-512.png', './apple-touch-icon.png'];
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k.startsWith('insect-dojo') && k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;                       // 목소리 받아 오기(제미나이)는 그대로 인터넷으로
  const url = new URL(req.url);
  const isPage = req.mode === 'navigate' || (url.origin === location.origin && /\/dojo\/(index\.html)?$/.test(url.pathname));
  if (isPage) {                                            // 화면은 새 화가 바로 보이게 인터넷 먼저, 없으면 저장본
    e.respondWith(fetch(req, { cache: 'no-cache' }).then((r) => { const c = r.clone(); caches.open(CACHE).then(x => x.put('./index.html', c)); return r; })
      .catch(() => caches.match('./index.html')));
    return;
  }
  if ((url.origin === location.origin && url.pathname.includes('/dojo/')) || /fonts\.(googleapis|gstatic)\.com$/.test(url.hostname)) {
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then((r) => {
      if (r.ok || r.type === 'opaque') { const c = r.clone(); caches.open(CACHE).then(x => x.put(req, c)); }
      return r;
    })));
  }
});
