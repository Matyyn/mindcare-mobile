import React, { useState, useEffect } from "react";
import {
  ToastAndroid,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import useStore from "../zustand/store";
import axios from "axios";
import Icon from "react-native-vector-icons/Entypo";
import { trackEvent } from "@aptabase/react-native";

const PaymentList = () => {
  const { responseData } = useStore();
  const [payments, setPayments] = useState();
  useEffect(() => {
    trackEvent("Payment History");
    async function fetchData() {
      try {
        const response = await axios.get(
          `/payments-clients/${responseData._id}`
        );
        console.log(response.data.data);
        setPayments(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await axios.get(`/payments-clients/${responseData._id}`);
      setPayments(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      // await axios.delete(`/payments/${id}`);
      // fetchPayments();
      ToastAndroid.show("One Payment Record is Deleted!", ToastAndroid.BOTTOM);
    } catch (error) {
      console.error("Error deleting payment:", error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.infoContainer}>
        <Text style={styles.text}>
          Therapist Name: {item.therapistId.firstName}{" "}
          {item.therapistId.lastName}
        </Text>
        <Text style={styles.text}>
          Client Name: {responseData.firstName} {responseData.lastName}
        </Text>
        <Text style={styles.title}>Amount Paid: ${item.sessionCharges}</Text>
      </View>
      <TouchableOpacity onPress={() => handleDelete(item._id)}>
        {/* <View style={styles.deleteButton}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </View> */}
        <Icon name="trash" size={25} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={payments}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  card: {
    backgroundColor: "white",
    elevation: 3,
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  infoContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  text: {
    fontSize: 18,
    color: "#333", // Darker text color
    marginBottom: 4,
  },
  deleteButton: {
    backgroundColor: "red",
    padding: 8,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  deleteButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default PaymentList;
