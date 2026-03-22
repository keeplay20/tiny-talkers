import { requireOptionalNativeModule } from 'expo';

/** Matches `ExpoSpeechRecognition` in expo-speech-recognition native code. */
const NATIVE_MODULE_NAME = 'ExpoSpeechRecognition';

export type SpeechRecognitionNativeModule = {
  requestPermissionsAsync: () => Promise<import('expo-modules-core').PermissionResponse>;
  start: (options: Record<string, unknown>) => void;
  stop: () => void;
  abort: () => void;
  addListener: (
    eventName: string,
    listener: (event: unknown) => void,
  ) => { remove: () => void };
};

let cached: SpeechRecognitionNativeModule | null | undefined;

/**
 * Native speech recognition is only available in a development/production build that includes
 * the config plugin — not in Expo Go.
 */
export function getSpeechRecognitionNativeModule(): SpeechRecognitionNativeModule | null {
  if (cached !== undefined) {
    return cached;
  }
  cached = requireOptionalNativeModule<SpeechRecognitionNativeModule>(NATIVE_MODULE_NAME);
  return cached;
}

export function isSpeechRecognitionNativeAvailable(): boolean {
  return getSpeechRecognitionNativeModule() != null;
}

/** iOS task hint value (same as `TaskHintIOS.dictation` from expo-speech-recognition). */
export const IOS_SPEECH_TASK_HINT_DICTATION = 'dictation' as const;
