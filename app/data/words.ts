/**
 * Three decks: English uses Latin A–Z; Hindi & Marathi use Devanagari letters (क, ख, …) with
 * language-specific words. Add images under app/assets/ when you wire assets.
 */
import type { AppLanguage } from '../i18n/types';

export type DeckCard = {
  letter: string;
  word: string;
  image: string;
  emoji: string;
};

/** Latin alphabet + English words */
export const ENGLISH_DECK: DeckCard[] = [
  { letter: 'A', word: 'Apple', image: 'apple.png', emoji: '🍎' },
  { letter: 'B', word: 'Ball', image: 'ball.png', emoji: '⚽' },
  { letter: 'C', word: 'Cat', image: 'cat.png', emoji: '🐱' },
  { letter: 'D', word: 'Dog', image: 'dog.png', emoji: '🐶' },
  { letter: 'E', word: 'Egg', image: 'egg.png', emoji: '🥚' },
  { letter: 'F', word: 'Fish', image: 'fish.png', emoji: '🐟' },
  { letter: 'G', word: 'Grapes', image: 'grapes.png', emoji: '🍇' },
  { letter: 'H', word: 'Hat', image: 'hat.png', emoji: '🎩' },
  { letter: 'I', word: 'Ice', image: 'ice.png', emoji: '🧊' },
  { letter: 'J', word: 'Juice', image: 'juice.png', emoji: '🧃' },
  { letter: 'K', word: 'Kite', image: 'kite.png', emoji: '🪁' },
  { letter: 'L', word: 'Lion', image: 'lion.png', emoji: '🦁' },
  { letter: 'M', word: 'Moon', image: 'moon.png', emoji: '🌙' },
  { letter: 'N', word: 'Nest', image: 'nest.png', emoji: '🪺' },
  { letter: 'O', word: 'Orange', image: 'orange.png', emoji: '🍊' },
  { letter: 'P', word: 'Pig', image: 'pig.png', emoji: '🐷' },
  { letter: 'Q', word: 'Queen', image: 'queen.png', emoji: '👑' },
  { letter: 'R', word: 'Rabbit', image: 'rabbit.png', emoji: '🐰' },
  { letter: 'S', word: 'Sun', image: 'sun.png', emoji: '☀️' },
  { letter: 'T', word: 'Tree', image: 'tree.png', emoji: '🌳' },
  { letter: 'U', word: 'Umbrella', image: 'umbrella.png', emoji: '☂️' },
  { letter: 'V', word: 'Violin', image: 'violin.png', emoji: '🎻' },
  { letter: 'W', word: 'Whale', image: 'whale.png', emoji: '🐋' },
  { letter: 'X', word: 'Xylophone', image: 'xylophone.png', emoji: '🎹' },
  { letter: 'Y', word: 'Yo-yo', image: 'yoyo.png', emoji: '🪀' },
  { letter: 'Z', word: 'Zebra', image: 'zebra.png', emoji: '🦓' },
];

/** Devanagari consonants क → व (traditional order). */
export const HINDI_DECK: DeckCard[] = [
  { letter: 'क', word: 'कबूतर', image: 'kabutar.png', emoji: '🐦' },
  { letter: 'ख', word: 'खरगोश', image: 'khargosh.png', emoji: '🐰' },
  { letter: 'ग', word: 'गाय', image: 'gaay.png', emoji: '🐄' },
  { letter: 'घ', word: 'घड़ी', image: 'ghadi.png', emoji: '🕐' },
  { letter: 'च', word: 'चम्मच', image: 'chammach.png', emoji: '🥄' },
  { letter: 'छ', word: 'छतरी', image: 'chatri.png', emoji: '☂️' },
  { letter: 'ज', word: 'जहाज', image: 'jahaj.png', emoji: '🚢' },
  { letter: 'झ', word: 'झंडा', image: 'jhanda.png', emoji: '🚩' },
  { letter: 'ट', word: 'टमाटर', image: 'tamatar.png', emoji: '🍅' },
  { letter: 'ठ', word: 'ठेला', image: 'thela.png', emoji: '🛒' },
  { letter: 'ड', word: 'डमरू', image: 'damru.png', emoji: '🥁' },
  { letter: 'ढ', word: 'ढोल', image: 'dhol.png', emoji: '🥁' },
  { letter: 'त', word: 'तरबूज', image: 'tarbuj.png', emoji: '🍉' },
  { letter: 'थ', word: 'थाली', image: 'thali.png', emoji: '🍽️' },
  { letter: 'द', word: 'दूध', image: 'doodh.png', emoji: '🥛' },
  { letter: 'ध', word: 'धनुष', image: 'dhanush.png', emoji: '🏹' },
  { letter: 'न', word: 'नल', image: 'nal.png', emoji: '🚰' },
  { letter: 'प', word: 'पतंग', image: 'patang.png', emoji: '🪁' },
  { letter: 'फ', word: 'फल', image: 'phal.png', emoji: '🍎' },
  { letter: 'ब', word: 'बंदर', image: 'bandar.png', emoji: '🐵' },
  { letter: 'भ', word: 'भालू', image: 'bhalu.png', emoji: '🐻' },
  { letter: 'म', word: 'मछली', image: 'machli.png', emoji: '🐟' },
  { letter: 'य', word: 'याक', image: 'yak.png', emoji: '🦬' },
  { letter: 'र', word: 'रथ', image: 'rath.png', emoji: '🛞' },
  { letter: 'ल', word: 'लड्डू', image: 'laddu.png', emoji: '🍬' },
  { letter: 'व', word: 'वन', image: 'van.png', emoji: '🌳' },
];

