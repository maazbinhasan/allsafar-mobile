import React, { useState } from "react";
import { View, Text, TextInput, Alert, ScrollView, Image } from "react-native";
import Button from "../../../components/Button"; // Reusing Button component

const ForgotCode = ({ navigation }) => {
  const [verificationCode, setVerificationCode] = useState("");
  const [errors, setErrors] = useState({ verificationCode: "" });

  // Handles verification code submission
  const handleVerifyCode = () => {
    if (!verificationCode) {
      setErrors({ verificationCode: "Please enter the verification code." });
      return;

    }

   // If the email is valid, navigate to ResetPass screen
    navigation.navigate("ResetPass");
  };

  // Handles resending the verification code
  const handleResendCode = () => {
    Alert.alert("Resend Code", "A new verification code has been sent.");
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

        {/* Title and Instruction */}
        <View className="mt-8">
          <Text className="text-[18px] font-semibold text-[#4CA6FE] text-center mb-2">
            Enter Verification Code
          </Text>
          <Text className="text-[14px] text-center mb-4">
            We have sent a code to your Email.
          </Text>
        </View>

        {/* Verification Code Input */}
        <View className="mt-6">
          <TextInput
            value={verificationCode}
            onChangeText={setVerificationCode}
            placeholder="Enter verification code"
            keyboardType="numeric"
            className={`border p-3 rounded-2xl ${
              errors.verificationCode ? "border-red-500" : "border-[#4CA6FE]"
            }`}
          />
          {errors.verificationCode && (
            <Text className="text-red-500 text-xs mt-1">{errors.verificationCode}</Text>
          )}
        </View>

        {/* Verify Now Button */}
        <View className="mt-[260px]">
          <Button 
            title="Verify Now" 
            onPress={handleVerifyCode} 
            style="mb-2 py-2" 
          />
        </View>

        {/* Resend Code Section */}
        <View className="flex-row justify-center mt-2">
          <Text className="text-[12px]">Didn’t you receive any code? </Text>
          <Text 
            className="text-[#4CA6FE] text-sm font-semibold"
            onPress={handleResendCode}
          >
            Resend Code
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default ForgotCode;
