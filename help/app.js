/* PBT Help Desk — گاہک اپنا مسئلہ / مشورہ / سوال یہاں بتائیں؛ مالک (ڈویلپر) یہیں سے جواب دے
   راستے (hash): #/ ہوم · #/app/<ID> · #/new/<ID> · #/thanks/<no> · #/mine · #/i/<id> · #/owner
   ایپ سے سیدھا: ?app=AIO-POS-DIRECT&v=AIODR0111SU111&phone=03001234567&name=احمد */
'use strict';
const APP_VERSION = 'HD0911MO065';
const UPDATE_NOTE = '🔄 چھوٹا، کونے میں؛ صرف دبانے پر گھومتا اور چمکتا ہے';
const DEV_PHONE = '03206793793';

const APPS = [
  { id: 'AIO', lang: 'en', ur: 'AIO POS', en: 'AIO POS', img: '../img/aio.webp', repo: 'pbtcodelabs-pbt/AIO' },
  { id: 'AIO-POS-DIRECT', lang: 'en', ur: 'AIO POS ڈائریکٹ', en: 'AIO POS Direct', img: '../img/aiodirect.webp', repo: 'pbtcodelabs-pbt/AIO-POS-DIRECT' },
  { id: 'FFPOS', lang: 'en', ur: 'FFPOS', en: 'FFPOS', img: '../img/ffpos.webp?v=2', repo: 'ffpos-pbt/ffpos-pbt.github.io' },
  { id: 'SM', ur: 'سبزی منڈی', en: 'Sabzi Mandi', img: '../img/sm.webp', repo: 'pbtcodelabs-pbt/SM' },
  { id: 'FM', ur: 'فروٹ منڈی', en: 'Fruit Mandi', img: '../img/fm.webp', repo: 'pbtcodelabs-pbt/FM' },
  { id: 'AB', ur: 'آڑھت بک', en: 'Arhat Book', img: 'img/ab.png', repo: 'pbtcodelabs-pbt/AB' },
  { id: 'DG', lang: 'en', ur: 'جی جی کھاتہ بک', en: 'GG Khatabook', img: '../img/dg.webp', repo: 'pbtcodelabs-pbt/DG' },
  { id: 'DDL', ur: 'دودھ ڈائری', en: 'Doodh Diary', img: '../img/ddl.webp', repo: 'pbtcodelabs-pbt/DDL' },
  { id: 'Hifz-progress', ur: 'مدرسہ', en: 'Madrasa', img: '../img/hifz.webp', repo: 'pbtcodelabs-pbt/Hifz-progress' },
  { id: 'hafiz-musab-app', ur: 'حفظ پرو', en: 'Hifz Pro', img: '../img/hifzpro.webp', repo: 'pbtcodelabs-pbt/hafiz-musab-app' },
  { id: 'MA', ur: 'مکتبہ', en: 'Maktaba', img: '../img/ma.webp', repo: 'pbtcodelabs-pbt/MA' },
  { id: 'MS', ur: 'میڈیسن شیلف', en: 'Medicine Shelf', img: '../img/ms.svg', repo: 'pbtcodelabs-pbt/MS' },
  { id: 'Stylish-listing-', ur: 'سامان لسٹ', en: 'Shopping List', img: '../img/list.webp', repo: 'pbtcodelabs-pbt/Stylish-listing-' },
  { id: 'MT', lang: 'en', ur: 'میٹر ٹریکر', en: 'Meter Tracker', img: '../img/mt.webp', repo: 'pbtcodelabs-pbt/MT' },
  { id: 'MCS', ur: 'سٹی شائنز', en: 'My City Shines', img: '../img/mcs.webp', repo: 'pbtcodelabs-pbt/MCS' },
  { id: 'urdu-fonts-studio', ur: 'اردو فونٹس', en: 'Urdu Fonts', img: '../img/fonts.webp', repo: 'pbtcodelabs-pbt/urdu-fonts-studio' },
  { id: 'other', ur: 'کوئی اور', en: 'Other', emoji: '🧩', repo: '' }
];
const appOf = id => APPS.find(a => a.id.toLowerCase() === String(id || '').toLowerCase()) || APPS[APPS.length - 1];

/* ---------- زبان ---------- */
const DICT = {
  sub: ['اپنا مسئلہ یا مشورہ یہاں بتائیں', 'Tell us your problem or suggestion here'],
  langBtn: ['EN', 'اردو'],
  demo: ['🧪 ڈیمو — ابھی فائربیس نہیں جڑا، ڈیٹا صرف اسی فون میں', '🧪 Demo — not connected to Firebase yet, data stays on this phone'],
  solvedWeek: ['اس ہفتے حل', 'Solved this week'],
  pending: ['زیر غور', 'Under review'],
  avgReply: ['اوسط جواب', 'Avg. reply'],
  chooseApp: ['اپنی ایپ چنیں', 'Choose your app'],
  chooseAppSub: ['جس ایپ میں مسئلہ ہے', 'the app you need help with'],
  mine: ['میرے مسائل', 'My requests'],
  mineSub: ['جو آپ نے بھیجے — حالت اور جواب', 'what you sent — status & reply'],
  hours: ['جواب کا وقت', 'Reply hours'],
  hoursDef: ['روزانہ صبح 11 بجے اور رات ساڑھے 8 بجے — ہر مسئلہ باری سے دیکھا اور حل کیا جاتا ہے', 'Daily at 11 AM and 8:30 PM — every request is reviewed and fixed in turn'],
  nextRev: ['اگلا جائزہ', 'Next review'],
  slotToday2pm: ['آج صبح 11 بجے', 'today 11 AM'], slotTonight: ['آج رات ساڑھے 8 بجے', 'tonight 8:30 PM'], slotTomorrow: ['کل صبح 11 بجے', 'tomorrow 11 AM'],
  camera: ['کیمرہ', 'Camera'],
  close: ['بند کریں', 'Close'],
  whyHere: ['یہاں لکھا ہر مسئلہ محفوظ رہتا ہے، گم نہیں ہوتا، اور حل ہوتے ہی جواب یہیں آ جاتا ہے۔ واٹس ایپ پر بھیجنے کی ضرورت نہیں۔',
    'Everything written here is saved, never lost, and the answer appears right here once solved. No need to send it on WhatsApp.'],
  tellBtn: ['اپنا مسئلہ یا مشورہ بتائیں', 'Report a problem or suggestion'],
  dupTip: ['👀 پہلے نیچے دیکھ لیں — اگر آپ کا مسئلہ پہلے سے لکھا ہے تو «👋 میرا بھی یہی مسئلہ ہے» دبا دیں، دوبارہ لکھنے کی ضرورت نہیں۔ جتنے زیادہ لوگ، اتنی جلدی حل۔',
    '👀 Check the list first — if your problem is already there, just tap «👋 I have the same problem». No need to write it again. More votes = faster fix.'],
  tabOpen: ['زیر غور', 'Open'], tabDone: ['حل ہو گئے', 'Solved'],
  search: ['تلاش کریں…', 'Search…'],
  noOpen: ['اس ایپ میں ابھی کوئی کھلا مسئلہ نہیں 🎉', 'No open requests for this app 🎉'],
  noDone: ['اس ہفتے کوئی حل شدہ مسئلہ نہیں', 'Nothing solved this week yet'],
  noMine: ['آپ نے ابھی کچھ نہیں بھیجا', 'You have not sent anything yet'],
  metoo: ['میرا بھی یہی مسئلہ ہے', 'I have the same problem'],
  metooIdea: ['میں بھی یہی چاہتا ہوں', 'I want this too'],
  yours: ['آپ کا', 'Yours'],
  pbtReply: ['💬 PBT Code Labs کا جواب', '💬 Reply from PBT Code Labs'],
  dupOf: ['یہ مسئلہ پہلے سے موجود ہے — دیکھیں', 'Already reported — see'],
  more: ['مزید', 'more'],
  // فارم
  newTitle: ['نیا مسئلہ / مشورہ', 'New request'],
  q1: ['کیا بتانا ہے؟', 'What is it?'],
  bug: ['مسئلہ', 'Problem'], idea: ['مشورہ', 'Suggestion'], ask: ['سوال', 'Question'],
  q2: ['تفصیل لکھیں', 'Describe it'],
  q2s: ['ضروری — جتنا صاف لکھیں گے، اتنا جلدی حل', 'required — the clearer, the faster'],
  ph: ['اپنا پورا مسئلہ یہاں اردو یا انگلش میں لکھیں — مثلاً: بل پرنٹ کرتے وقت گاہک کا نام کٹ جاتا ہے…', 'Type your full problem here in Urdu or English — e.g. When I print a bill, the customer name gets cut…'],
  paste: ['پیسٹ', 'Paste'], speak: ['بول کر لکھیں', 'Speak to type'], stopSpeak: ['رکیں', 'Stop'],
  q3: ['اسکرین شاٹ لگائیں', 'Add screenshots'],
  q3s: ['اختیاری', 'optional'],
  dropT: ['اسکرین شاٹ لگائیں تو ہم بات جلدی اور بہتر سمجھ سکیں گے', 'A screenshot helps us understand faster and better'],
  gallery: ['گیلری سے', 'Gallery'], pasteImg: ['تصویر پیسٹ', 'Paste image'],
  q4: ['آواز میں بتائیں', 'Voice note'], q4s: ['اختیاری', 'optional'],
  addL: ['ساتھ لگائیں (اختیاری):', 'Attach (optional):'], voice: ['آواز', 'Voice'],
  recT: ['🎤 آواز (اختیاری) — مزید سمجھانا ہو تو دبا کر بولیں، 2 منٹ تک', '🎤 Voice (optional) — to explain more, tap and speak, up to 2 min'],
  recOn: ['ریکارڈ ہو رہا ہے… دوبارہ دبا کر روکیں', 'Recording… tap again to stop'],
  recDone: ['آواز تیار ہے', 'Voice note ready'],
  q5: ['آپ کا رابطہ', 'Your contact'],
  q5s: ['صرف PBT Code Labs کو نظر آئے گا', 'only PBT Code Labs can see this'],
  name: ['آپ کا نام', 'Your name'], phone: ['موبائل نمبر', 'Mobile number'],
  remember: ['اگلی بار کے لیے یاد رکھیں', 'Remember for next time'],
  verL: ['ایپ کا ورژن (اگر معلوم ہو)', 'App version (if you know it)'],
  appL: ['ایپ', 'App'],
  send: ['بھیج دیں', 'Send'],
  sending: ['بھیجا جا رہا ہے…', 'Sending…'],
  errText: ['✍️ پیغام نہیں گیا — اوپر والے خانے میں اپنا مسئلہ اردو یا انگلش میں لکھیں، پھر «بھیج دیں» دبائیں۔ اسکرین شاٹ اور آواز محفوظ ہیں۔', '✍️ Not sent — please type your problem in Urdu or English in the box above, then tap Send. Your screenshot and voice note are kept.'],
  errPhone: ['درست موبائل نمبر لکھیں (مثلاً 03001234567)', 'Enter a valid mobile number (e.g. 03001234567)'],
  errName: ['اپنا نام لکھیں', 'Please enter your name'],
  thanks: ['شکریہ! آپ کی بات ہم تک پہنچ گئی', 'Thank you! We received it'],
  ticketL: ['آپ کا نمبر', 'Your number'],
  thanksP: ['ہم باری سے دیکھیں گے۔ حالت بدلتے ہی اور حل ہوتے ہی جواب «میرے مسائل» میں یہیں آ جائے گا۔',
    'We will look at it in turn. Status updates and the answer will appear here in «My requests».'],
  home: ['ہوم', 'Home'],
  maxShots: ['زیادہ سے زیادہ 10 تصویریں', 'Maximum 10 images'],
  pv: ['دیکھیں', 'Preview'], pvT: ['آپ کا پورا پیغام', 'Your full message'], pvE: ['ابھی کچھ نہیں لکھا', 'Nothing written yet'], pvEdit: ['✏️ درست کریں', '✏️ Edit'],
  noClipImg: ['کلپ بورڈ میں تصویر نہیں ملی — پہلے اسکرین شاٹ کاپی کریں یا گیلری سے چنیں', 'No image in clipboard — copy a screenshot first or use Gallery'],
  noClip: ['پیسٹ کی اجازت نہیں ملی — خانے کو دبا کر رکھیں اور Paste چنیں', 'Paste not allowed — long-press the box and choose Paste'],
  micErr: ['مائیک کی اجازت نہیں ملی', 'Microphone permission denied'],
  pasted: ['پیسٹ ہو گیا', 'Pasted'],
  updatedMine: ['🎉 آپ کے مسئلے پر نیا جواب / حالت', '🎉 New update on your request'],
  // حالتیں
  s_new: ['موصول', 'Received'], s_seen: ['دیکھ لیا', 'Seen'], s_work: ['کام جاری', 'In progress'], s_done: ['حل ہو گیا', 'Solved'], s_dup: ['پہلے سے موجود', 'Duplicate'],
  people: ['لوگ', 'people'],
  now: ['ابھی', 'just now'], mAgo: ['منٹ پہلے', 'min ago'], hAgo: ['گھنٹے پہلے', 'h ago'], dAgo: ['دن پہلے', 'd ago'], yday: ['کل', 'yesterday'],
  hrs: ['گھنٹے', 'hrs'], days: ['دن', 'days'],
  foot: ['ہر کاروبار کا سافٹ ویئر — موبائل، ونڈوز، اینڈرائیڈ، کروم بک — پی بی ٹی کوڈ لیبز', 'Software for every business — mobile, Windows, Android, Chromebook — PBT Code Labs'],
  viewOne: ['مسئلہ', 'Request'],
  notFound: ['یہ مسئلہ نہیں ملا — شاید حل ہو کر ہٹ چکا ہے', 'Not found — it may have been solved and removed'],
  delMine: ['واپس لیں', 'Withdraw'], delMineQ: ['یہ مسئلہ واپس لے لیں؟', 'Withdraw this request?']
};
let LANG = (() => { try { return localStorage.getItem('pbthd_lang') === 'en' ? 'en' : 'ur'; } catch (e) { return 'ur'; } })();
const T = k => (DICT[k] ? DICT[k][LANG === 'en' ? 1 : 0] : k);
const AN = a => (LANG === 'en' ? a.en : a.ur);
function setLang(l) {
  LANG = l; try { localStorage.setItem('pbthd_lang', l); } catch (e) {}
  document.documentElement.lang = l === 'en' ? 'en' : 'ur';
  document.documentElement.dir = l === 'en' ? 'ltr' : 'rtl';
  render();
}

const EMBED = new URLSearchParams(location.search).get('embed') === '1'; // کسی ایپ کے اندر پاپ اپ (widget.js)
if (EMBED) document.documentElement.classList.add('embed');

/* ---------- مددگار ---------- */
const $ = s => document.querySelector(s);
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const ls = {
  get(k, d) { try { const v = localStorage.getItem('pbthd_' + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem('pbthd_' + k, JSON.stringify(v)); } catch (e) {} }
};
const DEV = (() => { let d = ls.get('dev'); if (!d) { d = 'd' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8); ls.set('dev', d); } return d; })();
function toast(m, ms) { const t = $('#toast'); t.textContent = m; t.style.display = 'block'; clearTimeout(toast.h); toast.h = setTimeout(() => t.style.display = 'none', ms || 2600); }
function busy(on, txt) { $('#busy').classList.toggle('on', !!on); $('#busyT').textContent = txt || ''; }
const digits = s => String(s || '').replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d)).replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d));
function normPhone(s) {
  let p = digits(s).replace(/[^\d+]/g, '');
  if (p.startsWith('+92')) p = '0' + p.slice(3);
  else if (p.startsWith('0092')) p = '0' + p.slice(4);
  else if (p.startsWith('92') && p.length === 12) p = '0' + p.slice(2);
  else if (p.startsWith('3') && p.length === 10) p = '0' + p;
  return p.replace(/\+/g, '');
}
const phoneOk = p => /^03\d{9}$/.test(p) || /^\d{8,15}$/.test(p);
const waNum = p => (/^0\d{10}$/.test(p) ? '92' + p.slice(1) : p);
/* تحریر میں جو بھی موبائل نمبر ہو (0300-1234567، +92 300 1234567، اردو ہندسے بھی) — ساتھ 📞 کال اور 💬 واٹس ایپ */
const PH_RX = /(?:\+?92|0092|[0۰٠])?[\s-]?[3۳٣][0-9۰-۹٠-٩]{2}[\s-]?[0-9۰-۹٠-٩]{7}(?![0-9۰-۹٠-٩])/g;
function phoneLinks(text) {
  let out = '', last = 0;
  String(text || '').replace(PH_RX, (m, off) => {
    const p = normPhone(m);
    if (!/^03\d{9}$/.test(p)) return m;
    out += esc(text.slice(last, off)) + `<span class="phIn"><b class="num">${esc(m.trim())}</b><a class="phB" href="tel:${p}" title="Call">📞</a><a class="phB wa" href="https://wa.me/${waNum(p)}" target="_blank" rel="noopener" title="WhatsApp">💬</a></span>`;
    last = off + m.length; return m;
  });
  return out + esc(String(text || '').slice(last));
}
function ago(t) {
  const s = (Date.now() - t) / 1000;
  if (s < 60) return T('now');
  if (s < 3600) return Math.floor(s / 60) + ' ' + T('mAgo');
  if (s < 86400) return Math.floor(s / 3600) + ' ' + T('hAgo');
  if (s < 172800) return T('yday');
  return Math.floor(s / 86400) + ' ' + T('dAgo');
}
const fullDate = t => new Date(t).toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true });
const appIcon = (a, cls) => a.img ? `<img class="${cls || ''}" src="${esc(a.img)}" alt="" loading="lazy">` : `<span class="em ${cls || ''}">${a.emoji}</span>`;
const TYPES = { bug: '🐞', idea: '💡', ask: '❓' };
const ST_IC = { new: '📥', seen: '👀', work: '🔧', done: '✅', dup: '🔗' };
const stChip = s => `<span class="chip ${s}">${ST_IC[s]} ${T('s_' + s)}</span>`;
const tyChip = t => `<span class="chip">${TYPES[t] || '🐞'} ${T(t)}</span>`;

/* ---------- ڈیٹا ---------- */
let ISSUES = [], CFG = {};
const keepDays = () => +CFG.keepDays || 7;
const isOpen = i => ['new', 'seen', 'work'].includes(i.status);
const fresh = i => !(i.status === 'done' || i.status === 'dup') || (Date.now() - (i.doneAt || i.upd) < keepDays() * 864e5);
const publicList = () => ISSUES.filter(i => i.pub && fresh(i));
const myList = () => ISSUES.filter(i => i.dev === DEV && fresh(i)).sort((a, b) => b.created - a.created);
const ptext = i => i.ptext || i.text || '';
function weekSolved(list) { const w = Date.now() - 7 * 864e5; return list.filter(i => i.status === 'done' && i.doneAt > w).length; }
function avgReply() {
  const d = ISSUES.filter(i => i.status === 'done' && (i.replyAt || i.doneAt) && Date.now() - i.doneAt < 30 * 864e5);
  if (!d.length) return '—';
  const h = d.reduce((s, i) => s + ((i.replyAt || i.doneAt) - i.created), 0) / d.length / 3600e3;
  return h < 48 ? Math.max(1, Math.round(h)) + ' ' + T('hrs') : Math.round(h / 24) + ' ' + T('days');
}
// «میرے مسائل» میں نیا کیا ہے
const sig = i => i.status + '|' + (i.reply || '').length;
function unseenMine() { const seen = ls.get('seen', {}); return myList().filter(i => seen[i.id] && seen[i.id] !== sig(i)).length; }
function markMineSeen() { const seen = ls.get('seen', {}); myList().forEach(i => seen[i.id] = sig(i)); ls.set('seen', seen); }
function rememberMine(id, s) { const seen = ls.get('seen', {}); seen[id] = s; ls.set('seen', seen); }

/* HD0511TH042 (مالک کا حکم): اگلا جائزہ صبح 11 بجے اور رات ساڑھے 8 بجے (پاکستانی وقت) — صرف حساب */
function nextReview() {
  const d = new Date(Date.now() + 5 * 3600e3), m = d.getUTCHours() * 60 + d.getUTCMinutes(); // PKT = UTC+5
  return m < 11 * 60 ? T('slotToday2pm') : m < 20 * 60 + 30 ? T('slotTonight') : T('slotTomorrow');
}
const revLine = () => `<div class="rev">⏰ ${T('nextRev')}: <b>${nextReview()}</b></div>`;

