import { useEffect, useState, type ReactNode } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useGameStore } from '../store/useGameStore';
import { colors } from '../theme/colors';

type Props = { children: ReactNode };

/**
 * Avoids a flash of default progress before AsyncStorage rehydrates.
 */
export default function StoreHydrationGate({ children }: Props) {
  const [ready, setReady] = useState(() => useGameStore.persist.hasHydrated());

  useEffect(() => {
    const unsub = useGameStore.persist.onFinishHydration(() => setReady(true));
    if (useGameStore.persist.hasHydrated()) setReady(true);
    return unsub;
  }, []);

  if (!ready) {
    return (
      <View style={styles.wrap}>
        <ActivityIndicator size="large" color={colors.accentViolet} />
      </View>
    );
  }

  return children;
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.bgDeep,
  },
});