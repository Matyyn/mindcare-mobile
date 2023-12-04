import React, { useState } from "react";
import { View, StyleSheet, ImageBackground, Text, TouchableOpacity, Dimensions } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const moods = [
  { value: 1, title: "Awesome", image: "https://firebasestorage.googleapis.com/v0/b/mind-care-b5645.appspot.com/o/images%2F3.png?alt=media&token=06d26615-e224-45f8-9ee5-64edfe072874" },
  { value: 2, title: "Happy", image: "https://firebasestorage.googleapis.com/v0/b/mind-care-b5645.appspot.com/o/images%2F2.png?alt=media&token=57be424f-357f-4730-8e50-ebdee240a5e8" },
  { value: 3, title: "Neutral", image: "https://firebasestorage.googleapis.com/v0/b/mind-care-b5645.appspot.com/o/images%2F1.png?alt=media&token=f6d1b7b1-40b6-4cd5-96fd-44b2f3591923" },
  { value: 4, title: "Bad", image: "https://firebasestorage.googleapis.com/v0/b/mind-care-b5645.appspot.com/o/images%2F4.png?alt=media&token=869b54be-621f-422b-90c9-3808419fca64" },
  { value: 5, title: "Griefed", image: "https://firebasestorage.googleapis.com/v0/b/mind-care-b5645.appspot.com/o/images%2F5.png?alt=media&token=cf5034a5-27fa-445a-87d5-99f592003a8e" },
];


const DailyInsights = ({ navigation }) => {
  const [selectedMood, setSelectedMood] = useState(null);

  const handleMoodSelection = (value) => {
    setSelectedMood(value);
  };

  const handleBackward = () => {

  };

  const handleForward = () => {
    if (selectedMood) {
      navigation.navigate("Emotions", { emotion: getSelectedMoodTitle() });
    }
  };

  const getSelectedMoodTitle = () => {
    const selectedMoodObj = moods.find((mood) => mood.value === selectedMood);
    return selectedMoodObj ? selectedMoodObj.title : "";
  };

  const renderMoodCircle = (mood) => {
    return (
      <TouchableOpacity
        key={mood.value}
        style={[
          styles.circle,
          { backgroundColor: "#FFFFFF" },
          selectedMood === mood.value && styles.selectedCircle,
        ]}
        onPress={() => handleMoodSelection(mood.value)}
      >
        <ImageBackground source={{ uri: mood.image }} style={styles.circleImage} imageStyle={styles.circleImageStyle} />
      </TouchableOpacity>
    );
  };

  const renderSelectedMood = () => {
    if (selectedMood === null) {
      return null;
    }
    const selectedMoodObj = moods.find((mood) => mood.value === selectedMood);
    return (
      <View style={styles.selectedMoodContainer}>
        <ImageBackground source={{ uri: selectedMoodObj.image }} style={styles.selectedMoodImage} imageStyle={styles.selectedMoodImageStyle} />
        <Text style={styles.selectedMoodTitle}>{selectedMoodObj.title}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Hello! How are you feeling today?</Text>
      <View style={styles.selectedMoodWrapper}>{renderSelectedMood()}</View>
      <View style={styles.circleContainer}>{moods.map((mood) => renderMoodCircle(mood))}</View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.disabledButton,styles.button]} onPress={handleBackward} disabled={true}>
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
    justifyContent: "flex-start",
    marginTop: "10%",
    alignItems: "center",
  },
  circleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    textAlign: "left",
    fontSize: 25,
    marginBottom: 20,
    fontWeight: "600",
  },
  selectedCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  circleImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  circleImageStyle: {
    borderRadius: 30,
  },
  selectedMoodWrapper: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -150 }, { translateY: -150 }],
    width: 300,
    height: 300,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedMoodContainer: {
    alignItems: "center",
  },
  selectedMoodImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  selectedMoodImageStyle: {
    borderRadius: 100,
  },
  selectedMoodValue: {
    fontSize: 40,
    fontWeight: "bold",
    marginTop: 20,
  },
  selectedMoodTitle: {
    fontSize: 30,
    marginTop: 40,
    textAlign: "center",
    fontWeight: "700",
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

export default DailyInsights;
