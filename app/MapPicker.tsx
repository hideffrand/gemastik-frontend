import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, View, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useState } from "react";
import LocationSelectorProvider, {
  useLocationSelector,
} from "@/contexts/LocationSelectorProvider";
import { font } from "@/styles/fonts";
import BackButton from "@/components/BackButton";
import { GMAPS_API_KEY } from "@/constants/config";
import MapViewDirections from "react-native-maps-directions";

const origin = { latitude: 37.78825, longitude: -122.4324 };
const destination = { latitude: 37.7749, longitude: -122.4194 };

export default function MapPicker() {
  const { selectedLocation, setSelectedLocation } = useLocationSelector();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <BackButton />
      <View style={styles.container}>
        <MapView
          style={styles.mapStyle}
          initialRegion={{
            ...selectedLocation,
            latitudeDelta: 0.00001,
            longitudeDelta: 0.000001,
          }}
        >
          <Marker
            draggable
            coordinate={selectedLocation}
            onDragEnd={(e) => {
              setSelectedLocation(e.nativeEvent.coordinate);
              alert(JSON.stringify(e.nativeEvent.coordinate));
            }}
            title={"Test Marker"}
            description={selectedLocation.latitude.toString()}
          />
          {/* <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={GMAPS_API_KEY}
            strokeWidth={3}
            strokeColor="hotpink"
          /> */}
        </MapView>
      </View>
      <View
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          height: 250,
          // alignItems: "center",
          backgroundColor: "white",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          padding: 32,
        }}
      >
        <Text style={[font.h2, { paddingBottom: 8 }]}>Choose location</Text>
        <Text style={[font.p]}>Current location</Text>
        <Text>{selectedLocation.latitude}</Text>
        <Text>{selectedLocation.longitude}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  mapStyle: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
