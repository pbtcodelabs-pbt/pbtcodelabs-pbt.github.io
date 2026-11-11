// PBT Help Desk — صرف اپنا کیش (pbt-helpdesk-) چھیڑتا ہے، اسی ویب سائٹ کی دوسری ایپس کا نہیں
const CACHE_NAME = 'pbt-helpdesk-HD1111WE073';
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
  if (/\/media\//.test(r.url)) return; // بڑی ویڈیوز سیدھی نیٹ سے (کیش نہیں، Range درخواستیں)
  if (r.url.includes('/fonts/')) { e.respondWith(caches.match(r).then(h => h || fetch(r).then(x => { const c = x.clone(); caches.open(CACHE_NAME).then(k => k.put(r, c)); return x; }))); return; }
  e.respondWith(fetch(r, { cache: 'no-cache' }).then(x => {
    if (x.ok) { const c = x.clone(); caches.open(CACHE_NAME).then(k => k.put(r, c)); }
    return x;
  }).catch(() => caches.match(r).then(h => h || caches.match('./index.html'))));
});
// 🔔 HD0211MO016: مالک کی اطلاع (hd.py notify سے Web Push) — ایپ بند ہو تب بھی؛ آئیکن پر نمبر
self.addEventListener('push', e => {
  let d = {}; try { d = e.data ? e.data.json() : {}; } catch (x) { d = { body: e.data && e.data.text() }; }
  const jobs = [self.registration.showNotification(d.title || '❓ PBT Help Desk', {
    body: d.body || '', tag: 'pbthd', renotify: true, icon: 'icons/icon-192.png', badge: 'icons/icon-192.png', data: { url: d.url || './#/owner' }
  })];
  if (self.navigator && self.navigator.setAppBadge && d.count != null) jobs.push((d.count ? self.navigator.setAppBadge(d.count) : self.navigator.clearAppBadge()).catch(() => {}));
  e.waitUntil(Promise.all(jobs));
});
self.addEventListener('notificationclick', e => {
  e.notification.close();
  const url = new URL((e.notification.data && e.notification.data.url) || './#/owner', self.registration.scope).href;
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(cs => {
    const c = cs.find(x => x.url.startsWith(self.registration.scope));
    if (c) { c.navigate(url).catch(() => {}); return c.focus(); }
    return self.clients.openWindow(url);
  }));
});
