import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import color from "../../constants/colors";
import axios from "axios";
import useStore from "../zustand/store";
import { trackEvent } from "@aptabase/react-native";

const WriteJournalScreen = ({ navigation, route }) => {
  useEffect(() => {
    trackEvent("Writing Journal");
  }, []);
  const { responseData } = useStore();
  const [journalText, setJournalText] = useState([]);
  // const [allInputsFilled, setAllInputsFilled] = useState(false);
  const { journalTitle } = route.params;
  let journalType = "";

  // Match journal title with journal type
  if (journalTitle === "Open Journal") {
    journalType = "openJournal";
  } else if (journalTitle === "Reflection Journal") {
    journalType = "reflectionJournal";
  } else if (journalTitle === "Building a Self-Care Plan") {
    journalType = "selfCare";
  } else if (journalTitle === "Dream Journal") {
    journalType = "dream";
  } else if (journalTitle === "Finding a peaceful space") {
    journalType = "peacefulSpace";
  } else if (journalTitle === "Finding the day ahead") {
    journalType = "planning";
  } else if (journalTitle === "Calming the mind") {
    journalType = "calmingMind";
  } else if (journalTitle === "Looking forward to tomorrow") {
    journalType = "lookingForward";
  } else if (journalTitle === "Self Affirmation Journal") {
    journalType = "selfAffirmation";
  } else if (journalTitle === "Anxiety Thoughts Record") {
    journalType = "anxietyThoughts";
  } else if (journalTitle === "Challenging Negative Thoughts About Yourself") {
    journalType = "negThoughts";
  } else if (journalTitle === "Problem Solving Journal") {
    journalType = "problemsolvingJournal";
  } else if (journalTitle === "Goal Setting Journal") {
    journalType = "goalSetting";
  } else if (journalTitle === "Gratitude Journaling") {
    journalType = "gratitudeJournal";
  }

  const handleComplete = async () => {
    const now = new Date();
    const filled = journalText.every((text) => text.trim().length > 0);
    //console.log(responseData);
    var date = new Date().toISOString();
    if (filled) {
      const journalEntry = {
        answers: journalText,
        questions: getJournalQuestions(),
        createdAt: date,
        clientId: responseData._id,
      };
      //console.log("Journal Entry:", journalEntry);
      if (journalType === "openJournal") {
        await axios.post("/open-journal", journalEntry);
        navigation.navigate("completeJournal");
      } else if (journalType === "negThoughts") {
        await axios.post("/negative-thoughts-journal", journalEntry);
        navigation.navigate("completeJournal");
      } else if (journalType === "reflectionJournal") {
        await axios.post("/reflection-journal", journalEntry);
        navigation.navigate("completeJournal");
      } else if (journalType === "gratitudeJournal") {
        await axios.post("/gratitude-journal", journalEntry);
        navigation.navigate("completeJournal");
      } else if (journalType === "problemsolvingJournal") {
        await axios.post("/problem-solving-journal", journalEntry);
        navigation.navigate("completeJournal");
      } else if (journalType === "goalSetting") {
        await axios.post("/goal-setting-journal", journalEntry);
        navigation.navigate("completeJournal");
      } else if (journalType === "anxietyThoughts") {
        await axios.post("/anxiety-journal", journalEntry);
        navigation.navigate("completeJournal");
      } else if (journalType === "selfCare") {
        await axios.post("/selfcare-journal", journalEntry);
        navigation.navigate("completeJournal");
      } else if (journalType === "selfAffirmation") {
        await axios.post("/self-affirmation-journal", journalEntry);
        navigation.navigate("completeJournal");
      } else if (journalType === "lookingForward") {
        await axios.post("/looking-forward-to-tomorrow", journalEntry);
        navigation.navigate("completeJournal");
      } else if (journalType === "calmingMind") {
        await axios.post("/calming-the-mind", journalEntry);
        navigation.navigate("completeJournal");
      } else if (journalType === "planning") {
        await axios.post("/planning-the-day-ahead", journalEntry);
        navigation.navigate("completeJournal");
      } else if (journalType === "peacefulSpace") {
        await axios.post("/finding-peaceful-space", journalEntry);
        navigation.navigate("completeJournal");
      } else if (journalType === "dream") {
        await axios.post("/dream-journal", journalEntry);
        navigation.navigate("completeJournal");
      }
    } else {
      // Display an error message or perform any other desired action
      //console.log("Please fill in all journal entries.");
    }
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: `Write ${journalTitle}`,
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate("guided journaling main")}
        >
          <Icon name="times" size={30} color="black" style={styles.closeIcon} />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate("JournalsTab")}>
          <Icon
            name="clipboard-list"
            size={30}
            color="black"
            style={styles.copyIcon}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation, journalTitle]);

  const getJournalQuestions = () => {
    if (journalType === "openJournal") {
      return ["What's on your mind?"];
    } else if (journalType === "reflectionJournal") {
      return [
        "What’s been on your mind recently?",
        "What does it make you feel, and why?",
        "Would you have done anything differently?",
      ];
    } else if (journalType === "selfCare") {
      return [
        "Think about your daily routine. What do you do to cope when you’re feeling unhappy?",
        "Which of these coping strategies are helpful?",
        "Which of these coping strategies are harmful?",
        "Choose 2-3 new self-care practices you’d like to incorporate into your current routine?",
        "Where and when will you practice them? Be specific about how you’ll implement these activities?",
      ];
    } else if (journalType === "dream") {
      return [
        "What happened in your dream?",
        "What does this dream mean to you?",
      ];
    } else if (journalType === "peacefulSpace") {
      return [
        "Why does this place bring you peace?",
        "Imagine a beautiful place that makes you feel safe and at peace.",
      ];
    } else if (journalType === "planning") {
      return [
        "What is on tomorrow’s to-do list?",
        "What is the most important task to complete in this list?",
      ];
    } else if (journalType === "calmingMind") {
      return [
        "What is one thought that has been weighing on your mind?",
        "Why does this thought keep you up at night?",
      ];
    } else if (journalType === "lookingForward") {
      return [
        "What kind of day do you hope to have tomorrow?",
        "What is one thing you’re looking forward to tomorrow?",
        "How was your day today?",
      ];
    } else if (journalType === "selfAffirmation") {
      return [
        "What would you say if you were feeling sad, angry, or scared?",
        "What would you say if you were stuck in a negative mindset?",
        "What would you say to motivate yourself to overcome this struggle?",
      ];
    } else if (journalType === "anxietyThoughts") {
      return [
        "What is a situation that frequently makes you feel or behave negatively?",
        "What are some underlying negative thought patterns that accompany this situation?",
        "Form a new positive thought pattern that will help you better react to the trigger.",
      ];
    } else if (journalType === "negThoughts") {
      return [
        "What is the in-between area where things are simply alright, instead of being perfect or a disaster?",
      ];
    } else if (journalType === "problemsolvingJournal") {
      return ["What is the problem you're currently facing?"];
    } else if (journalType === "goalSetting") {
      return ["What is one goal you want ot accomplish?"];
    } else if (journalType === "gratitudeJournal") {
      return [
        "What is one thing you are grateful for that has brought you joy recently?",
      ];
    }
  };

  const getJournalPrompts = () => {
    if (journalType === "openJournal") {
      return ["This is your writing space to express yourself freely."];
    } else if (journalType === "reflectionJournal") {
      return [
        "It could be an experience, a thought, or a realization about yourself.",
        "What does it make you feel, and why?",
        "Would you change how you handled it or are you satisfied with your actions?",
      ];
    } else if (journalType === "selfCare") {
      return [
        "Think about your daily routine. What do you do to cope when you’re feeling unhappy?",
        "Which of these coping strategies are helpful?",
        "Which of these coping strategies are harmful?",
        "Choose 2-3 new self-care practices you’d like to incorporate into your current routine?",
        "Where and when will you practice them? Be specific about how you’ll implement these activities?",
      ];
    } else if (journalType === "dream") {
      return [
        "Who was with you? Where were you? What types of emotion did you feel? Be as specific as you can.",
        "Did this dream bring you any insights, ideas, or realizations?",
      ];
    } else if (journalType === "peacefulSpace") {
      return [
        "What memories do you have of this place? How does this place make you feel?",
        "It could be a place you’ve visited before or somewhere fictional.",
      ];
    } else if (journalType === "planning") {
      return [
        "It could be tasks from school, work, or errands.",
        "Choose just one thing to complete tomorrow.",
      ];
    } else if (journalType === "calmingMind") {
      return [
        "Try to write out what you’re feeling.",
        "Do you feel the situation is out of your control? Is it something that happened in the past?",
      ];
    } else if (journalType === "lookingForward") {
      return [
        "Is there anything you’re hoping to experience or accomplish?",
        "Focus on something positive. It could be big, like a special event, or something small, like a cup of coffee in the morning.",
        "Write about anything positive or negative that happened.",
      ];
    } else if (journalType === "selfAffirmation") {
      return [
        "It's okay to feel...",
        "Focus on positive words of encouragement and comfort",
        "Remind yourself of your abilities and similar situations you’ve been able to conquer before",
      ];
    } else if (journalType === "anxietyThoughts") {
      return [
        "Type your input here",
        "Type your input here",
        "Create a more empathetic and patient thought pattern that you can replace the old one with",
      ];
    } else if (journalType === "negThoughts") {
      return ["Ask yourself “is this thought too extreme?"];
    } else if (journalType === "problemsolvingJournal") {
      return [
        "Describe the problem objectively without assigning blame or making judgements?",
      ];
    } else if (journalType === "goalSetting") {
      return ["Think about an area in your life that you'd like to improve?"];
    } else if (journalType === "gratitudeJournal") {
      return [
        "Reflect on a specific moment or experience from today that made you feel grateful. Describe it in detail, focusing on the sensations, emotions, and thoughts associated with that moment. How did it enhance your overall sense of well-being and bring positivity into your day?",
      ];
    }
  };

  const renderJournalQuestions = () => {
    const questions = getJournalQuestions();
    const prompts = getJournalPrompts();
    return questions.map((question, index) => (
      <View key={index} style={styles.questionContainer}>
        <Text style={styles.question}>{question}</Text>
        <TextInput
          style={styles.textInput}
          placeholder={prompts[index]}
          multiline={true}
          value={journalText[index]}
          onChangeText={(text) => {
            const updatedJournalText = [...journalText];
            updatedJournalText[index] = text;
            setJournalText(updatedJournalText);
            // const filled = updatedJournalText.every((text) => text.trim().length > 0);
            // setAllInputsFilled(filled);
          }}
        />
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.body}>{renderJournalQuestions()}</View>
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.button]}
          onPress={handleComplete}
          //          disabled={!allInputsFilled}
        >
          <Text style={styles.buttonText}>Complete</Text>
        </TouchableOpacity>
        <Text style={styles.timeText}>Today, {new Date().toDateString()}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  closeIcon: {
    marginRight: 10,
  },
  body: {
    flex: 1,
    marginTop: 20,
  },
  questionContainer: {
    marginBottom: 20,
  },
  question: {
    fontSize: 16,
    marginBottom: 10,
  },
  textInput: {
    fontSize: 16,
    textAlignVertical: "top",
    marginBottom: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: color.grey,
    padding: 10,
  },
  button: {
    backgroundColor: color.grey,
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    width: "100%",
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontFamily: "Inter_700Bold",
    fontSize: 20,
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: "#dcdcdc",
  },
  timeText: {
    fontSize: 14,
    color: "#808080",
    textAlign: "right",
  },
});

export default WriteJournalScreen;
