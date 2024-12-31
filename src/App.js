import React from "react";
import { ActivityIndicator, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useFonts } from "expo-font";
import Welcome from "./pages/welcome";

//auth
import Signup from "./pages/auth/signup";
import SignIn from "./pages/auth/signin";
import ForgotPass from "./pages/auth/ForgotPass/ForgotPass"
import ForgotCode from "./pages/auth/ForgotPass/ForgotCode"
import ResetPass from "./pages/auth/ForgotPass/ResetPass"


//Home
import Home from "./pages/home/home";
import UmrahTrip from "./pages/home/trips/UmrahTrip/UmrahTrip"
import RequestedSubmitted from "./pages/home/trips/UmrahTrip/RequestSubmitted"
import HajjTrip from "./pages/home/trips/HajjTrip/HajjTrip"
import HajjReservation from "./pages/home/trips/HajjTrip/HajjReservation"
import CreatePackage from "./pages/home/CreatePackage"
import Packages from "./pages/home/Packages"



//Trips
import MyTripsHajj from "./pages/Trips/HajjComponents/MyTripsHajj";
import HajjTripPage from "./pages/Trips/HajjComponents/HajjTripPage";
import VisaDetails from "./pages/Trips/HajjComponents/VisaDetails";
import PaymentDetails from "./pages/Trips/HajjComponents/PaymentDetails";
import PaymentDetailsConfirmation from "./pages/Trips/HajjComponents/PaymentDetailsConfirmation";

import DoctorReport from "./pages/Trips/HajjComponents/DoctorReport"
import GuarantorDocs from "./pages/Trips/HajjComponents/GuarantorDocs"
import MyUmrahTrip from "./pages/Trips/UmrahComponents/MyUmrahTrip"
import UmrahTripPage from "./pages/Trips/UmrahComponents/UmrahTripPage"
import AgentRequests from "./pages/Trips/UmrahComponents/AgentRequests"


//account
import EditProfile from "./pages/account/EditAccountDetails/EditProfile"
import FamilyMember from "./pages/account/EditAccountDetails/FamilyMember"
import AddNewMember from "./pages/account/EditAccountDetails/AddNewMember"
import Attachments from "./pages/account/Attachments/Attachment";
import AttachmentsIn from "./pages/account/Attachments/AttachmentIn";


import UploadImageComponent from "./pages/home/trips/UmrahTrip/umrahTrips";


const Stack = createStackNavigator();

export default function App() {
  // Load fonts
  const [fontsLoaded] = useFonts({
    Metropolis: require("../assets/fonts/Metropolis-Regular.otf"),
    "Metropolis-Bold": require("../assets/fonts/Metropolis-Bold.otf"),
  });

  if (!fontsLoaded) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#4DA5FC" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="ForgotPass" component={ForgotPass} />
        <Stack.Screen name="ForgotCode" component={ForgotCode} />
        <Stack.Screen name="ResetPass" component={ResetPass} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Packages" component={Packages} />
        <Stack.Screen name="CreatePackage" component={CreatePackage} />
        <Stack.Screen name="UmrahTrip" component={UmrahTrip} /> 
        <Stack.Screen name="RequestedSubmitted" component={RequestedSubmitted} />
        <Stack.Screen name="HajjTrip" component={HajjTrip} /> 
        <Stack.Screen name="HajjReservation" component={HajjReservation} /> 
        <Stack.Screen name="MyTripsHajj" component={MyTripsHajj}/>
        <Stack.Screen name="HajjTripPage" component={HajjTripPage}/>
        <Stack.Screen name="VisaDetails" component={VisaDetails}/>
        <Stack.Screen name="PaymentDetails" component={PaymentDetails}/>
        <Stack.Screen name="DoctorReport" component={DoctorReport}/>
        <Stack.Screen name="GuarantorDocs" component={GuarantorDocs}/>
        <Stack.Screen name="MyUmrahTrip" component={MyUmrahTrip}/>
        <Stack.Screen name="EditProfile" component={EditProfile}/>
        <Stack.Screen name="FamilyMember" component={FamilyMember}/>
        <Stack.Screen name="AddNewMember" component={AddNewMember}/>
        <Stack.Screen name="Attachments" component={Attachments} />
        <Stack.Screen name="AttachmentsIn" component={AttachmentsIn} />

        <Stack.Screen name="PaymentDetailsConfirmation" component={PaymentDetailsConfirmation}/>
        <Stack.Screen name="UmrahTripPage" component={UmrahTripPage}/>
        <Stack.Screen name="AgentRequests" component={AgentRequests}/>

        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
