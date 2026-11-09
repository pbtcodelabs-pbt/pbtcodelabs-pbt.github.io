/* AGP0911MO018 (مالک کا حکم، ہیلپ ڈیسک #181): پورٹل کا نیا ڈیزائن — مالک کی دی ہوئی دو تصویروں جیسا
   (My City Shines سر + «Agent Portal» کیپسول، پروفائل کارڈ، چار رنگین خانے، Subscription / Transaction History، نیچے پانچ بٹن)
   + MCS کا نیا حساب (سرور /fin2): گوگل سے آنا باقی / وصول، دستی وصولی (اشتہار)، ادائیگی کے اکاؤنٹ + QR، درخواست (کم از کم 1,000)۔ */
(function(){
const NAV = {
  agent: [['home','Home','home'],['subs','Subscriptions','users'],['tx','Transactions','coins'],['earn','My Earnings','bars'],['prof','Profile','user']],
  codev: [['home','Home','home'],['acc','Accounts','bars'],['tx','Transactions','coins'],['earn','My Earnings','wallet'],['prof','Profile','user']],
  dev:   [['home','Home','home'],['acc','Accounts','bars'],['pay','Payouts','wallet'],['agents','Agents','users'],['prof','Profile','user']]
};
const ICON = {
  home: '<path d="M3 11.5 12 4l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
  users: '<circle cx="12" cy="7.5" r="3.2"/><circle cx="5.2" cy="9" r="2.4"/><circle cx="18.8" cy="9" r="2.4"/><path d="M6 20c0-3.6 2.7-6.2 6-6.2s6 2.6 6 6.2zM1 19c0-2.8 1.8-4.8 4.3-4.8 1 0 1.9.3 2.6.8C6.5 16.2 5.6 17.6 5.4 19zM23 19c0-2.8-1.8-4.8-4.3-4.8-1 0-1.9.3-2.6.8 1.4 1.2 2.3 2.6 2.5 4z"/>',
  coins: '<ellipse cx="12" cy="5.5" rx="7.5" ry="2.8"/><path d="M4.5 7.6c0 1.6 3.4 2.9 7.5 2.9s7.5-1.3 7.5-2.9v2.6c0 1.6-3.4 2.9-7.5 2.9S4.5 11.8 4.5 10.2zM4.5 12.6c0 1.6 3.4 2.9 7.5 2.9s7.5-1.3 7.5-2.9v2.6c0 1.6-3.4 2.9-7.5 2.9s-7.5-1.3-7.5-2.9zM4.5 17.6c0 1.6 3.4 2.9 7.5 2.9s7.5-1.3 7.5-2.9v1.4c0 1.6-3.4 2.9-7.5 2.9s-7.5-1.3-7.5-2.9z"/>',
  bars: '<rect x="3" y="13" width="4.5" height="8" rx="1"/><rect x="9.75" y="8" width="4.5" height="13" rx="1"/><rect x="16.5" y="3" width="4.5" height="18" rx="1"/>',
  user: '<circle cx="12" cy="7.5" r="4.2" fill="none" stroke="currentColor" stroke-width="2.4"/><path d="M4 21c0-4.4 3.6-7.5 8-7.5s8 3.1 8 7.5z" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"/>',
  wallet: '<path d="M4 6.5A2.5 2.5 0 0 1 6.5 4H18v3H6.5a.5.5 0 0 0 0 1H20a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H6.5A2.5 2.5 0 0 1 4 17.5z"/><circle cx="16.5" cy="13.5" r="1.6" fill="#fff"/>',
  check: '<circle cx="12" cy="12" r="10"/><path d="m7 12.3 3.2 3.2L17.3 8.4" fill="none" stroke="#178a3a" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/>',
  cal: '<rect x="3" y="4.5" width="18" height="16.5" rx="2.5" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="M3 9h18M8 2.5v4M16 2.5v4" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><g fill="currentColor"><rect x="6.5" y="12" width="3" height="2.6" rx=".5"/><rect x="10.5" y="12" width="3" height="2.6" rx=".5"/><rect x="14.5" y="12" width="3" height="2.6" rx=".5"/><rect x="6.5" y="16" width="3" height="2.6" rx=".5"/><rect x="10.5" y="16" width="3" height="2.6" rx=".5"/></g>',
  copy: '<rect x="8" y="8" width="12" height="13" rx="2" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="M16 8V5a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h2" fill="none" stroke="currentColor" stroke-width="2.2"/>',
  lock: '<rect x="5" y="10.5" width="14" height="10.5" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="15.7" r="1.4"/>',
  eye: '<path d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12z" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="2"/><path d="M4 4l16 16" stroke="currentColor" stroke-width="2"/>',
  login: '<path d="M10 4h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-8" fill="none" stroke="currentColor" stroke-width="2.4"/><path d="M3 12h11M10 8l4 4-4 4" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>',
  exit: '<path d="M14 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8" fill="none" stroke="currentColor" stroke-width="2.4"/><path d="M10 12h11M17 8l4 4-4 4" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>'
};
const ic = (k, s, c) => `<svg viewBox="0 0 24 24" width="${s||22}" height="${s||22}" fill="${c||'currentColor'}" aria-hidden="true">${ICON[k]||''}</svg>`;
const ROLEK = () => ROLE === 'admin' ? 'dev' : ROLE === 'codev' ? 'codev' : 'agent';
const PILL = {agent: 'Agent Portal', codev: 'Co-Developer Portal', dev: 'Developer Portal'};
const LPILL = {agent: 'Agent App', codev: 'Co-Developer App', dev: 'Developer App'};
const LTITLE = {agent: ['Agent Login','ایجنٹ لاگ اِن'], codev: ['Co-Developer Login','کو-ڈویلپر لاگ اِن'], dev: ['Developer Login','ڈویلپر لاگ اِن']};
const FIELD = {agent: 'Agent Code', codev: 'Co-Developer Code', dev: 'Developer Code'};
const AUTH = {agent: 'Authorized Agents Only', codev: 'Authorized Co-Developers Only', dev: 'Developer Only'};
let TAB = 'home', FM = null, FME = null, PEOPLE = null, CDME = null;
const Rs = n => 'Rs. ' + N(n);
const dmy = t => { if(!t) return '—'; const d = new Date(t); return String(d.getDate()).padStart(2,'0') + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + d.getFullYear(); };
const ph0 = p => { p = String(p||''); return p.startsWith('92') ? '0' + p.slice(2) : p; };
const mask = a => { a = String(a||'').replace(/\s/g,''); return a.length > 4 ? '****' + a.slice(-4) : (a || '—'); };
const photo = () => { try{ return localStorage.getItem('agp_photo_' + ROLE) || ''; }catch(e){ return ''; } };
document.body.classList.add('v2');

/* ---------- ہیرو (سر) ---------- */
function hero(rk){
  return `<div class="v2hero"><img src="img/head-portal.jpg" alt="My City Shines" draggable="false">
    <button class="hz hzMenu" onclick="v2Menu()" aria-label="Menu"></button>
    <button class="hz hzBell" onclick="v2Bell()" aria-label="Notifications"></button><span class="hbadge" id="v2bd" hidden></span>
    <button class="hz hzOut" onclick="v2Logout()" aria-label="Log out"></button>
    ${rk !== 'agent' ? `<div class="hpill"><span class="hpI">🤝</span>${PILL[rk]}</div>` : ''}</div>`;
}
function navBar(rk){
  return `<nav class="v2nav">${NAV[rk].map(([k, t, i]) => `<button class="${TAB === k ? 'on' : ''}" onclick="v2Go('${k}')">${ic(i, 30)}<span>${t}</span></button>`).join('')}</nav>`;
}
function page(rk, body){
  app.innerHTML = `<div class="v2wrap">${hero(rk)}<div class="v2body">${body}</div>${navBar(rk)}</div>`;
  window.scrollTo(0, 0);
}
function sec(icon, title, body, all){ return `<div class="v2sec"><div class="v2sh">${ic(icon, 28)}<b>${title}</b>${all ? `<button onclick="v2Go('${all}')">View All →</button>` : ''}</div><div class="v2sb">${body}</div></div>`; }
function table(heads, rows, empty){ return `<div class="v2tw"><table class="v2t"><tr>${heads.map(h => `<th>${h}</th>`).join('')}</tr>${rows.length ? rows.join('') : `<tr><td colspan="${heads.length}" class="v2empty">${empty || '—'}</td></tr>`}</table></div>`; }
function tiles(t){ return `<div class="v2tiles">${t.map(x => `<div class="v2tile ${x.c}">${ic(x.i, 34, '#fff')}<span class="tl">${x.t}</span><b>${x.v}</b>${x.sub ? `<div class="tsub">${x.sub}</div>` : ''}</div>`).join('')}</div>`; }
const stTag = r => { const live = r.until > Date.now(); return r.paid > 0 ? (live ? '<span class="v2st ok">Active</span>' : '<span class="v2st ex">Expired</span>') : (live ? '<span class="v2st tr">Trial</span>' : '<span class="v2st no">Pending</span>'); };

/* ---------- ایجنٹ ---------- */
function agHome(s){
  const f = s.fin || {due: s.due, paid: s.paidOut, balance: s.balance, pays: s.pays || []};
  const active = s.refs.filter(r => r.paid > 0 && r.until > Date.now()).length;
  const pr = photo();
  return `<div class="v2card v2prof">
      <div class="v2ph" onclick="v2Go('prof')">${pr ? `<img src="${pr}">` : `<img src="img/avatar.png">`}</div>
      <div class="v2pi"><div class="aid">Agent ID: <span>${E(ph0(s.agent.phone))}</span></div><div class="anm">${E(s.agent.name)}</div><div class="aact">${s.agent.off ? '<span class="off">⛔ Inactive</span>' : `<span>${ic('check', 18, '#fff')} Active Agent</span>`}</div></div>
      <div class="v2div"></div>
      <div class="v2ref"><div class="rt">🎖️ <span>Referral Code</span></div><button class="rc" onclick="cpy('${E(s.agent.code)}')">${E(s.agent.code)} ${ic('copy', 20)}</button></div>
      <div class="v2qr" id="v2qr" data-code="${E(s.agent.code)}" onclick="v2QrBig()"></div></div>
    ${tiles([{c:'tb', i:'users', t:'Total<br>Subscriptions', v:N(s.refs.length)}, {c:'tg', i:'check', t:'Active<br>Subscriptions', v:N(active)}, {c:'tp', i:'coins', t:'Total Earnings<br>(Commission)', v:'<small>Rs.</small> ' + N(f.due)}, {c:'to', i:'wallet', t:'Received Amount', v:'<small>Rs.</small> ' + N(f.paid), sub:`Balance: <em>${Rs(f.balance)}</em>`}])}
    ${sec('cal', 'Subscription History', subsTable(s.refs.slice(0, 3)), 'subs')}
    ${sec('coins', 'Transaction History', txTable(f, 3), 'tx')}`;
}
function subsTable(refs){
  return table(['S.No','Account ID','Name','Subscription ID','Expiry Date','Status'], refs.map((r, i) => `<tr><td>${i+1}</td><td class="n">${E(ph0(r.phone) || '—')}</td><td>${E(r.name)}</td><td class="n">${E(String(r.rk||'').split('_').pop().toUpperCase())}</td><td class="n">${dmy(r.until)}</td><td>${stTag(r)}</td></tr>`), 'ابھی کوئی کاروبار نہیں');
}
function txTable(f, lim){
  const pays = (f.pays || []).slice().sort((a, b) => a.ts - b.ts); let bal = f.due || 0; const rows = pays.map(p => { bal -= p.amount || 0; return Object.assign({}, p, {rem: bal}); }).reverse();
  return table(['S.No','Date','Payment Method','Account No.','Amount','Rem. Balance'], (lim ? rows.slice(0, lim) : rows).map((p, i) => `<tr><td>${i+1}</td><td class="n">${dmy(p.ts)}</td><td>${E(p.method || (p.note ? p.note.slice(0, 18) : '—'))}</td><td class="n">${E(p.acct || '—')}</td><td class="n">${Rs(p.amount)}</td><td class="n">${Rs(p.rem)}</td></tr>`), 'ابھی کوئی ادائیگی نہیں');
}
function earnHtml(f, who){
  const pol = `<div class="v2note">📅 ادائیگی ہر مہینے <b>20 سے 25 تاریخ</b> کے درمیان — کم از کم <b class="num">${Rs(f.min || 1000)}</b>؛ اس سے کم رقم اگلے مہینے میں جمع ہوتی رہتی ہے۔ گوگل پلے والی ممبرشپ کا حصہ گوگل سے رقم آنے کے بعد «✅ تیار» ہوتا ہے۔</div>`;
  const req = f.req ? `<div class="v2ok">🙏 آپ کی ادائیگی کی درخواست (<b class="num">${Rs(f.req.amount)}</b>) ${dmy(f.req.ts)} کو بھیجی گئی — ڈویلپر جلد ادا کریں گے</div>`
    : f.canReq ? `<button class="v2btn g" onclick="v2Req()">🙏 ابھی ادائیگی کی درخواست کریں — ${Rs(f.avail)}</button>`
    : `<div class="v2mut">🙏 درخواست کا بٹن تب کھلے گا جب تیار رقم ${Rs(f.min || 1000)} یا زیادہ ہو (ابھی ${Rs(f.avail)})</div>`;
  return `${tiles([{c:'tp', i:'coins', t:'Total Earnings', v:'<small>Rs.</small> ' + N(f.due)}, {c:'tg', i:'check', t:'✅ Ready<br>(تیار)', v:'<small>Rs.</small> ' + N(f.ready)}, {c:'tb', i:'cal', t:'⏳ Google Pending<br>(گوگل سے آنا باقی)', v:'<small>Rs.</small> ' + N(f.pending)}, {c:'to', i:'wallet', t:'Received Amount', v:'<small>Rs.</small> ' + N(f.paid), sub:`Available: <em>${Rs(f.avail)}</em>`}])}
    <div class="v2card">${pol}${req}${f.acct ? '' : `<div class="v2warn">🏦 ادائیگی کے لیے اپنا اکاؤنٹ (ایزی پیسہ / جاز کیش / بینک) <a href="#" onclick="v2Go('prof');return false">Profile</a> میں لکھیں</div>`}</div>
    ${sec('bars', 'Monthly Earnings', table(['Month','Sales','Earned','Ready','Status'], (f.months || []).map(m => `<tr><td>${monName(m.mon)}</td><td class="n">${m.n}</td><td class="n">${Rs(m.amt)}</td><td class="n">${Rs(m.ready)}</td><td>${m.ready >= m.amt ? '<span class="v2st ok">Ready</span>' : '<span class="v2st tr">Google</span>'}</td></tr>`), 'ابھی کوئی کمائی نہیں'))}`;
}
async function v2Req(){ if(!confirm('ادائیگی کی درخواست بھیجیں؟')) return; const r = await finCall({op:'req'}); if(!r || !r.ok) return alert(r && r.reason === 'already' ? 'درخواست پہلے سے بھیجی ہوئی ہے' : 'ابھی کم از کم رقم پوری نہیں'); toast('✅ درخواست بھیج دی گئی'); v2Refresh(); }
function acctForm(a){
  a = a || {};
  const M = ['Easypaisa','JazzCash','Bank Transfer'];
  return `<div class="v2card"><h2>🏦 ادائیگی کا اکاؤنٹ</h2><div class="v2mut">یہی اکاؤنٹ ڈویلپر کو نظر آئے گا اور اسی پر آپ کو رقم بھیجی جائے گی</div>
    <label>طریقہ</label><select id="acM">${M.map(m => `<option ${a.method === m ? 'selected' : ''}>${m}</option>`).join('')}</select>
    <label>اکاؤنٹ ٹائٹل (نام)</label><input id="acT" value="${E(a.title||'')}">
    <label>اکاؤنٹ / موبائل نمبر</label><input id="acN" dir="ltr" inputmode="numeric" value="${E(a.number||'')}">
    <label>IBAN (بینک ہو تو)</label><input id="acI" dir="ltr" value="${E(a.iban||'')}">
    <label>بینک کا نام / برانچ</label><input id="acB" value="${E(a.bank||'')}">
    <label>QR کوڈ کی تصویر (اختیاری)</label><div class="att"><label>🖼️ تصویر چنیں<input type="file" accept="image/*" onchange="v2QrPick(this)"></label></div><div class="prev" id="acQ">${a.qr ? `<img src="${a.qr}">` : ''}</div>
    <div class="btns"><button onclick="v2AcctSave()">💾 محفوظ کریں</button></div></div>`;
}
let acQr = null;
window.v2QrPick = async inp => { const f = inp.files && inp.files[0]; if(!f) return; acQr = await shrink(f, 700, .8); $('#acQ').innerHTML = `<img src="${acQr}">`; };
window.v2AcctSave = async () => {
  const cur = (ROLEK() === 'agent' ? (S && S.fin && S.fin.acct) : (CDME && CDME.acct)) || {};
  const acct = {method: $('#acM').value, title: $('#acT').value.trim(), number: $('#acN').value.trim(), iban: $('#acI').value.trim(), bank: $('#acB').value.trim(), qr: acQr != null ? acQr : (cur.qr || '')};
  if(!acct.number && !acct.iban) return alert('اکاؤنٹ نمبر یا IBAN لکھیں');
  const r = await finCall({op:'acct', acct}); if(!r || !r.ok) return alert('محفوظ نہیں ہو سکا'); acQr = null; toast('✅ اکاؤنٹ محفوظ'); v2Refresh();
};
function finCall(x){
  const rk = ROLEK();
  if(rk === 'dev') return admCall('/fin2', Object.assign({as:'dev'}, x));
  const c = rk === 'agent' ? (ls.get('me') || {}) : (ls.get('cd') || {});
  return post('/fin2', Object.assign({as: rk === 'agent' ? 'agent' : 'cd', phone: c.phone, pin: c.pin}, x));
}
function profHtml(name, lines, acct){
  const pr = photo();
  return `<div class="v2card v2pp"><div class="v2ph big">${pr ? `<img src="${pr}">` : `<img src="img/avatar.png">`}</div><div><div class="anm">${E(name)}</div>${lines}<div class="att" style="margin-top:6px"><label>📷 تصویر بدلیں<input type="file" accept="image/*" onchange="v2Photo(this)"></label></div></div></div>
    ${acct !== false ? acctForm(acct) : ''}
    <div class="v2card"><div class="v2list">
      <button onclick="v2Chat()">💬 ڈویلپر سے چیٹ</button>
      ${ROLEK() === 'agent' ? `<button onclick="v2Proof()">📸 دکاندار کی ادائیگی کا ثبوت بھیجیں</button><a href="guide.html" target="_blank" rel="noopener"><button>📄 MCS ایجنٹ کیسے بنیں — طریقہ</button></a>` : ''}
      <button onclick="openHelpDesk()">🛠️ Help Desk — مسئلہ / مشورہ</button>
      <button onclick="roleSwitch()">🔄 لاگ اِن بدلیں</button>
      <button class="red" onclick="v2Logout()">🚪 لاگ آؤٹ</button></div>
      <div class="v2ver">پی بی ٹی کوڈ لیبز · <span class="num">${AGP_VER}</span></div></div>`;
}
window.v2Photo = async inp => { const f = inp.files && inp.files[0]; if(!f) return; const d = await shrink(f, 300, .82); try{ localStorage.setItem('agp_photo_' + ROLE, d); }catch(e){} v2Render(); };

/* ---------- کو-ڈویلپر ---------- */
async function cdLoad(){ const c = ls.get('cd') || {}; const r = await post('/fin2', {as:'cd', phone: c.phone, pin: c.pin, op:'me'}); if(!r || !r.ok) return null; CDME = r; return r; }

/* ---------- ڈویلپر ---------- */
function monthHtml(m, ro){
  const T = m.totals || {}, rv = m.recv;
  const g = m.play ? (rv ? `<div class="v2ok">✅ گوگل سے وصول: <b class="num">${Rs(rv.amount)}</b> (${dmy(rv.at)}) — اصل کٹوتی <b class="num">${Rs(m.gAct)}</b>${ro ? '' : ` <button class="sm" onclick="v2Grecv(true)">✖ واپس «آنا باقی»</button>`}</div>`
      : `<div class="v2warn">⏳ گوگل سے آنا باقی — پلے کی فروخت <b class="num">${Rs(m.play)}</b>، اندازاً ملے گا <b class="num">${Rs(m.play - m.gEst)}</b>${ro ? '' : `<div class="btns"><input id="grA" class="num" inputmode="numeric" placeholder="${m.play - m.gEst}" style="max-width:150px"><button onclick="v2Grecv()">✅ وصول — بینک میں آ گیا</button></div>`}</div>`)
    : '';
  const who = l => l.by === 'agent' ? '🤝 ' + E(l.agent || l.code) : l.by === 'dev' ? '👨‍💻 PBT-D' : l.by === 'codev' ? '👥 PBT-C' : '🏢 PBT';
  return `<div class="v2card"><div class="v2mon"><button onclick="v2Mon(-1)">‹</button><b>${monName(FMON)}</b><button onclick="v2Mon(1)">›</button></div>
      ${tiles([{c:'tb', i:'coins', t:'کل وصولی<br>(Gross)', v:'<small>Rs.</small> ' + N(m.gross)}, {c:'tg', i:'check', t:'▶️ Google Play', v:'<small>Rs.</small> ' + N(m.play)}, {c:'tp', i:'wallet', t:'🏦 Direct<br>(سیدھی / اشتہار)', v:'<small>Rs.</small> ' + N(m.direct)}, {c:'to', i:'cal', t:'🛠️ Maintenance', v:'<small>Rs.</small> ' + N(T.maint)}])}${g}</div>
    ${sec('bars', 'تقسیم — ' + monName(FMON), table(['مد','رقم'], [['🟦 گوگل', T.google], ['🛠️ مینٹیننس', T.maint], ['🤝 ایجنٹ', T.agent], ['👨‍💻 ڈویلپر', T.dev], ['👥 کو-ڈویلپر', T.codev]].map(([a, b]) => `<tr><td>${a}</td><td class="n">${Rs(b)}</td></tr>`).concat([`<tr class="tot"><td>کل</td><td class="n">${Rs(m.gross)}</td></tr>`])))}
    ${ro ? '' : `<div class="v2card"><h2>➕ وصولی درج کریں (اشتہار یا سیدھی ممبرشپ)</h2><div class="v2mut">Account Access سے دی گئی ممبرشپ خود درج ہو جاتی ہے — یہاں صرف وہ لکھیں جو کہیں اور درج نہیں (جیسے اشتہار کے 800)</div>
      <div class="btns"><select id="xK" style="max-width:170px"><option value="ad">📢 اشتہار</option><option value="mem">⭐ ممبرشپ</option></select><input id="xA" class="num" inputmode="numeric" placeholder="رقم" style="max-width:120px"></div>
      <label>لانے والا (ایجنٹ کوڈ / PBT-D / PBT-C / خالی = PBT)</label><input id="xR" dir="ltr" placeholder="MS-001">
      <label>کاروبار کا نام / نوٹ</label><input id="xB"><div class="btns"><button onclick="v2Xadd()">💾 درج کریں — تقسیم خود</button></div></div>`}
    ${sec('coins', 'فروخت / وصولی (' + m.lines.length + ')', table(['تاریخ','قسم','رقم','لانے والا','ایجنٹ','ڈویلپر','کو-ڈویلپر'], m.lines.slice().reverse().map(l => `<tr><td class="n">${dmy(l.ts)}</td><td>${l.kind === 'ad' ? '📢' : '⭐'} ${l.src === 'play' ? '▶️' : '🏦'}${l.units > 1 ? ' ×' + l.units : ''}${l.manual && !ro ? ` <button class="sm" onclick="v2Xdel('${l.id}')">✖</button>` : ''}</td><td class="n">${N(l.amount)}</td><td>${who(l)}</td><td class="n">${N(l.sh.agent)}</td><td class="n">${N(l.sh.dev)}</td><td class="n">${N(l.sh.codev)}</td></tr>`), 'اس مہینے کچھ نہیں'))}
    ${(m.agents || []).length ? sec('users', 'ایجنٹوں کا کمیشن', table(['ایجنٹ','فروخت','کمیشن'], m.agents.map(a => `<tr><td>${E(a.name || a.code)} <span class="num">${E(a.code)}</span></td><td class="n">${a.n}</td><td class="n">${Rs(a.amt)}</td></tr>`))) : ''}`;
}
let FMON = '';
window.v2Mon = d => { FMON = monStep(FMON, d); FM = null; v2Render(); };
window.v2Grecv = async clear => { const v = clear ? '' : ($('#grA').value.trim() || $('#grA').placeholder); if(!clear && !confirm(monName(FMON) + ' — گوگل سے ' + Rs(v) + ' بینک میں آ گئے؟')) return; FM = await finCall({op:'grecv', mon: FMON, amount: v}); v2Render(); };
window.v2Xadd = async () => { const a = parseInt(enD($('#xA').value), 10); if(!(a > 0)) return alert('رقم لکھیں'); const k = $('#xK').value; if(!confirm((k === 'ad' ? 'اشتہار' : 'ممبرشپ') + ' — ' + Rs(a) + ' درج کریں؟')) return; FM = await finCall({op:'xadd', kind: k, amount: a, ref: $('#xR').value.trim(), biz: $('#xB').value.trim(), note: $('#xB').value.trim()}); FMON = FM.mon || FMON; v2Render(); };
window.v2Xdel = async id => { if(!confirm('یہ وصولی ہٹا دیں؟')) return; FM = await finCall({op:'xdel', id, mon: FMON}); v2Render(); };
function payoutsHtml(P){
  const req = P.reqs || [];
  return `${req.length ? `<div class="v2warn">🙏 ${req.length} ادائیگی کی درخواستیں — نیچے پیلے نشان والے</div>` : ''}<div class="v2note">📅 ادائیگی ہر مہینے 20 سے 25 تاریخ، کم از کم Rs. 1,000 (تیار رقم)</div>
    ${P.list.map((p, i) => { const a = p.acct || {}; return `<div class="v2card v2pc ${p.req ? 'rq' : ''}"><div class="pch"><b>${p.kind === 'agent' ? '🤝' : '👥'} ${E(p.name)}</b> <span class="num">${E(p.code || ph0(p.phone))}</span>${p.req ? ` <span class="v2st tr">🙏 ${Rs(p.req.amount)}</span>` : ''}</div>
      <div class="pcs"><span>کل <b class="num">${N(p.due)}</b></span><span>⏳ گوگل <b class="num">${N(p.pending)}</b></span><span>ادا <b class="num">${N(p.paid)}</b></span><span class="av">✅ تیار <b class="num">${N(p.avail)}</b></span></div>
      ${p.acct ? `<div class="pca">${a.qr ? `<img src="${a.qr}" onclick="v2Img(this.src)">` : ''}<div>🏦 <b>${E(a.method||'')}</b> — ${E(a.title||'')}<br><span class="num">${E(a.number||'')}</span> ${a.number ? CP(a.number) : ''}${a.iban ? `<br><span class="num">${E(a.iban)}</span> ${CP(a.iban)}` : ''}${a.bank ? '<br>' + E(a.bank) : ''}</div></div>` : '<div class="v2mut">🏦 اکاؤنٹ ابھی نہیں لکھا</div>'}
      <div class="btns"><button onclick="v2Pay(${i})" ${p.avail > 0 ? '' : 'class="sec"'}>✅ ادا کر دیا…</button>${p.kind === 'agent' ? `<button class="sec" onclick="admOpen('${E(p.code)}')">📋 تفصیل</button>` : ''}</div></div>`; }).join('') || '<div class="v2card">ابھی کوئی ایجنٹ / کو-ڈویلپر نہیں</div>'}`;
}
let payImg = '';
window.v2Pay = i => { const p = PEOPLE.list[i], a = p.acct || {}; payImg = '';
  const box = document.createElement('div'); box.className = 'v2modal'; box.innerHTML = `<div class="v2card"><h2>✅ ادائیگی — ${E(p.name)}</h2>
    <label>رقم</label><input id="pyA" class="num" inputmode="numeric" value="${p.avail || ''}">
    <label>طریقہ</label><input id="pyM" value="${E(a.method || 'Easypaisa')}">
    <label>اکاؤنٹ</label><input id="pyN" dir="ltr" value="${E(mask(a.number || a.iban))}">
    <label>نوٹ / TID</label><input id="pyT">
    <div class="att"><label>🖼️ رسید کا اسکرین شاٹ<input type="file" accept="image/*" onchange="v2PayImg(this)"></label></div><div class="prev" id="pyP"></div>
    <div class="btns"><button onclick="v2PayGo(${i})">💾 درج کریں</button><button class="sec" onclick="this.closest('.v2modal').remove()">✖ رہنے دیں</button></div></div>`;
  document.body.appendChild(box); };
window.v2PayImg = async inp => { const f = inp.files && inp.files[0]; if(!f) return; payImg = await shrink(f, 1100, .72); $('#pyP').innerHTML = `<img src="${payImg}">`; };
window.v2PayGo = async i => { const p = PEOPLE.list[i], amount = parseInt(enD($('#pyA').value), 10); if(!(amount > 0)) return alert('رقم لکھیں'); if(!confirm(p.name + ' کو ' + Rs(amount) + ' ادا ہو گئے؟')) return;
  const r = await finCall({op:'payout', who: p.key, amount, method: $('#pyM').value, acctNo: $('#pyN').value, note: $('#pyT').value, img: payImg}); if(!r || !r.ok) return alert('درج نہیں ہو سکا');
  document.querySelector('.v2modal') && document.querySelector('.v2modal').remove(); toast('✅ ادائیگی درج'); PEOPLE = null; v2Render(); };
window.v2Img = src => { const b = document.createElement('div'); b.className = 'v2modal'; b.onclick = () => b.remove(); b.innerHTML = `<img src="${src}" style="max-width:92vw;max-height:86vh;border-radius:12px;background:#fff">`; document.body.appendChild(b); };

/* ---------- رینڈر ---------- */
async function v2Render(){
  const rk = ROLEK();
  try{
    if(rk === 'agent'){
      if(!S){ const me = ls.get('me'); if(!me || !me.pin) return agLogin(); const r = await post('/agportal', {phone: me.phone, pin: me.pin}); if(!r.ok){ ls.set('me', {phone: me.phone}); return agLogin('❌ PIN درست نہیں'); } S = r; }
      const f = S.fin || {due: S.due, paid: S.paidOut, balance: S.balance, pays: S.pays, months: []};
      const body = TAB === 'subs' ? subsFull(S.refs)
        : TAB === 'tx' ? txFull(f)
        : TAB === 'earn' ? earnHtml(f) + stmtBtn()
        : TAB === 'prof' ? agProf(S) + profHtml(S.agent.name, '', f.acct)
        : agHome(S);
      page('agent', body); badge(S.unread); if(TAB === 'home' || TAB === 'prof') v2Qr(S.agent.code); return;
    }
    if(rk === 'codev'){
      if(!CDME && !(await cdLoad())) return cdLogin('دوبارہ لاگ اِن کریں');
      const c = ls.get('cd') || {}; FMON = FMON || monNow();
      if(TAB === 'acc' && !FM) FM = await post('/fin2', {as:'cd', phone: c.phone, pin: c.pin, op:'month', mon: FMON});
      const f = CDME;
      const body = TAB === 'acc' ? monthHtml(FM, true)
        : TAB === 'tx' ? txFull(f)
        : TAB === 'earn' ? earnHtml(f) + stmtBtn()
        : TAB === 'prof' ? profHtml((CDV && CDV.name) || 'کو-ڈویلپر', `<div class="v2mut">📱 <span class="num">${E(ph0(c.phone))}</span></div>`, f.acct)
        : `<div class="v2card v2prof"><div class="v2ph" onclick="v2Go('prof')"><img src="${photo() || 'img/avatar.png'}"></div><div class="v2pi"><div class="aid">Co-Developer</div><div class="anm">${E((CDV && CDV.name) || '')}</div><div class="aact"><span>${ic('check', 18, '#fff')} Active</span></div></div></div>
           ${tiles([{c:'tb', i:'coins', t:'Total Earnings', v:'<small>Rs.</small> ' + N(f.due)}, {c:'tg', i:'check', t:'✅ Ready', v:'<small>Rs.</small> ' + N(f.ready)}, {c:'tp', i:'cal', t:'⏳ Google Pending', v:'<small>Rs.</small> ' + N(f.pending)}, {c:'to', i:'wallet', t:'Received Amount', v:'<small>Rs.</small> ' + N(f.paid), sub:`Balance: <em>${Rs(f.balance)}</em>`}])}
           ${sec('coins', 'Transaction History', txTable(f, 3), 'tx')}`;
      page('codev', body); badge(f.unread); return;
    }
    FMON = FMON || monNow();
    if((TAB === 'acc' || TAB === 'home') && !FM) FM = await finCall({op:'month', mon: FMON});
    if((TAB === 'pay' || TAB === 'home') && !PEOPLE) PEOPLE = await finCall({op:'people'});
    if(!FM || FM.ok === false || !PEOPLE || PEOPLE.ok === false){ return admLogin('دوبارہ لاگ اِن کریں'); }
    const reqs = (PEOPLE.reqs || []).length, owe = PEOPLE.list.reduce((a, p) => a + (p.avail || 0), 0);
    const body = TAB === 'acc' ? monthHtml(FM, false)
      : TAB === 'pay' ? payoutsHtml(PEOPLE)
      : TAB === 'agents' ? '<div id="v2ag"><div class="v2card">⏳ …</div></div>'
      : TAB === 'prof' ? profHtml('ڈویلپر — PBT Code Labs', '<div class="v2mut">👨‍💻 سب ایجنٹ، حساب، ادائیگیاں</div><button class="sec" style="margin-top:6px" onclick="v2Log()">📜 حساب کا آڈٹ لاگ</button>', false)
      : `<div class="v2card v2prof"><div class="v2ph" onclick="v2Go('prof')"><img src="${photo() || 'img/avatar.png'}"></div><div class="v2pi"><div class="aid">Developer</div><div class="anm">PBT Code Labs</div><div class="aact"><span>${ic('check', 18, '#fff')} Owner</span></div></div></div>
         ${tiles([{c:'tb', i:'coins', t:'اس مہینے<br>کل وصولی', v:'<small>Rs.</small> ' + N(FM.gross)}, {c:'tg', i:'check', t:FM.recv ? '✅ گوگل سے وصول' : '⏳ گوگل سے آنا باقی', v:'<small>Rs.</small> ' + N(FM.recv ? FM.recv.amount : FM.play - FM.gEst)}, {c:'tp', i:'users', t:'تیار — ادا کرنا ہے', v:'<small>Rs.</small> ' + N(owe)}, {c:'to', i:'wallet', t:'🙏 درخواستیں', v: N(reqs)}])}
         <div class="v2card"><div class="v2list"><button onclick="v2Go('acc')">💰 اس مہینے کا حساب / گوگل وصولی / اشتہار</button><button onclick="v2Go('pay')">✅ ادائیگیاں — اکاؤنٹ اور QR</button><button onclick="admInbox()">💬 سب چیٹس</button><button onclick="v2Go('agents')">🤝 ایجنٹ</button></div></div>`;
    page('dev', body);
    if(TAB === 'agents'){ const sv = app.innerHTML; await admHome(); const inner = app.innerHTML; app.innerHTML = sv; const el = $('#v2ag'); if(el) el.innerHTML = inner; }
  }catch(e){ app.innerHTML = `<div class="v2wrap">${hero(rk)}<div class="v2body"><div class="v2card">📶 انٹرنیٹ نہیں — <button onclick="v2Render()">🔄 دوبارہ</button></div></div>${navBar(rk)}</div>`; }
}
window.v2Render = v2Render;
window.v2Go = t => { TAB = t; if(t === 'home'){ FM = FM && FM.mon === FMON ? FM : null; } v2Render(); };
window.v2Refresh = async () => { S = null; CDME = null; FM = null; PEOPLE = null; v2Render(); };
window.v2Logout = () => { if(!confirm('لاگ آؤٹ کریں؟')) return; if(ROLE === 'admin'){ ls.del('admPps'); ls.del('admRt'); admTok = null; } else if(ROLE === 'codev'){ const c = ls.get('cd') || {}; ls.set('cd', {phone: c.phone}); CDV = null; } else { const m = ls.get('me') || {}; ls.set('me', {phone: m.phone}); } S = null; CDME = null; FM = null; PEOPLE = null; TAB = 'home'; ppScreen(ROLEK()); };
window.v2Bell = async () => { const rk = ROLEK(); if(rk === 'dev') return admInbox();
  const r = await finCall({op:'notes'}); const L = (r && r.list) || [];
  const b = document.createElement('div'); b.className = 'v2modal'; b.onclick = e => { if(e.target === b) b.remove(); };
  b.innerHTML = `<div class="v2card"><h2>🔔 Notifications — اطلاعات</h2>${L.map(n => `<div class="v2nt ${n.rd ? '' : 'nw'}"><div>${E(n.text)}</div><small class="num">${new Date(n.ts).toLocaleString('en-GB')}</small></div>`).join('') || '<div class="v2mut">ابھی کوئی اطلاع نہیں</div>'}
    <div class="btns"><button onclick="this.closest('.v2modal').remove();v2Chat()">💬 ڈویلپر سے چیٹ</button><button class="sec" onclick="this.closest('.v2modal').remove()">✖ بند</button></div></div>`;
  document.body.appendChild(b); badge(0); if(S) S.unread = 0; if(CDME) CDME.unread = 0; };
window.v2Chat = () => { const rk = ROLEK(); if(rk === 'dev') return admInbox(); if(rk === 'codev'){ const c = ls.get('cd') || {}; CDV = CDV || {phone: c.phone, pin: c.pin}; return cdChatView(); } agRender(); setTimeout(() => { const c = $('#chat'); if(c) c.scrollIntoView({block:'center'}); }, 60); };
window.v2Proof = () => { agRender(); setTimeout(() => { const el = $('#pfRk'); if(el) el.scrollIntoView({block:'center'}); }, 60); };
window.v2Menu = () => { const rk = ROLEK(); const b = document.createElement('div'); b.className = 'v2modal'; b.onclick = e => { if(e.target === b) b.remove(); };
  b.innerHTML = `<div class="v2card v2menu">${NAV[rk].map(([k, t, i]) => `<button onclick="this.closest('.v2modal').remove();v2Go('${k}')">${ic(i, 22)} ${t}</button>`).join('')}<button onclick="this.closest('.v2modal').remove();v2Chat()">💬 Chat</button><button onclick="this.closest('.v2modal').remove();openHelpDesk()">🛠️ Help Desk</button><button onclick="this.closest('.v2modal').remove();v2Refresh()">🔄 Refresh</button><button onclick="roleSwitch()">🔄 لاگ اِن بدلیں</button></div>`;
  document.body.appendChild(b); };
function v2Qr(code){ const el = $('#v2qr'); if(!el) return; const draw = () => { try{ el.innerHTML = ''; new QRCode(el, {text: refLink(code), width: 256, height: 256, correctLevel: QRCode.CorrectLevel.M}); }catch(e){} };
  if(window.QRCode) return draw(); const s = document.createElement('script'); s.src = 'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js'; s.onload = draw; document.head.appendChild(s); }
window.v2QrBig = () => { const c = $('#v2qr canvas') || $('#v2qr img'); if(c) v2Img(c.toDataURL ? c.toDataURL() : c.src); };

/* پرانے کام نئے ڈیزائن میں — agLoad / admHome / admFin / cd کی جگہ */
const oldAgRender = window.agRender;
window.agLoad = async function(extra){ const me = ls.get('me'); if(!me || !me.pin) return agLogin();
  if(extra){ const r = await post('/agportal', Object.assign({phone: me.phone, pin: me.pin}, extra)); if(r && r.ok){ S = r; return oldAgRender(); } }
  S = null; TAB = TAB || 'home'; return v2Render(); };
window.agRender = function(){ oldAgRender(); const c = document.querySelector('#app'); c.insertAdjacentHTML('afterbegin', `<div class="v2wrap">${hero('agent')}</div><div class="v2back"><button onclick="v2Go('home')">‹ Home</button></div>`); };
const oldAdmFin = window.admFin;
window.admFin = function(mon){ if(CDV && !document.querySelector('.v2wrap .v2nav')){ CDME = null; TAB = 'home'; return v2Render(); } if(!CDV){ TAB = 'acc'; FMON = mon || FMON; FM = null; return v2Render(); } return oldAdmFin(mon); };
window.v2AdmStart = () => { TAB = 'home'; return v2Render(); };

/* ---------- لاگ اِن (تصویر جیسا) ---------- */
window.ppScreen = function(role, msg, needPhone){
  const rk = role === 'dev' ? 'dev' : role === 'codev' ? 'codev' : 'agent', T = LTITLE[rk];
  app.innerHTML = `<div class="v2wrap v2login"><div class="v2lhero"><img src="img/head-login.jpg" alt="My City Shines" draggable="false">${rk !== 'agent' ? `<div class="lpill"><span>🤝</span>${LPILL[rk]}</div>` : ''}</div>
    <div class="v2lcard"><div class="lhead"><img src="img/avatar.png" alt=""><div class="lsep"></div><div><div class="lt">${T[0]}</div><div class="lu">${T[1]}</div><div class="lsw"></div></div></div>
      <div class="lf">${ic('lock', 26)}<i></i><input id="ppPin" type="password" inputmode="numeric" autocomplete="one-time-code" dir="ltr" maxlength="6" placeholder="${FIELD[rk]} (6-digit PIN)" oninput="this.value=enD(this.value).slice(0,6)"><button class="eye" onclick="const i=$('#ppPin');i.type=i.type==='password'?'text':'password'" aria-label="show">${ic('eye', 26)}</button></div>
      ${needPhone ? `<div class="lf">📱<i></i><input id="ppPh" inputmode="tel" dir="ltr" placeholder="Mobile 03xx xxxxxxx"></div>` : ''}
      <label class="lrem"><input type="checkbox" id="ppRem" ${ls.get('rem', true) ? 'checked' : ''}> مجھے یاد رکھیں — اگلی بار PIN نہ پوچھے</label>
      <div class="err">${E(msg || '')}</div>
      <div class="lbtn"><button class="lin" onclick="ppGo('${rk}')">${ic('login', 30)} Login</button><button class="lex" onclick="roleSwitch()">${ic('exit', 30)} Exit</button></div>
      <button class="lfg" onclick="ppForgot('${rk}')">🔑 PIN بھول گئے؟</button><div id="fpBox"></div>
      <div class="lauth"><i></i>${ic('users', 26)} <span>${AUTH[rk]}</span><i></i></div></div>
    <img class="v2wave" src="img/wave.jpg" alt=""></div>`;
  const el = $('#ppPin'); if(el){ el.focus(); el.addEventListener('input', () => { if(el.value.length === 6 && !$('#ppPh')) ppGo(rk); }); el.addEventListener('keydown', e => { if(e.key === 'Enter') ppGo(rk); }); }
};
window.rolePick = function(){
  const b = (r, ic2, t) => `<button class="v2role" onclick="roleGo('${r}')"><span>${ic2}</span>${t}</button>`;
  app.innerHTML = `<div class="v2wrap v2login"><div class="v2lhero"><img src="img/head-login.jpg" alt="My City Shines"><div class="lpill"><span>🤝</span>MCS Agent</div></div>
    <div class="v2lcard"><div class="lt" style="text-align:center;margin-bottom:6px">👋 خوش آمدید — اپنا لاگ اِن چنیں</div>
      ${b('agent','🤝','MCS ایجنٹ')}${b('codev','👥','کو-ڈویلپر')}${b('admin','👨‍💻','ڈویلپر (مالک)')}
      <div class="lauth"><i></i>${ic('users', 26)} <span>Authorized Members Only</span><i></i></div></div><img class="v2wave" src="img/wave.jpg" alt=""></div>`;
};
/* پرانی اسکرینیں (چیٹ، ایجنٹ کی تفصیل، سال، PIN بنانا…) کے اوپر «‹ Home» */
(function(){
  const app = document.getElementById('app');
  new MutationObserver(() => {
    if(app.querySelector('.v2wrap, .v2back, #ppPin, #ppY, #dpP, #ae')) return;
    app.insertAdjacentHTML('afterbegin', '<div class="v2back"><button onclick="v2Go(\'home\')">‹ Home</button></div>');
  }).observe(app, {childList: true});
})();
/* ===== AGP0911MO019 (کو-ڈویلپر کے «MCS Agent» پرامپٹ کی اچھی چیزیں — پلے اسٹور پالیسی کے اندر) ===== */
const PLAY_ID = 'com.pbtcodelabs.mycityshines';
function refLink(code){ return 'https://play.google.com/store/apps/details?id=' + PLAY_ID + '&referrer=' + encodeURIComponent('ref=' + code); }
function badge(n){ const el = document.getElementById('v2bd'); if(!el) return; el.hidden = !(n > 0); el.textContent = n > 9 ? '9+' : String(n || ''); }
/* Subscriptions — تلاش، حالت، مہینہ، تفصیل */
const SF = {q: '', st: 'all', mon: ''};
const stOf = r => { const live = r.until > Date.now(); return r.paid > 0 ? (live ? 'active' : 'expired') : (live ? 'trial' : 'pending'); };
const monKey = t => { const d = new Date(t || 0); return d.getFullYear() + '_' + String(d.getMonth() + 1).padStart(2, '0'); };
function subsRows(refs){
  const q = SF.q.trim().toLowerCase();
  return refs.filter(r => (SF.st === 'all' || stOf(r) === SF.st) && (!SF.mon || monKey(r.at) === SF.mon) && (!q || [r.name, r.phone, ph0(r.phone), r.rk, r.city, r.cat].join(' ').toLowerCase().includes(q)));
}
function subsFull(refs){
  const mons = [...new Set(refs.map(r => monKey(r.at)))].sort().reverse();
  const cnt = k => refs.filter(r => k === 'all' || stOf(r) === k).length;
  const chip = (k, t) => `<button class="v2chip ${SF.st === k ? 'on' : ''}" onclick="SFset('st','${k}')">${t} <b>${cnt(k)}</b></button>`;
  return `<div class="v2card"><div class="v2srch">🔍<input id="sfQ" value="${E(SF.q)}" placeholder="Account ID / Name / Mobile" oninput="SFset('q',this.value,1)"></div>
      <div class="v2chips">${chip('all','All')}${chip('active','Active')}${chip('trial','Trial')}${chip('expired','Expired')}${chip('pending','Pending')}</div>
      <select id="sfM" onchange="SFset('mon',this.value)"><option value="">📅 All months (registered)</option>${mons.map(m => `<option value="${m}" ${SF.mon === m ? 'selected' : ''}>${monName(m)}</option>`).join('')}</select></div>
    <div id="sfT">${sec('cal', 'Subscription History', subsTableX(subsRows(refs)))}</div>`;
}
function subsTableX(L){
  return table(['S.No','Account ID','Name','Subscription ID','Expiry Date','Status'], L.map((r, i) => `<tr class="tap" onclick="v2SubDet('${E(r.rk)}')"><td>${i+1}</td><td class="n">${E(ph0(r.phone) || '—')}</td><td>${E(r.name)}</td><td class="n">${E(String(r.rk||'').split('_').pop().toUpperCase())}</td><td class="n">${dmy(r.until)}</td><td>${({active:'<span class="v2st ok">Active</span>',trial:'<span class="v2st tr">Trial</span>',expired:'<span class="v2st ex">Expired</span>',pending:'<span class="v2st no">Pending</span>'})[stOf(r)]}</td></tr>`), 'کچھ نہیں ملا');
}
window.SFset = (k, v, keep) => { SF[k] = v; if(keep){ const t = $('#sfT'); if(t) t.innerHTML = sec('cal', 'Subscription History', subsTableX(subsRows(S.refs))); return; } v2Render(); };
window.v2SubDet = rk => { const r = (S.refs || []).find(x => x.rk === rk); if(!r) return;
  const row = (a, b) => `<tr><td>${a}</td><td class="n">${b}</td></tr>`;
  const b = document.createElement('div'); b.className = 'v2modal'; b.onclick = e => { if(e.target === b) b.remove(); };
  b.innerHTML = `<div class="v2card"><h2>⭐ ${E(r.name)}</h2>${table(['',''], [row('Account ID', E(ph0(r.phone) || '—')), row('Subscription ID', E(r.rk)), row('Category', E(r.cat || '—')), row('City', E(r.city || '—')), row('Registered', dmy(r.at)), row('Expiry', dmy(r.until)), row('Paid years', N(r.paid)), row('Status', stOf(r))])}<div class="btns"><button class="sec" onclick="this.closest('.v2modal').remove()">✖ بند</button></div></div>`;
  document.body.appendChild(b); };
/* Transactions — طریقہ، تاریخ، ماہانہ خلاصہ */
const TF = {m: '', from: '', to: ''};
function txFull(f){
  const pays = (f.pays || []);
  const methods = [...new Set(pays.map(p => p.method || '—'))];
  const L = pays.filter(p => (!TF.m || (p.method || '—') === TF.m) && (!TF.from || p.ts >= new Date(TF.from).getTime()) && (!TF.to || p.ts <= new Date(TF.to).getTime() + 864e5));
  const byM = {}; pays.forEach(p => { const k = monKey(p.ts); byM[k] = byM[k] || {n: 0, a: 0}; byM[k].n++; byM[k].a += p.amount || 0; });
  return `<div class="v2card"><div class="v2chips"><select onchange="TF.m=this.value;v2Render()"><option value="">💳 All methods</option>${methods.map(m => `<option ${TF.m === m ? 'selected' : ''}>${E(m)}</option>`).join('')}</select></div>
      <div class="v2dates"><label>From<input type="date" value="${TF.from}" onchange="TF.from=this.value;v2Render()"></label><label>To<input type="date" value="${TF.to}" onchange="TF.to=this.value;v2Render()"></label>${TF.from || TF.to || TF.m ? `<button class="sec" onclick="TF.m='';TF.from='';TF.to='';v2Render()">✖</button>` : ''}</div></div>
    ${sec('coins', 'Transaction History', txTable(Object.assign({}, f, {pays: L})))}
    ${sec('bars', 'Monthly Summary', table(['Month','Payments','Amount'], Object.keys(byM).sort().reverse().map(k => `<tr><td>${monName(k)}</td><td class="n">${byM[k].n}</td><td class="n">${Rs(byM[k].a)}</td></tr>`), 'ابھی کوئی ادائیگی نہیں'))}`;
}
window.TF = TF;
/* My Earnings — پرنٹ / PDF اسٹیٹمنٹ */
function stmtBtn(){ return `<div class="btns"><button onclick="v2Stmt()">🖨️ Commission Statement — Print / PDF</button></div>`; }
window.v2Stmt = () => { const rk = ROLEK(), f = rk === 'agent' ? (S.fin || {}) : CDME, nm = rk === 'agent' ? S.agent.name + ' (' + S.agent.code + ')' : (CDV && CDV.name) || 'Co-Developer';
  const w = window.open('', '_blank'); if(!w) return alert('پاپ اپ کی اجازت دیں');
  const tr = (a, b) => `<tr><td>${a}</td><td style="text-align:right">${b}</td></tr>`;
  w.document.write(`<!doctype html><meta charset="utf-8"><title>Commission Statement</title><style>body{font-family:Segoe UI,Arial;padding:24px;color:#0b1f4d}h1{margin:0;font-size:22px}table{width:100%;border-collapse:collapse;margin:12px 0}td,th{border-bottom:1px solid #ccd;padding:6px}th{background:#dbe7fb;text-align:left}</style>
    <h1>My City Shines — Commission Statement</h1><div>${E(nm)} · ${new Date().toLocaleDateString('en-GB')}</div>
    <table>${tr('Total Commission Earned', Rs(f.due))}${tr('Approved / Ready (Google received)', Rs(f.ready))}${tr('Pending (Google)', Rs(f.pending))}${tr('Total Paid', Rs(f.paid))}${tr('<b>Outstanding Balance</b>', '<b>' + Rs(f.balance) + '</b>')}</table>
    <h3>Monthly</h3><table><tr><th>Month</th><th>Sales</th><th>Earned</th><th>Ready</th></tr>${(f.months || []).map(m => `<tr><td>${monName(m.mon)}</td><td>${m.n}</td><td>${Rs(m.amt)}</td><td>${Rs(m.ready)}</td></tr>`).join('')}</table>
    <h3>Payments</h3><table><tr><th>Date</th><th>Method</th><th>Account</th><th>Amount</th></tr>${(f.pays || []).map(p => `<tr><td>${dmy(p.ts)}</td><td>${E(p.method || '')}</td><td>${E(p.acct || '')}</td><td>${Rs(p.amount)}</td></tr>`).join('')}</table>
    <small>PBT Code Labs</small><script>setTimeout(()=>print(),300)<\/script>`); w.document.close(); };
/* Profile — پوری تفصیل، ریفرل لنک + QR، PIN بدلیں */
function agProf(s){
  const a = s.agent, row = (k, v) => `<tr><td>${k}</td><td class="n">${v}</td></tr>`;
  return `${sec('user', 'Agent Profile', table(['',''], [row('Agent ID', E(ph0(a.phone))), row('Account Type', 'Agent'), row('Status', a.off ? '<span class="v2st ex">Inactive</span>' : '<span class="v2st ok">Active</span>'), row('Referral Code', `<b>${E(a.code)}</b> ${CP(a.code)}`), row('Year of Birth', E(a.yob || '—')), row('Mobile', E(ph0(a.phone))), row('WhatsApp', E(ph0(a.wa) || '—')), row('Email', E(a.email || '—')), row('Registration Date', dmy(a.okAt)), row('Business', E(a.biz || '—')), row('City', E(a.city || '—'))]))}
    <div class="v2card v2refbox"><div class="v2qr big" id="v2qr" data-code="${E(a.code)}"></div><div><b>Referral QR</b><div class="v2mut">دکاندار یہ QR اسکین کرے تو پلے اسٹور پر My City Shines کھلے گی — فارم میں ریفرل کوڈ <b class="num">${E(a.code)}</b> لکھے</div>
      <div class="btns"><button onclick="cpy(refLink('${E(a.code)}'))">🔗 Copy referral link</button><button class="sec" onclick="v2ShareRef('${E(a.code)}')">📤 Share</button></div></div></div>`;
}
window.v2ShareRef = code => { const t = 'My City Shines — اپنا کاروبار درج کریں\n' + refLink(code) + '\nریفرل کوڈ: ' + code; if(navigator.share) navigator.share({text: t}).catch(() => {}); else cpy(t); };
window.refLink = refLink;
const oldProf = profHtml;
profHtml = function(name, lines, acct){ return oldProf(name, lines, acct).replace('<div class="v2card"><div class="v2list">', pinForm() + '<div class="v2card"><div class="v2list">'); };
function pinForm(){ return `<div class="v2card"><h2>🔐 Account Security — PIN بدلیں</h2>
  <label>پرانا PIN</label><input id="cpO" type="password" inputmode="numeric" dir="ltr" maxlength="6" oninput="this.value=enD(this.value).slice(0,6)">
  <label>نیا PIN (6 ہندسے)</label><input id="cpN" type="password" inputmode="numeric" dir="ltr" maxlength="6" oninput="this.value=enD(this.value).slice(0,6)">
  <div class="err" id="cpE"></div><div class="btns"><button onclick="v2ChPin()">🔐 PIN بدلیں</button></div></div>`; }
window.v2ChPin = async () => { const o = $('#cpO').value, n = $('#cpN').value, rk = ROLEK(); if(o.length !== 6 || n.length !== 6) return ($('#cpE').textContent = '⚠️ دونوں PIN پورے 6 ہندسے');
  const c = rk === 'agent' ? (ls.get('me') || {}) : rk === 'codev' ? (ls.get('cd') || {}) : {};
  const r = await ppPost({op: 'chpin', role: rk, pin: o, newpin: n, phone: c.phone || ''}); if(!r || !r.ok) return ($('#cpE').textContent = PP_ERR[r && r.reason] || '❌ نہیں ہو سکا');
  if(rk === 'agent') ls.set('me', {phone: c.phone, pin: n}); if(rk === 'codev'){ ls.set('cd', {phone: c.phone, pin: n}); if(CDV) CDV.pin = n; }
  toast('✅ PIN بدل گیا' + (rk === 'agent' ? ' — My City Shines ایپ میں بھی اب نیا PIN' : '')); $('#cpO').value = $('#cpN').value = ''; };
window.v2Log = async () => { const r = await finCall({op:'log'}); const L = (r && r.list) || [];
  const b = document.createElement('div'); b.className = 'v2modal'; b.onclick = e => { if(e.target === b) b.remove(); };
  b.innerHTML = `<div class="v2card"><h2>📜 حساب کا آڈٹ لاگ</h2>${table(['وقت','کام','تفصیل'], L.map(x => `<tr><td class="n">${new Date(x.ts).toLocaleString('en-GB')}</td><td>${E(x.op)}</td><td style="text-align:left;font-size:11px">${E(x.data)}</td></tr>`), 'ابھی کچھ نہیں')}<div class="btns"><button class="sec" onclick="this.closest('.v2modal').remove()">✖ بند</button></div></div>`;
  document.body.appendChild(b); };
})();
