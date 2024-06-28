import ViewLayout from "@/components/ViewLayout";
import { Color } from "@/constants/Colors";
import { baseUrl } from "@/constants/config";
import { font } from "@/styles/fonts";
import { useEffect, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useRekomendasi } from "@/contexts/RekomendasiProvider";
import { router } from "expo-router";

const mockRecKerajinan = [
  {
    title: "Pot Bunga dari Botol Plastik Bekas",
    description:
      "Memanfaatkan botol plastik bekas untuk membuat pot bunga yang cantik.",
    tutorial: [
      "Siapkan botol plastik bekas yang sudah bersih dan kering.",
      "Gunakan gunting untuk memotong bagian yang diinginkan dari botol plastik.",
      "Pasang potongan-potongan botol sesuai dengan desain pot bunga yang diinginkan.",
      "Gunakan lem untuk menempelkan bagian-bagian botol yang telah dipotong.",
      "Biarkan lem kering dan pot bunga siap untuk digunakan.",
    ],
    type: "plastik",
    bahan: ["Botol Plastik Bekas", "Gunting", "Lem"],
    img: require(`../../assets/images/Pot Bunga dari Botol Plastik Bekas.jpg`),
  },
  {
    title: "Celengan dari Kaleng Bekas",
    description:
      "Mengubah kaleng bekas menjadi celengan yang unik dan berguna.",
    tutorial: [
      "Bersihkan kaleng bekas dari sisa-sisa isinya dan biarkan kering.",
      "Cat kaleng dengan warna kesukaanmu atau bungkus dengan kertas hias.",
      "Buat lubang di bagian atas kaleng untuk memasukkan uang.",
      "Tambahkan dekorasi seperti mata-mata plastik atau stiker untuk mempercantik celengan.",
      "Celengan dari kaleng bekas siap digunakan.",
    ],
    type: "kaleng",
    bahan: ["Kaleng Bekas", "Cat atau Kertas Hias", "Lem", "Dekorasi"],
    img: require(`../../assets/images/Celengan dari Kaleng Bekas.jpg`),
  },
  {
    title: "Patung dari Bubur Kertas",
    description:
      "Membuat patung dari kertas bekas yang didaur ulang menjadi bubur kertas.",
    tutorial: [
      "Siapkan kertas bekas dan robek-robek menjadi potongan kecil.",
      "Rendam potongan kertas dalam air selama beberapa jam hingga lembek.",
      "Blender kertas yang sudah direndam hingga menjadi bubur kertas.",
      "Campur bubur kertas dengan lem putih hingga menjadi adonan yang bisa dibentuk.",
      "Bentuk adonan bubur kertas menjadi patung sesuai dengan keinginanmu.",
      "Biarkan patung kering sepenuhnya sebelum dicat atau dihias.",
    ],
    type: "kertas",
    bahan: ["Kertas Bekas", "Air", "Lem Putih", "Blender"],
    img: require(`../../assets/images/Patung dari Bubur Kertas.jpg`),
  },
];

export default function RekomendasiKerajinan() {
  const { changeRecItem } = useRekomendasi();

  // useEffect(() => {
  //   async function fetchRectData() {
  //     const res = await fetch(
  //       `${baseUrl}/recommendation?id=5f9b1b3b1f1b1b1b1b1b1b1b`
  //     );

  //     if (!res.ok) alert("Failed to fetch Rekomendasi Kerajinan");
  //     const data = await res.json();
  //     setRecData(data);
  //   }

  //   fetchRectData();
  // }, []);

  return (
    <>
      <Text style={[font.h1, { marginTop: 32, marginBottom: 16 }]}>
        Rekomendasi Kerajinan
      </Text>
      {mockRecKerajinan.map((item, i) => (
        <View
          key={i}
          style={{
            borderRadius: 10,
            overflow: "hidden",
            borderWidth: 1,
            borderColor: Color.primaryGray,
            marginVertical: 8,
          }}
        >
          <Image style={{ width: "100%", height: 140 }} source={item.img} />
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
              <Text style={[font.h2]}>{item.title}</Text>
              <Text style={{ opacity: 0.5 }}>{item.description}</Text>
            </View>
            <Pressable
              onPress={() => {
                changeRecItem(item);
                router.replace("DetailRekomendasi");
              }}
            >
              <AntDesign name="arrowright" size={24} color={Color.darkGreen} />
            </Pressable>
          </View>
        </View>
      ))}
    </>
  );
}
