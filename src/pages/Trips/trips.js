import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import { StatusBar } from "expo-status-bar";
import HajjTrip from './hajjTrip';
import UmrahTrip from './umrahTrip';

const Trips = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" backgroundColor="#4CA6FE" />
      
      <Text className="text-2xl font-bold text-[#000000] text-center mt-8">My Trips</Text>
      
      <HajjTrip />
      <UmrahTrip />
    </SafeAreaView>
  );
};

export default Trips;
