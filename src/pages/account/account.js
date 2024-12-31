import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, SafeAreaView, Alert, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Dummy data for when the API is unavailable
const dummyData = {
  avatar: 'https://www.w3schools.com/w3images/avatar3.png',
  Name: 'John Doe',
  ID: '12345',
  Email: 'johndoe@example.com',
  Mobile: '+1 234 567 8901',
};

const ProfileInfo = ({ avatar, name, id, email, mobile }) => {
  const navigation = useNavigation();

  return (
    <View className="flex-row items-center mt-5 mb-10 justify-between mx-0 p-3 rounded-lg">
      <View className="flex-row items-center space-x-4">
        <Image
          source={{ uri: avatar }}
          style={{ width: 60, height: 60, borderRadius: 30 }}
        />
        <View>
          <Text className="font-bold text-black">{name}</Text>
          <Text className="text-sm text-gray-600">{id}</Text>
          <Text className="text-sm text-[#4CA6FE]">{email}</Text>
          <Text className="text-sm text-gray-600">{mobile}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
        <Icon name="edit" size={30} color="#000000" />
      </TouchableOpacity>
    </View>
  );
};

const SectionItem = ({ icon, title, description, onPress, actionText }) => (
  <TouchableOpacity onPress={onPress} className="flex-row items-center justify-between mx-0 mt-3 border border-gray-200 p-4 rounded-lg">
    <View className="flex-row items-center">
      <Icon name={icon} size={30} color="#000000" />
      <View className="ml-4">
        <Text className="font-bold text-black">{title}</Text>
        <Text className="text-sm text-gray-600">{description}</Text>
      </View>
    </View>
    {actionText ? (
      <Text className="text-[14px] text-orange-500 font-semibold">{actionText}</Text>
    ) : (
      <Icon name="keyboard-arrow-right" size={30} color="#000000" />
    )}
  </TouchableOpacity>
);

const Account = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        
        if (!userId) {
          Alert.alert('Error', 'User ID not found. Please log in again.');
          return;
        }

        const response = await fetch(`https://704e-2401-4900-1cb1-1d47-58f2-365e-a9c1-7811.ngrok-free.app/api/Users/GetUser?id=${userId}`);
        
        if (response.ok) {
          const data = await response.json();
          if (data.IsSuccess) {
            setUserData(data.Data); // Set real API data
          } else {
            console.error('Failed to fetch user data');
            setUserData(dummyData); // Use dummy data if API call fails
          }
        } else {
          console.error('Failed to fetch user data');
          setUserData(dummyData); // Use dummy data if response is not OK
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setUserData(dummyData); // Use dummy data on error for dummy data
      }
    };

    fetchUserData();
  }, []);

  if (!userData) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
         <ActivityIndicator size="small" color="#4CA6FE" style={{ marginRight: 20, width:'120px' }} />
          <Text className="p-4 flex-row items-center">
        Loading... The Account Details
      </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold text-black text-center mb-2 mt-4">Account</Text>

      {/* Profile Section */}
      <ProfileInfo
        avatar={userData.avatar || dummyData.avatar}
        name={userData.Name || dummyData.Name}
        id={userData.ID ? userData.ID.toString() : dummyData.ID}
        email={userData.Email || dummyData.Email}
        mobile={userData.Mobile || dummyData.Mobile}
      />

      {/* Home Section */}
      <SectionItem
        icon="family-restroom"
        title="Family Member"
        description="Enter the member details"
        onPress={() => navigation.navigate("FamilyMember")}
      />

      {/* Attachment Section */}
      <SectionItem
        icon="attachment"
        title="Attachments"
        description="View All Attachments"
        onPress={() => console.log('View all attachments')}
      />

      {/* Support Section */}
      <SectionItem
        icon="support-agent"
        title="Need Support"
        description="Need Any Help"
        onPress={() => console.log('Chat Now')}
        actionText="Chat Now"
      />

      {/* LogOut Section */}
      <SectionItem
        icon="logout"
        title="LogOut"
        description="Logout From Account"
        onPress={async () => {
          try {
            await AsyncStorage.removeItem('userId');
            await AsyncStorage.removeItem('token');
            
            Alert.alert('Logged out successfully', 'You have been logged out.', [
              {
                text: 'OK',
                onPress: () => navigation.navigate('Welcome'),
              },
            ]);
          } catch (error) {
            console.error('Error during logout:', error);
            Alert.alert('Error', 'There was an issue logging out.');
          }
        }}
      />
    </SafeAreaView>
  );
};

export default Account;
