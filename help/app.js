/* PBT Help Desk — گاہک اپنا مسئلہ / مشورہ / سوال یہاں بتائیں؛ مالک (ڈویلپر) یہیں سے جواب دے
   راستے (hash): #/ ہوم · #/app/<ID> · #/new/<ID> · #/thanks/<no> · #/mine · #/i/<id> · #/owner
   ایپ سے سیدھا: ?app=AIO-POS-DIRECT&v=AIODR0111SU111&phone=03001234567&name=احمد */
'use strict';
const APP_VERSION = 'HD0311TU023';
const UPDATE_NOTE = 'Replies and WhatsApp posts for the developer\'s own requests no longer show the developer\'s name';
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
  hoursDef: ['روزانہ رات 2 بجے اور دوپہر 2 بجے — ہر مسئلہ باری سے دیکھا اور حل کیا جاتا ہے', 'Daily at 2 AM and 2 PM — every request is reviewed and fixed in turn'],
  nextRev: ['اگلا جائزہ', 'Next review'],
  slotToday2pm: ['آج دوپہر 2 بجے', 'today 2 PM'], slotTonight: ['آج رات 2 بجے', 'tonight 2 AM'],
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
  q2s: ['جتنا صاف لکھیں گے، اتنا جلدی حل', 'the clearer, the faster'],
  ph: ['کسی بھی زبان میں لکھیں — مثلاً: بل پرنٹ کرتے وقت گاہک کا نام کٹ جاتا ہے…', 'Write in any language — e.g. When I print a bill, the customer name gets cut…'],
  paste: ['پیسٹ', 'Paste'], speak: ['بول کر لکھیں', 'Speak to type'], stopSpeak: ['رکیں', 'Stop'],
  q3: ['اسکرین شاٹ لگائیں', 'Add screenshots'],
  q3s: ['بہت مدد ملتی ہے', 'helps a lot'],
  dropT: ['اسکرین شاٹ لے کر یہاں پیسٹ کریں، یا گیلری سے چنیں', 'Paste a screenshot here, or pick from gallery'],
  gallery: ['گیلری سے', 'Gallery'], pasteImg: ['تصویر پیسٹ', 'Paste image'],
  q4: ['آواز میں بتائیں', 'Voice note'], q4s: ['اختیاری', 'optional'],
  recT: ['دبائیں اور بولیں — 2 منٹ تک', 'Tap and speak — up to 2 min'],
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
  errText: ['تھوڑی سی تفصیل لکھیں، یا آواز / اسکرین شاٹ لگائیں', 'Please write a few words, or add a voice note / screenshot'],
  errPhone: ['درست موبائل نمبر لکھیں (مثلاً 03001234567)', 'Enter a valid mobile number (e.g. 03001234567)'],
  errName: ['اپنا نام لکھیں', 'Please enter your name'],
  thanks: ['شکریہ! آپ کی بات ہم تک پہنچ گئی', 'Thank you! We received it'],
  ticketL: ['آپ کا نمبر', 'Your number'],
  thanksP: ['ہم باری سے دیکھیں گے۔ حالت بدلتے ہی اور حل ہوتے ہی جواب «میرے مسائل» میں یہیں آ جائے گا۔',
    'We will look at it in turn. Status updates and the answer will appear here in «My requests».'],
  home: ['ہوم', 'Home'],
  maxShots: ['زیادہ سے زیادہ 4 تصویریں', 'Maximum 4 images'],
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

