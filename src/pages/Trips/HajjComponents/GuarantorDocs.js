import React from 'react';
import { View, Text, Pressable, ScrollView, SafeAreaView, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import ButtonBottom from "../../../components/ButtonBottom";



const GuarantorDocs = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 bg-white mt-4">
      <ScrollView className="p-4">
        {/* Header with Go Back Button and Title */}
        <View className="flex-row items-center mb-4">
          <Pressable onPress={() => navigation.goBack()} className="mr-2">
            <Feather name="arrow-left" size={24} color="black" />
          </Pressable>
          <Text className="text-xl font-semibold flex-1 text-center">
            Doctor Report
          </Text>
        </View>

        {/* Family Navigation */}
        <View className="mb-6">
          {/* Family Navigation with Arrows */}
          <View className="flex-row justify-center items-center mb-2">
            {/* Left Arrow */}
            <Pressable>
              <Feather name="chevron-left" size={20} color="#FE8D26" />
            </Pressable>

            {/* Family Members */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 8 }}
            >
              <Text
                className="mx-2 px-2 py-1 text-[16px]"
                style={{
                  color: '#4CA6FE',
                  borderBottomWidth: 2,
                  borderBottomColor: '#4CA6FE',
                }}
              >
                Family Member 1
              </Text>
              <Text className="mx-2 px-2 py-1 text-[16px] text-gray-700">
                Family Member 2
              </Text>
              <Text className="mx-2 px-2 py-1 text-[16px] text-gray-700">
                Family Member 3
              </Text>
            </ScrollView>

            {/* Right Arrow */}
            <Pressable>
              <Feather name="chevron-right" size={20} color="#FE8D26" />
            </Pressable>
          </View>

          {/* Line under Family Navigation */}
          <View className="border-b border-gray-400" />
        </View>

{/* Form Container */}
<View className="border p-4 bg-gray-100">
  {/* Name */}
  <View className="mb-4 border-b pb-2 -mx-4 px-4">
  <Image
        source={{ uri: 'https://static.vecteezy.com/system/resources/thumbnails/001/840/612/small_2x/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg' }} // URL or local file path
        className="w-40 h-40 mb-6" 
      />
    <Text className="font-bold text-lg">Name</Text>
    <Text className="text-sm text-gray-500">Abdul Rahaman Umri</Text>
  </View>

  
  {/* Address */}
  <View className="mb-4 border-b pb-2 -mx-4 px-4">
    <Text className="font-bold text-lg">Address</Text>
    <Text className="text-sm text-gray-500">Lorem Ipsum, Nigeria</Text>
  </View>

  {/* Relationship */}
  <View className="mb-4 border-b pb-2 -mx-4 px-4">
    <Text className="font-bold text-lg">Relationship</Text>
    <Text className="text-sm text-gray-500">Lorem Ipsum, Nigeria</Text>
  </View>

  {/* Occupation */}
  <View className="mb-4 border-b pb-2 -mx-4 px-4">
    <Text className="font-bold text-lg">Occupation</Text>
    <Text className="text-sm text-gray-500">occupation lorem</Text>
  </View>

  {/*Rank */}
  <View className="mb-4 border-b pb-2 -mx-4 px-4">
    <Text className="font-bold text-lg">Rank</Text>
    <Text className="text-sm text-gray-500">Lorem Ipsum rank</Text>
  </View>

  {/* Phone Number */}
  <View className="mb-4 border-b pb-2 -mx-4 px-4">
    <Text className="font-bold text-lg">Phone Number</Text>
    <Text className="text-sm text-gray-500">phone number</Text>
  </View>

{/*NIN */}
<View className="mb-4 border-b pb-2 -mx-4 px-4">
  <View className="pr-4">
    <Text className="font-bold text-lg">NIN</Text>
    <Text className="text-sm text-gray-500">Lorem Ipsum NIN</Text>
  </View>
</View>


{/*Images*/}
<View>
<Image
        source={{ uri: 'https://i.ibb.co/1s3h2fb/SignDoc.png' }} // URL or local file path
        className="w-full h-28 " 
      />
  </View>
</View>
{/* Download as pdf Button */}
<ButtonBottom
title="Download PDF"
        style="px-28 py-2 mt-10 mb-10 "
          />
      </ScrollView>
    </SafeAreaView>
  );
};

export default GuarantorDocs;
