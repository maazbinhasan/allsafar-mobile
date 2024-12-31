import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, Pressable, SafeAreaView } from "react-native";
import { Feather } from '@expo/vector-icons'; // For icons
import { useNavigation } from '@react-navigation/native'; // For navigation

export default function PaymentScreen() {
  const navigation = useNavigation(); 
  const [selectedPayment, setSelectedPayment] = useState("Full Payment");

  // Dynamic Data
  const paymentOptions = [
    { id: "Full Payment", label: "Full Payment" },
    { id: "Half Payment", label: "Half Payment" }
  ];

  const pendingAmount = 2000000;
  const amountText = `₦${pendingAmount.toLocaleString()}`;

  // Handle Pay Now button press to navigate to PaymentDetailsConfirmation
  const handlePayNow = () => {
    navigation.navigate("PaymentDetailsConfirmation");
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100 p-4 mt-6">
      <View className="flex-row items-center mb-11">
        <Pressable onPress={() => navigation.goBack()} className="mr-1">
          <Feather name="arrow-left" size={24} className="text-black" />
        </Pressable>
        <Text className="text-xl font-semibold">Payment Details</Text>
      </View>

      {/* Not Paid Banner */}
      <View className="bg-[#FCD400] rounded-lg py-4 items-left p-4 mb-4">
        <Text className="text-black ml-4 text-[16px] font-extrabold">Not Paid</Text>
      </View>

      {/* Card Image */}
      <View className="items-center mt-8 mb-12">
        <Image
          source={require('../../../assets/atm.png')} // Use require for local assets
          className="w-18 h-18 mr-4"
        />
      </View>

      {/* Pending Amount */}
      <View className="mb-4">
        <Text className="text-black font-extrabold text-lg">Pending Amount</Text>
        <Text className="text-[#FE8D26] text-xl font-extrabold">{amountText}</Text>
        <Text className="text-gray-500 text-sm mt-2">
          You can pay full or half, another half you can pay after trip completion.
        </Text>
      </View>

      {/* Payment Options */}
      <View className="space-y-4">
        {paymentOptions.map((option) => (
          <TouchableOpacity
            key={option.id}
            onPress={() => setSelectedPayment(option.id)}
            className={`flex-row items-center space-x-2 ${selectedPayment === option.id ? "" : "border-gray-300"}`}
          >
            <View
              className={`w-5 h-5 rounded-full border ${selectedPayment === option.id ? "border-[#1DC9A0]" : "border-gray-400"} flex items-center justify-center`}
            >
              {selectedPayment === option.id && <View className="w-3 h-3 rounded-full bg-[#1DC9A0]" />}
            </View>
            <Text className="text-black">{option.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Pay Now Button */}
      <View className="absolute bottom-0 left-0 right-0 p-4 bg-white shadow-lg">
        <TouchableOpacity
          onPress={handlePayNow} // Navigate to PaymentDetailsConfirmation when pressed
          className="bg-[#4CA6FE] py-2 mb-2 rounded-[20px]"
        >
          <Text className="text-white font-semibold text-lg text-center">Pay Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
