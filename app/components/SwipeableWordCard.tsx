import { useEffect } from 'react';
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import Card from './Card';
import { colors } from '../theme/colors';

type Props = {
  letter: string;
  word: string;
  emoji: string;
  connector: string;
  /** Changes when the word changes — resets swipe position */
  cardKey: number | string;
  onSwipeNext: () => void;
  onSwipePrev: () => void;
  swipeNextHint: string;
  swipePrevHint: string;
  /** When false, the gesture that means “previous” is blocked (stays on first card). */
  allowSwipePrev: boolean;
  /**
   * English: swipe right = next, left = prev.
   * Hindi / Marathi: swipe left = next, right = prev (matches common “card” UX + avoids RTL mirroring bugs).
   */
  swipeNextOnLeft: boolean;
};

export default function SwipeableWordCard({
  letter,
  word,
  emoji,
  connector,
  cardKey,
  onSwipeNext,
  onSwipePrev,
  swipeNextHint,
  swipePrevHint,
  allowSwipePrev,
  swipeNextOnLeft,
}: Props) {
  const { width: screenW } = useWindowDimensions();
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const allowPrevSv = useSharedValue(allowSwipePrev ? 1 : 0);
  const invertSv = useSharedValue(swipeNextOnLeft ? 1 : 0);

  const threshold = Math.min(screenW * 0.24, 120);

  useEffect(() => {
    allowPrevSv.value = allowSwipePrev ? 1 : 0;
  }, [allowSwipePrev]);

  useEffect(() => {
    invertSv.value = swipeNextOnLeft ? 1 : 0;
  }, [swipeNextOnLeft]);

  useEffect(() => {
    translateX.value = 0;
    translateY.value = 0;
  }, [cardKey]);

  const pan = Gesture.Pan()
    .activeOffsetX([-14, 14])
    .onUpdate((e) => {
      translateX.value = e.translationX;
      translateY.value = e.translationY * 0.25;
    })
    .onEnd((e) => {
      const tx = translateX.value;
      const vel = e.velocityX;
      const strongFling = Math.abs(vel) > 520;
      const pastEdge = Math.abs(tx) > threshold;

      if (pastEdge || strongFling) {
        const dir = tx + vel * 0.08 > 0 ? 1 : -1;
        // dir > 0 = swipe right, dir < 0 = swipe left
        const isPrevSwipe = invertSv.value === 1 ? dir > 0 : dir < 0;
        if (isPrevSwipe && allowPrevSv.value === 0) {
          translateX.value = withSpring(0, { damping: 18, stiffness: 220 });
          translateY.value = withSpring(0, { damping: 18, stiffness: 220 });
          return;
        }
        const toX = dir * screenW * 1.45;
        translateX.value = withTiming(toX, { duration: 240 }, (finished) => {
          if (finished) {
            const goNext = invertSv.value === 1 ? dir < 0 : dir > 0;
            if (goNext) {
              runOnJS(onSwipeNext)();
            } else {
              runOnJS(onSwipePrev)();
            }
          }
        });
        translateY.value = withTiming(0, { duration: 240 });
      } else {
        translateX.value = withSpring(0, { damping: 18, stiffness: 220 });
        translateY.value = withSpring(0, { damping: 18, stiffness: 220 });
      }
    });

  const cardStyle = useAnimatedStyle(() => {
    const rot = interpolate(
      translateX.value,
      [-screenW * 0.35, 0, screenW * 0.35],
      [-14, 0, 14],
      Extrapolation.CLAMP,
    );
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotateZ: `${rot}deg` },
      ],
    };
  });

  /** Next hint: only while dragging toward “next” — both modes opacity 0 at rest. */
  const nextHintStyle = useAnimatedStyle(() => {
    const t = translateX.value;
    if (invertSv.value === 1) {
      return {
        opacity: interpolate(t, [-threshold * 0.85, 0], [1, 0], Extrapolation.CLAMP),
      };
    }
    return {
      opacity: interpolate(t, [0, threshold * 0.85], [0, 1], Extrapolation.CLAMP),
    };
  });

  const prevHintStyle = useAnimatedStyle(() => {
    const t = translateX.value;
    if (invertSv.value === 1) {
      return {
        opacity: interpolate(t, [0, threshold * 0.85], [0, 1], Extrapolation.CLAMP),
      };
    }
    return {
      opacity: interpolate(t, [-threshold * 0.85, 0], [1, 0], Extrapolation.CLAMP),
    };
  });

  const nextPos = swipeNextOnLeft ? styles.hintPosLeft : styles.hintPosRight;
  const prevPos = swipeNextOnLeft ? styles.hintPosRight : styles.hintPosLeft;

  return (
    <View style={styles.stage}>
      <GestureDetector gesture={pan}>
        <Animated.View style={[styles.cardWrap, cardStyle]}>
          <Card letter={letter} word={word} emoji={emoji} connector={connector} />
          <Animated.View
            style={[styles.hint, nextPos, styles.hintNext, nextHintStyle]}
            pointerEvents="none"
          >
            <Text style={styles.hintText}>{swipeNextHint}</Text>
          </Animated.View>
          <Animated.View
            style={[styles.hint, prevPos, styles.hintPrev, prevHintStyle]}
            pointerEvents="none"
          >
            <Text style={styles.hintText}>{swipePrevHint}</Text>
          </Animated.View>
        </Animated.View>
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  stage: {
    alignSelf: 'stretch',
    minHeight: 200,
    direction: 'ltr',
  },
  cardWrap: {
    alignSelf: 'stretch',
    direction: 'ltr',
  },
  hint: {
    position: 'absolute',
    top: '40%',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 2,
  },
  hintPosLeft: {
    left: 8,
  },
  hintPosRight: {
    right: 8,
  },
  hintNext: {
    borderColor: colors.success,
    backgroundColor: 'rgba(74, 222, 128, 0.15)',
  },
  hintPrev: {
    borderColor: colors.accentCyan,
    backgroundColor: 'rgba(34, 211, 238, 0.12)',
  },
  hintText: {
    fontSize: 16,
    fontWeight: '900',
    color: colors.textPrimary,
  },
});
