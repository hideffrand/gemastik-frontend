import {
  Text,
  View,
  Dimensions,
  Pressable,
  Image,
  ScrollView,
} from "react-native";
import { Link } from "expo-router";
import { LineChart } from "react-native-chart-kit";
import { Color } from "@/constants/Colors";
import { font } from "@/styles/fonts";
import { useEffect, useState } from "react";
import ViewLayout from "@/components/ViewLayout";
import { useAuth } from "@/contexts/AuthProvider";
import { AntDesign } from "@expo/vector-icons";
import { baseUrl } from "@/constants/config";
import { Item, ItemType } from "@/app/MyItems";
import { mockItems } from "@/utils/mock";
import { router } from "expo-router";

export default function UserIndex() {
  type TimeRange = "Last week" | "Last month" | "Last year";
  const timeRanges: TimeRange[] = ["Last week", "Last month", "Last year"];
  const screenWidth = Dimensions.get("window").width;
  const chartWidth = screenWidth - 48;
  const [timeRange, setTimeRange] = useState<TimeRange>("Last week");
  const { user } = useAuth();
  const [username, setUsername] = useState<string>("Guest");

  useEffect(() => {
    if (user) {
      console.log("index.tsx: ", user);
      setUsername(user.name);
    }
  }, [user]);

  useEffect(() => {
    console.log("index.tsx - username: ", username);
  }, [username]);

  // useEffect(() => {
  //   if (!user) {
  //     router.replace("AuthOnboarding");
  //     return;
  //   }
  // }, [user]);

  const analysisCards = [
    {
      title: "Kertas",
      imageSource: require("../../assets/images/sampah-kertas.png"),
      backgroundColor: "rgba(230,214,195,0.4)",
      value: Math.floor(getPercentageByType(mockItems).Kertas),
    },
    {
      title: "Plastik",
      imageSource: require("../../assets/images/sampah-plastik.png"),
      backgroundColor: "rgba(135,219,219,0.24)",
      value: Math.floor(getPercentageByType(mockItems).Plastik),
    },
    {
      title: "Kaleng",
      imageSource: require("../../assets/images/sampah-kaleng.png"),
      backgroundColor: "rgba(236,236,245,1)",
      value: Math.floor(getPercentageByType(mockItems).Kaleng),
    },
    {
      title: "Makanan",
      imageSource: require("../../assets/images/sampah-makanan.png"),
      backgroundColor: "rgba(255,167,38,0.32)",
      value: Math.floor(getPercentageByType(mockItems).Makanan),
    },
  ];

  const chartLabels: Record<TimeRange, string[]> = {
    "Last week": ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Sun"],
    "Last month": ["Week 1", "Week 2", "Week 3", "Week 4"],
    "Last year": [
      "Ja",
      "Fe",
      "Ma",
      "Ap",
      "Ma",
      "Ju",
      "Ju",
      "Au",
      "Se",
      "Oc",
      "No",
      "De",
    ],
  };

  const generateRandomData = (length: number) => {
    const data = [];
    for (let i = 0; i < length; i++) {
      data.push(Math.random() * 100);
    }
    return data;
  };

  const randomData = generateRandomData(chartLabels[timeRange].length);

  function getPercentageByType(items: Item[]): Record<ItemType, number> {
    const typeCounts: Record<ItemType, number> = {
      Plastik: 0,
      Kaleng: 0,
      Kertas: 0,
      Makanan: 0,
    };

    // Count the items by type
    items.forEach((item) => {
      if (typeCounts.hasOwnProperty(item.type)) {
        typeCounts[item.type]++;
      }
    });

    // Calculate percentages
    const totalItems = items.length;
    const typePercentages: Record<ItemType, number> = {
      Plastik: (typeCounts.Plastik / totalItems) * 100,
      Kaleng: (typeCounts.Kaleng / totalItems) * 100,
      Kertas: (typeCounts.Kertas / totalItems) * 100,
      Makanan: (typeCounts.Makanan / totalItems) * 100,
    };

    return typePercentages;
  }

  // useEffect(() => {
  //   async function fetchUserItems() {
  //     const res = await fetch(`${baseUrl}/myitems/${user?.id}`);
  //     if (!res.ok) return [];

  //     const calculate = getPercentageByType(JSON.parse(res));

  //     setPercentages(getPercentageByType(items));
  //   }
  // }, [items]);

  return (
    <ScrollView>
      <ViewLayout>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View>
            <Text style={[font.p]}>Welcome back,</Text>
            <Text style={[font.h1, { color: Color.darkGreen }]}>
              {username}
            </Text>
          </View>
          <Image
            style={{ width: 40, height: 40, borderRadius: 999999 }}
            source={require("../../assets/images/blank-profile.jpg")}
          />
        </View>

        <View style={{ width: "100%", marginVertical: 8, marginTop: 24 }}>
          <LineChart
            data={{
              labels: chartLabels[timeRange],
              datasets: [
                {
                  data: randomData,
                },
              ],
            }}
            width={chartWidth}
            height={200}
            // yAxisLabel="$"
            // yAxisSuffix="k"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundGradientFrom: Color.primaryGray,
              backgroundGradientTo: Color.lightGray,
              decimalPlaces: 0, // optional, defaults to 2dp
              color: (opacity = 1) => Color.darkGreen,
              labelColor: (opacity = 1) => "black",
              strokeWidth: 1.6,
              propsForDots: {
                r: "0",
                strokeWidth: "1",
                stroke: Color.darkGreen,
              },
              propsForBackgroundLines: {
                // stroke: "white",
                opacity: 0.2,
              },
            }}
            // bezier -> smooth line
            style={{
              borderRadius: 10,
            }}
          />
        </View>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 8,
          }}
        >
          {/* <Text style={[font.p, { marginRight: 8 }]}>Filter:</Text> */}
          {timeRanges.map((t, i) => (
            <Pressable
              key={i}
              onPress={() => setTimeRange(t)}
              style={{
                flexGrow: 1,
                padding: 8,
                borderRadius: 6,
                backgroundColor:
                  timeRange == t ? Color.lightOrange : Color.primaryGray,
              }}
            >
              <Text style={[font.p, { textAlign: "center" }]}>{t}</Text>
            </Pressable>
          ))}
        </View>

        <Text style={[font.h1, { marginTop: 24 }]}>Analisis jenis sampah</Text>
        <Text style={[{ opacity: 0.5 }]}>
          Persentase jenis sampah yang kamu hasilkan.
        </Text>
        <View
          style={{
            width: "100%",
            marginTop: 24,
            flexDirection: "row",
            gap: 8,
            justifyContent: "space-between",
          }}
        >
          {analysisCards.map((card, i) => (
            <View
              key={i}
              style={{
                // backgroundColor: card.backgroundColor,
                padding: 6,
                borderRadius: 6,
                flexGrow: 1,
                alignItems: "center",
              }}
            >
              <View style={{ width: "100%", height: 60, alignItems: "center" }}>
                <Image
                  style={{
                    width: "100%",
                    height: "100%",
                    resizeMode: "cover",
                  }}
                  source={card.imageSource}
                />
              </View>
              <Text style={{ marginTop: 6 }}>{card.title}:</Text>
              <Text
                style={[
                  {
                    color: Color.primaryGreen,
                    marginBottom: 6,
                    fontWeight: "800",
                    fontSize: 28,
                  },
                ]}
              >
                {card.value}%
              </Text>
            </View>
          ))}
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
            source={require("../../assets/images/request-pickup-card.png")}
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
              <Text>
                Panggil driver untuk bawa sampah kamu ke TPS terdekat.
              </Text>
            </View>
            <Link href={"RequestPickup"}>
              <AntDesign name="arrowright" size={28} color={Color.darkGreen} />
            </Link>
          </View>
        </View>
        <View
          style={{
            borderColor: Color.primaryGray,
            borderWidth: 1,
            borderRadius: 10,
            overflow: "hidden",
            marginTop: 12,
          }}
        >
          <Image
            source={require("../../assets/images/myitems-card.png")}
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
              <Text>
                Kelola semua item seperti belanjaan dan sampah kamu disini.
              </Text>
            </View>
            <Link href={"MyItems"}>
              <AntDesign name="arrowright" size={28} color={Color.darkGreen} />
            </Link>
          </View>
        </View>

        <View style={{ marginTop: 20 }}></View>
      </ViewLayout>
    </ScrollView>
  );
}
