import React from 'react';
import { View, Text, Image, TouchableOpacity} from 'react-native';
import { useNavigation } from "@react-navigation/native";

const UmrahTrip = () => {
  const navigation = useNavigation();
  return (
    <View className="bg-white shadow-md mb-8 mt-4 rounded-[25px] overflow-hidden w-[85%] mx-auto border border-gray-200">
      {/* Image Section */}
      <View className="relative -mx-4 h-52 rounded-[25px] overflow-hidden">
        <Image
          source={require('../../assets/trip/umrahTrip.png')} 
          className="w-full h-full object-cover rounded-[25px]"
        />

        {/* Overlay Box */}
        <View className="absolute top-[75px] left-[28px]  bg-white/90 rounded-[20px] p-4 shadow-md flex-row items-center justify-between w-[85%]">
          {/* Left Content */}
          <View>
            <Text className="text-base font-bold text-black">Umrah</Text>
            <Text className="text-gray-500 text-xs">South Africa - Jeddah</Text>
            <Text className="text-gray-500 text-xs">18 Apr 2024 - 30 Apr 2024</Text>
            
            {/* Payment Status */}
            <View className="flex-row items-center mt-1">
              <Text className="text-black font-semibold text-sm">Payment Status: </Text>
              <Text className="text-green-600 font-semibold text-sm">Completed</Text>
            </View>
          </View>

          {/* Circular Progress */}
          <View className="items-center ml-2">
            <View className="w-10 h-10 rounded-full border-4 border-yellow-400 flex items-center justify-center bg-white">
              <Text className="text-xs font-semibold text-black">40%</Text>
            </View>
            <Text className="text-xs text-black mt-1 font-semibold">Status</Text>
          </View>
          <TouchableOpacity
        onPress={() => navigation.navigate('MyUmrahTrip')} // Navigate to Signup screen
        className="absolute top-0 left-0 right-0 bottom-0"
      />
        </View>
      </View>
    </View>
  );
};

export default UmrahTrip;
