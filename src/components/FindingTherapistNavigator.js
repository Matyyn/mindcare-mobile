import React from "react";
import { TouchableOpacity } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FindingTherapist from "../screens/FindingTherapistScreens/FindingTherapist";
import TopDoctors from "../screens/FindingTherapistScreens/TopDoctors";
import DoctorDetails from "../screens/FindingTherapistScreens/DoctorDetails";
import Reviews from "../screens/FindingTherapistScreens/Reviews";
import BookAppointment from "../screens/FindingTherapistScreens/BookingAppointment";
import AppointmentReason from "../screens/FindingTherapistScreens/AppointmentReason";
import PaymentMethod from "../screens/FindingTherapistScreens/StripePaymentScreen";
import ReviewSummary from "../screens/FindingTherapistScreens/ReviewSummary";
import CongratulationsScreen from "../screens/FindingTherapistScreens/CongratulationsScreen";
import Sessions from "./SessionsTabNavigator";
import PaymentConfirmation from "../screens/FindingTherapistScreens/PaymentConfirmation";
import PaymentHistory from "../screens/FindingTherapistScreens/PaymentHistory";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Stack = createNativeStackNavigator();
const Navigation = () => {
  const navigation = useNavigation();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Finding Therapist"
        component={FindingTherapist}
        //options={{ headerShown: false }}
        options={{
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Payment History")}
            >
              <FontAwesome5
                name="file-invoice-dollar"
                size={26}
                style={{ marginRight: 10 }}
                color="black"
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="Top Therapists"
        component={TopDoctors}
        //options={{ headerShown: false }}
        options={{
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Payment History")}
            >
              <FontAwesome5
                name="file-invoice-dollar"
                size={26}
                style={{ marginRight: 10 }}
                color="black"
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="Doctor Details"
        component={DoctorDetails}
        //options={{ headerShown: false }}
        options={{
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Payment History")}
            >
              <FontAwesome5
                name="file-invoice-dollar"
                size={26}
                style={{ marginRight: 10 }}
                color="black"
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="Reviews"
        component={Reviews}
        //options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Booking Appointment"
        component={BookAppointment}
        //options={{ headerShown: false }}
        options={{
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Payment History")}
            >
              <FontAwesome5
                name="file-invoice-dollar"
                size={26}
                style={{ marginRight: 10 }}
                color="black"
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="Appointment Reason"
        component={AppointmentReason}
        //options={{headerShown:false}}
        options={{
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Payment History")}
            >
              <FontAwesome5
                name="file-invoice-dollar"
                size={26}
                style={{ marginRight: 10 }}
                color="black"
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="Payment Method"
        component={PaymentMethod}
        options={{
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Payment History")}
            >
              <FontAwesome5
                name="file-invoice-dollar"
                size={26}
                style={{ marginRight: 10 }}
                color="black"
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="Review Summary"
        component={ReviewSummary}
        //options={{headerShown:false}}
        options={{
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Payment History")}
            >
              <FontAwesome5
                name="file-invoice-dollar"
                size={26}
                style={{ marginRight: 10 }}
                color="black"
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="Payment Confirmation"
        component={PaymentConfirmation}
        //options={{headerShown:false}}
        options={{
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Payment History")}
            >
              <FontAwesome5
                name="file-invoice-dollar"
                size={26}
                style={{ marginRight: 10 }}
                color="black"
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="Congratulations"
        component={CongratulationsScreen}
        //options={{headerShown:false}}
      />
      <Stack.Screen
        name="Sessions"
        component={Sessions}
        //options={{headerShown:false}}
      />
      <Stack.Screen name="Payment History" component={PaymentHistory} />
    </Stack.Navigator>
  );
};

export default Navigation;
