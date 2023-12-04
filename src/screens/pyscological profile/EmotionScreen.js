import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
const moods = [
  { id: 1, title: "Disappointed", emoji: "😞" },
  { id: 2, title: "Sad", emoji: "😢" },
  { id: 3, title: "Tired", emoji: "😴" },
  { id: 4, title: "Gloomy", emoji: "☁️" },
  { id: 5, title: "Angry", emoji: "😡" },
  { id: 6, title: "Anxious", emoji: "😰" },
  { id: 7, title: "Unproductive", emoji: "🤷‍♂️" },
  { id: 8, title: "Jealous", emoji: "😒" },
  { id: 9, title: "Annoyed", emoji: "😤" },
];

const MoodSelectorScreen = ({ route ,navigation}) => {
  const { emotion } = route.params;  
  const [selectedMood, setSelectedMood] = useState(null);

  const handleMoodSelection = (id) => {
    setSelectedMood(id);
  };
  const handleBackward =()=>{
    navigation.goBack();
  }
  const handleForward = () => {
    if (selectedMood) {
      navigation.navigate("Emotions Reason", {        
        emotion,
        specificEmotion: moods.find(mood => mood.id === selectedMood).title,
      });
    }
  };
    

  const renderMoodRow = (start, end) => {
    return (
      <View style={styles.moodRow}>
        {moods.slice(start, end).map((mood) => (
          <TouchableOpacity
            key={mood.id}
            style={[
              styles.moodButton,
              selectedMood === mood.id && styles.selectedMoodButton,
            ]}
            onPress={() => handleMoodSelection(mood.id)}>
            <Text style={styles.emoji}>{mood.emoji}</Text>
            <Text style={styles.moodTitle}>{mood.title}</Text>
            {selectedMood === mood.id && (
              <Text style={styles.currentSelectionText}>Selected</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>
    );
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.header}>How have been you feeling Today?</Text>
      <Text style={styles.paragraph}>Select at least one emotion?</Text>
      {renderMoodRow(0, 3)}
      {renderMoodRow(3, 6)}
      {renderMoodRow(6, 9)}
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleBackward}>
          <AntDesign name="left" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, !selectedMood && styles.disabledButton]} onPress={handleForward} disabled={!selectedMood}>
          <AntDesign name="right" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: '10%',
  },
  paragraph:{
    fontSize:18,
    textAlign:'left',
    marginBottom: 25,
  }
,  header: {
    textAlign: "left",
    fontSize: 25,
    marginBottom: 20,
    fontWeight: "600",
  },
  moodRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 40,
    marginBottom: 20,
  },
  moodButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#ECECEC",
    marginHorizontal: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  selectedMoodButton: {
    backgroundColor: "#FFD700",
  },currentSelectionText: {
    fontSize: 12,
    color: "blue",
    marginTop: 5,
  },
  
  emoji: {
    fontSize: 30,
  },
  moodTitle: {
    marginTop: 10,
    textAlign: "center",
    marginBottom:5
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
    paddingBottom: 20, // Added paddingBottom
  },
  button: {
    backgroundColor: "black",
    borderRadius: 30,
    padding: 10,
  },
  disabledButton: {
    opacity: 0.5,
  },
});

export default MoodSelectorScreen;
