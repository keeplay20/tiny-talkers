import { useHeaderHeight } from '@react-navigation/elements';
import Constants from 'expo-constants';
import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  PRIVACY_LAST_UPDATED,
  PRIVACY_SECTIONS,
} from '../content/privacyPolicy';
import ScreenGradient from '../components/ScreenGradient';
import { getCopy } from '../i18n/copy';
import type { PrivacyScreenProps } from '../navigation/types';
import { useGameStore } from '../store/useGameStore';
import { colors } from '../theme/colors';

function resolvePrivacyPolicyUrl(): string | null {
  const raw = Constants.expoConfig?.extra?.privacyPolicyUrl;
  if (typeof raw !== 'string') return null;
  const url = raw.trim();
  if (!url.startsWith('http://') && !url.startsWith('https://')) return null;
  return url;
}

export default function PrivacyScreen(_props: PrivacyScreenProps) {
  const headerHeight = useHeaderHeight();
  const appLanguage = useGameStore((s) => s.appLanguage);
  const copy = getCopy(appLanguage);
  const webUrl = resolvePrivacyPolicyUrl();

  const openWeb = async () => {
    if (!webUrl) return;
    try {
      await Linking.openURL(webUrl);
    } catch {
      // In-app text remains the source of truth.
    }
  };

  return (
    <ScreenGradient variant="feedback">
      <SafeAreaView style={styles.safe} edges={['left', 'right', 'bottom']}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.scroll,
            { paddingTop: headerHeight + 8, paddingBottom: 32 },
          ]}
        >
          <Text style={styles.title}>{copy.privacy.title}</Text>
          <Text style={styles.updated}>
            {copy.privacy.lastUpdated}: {PRIVACY_LAST_UPDATED}
          </Text>

          {PRIVACY_SECTIONS.map((section) => (
            <View key={section.heading} style={styles.section}>
              <Text style={styles.heading}>{section.heading}</Text>
              {section.paragraphs.map((p, i) => (
                <Text key={i} style={styles.body}>
                  {p}
                </Text>
              ))}
            </View>
          ))}

          {webUrl ? (
            <Pressable onPress={openWeb} hitSlop={8}>
              <Text style={styles.webLink}>{copy.privacy.openWeb}</Text>
            </Pressable>
          ) : null}
        </ScrollView>
      </SafeAreaView>
    </ScreenGradient>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  scroll: {
    paddingHorizontal: 24,
    maxWidth: 480,
    width: '100%',
    alignSelf: 'center',
    gap: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: colors.textPrimary,
    textAlign: 'center',
  },
  updated: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textMuted,
    textAlign: 'center',
    marginBottom: 8,
  },
  section: {
    gap: 8,
    marginTop: 8,
  },
  heading: {
    fontSize: 17,
    fontWeight: '800',
    color: colors.accentCyan,
  },
  body: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.textSecondary,
  },
  webLink: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.accentViolet,
    textAlign: 'center',
    textDecorationLine: 'underline',
    marginTop: 16,
  },
});