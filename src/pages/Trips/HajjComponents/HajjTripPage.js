import React, { useState } from 'react';
import { View, Text, Image, ScrollView, Pressable } from 'react-native';
import { Feather, FontAwesome } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native'; // For navigation

const HajjTripPage = () => {
  const navigation = useNavigation();
  const [selectedSteps, setSelectedSteps] = useState([]); // State to track selected steps

  // Static tripData object with dynamic content
  const tripData = {
    title: 'Hajj Trip',
    image: 'https://t3.ftcdn.net/jpg/02/13/66/82/360_F_213668221_WAGADFH8GbCFVq8DlHZOrmIx5onVC4fY.jpg', // Replace with the actual image URL
    startDate: '18 Apr 2024',
    endDate: '30 Apr 2024',
    rating: '★★★★☆',
    steps: [
      { label: 'Trip Approved', isComplete: false },
      { label: 'Guarantor Approved', isComplete: false },
      { label: 'Doctor Form Approved', isComplete: false },
      { label: 'Agent Allotted', isComplete: false },
      { label: 'Visa Applied', isComplete: false },
      { label: 'Payment Approved', isComplete: false },
      { label: 'Trip Started', isComplete: false },
    ]
  };

  // Toggle Step Selection
  const toggleStepSelection = (index) => {
    setSelectedSteps((prevSelected) => {
      if (prevSelected.includes(index)) {
        // Remove the step if it's already selected
        return prevSelected.filter((stepIndex) => stepIndex !== index);
      } else {
        // Add the step to the selected list
        return [...prevSelected, index];
      }
    });
  };

  return (
    <View className="flex-1 bg-white mt-6">
      {/* Header with Back Arrow and Title */}
      <View className="flex-row items-center p-4">
        <Pressable onPress={() => navigation.goBack()} className="mr-2">
          <Feather name="arrow-left" size={24} color="black" />
        </Pressable>
        <Text className="text-xl font-semibold">Detail</Text>
      </View>

      <ScrollView className="flex-1 bg-white p-4">
        {/* Image with curved borders */}
        <View className="mb-4">
          <Image
            source={{ uri: tripData.image }} // Use dynamic image URL
            className="w-full h-48 rounded-lg"
          />
        </View>

        {/* Trip Title, Date, and Stars */}
        <View className="mb-2 px-2">
          <Text className="text-[20px] font-bold text-gray-800">{tripData.title}</Text>
          <Text className="text-sm font-medium text-[#4CA6FE] mt-1">
            {tripData.startDate} - {tripData.endDate}
          </Text>
          <Text className="text-yellow-400 mt-2">{tripData.rating}</Text>
        </View>

        {/* Steps Section with Multi-Select */}
        <View className="relative space-y-4">
          {/* Vertical Line */}
          <View
            className="absolute top-4 left-1/2 transform -translate-x-1"
            style={{
              width: 2,
              height: '90%',
              backgroundColor: 'gray',
            }}
          />
          {/* Render Steps dynamically */}
          {tripData.steps.map((step, index) => (
            <Pressable
              key={index}
              onPress={() => toggleStepSelection(index)} // Toggle step selection
              className={`flex-row items-center justify-between p-2 rounded-lg ${
                selectedSteps.includes(index)
                  ? 'bg-[#4CA6FE]'
                  : step.isComplete
                  ? 'bg-[#4CA6FE]'
                  : 'bg-gray-400'
              }`}
            >
              <Text
                className={`text-[12px] ${
                  selectedSteps.includes(index) || step.isComplete
                    ? 'text-white'
                    : 'text-white'
                }`}
              >
                {step.label}
              </Text>
              <FontAwesome
                name={
                  selectedSteps.includes(index) || step.isComplete
                    ? 'check-circle'
                    : 'circle-o'
                }
                size={20}
                color={
                  selectedSteps.includes(index) || step.isComplete
                    ? 'white'
                    : 'gray'
                }
              />
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default HajjTripPage;
