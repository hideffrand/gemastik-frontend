import DriverSearch from "@/components/tabs-components/DriverSearch";
import MyItems from "@/app/MyItems";
import UserExplore from "@/components/tabs-components/UserExplore";
import { useAuth } from "@/contexts/AuthProvider";
import { Text } from "react-native";

export default function explore() {
  const { userRole } = useAuth();
  return userRole != "driver" ? <UserExplore /> : <DriverSearch />;
}
