/* HD2111SA142 (مالک کا حکم): مالک کی تفصیل میں جڑے ملازم کی سرخ کیپسول لائنیں۔
   HD2011FR138 (مالک کا حکم): فہرست کے اوپر چار بٹن — ✅ پیکج والی IDs (دن باقی)، 🎁 ٹرائل پر (دن باقی)، 🗂️ ٹرائل ختم / فالتو (ڈیلیٹ + پیغام)، 📥 کل ڈاؤن لوڈ؛ پیغام کا بٹن صرف اکیلی ID پر، فالتو (ڈپلیکیٹ) پر صرف ڈیلیٹ۔
   HD2011FR135 (مالک کا حکم — الجھن ختم): فہرست اور تفصیل ایک ہی حساب سے — ہر ID کی ایک لائن «ID + کیفیت»؛ جس ID پر پیکج وہ ✅ + دن باقی؛ ٹرائل والی 🎁 + دن باقی؛ ٹرائل ختم 🚫؛ اسی بندے کی فالتو ID پر ہٹانے کا بٹن؛ ٹرائل ختم بندے کو واٹس ایپ پیغام؛ سرخ ڈبہ صرف تب جب بندے کا کوئی پیکج ہی نہ ہو۔
   PBT Help Desk — HD2011FR133 (مالک کا حکم): AIO ID کی نئی سکرین — ہر ID کی حالت (پیکج / ٹرائل / ختم)، ID کیسے بنی، اسی بندے کی باقی IDs،
   سرور میں اس بندے کے سب پیکج (کون سی ID کے فون پر چل رہا ہے)، پیکج کی فہرست چھپی ہوئی (چیک باکس)، ہر تبدیلی پر ڈویلپر پاس ورڈ، ایکٹیویٹ پر اینیمیشن۔
   lic.js کے بعد لگتی ہے؛ My City Shines کی سکرین اور پیکج بنانے / بدلنے کی پرانی سکرین جوں کی توں۔ لاگ اِن کا طریقہ، سرور اور قیمتوں کی کلیدیں وہی۔ */
