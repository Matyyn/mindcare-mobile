import React, { useState } from "react";
import {
  ToastAndroid,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import color from "../../../constants/colors";

import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import axios from "axios";
import useStore from "../../zustand/store";

const CompleteJournalScreen = ({ navigation }) => {
  const { isDPEValue, setDPEData, responseData } = useStore();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Completion",
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.navigate("Daily Tasks")}>
          <Ionicons
            name="close"
            size={30}
            color="black"
            style={{ marginRight: 10 }}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const handleSubmit = async () => {
    const data = {
      createdAt: Date.now(),
      completed: true,
    };
    const response = await axios.post(
      `/breathing-excercise/${responseData._id}`,
      data,
    );
    //console.log(response.data.data);
    setDPEData(data);
    ToastAndroid.show("Deep Breathing Exercises Completed", ToastAndroid.LONG);
    navigation.navigate("Daily Tasks");
  };
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Well Done 🎉</Text>
      <Text style={styles.subHeading}>
        Setting your goals daily centers your focus and increase your
        productivity. Come back tomorrow morning!
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Complete</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  closeIcon: {
    marginRight: 10,
  },
  heading: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subHeading: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: 600,
    marginBottom: 20,
  },
  button: {
    backgroundColor: color.grey,
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    width: "90%",
    marginTop: 20,
    marginBottom: 30,
  },
  buttonText: {
    color: "white",
    fontFamily: "Inter_700Bold",
    fontSize: 20,
  },
});

export default CompleteJournalScreen;
