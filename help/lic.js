/* PBT Help Desk — 🔑 License Keys (ایکٹیویشن کوڈ بنانے کا پینل)
   صرف مالک کے لیے۔ پیکج سرور کی فہرست سے آتے ہیں (ہاتھ سے لکھے ہوئے نہیں)؛ کوڈ = پیکج کا نام + 6 حروف، مثلاً 1P1-6M-K7Q9XA۔
   ہر کوڈ ایک ہی بار چلتا ہے؛ استعمال کے بعد «Used» نظر آتا ہے۔ ایپ (AIO POS) کے اندر کوڈ بنانے کا کوئی حصہ نہیں۔ */
(function () {
  'use strict';
  const API = 'https://aio-pos-verify.pbtcodelabs.workers.dev/entadmin';
  /* HD1711TU116 (مالک کا حکم): دو ایپس — AIO POS اور My City Shines (ایک سال کا رجسٹریشن کوڈ، MCS-1Y-…)؛ چنی ایپ فون میں یاد */
  const APPS = [['AIO', 'AIO POS'], ['DR', 'AIO Direct'], ['MCS', 'My City Shines']];   /* HD1811WE126: AIO Direct بھی AIO ID پر */
  let APP = 'AIO'; try { APP = ['MCS', 'DR'].includes(localStorage.getItem('lic_app')) ? localStorage.getItem('lic_app') : 'AIO'; } catch (e) {}
  const pkKey = () => APP === 'AIO' ? 'lic_pk' : 'lic_pk_' + APP;
  const en = () => { try { return LANG === 'en'; } catch (e) { return false; } };
  const L = (e, u) => (en() ? e : u);
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const dmy = ts => { if (!ts) return ''; const d = new Date(ts); return String(d.getDate()).padStart(2, '0') + '/' + String(d.getMonth() + 1).padStart(2, '0') + '/' + d.getFullYear(); };
  let MLIST = [], MQ = '', MSHOW = 30;   /* HD1811WE124: نئے MCS نمبر */
  let ALIST = [], AQ = '', ALOOK = null, APK = '', ASHARE = '';   /* HD1811WE125: AIO ID پر پیکج */
  let AIDS = [], ASHOW = 40;   /* HD1811WE127: سرور سے سب AIO IDs */
  let SID = '', LOOK = null, PRICE = {}, LBL = '', PK = [], CODES = [], FILTER = 'all', NEW = [], BUSY = false, EDIT = null, SHOWPK = false, MSG = '', OK = true;


  /* HD1711TU111: قیمتیں پکی محفوظ — فون میں + کلاؤڈ (Store.setCfg)؛ پیکج کی فہرست بھی فون میں کاپی رہتی ہے */
  const pn = v => String(v == null ? '' : v).replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d)).replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d));
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
  /* HD1711TU115 (مالک کا حکم): گاہک کو صرف کوڈ — پیکج کا نام / مدت / قیمت پیغام میں کبھی نہیں (قیمت صرف مالک کی یادداشت، اسی صفحے پر) */
  const sendText = c => String(c || '').toUpperCase().replace(/[^A-Z0-9]/g, '');   /* HD1711TU121 (مالک کا حکم): کوڈ میں ڈیش بھی نہیں — سرور ڈیش / خالی جگہ ویسے ہی نظرانداز کرتا ہے، پرانے ڈیش والے کوڈ بھی چلتے ہیں */   /* HD1711TU120 (مالک کا حکم): کاپی / واٹس ایپ میں صرف کوڈ — آگے پیچھے کوئی لفظ نہیں */

  function css() {
    if (document.getElementById('licCss')) return;
    const s = document.createElement('style'); s.id = 'licCss';
    s.textContent = `#licOv{position:fixed;inset:0;z-index:9000;background:var(--bg,#f4f6fb);overflow-y:auto;-webkit-overflow-scrolling:touch;padding:0 0 90px}
#licOv .lcTop{position:sticky;top:0;z-index:2;display:flex;align-items:center;gap:8px;padding:12px 14px;background:#1e293b;color:#fff;font-weight:800;font-size:16px}
#licOv .lcTop b{flex:1}#licOv .lcX{background:#fff2;color:#fff;border:0;border-radius:10px;padding:8px 12px;font-size:16px}
#licOv .lcBox{background:#fff;border-radius:14px;margin:12px;padding:14px;box-shadow:0 1px 6px #0001}
#licOv h3{margin:0 0 10px;font-size:15px}#licOv label{display:block;font-size:12px;color:#64748b;margin:8px 0 3px;font-weight:700}
#licOv select,#licOv input[type=text],#licOv input[type=number]{width:100%;box-sizing:border-box;padding:11px;border:1.5px solid #dbe1ea;border-radius:10px;font-size:15px;background:#fff}
#licOv .lcBtn{border:0;border-radius:10px;padding:10px 14px;font-weight:800;font-size:14px;background:#e2e8f0;color:#0f172a}
#licOv .lcBtn.pri{background:#2563eb;color:#fff}#licOv .lcBtn.grn{background:#16a34a;color:#fff}#licOv .lcBtn.red{background:#fee2e2;color:#b91c1c}
#licOv .lcBtn[disabled]{opacity:.5}#licOv .lcRow{display:flex;gap:8px;flex-wrap:wrap;align-items:center}
#licOv .lcCode{font-family:monospace;font-size:17px;font-weight:900;letter-spacing:1px;direction:ltr;unicode-bidi:plaintext;word-break:break-all}
#licOv .lcBig{font-size:21px;background:#fff;border:2px dashed #16a34a;border-radius:12px;padding:12px 10px;text-align:center;user-select:all;-webkit-user-select:all;cursor:pointer}
#licOv .lcItem{border:1px solid #e5e9f0;border-radius:12px;padding:10px;margin-top:8px}
#licOv .lcSub{font-size:12px;color:#64748b;margin-top:3px}
#licOv .lcTag{display:inline-block;font-size:11px;font-weight:800;border-radius:20px;padding:2px 9px}
#licOv .lcTag.u{background:#dcfce7;color:#166534}#licOv .lcTag.d{background:#fef3c7;color:#92400e}#licOv .lcTag.r{background:#fee2e2;color:#991b1b}
#licOv .lcMsg{margin:12px;padding:10px 12px;border-radius:10px;font-size:13px;font-weight:700}
#licOv .lcMsg.ok{background:#dcfce7;color:#166534}#licOv .lcMsg.bad{background:#fee2e2;color:#991b1b}
#licOv .lcTabs{display:flex;gap:6px;margin-bottom:6px}#licOv .lcTabs button{flex:1;border:0;border-radius:10px;padding:9px 4px;font-weight:800;background:#e2e8f0}
#licOv .lcTabs button.on{background:#1e293b;color:#fff}`;
    document.head.appendChild(s);
  }

  async function call(body) {
    if (!window.Store || !Store.idToken) throw new Error(L('Owner login (Firebase) required', 'مالک کا لاگ اِن (فائربیس) ضروری ہے'));
    const tok = await Store.idToken();
    if (!tok) throw new Error(L('Please log in as owner first', 'پہلے مالک کے طور پر لاگ اِن کریں'));
    let r;
    try { r = await fetch(API, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + tok }, body: JSON.stringify(Object.assign({ app: APP }, body)) }); }
    catch (e) { throw new Error(L('No internet / server not reachable', 'انٹرنیٹ نہیں / سرور نہیں مل رہا')); }
    let j = {}; try { j = await r.json(); } catch (e) {}
    if (r.status === 403 || j.error === 'admin_only') {
      const pid = (window.PBTHD_FIREBASE && PBTHD_FIREBASE.projectId) || '?';
      throw new Error(L('Server did not accept this login as admin (Firebase project: ' + pid + '). Server file must be the new worker.js.', 'سرور نے اس لاگ اِن کو ایڈمن نہیں مانا (فائربیس پروجیکٹ: ' + pid + ')۔ سرور پر نیا worker.js لگا ہو۔'));
    }
    if (j.ok === false || j.error) throw new Error(errText(j.reason || j.error));
    return j;
  }
  function errText(c) {
    const m = { no_aio: ['This AIO ID was not found — ask the customer to check it on the login screen', 'یہ AIO ID نہیں ملی — گاہک لاگ اِن صفحے پر دیکھ کر دوبارہ بتائے'], bad_id: ['Write an AIO ID like AIO12345', 'AIO ID لکھیں، مثلاً AIO12345'], no_biz: ['No business card yet for this MCS ID — the person must fill the business form in the app first', 'اس MCS نمبر کا ابھی کوئی کاروبار نہیں — بندہ پہلے ایپ میں کاروبار کا فارم بھرے'], no_sid: ['MCS ID not found', 'یہ MCS نمبر نہیں ملا'], no_pkg: ['Package not found / switched off', 'پیکج نہیں ملا / بند ہے'], bad_prefix: ['Name (code start) too short', 'نام (کوڈ کا شروع) بہت چھوٹا ہے'], prefix_taken: ['This name is already used by another package', 'یہ نام کسی اور پیکج کا ہے'], no_days: ['Enter days or choose Lifetime', 'دن لکھیں یا لائف ٹائم چنیں'], no_sid: ['No person with this MCS ID', 'اس MCS نمبر کا کوئی بندہ نہیں ملا'], not_ready: ['Server not ready', 'سرور تیار نہیں'], bad_op: ['Server is old — upload the new worker.js', 'سرور پرانا ہے — نیا worker.js اپلوڈ کریں'] };
    return m[c] ? L(m[c][0], m[c][1]) : String(c || 'error');
  }

  function say(t, ok) { MSG = t; OK = ok !== false; draw(); }
  async function loadAll() {
    if (APP === 'MCS') {   /* HD1811WE124 (مالک کا حکم): MCS میں کوڈ نہیں — نئے MCS نمبروں کی فہرست */
      try { const r = await call({ op: 'mcsnew' }); MLIST = r.list || []; if (!LOOK) MSG = ''; }
      catch (e) { MSG = '⚠️ ' + e.message; OK = false; }
      draw(); return;
    }
    let pkErr = '';
    try {
      const p = await call({ op: 'pkglist' });
      const arr = p.list || p.packages || p.pkgs || p.items || [];
      PK = arr; try { localStorage.setItem(pkKey(), JSON.stringify(arr)); } catch (e) {}
      if (!arr.length) pkErr = L('Server returned 0 packages. Create a package below (📦 Packages).', 'سرور سے ایک بھی پیکج نہیں آیا۔ نیچے «📦 پیکج» میں نیا پیکج بنائیں۔');
    } catch (e) { pkErr = '⚠️ ' + e.message + (PK.length ? L(' (showing saved list)', ' (فون میں محفوظ فہرست دکھا رہا ہوں)') : ''); }
    try {
      const l = await call({ op: 'list' });
      CODES = (l.list || []).filter(x => (x.keys || []).some(k => k.startsWith('c:')));
      ALIST = (l.list || []).filter(x => x.aio);   /* HD1811WE125: AIO ID پر دی گئی ایکٹیویشنز */
      try { const n = await call({ op: 'aionew' }); AIDS = n.list || []; } catch (e) { if (!pkErr) pkErr = '⚠️ ' + e.message; }
    } catch (e) { if (!pkErr) pkErr = '⚠️ ' + e.message; }
    if (pkErr) { MSG = pkErr; OK = false; if (!PK.length) SHOWPK = true; } else MSG = '';
    draw();
  }
  const pkLabel = p => p.prefix + ' — ' + p.name + ' (' + (p.life ? L('lifetime', 'لائف ٹائم') : p.days + L(' days', ' دن')) + ', ' + p.devices + L(' phone(s)', ' فون') + ')';
  const status = x => x.revoked ? ['r', '⛔ ' + L('Revoked', 'بند')] : x.redeemed ? ['d', '✅ ' + L('Used', 'استعمال شدہ') + ' ' + dmy(x.usedAt || x.redeemed)] : ['u', '🆕 ' + L('Unused', 'نیا')];

  function draw() {
    const o = document.getElementById('licOv'); if (!o) return;
    if (document.getElementById('lcLb')) LBL = document.getElementById('lcLb').value;
    const act = PK.filter(p => p.active !== false);
    const list = CODES.filter(x => FILTER === 'all' || (FILTER === 'unused' && !x.redeemed && !x.revoked) || (FILTER === 'used' && x.redeemed));
    const cnt = f => CODES.filter(x => f === 'all' || (f === 'unused' && !x.redeemed && !x.revoked) || (f === 'used' && x.redeemed)).length;
    o.innerHTML = `<div class="lcTop"><b>${APP === 'MCS' ? '✅ ' + L('Activate business', 'کاروبار ایکٹیو کریں') : '✅ ' + L('Activate package on AIO ID', 'AIO ID پر پیکج ایکٹیو کریں')} — ${APP === 'MCS' ? 'My City Shines' : APP === 'DR' ? 'AIO Direct' : 'AIO POS'}</b><button class="lcX" data-l="close">✕</button></div>
<div class="lcBox" style="padding:8px"><div class="lcTabs" style="margin:0">${APPS.map(([k, t]) => `<button class="${APP === k ? 'on' : ''}" data-l="app" data-v="${k}">${t}</button>`).join('')}</div>${APP === 'MCS' ? `<div class="lcSub" style="margin-top:6px">${L('No codes: choose the MCS ID, check the details, tap «Activate 1 year» — the business goes live at once and the owner gets a congratulations message in the app.', 'کوئی کوڈ نہیں: MCS نمبر چنیں، تفصیل دیکھیں، «ایک سال ایکٹیو» دبائیں — کاروبار فوراً لائیو اور گاہک کو ایپ میں مبارکباد۔')}</div>` : ''}</div>
${MSG ? `<div class="lcMsg ${OK ? 'ok' : 'bad'}">${esc(MSG)}</div>` : ''}
${APP === 'MCS' ? mcsHTML() : aioHTML()}<div class="lcBox" style="display:none"><h3>🔑 ${L('Packages — price & code', 'پیکج — قیمت اور کوڈ')}</h3>
<div class="lcSub" style="margin:0 0 6px">${L('Type the price once — it stays saved. Tap 🔑 to make a code.', 'قیمت ایک بار لکھیں — پکی محفوظ رہتی ہے۔ کوڈ بنانے کے لیے 🔑 دبائیں۔')}</div>
<label>${L('Customer name / note (optional)', 'گاہک کا نام / نوٹ (اختیاری)')}</label><input type="text" id="lcLb" maxlength="60" value="${esc(LBL)}">
${act.map(p => `<div class="lcItem"><div class="lcRow" style="flex-wrap:nowrap"><div style="flex:1;min-width:0"><b>${esc(p.name)}</b><div class="lcSub">${esc(p.prefix)} · ${p.life ? L('lifetime', 'لائف ٹائم') : p.days + L(' days', ' دن')} · ${p.devices} ${L('phone(s)', 'فون')}</div></div>
<input type="text" inputmode="numeric" data-pr="${esc(p.id)}" value="${esc(PRICE[p.id] || '')}" placeholder="${L('Price', 'قیمت')}" style="width:96px;flex:0 0 96px;text-align:center;font-weight:800">
<button class="lcBtn pri" data-l="gen" data-id="${esc(p.id)}" ${BUSY ? 'disabled' : ''}>🔑</button></div>
${NEW.filter(c => c.pkgId === p.id).slice(0, 1).map(c => `<div style="margin-top:8px;background:#f0fdf4;border-radius:10px;padding:8px"><div class="lcCode lcBig" data-l="copy" data-v="${esc(sendText(c.code))}">${esc(sendText(c.code))}</div><div class="lcRow" style="margin-top:6px"><button class="lcBtn grn" data-l="copy" data-v="${esc(sendText(c.code, p))}">📋 ${L('Copy', 'کاپی')}</button><button class="lcBtn pri" data-l="send" data-v="${esc(sendText(c.code, p))}">📤 ${L('Send', 'بھیجیں')}</button></div></div>`).join('')}</div>`).join('') || `<div class="lcSub">—</div>`}
</div>
<div class="lcBox" style="display:none"><h3>📋 ${L('All keys', 'تمام کوڈ')}</h3>
<div class="lcTabs">${[['all', L('All', 'سب')], ['unused', L('Unused', 'نئے')], ['used', L('Used', 'استعمال شدہ')]].map(([k, t]) => `<button class="${FILTER === k ? 'on' : ''}" data-l="flt" data-v="${k}">${t} (${cnt(k)})</button>`).join('')}</div>
${list.map(x => { const s = status(x); return `<div class="lcItem"><div class="lcRow"><span class="lcCode" style="flex:1">${esc(sendText(x.code))}</span><span class="lcTag ${s[0]}">${esc(s[1])}</span></div>
<div class="lcSub">${esc(x.pkgName || (x.pend ? (x.pend.life ? 'Lifetime' : x.pend.days + ' days') + ', ' + x.pend.devices + ' phone(s)' : ''))}${x.label ? ' · 👤 ' + esc(x.label) : ''} · ${L('created', 'بنا')} ${dmy(x.at)}${x.redeemed ? ' · 📱 ' + (x.used || 0) + '/' + (x.devices || 1) : ''}</div>
<div class="lcRow" style="margin-top:8px"><button class="lcBtn" data-l="copy" data-v="${esc(sendText(x.code))}">📋</button>${x.redeemed ? `<button class="lcBtn" data-l="op" data-op="reset" data-id="${esc(x.id)}">📱 ${L('Reset phones', 'فون صاف')}</button>` : ''}${x.revoked ? `<button class="lcBtn" data-l="op" data-op="unrevoke" data-id="${esc(x.id)}">↩️ ${L('Restore', 'بحال')}</button>` : `<button class="lcBtn" data-l="op" data-op="revoke" data-id="${esc(x.id)}">⛔ ${L('Block', 'بند')}</button>`}<button class="lcBtn red" data-l="op" data-op="delete" data-id="${esc(x.id)}">🗑️</button></div></div>`; }).join('') || `<div class="lcSub" style="margin-top:8px">${L('No keys here', 'یہاں کوئی کوڈ نہیں')}</div>`}</div>
<div class="lcBox" style="${APP === 'MCS' ? 'display:none' : ''}"><h3 data-l="pkToggle" style="cursor:pointer">📦 ${L('Packages', 'پیکج')} ${SHOWPK ? '▲' : '▼'}</h3>${SHOWPK ? pkgHTML() : `<div class="lcSub">${L('Names, days and phone limits of your packages — tap to edit', 'پیکجوں کے نام، دن اور فون کی حد — بدلنے کے لیے کھولیں')}</div>`}</div>`;
  }
  /* HD1711TU117 (مالک کا حکم): MCS کا کوڈ اسی بندے کا — MCS نمبر لکھیں → نام / موبائل → 🔑 → MCS008M1-K7Q9XA (صرف اسی کے کاروبار پر، ایک سال) */
  /* HD1711TU119: عام سابقے (Muhammad، Syed، Hafiz…) چھوڑ کر اصل نام — سرور بھی یہی کرتا ہے */
  const SKIPW = /^(MUHAMMAD|MUHAMMED|MOHAMMAD|MOHAMMED|MOHAMAD|MUHAMAD|MOHD|MHD|MUHD|M|MD|SYED|SAYED|SAYYID|SYEDA|HAFIZ|HAFEEZ|MALIK|RANA|CH|CHAUDHRY|CHAUDHARY|CHOUDHRY|CHAUDRY|MIAN|MIA|SHEIKH|SHAIKH|SH|MIR|MIRZA|KHAWAJA|KHWAJA|SARDAR|RAJA|PIR|SYD|ABDUL|ABD|MR|MRS|MS|DR|ENGR|ENG|PROF|HAJI|ALHAJ|QARI|MAULANA|MOLANA|MUFTI|SAHIB|SAB)$/;
  const nameTag = n => { const w = String(n || '').toUpperCase().replace(/[^A-Z\s]/g, ' ').split(/\s+/).filter(Boolean); return (w.find(x => !SKIPW.test(x) && x.length >= 2) || w[0] || '').slice(0, 8); };
  function mcsHTML() {
    /* HD1811WE124 (مالک کا حکم — کوڈ کا نظام ختم): MCS نمبر چنیں → پوری تفصیل → «✅ ایک سال ایکٹیو» */
    const x = LOOK, now = Date.now(), ph = m => String(m || '').replace(/^92/, '0');
    const cnicF = c => { c = String(c || ''); return c.length === 13 ? c.slice(0, 5) + '-' + c.slice(5, 12) + '-' + c.slice(12) : c; };
    const row = (ic, k, v, ltr) => v ? `<div class="lcSub" style="font-size:14px;color:#0f172a;margin-top:5px">${ic} <span style="color:#64748b">${k}:</span> <b${ltr ? ' style="direction:ltr;unicode-bidi:plaintext"' : ''}>${esc(v)}</b></div>` : '';
    const q = MQ.trim().toUpperCase();
    const L2 = MLIST.filter(m => !q || (m.sid + ' ' + (m.name || '') + ' ' + (m.biz || '') + ' ' + ph(m.mob) + ' ' + (m.city || '')).toUpperCase().indexOf(q) >= 0);
    let det = '';
    if (x) {
      const g = x.reg || {}, live = (x.recs || []).some(r => r.until > now), till = Math.max(0, ...(x.recs || []).map(r => r.until || 0));
      det = `<div class="lcItem" style="background:#f8fafc;border:2px solid #16a34a">
<div class="lcRow" style="flex-wrap:nowrap;align-items:flex-start">${x.img ? `<img src="${esc(x.img)}" alt="" style="width:86px;height:86px;border-radius:12px;object-fit:cover;border:2px solid #16a34a;flex:0 0 86px">` : `<div style="width:86px;height:86px;border-radius:12px;background:#e2e8f0;display:flex;align-items:center;justify-content:center;font-size:36px;flex:0 0 86px">👤</div>`}
<div style="flex:1;min-width:0"><div style="font:900 19px/1.3 inherit">${esc(x.name || g.owner || '—')}</div><div class="lcCode" style="font-size:18px;color:#166534">${x.test ? '🧪 ' : ''}${esc(x.sid)}${x.test ? ' <span class="lcTag d">' + L('Test mode', 'ٹیسٹ موڈ') + '</span>' : ''}</div>
<span class="lcTag ${live ? 'u' : 'd'}" style="margin-top:4px">${live ? '✅ ' + L('Active till ', 'ایکٹیو: ') + dmy(till) : '⏳ ' + L('Not active yet', 'ابھی ایکٹیو نہیں')}</span></div></div>
${row('📱', L('Mobile', 'موبائل'), ph(x.mob), 1)}${row('📧', 'Gmail', x.gmail, 1)}${row('🪪', L('CNIC', 'شناختی کارڈ'), cnicF(g.cnic), 1)}
${row('🏪', L('Business', 'کاروبار'), g.biz)}${row('🏷️', L('Category', 'قسم'), g.cat)}${row('📍', L('Address', 'پتہ'), [g.addr, g.area, g.city || g.dist].filter(Boolean).join('، '))}
${row('🏙️', L('District', 'ضلع'), x.district || g.dist)}${row('💬', 'WhatsApp', ph(g.wa), 1)}${row('📲', L('Phone UID', 'فون کی UID'), x.dev, 1)}
${row('🗓️', L('Account made', 'اکاؤنٹ بنا'), x.created ? dmy(x.created) : '')}${row('🆔', L('Membership', 'ممبرشپ'), (x.recs || []).map(r => r.sub).filter(Boolean).join(', ') || x.sub, 1)}
${!g.biz && !(x.recs || []).length ? `<div class="lcMsg bad" style="margin:8px 0 0">${L('No business card yet — ask the person to finish the business form in the app first.', 'ابھی کاروبار کا کارڈ نہیں بنا — بندہ پہلے ایپ میں کاروبار کا فارم مکمل کرے۔')}</div>` : ''}
<button class="lcBtn grn" data-l="mact" style="width:100%;margin-top:12px;padding:14px;font-size:16px" ${BUSY ? 'disabled' : ''}>✅ ${live ? L('Add 1 more year', 'ایک سال مزید بڑھائیں') : L('Activate for 1 year', 'ایک سال کے لیے ایکٹیو کریں')}</button>
<button class="lcBtn" data-l="mclose" style="width:100%;margin-top:6px">↩️ ${L('Back to list', 'فہرست پر واپس')}</button></div>`;
    }
    return `<div class="lcBox"><h3>📋 ${L('New MCS accounts', 'نئے MCS اکاؤنٹ')} (${MLIST.length})</h3>
<div class="lcRow" style="flex-wrap:nowrap"><input type="text" id="lcSid" maxlength="40" value="${esc(MQ)}" placeholder="${L('MCS ID / name / mobile', 'MCS نمبر / نام / موبائل')}" style="direction:ltr"><button class="lcBtn" data-l="look" ${BUSY ? 'disabled' : ''}>🔍</button><button class="lcBtn" data-l="mref" ${BUSY ? 'disabled' : ''}>🔄</button></div>
${det}
${L2.some(m => m.test) ? `<button class="lcBtn red" data-l="twipe" style="width:100%;margin-top:8px" ${BUSY ? 'disabled' : ''}>🗑️ ${L('Clear all test accounts', 'سب ٹیسٹ صاف کریں')} (🧪 ${L2.filter(m => m.test).length})</button>` : ''}
${L2.slice(0, MSHOW).map(m => `<div class="lcItem" data-l="${m.test ? 'mtpick' : 'mpick'}" data-v="${esc(m.test ? m.k : m.sid)}" style="cursor:pointer${m.test ? ';border:2px dashed #f59e0b;background:#fffbeb' : ''}${x && x.sid === m.sid && !!x.test === !!m.test ? ';background:#dcfce7' : ''}"><div class="lcRow" style="flex-wrap:nowrap"><span class="lcCode" style="flex:0 0 auto;color:#166534">${m.test ? '🧪 ' : ''}${esc(m.sid)}</span><b style="flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(m.name || '—')}</b><span class="lcTag ${m.until > now ? 'u' : 'd'}">${m.until > now ? '✅ ' + dmy(m.until) : (m.nBiz || m.biz ? '⏳ ' + L('Waiting', 'انتظار') : '🆕')}</span></div>
<div class="lcSub">${[m.biz, m.city, ph(m.mob)].filter(Boolean).map(esc).join(' · ')}${m.hasImg ? ' · 📷' : ''}${m.at ? ' · ' + dmy(m.at) : ''}</div></div>`).join('') || `<div class="lcSub" style="margin-top:8px">${BUSY ? '⏳' : L('No MCS accounts found', 'کوئی MCS اکاؤنٹ نہیں ملا')}</div>`}
${L2.length > MSHOW ? `<button class="lcBtn" data-l="mmore" style="width:100%;margin-top:8px">⬇️ ${L('Show more', 'مزید دکھائیں')} (${L2.length - MSHOW})</button>` : ''}</div>`;
  }
  /* HD1811WE125 (مالک کا حکم — AIO میں کوڈ ختم): AIO ID لکھیں → بندے کی تفصیل → Play والے پیکج (قیمت) چنیں → ادائیگی کا پیغام → ✅ ایکٹیو
     (سرور aiogrant — اسی ID والا فون خود چالو)؛ معطل / بحال / حذف؛ سب ایکٹیویشنز کی فہرست؛ ہر ایک کا تیار پیغام (کاپی / شیئر) */
  const aPh = m => String(m || '').replace(/^92/, '0');
  function aioMsg(who, ent) {
    if (!who || !ent) return '';
    const h = (ent.hist || [])[ (ent.hist || []).length - 1 ] || {};
    const L1 = ['✅ ' + (APP === 'DR' ? 'AIO POS Direct' : 'AIO POS') + ' — package activated', '', '👤 Name: ' + (who.name || ent.name || ''), '🆔 AIO ID: ' + who.aio];
    if (who.mobile) L1.push('📱 Mobile: ' + aPh(who.mobile)); if (who.gmail) L1.push('✉️ Gmail: ' + who.gmail);
    L1.push('📦 Package: ' + (h.pkg || ent.pkgName || ''), '📅 Activated on: ' + dmy(h.at || Date.now()), ent.life ? '♾️ Valid: Lifetime' : '⏳ Valid till: ' + dmy(ent.exp), '📱 Total phones: ' + (ent.devices || 1));
    if (ent.revoked) L1.push('⛔ Status: Suspended');
    L1.push('', 'Open AIO POS on your phone — it turns on by itself (no code needed).');
    return L1.join('\n');
  }
  function aioHTML() {
    const x = ALOOK, now = Date.now(), act = PK.filter(p => p.active !== false), sel = act.find(p => p.id === APK);
    let det = '';
    if (x) {
      const w = x.who || {}, e = x.ent, live = e && e.active;
      det = `<div class="lcItem" style="background:#f8fafc;border:2px solid #0e7490">
<div style="font:900 19px/1.3 inherit">👤 ${esc(w.name || '—')}</div><div class="lcCode" style="font-size:18px;color:#0e7490">${esc(w.aio)}</div>
<div class="lcSub" style="font-size:14px;color:#0f172a;direction:ltr;text-align:right">📱 ${esc(aPh(w.mobile))}${w.gmail ? ' · ✉️ ' + esc(w.gmail) : ''}</div>
<div class="lcSub">🗓️ ${L('ID made', 'ID بنی')} ${dmy(w.made)}${w.app ? ' · ' + esc(w.app) : ''}</div>
<div style="margin-top:6px">${e ? `<span class="lcTag ${e.revoked ? 'r' : live ? 'u' : 'd'}">${e.revoked ? '⛔ ' + L('Suspended', 'معطل') : live ? '✅ ' + (e.life ? L('Lifetime', 'لائف ٹائم') : L('Active till ', 'ایکٹیو: ') + dmy(e.exp)) : '⌛ ' + L('Ended ', 'ختم ') + dmy(e.exp)}</span> <span class="lcSub">📱 ${e.used || 0}/${e.devices || 1}</span>` : `<span class="lcTag d">🆕 ${L('No package yet', 'ابھی کوئی پیکج نہیں')}</span>`}</div>
${e && (e.hist || []).length ? `<div class="lcSub" style="margin-top:6px">${(e.hist || []).slice().reverse().slice(0, 6).map(h => '• ' + dmy(h.at) + ' — ' + esc(h.pkg) + (h.price ? ' · Rs ' + esc(h.price) : '') + (h.life ? ' · ♾️' : h.exp ? ' → ' + dmy(h.exp) : '')).join('<br>')}</div>` : ''}
${w.replacedBy || (e && e.replacedBy) ? `<div class="lcMsg bad" style="margin:8px 0 0">🔁 ${L('New phone — this ID was replaced by ', 'نیا فون — اس کی جگہ نئی ID: ')}<b data-l="apick" data-v="${esc(w.replacedBy || e.replacedBy)}" style="cursor:pointer;text-decoration:underline">${esc(w.replacedBy || e.replacedBy)}</b>${e && e.leftDays !== null && e.leftDays !== undefined ? ' · ' + (e.leftDays < 0 ? L('had Lifetime', 'لائف ٹائم تھا') : L('days left were ', 'باقی دن تھے: ') + e.leftDays) : ''}</div>` : ''}
${(x.others || []).length ? `<div class="lcItem" style="margin-top:8px;background:#fff7ed;border-color:#fdba74"><b>📱 ${L('Other IDs with the same mobile / Gmail', 'اسی موبائل / Gmail کی دوسری IDs')}</b>${x.others.map(o => `<div class="lcSub" style="margin-top:5px;font-size:13px;color:#0f172a"><b data-l="apick" data-v="${esc(o.aio)}" style="cursor:pointer;color:#0e7490;text-decoration:underline">${esc(o.aio)}</b> · ${esc(o.name || '')} · ${dmy(o.made)} — ${o.ent ? (o.ent.revoked ? '⛔' + (o.ent.leftDays !== null && o.ent.leftDays !== undefined ? ' ' + (o.ent.leftDays < 0 ? '♾️' : L('left ', 'باقی ') + o.ent.leftDays + L(' days', ' دن')) : '') : o.ent.active ? '✅ ' + (o.ent.life ? '♾️' : dmy(o.ent.exp)) : '⌛') : '🆕'}${o.replacedBy ? ' · 🔁 ' + esc(o.replacedBy) : ''}</div>`).join('')}</div>` : ''}
<h3 style="margin:12px 0 6px">➕ ${L('Add days to this ID', 'اس ID میں دن جوڑیں')}</h3>
<div class="lcRow"><button class="lcBtn grn" data-l="aadd" data-v="1" ${BUSY ? 'disabled' : ''}>+1 ${L('day', 'دن')}</button><button class="lcBtn grn" data-l="aadd" data-v="30" ${BUSY ? 'disabled' : ''}>+1 ${L('month', 'مہینہ')}</button><button class="lcBtn grn" data-l="aadd" data-v="365" ${BUSY ? 'disabled' : ''}>+1 ${L('year', 'سال')}</button><button class="lcBtn" data-l="aadd" data-v="life" ${BUSY ? 'disabled' : ''}>♾️ ${L('Lifetime', 'لائف ٹائم')}</button></div>
<div class="lcRow" style="margin-top:6px;flex-wrap:nowrap"><input type="text" id="aAddN" inputmode="numeric" maxlength="4" placeholder="${L('Days', 'دن')}" style="width:90px;flex:0 0 90px;text-align:center;font-weight:800"><button class="lcBtn pri" data-l="aadd" data-v="n" ${BUSY ? 'disabled' : ''}>➕ ${L('Add these days', 'اتنے دن جوڑیں')}</button></div>
<h3 style="margin:12px 0 6px">📦 ${L('Choose package', 'پیکج چنیں')}</h3>
${act.map(p => `<label class="lcItem" style="display:flex;gap:8px;align-items:center;margin-top:6px;${APK === p.id ? 'background:#ecfeff;border-color:#0e7490' : ''}"><input type="radio" name="aPk" data-l="apk" data-v="${esc(p.id)}" ${APK === p.id ? 'checked' : ''}><span style="flex:1;min-width:0"><b>${esc(p.name)}</b><span class="lcSub" style="display:block">${p.life ? L('lifetime', 'لائف ٹائم') : p.days + L(' days', ' دن')} · ${p.devices} ${L('phone(s)', 'فون')}</span></span><input type="text" inputmode="numeric" data-pr="${esc(p.id)}" value="${esc(PRICE[p.id] || '')}" placeholder="${L('Price', 'قیمت')}" style="width:84px;flex:0 0 84px;text-align:center;font-weight:800"></label>`).join('') || `<div class="lcSub">${L('No packages — add them in 📦 Packages below', 'کوئی پیکج نہیں — نیچے 📦 پیکج میں بنائیں')}</div>`}
${sel ? `<div class="lcMsg ok" style="margin:10px 0 0">📦 ${esc(sel.name)} — ${PRICE[sel.id] ? 'Rs ' + esc(PRICE[sel.id]) : L('price not written', 'قیمت نہیں لکھی')}</div>
<div class="lcRow" style="margin-top:8px"><button class="lcBtn" data-l="apay" style="flex:1">💰 ${L('Payment request message', 'ادائیگی کا پیغام')}</button><button class="lcBtn grn" data-l="aact" style="flex:1" ${BUSY ? 'disabled' : ''}>✅ ${L('Activate', 'ایکٹیو کریں')}</button></div>` : ''}
${e ? `<div class="lcRow" style="margin-top:10px"><button class="lcBtn pri" data-l="ashare" data-id="${esc(e.id)}">📤 ${L('Activation message', 'ایکٹیویشن کا پیغام')}</button>${e.revoked ? `<button class="lcBtn" data-l="aop" data-op="unrevoke" data-id="${esc(e.id)}">↩️ ${L('Restore', 'بحال')}</button>` : `<button class="lcBtn" data-l="aop" data-op="revoke" data-id="${esc(e.id)}">⛔ ${L('Suspend', 'معطل')}</button>`}<button class="lcBtn" data-l="aop" data-op="reset" data-id="${esc(e.id)}">📱 ${L('Reset phones', 'فون صاف')}</button><button class="lcBtn red" data-l="aop" data-op="delete" data-id="${esc(e.id)}">🗑️</button></div>` : ''}
${ASHARE ? `<textarea readonly style="width:100%;box-sizing:border-box;margin-top:8px;min-height:170px;border:1.5px solid #dbe1ea;border-radius:10px;padding:8px;font-size:13px;direction:ltr">${esc(ASHARE)}</textarea><div class="lcRow" style="margin-top:6px"><button class="lcBtn grn" data-l="copy" data-v="${esc(ASHARE)}">📋 ${L('Copy', 'کاپی')}</button><button class="lcBtn pri" data-l="send" data-v="${esc(ASHARE)}">📤 ${L('Share', 'شیئر')}</button></div>` : ''}
<button class="lcBtn" data-l="aclose" style="width:100%;margin-top:8px">↩️ ${L('Close', 'بند')}</button></div>`;
    }
    /* HD1811WE127 (مالک کا حکم — ID بھیجنے / منگوانے کا نظام نہیں): سرور پر بنی ہر AIO ID خود یہاں (نام کے ساتھ)؛ ID دبائیں → تفصیل → پیکج */
    const q = AQ.trim().toUpperCase(), ph = m => String(m || '').replace(/^92/, '0');
    const list = AIDS.filter(a => !q || (a.aio + ' ' + (a.name || '') + ' ' + ph(a.mobile) + ' ' + (a.gmail || '')).toUpperCase().indexOf(q) >= 0);
    const nAct = AIDS.filter(a => a.ent && a.ent.active).length;
    return `${det ? `<div class="lcBox">${det}</div>` : ''}
<div class="lcBox"><h3>📋 ${L('All AIO IDs', 'سب AIO IDs')} (${AIDS.length}) <span class="lcTag u">✅ ${nAct}</span></h3>
<div class="lcSub" style="margin:0 0 6px">${L('Every AIO ID made on a phone comes here by itself. Tap an ID → details → choose the package → Activate. The phone switches on by itself.', 'ہر فون پر بنی AIO ID خود یہاں آتی ہے۔ ID دبائیں → تفصیل → پیکج چنیں → ایکٹیو۔ فون خود چالو ہو جاتا ہے۔')}</div>
<div class="lcRow" style="flex-wrap:nowrap"><input type="text" id="lcAio" maxlength="40" value="${esc(AQ)}" placeholder="${L('Search: name / AIO ID / mobile', 'تلاش: نام / AIO ID / موبائل')}" style="direction:ltr"><button class="lcBtn" data-l="aref" ${BUSY ? 'disabled' : ''}>🔄</button></div>
${list.slice(0, ASHOW).map(a => { const e = a.ent; return `<div class="lcItem" data-l="apick" data-v="${esc(a.aio)}" style="cursor:pointer${ALOOK && ALOOK.who && ALOOK.who.aio === a.aio ? ';background:#ecfeff' : ''}"><div class="lcRow" style="flex-wrap:nowrap"><span class="lcCode" style="color:#0e7490">${esc(a.aio)}</span><b style="flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(a.name || '—')}${a.replacedBy ? ' <small title="new phone">🔁 ' + esc(a.replacedBy) + '</small>' : ''}</b><span class="lcTag ${e ? (e.revoked ? 'r' : e.active ? 'u' : 'd') : 'd'}">${e ? (e.revoked ? '⛔' : e.active ? '✅ ' + (e.life ? '♾️' : dmy(e.exp)) : '⌛ ' + dmy(e.exp)) : '🆕'}</span></div>
<div class="lcSub">${[ph(a.mobile), a.gmail, e && e.pkg].filter(Boolean).map(esc).join(' · ')}${a.made ? ' · ' + dmy(a.made) : ''}</div></div>`; }).join('') || `<div class="lcSub" style="margin-top:8px">${BUSY ? '⏳' : L('No AIO IDs found', 'کوئی AIO ID نہیں ملی')}</div>`}
${list.length > ASHOW ? `<button class="lcBtn" data-l="amore" style="width:100%;margin-top:8px">⬇️ ${L('Show more', 'مزید دکھائیں')} (${list.length - ASHOW})</button>` : ''}</div>`;
  }
  function pkgHTML() {
    const e = EDIT || {};
    return `${PK.map(p => `<div class="lcItem"><div class="lcRow"><b style="flex:1">${esc(p.prefix)}</b><span class="lcTag ${p.active === false ? 'r' : 'u'}">${p.active === false ? L('Off', 'بند') : L('On', 'چالو')}</span></div><div class="lcSub">${esc(p.name)} · ${p.life ? L('lifetime', 'لائف ٹائم') : p.days + L(' days', ' دن')} · ${p.devices} ${L('phone(s)', 'فون')}</div>
<div class="lcRow" style="margin-top:8px"><button class="lcBtn" data-l="pkEdit" data-id="${esc(p.id)}">✏️ ${L('Edit', 'بدلیں')}</button><button class="lcBtn red" data-l="pkDel" data-id="${esc(p.id)}">🗑️</button></div></div>`).join('')}
<div class="lcItem" style="background:#f8fafc"><h3>${e.id ? '✏️ ' + L('Edit package', 'پیکج بدلیں') : '➕ ' + L('New package', 'نیا پیکج')}</h3>
<label>${L('Code start (e.g. 1P1-6M)', 'کوڈ کا شروع (مثلاً 1P1-6M)')}</label><input type="text" id="pkPre" value="${esc(e.prefix || '')}" maxlength="14" style="text-transform:uppercase">
<label>${L('Name', 'نام')}</label><input type="text" id="pkNm" value="${esc(e.name || '')}" maxlength="80">
<label>${L('Days', 'دن')}</label><input type="number" id="pkDays" value="${e.days || ''}" inputmode="numeric">
<label>${L('Total phones (owner included)', 'کل فون (مالک سمیت)')}</label><input type="number" id="pkDev" value="${e.devices || 1}" min="1" max="20" inputmode="numeric">
<label style="display:flex;gap:8px;align-items:center"><input type="checkbox" id="pkLife" ${e.life ? 'checked' : ''}> ♾️ ${L('Lifetime', 'لائف ٹائم')}</label>
<label style="display:flex;gap:8px;align-items:center"><input type="checkbox" id="pkOn" ${e.active === false ? '' : 'checked'}> ✅ ${L('Active', 'چالو')}</label>
<div class="lcRow" style="margin-top:10px"><button class="lcBtn pri" data-l="pkSave">💾 ${L('Save', 'محفوظ')}</button>${e.id ? `<button class="lcBtn" data-l="pkNew">${L('Cancel', 'منسوخ')}</button>` : ''}</div></div>`;
  }
  const val = id => { const n = document.getElementById(id); return n ? n.value : ''; };

  async function onClick(ev) {
    const t = ev.target.closest('[data-l]'); if (!t) return;
    const a = t.dataset.l, v = t.dataset.v, id = t.dataset.id;
    if (a === 'close') { const o = document.getElementById('licOv'); if (o) o.remove(); document.body.style.overflow = ''; return; }
    if (a === 'flt') { FILTER = v; draw(); return; }
    /* HD1811WE125: AIO ID پر پیکج */
    if (a === 'aclose') { ALOOK = null; APK = ''; ASHARE = ''; draw(); return; }
    if (a === 'amore') { ASHOW += 40; draw(); return; }
    if (a === 'aadd') {   /* HD1811WE128 (مالک کا حکم): سادہ بٹن — دن / مہینہ / سال / اپنے دن / لائف ٹائم سیدھے اسی ID میں */
      if (!ALOOK) return;
      const life = v === 'life', days = life ? 0 : v === 'n' ? (parseInt(pn(val('aAddN')), 10) || 0) : parseInt(v, 10);
      if (!life && !(days > 0)) { say(L('Write the number of days', 'دن کی تعداد لکھیں'), false); return; }
      if (!confirm(L((life ? 'Give Lifetime' : 'Add ' + days + ' day(s)') + ' to ' + ALOOK.who.aio + ' (' + (ALOOK.who.name || '') + ')?', ALOOK.who.aio + ' (' + (ALOOK.who.name || '') + ') میں ' + (life ? 'لائف ٹائم دیں' : days + ' دن جوڑیں') + '؟'))) return;
      BUSY = true; draw();
      try { ALOOK = await call({ op: 'aioadd', aio: ALOOK.who.aio, days, life }); ASHARE = aioMsg(ALOOK.who, ALOOK.ent); await loadAll(); say('✅ ' + (life ? L('Lifetime given', 'لائف ٹائم دے دیا') : L('Added ', 'جوڑ دیے: ') + days + L(' day(s) — active till ', ' دن — ایکٹیو: ') + dmy(ALOOK.ent && ALOOK.ent.exp)) + L(' · the phone updates by itself', ' · فون خود اپڈیٹ ہو جائے گا'), true); }
      catch (e) { say('⚠️ ' + e.message, false); }
      finally { BUSY = false; draw(); }
      return;
    }
    if (a === 'aref') { AQ = val('lcAio'); BUSY = true; draw(); try { await loadAll(); } finally { BUSY = false; draw(); } return; }
    if (a === 'apk') { APK = v; ASHARE = ''; draw(); return; }
    if (a === 'alook' || a === 'apick') {
      let id = (a === 'apick' ? v : val('lcAio')).toUpperCase().replace(/[^A-Z0-9]/g, ''); if (/^\d{5}$/.test(id)) id = (APP === 'DR' ? 'AIODR' : 'AIO') + id;
      if (a === 'alook') AQ = id; if (!/^AIO(DR)?\d{5}$/.test(id)) { say(L('Write an AIO ID like AIO12345 / AIODR12345', 'AIO ID لکھیں، مثلاً AIO12345 / AIODR12345'), false); return; }
      BUSY = true; ASHARE = ''; APK = ''; draw();
      try { ALOOK = await call({ op: 'aiolook', aio: id }); MSG = ''; } catch (e) { ALOOK = null; say('⚠️ ' + e.message, false); }
      finally { BUSY = false; draw(); const o = document.getElementById('licOv'); if (o) o.scrollTo({ top: 0, behavior: 'smooth' }); }
      return;
    }
    if (a === 'apay') {
      const p = PK.find(x => x.id === APK); if (!p || !ALOOK) return;
      ASHARE = [(APP === 'DR' ? 'AIO POS Direct — ' : 'AIO POS — ') + p.name, '🆔 AIO ID: ' + ALOOK.who.aio, '👤 ' + (ALOOK.who.name || ''), (p.life ? '♾️ Lifetime' : '⏳ ' + p.days + ' days') + ' · 📱 ' + p.devices + ' phone(s)', PRICE[p.id] ? '💰 Amount: Rs ' + PRICE[p.id] : '', '', 'Please send the payment and a screenshot. Your package will be switched on right after — no code needed.'].filter((x, i) => x || i === 5).join('\n');
      draw(); return;
    }
    if (a === 'aact') {
      const p = PK.find(x => x.id === APK); if (!p || !ALOOK) return;
      if (!confirm(L('Activate «' + p.name + '» on ' + ALOOK.who.aio + ' (' + (ALOOK.who.name || '') + ') now?', ALOOK.who.aio + ' (' + (ALOOK.who.name || '') + ') پر «' + p.name + '» ابھی ایکٹیو کریں؟'))) return;
      BUSY = true; draw();
      try { ALOOK = await call({ op: 'aiogrant', aio: ALOOK.who.aio, pkgId: p.id, price: PRICE[p.id] || '' }); ASHARE = aioMsg(ALOOK.who, ALOOK.ent); APK = ''; await loadAll(); say('✅ ' + L('Activated — the customer\'s phone turns on by itself', 'ایکٹیو ہو گیا — گاہک کا فون خود چالو ہو جائے گا'), true); }
      catch (e) { say('⚠️ ' + e.message, false); }
      finally { BUSY = false; draw(); }
      return;
    }
    if (a === 'ashare') { if (ALOOK) { ASHARE = aioMsg(ALOOK.who, ALOOK.ent); draw(); } return; }
    if (a === 'aop') {
      const op = t.dataset.op;
      if (op === 'delete' && !confirm(L('Delete this activation for good? The phone will stop.', 'یہ ایکٹیویشن ہمیشہ کے لیے حذف کریں؟ فون بند ہو جائے گا۔'))) return;
      if (op === 'revoke' && !confirm(L('Suspend this activation? The phone stops within 30 minutes.', 'یہ ایکٹیویشن معطل کریں؟ فون 30 منٹ میں بند ہو جائے گا۔'))) return;
      if (op === 'reset' && !confirm(L('Clear phones? The customer\'s phone joins again by itself.', 'فون صاف کریں؟ گاہک کا فون خود دوبارہ جڑ جائے گا۔'))) return;
      BUSY = true; draw();
      try { await call({ op, id }); if (ALOOK) ALOOK = await call({ op: 'aiolook', aio: ALOOK.who.aio }); await loadAll(); say('✅', true); } catch (e) { say('⚠️ ' + e.message, false); }
      finally { BUSY = false; draw(); }
      return;
    }
    if (a === 'mmore') { MSHOW += 30; draw(); return; }
    if (a === 'mclose') { LOOK = null; MSG = ''; draw(); return; }
    if (a === 'mref') { MQ = val('lcSid'); BUSY = true; draw(); try { await loadAll(); } finally { BUSY = false; draw(); } return; }
    if (APP === 'MCS' && (a === 'look' || a === 'mpick')) {   /* HD1811WE124: تلاش / فہرست سے چننا → پوری تفصیل */
      let q = a === 'mpick' ? v : val('lcSid').trim(); if (a === 'look') MQ = q;
      let sid = q.toUpperCase().replace(/[^A-Z0-9]/g, ''); if (/^\d{1,5}$/.test(sid)) sid = 'MCS' + sid.padStart(3, '0');
      if (!/^MCS\d{1,5}$/.test(sid)) { const hit = MLIST.filter(m => (m.sid + ' ' + (m.name || '') + ' ' + String(m.mob || '').replace(/^92/, '0')).toUpperCase().indexOf(q.toUpperCase()) >= 0); if (hit.length === 1) sid = hit[0].sid; else { LOOK = null; draw(); return; } }
      SID = sid; BUSY = true; draw();
      try { LOOK = await call({ op: 'mcslook', sid }); MSG = ''; } catch (e) { LOOK = null; say('⚠️ ' + e.message, false); }
      finally { BUSY = false; draw(); const o = document.querySelector('#licOv .lcItem[style*="16a34a"]'); if (o) o.scrollIntoView({ block: 'start', behavior: 'smooth' }); }
      return;
    }
    /* HD1811WE130 (مالک کا حکم): 🧪 ٹیسٹ موڈ کے اکاؤنٹ — دیکھیں، ایک سال ایکٹیو (صرف ٹیسٹ خانے میں)، سب ٹیسٹ صاف */
    if (a === 'mtpick') { BUSY = true; draw(); try { LOOK = await call({ op: 'tlook', k: v }); MSG = ''; } catch (e) { LOOK = null; say('⚠️ ' + e.message, false); } finally { BUSY = false; draw(); const o = document.querySelector('#licOv .lcItem[style*="16a34a"]'); if (o) o.scrollIntoView({ block: 'start', behavior: 'smooth' }); } return; }
    if (a === 'twipe') { if (!confirm(L('Delete ALL test-mode accounts from the server?', 'سرور سے سب ٹیسٹ اکاؤنٹ مٹا دیں؟'))) return; BUSY = true; draw(); try { await call({ op: 'twipe' }); LOOK = LOOK && LOOK.test ? null : LOOK; await loadAll(); say('🗑️ ' + L('Test accounts cleared', 'ٹیسٹ اکاؤنٹ صاف ہو گئے'), true); } catch (e) { say('⚠️ ' + e.message, false); } finally { BUSY = false; draw(); } return; }
    if (a === 'mact' && LOOK && LOOK.test) {
      if (!confirm(L('🧪 Test account ' + LOOK.sid + ': activate for 1 year?', '🧪 ٹیسٹ اکاؤنٹ ' + LOOK.sid + ' کو ایک سال کے لیے ایکٹیو کریں؟'))) return;
      BUSY = true; draw();
      try { LOOK = await call({ op: 'tact', k: LOOK.k }); await loadAll(); say('🧪✅ ' + LOOK.sid + ' — ' + L('active till ', 'ایکٹیو: ') + dmy(LOOK.until) + L(' · the test phone turns on within 20 seconds', ' · ٹیسٹ والا فون 20 سیکنڈ میں چالو'), true); }
      catch (e) { say('⚠️ ' + e.message, false); }
      finally { BUSY = false; draw(); }
      return;
    }
    if (a === 'mact') {   /* HD1811WE124: کوڈ کے بغیر ایک سال ایکٹیو */
      if (!LOOK) return;
      if (!confirm(L('Activate ' + LOOK.sid + ' (' + (LOOK.name || '') + ') for 1 year now?', LOOK.sid + ' (' + (LOOK.name || '') + ') کو ابھی ایک سال کے لیے ایکٹیو کریں؟'))) return;
      BUSY = true; draw();
      try { const r = await call({ op: 'mcsact', sid: LOOK.sid }); LOOK = await call({ op: 'mcslook', sid: LOOK.sid }); await loadAll(); say('✅ ' + r.sid + (r.sub ? ' (' + r.sub + ')' : '') + ' — ' + L('active till ', 'ایکٹیو: ') + dmy(r.until) + L(' · the owner sees a congratulations message in the app', ' · گاہک کو ایپ میں مبارکباد کا پیغام'), true); }
      catch (e) { say('⚠️ ' + e.message, false); }
      finally { BUSY = false; draw(); }
      return;
    }
    if (a === 'look' || a === 'mgen') {
      SID = val('lcSid').toUpperCase().replace(/[^A-Z0-9]/g, ''); if (/^\d+$/.test(SID)) SID = 'MCS' + SID.padStart(3, '0');
      if (!/^MCS\d+(M\d+)?$/.test(SID)) { say(L('Enter an MCS ID like MCS008', 'MCS نمبر لکھیں، مثلاً MCS008'), false); return; }
      BUSY = true; draw();
      try {
        if (a === 'look' || !LOOK) { const r = await call({ op: 'mcslook', sid: SID }); LOOK = r; NEW = []; MSG = ''; }
        if (a === 'mgen') { const r = await call({ op: 'gencode', sid: SID, label: val('lcNm') || (LOOK && LOOK.name) || '' }); NEW = r.codes || []; const keep = NEW; await loadAll(); NEW = keep; say('✅ ' + L('Code created', 'کوڈ بن گیا'), true); }
      } catch (e) { LOOK = null; say('⚠️ ' + e.message, false); }
      finally { BUSY = false; draw(); }
      return;
    }
    if (a === 'app') { if (v === APP) return; APP = v; try { localStorage.setItem('lic_app', v); } catch (e) {} NEW = []; CODES = []; MSG = ''; EDIT = null; LOOK = null; SHOWPK = false; loadLocal(); draw(); loadAll(); return; }
    if (a === 'copy') { let ok = false; try { await navigator.clipboard.writeText(v); ok = true; } catch (e) { try { const ta = document.createElement('textarea'); ta.value = v; ta.setAttribute('readonly', ''); ta.style.cssText = 'position:fixed;opacity:0'; document.body.appendChild(ta); ta.select(); ok = document.execCommand('copy'); ta.remove(); } catch (e2) {} } say((ok ? '📋 ' + L('Copied', 'کاپی ہو گیا') + ': ' : '⚠️ ') + v, ok); return; }
    if (a === 'send') { try { if (navigator.share) { await navigator.share({ text: v }); } else { window.open('https://wa.me/?text=' + encodeURIComponent(v), '_blank'); } } catch (e) {} return; }
    if (a === 'copyall') { try { await navigator.clipboard.writeText(NEW.map(c => sendText(c.code)).join('\n')); say('📋 ' + NEW.length, true); } catch (e) { say('⚠️', false); } return; }
    if (a === 'pkToggle') { SHOWPK = !SHOWPK; draw(); return; }
    if (a === 'pkEdit') { EDIT = PK.find(p => p.id === id) || null; SHOWPK = true; draw(); const n = document.getElementById('pkPre'); if (n) n.scrollIntoView({ block: 'center' }); return; }
    if (a === 'pkNew') { EDIT = null; draw(); return; }
    try {
      if (a === 'gen') {
        const pk = id, n = 1, lb = (val('lcLb') || LBL).trim();
        if (!pk) { say(L('Choose a package', 'پیکج چنیں'), false); return; }
        BUSY = true; draw();
        try { const r = await call({ op: 'gencode', pkgId: pk, count: n, label: lb }); NEW = (r.codes || []).map(c => Object.assign({ pkgId: pk }, c)); const keep = NEW; await loadAll(); NEW = keep; say('✅ ' + L('Code created', 'کوڈ بن گیا'), true); }
        finally { BUSY = false; draw(); }
      } else if (a === 'op') {
        if (t.dataset.op === 'delete' && !confirm(L('Delete this key for good?', 'یہ کوڈ ہمیشہ کے لیے حذف کریں؟'))) return;
        if (t.dataset.op === 'reset' && !confirm(L('Clear phones so this key can be used on a new phone?', 'فون صاف کریں تاکہ یہ کوڈ نئے فون پر چل سکے؟'))) return;
        await call({ op: t.dataset.op, id }); await loadAll();
      } else if (a === 'pkSave') {
        const pkg = { id: EDIT && EDIT.id || '', prefix: val('pkPre'), name: val('pkNm'), days: val('pkDays'), devices: val('pkDev'), life: document.getElementById('pkLife').checked, active: document.getElementById('pkOn').checked };
        await call({ op: 'pkgsave', pkg }); EDIT = null; await loadAll(); say('✅ ' + L('Saved', 'محفوظ'), true);
      } else if (a === 'pkDel') {
        if (!confirm(L('Delete this package? Keys already created keep working.', 'یہ پیکج حذف کریں؟ پہلے بنے کوڈ چلتے رہیں گے۔'))) return;
        await call({ op: 'pkgdel', pkgId: id }); await loadAll();
      }
    } catch (e) { say('⚠️ ' + e.message, false); }
  }

  window.licOpen = function (app) {
    if (app === 'MCS' || app === 'AIO' || app === 'DR') { APP = app; try { localStorage.setItem('lic_app', app); } catch (e) {} }
    LOOK = null;
    if (!window.Store || !Store.isOwner || !Store.isOwner()) { try { toast('🔒'); } catch (e) {} return; }
    css();
    let o = document.getElementById('licOv'); if (o) o.remove();
    o = document.createElement('div'); o.id = 'licOv'; o.addEventListener('click', onClick); o.addEventListener('keydown', ev => { if (ev.key === 'Enter' && ev.target && ev.target.id === 'lcSid') { const b = o.querySelector('[data-l=look]'); if (b) b.click(); } if (ev.key === 'Enter' && ev.target && ev.target.id === 'lcAio') { AQ = ev.target.value; const id = AQ.toUpperCase().replace(/[^A-Z0-9]/g, ''); if (/^AIO(DR)?\d{5}$/.test(id)) { const it = document.createElement('i'); it.dataset.l = 'apick'; it.dataset.v = id; o.appendChild(it); it.click(); it.remove(); } else { draw(); const n = document.getElementById('lcAio'); if (n) { n.focus(); n.setSelectionRange(n.value.length, n.value.length); } } } }); o.addEventListener('input', ev => { const t = ev.target; if (t && t.dataset && t.dataset.pr) savePrice(t.dataset.pr, t.value); if (t && t.id === 'lcLb') LBL = t.value; if (t && t.id === 'lcSid') SID = t.value; });
    document.body.appendChild(o); document.body.style.overflow = 'hidden';
    NEW = []; MSG = ''; loadLocal(); draw(); loadAll();
  };
})();
