#!/usr/bin/env python3
"""PBT Help Desk — خودکار Claude سیشن کا آلہ (فائربیس REST، مالک کے اکاؤنٹ سے)

پاس ورڈ کبھی فائل میں نہیں: ماحول کا متغیر HD_OWNER_PASSWORD (cloud environment کی سیٹنگ میں مالک نے رکھا)۔

  python3 help/tools/hd.py list              # کھلے مسائل (new / seen / work) + منظوری والے (hold)
  python3 help/tools/hd.py list --all        # سب
  python3 help/tools/hd.py list --urgent     # صرف ⚡ فوری (مالک کا اپنا بھی صرف ⚡ ہو تو)
  python3 help/tools/hd.py show <no|id>      # پوری تفصیل + اسکرین شاٹ/آواز /tmp/hd/<no>/ میں
  python3 help/tools/hd.py set <no|id> status=work
  python3 help/tools/hd.py set <no|id> status=done reply="…"          # doneAt / replyAt خود
  python3 help/tools/hd.py set <no|id> hold=approve review="…" pr=https://github.com/…
  python3 help/tools/hd.py set <no|id> status=dup dupOf=12
  python3 help/tools/hd.py set <no|id> stage=work          # ⚡ فوری کی پیش رفت: seen → work → test → push → live → done
  python3 help/tools/hd.py add <app> <bug|idea|ask> "متن" [urgent] [done "جواب"]   # مالک نے چیٹ میں جو کام کہا، ہیلپ ڈیسک میں درج
  python3 help/tools/hd.py notify [--force]  # 🔔 مالک کے فون پر اطلاع (نئے / کام جاری / منظوری) — صرف تبدیلی پر

HD_EMU=1 ہو تو مقامی فائربیس ایمولیٹر (127.0.0.1:9099 / 8080) — جانچ کے لیے۔
"""
import base64, json, os, subprocess, sys, time

API_KEY = 'AIzaSyDZ9ONTLYsRB_MS6n5hH-IUtquiPbqsO0A'
PROJECT = 'pbt-help-desk'
OWNER_EMAIL = 'piarybhai@gmail.com'
OWNER_UID = 's6L0FAs6krVDRAHKf70ggM3LamH2'
EMU = os.environ.get('HD_EMU') == '1'
AUTH = ('http://127.0.0.1:9099/identitytoolkit.googleapis.com' if EMU else 'https://identitytoolkit.googleapis.com')
FS = ('http://127.0.0.1:8080' if EMU else 'https://firestore.googleapis.com') + f'/v1/projects/{PROJECT}/databases/(default)/documents'
NUM_FIELDS = {'no', 'shots', 'created', 'upd', 'replyAt', 'doneAt', 'dupOf', 'stageAt'}
BOOL_FIELDS = {'audio', 'pub', 'urgent'}


def curl(method, url, body=None, token=None):
    cmd = ['curl', '-sS', '-X', method, url, '-H', 'Content-Type: application/json']
    if token:
        cmd += ['-H', 'Authorization: Bearer ' + token]
    if body is not None:
        cmd += ['--data-binary', '@-']
    r = subprocess.run(cmd, input=(json.dumps(body).encode() if body is not None else None), capture_output=True, timeout=120)
    out = r.stdout.decode() or '{}'
    try:
        j = json.loads(out)
    except Exception:
        sys.exit('bad response: ' + out[:300])
    if isinstance(j, dict) and 'error' in j:
        sys.exit('error: ' + json.dumps(j['error'], ensure_ascii=False)[:400])
    return j


def login():
    pw = os.environ.get('HD_OWNER_PASSWORD') or ('secret123' if EMU else '')
    if not pw:
        sys.exit('HD_OWNER_PASSWORD نہیں ملا — مالک environment کی سیٹنگ میں رکھے')
    j = curl('POST', f'{AUTH}/v1/accounts:signInWithPassword?key={API_KEY}',
             {'email': OWNER_EMAIL, 'password': pw, 'returnSecureToken': True})
    return j['idToken']


