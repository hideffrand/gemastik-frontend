import { useState, useEffect } from "react";
import { View, Text, Image, ScrollView, Pressable } from "react-native";
import { font } from "@/styles/fonts";
import { useAuth } from "@/contexts/AuthProvider";
import { Color } from "@/constants/Colors";
import ViewLayout from "../ViewLayout";
import MapView, { Marker } from "react-native-maps";
import { ILocation } from "@/contexts/LocationSelectorProvider";
import * as Location from "expo-location";
import { AntDesign } from "@expo/vector-icons";
import { Link } from "expo-router";
import { ExternalLink } from "../ExternalLink";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

const mockTPS = [
  {
    name: "Bank Sampah Kasuari",
    locationLabel:
      "PPC5+7VR, Jl. Kasuari X, Pd. Pucung, Kec. Pd. Aren, Kota Tangerang Selatan, Banten 15229",
    location: {
      latitude: -6.272600086405829,
      longitude: 106.7091163307387,
    },
    gmapsLink:
      "https://www.google.com/maps?rlz=1C1CHBD_enID1041ID1041&sca_esv=23d022be30022e76&sca_upv=1&vet=12ahUKEwjBpovf7_2GAxV04TgGHXNJDSEQ8UF6BAgZEFM..i&lei=XnN-ZsH_FvTC4-EP85K1iAI&cs=1&um=1&ie=UTF-8&fb=1&gl=id&sa=X&geocode=KfPipVJr-2kuMeXZo4I_iCqt&daddr=PPC5%2B7VR,+Jl.+Kasuari+%E2%85%A9,+Pd.+Pucung,+Kec.+Pd.+Aren,+Kota+Tangerang+Selatan,+Banten+15229",
  },
  {
    name: "Rumah Pemilahan Sampah Jawara",
    locationLabel:
      " Jalan Cendrawasih I RT 005/002 No.018, Sawah Baru, Kec. Ciputat, Kota Tangerang Selatan, Banten 15413",
    location: {
      latitude: -6.292585176013304,
      longitude: 106.72024863132492,
    },
    gmapsLink:
      "https://www.google.com/maps/dir//Jalan+Cendrawasih+I+RT+005%2F002+No.018,+Sawah+Baru,+Kec.+Ciputat,+Kota+Tangerang+Selatan,+Banten+15413/@-6.2975333,106.6383662,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x2e69fba1cf63fb59:0x21fce22a7137caa4!2m2!1d106.7207132!2d-6.2975378?entry=ttu",
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

  function handleRefresh() {
    fetchdriverLocation();
  }

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
          borderColor: Color.primaryGray,
          borderWidth: 1,
          borderRadius: 10,
          overflow: "hidden",
          marginTop: 24,
        }}
      >
        <Image
          source={require("../../assets/images/pickup-card.png")}
          style={{
            objectFit: "cover",
            resizeMode: "contain",
            width: "100%",
            height: 100,
          }}
        />
        <View
          style={{
            padding: 16,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 12,
          }}
        >
          <View style={{ flex: 1 }}>
            <Text>Cari request terdekat pada halaman explore.</Text>
          </View>
          <Link href={"(tabs)/explore"}>
            <AntDesign name="arrowright" size={28} color={Color.darkGreen} />
          </Link>
        </View>
      </View>

      <View
        style={{
          borderRadius: 10,
          overflow: "hidden",
          marginTop: 24,
        }}
      >
        <View
          style={{
            height: 180,
          }}
        >
          <MapView
            style={{
              height: "100%",
            }}
            region={{
              ...currentDriverLocation,
              latitudeDelta: 0.1,
              longitudeDelta: 0,
            }}
          >
            <Marker
              coordinate={currentDriverLocation}
              title="You"
              pinColor="green"
            />
            {mockTPS.map((item, i) => (
              <Marker
                key={i + 9}
                coordinate={item.location}
                title={JSON.stringify(item.name)}
                pinColor="red"
              />
            ))}
          </MapView>
        </View>
        <View
          style={{
            backgroundColor: "rgb(244,244,244)",
            padding: 14,
            marginBottom: 16,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={[font.p, { marginVertical: 4 }]}>
            TPS terdekat dari anda:
          </Text>
          <Pressable onPress={handleRefresh}>
            <Feather name="refresh-ccw" size={20} color="black" />
          </Pressable>
        </View>
        {mockTPS.map((item, i) => (
          <View
            key={i + 12}
            style={{
              paddingVertical: 3,
              paddingHorizontal: 8,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottomWidth: 1,
              paddingBottom: 12,
              borderBottomColor: Color.primaryGray,
            }}
          >
            <View style={{ flex: 1 }}>
              <Text style={[font.p, { fontWeight: "600" }]}>{item.name}</Text>
              <Text style={[{ opacity: 0.5 }]}>{item.locationLabel}</Text>
            </View>
            <ExternalLink href={item.gmapsLink}>
              <Entypo name="direction" size={24} color={Color.darkOrange} />
            </ExternalLink>
          </View>
        ))}
      </View>
    </ViewLayout>
    // </ScrollView>
  );
}
