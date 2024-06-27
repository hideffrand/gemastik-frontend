import { ReactNode } from "react";
import { Pressable, StyleSheet, Text, ViewStyle } from "react-native";
import { Color } from "../constants/Colors"; // Assuming you have a Color constant file

interface ButtonProps {
  children: ReactNode;
  onPress: () => any;
  type: "primary" | "secondary" | "ghost";
}

export default function Button({ children, onPress, type }: ButtonProps) {
  const getButtonStyle = (): ViewStyle => {
    switch (type) {
      case "primary":
        return {
          backgroundColor: Color.primaryGreen,
          paddingVertical: 16,
          borderRadius: 999999,
        };
      case "secondary":
        return {
          backgroundColor: Color.primaryGray,
          paddingVertical: 16,
          borderRadius: 999999,
        };
      case "ghost":
        return {
          backgroundColor: "transparent",
          borderWidth: 1,
          borderColor: Color.primaryGreen,
          paddingVertical: 16,
          borderRadius: 999999,
        };
      default:
        return {}; // Empty object as fallback
    }
  };

  const buttonStyle = getButtonStyle();

  return (
    <Pressable onPress={onPress} style={[styles.button, buttonStyle]}>
      <Text
        style={[
          styles.buttonText,
          {
            color: type == "primary" ? "white" : Color.primaryGreen,
            fontWeight: type != "ghost" ? "600" : "400",
          },
        ]}
      >
        {children}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    minWidth: 120,
  },
  buttonText: {
    fontSize: 18,
  },
});
