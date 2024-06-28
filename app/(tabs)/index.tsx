import React, { useEffect } from "react";
import DriverIndex from "@/components/tabs-components/DriverIndex";
import UserIndex from "@/components/tabs-components/UserIndex";
import AdminIndex from "@/components/tabs-components/AdminIndex";
import { useAuth } from "@/contexts/AuthProvider";
import { router } from "expo-router";

export default function Index() {
  const { userRole } = useAuth();

  // useEffect(() => {
  //   setTimeout(() => {
  //     if (!userRole) router.replace("AuthOnboarding");
  //   }, 400);
  // }, [userRole]);

  if (userRole === "driver") {
    return <DriverIndex />;
  }
  if (userRole === "admin") {
    return <AdminIndex />;
  }
  if (userRole === "user") {
    return <UserIndex />;
  }

  return <UserIndex />;
}
