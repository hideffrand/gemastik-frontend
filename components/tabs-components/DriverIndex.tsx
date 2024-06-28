import { useState, useEffect } from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { font } from "@/styles/fonts";
import { useAuth } from "@/contexts/AuthProvider";
import { Color } from "@/constants/Colors";
import ViewLayout from "../ViewLayout";
import MapView, { Marker } from "react-native-maps";
import { ILocation } from "@/contexts/LocationSelectorProvider";
import * as Location from "expo-location";

const mockTPS = [
  {
    name: "",
    location: {
      latitude: 0,
      longitude: 0,
    },
  },
];

export default function DriverIndex() {
  const { user } = useAuth();
  const [username, setUsername] = useState<string>("Driver");
  const [refresh, setRefresh] = useState(false);
  const [currentDriverLocation, setCurrentDriverLocation] = useState<ILocation>(
    {
      latitude: 0,
      longitude: 0,
    }
  );

  useEffect(() => {
    if (user) {
      console.log("index.tsx: ", user);
      setUsername(user.name);
    }
  }, [user]);

  useEffect(() => {
    console.log("index.tsx - username: ", username);
  }, [username]);

  async function fetchdriverLocation() {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access location was denied");
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    setCurrentDriverLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
  }

  function handleRefresh() {}

  useEffect(() => {
    fetchdriverLocation();
  }, []);

  return (
    // <ScrollView>
    <ViewLayout style={{ justifyContent: "flex-start" }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingBottom: 24,
        }}
      >
        <View>
          <Text style={[font.p]}>Welcome back,</Text>
          <Text style={[font.h1, { color: Color.darkGreen }]}>{username}</Text>
        </View>
        <Image
          style={{
            width: 40,
            height: 40,
            borderRadius: 999999,
            borderWidth: 2,
            borderColor: Color.orange,
          }}
          source={require("../../assets/images/blank-profile.jpg")}
        />
      </View>

      <View
        style={{
          borderRadius: 10,
          overflow: "hidden",
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
              ...currentDriverLocation,
              latitudeDelta: 0.006,
              longitudeDelta: 0,
            }}
          >
            <Marker
              coordinate={currentDriverLocation}
              title="You"
              pinColor="green"
            />
          </MapView>
        </View>
        <View style={{ backgroundColor: "rgb(244,244,244)", padding: 14 }}>
          <Text style={{ marginVertical: 4 }}>TPS terdekat dari anda:</Text>
        </View>
      </View>
    </ViewLayout>
    // </ScrollView>
  );
}
