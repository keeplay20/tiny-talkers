# Ship Tiny Talkers to Google Play & App Store

One-time setup, then repeat build → test → submit for each release.

## 0. One-time: GitHub Pages (privacy URL)

1. Push `docs/privacy.html` to `main`.
2. GitHub → **Settings → Pages** → Source: **Deploy from branch** → Branch **`main`** → Folder **`/docs`** → Save.
3. Open `https://keeplay20.github.io/tiny-talkers/privacy.html` (may take 1–2 minutes).

This URL is used in `app.json`, Play Console, and App Store Connect.

## 1. One-time: EAS & credentials

```bash
npm install -g eas-cli   # or use npx eas
eas login
eas credentials        # iOS distribution cert + Android keystore (guided)
```

Set **EAS secrets** (optional, for `eas submit`):

- Apple: [App Store Connect API key](https://expo.fyi/creating-asc-api-key) → `eas secret:create`
- Google Play: service account JSON → upload in EAS or path in `eas.json`

Create the app records:

- **App Store Connect** → New app, bundle ID `com.mandarvyas.tinytalkers`
- **Google Play Console** → Create app, package `com.mandarvyas.tinytalkers`

Listing text: copy from [STORE_LISTING.md](./STORE_LISTING.md)  
Data forms: [DATA_SAFETY.md](./DATA_SAFETY.md)

## 2. Production builds

```bash
npm run build:android   # AAB for Play
npm run build:ios       # IPA for App Store
# or
npm run build:all
```

Download from [expo.dev](https://expo.dev) when finished. Install on **physical devices** and run [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md).

## 3. Submit

```bash
npm run submit:android
npm run submit:ios
```

Or upload the AAB/IPA manually in each console.

**Suggested first rollout:** Play **internal testing** / Apple **TestFlight** → then production.

## 4. App Store Connect checklist

- [ ] Privacy Policy URL  
- [ ] App Privacy questionnaire (see DATA_SAFETY.md)  
- [ ] Age rating questionnaire  
- [ ] Screenshots (6.7" iPhone required; iPad if supporting tablets)  
- [ ] Review notes: kids app, mic only on “Say it!”, no account  

## 5. Google Play checklist

- [ ] Store listing + graphics  
- [ ] Data safety form  
- [ ] Content rating questionnaire  
- [ ] Privacy policy URL  
- [ ] Target audience / Families (if applicable)  
- [ ] Upload **AAB** from production build  

## Version bumps

`app.json` → `expo.version` (e.g. `1.0.1`). EAS `appVersionSource: remote` + `autoIncrement` handles build numbers on EAS.