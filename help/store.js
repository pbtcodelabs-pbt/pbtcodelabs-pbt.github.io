/* PBT Help Desk — ڈیٹا کا خانہ (Store)
   ابھی «ڈیمو» حالت: اسی فون/براؤزر کے IndexedDB `pbthd_demo_v1` میں، کئی ٹیب میں لائیو (BroadcastChannel)۔
   فائربیس (پروجیکٹ pbt-help-desk) جڑتے ہی یہی Store کلاؤڈ سے چلے گا — app.js کو کچھ بدلنا نہیں پڑے گا۔
   شکل:
     issue = {id, no, app, type:'bug'|'idea'|'ask', text, ptext, name, phone, ver, dev, shots:n, audio:bool,
              created, upd, status:'new'|'seen'|'work'|'done'|'dup', pub:bool, metoo:[dev…], reply, replyAt, doneAt, dupOf}
     blob  = {id, issue, kind:'shot'|'audio', data:dataURL}   (ہر تصویر/آواز الگ — فائربیس کی 1MB حد سے نیچے) */
(function () {
  'use strict';
  const DBN = 'pbthd_demo_v1';
  let db = null, subs = [], cache = [], cfg = {};
  const bc = ('BroadcastChannel' in window) ? new BroadcastChannel('pbthd_demo') : null;
  const rid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 8);

  function open() {
    return new Promise((res, rej) => {
      const r = indexedDB.open(DBN, 1);
      r.onupgradeneeded = () => {
        const d = r.result;
        d.createObjectStore('issues', { keyPath: 'id' });
        d.createObjectStore('blobs', { keyPath: 'id' }).createIndex('issue', 'issue');
        d.createObjectStore('meta', { keyPath: 'k' });
      };
      r.onsuccess = () => { db = r.result; res(); };
      r.onerror = () => rej(r.error);
    });
  }
  const tx = (s, m) => db.transaction(s, m || 'readonly').objectStore(s);
  const rq = r => new Promise((res, rej) => { r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error); });

  async function reload() {
    cache = await rq(tx('issues').getAll());
    const c = await rq(tx('meta').get('cfg'));
    cfg = (c && c.v) || {};
    subs.forEach(f => { try { f(cache.slice(), cfg); } catch (e) { console.error(e); } });
  }
  function changed() { if (bc) bc.postMessage('chg'); return reload(); }
  if (bc) bc.onmessage = () => reload();

  async function seed() {
    const n = await rq(tx('issues').count());
    if (n || localStorage.getItem('pbthd_demo_seeded')) return;
    localStorage.setItem('pbthd_demo_seeded', '1');
    const H = 3600e3, now = Date.now();
    const S = [
      ['AIO-POS-DIRECT', 'bug', 'بل پرنٹ کرتے وقت گاہک کا نام آدھا کٹ جاتا ہے، 58mm پرنٹر پر۔', 'work', 1, 30, 5, ''],
      ['AIO-POS-DIRECT', 'idea', 'پراڈکٹ کی لسٹ کو حروفِ تہجی کی ترتیب سے دیکھنے کا بٹن ہونا چاہیے۔', 'new', 1, 6, 2, ''],
      ['SM', 'bug', 'رات بارہ بجے کے بعد کل کی بکری آج میں دکھ رہی ہے۔', 'seen', 1, 50, 3, ''],
      ['AIO', 'ask', 'دوسرے فون کو دکان سے کیسے جوڑیں؟', 'done', 1, 90, 1, 'Settings → 👥 Staff & Devices میں «Shop Code» کاپی کریں، دوسرے فون پر لاگ ان میں «🔗 Join a shop» دبا کر لگا دیں۔'],
      ['AB', 'bug', 'پرچی کی تصویر میں بیوپاری کا نمبر نظر نہیں آتا۔', 'done', 1, 120, 4, 'ٹھیک کر دیا — نئے ورژن میں پرچی کی تصویر پر نمبر آ گیا ہے۔ ایپ ایک بار تازہ کر لیں۔'],
      ['FM', 'idea', 'ڈیش بورڈ پر پچھلے مہینے کا منافع بھی دکھائیں۔', 'new', 0, 3, 0, '']
    ];
    let no = 0;
    for (const [app, type, text, status, pub, hrs, mt, reply] of S) {
      no++;
      const t = now - hrs * H;
      await rq(tx('issues', 'readwrite').put({
        id: rid(), no, app, type, text, ptext: '', name: ['احمد', 'بلال', 'یوسف', 'حماد', 'عثمان', 'زبیر'][no - 1],
        phone: '0300' + String(1234560 + no), ver: '', dev: 'demo' + no, shots: 0, audio: false,
        created: t, upd: t, status, pub: !!pub, metoo: Array.from({ length: mt }, (_, i) => 'd' + no + i),
        reply, replyAt: reply ? t + 20 * H : 0, doneAt: status === 'done' ? Math.min(now - H, t + 20 * H) : 0, dupOf: 0
      }));
    }
    await rq(tx('meta', 'readwrite').put({ k: 'counter', v: no }));
  }

  const Store = {
    mode: 'demo',
    async init() { await open(); await seed(); await reload(); },
    watch(f) { subs.push(f); f(cache.slice(), cfg); return () => { subs = subs.filter(x => x !== f); }; },
    cfg() { return cfg; },
    async setCfg(p) { cfg = Object.assign({}, cfg, p); await rq(tx('meta', 'readwrite').put({ k: 'cfg', v: cfg })); return changed(); },
    async add(f, blobs) {
      const c = await rq(tx('meta').get('counter'));
      const no = ((c && c.v) || 0) + 1;
      await rq(tx('meta', 'readwrite').put({ k: 'counter', v: no }));
      const id = rid(), t = Date.now();
      for (const b of blobs || []) await rq(tx('blobs', 'readwrite').put({ id: rid(), issue: id, kind: b.kind, data: b.data }));
      await rq(tx('issues', 'readwrite').put(Object.assign({
        id, no, created: t, upd: t, status: 'new', pub: false, metoo: [], reply: '', replyAt: 0, doneAt: 0, dupOf: 0, ptext: ''
      }, f)));
      await changed();
      return { id, no };
    },
    async update(id, patch) {
      const it = await rq(tx('issues').get(id)); if (!it) return;
      await rq(tx('issues', 'readwrite').put(Object.assign(it, patch, { upd: Date.now() })));
      return changed();
    },
    async metoo(id, dev, on) {
      const it = await rq(tx('issues').get(id)); if (!it) return;
      const s = new Set(it.metoo || []); on ? s.add(dev) : s.delete(dev);
      it.metoo = [...s];
      await rq(tx('issues', 'readwrite').put(it));
      return changed();
    },
    async blobs(id) { return rq(tx('blobs').index('issue').getAll(id)); },
    async remove(id) {
      const bl = await rq(tx('blobs').index('issue').getAllKeys(id));
      for (const k of bl) await rq(tx('blobs', 'readwrite').delete(k));
      await rq(tx('issues', 'readwrite').delete(id));
      return changed();
    },
    async wipeDemo() {
      for (const s of ['issues', 'blobs', 'meta']) await rq(tx(s, 'readwrite').clear());
      return changed();
    },
    // مالک کا داخلہ: ڈیمو میں اسی فون پر رکھا پاس ورڈ؛ فائربیس میں ای میل/پاس ورڈ (Firebase Auth)
    async ownerLogin(pw) {
      const h = await sha('PBTHD:' + pw);
      const saved = localStorage.getItem('pbthd_ownerH');
      if (!saved) { localStorage.setItem('pbthd_ownerH', h); }
      else if (saved !== h) return false;
      localStorage.setItem('pbthd_owner', '1');
      return true;
    },
    ownerFirst() { return !localStorage.getItem('pbthd_ownerH'); },
    ownerLogout() { localStorage.removeItem('pbthd_owner'); },
    isOwner() { return localStorage.getItem('pbthd_owner') === '1'; }
  };
  async function sha(s) {
    const b = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s));
    return [...new Uint8Array(b)].map(x => x.toString(16).padStart(2, '0')).join('');
  }
  window.Store = Store;
})();
