import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View } from 'react-native';
import { colors, gradients } from '../theme/colors';

type CardProps = {
  letter: string;
  word: string;
  emoji: string;
  /** e.g. "for", "के लिए", "साठी" */
  connector: string;
};

export default function Card({ letter, word, emoji, connector }: CardProps) {
  return (
    <LinearGradient
      colors={[...gradients.cardBorder]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.borderGlow}
    >
      <View style={styles.card}>
        <Text style={styles.emoji}>{emoji}</Text>
        <Text style={styles.letter}>{letter}</Text>
        <Text style={styles.forText}>{connector}</Text>
        <Text style={styles.word}>{word}</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  borderGlow: {
    borderRadius: 28,
    padding: 3,
    shadowColor: colors.accentViolet,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 10,
    alignSelf: 'stretch',
    maxWidth: 380,
    width: '100%',
  },
  card: {
    backgroundColor: colors.bgCard,
    borderRadius: 25,
    paddingVertical: 28,
    paddingHorizontal: 36,
    alignItems: 'center',
    minWidth: 300,
  },
  emoji: {
    fontSize: 72,
    marginBottom: 6,
  },
  letter: {
    fontSize: 80,
    fontWeight: '900',
    color: colors.accentViolet,
    lineHeight: 88,
  },
  forText: {
    fontSize: 22,
    fontWeight: '600',
    color: colors.accentCyan,
    marginVertical: 6,
  },
  word: {
    fontSize: 40,
    fontWeight: '800',
    color: colors.textPrimary,
    lineHeight: 48,
  },
});