/* ---------- راستہ ---------- */
let R = { v: 'home' };
function parse() {
  const h = location.hash.replace(/^#\/?/, '').split('/');
  const v = h[0] || 'home';
  R = { v, a: decodeURIComponent(h[1] || '') };
}
function go(h) {
  if (location.hash === h) { parse(); render(); return; }
  if (EMBED) { location.replace(h); return; } // ایپ کے اندر: تاریخ نہ بڑھے، تاکہ فون کا «پیچھے» پاپ اپ بند کرے
  location.hash = h;
}
window.addEventListener('hashchange', () => { parse(); render(); window.scrollTo(0, 0); });

/* ---------- سر ---------- */
function header() {
  const own = Store.isOwner();
  const showBack = EMBED ? !['home', 'app'].includes(R.v) : R.v !== 'home';
  const back = (EMBED ? `<button class="hBtn back" data-act="embedClose" aria-label="${T('close')}">✕</button>` : '') +
    (showBack ? `<button class="hBtn back" data-act="back" aria-label="back">${LANG === 'en' ? '←' : '→'}</button>` : '');
  $('#hd').innerHTML = `<div class="hdIn">${back}
    <img class="logo" src="icons/icon-192.png" alt="" data-act="tap7">
    <div class="brand"><b>PBT Help Desk</b><span>${T('sub')}</span></div>
    ${own && R.v === 'home' ? `<button class="hBtn" data-act="goOwner" title="Developer">🛠️</button>` : ''}
    <button class="hBtn ${LANG === 'en' ? '' : 'en'}" data-act="lang">${T('langBtn')}</button></div>
    ${Store.mode === 'demo' ? `<div class="demo">${T('demo')}</div>` : ''}`;
}
function foot() {
  return `<div class="foot">${T('foot')}<br><span class="num">📞 ${DEV_PHONE}</span> · <span class="ver" data-act="tap7">${APP_VERSION}</span></div>`;
}

/* ---------- ہوم ---------- */
/* 🎬 تعارفی ویڈیوز — چلائیں، فون میں محفوظ (گیلری)، یا سیدھا شیئر (واٹس ایپ اسٹیٹس وغیرہ) */
const VIDEOS = [
  { id: 'helpdesk', file: 'media/pbt-help-desk.mp4', poster: 'media/helpdesk.jpg', ur: 'Help Desk — مسئلہ کیسے بتائیں؟ مکمل طریقہ', en: 'Help Desk — how to report a problem', dur: '1:06', dl: 'PBT-Help-Desk' },
  { id: 'aio-staff', file: 'media/aio-staff-join-ur.mp4', poster: 'media/aio-staff-join.jpg', ur: 'AIO POS — ملازم کا فون دکان سے کیسے جوڑیں؟ (مالک اور ملازم کے قدم)', en: 'AIO POS — connect a staff phone to your shop (Urdu)', dur: '1:45', dl: 'AIO-POS-Staff-Phone-Urdu', share: '📱 AIO POS — ملازم کا فون دکان سے جوڑنے کا آسان طریقہ\n👑 مالک: User Management ← «➕ Add a staff phone» ← نام، موبائل ← پیغام واٹس ایپ پر\n🧑‍💼 ملازم: «📋 Paste owner\'s message» ← Paste ← Connect ✅' },
  { id: 'aio-staff-en', file: 'media/aio-staff-join-en.mp4', poster: 'media/aio-staff-join-en.jpg', ur: 'AIO POS — ملازم کا فون جوڑیں (انگلش)', en: 'AIO POS — connect a staff phone to your shop (English)', dur: '1:45', dl: 'AIO-POS-Staff-Phone-English', share: '📱 AIO POS — connect a staff phone to your shop\n👑 Owner: User Management → «➕ Add a staff phone» → name, mobile → send the message on WhatsApp\n🧑‍💼 Staff: «📋 Paste owner\'s message» → Paste → Connect ✅' },
  { id: 'aio-ur', file: 'media/aio-pos-ur.mp4', poster: 'media/aio-ur.jpg', ur: 'AIO POS — تعارف (اردو)', en: 'AIO POS — introduction (Urdu)', dur: '0:50', dl: 'AIO-POS-Urdu', share: 'AIO POS — آپ کی دکان کا مکمل سافٹ ویئر 🧾📱\nGoogle Play: https://play.google.com/store/apps/details?id=com.pbtcodelabs.aiopos' },
  { id: 'aio-en', file: 'media/aio-pos-en.mp4', poster: 'media/aio-en.jpg', ur: 'AIO POS — تعارف (انگلش)', en: 'AIO POS — introduction (English)', dur: '0:50', dl: 'AIO-POS-English', share: 'AIO POS — all-in-one software for your shop 🧾📱\nGoogle Play: https://play.google.com/store/apps/details?id=com.pbtcodelabs.aiopos' }
];
const vName = v => (v.dl || 'PBT-Help-Desk-' + v.id) + '.mp4';
const POST_TEXT = "❓ *نئی سہولت — PBT Help Desk*\n\nالسلام علیکم! 🌹\nاب آپ کو کوئی مسئلہ بتانے کے لیے واٹس ایپ یا کسی اور ذریعے کی ضرورت نہیں۔\n\n📱 ہماری ہر ایپ کے اندر اب ایک پیلا *Help Desk* بٹن ہے۔\nایپ میں کوئی بھی مسئلہ نظر آئے تو:\n1️⃣ *Help Desk* دبائیں\n2️⃣ اپنا مسئلہ اردو یا انگلش میں *لکھیں* (لکھنا ضروری ہے) — اسکرین شاٹ لگائیں تو اور اچھا، آواز اختیاری\n3️⃣ بھیج دیں ✅\n\n🔔 پھر ہر قدم کی خبر آپ کو ایپ ہی میں ملتی رہے گی:\n📥 موصول ← 👀 دیکھ لیا ← 🔧 کام جاری ← ✅ حل ہو گیا\n\n🗂️ آپ کا ہر مسئلہ ریکارڈ میں محفوظ رہے گا، اور بہترین طریقے سے جلد حل ہوگا۔\n💡 اگر کوئی اور بھی یہی مسئلہ بتا چکا ہو تو بس «👋 میرا بھی یہی مسئلہ ہے» دبا دیں۔\n\n🔗 https://pbtcodelabs-pbt.github.io/help/\n\n*PBT Code Labs* — آپ کی رائے سے ہماری ایپس بہتر ہوتی ہیں\n📞 0320-6793793";
function videosHTML() {
  const E = LANG === 'en';
  return `<div class="secT">🎬 ${E ? 'Intro videos' : 'تعارفی ویڈیوز'} <small>— ${E ? 'watch, save or share' : 'دیکھیں، محفوظ کریں یا شیئر کریں'}</small></div>
  <div class="vids">${VIDEOS.map(v => `<div class="vid card">
    <button class="vth" data-act="vplay" data-id="${v.id}"><img src="${v.poster}" alt="" loading="lazy"><span class="vpl">▶</span><span class="vdur num">${v.dur}</span></button>
    <b class="vt">${esc(E ? v.en : v.ur)}</b>
    <div class="tools"><button class="tb pri" data-act="vplay" data-id="${v.id}">▶️ ${E ? 'Play' : 'چلائیں'}</button>
      <a class="tb" href="${v.file}" download="${vName(v)}">⬇️ ${E ? 'Download' : 'ڈاؤن لوڈ'}</a>
      <button class="tb grn" data-act="vshare" data-id="${v.id}">📤 ${E ? 'Share' : 'شیئر'}</button></div></div>`).join('')}</div>
  <button class="tb" style="margin:2px 0 6px" data-act="copyPost">📋 ${E ? 'Copy the post message' : 'ساتھ والا پیغام کاپی کریں'}</button>`;
}
/* HD0811SU060 (مالک کی جانچ): ویڈیو (≈8MB) پہلے لانی پڑتی ہے — اتنی دیر میں فون شیئر کی اجازت (user gesture) ختم کر دیتا اور
   «Failed to execute 'share'… Must be handling a user gesture» آتا۔ اب: فائل ایک بار لا کر یاد (VFILE)، پھر «📤 ابھی شیئر کریں» بٹن —
   اسے دبانے پر فوراً شیئر (نئی اجازت کے ساتھ)؛ دوسری بار پہلی ہی دبانے پر۔ */
const VFILE = {};
function vShareText(v) { const E = LANG === 'en'; return v.share ? v.share + '\nPBT Code Labs' : 'PBT Help Desk — ' + (E ? 'Help Desk in every app' : 'ہر ایپ میں Help Desk') + ' ❓\nhttps://pbtcodelabs-pbt.github.io/help/'; }
function vDownload(v) { const a = document.createElement('a'); a.href = v.file; a.download = vName(v); document.body.appendChild(a); a.click(); a.remove(); }
async function shareVideo(id) {
  const v = VIDEOS.find(x => x.id === id); if (!v) return;
  const E = LANG === 'en';
  const file = VFILE[id];
  if (file) {
    if (!(navigator.canShare && navigator.canShare({ files: [file] }))) { vDownload(v); toast(E ? 'Sharing not supported here — video downloaded' : 'یہاں سیدھا شیئر نہیں ہو سکتا — ویڈیو ڈاؤن لوڈ ہو گئی', 4000); return; }
    try { await navigator.share({ files: [file], text: vShareText(v) }); }
    catch (e) { if (e && e.name !== 'AbortError') { if (e.name === 'NotAllowedError') shareReady(v); else toast('⚠️ ' + (e.message || e)); } }
    return;
  }
  busy(true, E ? 'Preparing video…' : 'ویڈیو تیار ہو رہی ہے…');
  try {
    const blob = await (await fetch(v.file)).blob();
    VFILE[id] = new File([blob], vName(v), { type: 'video/mp4' });
    busy(false);
    shareReady(v);
  } catch (e) { busy(false); toast('⚠️ ' + (e && e.message || e)); }
}
function shareReady(v) {
  const E = LANG === 'en';
  sheet(`<h2>📤 ${E ? 'Video ready' : 'ویڈیو تیار ہے'}<button class="x" data-act="close">✕</button></h2>
    <p style="margin:4px 0 12px">${esc(E ? v.en : v.ur)}</p>
    <button class="tb grn" style="width:100%;font-size:19px;padding:14px" data-act="vshare" data-id="${v.id}">📤 ${E ? 'Share now (WhatsApp status…)' : 'ابھی شیئر کریں (واٹس ایپ اسٹیٹس…)'}</button>`);
}
function playVideo(id) {
  const v = VIDEOS.find(x => x.id === id); if (!v) return;
  const E = LANG === 'en';
  sheet(`<h2>🎬 ${esc(E ? v.en : v.ur)}<button class="x" data-act="close">✕</button></h2>
    <video src="${v.file}" poster="${v.poster}" controls autoplay playsinline style="width:100%;max-height:70vh;border-radius:14px;background:#000"></video>
    <div class="tools" style="justify-content:center"><a class="tb" href="${v.file}" download="${vName(v)}">⬇️ ${E ? 'Download' : 'ڈاؤن لوڈ'}</a>
      <button class="tb grn" data-act="vshare" data-id="${v.id}">📤 ${E ? 'Share (WhatsApp status…)' : 'شیئر (واٹس ایپ اسٹیٹس…)'}</button></div>`);
}
function vHome() {
  const own = Store.isOwner();
  const pub = publicList();
  // مالک کو: ہر ایپ پر جب تک حل نہ ہو نمبر (نارنجی)، نیا ان دیکھا ہو تو سرخ «نئے»
  const open = own ? ISSUES.filter(i => isOpen(i) || isHeld(i)) : pub.filter(isOpen);
  const un = unseenMine(), mine = myList().length;
  const hrs = (LANG === 'en' ? CFG.hoursEn : CFG.hoursUr) || T('hoursDef');
  const tiles = APPS.map(a => {
    const nn = own ? ISSUES.filter(i => i.app === a.id && i.status === 'new').length : 0;
    const n = open.filter(i => i.app === a.id).length - nn; // نیلا = جن پر کام چل رہا ہے (نئے الگ سرخ میں)
    return `<button class="ap" data-act="${own ? 'oapp' : 'app'}" data-id="${esc(a.id)}">${nn ? `<span class="bd2">${nn} ${LANG === 'en' ? 'new' : (nn === 1 ? 'نیا' : 'نئے')}</span>` : ''}${appIcon(a)}<span class="n ${/[a-z]/i.test(AN(a)) && LANG !== 'en' ? 'en' : ''}">${esc(AN(a))}</span>${n ? `<span class="bd">${n}</span>` : ''}</button>`;
  }).join('');
  return `
  ${own ? apprStrip() : ''}
  ${own ? `<div class="card stats" data-act="goOwner" style="cursor:pointer;grid-template-columns:repeat(4,1fr)">${countsHTML(hdCounts())}<div class="st g"><span class="v">${weekSolved(ISSUES)}</span><span class="l">✅ ${T('solvedWeek')}</span></div></div>` : `
  <div class="card stats">
    <div class="st g"><span class="v">${weekSolved(ISSUES)}</span><span class="l">✅ ${T('solvedWeek')}</span></div>
    <div class="st o"><span class="v">${open.length}</span><span class="l">🔧 ${T('pending')}</span></div>
    ${own ? `<div class="st r"><span class="v">${ISSUES.filter(i => i.status === 'new').length}</span><span class="l">📥 ${LANG === 'en' ? 'New, unseen' : 'نئے، ان دیکھے'}</span></div>`
      : `<div class="st b"><span class="v" style="font-size:19px">${avgReply()}</span><span class="l">⏱️ ${T('avgReply')}</span></div>`}
  </div>`}
  ${own ? ownMineCard() : ''}
  ${own ? partyHomeBtn() : ''}
  ${mine && !own ? `<button class="mineBtn" data-act="mine"><span class="i">📋</span><span class="t"><b>${T('mine')} <span class="num">(${mine})</span></b><small>${T('mineSub')}</small></span>${un ? `<span class="dot">${un}</span>` : ''}<span>${LANG === 'en' ? '›' : '‹'}</span></button>` : ''}
  ${own ? urgHome() : ''}
  ${own ? rankBtns() : ''}
  <div class="secT">📱 ${T('chooseApp')} <small>— ${T('chooseAppSub')}</small></div>
  <div class="apps">${tiles}</div>
  ${videosHTML()}
  <div class="card" style="margin-top:16px">
    <div class="info"><span class="i">🕘</span><div><b>${T('hours')}:</b> ${esc(hrs)}</div></div>
    <div class="info" style="margin-top:6px"><span class="i">🛡️</span><div>${T('whyHere')}</div></div>
  </div>
  ${foot()}`;
}

/* HD0211MO020 — گاہک کی پیش رفت پٹی (مالک کا حکم): سادہ الفاظ، کوئی تکنیکی نام نہیں — «ہماری ٹیم / ہمارے انجینئر» */
const CSTEPS = [
  ['new', 10, '📥', 'آپ کی بات ہم تک پہنچ گئی', 'We received it'],
  ['seen', 25, '👀', 'ہماری ٹیم نے دیکھ لیا', 'Our team has seen it'],
  ['work', 45, '🛠️', 'ہمارے انجینئر کام کر رہے ہیں', 'Our engineers are working on it'],
  ['test', 70, '🔍', 'درستگی کی جانچ ہو رہی ہے', 'Checking that it works right'],
  ['push', 85, '📦', 'ایپ میں لگایا جا رہا ہے', 'Adding it to the app'],
  ['live', 95, '🚀', 'نئی اپڈیٹ جاری ہو گئی', 'New update released'],
  ['done', 100, '✅', 'حل ہو گیا — ایپ ایک بار تازہ کر کے دیکھیں', 'Solved — refresh the app once to see it']
];
function custStep(i) {
  if (i.status === 'done') return 'done';
  const st = i.stage;
  if (['test', 'push', 'live'].includes(st)) return st;
  if (i.status === 'work' || ['seen', 'claude', 'work'].includes(st)) return 'work';
  return i.status === 'seen' ? 'seen' : 'new';
}
function custProgress(i) {
  const E = LANG === 'en', st = custStep(i), k = CSTEPS.findIndex(x => x[0] === st), cur = CSTEPS[k], done = st === 'done';
  const think = !done && i.hold === 'decide' && st !== 'work';
  const head = think ? ['💭', E ? 'We are considering your suggestion' : 'آپ کے مشورے پر غور ہو رہا ہے'] : [cur[2], E ? cur[4] : cur[3]];
  return `<div class="cProg ${done ? 'fin' : ''}">
    <div class="cpHead"><b>${head[0]} ${head[1]}</b><span class="num">${cur[1]}%</span></div>
    <div class="cpBar"><i style="width:${cur[1]}%"></i></div>
    <div class="cpDots">${CSTEPS.map((x, j) => `<span class="${j < k || done ? 'stOk' : j === k ? 'now' : ''}" title="${E ? x[4] : x[3]}">${j < k || done ? '✓' : x[2]}</span>`).join('')}</div>
    ${!done && k + 1 < CSTEPS.length ? `<div class="cpNext">${E ? 'Next' : 'اگلا مرحلہ'}: ${CSTEPS[k + 1][2]} ${E ? CSTEPS[k + 1][4] : CSTEPS[k + 1][3]}</div>` : ''}</div>`;
}

/* ---------- ایپ کا صفحہ ---------- */
let appTab = 'open', appQ = '';
function issueCard(i, opts) {
  opts = opts || {};
  const mineIt = i.dev === DEV;
  const on = (i.metoo || []).includes(DEV);
  const n = (i.metoo || []).length;
  const txt = opts.full ? i.text : ptext(i);
  const isNew = opts.mine && (ls.get('seen', {})[i.id] || sig(i)) !== sig(i);
  const steps = opts.mine && i.status !== 'dup' ? custProgress(i) : '';
  const app = appOf(i.app);
  return `<div class="is s-${i.status}">
    ${isNew ? `<span class="newDot">${LANG === 'en' ? 'New' : 'نیا'}</span>` : ''}
    <div class="top">${opts.showApp ? `${appIcon(app, 'appMini')} <b style="font-size:14px">${esc(AN(app))}</b>` : ''}${tyChip(i.type)}${stChip(i.status)}${mineIt && !opts.mine ? `<span class="chip mine">⭐ ${T('yours')}</span>` : ''}<span class="no">#${i.no}</span></div>
    <div class="tx clamp" dir="auto" data-act="expand">${esc(txt)}</div>
    ${steps}
    ${opts.mine && (i.status === 'new' || i.status === 'seen') ? (i.urgent && Store.isOwner() ? `<div class="rev" style="background:#fff7ed;color:#c2410c">⚡ ${LANG === 'en' ? 'Priority — being handled first' : 'فوری — سب سے پہلے دیکھا جا رہا ہے'}</div>` : revLine()) : ''}
    ${i.reply ? `<div class="reply" dir="auto"><span class="rh">${T('pbtReply')}</span>${esc(i.reply)}</div>` : ''}
    ${i.status === 'dup' && i.dupOf ? `<div class="dupNote">🔗 ${T('dupOf')} <b class="num">#${i.dupOf}</b></div>` : ''}
    <div class="ft"><span class="when">🕒 ${ago(i.created)}</span>
      ${opts.ownDel ? `<button class="tb red" style="font-size:12.5px;padding:0 10px" data-act="ownDel" data-id="${i.id}">🗑️ ${LANG === 'en' ? 'Delete' : 'حذف'}</button>` : ''}
      ${opts.mine && !opts.ownDel && i.status === 'new' ? `<button class="tb red" style="font-size:12.5px;padding:0 10px" data-act="withdraw" data-id="${i.id}">${T('delMine')}</button>` : ''}
      ${mineIt ? (n ? `<span class="mt">👋 <b>${n + 1}</b> ${T('people')}</span>` : '') :
      `<button class="mt ${on ? 'on' : ''}" data-act="metoo" data-id="${i.id}">👋 ${T(i.type === 'idea' ? 'metooIdea' : 'metoo')} <b>${n + 1}</b></button>`}
    </div></div>`;
}
function vApp() {
  const a = appOf(R.a);
  const pub = publicList().filter(i => i.app === a.id);
  const mine = myList().filter(i => i.app === a.id && !i.pub);
  const open = pub.filter(isOpen), done = pub.filter(i => i.status === 'done');
  const q = appQ.trim().toLowerCase();
  let list = (appTab === 'open' ? [...mine.filter(isOpen), ...open] : done);
  if (q) list = list.filter(i => (ptext(i) + ' ' + (i.reply || '') + ' #' + i.no).toLowerCase().includes(q));
  list.sort(appTab === 'open' ? (x, y) => ((y.metoo || []).length - (x.metoo || []).length) || (y.created - x.created) : (x, y) => y.doneAt - x.doneAt);
  const side = `<div class="card"><div class="appHead">${appIcon(a)}<div><b>${esc(AN(a))}</b>
      <small>🔧 ${open.length} ${T('pending')} · ✅ ${weekSolved(pub)} ${T('solvedWeek')}</small></div></div>
      ${weekSolved(pub) ? `<div class="goodBar">✅ ${T('solvedWeek')}: ${weekSolved(pub)}</div>` : ''}</div>
    <button class="bigBtn" data-act="new" data-id="${esc(a.id)}">➕ ${T('tellBtn')}</button>
    <div class="tip">${T('dupTip')}</div>`;
  const cards = list.length ? list.map(i => issueCard(i)).join('') :
    `<div class="empty"><span class="e">${appTab === 'open' ? '🌿' : '🗂️'}</span>${appTab === 'open' ? T('noOpen') : T('noDone')}</div>`;
  return `<div class="two"><div class="side">${side}</div><div class="mainCol">
    <div class="seg"><button class="${appTab === 'open' ? 'on' : ''}" data-act="atab" data-id="open">🔧 ${T('tabOpen')}<i>${open.length + mine.filter(isOpen).length}</i></button>
      <button class="${appTab === 'done' ? 'on' : ''}" data-act="atab" data-id="done">✅ ${T('tabDone')}<i>${done.length}</i></button></div>
    ${(open.length + done.length) > 4 ? `<label class="search">🔍<input id="appQ" value="${esc(appQ)}" placeholder="${T('search')}"></label>` : ''}
    <div id="aList">${cards}</div></div></div>${foot()}`;
}

/* ---------- میرے مسائل / ایک مسئلہ ---------- */
/* HD0311TU026 (مالک کا حکم): مالک کے ہوم پر «پی بی ٹی کوڈ لیبز کے تجویز کردہ مسائل» ہمیشہ — دو بٹن، فہرست صرف دبانے پر */
const ownList = () => ISSUES.filter(i => isOwnIssue(i) && i.status !== 'dup');
function ownMineCard() {
  const L = ownList(), E = LANG === 'en';
  const wk = L.filter(i => i.status !== 'done').length, dn = L.filter(i => i.status === 'done').length;
  return `<div class="card ownMine"><div class="omH"><span class="i">📋</span><b>${E ? 'Requests suggested by PBT Code Labs' : 'پی بی ٹی کوڈ لیبز کے تجویز کردہ مسائل'}</b></div>
    <div class="omB"><button class="omW" data-act="ownMine" data-id="work">🔧 ${E ? 'In progress' : 'کام جاری'} <span class="num">${wk}</span></button>
    <button class="omD" data-act="ownMine" data-id="done">✅ ${E ? 'Solved' : 'حل شدہ'} <span class="num">${dn}</span></button></div></div>`;
}

/* HD0911MO062 (مالک کا فرمان): «👥 پارٹیاں» — ہر مسئلہ بھیجنے والی پارٹی (نام + موبائل) کے آج تک کے سب مسائل ایک جگہ؛
   ہر ڈبے پر ایپ کا آئیکن اور ترچھی رنگین پٹی: ✅ حل · جواب جا چکا / 🔧 کام جاری / ⏳ زیر التوا / ❓ تفصیل کا انتظار / ⏸️ کام روکا گیا */
const partyKey = i => { const d = digits(i.phone || '').replace(/\D/g, ''); return d.length >= 10 ? 'p' + d.slice(-10) : 'n' + (i.name || '').trim().toLowerCase(); };
function partyList() {
  const M = new Map();
  ISSUES.filter(i => !isOwnIssue(i) && ((i.phone || '').trim() || (i.name || '').trim())).forEach(i => {
    const k = partyKey(i); let g = M.get(k);
    if (!g) M.set(k, g = { k, name: '', phone: '', L: [], last: 0 });
    g.L.push(i);
    if ((i.created || 0) >= g.last) { g.last = i.created || 0; if ((i.name || '').trim()) g.name = i.name.trim(); if ((i.phone || '').trim()) g.phone = i.phone.trim(); }
    if (!g.name && i.name) g.name = i.name.trim(); if (!g.phone && i.phone) g.phone = i.phone.trim();
  });
  return [...M.values()].sort((a, b) => b.last - a.last);
}
function partyState(i) {
  const E = LANG === 'en';
  if (i.status === 'done' || i.stage === 'done') return ['done', E ? '✅ SOLVED · REPLY SENT' : '✅ حل ہو گیا · جواب جا چکا', 100];
  if (i.status === 'dup') return ['dup', E ? '🔗 DUPLICATE' : '🔗 پہلے سے درج', 100];
  if (i.hold === 'info') return ['info', E ? '❓ WAITING FOR DETAILS' : '❓ گاہک سے تفصیل کا انتظار', 25];
  if (i.hold === 'later' || i.hold === 'draft') return ['stop', E ? '⏸️ WORK STOPPED' : '⏸️ کام روک دیا گیا', 15];
  const pct = (STAGES.find(x => x[0] === urgStage(i)) || [0, 10])[1];
  if (i.status === 'work' || ['work', 'test', 'push', 'live'].includes(i.stage)) return ['work', E ? '🔧 WORK IN PROGRESS' : '🔧 کام جاری ہے', Math.max(pct, 50)];
  if (i.hold === 'decide' || i.hold === 'approve') return ['pend', E ? '⏳ PENDING — APPROVAL' : '⏳ زیر التوا — منظوری', Math.max(pct, 20)];
  return ['pend', E ? '⏳ PENDING' : '⏳ زیر التوا (پینڈنگ)', i.status === 'seen' ? Math.max(pct, 30) : pct];
}
function partyCard(i) {
  const E = LANG === 'en', [c, lbl, pct] = partyState(i), app = appOf(i.app);
  const rc = retryCorner(i);
  return `<div class="pIs ps-${c}${rc ? ' hasRs' : ''}" data-act="open" data-id="${i.id}">${rc}
    <div class="pRib"><span>${lbl}</span></div>
    <div class="pTop">${appIcon(app, 'appMini')} <b>${esc(AN(app))}</b> <span class="num">#${i.no}</span> ${tyChip(i.type)}</div>
    ${c === 'done' ? `<div class="pTick">✓</div>` : ''}
    <div class="tx clamp" dir="auto">${esc(i.text || '🎤')}</div>
    <div class="pBar"><i style="width:${pct}%"></i><span class="num">${pct}%</span></div>
    ${i.reply ? `<div class="reply" dir="auto"><span class="rh">${T('pbtReply')}</span>${esc(i.reply)}</div>` : ''}
    <div class="pWhen">🕒 <span class="num">${fullDate(i.created)}</span>${i.doneAt ? ` · ✅ <span class="num">${fullDate(i.doneAt)}</span>` : ''}</div></div>`;
}
const partyCnt = L => { const d = L.filter(i => i.status === 'done' || i.stage === 'done').length, u = L.filter(i => i.status === 'dup').length; return { d, o: L.length - d - u, n: L.length }; };
function partyContact(g) {
  const E = LANG === 'en'; if (!g.phone) return '';
  return `<a class="pC call" href="tel:${esc(g.phone)}" onclick="event.stopPropagation()">📞 ${E ? 'Call' : 'کال'}</a><a class="pC wa" href="https://wa.me/${waNum(digits(g.phone).replace(/\D/g, ''))}" target="_blank" rel="noopener" onclick="event.stopPropagation()">💬 WhatsApp</a>`;
}
function partyHomeBtn() {
  const n = partyList().length, E = LANG === 'en';
  return `<button class="partyBtn" data-act="parties"><span class="i">👥</span><span class="t"><b>${E ? 'Parties — every customer’s issues in one place' : 'پارٹیاں — ہر گاہک کے سب مسائل ایک جگہ'}</b><small>${E ? 'Name, mobile, call / WhatsApp, solved / pending' : 'نام، موبائل، کال / واٹس ایپ — حل شدہ اور باقی'}</small></span><span class="num c">${n}</span></button>`;
}
function vParty() {
  const E = LANG === 'en';
  if (!Store.isOwner()) { setTimeout(loginSheet, 50); return `<div class="card empty"><span class="e">🔒</span>Developer</div>`; }
  const all = partyList();
  if (R.a) {
    const g = all.find(x => x.k === R.a);
    if (!g) return `<div class="card empty"><span class="e">🔎</span>${T('notFound')}</div>` + foot();
    const c = partyCnt(g.L), L = g.L.slice().sort((a, b) => b.created - a.created);
    const apps = [...new Set(L.map(i => i.app))].map(a => appIcon(appOf(a), 'appMini')).join('');
    return `<div class="card pHead"><div class="pN">👤 <b dir="auto">${esc(g.name || (E ? 'No name' : 'بغیر نام'))}</b></div>
      ${g.phone ? `<div class="pPh num">📱 ${esc(g.phone)}</div>` : ''}
      <div class="pApps">${apps}</div>
      <div class="pCnt"><span>📋 ${E ? 'Total' : 'کل'} <b class="num">${c.n}</b></span><span class="g">✅ ${E ? 'Solved' : 'حل'} <b class="num">${c.d}</b></span><span class="o">🔧 ${E ? 'Remaining' : 'باقی'} <b class="num">${c.o}</b></span></div>
      <div class="pCs">${partyContact(g)}</div></div>` + L.map(partyCard).join('') + foot();
  }
  return `<div class="secT top">👥 ${E ? 'Parties' : 'پارٹیاں'} <span class="num">(${all.length})</span> <small>— ${E ? 'tap a name to see all their issues' : 'نام دبائیں — اس کے آج تک کے سب مسائل'}</small></div>
    <label class="search">🔍<input id="partyQ" placeholder="${E ? 'Name or mobile…' : 'نام یا موبائل…'}" oninput="var q=this.value.trim().toLowerCase();document.querySelectorAll('.pRow').forEach(function(r){r.style.display=r.dataset.s.indexOf(q)>-1?'':'none'})"></label>
    ${all.map(g => { const c = partyCnt(g.L), apps = [...new Set(g.L.map(i => i.app))].slice(0, 5).map(a => appIcon(appOf(a), 'appMini')).join('');
      return `<div class="pRow" data-act="party" data-id="${esc(g.k)}" data-s="${esc(((g.name || '') + ' ' + (g.phone || '') + ' ' + digits(g.phone || '')).toLowerCase())}">
        <div class="pL"><b dir="auto">${esc(g.name || (E ? 'No name' : 'بغیر نام'))}</b>${g.phone ? `<span class="num">${esc(g.phone)}</span>` : ''}<span class="pApps">${apps}</span></div>
        <div class="pR"><span class="pk g">✅ <b class="num">${c.d}</b></span><span class="pk o">🔧 <b class="num">${c.o}</b></span><div class="pCs">${partyContact(g)}</div></div></div>`; }).join('') || `<div class="card empty"><span class="e">📭</span></div>`}` + foot();
}
function vMine() {
  if (Store.isOwner() && (R.a === 'work' || R.a === 'done')) {
    const E = LANG === 'en', done = R.a === 'done';
    const l = ownList().filter(i => done ? i.status === 'done' : i.status !== 'done').sort((a, b) => (b.doneAt || b.upd || 0) - (a.doneAt || a.upd || 0));
    return `<div class="secT top">${done ? '✅ ' + (E ? 'Solved' : 'حل شدہ') : '🔧 ' + (E ? 'In progress' : 'کام جاری')} — ${E ? 'PBT Code Labs requests' : 'پی بی ٹی کوڈ لیبز کے تجویز کردہ مسائل'} <span class="num">(${l.length})</span></div>` +
      (l.length ? l.map(i => issueCard(i, { mine: true, showApp: true, full: true, ownDel: true })).join('') : `<div class="card empty"><span class="e">📭</span>${E ? 'Nothing here' : 'یہاں کچھ نہیں'}</div>`) + foot();
  }
  const l = myList();
  setTimeout(markMineSeen, 2500);
  return `<div class="secT top">📋 ${T('mine')}</div>` +
    (l.length ? l.map(i => issueCard(i, { mine: true, showApp: true, full: true })).join('') : `<div class="card empty"><span class="e">📭</span>${T('noMine')}</div>`) + foot();
}
function vOne() {
  const i = ISSUES.find(x => x.id === R.a);
  if (!i) return `<div class="card empty"><span class="e">🔎</span>${T('notFound')}</div>` + foot();
  return `<div class="secT top">🧾 ${T('viewOne')} <span class="num">#${i.no}</span></div>` +
    issueCard(i, { mine: true, showApp: true, full: i.dev === DEV }) +
    `<button class="bigBtn blue" data-act="app" data-id="${esc(i.app)}">${appIcon(appOf(i.app), 'appMini')} ${esc(AN(appOf(i.app)))}</button>` + foot();
}

/* ---------- فارم ---------- */
let F = null;
function newForm(app) {
  const me = ls.get('me', {});
  const P = new URLSearchParams(location.search);
  F = { acct: P.get('type') === 'acct' || isAcctReq(P.get('text')), app, type: ['bug', 'idea', 'ask'].includes(P.get('type')) ? P.get('type') : (P.get('type') === 'acct' ? 'ask' : 'bug'), text: P.get('text') || '', shots: [], audio: null, audioMs: 0, name: me.name || P.get('name') || '', phone: me.phone || normPhone(P.get('phone') || ''), ver: P.get('v') || '', remember: true };
}
/* HD0411WE039 (مالک کا حکم): ایپ سے آئی «اکاؤنٹ کی تفصیل» — عام فارم نہیں؛ صرف پیغام اور خود بھیجنا */
function vAcct() {
  const a = appOf(F.app), E = LANG === 'en';
  return `<div class="card acctCard">${appIcon(a, 'appMini')} <b>${/Ad request/.test(F.text) ? (E ? 'Ad request' : '📢 اشتہار کی درخواست') : (E ? 'Account details for the developer' : 'ڈویلپر کے لیے اکاؤنٹ کی تفصیل')}</b>
    <pre class="acctPre" dir="ltr">${esc(F.text)}</pre>
    <div class="acctSt" id="acctSt">⏳ ${E ? 'Sending to the developer…' : 'ڈویلپر کو بھیجا جا رہا ہے…'}</div>
    <button class="bigBtn" id="acctRetry" style="display:none" data-act="acctSend">📨 ${E ? 'Send again' : 'دوبارہ بھیجیں'}</button>
    <button class="bigBtn blue" id="acctDone" style="display:none" data-act="embedClose">✅ ${E ? 'Close' : 'بند کریں'}</button></div>`;
}
async function acctSend() {
  if (!F || F._sending) return; F._sending = true;
  const E = LANG === 'en', st = $('#acctSt'), t = F.text.trim();
  const pick = re => { const m = t.match(re); return m ? m[1].trim() : ''; };
  const name = pick(/^\s*Name\s*:\s*(.+)$/im) || F.name || '-', P = normPhone(pick(/^\s*Mobile(?:\s*no\.?)?\s*:\s*(.+)$/im) || F.phone || '');
  const sig = 'acct_' + t.length + '_' + t.slice(-40), prev = ls.get(sig, 0);
  if (prev && Date.now() - prev < 10 * 60e3) { st.innerHTML = '✅ ' + (E ? 'Already sent — the developer will set up your account. Your app opens by itself.' : 'پہلے ہی بھیج دیا گیا ہے — ڈویلپر اکاؤنٹ بنا دیں گے، ایپ خود کھل جائے گی۔'); $('#acctDone').style.display = ''; F._sending = false; return; }
  try {
    const r = await Store.add({ app: F.app, type: 'ask', text: t, name, phone: P, ver: F.ver.trim(), dev: DEV, shots: 0, audio: false, lang: LANG, hold: '' }, []);
    rememberMine(r.id, 'new|0'); ls.set(sig, Date.now());
    st.innerHTML = '✅ ' + (E ? `Sent to the developer (#${r.no}). ${/Ad request/.test(t) ? 'Our team will prepare your ad and contact you.' : F.app === 'AIO-POS-DIRECT' ? 'The developer will reply with your code.' : F.app === 'MCS' ? 'When the developer continues it, your profile turns on by itself.' : 'When your account is set up, your app opens by itself.'}` : `ڈویلپر کو بھیج دیا گیا (#${r.no})۔ ${/Ad request/.test(t) ? 'ہماری ٹیم اشتہار تیار کر کے آپ سے رابطہ کرے گی۔' : F.app === 'AIO-POS-DIRECT' ? 'ڈویلپر آپ کو کوڈ بھیجیں گے۔' : F.app === 'MCS' ? 'ڈویلپر کے جاری کرتے ہی آپ کی پروفائل خود چالو ہو جائے گی۔' : 'اکاؤنٹ بنتے ہی آپ کی ایپ خود کھل جائے گی۔'}`);
    $('#acctDone').style.display = ''; $('#acctRetry').style.display = 'none';
  } catch (e) { st.innerHTML = '⚠️ ' + esc(e.message || e); $('#acctRetry').style.display = ''; }
  F._sending = false;
}
function vForm() {
  if (!F || F.app !== appOf(R.a).id) newForm(appOf(R.a).id);
  if (F.acct) return vAcct();
  const a = appOf(F.app);
  const sr = !!(window.SpeechRecognition || window.webkitSpeechRecognition);
  const opts = APPS.map(x => `<option value="${esc(x.id)}" ${x.id === F.app ? 'selected' : ''}>${esc(AN(x))}</option>`).join('');
  return `<div class="formWrap">
  <div class="card" style="display:flex;align-items:center;gap:12px;padding:10px 14px">${appIcon(a, 'appMini')}
    <b style="flex:1">${T('newTitle')}</b>
    <select class="inp" style="width:auto;max-width:55%;padding:2px 8px;font-size:14px" data-in="app" aria-label="${T('appL')}">${opts}</select></div>

  <div class="fs"><div class="fh"><span class="n">1</span>${T('q1')}</div>
    <div class="types">${['bug', 'idea', 'ask'].map(t => `<button type="button" class="ty ${F.type === t ? 'on' : ''}" data-act="type" data-id="${t}"><span class="e">${TYPES[t]}</span><b>${T(t)}</b><small>${DICT[t][LANG === 'en' ? 0 : 1]}</small></button>`).join('')}</div></div>

  <div class="fs"><div class="fh"><span class="n">2</span>${T('q2')} <b class="req">*</b> <small>— ${T('q2s')}</small></div>
    <textarea class="big" id="fText" dir="auto" data-in="text" placeholder="${T('ph')}">${esc(F.text)}</textarea>
    <div class="tools"><button type="button" class="tb" data-act="pasteText">📋 ${T('paste')}</button>
      ${sr ? `<button type="button" class="tb" id="spkBtn" data-act="speak">🎙️ ${T('speak')}</button><select class="tb" id="spkLang" aria-label="language">${SPK_LANGS.map(([c, l, e]) => `<option value="${c}" ${c === spkLang() ? 'selected' : ''}>${l === e ? l : l + ' — ' + e}</option>`).join('')}</select>` : ''}
      <button type="button" class="tb" data-act="pvText">👁️ ${T('pv')}</button>
      <span class="cnt" id="cnt">${F.text.length}</span></div>
    <!-- HD0411WE036 (مالک کا حکم): آواز اور اسکرین شاٹ اسی ڈبے کے نیچے ایک قطار میں — پہلے بھی لگ سکیں، روک صرف بھیجتے وقت -->
    <div class="tools addRow" id="drop"><span class="arL">${T('addL')}</span>
      <span id="recBox" class="recMini">${recHTML()}</span>
      <button type="button" class="tb" data-act="gallery">🖼️ ${T('gallery')}</button>
      <button type="button" class="tb" data-act="camera">📷</button>
      <button type="button" class="tb" data-act="pasteImg">📋 ${T('pasteImg')}</button>
      <input type="file" id="fileIn" accept="image/*" multiple hidden><input type="file" id="camIn" accept="image/*" capture="environment" hidden></div>
    <div class="shots" id="shots">${shotsHTML()}</div>
    <div class="err" id="eText">${T('errText')}</div></div>

  <div class="fs"><div class="fh"><span class="n">3</span>${T('q5')} <small>— 🔒 ${T('q5s')}</small></div>
    <label class="lbl">${T('name')}</label><input class="inp" dir="auto" data-in="name" value="${esc(F.name)}" autocomplete="name">
    <div class="err" id="eName">${T('errName')}</div>
    <label class="lbl">${T('phone')}</label>
    <div class="inpRow"><input class="inp" type="tel" inputmode="tel" data-in="phone" value="${esc(F.phone)}" placeholder="03001234567" autocomplete="tel">
      <button type="button" class="tb" data-act="pastePhone">📋 ${T('paste')}</button></div>
    <div class="err" id="ePhone">${T('errPhone')}</div>
    <label class="okRow"><input type="checkbox" data-in="remember" ${F.remember ? 'checked' : ''}>${T('remember')}</label>
    <details class="more" ${F.ver ? 'open' : ''}><summary>➕ ${T('more')}</summary>
      <label class="lbl">${T('verL')}</label><input class="inp ltr" data-in="ver" value="${esc(F.ver)}" placeholder="AIODR0111SU111"></details></div>

  <div class="sendBar"><button class="bigBtn green" data-act="send">📨 ${T('send')}</button></div></div>`;
}
const shotsHTML = () => F.shots.map((s, k) => `<div class="shot"><img src="${s}" data-view="${k}" alt=""><b data-act="rmShot" data-id="${k}">✕</b></div>`).join('');
function recHTML() {
  if (REC.on) return `<button type="button" class="tb mic2 on" data-act="rec">⏹ <b id="recT">0:00</b></button>`;
  if (F.audio) return `<button type="button" class="tb mic2" data-act="rec" title="again">🎤 ✅ ${fmtMs(F.audioMs)}</button><button type="button" class="tb red" data-act="rmAudio">🗑️</button><audio controls src="${F.audio}"></audio>`;
  return `<button type="button" class="tb mic2" data-act="rec">🎤 ${T('voice')}</button>`;
}
const fmtMs = ms => Math.floor(ms / 60000) + ':' + String(Math.floor(ms / 1000) % 60).padStart(2, '0');

/* تصویر چھوٹی کر کے (1MB سے بہت نیچے) */
function loadImg(src) { return new Promise((res, rej) => { const im = new Image(); im.onload = () => res(im); im.onerror = rej; im.src = src; }); }
async function shrink(blob) {
  const url = URL.createObjectURL(blob);
  try {
    const im = await loadImg(url);
    let out = '';
    for (const [max, q] of [[1400, .72], [1100, .6], [900, .5]]) {
      const k = Math.min(1, max / Math.max(im.naturalWidth, im.naturalHeight));
      const c = document.createElement('canvas'); c.width = Math.round(im.naturalWidth * k); c.height = Math.round(im.naturalHeight * k);
      const x = c.getContext('2d'); x.fillStyle = '#fff'; x.fillRect(0, 0, c.width, c.height); x.drawImage(im, 0, 0, c.width, c.height);
      out = c.toDataURL('image/jpeg', q);
      if (out.length < 380000) break;
    }
    return out;
  } finally { URL.revokeObjectURL(url); }
}
const MAX_SHOTS = 10; /* HD0411WE037 (مالک کا حکم): 4 کی جگہ 10 */
async function addShots(files) {
  for (const f of files) {
    if (!/^image\//.test(f.type)) continue;
    if (F.shots.length >= MAX_SHOTS) { toast(T('maxShots')); break; }
    try { F.shots.push(await shrink(f)); } catch (e) {}
  }
  const s = $('#shots'); if (s) s.innerHTML = shotsHTML();
}

/* آواز */
const REC = { on: false, mr: null, t0: 0, tm: 0, chunks: [] };
async function toggleRec() {
  if (REC.on) { REC.mr.stop(); return; }
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mime = ['audio/webm;codecs=opus', 'audio/ogg;codecs=opus', 'audio/mp4'].find(m => window.MediaRecorder && MediaRecorder.isTypeSupported(m)) || '';
    const mr = new MediaRecorder(stream, Object.assign({ audioBitsPerSecond: 24000 }, mime ? { mimeType: mime } : {}));
    REC.chunks = []; REC.mr = mr; REC.on = true; REC.t0 = Date.now();
    mr.ondataavailable = e => e.data.size && REC.chunks.push(e.data);
    mr.onstop = () => {
      stream.getTracks().forEach(t => t.stop()); clearInterval(REC.tm); REC.on = false;
      F.audioMs = Date.now() - REC.t0;
      const b = new Blob(REC.chunks, { type: mr.mimeType || 'audio/webm' });
      const fr = new FileReader(); fr.onload = () => { F.audio = fr.result; $('#recBox') && ($('#recBox').innerHTML = recHTML()); }; fr.readAsDataURL(b);
    };
    mr.start(1000);
    $('#recBox').innerHTML = recHTML();
    REC.tm = setInterval(() => {
      const ms = Date.now() - REC.t0; const el = $('#recT'); if (el) el.textContent = fmtMs(ms);
      if (ms > 120000) mr.stop();
    }, 300);
  } catch (e) { toast(T('micErr')); }
}
/* بول کر لکھیں — کوئی بھی زبان */
/* HD0411WE037 (#62): ہر زبان کا اردو نام + انگریزی نام */
const SPK_LANGS = [['ur-PK', 'اردو', 'Urdu'], ['en-US', 'انگلش', 'English'], ['pa-Guru-IN', 'پنجابی', 'Punjabi'], ['hi-IN', 'ہندی', 'Hindi'], ['ar-SA', 'عربی', 'Arabic'], ['fa-IR', 'فارسی', 'Persian'], ['ps-AF', 'پشتو', 'Pashto'], ['sd-IN', 'سندھی', 'Sindhi'], ['bn-BD', 'بنگالی', 'Bengali'], ['tr-TR', 'ترکی', 'Turkish'], ['zh-CN', 'چینی', 'Chinese'], ['fr-FR', 'فرانسیسی', 'French'], ['es-ES', 'ہسپانوی', 'Spanish'], ['de-DE', 'جرمن', 'German']];
const spkLang = () => ls.get('spk', LANG === 'en' ? 'en-US' : 'ur-PK');
let SR = null;
/* HD0411WE037 (#62): لکھنے کا خانہ لکھائی کے ساتھ بڑا ہو — آخری لائن ہمیشہ نظر آئے */
function fitText(ta) { if (!ta) return; ta.style.height = 'auto'; ta.style.height = Math.min(ta.scrollHeight + 4, Math.round(innerHeight * 0.6)) + 'px'; ta.scrollTop = ta.scrollHeight; }
function pvTextSheet() {
  const t = (F && F.text || '').trim();
  sheet(`<h2>👁️ ${T('pvT')}<button class="x" data-act="close">✕</button></h2>
    <div class="pvTxt" dir="auto">${t ? esc(t).replace(/\n/g, '<br>') : `<i>${T('pvE')}</i>`}</div>
    <button type="button" class="btn pvEd" data-act="pvEdit">${T('pvEdit')}</button>`);
}
function toggleSpeak() {
  const btn = $('#spkBtn');
  if (SR) { SR.stop(); return; }
  const C = window.SpeechRecognition || window.webkitSpeechRecognition;
  SR = new C(); SR.lang = ($('#spkLang') && $('#spkLang').value) || spkLang(); ls.set('spk', SR.lang); SR.continuous = true; SR.interimResults = false;
  SR.onresult = e => {
    for (let k = e.resultIndex; k < e.results.length; k++) if (e.results[k].isFinal) {
      F.text = (F.text ? F.text.replace(/\s*$/, ' ') : '') + e.results[k][0].transcript.trim();
      const ta = $('#fText'); if (ta) { ta.value = F.text; fitText(ta); } $('#cnt') && ($('#cnt').textContent = F.text.length);
    }
  };
  SR.onend = () => { SR = null; if (btn) { btn.classList.remove('rec'); btn.innerHTML = '🎙️ ' + T('speak'); } };
  SR.onerror = () => toast(T('micErr'));
  SR.start();
  if (btn) { btn.classList.add('rec'); btn.innerHTML = '⏹ ' + T('stopSpeak'); }
}
async function clipText() {
  try { return await navigator.clipboard.readText(); } catch (e) { toast(T('noClip'), 3500); return null; }
}
async function clipImages() {
  try {
    const items = await navigator.clipboard.read(); const out = [];
    for (const it of items) for (const ty of it.types) if (ty.startsWith('image/')) out.push(await it.getType(ty));
    if (!out.length) toast(T('noClipImg'), 3500);
    return out;
  } catch (e) { toast(T('noClipImg'), 3500); return []; }
}
async function send() {
  const P = normPhone(F.phone);
  const eT = F.text.trim().length < 3, eN = !F.name.trim(), eP = !phoneOk(P);
  $('#eText').classList.toggle('on', eT); $('#eName').classList.toggle('on', eN); $('#ePhone').classList.toggle('on', eP);
  if (eT) { needText(); return; }
  const bad = document.querySelector('.err.on'); if (bad) { bad.scrollIntoView({ behavior: 'smooth', block: 'center' }); return; }
  if (F.remember) ls.set('me', { name: F.name.trim(), phone: P }); else ls.set('me', {});
  busy(true, T('sending'));
  try {
    const blobs = F.shots.map(d => ({ kind: 'shot', data: d }));
    if (F.audio) blobs.push({ kind: 'audio', data: F.audio });
    const r = await Store.add({ app: F.app, type: F.type, text: F.text.trim(), name: F.name.trim(), phone: P, ver: F.ver.trim(), dev: DEV, shots: F.shots.length, audio: !!F.audio, lang: LANG, hold: F.type === 'idea' && !Store.isOwner() ? 'decide' : '' }, blobs);
    rememberMine(r.id, 'new|0');
    // HD0511TH046 (مالک کا حکم): مالک / ڈویلپر کا اپنا مسئلہ خود قطار میں — کوئی ⚡ بٹن یا کاپی پیسٹ نہیں، پیش رفت فوراً
    // HD0511TH051 (مالک کا حکم): اب خود فوری نہیں — شکریہ صفحے پر تین بٹن: ⚡ فوری / 📝 ڈرافٹ / ⏭️ اگلا جائزہ
    const app = F.app; F = null;
    go('#/thanks/' + r.no + '/' + encodeURIComponent(app));
  } catch (e) { toast('⚠️ ' + (e.message || e), 4000); }
  finally { busy(false); }
}
function vThanks() {
  const parts = location.hash.split('/');
  const app = decodeURIComponent(parts[3] || '');
  return `<div class="card thanks"><div class="ok">✓</div><h2>${T('thanks')}</h2>
    <div style="color:var(--mut);font-size:14px">${T('ticketL')}</div><div class="ticket">#${esc(R.a)}</div>
    ${revLine()}
    ${Store.isOwner() ? (() => { const i = ISSUES.find(x => String(x.no) === String(R.a)); return i ? urgSwitch(i) : ''; })() : ''}
    <p>${T('thanksP')}</p>
    <button class="bigBtn blue" data-act="mine">📋 ${T('mine')}</button>
    <button class="bigBtn" style="background:#fff;color:var(--ink);box-shadow:var(--sh)" data-act="app" data-id="${esc(app)}">${appIcon(appOf(app), 'appMini')} ${esc(AN(appOf(app)))}</button>
  </div>${foot()}`;
}

/* ================= ڈویلپر پینل ================= */
let O = { tab: 'new', app: '', q: '', sort: 'old' }; // HD0811SA052 (مالک کا حکم): سب سے پرانا مسئلہ سب سے اوپر
/* 📊 HD0811SA052 (مالک کا حکم): ڈویلپر پینل — دو Claude اکاؤنٹس کی ہفتہ وار حد + کو ڈویلپر — push/panel (صرف مالک) */
let PANEL = null, PANEL_LOADING = false;
const SKIP = new Set(); // «⏭️ بعد میں» — صرف اسی وقت تک؛ صفحہ تازہ کریں تو پھر اپنی ترتیب پر
const LIM_ACC = [['pbt', 'pbtcodelabs@gmail.com', 'PBT Code Labs (Pro)'], ['piary', 'piarybhai@gmail.com', 'پیارے بھائی']];
async function loadPanel(force) {
  if (PANEL_LOADING || (PANEL && !force)) return; PANEL_LOADING = true;
  try { PANEL = (await Store.panelGet()) || {}; } catch (e) { PANEL = PANEL || {}; }
  PANEL_LOADING = false; if (R.v === 'owner') render();
}
async function phHash(ph) { const d = waNum(digits(ph || '').replace(/[^0-9]/g, '')); if (!d) return ''; const b = await crypto.subtle.digest('SHA-256', new TextEncoder().encode('pbthd-codev:' + d)); return Array.from(new Uint8Array(b)).map(x => x.toString(16).padStart(2, '0')).join('').slice(0, 24); }
const PHH = {}; // phone → hash (یادداشت)
// کو-ڈویلپر (مانی بھائی / عمران بھائی، 03138469706) خود پہچانا جاتا ہے: پیغام «👥 کو-ڈویلپر (…)» سے شروع یا یہی نمبر؛ باقی 👨‍💻 بٹن سے نشان
const CODEV_RX = /^\s*👥\s*کو-?\s*ڈویلپر/;
function coDevOf(i) { if (CODEV_RX.test(i.text || '') || digits(i.phone || '').replace(/[^0-9]/g, '').endsWith('3138469706')) return true; const h = PHH[i.phone || '']; if (h === undefined && i.phone) { PHH[i.phone] = null; phHash(i.phone).then(v => { PHH[i.phone] = v; if (v && ((PANEL && PANEL.coDevH) || []).includes(v) && R.v === 'owner') render(); }); return false; } return !!h && ((PANEL && PANEL.coDevH) || []).includes(h); }
function limitsCard() {
  const E = LANG === 'en', L = (PANEL && PANEL.lim) || {};
  /* HD0811SU054 (مالک کا حکم): ہر اکاؤنٹ کی دو پٹیاں — ⏱️ موجودہ 5 گھنٹے کا سیشن (o.s) اور 📅 ہفتہ وار (o.pct)؛ دونوں claude.ai/settings/usage سے ہاتھ سے (کوئی خودکار ذریعہ نہیں) */
  const bar = (lab, pct0, reset, at) => {
    const has = pct0 != null && pct0 !== '', pct = Math.max(0, Math.min(100, +pct0 || 0)), left = 100 - pct;
    const col = !has ? '#94a3b8' : pct >= 80 ? '#dc2626' : pct >= 50 ? '#f59e0b' : '#16a34a';
    return `<div class="limLine"><span class="limLab">${lab}</span><span class="limPct" style="color:${col}">${has ? (E ? `${pct}% used · ${left}% left` : `${pct}٪ استعمال · ${left}٪ باقی`) : (E ? 'tap to enter' : 'دبا کر لکھیں')}</span></div>
      <div class="limBar"><i style="width:${has ? pct : 0}%;background:${col}"></i></div>
      <div class="limSub">${reset ? (E ? '🔄 Resets: ' : '🔄 دوبارہ شروع: ') + esc(reset) : ''}${at ? ` · 🕒 ${ago(at)}` : ''}</div>`;
  };
  const row = ([k, mail, nm]) => {
    const o = L[k] || {}, s = o.s || {};
    return `<div class="limRow" data-act="limEdit" data-id="${k}"><div class="limTop"><b>${esc(nm)}</b><span class="limMail">${esc(mail)}</span></div>
      ${bar('⏱️ ' + (E ? 'Current session (5 h)' : 'موجودہ سیشن (5 گھنٹے)'), s.pct, s.reset, s.at)}
      ${bar('📅 ' + (E ? 'Weekly' : 'ہفتہ وار'), o.pct, o.reset, o.at)}</div>`;
  };
  const a = L.pbt && L.pbt.pct != null ? +L.pbt.pct : null, b = L.piary && L.piary.pct != null ? +L.piary.pct : null;
  const tip = a != null && b != null && Math.abs(a - b) >= 10 ? `<div class="limTip">👉 ${E ? 'Use' : 'اب'} <b>${a < b ? LIM_ACC[0][2] : LIM_ACC[1][2]}</b> ${E ? 'more — it is behind' : 'زیادہ استعمال کریں — یہ پیچھے ہے'}</div>` : '';
  return `<div class="card limCard"><div class="limHd"><b>📊 ${E ? 'Claude limits' : 'Claude کی حد — سیشن اور ہفتہ'}</b>
      <a class="tb" href="https://claude.ai/settings/usage" target="_blank" rel="noopener">↗ ${E ? 'Usage page' : 'استعمال کا صفحہ'}</a></div>${LIM_ACC.map(row).join('')}${tip}</div>`;
}
function limSheet(k) {
  const E = LANG === 'en', acc = LIM_ACC.find(x => x[0] === k) || LIM_ACC[0], o = ((PANEL && PANEL.lim) || {})[k] || {};
  sheet(`<h2>📊 ${esc(acc[2])}<button class="x" data-act="close">✕</button></h2>
    <p style="font-size:14px;line-height:2;margin:0">${esc(acc[1])}<br>${E ? 'Open claude.ai → Settings → Usage, and type the weekly % used:' : 'claude.ai ← Settings ← Usage کھول کر ہفتہ وار حد کا استعمال شدہ ٪ لکھیں:'}</p>
    <a class="tb" style="display:inline-block;margin:6px 0" href="https://claude.ai/settings/usage" target="_blank" rel="noopener">↗ claude.ai/settings/usage</a>
    <label class="lbl">⏱️ ${E ? 'Current session (5 h) used %' : 'موجودہ سیشن (5 گھنٹے) استعمال ٪'}</label><input class="inp num" id="limSPct" inputmode="numeric" value="${o.s && o.s.pct != null ? esc(String(o.s.pct)) : ''}" placeholder="0 – 100">
    <label class="lbl">${E ? 'Session resets in / at' : 'سیشن کب دوبارہ شروع (مثلاً 2 گھنٹے 10 منٹ میں)'}</label><input class="inp" id="limSReset" dir="auto" value="${esc((o.s && o.s.reset) || '')}" placeholder="${E ? 'e.g. in 2 hr 10 min' : 'مثلاً شام 6 بجے'}">
    <label class="lbl">${E ? 'Weekly used %' : 'ہفتہ وار استعمال ٪'}</label><input class="inp num" id="limPct" inputmode="numeric" value="${o.pct != null ? esc(String(o.pct)) : ''}" placeholder="0 – 100">
    <label class="lbl">${E ? 'Resets (as shown)' : 'دوبارہ کب شروع (جیسا وہاں لکھا ہو)'}</label><input class="inp" id="limReset" dir="auto" value="${esc(o.reset || '')}" placeholder="${E ? 'e.g. Thu 9:00 AM' : 'مثلاً جمعرات صبح 9 بجے'}">
    <button class="bigBtn blue" style="margin-top:12px" data-act="limSave" data-id="${k}">💾 ${E ? 'Save' : 'محفوظ'}</button>`);
}
let cleaned = false;
/* 📊 مہینے کی گنتی — حل شدہ 7 دن بعد مٹ جاتے ہیں، اس لیے ہر مسئلے کا نمبر مہینہ وار cfg.stats میں محفوظ (صرف مالک لکھتا ہے) */
const monthKey = t => { const d = new Date((t || Date.now()) + 5 * 3600e3); return d.getUTCFullYear() + '_' + String(d.getUTCMonth() + 1).padStart(2, '0'); };
const MONTHS_UR = ['جنوری', 'فروری', 'مارچ', 'اپریل', 'مئی', 'جون', 'جولائی', 'اگست', 'ستمبر', 'اکتوبر', 'نومبر', 'دسمبر'];
const MONTHS_EN = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const monthName = m => { const [y, mm] = m.split('_'); return (LANG === 'en' ? MONTHS_EN : MONTHS_UR)[+mm - 1] + ' ' + y; };
let statBusy = false;
async function recordStats() {
  if (!Store.isOwner() || statBusy || !ISSUES.length) return;
  statBusy = true;
  try {
    const st = JSON.parse(JSON.stringify(CFG.stats || {})); let ch = false;
    ISSUES.forEach(i => {
      if (!i.no) return;
      const m = monthKey(i.created), o = st[m] = st[m] || {}, a = o[i.app] = o[i.app] || [];
      if (!a.includes(i.no)) { a.push(i.no); ch = true; }
    });
    if (ch) await Store.setCfg({ stats: st });
  } catch (e) { console.warn(e); }
  statBusy = false;
}
function monthCounts(m) {
  const sets = {};
  Object.entries((CFG.stats || {})[m] || {}).forEach(([a, l]) => { sets[a] = new Set(l); });
  ISSUES.forEach(i => { if (i.no && monthKey(i.created) === m) (sets[i.app] = sets[i.app] || new Set()).add(i.no); });
  const out = {}; Object.entries(sets).forEach(([a, x]) => { if (x.size) out[a] = x.size; });
  return out;
}
function rankBtns() {
  const m = monthKey(), arr = Object.entries(monthCounts(m)).sort((x, y) => y[1] - x[1]);
  if (!arr.length) return '';
  const E = LANG === 'en';
  const b = ([id, n], hi) => { const a = appOf(id); return `<button class="rk ${hi ? 'hi' : 'lo'}" data-act="rank" data-id="${m}">
    <span class="rl">${hi ? '📈 ' + (E ? 'Most requests' : 'سب سے زیادہ مسائل') : '📉 ' + (E ? 'Fewest requests' : 'سب سے کم مسائل')}</span>
    <span class="rr">${appIcon(a, 'appMini')}<b>${esc(AN(a))}</b><i class="num">${n}</i></span></button>`; };
  return `<div class="rkRow">${b(arr[0], true)}${b(arr[arr.length - 1], false)}</div>
    <div class="rkSub">${E ? 'This month' : 'اس مہینے'} — ${monthName(m)}</div>`;
}
function rankSheet(m) {
  const c = monthCounts(m), E = LANG === 'en';
  const list = APPS.map(a => [a, c[a.id] || 0]).sort((x, y) => y[1] - x[1]);
  const max = Math.max(1, ...list.map(x => x[1])), tot = list.reduce((s2, x) => s2 + x[1], 0);
  const [y, mm] = m.split('_').map(Number);
  const prev = mm === 1 ? (y - 1) + '_12' : y + '_' + String(mm - 1).padStart(2, '0');
  const next = mm === 12 ? (y + 1) + '_01' : y + '_' + String(mm + 1).padStart(2, '0');
  sheet(`<h2>📊 ${E ? 'Requests per app' : 'ایپ وار مسائل'}<button class="x" data-act="close">✕</button></h2>
    <div class="tools" style="justify-content:space-between;align-items:center;margin:0 0 8px">
      <button class="tb" data-act="rank" data-id="${prev}">${E ? '‹ Previous' : '→ پچھلا'}</button>
      <b>${monthName(m)} <span class="num" style="color:var(--mut)">(${tot})</span></b>
      <button class="tb" data-act="rank" data-id="${next}" ${m >= monthKey() ? 'disabled style="opacity:.4"' : ''}>${E ? 'Next ›' : 'اگلا ←'}</button></div>
    ${list.map(([a, n]) => `<div class="rkLine">${appIcon(a, 'appMini')}<span class="rn">${esc(AN(a))}</span>
      <span class="rb"><i style="width:${n / max * 100}%"></i></span><b class="num">${n}</b></div>`).join('')}`);
}
async function cleanup() {
  if (cleaned) return; cleaned = true;
  await recordStats(); // مٹانے سے پہلے مہینے کی گنتی محفوظ
  const old = ISSUES.filter(i => !isReq(i) && (i.status === 'done' || i.status === 'dup') && Date.now() - (i.doneAt || i.upd) > keepDays() * 864e5);
  for (const i of old) await Store.remove(i.id);
  if (old.length) toast('🧹 ' + old.length + (LANG === 'en' ? ' old solved removed' : ' پرانے حل شدہ ہٹا دیے'));
}
const needsSend = i => !!i.reply && i.notified !== sig(i);
const decided = i => !!(i.urgent || i.stage);   // HD0511TH051: ⚡ / کام شروع ہو گیا = فیصلہ ہو چکا، «فیصلے کا منتظر» نہیں
const isHeld = i => (i.hold === 'decide' && !decided(i)) || i.hold === 'approve';
/* HD0211MO016 — 🔔 مالک کے لیے تین گنتیاں: 🔴 نئے (ان دیکھے)، 🔵 کام جاری، ⏳ منظوری کے منتظر (hd.py notify بھی یہی حساب کرتا ہے) */
function hdCounts(list) {
  list = list || ISSUES;
  const live = i => !['done', 'dup'].includes(i.status);
  const appr = list.filter(i => live(i) && isHeld(i)).length;
  const nw = list.filter(i => i.status === 'new' && !isHeld(i)).length;
  const wk = list.filter(i => ['seen', 'work'].includes(i.status) && !isHeld(i)).length;
  return { nw, wk, appr };
}
function countsHTML(c) {
  const E = LANG === 'en';
  return `<div class="st r"><span class="v">${c.nw}</span><span class="l">🔴 ${E ? 'New' : 'نئے'}</span></div>
      <div class="st b"><span class="v">${c.wk}</span><span class="l">🔵 ${E ? 'In progress' : 'کام جاری'}</span></div>
      <div class="st o"><span class="v">${c.appr}</span><span class="l">⏳ ${E ? 'Approval' : 'منظوری'}</span></div>`;
}
/* آئیکن پر نمبر (کروم بک / کمپیوٹر؛ فون پر اطلاع والا نشان) + ایپ پیچھے ہو تو نیا مسئلہ آتے ہی اطلاع */
let lastBadge = null;
function ownerBadge() {
  if (!Store.isOwner()) return;
  const c = hdCounts(), n = c.nw + c.appr;
  try { if (navigator.setAppBadge) { n ? navigator.setAppBadge(n) : navigator.clearAppBadge(); } } catch (e) {}
  const maxNo = Math.max(0, ...ISSUES.filter(i => i.status === 'new').map(i => i.no || 0));
  if (lastBadge && document.hidden && maxNo > lastBadge.maxNo && 'serviceWorker' in navigator && window.Notification && Notification.permission === 'granted') {
    navigator.serviceWorker.ready.then(r => r.showNotification('❓ PBT Help Desk', { body: pushBody(c), tag: 'pbthd', renotify: true, icon: 'icons/icon-192.png', badge: 'icons/icon-192.png', data: { url: './#/owner' } })).catch(() => {});
  }
  lastBadge = { maxNo };
}
function pushBody(c) { return `🔴 ${c.nw} نئے · 🔵 ${c.wk} پر کام جاری · ⏳ ${c.appr} منظوری کے منتظر`; }
// 🔔 اطلاعات چالو: اجازت، VAPID چابی (پہلی بار براؤزر میں بنتی ہے، فائربیس push/owner میں صرف مالک کے لیے)، فون کی رکنیت محفوظ
const b64u = b => btoa(String.fromCharCode(...new Uint8Array(b))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
const unb64u = s => Uint8Array.from(atob(s.replace(/-/g, '+').replace(/_/g, '/') + '==='.slice((s.length + 3) % 4)), c => c.charCodeAt(0));
async function enablePush() {
  const E = LANG === 'en';
  if (!('serviceWorker' in navigator) || !('PushManager' in window) || !window.Notification) { toast(E ? '❌ This browser cannot show notifications — open in Chrome' : '❌ یہ براؤزر اطلاع نہیں دکھاتا — کروم میں کھولیں', 5000); return; }
  if (Store.mode !== 'cloud') { toast('demo'); return; }
  const before = Notification.permission;
  const perm = await Notification.requestPermission();
  if (perm !== 'granted') {
    // HD0211MO019: صاف بتائیں کہ رکاوٹ کہاں ہے (denied = سائٹ یا فون نے بند کی، default = کروم نے پوچھا ہی نہیں)
    sheet(`<h2>🔔 ${E ? 'Notifications are blocked' : 'اطلاع کی اجازت نہیں ملی'}<button class="x" data-act="close">✕</button></h2>
      <p style="font-size:13px;color:var(--mut)" dir="ltr">Chrome: ${esc(before)} → ${esc(perm)}</p>
      <ol style="font-size:15px;line-height:2.1;padding-inline-start:20px">
        <li>${E ? 'Tap the ⓘ / ⚙️ icon left of the address bar → <b>Permissions</b> → <b>Notifications</b> → <b>Allow</b>' : 'اوپر پتے کی پٹی میں بائیں طرف ⓘ یا ⚙️ دبائیں ← <b>Permissions</b> ← <b>Notifications</b> ← <b>Allow</b>'}</li>
        <li>${E ? 'Phone Settings → Apps → Chrome → Notifications → ON' : 'فون کی Settings ← Apps ← Chrome ← Notifications ← آن'}</li>
        <li>${E ? 'Come back, refresh, tap 🔔 again' : 'واپس آ کر صفحہ تازہ کریں اور 🔔 دوبارہ دبائیں'}</li></ol>`);
    return;
  }
  try {
    let P = await Store.pushGet();
    if (!P.vpub || !P.vd) {
      const k = await crypto.subtle.generateKey({ name: 'ECDSA', namedCurve: 'P-256' }, true, ['sign', 'verify']);
      const jwk = await crypto.subtle.exportKey('jwk', k.privateKey);
      P = { vpub: b64u(await crypto.subtle.exportKey('raw', k.publicKey)), vd: jwk.d, subs: '[]' };
      await Store.pushSave({ vpub: P.vpub, vd: P.vd });
    }
    const reg = await navigator.serviceWorker.ready;
    let sub = await reg.pushManager.getSubscription();
    if (sub && b64u(sub.options.applicationServerKey || new ArrayBuffer(0)) !== P.vpub) { await sub.unsubscribe(); sub = null; }
    if (!sub) sub = await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: unb64u(P.vpub) });
    const j = sub.toJSON();
    let subs = []; try { subs = JSON.parse(P.subs || '[]'); } catch (e) {}
    subs = subs.filter(x => x.endpoint !== j.endpoint);
    subs.push({ endpoint: j.endpoint, p256dh: j.keys.p256dh, auth: j.keys.auth, ua: navigator.userAgent.slice(0, 120), at: Date.now() });
    await Store.pushSave({ subs: JSON.stringify(subs.slice(-6)), sig: '' });
    try { localStorage.setItem('pbthd_push', '1'); } catch (e) {}
    reg.showNotification('❓ PBT Help Desk', { body: '✅ ' + (E ? 'Notifications on — ' : 'اطلاعات چالو — ') + pushBody(hdCounts()), tag: 'pbthd', icon: 'icons/icon-192.png', badge: 'icons/icon-192.png', data: { url: './#/owner' } });
    ownerBadge(); render();
    toast(E ? '✅ Notifications on' : '✅ اطلاعات چالو ہو گئیں', 4000);
  } catch (e) {
    console.warn(e);
    toast(/permission/i.test(String(e && (e.code || e.message))) ? (E ? '❌ Publish the new Firestore rules first' : '❌ پہلے فائربیس میں نئے اصول Publish کریں') : '❌ ' + (e && e.message || e), 7000);
  }
}
/* HD0211MO017 — ⚡ فوری کا نیا بٹن (مالک کا حکم): صاف آن / بند سوئچ؛ آن ہو تو کام سیدھا Claude کی چیٹ میں — ہر گھنٹے کی باری ختم */
const CLAUDE_CHAT = 'https://claude.ai/code/session_01RNzHHzEYnZigJB5pMdM5Te';
/* HD0211MO018 — ⚡ فوری کی پیش رفت: قدم بہ قدم پٹی (Claude ہر قدم پر `hd.py set <no> stage=…` لکھتا ہے، یہاں لائیو) */
const STAGES = [
  ['sent', 10, '⚡', 'حکم موصول', 'Order received'],
  ['claude', 20, '📨', 'Claude کو بھیجا گیا', 'Sent to Claude'],
  ['seen', 30, '👂', 'سن لیا — غور جاری', 'Heard — thinking'],
  ['work', 50, '🔧', 'Claude کام کر رہا ہے', 'Claude is working'],
  ['test', 70, '🧪', 'جانچ ہو رہی ہے', 'Testing'],
  ['push', 85, '⬆️', 'Push ہو رہا ہے', 'Pushing'],
  ['live', 95, '🌐', 'لائیو ہو گیا', 'Live'],
  ['done', 100, '✅', 'حل · گاہک کو جواب گیا', 'Solved · customer replied']
];
function urgStage(i) {
  if (i.status === 'done') return 'done';
  if (i.stage && STAGES.some(x => x[0] === i.stage)) return i.stage;
  if (i.status === 'work') return 'work';
  return 'sent';
}
/* HD0911MO061 (مالک کا حکم): ہر جاری کام کے کونے پر 🔄 «دوبارہ چلائیں» — تین گھومتے تیر ایک دوسرے کے پیچھے؛ رکا ہوا کام دوبارہ Claude کی قطار میں (stage=claude، ⚡) + ایک لائن کاپی کر کے Claude کی چیٹ */
const RETRY_SVG = '<svg viewBox="0 0 40 40" aria-hidden="true"><g class="rsG">' + [0, 120, 240].map(r => `<g transform="rotate(${r} 20 20)"><path d="M20 5 A15 15 0 0 1 33 12.5" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round"/><path d="M35.6 7.6 L34.4 15.6 L27.2 12.2 Z" fill="currentColor"/></g>`).join('') + '</g></svg>';
/* HD0911MO064 (مالک کا حکم): 🔄 صرف ان پر جن پر کام شروع / منظور ہو چکا اور ابھی مکمل نہیں — ⚡ فوری، منظور (go)، کوئی قدم (stage) یا «کام جاری»؛
   حل / ڈپلیکیٹ / مکمل، ایک طرف رکھے / ڈرافٹ / تفصیل کے منتظر اور ابھی نہ چھیڑے نئے مسئلوں پر نہیں */
