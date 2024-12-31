import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, Image, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const FamilyMember = () => {
  const navigation = useNavigation(); // Hook for navigation

  const [keyboardVisible, setKeyboardVisible] = useState(false);

  // Listen for keyboard visibility changes
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    // Clean up the listeners when the component unmounts
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  // Sample family member data
  const familyMembers = [
    {
      name: "Family Member 1",
      relation: "Brother",
      imageUrl: "https://via.placeholder.com/50",
    },
    {
      name: "Family Member 2",
      relation: "Sister",
      imageUrl: "https://via.placeholder.com/50",
    },
    {
      name: "Family Member 3",
      relation: "Mother",
      imageUrl: "https://via.placeholder.com/50",
    },
    {
      name: "Family Member 4",
      relation: "Father",
      imageUrl: "https://via.placeholder.com/50",
    },
    {
      name: "Family Member 5",
      relation: "Cousin",
      imageUrl: "https://via.placeholder.com/50",
    },
    {
      name: "Family Member 6",
      relation: "Uncle",
      imageUrl: "https://via.placeholder.com/50",
    },
  ];

  // Navigate to a new screen on box click
  const handleFamilyMemberClick = (memberName) => {
    // You can navigate to a detailed view or handle other logic here
    console.log(`${memberName} clicked`);
    // navigation.navigate('FamilyMemberDetails', { name: memberName });
  };

  // Navigate to AddNewMember screen
  const handleAddNewMember = () => {
    navigation.navigate('AddNewMember');
  };

  return (
    <SafeAreaView className="flex-1 bg-[#f3f3f3]">
      {/* Header with Back Button and Title */}
      <View className="flex-row items-center mt-3 justify-between p-4">
        {/* Back Button */}
        <TouchableOpacity className="left-1" onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={30} color="#000000" />
        </TouchableOpacity>

        {/* Family Members Title */}
        <Text className="text-2xl font-bold text-center flex-1">Family Members</Text>

        {/* Empty View for alignment */}
        <View className="w-10" />
      </View>

      {/* Family Members Boxes Section */}
      <ScrollView className="flex-1 p-5 mt-4">
        {/* Render family members dynamically */}
        {familyMembers.map((member, index) => (
          <TouchableOpacity 
            key={index} 
            onPress={() => handleFamilyMemberClick(member.name)} 
            className="mb-4 border border-[#dcdcdc90] rounded-xl overflow-hidden"
          >
            {/* Box for a Family Member */}
            <View className="flex-row items-center p-4">
              {/* Image on the left */}
              <Image 
                source={{uri: member.imageUrl}}
                style={{ width: 50, height: 50, borderRadius: 25 }}
              />
              
              {/* Family Member Info on the right */}
              <View className="ml-4 flex-1">
                <Text className="text-lg font-semibold">{member.name}</Text>
                <Text className="text-gray-500">{member.relation}</Text>
              </View>

              {/* Right Arrow Icon */}
              <Icon name="arrow-forward" size={24} color="#000" />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      {/* Add New Member Button */}
      {!keyboardVisible && (
        <View className="absolute bottom-0 left-0 w-full p-4 bg-white shadow-lg">
          <TouchableOpacity onPress={handleAddNewMember} className="bg-[#4CA6FE] py-2 mb-2 rounded-[20px]">
            <Text className="text-white font-semibold text-lg text-center">Add new Member</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default FamilyMember;
