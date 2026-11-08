/* ================= فائربیس (pbt-help-desk) — لائیو =================
   گاہک: Anonymous؛ مالک: piarybhai@gmail.com (UID OWNER_UID)
   issues/{id} (مسئلہ) · issues/{id}/priv/c (نام، فون) · blobs/{id} (تصویر/آواز) · meta/counter · meta/cfg
   onSnapshot سے لائیو — صرف بدلی چیز دوبارہ آتی ہے (فائربیس کا خرچ کم) */
(function () {
  'use strict';
  const V = '10.14.1';
  const P = new URLSearchParams(location.search);
  const CDN = window.PBTHD_FB_CDN || 'https://www.gstatic.com/firebasejs/' + V + '/';
  const OWNER_UID = 's6L0FAs6krVDRAHKf70ggM3LamH2', OWNER_EMAIL = 'piarybhai@gmail.com';
  let Au, F, auth, db, user = null, subs = [], offs = [];
  let all = new Map(), pub = new Map(), mine = new Map(), priv = new Map(), cfg = {};
  const isOwner = () => !!(user && user.uid === OWNER_UID);

  function emit() {
    let list;
    if (isOwner()) list = [...all.values()];
    else { const m = new Map(pub); mine.forEach((v, k) => m.set(k, v)); list = [...m.values()]; }
    list = list.map(i => Object.assign({ metoo: [], reply: '', ptext: '' }, i, priv.get(i.id) || {}));
    subs.forEach(f => { try { f(list, cfg); } catch (e) { console.error(e); } });
  }
  const docs = (snap, map) => { map.clear(); snap.forEach(d => map.set(d.id, Object.assign({ id: d.id }, d.data()))); };
  function listen() {
    offs.forEach(f => f()); offs = []; all.clear(); pub.clear(); mine.clear(); priv.clear();
    const err = e => console.warn('[helpdesk]', e && e.code, e && e.message);
    offs.push(F.onSnapshot(F.doc(db, 'meta', 'cfg'), s => { cfg = s.exists() ? s.data() : {}; emit(); }, err));
    if (isOwner()) {
      // نام/فون ہر مسئلے کی اپنی priv/c سے (ایک بار پڑھ کر یاد) — collectionGroup کو فائربیس انڈیکس چاہیے، اس سے بچا
      offs.push(F.onSnapshot(F.collection(db, 'issues'), s => {
        docs(s, all); emit();
        all.forEach((v, id) => {
          if (priv.has(id)) return;
          priv.set(id, {});
          F.getDoc(F.doc(db, 'issues', id, 'priv', 'c')).then(d => {
            if (d.exists()) { priv.set(id, { name: d.data().name || '', phone: d.data().phone || '' }); emit(); }
          }).catch(err);
        });
      }, err));
    } else {
      offs.push(F.onSnapshot(F.query(F.collection(db, 'issues'), F.where('pub', '==', true)), s => { docs(s, pub); emit(); }, err));
      offs.push(F.onSnapshot(F.query(F.collection(db, 'issues'), F.where('uid', '==', user.uid)), s => { docs(s, mine); emit(); }, err));
    }
    emit();
  }

  const Store = {
    mode: 'cloud',
    async init() {
      const [A, au, f] = await Promise.all([import(CDN + 'firebase-app.js'), import(CDN + 'firebase-auth.js'), import(CDN + 'firebase-firestore.js')]);
      Au = au; F = f;
      const app = A.initializeApp(window.PBTHD_FIREBASE, 'pbthd');
      auth = Au.getAuth(app); db = F.getFirestore(app);
      if (P.get('emu') === '1') { Au.connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true }); F.connectFirestoreEmulator(db, '127.0.0.1', 8080); }
      await new Promise(res => {
        let done = false; const fin = () => { if (!done) { done = true; res(); } };
        Au.onAuthStateChanged(auth, u => {
          user = u;
          if (!u) { Au.signInAnonymously(auth).catch(e => { console.error(e); fin(); }); return; }
          listen(); fin();
        });
        setTimeout(fin, 15000);
      });
    },
    watch(f) { subs.push(f); emit(); return () => { subs = subs.filter(x => x !== f); }; },
    cfg() { return cfg; },
    async setCfg(p) { await F.setDoc(F.doc(db, 'meta', 'cfg'), p, { merge: true }); },
    // 🔔 HD0211MO016: اطلاعات — push/owner (صرف مالک پڑھ/لکھ سکتا ہے، firestore.rules)
    async pushGet() { const d = await F.getDoc(F.doc(db, 'push', 'owner')); return d.exists() ? d.data() : {}; },
    async pushSave(p) { await F.setDoc(F.doc(db, 'push', 'owner'), p, { merge: true }); },
    // 📊 HD0811SA052: ڈویلپر پینل — push/panel (صرف مالک): دو Claude اکاؤنٹس کی ہفتہ وار حد + کو ڈویلپر کے نمبر (hash)
    async panelGet() { const d = await F.getDoc(F.doc(db, 'push', 'panel')); return d.exists() ? d.data() : {}; },
    async panelSave(p) { await F.setDoc(F.doc(db, 'push', 'panel'), p, { merge: true }); },
    async add(f, blobs) {
      if (!user) throw new Error('offline');
      const cref = F.doc(db, 'meta', 'counter');
      const no = await F.runTransaction(db, async t => {
        const s = await t.get(cref); const n = (s.exists() ? s.data().v : 0) + 1; t.set(cref, { v: n }); return n;
      });
      const ref = F.doc(F.collection(db, 'issues')), id = ref.id, t = Date.now();
      const { name, phone } = f;
      const d = {
        no, app: f.app || 'other', type: f.type || 'bug', text: f.text || '', ptext: '', ver: f.ver || '', dev: f.dev || '',
        shots: f.shots || 0, audio: !!f.audio, lang: f.lang || 'ur', hold: f.hold || '', uid: user.uid,
        created: t, upd: t, status: 'new', pub: false, metoo: [], reply: '', replyAt: 0, doneAt: 0, dupOf: 0
      };
      const b = F.writeBatch(db);
      b.set(ref, d);
      b.set(F.doc(db, 'issues', id, 'priv', 'c'), { name: name || '', phone: phone || '', uid: user.uid });
      (blobs || []).forEach(x => b.set(F.doc(F.collection(db, 'blobs')), { issue: id, kind: x.kind, data: x.data, uid: user.uid, created: t }));
      await b.commit();
      return { id, no };
    },
    async update(id, patch) {
      const p = Object.assign({}, patch, { upd: Date.now() });
      const pv = {};
      ['name', 'phone'].forEach(k => { if (k in p) { pv[k] = p[k]; delete p[k]; } });
      await F.updateDoc(F.doc(db, 'issues', id), p);
      if (Object.keys(pv).length) await F.updateDoc(F.doc(db, 'issues', id, 'priv', 'c'), pv);
    },
    async metoo(id, dev, on) {
      await F.updateDoc(F.doc(db, 'issues', id), { metoo: on ? F.arrayUnion(dev) : F.arrayRemove(dev) });
    },
    async blobs(id) {
      const c = [F.where('issue', '==', id)];
      if (!isOwner()) c.push(F.where('uid', '==', user.uid));
      const s = await F.getDocs(F.query(F.collection(db, 'blobs'), ...c));
      return s.docs.map(d => Object.assign({ id: d.id }, d.data()));
    },
    async remove(id) {
      const c = [F.where('issue', '==', id)];
      if (!isOwner()) c.push(F.where('uid', '==', user.uid));
      const s = await F.getDocs(F.query(F.collection(db, 'blobs'), ...c));
      const b = F.writeBatch(db);
      s.docs.forEach(d => b.delete(d.ref));
      b.delete(F.doc(db, 'issues', id, 'priv', 'c'));
      b.delete(F.doc(db, 'issues', id));
      await b.commit();
    },
    async wipeDemo() {},
    async ownerLogin(pw) {
      try { await Au.signInWithEmailAndPassword(auth, OWNER_EMAIL, pw); return isOwner(); }
      catch (e) { console.warn(e && e.code); return false; }
    },
    ownerFirst() { return false; },
    async ownerLogout() { await Au.signOut(auth); },
    // 🔑 پاس ورڈ بدلیں (پینل کے اندر، ای میل کے بغیر): پرانے سے تصدیق، پھر نیا
    async changePassword(oldPw, newPw) {
      if (!isOwner()) throw new Error('not owner');
      const cred = Au.EmailAuthProvider.credential(OWNER_EMAIL, oldPw);
      try { await Au.reauthenticateWithCredential(auth.currentUser, cred); }
      catch (e) { throw new Error('old'); }
      await Au.updatePassword(auth.currentUser, newPw);
      return true;
    },
    isOwner
  };
  window.CloudStore = Store;
})();

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
      ['FM', 'idea', 'ڈیش بورڈ پر پچھلے مہینے کا منافع بھی دکھائیں۔', 'new', 0, 3, 0, ''],
      ['SM', 'bug', 'رپورٹ میں مہینے کا کل حساب غلط آ رہا ہے۔', 'work', 0, 10, 0, '']
    ];
    let no = 0;
    for (const [app, type, text, status, pub, hrs, mt, reply] of S) {
      no++;
      const t = now - hrs * H;
      await rq(tx('issues', 'readwrite').put({
        id: rid(), no, app, type, text, ptext: '', name: ['احمد', 'بلال', 'یوسف', 'حماد', 'عثمان', 'زبیر', 'سلیم'][no - 1],
        phone: '0300' + String(1234560 + no), ver: '', dev: 'demo' + no, shots: 0, audio: false,
        created: t, upd: t, status, pub: !!pub, metoo: Array.from({ length: mt }, (_, i) => 'd' + no + i),
        hold: type === 'idea' && status === 'new' ? 'decide' : (no === 7 ? 'approve' : ''),
        review: no === 7 ? 'مہینے کے حساب میں آخری دن شامل نہیں ہو رہا تھا — ٹھیک کر دیا، 3 مہینوں کے حساب سے جانچ لیا۔ (SM ورژن تیار)' : '',
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
    async panelGet() { try { return JSON.parse(localStorage.getItem('pbthd_demo_panel') || '{}'); } catch (e) { return {}; } },
    async panelSave(p) { const o = Object.assign(await this.panelGet(), p); try { localStorage.setItem('pbthd_demo_panel', JSON.stringify(o)); } catch (e) {} },
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
  window.DemoStore = Store;
  const P = new URLSearchParams(location.search);
  window.Store = (window.PBTHD_FIREBASE && P.get('demo') !== '1') ? window.CloudStore : Store;
})();
