import React from 'react';
import { View, Text, Pressable, TouchableOpacity } from 'react-native';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from "expo-status-bar";

const Attachment = () => {
  const navigation = useNavigation();

  const items = [
    { label: 'Family Person 1', icon: 'folder', color: 'bg-blue-100', iconColor: '#3b82f6', screen: 'AttachmentIn' },  
    { label: 'Family Person 2', icon: 'folder', color: 'bg-orange-100', iconColor: '#f97316', screen: 'AttachmentIn' },  
   
  ];

  return (
    <View className="flex-1 p-2 pt-12">
      <StatusBar style="dark" backgroundColor="#ffffff" />

      {/* Header with Back Arrow and Title */}
      <View className="flex-row items-center mb-4">
        <Pressable onPress={() => navigation.goBack()} className="mr-4">
          <Feather name="arrow-left" size={24} className="text-black" />
        </Pressable>
        <Text className="text-xl font-semibold">Attachments</Text>
      </View>

      {/* Grid Items */}
      <View className="flex-wrap flex-row justify-between mt-4">
        {items.map((item, index) => (
          <Pressable
            key={index}
            onPress={() => item.screen && navigation.navigate(item.screen)} // Navigate only if a screen is defined
            className={`w-[45%] m-2 p-3 rounded-xl bg-white shadow-lg shadow-black/50 flex items-center`}
          >
            {/* Colored Box with Icon */}
            <View className={`w-full p-6 rounded-xl ${item.color} flex items-center justify-center mb-1`}>
              <FontAwesome name={item.icon} size={30} color={item.iconColor} />
            </View>

            {/* Title at the Bottom */}
            <Text className="text-center text-[14px] font-semibold text-[#495057]">{item.label}</Text>
          </Pressable>
        ))}
      </View>
                      {/*  Requests Button */}
                      <View className="absolute bottom-0 left-0 right-0 p-4 bg-white shadow-lg">
                      <TouchableOpacity
                        className="bg-[#4CA6FE] py-2 mb-2 rounded-[20px]"
                      >
                        <Text className="text-white  text-lg text-center">
                        Add New Folder  
                        </Text>
                      </TouchableOpacity>
                    </View>
    </View>
  );
};

export default Attachment;
