import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { trackEvent } from "@aptabase/react-native";

const App = ({ navigation }) => {
  useEffect(() => {
    trackEvent("Learning Paths");
  }, []);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.card}
        onPress={() => {
          navigation.navigate("Rescue Sessions");
        }}
      >
        <Text style={styles.cardTitle}>Rescue Sessions</Text>
        <Text style={styles.cardInfo}>
          Quick 3-5 minute sessions to help you calm down and relax.
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.card}
        onPress={() => {
          navigation.navigate("Guided Journals");
        }}
      >
        <Text style={styles.cardTitle}>Journals</Text>
        <Text style={styles.cardInfo}>
          Explore guided journals to help you reflect on your thoughts and
          feelings.
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  card: {
    flex: 1,
    backgroundColor: "grey",
    justifyContent: "center",
    alignItems: "center",
    margin: 30,
    borderRadius: 10,
    padding: 20,
  },
  cardTitle: {
    fontSize: 24,
    color: "#fff",
    marginBottom: 10,
  },
  cardInfo: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
});

export default App;
