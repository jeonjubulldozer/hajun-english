// 밤의 쉼표: 앱으로 설치했을 때 인터넷이 없어도 화면이 열리게 해 주는 작은 도우미
const CACHE = 'bam-swimpyo-v1';
const CORE = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png', './icon-maskable-512.png', './apple-touch-icon.png'];
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k.startsWith('bam-swimpyo') && k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;                       // 목소리 받아 오기(제미나이)는 그대로 인터넷으로
  const url = new URL(req.url);
  const isPage = req.mode === 'navigate' || (url.origin === location.origin && /\/sleep\/(index\.html)?$/.test(url.pathname));
  if (isPage) {                                            // 화면은 새 버전 먼저, 인터넷이 없으면 저장본
    e.respondWith(fetch(req).then((r) => { const c = r.clone(); caches.open(CACHE).then(x => x.put('./index.html', c)); return r; })
      .catch(() => caches.match('./index.html')));
    return;
  }
  if (url.origin === location.origin || /fonts\.(googleapis|gstatic)\.com$/.test(url.hostname)) {   // 아이콘·글꼴은 저장본 먼저
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then((r) => {
      if (r.ok || r.type === 'opaque') { const c = r.clone(); caches.open(CACHE).then(x => x.put(req, c)); }
      return r;
    })));
  }
});