/* اگلا جائزہ: رات 2 بجے اور دوپہر 2 بجے (پاکستانی وقت) — Claude کی لمٹ خرچ نہیں، صرف حساب */
function nextReview() {
  const h = new Date(Date.now() + 5 * 3600e3).getUTCHours(); // PKT = UTC+5
  return (h >= 2 && h < 14) ? T('slotToday2pm') : T('slotTonight');
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
  { id: 'tariqa', file: 'media/pbt-help-desk-tariqa.mp4', poster: 'media/tariqa.jpg', ur: 'مسئلہ کیسے بتائیں؟ — مکمل طریقہ', en: 'How to report a problem — step by step', dur: '0:55' },
  { id: 'sos', file: 'media/pbt-help-desk-sos.mp4', poster: 'media/sos.jpg', ur: 'ہر ایپ میں SOS — تعارف', en: 'SOS in every app — introduction', dur: '0:38' }
];
const POST_TEXT = "🆘 *نئی سہولت — PBT Help Desk*\n\nالسلام علیکم! 🌹\nاب آپ کو کوئی مسئلہ بتانے کے لیے واٹس ایپ یا کسی اور ذریعے کی ضرورت نہیں۔\n\n📱 ہماری ہر ایپ کے اندر اب ایک سرخ *SOS* بٹن ہے۔\nایپ میں کوئی بھی مسئلہ نظر آئے تو:\n1️⃣ *SOS* دبائیں\n2️⃣ اپنا مسئلہ لکھیں، اسکرین شاٹ لگائیں یا آواز ریکارڈ کریں — کسی بھی زبان میں\n3️⃣ بھیج دیں ✅\n\n🔔 پھر ہر قدم کی خبر آپ کو ایپ ہی میں ملتی رہے گی:\n📥 موصول ← 👀 دیکھ لیا ← 🔧 کام جاری ← ✅ حل ہو گیا\n\n🗂️ آپ کا ہر مسئلہ ریکارڈ میں محفوظ رہے گا، اور بہترین طریقے سے جلد حل ہوگا۔\n💡 اگر کوئی اور بھی یہی مسئلہ بتا چکا ہو تو بس «👋 میرا بھی یہی مسئلہ ہے» دبا دیں۔\n\n🔗 https://pbtcodelabs-pbt.github.io/help/\n\n*PBT Code Labs* — آپ کی رائے سے ہماری ایپس بہتر ہوتی ہیں\n📞 0320-6793793";
function videosHTML() {
  const E = LANG === 'en';
  return `<div class="secT">🎬 ${E ? 'Intro videos' : 'تعارفی ویڈیوز'} <small>— ${E ? 'watch, save or share' : 'دیکھیں، محفوظ کریں یا شیئر کریں'}</small></div>
  <div class="vids">${VIDEOS.map(v => `<div class="vid card">
    <button class="vth" data-act="vplay" data-id="${v.id}"><img src="${v.poster}" alt="" loading="lazy"><span class="vpl">▶</span><span class="vdur num">${v.dur}</span></button>
    <b class="vt">${esc(E ? v.en : v.ur)}</b>
    <div class="tools"><button class="tb pri" data-act="vplay" data-id="${v.id}">▶️ ${E ? 'Play' : 'چلائیں'}</button>
      <a class="tb" href="${v.file}" download="PBT-Help-Desk-${v.id}.mp4">⬇️ ${E ? 'Download' : 'ڈاؤن لوڈ'}</a>
      <button class="tb grn" data-act="vshare" data-id="${v.id}">📤 ${E ? 'Share' : 'شیئر'}</button></div></div>`).join('')}</div>
  <button class="tb" style="margin:2px 0 6px" data-act="copyPost">📋 ${E ? 'Copy the post message' : 'ساتھ والا پیغام کاپی کریں'}</button>`;
}
async function shareVideo(id) {
  const v = VIDEOS.find(x => x.id === id); if (!v) return;
  const E = LANG === 'en';
  busy(true, E ? 'Preparing video…' : 'ویڈیو تیار ہو رہی ہے…');
  try {
    const blob = await (await fetch(v.file)).blob();
    const file = new File([blob], 'PBT-Help-Desk-' + id + '.mp4', { type: 'video/mp4' });
    busy(false);
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({ files: [file], text: 'PBT Help Desk — ' + (E ? 'SOS in every app' : 'ہر ایپ میں SOS') + ' 🆘\nhttps://pbtcodelabs-pbt.github.io/help/' });
    } else {
      const a = document.createElement('a'); a.href = v.file; a.download = file.name; document.body.appendChild(a); a.click(); a.remove();
      toast(E ? 'Sharing not supported here — video downloaded' : 'یہاں سیدھا شیئر نہیں ہو سکتا — ویڈیو ڈاؤن لوڈ ہو گئی', 4000);
    }
  } catch (e) { busy(false); if (e && e.name !== 'AbortError') toast('⚠️ ' + (e.message || e)); }
}
function playVideo(id) {
  const v = VIDEOS.find(x => x.id === id); if (!v) return;
  const E = LANG === 'en';
  sheet(`<h2>🎬 ${esc(E ? v.en : v.ur)}<button class="x" data-act="close">✕</button></h2>
    <video src="${v.file}" poster="${v.poster}" controls autoplay playsinline style="width:100%;max-height:70vh;border-radius:14px;background:#000"></video>
    <div class="tools" style="justify-content:center"><a class="tb" href="${v.file}" download="PBT-Help-Desk-${v.id}.mp4">⬇️ ${E ? 'Download' : 'ڈاؤن لوڈ'}</a>
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
  ${own ? `<div class="card stats" data-act="goOwner" style="cursor:pointer;grid-template-columns:repeat(4,1fr)">${countsHTML(hdCounts())}<div class="st g"><span class="v">${weekSolved(ISSUES)}</span><span class="l">✅ ${T('solvedWeek')}</span></div></div>` : `
  <div class="card stats">
    <div class="st g"><span class="v">${weekSolved(ISSUES)}</span><span class="l">✅ ${T('solvedWeek')}</span></div>
    <div class="st o"><span class="v">${open.length}</span><span class="l">🔧 ${T('pending')}</span></div>
    ${own ? `<div class="st r"><span class="v">${ISSUES.filter(i => i.status === 'new').length}</span><span class="l">📥 ${LANG === 'en' ? 'New, unseen' : 'نئے، ان دیکھے'}</span></div>`
      : `<div class="st b"><span class="v" style="font-size:19px">${avgReply()}</span><span class="l">⏱️ ${T('avgReply')}</span></div>`}
  </div>`}
  ${mine ? `<button class="mineBtn" data-act="mine"><span class="i">📋</span><span class="t"><b>${T('mine')} <span class="num">(${mine})</span></b><small>${T('mineSub')}</small></span>${un ? `<span class="dot">${un}</span>` : ''}<span>${LANG === 'en' ? '›' : '‹'}</span></button>` : ''}
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
    <div class="cpDots">${CSTEPS.map((x, j) => `<span class="${j < k || done ? 'ok' : j === k ? 'now' : ''}" title="${E ? x[4] : x[3]}">${j < k || done ? '✓' : x[2]}</span>`).join('')}</div>
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
    ${opts.mine && (i.status === 'new' || i.status === 'seen') ? (i.urgent ? `<div class="rev" style="background:#fff7ed;color:#c2410c">⚡ ${LANG === 'en' ? 'Priority — being handled first' : 'فوری — سب سے پہلے دیکھا جا رہا ہے'}</div>` : revLine()) : ''}
    ${i.reply ? `<div class="reply" dir="auto"><span class="rh">${T('pbtReply')}</span>${esc(i.reply)}</div>` : ''}
    ${i.status === 'dup' && i.dupOf ? `<div class="dupNote">🔗 ${T('dupOf')} <b class="num">#${i.dupOf}</b></div>` : ''}
    <div class="ft"><span class="when">🕒 ${ago(i.created)}</span>
      ${opts.mine && i.status === 'new' ? `<button class="tb red" style="font-size:12.5px;padding:0 10px" data-act="withdraw" data-id="${i.id}">${T('delMine')}</button>` : ''}
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
function vMine() {
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
  F = { app, type: 'bug', text: '', shots: [], audio: null, audioMs: 0, name: me.name || P.get('name') || '', phone: me.phone || normPhone(P.get('phone') || ''), ver: P.get('v') || '', remember: true };
}
function vForm() {
  if (!F || F.app !== appOf(R.a).id) newForm(appOf(R.a).id);
  const a = appOf(F.app);
  const sr = !!(window.SpeechRecognition || window.webkitSpeechRecognition);
  const opts = APPS.map(x => `<option value="${esc(x.id)}" ${x.id === F.app ? 'selected' : ''}>${esc(AN(x))}</option>`).join('');
  return `<div class="formWrap">
  <div class="card" style="display:flex;align-items:center;gap:12px;padding:10px 14px">${appIcon(a, 'appMini')}
    <b style="flex:1">${T('newTitle')}</b>
    <select class="inp" style="width:auto;max-width:55%;padding:2px 8px;font-size:14px" data-in="app" aria-label="${T('appL')}">${opts}</select></div>

  <div class="fs"><div class="fh"><span class="n">1</span>${T('q1')}</div>
    <div class="types">${['bug', 'idea', 'ask'].map(t => `<button type="button" class="ty ${F.type === t ? 'on' : ''}" data-act="type" data-id="${t}"><span class="e">${TYPES[t]}</span><b>${T(t)}</b><small>${DICT[t][LANG === 'en' ? 0 : 1]}</small></button>`).join('')}</div></div>

  <div class="fs"><div class="fh"><span class="n">2</span>${T('q2')} <small>— ${T('q2s')}</small></div>
    <textarea class="big" id="fText" dir="auto" data-in="text" placeholder="${T('ph')}">${esc(F.text)}</textarea>
    <div class="tools"><button type="button" class="tb" data-act="pasteText">📋 ${T('paste')}</button>
      ${sr ? `<button type="button" class="tb" id="spkBtn" data-act="speak">🎙️ ${T('speak')}</button><select class="tb" id="spkLang" aria-label="language">${SPK_LANGS.map(([c, l]) => `<option value="${c}" ${c === spkLang() ? 'selected' : ''}>${l}</option>`).join('')}</select>` : ''}
      <span class="cnt" id="cnt">${F.text.length}</span></div>
    <div class="err" id="eText">${T('errText')}</div></div>

  <div class="fs"><div class="fh"><span class="n">3</span>${T('q3')} <small>— ${T('q3s')}</small></div>
    <div class="drop" id="drop"><span class="e">🖼️</span><p>${T('dropT')}</p>
      <div class="tools"><button type="button" class="tb pri" data-act="gallery">🖼️ ${T('gallery')}</button>
      <button type="button" class="tb" data-act="camera">📷 ${T('camera')}</button>
      <button type="button" class="tb" data-act="pasteImg">📋 ${T('pasteImg')}</button></div>
      <input type="file" id="fileIn" accept="image/*" multiple hidden><input type="file" id="camIn" accept="image/*" capture="environment" hidden></div>
    <div class="shots" id="shots">${shotsHTML()}</div></div>

  <div class="fs"><div class="fh"><span class="n">4</span>${T('q4')} <small>— ${T('q4s')}</small></div>
    <div class="recBox" id="recBox">${recHTML()}</div></div>

  <div class="fs"><div class="fh"><span class="n">5</span>${T('q5')} <small>— 🔒 ${T('q5s')}</small></div>
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
  if (REC.on) return `<button type="button" class="mic on" data-act="rec">⏹</button><div class="t"><b id="recT">0:00</b>${T('recOn')}</div>`;
  if (F.audio) return `<button type="button" class="mic" data-act="rec" title="again">🎤</button><div class="t"><b>✅ ${fmtMs(F.audioMs)}</b>${T('recDone')}</div>
    <audio controls src="${F.audio}"></audio><button type="button" class="tb red" data-act="rmAudio">🗑️</button>`;
  return `<button type="button" class="mic" data-act="rec">🎤</button><div class="t">${T('recT')}</div>`;
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
async function addShots(files) {
  for (const f of files) {
    if (!/^image\//.test(f.type)) continue;
    if (F.shots.length >= 4) { toast(T('maxShots')); break; }
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
const SPK_LANGS = [['ur-PK', 'اردو'], ['en-US', 'English'], ['pa-Guru-IN', 'ਪੰਜਾਬੀ'], ['hi-IN', 'हिन्दी'], ['ar-SA', 'العربية'], ['fa-IR', 'فارسی'], ['ps-AF', 'پښتو'], ['sd-IN', 'سنڌي'], ['bn-BD', 'বাংলা'], ['tr-TR', 'Türkçe'], ['zh-CN', '中文'], ['fr-FR', 'Français'], ['es-ES', 'Español'], ['de-DE', 'Deutsch']];
const spkLang = () => ls.get('spk', LANG === 'en' ? 'en-US' : 'ur-PK');
let SR = null;
function toggleSpeak() {
  const btn = $('#spkBtn');
  if (SR) { SR.stop(); return; }
  const C = window.SpeechRecognition || window.webkitSpeechRecognition;
  SR = new C(); SR.lang = ($('#spkLang') && $('#spkLang').value) || spkLang(); ls.set('spk', SR.lang); SR.continuous = true; SR.interimResults = false;
  SR.onresult = e => {
    for (let k = e.resultIndex; k < e.results.length; k++) if (e.results[k].isFinal) {
      F.text = (F.text ? F.text.replace(/\s*$/, ' ') : '') + e.results[k][0].transcript.trim();
      const ta = $('#fText'); if (ta) ta.value = F.text; $('#cnt') && ($('#cnt').textContent = F.text.length);
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
  const eT = !F.text.trim() && !F.audio && !F.shots.length, eN = !F.name.trim(), eP = !phoneOk(P);
  $('#eText').classList.toggle('on', eT); $('#eName').classList.toggle('on', eN); $('#ePhone').classList.toggle('on', eP);
  const bad = document.querySelector('.err.on'); if (bad) { bad.scrollIntoView({ behavior: 'smooth', block: 'center' }); return; }
  if (F.remember) ls.set('me', { name: F.name.trim(), phone: P }); else ls.set('me', {});
  busy(true, T('sending'));
  try {
    const blobs = F.shots.map(d => ({ kind: 'shot', data: d }));
    if (F.audio) blobs.push({ kind: 'audio', data: F.audio });
    const r = await Store.add({ app: F.app, type: F.type, text: F.text.trim(), name: F.name.trim(), phone: P, ver: F.ver.trim(), dev: DEV, shots: F.shots.length, audio: !!F.audio, lang: LANG, hold: F.type === 'idea' ? 'decide' : '' }, blobs);
    rememberMine(r.id, 'new|0');
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
let O = { tab: 'new', app: '', q: '', sort: 'new' };
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
  const old = ISSUES.filter(i => (i.status === 'done' || i.status === 'dup') && Date.now() - (i.doneAt || i.upd) > keepDays() * 864e5);
  for (const i of old) await Store.remove(i.id);
  if (old.length) toast('🧹 ' + old.length + (LANG === 'en' ? ' old solved removed' : ' پرانے حل شدہ ہٹا دیے'));
}
const needsSend = i => !!i.reply && i.notified !== sig(i);
const isHeld = i => i.hold === 'decide' || i.hold === 'approve';
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
    navigator.serviceWorker.ready.then(r => r.showNotification('🆘 PBT Help Desk', { body: pushBody(c), tag: 'pbthd', renotify: true, icon: 'icons/icon-192.png', badge: 'icons/icon-192.png', data: { url: './#/owner' } })).catch(() => {});
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
    reg.showNotification('🆘 PBT Help Desk', { body: '✅ ' + (E ? 'Notifications on — ' : 'اطلاعات چالو — ') + pushBody(hdCounts()), tag: 'pbthd', icon: 'icons/icon-192.png', badge: 'icons/icon-192.png', data: { url: './#/owner' } });
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
function urgProgress(i, mini) {
  const E = LANG === 'en', st = urgStage(i), k = STAGES.findIndex(x => x[0] === st), cur = STAGES[k], nx = STAGES[k + 1];
  const pct = cur[1], done = st === 'done';
  if (mini) return `<div class="upMini ${done ? 'fin' : ''}"><div class="upBar"><i style="width:${pct}%"></i></div><span>${cur[2]} ${E ? cur[4] : cur[3]} · <b class="num">${pct}%</b></span></div>`;
  return `<div class="urgProg ${done ? 'fin' : ''}">
    <div class="upHead"><b>${cur[2]} ${E ? cur[4] : cur[3]}</b><span class="num">${pct}%</span></div>
    <div class="upBar"><i style="width:${pct}%"></i></div>
    <div class="upLeft">${done ? (E ? '🎉 All done' : '🎉 کام مکمل') : `${E ? 'Remaining' : 'باقی'} <b class="num">${100 - pct}%</b>${nx ? ` · ${E ? 'next' : 'اگلا قدم'}: ${nx[2]} ${E ? nx[4] : nx[3]}` : ''}`}</div>
    <ol class="upSteps">${STAGES.map((x, j) => `<li class="${j < k || done ? 'ok' : j === k ? 'now' : ''}"><span class="d">${j < k || done ? '✓' : x[2]}</span><span class="t">${E ? x[4] : x[3]}</span></li>`).join('')}</ol>
    ${i.stageAt ? `<div class="upWhen">🕒 ${ago(i.stageAt)}</div>` : ''}</div>`;
}
function urgHome() {
  const L = ISSUES.filter(isUrg).sort((a, b) => (b.stageAt || b.upd) - (a.stageAt || a.upd));
  if (!L.length) return '';
  const E = LANG === 'en';
  return `<div class="card urgHome"><b>⚡ ${E ? 'Urgent jobs — live progress' : 'فوری کام — لائیو پیش رفت'}</b>
    ${L.map(i => `<div class="uh" data-act="open" data-id="${i.id}"><span class="t">${appIcon(appOf(i.app), 'appMini')} <b class="num">#${i.no}</b> <span class="clamp" dir="auto">${esc(i.text || '🎤')}</span></span>${urgProgress(i, true)}</div>`).join('')}</div>`;
}
function urgSwitch(i) {
  return `<div class="urgBox" data-urgbox="${i.id}">${urgBtn(i)}${i.urgent || (i.stage && i.status !== 'new') ? urgProgress(i) : ''}</div>`;
}
function urgBtn(i) {
  const E = LANG === 'en', on = !!i.urgent;
  return `<button class="urgSw ${on ? 'on' : ''}" data-act="urgent" data-id="${i.id}" aria-pressed="${on}">
    <span class="uI">⚡</span>
    <span class="uT"><b>${on ? (i.status === 'done' ? (E ? 'URGENT — DONE ✅' : 'فوری کام — مکمل ✅') : (E ? 'URGENT — ON' : 'فوری — آن ہے')) : (E ? 'Make it urgent' : 'فوری کروائیں')}</b>
      <small>${on ? (E ? 'Claude does this first · tap again to turn off' : 'Claude یہ سب سے پہلے کرے گا · بند کرنے کے لیے دوبارہ دبائیں') : (E ? 'Now: off — will be done at 2 o\'clock' : 'ابھی بند ہے — یہ دوپہر/رات 2 بجے ہوگا')}</small></span>
    <span class="uK"><i></i></span></button>`;
}
function urgMsg(i) { const a = appOf(i.app); return `⚡ فوری: ہیلپ ڈیسک #${i.no} (${AN(a)}) — ابھی حل کر کے لائیو کریں`; }
function urgSheet(i) {
  const E = LANG === 'en';
  sheet(`<h2>⚡ ${E ? 'Urgent is ON' : 'فوری آن ہو گیا'} — #${i.no}<button class="x" data-act="close">✕</button></h2>
    <p style="font-size:15px;line-height:2">${E ? 'To start right now, send this one line to Claude:' : 'ابھی اسی وقت کام شروع کروانے کے لیے یہ ایک لائن Claude کو بھیج دیں:'}</p>
    <div class="card" style="box-shadow:none;background:#fff7ed;border:1.5px solid #fb923c;font-weight:700" dir="auto">${esc(urgMsg(i))}</div>
    <button class="bigBtn" style="background:linear-gradient(135deg,#f97316,#ea580c)" data-act="urgTell" data-id="${i.id}">📋 ${E ? 'Copy & open Claude chat' : 'کاپی کر کے Claude کی چیٹ کھولیں'}</button>
    <p style="font-size:13px;color:var(--mut);margin:8px 0 0">${E ? 'Not sent now? It will still be done first in the next 2 o\'clock round.' : 'ابھی نہ بھیجیں تو بھی 2 بجے کی باری میں سب سے پہلے یہی ہوگا۔'}</p>`);
}
const pushOn = () => { try { return window.Notification && Notification.permission === 'granted' && localStorage.getItem('pbthd_push') === '1'; } catch (e) { return false; } };
const isUrg = i => !!i.urgent && i.status !== 'dup' && !(i.status === 'done' && Date.now() - (i.doneAt || 0) > 864e5); // حل ہونے کے بعد ایک دن تک ✅ دکھے
function tabOk(i, t) { return t === 'all' || t === 'urg' ? (t === 'all' || isUrg(i)) : (t === 'open' ? (isOpen(i) || isHeld(i)) : t === 'hold' ? isHeld(i) : t === 'send' ? needsSend(i) : i.status === t); }
function ownFiltered() {
  const q = O.q.trim().toLowerCase();
  let l = ISSUES.filter(i => tabOk(i, O.tab) && (!O.app || i.app === O.app));
  if (q) l = l.filter(i => [i.text, i.ptext, i.name, i.phone, i.reply, '#' + i.no, AN(appOf(i.app))].join(' ').toLowerCase().includes(q));
  return l.sort(O.sort === 'votes' ? (a, b) => ((b.metoo || []).length - (a.metoo || []).length) || b.created - a.created : (a, b) => b.created - a.created);
}
function vOwner() {
  if (!Store.isOwner()) { setTimeout(loginSheet, 50); return `<div class="card empty"><span class="e">🔒</span>Developer</div>`; }
  cleanup();
  const C = s => ISSUES.filter(i => tabOk(i, s) && (!O.app || i.app === O.app)).length;
  const tabs = [['urg', '⚡ ' + (LANG === 'en' ? 'Urgent' : 'فوری')], ['open', '🔓 ' + (LANG === 'en' ? 'Open' : 'کھلے')], ['hold', '⏳ ' + (LANG === 'en' ? 'Approval' : 'منظوری')], ['send', '📨 ' + (LANG === 'en' ? 'To send' : 'بھیجنا باقی')], ['new', '📥 ' + T('s_new')], ['seen', '👀 ' + T('s_seen')], ['work', '🔧 ' + T('s_work')], ['done', '✅ ' + T('s_done')], ['dup', '🔗 ' + T('s_dup')], ['all', LANG === 'en' ? 'All' : 'سب']];
  const list = ownFiltered();
  const opts = `<option value="">${LANG === 'en' ? 'All apps' : 'سب ایپس'}</option>` + APPS.map(a => {
    const n = ISSUES.filter(i => i.app === a.id && isOpen(i)).length;
    return `<option value="${esc(a.id)}" ${O.app === a.id ? 'selected' : ''}>${esc(AN(a))}${n ? ' (' + n + ')' : ''}</option>`;
  }).join('');
  const cards = list.map(i => {
    const a = appOf(i.app), n = (i.metoo || []).length;
    return `<div class="is s-${i.status} oi" data-act="open" data-id="${i.id}">
      <div class="top">${appIcon(a, 'appMini')} <b style="font-size:14px">${esc(AN(a))}</b>${tyChip(i.type)}${stChip(i.status)}
        <span class="chip ${i.pub ? 'globe' : 'lock'}">${i.pub ? '🌐' : '🔒'}</span>${isHeld(i) ? '<span class="chip work">⏳</span>' : ''}${i.urgent ? '<span class="chip work">⚡</span>' : ''}${needsSend(i) ? '<span class="chip mine">📨</span>' : ''}<span class="no">#${i.no}</span></div>
      <div class="tx clamp" dir="auto">${esc(i.text || (i.audio ? '🎤' : ''))}</div>
      ${i.urgent ? urgProgress(i, true) : ''}
      ${i.status === 'done' ? `<button class="tb grn" style="font-size:13px;margin:6px 0 0" data-act="poster" data-id="${i.id}">🖼️ ${LANG === 'en' ? 'Solved post → WhatsApp' : 'حل کی پوسٹ ← واٹس ایپ'}${needsSend(i) ? ' 📨' : ' ✓'}</button>` : ''}
      <div class="ft"><span class="who">👤 ${esc(i.name)} · <span class="num">${esc(i.phone)}</span></span>
        <span class="when">🕒 ${ago(i.created)}</span>${i.shots ? `<span class="when">🖼️ ${i.shots}</span>` : ''}${i.audio ? '<span class="when">🎤</span>' : ''}
        ${n ? `<span class="mt on">👋 <b>${n + 1}</b></span>` : ''}</div></div>`;
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
      <select class="inp" data-oin="sort"><option value="new" ${O.sort === 'new' ? 'selected' : ''}>🕒 ${LANG === 'en' ? 'Newest' : 'نئے پہلے'}</option><option value="votes" ${O.sort === 'votes' ? 'selected' : ''}>👋 ${LANG === 'en' ? 'Most voted' : 'زیادہ لوگ پہلے'}</option></select>
      <input class="inp" data-oin="q" value="${esc(O.q)}" placeholder="🔍 ${LANG === 'en' ? 'name, phone, #no, text' : 'نام، نمبر، #، متن'}"></div>
    ${list.length ? `<button class="bigBtn" style="font-size:16px" data-act="bulkClaude">🤖 ${LANG === 'en' ? `Copy these ${list.length} for Claude` : `یہ ${list.length} مسائل Claude کے لیے کاپی`}</button>` : ''}
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
function detailHTML() {
  const i = ISSUES.find(x => x.id === DET.id); if (!i) return '<div class="empty">—</div>';
  const a = appOf(i.app), n = (i.metoo || []).length;
  const shots = (DET.blobs || []).filter(b => b.kind === 'shot'), au = (DET.blobs || []).find(b => b.kind === 'audio');
  const E = LANG === 'en';
  return `<div class="det"><h2>${appIcon(a, 'appMini')} ${esc(AN(a))} <span class="num" style="color:var(--mut)">#${i.no}</span><button class="x" data-act="close">✕</button></h2>
    <div class="top" style="display:flex;gap:6px;flex-wrap:wrap">${tyChip(i.type)}${stChip(i.status)}${n ? `<span class="chip work">👋 ${n + 1} ${T('people')}</span>` : ''}</div>
    <div class="meta"><span>👤</span><b>${esc(i.name)}</b>
      <span>📞</span><span><a class="num" href="tel:${esc(i.phone)}">${esc(i.phone)}</a> · <a href="https://wa.me/${waNum(i.phone)}" target="_blank" rel="noopener">💬 WhatsApp</a></span>
      <span>🕒</span><span class="num">${fullDate(i.created)}</span>
      ${i.ver ? `<span>🏷️</span><span class="num">${esc(i.ver)}</span>` : ''}</div>
    ${holdBox(i)}
    <div class="tx" dir="auto" style="white-space:pre-wrap;font-size:16.5px;overflow-wrap:anywhere">${phoneLinks(i.text) || '<i style="color:var(--mut)">—</i>'}</div>
    ${DET.blobs == null && (i.shots || i.audio) ? '<div class="spin" style="margin:12px auto;width:30px;height:30px"></div>' : ''}
    ${shots.length ? `<div class="shotsBig">${shots.map((b, k) => `<img src="${b.data}" data-viewsrc="1" alt="">`).join('')}</div>` : ''}
    ${au ? `<audio controls src="${au.data}" style="width:100%;margin:6px 0"></audio>` : ''}

    ${urgSwitch(i)}
    <h3>${E ? 'Status' : 'حالت'}</h3>
    <div class="stBtns">${['new', 'seen', 'work', 'done'].map(s => `<button class="${s} ${i.status === s ? 'on' : ''}" data-act="setSt" data-id="${s}">${ST_IC[s]} ${T('s_' + s)}</button>`).join('')}</div>
    <div class="tools"><button class="tb" data-act="dup">🔗 ${E ? 'Mark duplicate of #…' : 'ڈپلیکیٹ — اصل نمبر لکھیں'}</button></div>

    <h3>${E ? 'Reply to customer' : 'گاہک کو جواب'}</h3>
    <textarea class="big" id="rText" dir="auto" style="min-height:96px" placeholder="${E ? 'Write or paste the answer from Claude…' : 'جواب لکھیں یا Claude سے لے کر پیسٹ کریں…'}">${esc(i.reply || '')}</textarea>
    <div class="tools"><button class="tb" data-act="pasteReply">📋 ${T('paste')}</button>
      <button class="tb pri" data-act="saveReply">💾 ${E ? 'Save' : 'محفوظ'}</button>
      <button class="tb grn" data-act="doneReply">✅ ${E ? 'Save + Solved' : 'محفوظ + حل ہو گیا'}</button>
      <button class="tb" data-act="notify">📨 ${E ? 'WhatsApp customer' : 'واٹس ایپ پر اطلاع'}</button>
      <button class="tb grn" data-act="poster" data-id="${i.id}">🖼️ ${E ? 'Solved post → WhatsApp' : 'حل کی پوسٹ ← واٹس ایپ'}</button></div>

    <h3>${E ? 'Public list' : 'عام فہرست'}</h3>
    <label class="sw"><input type="checkbox" id="pubSw" ${i.pub ? 'checked' : ''} data-act="pub"><i></i>🌐 ${E ? 'Show to everyone (name & phone stay hidden)' : 'سب کو دکھائیں (نام اور نمبر چھپے رہیں گے)'}</label>
    <label class="lbl">${E ? 'Public wording (optional — cleaner text for everyone)' : 'سب کے لیے الفاظ (اختیاری — صاف ستھرا متن)'}</label>
    <div class="inpRow"><input class="inp" id="pText" value="${esc(i.ptext || '')}" placeholder="${esc((i.text || '').slice(0, 60))}"><button class="tb" data-act="savePtext">💾</button></div>

    <div class="claude"><b>🤖 Claude</b>
      <div class="tools"><button class="tb pri" data-act="cCopy">📋 ${E ? 'Copy text + image' : 'متن + تصویر کاپی'}</button>
        <button class="tb" data-act="cShare">📤 ${E ? 'Share' : 'شیئر'}</button>
        <button class="tb" data-act="cText">📝 ${E ? 'Text only' : 'صرف متن'}</button>
        <button class="tb" data-act="cImg">🖼️ ${E ? 'Save image' : 'تصویر محفوظ'}</button></div>
      <p>${E ? 'Paste into your Claude chat. After Firebase is connected you can also just tell Claude: «Help Desk #' + i.no + ' fix karo» — it will read the request and screenshots itself.'
      : 'Claude کی چیٹ میں پیسٹ کریں۔ فائربیس جڑنے کے بعد Claude کو صرف اتنا لکھنا کافی ہوگا: «ہیلپ ڈیسک #' + i.no + ' حل کرو» — وہ مسئلہ اور اسکرین شاٹ خود پڑھ لے گا۔'}</p></div>

    <div class="tools" style="margin-top:14px;justify-content:space-between"><button class="tb red" data-act="del">🗑️ ${E ? 'Delete' : 'حذف'}</button>
      <button class="tb" data-act="close">✕ ${E ? 'Close' : 'بند'}</button></div></div>`;
}
/* منظوری: مشورہ (کام کریں؟) یا Claude کا تیار کام (لائیو کریں؟) */
function holdBox(i) {
  const E = LANG === 'en';
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
  const L = [`🆘 PBT Help Desk — #${i.no}`,
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
  const V = { home: vHome, app: vApp, new: vForm, thanks: vThanks, mine: vMine, i: vOne, owner: vOwner }[R.v] || vHome;
  $('#main').innerHTML = V();
  if (R.v === 'new') bindForm();
  if (DET && $('#ov').classList.contains('on')) sheet(detailHTML(), true);
}
let rT = 0;
function softRender() {
  // لکھتے وقت پوری اسکرین نہ بدلے
  const a = document.activeElement;
  if (R.v === 'new' || (a && /^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName))) { clearTimeout(rT); rT = setTimeout(softRender, 1500); return; }
  const y = window.scrollY; render(); window.scrollTo(0, y);
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
    case 'urgent': {
      const i = ISSUES.find(x => x.id === (id || (DET && DET.id))); if (!i) break;
      const on = !i.urgent;
      i.urgent = on; // فوراً رنگ بدلے (فائربیس کا انتظار نہیں)
      i.stage = on ? 'sent' : ''; i.stageAt = Date.now();
      document.querySelectorAll(`[data-urgbox="${i.id}"]`).forEach(b => { b.outerHTML = urgSwitch(i); });
      if (on) document.querySelectorAll(`[data-urgbox="${i.id}"] .urgSw`).forEach(b => { b.classList.add('burst'); setTimeout(() => b.classList.remove('burst'), 1600); });
      try { await Store.update(i.id, { urgent: on, stage: i.stage, stageAt: i.stageAt }); } catch (e) { i.urgent = !on; toast('⚠️ ' + (e.message || e), 4000); break; }
      if (on) setTimeout(() => urgSheet(i), 1100); else toast(LANG === 'en' ? '⏸️ Urgent off — it will be done in the 2 o\'clock round' : '⏸️ فوری بند — اب یہ دوپہر/رات 2 بجے کی باری میں ہوگا', 4000);
      break; }
    case 'urgTell': { const i = ISSUES.find(x => x.id === id); if (!i) break;
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
    case 'type': F.type = id; document.querySelectorAll('.ty').forEach(b => b.classList.toggle('on', b.dataset.id === id)); break;
    case 'pasteText': { const s = await clipText(); if (s) { F.text = (F.text ? F.text + '\n' : '') + s; $('#fText').value = F.text; $('#cnt').textContent = F.text.length; toast('📋 ' + T('pasted')); } break; }
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
    case 'savePtext': await Store.update(DET.id, { ptext: $('#pText').value.trim() }); toast('✅'); break;
    case 'cCopy': case 'cShare': case 'cText': case 'cImg': claudeAct(act); break;
    case 'bulkClaude': {
      const l = ownFiltered(); const txt = l.map(i => claudeText(i, true)).join('\n\n────────\n\n');
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
    if (k === 'text') $('#cnt').textContent = F.text.length;
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
