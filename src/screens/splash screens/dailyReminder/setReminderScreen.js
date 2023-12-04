import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
  Switch,
} from "react-native";
import SetReminderCard from "../../../components/SetReminderCard";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import TimePicker from "react-native-simple-time-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Entypo } from "@expo/vector-icons";
import color from "../../../constants/colors";
// import { Switch } from "react-native-paper";

const mainPicture = require("./../../../../assets/images/Happy Earth-cuate.png");
const afterGettingOutOfBed = require("./../../../../assets/images/sunrise.png");
const havingLunch = require("./../../../../assets/images/lunch-time.png");

const SetReminderScreen = ({ navigation }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [reminderTime, setReminderTime] = useState("00:00");
  const [dailyReminder, setDailyReminder] = useState(false);
  const [reminderType, setReminderType] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    currentTime();
  }, []);

  const currentTime = () => {
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const time = `${hours}:${minutes}`;
    setReminderTime(time);
  };

  const setReminder = () => {
    // alert();
    console.log("inside set reminder");
    console.log(reminderTime);
    console.log("reminder type: ", reminderType);
    console.log("daily reminder:", dailyReminder);
  };

  const onToggleDailyReminder = (title) => {
    setDailyReminder(!dailyReminder);
    console.log("switch:", dailyReminder);
    // console.log(title);
    setReminderType(title);
    console.log(reminderType);
    setIsButtonDisabled(!dailyReminder); // Enable the button when the switch is true
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    const selectedTime = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    console.log(selectedTime);
    hideDatePicker();
    setReminderTime(selectedTime);
  };

  return (
    <View>
      <Image
        resizeMode="contain"
        style={{
          height: "50%",
          width: "60%",
          marginTop: -70,
          marginBottom: -75,
          alignSelf: "center",
        }}
        source={{
          uri: "https://firebasestorage.googleapis.com/v0/b/mindcare-691a2.appspot.com/o/set-reminder-images%2FHappy%20Earth-cuate.png?alt=media&token=f296e18d-22c0-42fc-87cb-a73299113724",
        }}
      />
      <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 20 }}>
        Build your own routine
      </Text>
      <Text style={{ textAlign: "center" }}>
        I commit to completing a session:
      </Text>
      <View>
        <View style={styles.cardContainer}>
          <TouchableOpacity
            onPress={() => onToggleDailyReminder("After getting out of bed")}
          >
            <SetReminderCard
              title="After getting out of bed"
              image="https://firebasestorage.googleapis.com/v0/b/mindcare-691a2.appspot.com/o/set-reminder-images%2Fsunrise.png?alt=media&token=5c7f0513-2b3d-4157-9573-3b534c649798"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onToggleDailyReminder("After Breakfast")}
          >
            <SetReminderCard
              title="After Breakfast"
              image="https://firebasestorage.googleapis.com/v0/b/mindcare-691a2.appspot.com/o/set-reminder-images%2Fbreakfast.png?alt=media&token=48a93895-1232-4b66-8a1c-a5d28633fd3e"
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => onToggleDailyReminder("Having Lunch/Dinner")}
          >
            <SetReminderCard
              title="Having Lunch/Dinner"
              image="https://firebasestorage.googleapis.com/v0/b/mindcare-691a2.appspot.com/o/set-reminder-images%2Flunch-time.png?alt=media&token=e79c7049-41dd-4cf6-87da-a154ec52cca9"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.cardContainer}>
          <TouchableOpacity onPress={() => onToggleDailyReminder("After Work")}>
            <SetReminderCard
              title="After Work"
              image="https://firebasestorage.googleapis.com/v0/b/mindcare-691a2.appspot.com/o/set-reminder-images%2Fhard-work.png?alt=media&token=8c98b4d8-ba62-4550-adf4-8bdf999d4a41"
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => onToggleDailyReminder("Before Bed")}>
            <SetReminderCard
              title="Before Bed"
              image="https://firebasestorage.googleapis.com/v0/b/mindcare-691a2.appspot.com/o/set-reminder-images%2Fmoon.png?alt=media&token=da54b17a-0516-48bd-a038-6c40bea4e50d"
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => onToggleDailyReminder("Add your own")}
          >
            <SetReminderCard
              title="Add your own"
              image="https://firebasestorage.googleapis.com/v0/b/mindcare-691a2.appspot.com/o/set-reminder-images%2Fbreakfast.png?alt=media&token=48a93895-1232-4b66-8a1c-a5d28633fd3e"
            />
          </TouchableOpacity>
        </View>
      </View>

      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            width: "50%",
            alignSelf: "center",
            marginTop: 10,
          }}
        >
          <Text>at</Text>
          {/* <TextInput style={styles.textInput} value={reminderTime}></TextInput> */}
          <View style={styles.textInput}>
            <Text>{reminderTime}</Text>
            <TouchableOpacity>
              <Text>
                <Entypo
                  name="chevron-small-down"
                  size={24}
                  color="black"
                  onPress={showDatePicker}
                />
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={{ color: color.darkGrey }}>everyday</Text>
        </View>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="time"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>
      <View
        style={{
          height: 50,
          // backgroundColor: "yellow",
          flexDirection: "row",
          justifyContent: "space-around",
          marginTop: 15,
        }}
      >
        <Text
          style={{ fontFamily: "Inter_700Bold", fontSize: 17, marginTop: 8 }}
        >
          Daily Reminder
        </Text>
        <Switch
          value={dailyReminder}
          onValueChange={onToggleDailyReminder}
          trackColor={{ true: color.lightGrey, false: "black" }}
          thumbColor={reminderTime ? "white" : "white"}
        />
      </View>
      <View style={styles.buttonParent}>
        <TouchableOpacity
          style={styles.button}
          onPress={setReminder}
          disabled={isButtonDisabled}

          // onSubmit={handleSubmit}
        >
          <Text
            style={{
              color: "white",
              fontFamily: "Inter_700Bold",
              fontSize: 20,
            }}
          >
            Set Reminder
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    // backgroundColor: "red",
  },
  textInput: {
    borderWidth: 1,
    width: 100,
    height: 30,
    textAlign: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    borderRadius: 5,
    borderColor: color.darkGrey,
  },
  buttonParent: {
    // marginTop: "10%",
    alignItems: "center",
  },
  button: {
    backgroundColor: color.grey,
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    width: "90%",
  },
});

export default SetReminderScreen;
