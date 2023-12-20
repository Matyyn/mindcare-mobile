import React, { useState } from "react";
import {
  ToastAndroid,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import Slider from "@react-native-community/slider";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import useStore from "../zustand/store";

const SliderScreen = ({ navigation, route }) => {
  const { responseData } = useStore();
  const { specificEmotion, emotion, reasonOfEmotion, elaborationText } =
    route.params;
  const [sliderValue, setSliderValue] = useState(0);

  const handleSliderChange = (value) => {
    setSliderValue(value);
  };

  const handleBackward = () => {
    navigation.goBack();
  };

  const handleForward = async () => {
    var date = new Date().toISOString();
    const stressTimeline = getSliderTitle(sliderValue);
    clientId = responseData._id;
    var result;
    const values = {
      checkinDate: date,
      stressTimeline: stressTimeline,
      specificEmotion: specificEmotion,
      emotion: emotion,
      reasonOfEmotion: reasonOfEmotion,
      elaborationText: elaborationText,
    };
    result = await axios.post(
      `/psychological-profile/${responseData._id}`,
      values,
    );
    ToastAndroid.show("Today's Data is Saved", ToastAndroid.LONG);
    navigation.navigate("Home");
  };

  const getSliderTitle = (value) => {
    if (value < 0.25) {
      return "Low";
    } else if (value >= 0.25 && value < 0.5) {
      return "Medium";
    } else if (value >= 0.5 && value < 0.75) {
      return "High";
    } else {
      return "Extreme";
    }
  };

  const renderSliderValue = (value, label) => {
    const isSelected = label === getSliderTitle(sliderValue);

    return (
      <Text
        key={value}
        style={[styles.sliderValue, isSelected && styles.selectedSliderValue]}
      >
        {label}
      </Text>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>What is the level of Stress Today?</Text>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={1}
        minimumTrackTintColor="#FFC727"
        maximumTrackTintColor="white"
        thumbTintColor="black"
        thumbStyle={styles.thumbStyle}
        step={0.25}
        value={sliderValue}
        onValueChange={handleSliderChange}
      />
      <View style={styles.sliderValueContainer}>
        {renderSliderValue(0, "Low")}
        {renderSliderValue(0.33, "Medium")}
        {renderSliderValue(0.66, "High")}
        {renderSliderValue(1, "Extreme")}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleBackward}>
          <AntDesign name="left" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleForward}>
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
    paddingHorizontal: 20,
    marginTop: "10%",
  },
  sliderValueContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginTop: 20,
  },
  header: {
    textAlign: "left",
    fontSize: 22,
    marginBottom: 40,
    fontWeight: "600",
  },
  sliderValue: {
    fontSize: 22,
    fontWeight: "normal",
    color: "#555555",
  },
  selectedSliderValue: {
    fontWeight: "bold",
    color: "black",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  button: {
    backgroundColor: "black",
    borderRadius: 30,
    padding: 10,
  },
  slider: {
    width: "100%",
    height: 60,
    backgroundColor: "#2D3748",
    borderRadius: 15,
  },
  thumbStyle: {
    width: 80,
    height: 80,
  },
  label: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default SliderScreen;
