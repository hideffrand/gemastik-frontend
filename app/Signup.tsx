import React, { useState } from "react";
import { Text, TextInput } from "react-native";
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
          { marginBottom: 4, textAlign: "center", fontSize: 28 },
        ]}
      >
        Welcome!
      </Text>
      <Text
        style={[
          font.p,
          { marginBottom: 32, textAlign: "center", opacity: 0.5 },
        ]}
      >
        Welcome back! Ready to save the environment?
      </Text>
      <TextInput
        style={[
          font.p,
          {
            padding: 12,
            borderBottomWidth: 1,
            borderBottomColor: Color.primaryGray,
            width: "100%",
          },
        ]}
        placeholder="Name..."
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={[
          font.p,
          {
            padding: 12,
            borderBottomWidth: 1,
            borderBottomColor: Color.primaryGray,
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
          {
            padding: 12,
            borderBottomWidth: 1,
            borderBottomColor: Color.primaryGray,
            width: "100%",
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
          { marginVertical: 24, textAlign: "center", opacity: 0.5 },
        ]}
      >
        Already have an account?
      </Text>
      <Button onPress={() => router.replace("Login")} type="secondary">
        Login
      </Button>
    </ViewLayout>
  );
}
