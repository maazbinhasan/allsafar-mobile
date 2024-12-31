import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { View } from 'react-native-reanimated/lib/typescript/Animated';

const BottomButton = ({ onPress, title, style }) => {
  return (
    <View className='flex-1 bg-slate-100'>
    <TouchableOpacity
      className={`bg-[#4DA5FC] py-3 px-6 rounded-[18px] mb-4 shadow-lg shadow-[#4DA5FC]/40 ${style}`}
      onPress={onPress}
      style={{ justifyContent: 'center', alignItems: 'center' }} // Ensure centering
    >
      <Text className="text-white text-lg font-bold">{title}</Text>
    </TouchableOpacity>
    </View>
  );
};

export default BottomButton;
