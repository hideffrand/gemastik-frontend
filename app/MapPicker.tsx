import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, View, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useState } from "react";

export default function MapPicker() {
  const [location, setLocation] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <MapView
          style={styles.mapStyle}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            draggable
            coordinate={{
              latitude: 37.78825,
              longitude: -122.4324,
            }}
            onDragEnd={(e) => setLocation(e.nativeEvent.coordinate)}
            title={"Test Marker"}
            // description={location.latitude.toString()}
          />
        </MapView>
      </View>
      <View
        style={{
          position: "absolute",
          bottom: 0,
          width: "90%",
          alignItems: "center",
          backgroundColor: "white",
          marginBottom: 32,
          paddingVertical: 24,
          borderRadius: 999999,
        }}
      >
        <Text>Choosen</Text>
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
