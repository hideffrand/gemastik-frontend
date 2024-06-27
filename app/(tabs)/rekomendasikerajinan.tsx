import ViewLayout from "@/components/ViewLayout";
import { Color } from "@/constants/Colors";
import { baseUrl } from "@/constants/config";
import { font } from "@/styles/fonts";
import { useEffect, useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";

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
  },
  {
    title: "Gelang Daur Ulang dari Plastik",
    description:
      "Menggunakan tutup botol plastik untuk membuat gelang yang unik dan ramah lingkungan.",
    tutorial: [
      "Kumpulkan tutup botol plastik dan bersihkan.",
      "Gunakan gunting untuk memotong dan membentuk tutup botol sesuai dengan ukuran gelang yang diinginkan.",
      "Buat lubang di tutup botol untuk melewati tali atau benang.",
      "Rangkai dan hias gelang dengan menggunakan benang atau kain sesuai dengan selera.",
    ],
    type: "plastik",
    bahan: ["Tutup Botol Plastik", "Gunting", "Benang atau Kain"],
  },
  {
    title: "Origami Burung Merak",
    description:
      "Membuat origami burung merak dari kertas yang warnanya menyerupai bulu burung merak.",
    tutorial: [
      "Siapkan lembaran kertas origami berwarna yang menyerupai bulu burung merak.",
      "Gunakan pensil untuk menggambar pola origami burung merak atau unduh pola yang tersedia.",
      "Gunakan gunting untuk memotong kertas sesuai dengan pola yang telah digambar.",
      "Lipat kertas sesuai dengan pola origami burung merak, ikuti langkah-langkah lipatan dengan teliti.",
      "Hias detail pada sayap dan ekor burung merak menggunakan cat atau marker jika diperlukan.",
    ],
    type: "kertas",
    bahan: ["Kertas Origami", "Gunting", "Pensil"],
  },
  {
    title: "Kerajinan Quilling untuk Pemula",
    description:
      "Belajar membuat kerajinan quilling sederhana dengan kertas warna-warni.",
    tutorial: [
      "Siapkan berbagai warna kertas quilling dan alat-alatnya.",
      "Buat gulungan-gulungan kertas quilling sesuai dengan panjang dan bentuk yang diinginkan.",
      "Susun dan rangkai gulungan-gulungan kertas quilling menjadi bentuk atau desain yang diinginkan.",
      "Gunakan lem quilling untuk menempelkan ujung-ujung kertas quilling agar bentuknya tetap terjaga.",
    ],
    type: "kertas",
    bahan: ["Kertas Quilling", "Gunting", "Lem Quilling"],
  },
  {
    title: "Lampu Hias dari Kaleng Bekas",
    description:
      "Menggunakan kaleng bekas untuk membuat lampu hias yang indah.",
    tutorial: [
      "Siapkan kaleng bekas yang sudah bersih dan kering.",
      "Gunakan gunting besi untuk memotong dan membentuk kaleng sesuai dengan desain lampu yang diinginkan.",
      "Pasang lampu LED di dalam kaleng yang telah dibentuk dan dipotong.",
      "Sambungkan lampu LED dengan sumber daya listrik dan lampu hias siap untuk digunakan.",
    ],
    type: "kaleng",
    bahan: ["Kaleng Bekas", "Gunting Besi", "Lampu LED"],
  },
  {
    title: "Miniatur Kapal dari Kaleng Soda",
    description:
      "Membuat miniatur kapal pesiar dari kaleng soda bekas untuk koleksi atau mainan anak-anak.",
    tutorial: [
      "Siapkan kaleng soda bekas yang sudah dibersihkan dan kering.",
      "Gunakan gunting besi untuk memotong dan membentuk kaleng sesuai dengan bentuk kapal yang diinginkan.",
      "Cat kapal miniatur menggunakan cat akrilik, biarkan cat kering sepenuhnya.",
      "Hias detail kapal dengan menggunakan cat atau marker sesuai dengan preferensi.",
    ],
    type: "kaleng",
    bahan: ["Kaleng Soda Bekas", "Gunting Besi", "Cat Akrilik"],
  },
];

export default function rekomendasikerajinan() {
  const [recData, setRecData] = useState([]);

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
    <ScrollView>
      <ViewLayout style={{ justifyContent: "flex-start" }}>
        <Text style={[font.h1]}>Rekomendasi Kerajinan</Text>
        <Text style={[font.p, { marginBottom: 32, opacity: 0.5 }]}>
          Beberapa rekomendasi kerajinan yang dapat kamu lakukan untuk mengolah
          sampah yang kamu punya.
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
            <Image
              style={{ width: "100%", height: 140 }}
              source={require("../../assets/images/kerajinan.jpg")}
            />
            <View style={{ padding: 12 }}>
              <Text style={[font.h2]}>{item.title}</Text>
              <Text style={[font.p, { opacity: 0.5 }]}>{item.description}</Text>
            </View>
          </View>
        ))}
      </ViewLayout>
    </ScrollView>
  );
}
