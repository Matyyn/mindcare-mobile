import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import useStore from "../zustand/store";
import { useNavigation } from "@react-navigation/native";
import { Card } from "react-native-paper";

const ProfileScreen = () => {
  const navigation = useNavigation();
  
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title:'Therapist Details',      
    });
  }, [navigation]);
  const { selectedItem } = useStore();
  return (
    <ScrollView style={styles.container}>
    <Card style={{padding:10,borderRadius:10}}>
      <Text style={styles.name}>Therapist Profile</Text>
      <View style={styles.header}>
        <Image
          source={{ uri: selectedItem.picture }}
          style={styles.profileImage}
        />
        <Text style={{ fontSize: 22, fontWeight: 700 ,marginTop:10}}>
          {selectedItem.firstName} {selectedItem.lastName}
        </Text>
      </View>

      <View style={styles.professionalDetails}>
        <Text style={styles.detailsHeading}>Professional Details: </Text>
        <View style={styles.detailRow}>
          <Text style={styles.detailSubHeading}>Specialization:</Text>
          <Text style={styles.detailText}>{selectedItem.specialization}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailSubHeading}>Experience:</Text>
          <Text style={styles.detailText}>{selectedItem.experience} Years</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailSubHeading}>Charges/Session:</Text>
          <Text style={styles.detailText}>$ {selectedItem.sessionCharges/100} </Text>
        </View>
      </View>
      <View style={styles.workingTime}>
        <Text style={styles.detailSubHeading}>Working Time: </Text>
        <Text style={styles.detailText}>{selectedItem.dateOfAvailability}</Text>
      </View>
      <TouchableOpacity
        style={styles.reviewsTouchable}
        onPress={() => {
          navigation.navigate("Reviews");
        }}
      >
        <View style={styles.reviews}>
          <View style={styles.reviewsHeader}>
            <Text style={styles.reviewsHeading}>Reviews</Text>
            <TouchableOpacity
              style={styles.seeAllButton}
              onPress={() => {
                navigation.navigate("Reviews");
              }}
            >
              <Text style={styles.seeAllButtonText}>See All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.reviewItem}>
            <Text style={styles.reviewText}>
              "Great therapist! Highly recommended."
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      
        <TouchableOpacity style={styles.bookAppointmentButton} onPress={()=>{
            navigation.navigate('Booking Appointment')
        }}>
          <Text style={styles.bookAppointmentText}>Book Appointment</Text>
        </TouchableOpacity>    
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 8,
  },
  name: {
    fontSize: 22,
    fontWeight: 700,
    marginBottom: 40,
  },
  professionalDetails: {
    marginBottom: 16,
  },
  detailsHeading: {
    fontSize: 22,
    fontWeight: 700,
    marginBottom: 14,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  detailSubHeading: {
    fontWeight: "700",
    marginRight: 4,
    fontSize: 18,
  },
  detailText: {
    flex: 1,
    fontSize: 18,
  },
  workingTime: {
    marginBottom: 16,
    flexDirection: "row",
  },
  reviewsTouchable: {
    flex: 1,
  },
  reviews: {
    marginBottom: 16,
  },
  reviewText:{
    fontSize:18
  }
  ,
  reviewsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  reviewsHeading: {
    fontSize: 22,
    fontWeight: "bold",
  },
  seeAllButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  seeAllButtonText: {
    color: "blue",
    fontWeight: "bold",
    fontSize: 18,
  },
  reviewItem: {
    backgroundColor: "#f5f5f5",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  bookAppointmentButton: {
    backgroundColor: "#2D3748",
    alignItems: "center",
    paddingVertical: 16,
    borderRadius: 8,
  },
  bookAppointmentText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 22,
  },
});

export default ProfileScreen;
