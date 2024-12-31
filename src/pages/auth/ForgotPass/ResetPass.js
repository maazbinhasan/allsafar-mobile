import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons"; // Import Icon library

const ResetPassword = ({ navigation }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({ newPassword: "", confirmPassword: "" });

  const handleContinue = () => {
    // Password validation logic
    if (!newPassword || !confirmPassword) {
      setErrors({
        newPassword: !newPassword ? "Please enter a new password." : "",
        confirmPassword: !confirmPassword
          ? "Please confirm your password."
          : "",
      });
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrors({
        newPassword: "Passwords do not match.",
        confirmPassword: "Passwords do not match.",
      });
      return;
    }

    // Success scenario
    Alert.alert("Success", "Your password has been reset successfully.");
    navigation.navigate("SignIn");
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      <View className="flex-1 p-6 mt-28">
        {/* Logo Section */}
        <View className="items-center mb-2">
          <Image
            source={require("../../../assets/logo.png")}
            style={{ width: 200, height: 80 }}
          />
        </View>

        {/* Title and Sub Title */}
        <View className="mt-8">
          <Text className="text-[18px] font-semibold text-[#4CA6FE] text-center mb-2">
            Reset Your Password
          </Text>
          <Text className="text-[14px] text-center mb-4 text-gray-500">
            The Password Must be Different than Before
          </Text>
        </View>

        {/* New Password Input */}
        <View className="mt-6">
          <TextInput
            value={newPassword}
            onChangeText={setNewPassword}
            placeholder="New Password"
            secureTextEntry
            className={`border p-3 rounded-2xl ${
              errors.newPassword ? "border-red-500" : "border-[#4CA6FE]"
            }`}
          />
          {errors.newPassword && (
            <Text className="text-red-500 text-xs mt-1">{errors.newPassword}</Text>
          )}
        </View>

        {/* Confirm Password Input */}
        <View className="mt-4">
          <TextInput
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirm Password"
            secureTextEntry
            className={`border p-3 rounded-2xl ${
              errors.confirmPassword ? "border-red-500" : "border-[#4CA6FE]"
            }`}
          />
          {errors.confirmPassword && (
            <Text className="text-red-500 text-xs mt-1">
              {errors.confirmPassword}
            </Text>
          )}
        </View>

        {/* Cancel Button */}
        <TouchableOpacity
          onPress={() => navigation.navigate("SignIn")}
          className="mt-[199px] flex-row items-center justify-center"
        >
          <Icon name="close" size={24} color="red" />
          <Text className="text-red-500 text-sm ml-2">Cancel</Text>
        </TouchableOpacity>

        {/* Continue Button */}
        <View className="absolute bottom-0 left-0 right-0 p-4 bg-white shadow-lg">
          <TouchableOpacity
            onPress={handleContinue}
            className="bg-[#4CA6FE] py-2 mb-2 rounded-[20px]"
          >
            <Text className="text-white font-semibold text-lg text-center">
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default ResetPassword;
