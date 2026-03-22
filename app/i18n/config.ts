import type { AppLanguage } from './types';

export const APP_LANGUAGES: AppLanguage[] = ['en', 'hi', 'mr'];

export const LANGUAGE_LABELS: Record<
  AppLanguage,
  { short: string; native: string }
> = {
  en: { short: 'English', native: 'English' },
  hi: { short: 'Hindi', native: 'हिन्दी' },
  mr: { short: 'Marathi', native: 'मराठी' },
};

/** BCP-47 tags for TTS and speech recognition */
export const SPEECH_LOCALE: Record<AppLanguage, string> = {
  en: 'en-US',
  hi: 'hi-IN',
  mr: 'mr-IN',
};