const inWork = i => !!i && i.status !== 'done' && i.status !== 'dup' && i.stage !== 'done' && !['later', 'draft', 'info'].includes(i.hold) && !!(i.urgent || i.hold === 'go' || i.stage || i.status === 'work');
function retryCorner(i) {
  if (!Store.isOwner() || !inWork(i)) return '';
  const E = LANG === 'en';
  return `<button class="rsCorner" data-act="urgRetry" data-id="${i.id}" title="${E ? 'Stuck? Restart this job' : 'رکا ہے؟ دوبارہ چلائیں'}" aria-label="${E ? 'Restart' : 'دوبارہ چلائیں'}">${RETRY_SVG}</button>`;
}
function retryBtn(i, mini) {
  if (!Store.isOwner() || !inWork(i)) return '';
  const E = LANG === 'en';
  return `<button class="rsBtn ${mini ? 'mini' : ''}" data-act="urgRetry" data-id="${i.id}" title="${E ? 'Restart — send again to Claude' : 'دوبارہ چلائیں — رکا کام پھر Claude کو'}">${RETRY_SVG}${mini ? '' : `<span>${E ? 'Restart' : 'دوبارہ چلائیں'}</span>`}</button>`;
}
function urgProgress(i, mini) {
  const E = LANG === 'en', st = urgStage(i), k = STAGES.findIndex(x => x[0] === st), cur = STAGES[k], nx = STAGES[k + 1];
  const pct = cur[1], done = st === 'done';
  if (mini) return `<div class="upMini ${done ? 'fin' : ''}"><div class="upBar"><i style="width:${pct}%"></i></div><span>${cur[2]} ${E ? cur[4] : cur[3]} · <b class="num">${pct}%</b></span></div>`;
  return `<div class="urgProg ${done ? 'fin' : ''}">
    <div class="upHead"><b>${cur[2]} ${E ? cur[4] : cur[3]}</b><span class="upR">${retryBtn(i)}<span class="num">${pct}%</span></span></div>
    <div class="upBar"><i style="width:${pct}%"></i></div>
    <div class="upLeft">${done ? (E ? '🎉 All done' : '🎉 کام مکمل') : `${E ? 'Remaining' : 'باقی'} <b class="num">${100 - pct}%</b>${nx ? ` · ${E ? 'next' : 'اگلا قدم'}: ${nx[2]} ${E ? nx[4] : nx[3]}` : ''}`}</div>
    <ol class="upSteps">${STAGES.map((x, j) => `<li class="${j < k || done ? 'stOk' : j === k ? 'now' : ''}"><span class="d">${j < k || done ? '✓' : x[2]}</span><span class="t">${E ? x[4] : x[3]}</span></li>`).join('')}</ol>
    ${i.stageAt ? `<div class="upWhen">🕒 ${ago(i.stageAt)}</div>` : ''}</div>`;
}
function urgHome() {
  // HD0311TU033 (مالک کا حکم، ہیلپ ڈیسک #45): ہوم کے کارڈ میں صرف جاری کام — 100٪ مکمل (حل / جواب گیا) یہاں سے غائب (پینل کے ⚡ ٹیب میں ایک دن رہتے ہیں)
  const L = ISSUES.filter(i => isUrg(i) && i.status !== 'done' && i.stage !== 'done').sort((a, b) => (b.stageAt || b.upd) - (a.stageAt || a.upd));
  if (!L.length) return '';
  const E = LANG === 'en';
  return `<div class="card urgHome"><b>⚡ ${E ? 'Urgent jobs — live progress' : 'فوری کام — لائیو پیش رفت'}</b>
    ${L.map(i => `<div class="uh${retryCorner(i) ? ' hasRs' : ''}" data-act="open" data-id="${i.id}">${retryCorner(i)}<span class="t">${appIcon(appOf(i.app), 'appMini')} <b class="num">#${i.no}</b> <span class="clamp" dir="auto">${esc(i.text || '🎤')}</span></span>${urgProgress(i, true)}</div>`).join('')}</div>`;
}
function urgSwitch(i) {
  // HD0311TU024 (مالک کا حکم): حل شدہ / ڈپلیکیٹ مسئلے پر ⚡ سوئچ نہیں (دبانے سے کام دوبارہ شروع ہوتا تھا) — صرف مکمل پیش رفت
  const closed = i.status === 'done' || i.status === 'dup' || i.stage === 'done';
  // HD0511TH044 (مالک کا حکم): کام مکمل ہو جائے تو ⚡ کی پٹی اور پیش رفت دونوں غائب؛ اکاؤنٹ / اشتہار کی درخواست پر ⚡ ہی نہیں
  if (closed || isAcctReq(i.text)) return '';
  const prog = i.urgent || (i.stage && i.status !== 'new') ? urgProgress(i) : '';
  if (isOwnIssue(i)) return `<div class="urgBox" data-urgbox="${i.id}">${ownChoice(i)}${i.urgent ? prog : ''}</div>`;   // HD0511TH051: اپنا مسئلہ — فوری / ڈرافٹ / اگلا جائزہ
  return `<div class="urgBox" data-urgbox="${i.id}">${parkRow(i)}${i.hold === 'later' || i.hold === 'info' ? '' : urgBtn(i)}${prog}</div>`;
}
/* HD0511TH051 (مالک کا حکم): مالک کا اپنا مسئلہ — ⚡ فوری (ابھی کام) / 📝 ڈرافٹ (صرف یادداشت، کوئی کام نہیں) / ⏭️ اگلے جائزے پر (صبح 11 / رات ساڑھے 8) */
function ownChoice(i) {
  const E = LANG === 'en', cur = i.urgent ? 'now' : i.hold === 'draft' ? 'draft' : 'next';
  const B = (k, ic, ur, en) => `<button class="oc ${cur === k ? 'on' : ''}" data-act="ownPick" data-id="${i.id}|${k}">${ic}<b>${E ? en : ur}</b></button>`;
  const msg = cur === 'now' ? (E ? '⚡ Urgent — Claude is on it now' : '⚡ فوری — Claude ابھی کام کر رہا ہے') : cur === 'draft' ? (E ? '📝 Draft — kept as a note, no work until you choose' : '📝 ڈرافٹ — صرف یادداشت، جب تک آپ نہ کہیں کام نہیں ہوگا') : (E ? '⏭️ Will be done in the next review (11 AM / 8:30 PM)' : '⏭️ اگلے جائزے (صبح 11 / رات ساڑھے 8 بجے) میں ہوگا');
  return `<div class="ownCh"><div class="ocR">${B('now', '⚡', 'فوری کام کریں', 'Urgent now')}${B('draft', '📝', 'ڈرافٹ رکھیں', 'Keep as draft')}${B('next', '⏭️', 'اگلے جائزے پر', 'Next review')}</div><div class="ocM">${msg}</div></div>`;
}
/* HD0511TH051 (مالک کا حکم): ہوم پر پیلی پٹی — «محترم عبدالحفیظ! یہ مسائل آپ کی منظوری کے منتظر ہیں» + گنتی؛ دبائیں تو سب ایک جگہ */
const apprList = () => ISSUES.filter(i => !['done', 'dup'].includes(i.status) && isHeld(i)).sort((a, b) => (a.no || 0) - (b.no || 0));
function apprStrip() {
  const n = apprList().length; if (!n) return '';
  const E = LANG === 'en';
  return `<button class="apprStrip" data-act="apprOpen"><span class="aT">⚠️ ${E ? 'Respected Abdul Hafeez! These issues are waiting for your approval' : 'محترم عبدالحفیظ! یہ مسائل آپ کی منظوری کے منتظر ہیں'}</span><span class="aN num">${n}</span></button>`;
}
function apprSheet() {
  const E = LANG === 'en', L = apprList();
  if (!L.length) { closeSheet(); toast(E ? '✅ Nothing waiting for approval' : '✅ منظوری کے لیے کچھ باقی نہیں'); return; }
  sheet(`<h2>⏳ ${E ? 'Waiting for your approval' : 'آپ کی منظوری کے منتظر'} <span class="num">(${L.length})</span><button class="x" data-act="close">✕</button></h2>
    ${L.map(i => `<div class="apI" data-api="${i.id}">
      <div class="apH" data-act="apView" data-id="${i.id}">${appIcon(appOf(i.app), 'appMini')} <b class="num">#${i.no}</b> <span>${esc(AN(appOf(i.app)))}</span> <span class="tg">${i.hold === 'approve' ? (E ? 'Ready to go live' : 'لائیو کی منظوری') : (E ? 'Suggestion' : 'مشورہ')}</span></div>
      <div class="apX clamp" dir="auto" data-act="apView" data-id="${i.id}">${esc(i.text || '🎤')}</div>
      <div class="apB">
        <button class="tb grn" data-act="apGo" data-id="${i.id}">✅ ${i.hold === 'approve' ? (E ? 'Approve — go live' : 'منظور — لائیو کریں') : (E ? 'Approve — start now' : 'منظور — ابھی کام')}</button>
        ${i.hold === 'approve' ? '' : `<button class="tb" data-act="apNext" data-id="${i.id}">⏭️ ${E ? 'Next review' : 'اگلے جائزے پر'}</button>`}
        <button class="tb" data-act="apAsk" data-id="${i.id}">❓ ${E ? 'Need more details' : 'مزید تفصیل درکار'}</button>
        <button class="tb red" data-act="apDel" data-id="${i.id}">🗑️ ${E ? 'Delete' : 'حذف'}</button>
      </div>
      <div class="apAsk" id="ask_${i.id}" style="display:none"><textarea class="inp" dir="auto" rows="3" placeholder="${E ? 'What do you want to ask the person who sent this?' : 'مسئلہ بھیجنے والے سے کیا پوچھنا ہے؟ یہاں لکھیں…'}"></textarea>
        <button class="tb pri" data-act="apSend" data-id="${i.id}">📨 ${E ? 'Send to customer' : 'گاہک کو بھیجیں'}</button></div>
    </div>`).join('')}`, true);
}
/* HD0511TH046 (مالک کا حکم): گاہک کے ہر مسئلے پر — ⚡ فوری / ⏸️ بعد میں (فہرست سے ایک طرف) / ❓ مزید تفصیل پوچھیں (رکا، گاہک سے سوال) */
function parkRow(i) {
  const E = LANG === 'en';
  if (i.hold === 'later') return `<div class="parkBox later">⏸️ <b>${E ? 'Parked — kept aside, no work for now' : 'ایک طرف رکھا ہے — ابھی کام نہیں ہوگا'}</b><button class="tb" data-act="park" data-id="">${E ? '▶️ Back to the list' : '▶️ واپس فہرست میں'}</button></div>`;
  if (i.hold === 'info') return `<div class="parkBox info">❓ <b>${E ? 'Waiting for more details from the customer' : 'گاہک سے مزید تفصیل کا انتظار'}</b>${i.reply ? `<div class="pq" dir="auto">${esc(i.reply)}</div>` : ''}<button class="tb" data-act="park" data-id="">${E ? '▶️ Got it — back to the list' : '▶️ تفصیل مل گئی — واپس فہرست میں'}</button></div>`;
  return `<div class="parkRow"><button class="tb" data-act="park" data-id="later">⏸️ ${E ? 'Later / park' : 'بعد میں — ایک طرف'}</button><button class="tb" data-act="park" data-id="info">❓ ${E ? 'Ask for more details' : 'مزید تفصیل پوچھیں'}</button></div>`;
}
function urgBtn(i) {
  const E = LANG === 'en', on = !!i.urgent;
  return `<button class="urgSw ${on ? 'on' : ''}" data-act="urgent" data-id="${i.id}" aria-pressed="${on}">
    <span class="uI">⚡</span>
    <span class="uT"><b>${on ? (i.status === 'done' ? (E ? 'URGENT — DONE ✅' : 'فوری کام — مکمل ✅') : (E ? 'URGENT — ON' : 'فوری — آن ہے')) : (E ? 'Make it urgent' : 'فوری کروائیں')}</b>
      <small>${on ? (E ? 'Claude does this first · tap again to turn off' : 'Claude یہ سب سے پہلے کرے گا · بند کرنے کے لیے دوبارہ دبائیں') : (E ? 'Now: off — will be done in the next round (11 AM / 8:30 PM)' : 'ابھی بند ہے — یہ اگلی باری (صبح 11 / رات ساڑھے 8 بجے) میں ہوگا')}</small></span>
    <span class="uK"><i></i></span></button>`;
}
function urgMsg(i) { const a = appOf(i.app); return `⚡ فوری: ہیلپ ڈیسک #${i.no} (${AN(a)}) — ابھی حل کر کے لائیو کریں`; }
function urgSheet(i) {
  const E = LANG === 'en';
  sheet(`<h2>⚡ ${E ? 'Urgent is ON' : 'فوری آن ہو گیا'} — #${i.no}<button class="x" data-act="close">✕</button></h2>
    <p style="font-size:15px;line-height:2">${E ? 'To start right now, send this one line to Claude:' : 'ابھی اسی وقت کام شروع کروانے کے لیے یہ ایک لائن Claude کو بھیج دیں:'}</p>
    <div class="card" style="box-shadow:none;background:#fff7ed;border:1.5px solid #fb923c;font-weight:700" dir="auto">${esc(urgMsg(i))}</div>
    <button class="bigBtn" style="background:linear-gradient(135deg,#f97316,#ea580c)" data-act="urgTell" data-id="${i.id}">📋 ${E ? 'Copy & open Claude chat' : 'کاپی کر کے Claude کی چیٹ کھولیں'}</button>
    <p style="font-size:13px;color:var(--mut);margin:8px 0 0">${E ? 'Not sent now? It will still be done first in the next round (11 AM / 8:30 PM).' : 'ابھی نہ بھیجیں تو بھی اگلی باری (صبح 11 / رات ساڑھے 8 بجے) میں سب سے پہلے یہی ہوگا۔'}</p>`);
}
const pushOn = () => { try { return window.Notification && Notification.permission === 'granted' && localStorage.getItem('pbthd_push') === '1'; } catch (e) { return false; } };
const isUrg = i => !!i.urgent && i.status !== 'dup' && i.status !== 'done' && i.stage !== 'done'; // HD0511TH045 (مالک کا حکم): مکمل ہوتے ہی ⚡ فہرست سے غائب — دیکھنا ہو تو «✅ حل» ٹیب
function tabOk(i, t) {
  if (t === 'req') return isReq(i);
  if (isReq(i)) return false;
  // HD0511TH045 (مالک کا حکم): مکمل (✅ / stage done) اور ڈپلیکیٹ لمبی فہرستوں میں نہیں — صرف «✅ حل» / «🔗» / «📨 بھیجنا باقی» ٹیب میں
  const fin = i.status === 'done' || i.status === 'dup' || i.stage === 'done';
  if (t === 'done') return i.status === 'done' || (i.stage === 'done' && i.status !== 'dup');
  if (t === 'dup') return i.status === 'dup';
  if (t === 'send') return needsSend(i);
  if (t === 'park') return !fin && (i.hold === 'later' || i.hold === 'info' || i.hold === 'draft');
  if (fin) return false;
  if (i.hold === 'later' || i.hold === 'info' || i.hold === 'draft') return false;   // HD0511TH046: ایک طرف رکھے / تفصیل کے منتظر صرف «⏸️ رکے» ٹیب میں
  return t === 'all' ? true : t === 'urg' ? isUrg(i) : t === 'open' ? (isOpen(i) || isHeld(i)) : t === 'hold' ? isHeld(i) : i.status === t;
}
const bulkTodo = i => i.status !== 'done' && i.status !== 'dup' && i.stage !== 'done';
function ownFiltered() {
  const q = O.q.trim().toLowerCase();
  let l = ISSUES.filter(i => tabOk(i, O.tab) && (!O.app || i.app === O.app));
  if (q) l = l.filter(i => [i.text, i.ptext, i.name, i.phone, i.reply, '#' + i.no, AN(appOf(i.app))].join(' ').toLowerCase().includes(q));
  const sk = i => SKIP.has(i.id) ? 1 : 0;
  return l.sort(O.sort === 'votes' ? (a, b) => ((b.metoo || []).length - (a.metoo || []).length) || b.created - a.created
    : O.sort === 'new' ? (a, b) => sk(a) - sk(b) || b.created - a.created
    : (a, b) => sk(a) - sk(b) || a.created - b.created); // HD0811SA052: پرانے پہلے؛ «⏭️ بعد میں» والے نیچے
}
function vOwner() {
  if (!Store.isOwner()) { setTimeout(loginSheet, 50); return `<div class="card empty"><span class="e">🔒</span>Developer</div>`; }
  cleanup();
  if (!PANEL) loadPanel();
  const C = s => ISSUES.filter(i => tabOk(i, s) && (!O.app || i.app === O.app)).length;
  const tabs = [['urg', '⚡ ' + (LANG === 'en' ? 'Urgent' : 'فوری')], ['open', '🔓 ' + (LANG === 'en' ? 'Open' : 'کھلے')], ['req', '🔑 ' + (LANG === 'en' ? 'Account / Ad requests' : 'اکاؤنٹ / اشتہار درخواستیں')], ['hold', '⏳ ' + (LANG === 'en' ? 'Approval' : 'منظوری')], ['park', '⏸️ ' + (LANG === 'en' ? 'Parked' : 'رکے')], ['send', '📨 ' + (LANG === 'en' ? 'To send' : 'بھیجنا باقی')], ['new', '📥 ' + T('s_new')], ['seen', '👀 ' + T('s_seen')], ['work', '🔧 ' + T('s_work')], ['done', '✅ ' + T('s_done')], ['dup', '🔗 ' + T('s_dup')], ['all', LANG === 'en' ? 'All' : 'سب']];
  const list = ownFiltered();
  const opts = `<option value="">${LANG === 'en' ? 'All apps' : 'سب ایپس'}</option>` + APPS.map(a => {
    const n = ISSUES.filter(i => i.app === a.id && isOpen(i)).length;
    return `<option value="${esc(a.id)}" ${O.app === a.id ? 'selected' : ''}>${esc(AN(a))}${n ? ' (' + n + ')' : ''}</option>`;
  }).join('');
  const cards = list.map(i => {
    const a = appOf(i.app), n = (i.metoo || []).length;
    const own = isOwnIssue(i), co = !own && coDevOf(i);
    const rc = retryCorner(i);
    return `<div class="is s-${i.status} oi${own ? ' oiOwn' : ''}${co ? ' oiCo' : ''}${SKIP.has(i.id) ? ' oiSkip' : ''}${rc ? ' hasRs' : ''}" data-act="open" data-id="${i.id}">${rc}
      ${own ? `<div class="oiTag own">🟢 ${LANG === 'en' ? 'My request' : 'میرا اپنا'}</div>` : co ? `<div class="oiTag co">👨‍💻 ${LANG === 'en' ? 'Co-developer' : 'کو ڈویلپر'}</div>` : ''}
      <div class="top">${appIcon(a, 'appMini')} <b style="font-size:14px">${esc(AN(a))}</b>${tyChip(i.type)}${stChip(i.status)}
        <span class="chip ${i.pub ? 'globe' : 'lock'}">${i.pub ? '🌐' : '🔒'}</span>${isHeld(i) ? '<span class="chip work">⏳</span>' : ''}${i.urgent ? '<span class="chip work">⚡</span>' : ''}${needsSend(i) ? '<span class="chip mine">📨</span>' : ''}<span class="no">#${i.no}</span></div>
      <div class="tx clamp" dir="auto">${esc(i.text || (i.audio ? '🎤' : ''))}</div>
      ${i.urgent || inWork(i) ? urgProgress(i, true) : ''}
      ${i.status === 'done' ? `<button class="tb grn" style="font-size:13px;margin:6px 0 0" data-act="poster" data-id="${i.id}">🖼️ ${LANG === 'en' ? 'Solved post → WhatsApp' : 'حل کی پوسٹ ← واٹس ایپ'}${needsSend(i) ? ' 📨' : ' ✓'}</button>` : ''}
      <div class="ft"><span class="who">👤 ${esc(i.name)} · <span class="num">${esc(i.phone)}</span></span>
        <span class="when">🕒 ${ago(i.created)}</span>${i.shots ? `<span class="when">🖼️ ${i.shots}</span>` : ''}${i.audio ? '<span class="when">🎤</span>' : ''}
        ${n ? `<span class="mt on">👋 <b>${n + 1}</b></span>` : ''}
        ${bulkTodo(i) ? `<button class="tb skipB" data-act="skip" data-id="${i.id}">${SKIP.has(i.id) ? (LANG === 'en' ? '↩️ Back to its place' : '↩️ واپس اپنی جگہ') : (LANG === 'en' ? '⏭️ Later' : '⏭️ بعد میں')}</button>` : ''}</div></div>`;
  }).join('');
  return `<div class="own">
    <div class="card" style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
      <b style="font-size:19px;flex:1">🛠️ ${LANG === 'en' ? 'Developer panel' : 'ڈویلپر پینل'}</b>
      <button class="tb ${pushOn() ? 'grn' : 'pri'}" data-act="push" title="Notifications">🔔${pushOn() ? ' ✓' : ` ${LANG === 'en' ? 'Turn on alerts' : 'اطلاعات چالو کریں'}`}</button><button class="tb" data-act="settings">⚙️</button><button class="tb" data-act="logout">🚪</button></div>
    <div class="card stats" style="grid-template-columns:repeat(4,1fr)">
      ${countsHTML(hdCounts(ISSUES.filter(i => !O.app || i.app === O.app)))}
      <div class="st g"><span class="v">${weekSolved(ISSUES.filter(i => !O.app || i.app === O.app))}</span><span class="l">✅ ${T('solvedWeek')}</span></div></div>
    <div class="oTabs">${tabs.map(([k, l]) => `<button class="${O.tab === k ? 'on' : ''}" data-act="otab" data-id="${k}">${l}${k !== 'all' ? `<i>${C(k)}</i>` : ''}</button>`).join('')}</div>
    <div class="row"><select class="inp" data-oin="app">${opts}</select>
      <select class="inp" data-oin="sort"><option value="old" ${O.sort === 'old' ? 'selected' : ''}>⏳ ${LANG === 'en' ? 'Oldest first' : 'پرانے پہلے'}</option><option value="new" ${O.sort === 'new' ? 'selected' : ''}>🕒 ${LANG === 'en' ? 'Newest' : 'نئے پہلے'}</option><option value="votes" ${O.sort === 'votes' ? 'selected' : ''}>👋 ${LANG === 'en' ? 'Most voted' : 'زیادہ لوگ پہلے'}</option></select>
      <input class="inp" data-oin="q" value="${esc(O.q)}" placeholder="🔍 ${LANG === 'en' ? 'name, phone, #no, text' : 'نام، نمبر، #، متن'}"></div>
    <div class="ownGrid">${cards || `<div class="card empty"><span class="e">🎉</span>${LANG === 'en' ? 'Nothing here' : 'یہاں کچھ نہیں'}</div>`}</div>
  </div>${foot()}`;
}

