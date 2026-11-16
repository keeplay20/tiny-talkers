import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { deckForLanguage } from '../data/words';
import type { AppLanguage } from '../i18n/types';

const LANGS: AppLanguage[] = ['en', 'hi', 'mr'];

const emptyWordIndex = (): Record<AppLanguage, number> => ({
  en: 0,
  hi: 0,
  mr: 0,
});

const emptyMastered = (): Record<AppLanguage, number[]> => ({
  en: [],
  hi: [],
  mr: [],
});

export function starCountForLanguage(
  masteredByLanguage: Record<AppLanguage, number[]>,
  lang: AppLanguage,
): number {
  return masteredByLanguage[lang].length;
}

export type GameState = {
  appLanguage: AppLanguage;
  setAppLanguage: (lang: AppLanguage) => void;
  wordIndexByLanguage: Record<AppLanguage, number>;
  /** Card indices mastered at least once (one star each). */
  masteredByLanguage: Record<AppLanguage, number[]>;
  lastTranscript: string;
  lastWasCorrect: boolean | null;
  setTranscript: (text: string) => void;
  setLastResult: (correct: boolean | null) => void;
  /** Awards one star for the current card if not already mastered. */
  awardStarForCurrentCard: () => void;
  nextWord: () => void;
  prevWord: () => void;
  resetSession: () => void;
};

export const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      appLanguage: 'en',
      wordIndexByLanguage: emptyWordIndex(),
      masteredByLanguage: emptyMastered(),
      lastTranscript: '',
      lastWasCorrect: null,

      setAppLanguage: (lang) =>
        set((s) => {
          if (s.appLanguage === lang) return {};
          return {
            appLanguage: lang,
            lastTranscript: '',
            lastWasCorrect: null,
          };
        }),

      setTranscript: (text) => set({ lastTranscript: text }),
      setLastResult: (correct) => set({ lastWasCorrect: correct }),

      awardStarForCurrentCard: () =>
        set((s) => {
          const lang = s.appLanguage;
          const idx = s.wordIndexByLanguage[lang];
          const mastered = s.masteredByLanguage[lang];
          if (mastered.includes(idx)) return {};
          return {
            masteredByLanguage: {
              ...s.masteredByLanguage,
              [lang]: [...mastered, idx].sort((a, b) => a - b),
            },
          };
        }),

      nextWord: () =>
        set((s) => {
          const lang = s.appLanguage;
          const len = deckForLanguage(lang).length;
          const cur = s.wordIndexByLanguage[lang];
          return {
            wordIndexByLanguage: {
              ...s.wordIndexByLanguage,
              [lang]: (cur + 1) % len,
            },
            lastTranscript: '',
            lastWasCorrect: null,
          };
        }),

      prevWord: () =>
        set((s) => {
          const lang = s.appLanguage;
          const cur = s.wordIndexByLanguage[lang];
          return {
            wordIndexByLanguage: {
              ...s.wordIndexByLanguage,
              [lang]: Math.max(0, cur - 1),
            },
            lastTranscript: '',
            lastWasCorrect: null,
          };
        }),

      resetSession: () =>
        set((s) => {
          const lang = s.appLanguage;
          return {
            wordIndexByLanguage: {
              ...s.wordIndexByLanguage,
              [lang]: 0,
            },
            masteredByLanguage: {
              ...s.masteredByLanguage,
              [lang]: [],
            },
            lastTranscript: '',
            lastWasCorrect: null,
          };
        }),
    }),
    {
      name: 'tiny-talkers-game-v1',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        appLanguage: state.appLanguage,
        wordIndexByLanguage: state.wordIndexByLanguage,
        masteredByLanguage: state.masteredByLanguage,
      }),
      merge: (persisted, current) => {
        const p = persisted as Partial<GameState> | undefined;
        if (!p) return current;
        const wordIndexByLanguage = { ...emptyWordIndex(), ...p.wordIndexByLanguage };
        const masteredByLanguage = { ...emptyMastered(), ...p.masteredByLanguage };
        for (const lang of LANGS) {
          if (!Array.isArray(masteredByLanguage[lang])) {
            masteredByLanguage[lang] = [];
          }
          if (typeof wordIndexByLanguage[lang] !== 'number') {
            wordIndexByLanguage[lang] = 0;
          }
        }
        return {
          ...current,
          ...p,
          wordIndexByLanguage,
          masteredByLanguage,
        };
      },
    },
  ),
);

/** Current card index for the active language. */
export function useCurrentWordIndex(): number {
  return useGameStore(
    (s) => s.wordIndexByLanguage[s.appLanguage],
  );
}