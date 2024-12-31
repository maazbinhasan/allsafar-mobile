import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeUmrah = () => {
  const navigation = useNavigation(); // Hook to access navigation

  return (
    <View className="bg-white shadow-md rounded-[22px] overflow-hidden mb-4 mt-2 w-[92%] mx-auto border-8 border-white">
      {/* Top - Image */}
      <Image
        source={require('../../assets/home/HomeUmrah.png')} // Local image path
        className="w-full h-34 object-cover" // Adjust height to make it smaller
      />

      {/* Bottom - Text and Button in a row with bottom shadow and spacing */}
      <View className="flex-row justify-between items-center p-3">
        <Text className="text-lg font-semibold text-gray-800">Umrah</Text>
        <TouchableOpacity
          className="bg-orange-500 py-2 px-4 rounded-lg shadow-sm"
          onPress={() => navigation.navigate('UmrahTrip')} // Navigate to UmrahTrip
        >
          <Text className="text-white text-center font-semibold">Register Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeUmrah;
