import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Pressable, Keyboard, SafeAreaView } from 'react-native';
import { Feather } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';

const TravelCard = ({ id, city, people }) => {
  const navigation = useNavigation(); 
  return (
    <TouchableOpacity
      className="flex-row items-center p-2 mb-1 bg-gray-100 rounded-lg mt-4 shadow-xl border border-gray-300" 
    >
      <Image
        source={require('../../../assets/pp.png')} 
        className=" w-9 h-12 mr-4"
      />
      <View className="flex-1">
        <Text className="font-bold text-[14px]">{`#${id}`}</Text>
        <View className="flex-row items-center">
          <Feather name="map-pin" size={14} color="#4CA6FE" /> 
          <Text className="text-[#4CA6FE] ml-1 text-[12px]">{city}</Text> 
        </View>
        <Text className="text-gray-400 text-sm">{people}</Text>
      </View>
      <Feather name="arrow-right" size={24} color="#4CA6FE" />
    </TouchableOpacity>
  );
};

const VisaDetails = () => {
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const data = [
    { id: "156854TY", city: "Jeddah", people: "4 Adults, 2 Kids" },
    { id: "156854TY", city: "Makkah", people: "3 Adults, 1 Kid" },
    { id: "156854TY", city: "Riyadh", people: "5 Adults, 1 Kid" },
    { id: "156854TY", city: "Dubai", people: "2 Adults, 3 Kids" },
    { id: "156854TY", city: "Medina", people: "6 Adults, 2 Kids" },
  ];

  const navigation = useNavigation(); 

  return (
    <SafeAreaView className="flex-1 bg-gray-100"> 
      <View className="p-4 bg-gray-100"> 
        <View className="flex-row items-center mt-6 mb-4">
          <Pressable onPress={() => navigation.goBack()} className="mr-1">
            <Feather name="arrow-left" size={24} className="text-black" />
          </Pressable>
          <Text className="text-xl font-semibold">Visa Details</Text>
        </View>

        {data.map((item, index) => (
          <TravelCard
            key={index}
            id={item.id} 
            city={item.city} 
            people={item.people} 
          />
        ))}
      </View>

      {!keyboardVisible && (
        <View className="absolute bottom-0 left-0 w-full p-4 bg-white shadow-lg"> 
          <TouchableOpacity onPress={() => console.log('Details Saved')} className="bg-[#4CA6FE] py-2 mb-2 rounded-[20px]">
            <Text className="text-white font-semibold text-lg text-center">Save</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default VisaDetails;
