import ViewLayout from "../ViewLayout";
import { View, Image, Text } from "react-native";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthProvider";
import { font } from "@/styles/fonts";
import { Color } from "@/constants/Colors";
import { baseUrl } from "@/constants/config";
import { ILocation } from "@/contexts/LocationSelectorProvider";
import { formatDate } from "@/utils/date";

interface IPikcup {
  id: any;
  userId: any;
  trashType: string;
  trashDetail: string;
  status: string;
  location: ILocation;
  createdAt: string;
  updatedAt: string;
}

const statusColor: any = {
  Available: {
    color: Color.primaryGreen,
    backgroundColor: Color.softGreen,
  },
  Delivering: {
    color: Color.primaryBlue,
    backgroundColor: Color.secondaryBlue,
  },
  Complete: {
    color: "black",
    backgroundColor: Color.primaryGray,
  },
};

export default function AdminIndex() {
  const { user } = useAuth();
  const [username, setUsername] = useState<string>("Driver");
  const [pickupData, setPickupData] = useState<IPikcup[] | []>([]);

  useEffect(() => {
    if (user) {
      console.log("index.tsx: ", user);
      setUsername(user.name);
    }
  }, [user]);

  useEffect(() => {
    console.log("index.tsx - username: ", username);
  }, [username]);

  async function fetchPickupData() {
    try {
      const res = await fetch(`${baseUrl}/pickup`);
      if (!res.ok) throw new Error("Failed to get Pickup data");

      const parsedData = await res.json();
      console.log(parsedData);
      setPickupData(parsedData);
    } catch (error) {
      console.log((error as Error).message);
    }
  }

  useEffect(() => {
    fetchPickupData();
  }, []);

  return (
    <ViewLayout style={{ justifyContent: "flex-start" }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View>
          <Text style={[font.p]}>Welcome back,</Text>
          <Text style={[font.h1, { color: Color.darkGreen }]}>{username}</Text>
        </View>
        <Image
          style={{
            width: 40,
            height: 40,
          }}
          source={require("../../assets/images/blank-profile.jpg")}
        />
      </View>
      <Text style={[font.h1, { marginTop: 24 }]}>Pickup requests</Text>
      <View style={{ marginTop: 12 }}>
        {pickupData.map((data, i) => (
          <View
            key={i}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingVertical: 8,
              borderBottomWidth: 1,
              borderBottomColor: Color.primaryGray,
            }}
          >
            <Text>{i + 1}</Text>
            <View>
              <Text>{data.userId}</Text>
              <Text>{formatDate(data.createdAt)}</Text>
            </View>
            <Text
              style={{
                backgroundColor: statusColor[data.status]?.backgroundColor || Color.secondaryRed,
                color: statusColor[data.status]?.color || Color.primaryRed,
                flexGrow: 0,
                padding: 4,
                borderRadius: 4,
              }}
            >
              {data.status}
            </Text>
          </View>
        ))}
      </View>
    </ViewLayout>
  );
}
