# Tiny Talkers v1 release checklist

Use this before submitting to App Store / Google Play.

## Build

- [ ] `eas build --platform ios --profile production` (or local `expo run:ios --configuration Release`)
- [ ] `eas build --platform android --profile production` (or local release APK/AAB)
- [ ] Install on **physical devices** (not only simulators) — speech recognition requires native builds (not Expo Go)

## Core flow (each language: en, hi, mr)

- [ ] Home shows saved **stars** and **language** after force-quit and reopen
- [ ] Game resumes **card position** per language after force-quit
- [ ] **Listen** plays TTS for letter + word
- [ ] **Say it** with mic permission granted → correct word → **one star** (repeating same card does not add another star)
- [ ] Swipe next/prev; Hindi/Marathi swipe directions match on-screen hints
- [ ] **Privacy** screen readable from Home
- [ ] **Feedback** opens Google Form in browser (optional)

## Permissions

- [ ] Mic denied → alert with parent-friendly copy; Listen still works
- [ ] Mic granted → listen flow works

## Store metadata

- [ ] Privacy policy URL (same as `expo.extra.privacyPolicyUrl` in `app.json`):
  `https://raw.githubusercontent.com/keeplay20/tiny-talkers/main/docs/privacy-policy.md`
- [ ] Age rating / Families form: no account, local progress, optional third-party feedback form
- [ ] Screenshots and short description (“speaking practice”, not stories)

## Regression (dev-only)

- [ ] In Expo Go / without native speech module: dev build shows developer hint; **release** build shows short parent message (no `npx expo run` text)