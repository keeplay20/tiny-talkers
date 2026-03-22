import { useHeaderHeight } from "@react-navigation/elements";
import { useCallback, useEffect, useRef, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import Button from "../components/Button";
import SwipeableWordCard from "../components/SwipeableWordCard";
import ScreenGradient from "../components/ScreenGradient";
import { deckForLanguage } from "../data/words";
import { getCopy } from "../i18n/copy";
import type { GameScreenProps } from "../navigation/types";
import { useSpeechRecognitionNativeEvents } from "../hooks/useSpeechRecognitionNativeEvents";
import { evaluateAnswer } from "../services/feedbackService";
import { isSpeechRecognitionNativeAvailable } from "../services/speechRecognitionNative";
import {
  abortListening,
  requestSpeechPermissions,
  speakLetterAndWord,
  startListeningForWord,
  stopListening,
} from "../services/speechService";
import { useGameStore } from "../store/useGameStore";
import { colors } from "../theme/colors";

export default function GameScreen(_props: GameScreenProps) {
  const headerHeight = useHeaderHeight();
  const insets = useSafeAreaInsets();
  const appLanguage = useGameStore((s) => s.appLanguage);
  const copy = getCopy(appLanguage);

  const wordIndex = useGameStore((s) => s.wordIndex);
  const deck = deckForLanguage(appLanguage);
  const item = deck[wordIndex]!;

  const lastTranscript = useGameStore((s) => s.lastTranscript);
  const lastWasCorrect = useGameStore((s) => s.lastWasCorrect);

  const setTranscript = useGameStore((s) => s.setTranscript);
  const setLastResult = useGameStore((s) => s.setLastResult);
  const addStar = useGameStore((s) => s.addStar);
  const nextWord = useGameStore((s) => s.nextWord);
  const prevWord = useGameStore((s) => s.prevWord);

  const [listening, setListening] = useState(false);
  const autoCheckedRef = useRef(false);
  const voiceAvailable = isSpeechRecognitionNativeAvailable();

  const runCheck = useCallback(
    (spoken: string) => {
      const { correct, title, message } = evaluateAnswer(
        spoken,
        item.word,
        appLanguage,
      );
      setLastResult(correct);
      if (correct) addStar();
      Alert.alert(title, message, [
        {
          text: correct ? copy.game.alertNextWord : copy.game.alertTryAgain,
          onPress: () => {
            if (correct) nextWord();
          },
        },
      ]);
    },
    [
      addStar,
      appLanguage,
      copy.game.alertNextWord,
      copy.game.alertTryAgain,
      item.word,
      nextWord,
      setLastResult,
    ],
  );

  useSpeechRecognitionNativeEvents({
    onResult: (event) => {
      const text = event.results[0]?.transcript ?? "";
      setTranscript(text);
      if (event.isFinal && text.trim() && !autoCheckedRef.current) {
        autoCheckedRef.current = true;
        runCheck(text);
      }
    },
    onError: () => setListening(false),
    onEnd: () => setListening(false),
  });

  useEffect(() => {
    return () => abortListening();
  }, []);

  const toggleMic = async () => {
    if (!voiceAvailable) return;
    if (listening) {
      stopListening();
      setListening(false);
      return;
    }
    const perm = await requestSpeechPermissions();
    if (!perm.granted) {
      Alert.alert(copy.game.permTitle, copy.game.permBody);
      return;
    }
    autoCheckedRef.current = false;
    setTranscript("");
    setListening(true);
    startListeningForWord({
      letter: item.letter,
      word: item.word,
      lang: appLanguage,
    });
  };

  const onListen = () => {
    speakLetterAndWord(item.letter, item.word, appLanguage);
  };

  const resetCardAfterSwipe = useCallback(() => {
    stopListening();
    setListening(false);
    autoCheckedRef.current = false;
    setTranscript("");
    setLastResult(null);
  }, [setLastResult, setTranscript]);

  const handleSwipeNext = useCallback(() => {
    resetCardAfterSwipe();
    nextWord();
  }, [nextWord, resetCardAfterSwipe]);

  const handleSwipePrev = useCallback(() => {
    resetCardAfterSwipe();
    prevWord();
  }, [prevWord, resetCardAfterSwipe]);

  const scrollBottomPad = Math.max(insets.bottom, 12) + 8;

  const feedbackColor =
    lastWasCorrect === null
      ? colors.textMuted
      : lastWasCorrect
        ? colors.success
        : colors.error;
  const feedbackLabel =
    lastWasCorrect === null
      ? ""
      : lastWasCorrect
        ? copy.game.nice
        : copy.game.tryAgain;

  return (
    <ScreenGradient variant="game">
      <SafeAreaView style={styles.safe} edges={["left", "right", "bottom"]}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.scrollContent,
            {
              paddingTop: headerHeight + 6,
              paddingBottom: scrollBottomPad,
            },
          ]}
        >
          <Text style={styles.step}>{copy.game.step}</Text>

          {!voiceAvailable ? (
            <View style={styles.noVoiceBox}>
              <Text style={styles.noVoiceTitle}>{copy.game.noVoiceTitle}</Text>
              <Text style={styles.noVoiceBody}>
                {copy.game.noVoiceBodyBefore}
                <Text style={styles.noVoiceMono}>npx expo run:ios</Text>
                {copy.game.noVoiceBodyMono}
                <Text style={styles.noVoiceMono}>npx expo run:android</Text>
                {copy.game.noVoiceBodyAfter}
              </Text>
            </View>
          ) : null}

          <SwipeableWordCard
            cardKey={wordIndex}
            letter={item.letter}
            word={item.word}
            emoji={item.emoji}
            connector={copy.game.cardConnector}
            onSwipeNext={handleSwipeNext}
            onSwipePrev={handleSwipePrev}
            swipeNextHint={copy.game.swipeNextHint}
            swipePrevHint={copy.game.swipePrevHint}
            allowSwipePrev={wordIndex > 0}
            swipeNextOnLeft={appLanguage !== "en"}
          />

          {voiceAvailable ? (
            <View style={styles.buttonRow}>
              <Button
                label={copy.game.listen}
                onPress={onListen}
                style={styles.rowBtn}
              />
              <Button
                label={listening ? copy.game.stop : copy.game.sayIt}
                variant="mic"
                onPress={toggleMic}
                style={styles.rowBtn}
              />
            </View>
          ) : (
            <Button
              label={copy.game.listen}
              onPress={onListen}
              style={styles.listenOnlyBtn}
            />
          )}

          {voiceAvailable && listening ? (
            <Text style={styles.listeningHint}>{copy.game.listeningHint}</Text>
          ) : null}
          {voiceAvailable && listening && lastTranscript ? (
            <Text style={styles.heardPreview} numberOfLines={2}>
              {copy.game.heardPrefix} {lastTranscript}
            </Text>
          ) : null}

          {lastWasCorrect !== null ? (
            <Text style={[styles.feedback, { color: feedbackColor }]}>
              {feedbackLabel}
            </Text>
          ) : null}
        </ScrollView>
      </SafeAreaView>
    </ScreenGradient>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "transparent",
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    alignItems: "stretch",
    gap: 12,
    maxWidth: 400,
    width: "100%",
    alignSelf: "center",
  },
  step: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.accentCyan,
    textAlign: "center",
    paddingHorizontal: 8,
    alignSelf: "center",
  },
  buttonRow: {
    flexDirection: "row",
    gap: 12,
    alignItems: "stretch",
    width: "100%",
  },
  rowBtn: {
    flex: 1,
    minWidth: 0,
  },
  listenOnlyBtn: {
    alignSelf: "stretch",
  },
  noVoiceBox: {
    backgroundColor: "rgba(251, 191, 36, 0.1)",
    borderWidth: 1.5,
    borderColor: "rgba(251, 191, 36, 0.45)",
    borderRadius: 12,
    padding: 12,
    alignSelf: "center",
    maxWidth: 380,
  },
  noVoiceTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: colors.accentAmber,
    marginBottom: 6,
  },
  noVoiceBody: {
    fontSize: 13,
    lineHeight: 19,
    color: colors.textSecondary,
  },
  noVoiceMono: {
    fontFamily: "monospace",
    fontSize: 11,
    fontWeight: "700",
    color: colors.accentCyan,
  },
  listeningHint: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.accentPink,
    textAlign: "center",
    paddingHorizontal: 12,
    alignSelf: "center",
  },
  heardPreview: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: "center",
    fontStyle: "italic",
    paddingHorizontal: 16,
    alignSelf: "center",
  },
  feedback: {
    fontSize: 22,
    fontWeight: "900",
    marginTop: 4,
    textAlign: "center",
    alignSelf: "center",
  },
});
