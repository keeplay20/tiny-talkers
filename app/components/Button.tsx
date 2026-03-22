import { LinearGradient } from 'expo-linear-gradient';
import type { StyleProp, ViewStyle } from 'react-native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, gradients } from '../theme/colors';

type Variant = 'primary' | 'secondary' | 'mic';

type ButtonProps = {
  label: string;
  onPress: () => void;
  variant?: Variant;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

export default function Button({
  label,
  onPress,
  variant = 'primary',
  disabled = false,
  style,
}: ButtonProps) {
  const isGradient = variant === 'primary' || variant === 'mic';
  const isMic = variant === 'mic';

  return (
    <TouchableOpacity
      accessibilityRole="button"
      activeOpacity={0.92}
      onPress={onPress}
      disabled={disabled}
      style={[styles.touch, isMic && styles.touchMic, style, disabled && styles.disabled]}
    >
      {isGradient ? (
        <LinearGradient
          colors={
            isMic ? [...gradients.buttonMic] : [...gradients.buttonPrimary]
          }
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[
            styles.gradientInner,
            isMic && styles.gradientInnerMic,
            styles.gradientFill,
          ]}
        >
          <Text style={styles.label} numberOfLines={1} adjustsFontSizeToFit>
            {label}
          </Text>
        </LinearGradient>
      ) : (
        <View style={styles.secondaryInner}>
          <Text style={styles.labelSecondary}>{label}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  touch: {
    minWidth: 140,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 6,
  },
  touchMic: {
    minWidth: 140,
  },
  gradientInner: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 140,
  },
  gradientInnerMic: {
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  gradientFill: {
    alignSelf: 'stretch',
    width: '100%',
  },
  secondaryInner: {
    paddingVertical: 14,
    paddingHorizontal: 22,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 140,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1.5,
    borderColor: colors.borderSubtle,
    borderRadius: 16,
  },
  disabled: {
    opacity: 0.42,
  },
  label: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '800',
  },
  labelSecondary: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '800',
  },
});
