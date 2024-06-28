import { Image, Text, View } from "react-native";
import { font } from "@/styles/fonts";
import BackButton from "@/components/BackButton";
import ViewLayout from "@/components/ViewLayout";
import { Color } from "@/constants/Colors";
import { useAuth } from "@/contexts/AuthProvider";
import { useEffect, useState } from "react";
import Button from "@/components/Button";
import { router } from "expo-router";
import { Fontisto } from "@expo/vector-icons";

export default function Profile() {
  const { user, logout } = useAuth();
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (!user) {
      router.replace("AuthOnboarding");
      return;
    } else {
      setUsername(user.name);
    }
  }, [user]);

  return (
    <>
      <BackButton />
      <ViewLayout style={{ justifyContent: "flex-start" }}>
        <Text style={[font.h1, { textAlign: "center", paddingTop: 9 }]}>
          Profile
        </Text>
        <View
          style={{
            marginTop: 80,
            marginBottom: 32,
            paddingTop: 80,
            paddingBottom: 20,
            paddingHorizontal: 20,
            width: "100%",
            backgroundColor: Color.darkGreen,
            borderRadius: 10,
            position: "relative",
            alignItems: "center",
          }}
        >
          <Image
            style={{
              width: 120,
              height: 120,
              position: "absolute",
              borderRadius: 9999999,
              transform: [{ translateY: -50 }],
            }}
            source={require("../../assets/images/blank-profile.jpg")}
          />
          <Text style={[font.h1, { color: "white" }]}>Hi, {username}</Text>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              gap: 8,
              paddingTop: 12,
            }}
          >
            <Fontisto name="email" size={20} color="white" />
            <Text
              style={[
                font.p,
                {
                  color: "white",
                },
              ]}
            >
              {user?.email}
            </Text>
          </View>
        </View>

        <Button onPress={logout} type="ghost">
          Logout
        </Button>
      </ViewLayout>
    </>
  );
}
