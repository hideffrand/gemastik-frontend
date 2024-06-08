import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";

import { useColorScheme } from "@/hooks/useColorScheme";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
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
    <Stack
      screenOptions={({ navigation, route }) => ({
        gestureEnabled: true,
        cardStyleInterpolator: ({
          current,
          layouts,
        }: {
          current: any;
          layouts: any;
        }) => {
          const isBack = navigation.getState().index > 0;
          const translateX = current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: isBack
              ? [0, layouts.screen.width]
              : [layouts.screen.width, 0],
          });

          return {
            cardStyle: {
              transform: [{ translateX }],
            },
          };
        },
      })}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
      <Stack.Screen name="Coba" />
      <Stack.Screen name="RequestPickup" options={{ headerShown: false }} />
      <Stack.Screen name="MapPicker" options={{ headerShown: false }} />
    </Stack>
    // <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
    // <Stack>
    // </Stack>
    // </ThemeProvider>
  );
}
