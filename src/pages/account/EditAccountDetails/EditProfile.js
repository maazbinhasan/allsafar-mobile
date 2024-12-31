import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, SafeAreaView, ScrollView, Keyboard, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const EditProfile = () => {
  const navigation = useNavigation();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState('');
  const [userId, setUserId] = useState('');
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('userId');
        if (!storedUserId) {
          Alert.alert('Error', 'User ID not found. Please log in again.');
          return;
        }

        setUserId(storedUserId);

        const response = await axios.get(
          `https://704e-2401-4900-1cb1-1d47-58f2-365e-a9c1-7811.ngrok-free.app/api/Users/GetUser?id=${storedUserId}`
        );

        if (response.data.IsSuccess) {
          const userData = response.data.Data;
          setName(userData.Name);
          setEmail(userData.Email);
          setPhone(userData.Mobile);
          setPassword(''); // Do not prefill password for security reasons
          setAvatar(userData.Avatar);
        } else {
          Alert.alert('Error', 'Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        Alert.alert('Error', 'Failed to fetch user data');
      }
    };

    fetchUserData();
  }, []);

  const handleSaveProfile = async () => {
    if (!name || !email || !phone) {
      Alert.alert('Error', 'Name, email, and phone are required.');
      return;
    }

    try {
      const response = await axios.post('https://704e-2401-4900-1cb1-1d47-58f2-365e-a9c1-7811.ngrok-free.app/api/Users/UpdateUserDetails', {
        ID: userId,
        Name: name,
        Email: email,
        Mobile: phone,
        Password: password || undefined, // Send password only if it's not empty
      });

      if (response.data.IsSuccess) {
        Alert.alert('Success', 'Profile updated successfully', [
          { text: 'OK', onPress: () => navigation.goBack() },
        ]);
      } else {
        Alert.alert('Error', response.data.Message || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      Alert.alert('Error', 'An error occurred while updating your profile');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#f3f3f3]">
      <View className="flex-row items-center justify-between p-4 mt-3">
        <TouchableOpacity className="left-2" onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={30} color="#000000" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold">Edit Profile</Text>
        <View className="w-10" />
      </View>

      <View className="flex-row justify-center items-center mt-2">
        <View className="relative">
          <Image
            source={{ uri: avatar || 'https://www.w3schools.com/w3images/avatar2.png' }}
            className="w-32 h-32 rounded-full"
          />
          <TouchableOpacity className="absolute bottom-0 right-0 bg-[#FE8D26] p-2 rounded-full">
            <Icon name="edit" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="p-5 mt-3 flex-grow">
        <View className="mb-5">
          <Text className="text-lg font-semibold mb-1">Name</Text>
          <View className="flex-row items-center border border-[#4CA6FE] rounded-full px-4 py-1">
            <TextInput
              className="flex-1 text-black text-base"
              placeholder="Enter your name"
              placeholderTextColor="#A8A8A8"
              value={name}
              onChangeText={setName}
            />
          </View>
        </View>

        <View className="mb-5">
          <Text className="text-lg font-semibold mb-1">Email</Text>
          <View className="flex-row items-center border border-[#4CA6FE] rounded-full px-4 py-1">
            <TextInput
              className="flex-1 text-black text-base"
              placeholder="Enter your email"
              placeholderTextColor="#A8A8A8"
              value={email}
              onChangeText={setEmail}
            />
          </View>
        </View>

        <View className="mb-5">
          <Text className="text-lg font-semibold mb-1">Phone</Text>
          <View className="flex-row items-center border border-[#4CA6FE] rounded-full px-4 py-1">
            <TextInput
              className="flex-1 text-black text-base"
              placeholder="Enter your phone number"
              placeholderTextColor="#A8A8A8"
              value={phone}
              onChangeText={setPhone}
            />
          </View>
        </View>

        <View>
          <Text className="text-lg font-semibold mb-1">Password</Text>
          <View className="flex-row items-center border border-[#4CA6FE] rounded-full px-4 py-1">
            <TextInput
              className="flex-1 text-black text-base"
              placeholder="Enter your password"
              placeholderTextColor="#A8A8A8"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>
        </View>
      </ScrollView>

      {!keyboardVisible && (
        <View className="absolute bottom-0 left-0 w-full p-4 bg-white shadow-lg">
          <TouchableOpacity onPress={handleSaveProfile} className="bg-[#4CA6FE] py-2 mb-2 rounded-[20px]">
            <Text className="text-white font-semibold text-lg text-center">Save</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default EditProfile;
