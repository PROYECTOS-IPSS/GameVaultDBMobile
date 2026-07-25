import { useEffect } from 'react';
import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts, Inter_400Regular } from '@expo-google-fonts/inter';
import { SpaceGrotesk_700Bold, useFonts as useSpaceGrotesk } from '@expo-google-fonts/space-grotesk';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { AuthProvider } from '@/hooks/useAuth';

export default function RootLayout() {
  const [interLoaded] = useFonts({
    Inter: Inter_400Regular,
  });

  const [spaceLoaded] = useSpaceGrotesk({
    SpaceGrotesk: SpaceGrotesk_700Bold,
  });

  useEffect(() => {
    if (interLoaded && spaceLoaded) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [interLoaded, spaceLoaded]);

  return (
    <AuthProvider>
      <ThemeProvider value={DarkTheme}>
        <Stack screenOptions={{ headerShown: false }} />
        <StatusBar style="light" />
      </ThemeProvider>
    </AuthProvider>
  );
}
