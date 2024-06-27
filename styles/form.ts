import { StyleSheet } from "react-native";
import { Color } from "../constants/Colors";

export const form = StyleSheet.create({
  input: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: "white",
    borderColor: Color.primaryGray,
    borderWidth: 1,
    borderRadius: 99999999,
    marginVertical: 4,
    width: "100%",
  },
});
