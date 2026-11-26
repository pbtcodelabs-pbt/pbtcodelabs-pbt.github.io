# PalmEarn (ہتھیلی پر کمائی) — Prompt for Claude

> **How to use (for the owner):** Open a new Claude chat. First attach the files listed in **"Files to attach"**, then paste everything from the line **"=== PROMPT START ==="** to the end.
> Run it in **3 separate chats**, one per phase (Phase 1, then Phase 2, then Phase 3), so a single chat never runs out of room.

---

## Files to attach

| # | File | Where to get it |
|---|---|---|
| 1 | `PE….zip` (the new, still-empty **PalmEarn** portal: `index.html`, `sw.js`, `manifest.json`) | Help Desk (log in) → 📦 Fresh zip → **PalmEarn** |
| 1b | `AGP….zip` (the MCS Agent portal: `index.html`, `ui2.js`, `ui2.css`) — **only as a design/code reference, do not change it** | Help Desk → 📦 Fresh zip → **MCS Agent** |
| 2 | `HD….zip`, only for its `zips.js` and a copy of the `APKS` / `APPS` list (both lists are already copied into this prompt, so attaching it is optional) | Help Desk → 📦 Fresh zip → **Help Desk** |
| 3 | 2–3 screenshots of the current MCS Agent portal (login screen, earnings page, payout request page) | Your phone |
| 4 | (Phase 3 only) the zip of each app that gets the PalmEarn button | Help Desk → 📦 Fresh zip → that app's icon |

**Do not attach** `cloudflare-worker/worker.js` (450 KB) or Help Desk `app.js` (300 KB). They are too large for one chat. The server work goes in **Phase 2** as a written specification.

---

=== PROMPT START ===

You are working for the owner of **PBT Code Labs**, a small Pakistani software house. The owner does not write code. **Talk to the owner only in simple Urdu**, call him «عالی جاہ», keep answers short, and never ask him to edit code by hand. Deliver finished files as a zip he can upload himself.

## 1. Background (what already exists — reuse it, don't rebuild it)

- One website, `https://pbtcodelabs-pbt.github.io/`, hosts many apps, each in its own folder (`/SM/`, `/AB/`, `/MA/` …). They all share **one localStorage**, so every key you add must start with `pe_` (PalmEarn). Never call `localStorage.clear()`. A service worker may delete **only its own** caches.
- **MCS Agent portal** (`/agent/`, the attached `AGP….zip`). It is a working portal where agents sign in with **mobile + PIN**. It has:
  - earnings per month;
  - commission rates that are versioned (an old sale is **never** recalculated);
  - payout request with proof (JazzCash / EasyPaisa / bank);
  - Admin 1 / Admin 2 roles;
  - void / unvoid and gift operations.

  All money maths runs on the server route `/fin2` (Cloudflare worker `aio-pos-verify`). **The portal never calculates money itself — it only displays what the server returns.** Keep that rule.
- **Help Desk** (`/help/`): the owner's control room. Packages are activated there per app ID (AIO ID, SM ID, MD ID, MCS number …) through the server (`/aioid`, `/entclaim`). Its "📲 APK" section gives each app a Download / Share / Copy / Web button.
- App list and install links (copied from the Help Desk):

| ID | Name | Install | Store |
|---|---|---|---|
| SM | Sabzi Mandi | APK `github.com/pbtcodelabs-pbt/SM/releases/download/sm-webview-apk/SabziMandi.apk` | Direct |
| AB | Arhat Book | APK (tag `apk-arhatbook`) | Direct |
| AIO-POS-DIRECT | AIO POS Direct | APK (tag `apk-aioposdirect`) | Direct |
| Hifz-progress | Madrasa Management | APK `…/Hifz-progress/releases/download/madrasa-apk/Madrasa.apk` | Direct |
| MA | Maktaba | APK (tag `apk-maktaba`) | Direct |
| DDL | Doodh Diary | APK (tag `apk-doodhdiary`) | Direct (free) |
| MS | Medicine Shelf | APK (tag `apk-medicineshelf`) | Direct (free) |
| AIO | AIO POS | Google Play `com.pbtcodelabs.aiopos` | **Play Store** |
| FFPOS | FFPOS | Google Play `com.pbtcodelabs.ffpos` | **Play Store** |
| MCS | My City Shines | Google Play `com.pbtcodelabs.mycityshines` | **Play Store** |
| DG | GG Khatabook | Web | (Play Store coming) |
| FM | Fruit Mandi | **Saddam's own app and own subscription — NOT part of PalmEarn** | — |

  The tagged APKs live at `https://github.com/pbtcodelabs-pbt/pbtcodelabs-pbt.github.io/releases/download/<tag>/<Name>.apk`.