(function () {
  'use strict';
  const OLD = window.licOpen;
  if (typeof OLD !== 'function') return;
  const API = 'https://aio-pos-verify.pbtcodelabs.workers.dev/entadmin';
  const TD = () => APP === 'MD' ? 3 : 7;   /* ⚠️ مفت ٹرائل کے دن — ID بننے کی تاریخ سے؛ MD2311MO028: مدرسہ 3 دن */
  const TABS = [['MCS', 'My City Shines'], ['SM', 'سبزی منڈی'], ['MD', 'مدرسہ'], ['DR', 'AIO Direct'], ['AIO', 'AIO POS']];   /* MD2311MO028 (مالک کا حکم): مدرسہ سافٹ ویئر بھی MD ID پر — سبزی منڈی جیسا */   /* HD2211SU163 (مالک کا حکم): سبزی منڈی بھی SM ID پر — AIO Direct جیسا */
  const IDN = () => APP === 'SM' ? 'SM ID' : APP === 'MD' ? 'MD ID' : 'AIO ID';
  let APP = 'AIO', AIDS = [], ENTS = [], PK = [], PRICE = {}, AQ = '', SHOW = 40, SEL = null, APK = '', SHOWPK = false, BUSY = false, MSG = '', OK = true, RES = null, SHARE = '', GRP = {}, FIL = 'su', ST = {};
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const p2 = n => String(n).padStart(2, '0');
  const dmy = ts => { if (!ts) return '—'; const d = new Date(ts); return p2(d.getDate()) + '/' + p2(d.getMonth() + 1) + '/' + d.getFullYear(); };
  const hm = ts => { if (!ts) return ''; const d = new Date(ts); return p2(d.getHours()) + ':' + p2(d.getMinutes()); };
  const pn = v => String(v == null ? '' : v).replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d)).replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d));
  const m10 = v => String(v || '').replace(/\D/g, '').slice(-10);
  const aPh = m => String(m || '').replace(/^92/, '0');
  const dayLeft = ts => Math.ceil((ts - Date.now()) / 864e5);
  const pkKey = () => APP === 'AIO' ? 'lic_pk' : 'lic_pk_' + APP;

  /* HD2211SU165 (مالک کا حکم): پیغام کب بھیجا — ٹرائل / ٹرائل ختم والے کو واٹس ایپ پیغام دبانے پر تاریخ محفوظ؛ فہرست اور تفصیل میں «📨 پیغام بھیجا جا چکا: تاریخ»۔
     وہی خانہ جو My City Shines میں (lic_sendlog + کلاؤڈ licSendLog)، کنجی = ایپ|ID */
  let SLOG = {};
  function slLoad() {
    try { SLOG = JSON.parse(localStorage.getItem('lic_sendlog') || '{}') || {}; } catch (e) { SLOG = {}; }
    try { const c = window.CFG || (typeof CFG !== 'undefined' ? CFG : null); if (c && c.licSendLog) for (const k in c.licSendLog) { const a = SLOG[k] || [], b = Array.isArray(c.licSendLog[k]) ? c.licSendLog[k] : []; SLOG[k] = [...new Set(a.concat(b))].sort((x, y) => x - y).slice(-60); } } catch (e) {}
  }
  function slAdd(k) {
    slLoad(); (SLOG[k] = SLOG[k] || []).push(Date.now()); SLOG[k] = SLOG[k].slice(-60);
    try { localStorage.setItem('lic_sendlog', JSON.stringify(SLOG)); } catch (e) {}
    try { if (window.Store && Store.setCfg) Store.setCfg({ licSendLog: SLOG }); } catch (e) {}
  }
  const d0 = t => { const d = new Date(t); d.setHours(0, 0, 0, 0); return d.getTime(); };
  /* HD2311MO170 (مالک کا حکم): گاہک نے ایپ میں جو پیکج چنا (سرور want) — فہرست میں نظر، تفصیل کھولیں تو پہلے سے چنا */
  function wantTag(w){ if(!w || !w.pkg) return ''; const p = PK.find(x => x.id === w.pkg), pr = PRICE[w.pkg] || (p && p.price) || '';
    return '<div class="aSub" style="margin-top:3px;font-weight:800;color:#7c2d12;background:#ffedd5;border-radius:8px;padding:2px 8px;display:inline-block">📩 گاہک نے مانگا: ' + esc(p ? p.name : w.pkg) + (pr ? ' · ' + Number(String(pr).replace(/,/g, '')).toLocaleString('en-US') + ' روپے' : '') + (w.at ? ' · ' + dmy(w.at) : '') + '</div>'; }
  function slTag(aio, full) {
    const a = SLOG[APP + '|' + aio] || [];
    if (!a.length) return '<div class="aSub" style="margin-top:3px;color:#64748b">📭 ابھی تک پیغام نہیں بھیجا</div>';
    const last = a[a.length - 1], d = Math.round((d0(Date.now()) - d0(last)) / 864e5);
    return '<div class="aSub" style="margin-top:3px;font-weight:800;color:' + (d <= 2 ? '#b45309' : '#15803d') + '">📨 پیغام بھیجا جا چکا: <b>' + dmy(last) + '</b> ' + hm(last) + ' (' + (d <= 0 ? 'آج' : d + ' دن پہلے') + ')' + (a.length > 1 ? ' · کل ' + a.length + ' بار' : '') + '</div>'
      + (full && a.length > 1 ? '<div class="aSub">' + a.slice().reverse().slice(0, 6).map((t, i) => (a.length - i) + '. ' + dmy(t) + ' ' + hm(t)).join(' · ') + '</div>' : '');
  }
  /* HD2211SU167 (مالک کا حکم — واٹس ایپ نمبر بند نہ ہو): ہر پیغام میں کم از کم ڈھائی منٹ کا وقفہ، اس فون سے روزانہ زیادہ سے زیادہ 5 —
     My City Shines کی دعوتی فہرست کے ساتھ ایک ہی گنتی (pbtWaSafeLog، اسی ویب سائٹ پر) */
  function waSafe() {
    let a = []; try { a = (JSON.parse(localStorage.getItem('pbtWaSafeLog') || '[]') || []).filter(t => t > Date.now() - 3 * 864e5); } catch (e) {}
    const last = a.length ? a[a.length - 1] : 0, w = last + 150e3 - Date.now(), t0 = new Date(); t0.setHours(0, 0, 0, 0);
    if (w > 0) { const s = Math.ceil(w / 1000); alert('⏳ احتیاط: اگلا پیغام ' + Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0') + ' منٹ بعد بھیجیں — واٹس ایپ نمبر محفوظ رہے'); return false; }
    if (a.filter(t => t >= t0.getTime()).length >= 5) { alert('✋ آج اس فون سے 5 پیغام پورے — باقی کل ان شاء اللہ'); return false; }
    a.push(Date.now()); try { localStorage.setItem('pbtWaSafeLog', JSON.stringify(a)); } catch (e) {}
    return true;
  }
  function loadLocal() {
    slLoad();
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
html:not([lang=en]) #aiOv,html:not([lang=en]) #aiOv :is(button,input,textarea,select,b,span,div,a,label,small,h3){font-family:Noori,'Jameel Noori Nastaleeq','Noto Nastaliq Urdu',serif}   /* HD2211SU166 (مالک کا حکم): پورا پینل نوری نستعلیق — ایریل نہیں */
#aiOv .aCode{font-family:monospace !important;font-size:17px;font-weight:900;letter-spacing:1px;direction:ltr;unicode-bidi:plaintext}
#aiOv .aItem{border:1px solid #e5e9f0;border-radius:12px;padding:10px;margin-top:8px}
#aiOv .aSub{font-size:12px;color:#64748b;margin-top:3px;line-height:1.7}
#aiOv .aBtn{padding:6px 10px;font-size:12px;border-radius:8px}#aiOv .aCap{display:flex;gap:6px;align-items:center;justify-content:space-between;flex-wrap:wrap;border-radius:14px;padding:4px 10px;margin-top:4px;font-size:12px;font-weight:700;line-height:1.5}#aiOv .aCap.u{background:#dcfce7;color:#166534}#aiOv .aCap.t{background:#e0f2fe;color:#075985}#aiOv .aCap.d{background:#f1f5f9;color:#475569}#aiOv .aCap.r{background:#fee2e2;color:#991b1b}#aiOv .aStf{background:#fee2e2;border:1.5px solid #fca5a5;border-radius:999px;padding:3px 10px;margin-top:4px;color:#991b1b;font-size:12px;font-weight:800;line-height:1.7}#aiOv .aStf .aCode{font-size:13px;color:#991b1b}#aiOv .aTag{display:inline-block;font-size:11px;font-weight:800;border-radius:20px;padding:2px 9px;white-space:nowrap}
#aiOv .aTag.u{background:#dcfce7;color:#166534}#aiOv .aTag.d{background:#fef3c7;color:#92400e}#aiOv .aTag.r{background:#fee2e2;color:#991b1b}#aiOv .aTag.t{background:#e0f2fe;color:#075985}
#aiOv .aMsg{margin:12px;padding:10px 12px;border-radius:10px;font-size:13px;font-weight:700}
#aiOv .aMsg.ok{background:#dcfce7;color:#166534}#aiOv .aMsg.bad{background:#fee2e2;color:#991b1b}
#aiOv .aTabs{display:flex;gap:6px}#aiOv .aTabs button{flex:1;border:0;border-radius:10px;padding:10px 4px;font-weight:800;background:#e2e8f0}
#aiOv .aTabs button.on{background:#1e293b;color:#fff}
#aiOv .aFil{display:flex;gap:4px;margin:0 0 4px}#aiOv .aFil button{flex:1;border:0;border-radius:8px;padding:5px 2px;font-weight:800;font-size:12px;background:#e2e8f0;color:#0f172a;line-height:1.3;white-space:nowrap}#aiOv .aFil button b{font-size:12px;margin-inline-start:3px}#aiOv .aFil button.on{background:#1e293b;color:#fff}#aiOv .aTop{padding:7px 12px;font-size:14px}#aiOv .aBox{margin:5px;padding:7px;border-radius:10px}#aiOv .aMsg{margin:5px;padding:6px 9px;font-size:12px}#aiOv .aTabs{gap:4px}#aiOv .aTabs button{padding:5px 2px;font-size:12px;border-radius:8px}#aiOv .aItem{padding:5px 8px;margin-top:4px;border-radius:9px}#aiOv .aSub{margin-top:1px;line-height:1.45}#aiOv input[type=text]{padding:6px 9px;font-size:13px}#aiOv .aRow{gap:5px}#aiOv .aStfL{font-size:11px;color:#991b1b;font-weight:700;margin-top:1px;direction:ltr;text-align:right}
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
      arr.forEach(p => { if (p.price && !PRICE[p.id]) PRICE[p.id] = String(p.price); });   /* HD2211SU163: سبزی منڈی کے پیکجوں کی پہلی قیمت سرور سے (پرانے ریٹ)؛ بدلیں تو آپ کی والی */
    } catch (e) { err = '⚠️ ' + e.message + (PK.length ? ' (فون میں محفوظ پیکج فہرست دکھا رہا ہوں)' : ''); }
    try { const l = await call({ op: 'list' }); ENTS = l.list || []; } catch (e) { if (!err) err = '⚠️ ' + e.message; }
    try { const n = await call({ op: 'aionew' }); AIDS = n.list || []; buildGroups(); } catch (e) { if (!err) err = '⚠️ ' + e.message; }
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
  function trial(a) { const end = (a.made || 0) + TD() * 864e5, left = dayLeft(end); return left > 0 ? { k: 'trial', left, exp: end } : { k: 'tend', exp: end }; }
  const actAt = e => { const h = (e.hist || [])[(e.hist || []).length - 1]; return (h && h.at) || e.usedAt || e.redeemed || e.at || 0; };
  const live = s => !!s && (s.k === 'act' || s.k === 'life');
  function chip(s) {
    switch (s.k) {
      case 'life': return ['u', '✅ ♾️ لائف ٹائم'];
      case 'act': return [s.left <= 7 ? 'r' : s.left <= 15 ? 'd' : 'u', (s.left <= 15 ? '⚠️ ' : '✅ ') + s.left + ' دن باقی'];   /* HD2211SU163: 15 دن سے کم پیلا، 7 سے کم لال */
      case 'rev': return ['r', '⛔ معطل'];
      case 'exp': return ['d', '⌛ ختم ' + dmy(s.exp)];
      case 'trial': return ['t', '🎁 ٹرائل ' + s.left + ' دن باقی'];
      default: return s.extra ? ['d', '🗂️ فالتو — ٹرائل ختم'] : ['r', '🚫 ٹرائل ختم'];
    }
  }
  /* ایک ہی بندے (وہی موبائل یا وہی جی میل) کی IDs کا گروپ — نئی ID سب سے پہلے */
  function buildGroups() {
    const par = {}, seen = {}, find = x => { while (par[x] !== x) { par[x] = par[par[x]]; x = par[x]; } return x; };
    AIDS.forEach(a => { par[a.aio] = a.aio; });
    AIDS.forEach(a => {
      const ks = []; if (m10(a.mobile).length >= 7) ks.push('m' + m10(a.mobile)); const g = String(a.gmail || '').toLowerCase().trim(); if (g) ks.push('g' + g);
      ks.forEach(k => { if (seen[k]) { par[find(a.aio)] = find(seen[k]); } else seen[k] = a.aio; });
    });
    const by = {}, order = [];
    AIDS.forEach(a => { const r = find(a.aio); if (!by[r]) { by[r] = []; order.push(r); } by[r].push(a); });
    GRP = {}; const out = [];
    order.forEach(r => { const g = by[r].slice().sort((p, q) => (q.made || 0) - (p.made || 0)); g.forEach(x => { GRP[x.aio] = g; out.push(x); }); });
    AIDS = out;
  }
  const ownEnts = aio => ENTS.filter(e => (e.keys || []).includes('a:' + aio));
  /* ایک ID کی کیفیت — فہرست اور تفصیل دونوں یہی استعمال کرتی ہیں:
     ۱) اسی ID کا اپنا پیکج  ۲) بندے کا پیکج (جی میل / موبائل کی چابی) — اس بندے کی ایک ہی ID پر گنا جاتا ہے (جس کا اپنا پیکج نہ ہو تو سب سے نئی ID)  ۳) ٹرائل (ID بننے سے ۷ دن) / ٹرائل ختم؛
     باقی IDs جب کہ بندے کا پیکج کہیں اور چل رہا ہو → «فالتو» */
  function idState(a, dev) {
    const mine = ENTS.filter(e => (e.keys || []).includes('a:' + a.aio) || (dev && (e.claims || []).some(c => c.dev === dev)));
    const s = best(mine); if (s) return s;
    const g = GRP[a.aio] || [a], pk = best(related(a));
    const sib = g.filter(x => x.aio !== a.aio).map(x => best(ownEnts(x.aio)));
    if (pk && !sib.some(Boolean) && g[0].aio === a.aio) return Object.assign({}, pk, { via: 'person' });
    const t = trial(a); if (sib.some(live) || live(pk)) t.extra = true;
    return t;
  }
  const waNum = m => { const d = String(m || '').replace(/\D/g, ''); return d.startsWith('92') ? d : d.startsWith('0') ? '92' + d.slice(1) : d.length === 10 ? '92' + d : d; };
  function trialMsg(a) {
    const t = a && a.made ? trial(a) : null;
    if (APP === 'MD') return t && t.k === 'trial'
      ? ['السلام علیکم' + (a.name ? ' ' + a.name : '') + '! 🌹', '', 'امید ہے مدرسہ سافٹ ویئر (جامعہ مینجمنٹ) آپ کو پسند آ رہا ہے۔ کوئی مشورہ یا مشکل ہو تو ضرور بتائیں۔', '', '⏳ آپ کے مفت ٹرائل کے ' + t.left + ' دن باقی ہیں۔', '📦 پیکج: ایک موبائل — 500 روپے مہینہ یا 5,000 روپے سال؛ دو موبائل (منتظم + استاد، والدین کا لنک شامل) — 1,000 روپے مہینہ یا 10,000 روپے سال۔', 'پیکج لگوانا ہو تو اسی پیغام کا جواب دیں — آپ کی MD ID پر لگ جائے گا، کوئی کوڈ نہیں۔', '', 'جزاک اللہ 🙏'].join('\n')
      : ['السلام علیکم' + (a && a.name ? ' ' + a.name : '') + '! 🌹', '', 'مدرسہ سافٹ ویئر کا آپ کا مفت ٹرائل ختم ہو چکا ہے۔', '📦 پیکج: ایک موبائل — 500 روپے مہینہ یا 5,000 روپے سال؛ دو موبائل (منتظم + استاد، والدین کا لنک شامل) — 1,000 روپے مہینہ یا 10,000 روپے سال۔', 'جاری رکھنے کے لیے اسی پیغام کا جواب دیں — آپ کی MD ID پر پیکج لگ جائے گا اور ایپ خود چالو ہو جائے گی۔', '', 'جزاک اللہ 🙏'].join('\n');
    if (APP === 'SM') return t && t.k === 'trial'
      ? ['السلام علیکم' + (a.name ? ' ' + a.name + ' صاحب' : '') + '! 🌹', '', 'امید ہے سبزی منڈی ایپ آپ کو پسند آ رہی ہے۔ کوئی مشورہ یا مشکل ہو تو ضرور بتائیں۔', '', '⏳ آپ کے مفت ٹرائل کے ' + t.left + ' دن باقی ہیں۔', 'ایپ لگاتار چلانے کے لیے پیکج لگوانا ہو تو اسی پیغام کا جواب دیں — آپ کی SM ID پر پیکج لگا دیا جائے گا، کوئی کوڈ نہیں۔', '', 'جزاک اللہ 🙏'].join('\n')
      : ['السلام علیکم' + (a && a.name ? ' ' + a.name + ' صاحب' : '') + '! 🌹', '', 'سبزی منڈی ایپ کا آپ کا مفت ٹرائل ختم ہو چکا ہے۔', 'ایپ جاری رکھنے کے لیے پیکج لگوائیں — اسی پیغام کا جواب دیں، آپ کی SM ID پر پیکج لگا دیا جائے گا اور ایپ خود چالو ہو جائے گی۔', '', 'جزاک اللہ 🙏'].join('\n');
    if (t && t.k === 'trial') {   /* ٹرائل چل رہا ہے — فیڈبیک + پیکج کی دعوت */
      return ['Hello' + (a.name ? ' ' + a.name : '') + '! 👋', '', 'We hope you are enjoying AIO POS.',
        'Please let us know if you have any new ideas or suggestions — we would love to hear from you.', '',
        'Your free trial has ' + t.left + ' day' + (t.left === 1 ? '' : 's') + ' left.',
        'If you would like to activate a subscription package to use AIO POS seamlessly and continuously, we are happy to help.', '', 'Thank you! 🙏'].join('\n');
    }
    return ['Hello' + (a && a.name ? ' ' + a.name : '') + '! 👋', '', 'Welcome to the new horizon of digital business with AIO POS.',
      'Your free trial has ended. To continue your smooth AIO POS experience, please select a package from the Google Play Store and keep using it continuously.', '', 'Thank you! 🙏'].join('\n');
  }

  /* ———— ایک ID کی تفصیل ———— */
  async function loadDetail(aio) {
    const r = await call({ op: 'aiolook', aio });
    const others = r.others || [];
    const ds = await Promise.all(others.slice(0, 6).map(o => call({ op: 'aiolook', aio: o.aio }).then(x => x.who.dev).catch(() => '')));
    others.forEach((o, i) => { o.dev = ds[i] || ''; });
    SEL = { who: r.who, ent: r.ent, others, staff: r.staff || [], devmap: {} };
    if (r.who && r.who.want && r.who.want.pkg && PK.some(x => x.id === r.who.want.pkg) && !APK) { APK = r.who.want.pkg; SHOWPK = true; }
    try {   /* HD2111SA144: پیکج پر جڑے فونز کے نام / موبائل / ID */
      const devs = []; related({ aio: r.who.aio, gmail: r.who.gmail, mobile: r.who.mobile }, [r.who.dev]).forEach(x => (Array.isArray(x.claims) ? x.claims : []).forEach(c => { if (c && c.dev && devs.indexOf(c.dev) < 0) devs.push(c.dev); }));
      if (devs.length) { const r2 = await call({ op: 'aiolook', aio, devs }); SEL.devmap = r2.devmap || {}; }
    } catch (e) {}
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
    const a = { aio: w.aio, made: w.made, mobile: w.mobile, gmail: w.gmail, name: w.name };
    let s = own ? stOne(own) : null;
    if (!s) s = idState(a, w.dev);
    const own1 = !!(own && stOne(own)), e = s.ent, rows = [];
    let cls = 'u', head = '', btn = '';
    if (s.k === 'life' || s.k === 'act' || s.k === 'exp' || s.k === 'rev') {
      const nm = esc(e.pkgName || (e.life ? 'لائف ٹائم' : 'پیکج')), at = actAt(e);
      if (s.k === 'rev') { cls = 'r'; head = '⛔ اس ID کا پیکج معطل ہے'; }
      else if (s.k === 'exp') { cls = 'd'; head = '⌛ پیکج ختم ہو چکا'; }
      else { cls = 'u'; head = '✅ پیکج چل رہا ہے'; }
      rows.push('📦 پیکج: <b>' + nm + '</b> · 📱 ' + (e.devices || 1) + ' فون');
      rows.push('📅 ایکٹیویٹ ہوا: <b>' + dmy(at) + '</b>' + (at ? ' ' + hm(at) : ''));
      if (e.life) rows.push('♾️ ایکسپائری: <b>لائف ٹائم</b>');
      else rows.push('⏳ ایکسپائری: <b>' + dmy(e.exp) + '</b> · ' + (s.k === 'act' ? 'باقی <b>' + s.left + ' دن</b>' : 'ختم ہوئے <b>' + Math.abs(dayLeft(e.exp)) + ' دن</b> ہو گئے'));
      if (!own1) rows.push('ℹ️ یہ پیکج اس بندے کی جی میل / موبائل کی چابی سے ہے');
    } else if (s.k === 'trial') {
      cls = 't'; head = '🎁 ٹرائل چل رہا ہے — ' + s.left + ' دن باقی';
      rows.push('📥 ڈاؤن لوڈ (ID بنی): <b>' + dmy(w.made) + '</b> · ٹرائل ختم ہو گا: <b>' + dmy(s.exp) + '</b> <small>(ٹرائل ' + TD() + ' دن)</small>');
      btn = '<div class="aRow" style="margin-top:8px"><button class="aBtn grn" data-a="trialmsg" data-v="' + esc(w.aio) + '">💬 ٹرائل کا پیغام بنائیں</button></div>';
    } else if (s.extra) {
      cls = 'd'; head = '🗂️ فالتو ID — اس بندے کا پیکج دوسری ID پر چل رہا ہے';
      rows.push('📥 ڈاؤن لوڈ: <b>' + dmy(w.made) + '</b> · ٹرائل ختم ہوا: <b>' + dmy(s.exp) + '</b>');
      btn = '<div class="aRow" style="margin-top:8px"><button class="aBtn red" data-a="adel" data-v="' + esc(w.aio) + '">🗑️ یہ فالتو ID ہٹائیں</button></div>';
    } else {
      cls = 'r'; head = '🚫 ٹرائل ختم — پیکج نہیں';
      rows.push('📥 ڈاؤن لوڈ: <b>' + dmy(w.made) + '</b> · ٹرائل ختم ہوا: <b>' + dmy(s.exp) + '</b>');
      btn = '<div class="aRow" style="margin-top:8px"><button class="aBtn grn" data-a="trialmsg" data-v="' + esc(w.aio) + '">💬 واٹس ایپ پر پیغام</button><button class="aBtn red" data-a="adel" data-v="' + esc(w.aio) + '">🗑️ ہٹائیں</button></div>';
    }
    return '<div class="aBan ' + cls + '"><b class="big">' + head + '</b>' + rows.join('<br>') + btn + '</div>';
  }

  function aioMsg(w, e) {
    if (!w || !e) return '';
    const h = (e.hist || [])[(e.hist || []).length - 1] || {};
    if (APP === 'MD') return ['✅ مدرسہ سافٹ ویئر — آپ کا پیکج چالو ہو گیا', '', '🕌 ' + (w.name || e.name || ''), '🆔 MD ID: ' + w.aio, w.mobile ? '📱 موبائل: ' + aPh(w.mobile) : '', '📦 پیکج: ' + (h.pkg || e.pkgName || ''), '📅 شروع: ' + dmy(h.at || Date.now()), e.life ? '♾️ لائف ٹائم' : '⏳ ختم: ' + dmy(e.exp), e.revoked ? '⛔ معطل' : '', '', 'اپنے فون پر مدرسہ ایپ کھولیں — پیکج خود لگ جائے گا، کوئی کوڈ نہیں۔'].filter((x, i) => x || i === 1 || i === 9).join('\n');
    if (APP === 'SM') return ['✅ سبزی منڈی — آپ کا پیکج چالو ہو گیا', '', '👤 نام: ' + (w.name || e.name || ''), '🆔 SM ID: ' + w.aio, w.mobile ? '📱 موبائل: ' + aPh(w.mobile) : '', '📦 پیکج: ' + (h.pkg || e.pkgName || ''), '📅 شروع: ' + dmy(h.at || Date.now()), e.life ? '♾️ لائف ٹائم' : '⏳ ختم: ' + dmy(e.exp), e.revoked ? '⛔ معطل' : '', '', 'اپنے فون پر سبزی منڈی ایپ کھولیں — پیکج خود لگ جائے گا، کوئی کوڈ نہیں۔'].filter((x, i) => x || i === 1 || i === 9).join('\n');
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

  /* HD2111SA142 (مالک کا حکم): مالک کی تفصیل میں اس کے جڑے ملازم — ہر ملازم کی ایک سرخ کیپسول لائن (نام + موبائل + ID)؛ فہرست میں ملازم کی ID پھر بھی نہیں */
  const NUMW = ['ایک', 'دو', 'تین', 'چار', 'پانچ', 'چھ', 'سات', 'آٹھ', 'نو', 'دس'];
  function stfHTML(list) {
    if (!list.length) return '';
    return '<div class="aSub" style="color:#991b1b;font-weight:800;margin-top:8px">👥 اس مالک کے ساتھ جڑے ملازم: ' + list.length + '</div>' + list.map((x, i) =>
      '<div class="aStf">👷 ملازم ' + (NUMW[i] || (i + 1)) + ': ' + esc(x.name || '—') + '<br><span style="direction:ltr;unicode-bidi:plaintext">📱 ' + esc(aPh(x.mobile) || '—') + '</span> · 🆔 <span class="aCode">' + esc(x.aio) + '</span></div>').join('');
  }
  /* HD2111SA144 (مالک کا حکم): پیکج کا اصل نام + قیمت + دن — ایک چھوٹی کیپسول میں؛ ملازم کی سرخ کیپسول: نام + موبائل + AIO ID */
  function pkInfo(e) {
    const act = actAt(e), days = e.life ? 0 : Math.round(((e.exp || 0) - act) / 864e5), h = (e.hist || [])[(e.hist || []).length - 1] || {};
    let p = PK.find(x => e.pkgId && x.id === e.pkgId);
    if (!p) p = PK.find(x => !!x.life === !!e.life && (x.devices || 1) === (e.devices || 1) && (e.life || Math.abs((x.days || 0) - days) <= 3));
    return { name: e.pkgName || h.pkg || (p && p.name) || '', price: h.price || (p && PRICE[p.id]) || '' };
  }
  /* HD2211SU165 (مالک کا حکم): تفصیل میں صاف لکھا ہو — کون سا پیکج، کتنے پیسوں کا، کب لگا، کب تک، کتنے دن باقی؛ اور اس ID کی کل ادائیگی */
  function pkBox(e, s) {
    const pi = pkInfo(e), at = actAt(e), fm = n => Number(String(n || 0).replace(/,/g, '')).toLocaleString('en-US');
    const tot = (e.hist || []).reduce((x, h) => x + (parseFloat(String(h.price || '').replace(/,/g, '')) || 0), 0);
    const row = (k, v) => '<div style="display:flex;justify-content:space-between;gap:8px;padding:3px 0;border-bottom:1px dashed #cbd5e1"><span style="color:#475569">' + k + '</span><b style="text-align:left">' + v + '</b></div>';
    return '<div style="background:#f8fafc;border:1.5px solid #0e7490;border-radius:12px;padding:8px 10px;margin-top:6px;font-size:13.5px;line-height:1.7">'
      + row('📦 پیکج', esc(pi.name || '—')) + row('👥 فون', (e.devices || 1) + (APP === 'SM' && (e.devices || 1) > 1 ? ' (مالک + ' + ((e.devices || 1) - 1) + ' ملازم)' : APP === 'MD' && (e.devices || 1) > 1 ? ' (منتظم + استاد)' : ''))
      + row('💰 اس پیکج کی رقم', pi.price ? fm(pi.price) + ' روپے' : '<span style="color:#b91c1c">نہیں لکھی</span>')
      + (tot && String(tot) !== String(pi.price).replace(/,/g, '') ? row('💵 اس ID کی کل ادائیگی', fm(tot) + ' روپے') : '')
      + row('📅 لگا', at ? dmy(at) + ' ' + hm(at) : '—') + row('⏳ ختم', e.life ? '♾️ لائف ٹائم' : dmy(e.exp) + (s.k === 'act' ? ' · باقی ' + s.left + ' دن' : ''))
      + (at && !e.life ? row('🕒 گزرے', Math.max(0, Math.floor((Date.now() - at) / 864e5)) + ' دن') : '') + '</div>';
  }
  function staffLines(w, e) {
    const dm = SEL.devmap || {}, seen = {}, out = [], ce = e ? (Array.isArray(e.claims) ? e : ENTS.find(x => x.id === e.id) || {}) : {};
    (SEL.staff || []).forEach(x => { seen[x.aio] = 1; out.push(x); });
    (Array.isArray(ce.claims) ? ce.claims : []).forEach(c => {
      if (!c || c.dev === w.dev) return; const m = dm[c.dev];
      if (!m) { out.push({ aio: '', at: c.at }); return; }
      if (m.aio === w.aio || seen[m.aio] || (m10(m.mobile) && m10(m.mobile) === m10(w.mobile))) return;
      seen[m.aio] = 1; out.push(m);
    });
    return out.map(x => '<div class="aStf">👷 ' + (x.aio ? esc(x.name || '—') + ' · <span style="direction:ltr;unicode-bidi:plaintext">' + esc(aPh(x.mobile) || '—') + '</span> · ' + esc(x.aio) : 'دوسرا فون (' + dmy(x.at) + ') — نام نہیں ملا') + '</div>').join('');
  }
  function capsHTML(w, own) {
    const a = { aio: w.aio, made: w.made, mobile: w.mobile, gmail: w.gmail, name: w.name };
    let s = own ? stOne(own) : null; if (!s) s = idState(a, w.dev);
    const bt = (act, lbl, cl) => '<button class="aBtn ' + cl + '" data-a="' + act + '" data-v="' + esc(w.aio) + '" style="padding:2px 8px;font-size:11px">' + lbl + '</button>';
    let cls = 'u', txt = '', btn = '', e = null;
    if (s.k === 'life' || s.k === 'act' || s.k === 'exp' || s.k === 'rev') {
      e = s.ent; const pi = pkInfo(e), at = actAt(e);
      cls = s.k === 'rev' ? 'r' : s.k === 'exp' ? 'd' : 'u';
      txt = '📦 <b>' + esc(pi.name || '—') + '</b>' + (pi.price ? ' · 💰 Rs ' + esc(pi.price) : '') + ' · ' + (s.k === 'life' ? '♾️ لائف ٹائم' : s.k === 'act' ? '✅ ' + s.left + ' دن باقی' : s.k === 'rev' ? '⛔ معطل' : '⌛ ختم') + (at ? ' · 📅 ' + dmy(at) : '') + (e.life ? '' : ' → ' + dmy(e.exp));
    } else if (s.k === 'trial') { cls = 't'; txt = '🎁 ٹرائل ' + s.left + ' دن باقی · ختم ' + dmy(s.exp); btn = bt('trialmsg', '💬', 'grn'); }
    else if (s.extra) { cls = 'd'; txt = '🗂️ فالتو ID'; btn = bt('adel', '🗑️', 'red'); }
    else { cls = 'r'; txt = '🚫 ٹرائل ختم ' + dmy(s.exp); btn = bt('trialmsg', '💬', 'grn') + bt('adel', '🗑️', 'red'); }
    const pkb = e ? pkBox(e, s) : '';
    return '<div class="aCap ' + cls + '"><span>' + txt + '</span>' + btn + '</div>' + pkb + (s.k === 'trial' || s.k === 'tend' ? slTag(w.aio, true) : '') + staffLines(w, e);
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
      return '<div class="aRow" style="margin-top:7px;flex-wrap:nowrap"><b data-a="pick" data-v="' + esc(o.aio) + '" style="color:#0e7490;text-decoration:underline;cursor:pointer" class="aCode">' + esc(o.aio) + '</b><span class="aSub" style="flex:1;margin:0">' + dmy(o.made) + (o.dev ? (o.dev === w.dev ? ' · اسی فون' : ' · دوسرا فون') : '') + (o.replacedBy ? ' · 🔁' + esc(o.replacedBy) : '') + '</span><span class="aTag ' + ch[0] + '">' + esc(ch[1]) + '</span>' + (live(st) ? '' : '<button class="aBtn red" data-a="adel" data-v="' + esc(o.aio) + '" style="padding:5px 9px">🗑️ ہٹائیں</button>') + '</div>';
    }).join('') + '</div>' : '';
    const hist = e && (e.hist || []).length ? '<div class="aSub" style="margin-top:6px">' + e.hist.slice().reverse().slice(0, 3).map(h => '• ' + dmy(h.at) + ' — ' + esc(h.pkg) + (h.price ? ' · Rs ' + esc(h.price) : '') + (h.life ? ' · ♾️' : h.exp ? ' → ' + dmy(h.exp) : '')).join('<br>') + '</div>' : '';
    return '<div class="aBox" style="border:2px solid #0e7490">' + resHTML() +
      '<div style="font:900 15px/1.4 inherit">👤 ' + esc(w.name || '—') + ' <span class="aCode" style="font-size:14px;color:#0e7490">' + esc(w.aio) + '</span></div>' +
      '<div class="aSub" style="font-size:12px;color:#0f172a;direction:ltr;text-align:right">📱 ' + esc(aPh(w.mobile)) + (w.gmail ? ' · ✉️ ' + esc(w.gmail) : '') + '</div>' +
      capsHTML(w, own) + wantTag(w.want) +
      '<div class="aSub">🗓️ بنی ' + dmy(w.made) + ' ' + hm(w.made) + (w.replacedBy ? ' · 🔁 ' + esc(w.replacedBy) : '') + '</div>' + hist + othHTML +
      '<h3 style="margin:8px 0 4px">➕ اس ID میں دن جوڑیں</h3>' +
      '<div class="aRow"><button class="aBtn grn" data-a="aadd" data-v="1" ' + (BUSY ? 'disabled' : '') + '>+1 دن</button><button class="aBtn grn" data-a="aadd" data-v="30" ' + (BUSY ? 'disabled' : '') + '>+1 مہینہ</button><button class="aBtn grn" data-a="aadd" data-v="365" ' + (BUSY ? 'disabled' : '') + '>+1 سال</button><button class="aBtn" data-a="aadd" data-v="life" ' + (BUSY ? 'disabled' : '') + '>♾️ لائف ٹائم</button></div>' +
      '<div class="aRow" style="margin-top:6px;flex-wrap:nowrap"><input type="text" id="aAddN" inputmode="numeric" maxlength="4" placeholder="دن" style="width:90px;flex:0 0 90px;text-align:center;font-weight:800"><button class="aBtn pri" data-a="aadd" data-v="n" ' + (BUSY ? 'disabled' : '') + '>➕ اتنے دن جوڑیں</button></div>' +
      '<h3 style="margin:8px 0 4px">📦 پیکج</h3>' +
      '<button class="aBtn" data-a="pktoggle" style="width:100%">' + (SHOWPK ? '▲ پیکج چھپائیں' : '▼ پیکج دیکھیں اور چنیں') + '</button>' +
      (sel ? '<div class="aMsg ok" style="margin:10px 0 0">✔️ چنا ہوا: <b>' + esc(sel.name) + '</b><br>' + (sel.life ? '♾️ لائف ٹائم' : sel.days + ' دن') + ' · 📱 ' + (sel.devices || 1) + ' فون<br>💰 ' + (PRICE[sel.id] ? 'Rs ' + esc(PRICE[sel.id]) : 'قیمت نہیں لکھی') + '</div>' : '') +
      (SHOWPK ? (act.map(p => '<div class="aPk"><label class="' + (APK === p.id ? 'on' : '') + '"><input type="checkbox" data-a="apk" data-v="' + esc(p.id) + '" ' + (APK === p.id ? 'checked' : '') + '><span style="flex:1;min-width:0"><b>' + esc(p.name) + '</b><span class="aSub" style="display:block">' + (p.life ? 'لائف ٹائم' : p.days + ' دن') + ' · ' + p.devices + ' فون</span></span></label><input type="text" inputmode="numeric" data-pr="' + esc(p.id) + '" value="' + esc(PRICE[p.id] || '') + '" placeholder="قیمت"></div>').join('') || '<div class="aSub">کوئی پیکج نہیں — نیچے «پیکج بنانا / بدلنا» سے بنائیں</div>') : '') +
      (sel ? '<div class="aRow" style="margin-top:10px"><button class="aBtn" data-a="apay" style="flex:1">💰 ادائیگی کا پیغام</button><button class="aBtn grn" data-a="aact" style="flex:1" ' + (BUSY ? 'disabled' : '') + '>✅ ایکٹیویٹ</button></div>' : '') +
      (e && (e.keys || []).includes('a:' + w.aio) ? '<div class="aRow" style="margin-top:12px"><button class="aBtn pri" data-a="ashare">📤 ایکٹیویشن کا پیغام</button>' + (e.revoked ? '<button class="aBtn" data-a="aop" data-op="unrevoke" data-id="' + esc(e.id) + '">↩️ بحال</button>' : '<button class="aBtn" data-a="aop" data-op="revoke" data-id="' + esc(e.id) + '">⛔ معطل</button>') + '<button class="aBtn" data-a="aop" data-op="reset" data-id="' + esc(e.id) + '">📱 فون صاف</button><button class="aBtn red" data-a="aop" data-op="delete" data-id="' + esc(e.id) + '">🗑️</button></div>' : '') +
      (SHARE ? '<textarea readonly style="width:100%;box-sizing:border-box;margin-top:8px;min-height:170px;border:1.5px solid #dbe1ea;border-radius:10px;padding:8px;font-size:13px;direction:ltr">' + esc(SHARE) + '</textarea><div class="aRow" style="margin-top:6px"><button class="aBtn grn" data-a="copy" data-v="' + esc(SHARE) + '">📋 کاپی</button><button class="aBtn pri" data-a="send" data-v="' + esc(SHARE) + '">📤 شیئر</button></div>' : '') +
      '<button class="aBtn" data-a="aclose" style="width:100%;margin-top:10px">↩️ بند</button></div>';
  }

  const bucket = st => live(st) ? 'act' : st.k === 'trial' ? 'trial' : 'dead';
  function calc() { ST = {}; AIDS.forEach(a => { ST[a.aio] = idState(a); }); }
  function filHTML() {
    calc(); const c = { act: 0, trial: 0, dead: 0 };
    AIDS.forEach(a => { c[bucket(ST[a.aio])]++; });
    const B = [['su', '📲 سائن اپ', c.trial + c.dead], ['trial', '🎁 ٹرائل', c.trial], ['dead', '🚫 ختم', c.dead], ['act', '✅ پیکج', c.act]];
    /* HD2211SU163 (مالک کا حکم): پیسوں کا حساب — کل وصولی، چلتے پیکجوں کی رقم، کم دن والے */
    const fm = n => Number(n || 0).toLocaleString('en-US'), paid = AIDS.reduce((x, a) => x + ((a.ent && a.ent.paid) || 0), 0), paidAct = AIDS.reduce((x, a) => x + (live(ST[a.aio]) && a.ent ? a.ent.paid || 0 : 0), 0), low = AIDS.filter(a => ST[a.aio].k === 'act' && ST[a.aio].left <= 15).length;
    const sum = paid || low ? '<div class="aRow" style="justify-content:space-between;background:#f0fdf4;border:1.5px solid #86efac;border-radius:12px;padding:8px 10px;margin-bottom:8px"><span><b style="font-size:16px;color:#166534">💰 ' + fm(paid) + ' روپے</b><span class="aSub" style="display:block;margin:0">کل وصولی</span></span><span><b style="font-size:16px;color:#0e7490">' + fm(paidAct) + ' روپے</b><span class="aSub" style="display:block;margin:0">چلتے پیکج</span></span>' + (low ? '<span class="aTag d" data-a="fil" data-v="act" style="cursor:pointer">⚠️ ' + low + ' کے 15 دن سے کم</span>' : '') + '</div>' : '';
    return sum + '<div class="aFil">' + B.map(x => '<button class="' + (FIL === x[0] ? 'on' : '') + '" data-a="fil" data-v="' + x[0] + '">' + x[1] + '<b>' + x[2] + '</b></button>').join('') + '</div>';
  }
  /* HD2111SA142: پیکج کا نام — اسی ID کا پیکج، ورنہ سرور کی فہرست والا نام */
  const pkn = (a, st) => (st.ent && (st.ent.pkgName || st.ent.label)) || (a.ent && a.ent.pkg) || (st.ent && st.ent.life ? 'لائف ٹائم' : 'پیکج');
  function listHTML() {
    const q = AQ.trim().toUpperCase(); calc();
    let list = AIDS.filter(a => (FIL === 'su' ? bucket(ST[a.aio]) !== 'act' : bucket(ST[a.aio]) === FIL) && (!q || (a.aio + ' ' + (a.name || '') + ' ' + aPh(a.mobile) + ' ' + (a.gmail || '')).toUpperCase().indexOf(q) >= 0));
    if (FIL === 'act') list = list.slice().sort((p, r) => (ST[p.aio].k === 'life' ? 1e9 : ST[p.aio].left) - (ST[r.aio].k === 'life' ? 1e9 : ST[r.aio].left));
    if (FIL === 'su') list = list.slice().sort((p, r) => (r.made || 0) - (p.made || 0));
    if (FIL === 'trial') list = list.slice().sort((p, r) => ST[p.aio].left - ST[r.aio].left);
    return list.slice(0, SHOW).map(a => {
      const st = ST[a.aio], ch = chip(st), dup = (GRP[a.aio] || []).length;
      let btn = '';
      const tel = a.mobile ? '<a class="aBtn" data-a="tel" href="tel:' + esc(aPh(a.mobile)) + '" style="padding:4px 9px;font-size:12px;text-decoration:none;color:#0f172a">📞 کال</a>' : '';   /* HD2211SU166: My City Shines جیسا — کال بھی */
      if (st.k === 'trial') btn = tel + '<button class="aBtn grn" data-a="trialmsg" data-v="' + esc(a.aio) + '" style="padding:4px 9px;font-size:12px">💬 پیغام</button>';
      if (st.k === 'tend') btn = (st.extra ? '' : tel + '<button class="aBtn grn" data-a="trialmsg" data-v="' + esc(a.aio) + '" style="padding:4px 9px;font-size:12px">💬 پیغام</button>') + '<button class="aBtn red" data-a="adel" data-v="' + esc(a.aio) + '" style="padding:4px 9px;font-size:12px">🗑️ ہٹائیں</button>';
      const tl = (st.k === 'trial' || st.k === 'tend') ? ' · ڈاؤن لوڈ ' + dmy(a.made) + ' · ٹرائل ' + (st.k === 'trial' ? 'ختم ہو گا ' : 'ختم ہوا ') + dmy(st.exp) : (a.made ? ' · ' + dmy(a.made) : '');
      return '<div class="aItem" data-a="pick" data-v="' + esc(a.aio) + '" style="cursor:pointer' + (dup > 1 ? ';border-right:4px solid #f59e0b' : '') + (SEL && SEL.who.aio === a.aio ? ';background:#ecfeff' : '') + '"><div class="aRow" style="flex-wrap:nowrap"><span class="aCode" style="color:#0e7490">' + esc(a.aio) + '</span><b style="flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">' + esc(a.name || '—') + (dup > 1 ? ' <small>⚠️×' + dup + '</small>' : '') + '</b><span class="aTag ' + ch[0] + '">' + esc(ch[1]) + '</span></div><div class="aRow" style="flex-wrap:nowrap;justify-content:space-between"><div class="aSub" style="flex:1;min-width:0">' + [aPh(a.mobile), a.gmail].filter(Boolean).map(esc).join(' · ') + tl + (live(st) ? ' · 📦 ' + esc(pkn(a, st)) + (a.ent && a.ent.paid ? ' · 💰 ' + Number(a.ent.paid).toLocaleString('en-US') + ' روپے' : '') + (a.ent && a.ent.lastAt ? ' · ' + Math.max(0, Math.floor((Date.now() - a.ent.lastAt) / 864e5)) + ' دن گزرے' : '') : '') + '</div><div style="display:flex;gap:6px;flex:0 0 auto">' + btn + '</div></div>' + ((st.k === 'trial' || st.k === 'tend') && !st.extra ? slTag(a.aio) : '') + (live(st) ? '' : wantTag(a.want)) + (FIL === 'act' ? (a.staff || []).map((x, i) => '<div class="aStfL">👷 ' + esc(x.name || '—') + ' · ' + esc(aPh(x.mobile)) + ' · ' + esc(x.aio) + '</div>').join('') : '') + '</div>';
    }).join('') + (list.length > SHOW ? '<button class="aBtn" data-a="amore" style="width:100%;margin-top:8px">⬇️ مزید دکھائیں (' + (list.length - SHOW) + ')</button>' : '') || '<div class="aSub" style="margin-top:8px">' + (BUSY ? '⏳' : 'اس خانے میں کوئی ID نہیں') + '</div>';
  }
  function drawList() { const n = document.getElementById('aiList'); if (n) n.innerHTML = listHTML(); }

  function draw() {
    const o = document.getElementById('aiOv'); if (!o) return;
    o.innerHTML = '<div class="aTop"><b>✅ ' + IDN() + ' — پیکج ایکٹیو کریں</b><button class="aX" data-a="close">✕</button></div>' +
      '<div class="aBox" style="padding:8px"><div class="aTabs">' + TABS.map(([k, t]) => '<button class="' + (APP === k ? 'on' : '') + '" data-a="tab" data-v="' + k + '">' + t + '</button>').join('') + '</div></div>' +
      (MSG ? '<div class="aMsg ' + (OK ? 'ok' : 'bad') + '">' + esc(MSG) + '</div>' : '') + detailHTML() +
      '<div class="aBox">' + filHTML() +
      '<div class="aRow" style="flex-wrap:nowrap"><input type="text" id="aiQ" maxlength="40" value="' + esc(AQ) + '" placeholder="تلاش: نام / ' + IDN() + ' / موبائل" style="direction:ltr"><button class="aBtn" data-a="aref" ' + (BUSY ? 'disabled' : '') + '>🔄</button></div><div id="aiList">' + listHTML() + '</div></div>' +
      (APP === 'MD' ? '' : '<div class="aBox"><button class="aBtn" data-a="oldscr" style="width:100%">🛠️ پیکج بنانا / بدلنا (پرانی سکرین)</button></div>');   /* MD: پرانی سکرین مدرسہ نہیں جانتی — قیمت یہیں پیکج کے ساتھ */
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
    /* HD2011FR136 (مالک کا حکم): الگ پاس ورڈ ختم — ڈویلپر لاگ اِن ہی کافی؛ سرور پہلے ہی مالک کے ٹوکن سے پہچانتا ہے۔ صرف «ٹھیک ہے؟» کی تصدیق */
    if (!window.confirm(String(text).replace(/<[^>]+>/g, '').replace(/\s*پاس ورڈ لکھیں:?\s*$/, '') + '\n\nٹھیک ہے؟')) return;
    BUSY = true; draw();
    try { await fn(); } catch (e) { MSG = '⚠️ ' + e.message; OK = false; }
    finally { BUSY = false; draw(); const o = document.getElementById('aiOv'); if (o) o.scrollTo({ top: 0, behavior: 'smooth' }); }
  }
  async function refresh(aio) { await loadAll(); await loadDetail(aio); }
  const val = id => { const n = document.getElementById(id); return n ? n.value : ''; };

  async function onClick(ev) {
    const t = ev.target.closest('[data-a]'); if (!t) return;
    if (t.dataset.a === 'tel') return;   /* کال کا لنک — تفصیل نہ کھلے */
    const a = t.dataset.a, v = t.dataset.v, id = t.dataset.id;
    if (a === 'close') { const o = document.getElementById('aiOv'); if (o) o.remove(); document.body.style.overflow = ''; return; }
    if (a === 'tab') {
      if (v === 'MCS') { const o = document.getElementById('aiOv'); if (o) o.remove(); document.body.style.overflow = ''; OLD('MCS'); return; }
      if (v === APP) return; APP = v; SEL = null; AIDS = []; ENTS = []; APK = ''; SHOWPK = false; RES = null; MSG = ''; loadLocal(); draw(); BUSY = true; draw(); loadAll().finally(() => { BUSY = false; draw(); }); return;
    }
    if (a === 'oldscr') { const o = document.getElementById('aiOv'); if (o) o.remove(); document.body.style.overflow = ''; window.__licBypass = true; OLD(APP); return; }
    if (a === 'aclose') { SEL = null; APK = ''; SHOWPK = false; RES = null; SHARE = ''; draw(); return; }
    if (a === 'fil') { FIL = v; SHOW = 40; draw(); return; }
    if (a === 'amore') { SHOW += 40; draw(); return; }
    if (a === 'aref') { AQ = val('aiQ'); BUSY = true; draw(); try { await loadAll(); if (SEL) await loadDetail(SEL.who.aio); } catch (e) { MSG = '⚠️ ' + e.message; OK = false; } finally { BUSY = false; draw(); } return; }
    if (a === 'pick') { pick(v); return; }
    if (a === 'pktoggle') { SHOWPK = !SHOWPK; draw(); return; }
    if (a === 'apk') { APK = APK === v ? '' : v; SHARE = ''; draw(); return; }
    if (a === 'copy') { let ok = false; try { await navigator.clipboard.writeText(v); ok = true; } catch (e) { try { const ta = document.createElement('textarea'); ta.value = v; ta.setAttribute('readonly', ''); ta.style.cssText = 'position:fixed;opacity:0'; document.body.appendChild(ta); ta.select(); ok = document.execCommand('copy'); ta.remove(); } catch (e2) {} } say(ok ? '📋 کاپی ہو گیا' : '⚠️ کاپی نہیں ہوا', ok); return; }
    if (a === 'send') { try { if (navigator.share) { await navigator.share({ text: v }); } else { window.open('https://wa.me/?text=' + encodeURIComponent(v), '_blank'); } } catch (e) {} return; }
    if (a === 'trialmsg') {
      const x = AIDS.find(z => z.aio === v) || (SEL && SEL.who.aio === v ? SEL.who : null); if (!x) return;
      { const k = APP + '|' + x.aio, a0 = (slLoad(), SLOG[k] || []); if (a0.length && d0(a0[a0.length - 1]) === d0(Date.now()) && !confirm('اس بندے کو آج ہی پیغام بھیجا جا چکا ہے (' + hm(a0[a0.length - 1]) + ')۔ کیا دوبارہ بھیجنا ہے؟')) return; if (!waSafe()) return; slAdd(k); setTimeout(draw, 600); }
      const msg = trialMsg(x), n = waNum(x.mobile);
      try { window.open('https://wa.me/' + (n ? n : '') + '?text=' + encodeURIComponent(msg), '_blank'); } catch (e) {}
      return;
    }
    if (a === 'adel') {   /* HD2011FR137 (مالک کا حکم): ڈیلیٹ سے پہلے نام + موبائل + وجہ کے ساتھ تصدیق؛ پیکج / چالو ٹرائل والی ID پر ڈیلیٹ ہی نہیں */
      const x = AIDS.find(z => z.aio === v) || ((SEL && SEL.others) || []).find(z => z.aio === v) || (SEL && SEL.who.aio === v ? SEL.who : null) || { aio: v };
      const nm = x.name || '—', ph = aPh(x.mobile) || '—', st = idState({ aio: v, gmail: x.gmail || (SEL && SEL.who.gmail) || '', mobile: x.mobile, made: x.made, name: x.name });
      const who = '«' + nm + '» (ID: ' + v + ' · موبائل: ' + ph + ')';
      if (live(st)) { window.alert('🚫 یہ ID ڈیلیٹ نہیں کی جا سکتی\n\n' + who + '\nاس پر پیکج چل رہا ہے' + (st.k === 'life' ? ' — لائف ٹائم۔' : ' — ' + st.left + ' دن باقی ہیں۔') + '\n\nپیکج والی ID ڈیلیٹ نہیں ہو سکتی۔'); return; }
      if (st.k === 'trial') { window.alert('🚫 یہ ID ڈیلیٹ نہیں کی جا سکتی\n\n' + who + '\nاس پر ابھی ٹرائل چل رہا ہے — ' + st.left + ' دن باقی ہیں (ٹرائل ختم ہو گا: ' + dmy(st.exp) + ')۔\n\nٹرائل ختم ہونے کے بعد ڈیلیٹ کر سکتے ہیں۔'); return; }
      const why = st.k === 'tend' ? 'اس ID پر کوئی پیکج نہیں ہے۔\nاس کا ٹرائل ختم ہو چکا ہے (ختم ہوا: ' + dmy(st.exp) + ')۔' : st.k === 'rev' ? 'اس ID کا پیکج معطل ہے۔' : 'اس ID کا پیکج ختم ہو چکا ہے (' + dmy(st.exp) + ')۔';
      guarded('⚠️ کیا آپ واقعی ' + who + ' ڈیلیٹ کرنا چاہتے ہیں؟\n\n' + why + (st.extra ? '\nاس بندے کا پیکج دوسری ID پر چل رہا ہے۔' : '') + '\n\nڈیلیٹ کے بعد یہ فہرست سے غائب ہو جائے گی (ریکارڈ اندر رہے گا تاکہ اسی فون کو نیا مفت ٹرائل نہ ملے)۔', async () => {
        await call({ op: 'aiodel', aio: v });
        await loadAll(); if (SEL) { if (v === SEL.who.aio) { SEL = null; } else { await loadDetail(SEL.who.aio); } }
        RES = null; MSG = '✅ ' + nm + ' کی ID ' + v + ' ڈیلیٹ ہو گئی'; OK = true;
      });
      return;
    }
    if (!SEL) return;
    const w = SEL.who, name = (w.name || '');
    if (a === 'ashare') { SHARE = aioMsg(w, SEL.ent); draw(); return; }
    if (a === 'apay') {
      const p = PK.find(x => x.id === APK); if (!p) return;
      if (APP === 'MD') { SHARE = ['مدرسہ سافٹ ویئر — ' + p.name, '🆔 MD ID: ' + w.aio, '🕌 ' + name, '⏳ ' + p.days + ' دن · 📱 ' + (p.devices > 1 ? 'دو موبائل (منتظم + استاد، والدین کا لنک)' : 'ایک موبائل'), PRICE[p.id] ? '💰 رقم: ' + PRICE[p.id] + ' روپے' : '', '', 'رقم بھیج کر اسکرین شاٹ بھیج دیں — تصدیق کے بعد پیکج آپ کی ایپ میں خود لگ جائے گا، کوئی کوڈ نہیں۔'].filter((x, i) => x || i === 5).join('\n'); draw(); return; }
      if (APP === 'SM') { SHARE = ['سبزی منڈی — ' + p.name, '🆔 SM ID: ' + w.aio, '👤 ' + name, (p.life ? '♾️ لائف ٹائم' : '⏳ ' + p.days + ' دن') + ' · 👥 مالک' + (p.devices > 1 ? ' + ' + (p.devices - 1) + ' ملازم' : ''), PRICE[p.id] ? '💰 رقم: ' + PRICE[p.id] + ' روپے' : '', '', 'رقم بھیج کر اسکرین شاٹ بھیج دیں — پیکج فوراً آپ کی ایپ میں خود لگ جائے گا، کوئی کوڈ نہیں۔'].filter((x, i) => x || i === 5).join('\n'); draw(); return; }
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
      /* MD2311MO028 (مالک کا حکم — سب ایپس): پیسے وصول ہونے سے پہلے ایکٹیو نہیں — پہلے پیسوں کی تصدیق، پھر ایکٹیو کی دوسری تصدیق */
      if (!window.confirm('💰 پیسوں کی تصدیق (1/2)\n\n' + (name || w.aio) + ' (' + w.aio + ')\nپیکج: ' + p.name + (PRICE[p.id] ? '\nرقم: ' + PRICE[p.id] + ' روپے' : '') + '\n\nکیا یہ رقم آپ کے اکاؤنٹ میں واقعی وصول ہو چکی ہے؟')) { say('⏸️ پیکج نہیں لگا — پہلے رقم وصول کریں («💰 ادائیگی کا پیغام» بھیج سکتے ہیں)', false); return; }
      guarded('<b>' + esc(w.aio) + '</b> (' + esc(name) + ') پر <b>«' + esc(p.name) + '»</b>' + (PRICE[p.id] ? ' (Rs ' + esc(PRICE[p.id]) + ')' : '') + ' ایکٹیو ہو گا (2/2 — آخری تصدیق)۔ پاس ورڈ لکھیں:', async () => {
        const r = await call({ op: 'aiogrant', aio: w.aio, pkgId: p.id, price: PRICE[p.id] || '' });
        APK = ''; SHOWPK = false; SHARE = aioMsg(r.who, r.ent); await refresh(w.aio); makeRes('✅ پیکج ایکٹیو ہو گیا', SEL && SEL.ent ? SEL : r); MSG = '';
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
    APP = app === 'DR' ? 'DR' : app === 'SM' ? 'SM' : app === 'MD' ? 'MD' : 'AIO'; try { localStorage.setItem('lic_app', APP); } catch (e) {}
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
