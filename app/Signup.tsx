import React, { useState } from "react";
import { Text, TextInput, View, Image, StyleSheet } from "react-native";
import Button from "@/components/Button";
import ViewLayout from "@/components/ViewLayout";
import { font } from "@/styles/fonts";
import { Color } from "@/constants/Colors";
import { useAuth } from "@/contexts/AuthProvider";
import { router } from "expo-router";

export default function Signup() {
  const { signup } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function handleSignup() {
    if (!validateEmail(email)) {
      setError("Invalid email format");
      return;
    }

    try {
      await signup(name, email, password);
    } catch (error) {
      console.error("Signup error:", error);
      setError("Signup failed. Please try again.");
    }
  }

  function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  return (
    <ViewLayout>
      <Text
        style={[
          font.h1,
          { marginBottom: 24, textAlign: "center", fontSize: 28 },
        ]}
      >
        Welcome!
      </Text>
      <TextInput
        style={[font.p, styles.input]}
        placeholder="Name..."
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={[
          font.p,
          styles.input,
          {
            width: "100%",
          },
        ]}
        placeholder="Email..."
        value={email}
        onChangeText={setEmail}
      />
      {error && (
        <Text
          style={[
            font.p,
            { color: Color.primaryRed, paddingVertical: 2, paddingLeft: 4 },
          ]}
        >
          {error}
        </Text>
      )}
      <TextInput
        style={[
          font.p,
          styles.input,
          {
            marginBottom: 24,
          },
        ]}
        placeholder="Password..."
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button onPress={handleSignup} type="primary">
        Signup
      </Button>
      <Text
        style={[
          font.p,
          { marginVertical: 16, textAlign: "center", opacity: 0.5 },
        ]}
      >
        Already have an account?
      </Text>
      <Button onPress={() => router.replace("Login")} type="ghost">
        Login
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