## 2. The idea (owner's words, cleaned up)

Build **PalmEarn — «ہتھیلی پر کمائی»** as its **own separate portal** at `https://pbtcodelabs-pbt.github.io/earn/` (folder `earn/`, already created with a placeholder page, icon and service worker; version prefix `PE`, e.g. `PE2611TH001`). It is one agent portal for **all** paid PBT apps. Copy the look and the proven ideas from the MCS Agent portal, but **do not change the MCS Agent portal** (`agent/`) — old MCS agents keep working there:

- An agent signs up and gives their full details:
  - name and father's name;
  - CNIC number with front and back photos;
  - mobile number;
  - city;
  - JazzCash / EasyPaisa / bank details for payouts.
- The owner (Admin 1) approves the agent. The agent then gets an **agent code** (`AG###`, the same series as today's MCS agents; existing MCS agents keep their codes and history).
- Inside the portal the agent sees **one card per enabled app**, with icon, name, a short Urdu sales line, and buttons: **⬇️ APK / ▶️ Google Play**, **📤 Share** (WhatsApp text with the agent's code), **🔗 Copy link**, **🌐 Web**, and **🎬 Intro video** (when one exists). The owner chooses which apps are on the list using **➕ Add / ✖ Remove** in the Admin view (stored on the server, so it is never hard-coded).
- The agent visits a shop, installs the app and helps the owner sign up. When the shop **buys its first paid package**, that sale is linked to the agent's code and the agent earns **X% of the first package**. The owner proposed 50%; the exact percentage must be a **per-app setting in Admin**, versioned like today's MCS rates.
- **Cash / JazzCash / EasyPaisa packages** (Direct apps) are activated by Admin from the Help Desk as today. The commission becomes **"pending"**, then **"payable"** after a hold period (Admin setting, default 7 days), so a refund or fake shop can be caught in time.
- **Google Play packages** (AIO, FFPOS, MCS): the commission stays **"pending" until Google's money actually arrives**. Admin marks it "received" in a monthly batch. Calculate the commission on the **net amount after Google's 15% fee**, never on the gross price.
- Payouts work like the current MCS Agent portal: the agent requests a payout, Admin 1 pays and uploads proof, and the agent sees the proof.
- Admin sees everything:
  - all agents with KYC status (pending / approved / blocked);
  - sales per agent and per app;
  - pending / payable / paid totals;
  - an export.

## 3. Hard rules (do NOT break these)

1. **Google Play policy:** inside the Play Store apps (AIO, FFPOS, MCS, and DG later), **never** show earnings, commission, rupees, "become an agent and earn", a link to the PalmEarn portal, or any outside payment.
   - The «Palm Earning» button goes **only into the Direct (non-Play) apps**.
   - For Play apps, the link between agent and shop is made **outside the app**:
     - the agent types the shop's app ID (AIO ID / MCS number) in the portal, as "my client";
     - Admin confirms it at package activation.
2. Commission is **only on real money received**: never on a trial or a free app, and never on a package Admin gave as a gift.
3. **One shop = one agent, the first one claims it.** An agent cannot claim a shop that registered more than N days before the claim (Admin setting), and cannot claim their own phone number or CNIC.
4. CNIC photos and bank details are **sensitive**:
   - keep them only on the server, never in Firestore public collections;
   - only Admin 1 can view them;
   - never put them in logs, URLs or screenshots.
5. All money stays in **paisa integers** (rupees × 100). The server calculates everything and the portal only displays it. An old sale's rate never changes.
6. **PalmEarn has ONE admin only: Admin 1 (the owner).** There is no Admin 2 / co-developer role in PalmEarn — no Admin 2 login, menu, approval or view of PalmEarn data, KYC, money or payouts (the MCS Agent portal's existing Admin 2 rights stay only for the old MCS screens). Anyone else, Admin 2 included, can join PalmEarn **only as a normal agent**. Visible name "Admin 1", never "Developer". Agent-facing text is Urdu (Nastaliq), numbers in English digits.
7. The portal works on a phone (360 px), a tablet and a desktop (1366 px) with no horizontal scroll.
8. Version format: `PE` + DDMM + day (MO/TU/WE/TH/FR/SA/SU) + 3-digit serial, always moving forward. Change `APP_VERSION` + `UPDATE_NOTE` and the service worker cache name together.

## 4. Phases — do ONE phase per chat

### Phase 1 — Portal screens (front end only), inside the `earn/` folder

- Build these screens in `earn/` (reuse the MCS Agent portal's design and code where it fits; the service worker may only touch `palmearn-` caches):
  - a. **Sign-up / KYC form:**
    - fields: name, father's name, CNIC, front and back CNIC photos (compress in the browser to ≤ 250 KB each), mobile, city, JazzCash / EasyPaisa / bank;
    - a status page («منظوری کا انتظار / منظور / روک دیا گیا»).
  - b. **«میری ایپس» — the app cards** described in section 2:
    - read the list from `GET /pe/apps` (Admin-controlled);
    - the share text carries the agent's code;
    - one tap on Share opens WhatsApp with Urdu text + link + «ریفرل کوڈ: AG012».
  - c. **«میرے گاہک»:**
    - the agent adds a client: app, shop name, mobile, app ID;
    - a list with status (installed / trial / package bought / commission pending / payable / paid).
  - d. **«کمائی» (earnings) and «ادائیگی کی درخواست» (payout request):**
    - reuse the current portal's design and code, extended per app.
  - e. **Admin screens:**
    - KYC approval;
    - the app list (➕ / ✖, rate %, hold days);
    - client-claim review;
    - the Play "received" batch;
    - payouts with proof upload.
- **All data goes through one file, `earn/pe-api.js`, which also has a MOCK mode** (`?mock=1`, sample data kept in memory), so the screens can be built and tested **before** the server exists.
- Deliver:
  - the `earn/` files as **`PE<new version>.zip`** (files at the zip root; always `index.html` + `sw.js` with the new version). The owner uploads it: Help Desk → 📦 Fresh zip → **PalmEarn** → «⬆️ Upload zip» — the auto-unzip puts `PE…zip` into `earn/`;
  - plus `PE-API.md`, the exact list of server calls the screens use: request and response JSON, who may call each one, and error codes.

### Phase 2 — Server specification (do NOT write the whole worker)

The server is the existing Cloudflare worker `aio-pos-verify` (file `cloudflare-worker/worker.js` in the AIO repo, 450 KB, deployed automatically from `main`). It is too large for this chat. So:

- Write **`PE-SERVER-SPEC.md`**, which a developer will paste into the worker. It covers:
  - every `/pe/*` route from `PE-API.md`;
  - the storage layout (a Durable Object / SQLite like the existing `McsStats`);
  - the auth rules (agent = mobile + PIN like `/fin2`; Admin = the existing `verifyFirebaseAdmin`);
  - the hook to call from the existing package activation (`/aioid` / `/entclaim` / `mcsact`) so that a paid activation creates a "pending" commission line for the claimed agent;
  - rate versioning;
  - the hold timer;
  - the Play "received" batch;
  - payouts;
  - fraud checks (rule 3);
  - a test list (`node:sqlite`, like the existing `McsStats` tests).
- Also write a short Urdu note for the owner: «سرور والا حصہ پیڈ Claude سے ایک چھوٹے سیشن میں لگوائیں — یہ فائل ساتھ دیں».

### Phase 3 — The «Palm Earning» button in the Direct apps only

- For each Direct app the owner names (from SM, AB, AIO-POS-DIRECT, Hifz-progress, MA — **never** AIO, FFPOS, MCS, DG, FM):
  - add one small button «🤲 Palm Earning — ہتھیلی پر کمائی» in its menu or settings (not a big box on Home);
  - it opens a sheet: 3 lines of Urdu motivation («ہماری ایپ دوسرے دکانداروں کو لگوائیں — ہر نئے پیکج پر کمیشن»), a «🎬 دیکھیں کیسے» video link, and «✅ ایجنٹ بنیں» → `https://pbtcodelabs-pbt.github.io/earn/?from=<APP_ID>`.
- Follow each app's own `CLAUDE.md`: new version + `UPDATE_NOTE`, the shared-website rules, AB's Urdu-only rule (no English word in AB).
- Deliver each app as its own `<version>.zip`.

## 5. Before you start coding (Phase 1)

Ask the owner, in Urdu, as **one short list**:

1. Which apps go on the list now?
2. The commission percentage per app. 50% is the owner's idea; recommend a number.
3. The hold days. Default 7.
4. Is there a minimum payout amount?
5. Should agents also get a small commission on renewals?
6. Should the existing MCS agents be invited into PalmEarn (as normal agents)?

Then build.

=== PROMPT END ===
