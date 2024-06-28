import { Image, ScrollView, Text, View } from "react-native";
import ViewLayout from "../ViewLayout";
import { font } from "@/styles/fonts";
import { Color } from "@/constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import { Link } from "expo-router";
import RekomendasiKerajinan from "./RekomendasiKerajinan";
import RekomendasiMakanan from "./RekomendasiMakanan";

export default function UserExplore() {
  return (
    <ScrollView>
      <ViewLayout style={{ justifyContent: "flex-start" }}>
        {/* <Text style={[font.h1, { marginBottom: 32 }]}>Explore</Text> */}
        <RekomendasiKerajinan />
        <RekomendasiMakanan />
      </ViewLayout>
    </ScrollView>
  );
}
