import React, { useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  TextInput,
  Dimensions,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Color } from "../constants/Colors";
import { font } from "../styles/fonts";
import { Link } from "expo-router";
import MapView, { Marker } from "react-native-maps";
import { Picker } from "@react-native-picker/picker";
import { Entypo } from "@expo/vector-icons";
import { useLocationSelector } from "@/contexts/LocationSelectorProvider";
import Button from "@/components/Button";
import { baseUrl } from "@/constants/config";
import BackButton from "@/components/BackButton";
import { useAuth } from "@/contexts/AuthProvider";

const height = Dimensions.get("screen");

export default function RequestPickup() {
  const { selectedLocation } = useLocationSelector();
  const [itemCount, setItemCount] = useState<number>(1);
  const [selectedTrashType, setSelectedTrashType] = useState<string>("");
  const [trashDetail, setTrashDetail] = useState<string>("");
  const [locationLabel, setLocationLabel] = useState<string>("");
  const { user } = useAuth();

  async function handleRequestPickup() {
    try {
      const res = await fetch(`${baseUrl}/requestpickup`, {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify({
          qty: itemCount,
          trashType: selectedTrashType,
          trashDetail: trashDetail,
          userId: user?.id,
          status: "Available",
          location: {
            ...selectedLocation,
          },
          locationLabel: locationLabel,
        }),
      });
      if (!res.ok) throw Error;

      alert("Request Sent!");
      return;
    } catch (error) {
      alert("Failed to Request Pickup");
      return;
    }
  }

  function handleItemCountMinus() {
    if (itemCount > 1) setItemCount(itemCount - 1);
  }

  function handleItemCountPlus() {
    setItemCount(itemCount + 1);
  }

  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          position: "relative",
          backgroundColor: Color.primaryGray,
        }}
      >
        <BackButton />
        <View
          style={{ height: 320, position: "absolute", width: "100%", top: 0 }}
        >
          <ImageBackground
            source={require("../assets/images/request-pickup3.png")}
            style={{ width: "100%", height: "100%" }}
          />
        </View>
        <ScrollView style={{ padding: 20 }}>
          <View
            style={{
              flex: 1,
              backgroundColor: "white",
              borderTopStartRadius: 24,
              borderTopEndRadius: 24,
              marginTop: 124,
              gap: 24,
              paddingHorizontal: 20,
              paddingBottom: 32,
            }}
          >
            <View
              style={{
                paddingVertical: 20,
                borderBottomColor: Color.orange,
                borderBottomWidth: 1,
                alignItems: "center",
              }}
            >
              <Text style={[font.h1, { color: Color.primaryGreen }]}>
                Request Pickup
              </Text>
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
                    ...selectedLocation,
                    latitudeDelta: 0.006,
                    longitudeDelta: 0,
                  }}
                >
                  <Marker coordinate={selectedLocation} title="Marker" />
                </MapView>
              </View>
              <View
                style={{ backgroundColor: "rgb(244,244,244)", padding: 14 }}
              >
                <Text style={{ marginVertical: 4 }}>Titik jemput:</Text>
                <TextInput
                  placeholder="Alamat lengkap"
                  style={{
                    padding: 8,
                  }}
                  onChangeText={setLocationLabel}
                />
                <Link
                  href={"MapPicker"}
                  style={{
                    backgroundColor: "white",
                    padding: 8,
                    marginTop: 12,
                    borderRadius: 6,
                  }}
                >
                  <Entypo
                    name="location"
                    size={20}
                    color={Color.primaryGreen}
                  />
                  <Entypo name="location" size={8} color={"transparent"} />
                  <Text style={{ color: "rgb(80,80,80)" }}>
                    Choose from map
                  </Text>
                </Link>
              </View>
            </View>

            <View>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: Color.primaryGray,
                  borderRadius: 10,
                }}
              >
                <Picker
                  selectedValue={selectedTrashType}
                  onValueChange={(itemValue, itemIndex) =>
                    setSelectedTrashType(itemValue)
                  }
                >
                  <Picker.Item label="Plastik" value="plastik" />
                  <Picker.Item label="Kaleng" value="kaleng" />
                  <Picker.Item label="Kertas" value="kertas" />
                  <Picker.Item label="Sampah makanan" value="makanan" />
                </Picker>
              </View>
              <TextInput
                placeholder="Detail item..."
                style={[
                  font.p,
                  {
                    borderWidth: 0,
                    borderBottomWidth: 1,
                    marginHorizontal: 4,
                    paddingVertical: 12,
                    borderEndWidth: 1,
                    borderBottomColor: Color.primaryGray,
                  },
                ]}
                onChangeText={(text) => setTrashDetail(text)}
              />
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: 6,
                alignItems: "center",
              }}
            >
              <Text style={[font.p]}>Jumlah barang</Text>
              <View
                style={{
                  flexDirection: "row",
                  gap: 14,
                  alignItems: "center",
                }}
              >
                <Pressable onPress={handleItemCountMinus}>
                  <Text
                    style={[
                      font.h2,
                      {
                        backgroundColor: Color.primaryGray,
                        paddingHorizontal: 12,
                        paddingVertical: 8,
                        borderTopLeftRadius: 6,
                        borderBottomLeftRadius: 6,
                      },
                    ]}
                  >
                    -
                  </Text>
                </Pressable>
                <Text style={[font.p]}>{itemCount}</Text>
                <Pressable onPress={handleItemCountPlus}>
                  <Text
                    style={[
                      font.h2,
                      {
                        backgroundColor: Color.primaryGray,
                        paddingHorizontal: 12,
                        paddingVertical: 8,
                        borderTopRightRadius: 6,
                        borderBottomRightRadius: 6,
                      },
                    ]}
                  >
                    +
                  </Text>
                </Pressable>
              </View>
            </View>

            <Button onPress={handleRequestPickup} type="primary">
              Request Pickup
            </Button>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
