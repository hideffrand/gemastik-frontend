import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Coba() {
  return (
    <View>
      <Link href={'/RequestPickup'}>
        <Text>Coba page</Text>
      </Link>
    </View>
  );
}
