// PBT Help Desk — صرف اپنا کیش (pbt-helpdesk-) چھیڑتا ہے، اسی ویب سائٹ کی دوسری ایپس کا نہیں
const CACHE_NAME = 'pbt-helpdesk-HD0211MO006';
const FILES = ['./', './index.html', './app.js', './store.js', './cloud-config.js', './upd.js', './widget.js', './manifest.json', './icons/icon-192.png'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(FILES)).catch(() => {}));
  self.skipWaiting();
});
self.addEventListener('activate', e => e.waitUntil(
  caches.keys().then(ks => Promise.all(ks.filter(k => k.startsWith('pbt-helpdesk-') && k !== CACHE_NAME).map(k => caches.delete(k))))
    .then(() => self.clients.claim())));
self.addEventListener('fetch', e => {
  const r = e.request;
  if (r.method !== 'GET' || new URL(r.url).origin !== self.location.origin) return;
  if (r.url.includes('/fonts/')) { e.respondWith(caches.match(r).then(h => h || fetch(r).then(x => { const c = x.clone(); caches.open(CACHE_NAME).then(k => k.put(r, c)); return x; }))); return; }
  e.respondWith(fetch(r, { cache: 'no-cache' }).then(x => {
    if (x.ok) { const c = x.clone(); caches.open(CACHE_NAME).then(k => k.put(r, c)); }
    return x;
  }).catch(() => caches.match(r).then(h => h || caches.match('./index.html'))));
});
