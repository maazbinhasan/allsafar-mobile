import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons"; // Import Material Icons

const ForgotPass = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({ email: "" });

  const handleContinue = () => {
    // Basic Email Validation
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setErrors({ email: "Please enter a valid email address." });
      return;
    }

    // If the email is valid, navigate to ForgotCode screen
    navigation.navigate("ForgotCode");
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
      <View className="flex-1 p-6 mt-24">
        {/* Logo Section */}
        <View className="items-center mb-8">
          <Image
            source={require("../../../assets/logo.png")}
            style={{ width: 250, height: 110 }} // Adjust the size as needed
          />
        </View>

        {/* Email Input Section */}
        <View style={{ marginTop: 30 }}>
          <Text className="text-[14px] font-semibold mb-2">Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            className={`border p-3 mb-2 rounded-lg ${errors.email ? "border-red-500" : "border-gray-200"}`}
            keyboardType="email-address"
          />
          {errors.email && <Text className="text-red-500 text-xs mb-2">{errors.email}</Text>}
        </View>

        {/* Cancel Button with Cross Icon centered */}
        <TouchableOpacity
          onPress={() => navigation.navigate("SignIn")}
          className="mt-[290px] flex-row items-center justify-center"
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
            <Text className="text-white font-semibold text-lg text-center">Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default ForgotPass;
