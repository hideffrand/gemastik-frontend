import { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
  TextInput,
  Modal,
  Button,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome5 } from "@expo/vector-icons";
import { font } from "@/styles/fonts";
import { Color } from "@/constants/Colors";
import DateTimePicker from "@react-native-community/datetimepicker";
import BackButton from "@/components/BackButton";
import { mockItems } from "@/utils/mock";

export type ItemType = "Plastik" | "Kaleng" | "Kertas" | "Makanan";

export interface Item {
  name: string;
  type: ItemType;
  exp?: string;
  checked: boolean;
}

export default function MyItems() {
  const [items, setItems] = useState<Item[] | []>([...mockItems]);
  const [filter, setFilter] = useState<string | null>(null);
  const [newItemName, setNewItemName] = useState("");
  const [newItemType, setNewItemType] = useState<TrashType>("Plastik");
  const [newItemExp, setNewItemExp] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  type TrashType = "Plastik" | "Kertas" | "Kaleng" | "Makanan";

  const trashTypeImage: Record<TrashType, any> = {
    Plastik: require("../assets/images/sampah-plastik.png"),
    Kertas: require("../assets/images/sampah-kertas.png"),
    Kaleng: require("../assets/images/sampah-kaleng.png"),
    Makanan: require("../assets/images/sampah-makanan.png"),
  };

  const getDaysDifference = (date1: Date, date2: Date) => {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const firstDate: any = new Date(date1);
    const secondDate: any = new Date(date2);
    const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
    return diffDays;
  };

  const getExpirationColor = (expDate: string) => {
    const today = new Date();
    const diffDays = getDaysDifference(today, new Date(expDate));

    if (diffDays <= 2 && diffDays >= 1) return Color.orange;
    if (diffDays <= 0) return "red";
    return "black";
  };

  function handleCheckItem(index: number) {
    const updatedItems = [...items];
    updatedItems[index] = {
      ...updatedItems[index],
      checked: !updatedItems[index].checked,
    };
    setItems(updatedItems);
  }

  function handleAddItem() {
    const newItem = {
      name: newItemName,
      type: newItemType,
      exp: newItemExp.toISOString().split("T")[0], // Format date as YYYY-MM-DD
      checked: false,
    };
    setItems([...items, newItem]);
    setShowModal(false);
    setNewItemName("");
    setNewItemType("Plastik");
    setNewItemExp(new Date());
  }

  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          paddingHorizontal: 20,
          paddingVertical: 32,
          backgroundColor: "white",
        }}
      >
        <BackButton />
        <Text style={[font.h1, { marginBottom: 32, textAlign: "center" }]}>
          My Items
        </Text>
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 8,
          }}
        >
          <TextInput
            placeholder="Add new item"
            value={newItemName}
            onChangeText={setNewItemName}
            style={{
              flexGrow: 1,
              borderWidth: 1,
              borderColor: Color.primaryGray,
              borderRadius: 999999,
              paddingVertical: 6,
              paddingHorizontal: 12,
            }}
          />
          <Pressable
            style={{
              paddingVertical: 5,
              paddingHorizontal: 14,
              backgroundColor: Color.darkGreen,
              borderRadius: 99999999,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => setShowModal(true)}
          >
            <Text
              style={[
                font.h1,
                { color: "white", transform: [{ translateY: -1 }] },
              ]}
            >
              +
            </Text>
          </Pressable>
        </View>
        <View
          style={{
            flexDirection: "row",
            gap: 8,
            alignItems: "center",
            marginTop: 12,
          }}
        >
          <Pressable
            style={{
              flexGrow: 1,
              padding: 8,
              borderRadius: 6,
              backgroundColor:
                filter === null ? Color.darkOrange : Color.primaryGray,
            }}
            onPress={() => setFilter(null)}
          >
            <Text
              style={[
                font.p,
                {
                  textAlign: "center",
                  color: filter === null ? "white" : "black",
                },
              ]}
            >
              All
            </Text>
          </Pressable>
          {["Plastik", "Kertas", "Kaleng", "Makanan"].map((item, i) => (
            <Pressable
              key={i}
              style={{
                flexGrow: 1,
                padding: 8,
                borderRadius: 6,
                backgroundColor:
                  filter === item ? Color.darkOrange : Color.primaryGray,
              }}
              onPress={() => setFilter(item)}
            >
              <Text
                style={[
                  font.p,
                  {
                    textAlign: "center",
                    color: filter === item ? "white" : "black",
                  },
                ]}
              >
                {item}
              </Text>
            </Pressable>
          ))}
        </View>
        <ScrollView style={{ marginTop: 32 }}>
          {items
            .filter((item) => filter === null || item.type === filter)
            .map((item, index) => (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginVertical: 2,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    gap: 8,
                    alignItems: "flex-start",
                    opacity: item.checked ? 0.5 : 1,
                  }}
                >
                  <Image
                    style={{ width: 80, height: 80 }}
                    source={trashTypeImage[item.type as TrashType]}
                  />
                  <View>
                    <Text style={[font.p, { fontWeight: "600" }]}>
                      {item.name}
                    </Text>
                    <Text style={{ opacity: 0.5 }}>{item.type}</Text>
                    {item.exp && (
                      <Text
                        style={{
                          color: getExpirationColor(item.exp),
                          opacity: 0.5,
                          fontStyle: "italic",
                        }}
                      >
                        exp: {item.exp}
                      </Text>
                    )}
                  </View>
                </View>
                <Pressable onPress={() => handleCheckItem(index)}>
                  <FontAwesome5
                    name="check-square"
                    size={24}
                    color={item.checked ? Color.darkGreen : Color.gray}
                  />
                </Pressable>
              </View>
            ))}
        </ScrollView>

        {/* Modal for adding new item */}
        <Modal
          visible={showModal}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowModal(false)}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0,0,0,0.5)",
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                padding: 20,
                borderRadius: 10,
                width: "80%",
              }}
            >
              <Text style={[font.h2, { marginBottom: 20 }]}>Add New Item</Text>
              <TextInput
                placeholder="Item Name"
                value={newItemName}
                onChangeText={setNewItemName}
                style={{
                  borderWidth: 1,
                  borderColor: Color.primaryGray,
                  borderRadius: 6,
                  paddingVertical: 6,
                  paddingHorizontal: 12,
                  marginBottom: 12,
                }}
              />
              <TextInput
                placeholder="Item Type"
                value={newItemType}
                onChangeText={setNewItemType as (text: string) => void}
                style={{
                  borderWidth: 1,
                  borderColor: Color.primaryGray,
                  borderRadius: 6,
                  paddingVertical: 6,
                  paddingHorizontal: 12,
                  marginBottom: 12,
                }}
              />
              <Pressable onPress={() => setShowDatePicker(true)}>
                <Text style={[font.p, { color: Color.darkGreen }]}>
                  {newItemExp.toDateString()}
                </Text>
              </Pressable>
              {showDatePicker && (
                <DateTimePicker
                  value={newItemExp}
                  mode="date"
                  display="default"
                  onChange={(event, date) => {
                    setShowDatePicker(false);
                    if (date) {
                      setNewItemExp(date);
                    }
                  }}
                />
              )}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 20,
                }}
              >
                <Button
                  title="Cancel"
                  color={Color.gray}
                  onPress={() => setShowModal(false)}
                />
                <Button
                  title="Add Item"
                  color={Color.darkGreen}
                  onPress={handleAddItem}
                />
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </>
  );
}
