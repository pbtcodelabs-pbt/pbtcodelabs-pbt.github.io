// PalmEarn — صرف اپنا کیش (palmearn-) چھیڑتا ہے، اسی ویب سائٹ کی دوسری ایپس کا نہیں
const CACHE_NAME = 'palmearn-PE2611TH001';
const FILES = ['./', './index.html', './manifest.json', './icon-192.png', './icon-512.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(FILES)).catch(() => {})); self.skipWaiting(); });
self.addEventListener('activate', e => e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k.startsWith('palmearn-') && k !== CACHE_NAME).map(k => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener('fetch', e => {
  const r = e.request;
  if (r.method !== 'GET' || new URL(r.url).origin !== self.location.origin) return;   // سرور / ہیلپ ڈیسک widget کبھی کیش نہیں
  if (r.url.includes('/help/')) return;
  e.respondWith(fetch(r, { cache: 'no-cache' }).then(x => { if (x.ok) { const c = x.clone(); caches.open(CACHE_NAME).then(k => k.put(r, c)); } return x; }).catch(() => caches.match(r).then(h => h || caches.match('./index.html'))));
});
