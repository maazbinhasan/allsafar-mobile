import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, SafeAreaView, ScrollView, Keyboard, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import * as DocumentPicker from 'expo-document-picker'; // Import the Document Picker from Expo

const AddNewMember = () => {
  const navigation = useNavigation();

  const [selectedRelation, setSelectedRelation] = useState('');
  const [visaFile, setVisaFile] = useState(null); // Store the visa file
  const [profilePic, setProfilePic] = useState(null); // Store the profile picture file
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  // Function to handle radio button selection
  const handleRelationChange = (relation) => {
    setSelectedRelation(relation);
  };

  // Function to handle file selection (for both visa and profile pic)
  const handleFileSelection = async (type) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*", // Accept all file types
      });

      if (result.type === 'success') {
        if (type === 'Visa') {
          setVisaFile(result); // Store visa file
        } else if (type === 'Profile Pic') {
          setProfilePic(result); // Store profile picture
        }
      }
    } catch (err) {
      console.log('Document picker error: ', err);
    }
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      () => {
        setIsKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        setIsKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-[#f3f3f3]">
      {/* Header with Back Button and Title */}
      <View className="flex-row items-center mt-3 justify-between p-4">
        {/* Back Button */}
        <TouchableOpacity onPress={() => navigation.goBack()} className="left-1">
          <Icon name="arrow-back" size={30} color="#000000" />
        </TouchableOpacity>

        {/* Title */}
        <Text className="text-2xl font-bold text-center flex-1">Add New Member</Text>

        {/* Empty View for alignment */}
        <View className="w-10" />
      </View>

      {/* Form Fields */}
      <ScrollView className="flex-1 p-5 mt-2">
        {/* Name Input */}
        <View className="mb-5">
          <Text className="text-lg font-semibold mb-1">Name</Text>
          <View className="flex-row items-center border border-[#4CA6FE] rounded-full px-4 py-1">
            <TextInput
              className="flex-1 text-black text-base"
              placeholder="Enter your name"
              placeholderTextColor="#A8A8A8"
            />
          </View>
        </View>

        {/* Relation Title */}
        <Text className="text-lg font-semibold mb-3">Relation</Text>

        {/* First Row of Radio Buttons */}
        <View className="flex-row mb-5">
          {['Mother', 'Father', 'Sister'].map((relation) => (
            <TouchableOpacity
              key={relation}
              onPress={() => handleRelationChange(relation)}
              className="flex-row items-center mr-5"
            >
              <View
                className={`w-5 h-5 rounded-full border border-[#4CA6FE] flex justify-center items-center ${
                  selectedRelation === relation ? 'bg-[#4CA6FE]' : ''
                }`}
              >
                {selectedRelation === relation && (
                  <View className="w-3 h-3 bg-white rounded-full" />
                )}
              </View>
              <Text className="ml-2">{relation}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Second Row of Radio Buttons */}
        <View className="flex-row mb-5">
          {['Brother', 'Friend', 'Others'].map((relation) => (
            <TouchableOpacity
              key={relation}
              onPress={() => handleRelationChange(relation)}
              className="flex-row items-center mr-5"
            >
              <View
                className={`w-5 h-5 rounded-full border border-[#4CA6FE] flex justify-center items-center ${
                  selectedRelation === relation ? 'bg-[#4CA6FE]' : ''
                }`}
              >
                {selectedRelation === relation && (
                  <View className="w-3 h-3 bg-white rounded-full" />
                )}
              </View>
              <Text className="ml-2">{relation}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Upload Visa */}
        <View className="mb-5">
          <Text className="text-lg font-semibold mb-1">Upload Visa</Text>
          <TouchableOpacity
            onPress={() => handleFileSelection('Visa')}
            className="flex-row items-center border border-[#4CA6FE] rounded-full px-4 py-2"
          >
            <Text className="flex-1 text-black text-base">
              {visaFile ? visaFile.name : 'Choose file'}
            </Text>
            <Icon name="attach-file" size={24} color="#4CA6FE" />
          </TouchableOpacity>
        </View>

        {/* Upload Profile Picture */}
        <View className="mb-5">
          <Text className="text-lg font-semibold mb-1">Upload Profile Pic</Text>
          <TouchableOpacity
            onPress={() => handleFileSelection('Profile Pic')}
            className="flex-row items-center border border-[#4CA6FE] rounded-full px-4 py-2"
          >
            <Text className="flex-1 text-black text-base">
              {profilePic ? profilePic.name : 'Choose file'}
            </Text>
            <Icon name="attach-file" size={24} color="#4CA6FE" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Save Button - Only show when keyboard is hidden */}
      {!isKeyboardVisible && (
        <View className="absolute bottom-0 left-0 w-full p-4 bg-white shadow-lg">
          <TouchableOpacity className="bg-[#4CA6FE] py-2 mb-2 rounded-[20px]">
            <Text className="text-white font-semibold text-lg text-center">Save New Member</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default AddNewMember;
