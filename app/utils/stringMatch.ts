import type { AppLanguage } from '../i18n/types';

export function normalizeLatin(text: unknown): string {
  return String(text ?? '')
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/[^a-z0-9]/g, '');
}

/** Devanagari (Hindi / Marathi) + optional Latin digits; strips joiners and spaces */
export function normalizeIndic(text: unknown): string {
  return String(text ?? '')
    .normalize('NFC')
    .replace(/[\u200c\u200d]/g, '')
    .replace(/\s+/g, '')
    .replace(/[^\u0900-\u097Fa-z0-9]/gi, '')
    .toLowerCase();
}

export function normalizeForMatch(text: unknown, lang: AppLanguage): string {
  if (lang === 'en') {
    return normalizeLatin(text);
  }
  return normalizeIndic(text);
}

function levenshtein(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;
  const row = Array.from({ length: n + 1 }, (_, j) => j);
  for (let i = 1; i <= m; i++) {
    let prev = row[0]!;
    row[0] = i;
    for (let j = 1; j <= n; j++) {
      const tmp = row[j]!;
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      row[j] = Math.min(row[j]! + 1, row[j - 1]! + 1, prev + cost);
      prev = tmp;
    }
  }
  return row[n]!;
}

/**
 * Returns similarity in [0, 1] based on Levenshtein distance on normalized strings.
 */
export function similarityScore(
  spoken: string,
  expected: string,
  lang: AppLanguage,
): number {
  const a = normalizeForMatch(spoken, lang);
  const b = normalizeForMatch(expected, lang);
  if (!a || !b) return 0;
  const dist = levenshtein(a, b);
  const maxLen = Math.max(a.length, b.length);
  return maxLen === 0 ? 1 : 1 - dist / maxLen;
}

/**
 * MVP matcher: exact after normalize, substring overlap, or high fuzzy score.
 */
export function wordsMatch(
  spoken: string,
  expected: string,
  lang: AppLanguage,
  fuzzyThreshold = 0.82,
): boolean {
  const a = normalizeForMatch(spoken, lang);
  const b = normalizeForMatch(expected, lang);
  if (!a || !b) return false;
  if (a === b) return true;
  if (a.includes(b) || b.includes(a)) return true;
  return similarityScore(spoken, expected, lang) >= fuzzyThreshold;
}
