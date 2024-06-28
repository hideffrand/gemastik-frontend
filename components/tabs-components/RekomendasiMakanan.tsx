import { View, Text, Image, Pressable } from "react-native";
import { font } from "@/styles/fonts";
import { Color } from "@/constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import { useRekomendasi } from "@/contexts/RekomendasiProvider";
import { router } from "expo-router";

const mockRecMakanan = [
  {
    title: "Pasta Salad dengan Sayuran Bekas",
    description:
      "Menggunakan sayuran yang hampir layu di kulkas untuk membuat pasta salad yang segar dan sehat.",
    tutorial: [
      "Rebus pasta sesuai dengan petunjuk pada kemasan hingga al dente.",
      "Potong sayuran seperti paprika, tomat ceri, dan wortel menjadi ukuran kecil.",
      "Campurkan pasta yang sudah matang dengan sayuran yang sudah dipotong.",
      "Tambahkan saus salad favoritmu (misalnya vinaigrette atau saus yoghurt).",
      "Aduk rata dan simpan di kulkas selama 30 menit sebelum disajikan dingin.",
    ],
    bahan: ["Pasta", "Paprika", "Tomat Ceri", "Wortel", "Saus Salad"],
    img: require(`../../assets/images/Pasta Salad dengan Sayuran Bekas.jpg`),
  },
  {
    title: "Smoothie Buah Beku",
    description:
      "Membuat smoothie yang menyegarkan dengan buah-buahan yang hampir busuk di kulkas.",
    tutorial: [
      "Ambil buah-buahan yang sudah matang seperti pisang, stroberi, atau mangga dan potong-potong.",
      "Tempatkan potongan buah ke dalam freezer selama beberapa jam hingga beku.",
      "Masukkan buah beku ke dalam blender.",
      "Tambahkan yoghurt atau susu sesuai selera.",
      "Blender hingga halus dan sajikan segera.",
    ],
    bahan: ["Pisang", "Stroberi", "Mangga", "Yoghurt atau Susu"],
    img: require(`../../assets/images/Smoothie Buah Beku.jpg`),
  },
  {
    title: "Sup Krim dari Sayuran",
    description:
      "Menggunakan sayuran yang hampir busuk di kulkas untuk membuat sup krim yang lezat dan menyehatkan.",
    tutorial: [
      "Potong sayuran seperti brokoli, kembang kol, dan kentang menjadi ukuran kecil.",
      "Rebus sayuran dalam kaldu ayam atau sayuran hingga lunak.",
      "Angkat sayuran dari kaldu dan blender hingga halus.",
      "Kembalikan sayuran yang sudah diblender ke dalam kaldu dan tambahkan krim atau susu.",
      "Masak dengan api kecil sambil diaduk hingga sup mengental. Tambahkan garam dan merica sesuai selera.",
      "Sajikan sup krim panas dengan roti panggang.",
    ],
    bahan: [
      "Brokoli",
      "Kembang Kol",
      "Kentang",
      "Kaldu Ayam atau Sayuran",
      "Krim atau Susu",
      "Garam",
      "Merica",
    ],
    img: require(`../../assets/images/Sup Krim dari Sayuran.jpg`),
  },
];

export default function RekomendasiMakanan() {
  const { changeRecItem } = useRekomendasi();
  return (
    <>
      <Text style={[font.h1, { marginTop: 32, marginBottom: 16 }]}>
        Ide Resep Makanan
      </Text>
      {mockRecMakanan.map((item, i) => (
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
