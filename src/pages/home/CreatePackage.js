import React from 'react';
import { View, Text, Pressable, SafeAreaView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import HomeUmrah from './homeUmrah';
import HomeHajj from './homeHajj';

const CreatePackage = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="p-2 bg-gray-100">
        <View className="flex-row items-center mt-6 mb-4">
          <Pressable onPress={() => navigation.goBack()} className="mr-1">
            <Feather name="arrow-left" size={24} className="text-black" />
          </Pressable>
          <Text className="text-xl font-semibold">Create a Package</Text>
        </View>
        
        <View className="mt-4">
          <HomeUmrah />
          <HomeHajj />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CreatePackage;