/** Same letters क → व; Marathi words. */
export const MARATHI_DECK: DeckCard[] = [
  { letter: 'क', word: 'कोकूळ', image: 'kokil.png', emoji: '🐦' },
  { letter: 'ख', word: 'खीर', image: 'kheer.png', emoji: '🍚' },
  { letter: 'ग', word: 'गाय', image: 'gaay-mr.png', emoji: '🐄' },
  { letter: 'घ', word: 'घड्याळ', image: 'ghadyal.png', emoji: '🕐' },
  { letter: 'च', word: 'चमचा', image: 'chamcha.png', emoji: '🥄' },
  { letter: 'छ', word: 'छत्री', image: 'chatri-mr.png', emoji: '☂️' },
  { letter: 'ज', word: 'जहाज', image: 'jahaj-mr.png', emoji: '🚢' },
  { letter: 'झ', word: 'झेंडा', image: 'zhenda.png', emoji: '🚩' },
  { letter: 'ट', word: 'टोमॅटो', image: 'tomato-mr.png', emoji: '🍅' },
  { letter: 'ठ', word: 'ठेला', image: 'thela-mr.png', emoji: '🛒' },
  { letter: 'ड', word: 'डफ', image: 'daf-mr.png', emoji: '🥁' },
  { letter: 'ढ', word: 'ढोल', image: 'dhol-mr.png', emoji: '🥁' },
  { letter: 'त', word: 'तरबूज', image: 'tarbuj-mr.png', emoji: '🍉' },
  { letter: 'थ', word: 'थाळी', image: 'thali-mr.png', emoji: '🍽️' },
  { letter: 'द', word: 'दूध', image: 'dudh.png', emoji: '🥛' },
  { letter: 'ध', word: 'धनुष्य', image: 'dhanushya.png', emoji: '🏹' },
  { letter: 'न', word: 'नळ', image: 'nal-mr.png', emoji: '🚰' },
  { letter: 'प', word: 'पतंग', image: 'patang-mr.png', emoji: '🪁' },
  { letter: 'फ', word: 'फळ', image: 'phal-mr.png', emoji: '🍎' },
  { letter: 'ब', word: 'बंदर', image: 'bandar-mr.png', emoji: '🐵' },
  { letter: 'भ', word: 'भालू', image: 'bhalu-mr.png', emoji: '🐻' },
  { letter: 'म', word: 'मासा', image: 'masa.png', emoji: '🐟' },
  { letter: 'य', word: 'याक', image: 'yak-mr.png', emoji: '🦬' },
  { letter: 'र', word: 'रथ', image: 'rath-mr.png', emoji: '🛞' },
  { letter: 'ल', word: 'लाडू', image: 'ladu.png', emoji: '🍬' },
  { letter: 'व', word: 'वन', image: 'van-mr.png', emoji: '🌳' },
];

const DECKS: Record<AppLanguage, DeckCard[]> = {
  en: ENGLISH_DECK,
  hi: HINDI_DECK,
  mr: MARATHI_DECK,
};

const enLen = ENGLISH_DECK.length;
if (__DEV__) {
  if (HINDI_DECK.length !== enLen || MARATHI_DECK.length !== enLen) {
    console.warn(
      '[tiny-talkers] All language decks should share the same length (stars goal is per language but count matches).',
      { en: enLen, hi: HINDI_DECK.length, mr: MARATHI_DECK.length },
    );
  }
}

export function deckForLanguage(lang: AppLanguage): DeckCard[] {
  return DECKS[lang];
}

export function starGoalCount(lang: AppLanguage): number {
  return deckForLanguage(lang).length;
}
