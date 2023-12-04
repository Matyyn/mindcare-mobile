import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { trackEvent } from "@aptabase/react-native";

const ResultScreen = ({ route }) => {
  useEffect(() => {
    trackEvent("Depression Test Result");
  }, []);
  const { score } = route.params;

  const getAnxietyLevel = () => {
    if (score >= 0 && score <= 10) {
      return "These ups and downs are considered normal";
    } else if (score >= 11 && score <= 16) {
      return "Mild mood disturbance";
    } else if (score >= 17 && score <= 20) {
      return "Borderline clinical depression";
    } else if (score >= 21 && score <= 30) {
      return "Moderate depression";
    } else if (score >= 31 && score <= 40) {
      return "Severe depression";
    } else {
      return "Extreme depression";
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Test Results</Text>
      <Text style={styles.anxietyLevel}>{getAnxietyLevel()}</Text>
      <Text style={styles.score}>Score Range: {score}</Text>
      <Text style={styles.range}>
        1-10 → These ups and downs are considered normal
      </Text>
      <Text style={styles.range}>11-16 → Mild mood disturbance</Text>
      <Text style={styles.range}>17-20 → Borderline clinical depression</Text>
      <Text style={styles.range}>21-30 → Moderate depression</Text>
      <Text style={styles.range}>31-40 → Severe depression</Text>
      <Text style={styles.range}>over 40 → Extreme depression</Text>
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
    fontSize: 22,
    marginBottom: 20,
    textAlign: "left",
    fontWeight: 600,
  },
  range: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "left",
  },
  anxietyLevel: {
    color: "red",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },
});

export default ResultScreen;