def dec(v):
    if 'stringValue' in v: return v['stringValue']
    if 'integerValue' in v: return int(v['integerValue'])
    if 'doubleValue' in v: return v['doubleValue']
    if 'booleanValue' in v: return v['booleanValue']
    if 'nullValue' in v: return None
    if 'arrayValue' in v: return [dec(x) for x in v['arrayValue'].get('values', [])]
    if 'mapValue' in v: return {k: dec(x) for k, x in v['mapValue'].get('fields', {}).items()}
    return None


def enc(k, v):
    if k in NUM_FIELDS: return {'integerValue': str(int(v))}
    if k in BOOL_FIELDS: return {'booleanValue': v in (True, 'true', '1', 1)}
    return {'stringValue': str(v)}


def doc(d):
    o = {k: dec(v) for k, v in d.get('fields', {}).items()}
    o['id'] = d['name'].rsplit('/', 1)[1]
    return o


def all_issues(tok):
    out, page = [], ''
    while True:
        j = curl('GET', f'{FS}/issues?pageSize=300' + (f'&pageToken={page}' if page else ''), token=tok)
        out += [doc(d) for d in j.get('documents', [])]
        page = j.get('nextPageToken')
        if not page: return out


def priv(tok, iid):
    try:
        j = curl('GET', f'{FS}/issues/{iid}/priv/c', token=tok)
        return doc(j)
    except SystemExit:
        return {}


def find(tok, key):
    for i in all_issues(tok):
        if i['id'] == key or str(i.get('no')) == str(key).lstrip('#'):
            return i
    sys.exit('نہیں ملا: ' + key)


def blobs(tok, iid):
    q = {'structuredQuery': {'from': [{'collectionId': 'blobs'}],
                             'where': {'fieldFilter': {'field': {'fieldPath': 'issue'}, 'op': 'EQUAL', 'value': {'stringValue': iid}}}}}
    j = curl('POST', f'{FS}:runQuery', q, tok)
    return [doc(r['document']) for r in j if 'document' in r]


def cmd_list(tok, everything, urgent_only=False):
    L = sorted(all_issues(tok), key=lambda i: i.get('created', 0))
    for i in L:
        if not everything and i.get('status') not in ('new', 'seen', 'work') and i.get('hold') not in ('go', 'merge'):
            continue
        own = i.get('uid') == OWNER_UID
        if not everything and i.get('hold') in ('later', 'info', 'draft'):   # HD0511TH046 / HD0511TH051 (draft = مالک کی یادداشت): مالک نے ایک طرف رکھا / گاہک سے تفصیل کا انتظار — کام نہیں
            continue
        if urgent_only and not i.get('urgent'):   # HD0511TH051: مالک کا اپنا مسئلہ بھی صرف ⚡ پر (ڈرافٹ / اگلا جائزہ نہیں)
            continue
        print(json.dumps({k: i.get(k) for k in ('no', 'id', 'app', 'type', 'status', 'hold', 'ver', 'lang', 'shots', 'audio', 'pr', 'urgent', 'stage')}
                         | {'from_owner': own}
                         | {'metoo': len(i.get('metoo') or []), 'text': (i.get('text') or '')[:200]}, ensure_ascii=False))


def cmd_show(tok, key):
    i = find(tok, key)
    i |= {k: v for k, v in priv(tok, i['id']).items() if k in ('name', 'phone')}
    i['metoo'] = len(i.get('metoo') or [])
    print(json.dumps(i, ensure_ascii=False, indent=1))
    d = f"/tmp/hd/{i.get('no')}"
    os.makedirs(d, exist_ok=True)
    for n, b in enumerate(blobs(tok, i['id']), 1):
        head, _, data = (b.get('data') or '').partition(',')
        ext = 'jpg' if 'jpeg' in head else ('png' if 'png' in head else ('webm' if 'webm' in head else ('ogg' if 'ogg' in head else 'm4a' if 'mp4' in head else 'bin')))
        p = f"{d}/{b.get('kind')}{n}.{ext}"
        open(p, 'wb').write(base64.b64decode(data))
        print('saved', p)


