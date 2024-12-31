import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import Button from "../../components/Button"; // Reusing Button component
import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "../../utils/axiosInstance";
import axios from "axios";

const SignIn = ({ navigation }) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async () => {
    try {
      // Sending login request to backend
      const response = await axios.post("https://704e-2401-4900-1cb1-1d47-58f2-365e-a9c1-7811.ngrok-free.app/api/account/onlogin", {
        email,
        password,
      });

      console.log("API response:", response.data); // Log the response data

      // Check if the response is successful
      if (response.data.IsSuccess) {
        console.log("Login successful:", response.data.Message);
        const account = response.data.Data[0]; // Assuming the account data is returned here
        const Password = password;

        // Request token using the account data
        const tokenResponse = await axiosInstance.post("/account/GetToken", {
          ...account,
          Password,
        });
        console.log("Token response:", tokenResponse.data);

        const token = tokenResponse.data.Data.Token;
        const userId = account.ID; // Assuming the user ID is part of the account data

        if (token) {
          console.log("Token received:", token);
          console.log("User ID:", userId);

          // Store the token and user ID in AsyncStorage
          await AsyncStorage.setItem("authToken", token);
          await AsyncStorage.setItem("userId", userId.toString()); // Store user ID as a string

          const storedToken = await AsyncStorage.getItem("authToken");
const storedUserId = await AsyncStorage.getItem("userId");
console.log("Stored Token:", storedToken);
console.log("Stored User ID:", storedUserId);
          
          // Navigate to the home screen
          Alert.alert("Login Successful!", "Redirecting to the home screen...");
          navigation.navigate("Home");
        } else {
          Alert.alert("Login Failed", "No token received.");
        }
      } else {
        Alert.alert("Login Failed", response.data.Message || "Please check your credentials and try again.");
      }
    } catch (error) {
      console.error("Error during login:", error.response?.data || error.message);
      Alert.alert("Login Failed", error.message || "Please check your credentials and try again.");
    }
  };

  const handleGuestLogin = () => {
    // Navigate as guest (no authentication needed)
    console.log("Logged in as guest");
    navigation.navigate("Home");
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
      <View className="flex-1 p-6">
        <StatusBar style="dark" backgroundColor="#4CA6FE" />

        {/* Top Left Logo */}
        <View className="absolute top-6 left-6">
          <Image source={require("../../assets/logo.png")} className="w-32 h-32" resizeMode="contain" />
        </View>

        {/* Form Fields */}
        <View className="mt-28">
          {/* Email Input */}
          <Text className="text-[14px] font-semibold mb-2">Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            className={`border p-3 mb-2 rounded-lg ${errors.email ? "border-red-500" : "border-gray-200"}`}
            keyboardType="email-address"
          />
          {errors.email && <Text className="text-red-500 text-xs mb-2">{errors.email}</Text>}

          {/* Password Input */}
          <Text className="text-[14px] font-semibold mb-2">Password</Text>
          <View className="relative">
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              secureTextEntry={!isPasswordVisible}
              className={`border p-3 mb-2 rounded-lg ${errors.password ? "border-red-500" : "border-gray-200"}`}
            />
            <TouchableOpacity
              onPress={() => setPasswordVisible(!isPasswordVisible)}
              className="absolute right-4 top-1/4 transform -translate-y-1/2"
            >
              <Text className="text-gray-500">{isPasswordVisible ? "Hide" : "Show"}</Text>
            </TouchableOpacity>
          </View>
          {errors.password && <Text className="text-red-500 text-xs mb-2">{errors.password}</Text>}

          {/* Sign In Button */}
          <Button title="Sign In" onPress={handleSubmit} style="mb-4 py-2" />

          {/* Continue as Guest Button */}
          <TouchableOpacity onPress={handleGuestLogin} className="mb-4">
            <Text className="text-[#4CA6FE] text-sm text-center">Continue as Guest</Text>
          </TouchableOpacity>

          {/* Forgot Password Link */}
          <TouchableOpacity onPress={() => navigation.navigate("ForgotPass")}>
  <Text className="text-[#4CA6FE] text-sm text-right mb-4">Forgot Password?</Text>
</TouchableOpacity>


          {/* OR Separator */}
          <View className="flex-row items-center justify-center mb-4">
            <View className="flex-1 border-t border-gray-300"></View>
            <Text className="mx-4 text-gray-500">or</Text>
            <View className="flex-1 border-t border-gray-300"></View>
          </View>

          {/* Sign In with Google Button */}
          <TouchableOpacity
            className="bg-white border border-gray-200 py-3 px-24 rounded-lg mb-8"
            onPress={() => console.log("Sign in with Google")}
          >
            <Text className="text-gray-700 text-sm font-bold">Sign in with Google</Text>
          </TouchableOpacity>

          {/* Sign Up Link */}
          <View className="flex-row justify-center">
            <Text className="text-gray-600 mr-1">Don't have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
              <Text className="text-[#4CA6FE]">Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignIn;