/* مسئلے کی پوری تفصیل (مالک) */
let DET = null;
async function openDetail(id) {
  const i = ISSUES.find(x => x.id === id); if (!i) return;
  DET = { id, blobs: null };
  if (i.status === 'new') Store.update(id, { status: 'seen' });
  sheet(detailHTML());
  DET.blobs = await Store.blobs(id);
  if (DET && DET.id === id) sheet(detailHTML(), true);
}
/* HD0411WE038: ایپ سے «Send account details to developer» — UID، Name، Mobile no.، Gmail */
const isAcctReq = t => /(^|\n)\s*UID\s*:/i.test(t || '') && /(^|\n)\s*(Gmail|Mobile)/i.test(t || '');
/* HD0811SU054 (مالک کا حکم): اکاؤنٹ / موبائل جوڑنے / اشتہار کی درخواستیں عام مسائل سے الگ — اپنا ٹیب «🔑 درخواستیں»، حل ہونے کے بعد بھی ہمیشہ (خود حذف نہیں) */
function isReq(i) { return !!i && (i.type === 'acct' || /(^|\n)\s*UID\s*:/i.test(i.text || '') && /(^|\n)\s*(Gmail|Mobile)/i.test(i.text || '') || /📢\s*Ad request|Account sign-in request/i.test(i.text || '')); }
function detailHTML() {
  // HD0311TU034 (مالک کا حکم): ایک صفحے پر — اوپر 🗑️ حذف اور ✕؛ چھوٹی تصویریں؛ عام فہرست / Claude «➕ مزید» میں بند
  const i = ISSUES.find(x => x.id === DET.id); if (!i) return '<div class="empty">—</div>';
  const a = appOf(i.app), n = (i.metoo || []).length;
  const shots = (DET.blobs || []).filter(b => b.kind === 'shot'), au = (DET.blobs || []).find(b => b.kind === 'audio');
  const E = LANG === 'en';
  return `<div class="det dc"><h2>${appIcon(a, 'appMini')} <span class="dcT">${esc(AN(a))} <span class="num" style="color:var(--mut)">#${i.no}</span></span>
      ${i.phone && !isOwnIssue(i) ? `<button class="tb ${coDevOf(i) ? 'amb' : ''}" data-act="coDev" title="${E ? 'Mark sender as co-developer' : 'بھیجنے والا کو ڈویلپر'}">👨‍💻${coDevOf(i) ? ' ✓' : ''}</button>` : ''}
      ${retryCorner(i).replace('rsCorner', 'rsCorner inH')}<button class="tb red dcDel" data-act="del" title="${E ? 'Delete' : 'حذف'}">🗑️ ${E ? 'Delete' : 'حذف'}</button><button class="x" data-act="close">✕</button></h2>
    <div class="dcRow">${tyChip(i.type)}${stChip(i.status)}${n ? `<span class="chip work">👋 ${n + 1}</span>` : ''}
      <span class="dcMeta">👤 <b>${esc(i.name)}</b> · <a class="num" href="tel:${esc(i.phone)}">${esc(i.phone)}</a> · <a href="https://wa.me/${waNum(i.phone)}" target="_blank" rel="noopener">💬</a> · <span class="num">${fullDate(i.created)}</span>${i.ver ? ' · <span class="num">' + esc(i.ver) + '</span>' : ''}</span></div>
    ${holdBox(i)}
    ${isAcctReq(i.text) ? `<div class="acctReq">🔑 <b>${/Ad request/.test(i.text) ? (E ? '📢 Ad request' : '📢 اشتہار کی درخواست') : (E ? 'Account sign-in request' : 'اکاؤنٹ سائن اِن کی درخواست')}</b><br><pre class="acctPre" dir="ltr">${esc(i.text || '')}</pre><button class="tb pri" data-act="copyAcct">📋 ${E ? 'Copy & paste in Developer Panel' : 'کاپی کریں — ڈویلپر پینل میں پیسٹ کے لیے'}</button><button class="tb grn acctDone" data-act="acctDone">✅ ${E ? 'Done (given) — close this request' : 'دے دیا — یہ درخواست بند کریں'}</button><div class="acctHow">${/Ad request/.test(i.text) ? (E ? 'MCS → admin → 📢 Ads → «paste message» → fields fill → save' : 'سٹی شائنز ← ایڈمن ← 📢 اشتہار ← «پیغام پیسٹ» ← خانے خود ← محفوظ') : i.app === 'MCS' ? (E ? 'MCS → admin login → Control panel → 👤 Account Access → paste → duration → Give' : 'سٹی شائنز ← ایڈمن لاگ اِن ← کنٹرول پینل ← 👤 Account Access ← پیسٹ ← مدت ← Give') : i.app === 'AIO-POS-DIRECT' ? (E ? 'Direct app → Developer panel → 🎁 Generate Code → paste in the yellow box → package & days → Generate → send the code' : 'Direct ایپ ← ڈویلپر پینل ← 🎁 Generate Code ← پیلے خانے میں پیسٹ ← پیکج اور مدت ← Generate ← کوڈ گاہک کو') : (E ? 'App → Developer panel → 👤 Account Access → paste → package → Give' : 'ایپ ← ڈویلپر پینل ← 👤 Account Access ← پیسٹ ← پیکج اور مدت ← Give')}</div></div>` : ''}
    ${isAcctReq(i.text) ? '' : `<div class="tx dcTx" dir="auto">${phoneLinks(i.text) || '<i style="color:var(--mut)">—</i>'}</div>`}
    <div class="dcSub"${isAcctReq(i.text) ? ' style="display:none"' : ''}>${i.textEd ? `✏️ ${E ? 'Edited' : 'مکمل کیا'} · <span class="num">${fullDate(i.textEd)}</span>${i.origText != null ? ` · <a href="#" data-act="showOrig">${E ? 'original' : 'اصل پیغام'}</a>` : ''} · ` : ''}<a href="#" data-act="editText">✏️ ${E ? 'Complete / edit message' : 'پیغام مکمل / درست کریں'}</a></div>
    <div id="edTextBox" style="display:none">
      <textarea class="big" id="edText" dir="auto" style="min-height:80px">${esc(i.text || '')}</textarea>
      <div class="tools"><button class="tb" data-act="pasteEdText">📋 ${T('paste')}</button>
        <button class="tb pri" data-act="saveEdText">💾 ${E ? 'Save message' : 'پیغام محفوظ کریں'}</button></div>
    </div>
    ${DET.blobs == null && (i.shots || i.audio) ? '<div class="spin" style="margin:6px auto;width:24px;height:24px"></div>' : ''}
    ${shots.length || au ? `<div class="dcMedia">${shots.map(b => `<img src="${b.data}" data-viewsrc="1" alt="">`).join('')}${au ? `<audio controls src="${au.data}"></audio>` : ''}</div>` : ''}
    ${bulkTodo(i) && !i.cAt && !i.urgent && !i.stage && !isAcctReq(i.text) ? `<button class="bigBtn cMain" data-act="cMain">🤖 ${E ? 'Copy for Claude (text + image)' : 'Claude کے لیے کاپی کریں (متن + تصویر)'}</button>` : ''}
    ${urgSwitch(i)}
    <div class="stBtns">${['new', 'seen', 'work', 'done'].map(s => `<button class="${s} ${i.status === s ? 'on' : ''}" data-act="setSt" data-id="${s}">${ST_IC[s]} ${T('s_' + s)}</button>`).join('')}</div>
    <textarea class="big dcReply" id="rText" dir="auto" placeholder="${E ? 'Reply to customer — write or paste…' : 'گاہک کو جواب — لکھیں یا پیسٹ کریں…'}">${esc(i.reply || '')}</textarea>
    <div class="tools dcTools"><button class="tb" data-act="pasteReply">📋</button>
      <button class="tb pri" data-act="saveReply">💾 ${E ? 'Save' : 'محفوظ'}</button>
      <button class="tb grn" data-act="doneReply">✅ ${E ? 'Save + Solved' : 'محفوظ + حل'}</button>
      <button class="tb" data-act="notify">📨 ${E ? 'WhatsApp' : 'واٹس ایپ'}</button>
      <button class="tb grn" data-act="poster" data-id="${i.id}">🖼️ ${E ? 'Post' : 'پوسٹ'}</button></div>
    <details class="dcMore"><summary>➕ ${E ? 'More — duplicate, public list, Claude' : 'مزید — ڈپلیکیٹ، عام فہرست، Claude'}</summary>
      <div class="tools"><button class="tb" data-act="dup">🔗 ${E ? 'Mark duplicate of #…' : 'ڈپلیکیٹ — اصل نمبر لکھیں'}</button></div>
      <label class="sw"><input type="checkbox" id="pubSw" ${i.pub ? 'checked' : ''} data-act="pub"><i></i>🌐 ${E ? 'Show to everyone (name & phone stay hidden)' : 'سب کو دکھائیں (نام اور نمبر چھپے رہیں گے)'}</label>
      <div class="inpRow"><input class="inp" id="pText" value="${esc(i.ptext || '')}" placeholder="${E ? 'Public wording (optional)' : 'سب کے لیے الفاظ (اختیاری)'}"><button class="tb" data-act="savePtext">💾</button></div>
      <div class="tools"><b>🤖 Claude</b><button class="tb pri" data-act="cCopy">📋 ${E ? 'Text + image' : 'متن + تصویر'}</button>
        <button class="tb" data-act="cShare">📤</button><button class="tb" data-act="cText">📝</button><button class="tb" data-act="cImg">🖼️</button></div>
    </details></div>`;
}
/* منظوری: مشورہ (کام کریں؟) یا Claude کا تیار کام (لائیو کریں؟) */
function holdBox(i) {
  const E = LANG === 'en';
  if (i.hold === 'decide' && decided(i)) return `<div class="hold ok">✅ ${E ? 'Approved — work has started' : 'منظور — کام شروع ہو چکا ہے'}</div>`;
  if (i.hold === 'decide') return `<div class="hold"><b>💡 ${E ? 'Waiting for your decision: work on this suggestion?' : 'آپ کے فیصلے کا منتظر: اس مشورے پر کام کریں؟'}</b>
    <div class="tools"><button class="tb grn" data-act="hold" data-id="go">✅ ${E ? 'Yes, work on it' : 'ہاں، کام کریں'}</button>
    <button class="tb red" data-act="hold" data-id="no">❌ ${E ? 'Not now' : 'ابھی نہیں'}</button></div></div>`;
  if (i.hold === 'approve') return `<div class="hold"><b>⏳ ${E ? 'Ready — waiting for your approval to go live' : 'کام تیار ہے — لائیو کرنے کے لیے آپ کی منظوری کا منتظر'}</b>
    ${i.review ? `<div style="white-space:pre-wrap;font-size:14.5px;margin-top:4px">${esc(i.review)}</div>` : ''}
    <div class="tools">${i.pr ? `<a class="tb" href="${esc(i.pr)}" target="_blank" rel="noopener">🔗 ${E ? 'See changes' : 'تبدیلی دیکھیں'}</a>` : ''}
    <button class="tb grn" data-act="hold" data-id="merge">✅ ${E ? 'Approve — go live' : 'منظور — لائیو کریں'}</button>
    <button class="tb red" data-act="hold" data-id="stop">❌ ${E ? 'Stop' : 'رکیں'}</button></div></div>`;
  if (i.hold === 'go') return `<div class="hold ok">✅ ${E ? 'Approved — Claude will work on it in the next review' : 'منظور — اگلے جائزے میں Claude اس پر کام کرے گا'}</div>`;
  if (i.hold === 'merge') return `<div class="hold ok">✅ ${E ? 'Approved to go live — goes live in the next review' : 'لائیو کی منظوری — اگلے جائزے میں لائیو ہو جائے گا'}</div>`;
  return '';
}
function claudeText(i, short) {
  const a = appOf(i.app), n = (i.metoo || []).length;
  const L = [`❓ PBT Help Desk — #${i.no}`,
    `App: ${a.en}${a.repo ? '  (repo: ' + a.repo + ')' : ''}`,
    i.ver ? `App version: ${i.ver}` : null,
    `Type: ${DICT[i.type][1]} · Status: ${DICT['s_' + i.status][1]}${n ? ' · 👋 ' + (n + 1) + ' people' : ''}`,
    short ? null : `Customer: ${i.name} · ${i.phone}`,
    `Date: ${fullDate(i.created)}`,
    '', 'Customer wrote:', i.text || '(voice note only)',
    i.shots ? `\nScreenshots: ${i.shots}` : null, i.audio ? 'Voice note: yes (listen in Help Desk)' : null,
    i.reply ? `\nOur reply so far: ${i.reply}` : null];
  return L.filter(x => x !== null).join('\n').trim();
}
/* ایک لمبی تصویر: سر + متن + اسکرین شاٹ */
async function issueImage(i, shots) {
  try { await document.fonts.load('34px Noori'); } catch (e) {}
  const W = 1080, P = 44, a = appOf(i.app);
  const c = document.createElement('canvas'), x = c.getContext('2d');
  const font = '34px Noori, "Noto Nastaliq Urdu", sans-serif';
  const rtl = /[؀-ۿ]/.test(i.text || '');
  x.font = font;
  const wrap = t => { const out = []; String(t || '').split('\n').forEach(p => { let line = ''; p.split(/\s+/).forEach(w => { const tt = line ? line + ' ' + w : w; if (x.measureText(tt).width > W - 2 * P && line) { out.push(line); line = w; } else line = tt; }); out.push(line); }); return out; };
  const lines = wrap(i.text || '🎤');
  const ims = []; for (const s of shots) { try { ims.push(await loadImg(s.data)); } catch (e) {} }
  const sh = ims.map(im => Math.round(im.naturalHeight * Math.min(1, (W - 2 * P) / im.naturalWidth)));
  const H = 190 + lines.length * 64 + 40 + sh.reduce((s, h) => s + h + 24, 0) + 40;
  c.width = W; c.height = Math.min(H, 16000);
  x.fillStyle = '#fff'; x.fillRect(0, 0, W, c.height);
  const g = x.createLinearGradient(0, 0, W, 160); g.addColorStop(0, '#1e3a8a'); g.addColorStop(1, '#0f766e');
  x.fillStyle = g; x.fillRect(0, 0, W, 160);
  x.fillStyle = '#fff'; x.font = 'bold 44px Arial'; x.textAlign = 'left'; x.direction = 'ltr';
  x.fillText('PBT Help Desk  #' + i.no, P, 70);
  x.font = '30px Arial'; x.fillText(a.en + (i.ver ? '  ·  ' + i.ver : '') + '  ·  ' + DICT[i.type][1] + '  ·  ' + fullDate(i.created), P, 122);
  x.fillStyle = '#13203f'; x.font = font; x.direction = rtl ? 'rtl' : 'ltr'; x.textAlign = rtl ? 'right' : 'left';
  let y = 230; lines.forEach(l => { x.fillText(l, rtl ? W - P : P, y); y += 64; });
  y += 10;
  ims.forEach((im, k) => { const w = Math.min(W - 2 * P, im.naturalWidth); x.drawImage(im, (W - w) / 2, y, w, sh[k]); x.strokeStyle = '#e3e8f2'; x.strokeRect((W - w) / 2, y, w, sh[k]); y += sh[k] + 24; });
  return new Promise(r => c.toBlob(r, 'image/png'));
}
async function ensureBlobs() { if (DET && DET.blobs == null) DET.blobs = await Store.blobs(DET.id); return (DET.blobs || []).filter(b => b.kind === 'shot'); }
async function claudeAct(kind) {
  const i = ISSUES.find(x => x.id === DET.id); if (!i) return;
  const txt = claudeText(i);
  const ok = m => toast('✅ ' + m, 3000);
  try {
    if (kind === 'cText') { await navigator.clipboard.writeText(txt); return ok(LANG === 'en' ? 'Text copied — paste in Claude' : 'متن کاپی ہو گیا — Claude میں پیسٹ کریں'); }
    busy(true);
    const shots = await ensureBlobs();
    const png = await issueImage(i, shots);
    busy(false);
    if (kind === 'cImg') return download(png, 'HelpDesk-' + i.no + '.png');
    if (kind === 'cShare') {
      const files = [new File([png], 'HelpDesk-' + i.no + '.png', { type: 'image/png' })];
      if (navigator.canShare && navigator.canShare({ files })) return await navigator.share({ files, text: txt, title: 'Help Desk #' + i.no });
      if (navigator.share) return await navigator.share({ text: txt });
      return download(png, 'HelpDesk-' + i.no + '.png');
    }
    // cCopy: ایک ہی بار میں متن + تصویر
    try {
      await navigator.clipboard.write([new ClipboardItem({ 'text/plain': new Blob([txt], { type: 'text/plain' }), 'image/png': png })]);
      ok(LANG === 'en' ? 'Text + image copied — paste in Claude' : 'متن + تصویر کاپی — Claude میں پیسٹ کریں');
    } catch (e) {
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': png })]);
      ok(LANG === 'en' ? 'Image copied (text: use «Text only»)' : 'تصویر کاپی — متن کے لیے «صرف متن»');
    }
  } catch (e) { busy(false); if (e && e.name !== 'AbortError') { try { await navigator.clipboard.writeText(txt); ok(LANG === 'en' ? 'Text copied' : 'متن کاپی ہو گیا'); } catch (_) { toast('⚠️ ' + (e.message || e)); } } }
}
/* HD0211MO021 (ہیلپ ڈیسک #16، مالک کا حکم): حل شدہ مسئلے کی خوبصورت پوسٹ — مسئلہ، 100% پٹی، جواب، «لائیو — ایپ تازہ کریں» — سیدھی گاہک کی واٹس ایپ چیٹ میں */
async function solvedPoster(i) {
  try { await document.fonts.load('40px Noori'); await document.fonts.load('40px NooriK'); } catch (e) {}
  const en = (i.lang || 'ur') === 'en', a = appOf(i.app), W = 1080, P = 56;
  const c = document.createElement('canvas'), x = c.getContext('2d');
  const UF = n => `${n}px Noori, "Noto Nastaliq Urdu", serif`, EF = (n, b) => `${b ? 'bold ' : ''}${n}px system-ui, Arial, sans-serif`;
  const tf = (n, b) => en ? EF(n, b) : UF(n);
  const wrapW = (t, f, w, max) => { x.font = f; const out = []; String(t || '').split('\n').forEach(p => { let line = ''; p.split(/\s+/).forEach(wd => { const tt = line ? line + ' ' + wd : wd; if (x.measureText(tt).width > w && line) { out.push(line); line = wd; } else line = tt; }); if (line) out.push(line); }); if (max && out.length > max) { out.length = max; out[max - 1] += ' …'; } return out; };
  const isRtl = t => /[\u0600-\u06FF]/.test(t || '');
  const L = en ? { t: '✅ Your request is solved', y: 'Your request', r: 'Our reply', d: 'Solved — new update is live', u: '🔄 Refresh the app once — the new version loads by itself', f: 'Software for every business — mobile, Windows, Android, Chromebook — PBT Code Labs' }
    : { t: '✅ آپ کا مسئلہ حل ہو گیا', y: '📝 آپ کا مسئلہ', r: '💬 ہمارا جواب', d: 'حل ہو گیا — نئی اپڈیٹ لائیو ہے', u: '🔄 ایپ ایک بار تازہ کر لیں — نیا ورژن خود آ جائے گا', f: 'ہر کاروبار کا سافٹ ویئر — موبائل، ونڈوز، اینڈرائیڈ، کروم بک — پی بی ٹی کوڈ لیبز' };
  const qF = isRtl(i.text) ? UF(36) : EF(34), rF = isRtl(i.reply) ? UF(36) : EF(34);
  const q = wrapW(i.text || '🎤', qF, W - 2 * P - 40, 9), r = wrapW(i.reply || (en ? 'Done.' : 'ہو گیا۔'), rF, W - 2 * P - 40, 12);
  const LH = 66, hH = 250, qH = 90 + q.length * LH, pH = 210, rH = 90 + r.length * LH, uH = 110, fH = 150;
  const H = hH + 40 + qH + 30 + pH + 30 + rH + 30 + uH + 40 + fH;
  c.width = W; c.height = H;
  const rr = (X, Y, w, h, rad) => { x.beginPath(); x.moveTo(X + rad, Y); x.arcTo(X + w, Y, X + w, Y + h, rad); x.arcTo(X + w, Y + h, X, Y + h, rad); x.arcTo(X, Y + h, X, Y, rad); x.arcTo(X, Y, X + w, Y, rad); x.closePath(); };
  const T = (t, X, Y, f, col, align) => { x.font = f; x.fillStyle = col; x.textAlign = align; x.direction = isRtl(t) ? 'rtl' : 'ltr'; x.fillText(t, X, Y); };
  const side = en ? 'left' : 'right', SX = en ? P + 30 : W - P - 30;
  x.fillStyle = '#f1f5f9'; x.fillRect(0, 0, W, H);
  let g = x.createLinearGradient(0, 0, W, hH); g.addColorStop(0, '#1e3a8a'); g.addColorStop(1, '#0f766e'); x.fillStyle = g; x.fillRect(0, 0, W, hH);
  try { if (a.img) { const im = await loadImg(a.img); const ix = en ? W - P - 130 : P; x.save(); rr(ix, 60, 130, 130, 30); x.clip(); x.fillStyle = '#fff'; x.fillRect(ix, 60, 130, 130); x.drawImage(im, ix, 60, 130, 130); x.restore(); } } catch (e) {}
  T(L.t, en ? P : W - P, 120, en ? EF(56, 1) : 'bold 62px NooriK, Noori, serif', '#fff', side);
  T(`PBT Help Desk  ·  ${en ? a.en : a.ur}  ·  #${i.no}`, en ? P : W - P, 190, en ? EF(32) : UF(34), 'rgba(255,255,255,.88)', side);
  let y = hH + 40;
  const card = (h, fill, stroke) => { x.save(); x.shadowColor = 'rgba(15,23,42,.12)'; x.shadowBlur = 24; x.shadowOffsetY = 6; rr(P, y, W - 2 * P, h, 28); x.fillStyle = fill; x.fill(); x.restore(); if (stroke) { rr(P, y, W - 2 * P, h, 28); x.strokeStyle = stroke; x.lineWidth = 3; x.stroke(); } };
  card(qH, '#fff', '#dbeafe'); T(L.y, SX, y + 62, tf(38, 1), '#1e3a8a', side);
  q.forEach((l, k) => T(l, isRtl(l) ? W - P - 30 : P + 30, y + 130 + k * LH, qF, '#334155', isRtl(l) ? 'right' : 'left')); y += qH + 30;
  card(pH, '#ecfdf5', '#6ee7b7');
  T('✅ ' + L.d, SX, y + 66, tf(38, 1), '#047857', side); T('100%', en ? W - P - 30 : P + 30, y + 66, EF(46, 1), '#047857', en ? 'right' : 'left');
  rr(P + 30, y + 92, W - 2 * P - 60, 26, 13); x.fillStyle = '#10b981'; x.fill();
  for (let k = 0; k < 7; k++) { const cx = P + 70 + k * ((W - 2 * P - 140) / 6); x.beginPath(); x.arc(cx, y + 165, 24, 0, 7); x.fillStyle = '#10b981'; x.fill(); T('✓', cx, y + 176, EF(30, 1), '#fff', 'center'); }
  y += pH + 30;
  card(rH, '#fff', '#c7d2fe'); T(L.r, SX, y + 62, tf(38, 1), '#4338ca', side);
  r.forEach((l, k) => T(l, isRtl(l) ? W - P - 30 : P + 30, y + 130 + k * LH, rF, '#1f2937', isRtl(l) ? 'right' : 'left')); y += rH + 30;
  card(uH, '#fffbeb', '#fcd34d'); T(L.u, W / 2, y + 70, tf(36, 1), '#92400e', 'center'); y += uH + 40;
  g = x.createLinearGradient(0, y, W, H); g.addColorStop(0, '#0f172a'); g.addColorStop(1, '#1e3a8a'); x.fillStyle = g; x.fillRect(0, y, W, H - y);
  T(L.f, W / 2, y + 62, en ? EF(26) : UF(30), '#e2e8f0', 'center');
  T('📞 0320 6793793  ·  pbtcodelabs-pbt.github.io', W / 2, y + 112, EF(30, 1), '#fde68a', 'center');
  return new Promise(res => c.toBlob(res, 'image/png'));
}
let POSTER = null;
async function posterSheet(id) {
  const i = ISSUES.find(x => x.id === id); if (!i) return;
  const E = LANG === 'en';
  busy(true); let png; try { png = await solvedPoster(i); } finally { busy(false); }
  if (POSTER && POSTER.url) URL.revokeObjectURL(POSTER.url);
  POSTER = { id, png, url: URL.createObjectURL(png) };
  sheet(`<h2>🖼️ ${E ? 'Solved post' : 'حل کی پوسٹ'} — #${i.no}<button class="x" data-act="close">✕</button></h2>
    <img src="${POSTER.url}" alt="" style="width:100%;max-width:520px;display:block;margin:0 auto;border-radius:16px;box-shadow:var(--sh)">
    ${i.status !== 'done' ? `<p style="color:#b45309;font-size:13px">⚠️ ${E ? 'This request is not marked solved yet' : 'یہ مسئلہ ابھی «حل ہو گیا» پر نہیں'}</p>` : ''}
    <button class="bigBtn" style="background:linear-gradient(135deg,#16a34a,#15803d);margin-top:12px" data-act="posterWa" data-id="${i.id}">💬 ${E ? 'Open' : ''} ${esc(i.name || '')} ${E ? 'WhatsApp chat (image copied — paste)' : 'کی واٹس ایپ چیٹ — تصویر کاپی، وہاں پیسٹ کریں'}</button>
    <div class="tools" style="justify-content:center"><button class="tb grn" data-act="posterShare" data-id="${i.id}">📤 ${E ? 'Share image' : 'تصویر شیئر'}</button>
      <button class="tb" data-act="posterSave" data-id="${i.id}">⬇️ ${E ? 'Save' : 'محفوظ'}</button></div>`);
}
// HD0311TU023 (مالک کا حکم): مالک / ڈویلپر کا اپنا مسئلہ ہو تو نام اور «جناب» نہیں — یہی پیغام وہ آگے کسی کو بھیجتے ہیں؛ گاہک کو نام کے ساتھ سلام
const isOwnIssue = i => i.uid === 's6L0FAs6krVDRAHKf70ggM3LamH2' || i.dev === 'claude-chat' || waNum(i.phone || '').endsWith('3206793793');
const greetName = i => isOwnIssue(i) ? '' : (i.name || '').trim();
function posterMsg(i) {
  const a = appOf(i.app), n = greetName(i);
  if (isOwnIssue(i)) return (i.lang || 'ur') === 'en' ? `Your request #${i.no} (${a.en}) has been solved ✅ — details in the picture. Please refresh the app once. — PBT Code Labs`
    : `آپ کا مسئلہ #${i.no} (${a.ur}) حل کر دیا گیا ہے ✅ — تفصیل تصویر میں ہے۔ ایپ ایک بار تازہ کر لیں۔ — پی بی ٹی کوڈ لیبز`;
  return (i.lang || 'ur') === 'en' ? `Assalam o Alaikum ${n}! Your request #${i.no} (${a.en}) is solved ✅ — details in the picture. Please refresh the app once. Thank you — PBT Code Labs`
    : `السلام علیکم ${n}! آپ کا مسئلہ #${i.no} (${a.ur}) حل ہو گیا ✅ — تفصیل تصویر میں ہے۔ ایپ ایک بار تازہ کر لیں۔ شکریہ — پی بی ٹی کوڈ لیبز`;
}
async function posterAct(kind, id) {
  const i = ISSUES.find(x => x.id === id); if (!i || !POSTER || POSTER.id !== id) return;
  const E = LANG === 'en', name = 'PBT-HelpDesk-' + i.no + '.png';
  try {
    if (kind === 'posterSave') return download(POSTER.png, name);
    if (kind === 'posterShare') {
      const files = [new File([POSTER.png], name, { type: 'image/png' })];
      if (navigator.canShare && navigator.canShare({ files })) await navigator.share({ files, text: posterMsg(i) }); else download(POSTER.png, name);
    } else {
      let copied = false;
      try { await navigator.clipboard.write([new ClipboardItem({ 'image/png': POSTER.png })]); copied = true; } catch (e) {}
      toast(copied ? (E ? '📋 Image copied — paste it in the chat' : '📋 تصویر کاپی — چیٹ میں پیسٹ کر دیں') : (E ? 'Saving image — attach it in the chat' : 'تصویر محفوظ ہو رہی ہے — چیٹ میں لگا دیں'), 5000);
      if (!copied) download(POSTER.png, name);
      window.open('https://wa.me/' + waNum(i.phone) + '?text=' + encodeURIComponent(posterMsg(i)), '_blank');
    }
    Store.update(i.id, { notified: sig(i) }).catch(() => {});
  } catch (e) { if (e && e.name !== 'AbortError') toast('⚠️ ' + (e.message || e)); }
}
function download(blob, name) { const u = URL.createObjectURL(blob); const l = document.createElement('a'); l.href = u; l.download = name; document.body.appendChild(l); l.click(); l.remove(); setTimeout(() => URL.revokeObjectURL(u), 4000); }
function notifyWA(i) {
  const a = appOf(i.app), link = location.origin + location.pathname + '#/i/' + i.id;
  const ur = (i.lang || 'ur') !== 'en';
  const m = ur
    ? `${isOwnIssue(i) ? '' : `السلام علیکم ${greetName(i)}!\n`}PBT Help Desk — ${a.ur} — آپ کا مسئلہ #${i.no}: ${ST_IC[i.status]} ${DICT['s_' + i.status][0]}\n\n${i.reply || ''}\n\nتفصیل: ${link}\n\nشکریہ — PBT Code Labs`
    : `${isOwnIssue(i) ? '' : `Assalam o Alaikum ${greetName(i)}!\n`}PBT Help Desk — ${a.en} — your request #${i.no}: ${ST_IC[i.status]} ${DICT['s_' + i.status][1]}\n\n${i.reply || ''}\n\nDetails: ${link}\n\nThank you — PBT Code Labs`;
  window.open('https://wa.me/' + waNum(i.phone) + '?text=' + encodeURIComponent(m), '_blank');
}

