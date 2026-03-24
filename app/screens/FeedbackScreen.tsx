import { useHeaderHeight } from '@react-navigation/elements';
import Constants from 'expo-constants';
import { Alert, Linking, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../components/Button';
import ScreenGradient from '../components/ScreenGradient';
import { getCopy } from '../i18n/copy';
import type { FeedbackScreenProps } from '../navigation/types';
import { useGameStore } from '../store/useGameStore';
import { colors } from '../theme/colors';

const PLACEHOLDER_SNIPPETS = ['your-form-id-here', '1FAIpQLSdyour'];

function resolveFeedbackFormUrl(): string | null {
  const raw = Constants.expoConfig?.extra?.feedbackFormUrl;
  if (typeof raw !== 'string') {
    return null;
  }
  const url = raw.trim();
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return null;
  }
  if (PLACEHOLDER_SNIPPETS.some((s) => url.includes(s))) {
    return null;
  }
  return url;
}

export default function FeedbackScreen(_props: FeedbackScreenProps) {
  const headerHeight = useHeaderHeight();
  const appLanguage = useGameStore((s) => s.appLanguage);
  const copy = getCopy(appLanguage);

  const openForm = async () => {
    const url = resolveFeedbackFormUrl();
    if (!url) {
      Alert.alert(
        copy.feedback.notConfiguredTitle,
        copy.feedback.notConfiguredBody,
      );
      return;
    }
    try {
      await Linking.openURL(url);
    } catch {
      Alert.alert(copy.feedback.linkErrorTitle, copy.feedback.linkErrorBody);
    }
  };

  return (
    <ScreenGradient variant="feedback">
      <SafeAreaView style={styles.safe} edges={['left', 'right', 'bottom']}>
        <View style={[styles.container, { paddingTop: headerHeight + 6 }]}>
          <Text style={styles.title}>{copy.feedback.title}</Text>
          <Text style={styles.body}>{copy.feedback.body}</Text>
          <Button label={copy.feedback.openButton} onPress={openForm} />
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
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: colors.textPrimary,
    textAlign: 'center',
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.textSecondary,
    textAlign: 'center',
    maxWidth: 340,
  },
});
