import React, { useState } from "react";
import { View, Text, Pressable, SafeAreaView } from "react-native";
import { Feather } from '@expo/vector-icons'; // For the back icon
import { useNavigation } from '@react-navigation/native'; // For navigation

export default function PaymentDetailsConfirmation() {
  const navigation = useNavigation();
  const pendingAmount = 2000000;
  const amountText = `₦${pendingAmount.toLocaleString()}`;

  // Handle trip navigation
  const handleTrip = () => {
    navigation.navigate("MyTripsHajj"); // Navigate to MyTripsHajj.js
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100 p-4 mt-6">
      {/* Back Button and Header */}
      <View className="flex-row items-center mb-11">
        <Pressable onPress={() => navigation.goBack()} className="mr-1">
          <Feather name="arrow-left" size={24} className="text-black" />
        </Pressable>
        <Text className="text-xl font-semibold">Payment Details</Text>
      </View>

      {/* Paid Banner */}
      <View className="bg-[#1DC9A0] rounded-lg py-4 items-left p-4 mb-8">
        <Text className="text-black ml-4 text-[16px] font-extrabold">Paid</Text>
      </View>

      {/* Full Amount Paid */}
      <View className="mb-6">
        <Text className="text-black font-extrabold mb-2 text-lg">Full Amount Paid</Text>
        <Text className="text-[#FE8D26] text-xl font-extrabold">{amountText}</Text>
      </View>

      {/* Go Back Button - Centered */}
      <View className="flex justify-center items-center mt-6">
        <Pressable 
          onPress={handleTrip} // Navigate to MyTripsHajj.js when pressed
          className="flex-row items-center">
          <Feather name="arrow-left" size={24} className="text-[#1DC9A0]" />
          <Text className="ml-2 text-[#000000] text-lg font-bold">Go Back</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
