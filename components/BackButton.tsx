import { Link } from "expo-router";
import { Color } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

export default function BackButton() {
  return (
    <Link
      href={""}
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
    </Link>
  );
}
