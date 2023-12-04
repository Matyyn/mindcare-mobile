import React, { useEffect } from "react";
import {
  Linking,
  TouchableOpacity,
  ToastAndroid,
  View,
  Text,
  Image,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import useStore from "../zustand/store";
import axios from "axios";
import { trackEvent } from "@aptabase/react-native";

const CongratulationsScreen = () => {
  useEffect(() => {
    trackEvent("Payment Confirmation");
  }, []);
  const {
    selectedItem,
    paymentId,
    paymentLink,
    setPaymentLink,
    problemDescription,
    responseData,
    selectedAppointmentDate,
    selectedAppointmentTimeIndex,
  } = useStore();
  //console.log('pay link',paymentLink)
  function convertToTimestamp(timeStr) {
    const [hours, minutes] = timeStr.split(":");
    const timestamp = (parseInt(hours) * 60 + parseInt(minutes)) * 60 * 1000; // Convert to milliseconds
    return timestamp;
  }

  //   function timestampToTime(timestamp, timezoneOffsetMinutes) {
  //     const date = new Date(timestamp + timezoneOffsetMinutes * 60000); // Adjust for the timezone offset
  //     const hours = String(date.getUTCHours()).padStart(2, '0'); // Use getUTCHours() to get UTC hours
  //     const minutes = String(date.getUTCMinutes()).padStart(2, '0'); // Use getUTCMinutes() to get UTC minutes
  //     return `${hours}:${minutes}`;
  //   }

  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.centerContent}>
        <Image
          source={{
            uri: "data:image/png;base64,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",
          }}
          style={styles.image}
        />
        <Text style={styles.congratsText}>
          "Seamless and secure: Our Stripe-powered payment process redefines the
          way you pay, putting speed and safety at the forefront."
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <Text style={{ fontSize: 20, fontWeight: 700, marginBottom: 20 }}>
          Total Amount: $ {selectedItem.sessionCharges / 100}
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={async () => {
            //console.log('id',paymentId)
            const paymentResponse = await axios.get(
              `/payments-confirm/${paymentId}`
            );
            //console.log('pr',paymentResponse.data.data)
            if (paymentLink === "") {
              ToastAndroid.show(
                "Payment is already Confirmed",
                ToastAndroid.LONG
              );
              navigation.navigate("Sessions");
            } else {
              if (paymentResponse.data.data == "paid") {
                ToastAndroid.show(
                  "Appoinment Booked Successfully",
                  ToastAndroid.LONG
                );
                const response = await axios.post("/appointments", {
                  therapistId: selectedItem._id,
                  clientId: responseData._id,
                  appointmentCharges:
                    parseInt(selectedItem.sessionCharges) / 100,
                  appointmentDate: selectedAppointmentDate,
                  appointmentTime: convertToTimestamp(
                    selectedAppointmentTimeIndex
                  ),
                  problemDescription: problemDescription,
                  status: "pending",
                });
                //console.log(response.data.data);
                const responsePayment = await axios.post("/payments-save", {
                  clientId: response.data.data.clientId,
                  therapistId: response.data.data.therapistId,
                  sessionCharges: response.data.data.appointmentCharges,
                  currency: "USD",
                  paymentDate: Date.now(),
                  appointmentId: response.data.data._id,
                });
                setPaymentLink("");
                console.log(selectedItem._id);
                const notificationResponse = await axios.post(
                  `https://mind-care-backend-7dd9b4794b38.herokuapp.com/api/v1/therapist/notification/${selectedItem._id}`,
                  {
                    clientId: responseData._id,
                    therapistId: selectedItem._id,
                    notificationTitle: "Appointment Booked",
                    notificationBody: `Appointment Booked by ${responseData.firstName} ${responseData.lastName}`,
                    notificationTime: Date.now(),
                  }
                );
                console.log(notificationResponse);
                navigation.navigate("Congratulations");
              } else {
                ToastAndroid.show(
                  "Appointment Booking Failed, Please try again",
                  ToastAndroid.LONG
                );
                navigation.navigate("Finding Therapist");
              }
            }
          }}
        >
          <Text style={styles.buttonText}>Payment Confirmation</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  centerContent: {
    alignItems: "center",
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 50,
    resizeMode: "contain",
  },
  congratsText: {
    fontSize: 20,
    fontWeight: 500,
    marginTop: 10,
    marginBottom: 20,
    textAlign: "center",
  },
  buttonContainer: {
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  button: {
    backgroundColor: "green",
    paddingVertical: 16,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 22,
    fontWeight: "700",
    color: "white",
    textAlign: "center",
  },
});

export default CongratulationsScreen;
