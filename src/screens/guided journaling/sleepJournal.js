import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import color from "../../constants/colors";

const SleepJournal = ({ navigation }) => {
  const handleJournalSelection = (journalTitle) => {
    navigation.navigate("writeJournal", { journalTitle });
  };

  return (
    <View>
      <Text
        style={{
          fontWeight: 500,
          fontSize: 25,
          textAlign: "center",
          marginTop: 20,
        }}
      >
        Select one to get started
      </Text>
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <TouchableOpacity onPress={() => handleJournalSelection("Dream Journal")}>
            <Text style={styles.text}>Dream Journal</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <TouchableOpacity onPress={() => handleJournalSelection("Finding a peaceful space")}>
            <Text style={styles.text}>Finding a peaceful space</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <TouchableOpacity onPress={() => handleJournalSelection("Finding the day ahead")}>
            <Text style={styles.text}>Finding the day ahead</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <TouchableOpacity onPress={() => handleJournalSelection("Calming the mind")}>
            <Text style={styles.text}>Calming the mind</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <TouchableOpacity onPress={() => handleJournalSelection("Looking forward to tomorrow")}>
            <Text style={styles.text}>Looking forward to tomorrow</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: "center",
    marginTop: 50,
  },
  container: {
    backgroundColor: color.grey,
    padding: 15,
    paddingTop:25,
    paddingBottom:25,
    width: "80%",
    borderRadius: 15,
    margin: 10,
  },
  text: {
    color: "white",
    textAlign: "center",
    fontSize:16
  },
});

export default SleepJournal;
