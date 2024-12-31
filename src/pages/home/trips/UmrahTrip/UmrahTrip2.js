import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons"; // Material Icons
import { RadioButton } from "react-native-paper"; // Radio button component
import DateTimePicker from "@react-native-community/datetimepicker"; // DateTimePicker component
import { useNavigation } from "@react-navigation/native";
import ButtonBottom from "../../../../components/ButtonBottom";
import * as DocumentPicker from 'expo-document-picker';




const UmrahTrip = () => {
  const [selectedTrip, setSelectedTrip] = useState("oneway");
  const [date, setDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showReturnDatePicker, setShowReturnDatePicker] = useState(false);

  const [passengers, setPassengers] = useState(1);
  const [attachmentsOpen, setAttachmentsOpen] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState("single");

  const [name, setName] = useState("");
  const [umrahDate, setUmrahDate] = useState(new Date()); // New state for Umrah date
  const [showUmrahDatePicker, setShowUmrahDatePicker] = useState(false); // State to toggle Umrah date picker
  const [phoneNumber, setPhoneNumber] = useState("");
  const [budget, setBudget] = useState("");

  const [passportFront, setPassportFront] = useState(null); // State for passport front
  const [photocopy, setPhotocopy] = useState(null); // State for photocopy

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const handleReturnDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || returnDate;
    setShowReturnDatePicker(false);
    setReturnDate(currentDate);
  };

  const handleUmrahDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || umrahDate;
    setShowUmrahDatePicker(false);
    setUmrahDate(currentDate);
  };
  const navigation = useNavigation();

  const handleFormSubmit = () => {
    // Here, you can handle form validation and data submission logic
    // For now, let's assume form submission is successful
    // Redirect to 'RequestedSubmitted.js' after form submission
    navigation.navigate("RequestedSubmitted");
  };

  const handleDocumentPick = async (type) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*", // Allow any file type
      });

      if (result.type === "success") {
        if (type === "passportFront") {
          setPassportFront(result);
        } else if (type === "photocopy") {
          setPhotocopy(result);
        }
      }
    } catch (error) {
      console.error("Error picking document: ", error);
    }
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
            Create Umrah Trip
          </Text>
        </View>

        {/* Section Title */}
        <Text className="text-lg font-semibold text-gray-800 mb-3">
          What will I need to apply for Umrah Application?
        </Text>

        {/* Bullet Points */}
        <View className="space-y-2 mb-6">
          <Text className="text-base text-gray-700">• Passport Front</Text>
          <Text className="text-base text-gray-700">• Visa</Text>
        </View>

        {/* New Question - Radio Buttons */}
        <Text className="text-lg font-semibold text-gray-800 mb-3">
          What do you want to book?
        </Text>

        {/* Radio Button Choices Side by Side */}
        <View className="flex-row space-x-8 mb-6">
          <View className="flex-row items-center">
            <RadioButton
              value="oneway"
              color="#1DC9A0"
              status={selectedTrip === "oneway" ? "checked" : "unchecked"}
              onPress={() => {
                setSelectedTrip("oneway");
                setReturnDate(null); // Clear return date if "One Way" is selected
              }}
            />
            <Text className="text-base text-gray-700">One Way</Text>
          </View>

          <View className="flex-row items-center">
            <RadioButton
              value="roundtrip"
              color="#1DC9A0"
              status={selectedTrip === "roundtrip" ? "checked" : "unchecked"}
              onPress={() => setSelectedTrip("roundtrip")}
            />
            <Text className="text-base text-gray-700">Round Trip</Text>
          </View>
        </View>

        {/* DateTimePicker Components */}
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
        {showReturnDatePicker && (
          <DateTimePicker
            value={returnDate || new Date()}
            mode="date"
            display="default"
            onChange={handleReturnDateChange}
          />
        )}

        {/* Box with light blue background */}
        <View className="bg-[#D1E7FF] p-4 rounded-xl mt-[-15]">
          <View className="flex-row justify-between">
            {/* Left Box with Top and Bottom Boxes */}
            <View className="w-[48%]">
              {/* From Box */}
              <View className="bg-[#A1C6FF] h-17 mb-2 rounded-xl p-2">
                <Text className="text-[12px] text-gray-500">From:</Text>
                <Text className="text-sm font-bold">KANO</Text>
                <Text className="text-[12px] text-gray-500">
                  M. Aminu Kano... (KAN)
                </Text>
              </View>

              {/* Date Box */}
              <View className="bg-[#A1C6FF] h-16 rounded-xl p-2">
                <Text className="text-[12px] text-gray-500">Date:</Text>
                <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                  <Text className="text-sm">
                    {date ? date.toLocaleDateString() : "Select Date"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Right Box with Top and Bottom Boxes */}
            <View className="w-[48%]">
              {/* To Box */}
              <View className="bg-[#A1C6FF] h-17 mb-2 rounded-xl p-2">
                <Text className="text-[12px] text-gray-500">To:</Text>
                <Text className="text-sm font-bold">JEDDAH</Text>
                <Text className="text-[12px] text-gray-500">
                  King Abdulaziz ...(JED)
                </Text>
              </View>

              {/* Passengers Box */}
              <View className="bg-[#A1C6FF] h-16 rounded-xl p-2">
                <Text className="text-[12px] text-gray-500">Passengers:</Text>
                <View className="flex-row justify-between items-center">
                  {/* Decrease Button */}
                  <TouchableOpacity
                    onPress={() =>
                      setPassengers((prev) => Math.max(1, prev - 1))
                    }
                    className="p-3 rounded-xl"
                  >
                    <Text className="text-black font-bold">-</Text>
                  </TouchableOpacity>

                  {/* Passenger Input */}
                  <TextInput
                    value={passengers.toString()} // Convert the number to string for TextInput
                    onChangeText={(text) =>
                      setPassengers(Math.max(1, parseInt(text) || 1))
                    }
                    keyboardType="numeric"
                    className="w-[20%] text-center p-2 rounded-lg "
                  />

                  {/* Increase Button */}
                  <TouchableOpacity
                    onPress={() => setPassengers((prev) => prev + 1)}
                    className="p-3 rounded-xl "
                  >
                    <Text className="text-black font-bold">+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          {/* Conditionally render Return Date for Round Trip */}
          {selectedTrip === "roundtrip" && (
            <View className="mt-4 bg-[#A1C6FF] h-16 rounded-xl p-2">
              <Text className="text-[12px] text-gray-500">Return Date:</Text>
              <TouchableOpacity onPress={() => setShowReturnDatePicker(true)}>
                <Text className="text-sm">
                  {returnDate
                    ? returnDate.toLocaleDateString()
                    : "Select Return Date"}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Attachments Dropdown with Shadow */}
        <TouchableOpacity
          onPress={() => setAttachmentsOpen(!attachmentsOpen)}
          className="flex-row justify-between items-center mt-4 bg-[#efefef] p-4 rounded-xl shadow-lg" // Added shadow-lg here
        >
          <Text className="text-lg font-semibold text-gray-800">
            Attachments
          </Text>
          <Icon
            name={attachmentsOpen ? "arrow-drop-up" : "arrow-drop-down"}
            size={24}
            color="#1DC9A0"
          />
        </TouchableOpacity>

        {attachmentsOpen && (
  <View className="space-y-0 mt-4">
    {/* Passport Front */}
    <View className="bg-white p-4 rounded-xl shadow-lg">
      <Text className="text-sm text-gray-600 mb-2">Passport Front</Text>
      <TouchableOpacity
        onPress={() => handleDocumentPick("passportFront")}
        className="border border-[#D1E7FF] rounded-xl py-3 bg-[#F6F6F6]"
      >
        <Text className="text-center text-gray-600">
          {passportFront ? passportFront.name : "Upload Passport Front"}
        </Text>
      </TouchableOpacity>
    </View>

    {/* Photocopy */}
    <View className="bg-white p-4 rounded-xl shadow-lg">
      <Text className="text-sm text-gray-600 mb-2">Photocopy</Text>
      <TouchableOpacity
        onPress={() => handleDocumentPick("photocopy")}
        className="border border-[#D1E7FF] rounded-xl py-3 bg-[#F6F6F6]"
      >
        <Text className="text-center text-gray-600">
          {photocopy ? photocopy.name : "Upload Photocopy"}
        </Text>
      </TouchableOpacity>
    </View>
  </View>
)}


        {/* Persons Question - Radio Buttons Side by Side (After Attachments) */}
        <Text className="text-lg font-semibold text-gray-800 mb-3 mt-5">
          Persons:
        </Text>
        <View className="flex-row space-x-6 mb-3">
          <View className="flex-row items-center">
            <RadioButton
              value="single"
              color="#1DC9A0"
              status={selectedPerson === "single" ? "checked" : "unchecked"}
              onPress={() => setSelectedPerson("single")}
            />
            <Text className="text-base text-gray-700">Single Person</Text>
          </View>

          <View className="flex-row items-center">
            <RadioButton
              value="family"
              color="#1DC9A0"
              status={selectedPerson === "family" ? "checked" : "unchecked"}
              onPress={() => setSelectedPerson("family")}
            />
            <Text className="text-base text-gray-700">With Family</Text>
          </View>
        </View>

        {/* New Form Inputs (Name, Date, Phone, Budget, Buttons) */}
        <View className="mt-2">
          {/* Name Input */}
          <Text className="text-lg font-semibold text-gray-800 mb-3">
            Name:
          </Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Enter your name"
            className="p-3 bg-[#f0f0f0] rounded-xl mb-4"
          />

          {/* Date for Umrah Section */}
          <View className="mb-2">
            <Text className="text-lg font-semibold text-gray-800 ">
              Date for Umrah:
            </Text>
            <View className="bg-[#A1C6FF] h-10 rounded-xl p-2">
              <TouchableOpacity onPress={() => setShowUmrahDatePicker(true)}>
                <Text className="text-sm">
                  {umrahDate
                    ? umrahDate.toLocaleDateString()
                    : "Select Umrah Date"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {showUmrahDatePicker && (
            <DateTimePicker
              value={umrahDate}
              mode="date"
              display="default"
              onChange={handleUmrahDateChange}
            />
          )}

          {/* Phone Number Field */}
          <Text className="text-lg font-semibold text-gray-800 mb-3">
            Phone Number:
          </Text>
          <TextInput
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholder="Enter phone number"
            className="p-3 bg-[#f0f0f0] rounded-xl mb-4"
          />

          {/* Budget Field */}
          <Text className="text-lg font-semibold text-gray-800 mb-3">
            Budget:
          </Text>
          <TextInput
            value={budget}
            onChangeText={setBudget}
            placeholder="Enter budget"
            className="p-3 bg-[#f0f0f0] rounded-xl mb-6"
          />

          {/* Buttons */}
          <View className="space-y-4 mb-4">
            <TouchableOpacity className="px-8 py-3 rounded-[20px] flex-row items-center justify-center"
            onPress={() => navigation.navigate("Home")}
            >
              <Icon name="close" size={18} color="#D31C05" className="mr-4"/>
              <Text className="text-[#D31C05] font-semibold text-center">
                Cancel
              </Text>
            </TouchableOpacity>

            {/* <TouchableOpacity className="bg-[#4CA6FE] px-8 py-3 rounded-[25px] flex-row items-center justify-center">
              <Text className="text-white font-semibold text-center">Submit</Text>
            </TouchableOpacity> */}
            <ButtonBottom title="Submit" onPress={handleFormSubmit} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UmrahTrip;
