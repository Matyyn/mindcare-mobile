import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import color from "../../constants/colors";

const ResultScreen = ({ navigation }) => {
  const handleComplete = () => {
    navigation.navigate("Fitness Schedule");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.score}>
        Stay on track with your fitness goals by walking regularly. Aim for
        10,000 steps a day to boost your health and energy levels. 🚶‍♂️🚶‍♀️
        #FitnessTracker
      </Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleComplete}>
          <Text style={styles.buttonText}>Attempt</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 30,
    textAlign: "center",
  },
  score: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center",
  },
  range: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: 50,
    width: "90%",
  },
  button: {
    backgroundColor: color.grey,
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    width: "100%",
  },
  buttonText: {
    color: "white",
    fontFamily: "Inter_700Bold",
    fontSize: 20,
  },
});

export default ResultScreen;
