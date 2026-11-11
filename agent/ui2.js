/* AGP0911MO018 (مالک کا حکم، ہیلپ ڈیسک #181): پورٹل کا نیا ڈیزائن — مالک کی دی ہوئی دو تصویروں جیسا
   (My City Shines سر + «Agent Portal» کیپسول، پروفائل کارڈ، چار رنگین خانے، Subscription / Transaction History، نیچے پانچ بٹن)
   + MCS کا نیا حساب (سرور /fin2): گوگل سے آنا باقی / وصول، دستی وصولی (اشتہار)، ادائیگی کے اکاؤنٹ + QR، درخواست (کم از کم 1,000)۔ */
(function(){
const NAV = {
  agent: [['home','Home','home'],['subs','Subscriptions','users'],['wd','Withdrawals','wallet'],['prof','Profile','user']], /* AGP1011TU022: ڈیزائن ماسٹر پرامپٹ جیسا — 4 بٹن */
  codev: [['home','Home','home'],['acc','Accounts','bars'],['wd','Withdrawals','wallet'],['prof','Profile','user']], /* AGP1011TU024: ایجنٹ جیسا — 4 بٹن */
  dev:   [['home','Home','home'],['acc','Accounts','bars'],['pay','Payouts','wallet'],['agents','Agents','users'],['prof','Profile','user']]
};
const ICON = {
  send: '<path d="M2.5 11.2 21 3.5l-4.2 17.2-5.6-5.4-3.4 3.3.5-5.1L18 6.6 7.3 12.9z"/>',
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
  app.innerHTML = `<div class="v2wrap">${hero(rk)}<div class="v2body en">${body}</div>${navBar(rk)}</div>`;
  window.scrollTo(0, 0);
}
function sec(icon, title, body, all){ return `<div class="v2sec"><div class="v2sh">${ic(icon, 28)}<b>${title}</b>${all ? `<button onclick="v2Go('${all}')">View All →</button>` : ''}</div><div class="v2sb">${body}</div></div>`; }
function table(heads, rows, empty){ return `<div class="v2tw"><table class="v2t"><tr>${heads.map(h => `<th>${h}</th>`).join('')}</tr>${rows.length ? rows.join('') : `<tr><td colspan="${heads.length}" class="v2empty">${empty || '—'}</td></tr>`}</table></div>`; }
function tiles(t){ return `<div class="v2tiles">${t.map(x => `<div class="v2tile ${x.c}">${ic(x.i, 34, '#fff')}<span class="tl">${x.t}</span><b>${x.v}</b>${x.sub ? `<div class="tsub">${x.sub}</div>` : ''}</div>`).join('')}</div>`; }
const stTag = r => { const live = r.until > Date.now(); return r.paid > 0 ? (live ? '<span class="v2st ok">Active</span>' : '<span class="v2st ex">Expired</span>') : (live ? '<span class="v2st tr">Trial</span>' : '<span class="v2st no">Pending</span>'); };

/* ---------- ایجنٹ ---------- */
function agHome(s){
  /* AGP1011TU022 (مالک کا حکم، ہیلپ ڈیسک #214 — کو-ڈویلپر کا ماسٹر پرامپٹ، مکمل انگلش): 5 خانے + «Send Request for Withdrawal» + Subscription / Withdrawal History */
  const f = s.fin || {due: s.due, paid: s.paidOut, balance: s.balance, pays: s.pays || []};
  const active = s.refs.filter(r => r.paid > 0 && r.until > Date.now()).length;
  const pr = photo();
  return `<div class="v2card v2prof">
      <div class="v2ph" onclick="v2Go('prof')">${pr ? `<img src="${pr}">` : `<img src="img/avatar.png">`}</div>
      <div class="v2pi"><div class="aid">Agent ID: <span>${E(ph0(s.agent.phone))}</span></div><div class="anm">${E(s.agent.name)}</div><div class="aact">${s.agent.off ? '<span class="off">⛔ Inactive</span>' : `<span>${ic('check', 18, '#fff')} Active Agent</span>`}</div>
        <div class="v2ref2"><span>Referral Code</span><button class="rc" onclick="cpy('${E(s.agent.code)}')">${E(s.agent.code)} ${ic('copy', 18)}</button></div></div>
      <div class="v2div"></div>
      <div class="v2qr" id="v2qr" data-code="${E(s.agent.code)}" onclick="v2QrBig()"></div></div>
    <div class="v2tiles v2t2">${[
      {c:'tb', i:'users', t:'Total<br>Subscriptions', v:N(s.refs.length)},
      {c:'tg', i:'check', t:'Active<br>Subscriptions', v:N(active)},
      {c:'tp', i:'coins', t:'Total<br>Earnings', v:'<small>Rs.</small> ' + N(f.due)},
      {c:'to', i:'wallet', t:'Total<br>Withdrawals', v:'<small>Rs.</small> ' + N(f.paid)}].map(x => `<div class="v2tile ${x.c}">${ic(x.i, 38, '#fff')}<div><span class="tl">${x.t}</span><b>${x.v}</b></div></div>`).join('')}
      <div class="v2tile tw">${ic('wallet', 36, '#0b2a6b')}<div><span class="tl">Balance</span><b><small>Rs.</small> ${N(f.balance)}</b></div></div>
      <button class="v2tile tq" onclick="v2WdReq()">${ic('send', 36, '#fff')}<div><span class="tl">Send Request for<br>Withdrawal</span></div></button></div>
    ${f.req ? `<div class="v2ok en">⏳ Withdrawal request of <b class="num">${Rs(f.req.amount)}</b> sent on ${dmy(f.req.ts)} — Pending</div>` : ''}
    ${sec('cal', 'Subscription History', subsTable(s.refs.slice(0, 3)), 'subs')}
    ${sec('wallet', 'Withdrawal History', wdTable(f, 3), 'wd')}`;
}
/* واپسی (ادائیگی) کی تاریخ — سرور کی اصل ادائیگیاں (f.pays) + زیرِ التوا درخواست (f.req)؛ نیا حساب نہیں */
function wdRows(f){
  const pays = (f.pays || []).slice().sort((a, b) => a.ts - b.ts).map((p, i) => ({ts: p.ts, id: 'WD-' + String(i + 1).padStart(4, '0'), amount: p.amount, method: p.method || '—', st: 'Paid'})).reverse();
  if(f.req) pays.unshift({ts: f.req.ts, id: 'WD-' + String((f.pays || []).length + 1).padStart(4, '0'), amount: f.req.amount, method: (f.acct && f.acct.method) || '—', st: 'Pending'});
  return pays;
}
function wdTable(f, lim){
  const L = wdRows(f);
  return table(['S.No','Date','Request ID','Amount','Status'], (lim ? L.slice(0, lim) : L).map((p, i) => `<tr><td>${i+1}</td><td class="n">${dmy(p.ts)}</td><td class="n">${p.id}</td><td class="n">${N(p.amount)}</td><td><span class="v2st ${p.st === 'Paid' ? 'ok' : 'tr'}">${p.st}</span></td></tr>`), 'No withdrawals yet');
}
function wdFull(f){
  return `${earnHtml(f)}${sec('wallet', 'Withdrawal History', table(['S.No','Date','Request ID','Amount','Payment Method','Status'], wdRows(f).map((p, i) => `<tr><td>${i+1}</td><td class="n">${dmy(p.ts)}</td><td class="n">${p.id}</td><td class="n">${N(p.amount)}</td><td>${E(p.method)}</td><td><span class="v2st ${p.st === 'Paid' ? 'ok' : 'tr'}">${p.st}</span></td></tr>`), 'No withdrawals yet'))}${stmtBtn()}`;
}
window.v2WdReq = () => { const f = (ROLEK() === 'agent' ? (S && S.fin) : CDME) || {};
  if(f.req) return alert('Your withdrawal request of ' + Rs(f.req.amount) + ' is already pending. The developer will pay it soon.');
  if(!f.acct) { alert('Please add your payment account (Easypaisa / JazzCash / Bank) in Profile first.'); return v2Go('prof'); }
  if(!f.canReq) return alert('Withdrawal opens when your ready balance is ' + Rs(f.min || 1000) + ' or more. Ready now: ' + Rs(f.avail));
  v2Req(); };

function subsTable(refs){
  return table(['S.No','Account ID','Subscription ID','Amount','Expiry Date','Status'], refs.map((r, i) => `<tr><td>${i+1}</td><td class="n">${E(ph0(r.phone) || '—')}</td><td class="n">${E(String(r.rk||'').split('_').pop().toUpperCase())}</td><td class="n">${r.paid > 0 ? N(r.paid * 1000) : '—'}</td><td class="n">${dmy(r.until)}</td><td>${stTag(r)}</td></tr>`), 'No subscriptions yet');
}
function txTable(f, lim){
  const pays = (f.pays || []).slice().sort((a, b) => a.ts - b.ts); let bal = f.due || 0; const rows = pays.map(p => { bal -= p.amount || 0; return Object.assign({}, p, {rem: bal}); }).reverse();
  return table(['S.No','Date','Payment Method','Account No.','Amount','Rem. Balance'], (lim ? rows.slice(0, lim) : rows).map((p, i) => `<tr><td>${i+1}</td><td class="n">${dmy(p.ts)}</td><td>${E(p.method || (p.note ? p.note.slice(0, 18) : '—'))}</td><td class="n">${E(p.acct || '—')}</td><td class="n">${Rs(p.amount)}</td><td class="n">${Rs(p.rem)}</td></tr>`), 'No payments yet');
}
function earnHtml(f, who){
  const pol = `<div class="v2note en">📅 Payouts are made between the <b>20th and 25th</b> of every month — minimum <b class="num">${Rs(f.min || 1000)}</b>; smaller amounts carry forward to next month. Google Play membership commission becomes «✅ Ready» after Google pays us.</div>`;
  const req = f.req ? `<div class="v2ok en">⏳ Your withdrawal request (<b class="num">${Rs(f.req.amount)}</b>) was sent on ${dmy(f.req.ts)} — the developer will pay it soon</div>`
    : f.canReq ? `<button class="v2btn g en" onclick="v2Req()">📤 Send Request for Withdrawal — ${Rs(f.avail)}</button>`
    : `<div class="v2mut en">📤 Withdrawal opens when your ready balance is ${Rs(f.min || 1000)} or more (now ${Rs(f.avail)})</div>`;
  return `${tiles([{c:'tp', i:'coins', t:'Total Earnings', v:'<small>Rs.</small> ' + N(f.due)}, {c:'tg', i:'check', t:'✅ Ready<br>Balance', v:'<small>Rs.</small> ' + N(f.ready)}, {c:'tb', i:'cal', t:'⏳ Pending<br>from Google', v:'<small>Rs.</small> ' + N(f.pending)}, {c:'to', i:'wallet', t:'Received Amount', v:'<small>Rs.</small> ' + N(f.paid), sub:`Available: <em>${Rs(f.avail)}</em>`}])}
    <div class="v2card">${pol}${req}${f.acct ? '' : `<div class="v2warn en">🏦 Add your payment account (Easypaisa / JazzCash / Bank) in <a href="#" onclick="v2Go('prof');return false">Profile</a></div>`}</div>
    ${sec('bars', 'Monthly Earnings', table(['Month','Sales','Earned','Ready','Status'], (f.months || []).map(m => `<tr><td>${monName(m.mon)}</td><td class="n">${m.n}</td><td class="n">${Rs(m.amt)}</td><td class="n">${Rs(m.ready)}</td><td>${m.ready >= m.amt ? '<span class="v2st ok">Ready</span>' : '<span class="v2st tr">Google</span>'}</td></tr>`), 'No earnings yet'))}`;
}
async function v2Req(){ if(!confirm('Send withdrawal request?')) return; const r = await finCall({op:'req'}); if(!r || !r.ok) return alert(r && r.reason === 'already' ? 'A request is already pending' : 'Minimum amount not reached yet'); toast('✅ Withdrawal Request Submitted Successfully'); v2Refresh(); }
function acctForm(a){
  a = a || {};
  const M = ['Easypaisa','JazzCash','Bank Transfer'];
  return `<div class="v2card"><h2 class="en">🏦 Payment Account</h2><div class="v2mut en">The developer sends your withdrawals to this account</div>
    <label>Payment Method</label><select id="acM">${M.map(m => `<option ${a.method === m ? 'selected' : ''}>${m}</option>`).join('')}</select>
    <label>Account Holder Name</label><input id="acT" value="${E(a.title||'')}">
    <label>Account / Wallet Number</label><input id="acN" dir="ltr" inputmode="numeric" value="${E(a.number||'')}">
    <label>IBAN (for bank)</label><input id="acI" dir="ltr" value="${E(a.iban||'')}">
    <label>Bank Name / Branch</label><input id="acB" value="${E(a.bank||'')}">
    <label>QR Code Image (optional)</label><div class="att"><label>🖼️ Choose Image<input type="file" accept="image/*" onchange="v2QrPick(this)"></label></div><div class="prev" id="acQ">${a.qr ? `<img src="${a.qr}">` : ''}</div>
    <div class="btns"><button onclick="v2AcctSave()">💾 Save</button></div></div>`;
}
let acQr = null;
window.v2QrPick = async inp => { const f = inp.files && inp.files[0]; if(!f) return; acQr = await shrink(f, 700, .8); $('#acQ').innerHTML = `<img src="${acQr}">`; };
window.v2AcctSave = async () => {
  const cur = (ROLEK() === 'agent' ? (S && S.fin && S.fin.acct) : (CDME && CDME.acct)) || {};
  const acct = {method: $('#acM').value, title: $('#acT').value.trim(), number: $('#acN').value.trim(), iban: $('#acI').value.trim(), bank: $('#acB').value.trim(), qr: acQr != null ? acQr : (cur.qr || '')};
  if(!acct.number && !acct.iban) return alert('Enter account number or IBAN');
  const r = await finCall({op:'acct', acct}); if(!r || !r.ok) return alert('Could not save'); acQr = null; toast('✅ Account saved'); v2Refresh();
};
function finCall(x){
  const rk = ROLEK();
  if(rk === 'dev') return admCall('/fin2', Object.assign({as:'dev'}, x));
  const c = rk === 'agent' ? (ls.get('me') || {}) : (ls.get('cd') || {});
  return post('/fin2', Object.assign({as: rk === 'agent' ? 'agent' : 'cd', phone: c.phone, pin: c.pin}, x));
}
function profHtml(name, lines, acct){
  const pr = photo();
  return `<div class="v2card v2pp"><div class="v2ph big">${pr ? `<img src="${pr}">` : `<img src="img/avatar.png">`}</div><div><div class="anm">${E(name)}</div>${lines}<div class="att" style="margin-top:6px"><label>📷 Change Photo<input type="file" accept="image/*" onchange="v2Photo(this)"></label></div></div></div>
    ${acct !== false ? acctForm(acct) : ''}
    <div class="v2card"><div class="v2list">
      <button onclick="v2Chat()">💬 Chat with Developer</button>
      ${ROLEK() === 'agent' ? `<button onclick="v2Proof()">📸 Send Shop Payment Proof</button><a href="guide.html" target="_blank" rel="noopener"><button>📄 How to Become an MCS Agent</button></a>` : ''}
      <button onclick="openHelpDesk()">🛠️ Help Desk — Report a Problem</button>
      <button onclick="roleSwitch()">🔄 Switch Login</button>
      <button class="red" onclick="v2Logout()">🚪 Logout</button></div>
      <div class="v2ver">PBT Code Labs · <span class="num">${AGP_VER}</span></div></div>`;
}
window.v2Photo = async inp => { const f = inp.files && inp.files[0]; if(!f) return; const d = await shrink(f, 300, .82); try{ localStorage.setItem('agp_photo_' + ROLE, d); }catch(e){} v2Render(); };

/* ---------- کو-ڈویلپر ---------- */
async function cdLoad(){ const c = ls.get('cd') || {}; const r = await post('/fin2', {as:'cd', phone: c.phone, pin: c.pin, op:'me'}); if(!r || !r.ok) return null; CDME = r; return r; }

/* ---------- ڈویلپر ---------- */
let SALE_RO = true;
function monthHtml(m, ro){ SALE_RO = !!ro;
  const T = m.totals || {}, rv = m.recv;
  const g = m.play ? (rv ? `<div class="v2ok">✅ Received from Google: <b class="num">${Rs(rv.amount)}</b> (${dmy(rv.at)}) — actual Google cut <b class="num">${Rs(m.gAct)}</b>${ro ? '' : ` <button class="sm" onclick="v2Grecv(true)">✖ Back to «Pending»</button>`}</div>`
      : `<div class="v2warn">⏳ Pending from Google — Play sales <b class="num">${Rs(m.play)}</b>, expected <b class="num">${Rs(m.play - m.gEst)}</b>${ro ? '' : `<div class="btns"><input id="grA" class="num" inputmode="numeric" placeholder="${m.play - m.gEst}" style="max-width:150px"><button onclick="v2Grecv()">✅ Received — in bank</button></div>`}</div>`)
    : '';
  const who = l => l.by === 'agent' ? '🤝 ' + E(l.agent || l.code) : l.by === 'dev' ? '👨‍💻 DEV' : l.by === 'codev' ? '👥 CODEV' : '🏢 PBT';
  return `<div class="v2card"><div class="v2mon"><button onclick="v2Mon(-1)">‹</button><b>${monName(FMON)}</b><button onclick="v2Mon(1)">›</button></div>
      <div class="v2split en" style="margin:8px 0">⚖️ ${SPLIT_TXT}</div>
      ${tiles([{c:'tb', i:'coins', t:'Total Sales<br>(Gross)', v:'<small>Rs.</small> ' + N(m.gross)}, {c:'tg', i:'check', t:'▶️ Google Play', v:'<small>Rs.</small> ' + N(m.play)}, {c:'tp', i:'wallet', t:'🏦 Direct<br>(Manual / Ads)', v:'<small>Rs.</small> ' + N(m.direct)}, {c:'to', i:'cal', t:'🛠️ Maintenance', v:'<small>Rs.</small> ' + N(T.maint)}])}${g}</div>
    ${sec('bars', 'Revenue Split — ' + monName(FMON), table(['Head','Amount'], [['🟦 Google', T.google], ['🛠️ Maintenance', T.maint], ['🤝 Agents', T.agent], ['👨‍💻 Developer', T.dev], ['👥 Co-Developer', T.codev]].map(([a, b]) => `<tr><td>${a}</td><td class="n">${Rs(b)}</td></tr>`).concat([`<tr class="tot"><td>Total</td><td class="n">${Rs(m.gross)}</td></tr>`])))}
    ${ro ? '' : `<div class="v2card"><h2>➕ Add Receipt (Ad or Manual Membership)</h2><div class="v2mut">Memberships given via Account Access are recorded automatically — add only what is not recorded elsewhere (e.g. Rs 800 for an ad)</div>
      <div class="btns"><select id="xK" style="max-width:170px"><option value="ad">📢 Ad</option><option value="mem">⭐ Membership</option></select><input id="xA" class="num" inputmode="numeric" placeholder="Amount" style="max-width:120px"></div>
      <label>Brought by — choose by name and code</label>${bringerSel('xR')}
      <label>Business Name / Note</label><input id="xB"><input type="hidden" id="xRk"><div class="btns"><button onclick="v2Xadd()">💾 Save — split automatically</button></div></div>
      <div class="v2card" id="mcsAds"><h2>📢 My City Shines Ads</h2><div class="v2mut">⏳ …</div></div>`}
    ${sec('coins', 'Sales / Receipts (' + m.lines.length + ')', table(['Date','Business','Type','Amount','Brought by','Agent','Developer','Co-Developer'].concat(ro ? [] : ['']), m.lines.slice().reverse().map(l => `<tr class="tap" onclick="if(event.target.closest('button'))return;v2SaleDet('${l.id}')" title="Tap for full details"><td class="n">${dmy(l.ts)}</td><td><u>${E(l.biz || l.subid || String(l.rk || '').split('_').pop().toUpperCase() || '—')}</u>${l.subid ? `<br><small class="n">${E(l.subid)}</small>` : ''}</td><td>${l.kind === 'ad' ? '📢' : '⭐'} ${l.src === 'play' ? '▶️' : '🏦'}${l.units > 1 ? ' ×' + l.units : ''}</td><td class="n">${N(l.amount)}</td><td>${who(l)}</td><td class="n">${N(l.sh.agent)}</td><td class="n">${N(l.sh.dev)}</td><td class="n">${N(l.sh.codev)}</td>${ro ? '' : `<td><button class="sm v2del" onclick="v2Void('${l.id}')" title="Remove wrong entry">🗑️</button></td>`}</tr>`), 'Nothing this month'))}${ro ? '' : `<div class="btns"><button class="sec" onclick="v2Voided()">🗃️ Removed entries — restore</button></div>`}
    ${(m.agents || []).length ? sec('users', 'Agents Commission', table(['Agent','Sales','Commission'], m.agents.map(a => `<tr><td>${E(a.name || a.code)} <span class="num">${E(a.code)}</span></td><td class="n">${a.n}</td><td class="n">${Rs(a.amt)}</td></tr>`))) : ''}`;
}
let FMON = '';
window.v2Mon = d => { FMON = monStep(FMON, d); FM = null; v2Render(); };
window.v2Grecv = async clear => { const v = clear ? '' : ($('#grA').value.trim() || $('#grA').placeholder); if(!clear && !confirm(monName(FMON) + ' — from Google ' + Rs(v) + ' received in bank?')) return; FM = await finCall({op:'grecv', mon: FMON, amount: v}); v2Render(); };
window.v2Xadd = async () => { const a = parseInt(enD($('#xA').value), 10); if(!(a > 0)) return alert('Enter amount'); const k = $('#xK').value; const sel = $('#xR'), who = sel.options[sel.selectedIndex].text; if(!sel.value) return alert('Choose Brought by'); if(!confirm((k === 'ad' ? '📢 Ad' : '⭐ Membership') + ' — ' + Rs(a) + '\nBrought by: ' + who + '\n\nSave?')) return;
  const r = await finCall({op:'xadd', kind: k, amount: a, ref: sel.value, rk: ($('#xRk') || {}).value || '', biz: $('#xB').value.trim(), note: $('#xB').value.trim()}); if(r && r.reason === 'dup') return alert('This ad is already recorded'); if(!r || r.ok === false) return alert('Could not save'); FM = r; FMON = FM.mon || FMON; v2Render(); };
window.v2Xdel = id => v2Void(id);
/* AGP1011TU025 (مالک کا حکم): غلط / جانچ والا اندراج ہٹائیں — سرور پر مٹتا نہیں (void)، «🗃️ Removed entries» سے واپس؛ دو بار پوچھتا ہے */
/* AGP1111WE026 (مالک کا حکم): فروخت / وصولی کی لائن دبائیں تو پوری تفصیل — کاروبار، مالک، موبائل، IDs، کس نے لایا، ادائیگی کا طریقہ، حصے؛ «Brought by» بدلیں / ہٹائیں */
const FSBIZ = {};
async function v2BizLookup(mob){
  const d10 = String(mob || '').replace(/\D/g, '').slice(-10); if(d10.length !== 10) return null; if(d10 in FSBIZ) return FSBIZ[d10];
  const vals = ['0' + d10, '0' + d10.slice(0, 3) + '-' + d10.slice(3), '92' + d10, '+92' + d10, '+92 ' + d10.slice(0, 3) + ' ' + d10.slice(3), '0' + d10.slice(0, 3) + ' ' + d10.slice(3)];
  const out = [];
  for(const col of ['services', 'doctors']){
    try{
      const q = { structuredQuery: { from: [{ collectionId: col }], where: { fieldFilter: { field: { fieldPath: 'whatsapp' }, op: 'IN', value: { arrayValue: { values: vals.map(v => ({ stringValue: v })) } } } }, limit: 5 } };
      const r = await (await fetch('https://firestore.googleapis.com/v1/projects/my-city-shines/databases/(default)/documents:runQuery?key=' + FB_KEY, { method: 'POST', body: JSON.stringify(q) })).json();
      (r || []).forEach(x => { if(x && x.document){ const f = x.document.fields || {}, g = k => (f[k] && (f[k].stringValue || f[k].integerValue)) || ''; out.push({ col, name: g('nameUr') || g('name') || g('nameEn'), en: g('nameEn'), owner: g('intro'), type: g('type') || g('specialty'), cat: g('category'), city: g('city'), area: g('area') || g('address') }); } });
    }catch(e){}
  }
  const seen = new Set(); return (FSBIZ[d10] = out.filter(x => { const k = x.col + '|' + x.name + '|' + x.cat; if(seen.has(k)) return false; seen.add(k); return true; }));
}
window.v2SaleDet = async (id, lx) => {
  const l = lx || ((FM && FM.lines) || []).find(x => x.id === id); if(!l) return;
  const ro = SALE_RO, row = (a, b) => `<tr><td>${a}</td><td class="n">${b}</td></tr>`;
  const by = l.by === 'dev' ? '👨‍💻 Developer (DEV)' : l.by === 'codev' ? '👥 Co-Developer (CODEV)' : (!l.code || l.code === 'PBT') ? '🏢 Company (PBT — came by self)' : '🤝 Agent ' + E(l.code) + (l.agent ? ' — ' + E(l.agent) : '');
  const pay = l.kind === 'ad' ? '📢 Ad — recorded by hand' : l.src === 'play' ? '▶️ Google Play purchase' : '🏦 Direct / manual (given by developer)';
  const b = document.createElement('div'); b.className = 'v2modal'; b.onclick = e => { if(e.target === b) b.remove(); };
  const body = () => `<div class="v2card"><h2>${l.kind === 'ad' ? '📢' : '⭐'} <span id="sdName">${E(l.biz || 'Loading business…')}</span></h2>
    ${l.kind === 'mem' && !l.exists ? '<div class="v2mut" style="color:#b91c1c;font-weight:700">⚠️ This business is no longer on the server (deleted)</div>' : ''}
    <div id="sdBiz"></div>
    ${table(['', ''], [row('Date', dmy(l.ts)), row('Amount', 'Rs ' + N(l.amount) + (l.units > 1 ? ' (' + l.units + ' years)' : '')), row('Payment', pay),
      row('Account ID', E(l.sid || '—')), row('Subscription ID', E(l.subid || '—')), row('Business ID', E(l.rk || '—')), row('Mobile', E(l.mob ? '0' + String(l.mob).slice(2) : '—')),
      row('Brought by (referral)', by), row('Membership until', l.until ? dmy(l.until) : '—'), row('Note', E(l.note || '—')),
      row('Agent share', 'Rs ' + N(l.sh.agent)), row('Developer share', 'Rs ' + N(l.sh.dev)), row('Co-Developer share', 'Rs ' + N(l.sh.codev)), row('Google / Maintenance', 'Rs ' + N(l.sh.google) + ' / ' + N(l.sh.maint))])}
    <div class="btns">${!ro && l.id[0] === 's' ? `<button onclick="v2SetWho('${l.id}')">✏️ Change «Brought by»</button>` : ''}${!ro ? `<button class="sec" onclick="this.closest('.v2modal').remove();v2Void('${l.id}')">🗑️ Remove this entry</button>` : ''}<button class="sec" onclick="this.closest('.v2modal').remove()">Close</button></div></div>`;
  b.innerHTML = body(); document.body.appendChild(b);
  if(l.kind === 'mem' && l.mob){ const L = await v2BizLookup(l.mob); const box = b.querySelector('#sdBiz'), nm = b.querySelector('#sdName'); if(!box) return;
    if(L && L.length){ const x = L.find(y => (l.rk || '').endsWith('_' + String(y.cat || '').toLowerCase())) || L[0]; if(nm) nm.textContent = x.name || l.biz || 'Business';
      box.innerHTML = table(['', ''], [row('Business name', E(x.name) + (x.en && x.en !== x.name ? '<br>' + E(x.en) : '')), row('Owner / details', E(x.owner || '—')), row('Type', E(x.type || x.cat || '—')), row('City / area', E([x.city, x.area].filter(Boolean).join(' — ') || '—'))] .concat(L.length > 1 ? [row('Other cards on this mobile', L.filter(y => y !== x).map(y => E(y.name)).join('<br>'))] : []));
    } else { if(nm && !l.biz) nm.textContent = 'Business (card not found)'; box.innerHTML = '<div class="v2mut">Card for this mobile not found in My City Shines</div>'; } }
};
window.v2SetWho = async id => {   /* AGP1111WE029: فہرست سے چنیں (DEV / CODEV / PBT / ایجنٹ AG-…) */
  if(!PEOPLE){ try{ PEOPLE = await finCall({op:'people'}); }catch(e){} }
  const box = document.createElement('div'); box.className = 'v2modal'; box.onclick = e => { if(e.target === box) box.remove(); };
  box.innerHTML = `<div class="v2card en"><h2>✏️ Who brought this business?</h2>${bringerSel('swSel')}<div class="btns"><button onclick="v2SetWhoGo('${id}')">💾 Save</button><button class="sec" onclick="this.closest('.v2modal').remove()">✖ Cancel</button></div></div>`;
  document.body.appendChild(box);
};
window.v2SetWhoGo = async id => {
  const c = (document.getElementById('swSel') || {}).value || ''; if(!c) return alert('Choose who brought it');
  const r = await finCall({op:'setwho', id, code: c, mon: FMON}); if(!r || r.ok === false) return alert('Could not change: ' + ({no_agent:'agent code not found', not_found:'entry not found'}[r && r.reason] || (r && r.reason) || 'network'));
  FM = r; document.querySelectorAll('.v2modal').forEach(x => x.remove()); v2Render(); setTimeout(() => v2SaleDet(id), 50);
};
window.v2Void = async id => {
  const l = ((FM && FM.lines) || []).find(x => x.id === id); if(!l) return;
  const what = (l.kind === 'ad' ? 'Ad' : 'Membership') + ' — ' + (l.biz || l.rk || '') + ' — Rs ' + N(l.amount) + ' — ' + dmy(l.ts) + ' — brought by ' + (l.code || 'PBT');
  if(!confirm('🗑️ Remove this WRONG entry from the accounts?\n\n' + what + '\n\nIt is not deleted — you can restore it from «Removed entries». Agent / Developer / Co-Developer shares will be recalculated.')) return;
  const why = prompt('Reason (e.g. test entry):', 'test entry'); if(why === null) return;
  if(!confirm('Sure? Remove: ' + what)) return;
  const r = await finCall({op:'void', id, why, mon: FMON}); if(!r || r.ok === false) return alert('Could not remove: ' + ((r && r.reason) || 'network'));
  FM = r; PEOPLE = null; toast('🗑️ Removed — restore any time from «Removed entries»'); v2Render(); };
window.v2Voided = async () => {
  const r = await finCall({op:'voided'}); const L = (r && r.list) || [];
  const b = document.createElement('div'); b.className = 'v2modal'; b.onclick = e => { if(e.target === b) b.remove(); };
  b.innerHTML = `<div class="v2card en"><h2>🗃️ Removed entries</h2><div class="v2mut">These are kept safely and are not counted in any account.</div>${table(['Removed','Date','Business','Amount','Reason',''], L.map(x => `<tr><td class="n">${dmy(x.vts)}</td><td class="n">${dmy(x.ts)}</td><td>${E(x.biz || x.rk || '—')}</td><td class="n">${N(x.amount)}</td><td>${E(x.why || '')}</td><td><button class="sm" onclick="v2Unvoid('${x.id}')">↩️ Restore</button></td></tr>`), 'Nothing removed')}<div class="btns"><button class="sec" onclick="this.closest('.v2modal').remove()">✖ Close</button></div></div>`;
  document.body.appendChild(b); };
window.v2Unvoid = async id => { if(!confirm('Restore this entry into the accounts?')) return; const r = await finCall({op:'unvoid', id, mon: FMON}); if(!r || r.ok === false) return alert('Could not restore'); document.querySelectorAll('.v2modal').forEach(x => x.remove()); FM = null; PEOPLE = null; toast('↩️ Restored'); v2Render(); };
function payoutsHtml(P){
  const req = P.reqs || [];
  return `${req.length ? `<div class="v2warn">🙏 ${req.length} withdrawal requests — marked yellow below</div>` : ''}<div class="v2note">📅 Payouts between the 20th and 25th of each month, minimum Rs. 1,000 (ready balance)</div>
    ${P.list.map((p, i) => { const a = p.acct || {}; return `<div class="v2card v2pc ${p.req ? 'rq' : ''}"><div class="pch"><b>${p.kind === 'agent' ? '🤝' : p.kind === 'dev' ? '👨‍💻' : '👥'} ${E(p.name)}</b> <span class="num">${E(p.code || ph0(p.phone))}</span>${p.req ? ` <span class="v2st tr">🙏 ${Rs(p.req.amount)}</span>` : ''}</div>
      <div class="pcs"><span>Total <b class="num">${N(p.due)}</b></span><span>⏳ Google <b class="num">${N(p.pending)}</b></span><span>Paid <b class="num">${N(p.paid)}</b></span><span class="av">✅ Ready <b class="num">${N(p.avail)}</b></span></div>
      ${p.acct ? `<div class="pca">${a.qr ? `<img src="${a.qr}" onclick="v2Img(this.src)">` : ''}<div>🏦 <b>${E(a.method||'')}</b> — ${E(a.title||'')}<br><span class="num">${E(a.number||'')}</span> ${a.number ? CP(a.number) : ''}${a.iban ? `<br><span class="num">${E(a.iban)}</span> ${CP(a.iban)}` : ''}${a.bank ? '<br>' + E(a.bank) : ''}</div></div>` : '<div class="v2mut">🏦 No payment account yet</div>'}
      <div class="btns"><button onclick="v2Pay(${i})" ${p.avail > 0 ? '' : 'class="sec"'}>✅ Mark as Paid…</button>${p.kind === 'agent' ? `<button class="sec" onclick="admOpen('${E(p.code)}')">📋 Details</button>` : ''}</div></div>`; }).join('') || '<div class="v2card">No agents / co-developers yet</div>'}`;
}
let payImg = '';
window.v2Pay = i => { const p = PEOPLE.list[i], a = p.acct || {}; payImg = '';
  const box = document.createElement('div'); box.className = 'v2modal'; box.innerHTML = `<div class="v2card"><h2>✅ Payout — ${E(p.name)}</h2>
    <label>Amount</label><input id="pyA" class="num" inputmode="numeric" value="${p.avail || ''}">
    <label>Paid through</label><div class="pyCh">${['Easypaisa','JazzCash','Bank transfer','Cash'].map(m => `<button type="button" class="sec" onclick="document.getElementById('pyM').value='${m}'">${m}</button>`).join('')}</div><input id="pyM" value="${E(a.method || 'Easypaisa')}" placeholder="e.g. Easypaisa / Bank transfer">
    <label>Account / mobile number <small>(optional — can leave empty)</small></label><input id="pyN" dir="ltr" value="${E(mask(a.number || a.iban))}" placeholder="optional">
    <label>Note / TID</label><input id="pyT">
    <div class="att"><label>🖼️ Receipt Screenshot<input type="file" accept="image/*" onchange="v2PayImg(this)"></label></div><div class="prev" id="pyP"></div>
    <div class="btns"><button onclick="v2PayGo(${i})">💾 Save</button><button class="sec" onclick="this.closest('.v2modal').remove()">✖ Cancel</button></div></div>`;
  document.body.appendChild(box); };
window.v2PayImg = async inp => { const f = inp.files && inp.files[0]; if(!f) return; payImg = await shrink(f, 1100, .72); $('#pyP').innerHTML = `<img src="${payImg}">`; };
window.v2PayGo = async i => { const p = PEOPLE.list[i], amount = parseInt(enD($('#pyA').value), 10); if(!(amount > 0)) return alert('Enter amount'); if(!confirm('Paid ' + Rs(amount) + ' to ' + p.name + '?')) return;
  if(!String($('#pyM').value || '').trim()) $('#pyM').value = 'Cash';
  const r = await finCall({op:'payout', who: p.key, amount, method: $('#pyM').value, acctNo: $('#pyN').value, note: $('#pyT').value, img: payImg}); if(!r || !r.ok) return alert('Could not save');
  document.querySelector('.v2modal') && document.querySelector('.v2modal').remove(); toast('✅ Payout saved'); PEOPLE = null; v2Render(); };
window.v2Img = src => { const b = document.createElement('div'); b.className = 'v2modal'; b.onclick = () => b.remove(); b.innerHTML = `<img src="${src}" style="max-width:92vw;max-height:86vh;border-radius:12px;background:#fff">`; document.body.appendChild(b); };

/* ---------- رینڈر ---------- */
/* ===== AGP1011TU024 (مالک کا حکم، ہیلپ ڈیسک #214 — کو-ڈویلپر کی دوسری تصویر): کو-ڈویلپر / ڈویلپر ہوم ایجنٹ جیسے انداز میں، مکمل انگلش —
   Company Overview (اس مہینے)، Your Personal Share + Request Withdrawal، All Subscriptions History، My Transactions؛ تقسیم سرور (AGP1011TU023) سے */
const SPLIT_TXT = '<b>⭐ Membership (Rs 1,000)</b>: Google 15% (only Google Play; direct / cash → this 15% goes to Maintenance) · Maintenance 15% · then <b>15% of the rest to whoever brought it</b> (Agent AG-… / DEV Developer / CODEV Co-Developer; PBT = half & half) · the remainder Developer / Co-Developer 50 / 50'
  + '<br><small>Direct 1,000 brought by DEV: Maintenance 300 → 15% of 700 = 105 to Developer → 595 = 298 + 297 → Developer 403, Co-Developer 297</small>'
  + '<br><b>📢 Ad</b>: Maintenance 15% (no Google) · then 15% of the rest to whoever brought it · the remainder Developer / Co-Developer 50 / 50'
  + '<br><small>Ad 800 brought by DEV: Maintenance 120 → 15% of 680 = 102 to Developer → 578 = 289 + 289 → Developer 391, Co-Developer 289</small>';
function t2(list){ return `<div class="v2tiles v2t2">${list.map(x => x.btn ? `<button class="v2tile tq" onclick="${x.btn}">${ic(x.i, 36, '#fff')}<div><span class="tl">${x.t}</span>${x.v != null ? `<b>${x.v}</b>` : ''}</div></button>`
  : `<div class="v2tile ${x.c}" ${x.go ? `onclick="${x.go}" style="cursor:pointer"` : ''}>${ic(x.i, 36, x.c === 'tw' ? '#0b2a6b' : '#fff')}<div><span class="tl">${x.t}</span><b>${x.v}</b>${x.sub ? `<div class="tsub2">${x.sub}</div>` : ''}</div></div>`).join('')}</div>`; }
const R0 = n => '<small>Rs.</small> ' + N(n);
function whoTxt(l){ return l.by === 'agent' ? E(l.code) + (l.agent ? ' — ' + E(l.agent) : '') : l.by === 'dev' ? 'DEV (Developer)' : l.by === 'codev' ? 'CODEV (Co-Developer)' : 'PBT (Company)'; }
function allSubsTable(m, lim, col){
  const L = ((m && m.lines) || []).slice().reverse();
  return table(['S.No','Date','Account / Business','Type','Amount (Rs.)','Brought by','Agent','Dev. Share','Co-Dev. Share','Status'], (lim ? L.slice(0, lim) : L).map((l, i) => `<tr><td>${i+1}</td><td class="n">${dmy(l.ts)}</td><td>${E(l.biz || String(l.rk || '').split('_').pop().toUpperCase() || '—')}</td><td>${l.kind === 'ad' ? 'Ad' : (l.src === 'play' ? 'Google Play' : 'Manual')}</td><td class="n">${N(l.amount)}</td><td>${whoTxt(l)}</td><td class="n">${N(l.sh.agent)}</td><td class="n">${N(l.sh.dev)}</td><td class="n">${N(l.sh.codev)}</td><td>${l.ready ? '<span class="v2st ok">Ready</span>' : '<span class="v2st tr">Google</span>'}</td></tr>`), 'No subscriptions this month');
}
function overview(m){
  const T = (m && m.totals) || {}, L = (m && m.lines) || [], mem = L.filter(l => l.kind === 'mem').length;
  return `<div class="v2sec v2ov"><div class="v2sh">${ic('coins', 28)}<b>Company Overview <small>(${monName(FMON)} — My City Shines)</small></b><button onclick="v2Go('acc')">View All →</button></div>
    <div class="v2sb"><div class="v2split en">⚖️ ${SPLIT_TXT}</div>
    <div class="v2tiles v2t4">${[{c:'tb', i:'users', t:'Total<br>Subscriptions', v:N(mem)}, {c:'tg', i:'coins', t:'Total Subscription<br>Amount', v:R0(m ? m.gross : 0)}, {c:'to', i:'wallet', t:'Google +<br>Maintenance', v:R0((T.google || 0) + (T.maint || 0))}, {c:'tp', i:'bars', t:'Agents<br>Commission', v:R0(T.agent || 0)}].map(x => `<div class="v2tile ${x.c}">${ic(x.i, 34, '#fff')}<div><span class="tl">${x.t}</span><b>${x.v}</b></div></div>`).join('')}</div></div></div>`;
}
function profCard(name, type, idLbl, id, ref){
  const pr = photo();
  return `<div class="v2card v2pc2"><div class="v2ph" onclick="v2Go('prof')"><img src="${pr || 'img/avatar.png'}"></div>
    <div class="pci"><div class="anm">${E(name)}</div><div class="aty">Account Type: <b>${type}</b></div><div class="aact"><span>${ic('check', 16, '#fff')} ${type}</span></div></div>
    <div class="pcr"><div class="aid">${idLbl}: <span>${E(id)}</span></div>${ref ? `<div class="v2ref2"><span>Referral Code:</span><button class="rc" onclick="cpy('${E(ref)}')">${E(ref)} ${ic('copy', 18)}</button></div>` : ''}</div></div>`;
}
function cdHome(f, m, c){
  const cur = (f.months || []).find(x => x.mon === FMON) || {amt: 0};
  return `${profCard((CDV && CDV.name) || 'Co-Developer', 'Co-Developer', 'Co-Developer ID', ph0(c.phone), 'CODEV')}
    ${overview(m)}
    <div class="v2sec"><div class="v2sh">${ic('user', 28)}<b>Your Personal Share <small>(${E((CDV && CDV.name) || '')})</small></b></div><div class="v2sb">
    ${t2([{c:'tp', i:'coins', t:'Co-Developer Share<br>(This Month)', v:R0(cur.amt)}, {c:'tb', i:'bars', t:'Total<br>Earnings', v:R0(f.due), sub:'Ready: ' + Rs(f.ready)}, {c:'to', i:'wallet', t:'Total<br>Withdrawals', v:R0(f.paid)}, {c:'tw', i:'wallet', t:'Your Balance', v:R0(f.balance)}, {btn:'v2WdReq()', i:'send', t:'Request<br>Withdrawal'}])}
    ${f.req ? `<div class="v2ok en">⏳ Withdrawal request of <b class="num">${Rs(f.req.amount)}</b> sent on ${dmy(f.req.ts)} — Pending</div>` : ''}</div></div>
    ${sec('cal', 'All Subscriptions History <small>(Company Record)</small>', allSubsTable(m, 5), 'acc')}
    ${sec('wallet', 'My Personal Transactions <small>(Withdrawals)</small>', wdTable(f, 3), 'wd')}`;
}
function devHome(m, P, reqs, owe){
  const T = (m && m.totals) || {}, L = (P && P.list) || [], paid = L.reduce((a, p) => a + (p.paid || 0), 0);
  return `${profCard('PBT Code Labs', 'Developer', 'Developer ID', 'DEV', 'DEV')}
    ${overview(m)}
    <div class="v2sec"><div class="v2sh">${ic('user', 28)}<b>Your Personal Share <small>(Developer)</small></b></div><div class="v2sb">
    ${t2([{c:'tp', i:'coins', t:'Developer Share<br>(This Month)', v:R0(T.dev || 0)}, {c:'tb', i:'bars', t:'Co-Developer Share<br>(This Month)', v:R0(T.codev || 0)}, {c:'tg', i:'check', t:m && m.recv ? '✅ Received<br>from Google' : '⏳ Pending<br>from Google', v:R0(m ? (m.recv ? m.recv.amount : m.play - m.gEst) : 0), go:"v2Go('acc')"}, {c:'to', i:'wallet', t:'Total Paid<br>to Team', v:R0(paid)}, {c:'tw', i:'wallet', t:'Ready — To Pay', v:R0(owe), go:"v2Go('pay')"}, {btn:"v2Go('pay')", i:'send', t:'Withdrawal<br>Requests', v: String(reqs)}])}</div></div>
    ${sec('cal', 'All Subscriptions History <small>(Company Record)</small>', allSubsTable(m, 5), 'acc')}
    <div class="v2card"><div class="v2list"><button onclick="v2Go('acc')">💰 This month's accounts / Google receipt / Ads</button><button onclick="v2Go('pay')">✅ Payouts — accounts and QR</button><button onclick="admInbox()">💬 All Chats</button><button onclick="v2Go('agents')">🤝 Agents</button></div></div>`;
}
async function v2Render(){
  const rk = ROLEK();
  try{
    if(rk === 'agent'){
      if(!S){ const me = ls.get('me'); if(!me || !me.pin) return agLogin(); const r = await post('/agportal', {phone: me.phone, pin: me.pin}); if(!r.ok){ ls.set('me', {phone: me.phone}); return agLogin('❌ Wrong PIN'); } S = r; }
      const f = S.fin || {due: S.due, paid: S.paidOut, balance: S.balance, pays: S.pays, months: []};
      const body = TAB === 'subs' ? subsFull(S.refs)
        : TAB === 'wd' ? wdFull(f)
        : TAB === 'tx' ? txFull(f)
        : TAB === 'earn' ? earnHtml(f) + stmtBtn()
        : TAB === 'prof' ? agProf(S) + profHtml(S.agent.name, '', f.acct)
        : agHome(S);
      page('agent', body); badge(S.unread); if(TAB === 'home' || TAB === 'prof') v2Qr(S.agent.code); return;
    }
    if(rk === 'codev'){
      if(!CDME && !(await cdLoad())) return cdLogin('Please log in again');
      const c = ls.get('cd') || {}; FMON = FMON || monNow();
      if((TAB === 'acc' || TAB === 'home') && !FM) FM = await post('/fin2', {as:'cd', phone: c.phone, pin: c.pin, op:'month', mon: FMON});
      const f = CDME;
      const body = TAB === 'acc' ? monthHtml(FM, true)
        : TAB === 'wd' ? wdFull(f)
        : TAB === 'tx' ? txFull(f)
        : TAB === 'earn' ? earnHtml(f) + stmtBtn()
        : TAB === 'prof' ? profHtml((CDV && CDV.name) || 'Co-Developer', `<div class="v2mut">📱 <span class="num">${E(ph0(c.phone))}</span></div>`, f.acct)
        : cdHome(f, FM, c);
      page('codev', body); badge(f.unread); return;
    }
    FMON = FMON || monNow();
    if((TAB === 'acc' || TAB === 'home') && !FM) FM = await finCall({op:'month', mon: FMON});
    if((TAB === 'pay' || TAB === 'home' || TAB === 'acc') && !PEOPLE) PEOPLE = await finCall({op:'people'});
    if(!FM || FM.ok === false || !PEOPLE || PEOPLE.ok === false){ return admLogin('Please log in again'); }
    const reqs = (PEOPLE.reqs || []).length, owe = PEOPLE.list.reduce((a, p) => a + (p.avail || 0), 0);
    const body = TAB === 'acc' ? monthHtml(FM, false)
      : TAB === 'pay' ? payoutsHtml(PEOPLE)
      : TAB === 'agents' ? '<div id="v2ag"><div class="v2card">⏳ …</div></div>'
      : TAB === 'prof' ? profHtml('Developer — PBT Code Labs', '<div class="v2mut">👨‍💻 All agents, accounts and payouts</div><button class="sec" style="margin-top:6px" onclick="v2Log()">📜 Accounts Audit Log</button>', false)
      : devHome(FM, PEOPLE, reqs, owe);
    page('dev', body); if(TAB === 'acc') mcsAdsLoad();
    if(TAB === 'agents'){ const sv = app.innerHTML; await admHome(); const inner = app.innerHTML; app.innerHTML = sv; const el = $('#v2ag'); if(el) el.innerHTML = inner; }
  }catch(e){ app.innerHTML = `<div class="v2wrap">${hero(rk)}<div class="v2body"><div class="v2card">📶 No internet — <button onclick="v2Render()">🔄 Retry</button></div></div>${navBar(rk)}</div>`; }
}
window.v2Render = v2Render;
window.v2Go = t => { TAB = t; if(t === 'home'){ FM = FM && FM.mon === FMON ? FM : null; } v2Render(); };
window.v2Refresh = async () => { S = null; CDME = null; FM = null; PEOPLE = null; v2Render(); };
window.v2Logout = () => { if(!confirm('Log out?')) return; if(ROLE === 'admin'){ ls.del('admPps'); ls.del('admRt'); admTok = null; } else if(ROLE === 'codev'){ const c = ls.get('cd') || {}; ls.set('cd', {phone: c.phone}); CDV = null; } else { const m = ls.get('me') || {}; ls.set('me', {phone: m.phone}); } S = null; CDME = null; FM = null; PEOPLE = null; TAB = 'home'; ppScreen(ROLEK()); };
window.v2Bell = async () => { const rk = ROLEK(); if(rk === 'dev') return admInbox();
  const r = await finCall({op:'notes'}); const L = (r && r.list) || [];
  const b = document.createElement('div'); b.className = 'v2modal'; b.onclick = e => { if(e.target === b) b.remove(); };
  b.innerHTML = `<div class="v2card"><h2>🔔 Notifications</h2>${L.map(n => `<div class="v2nt ${n.rd ? '' : 'nw'}"><div>${E(n.text)}</div><small class="num">${new Date(n.ts).toLocaleString('en-GB')}</small></div>`).join('') || '<div class="v2mut">No notifications yet</div>'}
    <div class="btns"><button onclick="this.closest('.v2modal').remove();v2Chat()">💬 Chat with Developer</button><button class="sec" onclick="this.closest('.v2modal').remove()">✖ Close</button></div></div>`;
  document.body.appendChild(b); badge(0); if(S) S.unread = 0; if(CDME) CDME.unread = 0; };
window.v2Chat = () => { const rk = ROLEK(); if(rk === 'dev') return admInbox(); if(rk === 'codev'){ const c = ls.get('cd') || {}; CDV = CDV || {phone: c.phone, pin: c.pin}; return cdChatView(); } agRender(); setTimeout(() => { const c = $('#chat'); if(c) c.scrollIntoView({block:'center'}); }, 60); };
window.v2Proof = () => { agRender(); setTimeout(() => { const el = $('#pfRk'); if(el) el.scrollIntoView({block:'center'}); }, 60); };
window.v2Menu = () => { const rk = ROLEK(); const b = document.createElement('div'); b.className = 'v2modal'; b.onclick = e => { if(e.target === b) b.remove(); };
  b.innerHTML = `<div class="v2card v2menu">${NAV[rk].map(([k, t, i]) => `<button onclick="this.closest('.v2modal').remove();v2Go('${k}')">${ic(i, 22)} ${t}</button>`).join('')}<button onclick="this.closest('.v2modal').remove();v2Chat()">💬 Chat</button><button onclick="this.closest('.v2modal').remove();openHelpDesk()">🛠️ Help Desk</button><button onclick="this.closest('.v2modal').remove();v2Refresh()">🔄 Refresh</button><button onclick="roleSwitch()">🔄 Switch Login</button></div>`;
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
      <label class="lrem"><input type="checkbox" id="ppRem" ${ls.get('rem', true) ? 'checked' : ''}> Remember me — don't ask PIN next time</label>
      <div class="err">${E(msg || '')}</div>
      <div class="lbtn"><button class="lin" onclick="ppGo('${rk}')">${ic('login', 30)} Login</button><button class="lex" onclick="roleSwitch()">${ic('exit', 30)} Exit</button></div>
      <button class="lfg" onclick="ppForgot('${rk}')">🔑 Forgot PIN?</button><div id="fpBox"></div>
      <div class="lauth"><i></i>${ic('users', 26)} <span>${AUTH[rk]}</span><i></i></div></div>
    <img class="v2wave" src="img/wave.jpg" alt=""></div>`;
  const el = $('#ppPin'); if(el){ el.focus(); el.addEventListener('input', () => { if(el.value.length === 6 && !$('#ppPh')) ppGo(rk); }); el.addEventListener('keydown', e => { if(e.key === 'Enter') ppGo(rk); }); }
};
window.rolePick = function(){
  const b = (r, ic2, t) => `<button class="v2role" onclick="roleGo('${r}')"><span>${ic2}</span>${t}</button>`;
  app.innerHTML = `<div class="v2wrap v2login"><div class="v2lhero"><img src="img/head-login.jpg" alt="My City Shines"><div class="lpill"><span>🤝</span>MCS Agent</div></div>
    <div class="v2lcard"><div class="lt" style="text-align:center;margin-bottom:6px">👋 Welcome — choose your login</div>
      ${b('agent','🤝','MCS Agent')}${b('codev','👥','Co-Developer')}${b('admin','👨‍💻','Developer (Owner)')}
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
  return table(['S.No','Account ID','Name','Subscription ID','Expiry Date','Status'], L.map((r, i) => `<tr class="tap" onclick="v2SubDet('${E(r.rk)}')"><td>${i+1}</td><td class="n">${E(ph0(r.phone) || '—')}</td><td>${E(r.name)}</td><td class="n">${E(String(r.rk||'').split('_').pop().toUpperCase())}</td><td class="n">${dmy(r.until)}</td><td>${({active:'<span class="v2st ok">Active</span>',trial:'<span class="v2st tr">Trial</span>',expired:'<span class="v2st ex">Expired</span>',pending:'<span class="v2st no">Pending</span>'})[stOf(r)]}</td></tr>`), 'Nothing found');
}
window.SFset = (k, v, keep) => { SF[k] = v; if(keep){ const t = $('#sfT'); if(t) t.innerHTML = sec('cal', 'Subscription History', subsTableX(subsRows(S.refs))); return; } v2Render(); };
window.v2SubDet = rk => { const r = (S.refs || []).find(x => x.rk === rk); if(!r) return;
  const row = (a, b) => `<tr><td>${a}</td><td class="n">${b}</td></tr>`;
  const b = document.createElement('div'); b.className = 'v2modal'; b.onclick = e => { if(e.target === b) b.remove(); };
  b.innerHTML = `<div class="v2card"><h2>⭐ ${E(r.name)}</h2>${table(['',''], [row('Account ID', E(ph0(r.phone) || '—')), row('Subscription ID', E(r.rk)), row('Category', E(r.cat || '—')), row('City', E(r.city || '—')), row('Registered', dmy(r.at)), row('Expiry', dmy(r.until)), row('Paid years', N(r.paid)), row('Status', stOf(r))])}<div class="btns"><button class="sec" onclick="this.closest('.v2modal').remove()">✖ Close</button></div></div>`;
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
    ${sec('bars', 'Monthly Summary', table(['Month','Payments','Amount'], Object.keys(byM).sort().reverse().map(k => `<tr><td>${monName(k)}</td><td class="n">${byM[k].n}</td><td class="n">${Rs(byM[k].a)}</td></tr>`), 'No payments yet'))}`;
}
window.TF = TF;
/* My Earnings — پرنٹ / PDF اسٹیٹمنٹ */
function stmtBtn(){ return `<div class="btns"><button onclick="v2Stmt()">🖨️ Commission Statement — Print / PDF</button></div>`; }
window.v2Stmt = () => { const rk = ROLEK(), f = rk === 'agent' ? (S.fin || {}) : CDME, nm = rk === 'agent' ? S.agent.name + ' (' + S.agent.code + ')' : (CDV && CDV.name) || 'Co-Developer';
  const w = window.open('', '_blank'); if(!w) return alert('Please allow pop-ups');
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
    <div class="v2card v2refbox"><div class="v2qr big" id="v2qr" data-code="${E(a.code)}"></div><div><b>Referral QR</b><div class="v2mut en">When a shopkeeper scans this QR, My City Shines opens on Google Play — they enter referral code <b class="num">${E(a.code)}</b></div>
      <div class="btns"><button onclick="cpy(refLink('${E(a.code)}'))">🔗 Copy referral link</button><button class="sec" onclick="v2ShareRef('${E(a.code)}')">📤 Share</button></div></div></div>`;
}
window.v2ShareRef = code => { const t = 'My City Shines — list your business\n' + refLink(code) + '\nReferral Code: ' + code; if(navigator.share) navigator.share({text: t}).catch(() => {}); else cpy(t); };
window.refLink = refLink;
const oldProf = profHtml;
profHtml = function(name, lines, acct){ return oldProf(name, lines, acct).replace('<div class="v2card"><div class="v2list">', pinForm() + '<div class="v2card"><div class="v2list">'); };
function pinForm(){ return `<div class="v2card"><h2>🔐 Account Security — Change PIN</h2>
  <label>Old PIN</label><input id="cpO" type="password" inputmode="numeric" dir="ltr" maxlength="6" oninput="this.value=enD(this.value).slice(0,6)">
  <label>New PIN (6 digits)</label><input id="cpN" type="password" inputmode="numeric" dir="ltr" maxlength="6" oninput="this.value=enD(this.value).slice(0,6)">
  <div class="err" id="cpE"></div><div class="btns"><button onclick="v2ChPin()">🔐 Change PIN</button></div></div>`; }
window.v2ChPin = async () => { const o = $('#cpO').value, n = $('#cpN').value, rk = ROLEK(); if(o.length !== 6 || n.length !== 6) return ($('#cpE').textContent = '⚠️ Both PINs must be 6 digits');
  const c = rk === 'agent' ? (ls.get('me') || {}) : rk === 'codev' ? (ls.get('cd') || {}) : {};
  const r = await ppPost({op: 'chpin', role: rk, pin: o, newpin: n, phone: c.phone || ''}); if(!r || !r.ok) return ($('#cpE').textContent = PP_ERR[r && r.reason] || '❌ Failed');
  if(rk === 'agent') ls.set('me', {phone: c.phone, pin: n}); if(rk === 'codev'){ ls.set('cd', {phone: c.phone, pin: n}); if(CDV) CDV.pin = n; }
  toast('✅ PIN changed' + (rk === 'agent' ? ' — use the new PIN in My City Shines too' : '')); $('#cpO').value = $('#cpN').value = ''; };
window.v2Log = async () => { const r = await finCall({op:'log'}); const L = (r && r.list) || [];
  const b = document.createElement('div'); b.className = 'v2modal'; b.onclick = e => { if(e.target === b) b.remove(); };
  b.innerHTML = `<div class="v2card"><h2>📜 Accounts Audit Log</h2>${table(['Time','Action','Details'], L.map(x => `<tr><td class="n">${new Date(x.ts).toLocaleString('en-GB')}</td><td>${E(x.op)}</td><td style="text-align:left;font-size:11px">${E(x.data)}</td></tr>`), 'Nothing yet')}<div class="btns"><button class="sec" onclick="this.closest('.v2modal').remove()">✖ Close</button></div></div>`;
  document.body.appendChild(b); };
/* ===== AGP0911MO021 (مالک کا حکم): «لانے والا» فہرست — نام + کوڈ؛ My City Shines کے اشتہار پورٹل میں پڑھ کر حساب میں (MCS ایپ میں کوئی رقم نہیں) ===== */
function bringerSel(id){   /* AGP1111WE029: صاف فہرست — پہلے DEV / CODEV / PBT، پھر ایجنٹ AG-… ترتیب سے؛ کوڈ برابر چوڑائی */
  const L = (PEOPLE && PEOPLE.list) || [], ag = L.filter(p => p.kind === 'agent').sort((a, b) => String(a.code).localeCompare(String(b.code), 'en', {numeric: true})), cd = L.find(p => p.kind === 'codev');
  const pad = c => (String(c) + '\u00A0'.repeat(8)).slice(0, 8);
  return `<select id="${id}" class="bsel" dir="ltr"><option value="">— Choose who brought it —</option>
    <optgroup label="Developer / Co-Developer / Company"><option value="DEV">${pad('DEV')} · Developer (me)</option><option value="CODEV">${pad('CODEV')} · Co-Developer${cd ? ' — ' + E(cd.name) : ''}</option><option value="PBT">${pad('PBT')} · Company (came by self, 50 / 50)</option></optgroup>
    <optgroup label="Agents">${ag.map(a => `<option value="${E(a.code)}">${pad(E(a.code))} · ${E(a.name)}</option>`).join('') || '<option disabled>No agents yet</option>'}</optgroup></select>`;
}
const FSV = v => v == null ? null : 'stringValue' in v ? v.stringValue : 'integerValue' in v ? +v.integerValue : 'doubleValue' in v ? +v.doubleValue : 'booleanValue' in v ? v.booleanValue : 'nullValue' in v ? null : v.mapValue ? Object.fromEntries(Object.entries(v.mapValue.fields || {}).map(([k, x]) => [k, FSV(x)])) : v.arrayValue ? (v.arrayValue.values || []).map(FSV) : null;
let MCSADS = null;
async function mcsAdsLoad(){
  const box = document.getElementById('mcsAds'); if(!box) return;
  try{
    if(!MCSADS){ const r = await (await fetch('https://firestore.googleapis.com/v1/projects/my-city-shines/databases/(default)/documents/appConfig/ads?key=' + FB_KEY + '&mask.fieldPaths=list')).json(); MCSADS = ((r.fields && FSV(r.fields.list)) || []).filter(Boolean); }
    const done = await finCall({op:'xads'}); const got = new Set(((done && done.list) || []).map(x => x.rk));
    const paid = MCSADS.filter(a => a.free === false), todo = paid.filter(a => !got.has('ad:' + a.id)), free = MCSADS.length - paid.length;
    box.innerHTML = `<h2>📢 My City Shines Ads</h2><div class="v2mut">This list is only read from My City Shines — amounts are recorded only here in MCS Agent, never in the My City Shines app. ${free ? `(${free} free ads not counted)` : ''}</div>
      ${todo.length ? todo.map(a => `<div class="v2pc"><div class="pch"><b>📢 ${E(a.title)}</b></div><div class="pcs"><span>👤 ${E(a.owner || '—')}</span><span class="num">📱 ${E(ph0(a.phone) || '—')}</span><span>📅 ${dmy(a.id)} → ${dmy(a.until)}</span></div><div class="btns"><button onclick="v2AdPick(${+a.id})">➕ Add to accounts</button></div></div>`).join('')
        : '<div class="v2ok">✅ All paid ads are recorded</div>'}
      ${paid.length - todo.length ? `<div class="v2mut">✔️ ${paid.length - todo.length} Ad already recorded</div>` : ''}`;
  }catch(e){ box.innerHTML = '<h2>📢 My City Shines Ads</h2><div class="v2warn">📶 Could not load — open again</div>'; }
}
window.v2AdPick = id => { const a = (MCSADS || []).find(x => +x.id === id); if(!a) return;
  $('#xK').value = 'ad'; $('#xA').value = a.price > 0 ? a.price : ''; $('#xB').value = a.title + (a.owner ? ' — ' + a.owner : ''); $('#xRk').value = 'ad:' + a.id; $('#xR').value = '';
  const f = $('#xA').closest('.v2card'); f.scrollIntoView({behavior: 'smooth', block: 'center'}); f.classList.add('hl'); setTimeout(() => f.classList.remove('hl'), 1800);
  toast(a.price > 0 ? 'Check amount and choose «Brought by»' : 'Enter amount and choose «Brought by»'); };
})();