/* پاپ اپ */
function sheet(html, keepScroll) {
  const sh = $('#sheet'), top = sh.scrollTop;
  sh.innerHTML = '<div class="grab"></div>' + html; $('#ov').classList.add('on');
  if (keepScroll) sh.scrollTop = top;
}
function closeSheet() { const vd = document.querySelector('#sheet video'); if (vd) vd.pause(); $('#ov').classList.remove('on'); DET = null; }
function loginSheet() {
  const first = Store.ownerFirst(), E = LANG === 'en';
  sheet(`<h2>🛠️ ${E ? 'Developer' : 'ڈویلپر'}<button class="x" data-act="close">✕</button></h2>
    <p style="color:var(--mut);font-size:14px;margin:0">${first ? (E ? 'Create a password for this phone' : 'اس فون کے لیے پاس ورڈ بنائیں') : (E ? 'Enter password' : 'پاس ورڈ لکھیں')}</p>
    <div class="inpRow" style="margin:10px 0"><input class="inp ltr" type="password" id="pw" autocomplete="current-password"><button class="tb" data-act="eye">👁️</button></div>
    <button class="bigBtn blue" data-act="login">🔓 ${E ? 'Open' : 'کھولیں'}</button>`);
  setTimeout(() => $('#pw') && $('#pw').focus(), 100);
}
function settingsSheet() {
  const E = LANG === 'en';
  sheet(`<h2>⚙️ ${E ? 'Settings' : 'سیٹنگ'}<button class="x" data-act="close">✕</button></h2>
    <label class="lbl">🕘 ${T('hours')} (اردو)</label><input class="inp" id="hUr" value="${esc(CFG.hoursUr || '')}" placeholder="${DICT.hoursDef[0]}">
    <label class="lbl">🕘 ${T('hours')} (English)</label><input class="inp" id="hEn" value="${esc(CFG.hoursEn || '')}" placeholder="${DICT.hoursDef[1]}" dir="ltr">
    <label class="lbl">🧹 ${E ? 'Remove solved after (days)' : 'حل شدہ کتنے دن بعد خود ہٹیں'}</label><input class="inp ltr" id="kDays" inputmode="numeric" value="${keepDays()}">
    <button class="bigBtn blue" style="margin-top:14px" data-act="saveCfg">💾 ${E ? 'Save' : 'محفوظ'}</button>
    <div class="card" style="box-shadow:none;background:var(--soft)">
      <b>🔗 ${E ? 'Link for customers' : 'گاہکوں کے لیے لنک'}</b>
      <div class="num" style="font-size:13.5px;word-break:break-all">${esc(location.origin + location.pathname)}</div>
      <div class="tools"><button class="tb" data-act="copyLink">📋 ${E ? 'Copy' : 'کاپی'}</button><button class="tb" data-act="shareLink">💬 WhatsApp</button></div>
      <p style="font-size:12.5px;color:var(--mut);margin:6px 0 0">${E ? 'From inside an app:' : 'کسی ایپ کے اندر سے:'} <span class="num">…/help/?app=SM&amp;v=SM0111SU300</span></p></div>
    ${Store.mode === 'cloud' ? `<div class="card" style="box-shadow:none;background:#fff7ed;border:1px solid #fdba74">
      <b>🔑 ${E ? 'Change password' : 'پاس ورڈ بدلیں'}</b>
      <p style="font-size:12.5px;color:var(--mut);margin:2px 0 6px">${E ? 'Use a password different from your Gmail.' : 'جی میل والا پاس ورڈ نہ رکھیں — نیا الگ پاس ورڈ۔'}</p>
      <label class="lbl">${E ? 'Current password' : 'موجودہ پاس ورڈ'}</label><input class="inp ltr" type="password" id="pwOld" autocomplete="current-password">
      <label class="lbl">${E ? 'New password (8+)' : 'نیا پاس ورڈ (کم از کم 8)'}</label><input class="inp ltr" type="password" id="pwNew" autocomplete="new-password">
      <label class="lbl">${E ? 'New password again' : 'نیا پاس ورڈ دوبارہ'}</label><input class="inp ltr" type="password" id="pwNew2" autocomplete="new-password">
      <div class="tools"><button class="tb pri" data-act="chPw">🔑 ${E ? 'Change' : 'بدلیں'}</button><button class="tb" data-act="pwEye">👁️</button></div></div>` : ''}
    ${Store.mode === 'demo' ? `<button class="tb red" data-act="wipe">🧪 ${E ? 'Clear demo data' : 'ڈیمو ڈیٹا مٹائیں'}</button>` : ''}`);
}

