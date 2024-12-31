import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import Button from "../../components/Button"; // Reusing Button component
import DateTimePickerModal from "react-native-modal-datetime-picker"; // For Date of Birth input
import axiosInstance from "../../utils/axiosInstance";

const Signup = ({ navigation }) => {
  // State for password visibility and form inputs
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");
  const [dob, setDob] = useState("");
  const [mobile, setMobile] = useState("");

  // State for error messages
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    reEnterPassword: "",
    dob: "",
    mobile: "",
  });

  // Handle date selection
  const handleDateConfirm = (date) => {
    const formattedDate = new Intl.DateTimeFormat("en-US").format(date);
    setDob(formattedDate);
    setDatePickerVisible(false);
  };

  // Handle visibility toggle for password
  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  // Email Validation Function
  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Handle form submission
  const handleSubmit = async () => {
    let valid = true;
    let newErrors = {};
  
    // Validate all fields
    if (!name) {
      valid = false;
      newErrors.name = "Name is required";
    }
    if (!email || !isValidEmail(email)) {
      valid = false;
      newErrors.email = "Enter a valid email address";
    }
    if (!password || password.length < 8) {
      valid = false;
      newErrors.password = "Password must be at least 8 characters";
    }
    if (password !== reEnterPassword) {
      valid = false;
      newErrors.reEnterPassword = "Passwords do not match";
    }
    if (!dob) {
      valid = false;
      newErrors.dob = "Date of Birth is required";
    }
    if (!mobile) {
      valid = false;
      newErrors.mobile = "Mobile number is required";
    }
  
    // If form is valid, proceed with submission
    if (valid) {
      try {
        const payload = {
          name,
          email,
          password,
          dob,
          mobile,
        };
  
        const response = await axiosInstance.post("/account/onsignup", payload, {
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        if (response.status === 200) {
          // console.log("User signed up successfully", response.data);
          Alert.alert("Test Alert", "This is a test alert");

          // Redirect to Sign In page
     
          navigation.navigate("SignIn");
          Alert.alert('User created successfully!')
        } else {
          // Handle API error response
          console.log("Error during signup", response.data);
          setErrors({ ...newErrors, serverError: "Signup failed. Please try again." });
        }
      } catch (error) {
        console.error("Error during signup:", error);
        setErrors({ ...newErrors, serverError: "An error occurred. Please try again later." });
      }
    } else {
      setErrors(newErrors);
    }
  };
  

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      <View className="flex-1 p-6">
        <StatusBar style="dark" backgroundColor="#4CA6FE" />

        {/* Top Left Logo */}
        <View className="absolute top-6 left-6">
          <Image
            source={require("../../assets/logo.png")} // Your logo path
            className="w-32 h-32"
            resizeMode="contain"
          />
        </View>

        {/* Form Fields */}
        <View className="mt-28">
          {/* Name Input */}
          <Text className="text-[14px] font-semibold mb-2">Name</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Enter your name"
            className={`border p-3 mb-2 rounded-lg ${
              errors.name ? "border-red-500" : "border-gray-200"
            }`}
          />
          {errors.name && (
            <Text className="text-red-500 text-xs mb-2">{errors.name}</Text>
          )}

          {/* Email Input */}
          <Text className="text-[14px] font-semibold mb-2">Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            className={`border p-3 mb-2 rounded-lg ${
              errors.email ? "border-red-500" : "border-gray-200"
            }`}
            keyboardType="email-address"
          />
          {errors.email && (
            <Text className="text-red-500 text-xs mb-2">{errors.email}</Text>
          )}

          {/* Password Input */}
          <Text className="text-[14px] font-semibold mb-2">Password</Text>
          <View className="relative">
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              secureTextEntry={!isPasswordVisible}
              className={`border p-3 mb-2 rounded-lg ${
                errors.password ? "border-red-500" : "border-gray-200"
              }`}
            />
            <TouchableOpacity
              onPress={togglePasswordVisibility}
              className="absolute right-4 top-1/4 transform -translate-y-1/2"
            >
              <Text className="text-gray-500">
                {isPasswordVisible ? "Hide" : "Show"}
              </Text>
            </TouchableOpacity>
          </View>
          {errors.password && (
            <Text className="text-red-500 text-xs mb-2">{errors.password}</Text>
          )}

          {/* Re-enter Password Input */}
          <Text className="text-[14px] font-semibold mb-2">
            Re-enter Password
          </Text>
          <TextInput
            value={reEnterPassword}
            onChangeText={setReEnterPassword}
            placeholder="Re-enter your password"
            secureTextEntry={!isPasswordVisible}
            className={`border p-3 mb-2 rounded-lg ${
              errors.reEnterPassword ? "border-red-500" : "border-gray-200"
            }`}
          />
          {errors.reEnterPassword && (
            <Text className="text-red-500 text-xs mb-2">
              {errors.reEnterPassword}
            </Text>
          )}

          {/* Date of Birth Input */}
          <View>
            <Text className="text-[14px] font-semibold mb-2">
              Date of Birth
            </Text>
            <TouchableOpacity
              onPress={() => setDatePickerVisible(true)}
              className={`border p-3 mb-2 rounded-lg ${
                errors.dob ? "border-red-500" : "border-gray-200"
              }`}
              activeOpacity={0.8}
            >
              <Text className={dob ? "text-black" : "text-gray-400"}>
                {dob || "Select your date of birth"}
              </Text>
            </TouchableOpacity>

            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleDateConfirm}
              onCancel={() => setDatePickerVisible(false)}
            />

            {errors.dob && (
              <Text className="text-red-500 text-xs mt-1">{errors.dob}</Text>
            )}
          </View>

          {/* Mobile Number Input */}
          <Text className="text-[14px] font-semibold mb-2">Mobile Number</Text>
          <TextInput
            value={mobile}
            onChangeText={setMobile}
            placeholder="Enter your mobile number"
            className={`border p-3 mb-4 rounded-lg ${
              errors.mobile ? "border-red-500" : "border-gray-200"
            }`}
            keyboardType="phone-pad"
          />
          {errors.mobile && (
            <Text className="text-red-500 text-xs mb-2">{errors.mobile}</Text>
          )}

          {/* Sign Up Button */}
          <Button title="Sign Up" onPress={handleSubmit} style="mb-4 py-2" />

          {/* OR Separator */}
          <View className="flex-row items-center justify-center mb-4">
            <View className="flex-1 border-t border-gray-300"></View>
            <Text className="mx-4 text-gray-500">or</Text>
            <View className="flex-1 border-t border-gray-300"></View>
          </View>

          {/* Sign Up with Google Button */}
          <TouchableOpacity
            className="bg-white border border-gray-200 py-3 px-24 rounded-lg mb-8"
            onPress={() => console.log("Sign up with Google")}
          >
            <Text className="text-gray-700 text-sm font-bold">
              Signup with Google
            </Text>
          </TouchableOpacity>

          {/* Sign In Link */}
          <View className="flex-row justify-center">
            <Text className="text-gray-600 mr-1">Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
              <Text className="text-[#4CA6FE]">Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Signup;
