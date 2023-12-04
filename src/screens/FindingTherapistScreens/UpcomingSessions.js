import React, { useEffect, useState } from "react";
import useStore from "../zustand/store";
import { useNavigation } from "@react-navigation/native";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  View,
} from "react-native";
import axios from "axios";
import Icon from "react-native-vector-icons/Entypo";
import Icons from "react-native-vector-icons/Feather";
import { trackEvent } from "@aptabase/react-native";

const TextInputExample = () => {
  const navigation = useNavigation();
  const { responseData } = useStore();
  const [appointments, setAppointments] = useState();
  useEffect(() => {
    trackEvent("Upcoming Sessions");
    async function gettingAppointment() {
      try {
        const response = await axios.get(
          `/appointments-client/${responseData._id}`
        );
        const approvedAppointments = response.data.data.filter(
          (appointment) => appointment.status === "Approved"
        );

        console.log("Approved Appointments:", approvedAppointments);
        setAppointments(approvedAppointments);
      } catch (err) {
        console.log(err);
      }
    }
    gettingAppointment();
  }, []);

  const Item = ({ item, onCallPress, onChatPress }) => (
    <View style={styles.card}>
      <View style={styles.leftContainer}>
        <Image
          source={{ uri: item.therapistId.picture }}
          style={styles.cardImage}
        />
      </View>
      <View style={styles.rightContainer}>
        <Text style={styles.cardTitle}>
          Dr. {item.therapistId.firstName} {item.therapistId.lastName}
        </Text>
        <Text style={styles.cardSubtitle}>
          Date: {item.appointmentDate.split("T")[0]}
        </Text>
        <Text style={styles.cardSubtitle}>
          Time: {item.appointmentTime.split("T")[1]}
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Call")}
            style={{ marginRight: 20 }}
          >
            <Icons name="phone-call" size={25} color="green" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onChatPress(item)}>
            {/* <Text style={styles.buttonText}>Chat</Text> */}
            <Icon
              name="chat"
              size={25}
              color="black"
              onPress={() => {
                navigation.navigate("Chat", { item });
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderItem = ({ item }) => {
    //if (item.status === 'pending') {
    return (
      <Item
        item={item}
        // onPress={() => {
        //   navigation.navigate('Doctor Details');
        //   setSelectedId(item.id);
        //   setSelectedItem(item);
        // }}
        //backgroundColor={backgroundColor}
        //textColor={color}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={appointments}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        style={styles.flatList}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  input: {
    height: 40,
    marginVertical: 12,
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
  },
  heading: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 22,
    fontWeight: 700,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    elevation: 3,
    marginBottom: 20,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  leftContainer: {
    marginRight: 16,
  },
  rightContainer: {
    flex: 1,
  },
  cardImage: {
    width: 80,
    height: 80,
    alignSelf: "center",
    borderRadius: 20,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  cardSubtitle: {
    fontSize: 18,
  },
  cardText: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  callButton: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  chatButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  flatList: {
    marginLeft: "4%",
  },
});

export default TextInputExample;