def cmd_set(tok, key, pairs):
    i = find(tok, key)
    patch = dict(p.split('=', 1) for p in pairs)
    now = int(time.time() * 1000)
    patch['upd'] = now
    if patch.get('status') in ('done', 'dup'): patch.setdefault('doneAt', now)
    if patch.get('reply'): patch.setdefault('replyAt', now)
    if patch.get('stage'): patch.setdefault('stageAt', now)  # ⚡ پیش رفت: sent claude seen work test push live done
    mask = '&'.join('updateMask.fieldPaths=' + k for k in patch)
    curl('PATCH', f"{FS}/issues/{i['id']}?{mask}", {'fields': {k: enc(k, v) for k, v in patch.items()}}, tok)
    print('ok', i.get('no'), {k: v for k, v in patch.items() if k != 'upd'})


# ---------- HD0311TU022: مالک کا چیٹ والا کام ہیلپ ڈیسک میں درج (نیا نمبر، مالک کے نام) ----------
def cmd_add(tok, app, typ, text, extra):
    c = curl('GET', f'{FS}/meta/counter', token=tok)
    v = int(dec(c['fields']['v'])) + 1
    curl('PATCH', f"{FS}/meta/counter?updateMask.fieldPaths=v&currentDocument.updateTime={c['updateTime']}",
         {'fields': {'v': {'integerValue': str(v)}}}, tok)
    now = int(time.time() * 1000)
    S = lambda x: {'stringValue': x}; I = lambda x: {'integerValue': str(x)}; B = lambda x: {'booleanValue': x}
    f = {'no': I(v), 'app': S(app), 'type': S(typ), 'text': S(text), 'ptext': S(''), 'ver': S(''), 'dev': S('claude-chat'),
         'shots': I(0), 'audio': B(False), 'lang': S('ur'), 'hold': S(''), 'uid': S(OWNER_UID), 'created': I(now), 'upd': I(now),
         'status': S('new'), 'pub': B(False), 'metoo': {'arrayValue': {}}, 'reply': S(''), 'replyAt': I(0), 'doneAt': I(0), 'dupOf': I(0)}
    d = curl('POST', f'{FS}/issues', {'fields': f}, tok)
    iid = d['name'].rsplit('/', 1)[1]
    curl('PATCH', f'{FS}/issues/{iid}/priv/c', {'fields': {'name': S('مالک (چیٹ)'), 'phone': S('03206793793'), 'uid': S(OWNER_UID)}}, tok)
    pairs = ['status=work', 'stage=seen'] + (['urgent=true'] if 'urgent' in extra else [])
    if 'done' in extra:
        k = extra.index('done'); pairs = ['status=done', 'stage=done'] + ([f'reply={extra[k + 1]}'] if len(extra) > k + 1 else [])
    cmd_set(tok, iid, pairs)
    print('added', v, iid)


# ---------- 🔔 HD0211MO016: Web Push (RFC 8291 aes128gcm + VAPID) — صرف cryptography لائبریری ----------
def b64u(b): return base64.urlsafe_b64encode(b).rstrip(b'=').decode()
def unb64u(s): return base64.urlsafe_b64decode(s + '=' * (-len(s) % 4))


def hkdf(salt, ikm, info, n):
    import hmac, hashlib
    prk = hmac.new(salt, ikm, hashlib.sha256).digest()
    return hmac.new(prk, info + b'\x01', hashlib.sha256).digest()[:n]


