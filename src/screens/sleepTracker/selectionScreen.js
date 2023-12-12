import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const App = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.card}
        onPress={() => {
          navigation.navigate("Sleep Tracker Tip");
        }}
      >
        <Text style={styles.cardTitle}>Sleep Tracker</Text>
        <Text style={styles.cardInfo}>
          Monitor your sleep patterns and improve your sleep quality with our
          Sleep Tracker.
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.card}
        onPress={() => {
          navigation.navigate("Fitness Tracker Tip");
        }}
      >
        <Text style={styles.cardTitle}>Fitness Tracker</Text>
        <Text style={styles.cardInfo}>
          Track your workouts, set fitness goals, and stay active with our
          Fitness Tracker.
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
    backgroundColor: "#FBFCf8",
    justifyContent: "center",
    alignItems: "center",
    margin: 30,
    borderRadius: 10,
    padding: 20,
  },
  cardTitle: {
    fontSize: 24,
    color: "#2D3748",
    marginBottom: 10,
  },
  cardInfo: {
    fontSize: 16,
    color: "#2D3748",
    textAlign: "center",
  },
});

export default App;
