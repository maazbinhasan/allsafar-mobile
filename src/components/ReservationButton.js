import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';

// Button Component
const ReservationButton = ({ onPress, title, style }) => {
  return (
    <View className='flex-1 p-0 w-full relative bottom-0 p-2'>
      <TouchableOpacity
        className={`bg-[#4DA5FC] py-2 px-4 rounded-[18px] mb-4 shadow-lg shadow-[#4DA5FC]/40 ${style}`}
        onPress={onPress}
        style={{ justifyContent: 'center', alignItems: 'center' }} // Ensure centering
      >
        <Text className="text-white text-lg font-bold bottom-0">{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ReservationButton;
