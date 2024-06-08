import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { color } from "@/constants/color";
import { Feather } from "@expo/vector-icons";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: color.primaryBlue,
        headerShown: false,
        tabBarHideOnKeyboard: true, // Keep tabs at bottom when opening keyboard
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Feather name="home" size={24} color={color} />
            // <TabBarIcon
            //   name={focused ? "home" : "home-outline"}
            //   color={color}
            // />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color, focused }) => (
            <Feather name="user" size={24} color={color} />
            // <TabBarIcon
            //   name={focused ? "code-slash" : "code-slash-outline"}
            //   color={color}
            // />
          ),
        }}
      />
    </Tabs>
  );
}
