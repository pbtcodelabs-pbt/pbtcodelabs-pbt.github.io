// صرف مرکزی صفحے کا SW (scope: /index.html) — باقی ایپس کے فولڈر کو نہیں چھوتا
const CACHE_NAME = 'pbt-home-v1';
self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(
  caches.keys().then(ks => Promise.all(ks.filter(k => k.startsWith('pbt-home-') && k !== CACHE_NAME).map(k => caches.delete(k))))
    .then(() => self.clients.claim())));
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET' || e.request.mode !== 'navigate') return;
  e.respondWith(fetch(e.request).then(r => {
    const c = r.clone(); caches.open(CACHE_NAME).then(x => x.put(e.request, c)); return r;
  }).catch(() => caches.match(e.request)));
});
