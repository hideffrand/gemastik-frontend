import React, { useState } from "react";
import { Text, TextInput, StyleSheet } from "react-native";
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
          { marginBottom: 4, textAlign: "center", fontSize: 28 },
        ]}
      >
        Welcome back!
      </Text>
      <Text
        style={[
          font.p,
          { marginBottom: 32, textAlign: "center", opacity: 0.5 },
        ]}
      >
        Ready to save the environment?
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
        style={[font.p, styles.input]}
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
          { marginVertical: 24, textAlign: "center", opacity: 0.5 },
        ]}
      >
        Don't have an account?
      </Text>
      <Button onPress={() => router.replace("Signup")} type="secondary">
        Signup
      </Button>
    </ViewLayout>
  );
}

const styles = StyleSheet.create({
  input: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: Color.primaryGray,
    width: "100%",
    marginBottom: 24,
  },
});
