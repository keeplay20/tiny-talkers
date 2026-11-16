# Data safety & privacy labels (store questionnaires)

Use these answers when filling **Google Play Data safety** and **Apple App Privacy** in the consoles. Adjust only if the app changes.

## Summary

- No login, no ads, no analytics SDK in the app.
- Progress stored **on device only** (AsyncStorage).
- Microphone used **on demand** for pronunciation check; audio processed by **OS speech APIs**, not sent to Tiny Talkers servers.
- Optional **Feedback** opens **Google Forms** in the browser (third party).

---

## Google Play — Data safety

| Question | Answer |
|----------|--------|
| Does your app collect or share user data? | **Yes** (limited) — or declare only data “processed ephemerally” / device-only per updated Play form wording |
| Data types | **Audio** (mic for speech recognition, not stored by app); **App activity** / **Other** — local progress (language, card index, mastered cards) stored on device, not collected by developer |
| Is data encrypted in transit? | N/A for local-only; HTTPS for optional browser feedback |
| Can users request deletion? | Uninstall clears local data; no server account |
| Committed to Play Families? | Optional — app is kid-friendly; no ads |

**Typical declaration pattern for this app:**

- **Personal info:** Not collected by developer in-app  
- **Audio:** Collected **ephemerally** for pronunciation (via OS STT) or “not shared with developer”  
- **App info / performance:** Not collected (unless you add crash reporting later)

---

## Apple — App Privacy (nutrition labels)

| Data type | Collected? | Linked to user? | Used for tracking? |
|-----------|------------|-----------------|-------------------|
| Contact info | No (in-app) | — | — |
| User content (audio) | Processed on device for speech | No | No |
| Usage / diagnostics | No (unless you add Sentry etc.) | — | — |

**Privacy policy URL:** same as Play  
**Encryption (export compliance):** App uses standard HTTPS only → **ITSAppUsesNonExemptEncryption = false** (set in `app.json`)

---

## Permissions justification (review notes)

- **Microphone:** Pronunciation practice when the child taps “Say it!”  
- **Speech recognition:** Same session, on-device/OS processing to compare spoken words to the card  