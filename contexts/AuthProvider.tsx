import { baseUrl } from "@/constants/config";
import {
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ILocation } from "./LocationSelectorProvider";
import { router } from "expo-router";

interface IAuthContext {
  user: IUser | null;
  userRole: string | null;
  login: (email: string, password: string) => void;
  logout: () => void;
  signup: (name: string, email: string, password: string) => void;
}

export interface IUser {
  id: any;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

const AuthContext = createContext<IAuthContext | null>(null);

export const useAuth = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) throw Error;
  return authContext;
};

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<IUser | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);

  async function getUserDataFromLocalStorage() {
    const user = await AsyncStorage.getItem("user");
    const userRole = await AsyncStorage.getItem("userRole");
    if (!user || !userRole) return;

    setUser(JSON.parse(user));
    setUserRole(userRole);
    return;
  }

  async function login(email: string, password: string) {
    console.log("login from ctx: ", email, password);
    try {
      const res = await fetch(`${baseUrl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password }),
      });
      if (!res.ok) throw Error;
      const data = await res.json();
      console.log(data);

      await AsyncStorage.setItem("user", JSON.stringify(data.user));
      await AsyncStorage.setItem("userRole", data.userRole);

      setUser(data.user);
      setUserRole(data.userRole);
      alert("Login success!");
      return;
    } catch (error) {
      alert("Failed to Login");
      return;
    }
  }

  async function signup(name: string, email: string, password: string) {
    try {
      const res = await fetch(`${baseUrl}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
          role: "user",
        }),
      });
      if (!res.ok) throw Error;
      const data = await res.json();
      console.log(data);

      await AsyncStorage.setItem("user", JSON.stringify(data.user));
      await AsyncStorage.setItem("userRole", data.userRole);

      setUser(data.user);
      setUserRole(data.userRole);
      alert("Signup success!");
      return;
    } catch (error) {
      alert("Failed to Signup");
      return;
    }
  }

  async function logout() {
    await AsyncStorage.removeItem("user");
    await AsyncStorage.removeItem("userRole");
    setUser(null);
    setUserRole(null);
    router.replace("AutOnboarding");
    alert("Logout success!");
    return;
  }

  useEffect(() => {
    getUserDataFromLocalStorage();
    if (!user) {
      router.replace("AuthOnboarding");
      return;
    }
    router.replace("(tabs)");
  }, []);

  useEffect(() => {
    if (!user || !userRole) {
      router.replace("AuthOnboarding");
      return;
    }
    router.replace("(tabs)");
  }, [user, userRole]);

  return (
    <AuthContext.Provider value={{ user, userRole, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
