/* PBT Help Desk — HD2011FR133 (مالک کا حکم): AIO ID کی نئی سکرین — ہر ID کی حالت (پیکج / ٹرائل / ختم)، ID کیسے بنی، اسی بندے کی باقی IDs،
   سرور میں اس بندے کے سب پیکج (کون سی ID کے فون پر چل رہا ہے)، پیکج کی فہرست چھپی ہوئی (چیک باکس)، ہر تبدیلی پر ڈویلپر پاس ورڈ، ایکٹیویٹ پر اینیمیشن۔
   lic.js کے بعد لگتی ہے؛ My City Shines کی سکرین اور پیکج بنانے / بدلنے کی پرانی سکرین جوں کی توں۔ لاگ اِن کا طریقہ، سرور اور قیمتوں کی کلیدیں وہی۔ */
(function () {
  'use strict';
  const OLD = window.licOpen;
  if (typeof OLD !== 'function') return;
  const API = 'https://aio-pos-verify.pbtcodelabs.workers.dev/entadmin';
  const TRIAL_DAYS = 7;   /* ⚠️ AIO POS کے مفت ٹرائل کے دن — ID بننے کی تاریخ سے گنے جاتے ہیں */
  const TABS = [['MCS', 'My City Shines'], ['DR', 'AIO Direct'], ['AIO', 'AIO POS']];
  let APP = 'AIO', AIDS = [], ENTS = [], PK = [], PRICE = {}, AQ = '', SHOW = 40, SEL = null, APK = '', SHOWPK = false, BUSY = false, MSG = '', OK = true, RES = null, SHARE = '';
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const p2 = n => String(n).padStart(2, '0');
  const dmy = ts => { if (!ts) return '—'; const d = new Date(ts); return p2(d.getDate()) + '/' + p2(d.getMonth() + 1) + '/' + d.getFullYear(); };
  const hm = ts => { if (!ts) return ''; const d = new Date(ts); return p2(d.getHours()) + ':' + p2(d.getMinutes()); };
  const pn = v => String(v == null ? '' : v).replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d)).replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d));
  const m10 = v => String(v || '').replace(/\D/g, '').slice(-10);
  const aPh = m => String(m || '').replace(/^92/, '0');
  const dayLeft = ts => Math.ceil((ts - Date.now()) / 864e5);
  const pkKey = () => APP === 'AIO' ? 'lic_pk' : 'lic_pk_' + APP;

  function loadLocal() {
    try { PRICE = JSON.parse(localStorage.getItem('lic_price') || '{}') || {}; } catch (e) { PRICE = {}; }
    try { const c = window.CFG || (typeof CFG !== 'undefined' ? CFG : null); if (c && c.licPrices) PRICE = Object.assign({}, c.licPrices, PRICE); } catch (e) {}
    try { PK = JSON.parse(localStorage.getItem(pkKey()) || '[]') || []; } catch (e) { PK = []; }
  }
  function savePrice(id, v) {
    PRICE[id] = pn(v).trim();
    try { localStorage.setItem('lic_price', JSON.stringify(PRICE)); } catch (e) {}
    try { if (window.Store && Store.setCfg) Store.setCfg({ licPrices: PRICE }); } catch (e) {}
  }

  function css() {
    if (document.getElementById('aiCss')) return;
    const s = document.createElement('style'); s.id = 'aiCss';
    s.textContent = `#aiOv{position:fixed;inset:0;z-index:9000;background:var(--bg,#f4f6fb);overflow-y:auto;-webkit-overflow-scrolling:touch;padding:0 0 90px}
#aiOv .aTop{position:sticky;top:0;z-index:2;display:flex;align-items:center;gap:8px;padding:12px 14px;background:#1e293b;color:#fff;font-weight:800;font-size:16px}
#aiOv .aTop b{flex:1}#aiOv .aX{background:#fff2;color:#fff;border:0;border-radius:10px;padding:8px 12px;font-size:16px}
#aiOv .aBox{background:#fff;border-radius:14px;margin:12px;padding:14px;box-shadow:0 1px 6px #0001}
#aiOv h3{margin:0 0 10px;font-size:15px}
#aiOv input[type=text]{width:100%;box-sizing:border-box;padding:11px;border:1.5px solid #dbe1ea;border-radius:10px;font-size:15px;background:#fff}
#aiOv .aBtn{border:0;border-radius:10px;padding:10px 14px;font-weight:800;font-size:14px;background:#e2e8f0;color:#0f172a}
#aiOv .aBtn.pri{background:#2563eb;color:#fff}#aiOv .aBtn.grn{background:#16a34a;color:#fff}#aiOv .aBtn.red{background:#fee2e2;color:#b91c1c}#aiOv .aBtn[disabled]{opacity:.5}
#aiOv .aRow{display:flex;gap:8px;flex-wrap:wrap;align-items:center}
#aiOv .aCode{font-family:monospace;font-size:17px;font-weight:900;letter-spacing:1px;direction:ltr;unicode-bidi:plaintext}
#aiOv .aItem{border:1px solid #e5e9f0;border-radius:12px;padding:10px;margin-top:8px}
#aiOv .aSub{font-size:12px;color:#64748b;margin-top:3px;line-height:1.7}
#aiOv .aTag{display:inline-block;font-size:11px;font-weight:800;border-radius:20px;padding:2px 9px;white-space:nowrap}
#aiOv .aTag.u{background:#dcfce7;color:#166534}#aiOv .aTag.d{background:#fef3c7;color:#92400e}#aiOv .aTag.r{background:#fee2e2;color:#991b1b}#aiOv .aTag.t{background:#e0f2fe;color:#075985}
#aiOv .aMsg{margin:12px;padding:10px 12px;border-radius:10px;font-size:13px;font-weight:700}
#aiOv .aMsg.ok{background:#dcfce7;color:#166534}#aiOv .aMsg.bad{background:#fee2e2;color:#991b1b}
#aiOv .aTabs{display:flex;gap:6px}#aiOv .aTabs button{flex:1;border:0;border-radius:10px;padding:10px 4px;font-weight:800;background:#e2e8f0}
#aiOv .aTabs button.on{background:#1e293b;color:#fff}
#aiOv .aBan{border-radius:14px;padding:12px;margin-bottom:10px;font-size:14px;line-height:1.8}
#aiOv .aBan b.big{display:block;font-size:17px}
#aiOv .aBan.u{background:#dcfce7;color:#14532d;border:2px solid #16a34a}#aiOv .aBan.t{background:#e0f2fe;color:#0c4a6e;border:2px solid #0284c7}
#aiOv .aBan.d{background:#fef3c7;color:#78350f;border:2px solid #f59e0b}#aiOv .aBan.r{background:#fee2e2;color:#7f1d1d;border:2px solid #dc2626}
#aiOv .aPk{display:flex;gap:8px;align-items:center;margin-top:6px}
#aiOv .aPk label{flex:1;display:flex;gap:8px;align-items:center;border:1px solid #e5e9f0;border-radius:12px;padding:10px}
#aiOv .aPk label.on{background:#ecfeff;border-color:#0e7490}
#aiOv .aPk input[type=checkbox]{width:22px;height:22px;flex:0 0 22px}
#aiOv .aPk input[type=text]{width:84px;flex:0 0 84px;text-align:center;font-weight:800}
#aiOv .aRes{position:relative;overflow:hidden;text-align:center;border-radius:16px;padding:18px 12px;margin-bottom:10px;background:linear-gradient(135deg,#dcfce7,#bbf7d0);border:2px solid #16a34a;color:#14532d;animation:aiPop .6s ease both}
#aiOv .aRes svg{width:64px;height:64px}#aiOv .aRes circle{fill:#16a34a}
#aiOv .aRes path{fill:none;stroke:#fff;stroke-width:6;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:48;stroke-dashoffset:48;animation:aiTick .6s .35s ease forwards}
#aiOv .aRes b.big{display:block;font-size:19px;margin:6px 0}
#aiOv .aRes i{position:absolute;top:-10px;width:8px;height:12px;border-radius:2px;animation:aiConf 1.8s ease-out both}
@keyframes aiPop{0%{transform:scale(.6);opacity:0}60%{transform:scale(1.05);opacity:1}100%{transform:scale(1)}}
@keyframes aiTick{to{stroke-dashoffset:0}}
@keyframes aiConf{0%{transform:translateY(0) rotate(0);opacity:1}100%{transform:translateY(190px) rotate(420deg);opacity:0}}
#aiPw{position:fixed;inset:0;z-index:9100;background:#0008;display:flex;align-items:center;justify-content:center;padding:18px}
#aiPw .pBox{background:#fff;border-radius:16px;padding:16px;width:100%;max-width:380px;box-shadow:0 8px 30px #0005}
#aiPw .pBox input{width:100%;box-sizing:border-box;padding:12px;border:1.5px solid #dbe1ea;border-radius:10px;font-size:16px}
#aiPw .aBtn{border:0;border-radius:10px;padding:11px 14px;font-weight:800;font-size:14px;background:#e2e8f0}#aiPw .aBtn.grn{background:#16a34a;color:#fff}
#aiPw .aiPe{color:#b91c1c;font-weight:800;font-size:13px;min-height:18px;margin-top:6px}`;
    document.head.appendChild(s);
  }

  async function call(body) {
    if (!window.Store || !Store.idToken) throw new Error('مالک کا لاگ اِن (فائربیس) ضروری ہے');
    const tok = await Store.idToken();
    if (!tok) throw new Error('پہلے مالک کے طور پر لاگ اِن کریں');
    let r;
    try { r = await fetch(API, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + tok }, body: JSON.stringify(Object.assign({ app: APP }, body)) }); }
    catch (e) { throw new Error('انٹرنیٹ نہیں / سرور نہیں مل رہا'); }
    let j = {}; try { j = await r.json(); } catch (e) {}
    if (r.status === 403 || j.error === 'admin_only') throw new Error('سرور نے اس لاگ اِن کو ایڈمن نہیں مانا');
    if (j.ok === false || j.error) throw new Error(errText(j.reason || j.error));
    return j;
  }
  function errText(c) {
    const m = { no_aio: 'یہ AIO ID نہیں ملی', bad_id: 'AIO ID لکھیں، مثلاً AIO12345', no_pkg: 'پیکج نہیں ملا / بند ہے', no_days: 'دن لکھیں یا لائف ٹائم چنیں', has_pkg: 'اس ID پر پیکج چل رہا ہے — پہلے معطل کریں، پھر ہٹائیں', not_ready: 'سرور تیار نہیں', bad_op: 'سرور پرانا ہے — نیا worker.js اپلوڈ کریں' };
    return m[c] || String(c || 'error');
  }
  function say(t, ok) { MSG = t; OK = ok !== false; draw(); }

  /* ———— ڈیٹا ———— */
  async function loadAll() {
    let err = '';
    try {
      const p = await call({ op: 'pkglist' });
      const arr = p.list || p.packages || p.pkgs || p.items || [];
      PK = arr; try { localStorage.setItem(pkKey(), JSON.stringify(arr)); } catch (e) {}
    } catch (e) { err = '⚠️ ' + e.message + (PK.length ? ' (فون میں محفوظ پیکج فہرست دکھا رہا ہوں)' : ''); }
    try { const l = await call({ op: 'list' }); ENTS = l.list || []; } catch (e) { if (!err) err = '⚠️ ' + e.message; }
    try { const n = await call({ op: 'aionew' }); AIDS = n.list || []; } catch (e) { if (!err) err = '⚠️ ' + e.message; }
    if (err) { MSG = err; OK = false; } else if (!SEL) MSG = '';
  }

  /* اس بندے (ID) سے جڑے سب پیکج: چابی AIO ID / جی میل / موبائل، نوٹ میں ID یا نمبر، یا اسی ID والے فون نے جوڑا ہو */
  function related(a, devs) {
    const aio = a.aio, gm = String(a.gmail || '').toLowerCase().trim(), mb = m10(a.mobile), ds = (devs || []).filter(Boolean);
    return ENTS.filter(e => {
      const ks = e.keys || [], tx = (e.note || '') + ' ' + (e.label || '');
      if (ks.includes('a:' + aio)) return true;
      if (gm && ks.includes('g:' + gm)) return true;
      if (mb && ks.some(k => k.startsWith('p:') && m10(k.slice(2)) === mb)) return true;
      if (tx.toUpperCase().includes(aio)) return true;
      if (mb && tx.replace(/\D/g, '').includes(mb)) return true;
      if (ds.length && (e.claims || []).some(c => ds.includes(c.dev))) return true;
      return false;
    });
  }
  function stOne(e) {
    if (e.revoked) return { k: 'rev', ent: e, exp: e.exp };
    if (e.life) return { k: 'life', ent: e };
    if ((e.exp || 0) > Date.now()) return { k: 'act', ent: e, exp: e.exp, left: dayLeft(e.exp) };
    if ((e.exp || 0) > 0) return { k: 'exp', ent: e, exp: e.exp };
    return null;   /* ایسا کوڈ جو ابھی استعمال ہی نہیں ہوا */
  }
  function best(list) {
    const ss = list.map(stOne).filter(Boolean), g = k => ss.filter(s => s.k === k);
    return g('life')[0] || g('act').sort((p, q) => q.exp - p.exp)[0] || g('rev')[0] || g('exp').sort((p, q) => q.exp - p.exp)[0] || null;
  }
  function trial(a) { const end = (a.made || 0) + TRIAL_DAYS * 864e5, left = dayLeft(end); return left > 0 ? { k: 'trial', left, exp: end } : { k: 'tend', exp: end }; }
  const actAt = e => { const h = (e.hist || [])[(e.hist || []).length - 1]; return (h && h.at) || e.usedAt || e.redeemed || e.at || 0; };
  function chip(s) {
    switch (s.k) {
      case 'life': return ['u', '✅ ♾️ لائف ٹائم'];
      case 'act': return ['u', '✅ ' + s.left + ' دن باقی'];
      case 'person': return ['t', '🔗 بندے کے نام پیکج'];
      case 'rev': return ['r', '⛔ معطل'];
      case 'exp': return ['d', '⌛ ختم ' + dmy(s.exp)];
      case 'trial': return ['t', '🎁 ٹرائل ' + s.left + ' دن'];
      default: return ['r', '🚫 ٹرائل ختم'];
    }
  }
  /* فہرست میں کسی ID پر پیکج تبھی ✅ جب چابی اسی ID کی ہو یا اسی ID والے فون نے جوڑا ہو؛ ورنہ صرف «بندے کا پیکج» کا نشان — تاکہ ایک پیکج تین IDs پر چلتا نہ دکھے */
  function idState(a, dev) {
    const mine = ENTS.filter(e => (e.keys || []).includes('a:' + a.aio) || (dev && (e.claims || []).some(c => c.dev === dev)));
    const s = best(mine); if (s) return s;
    const p = best(related(a)); if (p) return { k: 'person', ent: p.ent };
    return trial(a);
  }

  /* ———— ایک ID کی تفصیل ———— */
  async function loadDetail(aio) {
    const r = await call({ op: 'aiolook', aio });
    const others = r.others || [];
    const ds = await Promise.all(others.slice(0, 6).map(o => call({ op: 'aiolook', aio: o.aio }).then(x => x.who.dev).catch(() => '')));
    others.forEach((o, i) => { o.dev = ds[i] || ''; });
    SEL = { who: r.who, ent: r.ent, others };
  }
  async function pick(aio, keep) {
    BUSY = true; SHARE = ''; if (!keep) { RES = null; APK = ''; SHOWPK = false; } draw();
    try { await loadDetail(aio); MSG = ''; } catch (e) { SEL = null; MSG = '⚠️ ' + e.message; OK = false; }
    finally { BUSY = false; draw(); const o = document.getElementById('aiOv'); if (o) o.scrollTo({ top: 0, behavior: 'smooth' }); }
  }
  function howMade(w, others) {
    const same = others.filter(o => o.dev && o.dev === w.dev), diff = others.filter(o => o.dev && o.dev !== w.dev), unk = others.filter(o => !o.dev);
    const L = ['🗓️ بنی: ' + dmy(w.made) + ' ' + hm(w.made) + (w.app ? ' · ایپ: ' + esc(w.app) : '')];
    if (w.replacedBy) L.push('🔁 نیا فون: اس کی جگہ نئی ID <b>' + esc(w.replacedBy) + '</b> بنی');
    if (!others.length) L.push('1️⃣ اس موبائل / جی میل کی یہی پہلی اور واحد ID ہے');
    if (same.length) L.push('📱 اسی فون پر ' + same.length + ' اور ID بھی بنی — ایپ صاف کی یا دوبارہ انسٹال کی گئی');
    if (diff.length) L.push('📲 اسی موبائل / جی میل سے ' + diff.length + ' ID دوسرے فون پر بنی');
    if (unk.length) L.push('❔ ' + unk.length + ' ID کے فون کی پہچان نہیں ملی');
    return L.join('<br>');
  }
  function runOn(e, devMap) {
    return (e.claims || []).map(c => (devMap[c.dev] ? '<b data-a="pick" data-v="' + esc(devMap[c.dev]) + '" style="color:#0e7490;text-decoration:underline;cursor:pointer">' + esc(devMap[c.dev]) + '</b>' : '📱 دوسرا فون') + ' (' + dmy(c.at) + ')').join('، ') || 'ابھی کسی فون پر جڑا نہیں';
  }
  function bannerHTML(w, own, rel, devMap) {
    const a = { aio: w.aio, made: w.made };
    const mine = rel.filter(e => (e.claims || []).some(c => c.dev === w.dev));
    let s = own ? stOne(own) : null, via = '';
    if (!s) { const m = best(mine); if (m) { s = m; via = 'claim'; } }
    const other = !s ? best(rel) : null;
    if (!s) s = trial(a);
    const e = s.ent, rows = [];
    let cls = 'u', head = '';
    if (s.k === 'life' || s.k === 'act' || s.k === 'exp' || s.k === 'rev') {
      const nm = esc(e.pkgName || (e.life ? 'لائف ٹائم' : 'پیکج')), at = actAt(e);
      if (s.k === 'rev') { cls = 'r'; head = '⛔ اس ID کا پیکج معطل ہے'; }
      else if (s.k === 'exp') { cls = 'd'; head = '⌛ پیکج ختم ہو چکا — اس وقت کوئی پیکج نہیں'; }
      else { cls = 'u'; head = '✅ اس ID پر پیکج چل رہا ہے'; }
      rows.push('📦 پیکج: <b>' + nm + '</b> · 📱 ' + (e.devices || 1) + ' فون');
      rows.push('📅 ایکٹیویٹ ہوا: <b>' + dmy(at) + '</b>' + (at ? ' ' + hm(at) : ''));
      if (e.life) rows.push('♾️ ایکسپائری: <b>لائف ٹائم</b>');
      else rows.push('⏳ ایکسپائری: <b>' + dmy(e.exp) + '</b> · ' + (s.k === 'act' ? 'باقی <b>' + s.left + ' دن</b>' : 'ختم ہوئے <b>' + Math.abs(dayLeft(e.exp)) + ' دن</b> ہو گئے'));
      if (via === 'claim') rows.push('ℹ️ یہ پیکج جی میل / کوڈ / موبائل کی چابی سے ہے اور اسی ID والے فون پر چل رہا ہے');
    } else if (s.k === 'trial') {
      cls = 't'; head = '🎁 ٹرائل چل رہا ہے — ابھی کوئی پیکج نہیں';
      rows.push('📥 ID بنی (ڈاؤن لوڈ): <b>' + dmy(w.made) + '</b>');
      rows.push('⏳ ٹرائل ختم: <b>' + dmy(s.exp) + '</b> · باقی <b>' + s.left + ' دن</b> <small>(اندازہ: ٹرائل ' + TRIAL_DAYS + ' دن مانا ہے)</small>');
    } else {
      cls = 'r'; head = '🚫 ٹرائل ختم — اس وقت کوئی پیکج ایکٹیو نہیں (صرف ڈاؤن لوڈ)';
      rows.push('📥 ID بنی: <b>' + dmy(w.made) + '</b> · ٹرائل ختم ہوا: <b>' + dmy(s.exp) + '</b>');
    }
    let extra = '';
    if (other && !own && via !== 'claim') {
      const oe = other.ent;
      extra = '<div class="aMsg bad" style="margin:8px 0 0">ℹ️ اس ID پر پیکج نہیں، لیکن اسی بندے کا «' + esc(oe.pkgName || 'پیکج') + '» (' + (oe.life ? 'لائف ٹائم' : dmy(oe.exp)) + ') سرور میں ہے — نیچے «سرور میں اس بندے کے پیکج» میں دیکھیں کہ کس ID کے فون پر چل رہا ہے</div>';
    }
    return '<div class="aBan ' + cls + '"><b class="big">' + head + '</b>' + rows.join('<br>') + '</div>' + extra;
  }

  function aioMsg(w, e) {
    if (!w || !e) return '';
    const h = (e.hist || [])[(e.hist || []).length - 1] || {};
    const L1 = ['✅ ' + (APP === 'DR' ? 'AIO POS Direct' : 'AIO POS') + ' — package activated', '', '👤 Name: ' + (w.name || e.name || ''), '🆔 AIO ID: ' + w.aio];
    if (w.mobile) L1.push('📱 Mobile: ' + aPh(w.mobile)); if (w.gmail) L1.push('✉️ Gmail: ' + w.gmail);
    L1.push('📦 Package: ' + (h.pkg || e.pkgName || ''), '📅 Activated on: ' + dmy(h.at || Date.now()), e.life ? '♾️ Valid: Lifetime' : '⏳ Valid till: ' + dmy(e.exp), '📱 Total phones: ' + (e.devices || 1));
    if (e.revoked) L1.push('⛔ Status: Suspended');
    L1.push('', 'Open AIO POS on your phone — it turns on by itself (no code needed).');
    return L1.join('\n');
  }

  function resHTML() {
    if (!RES) return '';
    const c = ['#16a34a', '#f59e0b', '#2563eb', '#dc2626', '#a855f7'];
    const conf = Array.from({ length: 16 }, (_, i) => '<i style="left:' + (4 + i * 6) + '%;background:' + c[i % 5] + ';animation-delay:' + (i % 6) * 0.12 + 's"></i>').join('');
    return '<div class="aRes">' + conf + '<svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="30"/><path d="M18 33 l9 9 l19 -20"/></svg><b class="big">' + esc(RES.title) + '</b>' + RES.lines.map(l => '<div>' + l + '</div>').join('') + '</div>';
  }
  function makeRes(title, r, extraLine) {
    if (!r || !r.ent) { RES = null; return; }
    const e = r.ent, w = r.who, at = actAt(e), left = e.life ? 0 : dayLeft(e.exp);
    RES = { title, lines: ['🆔 <b>' + esc(w.aio) + '</b> · ' + esc(w.name || ''), '📦 ' + esc(e.pkgName || ''), '📅 ایکٹیویٹ ہوا: <b>' + dmy(at) + ' ' + hm(at) + '</b>', e.life ? '♾️ ایکسپائری: <b>لائف ٹائم</b>' : '⏳ ایکسپائری: <b>' + dmy(e.exp) + '</b> · باقی <b>' + left + ' دن</b>', extraLine || '📱 گاہک کا فون خود چالو ہو جائے گا'] };
  }

  function detailHTML() {
    if (!SEL) return '';
    const w = SEL.who, e = SEL.ent, others = SEL.others || [];
    const devMap = {}; if (w.dev) devMap[w.dev] = w.aio; others.forEach(o => { if (o.dev) devMap[o.dev] = o.aio; });
    const rel = related({ aio: w.aio, gmail: w.gmail, mobile: w.mobile }, Object.keys(devMap));
    const own = e && (e.keys || []).includes('a:' + w.aio) ? e : (e || null);
    const sel = PK.find(p => p.id === APK), act = PK.filter(p => p.active !== false);
    const relHTML = rel.length ? rel.map(x => {
      const s = stOne(x), kt = (x.keys || []).map(k => k[0] === 'a' ? 'AIO ID' : k[0] === 'c' ? 'کوڈ' : k[0] === 'g' ? 'جی میل' : k[0] === 'p' ? 'موبائل' : '').filter(Boolean).filter((v, i, ar) => ar.indexOf(v) === i).join(' + ');
      const ch = s ? chip(s) : ['d', '🆕 کوڈ بنا — ابھی استعمال نہیں ہوا'];
      return '<div class="aItem"><div class="aRow" style="flex-wrap:nowrap"><b style="flex:1;min-width:0">' + esc(x.pkgName || x.label || x.name || 'پیکج') + '</b><span class="aTag ' + ch[0] + '">' + esc(ch[1]) + '</span></div><div class="aSub">🔑 چابی: ' + esc(kt || '—') + ' · 📱 ' + (x.used || 0) + '/' + (x.devices || 1) + ' فون' + (s ? '<br>📅 ایکٹیویٹ: ' + dmy(actAt(x)) + ' · ⏳ ' + (x.life ? 'لائف ٹائم' : dmy(x.exp)) : '') + '<br>📲 چل رہا ہے: ' + runOn(x, devMap) + '</div></div>';
    }).join('') : '<div class="aSub">سرور میں اس بندے کا کوئی پیکج نہیں ملا</div>';
    const othHTML = others.length ? '<div class="aItem" style="background:#fff7ed;border-color:#fdba74"><b>⚠️ اس بندے کی ' + (others.length + 1) + ' IDs ہیں</b><div class="aSub">ٹرائل بار بار لینے کے لیے نئی ID بن سکتی ہے — پیکج صرف اسی ID پر ہوتا ہے جس کے آگے ✅ ہو</div>' + others.map(o => {
      const st = idState({ aio: o.aio, gmail: w.gmail, mobile: o.mobile, made: o.made }, o.dev), ch = chip(st);
      return '<div class="aRow" style="margin-top:7px;flex-wrap:nowrap"><b data-a="pick" data-v="' + esc(o.aio) + '" style="color:#0e7490;text-decoration:underline;cursor:pointer" class="aCode">' + esc(o.aio) + '</b><span class="aSub" style="flex:1;margin:0">' + dmy(o.made) + (o.dev ? (o.dev === w.dev ? ' · اسی فون' : ' · دوسرا فون') : '') + (o.replacedBy ? ' · 🔁' + esc(o.replacedBy) : '') + '</span><span class="aTag ' + ch[0] + '">' + esc(ch[1]) + '</span>' + ((['act', 'life'].includes(st.k) || (st.k === 'person' && !o.dev)) ? '' : '<button class="aBtn red" data-a="adel" data-v="' + esc(o.aio) + '" style="padding:5px 9px">🗑️ ہٹائیں</button>') + '</div>';
    }).join('') + '</div>' : '';
    const hist = e && (e.hist || []).length ? '<div class="aSub" style="margin-top:6px">' + e.hist.slice().reverse().slice(0, 6).map(h => '• ' + dmy(h.at) + ' — ' + esc(h.pkg) + (h.price ? ' · Rs ' + esc(h.price) : '') + (h.life ? ' · ♾️' : h.exp ? ' → ' + dmy(h.exp) : '')).join('<br>') + '</div>' : '';
    return '<div class="aBox" style="border:2px solid #0e7490">' + resHTML() + bannerHTML(w, own, rel, devMap) +
      '<div style="font:900 19px/1.3 inherit">👤 ' + esc(w.name || '—') + '</div><div class="aCode" style="font-size:18px;color:#0e7490">' + esc(w.aio) + '</div>' +
      '<div class="aSub" style="font-size:14px;color:#0f172a;direction:ltr;text-align:right">📱 ' + esc(aPh(w.mobile)) + (w.gmail ? ' · ✉️ ' + esc(w.gmail) : '') + '</div>' +
      '<div class="aSub" style="color:#0f172a;margin-top:6px"><b>🧾 ID کیسے بنی؟</b><br>' + howMade(w, others) + '</div>' + hist + othHTML +
      '<h3 style="margin:14px 0 4px">📦 سرور میں اس بندے کے پیکج</h3><div class="aSub" style="margin:0 0 4px">جی میل / موبائل / کوڈ / AIO ID سے ملے سب پیکج اور وہ کن IDs کے فونز پر چل رہے ہیں</div>' + relHTML +
      '<h3 style="margin:14px 0 6px">➕ اس ID میں دن جوڑیں</h3>' +
      '<div class="aRow"><button class="aBtn grn" data-a="aadd" data-v="1" ' + (BUSY ? 'disabled' : '') + '>+1 دن</button><button class="aBtn grn" data-a="aadd" data-v="30" ' + (BUSY ? 'disabled' : '') + '>+1 مہینہ</button><button class="aBtn grn" data-a="aadd" data-v="365" ' + (BUSY ? 'disabled' : '') + '>+1 سال</button><button class="aBtn" data-a="aadd" data-v="life" ' + (BUSY ? 'disabled' : '') + '>♾️ لائف ٹائم</button></div>' +
      '<div class="aRow" style="margin-top:6px;flex-wrap:nowrap"><input type="text" id="aAddN" inputmode="numeric" maxlength="4" placeholder="دن" style="width:90px;flex:0 0 90px;text-align:center;font-weight:800"><button class="aBtn pri" data-a="aadd" data-v="n" ' + (BUSY ? 'disabled' : '') + '>➕ اتنے دن جوڑیں</button></div>' +
      '<h3 style="margin:14px 0 6px">📦 پیکج</h3>' +
      '<button class="aBtn" data-a="pktoggle" style="width:100%">' + (SHOWPK ? '▲ پیکج چھپائیں' : '▼ پیکج دیکھیں اور چنیں') + '</button>' +
      (sel ? '<div class="aMsg ok" style="margin:10px 0 0">✔️ چنا ہوا: <b>' + esc(sel.name) + '</b><br>' + (sel.life ? '♾️ لائف ٹائم' : sel.days + ' دن') + ' · 📱 ' + (sel.devices || 1) + ' فون<br>💰 ' + (PRICE[sel.id] ? 'Rs ' + esc(PRICE[sel.id]) : 'قیمت نہیں لکھی') + '</div>' : '') +
      (SHOWPK ? (act.map(p => '<div class="aPk"><label class="' + (APK === p.id ? 'on' : '') + '"><input type="checkbox" data-a="apk" data-v="' + esc(p.id) + '" ' + (APK === p.id ? 'checked' : '') + '><span style="flex:1;min-width:0"><b>' + esc(p.name) + '</b><span class="aSub" style="display:block">' + (p.life ? 'لائف ٹائم' : p.days + ' دن') + ' · ' + p.devices + ' فون</span></span></label><input type="text" inputmode="numeric" data-pr="' + esc(p.id) + '" value="' + esc(PRICE[p.id] || '') + '" placeholder="قیمت"></div>').join('') || '<div class="aSub">کوئی پیکج نہیں — نیچے «پیکج بنانا / بدلنا» سے بنائیں</div>') : '') +
      (sel ? '<div class="aRow" style="margin-top:10px"><button class="aBtn" data-a="apay" style="flex:1">💰 ادائیگی کا پیغام</button><button class="aBtn grn" data-a="aact" style="flex:1" ' + (BUSY ? 'disabled' : '') + '>✅ ایکٹیویٹ</button></div>' : '') +
      (e && (e.keys || []).includes('a:' + w.aio) ? '<div class="aRow" style="margin-top:12px"><button class="aBtn pri" data-a="ashare">📤 ایکٹیویشن کا پیغام</button>' + (e.revoked ? '<button class="aBtn" data-a="aop" data-op="unrevoke" data-id="' + esc(e.id) + '">↩️ بحال</button>' : '<button class="aBtn" data-a="aop" data-op="revoke" data-id="' + esc(e.id) + '">⛔ معطل</button>') + '<button class="aBtn" data-a="aop" data-op="reset" data-id="' + esc(e.id) + '">📱 فون صاف</button><button class="aBtn red" data-a="aop" data-op="delete" data-id="' + esc(e.id) + '">🗑️</button></div>' : '') +
      (SHARE ? '<textarea readonly style="width:100%;box-sizing:border-box;margin-top:8px;min-height:170px;border:1.5px solid #dbe1ea;border-radius:10px;padding:8px;font-size:13px;direction:ltr">' + esc(SHARE) + '</textarea><div class="aRow" style="margin-top:6px"><button class="aBtn grn" data-a="copy" data-v="' + esc(SHARE) + '">📋 کاپی</button><button class="aBtn pri" data-a="send" data-v="' + esc(SHARE) + '">📤 شیئر</button></div>' : '') +
      '<button class="aBtn" data-a="aclose" style="width:100%;margin-top:10px">↩️ بند</button></div>';
  }

  function listHTML() {
    const q = AQ.trim().toUpperCase(), cnt = {};
    AIDS.forEach(a => { [m10(a.mobile), String(a.gmail || '').toLowerCase()].filter(Boolean).forEach(k => { cnt[k] = (cnt[k] || 0) + 1; }); });
    const list = AIDS.filter(a => !q || (a.aio + ' ' + (a.name || '') + ' ' + aPh(a.mobile) + ' ' + (a.gmail || '')).toUpperCase().indexOf(q) >= 0);
    return list.slice(0, SHOW).map(a => {
      const ch = chip(idState(a)), dup = Math.max(cnt[m10(a.mobile)] || 0, cnt[String(a.gmail || '').toLowerCase()] || 0);
      return '<div class="aItem" data-a="pick" data-v="' + esc(a.aio) + '" style="cursor:pointer' + (SEL && SEL.who.aio === a.aio ? ';background:#ecfeff' : '') + '"><div class="aRow" style="flex-wrap:nowrap"><span class="aCode" style="color:#0e7490">' + esc(a.aio) + '</span><b style="flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">' + esc(a.name || '—') + (dup > 1 ? ' <small>⚠️×' + dup + '</small>' : '') + '</b><span class="aTag ' + ch[0] + '">' + esc(ch[1]) + '</span></div><div class="aSub">' + [aPh(a.mobile), a.gmail].filter(Boolean).map(esc).join(' · ') + (a.made ? ' · ' + dmy(a.made) : '') + '</div></div>';
    }).join('') + (list.length > SHOW ? '<button class="aBtn" data-a="amore" style="width:100%;margin-top:8px">⬇️ مزید دکھائیں (' + (list.length - SHOW) + ')</button>' : '') || '<div class="aSub" style="margin-top:8px">' + (BUSY ? '⏳' : 'کوئی AIO ID نہیں ملی') + '</div>';
  }
  function drawList() { const n = document.getElementById('aiList'); if (n) n.innerHTML = listHTML(); }

  function draw() {
    const o = document.getElementById('aiOv'); if (!o) return;
    const nAct = AIDS.filter(a => { const s = idState(a); return s.k === 'act' || s.k === 'life'; }).length;
    o.innerHTML = '<div class="aTop"><b>✅ AIO ID — پیکج ایکٹیو کریں</b><button class="aX" data-a="close">✕</button></div>' +
      '<div class="aBox" style="padding:8px"><div class="aTabs">' + TABS.map(([k, t]) => '<button class="' + (APP === k ? 'on' : '') + '" data-a="tab" data-v="' + k + '">' + t + '</button>').join('') + '</div></div>' +
      (MSG ? '<div class="aMsg ' + (OK ? 'ok' : 'bad') + '">' + esc(MSG) + '</div>' : '') + detailHTML() +
      '<div class="aBox"><h3>📋 سب AIO IDs (' + AIDS.length + ') <span class="aTag u">✅ ' + nAct + '</span></h3><div class="aSub" style="margin:0 0 6px">ID دبائیں ← اوپر تفصیل اور حالت ← پیکج چنیں ← ایکٹیویٹ (پاس ورڈ لگے گا)۔ ⚠️×N = اسی موبائل / جی میل کی کئی IDs۔</div>' +
      '<div class="aRow" style="flex-wrap:nowrap"><input type="text" id="aiQ" maxlength="40" value="' + esc(AQ) + '" placeholder="تلاش: نام / AIO ID / موبائل" style="direction:ltr"><button class="aBtn" data-a="aref" ' + (BUSY ? 'disabled' : '') + '>🔄</button></div><div id="aiList">' + listHTML() + '</div></div>' +
      '<div class="aBox"><button class="aBtn" data-a="oldscr" style="width:100%">🛠️ پیکج بنانا / بدلنا (پرانی سکرین)</button></div>';
  }

  /* ———— ڈویلپر پاس ورڈ — ہر تبدیلی سے پہلے ———— */
  function askPw(text) {
    return new Promise(res => {
      const m = document.createElement('div'); m.id = 'aiPw';
      m.innerHTML = '<div class="pBox"><b style="font-size:16px">🔐 ڈویلپر پاس ورڈ</b><div style="font-size:13px;color:#475569;margin:6px 0 10px;line-height:1.7">' + text + '</div><div style="display:flex;gap:6px"><input type="password" autocomplete="current-password" placeholder="پاس ورڈ"><button class="aBtn" data-p="eye" type="button">👁️</button></div><div class="aiPe"></div><div style="display:flex;gap:8px;margin-top:8px"><button class="aBtn" data-p="no" style="flex:1">منسوخ</button><button class="aBtn grn" data-p="ok" style="flex:2">✅ تصدیق</button></div></div>';
      document.body.appendChild(m);
      const inp = m.querySelector('input'); setTimeout(() => inp.focus(), 50);
      const done = v => { m.remove(); res(v); };
      inp.addEventListener('keydown', e => { if (e.key === 'Enter') m.querySelector('[data-p=ok]').click(); });
      m.addEventListener('click', async ev => {
        const t = ev.target.closest('[data-p]'); if (!t) return;
        if (t.dataset.p === 'no') return done(false);
        if (t.dataset.p === 'eye') { inp.type = inp.type === 'password' ? 'text' : 'password'; return; }
        const pw = inp.value; if (!pw) return;
        t.disabled = true; t.textContent = '⏳';
        let ok = false; try { ok = !!(window.Store && Store.ownerLogin && await Store.ownerLogin(pw)); } catch (e) {}
        if (ok) return done(true);
        t.disabled = false; t.textContent = '✅ تصدیق'; m.querySelector('.aiPe').textContent = '❌ پاس ورڈ غلط ہے'; inp.select();
      });
    });
  }
  async function guarded(text, fn) {
    if (BUSY) return;
    if (!(await askPw(text))) return;
    BUSY = true; draw();
    try { await fn(); } catch (e) { MSG = '⚠️ ' + e.message; OK = false; }
    finally { BUSY = false; draw(); const o = document.getElementById('aiOv'); if (o) o.scrollTo({ top: 0, behavior: 'smooth' }); }
  }
  async function refresh(aio) { await loadAll(); await loadDetail(aio); }
  const val = id => { const n = document.getElementById(id); return n ? n.value : ''; };

  async function onClick(ev) {
    const t = ev.target.closest('[data-a]'); if (!t) return;
    const a = t.dataset.a, v = t.dataset.v, id = t.dataset.id;
    if (a === 'close') { const o = document.getElementById('aiOv'); if (o) o.remove(); document.body.style.overflow = ''; return; }
    if (a === 'tab') {
      if (v === 'MCS') { const o = document.getElementById('aiOv'); if (o) o.remove(); document.body.style.overflow = ''; OLD('MCS'); return; }
      if (v === APP) return; APP = v; SEL = null; AIDS = []; ENTS = []; APK = ''; SHOWPK = false; RES = null; MSG = ''; loadLocal(); draw(); BUSY = true; draw(); loadAll().finally(() => { BUSY = false; draw(); }); return;
    }
    if (a === 'oldscr') { const o = document.getElementById('aiOv'); if (o) o.remove(); document.body.style.overflow = ''; window.__licBypass = true; OLD(APP); return; }
    if (a === 'aclose') { SEL = null; APK = ''; SHOWPK = false; RES = null; SHARE = ''; draw(); return; }
    if (a === 'amore') { SHOW += 40; draw(); return; }
    if (a === 'aref') { AQ = val('aiQ'); BUSY = true; draw(); try { await loadAll(); if (SEL) await loadDetail(SEL.who.aio); } catch (e) { MSG = '⚠️ ' + e.message; OK = false; } finally { BUSY = false; draw(); } return; }
    if (a === 'pick') { pick(v); return; }
    if (a === 'pktoggle') { SHOWPK = !SHOWPK; draw(); return; }
    if (a === 'apk') { APK = APK === v ? '' : v; SHARE = ''; draw(); return; }
    if (a === 'copy') { let ok = false; try { await navigator.clipboard.writeText(v); ok = true; } catch (e) { try { const ta = document.createElement('textarea'); ta.value = v; ta.setAttribute('readonly', ''); ta.style.cssText = 'position:fixed;opacity:0'; document.body.appendChild(ta); ta.select(); ok = document.execCommand('copy'); ta.remove(); } catch (e2) {} } say(ok ? '📋 کاپی ہو گیا' : '⚠️ کاپی نہیں ہوا', ok); return; }
    if (a === 'send') { try { if (navigator.share) { await navigator.share({ text: v }); } else { window.open('https://wa.me/?text=' + encodeURIComponent(v), '_blank'); } } catch (e) {} return; }
    if (!SEL) return;
    const w = SEL.who, name = (w.name || '');
    if (a === 'ashare') { SHARE = aioMsg(w, SEL.ent); draw(); return; }
    if (a === 'apay') {
      const p = PK.find(x => x.id === APK); if (!p) return;
      SHARE = [(APP === 'DR' ? 'AIO POS Direct — ' : 'AIO POS — ') + p.name, '🆔 AIO ID: ' + w.aio, '👤 ' + name, (p.life ? '♾️ Lifetime' : '⏳ ' + p.days + ' days') + ' · 📱 ' + p.devices + ' phone(s)', PRICE[p.id] ? '💰 Amount: Rs ' + PRICE[p.id] : '', '', 'Please send the payment and a screenshot. Your package will be switched on right after — no code needed.'].filter((x, i) => x || i === 5).join('\n');
      draw(); return;
    }
    if (a === 'aadd') {
      const life = v === 'life', days = life ? 0 : v === 'n' ? (parseInt(pn(val('aAddN')), 10) || 0) : parseInt(v, 10);
      if (!life && !(days > 0)) { say('دن کی تعداد لکھیں', false); return; }
      guarded('<b>' + esc(w.aio) + '</b> (' + esc(name) + ') میں ' + (life ? '<b>لائف ٹائم</b> دینا' : '<b>' + days + ' دن</b> جوڑنا') + ' ہے۔ پاس ورڈ لکھیں:', async () => {
        const r0 = await call({ op: 'aioadd', aio: w.aio, days, life }); await refresh(w.aio);
        makeRes(life ? '♾️ لائف ٹائم مل گیا' : '✅ ' + days + ' دن جوڑ دیے', SEL && SEL.ent ? SEL : r0, '📱 گاہک کا فون خود اپڈیٹ ہو جائے گا'); MSG = '';
      });
      return;
    }
    if (a === 'aact') {
      const p = PK.find(x => x.id === APK); if (!p) return;
      guarded('<b>' + esc(w.aio) + '</b> (' + esc(name) + ') پر <b>«' + esc(p.name) + '»</b>' + (PRICE[p.id] ? ' (Rs ' + esc(PRICE[p.id]) + ')' : '') + ' ایکٹیو ہو گا۔ پاس ورڈ لکھیں:', async () => {
        const r = await call({ op: 'aiogrant', aio: w.aio, pkgId: p.id, price: PRICE[p.id] || '' });
        APK = ''; SHOWPK = false; SHARE = aioMsg(r.who, r.ent); await refresh(w.aio); makeRes('✅ پیکج ایکٹیو ہو گیا', SEL && SEL.ent ? SEL : r); MSG = '';
      });
      return;
    }
    if (a === 'adel') {
      guarded('<b>' + esc(v) + '</b> فالتو ID ہٹانی ہے — فہرست سے غائب ہو جائے گی۔ اس کا ریکارڈ اندر رہتا ہے تاکہ اسی فون کو نئی ID / نیا مفت ٹرائل نہ ملے۔ پاس ورڈ لکھیں:', async () => {
        await call({ op: 'aiodel', aio: v });
        await loadAll(); if (v === w.aio) { SEL = null; } else { await loadDetail(w.aio); }
        RES = null; MSG = '✅ ' + v + ' ہٹا دی گئی'; OK = true;
      });
      return;
    }
    if (a === 'aop') {
      const op = t.dataset.op, txt = { revoke: 'معطل کرنا (فون 30 منٹ میں بند ہو جائے گا)', unrevoke: 'بحال کرنا', reset: 'فون صاف کرنا (گاہک کا فون خود دوبارہ جڑ جائے گا)', delete: 'ہمیشہ کے لیے حذف کرنا — فون بند ہو جائے گا' }[op] || op;
      guarded('<b>' + esc(w.aio) + '</b> (' + esc(name) + ') کا پیکج: <b>' + txt + '</b>۔ پاس ورڈ لکھیں:', async () => {
        await call({ op, id }); await refresh(w.aio); RES = null; MSG = '✅ ہو گیا'; OK = true;
      });
      return;
    }
  }

  window.licOpen = function (app) {
    if (app === 'MCS') { window.__licBypass = false; return OLD(app); }
    if (!window.Store || !Store.isOwner || !Store.isOwner()) { try { toast('🔒'); } catch (e) {} return; }
    window.__licBypass = false;
    const old = document.getElementById('licOv'); if (old) old.remove();
    APP = app === 'DR' ? 'DR' : 'AIO'; try { localStorage.setItem('lic_app', APP); } catch (e) {}
    SEL = null; APK = ''; SHOWPK = false; RES = null; SHARE = ''; MSG = ''; AQ = ''; SHOW = 40; loadLocal();
    css();
    let o = document.getElementById('aiOv'); if (o) o.remove();
    o = document.createElement('div'); o.id = 'aiOv';
    o.addEventListener('click', onClick);
    o.addEventListener('input', ev => {
      const t = ev.target; if (!t) return;
      if (t.dataset && t.dataset.pr) { savePrice(t.dataset.pr, t.value); }
      if (t.id === 'aiQ') { AQ = t.value; SHOW = 40; drawList(); }
    });
    document.body.appendChild(o); document.body.style.overflow = 'hidden';
    BUSY = true; draw();
    loadAll().finally(() => { BUSY = false; draw(); });
  };
  /* پرانی (MCS) سکرین کے اندر AIO Direct / AIO POS کے ٹیب دبیں تو نئی سکرین کھلے — پرانی سکرین سے آئے ہوں (پیکج سیٹنگ) تو نہیں */
  document.addEventListener('click', ev => {
    const t = ev.target && ev.target.closest && ev.target.closest('#licOv [data-l="app"]');
    if (!t || window.__licBypass || t.dataset.v === 'MCS') return;
    ev.stopPropagation(); ev.preventDefault();
    const o = document.getElementById('licOv'); if (o) o.remove(); document.body.style.overflow = '';
    window.licOpen(t.dataset.v);
  }, true);
})();
