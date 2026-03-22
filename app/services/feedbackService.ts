import type { AppLanguage } from '../i18n/types';
import { getCopy } from '../i18n/copy';
import { wordsMatch } from '../utils/stringMatch';

export type EvaluationResult = {
  correct: boolean;
  title: string;
  message: string;
};

export function evaluateAnswer(
  spokenText: string,
  expectedWord: string,
  lang: AppLanguage,
): EvaluationResult {
  const evalCopy = getCopy(lang).eval;
  const correct = wordsMatch(spokenText, expectedWord, lang);

  return {
    correct,
    title: correct ? evalCopy.titleCorrect : evalCopy.titleTryAgain,
    message: correct ? evalCopy.msgGreat : evalCopy.msgListenAgain(expectedWord),
  };
}
