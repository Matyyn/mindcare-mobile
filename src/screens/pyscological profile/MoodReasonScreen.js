import React, { useState } from "react";
import { View, StyleSheet, TextInput, Text, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const QuestionScreen = ({navigation,route}) => {
  const { specificEmotion,emotion,reasonOfEmotion } = route.params;  
  const [answer, setAnswer] = useState("");
  const [selectedMood, setSelectedMood] = useState(false);

  const handleAnswerChange = (text) => {
    if (text.length <= 80) {
      setAnswer(text);
      setSelectedMood(text.length > 0); // Update selectedMood based on text length
    }
  };

  const handleBackward = () => {
    navigation.goBack();
  };

  const handleForward = () => {
    navigation.navigate("Stress Screen", {
        emotion,
        specificEmotion,
        reasonOfEmotion,
        elaborationText:answer,
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>Elaborate on how you're feeling here</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.answerInput}
          multiline
          numberOfLines={3}
          maxLength={80}
          value={answer}
          onChangeText={handleAnswerChange}
          autoGrow={true}
          textAlignVertical="top"
        />
        <Text style={styles.characterCount}>{answer.length}/80</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleBackward}>
          <AntDesign name="left" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, !selectedMood && styles.disabledButton]}
          onPress={handleForward}
          disabled={!selectedMood}
        >
          <AntDesign name="right" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    marginTop: "10%",
    paddingHorizontal: 20,
  },
  question: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 15,
  },
  inputContainer: {
    width: "100%",
  },
  answerInput: {
    width: "100%",
    minHeight: 10,
    padding: 10,
    borderBottomWidth: 1,
    fontSize: 18,
    borderBottomColor: "#ccc",
  },
  characterCount: {
    alignSelf: "flex-end",
    marginTop: 5,
    color: "#999",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0, // Added left: 0
    right: 0, // Added right: 0
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 20, // Updated to paddingVertical

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

export default QuestionScreen;
