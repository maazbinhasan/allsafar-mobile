import React from "react";
import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SvgXml } from "react-native-svg"; // Ensure this package is installed: `npm install react-native-svg`
import Icon from "react-native-vector-icons/MaterialIcons"; // Ensure this package is installed: `npm install react-native-vector-icons`

const RequestedSubmitted = () => {
  const navigation = useNavigation();

  const svgIcon = `
    <svg width="110" height="110" viewBox="0 0 110 110" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M68.4618 1.66538C71.4065 2.40954 73.1903 5.39995 72.4461 8.34465C71.702 11.2894 68.7115 13.0732 65.7668 12.3291C60.3004 10.9476 54.5933 10.6301 48.8785 11.4333C24.8168 14.8149 8.05226 37.0622 11.4339 61.1239C14.8156 85.1856 37.0628 101.95 61.1245 98.5684C85.1862 95.1868 101.951 72.9395 98.5689 48.8778C98.1819 46.1241 97.5451 43.4417 96.6694 40.8521C95.6965 37.9749 97.2405 34.8537 100.118 33.8808C102.995 32.9078 106.116 34.4516 107.089 37.3288C108.184 40.5656 108.979 43.9151 109.461 47.3471C113.688 77.4242 92.7324 105.233 62.6552 109.46C32.5781 113.687 4.76912 92.7318 0.54205 62.6546C-3.68501 32.5775 17.2706 4.76846 47.3478 0.541399C54.4786 -0.460781 61.6207 -0.0634315 68.4618 1.66538ZM90.8279 11.7888C93.2463 13.2399 94.1472 16.2563 93.0124 18.7651L92.714 19.334L59.7172 74.3287C58.1512 76.9387 54.7988 77.7489 52.2377 76.2545L51.7018 75.8988L29.7039 59.4004C27.2741 57.5781 26.7818 54.131 28.6041 51.7012C30.2863 49.4583 33.3527 48.8662 35.7257 50.2217L36.3034 50.6013L53.4177 63.437L83.2826 13.6751C84.8453 11.0707 88.2235 10.2262 90.8279 11.7888Z" fill="#FE8D26"/>
</svg>

  `;

  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-white">
      <View className="items-center mb-8">
        {/* SVG Icon */}
        <SvgXml xml={svgIcon} width={120} height={120} />

        {/* Heading */}
        <Text className="text-2xl text-center font-bold text-black-500 mt-6">
          Request Submitted{'\n'}Successfully
        </Text>

        {/* Subtext */}
        <Text className="text-base text-gray-600 mt-2 text-center px-6">
          Thank you for your submission, Agents will be assigned shortly.
        </Text>
      </View>

      {/* Button to navigate back to home */}
      <TouchableOpacity
        onPress={() => navigation.navigate("Home")} // Change 'Home' to the desired screen name
        className="bg-[#4DA5FC] py-3 px-8 rounded-full flex-row items-center justify-center w-[280px] shadow-lg"
      >
        {/* Left Arrow Icon */}
        <Icon name="arrow-back" size={24} color="#FFF" style={{ marginRight: 12 }} />
        <Text className="text-white text-lg font-bold">Back to Home</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default RequestedSubmitted;
