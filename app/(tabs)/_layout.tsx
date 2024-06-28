import { Tabs } from "expo-router";
import React from "react";
import { Color } from "@/constants/Colors";
import { Feather } from "@expo/vector-icons";
import { Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Color.primaryGreen,
        headerShown: false,
        tabBarHideOnKeyboard: true, // Keep tabs at bottom when opening keyboard
        tabBarStyle: {
          paddingVertical: 8, // Add vertical padding
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <AntDesign name="home" size={28} color={color} />
          ),
          tabBarLabel: ({ focused }) =>
            // <Text style={{ color: focused ? Color.primaryGreen : "gray" }}>
            //   Home
            // </Text>
            null,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color, focused }) => (
            <Feather name="search" size={28} color={color} />
          ),
          tabBarLabel: ({ focused }) =>
            // <Text style={{ color: focused ? Color.primaryGreen : "gray" }}>
            //   Explore
            // </Text>
            null,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <Feather name="user" size={28} color={color} />
          ),
          tabBarLabel: ({ focused }) =>
            // <Text style={{ color: focused ? Color.primaryGreen : "gray" }}>
            //   Profile
            // </Text>
            null,
        }}
      />
    </Tabs>
  );
}
