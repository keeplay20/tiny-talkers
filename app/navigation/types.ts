import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  /** Opens with the deck for the current `appLanguage` (Latin A–Z or देवनागरी). */
  Game: undefined;
  /** Sets Hindi + देवनागरी deck, then replaces with Game. Path: `hindi`. */
  Hindi: undefined;
  /** Sets Marathi + देवनागरी deck, then replaces with Game. Path: `marathi`. */
  Marathi: undefined;
  Feedback: undefined;
};

export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
export type GameScreenProps = NativeStackScreenProps<RootStackParamList, 'Game'>;
export type FeedbackScreenProps = NativeStackScreenProps<RootStackParamList, 'Feedback'>;
