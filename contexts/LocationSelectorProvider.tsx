import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import * as Location from "expo-location";

export interface ILocation {
  latitude: number;
  longitude: number;
}

interface ILocationSelectorContext {
  selectedLocation: ILocation;
  setSelectedLocation: React.Dispatch<
    React.SetStateAction<{
      latitude: number;
      longitude: number;
    }>
  >;
  changeSelectedLocation: () => void;
}

export const LocationSelectorContext = createContext<
  ILocationSelectorContext | undefined
>(undefined);

export const useLocationSelector = () => {
  const context = useContext(LocationSelectorContext);
  if (!context) {
    throw new Error(
      "useLocationSelector must be used within a LocationSelectorProvider"
    );
  }
  return context;
};

export default function LocationSelectorProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [selectedLocation, setSelectedLocation] = useState<ILocation>({
    latitude: 0,
    longitude: 0,
  });

  async function getInitialLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setSelectedLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
  }

  function changeSelectedLocation(data: ILocation) {
    setSelectedLocation(data);
  }
  useEffect(() => {
    getInitialLocation();
  }, []);

  return (
    <LocationSelectorContext.Provider
      value={{ selectedLocation, setSelectedLocation, changeSelectedLocation }}
    >
      {children}
    </LocationSelectorContext.Provider>
  );
}
