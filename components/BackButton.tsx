import { Link, router } from "expo-router";
import { Pressable } from "react-native";
import { Color } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

export default function BackButton({ to }: { to?: string }) {
  return (
    <Pressable
      onPress={() => (to ? router.push(to) : router.back())}
      style={{
        position: "absolute",
        top: 60,
        left: 20,
        zIndex: 1,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
        padding: 6,
        borderRadius: 9999999,
      }}
    >
      <Ionicons name="arrow-back-outline" size={24} color={Color.darkGreen} />
    </Pressable>
  );
}
