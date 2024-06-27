import { Image, Text, View } from "react-native";
import { font } from "@/styles/fonts";
import BackButton from "@/components/BackButton";
import ViewLayout from "@/components/ViewLayout";
import { Color } from "@/constants/Colors";
import MapView, { Marker } from "react-native-maps";
import { useLocationSelector } from "@/contexts/LocationSelectorProvider";
import { useAuth } from "@/contexts/AuthProvider";
import { useEffect, useState } from "react";
import Button from "@/components/Button";
import { router } from "expo-router";

export default function Profile() {
  const { selectedLocation } = useLocationSelector();
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
        <Text style={[font.h1, { textAlign: "center" }]}>Profile</Text>
        <View
          style={{
            marginTop: 80,
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
        </View>

        <View
          style={{
            borderRadius: 10,
            overflow: "hidden",
            paddingTop: 20,
          }}
        >
          <View
            style={{
              height: 140,
            }}
          >
            <MapView
              style={{
                height: "100%",
              }}
              region={{
                ...selectedLocation,
                latitudeDelta: 0.006,
                longitudeDelta: 0,
              }}
            >
              <Marker coordinate={selectedLocation} title="Marker" />
            </MapView>
          </View>
          <View style={{ backgroundColor: "rgb(244,244,244)", padding: 14 }}>
            <Text style={{ marginVertical: 4 }}>Your current address:</Text>
            <Text style={[font.p]}>
              Jl. Gunug Sahari 10, No. 8, Kemayoran, Jakarta Pusat, 10651
            </Text>
          </View>
          <Button onPress={logout} type="ghost">
            Logout
          </Button>
        </View>
      </ViewLayout>
    </>
  );
}
