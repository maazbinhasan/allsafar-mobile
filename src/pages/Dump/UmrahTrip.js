import React, { useState } from "react";
import RNPickerSelect from "react-native-picker-select";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { RadioButton } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import ButtonBottom from "../../../../components/ButtonBottom";
import * as DocumentPicker from 'expo-document-picker';



const UmrahTrip = () => {
  const [selectedTrip, setSelectedTrip] = useState("oneway");
  const [fromCountry, setFromCountry] = useState(null);
  const [toCountry, setToCountry] = useState(null);
  const [fromAirport, setFromAirport] = useState(null);
  const [date, setDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showReturnDatePicker, setShowReturnDatePicker] = useState(false);
  const [passengers, setPassengers] = useState(1);
  const [attachmentsOpen, setAttachmentsOpen] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState("single");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [airports, setAirports] = useState([]);
  const [selectedAirport, setSelectedAirport] = useState(null);
  const [toAirport, setToAirport] = useState(null);
  const [passportFront, setPassportFront] = useState(null); // State for passport front
  const [photocopy, setPhotocopy] = useState(null); // State for photocopy



  // Form Fields
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [budget, setBudget] = useState("");

  // Loading State
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const countriesWithAirports = [
    {
      country: "Nigeria",
      airports: [
        { name: "Mallam Aminu Kano International Airport", code: "KANO" },
        { name: "Murtala Muhammed International Airport", code: "MURTALA" },
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
  const handleDocumentPick = async (type) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "image/*", // Restrict to image files
        copyToCacheDirectory: true,
      });
  
      if (result.hasOwnProperty('uri')) { // Check if there's a selected file
        const file = {
          uri: result.uri,
          name: result.name || `${type}.jpg`,
          type: result.mimeType || "image/jpeg",
        };
  
        if (type === "passportFront") {
          setPassportFront(file);
        } else if (type === "photocopy") {
          setPhotocopy(file);
        }
      } else {
        Alert.alert("Error", "No document selected.");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to pick document. Please try again.");
      console.error(error);
    }
  };
  
  
  

  const handleFormSubmit = async () => {
    // Basic validation
    if (!name) console.log("Name is missing");
    if (!phoneNumber) console.log("Phone number is missing");
    if (!budget) console.log("Budget is missing");
    if (!fromAirport) console.log("From Airport is missing");
    if (!toAirport) console.log("To Airport is missing");

  
    if (!name || !phoneNumber || !budget || !fromAirport || !toAirport) {
      console.log(result);
      Alert.alert("Error", "Please fill in all required fields.");
      return;
    }

   
  const formData = new FormData();

  // Append form fields
  formData.append("travelType", selectedTrip);
  formData.append("source", fromAirport); // Dynamic source airport code
  formData.append("destination", toAirport); // Dynamic destination airport code
  formData.append("travelDate", date.toISOString().split("T")[0]); // Format date to YYYY-MM-DD
  formData.append(
    "returnDate",
    selectedTrip === "roundtrip" && returnDate
      ? returnDate.toISOString().split("T")[0]
      : null
  ); // Include return date for round trips
  formData.append("passengerCount", passengers);
  formData.append("personType", selectedPerson);
  formData.append("name", name);
  formData.append("phoneNumber", phoneNumber);
  formData.append("budget", parseInt(budget, 10));


console.log(formData);

    try {
      setLoading(true); // Start loading
      const response = await axios.post("https://09c2-2401-4900-1cb0-1959-c410-fc4d-a4f8-d06f.ngrok-free.app/api/umrahtrip", formData, {
        headers: { "Content-Type": "application/json" },
      });
console.log(response);
      setLoading(false); // Stop loading
      Alert.alert("Success", "Umrah Trip created successfully!");
      navigation.navigate("RequestedSubmitted");
    } catch (error) {
      setLoading(false);
      Alert.alert("Error", error.response?.data || "An error occurred. Please try again.");
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
          <Text className="text-[20px] font-bold text-black ml-3">Create Umrah Trip</Text>
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
            <TouchableOpacity onPress={() => console.log("Show Date Picker")}>
              <Text className="text-sm">
                {date ? date.toLocaleDateString() : "Select Date"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

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

</View>

      </View>

      {/* Conditionally render Return Date for Round Trip */}
      {selectedTrip === "roundtrip" && (
        <View className="mt-4 bg-[#A1C6FF] h-16 rounded-xl p-2">
          <Text className="text-[12px] text-gray-500">Return Date:</Text>
          <TouchableOpacity
            onPress={() => console.log("Show Return Date Picker")}
          >
            <Text className="text-sm">
              {returnDate
                ? returnDate.toLocaleDateString()
                : "Select Return Date"}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>

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

    {/* Photocopy */}
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
)}

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

export default UmrahTrip;