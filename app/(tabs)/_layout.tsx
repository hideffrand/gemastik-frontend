import { Tabs, router } from "expo-router";
import React, { useEffect } from "react";
import { Color } from "@/constants/Colors";
import { Feather } from "@expo/vector-icons";
import { Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Color.primaryGreen,
        headerShown: false,
        tabBarHideOnKeyboard: true, // Keep tabs at bottom when opening keyboard
        tabBarStyle: {
          paddingVertical: 10, // Add vertical padding
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <AntDesign name="home" size={24} color={color} />
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? Color.primaryGreen : "gray" }}>
              Home
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="rekomendasikerajinan"
        options={{
          title: "Rekomendasi Kerajinan",
          tabBarIcon: ({ color, focused }) => (
            <Feather name="book-open" size={24} color={color} />
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? Color.primaryGreen : "gray" }}>
              Edu
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="myitems"
        options={{
          title: "My Items",
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons name="menu-open" size={24} color={color} />
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? Color.primaryGreen : "gray" }}>
              My Items
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="driver"
        options={{
          title: "Driver",
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome name="drivers-license-o" size={24} color={color} />
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? Color.primaryGreen : "gray" }}>
              Driver
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <Feather name="user" size={24} color={color} />
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? Color.primaryGreen : "gray" }}>
              Profile
            </Text>
          ),
        }}
      />
    </Tabs>
  );
}
