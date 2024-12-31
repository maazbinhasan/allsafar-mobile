import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const HomeHajj = () => {
  const navigation = useNavigation(); 

  return (
    
    <View className="bg-white shadow-md mb-8 rounded-[22px] overflow-hidden w-[92%]  mx-auto border-8 border-white">
      
      {/* Top - Image */}
      <Image
        source={require('../../assets/home/HomeHajj.png')} // Local image path
        className="w-full h-34 object-cover" // Adjust height to make it smaller
      />

      {/* Bottom - Text and Button in a row with bottom shadow and spacing */}
      <View className="flex-row justify-between items-center p-3">
        <Text className="text-lg font-semibold text-gray-800">Hajj</Text>
        <TouchableOpacity className="bg-orange-500 py-2 px-4 rounded-lg shadow-sm"
        onPress={() => navigation.navigate('HajjTrip')} // Navigate to UmrahTrip
        >
          <Text className="text-white text-center font-semibold">Register Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeHajj;
