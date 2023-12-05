import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ToastAndroid,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { RadioButton } from "react-native-paper";
import color from "../../constants/colors";
import useStore from "../zustand/store";
import axios from "axios";
import { trackEvent } from "@aptabase/react-native";

const questions = [
  {
    question: "Over the last one week, how often have you felt the following?",
    options: [
      "I do not feel sad.",
      "I feel sad",
      "I am sad all the time and I can't snap out of it.",
      "I am so sad and unhappy that I can't stand it.",
    ],
  },
  {
    question: "Over the last one week, how often have you felt the following?",
    options: [
      "I am not particularly discouraged about the future.",
      "I feel discouraged about the future.",
      "I feel I have nothing to look forward to.",
      "I feel the future is hopeless and that things cannot improve.",
    ],
  },
  {
    question: "Over the last one week, how often have you felt the following?",
    options: [
      "I don't feel like a failure.",
      "I feel I have failed more than the average person.",
      "As I look back on my life, all I can see is a lot of failures.",
      "I feel I am a complete failure as a person.",
    ],
  },
  {
    question: "Over the last one week, how often have you felt the following?",
    options: [
      "I get as much satisfaction out of things as I used to.",
      "I don't enjoy things the way I used to.",
      "I don't get real satisfaction out of anything anymore.",
      "I am dissatisfied or bored with everything.",
    ],
  },
  {
    question: "Over the last one week, how often have you felt the following?",
    options: [
      "I don't feel particularly guilty",
      "I feel guilty a good part of the time.",
      "I feel quite guilty most of the time.",
      "I feel guilty all of the time.",
    ],
  },
  {
    question: "Over the last one week, how often have you felt the following?",
    options: [
      "I don't feel I am being punished.",
      "I feel I may be punished.",
      "I expect to be punished.",
      "I feel I am being punished.",
    ],
  },
  {
    question: "Over the last one week, how often have you felt the following?",
    options: [
      "I don't feel disappointed in myself.",
      "I am disappointed in myself.",
      "I am disgusted with myself.",
      "I hate myself.",
    ],
  },
  {
    question: "Over the last one week, how often have you felt the following?",
    options: [
      "Not at all",
      "Mildly, but it didn't bother me much",
      "Moderately - it wasn't pleasant at times",
      "Severely - it bothered me a lot",
    ],
  },
  {
    question: "Over the last one week, how often have you felt the following?",
    options: [
      "I don't feel I am any worse than anybody else.",
      "I am critical of myself for my weaknesses or mistakes.",
      "I blame myself all the time for my faults.",
      "I blame myself for everything bad that happens.",
    ],
  },
  {
    question: "Over the last one week, how often have you felt the following?",
    options: [
      "I don't have any thoughts of killing myself.",
      "I have thoughts of killing myself, but I would not carry them out.",
      "I would like to kill myself.",
      "I would kill myself if I had the chance.",
    ],
  },
  {
    question: "Over the last one week, how often have you felt the following?",
    options: [
      "I don't cry any more than usual.",
      "I cry more now than I used to.",
      "I cry all the time now.",
      "I used to be able to cry, but now I can't cry even though I want to.",
    ],
  },
  {
    question: "Over the last one week, how often have you felt the following?",
    options: [
      "I have not lost interest in other people.",
      "I am less interested in other people than I used to be.",
      "I have lost most of my interest in other people.",
      "I have lost all of my interest in other people.",
    ],
  },
  {
    question: "Over the last one week, how often have you felt the following?",
    options: [
      "I make decisions about as well as I ever could.",
      "I put off making decisions more than I used to.",
      "I have greater difficulty in making decisions more than I used to.",
      "I can't make decisions at all anymore.",
    ],
  },
  {
    question: "Over the last one week, how often have you felt the following?",
    options: [
      "I don't feel that I look any worse than I used to.",
      "I am worried that I am looking old or unattractive.",
      "I feel there are permanent changes in my appearance that make me look unattractive.",
      "I believe that I look ugly.",
    ],
  },
  {
    question: "Over the last one week, how often have you felt the following?",
    options: [
      "I can work about as well as before.",
      "It takes an extra effort to get started at doing something.",
      "I have to push myself very hard to do anything.",
      "I can't do any work at all.",
    ],
  },
  {
    question: "Over the last one week, how often have you felt the following?",
    options: [
      "I can sleep as well as usual.",
      "I don't sleep as well as I used to.",
      "I wake up 1-2 hours earlier than usual and find it hard to get back to sleep.",
      "I wake up several hours earlier than I used to and cannot get back to sleep.",
    ],
  },
  {
    question: "Over the last one week, how often have you felt the following?",
    options: [
      "I don't get more tired than usual.",
      "I get tired more easily than I used to.",
      "I get tired from doing almost anything.",
      "I am too tired to do anything.",
    ],
  },
  {
    question: "Over the last one week, how often have you felt the following?",
    options: [
      "My appetite is no worse than usual.",
      "My appetite is not as good as it used to be.",
      "My appetite is much worse now.",
      "I have no appetite at all anymore.",
    ],
  },
  {
    question: "Over the last one week, how often have you felt the following?",
    options: [
      "I haven't lost much weight, if any, lately.",
      "I have lost more than five pounds.",
      "I have lost more than ten pounds.",
      "I have lost more than fifteen pounds.",
    ],
  },
  {
    question: "Over the last one week, how often have you felt the following?",
    options: [
      "I am no more worried about my health than usual.",
      "I am worried about physical problems like aches, pains, upset stomach, or constipation.",
      "I am very worried about physical problems and it's hard to think of much else.",
      "I am so worried about my physical problems that I cannot think of anything else.",
    ],
  },
  {
    question: "Over the last one week, how often have you felt the following?",
    options: [
      "I have not noticed any recent change in my interest in intimacy.",
      "I am less interested in intimacy than I used to be.",
      "I have almost no interest in intimacy.",
      "I have lost interest in intimacy completely.",
    ],
  },
];

