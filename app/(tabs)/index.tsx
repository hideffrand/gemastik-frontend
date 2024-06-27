import { SafeAreaView } from "react-native-safe-area-context";
import {
  Text,
  View,
  Dimensions,
  Pressable,
  Image,
  ScrollView,
  Button,
} from "react-native";
import { Link, router } from "expo-router";
import { LineChart } from "react-native-chart-kit";
import { Color } from "@/constants/Colors";
import { font } from "@/styles/fonts";
import { useEffect, useState } from "react";
import ViewLayout from "@/components/ViewLayout";
import { useAuth } from "@/contexts/AuthProvider";

export default function index() {
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

  const analysisCards = [
    {
      title: "Kertas",
      imageSource: require("../../assets/images/sampah-kertas.png"),
      percentage: 5,
      backgroundColor: "rgba(230,214,195,0.4)",
    },
    {
      title: "Plastik",
      imageSource: require("../../assets/images/sampah-plastik.png"),
      percentage: 42,
      backgroundColor: "rgba(135,219,219,0.24)",
    },
    {
      title: "Kaleng",
      imageSource: require("../../assets/images/sampah-kaleng.png"),
      percentage: 3,
      backgroundColor: "rgba(236,236,245,1)",
    },
    {
      title: "Makanan",
      imageSource: require("../../assets/images/sampah-makanan.png"),
      percentage: 50,
      backgroundColor: "rgba(255,167,38,0.32)",
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

        <Image
          style={{
            objectFit: "cover",
            resizeMode: "contain",
            width: "100%",
            height: 100,
            borderRadius: 10,
            marginTop: 32,
          }}
          source={require("../../assets/images/request-pickup-card.png")}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 12,
            gap: 12,
          }}
        >
          <Text style={[font.p, { flex: 1, opacity: 0.5 }]}>
            Buat kamu yang gaada waktu untuk olah sampah sendiri.
          </Text>
          <Pressable
            style={{
              padding: 8,
              borderRadius: 6,
              backgroundColor: Color.darkGreen,
              maxWidth: 150,
              flexGrow: 1,
              alignItems: "center",
            }}
          >
            <Link href={"RequestPickup"}>
              <Text style={[font.p, { textAlign: "center", color: "white" }]}>
                Make a request
              </Text>
            </Link>
          </Pressable>
        </View>

        <Text style={[font.h1, { marginTop: 32 }]}>Tracker</Text>
        <View style={{ width: "100%", marginVertical: 8 }}>
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

        <Text style={[font.h1, { marginTop: 32 }]}>Analisis jenis sampah</Text>
        <Text style={[font.p, { opacity: 0.5 }]}>
          Persentase sampah yang kamu hasilkan berdasarkan jenisnya.
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
                {card.percentage}%
              </Text>
            </View>
          ))}
        </View>

        <View style={{ marginTop: 20 }}></View>
      </ViewLayout>
    </ScrollView>
  );
}
