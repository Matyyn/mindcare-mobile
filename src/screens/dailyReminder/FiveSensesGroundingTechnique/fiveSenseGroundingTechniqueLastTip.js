import React, { useState } from "react";
import {
  ToastAndroid,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import color from "../../../constants/colors";
import useStore from "../../zustand/store";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import axios from "axios";

const CompleteJournalScreen = ({ navigation }) => {
  const { isFSGValue, setFSGData, responseData } = useStore();
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
      `/five-senses-excercise/${responseData._id}`,
      data,
    );
    //console.log(response.data.data);
    setFSGData(data);
    ToastAndroid.show(
      "Five Senses Grounding Technique Completed",
      ToastAndroid.LONG,
    );
    navigation.navigate("Daily Tasks");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Well Done 🎉</Text>
      <Text style={styles.subHeading}>
        Use this exercise to bring yourself back to the present moment whenever
        you're feeling overwhelmed.
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
