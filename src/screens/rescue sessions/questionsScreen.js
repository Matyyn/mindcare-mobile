import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import color from "../../constants/colors";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import useStore from "../zustand/store";

const GuidedJournalingTips = ({ navigation, route }) => {
  const { setRescueSessionData, rescueSessionData } = useStore();
  const { journalTitle } = route.params;

  const [questions, setQuestions] = useState([]);
  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true);

  useEffect(() => {    
    let journalQuestions = [];

    switch (journalTitle) {
      case "Overcoming Distraction":
        journalQuestions = [
          "What distractions did you face during this session, and how did you overcome them?",
        ];
        break;
      case "Disappointment":
        journalQuestions = [
          "What disappointed you during this session, and how did you cope with it?",
        ];
        break;
      case "Anger & Frustration":
        journalQuestions = [
          "What situations triggered anger and frustration during this session, and how did you manage these emotions?",
        ];
        break;
      case "Regaining Motivation":
        journalQuestions = [
          "What steps did you take to regain your motivation during this session?",
        ];
        break;
      case "Sleep":
        journalQuestions = [
          "Reflect on your sleep-related goals during this session. What steps did you take to improve your sleep, and what progress did you make?",
        ];
        break;
      case "Low Mood":
        journalQuestions = [
          "Describe the factors contributing to your low mood during this session. How did you work on improving your emotional state?",
        ];
        break;
      case "Criticism":
        journalQuestions = [
          "Discuss the criticism you encountered during this session and how it affected you. What strategies did you use to maintain self-esteem and resilience?",
        ];
        break;
      case "Relationships":
        journalQuestions = [
          "Reflect on the aspects of your relationships that you focused on during this session. What steps did you take to improve or navigate these relationships?",
        ];
        break;
      default:
        break;
    }

    setQuestions(journalQuestions);
  }, [journalTitle]);

  const [answers, setAnswers] = useState([]);

  const handleAnswerChange = (index, text) => {
    const newAnswers = [...answers];
    newAnswers[index] = text;
    setAnswers(newAnswers);

    const questionAndAnswer = {
      question: questions[index],
      answer: text,
    };
    const isAnyInputEmpty = newAnswers.some((answer) => !answer.trim());

    setIsNextButtonDisabled(isAnyInputEmpty);    
    setRescueSessionData(journalTitle, questionAndAnswer);
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: journalTitle,
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate("rescue sessions main")}
        >
          <Ionicons
            name="close"
            size={30}
            color="black"
            style={{ marginRight: 10 }}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation, journalTitle]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.questionContainer}>
        {questions.map((question, index) => (
          <View key={index} style={styles.questionItem}>
            <Text style={styles.question}>{question}</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Your answer"
              multiline
              value={answers[index]}
              onChangeText={(text) => handleAnswerChange(index, text)}
            />
          </View>
        ))}
      </ScrollView>

      <View style={styles.bottom}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => {
            navigation.navigate("Player", { journalTitle });
          }}
        >
          <Ionicons name="chevron-back" size={40} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.iconButton
            ,isNextButtonDisabled && styles.disabledButtonStyle,
        ]}
          onPress={() => {
            navigation.navigate("Completion", { journalTitle });
          }}
          disabled={isNextButtonDisabled}
        >
          <Ionicons name="chevron-forward-outline" size={40} color="black" />
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightgreen",
  },
  questionContainer: {
    padding: 20,
    paddingTop: 30,
  },
  questionItem: {
    marginBottom: 20,
  },
  question: {
    color: color.grey,
    fontSize: 20,
    fontWeight: "600",
    textAlign: "left",
    marginBottom: 10,
  },
  textInput: {
    fontSize: 20,
    textAlignVertical: 'top',
    marginBottom: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: color.grey,
    paddingTop: 15,
  },
  disabledButtonStyle :{backgroundColor: "lightgray", 
  borderRadius: 50,
  paddingLeft: 2,
  paddingRight: 2,
  opacity: 0.7,},
  bottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "lightgreen",
    padding: 15,
  },
  iconButton: {
    backgroundColor: "white",
    borderRadius: 50,
    paddingLeft: 2,
    paddingRight: 2,
  },
  savedDataContainer: {
    backgroundColor: "white",
    padding: 20,
    marginTop: 20,
    borderRadius: 10,
  },
  savedDataTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  savedData: {
    marginTop: 10,
  },
  savedQuestion: {
    fontSize: 16,
  },
  savedAnswer: {
    fontSize: 16,
    marginTop: 5,
  },
});

export default GuidedJournalingTips;
