import React, { useState } from "react";
import { Text, TextInput, StyleSheet, Image, View } from "react-native";
import Button from "@/components/Button";
import ViewLayout from "@/components/ViewLayout";
import { font } from "@/styles/fonts";
import { Color } from "@/constants/Colors";
import { useAuth } from "@/contexts/AuthProvider";
import { router } from "expo-router";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function handleLogin() {
    try {
      await login(email, password);
    } catch (error) {
      console.error("Login error:", error);
      setError("Invalid email or password. Please try again.");
    }
  }

  return (
    <ViewLayout>
      <Text
        style={[
          font.h1,
          { marginBottom: 40, textAlign: "center", fontSize: 28 },
        ]}
      >
        Welcome back!
      </Text>
      <TextInput
        style={[font.p, styles.input]}
        placeholder="Email..."
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={[font.p, styles.input, { marginBottom: 24 }]}
        placeholder="Password..."
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {error && (
        <Text
          style={[
            font.p,
            {
              color: Color.primaryRed,
              paddingVertical: 8,
              textAlign: "center",
            },
          ]}
        >
          {error}
        </Text>
      )}
      <Button onPress={handleLogin} type="primary">
        Login
      </Button>
      <Text
        style={[
          font.p,
          { marginVertical: 16, textAlign: "center", opacity: 0.6 },
        ]}
      >
        Don't have an account?
      </Text>
      <Button onPress={() => router.replace("Signup")} type="ghost">
        Signup
      </Button>
    </ViewLayout>
  );
}

const styles = StyleSheet.create({
  input: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: Color.lightGray,
    width: "100%",
    fontSize: 18,
    fontWeight: "400",
  },
});
