import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import color from "../../constants/colors";
import Icon from "react-native-vector-icons/FontAwesome5";
import useStore from "../zustand/store";
import axios from "axios";
const CompleteJournalScreen = ({ navigation, route }) => {
  const { journalTitle } = route.params;
  // const handleComplete = () => {
  //   const now = new Date();
  //   const currentTime = `${now.getHours()}:${now.getMinutes()}`;
  //   navigation.goBack();
  // };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate("rescue sessions main")}
        >
          <Icon name="times" size={30} color="black" style={styles.closeIcon} />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('RescueSessionsTab')}>
          <Icon name="clipboard-list" size={30} color="black" style={styles.copyIcon} />
        </TouchableOpacity>
      ),
      //   headerRight: () => (
      //     <TouchableOpacity onPress={() => navigation.navigate('JournalsTab')}>
      //       <Icon name="clipboard-list" size={30} color="black" style={styles.copyIcon} />
      //     </TouchableOpacity>
      //   ),
    });
  }, [navigation]);
  const { rescueSessionData, responseData } = useStore();

  const handleSubmit = async () => {
    const { question, answer } = rescueSessionData[journalTitle];
    if (journalTitle === "Overcoming Distraction") {
      const Object = {
        checkInDate: Date.now(),
        listened: true,
        questions: question,
        results: answer,
      };
      await axios.post(`/overcoming-distraction/${responseData._id}`, Object);
      navigation.navigate('rescue sessions main')
    } else if (journalTitle === "Anger & Frustration") {
      const Object = {
        checkInDate: Date.now(),
        listened: true,
        questions: question,
        results: answer,
      };
      await axios.post(`/anger-and-frustration/${responseData._id}`, Object);
      navigation.navigate('rescue sessions main')
    } else if (journalTitle === "Regaining Motivation") {
      const Object = {
        checkInDate: Date.now(),
        listened: true,
        questions: question,
        results: answer,
      };
      await axios.post(`/regaining-motivation/${responseData._id}`, Object);
      navigation.navigate('rescue sessions main')
    } else if (journalTitle === "Disappointment") {
      const Object = {
        checkInDate: Date.now(),
        listened: true,
        questions: question,
        results: answer,
      };
      await axios.post(`/envy/${responseData._id}`, Object);
      navigation.navigate('rescue sessions main')
    } else if (journalTitle === "Sleep") {
      const Object = {
        checkInDate: Date.now(),
        listened: true,
        questions: question,
        results: answer,
      };
      await axios.post(`/sleep/${responseData._id}`, Object);
      navigation.navigate('rescue sessions main')
    } else if (journalTitle === "Low Mood") {
      const Object = {
        checkInDate: Date.now(),
        listened: true,
        questions: question,
        results: answer,
      };
      await axios.post(`/low-mood/${responseData._id}`, Object);
      navigation.navigate('rescue sessions main')
    } else if (journalTitle === "Critism") {
      const Object = {
        checkInDate: Date.now(),
        listened: true,
        questions: question,
        results: answer,
      };
      await axios.post(`/criticism/${responseData._id}`, Object);
      navigation.navigate('rescue sessions main')
    } else if (journalTitle === "Relationships") {
      const Object = {
        checkInDate: Date.now(),
        listened: true,
        questions: question,
        results: answer,
      };
      await axios.post(`/relationship/${responseData._id}`, Object);
      navigation.navigate('rescue sessions main')
    }
    //console.log(rescueSessionData);

    // console.log(question)
  };
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Well Done 🎉</Text>
      <Text style={styles.subHeading}>
        You can find your past completed Rescue Sessions under Rescue Sessions
        Logs.
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
