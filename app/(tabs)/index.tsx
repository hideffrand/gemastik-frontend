import React, { useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  TextInput,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import requestPickupBg from "../../assets/images/request-pickup2.png";
import { color } from "../../constants/color";
import { font } from "../../styles/fonts";
import { form } from "../../styles/form";
import { Link } from "expo-router";
import MapView, { Marker } from "react-native-maps";
import { Picker } from "@react-native-picker/picker";
import { Entypo } from "@expo/vector-icons";

const MAPS_API_KEY = "AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8";
const height = Dimensions.get("screen");

const App = () => {
  const [itemCount, setItemCount] = useState<number>(1);
  const [selectedTrashType, setSelectedTrashType] = useState<string>("");
  const [mapRegion, setmapRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  function handleRequestPickup() {
    try {
      fetch("https://trashapi/pickup", {
        method: "POST",
        body: JSON.stringify({
          qty: itemCount,
          trashType: selectedTrashType,
          trashDetail: "Botol Aqua",
          userId: "1287n12x70mxauf2i3r",
          location: {
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          },
        }),
      }).then((res) => {
        if (!res.ok) {
          // Do something here
        }
      });
    } catch (error) {
      return;
    }
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        position: "relative",
        backgroundColor: color.primaryGreen,
      }}
    >
      <View
        style={{ height: 220, position: "absolute", width: "100%", top: 0 }}
      >
        <ImageBackground
          source={requestPickupBg}
          style={{ width: "100%", height: "100%" }}
        />
      </View>
      <ScrollView>
        <View
          style={{
            flex: 1,
            backgroundColor: "white",
            borderTopStartRadius: 24,
            borderTopEndRadius: 24,
            marginTop: 160,
            gap: 24,
            paddingHorizontal: 32,
          }}
        >
          <View
            style={{
              paddingVertical: 20,
              borderBottomColor: color.softGray,
              borderBottomWidth: 1,
              alignItems: "center",
            }}
          >
            <Link href={"Coba"}>
              <Text style={[font.h1, { color: color.primaryGreen }]}>
                Request Pickup
              </Text>
            </Link>
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
                region={mapRegion}
              >
                <Marker coordinate={mapRegion} title="Marker" />
              </MapView>
            </View>
            <View style={{ backgroundColor: "rgb(244,244,244)", padding: 14 }}>
              <Text style={{ marginVertical: 4 }}>Titik jemput:</Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text style={[font.p, { width: "70%" }]}>
                  Jl. Gunug Sahari 10, No. 8, Kemayoran, Jakarta Pusat, 10651
                </Text>
                <Entypo name="location" size={20} color={color.primaryGreen} />
              </View>
              <Link href={"MapPicker"}>
                <Text>Choose from Map</Text>
              </Link>
            </View>
          </View>

          <View>
            <View style={[form.input, { padding: 0 }]}>
              <Picker
                selectedValue={selectedTrashType}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedTrashType(itemValue)
                }
              >
                <Picker.Item label="Plastik" value="plastik" />
                <Picker.Item label="Sampah makanan" value="sampah makanan" />
              </Picker>
            </View>
            <TextInput
              placeholder="Detail item..."
              style={[
                form.input,
                font.p,
                { borderWidth: 0, borderBottomWidth: 1 },
              ]}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={[font.p]}>Jumlah barang</Text>
            {/* <View>
              
            </View> */}
          </View>

          <View style={{ width: "100%", marginVertical: 32 }}>
            <Text
              style={[
                font.h2,
                {
                  backgroundColor: color.primaryGreen,
                  color: "white",
                  textAlign: "center",
                  paddingVertical: 16,
                  borderRadius: 999999,
                },
              ]}
            >
              Request Pickup
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
