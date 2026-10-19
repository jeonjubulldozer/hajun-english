// 하준이 영어 도장: 앱으로 설치했을 때 화면이 빨리 열리게 해 주는 작은 도우미 (대화·목소리는 항상 인터넷으로)
const CACHE = 'lily-dojo-v7';
const CORE = ['./', './index.html', './books.js', './books-bugdojo.js', './bugart.js', './manifest.webmanifest', './icon-192.png', './icon-512.png', './icon-maskable-512.png', './apple-touch-icon.png'];
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE && k.startsWith('lily-dojo')).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin === location.origin && /\/lily\/(index\.html|[a-z-]+\.js)?$/.test(url.pathname)) {   // 화면과 책은 새 버전 먼저, 인터넷이 없으면 저장본
    e.respondWith(fetch(req).then((r) => { const c = r.clone(); caches.open(CACHE).then(x => x.put(req, c)); return r; }).catch(() => caches.match(req).then(h => h || caches.match('./index.html'))));
    return;
  }
  if ((url.origin === location.origin && /\/lily\//.test(url.pathname)) || /fonts\.(googleapis|gstatic)\.com$/.test(url.hostname)) {   // 아이콘·글꼴은 저장본 먼저
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then((r) => {
      if (r.ok || r.type === 'opaque') { const c = r.clone(); caches.open(CACHE).then(x => x.put(req, c)); }
      return r;
    })));
  }
});
