/* PBT Help Desk — 🔑 License Keys (ایکٹیویشن کوڈ بنانے کا پینل)
   صرف مالک کے لیے۔ پیکج سرور کی فہرست سے آتے ہیں (ہاتھ سے لکھے ہوئے نہیں)؛ کوڈ = پیکج کا نام + 6 حروف، مثلاً 1P1-6M-K7Q9XA۔
   ہر کوڈ ایک ہی بار چلتا ہے؛ استعمال کے بعد «Used» نظر آتا ہے۔ ایپ (AIO POS) کے اندر کوڈ بنانے کا کوئی حصہ نہیں۔ */
(function () {
  'use strict';
  const API = 'https://aio-pos-verify.pbtcodelabs.workers.dev/entadmin', APP = 'AIO';
  const en = () => { try { return LANG === 'en'; } catch (e) { return false; } };
  const L = (e, u) => (en() ? e : u);
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const dmy = ts => { if (!ts) return ''; const d = new Date(ts); return String(d.getDate()).padStart(2, '0') + '/' + String(d.getMonth() + 1).padStart(2, '0') + '/' + d.getFullYear(); };
  let PK = [], CODES = [], FILTER = 'all', NEW = [], BUSY = false, EDIT = null, SHOWPK = false, MSG = '', OK = true;

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
    const m = { no_pkg: ['Package not found / switched off', 'پیکج نہیں ملا / بند ہے'], bad_prefix: ['Name (code start) too short', 'نام (کوڈ کا شروع) بہت چھوٹا ہے'], prefix_taken: ['This name is already used by another package', 'یہ نام کسی اور پیکج کا ہے'], no_days: ['Enter days or choose Lifetime', 'دن لکھیں یا لائف ٹائم چنیں'], not_ready: ['Server not ready', 'سرور تیار نہیں'], bad_op: ['Server is old — upload the new worker.js', 'سرور پرانا ہے — نیا worker.js اپلوڈ کریں'] };
    return m[c] ? L(m[c][0], m[c][1]) : String(c || 'error');
  }

  function say(t, ok) { MSG = t; OK = ok !== false; draw(); }
  async function loadAll() {
    try {
      const [p, l] = await Promise.all([call({ op: 'pkglist' }), call({ op: 'list' })]);
      PK = p.list || []; CODES = (l.list || []).filter(x => (x.keys || []).some(k => k.startsWith('c:')));
      MSG = '';
    } catch (e) { MSG = '⚠️ ' + e.message; OK = false; }
    draw();
  }
  const pkLabel = p => p.prefix + ' — ' + p.name + ' (' + (p.life ? L('lifetime', 'لائف ٹائم') : p.days + L(' days', ' دن')) + ', ' + p.devices + L(' phone(s)', ' فون') + ')';
  const status = x => x.revoked ? ['r', '⛔ ' + L('Revoked', 'بند')] : x.redeemed ? ['d', '✅ ' + L('Used', 'استعمال شدہ') + ' ' + dmy(x.usedAt || x.redeemed)] : ['u', '🆕 ' + L('Unused', 'نیا')];

  function draw() {
    const o = document.getElementById('licOv'); if (!o) return;
    const act = PK.filter(p => p.active !== false);
    const list = CODES.filter(x => FILTER === 'all' || (FILTER === 'unused' && !x.redeemed && !x.revoked) || (FILTER === 'used' && x.redeemed));
    const cnt = f => CODES.filter(x => f === 'all' || (f === 'unused' && !x.redeemed && !x.revoked) || (f === 'used' && x.redeemed)).length;
    o.innerHTML = `<div class="lcTop"><b>🔑 ${L('Generate Activation Codes — AIO POS', 'AIO POS — ایکٹیویشن کوڈ بنائیں')}</b><button class="lcX" data-l="close">✕</button></div>
${MSG ? `<div class="lcMsg ${OK ? 'ok' : 'bad'}">${esc(MSG)}</div>` : ''}
<div class="lcBox"><h3>➕ ${L('Generate keys', 'کوڈ بنائیں')}</h3>
<label>${L('Package', 'پیکج')}</label><select id="lcPk">${act.map(p => `<option value="${esc(p.id)}">${esc(pkLabel(p))}</option>`).join('') || `<option value="">—</option>`}</select>
<label>${L('How many codes', 'کتنے کوڈ')}</label><input type="number" id="lcN" value="1" min="1" max="50" inputmode="numeric">
<label>${L('Customer name / note (optional)', 'گاہک کا نام / نوٹ (اختیاری)')}</label><input type="text" id="lcLb" maxlength="60">
<div class="lcRow" style="margin-top:12px"><button class="lcBtn pri" data-l="gen" ${BUSY || !act.length ? 'disabled' : ''}>🔑 ${BUSY ? '…' : L('Generate License Key', 'لائسنس کی بنائیں')}</button></div>
${NEW.length ? `<div style="margin-top:12px"><h3>🆕 ${L('Just created', 'ابھی بنے')}</h3>${NEW.map(c => `<div class="lcItem"><div class="lcCode">${esc(c.code)}</div><div class="lcSub">${esc(c.pkgName)}</div><div class="lcRow" style="margin-top:6px"><button class="lcBtn grn" data-l="copy" data-v="${esc(c.code)}">📋 ${L('Copy', 'کاپی')}</button></div></div>`).join('')}
<div class="lcRow" style="margin-top:8px"><button class="lcBtn" data-l="copyall">📋 ${L('Copy all', 'سب کاپی')}</button></div></div>` : ''}</div>
<div class="lcBox"><h3>📋 ${L('All keys', 'تمام کوڈ')}</h3>
<div class="lcTabs">${[['all', L('All', 'سب')], ['unused', L('Unused', 'نئے')], ['used', L('Used', 'استعمال شدہ')]].map(([k, t]) => `<button class="${FILTER === k ? 'on' : ''}" data-l="flt" data-v="${k}">${t} (${cnt(k)})</button>`).join('')}</div>
${list.map(x => { const s = status(x); return `<div class="lcItem"><div class="lcRow"><span class="lcCode" style="flex:1">${esc(x.code)}</span><span class="lcTag ${s[0]}">${esc(s[1])}</span></div>
<div class="lcSub">${esc(x.pkgName || (x.pend ? (x.pend.life ? 'Lifetime' : x.pend.days + ' days') + ', ' + x.pend.devices + ' phone(s)' : ''))}${x.label ? ' · 👤 ' + esc(x.label) : ''} · ${L('created', 'بنا')} ${dmy(x.at)}${x.redeemed ? ' · 📱 ' + (x.used || 0) + '/' + (x.devices || 1) : ''}</div>
<div class="lcRow" style="margin-top:8px"><button class="lcBtn" data-l="copy" data-v="${esc(x.code)}">📋</button>${x.redeemed ? `<button class="lcBtn" data-l="op" data-op="reset" data-id="${esc(x.id)}">📱 ${L('Reset phones', 'فون صاف')}</button>` : ''}${x.revoked ? `<button class="lcBtn" data-l="op" data-op="unrevoke" data-id="${esc(x.id)}">↩️ ${L('Restore', 'بحال')}</button>` : `<button class="lcBtn" data-l="op" data-op="revoke" data-id="${esc(x.id)}">⛔ ${L('Block', 'بند')}</button>`}<button class="lcBtn red" data-l="op" data-op="delete" data-id="${esc(x.id)}">🗑️</button></div></div>`; }).join('') || `<div class="lcSub" style="margin-top:8px">${L('No keys here', 'یہاں کوئی کوڈ نہیں')}</div>`}</div>
<div class="lcBox"><h3 data-l="pkToggle" style="cursor:pointer">📦 ${L('Packages', 'پیکج')} ${SHOWPK ? '▲' : '▼'}</h3>${SHOWPK ? pkgHTML() : `<div class="lcSub">${L('Names, days and phone limits of your packages — tap to edit', 'پیکجوں کے نام، دن اور فون کی حد — بدلنے کے لیے کھولیں')}</div>`}</div>`;
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
    if (a === 'copy') { try { await navigator.clipboard.writeText(v); say('📋 ' + v, true); } catch (e) { say('⚠️ ' + v, false); } return; }
    if (a === 'copyall') { try { await navigator.clipboard.writeText(NEW.map(c => c.code).join('\n')); say('📋 ' + NEW.length, true); } catch (e) { say('⚠️', false); } return; }
    if (a === 'pkToggle') { SHOWPK = !SHOWPK; draw(); return; }
    if (a === 'pkEdit') { EDIT = PK.find(p => p.id === id) || null; SHOWPK = true; draw(); const n = document.getElementById('pkPre'); if (n) n.scrollIntoView({ block: 'center' }); return; }
    if (a === 'pkNew') { EDIT = null; draw(); return; }
    try {
      if (a === 'gen') {
        const pk = val('lcPk'), n = Math.max(1, Math.min(50, parseInt(val('lcN'), 10) || 1)), lb = val('lcLb').trim();
        if (!pk) { say(L('Choose a package', 'پیکج چنیں'), false); return; }
        BUSY = true; draw();
        try { const r = await call({ op: 'gencode', pkgId: pk, count: n, label: lb }); NEW = r.codes || []; await loadAll(); say('✅ ' + NEW.length + L(' key(s) created', ' کوڈ بن گئے'), true); }
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

  window.licOpen = function () {
    if (!window.Store || !Store.isOwner || !Store.isOwner()) { try { toast('🔒'); } catch (e) {} return; }
    css();
    let o = document.getElementById('licOv'); if (o) o.remove();
    o = document.createElement('div'); o.id = 'licOv'; o.addEventListener('click', onClick);
    document.body.appendChild(o); document.body.style.overflow = 'hidden';
    NEW = []; MSG = ''; draw(); loadAll();
  };
})();
