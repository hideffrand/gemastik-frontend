import Button from "@/components/Button";
import ViewLayout from "@/components/ViewLayout";
import { router } from "expo-router";
import { Image, ImageBackground, Text, View } from "react-native";

export default function AuthOnboarding() {
  return (
    <>
      <ViewLayout
        style={{
          justifyContent: "space-between",
          padding: 0,
        }}
      >
        <View style={{ width: "100%", alignItems: "center", marginTop: 60 }}>
          <Image
            source={require("../assets/images/gowize-logo.png")}
            style={{ width: 160, height: 40 }}
          />
        </View>
        <ImageBackground
          source={require("../assets/images/authonboarding-bg.png")}
          style={{ flex: 1 }}
        />
        <View style={{ gap: 8, paddingHorizontal: 32, marginBottom: 32 }}>
          <Button onPress={() => router.replace("Signup")} type="primary">
            Signup
          </Button>
          <Button onPress={() => router.replace("Login")} type="ghost">
            Login
          </Button>
        </View>
      </ViewLayout>
    </>
  );
}
