import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import Material Icons

const BottomNavigation = ({ activeTab, setActiveTab }) => {
  // Define tab information with corresponding icons and names
  const tabs = [
    { icon: 'home', name: 'Home' },
    { icon: 'flight-takeoff', name: 'Trips' },
    { icon: 'account-circle', name: 'Account' },
  ];

  return (
    <View className="absolute bottom-0 left-0 right-0 flex-row justify-around items-center py-5 bg-white rounded-t-3xl shadow-2xl">
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.name}
          onPress={() => setActiveTab(tab.name)} // Change active tab on press
          className="flex-col items-center"
        >
          <Icon
            name={tab.icon} // Set the icon for the tab
            size={30}
            color={activeTab === tab.name ? '#4CA6FE' : '#000'} // Active color is #4CA6FE
          />
          <Text
            className={`mt-1 text-sm ${activeTab === tab.name ? 'text-[#4CA6FE]' : 'text-black'} font-semibold`}
          >
            {tab.name} {/* Display the tab name */}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default BottomNavigation;
