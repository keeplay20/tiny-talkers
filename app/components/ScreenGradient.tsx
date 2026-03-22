import { LinearGradient } from 'expo-linear-gradient';
import type { ReactNode } from 'react';
import { StyleSheet, type ViewStyle } from 'react-native';
import { gradients } from '../theme/colors';

export type ScreenGradientVariant = 'home' | 'game' | 'feedback';

type Props = {
  children: ReactNode;
  variant: ScreenGradientVariant;
  style?: ViewStyle;
};

export default function ScreenGradient({ children, variant, style }: Props) {
  const colorStops = gradients[variant];
  return (
    <LinearGradient
      colors={[...colorStops]}
      locations={[0, 0.35, 0.72, 1]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.root, style]}
    >
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
