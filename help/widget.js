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
    /* SOS نشان: گول کونے، سرخ، سفید کنارہ، ہلکی چمک — ہر ایپ کے 🆘 کی جگہ خود */
    + '.pbthd-sos{display:inline-flex;align-items:center;justify-content:center;min-width:32px;height:22px;padding:0 7px;border-radius:12px;box-sizing:border-box;'
    + 'background:linear-gradient(135deg,#ff5252,#c62828);color:#fff !important;font:900 11px/1 Arial,Helvetica,sans-serif;letter-spacing:.6px;'
    + 'border:1.5px solid #fff;box-shadow:0 0 0 2px rgba(239,68,68,.4),0 2px 6px rgba(0,0,0,.3);animation:pbthdSos 2.4s ease-in-out infinite;vertical-align:middle;direction:ltr}'
    + '@keyframes pbthdSos{50%{box-shadow:0 0 0 5px rgba(239,68,68,.12),0 2px 6px rgba(0,0,0,.3)}}'
    + '.pbthd-host{background:transparent !important;box-shadow:none !important}'
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
      t.innerHTML = '<span class="pbthd-sos">SOS</span><span>Help</span>';
      t.onclick = function () { open(); };
      document.body.appendChild(t);
    }
    sos();
  }
  /* ایپ کے ہر 🆘 (ہیلپ ڈیسک والے بٹن میں) کو گول «SOS» نشان سے بدلیں — مینیو دوبارہ بنے تب بھی */
  var SOS_SEL = '[onclick*="elpDesk"],[data-nav-id="22"],.pbthd-host';
  function sos() {
    var hosts = document.querySelectorAll(SOS_SEL);
    for (var k = 0; k < hosts.length; k++) {
      var h = hosts[k];
      if (h.querySelector('.pbthd-sos') || h.textContent.indexOf('\uD83C\uDD98') < 0) continue;
      var w = document.createTreeWalker(h, NodeFilter.SHOW_TEXT, null), n, list = [];
      while ((n = w.nextNode())) if (n.nodeValue.indexOf('\uD83C\uDD98') >= 0) list.push(n);
      list.forEach(function (tn) {
        var parts = tn.nodeValue.split('\uD83C\uDD98'), f = document.createDocumentFragment();
        parts.forEach(function (p, i) {
          if (i) { var b = document.createElement('span'); b.className = 'pbthd-sos'; b.textContent = 'SOS'; f.appendChild(b); }
          if (p) f.appendChild(document.createTextNode(p));
        });
        tn.parentNode.replaceChild(f, tn);
      });
      if (h.tagName === 'BUTTON' && h.textContent.trim() === 'SOS') h.classList.add('pbthd-host');
    }
  }
  var sosT = 0;
  try { new MutationObserver(function () { clearTimeout(sosT); sosT = setTimeout(sos, 120); }).observe(document.documentElement, { childList: true, subtree: true }); } catch (e) {}
  window.PBTHelp = {
    open: open, close: close, button: button,
    config: function (o) { Object.assign(CFG, o || {}); }
  };
  css();
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount); else mount();
})();
