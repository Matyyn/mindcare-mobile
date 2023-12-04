import axios from "axios";
import React, { useState, useEffect } from "react";
import Slider from "@react-native-community/slider";
import { View, StyleSheet, Text } from "react-native";
import { VictoryBar, VictoryChart, VictoryAxis } from "victory-native";
import useStore from "../zustand/store";
import { trackEvent } from "@aptabase/react-native";

const dailyInsights = () => {
  const { responseData } = useStore();
  const weekdays = [
    { name: "Sun", emoji: "🙂" },
    { name: "Mon", emoji: "" },
    { name: "Tue", emoji: "" },
    { name: "Wed", emoji: "🙂" },
    { name: "Thu", emoji: "" },
    { name: "Fri", emoji: "" },
    { name: "Sat", emoji: "" },
  ];

  const [userData, setData] = useState([]);
  const [stress, setStress] = useState();

  const StressScale = () => {
    const [sliderValue, setSliderValue] = useState(stress);
    const handleSliderChange = (value) => {
      let selectedValue;
      switch (value) {
        case 0:
          selectedValue = "Low";
          break;
        case 33:
          selectedValue = "Medium";
          break;
        case 66:
          selectedValue = "High";
          break;
        case 100:
          selectedValue = "Highest";
          break;
      }
      setSliderValue(selectedValue);
    };

    const renderSliderOptions = () => {
      const options = ["Low", "Medium", "High", "Highest"];

      return options.map((option, index) => (
        <Text
          key={index}
          style={sliderValue === option ? styles.selectedOption : styles.option}
        >
          {option}
        </Text>
      ));
    };

    return (
      <>
        <View style={styles.sliderContainer}>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={100}
            step={33}
            value={
              sliderValue === "Low"
                ? 0
                : sliderValue === "Medium"
                ? 33
                : sliderValue === "High"
                ? 66
                : 100
            }
            onValueChange={handleSliderChange}
            minimumTrackTintColor="red" // Adjust the color as needed
            disabled={true}
            maximumTrackTintColor="white" // Adjust the color as needed
            thumbTintColor="black" // Adjust the color as needed
          />
        </View>
        <View style={styles.optionsContainer}>{renderSliderOptions()}</View>
      </>
    );
  };

  useEffect(async () => {
    trackEvent("Daily Insights");
    const response = await axios.get(
      `/psychological-profile/${responseData._id}`
    );
    console.log(response.data.data.profile);
    const rawData = response.data.data.profile;

    const emojiMapping = {
      Happy: "😄",
      Awesome: "🤩",
      Neutral: "😐",
      Sad: "😢",
      Griefed: "😔",
    };
    const moodValueMapping = {
      Awesome: 1,
      Happy: 2,
      Neutral: 3,
      Sad: 4,
      Griefed: 5,
    };

    const stressTimelineMap = {}; // Use a map to store stressTimeline frequencies

    const processedData = rawData.map((item) => {
      const { checkinDate, emotion, stressTimeline } = item;
      const checkinDateObj = new Date(checkinDate);
      const day = checkinDateObj.toLocaleString("en-US", { weekday: "long" });
      const emoji = emojiMapping[emotion];
      const moodValue = moodValueMapping[emotion];

      // Update the stressTimeline frequency
      if (stressTimeline in stressTimelineMap) {
        stressTimelineMap[stressTimeline]++;
      } else {
        stressTimelineMap[stressTimeline] = 1;
      }

      return {
        day: day.split(",")[0],
        emoji,
        moodValue,
        stressTimeline,
      };
    });

    // Find the most frequent stressTimeline
    let mostFrequentStressTimeline = "";
    let maxFrequency = 0;

    Object.keys(stressTimelineMap).forEach((stressTimeline) => {
      if (stressTimelineMap[stressTimeline] > maxFrequency) {
        mostFrequentStressTimeline = stressTimeline;
        maxFrequency = stressTimelineMap[stressTimeline];
      }
    });
    console.log("Most frequent stressTimeline:", mostFrequentStressTimeline);
    setStress(mostFrequentStressTimeline);
    setData(processedData);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 22 }}>Recent Mood</Text>
      <View style={styles.circleContainer}>
        {userData.map((selected, index) => (
          <View key={index} style={styles.circle}>
            {selected.emoji ? (
              <Text style={styles.emoji}>{selected.emoji}</Text>
            ) : (
              <View style={styles.emptyCircle} />
            )}
            <Text style={styles.weekday}>{selected.day}</Text>
          </View>
        ))}
      </View>
      <Text style={{ fontSize: 22, marginTop: 10 }}>Weekly Mood Graph</Text>
      <VictoryChart domainPadding={{ x: 25 }}>
        <VictoryAxis
          tickValues={userData.map((item) => item.day)}
          style={{
            tickLabels: {
              fontSize: 12,
              fontWeight: "bold",
            },
          }}
        />
        <VictoryAxis
          dependentAxis
          style={{
            tickLabels: {
              fontSize: 12,
              fontWeight: "bold",
            },
          }}
        />
        <VictoryBar
          data={userData}
          x="day"
          y="moodValue"
          style={{ data: { fill: "orange" } }}
        />
      </VictoryChart>
      <StressScale />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    marginTop: "15%",
    alignItems: "center",
  },
  slider: {
    width: "90%",
    marginLeft: "5%",
    marginRight: "5%",
  },
  optionsContainer: {
    flexDirection: "row",
    marginHorizontal: 20,
    justifyContent: "space-between",
    marginTop: 16,
  },
  option: {
    fontSize: 16,
    color: "#000",
    fontWeight: "700",
    marginLeft: "1%",
    marginRight: "1%",
  },
  selectedOption: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#00BFFF",
    marginLeft: "1%",
    marginRight: "1%",
  },
  circleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    alignItems: "center",
    marginHorizontal: 2,
  },
  emptyCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 5,
  },
  emoji: {
    fontSize: 50,
    marginBottom: 5,
  },
  weekday: {
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default dailyInsights;
