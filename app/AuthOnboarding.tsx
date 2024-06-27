import Button from "@/components/Button";
import ViewLayout from "@/components/ViewLayout";
import { font } from "@/styles/fonts";
import { router } from "expo-router";
import { ImageBackground, Text, View } from "react-native";

export default function AuthOnboarding() {
  return (
    <>
      <ViewLayout style={{ justifyContent: "space-between", padding: 0 }}>
        <View style={{ padding: 32, marginTop: 40 }}>
          <Text style={[{ textAlign: "center" }, font.h1]}>
            Selamat datang!
          </Text>
          <Text style={[{ textAlign: "center" }, font.p, { opacity: 0.5 }]}>
            Siap untuk jadikan bumi lebih sehat?
          </Text>
        </View>
        <ImageBackground
          source={require("../assets/images/authonboarding-bg.png")}
          style={{ flex: 1 }}
        />
        <View style={{ gap: 12, padding: 32 }}>
          <Button onPress={() => router.replace("Signup")} type="primary">
            Signup
          </Button>
          <Button onPress={() => router.replace("Login")} type="ghost">
            Login
          </Button>
          <Button onPress={() => router.replace("(tabs)")} type="secondary">
            BYPASS
          </Button>
        </View>
      </ViewLayout>
    </>
  );
}
