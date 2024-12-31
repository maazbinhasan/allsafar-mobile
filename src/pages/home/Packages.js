import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native'; // Import the hook

const Packages = () => {
  const navigation = useNavigation(); // Get the navigation prop using the hook

  const handleSeeAllPress = () => {
    console.log('See all clicked!');
  };

  const handlePackageClick = (pkg) => {
    if (pkg.title === "Hajj Package") {
      navigation.navigate('HajjTrip');
    } else if (pkg.title === "Umrah") {
      navigation.navigate('UmrahTrip');
    }
  };

  const packages = [
    {
      id: 1,
      title: "Hajj Package",
      imageUrl: "https://i.ibb.co/fqq782L/hajjTrip.png",
      location: "Jeddah",
      fromDate: "18 Jan",
      toDate: "25 Jan"
    },
    {
      id: 2,
      title: "Umrah",
      imageUrl: "https://i.ibb.co/6yMKncJ/umrah-Trip.png",
      location: "Jeddah",
      fromDate: "18 Jan",
      toDate: "25 Jan"
    }
  ];

  return (
    <View className="flex-1 px-5 pt-2">
      <View className="flex-row justify-between items-center mb-2">
        <Text className="text-sm font-bold">Packages</Text>
        <TouchableOpacity onPress={handleSeeAllPress}>
          <Text className="text-blue-500 text-sm">See all</Text>
        </TouchableOpacity>
      </View>

      <View className="space-y-4 pb-10">
        {packages.map((pkg) => (
          <TouchableOpacity key={pkg.id} onPress={() => handlePackageClick(pkg)}>
            <View className="flex-row bg-white p-2 rounded-lg shadow-md">
              <Image
                source={{ uri: pkg.imageUrl }}
                style={{ width: 130, height: 100, borderRadius: 8 }}
              />
              <View className="ml-2 flex-1">
                <Text className="text-lg font-bold">{pkg.title}</Text>
                <View className="flex-row items-center mt-2">
                  <Icon name="location-on" size={20} color="#4CA6FE" />
                  <Text className="ml-2 text-sm text-[#4CA6FE]">{pkg.location}</Text>
                </View>
                <View className="flex-row items-center mt-2">
                  <Icon name="calendar-today" size={20} color="black" />
                  <Text className="ml-2 text-sm text-gray-600">
                    From: <Text className="text-orange-500">{pkg.fromDate}</Text> To: <Text className="text-orange-500">{pkg.toDate}</Text>
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default Packages;
