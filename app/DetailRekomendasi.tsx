import ViewLayout from "@/components/ViewLayout";
import { useRekomendasi } from "@/contexts/RekomendasiProvider";
import { Image, ScrollView, Text, View } from "react-native";
import { font } from "@/styles/fonts";
import BackButton from "@/components/BackButton";
import { Color } from "@/constants/Colors";

export default function DetailRekomendasi() {
  const { recItem } = useRekomendasi();

  return (
    <>
      <BackButton />
      <Image source={recItem.img} style={{ width: "100%", height: 200 }} />
      <ScrollView style={{ flex: 1 }}>
        <ViewLayout
          style={{ justifyContent: "flex-start", height: "100%", flex: 1 }}
        >
          <Text style={[font.h1, { paddingBottom: 2 }]}>{recItem.title}</Text>
          <Text style={[font.p, { paddingBottom: 16 }]}>
            {recItem.description}
          </Text>
          <Text style={[font.h2, { color: Color.darkGreen, paddingBottom: 8 }]}>
            Bahan
          </Text>
          {recItem.bahan.map((t: string, i: number) => (
            <Text
              style={[font.p, { opacity: 1, paddingBottom: 4, paddingLeft: 4 }]}
              key={i}
            >
              - {t}
            </Text>
          ))}
          <View style={{ paddingBottom: 12 }}></View>
          <Text style={[font.h2, { color: Color.darkGreen, paddingBottom: 8 }]}>
            Tutorial
          </Text>
          {recItem.tutorial.map((t: string, i: number) => (
            <Text
              style={[font.p, { opacity: 1, paddingBottom: 4, paddingLeft: 4 }]}
              key={i}
            >
              {i + 1}. {t}
            </Text>
          ))}
          <View style={{ paddingBottom: 12 }}></View>
        </ViewLayout>
      </ScrollView>
    </>
  );
}
