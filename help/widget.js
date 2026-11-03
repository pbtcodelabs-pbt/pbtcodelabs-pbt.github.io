/* PBT Help Desk — ہر ایپ میں لگنے والا مشترک بٹن / پاپ اپ
   ایپ میں ایک لائن:
     <script src="https://pbtcodelabs-pbt.github.io/help/widget.js" data-app="SM" defer></script>
   پھر:
     PBTHelp.open({ ver: APP_VERSION, phone: '0300…', name: '…', lang: 'ur' })   // پاپ اپ کھولیں
     PBTHelp.button({ ver: APP_VERSION })   // تیار بٹن (آئیکن + «PBT Help Desk») — مینو میں appendChild کریں
     <div data-pbthd-btn></div>             // یہاں بٹن خود لگ جاتا ہے
   ہیلپ ڈیسک ایپ کے اندر ہی کھلتا ہے (iframe)؛ فون کا «پیچھے» بٹن پاپ اپ بند کرتا ہے۔ */
(function () {
  'use strict';
  if (window.PBTHelp) return;
  var S = document.currentScript;
  var BASE = (S && S.src) ? S.src.replace(/widget\.js(\?.*)?$/, '') : 'https://pbtcodelabs-pbt.github.io/help/';
  var CFG = { app: (S && S.getAttribute('data-app')) || '', ver: (S && S.getAttribute('data-ver')) || '', phone: '', name: '', lang: '' };
  var ov = null, pushed = false;

  var CSS = ''
    + '.pbthd-ov{position:fixed;inset:0;z-index:2147483600;background:rgba(10,18,40,.6);display:flex;align-items:flex-end;justify-content:center;animation:pbthdF .2s}'
    + '.pbthd-box{position:relative;width:100%;height:100%;background:#f3f5fb;overflow:hidden;animation:pbthdU .25s ease}'
    + '.pbthd-box iframe{width:100%;height:100%;border:0;display:block;background:#f3f5fb}'
    + '.pbthd-x{position:absolute;top:calc(8px + env(safe-area-inset-top,0px));inset-inline-end:8px;z-index:2;width:36px;height:36px;border-radius:50%;border:0;'
    + 'background:rgba(0,0,0,.35);color:#fff;font:700 17px Arial,sans-serif;cursor:pointer;display:none}'
    + '@media (min-width:700px){.pbthd-ov{align-items:center}.pbthd-box{width:min(760px,94vw);height:min(900px,92vh);border-radius:22px;box-shadow:0 20px 60px rgba(0,0,0,.4)}.pbthd-x{display:block}}'
    + '.pbthd-btn{display:inline-flex;align-items:center;gap:10px;border:0;border-radius:14px;padding:6px 14px 6px 8px;cursor:pointer;'
    + 'background:linear-gradient(135deg,#1e3a8a,#0f766e);color:#fff;font:700 15px system-ui,Arial,sans-serif;box-shadow:0 4px 0 #10245c;line-height:1.3}'
    + '.pbthd-btn:active{transform:translateY(3px);box-shadow:0 1px 0 #10245c}'
    + '.pbthd-btn img{width:32px;height:32px;border-radius:9px;background:#fff}'
    + '.pbthd-btn small{display:block;font-weight:400;font-size:11.5px;opacity:.9}'
    + '@keyframes pbthdF{from{opacity:0}}@keyframes pbthdU{from{transform:translateY(40px);opacity:.5}}'
    /* Help Desk بٹن (HD0311TU027 / HD0311TU028): پیلا، ابھرا 3D، لمبا — «Help Desk» + نیچے «مسائل و تجاویز» (مالک کا چنا نام نمبر 1) — ہر ایپ کے 🆘 کی جگہ خود */
    + '.pbthd-sos{display:inline-flex;align-items:center;gap:4px;height:30px;padding:0 7px 0 4px;border-radius:15px;box-sizing:border-box;position:relative;'
    + 'background:linear-gradient(180deg,#fff59d 0%,#facc15 45%,#f59e0b 100%);color:#3b2300 !important;border:1px solid #b45309;'
    + 'box-shadow:inset 0 1px 0 rgba(255,255,255,.85),inset 0 -2px 0 rgba(180,83,9,.35),0 3px 0 #b45309,0 4px 8px rgba(0,0,0,.28);'
    + 'animation:pbthdSos 2.6s ease-in-out infinite;vertical-align:middle;direction:ltr;white-space:nowrap;text-shadow:0 1px 0 rgba(255,255,255,.55);line-height:1;cursor:pointer}'
    + '.pbthd-sos:active{transform:translateY(2px);box-shadow:inset 0 1px 0 rgba(255,255,255,.85),0 1px 0 #b45309,0 2px 4px rgba(0,0,0,.25)}'
    + '.pbthd-ic{width:22px;height:22px;border-radius:50%;flex:none;display:inline-flex;align-items:center;justify-content:center;background:radial-gradient(circle at 35% 30%,#4b3200,#1c1200);'
    + 'color:#fde047 !important;font:900 14px/1 Arial,Helvetica,sans-serif;text-shadow:none;box-shadow:0 1px 2px rgba(0,0,0,.4)}'
    + '.pbthd-tx{display:inline-flex;flex-direction:column;align-items:flex-start;gap:2px}'
    + '.pbthd-tx b{font:900 12px/1 Arial,Helvetica,sans-serif;letter-spacing:.2px;color:#2a1800 !important}'
    + '.pbthd-tx i{position:relative;display:block;height:11px;overflow:hidden;font-style:normal}'
    + '.pbthd-tx em{display:block;font:700 8px/10px Arial,Helvetica,sans-serif;font-style:normal;color:#5b3a00 !important;white-space:nowrap}'
    + '.pbthd-tx em.e{font-size:7.5px;letter-spacing:-.15px}'
    + '.pbthd-tx em.u{font:700 9.5px/10px "Noori","Jameel Noori Nastaleeq",Tahoma,Arial,sans-serif;direction:rtl}'
    /* تنگ پٹی (فون پر صفحہ چوڑا ہو جائے): پہلے نیچے کی لائن چھپے، پھر صرف گول نشان */
    + '.pbthd-sos.pbthd-mini,.pbthd-sos.pbthd-help{height:28px;padding-right:7px;gap:3px}.pbthd-mini .pbthd-tx i,.pbthd-help .pbthd-tx i{display:none}.pbthd-mini .pbthd-tx b{font-size:11px}'
    + '.pbthd-help .pbthd-tx b{font-size:0}.pbthd-help .pbthd-tx b:after{content:"Help";font-size:11.5px}'
    + '.pbthd-sos.pbthd-tiny{padding:0 3px;gap:0}.pbthd-tiny .pbthd-tx{display:none}'
    + '@keyframes pbthdSos{50%{box-shadow:inset 0 1px 0 rgba(255,255,255,.85),inset 0 -2px 0 rgba(180,83,9,.35),0 3px 0 #b45309,0 0 0 4px rgba(250,204,21,.35),0 4px 10px rgba(0,0,0,.28)}}'
    + '.pbthd-host{background:transparent !important;box-shadow:none !important;border:0 !important;width:auto !important;min-width:0 !important;max-width:none !important;padding:0 2px !important;overflow:visible !important}'
    /* کنارے والی پٹی (data-float): بائیں کنارے پر، درمیان میں، آدھی باہر */
    + '.pbthd-tab{position:fixed;left:0;top:46%;z-index:2147483000;border:0;cursor:pointer;padding:8px 6px 8px 4px;border-radius:0 16px 16px 0;'
    + 'background:linear-gradient(135deg,#1e3a8a,#0f766e);box-shadow:0 4px 14px rgba(0,0,0,.3);display:flex;flex-direction:column;align-items:center;gap:3px;'
    + 'color:#fff;font:700 10px/1.2 Arial,sans-serif;opacity:.95}'
    + '.pbthd-tab:active{transform:scale(.95)}'
    + '@media print{.pbthd-tab{display:none !important}}';
  function css() {
    if (document.getElementById('pbthdCss')) return;
    var st = document.createElement('style'); st.id = 'pbthdCss'; st.textContent = CSS; document.head.appendChild(st);
  }
  function url(o) {
    var q = ['embed=1'];
    ['app', 'ver', 'phone', 'name', 'lang'].forEach(function (k) {
      if (o[k]) q.push((k === 'ver' ? 'v' : k) + '=' + encodeURIComponent(o[k]));
    });
    return BASE + '?' + q.join('&') + (o.app ? '#/app/' + encodeURIComponent(o.app) : '#/');
  }
  function open(o) {
    o = Object.assign({}, CFG, o || {});
    if (ov) return;
    css();
    ov = document.createElement('div'); ov.className = 'pbthd-ov';
    ov.innerHTML = '<div class="pbthd-box"><button class="pbthd-x" type="button" aria-label="close">✕</button>'
      + '<iframe allow="camera; microphone; clipboard-read; clipboard-write" title="PBT Help Desk"></iframe></div>';
    ov.querySelector('iframe').src = url(o);
    ov.querySelector('.pbthd-x').onclick = close;
    ov.addEventListener('click', function (e) { if (e.target === ov) close(); });
    document.body.appendChild(ov);
    try { history.pushState({ pbthd: 1 }, ''); pushed = true; } catch (e) {}
  }
  function close(fromPop) {
    if (!ov) return;
    ov.remove(); ov = null;
    if (pushed && fromPop !== true) { pushed = false; try { history.back(); } catch (e) {} }
    pushed = false;
  }
  window.addEventListener('popstate', function () { if (ov) close(true); });
  window.addEventListener('message', function (e) { if (e.data && e.data.pbthd === 'close') close(); });
  function button(o) {
    css();
    var b = document.createElement('button'); b.type = 'button'; b.className = 'pbthd-btn';
    b.innerHTML = '<img src="' + BASE + 'icons/icon-192.png" alt=""><span>PBT Help Desk<small>اپنا مسئلہ یا مشورہ یہاں بتائیں</small></span>';
    b.onclick = function () { open(o); };
    return b;
  }
  function mount() {
    var els = document.querySelectorAll('[data-pbthd-btn]');
    for (var k = 0; k < els.length; k++) if (!els[k].firstChild) els[k].appendChild(button());
    if (S && S.getAttribute('data-float') === '1' && !document.querySelector('.pbthd-tab')) {
      var t = document.createElement('button'); t.type = 'button'; t.className = 'pbthd-tab'; t.title = 'PBT Help Desk';
      t.innerHTML = SOS_HTML;
      // انگلی سے اوپر نیچے سرکائیں (ہر ایپ اپنی جگہ یاد رکھے)؛ ہلکا سا چھونا = کھولیں
      var key = 'pbthd_tabY_' + (CFG.app || location.pathname), moved = false, y0 = 0, t0 = 0;
      try { var sv = parseFloat(localStorage.getItem(key)); if (sv >= 5 && sv <= 90) t.style.top = sv + '%'; } catch (e) {}
      t.addEventListener('pointerdown', function (e) { moved = false; y0 = e.clientY; t0 = t.getBoundingClientRect().top; try { t.setPointerCapture(e.pointerId); } catch (x) {} });
      t.addEventListener('pointermove', function (e) {
        if (!e.buttons && e.pointerType === 'mouse') return;
        if (Math.abs(e.clientY - y0) > 6) moved = true;
        if (moved) { var top = Math.min(innerHeight - 70, Math.max(10, t0 + e.clientY - y0)); t.style.top = (top / innerHeight * 100) + '%'; }
      });
      t.addEventListener('pointerup', function () { if (moved) { try { localStorage.setItem(key, parseFloat(t.style.top)); } catch (e) {} } });
      t.onclick = function (e) { if (moved) { e.preventDefault(); moved = false; return; } open(); };
      t.style.touchAction = 'none';
      document.body.appendChild(t);
    }
    sos();
  }
  /* ایپ کے ہر 🆘 (ہیلپ ڈیسک والے بٹن میں) کو گول «SOS» نشان سے بدلیں — مینیو دوبارہ بنے تب بھی */
  // انگریزی (بین الاقوامی) ایپس میں نیچے کی لائن انگریزی — HD0311TU029 (مالک کا حکم)
  var EN_APPS = { AIO: 1, 'AIO-POS-DIRECT': 1, FFPOS: 1, DG: 1, MT: 1 };
  var SOS_CAP = EN_APPS[CFG.app] ? '<em class="e">Report problems &amp; issues</em>' : '<em class="u">مسائل و تجاویز</em>';
  var SOS_TITLE = EN_APPS[CFG.app] ? 'Help Desk — Report problems & issues' : 'Help Desk — مسائل و تجاویز';
  var SOS_HTML = '<span class="pbthd-ic">?</span><span class="pbthd-tx"><b>Help Desk</b><i>' + SOS_CAP + '</i></span>';
  var SOS_SEL = '[onclick*="elpDesk"],[data-nav-id="22"],.pbthd-host';
  function sos() {
    var hosts = document.querySelectorAll(SOS_SEL), added = 0;
    for (var k = 0; k < hosts.length; k++) {
      var h = hosts[k];
      if (h.querySelector('.pbthd-sos') || h.textContent.indexOf('\uD83C\uDD98') < 0) continue;
      var w = document.createTreeWalker(h, NodeFilter.SHOW_TEXT, null), n, list = [];
      while ((n = w.nextNode())) if (n.nodeValue.indexOf('\uD83C\uDD98') >= 0) list.push(n);
      list.forEach(function (tn) {
        var parts = tn.nodeValue.split('\uD83C\uDD98'), f = document.createDocumentFragment();
        parts.forEach(function (p, i) {
          if (i) { var b = document.createElement('span'); b.className = 'pbthd-sos'; b.title = SOS_TITLE; b.innerHTML = SOS_HTML; f.appendChild(b); }
          if (p) f.appendChild(document.createTextNode(p));
        });
        tn.parentNode.replaceChild(f, tn);
      });
      var only = h.cloneNode(true), q = only.querySelector('.pbthd-sos'); if (q) q.remove();
      if (h.tagName === 'BUTTON' && !only.textContent.trim()) h.classList.add('pbthd-host');
      added = 1; watch(h.parentElement); watch(h.parentElement && h.parentElement.parentElement);
    }
    if (added) fit();
  }
  // صفحہ دائیں بائیں سرکنے لگے (پٹی میں جگہ کم) تو بٹن خود چھوٹا
  function fit() {
    var de = document.documentElement, all = document.querySelectorAll('.pbthd-sos');
    if (!all.length) return;
    var over = function () {                          // صفحے اور پٹی (5 درجے اوپر تک) کی زائد چوڑائی کا جوڑ
      var t = Math.max(0, de.scrollWidth - de.clientWidth);
      for (var i = 0; i < all.length; i++) {
        var e = all[i].parentElement;
        for (var d = 0; e && d < 5 && e !== document.body; d++, e = e.parentElement)
          if (e.clientWidth) t += Math.max(0, e.scrollWidth - e.clientWidth);
      }
      return t;
    };
    var set = function (c) { for (var i = 0; i < all.length; i++) { all[i].classList.remove('pbthd-mini', 'pbthd-help', 'pbthd-tiny'); if (c) all[i].classList.add(c); } };
    fitAt = Date.now();
    set('pbthd-tiny'); var base = over() + 1;          // بٹن کے بغیر جو پہلے سے تنگ ہو، وہ بٹن کا قصور نہیں
    set(''); if (over() <= base) return;
    set('pbthd-mini'); if (over() <= base) return;
    set('pbthd-help'); if (over() <= base) return;
    set('pbthd-tiny');
  }
  var sosT = 0, fitAt = 0, fitT = 0, ro = null;
  // چھپی پٹی بعد میں کھلے (ہوم، مینیو) تب بھی ناپ کر چھوٹا/بڑا
  try { ro = new ResizeObserver(function () { if (Date.now() - fitAt < 400) return; clearTimeout(fitT); fitT = setTimeout(fit, 120); }); } catch (e) {}
  function watch(el) { if (ro && el && !el.pbthdRo) { el.pbthdRo = 1; ro.observe(el); } }
  try { window.addEventListener('resize', function () { clearTimeout(sosT); sosT = setTimeout(fit, 150); }); } catch (e) {}
  try { new MutationObserver(function () { clearTimeout(sosT); sosT = setTimeout(sos, 120); }).observe(document.documentElement, { childList: true, subtree: true }); } catch (e) {}
  // ایپ کی اپنی پٹی میں رکھا بٹن: <button onclick="openHelpDesk()">🆘</button> — یہ خود گول SOS بن جاتا ہے اور ہیلپ ڈیسک کھولتا ہے
  if (typeof window.openHelpDesk !== 'function') window.openHelpDesk = function (o) { open(o); };
  window.PBTHelp = {
    open: open, close: close, button: button,
    config: function (o) { Object.assign(CFG, o || {}); }
  };
  css();
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount); else mount();
})();
