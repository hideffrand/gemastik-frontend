import { View, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Color } from "@/constants/Colors";
import { font } from "@/styles/fonts";

export default function AlertSign() {
  return (
    <View
      style={{
        backgroundColor: Color.secondaryRed,
        padding: 12,
        marginVertical: 12,
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
      }}
    >
      <Feather name="alert-triangle" size={18} color={Color.primaryRed} />
      <Text style={[font.p, { color: Color.primaryRed }]}>
        This feature is under construction :/
      </Text>
    </View>
  );
}
