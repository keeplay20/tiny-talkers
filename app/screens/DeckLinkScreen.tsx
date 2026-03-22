import { useLayoutEffect } from 'react';
import { View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { AppLanguage } from '../i18n/types';
import type { RootStackParamList } from '../navigation/types';
import { useGameStore } from '../store/useGameStore';

type HindiProps = NativeStackScreenProps<RootStackParamList, 'Hindi'>;
type MarathiProps = NativeStackScreenProps<RootStackParamList, 'Marathi'>;

function useDeckRedirect(
  navigation: HindiProps['navigation'] | MarathiProps['navigation'],
  lang: AppLanguage,
) {
  const setAppLanguage = useGameStore((s) => s.setAppLanguage);

  useLayoutEffect(() => {
    setAppLanguage(lang);
    navigation.replace('Game');
  }, [lang, navigation, setAppLanguage]);
}

/** Deep link `/hindi` — Hindi deck (देवनागरी), then Game. */
export function HindiDeckLinkScreen({ navigation }: HindiProps) {
  useDeckRedirect(navigation, 'hi');
  return <View />;
}

/** Deep link `/marathi` — Marathi deck (देवनागरी), then Game. */
export function MarathiDeckLinkScreen({ navigation }: MarathiProps) {
  useDeckRedirect(navigation, 'mr');
  return <View />;
}
