import {
  DarkTheme,
  NavigationContainer,
  type Theme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import GradientHeaderBackButton from './components/GradientHeaderBackButton';
import type { RootStackParamList } from './navigation/types';
import FeedbackScreen from './screens/FeedbackScreen';
import GameScreen from './screens/GameScreen';
import {
  HindiDeckLinkScreen,
  MarathiDeckLinkScreen,
} from './screens/DeckLinkScreen';
import HomeScreen from './screens/HomeScreen';
import { colors } from './theme/colors';

const Stack = createNativeStackNavigator<RootStackParamList>();

const navTheme: Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: colors.accentViolet,
    background: 'transparent',
    card: 'transparent',
    text: colors.textPrimary,
    border: 'rgba(148, 163, 184, 0.22)',
    notification: colors.accentPink,
  },
};

const childScreenHeader = (navigation: {
  goBack: () => void;
}): object => ({
  headerShown: true,
  headerTransparent: true,
  headerShadowVisible: false,
  headerTitle: '',
  headerBackTitleVisible: false,
  headerBackVisible: false,
  headerTintColor: colors.textPrimary,
  headerLeft: () => (
    <GradientHeaderBackButton onPress={() => navigation.goBack()} />
  ),
});

/** Uses React Native `Linking` only (no expo-linking native module). Match `expo.scheme` in app.json. */
const linking = {
  prefixes: ['tiny-talkers://'],
  config: {
    screens: {
      Home: '',
      Game: 'game',
      Hindi: 'hindi',
      Marathi: 'marathi',
      Feedback: 'feedback',
    },
  },
};

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer theme={navTheme} linking={linking}>
        <StatusBar style="light" />
        <Stack.Navigator
          screenOptions={{
            contentStyle: { backgroundColor: 'transparent' },
          }}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Game"
            component={GameScreen}
            options={({ navigation }) => childScreenHeader(navigation)}
          />
          <Stack.Screen
            name="Hindi"
            component={HindiDeckLinkScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Marathi"
            component={MarathiDeckLinkScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Feedback"
            component={FeedbackScreen}
            options={({ navigation }) => childScreenHeader(navigation)}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