const DepressionScreen = ({ navigation }) => {
  useEffect("Depression Test");
  const { responseData } = useStore();
  const [responses, setResponses] = useState(
    Array(questions.length).fill({ questionNumber: 0, response: -1 }),
  );

  const handleComplete = async () => {
    const score = calculateTotalScore();
    // //console.log('resp',responses)
    // //console.log('score',score)
    if (responses.some((response) => response.response === -1)) {
      // Check if any question is unanswered
      ToastAndroid.show("Please answer all questions.", ToastAndroid.SHORT);
    } else {
      const object = {
        responses: responses,
        score: score,
      };
      const response = await axios.post(
        `/depression-test/${responseData._id}`,
        object,
      );
      ////console.log(response)
      setResponses(
        Array(questions.length).fill({ questionNumber: 0, response: -1 }),
      );
      ToastAndroid.show("Depression Test Submitted", ToastAndroid.LONG);
      navigation.navigate("Depression Test Result", { score });
    }
    //setResponses(Array(questions.length).fill({ questionNumber: 0, response: -1 }));
  };

  const handleOptionSelect = (questionIndex, optionIndex) => {
    const newResponses = [...responses];
    newResponses[questionIndex] = {
      questionNumber: questionIndex + 1,
      response: optionIndex,
    };
    setResponses(newResponses);
  };

  const calculateTotalScore = () => {
    // Calculate the total score based on the responses array
    // You can implement your scoring logic here
    // For now, let's assume each selected option contributes to the score
    const totalScore = responses.reduce(
      (total, response) => total + response.response,
      0,
    );
    ////console.log('Total Score:', totalScore);
    return totalScore;
  };

  const renderQuestion = (question, index) => {
    const questionNumber = index + 1;

    return (
      <View key={index} style={styles.questionContainer}>
        <Text style={styles.questionText}>
          Q{questionNumber}. {question.question}
        </Text>
        {question.options.map((option, optionIndex) => (
          <View key={optionIndex} style={styles.optionContainer}>
            <RadioButton
              value={optionIndex.toString()}
              status={
                responses[index].response === optionIndex
                  ? "checked"
                  : "unchecked"
              }
              onPress={() => handleOptionSelect(index, optionIndex)}
              color="#6200ee"
            />
            <Text style={styles.optionText}>{option}</Text>
          </View>
        ))}
      </View>
    );
  };

  const totalScore = calculateTotalScore();
  const isSubmitDisabled = totalScore === 0;

  return (
    <ScrollView style={styles.container}>
      <Text
        style={{
          textAlign: "center",
          fontSize: 23,
          fontWeight: 600,
          marginBottom: 20,
        }}
      >
        Anxiety Test
      </Text>
      {questions.map((question, index) => renderQuestion(question, index))}
      <View style={styles.totalScoreContainer}>
        <TouchableOpacity
          onPress={handleComplete}
          disabled={isSubmitDisabled}
          style={[
            styles.submitButton,
            isSubmitDisabled && styles.disabledButton,
          ]}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingBottom: 0,
  },
  questionContainer: {
    marginBottom: 20,
  },
  questionText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  optionText: {
    fontSize: 16,
    marginLeft: 10,
  },
  totalScoreContainer: {
    marginBottom: 40,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontFamily: "Inter_700Bold",
    fontSize: 20,
  },
  submitButton: {
    opacity: 1,
    backgroundColor: color.grey,
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    width: "100%",
    marginBottom: 10,
  },
  disabledButton: {
    opacity: 0.5,
    backgroundColor: color.grey,
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    width: "100%",
    marginBottom: 10,
  },
});

export default DepressionScreen;
