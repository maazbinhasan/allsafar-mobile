import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Banner = () => {
  const navigation = useNavigation(); // Hook to access the navigation object

  // Function to handle banner click
  const handleBannerPress = () => {
    navigation.navigate('CreatePackage'); // Navigate to 'CreatePackage' screen
  };

  return (
    <View className="shadow-md mb-2 rounded-[22px] overflow-hidden w-[92%] mx-auto">
      {/* Top - Image with overlay */}
      <TouchableOpacity onPress={handleBannerPress}> 
        <View className="relative w-full h-[180px]">
          <Image
            source={require('../../assets/home/hajj.png')} // Local image path "https://i.ibb.co/fqq782L/hajjTrip.png"
            style={{ width: '100%', height: 180, resizeMode: 'cover' }} // Adjust height and use resizeMode
          />
          <View className="absolute inset-0 bg-black/30 flex justify-center items-start px-4 py-12">
            <View className="w-full flex justify-center h-full">
              <Text className="text-xl font-bold text-white mb-2">Book Now!</Text>
              <Text className="text-sm text-white">Lorem Ipsum is simply dummy text of the printing and typesetting industry</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>

      {/* Dots at the bottom of the image */}
      {/* <View className="absolute bottom-4 left-0 right-0 flex-row justify-center items-center">
        <View className="w-2 h-2 mx-1 rounded-full bg-white" />
        <View className="w-3 h-3 mx-1 rounded-full bg-orange-500" /> 
        <View className="w-2 h-2 mx-1 rounded-full bg-white" />
      </View> */}
    </View>
  );
};

export default Banner;
