import * as Speech from 'expo-speech';
import { PermissionStatus, type PermissionResponse } from 'expo-modules-core';
import type { AppLanguage } from '../i18n/types';
import { SPEECH_LOCALE } from '../i18n/config';
import {
  getSpeechRecognitionNativeModule,
  IOS_SPEECH_TASK_HINT_DICTATION,
} from './speechRecognitionNative';

function ttsPhrase(letter: string, word: string, lang: AppLanguage): string {
  if (lang === 'en') {
    return `${letter} for ${word}`;
  }
  if (lang === 'hi') {
    return `${letter} से ${word}`;
  }
  return `${letter} आणि ${word}`;
}

export function speakLetterAndWord(
  letter: string,
  word: string,
  lang: AppLanguage,
): void {
  Speech.stop();
  Speech.speak(ttsPhrase(letter, word, lang), {
    language: SPEECH_LOCALE[lang],
    pitch: 1.08,
    rate: lang === 'en' ? 0.88 : 0.92,
  });
}

export function speakWord(word: string, lang: AppLanguage): void {
  Speech.stop();
  Speech.speak(word, {
    language: SPEECH_LOCALE[lang],
    pitch: 1.08,
    rate: lang === 'en' ? 0.88 : 0.92,
  });
}

export function stopSpeaking(): void {
  Speech.stop();
}

const unavailablePermission: PermissionResponse = {
  status: PermissionStatus.DENIED,
  expires: 'never',
  granted: false,
  canAskAgain: false,
};

export function requestSpeechPermissions(): Promise<PermissionResponse> {
  const mod = getSpeechRecognitionNativeModule();
  if (!mod) {
    return Promise.resolve(unavailablePermission);
  }
  return mod.requestPermissionsAsync();
}

export function startListeningForWord(params: {
  letter: string;
  word: string;
  lang: AppLanguage;
}): void {
  const mod = getSpeechRecognitionNativeModule();
  if (!mod) return;

  const { letter, word, lang } = params;
  const locale = SPEECH_LOCALE[lang];
  mod.start({
    lang: locale,
    interimResults: true,
    maxAlternatives: 5,
    continuous: false,
    contextualStrings: [word, letter, ttsPhrase(letter, word, lang)],
    iosTaskHint: IOS_SPEECH_TASK_HINT_DICTATION,
  });
}

export function stopListening(): void {
  getSpeechRecognitionNativeModule()?.stop();
}

export function abortListening(): void {
  getSpeechRecognitionNativeModule()?.abort();
}
