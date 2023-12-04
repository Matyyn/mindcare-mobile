import React, { useEffect } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
} from "react-native";
import { Card } from "react-native-paper";
import useStore from "../zustand/store";
import { useNavigation } from "@react-navigation/native";
import { trackEvent } from "@aptabase/react-native";

export default function App() {
  useEffect(() => {
    trackEvent("Therapist Review Summary");
  }, []);
  const values = useStore((state) => state.selectedItem);
  const {
    responseData,
    selectedAppointmentDate,
    selectedAppointmentTimeIndex,
  } = useStore();

  const sessionDetails = {
    firstName: responseData.firstName,
    lastName: responseData.lastName,
    gender: "Male",
    sessionDate: selectedAppointmentDate,
    sessionTime: selectedAppointmentTimeIndex,
    charges: values.sessionCharges / 100,
    cardNumber: "**** **** **** 1234",
  };
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <Card style={{ margin: 10, padding: 10 }}>
        <View style={{ flexDirection: "row" }}>
          <View>
            <Image
              source={{
                uri: values.picture,
              }}
              style={{
                width: 80,
                height: 80,
                marginRight: 15,
                borderRadius: 25,
              }}
            />
          </View>
          <View>
            <Text style={{ fontWeight: "700", fontSize: 22 }}>
              Dr.{values.firstName} {values.lastName}
            </Text>
            <Text style={{ fontWeight: "500", fontSize: 18 }}>
              Specialization: {values.specialization}
            </Text>
            <Text style={{ fontWeight: "500", fontSize: 18 }}>
              Experience: {values.experience}
            </Text>
            <Text style={{ fontWeight: "500", fontSize: 18 }}>
              Session Charges: {values.sessionCharges}
            </Text>
          </View>
        </View>
      </Card>

      <Card style={{ margin: 10, padding: 15 }}>
        <View style={styles.card}>
          <View style={styles.detailsRow}>
            <Text style={styles.label}>First Name:</Text>
            <Text style={styles.value}>{sessionDetails.firstName}</Text>
          </View>
          <View style={styles.detailsRow}>
            <Text style={styles.label}>Last Name:</Text>
            <Text style={styles.value}>{sessionDetails.lastName}</Text>
          </View>
          <View style={styles.detailsRow}>
            <Text style={styles.label}>Gender:</Text>
            <Text style={styles.value}>{sessionDetails.gender}</Text>
          </View>
          <View style={styles.detailsRow}>
            <Text style={styles.label}>Session Date:</Text>
            <Text style={styles.value}>{sessionDetails.sessionDate}</Text>
          </View>
          <View style={styles.detailsRow}>
            <Text style={styles.label}>Session Time:</Text>
            <Text style={styles.value}>{sessionDetails.sessionTime}</Text>
          </View>
          <View style={styles.detailsRow}>
            <Text style={styles.label}>Charges of Session:</Text>
            <Text style={styles.value}>$ {sessionDetails.charges} </Text>
          </View>
          <View style={styles.detailsRow}>
            <Text style={styles.label}>Card Number:</Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.value}>{sessionDetails.cardNumber}</Text>
            {/* <TouchableOpacity style={{ fontWeight: '700', alignSelf: 'flex-end' }} onPress={navigation.navigate('Payment Method')}>
              <Text style={{ color: 'red',fontSize:18 }}>Change</Text>
            </TouchableOpacity> */}
          </View>
        </View>
      </Card>

      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Congratulations");
          }}
          style={{
            textAlign: "center",
            alignItems: "center",
            backgroundColor: "#2D3748",
            paddingVertical: 16,
            marginTop: 10,
            width: "95%",
            borderRadius: 8,
          }}
        >
          <Text style={{ fontSize: 22, fontWeight: "700", color: "white" }}>
            Book Appointment
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    elevation: 3,
  },
  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  label: {
    fontWeight: "600",
    marginRight: 10,
    fontSize: 18,
  },
  value: {
    fontSize: 18,
    alignSelf: "flex-start",
  },
});
