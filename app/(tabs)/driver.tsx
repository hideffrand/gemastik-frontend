import Ionicons from "@expo/vector-icons/Ionicons";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Alert,
} from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { Color } from "@/constants/Colors";
import { font } from "@/styles/fonts";
import { ILocation } from "@/contexts/LocationSelectorProvider";
import { baseUrl } from "@/constants/config";
import { router } from "expo-router";
import { Feather } from "@expo/vector-icons";
import * as Location from "expo-location";

interface IPickup {
  id: number;
  qty: number;
  trashDetail: string;
  userId: string;
  location: ILocation;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

const UPDATE_STATUS = "Delivering";

export default function Driver() {
  const [pickupList, setPickupList] = useState<IPickup[] | []>([]);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [refresh, setRefresh] = useState(false);
  const [currentDriverLocation, setCurrentDriverLocation] = useState<ILocation>(
    {
      latitude: 0,
      longitude: 0,
    }
  );

  async function handlePressPickup() {
    if (!selectedRequest) return;

    alert(`Picking up request no ${selectedRequest.id}`);
    const res = await fetch(`${baseUrl}/updatepickup/${selectedRequest.id}`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ status: UPDATE_STATUS }),
    });

    if (!res.ok) {
      console.log(res);
      alert("Internal server error");
      return;
    }

    fetchPickupData();
    setRefresh(!refresh);
  }

  async function fetchPickupData() {
    try {
      const res = await fetch(`${baseUrl}/pickup?status=Available`);

      if (!res.ok) throw new Error("Failed to get Pickup data");

      const parsedData = await res.json();
      setPickupList(parsedData);
    } catch (error) {
      console.log((error as Error).message);
    }
  }

  async function fetchdriverLocation() {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission to access location was denied");
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    setCurrentDriverLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
  }

  function handleRefresh() {
    fetchPickupData();
  }

  useEffect(() => {
    fetchPickupData();
    fetchdriverLocation();
  }, []);

  return (
    <SafeAreaView style={{ position: "relative", flex: 1 }}>
      <View
        style={{
          position: "absolute",
          bottom: 0,
          backgroundColor: "white",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          padding: 20,
          zIndex: 1,
          gap: 16,
          width: "100%",
        }}
      >
        <View
          style={{
            borderBottomColor: Color.primaryGray,
            borderBottomWidth: 1,
            paddingBottom: 12,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text style={[font.h1, { color: Color.primaryGreen }]}>Pickup</Text>
            <Text style={[font.p, { color: "rgb(160,160,160)" }]}>
              Silakan pilih request terdekat dari lokasi anda.
            </Text>
          </View>
          <Pressable onPress={handleRefresh}>
            <Feather name="refresh-ccw" size={24} color="black" />
          </Pressable>
        </View>
        {selectedRequest && (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <View>
              <Text style={[font.p]}>ID: {selectedRequest.id}</Text>
              <Text style={[font.p]}>User ID: {selectedRequest.userId}</Text>
              <Text style={[font.h2]}>
                {selectedRequest.trashDetail}, {selectedRequest.trashType}
              </Text>
            </View>
            <Text style={[font.h1]}>{selectedRequest.qty}</Text>
          </View>
        )}
        <Pressable style={{ width: "100%" }} onPress={handlePressPickup}>
          <Text
            style={[
              font.h2,
              {
                backgroundColor: Color.primaryGreen,
                color: "white",
                textAlign: "center",
                paddingVertical: 16,
                borderRadius: 999999,
                marginTop: 12,
              },
            ]}
          >
            Pickup
          </Text>
        </Pressable>
      </View>
      {pickupList.length > 0 && (
        <MapView
          style={{
            height: "100%",
          }}
          region={{
            ...currentDriverLocation,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          {pickupList.map((p, i) => (
            <Marker
              coordinate={{
                latitude: p.location.latitude,
                longitude: p.location.longitude,
              }}
              title={p.userId.toString()}
              key={i}
              pinColor={
                p.id === selectedRequest?.id
                  ? Color.primaryGreen
                  : Color.primaryGray
              } // Highlight selected request
              onPress={() => setSelectedRequest(p)}
            ></Marker>
          ))}
          {currentDriverLocation && (
            <Marker
              coordinate={currentDriverLocation}
              title={"Your location"}
              pinColor={Color.darkGreen}
            ></Marker>
          )}
        </MapView>
      )}
    </SafeAreaView>
  );
}
