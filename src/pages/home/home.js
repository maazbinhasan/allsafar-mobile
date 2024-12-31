import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { StatusBar } from "expo-status-bar";
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'; 
import BottomNavigation from '../../components/BottomNavigation'; 
import SalahInfoCard from './SalahInfoCard';
import Trips from '../Trips/trips';  
import Account from '../account/account';  
import Banner from './banner';
import Packages from './Packages';

const Home = () => {
  const [activeTab, setActiveTab] = useState('Home'); 

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Home':
        return (
          <View className="flex-1">
            {/* Fixed content */}
            <SalahInfoCard />

            {/* Scrollable section */}
            <ScrollView
              contentContainerStyle={{ paddingBottom: 80 }}
              className="flex-grow"
            >
              <Banner />
              <Packages />
            </ScrollView>
          </View>
        );
      case 'Trips':
        return <Trips />;
      case 'Account':
        return <Account />;
      default:
        return <SalahInfoCard />;
    }
  };

  return (
    <View className="flex-1 bg-[#F6F4F3]">
      <StatusBar style="dark" backgroundColor="#4CA6FE" />

      {activeTab === 'Home' && (
        <View className="relative bg-[#4CA6FE] py-16 px-6 rounded-b-[40px] mb-[-75px]">
          <View className="flex-row mb-8 justify-between items-center">
            <Text className="text-lg text-[#ffffff] opacity-80 font-semibold">
              Asalamu’alaikum.
            </Text>

            <View className="flex-row items-center space-x-3">
              <TouchableOpacity>
                <Text className="text-white text-lg font-semibold">EN</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <MaterialCommunityIcons name="earth" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="notifications" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {/* Render active tab content */}
      {renderTabContent()}

      <BottomNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
    </View>
  );
};

export default Home;
