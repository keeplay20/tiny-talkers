import { create } from 'zustand';
import { deckForLanguage } from '../data/words';
import type { AppLanguage } from '../i18n/types';

const emptyStars = (): Record<AppLanguage, number> => ({
  en: 0,
  hi: 0,
  mr: 0,
});

export type GameState = {
  appLanguage: AppLanguage;
  setAppLanguage: (lang: AppLanguage) => void;
  wordIndex: number;
  /** Stars earned separately per language / deck. */
  starsByLanguage: Record<AppLanguage, number>;
  lastTranscript: string;
  lastWasCorrect: boolean | null;
  setTranscript: (text: string) => void;
  setLastResult: (correct: boolean | null) => void;
  addStar: () => void;
  nextWord: () => void;
  prevWord: () => void;
  resetSession: () => void;
};

export const useGameStore = create<GameState>((set) => ({
  appLanguage: 'en',
  setAppLanguage: (lang) =>
    set((s) => {
      if (s.appLanguage === lang) return {};
      return {
        appLanguage: lang,
        wordIndex: 0,
        lastTranscript: '',
        lastWasCorrect: null,
      };
    }),

  wordIndex: 0,
  starsByLanguage: emptyStars(),
  lastTranscript: '',
  lastWasCorrect: null,

  setTranscript: (text) => set({ lastTranscript: text }),
  setLastResult: (correct) => set({ lastWasCorrect: correct }),

  addStar: () =>
    set((s) => {
      const lang = s.appLanguage;
      return {
        starsByLanguage: {
          ...s.starsByLanguage,
          [lang]: s.starsByLanguage[lang] + 1,
        },
      };
    }),

  nextWord: () =>
    set((s) => {
      const len = deckForLanguage(s.appLanguage).length;
      return {
        wordIndex: (s.wordIndex + 1) % len,
        lastTranscript: '',
        lastWasCorrect: null,
      };
    }),

  /** Does not wrap: stays on first card so a “back” swipe at क doesn’t jump to व. */
  prevWord: () =>
    set((s) => ({
      wordIndex: Math.max(0, s.wordIndex - 1),
      lastTranscript: '',
      lastWasCorrect: null,
    })),

  resetSession: () =>
    set((s) => ({
      wordIndex: 0,
      starsByLanguage: emptyStars(),
      lastTranscript: '',
      lastWasCorrect: null,
      appLanguage: s.appLanguage,
    })),
}));