/* ---------- رینڈر ---------- */
function render() {
  header();
  const V = { home: vHome, app: vApp, new: vForm, thanks: vThanks, mine: vMine, i: vOne, owner: vOwner, party: vParty }[R.v] || vHome;
  $('#main').innerHTML = V();
  if (R.v === 'new' && F && F.acct) { setTimeout(acctSend, 300); }
  else if (R.v === 'new') { bindForm(); const ft = $('#fText'); if (ft && ft.value) { ft.style.height = 'auto'; ft.style.height = Math.min(ft.scrollHeight + 4, Math.round(innerHeight * 0.6)) + 'px'; } }
  if (DET && $('#ov').classList.contains('on')) sheet(detailHTML(), true);
}
let rT = 0;
function softRender() {
  // لکھتے وقت پوری اسکرین نہ بدلے
  const a = document.activeElement;
  if (R.v === 'new' || (a && /^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName))) { clearTimeout(rT); rT = setTimeout(softRender, 1500); return; }
  const y = window.scrollY; render(); window.scrollTo(0, y);
}
// HD0311TU034 (مالک کا حکم): لکھے بغیر نہ اسکرین شاٹ نہ آواز — پہلے اوپر والے خانے میں مسئلہ
function needText() {
  if (F && F.text.trim().length >= 3) return false;
  const e = $('#eText'); if (e) e.classList.add('on');
  const t = $('#fText'); if (t) { t.scrollIntoView({ behavior: 'smooth', block: 'center' }); setTimeout(() => t.focus(), 300); t.classList.add('need'); setTimeout(() => t.classList.remove('need'), 1600); }
  toast(T('errText'), 5000);
  return true;
}
function bindForm() {
  const fi = $('#fileIn'); fi.onchange = () => { addShots([...fi.files]); fi.value = ''; };
  const ci = $('#camIn'); ci.onchange = () => { addShots([...ci.files]); ci.value = ''; };
  const d = $('#drop');
  d.ondragover = e => { e.preventDefault(); d.classList.add('over'); };
  d.ondragleave = () => d.classList.remove('over');
  d.ondrop = e => { e.preventDefault(); d.classList.remove('over'); addShots([...e.dataTransfer.files]); };
}

