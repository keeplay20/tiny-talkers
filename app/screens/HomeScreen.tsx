import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../components/Button';
import ScreenGradient from '../components/ScreenGradient';
import { starGoalCount } from '../data/words';
import { APP_LANGUAGES, LANGUAGE_LABELS } from '../i18n/config';
import { getCopy } from '../i18n/copy';
import type { HomeScreenProps } from '../navigation/types';
import { useGameStore } from '../store/useGameStore';
import { colors } from '../theme/colors';

const PREVIEW_OUTLINE_STARS = 8;

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const appLanguage = useGameStore((s) => s.appLanguage);
  const stars = useGameStore((s) => s.starsByLanguage[s.appLanguage]);
  const setAppLanguage = useGameStore((s) => s.setAppLanguage);
  const copy = getCopy(appLanguage);
  const goalCount = starGoalCount(appLanguage);

  return (
    <ScreenGradient variant="home">
      <SafeAreaView style={styles.safe} edges={['top', 'left', 'right', 'bottom']}>
        <View style={styles.container}>
          <Text style={styles.title}>{copy.home.title}</Text>
          <Text style={styles.subtitle}>{copy.home.subtitle}</Text>

          <View style={styles.langBlock}>
            <Text style={styles.langLabel}>{copy.home.chooseLanguage}</Text>
            <View style={styles.langRow}>
              {APP_LANGUAGES.map((code) => {
                const selected = appLanguage === code;
                const { native } = LANGUAGE_LABELS[code];
                return (
                  <Pressable
                    key={code}
                    onPress={() => setAppLanguage(code)}
                    style={[styles.langChip, selected && styles.langChipSelected]}
                    accessibilityRole="button"
                    accessibilityState={{ selected }}
                    accessibilityLabel={LANGUAGE_LABELS[code].short}
                  >
                    <Text style={[styles.langChipText, selected && styles.langChipTextSelected]}>
                      {native}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          <View style={styles.starsRow}>
            <Text style={styles.starsLabel}>{copy.home.stars}</Text>
            {stars === 0 ? (
              <>
                <Text style={styles.starsOutlineRow}>
                  {'☆ '.repeat(Math.min(PREVIEW_OUTLINE_STARS, goalCount)).trimEnd()}
                </Text>
                <Text style={styles.starsHint}>{copy.home.starsEarn}</Text>
              </>
            ) : (
              <>
                <Text style={styles.starsValue}>{'⭐'.repeat(Math.min(stars, 10))}</Text>
                {stars > 10 ? <Text style={styles.starsMore}>+{stars - 10}</Text> : null}
                <Text style={styles.starsHintMuted}>{copy.home.starsKeepGoing}</Text>
              </>
            )}
          </View>

          <Button
            label={copy.home.play}
            onPress={() => navigation.navigate('Game')}
            style={styles.playBtn}
          />

          <Pressable
            onPress={() => navigation.navigate('Feedback')}
            hitSlop={8}
            style={styles.feedbackLinkWrap}
          >
            <Text style={styles.parentLink}>{copy.home.feedback}</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </ScreenGradient>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  title: {
    fontSize: 36,
    fontWeight: '900',
    color: colors.textPrimary,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: colors.accentCyan,
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  langBlock: {
    width: '100%',
    maxWidth: 340,
    alignItems: 'center',
    gap: 10,
  },
  langLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  langRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },
  langChip: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: 'rgba(148, 163, 184, 0.35)',
    backgroundColor: 'rgba(20, 16, 34, 0.45)',
  },
  langChipSelected: {
    borderColor: colors.accentViolet,
    backgroundColor: 'rgba(167, 139, 250, 0.22)',
  },
  langChipText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  langChipTextSelected: {
    color: colors.textPrimary,
  },
  starsRow: {
    alignItems: 'center',
    marginVertical: 4,
    padding: 16,
    backgroundColor: 'rgba(251, 191, 36, 0.12)',
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: 'rgba(251, 191, 36, 0.45)',
    width: '100%',
    maxWidth: 340,
  },
  starsLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.accentAmber,
  },
  starsValue: {
    fontSize: 28,
    marginTop: 6,
  },
  starsMore: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.warning,
  },
  starsOutlineRow: {
    fontSize: 22,
    letterSpacing: 2,
    color: 'rgba(251, 191, 36, 0.45)',
    marginTop: 8,
    textAlign: 'center',
  },
  starsHint: {
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 22,
    color: colors.accentAmber,
    marginTop: 10,
    textAlign: 'center',
    paddingHorizontal: 8,
  },
  starsHintMuted: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
    color: colors.accentAmber,
    marginTop: 8,
    textAlign: 'center',
    paddingHorizontal: 8,
  },
  playBtn: {
    paddingVertical: 4,
  },
  feedbackLinkWrap: {
    marginTop: 16,
  },
  parentLink: {
    fontSize: 13,
    color: colors.textMuted,
    textDecorationLine: 'underline',
  },
});