def wp_encrypt(p256dh, auth, plain):
    from cryptography.hazmat.primitives.asymmetric import ec
    from cryptography.hazmat.primitives import serialization
    from cryptography.hazmat.primitives.ciphers.aead import AESGCM
    ua_pub = unb64u(p256dh)
    ua = ec.EllipticCurvePublicKey.from_encoded_point(ec.SECP256R1(), ua_pub)
    eph = ec.generate_private_key(ec.SECP256R1())
    as_pub = eph.public_key().public_bytes(serialization.Encoding.X962, serialization.PublicFormat.UncompressedPoint)
    shared = eph.exchange(ec.ECDH(), ua)
    ikm = hkdf(unb64u(auth), shared, b'WebPush: info\x00' + ua_pub + as_pub, 32)
    salt = os.urandom(16)
    cek = hkdf(salt, ikm, b'Content-Encoding: aes128gcm\x00', 16)
    nonce = hkdf(salt, ikm, b'Content-Encoding: nonce\x00', 12)
    ct = AESGCM(cek).encrypt(nonce, plain + b'\x02', None)
    return salt + (4096).to_bytes(4, 'big') + bytes([len(as_pub)]) + as_pub + ct


def vapid_jwt(endpoint, d_b64, pub_b64):
    from urllib.parse import urlparse
    from cryptography.hazmat.primitives.asymmetric import ec
    from cryptography.hazmat.primitives import hashes
    from cryptography.hazmat.primitives.asymmetric.utils import decode_dss_signature
    u = urlparse(endpoint)
    head = b64u(json.dumps({'typ': 'JWT', 'alg': 'ES256'}).encode())
    body = b64u(json.dumps({'aud': f'{u.scheme}://{u.netloc}', 'exp': int(time.time()) + 12 * 3600,
                            'sub': 'https://pbtcodelabs-pbt.github.io/help/'}).encode())
    key = ec.derive_private_key(int.from_bytes(unb64u(d_b64), 'big'), ec.SECP256R1())
    r, s_ = decode_dss_signature(key.sign(f'{head}.{body}'.encode(), ec.ECDSA(hashes.SHA256())))
    return f'{head}.{body}.' + b64u(r.to_bytes(32, 'big') + s_.to_bytes(32, 'big'))


def wp_send(sub, P, payload):
    body = wp_encrypt(sub['p256dh'], sub['auth'], json.dumps(payload, ensure_ascii=False).encode())
    tmp = f'/tmp/hd_push_{os.getpid()}.bin'
    open(tmp, 'wb').write(body)
    cmd = ['curl', '-sS', '-o', '/dev/null', '-w', '%{http_code}', '-X', 'POST', sub['endpoint'],
           '-H', 'Authorization: vapid t=' + vapid_jwt(sub['endpoint'], P['vd'], P['vpub']) + ', k=' + P['vpub'],
           '-H', 'Content-Encoding: aes128gcm', '-H', 'Content-Type: application/octet-stream',
           '-H', 'TTL: 86400', '-H', 'Urgency: high', '--data-binary', '@' + tmp]
    r = subprocess.run(cmd, capture_output=True, timeout=60)
    os.remove(tmp)
    try: return int(r.stdout.decode() or 0)
    except ValueError: return 0


def cmd_limit(tok, pairs):
    """📊 HD0811SA052: ڈویلپر پینل کی ہفتہ وار حد — hd.py limit pbt=37 piary=62 pbt_reset="جمعرات صبح 9" """
    try:
        r = curl('GET', f'{FS}/push/panel', None, tok) or {}
    except SystemExit:
        r = {}  # ابھی دستاویز نہیں بنی
    lim = dec({'mapValue': {'fields': (r.get('fields') or {}).get('lim', {}).get('mapValue', {}).get('fields', {})}}) if r.get('fields') else {}
    lim = lim or {}
    now = int(time.time() * 1000)
    for p in pairs:
        k, v = p.split('=', 1)
        if k.endswith('_reset'):
            lim.setdefault(k[:-6], {})['reset'] = v
        else:
            lim.setdefault(k, {})['pct'] = max(0, min(100, int(float(v))))
            lim[k]['at'] = now; lim[k]['by'] = 'claude'
    def ev(x):
        if isinstance(x, dict): return {'mapValue': {'fields': {a: ev(b) for a, b in x.items()}}}
        if isinstance(x, bool): return {'booleanValue': x}
        if isinstance(x, int): return {'integerValue': str(x)}
        return {'stringValue': str(x)}
    curl('PATCH', f'{FS}/push/panel?updateMask.fieldPaths=lim', {'fields': {'lim': ev(lim)}}, tok)
    print('ok', json.dumps(lim, ensure_ascii=False))


