import { ReactNode } from "react";
import { ScrollView, View, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface ViewLayoutProps {
  children: ReactNode;
  style?: ViewStyle;
}

export default function ViewLayout({ children, style }: ViewLayoutProps) {
  return (
    <SafeAreaView
      style={[
        {
          flex: 1,
          padding: 24,
          backgroundColor: "white",
          justifyContent: "center",
        },
        style,
      ]}
    >
      {children}
    </SafeAreaView>
  );
}
