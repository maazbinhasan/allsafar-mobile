import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, SafeAreaView, Image } from 'react-native';
import { Feather } from '@expo/vector-icons'; // For the back arrow
import { useNavigation } from '@react-navigation/native'; // For navigation

const AgentRequests = () => {
  const navigation = useNavigation(); // Hook to navigate to previous screen

  // Sample dynamic data (simulating a fetch or external data)
  const [requests, setRequests] = useState([
    {
      image: 'https://via.placeholder.com/80', // Example placeholder image
      title: 'Nigeria Travels',
      agentName: 'Ahmed Ali',
      amount: 3950558,
      tripType: 'Umrah Trip',
    },
    {
      image: 'https://via.placeholder.com/80', // Example placeholder image
      title: 'Nigeria Travels',
      agentName: 'Fatima Zainab',
      amount: 1234567,
      tripType: 'Hajj Trip',
    },
    {
      image: 'https://via.placeholder.com/80', // Example placeholder image
      title: 'Nigeria Travels',
      agentName: 'Omar Ibrahim',
      amount: 9876543,
      tripType: 'Umrah Trip',
    },
  ]);

  // Simulate fetching data or dynamic update
  useEffect(() => {
    // Here you could fetch data from an API or update the data dynamically
    const updatedRequests = [
      {
        image: 'https://via.placeholder.com/80',
        title: 'Nigeria Travels',
        agentName: 'Aliya Khan',
        amount: 4550558,
        tripType: 'Hajj Trip',
      },
      {
        image: 'https://via.placeholder.com/80',
        title: 'Nigeria Travels',
        agentName: 'Abdullah Yusuf',
        amount: 2254567,
        tripType: 'Umrah Trip',
      },
      {
        image: 'https://via.placeholder.com/80',
        title: 'Nigeria Travels',
        agentName: 'Ayesha Noor',
        amount: 1556543,
        tripType: 'Umrah Trip',
      },
    ];

    // Set the updated requests to state
    setRequests(updatedRequests);
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white p-4 mt-4">
      {/* Header with Back Arrow and Agent Requests Title */}
      <View className="flex-row items-center mb-4">
        <Pressable onPress={() => navigation.goBack()} className="mr-4">
          <Feather name="arrow-left" size={24} className="text-black" />
        </Pressable>
        <Text className="text-xl font-semibold">Agent Requests</Text>
      </View>

      {/* Cards */}
      <View className="mt-4">
        {requests.map((request, index) => (
          <View
            key={index}
            className="bg-white p-4 rounded-xl shadow-lg mb-4 border border-gray-300"
          >
            {/* Card Content */}
            <View className="flex-row items-center mb-4">
              <Image
                source={{ uri: request.image }}
                style={{ width: 60, height: 60, borderRadius: 40 }}
              />
              <View className="ml-4">
                <Text className="text-xl font-semibold">{request.title}</Text>
                <Text className="text-gray-500">{request.agentName}</Text>
              </View>
            </View>

            {/* Pricing and Trip Type */}
            <View className="mb-4">
              <Text className="text-orange-500 text-lg font-bold">
                ₦{request.amount.toLocaleString()}
              </Text>
              <Text className="font-bold text-[16px] text-black">{request.tripType}</Text>
            </View>

            {/* Accept and Reject Buttons */}
            <View className="flex-row justify-start space-x-4">
              <Pressable className="bg-green-500 py-2 px-8 rounded-[20px] border border-green-600">
                <Text className="text-white font-semibold">Accept</Text>
              </Pressable>
              <Pressable className="bg-red-500 py-2 px-8 rounded-[20px] border border-red-600">
                <Text className="text-white font-semibold">Reject</Text>
              </Pressable>
            </View>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default AgentRequests;