/* ---------- واقعات ---------- */
let taps = 0, tapT = 0;
document.addEventListener('click', async e => {
  const v = e.target.closest('[data-view]'); if (v && F) { showImg(F.shots[+v.dataset.view]); return; }
  const vs = e.target.closest('[data-viewsrc]'); if (vs) { showImg(vs.src); return; }
  const t = e.target.closest('[data-act]'); if (!t) { if (e.target.id === 'ov') closeSheet(); return; }
  const act = t.dataset.act, id = t.dataset.id;
  switch (act) {
    case 'lang': setLang(LANG === 'en' ? 'ur' : 'en'); break;
    case 'back': if (EMBED || history.length <= 1) go(R.v === 'app' ? '#/' : (R.v === 'new' ? '#/app/' + encodeURIComponent(R.a) : '#/')); else history.back(); break;
    case 'rank': rankSheet(id); break;
    case 'ownPick': { const [iid, k] = id.split('|'); const i = ISSUES.find(x => x.id === iid); if (!i) break;
      const p = k === 'now' ? { urgent: true, stage: 'claude', stageAt: Date.now(), cAt: Date.now(), hold: '' } : k === 'draft' ? { urgent: false, stage: '', hold: 'draft' } : { urgent: false, stage: '', hold: '' };
      Object.assign(i, p); document.querySelectorAll(`[data-urgbox="${i.id}"]`).forEach(b => { b.outerHTML = urgSwitch(i); });
      try { await Store.update(i.id, p); } catch (e) { toast('⚠️ ' + (e.message || e), 4000); break; }
      toast(k === 'now' ? '⚡ ✅' : k === 'draft' ? '📝 ✅' : '⏭️ ✅'); break; }
    case 'apprOpen': apprSheet(); break;
    case 'apView': openDetail(id); break;
    case 'apGo': case 'apNext': { const i = ISSUES.find(x => x.id === id); if (!i) break;
      const p = i.hold === 'approve' ? { hold: 'merge' } : act === 'apGo' ? { hold: 'go', urgent: true, stage: 'claude', stageAt: Date.now(), cAt: Date.now(), status: i.status === 'new' ? 'seen' : i.status } : { hold: 'go' };
      try { await Store.update(i.id, p); Object.assign(i, p); } catch (e) { toast('⚠️ ' + (e.message || e), 4000); break; }
      toast(act === 'apGo' ? (LANG === 'en' ? '✅ Approved — work starts now' : '✅ منظور — کام ابھی شروع') : (LANG === 'en' ? '⏭️ Will be done in the next review' : '⏭️ اگلے جائزے میں ہوگا'), 3500); apprSheet(); break; }
    case 'apAsk': { const b = document.getElementById('ask_' + id); if (b) { b.style.display = b.style.display === 'none' ? 'block' : 'none'; const ta = b.querySelector('textarea'); if (ta && b.style.display === 'block') ta.focus(); } break; }
    case 'apSend': { const i = ISSUES.find(x => x.id === id); const ta = document.querySelector('#ask_' + id + ' textarea'); const q = ((ta && ta.value) || '').trim(); if (!i) break;
      if (!q) { toast(LANG === 'en' ? 'Write your question first' : 'پہلے سوال لکھیں'); if (ta) ta.focus(); break; }
      const p = { hold: 'info', reply: q, replyAt: Date.now(), urgent: false, status: i.status === 'new' ? 'seen' : i.status };
      try { await Store.update(i.id, p); Object.assign(i, p); } catch (e) { toast('⚠️ ' + (e.message || e), 4000); break; }
      toast(LANG === 'en' ? '📨 Sent — the customer sees your question' : '📨 بھیج دیا — گاہک کو آپ کا سوال نظر آ رہا ہے', 4000); apprSheet(); break; }
    case 'apDel': { if (!confirm(LANG === 'en' ? 'Delete this issue permanently?' : 'یہ مسئلہ ہمیشہ کے لیے حذف کریں؟')) break;
      try { await Store.remove(id); ISSUES = ISSUES.filter(x => x.id !== id); } catch (e) { toast('⚠️ ' + (e.message || e), 4000); break; } toast('🗑️ ✅'); apprSheet(); break; }
    case 'urgent': {
      const i = ISSUES.find(x => x.id === (id || (DET && DET.id))); if (!i) break;
      const on = !i.urgent;
      i.urgent = on; // فوراً رنگ بدلے (فائربیس کا انتظار نہیں)
      i.stage = on ? 'sent' : ''; i.stageAt = Date.now();
      document.querySelectorAll(`[data-urgbox="${i.id}"]`).forEach(b => { b.outerHTML = urgSwitch(i); });
      if (on) document.querySelectorAll(`[data-urgbox="${i.id}"] .urgSw`).forEach(b => { b.classList.add('burst'); setTimeout(() => b.classList.remove('burst'), 1600); });
      const hp = on && i.hold === 'decide' ? { hold: 'go' } : {}; Object.assign(i, hp);   // HD0511TH051: ⚡ = منظوری
      try { await Store.update(i.id, Object.assign({ urgent: on, stage: i.stage, stageAt: i.stageAt }, hp)); } catch (e) { i.urgent = !on; toast('⚠️ ' + (e.message || e), 4000); break; }
      if (on) setTimeout(() => urgSheet(i), 1100); else toast(LANG === 'en' ? '⏸️ Urgent off — it will be done in the next round (11 AM / 8:30 PM)' : '⏸️ فوری بند — اب یہ اگلی باری (صبح 11 / رات ساڑھے 8 بجے) میں ہوگا', 4000);
      break; }
    case 'urgRetry': { const i = ISSUES.find(x => x.id === id); if (!i) break;
      document.querySelectorAll(`.rsBtn[data-id="${i.id}"],.rsCorner[data-id="${i.id}"]`).forEach(b => b.classList.add('go'));
      i.urgent = true; i.stage = 'claude'; i.stageAt = Date.now(); i.cAt = i.cAt || Date.now();
      const hp = i.hold === 'decide' || i.hold === 'draft' ? { hold: 'go' } : {}; Object.assign(i, hp);
      try { await Store.update(i.id, Object.assign({ urgent: true, stage: 'claude', stageAt: i.stageAt, cAt: i.cAt }, hp)); } catch (e) { toast('⚠️ ' + (e.message || e), 4000); document.querySelectorAll('.rsBtn.go,.rsCorner.go').forEach(b => b.classList.remove('go')); break; }
      try { await navigator.clipboard.writeText(urgMsg(i)); } catch (e) {}
      setTimeout(() => { document.querySelectorAll(`[data-urgbox="${i.id}"]`).forEach(b => { b.outerHTML = urgSwitch(i); }); }, 1400);
      setTimeout(() => { document.querySelectorAll('.rsBtn.go,.rsCorner.go').forEach(b => b.classList.remove('go')); }, 1600);
      toast(LANG === 'en' ? '🔄 Restarted — line copied, paste it in the Claude chat and send' : '🔄 دوبارہ چالو — لائن کاپی ہو گئی، Claude کی چیٹ میں پیسٹ کر کے بھیج دیں', 6000);
      setTimeout(() => window.open(CLAUDE_CHAT, '_blank'), 1200);
      break; }
    case 'urgTell': { const i = ISSUES.find(x => x.id === id); if (!i) break; if (!i.cAt) Store.update(i.id, { cAt: Date.now() }).catch(() => {});
      const msg = urgMsg(i);
      try { await navigator.clipboard.writeText(msg); } catch (e) {}
      if (urgStage(i) === 'sent') { try { await Store.update(i.id, { stage: 'claude', stageAt: Date.now() }); } catch (e) {} }
      toast(LANG === 'en' ? '📋 Copied — paste it in the Claude chat and send' : '📋 کاپی ہو گیا — Claude کی چیٹ میں پیسٹ کر کے بھیج دیں', 6000);
      setTimeout(() => window.open(CLAUDE_CHAT, '_blank'), 700);
      break; }
    case 'vplay': playVideo(id); break;
    case 'vshare': shareVideo(id); break;
    case 'copyPost': try { await navigator.clipboard.writeText(POST_TEXT); toast('📋 ✅'); } catch (_) { toast('⚠️'); } break;
    case 'oapp': O.app = id; O.tab = ISSUES.some(i => i.app === id && i.status === 'new') ? 'new' : 'open'; go('#/owner'); break;
    case 'app': appTab = 'open'; appQ = ''; go('#/app/' + encodeURIComponent(id)); break;
    case 'mine': go('#/mine'); break;
    case 'ownMine': go('#/mine/' + id); break;
    case 'parties': go('#/party'); break;
    case 'party': go('#/party/' + encodeURIComponent(id)); break;
    case 'new': go('#/new/' + encodeURIComponent(id)); break;
    case 'atab': appTab = id; render(); break;
    case 'expand': t.classList.toggle('clamp'); break;
    case 'metoo': {
      const i = ISSUES.find(x => x.id === id); if (!i) break;
      const on = !(i.metoo || []).includes(DEV);
      t.classList.add('pop');
      await Store.metoo(id, DEV, on);
      if (on) toast(LANG === 'en' ? '👋 Added — we will prioritise it' : '👋 شامل ہو گیا — زیادہ لوگوں والا مسئلہ پہلے حل ہوتا ہے');
      break;
    }
    case 'withdraw': if (confirm(T('delMineQ'))) await Store.remove(id); break;
    /* HD0811SU056 (مالک کا حکم، ہیلپ ڈیسک #144): «تجویز کردہ مسائل» کی فہرست سے سیدھا حذف — تنبیہ + تصدیق */
    case 'ownDel': { const x = ISSUES.find(y => y.id === id); if (!x || !Store.isOwner()) break; const E = LANG === 'en';
      const ex = String(x.text || '').replace(/\s+/g, ' ').slice(0, 90);
      if (!confirm((E ? '⚠️ Delete #' + x.no + ' permanently?\n\n' : '⚠️ کیا #' + x.no + ' ہمیشہ کے لیے حذف کر دیں؟\n\n') + ex + (E ? '\n\nThis cannot be undone.' : '\n\nیہ واپس نہیں آئے گا — تصویریں اور آواز بھی مٹ جائیں گی۔'))) break;
      try { await Store.remove(id); toast(E ? '🗑️ Deleted' : '🗑️ #' + x.no + ' حذف ہو گیا'); } catch (e) { alert(E ? 'Could not delete — try again' : 'حذف نہیں ہوا — دوبارہ کوشش کریں'); }
      render(); break; }
    case 'type': F.type = id; document.querySelectorAll('.ty').forEach(b => b.classList.toggle('on', b.dataset.id === id)); break;
    case 'pvText': pvTextSheet(); break;
    case 'acctSend': acctSend(); break;
    case 'copyAcct': { const i = ISSUES.find(x => x.id === DET.id); try { await navigator.clipboard.writeText(i.text || ''); toast('📋 ✅'); } catch (_) { toast('⚠️'); } break; }
    case 'pvEdit': { closeSheet(); const t = $('#fText'); if (t) { t.scrollIntoView({ block: 'center' }); setTimeout(() => { t.focus(); t.setSelectionRange(t.value.length, t.value.length); fitText(t); }, 200); } break; }
    case 'pasteText': { const s = await clipText(); if (s) { F.text = (F.text ? F.text + '\n' : '') + s; $('#fText').value = F.text; fitText($('#fText')); $('#cnt').textContent = F.text.length; toast('📋 ' + T('pasted')); } break; }
    case 'speak': toggleSpeak(); break;
    case 'gallery': $('#fileIn').click(); break;
    case 'camera': $('#camIn').click(); break;
    case 'embedClose': try { parent.postMessage({ pbthd: 'close' }, '*'); } catch (_) {} break;
    case 'pasteImg': { const b = await clipImages(); if (b.length) { await addShots(b.map(x => new File([x], 'p.png', { type: x.type }))); toast('📋 ' + T('pasted')); } break; }
    case 'rmShot': F.shots.splice(+id, 1); $('#shots').innerHTML = shotsHTML(); break;
    case 'rec': toggleRec(); break;
    case 'rmAudio': F.audio = null; F.audioMs = 0; $('#recBox').innerHTML = recHTML(); break;
    case 'pastePhone': { const s = await clipText(); if (s) { F.phone = normPhone(s); document.querySelector('[data-in=phone]').value = F.phone; } break; }
    case 'send': send(); break;
    case 'tap7': {
      const n = Date.now(); taps = n - tapT < 900 ? taps + 1 : 1; tapT = n;
      if (Store.isOwner() && taps >= 2 && act === 'tap7' && t.classList.contains('logo')) { taps = 0; go('#/owner'); break; }
      if (taps >= 7) { taps = 0; Store.isOwner() ? go('#/owner') : loginSheet(); }
      break;
    }
    case 'goOwner': go('#/owner'); break;
    case 'push': enablePush(); break;
    case 'eye': { const p = $('#pw'); p.type = p.type === 'password' ? 'text' : 'password'; break; }
    case 'login': {
      const pw = $('#pw').value; if (pw.length < 4) { toast(LANG === 'en' ? 'At least 4 characters' : 'کم از کم 4 حروف'); break; }
      if (await Store.ownerLogin(pw)) { closeSheet(); go('#/owner'); } else toast(LANG === 'en' ? '❌ Wrong password' : '❌ غلط پاس ورڈ');
      break;
    }
    case 'logout': Store.ownerLogout(); go('#/'); break;
    case 'settings': settingsSheet(); break;
    case 'pwEye': ['#pwOld', '#pwNew', '#pwNew2'].forEach(k => { const x = $(k); if (x) x.type = x.type === 'password' ? 'text' : 'password'; }); break;
    case 'chPw': {
      const E = LANG === 'en', o = $('#pwOld').value, n = $('#pwNew').value, n2 = $('#pwNew2').value;
      if (n.length < 8) { toast(E ? 'New password: at least 8 characters' : 'نیا پاس ورڈ کم از کم 8 حروف کا'); break; }
      if (n !== n2) { toast(E ? 'The two new passwords differ' : 'دونوں نئے پاس ورڈ ایک جیسے نہیں'); break; }
      if (n === o) { toast(E ? 'New password is the same as old' : 'نیا پاس ورڈ پرانے جیسا ہے'); break; }
      busy(true);
      try { await Store.changePassword(o, n); closeSheet(); toast(E ? '✅ Password changed — save it in Chrome' : '✅ پاس ورڈ بدل گیا — کروم میں محفوظ کر لیں', 5000); }
      catch (e) { toast(e.message === 'old' ? (E ? '❌ Current password is wrong' : '❌ موجودہ پاس ورڈ غلط ہے') : '⚠️ ' + (e.code || e.message), 5000); }
      busy(false); break;
    }
    case 'saveCfg': await Store.setCfg({ hoursUr: $('#hUr').value.trim(), hoursEn: $('#hEn').value.trim(), keepDays: Math.max(1, +digits($('#kDays').value) || 7) }); closeSheet(); toast('✅'); break;
    case 'copyLink': try { await navigator.clipboard.writeText(location.origin + location.pathname); toast('📋 ✅'); } catch (_) {} break;
    case 'shareLink': window.open('https://wa.me/?text=' + encodeURIComponent('السلام علیکم! PBT Code Labs کی کسی بھی ایپ میں مسئلہ ہو یا کوئی مشورہ دینا ہو تو یہاں لکھیں — جواب یہیں آئے گا:\n' + location.origin + location.pathname), '_blank'); break;
    case 'wipe': if (confirm('Demo data?')) { await Store.wipeDemo(); localStorage.removeItem('pbthd_demo_seeded'); closeSheet(); } break;
    case 'otab': O.tab = id; render(); break;
    case 'skip': if (SKIP.has(id)) SKIP.delete(id); else SKIP.add(id); render(); break;
    case 'limEdit': limSheet(id); break;
    case 'limSave': { const v = parseInt(digits($('#limPct').value).replace(/[^0-9]/g, ''), 10); if (isNaN(v) || v < 0 || v > 100) { toast('0 – 100'); break; }
      const lim = Object.assign({}, (PANEL && PANEL.lim) || {}); const sv = parseInt(digits($('#limSPct').value).replace(/[^0-9]/g, ''), 10);
      lim[id] = { pct: v, reset: $('#limReset').value.trim(), at: Date.now(), by: 'owner', s: isNaN(sv) ? ((lim[id] && lim[id].s) || null) : { pct: Math.max(0, Math.min(100, sv)), reset: $('#limSReset').value.trim(), at: Date.now() } };
      try { await Store.panelSave({ lim }); } catch (e) { toast('⚠️ ' + (e.message || e), 4000); break; }
      PANEL = Object.assign({}, PANEL, { lim }); closeSheet(); render(); toast('✅'); break; }
    case 'coDev': { const i = ISSUES.find(x => x.id === DET.id); if (!i || !i.phone) break; const h = await phHash(i.phone); PHH[i.phone] = h;
      const L = new Set((PANEL && PANEL.coDevH) || []); if (L.has(h)) L.delete(h); else L.add(h);
      try { await Store.panelSave({ coDevH: Array.from(L) }); } catch (e) { toast('⚠️ ' + (e.message || e), 4000); break; }
      PANEL = Object.assign({}, PANEL, { coDevH: Array.from(L) }); sheet(detailHTML(), true); render(); toast(L.has(h) ? '👨‍💻 ✓' : '✓'); break; }
    case 'open': openDetail(id); break;
    case 'close': closeSheet(); break;
    case 'setSt': {
      const p = { status: id }; if (id === 'done') p.doneAt = Date.now(); else p.doneAt = 0;
      await Store.update(DET.id, p); break;
    }
    case 'dup': {
      const n = prompt(LANG === 'en' ? 'Original request number (#)?' : 'اصل مسئلے کا نمبر (#)؟'); if (!n) break;
      const no = +digits(n).replace(/\D/g, ''); const orig = ISSUES.find(x => x.no === no);
      if (!orig) { toast('❌ #' + no); break; }
      const me = ISSUES.find(x => x.id === DET.id);
      await Store.update(DET.id, { status: 'dup', dupOf: no, doneAt: Date.now() });
      if (me && me.dev && me.dev !== orig.dev) await Store.metoo(orig.id, me.dev, true);
      toast('🔗 → #' + no); break;
    }
    case 'pasteReply': { const s = await clipText(); if (s) { const r = $('#rText'); r.value = (r.value ? r.value + '\n' : '') + s; } break; }
    case 'saveReply': case 'doneReply': {
      const r = $('#rText').value.trim(); const p = { reply: r, replyAt: r ? Date.now() : 0 };
      if (act === 'doneReply') { p.status = 'done'; p.doneAt = Date.now(); }
      await Store.update(DET.id, p); toast('✅ ' + (LANG === 'en' ? 'Saved — customer sees it now' : 'محفوظ — گاہک کو ابھی نظر آ گیا')); break;
    }
    case 'poster': posterSheet(id); break;
    case 'posterWa': case 'posterShare': case 'posterSave': posterAct(act, id); break;
    case 'notify': { const i = ISSUES.find(x => x.id === DET.id); if (i) { notifyWA(i); Store.update(i.id, { notified: sig(i) }); } break; }
    case 'hold': {
      const p = { hold: id };
      if (id === 'no') { const i = ISSUES.find(x => x.id === DET.id); p.status = 'done'; p.doneAt = Date.now(); if (i && !i.reply) { p.reply = i.lang === 'en' ? 'Thank you for the suggestion! We have noted it for the future.' : 'آپ کے مشورے کا شکریہ! اسے آئندہ کے لیے نوٹ کر لیا ہے۔'; p.replyAt = Date.now(); } }
      await Store.update(DET.id, p); toast('✅'); break;
    }
    case 'pub': await Store.update(DET.id, { pub: t.checked }); break;
    // ✏️ HD0311TU032 (مالک کا حکم): گاہک کا نامکمل پیغام مالک خود مکمل / درست کرے (آواز سن کر)؛ اصل پیغام `origText` میں محفوظ
    case 'editText': { try{ e.preventDefault(); }catch(_){} const b = $('#edTextBox'); if (b) { b.style.display = b.style.display === 'none' ? 'block' : 'none'; const ta = $('#edText'); if (ta && b.style.display === 'block') { ta.focus(); ta.setSelectionRange(ta.value.length, ta.value.length); } } break; }
    case 'pasteEdText': try { const t = await navigator.clipboard.readText(); const ta = $('#edText'); if (ta && t) ta.value = (ta.value.trim() ? ta.value.trimEnd() + '\n' : '') + t; } catch (_) { toast('⚠️'); } break;
    case 'saveEdText': {
      const i = ISSUES.find(x => x.id === DET.id); const v = ($('#edText').value || '').trim(); if (!i) break;
      if (!v) { toast(LANG === 'en' ? 'Message cannot be empty' : 'پیغام خالی نہیں ہو سکتا'); break; }
      if (v === (i.text || '')) { $('#edTextBox').style.display = 'none'; break; }
      const patch = { text: v, textEd: Date.now() }; if (i.origText == null) patch.origText = i.text || '';
      try { await Store.update(i.id, patch); Object.assign(i, patch); toast('✅'); sheet(detailHTML(), true); } catch (e) { toast('⚠️ ' + (e.message || e), 4000); }
      break; }
    case 'showOrig': { e.preventDefault(); const i = ISSUES.find(x => x.id === DET.id); if (i) alert((LANG === 'en' ? 'Original message from customer:\n\n' : 'گاہک کا اصل پیغام:\n\n') + (i.origText || '—')); break; }
    case 'savePtext': await Store.update(DET.id, { ptext: $('#pText').value.trim() }); toast('✅'); break;
    case 'cCopy': case 'cShare': case 'cText': case 'cImg': claudeAct(act); break;
    case 'park': { const i = ISSUES.find(x => x.id === DET.id); if (!i) break; const E = LANG === 'en', en = i.lang === 'en';
      if (id === 'info') {
        const def = en ? 'Thank you! Please tell us a little more: what exactly happens, on which screen, and what you expected. A screenshot helps. (Send it as a new message in Help Desk.)' : 'شکریہ! برائے مہربانی تھوڑا مزید بتائیں: بالکل کیا ہوتا ہے، کس صفحے پر، اور آپ کیا چاہتے ہیں — اسکرین شاٹ ہو تو اور اچھا۔ (ہیلپ ڈیسک میں نیا پیغام بھیج دیں)';
        const q = prompt(E ? 'Question for the customer (they see it as the reply):' : 'گاہک سے کیا پوچھنا ہے؟ (یہی جواب میں نظر آئے گا)', def); if (q == null) break;
        await Store.update(DET.id, { hold: 'info', reply: q.trim() || def, replyAt: Date.now(), urgent: false }); toast('❓ ✅');
      } else if (id === 'later') { await Store.update(DET.id, { hold: 'later', urgent: false }); toast('⏸️ ✅'); }
      else { await Store.update(DET.id, { hold: '' }); toast('▶️ ✅'); }
      break; }
    case 'cMain': { const id2 = DET.id; try { await claudeAct('cCopy'); } catch (_) {} await Store.update(id2, { cAt: Date.now() }); break; }   // HD0511TH044: ایک بار کاپی کے بعد بٹن غائب
    case 'acctDone': { const i = ISSUES.find(x => x.id === DET.id); if (!i) break; const en = i.lang === 'en';
      const r = /Ad request/.test(i.text || '') ? (en ? 'Your ad request has been received and set up.' : 'آپ کی اشتہار کی درخواست پر کام مکمل ہو گیا ہے۔') : (en ? 'Your account is ready — open the app and sign in.' : 'آپ کا اکاؤنٹ چالو ہو گیا ہے — ایپ کھول کر دیکھ لیں۔');
      await Store.update(DET.id, { status: 'done', doneAt: Date.now(), stage: 'done', stageAt: Date.now(), reply: i.reply || r, replyAt: Date.now() }); toast('✅'); closeSheet(); break; }
    case 'bulkClaude': {
      const l = ownFiltered().filter(bulkTodo); if (!l.length) break; const txt = l.map(i => claudeText(i, true)).join('\n\n────────\n\n');
      try { await navigator.clipboard.writeText(`PBT Help Desk — ${l.length} requests\n\n` + txt); toast('🤖 ✅ ' + l.length); } catch (_) { toast('⚠️'); }
      break;
    }
    case 'del': if (confirm(LANG === 'en' ? 'Delete permanently?' : 'ہمیشہ کے لیے حذف کریں؟')) { const id2 = DET.id; closeSheet(); await Store.remove(id2); } break;
  }
});
document.addEventListener('input', e => {
  const k = e.target.dataset.in;
  if (k && F) {
    F[k] = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    if (k === 'text') { $('#cnt').textContent = F.text.length; fitText(e.target); }
    if (k === 'app') { F.app = e.target.value; history.replaceState(null, '', '#/new/' + encodeURIComponent(F.app)); parse(); render(); }
  }
  const o = e.target.dataset.oin;
  if (o) { O[o] = e.target.value; if (o === 'q') { clearTimeout(rT); rT = setTimeout(() => { const el = document.activeElement; render(); const n = document.querySelector('[data-oin=q]'); if (n && el && el.dataset.oin === 'q') { n.focus(); n.setSelectionRange(n.value.length, n.value.length); } }, 250); } else render(); }
  if (e.target.id === 'appQ') { appQ = e.target.value; const a = appOf(R.a); const tmp = document.createElement('div'); tmp.innerHTML = vApp(); $('#aList').innerHTML = tmp.querySelector('#aList').innerHTML; }
});
document.addEventListener('change', e => { if (e.target.dataset.oin || e.target.dataset.in === 'app') e.target.dispatchEvent(new Event('input', { bubbles: true })); });
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { if ($('#viewer').classList.contains('on')) $('#viewer').classList.remove('on'); else closeSheet(); }
  if (e.key === 'Enter' && e.target.id === 'pw') document.querySelector('[data-act=login]').click();
});
// کہیں بھی پیسٹ: فارم کھلا ہو تو تصویر خود لگ جائے
document.addEventListener('paste', e => {
  if (R.v !== 'new' || !F) return;
  const files = [...(e.clipboardData && e.clipboardData.files || [])].filter(f => /^image\//.test(f.type));
  if (files.length) { e.preventDefault(); addShots(files); toast('🖼️ ' + T('pasted')); }
});
function showImg(src) { $('#vimg').src = src; $('#viewer').classList.add('on'); }
$('#viewer').addEventListener('click', () => $('#viewer').classList.remove('on'));

/* ---------- شروع ---------- */
(async function boot() {
  document.documentElement.lang = LANG === 'en' ? 'en' : 'ur';
  document.documentElement.dir = LANG === 'en' ? 'ltr' : 'rtl';
  const P = new URLSearchParams(location.search);
  // زبان: ?lang= ؛ ایپ کے اندر (embed) بغیر lang کے تو اس ایپ کی اپنی زبان (انگریزی ایپس = English) — اندر والی زبان یاد نہیں رکھی جاتی
  let ql = P.get('lang');
  if (!ql && EMBED && P.get('app')) ql = appOf(P.get('app')).lang || 'ur';
  if (ql === 'en' || ql === 'ur') {
    LANG = ql;
    if (!EMBED) try { localStorage.setItem('pbthd_lang', LANG); } catch (e) {}
    document.documentElement.lang = LANG; document.documentElement.dir = LANG === 'en' ? 'ltr' : 'rtl';
  }
  if (P.get('app') && !location.hash) history.replaceState(null, '', location.search + '#/app/' + encodeURIComponent(appOf(P.get('app')).id));
  parse();
  busy(true);
  try { await Store.init(); } catch (e) { toast('⚠️ ' + e.message, 5000); }
  busy(false);
  let first = true;
  Store.watch((list, cfg) => {
    ISSUES = list; CFG = cfg || {};
    if (first) { first = false; render(); const u = unseenMine(); if (u && R.v !== 'mine') setTimeout(() => toast(T('updatedMine'), 4000), 600); return; }
    softRender();
    if (Store.isOwner()) { clearTimeout(recordStats.t); recordStats.t = setTimeout(recordStats, 3000); ownerBadge(); }
  });
})();

/* ---------- اپڈیٹ (یکساں نظام) ---------- */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js', { scope: './' }).then(reg => {
      reg.addEventListener('updatefound', () => { if (navigator.serviceWorker.controller) { try { if (!AppUpd.isWaiting()) AppUpd.waiting(); } catch (e) {} } });
      setInterval(() => reg.update().catch(() => {}), 60e3);
    }).catch(() => {});
  });
  let refreshing = false;
  const hadCtl = !!navigator.serviceWorker.controller; // پہلی بار کھلنے پر (پرانا ورژن نہیں تھا) دوبارہ لوڈ نہیں — لاگ اِن بیچ میں نہ ٹوٹے
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (refreshing || !hadCtl) return; refreshing = true;
    const busyIn = () => { const a = document.activeElement; return a && /^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName); };
    const tryReload = () => { if (busyIn() || (R.v === 'new' && F && (F.text || F.shots.length))) { setTimeout(tryReload, 3000); return; } location.reload(); };
    tryReload();
  });
}
(function () {
  let old = '';
  try { old = localStorage.getItem('pbthd_updSeenVer') || ''; localStorage.setItem('pbthd_updSeenVer', APP_VERSION); } catch (e) {}
  if (old && old !== APP_VERSION) { const show = () => { try { AppUpd.done(old, APP_VERSION, UPDATE_NOTE); } catch (e) {} }; if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', show); else show(); }
})();
