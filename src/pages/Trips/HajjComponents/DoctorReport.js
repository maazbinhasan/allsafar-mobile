import React from 'react';
import { View, Text, Pressable, ScrollView, SafeAreaView, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import ButtonBottom from "../../../components/ButtonBottom";



const DoctorTrip = () => {
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
    <Text className="font-bold text-lg">Name</Text>
    <Text className="text-sm text-gray-500">Abdul Rahaman Umri</Text>
  </View>

  
  {/* Address */}
  <View className="mb-4 border-b pb-2 -mx-4 px-4">
    <Text className="font-bold text-lg">Address</Text>
    <Text className="text-sm text-gray-500">Lorem Ipsum, Nigeria</Text>
  </View>
  {/* Doctor License No */}
  <View className="mb-4 border-b pb-2 -mx-4 px-4">
    <Text className="font-bold text-lg">Doctor License No</Text>
    <Text className="text-sm text-gray-500">0101010100</Text>
  </View>
  {/* Hospital */}
  <View className="mb-4 border-b pb-2 -mx-4 px-4">
    <Text className="font-bold text-lg">Hospital</Text>
    <Text className="text-sm text-gray-500">Hospital Name Lorem</Text>
  </View>
  {/* Pilgrim Medical Record */}
  <View className="mb-4 border-b pb-2 -mx-4 px-4">
    <Text className="font-bold text-lg">Pilgrim Medical Record</Text>
    <Text className="text-sm text-gray-500">Lorem Ipsum IO</Text>
  </View>
  {/* Name of Pilgrim */}
  <View className="mb-4 border-b pb-2 -mx-4 px-4">
    <Text className="font-bold text-lg">Name of Pilgrim</Text>
    <Text className="text-sm text-gray-500">Hajj</Text>
  </View>
{/* Height and Weight */}
<View className="mb-4 border-b pb-2 -mx-4 px-4 flex-row justify-between">
  <View className="pr-4">
    <Text className="font-bold text-lg">Height</Text>
    <Text className="text-sm text-gray-500">6.1 ft</Text>
  </View>
  <View className="pl-4 border-l mx-16">
    <Text className="font-bold text-lg">Weight</Text>
    <Text className="text-sm text-gray-500">90 kg</Text>
  </View>
</View>

{/* Pulse / Min */}
<View className="mb-4 border-b pb-2 -mx-4 px-4 flex-row justify-between">
  <View className="pr-4">
    <Text className="font-bold text-lg">Pulse / Min</Text>
    <Text className="text-sm text-gray-500">50</Text>
  </View>
  <View className="pl-4 border-l mx-18">
    <Text className="font-bold text-lg">Blood Pressure</Text>
    <Text className="text-sm text-gray-500">50 Hg</Text>
  </View>
</View>

  {/* Blood Group */}
  <View className="mb-4 border-b pb-2 -mx-4 px-4">
    <Text className="font-bold text-lg">Blood Group</Text>
    <Text className="text-sm text-gray-500">O Positive</Text>
  </View>
  {/* Fasting Blood Sugar */}
  <View className="mb-4 border-b pb-2 -mx-4 px-4">
    <Text className="font-bold text-lg">Fasting Blood Sugar</Text>
    <Text className="text-sm text-gray-500">is simply dummy text of the printing</Text>
  </View>
  {/* Disability */}
<View className="mb-4 border-b pb-2 -mx-4 px-4 flex-row justify-between">
  <View>
    <Text className="font-bold text-lg">Disability</Text>
    <Text className="text-sm text-gray-500">No</Text>
  </View>
  <View className="pl-4 border-l mx-14">
    <Text className="font-bold text-lg">Type</Text>
    <Text className="text-sm text-gray-500">No</Text>
  </View>
</View>

{/* Allergy */}
<View className="mb-4 border-b pb-2 -mx-4 px-4 flex-row justify-between">
  <View>
    <Text className="font-bold text-lg">Allergy</Text>
    <Text className="text-sm text-gray-500">No</Text>
  </View>
  <View className="pl-4 border-l mx-14">
    <Text className="font-bold text-lg">Type</Text>
    <Text className="text-sm text-gray-500">No</Text>
  </View>
</View>

  {/* Pregnancy Test */}
  <View className="mb-4 border-b pb-2 -mx-4 px-4">
    <Text className="font-bold text-lg">Pregnancy Test</Text>
    <Text className="text-sm text-gray-500">+VE</Text>
  </View>



  {/* Diagnosis */}
  <View className="mb-4 border-b pb-2 -mx-4 px-4">
    <Text className="font-bold text-lg">Diagnosis</Text>
    <Text className="text-sm text-gray-500">is simply dummy text of the printing</Text>
  </View>
  
  {/* Treatment / Medication */}
  <View className="mb-4 border-b pb-2 -mx-4 px-4">
    <Text className="font-bold text-lg">Treatment / Medication</Text>
    <Text className="text-sm text-gray-500">is simply dummy text of the printing</Text>
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

export default DoctorTrip;
