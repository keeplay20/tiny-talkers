import { useEffect, useMemo, useRef } from 'react';
import {
  getSpeechRecognitionNativeModule,
  type SpeechRecognitionNativeModule,
} from '../services/speechRecognitionNative';

type ResultEvent = {
  isFinal: boolean;
  results: { transcript: string }[];
};

type Handlers = {
  onResult: (event: ResultEvent) => void;
  onError: () => void;
  onEnd: () => void;
};

/**
 * Subscribes to native speech events when the module exists (dev build).
 * No-ops in Expo Go / when the native module is missing.
 */
export function useSpeechRecognitionNativeEvents(handlers: Handlers): void {
  const mod: SpeechRecognitionNativeModule | null = useMemo(
    () => getSpeechRecognitionNativeModule(),
    [],
  );
  const handlersRef = useRef(handlers);
  handlersRef.current = handlers;

  useEffect(() => {
    if (!mod) return;

    const subResult = mod.addListener('result', (raw) => {
      handlersRef.current.onResult(raw as ResultEvent);
    });
    const subError = mod.addListener('error', () => {
      handlersRef.current.onError();
    });
    const subEnd = mod.addListener('end', () => {
      handlersRef.current.onEnd();
    });

    return () => {
      subResult.remove();
      subError.remove();
      subEnd.remove();
    };
  }, [mod]);
}
