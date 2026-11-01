#!/usr/bin/env python3
"""PBT Help Desk — خودکار Claude سیشن کا آلہ (فائربیس REST، مالک کے اکاؤنٹ سے)

پاس ورڈ کبھی فائل میں نہیں: ماحول کا متغیر HD_OWNER_PASSWORD (cloud environment کی سیٹنگ میں مالک نے رکھا)۔

  python3 help/tools/hd.py list              # کھلے مسائل (new / seen / work) + منظوری والے (hold)
  python3 help/tools/hd.py list --all        # سب
  python3 help/tools/hd.py show <no|id>      # پوری تفصیل + اسکرین شاٹ/آواز /tmp/hd/<no>/ میں
  python3 help/tools/hd.py set <no|id> status=work
  python3 help/tools/hd.py set <no|id> status=done reply="…"          # doneAt / replyAt خود
  python3 help/tools/hd.py set <no|id> hold=approve review="…" pr=https://github.com/…
  python3 help/tools/hd.py set <no|id> status=dup dupOf=12

HD_EMU=1 ہو تو مقامی فائربیس ایمولیٹر (127.0.0.1:9099 / 8080) — جانچ کے لیے۔
"""
import base64, json, os, subprocess, sys, time

API_KEY = 'AIzaSyDZ9ONTLYsRB_MS6n5hH-IUtquiPbqsO0A'
PROJECT = 'pbt-help-desk'
OWNER_EMAIL = 'piarybhai@gmail.com'
EMU = os.environ.get('HD_EMU') == '1'
AUTH = ('http://127.0.0.1:9099/identitytoolkit.googleapis.com' if EMU else 'https://identitytoolkit.googleapis.com')
FS = ('http://127.0.0.1:8080' if EMU else 'https://firestore.googleapis.com') + f'/v1/projects/{PROJECT}/databases/(default)/documents'
NUM_FIELDS = {'no', 'shots', 'created', 'upd', 'replyAt', 'doneAt', 'dupOf'}
BOOL_FIELDS = {'audio', 'pub'}


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


def cmd_list(tok, everything):
    L = sorted(all_issues(tok), key=lambda i: i.get('created', 0))
    for i in L:
        if not everything and i.get('status') not in ('new', 'seen', 'work') and i.get('hold') not in ('go', 'merge'):
            continue
        print(json.dumps({k: i.get(k) for k in ('no', 'id', 'app', 'type', 'status', 'hold', 'ver', 'lang', 'shots', 'audio', 'pr')}
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
    mask = '&'.join('updateMask.fieldPaths=' + k for k in patch)
    curl('PATCH', f"{FS}/issues/{i['id']}?{mask}", {'fields': {k: enc(k, v) for k, v in patch.items()}}, tok)
    print('ok', i.get('no'), {k: v for k, v in patch.items() if k != 'upd'})


if __name__ == '__main__':
    a = sys.argv[1:]
    if not a: sys.exit(__doc__)
    t = login()
    if a[0] == 'list': cmd_list(t, '--all' in a)
    elif a[0] == 'show': cmd_show(t, a[1])
    elif a[0] == 'set': cmd_set(t, a[1], a[2:])
    else: sys.exit(__doc__)