def counts(L):
    held = lambda i: i.get('hold') in ('decide', 'approve')
    live = lambda i: i.get('status') not in ('done', 'dup')
    return {'nw': sum(1 for i in L if i.get('status') == 'new' and not held(i)),
            'wk': sum(1 for i in L if i.get('status') in ('seen', 'work') and not held(i)),
            'appr': sum(1 for i in L if live(i) and held(i))}


def cmd_notify(tok, force=False):
    L = all_issues(tok)
    c = counts(L)
    newest = max([i.get('no') or 0 for i in L if i.get('status') == 'new'] or [0])
    sig = f"{c['nw']}|{c['appr']}|{newest}"
    try:
        P = doc(curl('GET', f'{FS}/push/owner', token=tok))
    except SystemExit:
        print('🔔 اطلاعات چالو نہیں (push/owner نہیں ملا — مالک ڈویلپر پینل میں 🔔 دبائے، یا اصول Publish نہیں ہوئے)'); return
    subs = json.loads(P.get('subs') or '[]')
    if not subs or not P.get('vd'):
        print('🔔 کوئی فون رجسٹر نہیں'); return
    if not force and P.get('sig') == sig:
        print('🔔 کوئی تبدیلی نہیں', c); return
    if not force and c['nw'] == 0 and c['appr'] == 0 and not P.get('sig'):
        print('🔔 بتانے کو کچھ نہیں', c); return
    body = f"🔴 {c['nw']} نئے · 🔵 {c['wk']} پر کام جاری · ⏳ {c['appr']} منظوری کے منتظر"
    if c['nw'] == 0 and c['appr'] == 0: body = f"✅ کوئی نیا نہیں · 🔵 {c['wk']} پر کام جاری"
    payload = {'title': '❓ PBT Help Desk', 'body': body, 'count': c['nw'] + c['appr'], 'url': './#/owner'}
    keep, sent = [], 0
    for s_ in subs:
        code = wp_send(s_, P, payload)
        print('push', code, s_['endpoint'][:60])
        if code in (404, 410): continue
        keep.append(s_)
        if 200 <= code < 300: sent += 1
    patch = {'sig': sig, 'subs': json.dumps(keep), 'sentAt': str(int(time.time() * 1000))}
    mask = '&'.join('updateMask.fieldPaths=' + k for k in patch)
    curl('PATCH', f'{FS}/push/owner?{mask}', {'fields': {k: {'stringValue': v} for k, v in patch.items()}}, tok)
    print(f'🔔 بھیجا: {sent}/{len(subs)} — {body}')


if __name__ == '__main__':
    a = sys.argv[1:]
    if not a: sys.exit(__doc__)
    t = login()
    if a[0] == 'list': cmd_list(t, '--all' in a, '--urgent' in a)
    elif a[0] == 'show': cmd_show(t, a[1])
    elif a[0] == 'set': cmd_set(t, a[1], a[2:])
    elif a[0] == 'add': cmd_add(t, a[1], a[2], a[3], a[4:])
    elif a[0] == 'notify': cmd_notify(t, '--force' in a)
    elif a[0] == 'limit': cmd_limit(t, a[1:])
    else: sys.exit(__doc__)
