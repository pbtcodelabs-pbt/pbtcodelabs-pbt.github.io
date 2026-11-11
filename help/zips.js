/* HD1111WE075 (مالک کا حکم): «📦 تازہ زپ» — ہر ایپ کی ابھی لائیو (ریپو main) فائلیں اسی وقت اٹھا کر زپ `<ورژن>.zip`
   (اندر index.html + sw.js + باقی جڑ کی کوڈ فائلیں)۔ فری Claude / کسی اور سے کام ہوا ہو تب بھی یہی تازہ ورژن۔
   فائلیں raw.githubusercontent.com سے (عوامی ریپو، CORS کھلا)؛ فہرست api.github.com سے، نہ ملے تو `files`۔ زپ بغیر دبائے (store) + CRC32۔ */
(function () {
  const RX = s => new RegExp(s);
  const ZA = {
    'AIO': { v: 'AIO(?!DR)\\d{4}[A-Z]{2}\\d{3}', up: 'pbtcodelabs-pbt/AIO' },
    'AIO-POS-DIRECT': { v: 'AIODR\\d{4}[A-Z]{2}\\d{3}' },
    'FFPOS': { v: 'FF\\d{4}[A-Z]{2}\\d{3}' },
    'SM': { v: 'SM\\d{4}[A-Z]{2}\\d{3}' }, 'FM': { v: 'FM\\d{4}[A-Z]{2}\\d{3}' }, 'AB': { v: 'AB\\d{4}[A-Z]{2}\\d{3}' },
    'DG': { v: 'GG\\d{4}[A-Z]{2}\\d{3}' }, 'DDL': { v: 'DDL\\d{4}[A-Z]{2}\\d{3}' }, 'Hifz-progress': { v: 'MD\\d{4}[A-Z]{2}\\d{3}' },
    'hafiz-musab-app': { v: 'HFZ\\d{4}[A-Z]{2}\\d{3}' }, 'MA': { v: 'MA\\d{3,4}[A-Z]{2}\\d{3}', extra: ['diary/index.html'] },
    'MS': { v: 'MS\\d{4}[A-Z]{2}\\d{3}' }, 'Stylish-listing-': { v: 'SL\\d{3}[a-zA-Z]{2}\\d{4}' }, 'MT': { v: 'mt\\d{4}[a-zA-Z]{2}\\d{3}' },
    'MCS': { v: 'MCS\\d{4}[A-Z]{2}\\d{3}' }, 'urdu-fonts-studio': { v: 'UF\\d{3,4}[A-Za-z]{2}\\d{3,4}(?:AM|PM)?' },
    'PBT-Portal': { v: 'AGP\\d{4}[A-Z]{2}\\d{3}', dir: 'agent', files: ['index.html', 'ui2.js', 'ui2.css', 'manifest.json'], vf: 'index.html' },
    'HD': { v: 'HD\\d{4}[A-Z]{2}\\d{3}', dir: 'help', repo: 'pbtcodelabs-pbt/pbtcodelabs-pbt.github.io', files: ['index.html', 'sw.js', 'app.js', 'store.js', 'upd.js', 'widget.js', 'zips.js'], vf: 'app.js' }
  };
  const CODE = /\.(html|js|css|json)$/i, SKIP = /^(package(-lock)?\.json|firebase\.json|twa-manifest\.json|.*\.min\.js|block\.json)$/i;
  // ---- چھوٹا زپ بنانے والا ----
  const CT = (() => { const t = new Uint32Array(256); for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; } return t; })();
  const crc = u => { let c = 0xFFFFFFFF; for (let i = 0; i < u.length; i++) c = CT[(c ^ u[i]) & 255] ^ (c >>> 8); return (c ^ 0xFFFFFFFF) >>> 0; };
  function zip(list) { // [{name, data:Uint8Array}]
    const enc = new TextEncoder(), parts = [], cen = []; let off = 0;
    const d = new Date(), dt = ((d.getHours() << 11) | (d.getMinutes() << 5) | (d.getSeconds() >> 1)) & 0xFFFF, dd = (((d.getFullYear() - 1980) << 9) | ((d.getMonth() + 1) << 5) | d.getDate()) & 0xFFFF;
    for (const f of list) {
      const nm = enc.encode(f.name), c = crc(f.data), n = f.data.length;
      const h = new DataView(new ArrayBuffer(30)); [[0, 0x04034b50, 4], [4, 20, 2], [6, 0x0800, 2], [8, 0, 2], [10, dt, 2], [12, dd, 2], [14, c, 4], [18, n, 4], [22, n, 4], [26, nm.length, 2], [28, 0, 2]].forEach(([o, v, s]) => s === 4 ? h.setUint32(o, v, true) : h.setUint16(o, v, true));
      parts.push(new Uint8Array(h.buffer), nm, f.data);
      const ch = new DataView(new ArrayBuffer(46)); [[0, 0x02014b50, 4], [4, 20, 2], [6, 20, 2], [8, 0x0800, 2], [10, 0, 2], [12, dt, 2], [14, dd, 2], [16, c, 4], [20, n, 4], [24, n, 4], [28, nm.length, 2], [30, 0, 2], [32, 0, 2], [34, 0, 2], [36, 0, 2], [38, 0, 4], [42, off, 4]].forEach(([o, v, s]) => s === 4 ? ch.setUint32(o, v, true) : ch.setUint16(o, v, true));
      cen.push(new Uint8Array(ch.buffer), nm); off += 30 + nm.length + n;
    }
    const cs = cen.reduce((a, b) => a + b.length, 0), e = new DataView(new ArrayBuffer(22));
    [[0, 0x06054b50, 4], [8, list.length, 2], [10, list.length, 2], [12, cs, 4], [16, off, 4]].forEach(([o, v, s]) => s === 4 ? e.setUint32(o, v, true) : e.setUint16(o, v, true));
    return new Blob([...parts, ...cen, new Uint8Array(e.buffer)], { type: 'application/zip' });
  }
  const bust = () => 't=' + Date.now();
  async function listFiles(repo, dir) {
    try {
      const r = await fetch(`https://api.github.com/repos/${repo}/contents${dir ? "/" + dir : ""}?ref=main`, { cache: 'no-store' });
      if (!r.ok) throw 0; const j = await r.json();
      return j.filter(x => x.type === 'file' && CODE.test(x.name) && !SKIP.test(x.name)).map(x => x.name);
    } catch (e) { return null; }
  }
  async function getFile(repo, path) {
    const r = await fetch(`https://raw.githubusercontent.com/${repo}/main/${path}?${bust()}`, { cache: 'no-store' });
    if (!r.ok) throw new Error(path + ' ' + r.status); return new Uint8Array(await r.arrayBuffer());
  }
  async function build(id, repo, onStep) {
    const z = ZA[id]; if (!z) throw new Error('no-app');
    repo = z.repo || repo; const dir = z.dir ? z.dir + '/' : '';
    onStep && onStep('📋');
    let names = z.files || await listFiles(repo, z.dir) || ['index.html', 'sw.js'];
    if (!z.files) { names = names.filter(n => n !== 'sw.js' && n !== 'index.html'); names.unshift('index.html', 'sw.js'); }
    names = [...names, ...(z.extra || [])];
    const out = [], dec = new TextDecoder(); let ver = '';
    // ورژن: پہلے «VERSION / CACHE… / APP_VERSION = '…'» والی لائن، ورنہ فائل میں سب سے بڑا سیریل (سیریل ہمیشہ آگے)
    const pick = t => { const a = t.match(RX('(?:APP_VERSION|CACHE_VERSION|CACHE_NAME|VERSION|CACHE)\\s*=\\s*[\'"`][^\'"`]*?(' + z.v + ')')); if (a) return a[1];
      const all = t.match(new RegExp(z.v, 'g')) || []; let best = '', bs = -1;
      all.forEach(m => { const n = +((m.match(/(\d{3})(?:AM|PM)?$/) || [0, -1])[1]); if (n > bs) { bs = n; best = m; } }); return best; };
    for (let i = 0; i < names.length; i++) {
      onStep && onStep(`⬇️ ${i + 1}/${names.length}`);
      let data; try { data = await getFile(repo, dir + names[i]); } catch (e) { if (names[i] === 'index.html') throw e; continue; }
      out.push({ name: names[i], data });
    }
    const vf = out.find(f => f.name === (z.vf || 'sw.js')); if (vf) ver = pick(dec.decode(vf.data));
    if (!ver) { for (const f of out) { ver = pick(dec.decode(f.data)); if (ver) break; } }
    return { ver: ver || (id + '-' + new Date().toISOString().slice(0, 10)), files: out, blob: zip(out), repo, dir: z.dir || '' };
  }
  window.HDZips = { ZA, build, has: id => !!ZA[id] };
})();
