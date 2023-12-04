import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import color from "../../constants/colors";

const ResultScreen = ({ navigation }) => {
  const handleComplete = () => {
    navigation.navigate("Anxiety Test");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Beck Anxiety Inventory (BAI)</Text>
      <Text style={styles.score}>
        • The Questionnaire will show a list of common symptoms of depression.
      </Text>
      <Text style={styles.range}>
        • Keep in mind that the test can be attempted once every two weeks.
      </Text>
      <Text style={styles.range}>• Please carefully read each item in the list.</Text>
      <Text style={styles.range}>
        • Indicate how much you have been bothered by that symptom during the past month, including today, by selecting the number in the corresponding space in the column next to each symptom.
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
    textAlign: "left",
  },
  range: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: "left",
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 20,
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
