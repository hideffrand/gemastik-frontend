import { useFonts } from "expo-font";
import { Stack, router } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import LocationSelectorProvider from "@/contexts/LocationSelectorProvider";
import AuthProvider, { useAuth } from "@/contexts/AuthProvider";
import RekomendasiProvider from "@/contexts/RekomendasiProvider";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    Inter: require("../assets/fonts/Inter/static/Inter-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
      <RekomendasiProvider>
        <LocationSelectorProvider>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
            <Stack.Screen
              name="RequestPickup"
              options={{ headerShown: false }}
            />
            <Stack.Screen name="MapPicker" options={{ headerShown: false }} />
            <Stack.Screen name="Login" options={{ headerShown: false }} />
            <Stack.Screen name="Signup" options={{ headerShown: false }} />
            <Stack.Screen name="MyItems" options={{ headerShown: false }} />
            <Stack.Screen name="DetailRekomendasi" options={{ headerShown: false }} />
            <Stack.Screen
              name="AuthOnboarding"
              options={{ headerShown: false }}
            />
          </Stack>
        </LocationSelectorProvider>
      </RekomendasiProvider>
    </AuthProvider>
  );
}
