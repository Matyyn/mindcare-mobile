import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ResultScreen = ({ route }) => {
  const { score } = route.params;

  const getAnxietyLevel = () => {
    if (score >= 0 && score <= 21) {
      return 'Low Anxiety';
    } else if (score >= 22 && score <= 35) {
      return 'Moderate Anxiety';
    } else {
      return 'Concerning Levels of Anxiety';
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Test Results</Text>      
      <Text style={styles.anxietyLevel}> {getAnxietyLevel()}</Text>
      <Text style={styles.score}>Score Range: {score}</Text>
      <Text style={styles.range}>0-21 → Low Anxiety</Text>
      <Text style={styles.range}>22-35 → Moderate Anxiety</Text>
      <Text style={styles.range}>over 36 → Concerning Levels of Anxiety</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,        
    padding: 30,    
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop:30,
    marginBottom: 30,
    textAlign:'center'
  },
  score: {
    fontSize: 22,
    marginBottom: 20,
    textAlign:'left'
  },
  range: {
    fontSize: 18,
    marginBottom: 20,
    textAlign:'left',
    fontWeight:600,
  },
  anxietyLevel: {
    color:'red',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign:'center',
    marginBottom: 30,
  },
});

export default ResultScreen;
