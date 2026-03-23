# Tiny Talkers

A mobile pronunciation and alphabet practice app for young learners. Kids work through letter–word cards in **English** (Latin A–Z), **Hindi**, or **Marathi** (Devanagari), hear prompts with text-to-speech, and try saying the word aloud. Correct answers earn stars; cards can be swiped to move between words.

Built with [Expo](https://expo.dev/) and React Native.

## Features

- **Multilingual decks** — Separate word lists per language with emoji hints on each card.
- **Voice** — TTS reads the letter and word; on supported native builds, speech recognition checks pronunciation (with forgiving matching for accents and small mistakes).
- **Progress** — Stars tracked per language on the home screen.
- **Deep links** — Custom URL scheme `tiny-talkers://` (see below).

## Requirements

- **Node.js** ≥ 20.19.4 (see `package.json` → `engines`)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) / `npx expo` for local development
- **iOS or Android device or simulator** for the full experience; microphone and speech-recognition permissions are requested on native builds.

## Getting started

```bash
npm install
npm start
```

Then open the project in Expo Dev Tools and run on iOS, Android, or web.

### Native speech recognition

Speech recognition uses `expo-speech-recognition` with the config plugin in `app.json`. It is available in **development and production builds** that include native code — **not in Expo Go**. If the native module is missing, the app still runs; voice-check features are limited where recognition is unavailable.

To run on device with full speech support:

```bash
npm run ios
# or
npm run android
```

(Ensure Xcode / Android tooling is set up per [Expo prebuild docs](https://docs.expo.dev/workflow/prebuild/).)

## Scripts

| Command        | Description              |
| -------------- | ------------------------ |
| `npm start`    | Start Expo dev server    |
| `npm run ios`  | Build and run on iOS     |
| `npm run android` | Build and run on Android |
| `npm run web`  | Start for web            |

## Project layout

- `app/screens/` — Home, game, feedback, and deck link screens
- `app/data/words.ts` — Letter/word decks per language
- `app/i18n/` — Copy and locale config (`en`, `hi`, `mr`)
- `app/services/` — Speech and feedback evaluation
- `app/store/` — Zustand game state (language, index, stars)

## Deep linking

Scheme: **`tiny-talkers`** (see `app.json` → `expo.scheme`).

Examples:

- `tiny-talkers://` — Home
- `tiny-talkers://game` — Game
- `tiny-talkers://hindi` — Hindi deck link screen
- `tiny-talkers://marathi` — Marathi deck link screen
- `tiny-talkers://feedback` — Feedback

## License

Private project (`private: true` in `package.json`).
