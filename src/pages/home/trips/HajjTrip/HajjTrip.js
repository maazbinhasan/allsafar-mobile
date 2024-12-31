import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
  Alert
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons"; 
import { RadioButton } from "react-native-paper"; 
import DateTimePicker from "@react-native-community/datetimepicker"; 
import { useNavigation } from "@react-navigation/native";
import ButtonBottom from "../../../../components/ButtonBottom";
import * as DocumentPicker from 'expo-document-picker';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import RNPickerSelect from "react-native-picker-select";




const HajjTrip = () => {
  const [selectedTrip, setSelectedTrip] = useState("oneway");
  const [fromCountry, setFromCountry] = useState(null);
  const [toCountry, setToCountry] = useState(null);
  const [fromAirport, setFromAirport] = useState(null);
  const [passportFront, setPassportFront] = useState(null); // State for passport front
  const [photocopy, setPhotocopy] = useState(null); // State for photocopy
  const [toAirport, setToAirport] = useState(null);
const [passengerCount, setPassengerCount] = useState(false);
  // Form Fields
  // Loading State
  const [date, setDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showReturnDatePicker, setShowReturnDatePicker] = useState(false);

  const [passengers, setPassengers] = useState(1);
  const [attachmentsOpen, setAttachmentsOpen] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState("single");

  // Form Fields
  const [name, setName] = useState("");
  const [umrahDate, setUmrahDate] = useState(new Date()); // New state for Umrah date
  const [showUmrahDatePicker, setShowUmrahDatePicker] = useState(false); // State to toggle Umrah date picker
  const [phoneNumber, setPhoneNumber] = useState("");
  const [budget, setBudget] = useState("");

  // Loading State
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

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

  const countriesWithAirports = [
    {
      country: "Nigeria",
      airports: [
        { "name": "Murtala Muhammed International Airport", "code": "LOS" },
        { "name": "Nnamdi Azikiwe International Airport", "code": "ABV" },
        { "name": "Port Harcourt International Airport", "code": "PHC" },
        { "name": "Akanu Ibiam International Airport", "code": "ENU" },
        { "name": "Mallam Aminu Kano International Airport", "code": "KAN" },
        { "name": "Kaduna International Airport", "code": "KAD" },
        { "name": "Osubi Airport", "code": "OSH" },
        { "name": "Benin Airport", "code": "BNI" },
        { "name": "Yola Airport", "code": "YOL" },
        { "name": "Sule Lamido Airport", "code": "DNM" },
        { "name": "Makurdi Airport", "code": "MDI" },
        { "name": "Zaria Airport", "code": "ZAR" },
        { "name": "Ilorin International Airport", "code": "ILR" }
    ],
    },
    {
      country: "Saudi Arabia",
      airports: [
        { name: "King Abdulaziz International Airport", code: "JEDDAH" },
        { name: "Riyadh King Khalid International Airport", code: "RIYADH" },
      ],
    },
  ];


  const handleCountryChange = (type, country) => {
    if (type === "from") {
      setFromCountry(country);
      setFromAirport(null); // Reset the airport selection
    } else {
      setToCountry(country);
      setToAirport(null); // Reset the airport selection
    }
  };

  const getAirportsForCountry = (country) => {
    return (
      countriesWithAirports.find((c) => c.country === country)?.airports || []
    );
  };

  const handleFormSubmit = async () => {
    if (!name || !phoneNumber || !budget || !fromAirport || !toAirport) {
      Alert.alert("Error", "Please fill in all required fields.");
      return;
    }
  
    const payload = {
      travelType: selectedTrip,
      source: fromAirport, 
      destination: toAirport, 
      travelDate: date,
      returnDate:
      selectedTrip === "roundtrip" && returnDate
        ? returnDate.toISOString().split("T")[0]
        : null, // Include return date for round trips
        umrahDate:
        selectedTrip === "roundtrip" && returnDate
          ? returnDate.toISOString().split("T")[0]
          : null, // Include return date for round trips
      passengerCount: passengers,
      personType: selectedPerson,
      name,
      phoneNumber,
      budget: parseInt(budget, 10),
    };
  
    try {
      setLoading(true); 
      const response = await axios.post("https://704e-2401-4900-1cb1-1d47-58f2-365e-a9c1-7811.ngrok-free.app/api/hajjtrip", payload, {
        headers: { "Content-Type": "application/json" },
      });
      console.log(response);
  
      setLoading(false);
      Alert.alert("Success", "Hajj Trip created successfully!");
  
      // Delay the navigation to ensure the post is fully done.
      setTimeout(() => {
        navigation.navigate("HajjReservation");
      }, 500);  // Add a 500ms delay (optional)
      
    } catch (error) {
      setLoading(false);
      Alert.alert("Error", error.response?.data || "An error occurred. Please try again.");
    }
  };
  
  const tempSubmit=()=>{
    Alert.alert("Success", "Hajj Trip created successfully!");
    navigation.navigate("HajjReservation")
  }

  return (
    <SafeAreaView className="flex-1 bg-[#ffffff]">
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* Header */}
        <View className="flex-row items-center mb-6 mt-6">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={30} color="black" />
          </TouchableOpacity>
          <Text className="text-[20px] font-bold text-black ml-3">
          Create Hajj Trip
          </Text>
        </View>

        {/* Section Title */}
        <Text className="text-lg font-semibold text-gray-800 mb-3">
        What will I need to apply for Hajj Application?
        </Text>

        {/* Bullet Points */}
        <View className="space-y-2 mb-6">
          <Text className="text-base text-gray-700">• Passport And Photocopy</Text>
          <Text className="text-base text-gray-700">• Guarantor Recommendation</Text>
          <Text className="text-base text-gray-700">• Doctor Report</Text>
        </View>

        {/* Booking Type */}
        <Text className="text-lg font-semibold text-gray-800 mb-3">
          What do you want to book?
        </Text>

        <View className="flex-row space-x-8 mb-6">
          <View className="flex-row items-center">
            <RadioButton
              value="oneway"
              color="#1DC9A0"
              status={selectedTrip === "oneway" ? "checked" : "unchecked"}
              onPress={() => {
                setSelectedTrip("oneway");
                setReturnDate(null);
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
     <View className="bg-[#D1E7FF] p-4 rounded-xl mt-[-15]">
      <View className="flex-row justify-between">
        {/* Left Box with Top and Bottom Boxes */}
        <View className="w-[48%]">
          {/* From Box */}
       {/* From Box */}
<View className="bg-[#A1C6FF] h-17 mb-2 rounded-xl p-2">
  <Text className="text-[12px] text-gray-500">From:</Text>
  <RNPickerSelect
    onValueChange={(value) => handleCountryChange("from", value)}
    items={countriesWithAirports.map((item) => ({
      label: item.country,
      value: item.country,
    }))}
    placeholder={{ label: "Select Country", value: null }}
  />
  {fromCountry && (
    <RNPickerSelect
      onValueChange={setFromAirport}
      items={getAirportsForCountry(fromCountry).map((airport) => ({
        label: `${airport.name} (${airport.code})`,
        value: airport.code,
      }))}
      placeholder={{ label: "Select Airport", value: null }}
    />
  )}
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

        

        {/* <Text className="text-lg font-semibold text-gray-800 mb-3">Date:</Text>
          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            className="p-3 bg-[#A1C6FF] rounded-xl mb-4"
          >
            <Text className="text-gray-800">{date ? date.toLocaleDateString() : "Select Date"}</Text>
          </TouchableOpacity> */}

        {/* Right Box with Top and Bottom Boxes */}
        <View className="w-[48%]">
  {/* From Box */}
{/* To Box */}
<View className="bg-[#A1C6FF] h-17 mb-2 rounded-xl p-2">
  <Text className="text-[12px] text-gray-500">To:</Text>
  <RNPickerSelect
    onValueChange={(value) => handleCountryChange("to", value)}
    items={countriesWithAirports.map((item) => ({
      label: item.country,
      value: item.country,
    }))}
    placeholder={{ label: "Select Country", value: null }}
  />
  {toCountry && (
    <RNPickerSelect
      onValueChange={setToAirport}
      items={getAirportsForCountry(toCountry).map((airport) => ({
        label: `${airport.name} (${airport.code})`,
        value: airport.code,
      }))}
      placeholder={{ label: "Select Airport", value: null }}
    />
  )}
</View>
<View className="bg-[#A1C6FF] h-16 rounded-xl p-2">
  <Text className="text-[12px] text-gray-500">Passengers:</Text>
  <TouchableOpacity>
    <Picker
      selectedValue={passengerCount}
      onValueChange={(itemValue) => setPassengers(itemValue)}
      style={{ height: 50, width: 150 }} // Adjust style as needed
    >
      <Picker.Item label="1" value={1} />
      <Picker.Item label="2" value={2} />
      <Picker.Item label="3" value={3} />
      <Picker.Item label="4" value={4} />
      <Picker.Item label="5" value={5} />
    </Picker>
  </TouchableOpacity>
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

    {/* <TouchableOpacity
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
        </TouchableOpacity> */}

        {/* {attachmentsOpen && (
  <View className="space-y-0 mt-4">
  
    <View className="bg-white p-4 rounded-xl shadow-lg">
      <Text className="text-sm text-gray-600 mb-2">Passport Front</Text>
      <TouchableOpacity
        onPress={() => handleDocumentPick("passportFront")}
        className="border border-[#D1E7FF] rounded-xl py-3 bg-[#F6F6F6] mb-2"
      >
        <Text className="text-center text-gray-600">
          {passportFront ? "Passport Front Uploaded" : "Upload Passport Front"}
        </Text>
      </TouchableOpacity>
      {passportFront && (
        <View className="mt-2">
          <Text className="text-sm text-gray-500">Preview:</Text>
          <Image
            source={{ uri: `data:image/jpeg;base64,${passportFront}` }}
            style={{ width: 100, height: 100, borderRadius: 8 }}
          />
        </View>
      )}
    </View>

 
    <View className="bg-white p-4 rounded-xl shadow-lg">
      <Text className="text-sm text-gray-600 mb-2">Photocopy</Text>
      <TouchableOpacity
        onPress={() => handleDocumentPick("photocopy")}
        className="border border-[#D1E7FF] rounded-xl py-3 bg-[#F6F6F6] mb-2"
      >
        <Text className="text-center text-gray-600">
          {photocopy ? "Photocopy Uploaded" : "Upload Photocopy"}
        </Text>
      </TouchableOpacity>
      {photocopy && (
        <View className="mt-2">
          <Text className="text-sm text-gray-500">Preview:</Text>
          <Image
            source={{ uri: `data:image/jpeg;base64,${photocopy}` }}
            style={{ width: 100, height: 100, borderRadius: 8 }}
          />
        </View>
      )}
    </View>
  </View>
)} */}




<Text className="text-lg font-bold text-gray-800 mb-3 mt-4">Persons</Text>
<View className="flex-row space-x-6 mb-6">
  
          <View className="flex-row items-center">
            <RadioButton
              value="single"
              color="#1DC9A0"
              status={selectedPerson === "single" ? "checked" : "unchecked"}
              onPress={() => {
                setSelectedPerson("single");
              }}
            />
            <Text className="text-base text-gray-700">Single</Text>
          </View>

          <View className="flex-row items-center">
            <RadioButton
              value="family"
              color="#1DC9A0"
              status={selectedPerson === "family" ? "checked" : "unchecked"}
              onPress={() => setSelectedPerson("family")}
            />
            <Text className="text-base text-gray-700">With Family Or Multiple</Text>
          </View>
        </View>



        {/* Inputs */}
        <View>
          {/* Name */}
          <Text className="text-lg font-semibold text-gray-800 mb-3">Name:</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Enter your name"
            className="p-3 bg-[#f0f0f0] rounded-xl mb-4"
          />

          {/* Date */}
          <Text className="text-lg font-semibold text-gray-800 mb-3">Date:</Text>
          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            className="p-3 bg-[#A1C6FF] rounded-xl mb-4"
          >
            <Text className="text-gray-800">{date ? date.toLocaleDateString() : "Select Date"}</Text>
          </TouchableOpacity>

          {/* Phone Number */}
          <Text className="text-lg font-semibold text-gray-800 mb-3">Phone Number:</Text>
          <TextInput
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholder="Enter phone number"
            keyboardType="phone-pad"
            className="p-3 bg-[#f0f0f0] rounded-xl mb-4"
          />

          {/* Budget */}
          <Text className="text-lg font-semibold text-gray-800 mb-3">Budget:</Text>
          <TextInput
            value={budget}
            onChangeText={setBudget}
            placeholder="Enter budget"
            keyboardType="numeric"
            className="p-3 bg-[#f0f0f0] rounded-xl mb-6"
          />

          {/* Submit Button */}
          <ButtonBottom
            title={loading ? "Submitting..." : "Submit"}
            onPress={handleFormSubmit}
            disabled={loading}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HajjTrip;
