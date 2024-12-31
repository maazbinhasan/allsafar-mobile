import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  Modal,
  FlatList
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Picker } from "@react-native-picker/picker";  // Import Picker component
import Svg, { Path } from "react-native-svg"; // Import react-native-svg
import ButtonBottom from "../../../../components/ButtonBottom";
import ReservationButton from "../../../../components/ReservationButton";

// Define SVG logos
const VisaLogo = () => (
  <Svg xmlns="http://www.w3.org/2000/svg" width="30" height="20" viewBox="0 0 30 20">
    <Path fill="#1A1F71" d="M0 0h30v20H0z" />
    <Path fill="#f4b731" d="M5.5 4.5h6v11h-6z" />
  </Svg>
);

const MasterCardLogo = () => (
  <Svg xmlns="http://www.w3.org/2000/svg" width="30" height="20" viewBox="0 0 30 20">
    <Path fill="#FF5F00" d="M0 0h15v20H0z" />
    <Path fill="#F2C500" d="M15 0h15v20H15z" />
  </Svg>
);

const AmericanExpressLogo = () => (
  <Svg xmlns="http://www.w3.org/2000/svg" width="30" height="20" viewBox="0 0 30 20">
    <Path fill="#2C6AB1" d="M0 0h30v20H0z" />
    <Path fill="#FFFFFF" d="M5 5h20v10H5z" />
  </Svg>
);

const HajjReservation = ({ navigation }) => {
  const [adultCount, setAdultCount] = useState(0);
  const [childrenCount, setChildrenCount] = useState(0);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("visa");
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const paymentMethods = [
    { name: "Visa", value: "visa", logo: <VisaLogo /> },
    { name: "MasterCard", value: "mastercard", logo: <MasterCardLogo /> },
    { name: "American Express", value: "amex", logo: <AmericanExpressLogo /> },
  ];



  const handleFormSubmit = async () => {
        navigation.navigate("RequestedSubmitted");
 
  };



  const handleSelectPaymentMethod = (value) => {
    setSelectedPaymentMethod(value);
    setModalVisible(false); // Close modal after selection
  };

  return (
    <SafeAreaView className="flex-1 bg-[#ffffff]">
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* Header */}
        <View className="flex-row items-center mb-6 mt-6">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={30} color="black" />
          </TouchableOpacity>
          <Text className="text-[20px] font-bold text-black ml-3">
            Reservation
          </Text>
        </View>

        {/* Reservation Details Box */}
        <View
          className="bg-white p-3 rounded-xl shadow-black/90 mb-6"
          style={{ elevation: 5 }}
        >
          <View className="flex-row">
            {/* Left side big image */}
            <View style={{ position: "relative" }}>
              <Image
                source={require("../../../../assets/home/HajjReservation.png")}
                style={{ width: 145, height: 165, borderRadius: 10 }}
              />
              {/* Date at the bottom left of the image */}
              <View
                style={{
                  position: "absolute",
                  bottom: 10,
                  left: 10,
                  backgroundColor: "orange",
                  paddingHorizontal: 5,
                  paddingVertical: 2,
                  borderRadius: 5,
                }}
              >
                <Text style={{ fontSize: 10, color: "white" }}>19-July-24</Text>
              </View>
            </View>

            {/* Right side content */}
            <View className="ml-3 flex-1">
              {/* Top Row: 41 days and 20 people */}
              <View className="flex-row justify-between items-center">
                <Text className="text-[12px] text-orange-400 font-bold">
                  41 days
                </Text>
                <View className="flex-row items-center">
                  <Icon name="people" size={20} color="#4CA6FE" />
                  <Text className="ml-1 text-[#4CA6FE] text-[12px] font-bold">
                    20
                  </Text>
                </View>
              </View>

              {/* Bottom Text: Hajj package and description */}
              <Text className="text-xl font-semibold mt-4">Hajj Package</Text>
              <Text className="text-[14px] text-gray-500 mt-1">
                Lorem Ipsum is simply dummy text of the printing industry.
              </Text>

              {/* Dates */}
              <Text className="text-[12px] font-bold text-black mt-2">
                26 March 2024 - 22 Apr 2024
              </Text>
            </View>
          </View>
        </View>

        {/* Counters Section */}
        <View className="flex-row justify-between items-center mx-4">
          {/* Adult Counter */}
          <View className="items-center">
            <Text className="text-sm font-bold">Adult</Text>
            <View className="flex-row items-center mt-2">
              <TouchableOpacity
                onPress={() => setAdultCount(adultCount > 0 ? adultCount - 1 : 0)}
                className="px-4 py-2 mr-2"
              >
                <Text className="text-black text-lg font-bold">-</Text>
              </TouchableOpacity>
              <Text className="text-lg font-semibold">{adultCount}</Text>
              <TouchableOpacity
                onPress={() => setAdultCount(adultCount + 1)}
                className="px-4 py-2 ml-2"
              >
                <Text className="text-black text-lg font-bold">+</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Children Counter */}
          <View className="items-center">
            <Text className="text-sm font-bold">Children</Text>
            <View className="flex-row items-center mt-2">
              <TouchableOpacity
                onPress={() =>
                  setChildrenCount(childrenCount > 0 ? childrenCount - 1 : 0)
                }
                className="px-4 py-2 mr-2"
              >
                <Text className="text-black text-lg font-bold">-</Text>
              </TouchableOpacity>
              <Text className="text-lg font-semibold">{childrenCount}</Text>
              <TouchableOpacity
                onPress={() => setChildrenCount(childrenCount + 1)}
                className="px-4 py-2 ml-2"
              >
                <Text className="text-black text-lg font-bold">+</Text>
              </TouchableOpacity>
            </View>
          </View>
          
        </View>
        <View className="p-4">
      <Text className="text-sm font-bold">Payment Method</Text>

      {/* Button to trigger modal */}
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        className="mt-2 p-3 bg-[#f0f0f0] rounded-xl border-2"
      >
        <Text className="text-base text-gray-700">
          {selectedPaymentMethod.charAt(0).toUpperCase() + selectedPaymentMethod.slice(1)}
        </Text>
      </TouchableOpacity>

      {/* Modal to display custom dropdown */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" }}
          onPress={() => setModalVisible(false)}
        >
          <View
            style={{
              backgroundColor: "white",
              width: "80%",
              borderRadius: 10,
              padding: 10,
            }}
          >
            <FlatList
              data={paymentMethods}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => handleSelectPaymentMethod(item.value)}
                  className="flex-row items-center p-3 border-b border-gray-200"
                >
                  {item.logo}
                  <Text className="ml-3 text-lg">{item.name}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Display selected payment method */}
      <Text className="mt-4 text-lg">Selected Payment Method: {selectedPaymentMethod}</Text>
    </View>
    <View className="p-4">
  <Text className="text-sm font-bold">Note</Text>

  {/* Ordered List */}
  <Text className="text-sm mt-2">
  - Payment once done will only be return after the confirmation from All Safar Platform
  </Text>
  <Text className="text-sm mt-2">
  Kindly refer to terms & conditions
  </Text>
</View>

<View className='fixed bottom-0 w-full'>
<ReservationButton
            title={loading ? "Booking Now..." : "Book Now"}
            disabled={loading}
            onPress={handleFormSubmit}
          />
          </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HajjReservation;
