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
import requestPickupBg from "../assets/images/request-pickup.jpg";
import { color } from "../constants/color";
import { font } from "../styles/fonts";
import { form } from "../styles/form";
import { Link } from "expo-router";

const { height } = Dimensions.get("window");

const RequestPickup = () => {
  return (
    <SafeAreaView style={{ flex: 1, position: "relative" }}>
      <View
        style={{ height: 250, position: "absolute", width: "100%", top: 0 }}
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
            height: height,
            width: "100%",
            borderTopStartRadius: 32,
            borderTopEndRadius: 32,
            marginTop: 190,
          }}
        >
          <View
            style={{
              padding: 20,
              width: "100%",
              borderBottomColor: color.primaryGray,
              borderBottomWidth: 1,
            }}
          >
            <Link href={"Coba"}>
              <Text style={[font.h1, { color: color.primaryBlue }]}>
                Page Request Pickup
              </Text>
            </Link>
          </View>
          <View style={{ padding: 20 }}>
            <Text style={[font.p, { color: "black", marginBottom: 6 }]}>
              Pilih jenis sampah
            </Text>
            <TextInput placeholder="Plastik" style={[form.input]} />
            <TextInput placeholder="Detail item" style={[form.input]} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RequestPickup;
