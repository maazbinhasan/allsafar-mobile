import React, { useEffect } from "react";
import { View, Text, Image, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Button from "../components/Button";
import { StatusBar } from "expo-status-bar";

const Welcome = ({ navigation }) => {
  useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        console.log("Stored Token on App Reload:", token);
        
        if (token) {
          // Redirect to Home if token exists
          navigation.replace("Home");
        }
      } catch (error) {
        console.error("Error checking login status:", error);
        Alert.alert("Error", "Failed to check login status. Please try again.");
      }
    };

    checkUserLoggedIn();
  }, [navigation]); // Runs once on component mount

  return (
    <View className="flex-1 items-center justify-center">
      <StatusBar style="dark" backgroundColor="#4CA6FE" />

      {/* Top Image */}
      <Image
        source={require("../assets/welcome/welcomeTop.png")}
        className="w-84 h-100 mt-[-35]"
        resizeMode="contain"
      />

      {/* Logo */}
      <Image
        source={require("../assets/logo.png")}
        className="mt-[-13] w-42 mb-3"
        resizeMode="contain"
      />

      {/* App Title */}
      <Text className="text-4xl font-normal text-[#071A2C] mb-3 text-center">
        Journey of a{"\n"}Lifetime
      </Text>

      {/* Subtitle */}
      <Text className="text-[16px] text-gray-600 text-center px-6 mb-3">
        This season rejuvenate your {"\n"}religious spirit with AllSafar
      </Text>

      {/* Get Started Button */}
      <Button
        title="Get Started"
        style="px-28 py-2"
        onPress={async () => {
          try {
            const token = await AsyncStorage.getItem("token");
            if (token) {
              console.log("Navigating to Home.");
              navigation.replace("Home");
            } else {
              console.log("Navigating to Signup.");
              navigation.navigate("Signup");
            }
          } catch (error) {
            console.error("Error checking login status:", error);
            Alert.alert("Error", "Failed to check login status. Please try again.");
          }
        }}
      />
    </View>
  );
};

export default Welcome;
