import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  TouchableOpacity,
  Switch,
  Button,
  TextInput,
  ScrollView,
} from "react-native";
import { BottomSheet } from "react-native-btr";
import useStore from "../zustand/store";
import axios from "axios";
//import TimePicker from "react-native-simple-time-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Entypo } from "@expo/vector-icons";
import color from "../../constants/colors";
import { Checkbox } from "react-native-paper";

const SetReminderScreen = ({ route, navigation }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [reminderTime, setReminderTime] = useState("00:00");
  const [dailyReminder, setDailyReminder] = useState(true);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [selectedCard, setSelectedCard] = useState(null);
  const [visible, setVisible] = useState(false);
  const [customTask, setCustomTask] = useState("");
  const [checked, setChecked] = useState(false);
  const [reminderId, setReminderId] = useState(null);
  const { responseData } = useStore();
  const [userId, setUserId] = useState();
  const [paramsReminderId, setParamsReminderId] = useState("");
  // let flag;
  // if (route.params) {
  //   // const { reminderId } = route.params;
  //   console.log("route params rmeinder id: ", route.params.reminderId);
  //   flag = route.params.reminderId;
  //   console.log("flag: ", flag);
  //   // setParamsReminderId(flag);
  // }
  useEffect(() => {
    setUserId(responseData._id);
  }, [responseData]);
  if (route.flag == "with params") {
    const { reminder_type, reminder_time } = route.params;
  }
  const toggleBottomNavigationView = () => {
    //Toggling the visibility state of the bottom sheet
    setVisible(!visible);
  };

  useEffect(() => {
    currentTime();
  }, []);

  const cardData = [
    {
      id: 0,
      title: "After getting out of bed",
      checkBoxState: false,
      image:
        "https://firebasestorage.googleapis.com/v0/b/mindcare-691a2.appspot.com/o/set-reminder-images%2Fsunrise.png?alt=media&token=5c7f0513-2b3d-4157-9573-3b534c649798",
    },
    {
      id: 1,
      title: "After Breakfast",
      checkBoxState: false,
      image:
        "https://firebasestorage.googleapis.com/v0/b/mindcare-691a2.appspot.com/o/set-reminder-images%2Fbreakfast.png?alt=media&token=48a93895-1232-4b66-8a1c-a5d28633fd3e",
    },
    {
      id: 2,
      title: "Having Lunch/Dinner",
      checkBoxState: false,
      image:
        "https://firebasestorage.googleapis.com/v0/b/mindcare-691a2.appspot.com/o/set-reminder-images%2Flunch-time.png?alt=media&token=e79c7049-41dd-4cf6-87da-a154ec52cca9",
    },
    {
      id: 3,
      title: "After work",
      checkBoxState: false,
      image:
        "https://firebasestorage.googleapis.com/v0/b/mindcare-691a2.appspot.com/o/set-reminder-images%2Fhard-work.png?alt=media&token=8c98b4d8-ba62-4550-adf4-8bdf999d4a41",
    },
    {
      id: 4,
      title: "Before Bed",
      checkBoxState: false,
      image:
        "https://firebasestorage.googleapis.com/v0/b/mindcare-691a2.appspot.com/o/set-reminder-images%2Fmoon.png?alt=media&token=da54b17a-0516-48bd-a038-6c40bea4e50d",
    },
    {
      id: 5,
      title: "Add your own",
      image:
        "https://firebasestorage.googleapis.com/v0/b/mindcare-691a2.appspot.com/o/set-reminder-images%2Fadd%20task.png?alt=media&token=2c903988-589b-40c8-be7e-579b8586018a",
    },
  ];

  const handleCardPress = (title) => {
    console.log("title: ", title);
    setSelectedCard(title);
    setDailyReminder(true);
  };

  const currentTime = () => {
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const time = `${hours}:${minutes}`;
    // console.log("current reminder time: ", time);

    setReminderTime(time);
  };

  const setReminder = async () => {
    // alert();
    setCustomTask("");
    console.log("inside set reminder");
    console.log(reminderTime);
    console.log("reminder type: ", selectedCard);
    console.log("daily reminder:", dailyReminder);
    const setReminderObject = {
      clientId: userId,
      type: selectedCard,
      time: reminderTime,
      repeatDaily: dailyReminder,
      turnOn: true,
    };

//    console.log("SET reminder object: ", setReminderObject);
    if (route.params) {
       console.log(route.params.flag)
      if (route.params.flag == "with params") {
  ///      console.log("inside if route params");
     //   console.log("route.params.reminderId: ", route.params.reminderId);
      await  axios.patch(`/reminders/${route.params.reminderId}`, setReminderObject)
          .then((response) => {
            //console.log("response: ", response.data);
            setParamsReminderId("");
            Alert.alert(null, "Reminder set", [
              {
                text: "OK",
                onPress: () => navigation.navigate("Reminders"),
              },
            ]);
          });
      } else {
        const response = await axios.post(
          `/reminders/${userId}`,
          setReminderObject
        );
        console.log("set reminder response: ", response);
        Alert.alert(null, "Reminder set", [
          {
            text: "OK",
            onPress: () => navigation.navigate("Reminders"),
          },
        ]);
      }
    } else {
      const response = await axios.post(
        `/reminders/${userId}`,
        setReminderObject
      );
      console.log("set reminder response: ", response);
      Alert.alert(null, "Reminder set", [
        {
          text: "OK",
          onPress: () => navigation.navigate("Reminders"),
        },
      ]);
    }
  };

  const setRoutine = () => {
    toggleBottomNavigationView();
    handleCardPress(customTask);
  };

  const onToggleDailyReminder = () => {
    setDailyReminder(!dailyReminder);
    console.log("switch:", dailyReminder);
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

  const renderCardRow = (start, end) => {
    console.log("data id:", cardData.id);
    // if (end == cardData.length) {
    //   return <SetReminderCard title={cardData.title} image={cardData.image} />;
    // } else {
    return (
      <View style={styles.cardContainer}>
        {cardData.slice(start, end).map((data) => {
          console.log(data.id);
          if (data.id !== 5) {
            return (
              <TouchableOpacity
                key={data.id}
                onPress={() => {
                  handleCardPress(data.title, data.id);
                }}
              >
                <SetReminderCard
                  checkBoxState={data.checkBoxState}
                  title={data.title}
                  image={data.image}
                />
              </TouchableOpacity>
            );
          }
          if (data.id == 5) {
            return (
              <TouchableOpacity
                key={data.id}
                onPress={toggleBottomNavigationView}
              >
                <SetReminderCard title={data.title} image={data.image} />
              </TouchableOpacity>
            );
          }
        })}
      </View>
    );
    // }
  };

  const SetReminderCard = ({
    title,
    image,
    isActive,
    checkBoxState,
    reminderId,
  }) => {
    // const [isSelected, setSelection] = useState(false);
    // const [checked, setChecked] = useState(false);
    // key = { reminderId };
    const check = () => {
      console.log("hello");
      console.log(image);
    };
    return (
      <View style={styles.setReminderCardContainer}>
        {/* <TouchableOpacity onPress={check}> */}
        {/*     <Checkbox value={isSelected} onValueChange={setSelection} /> */}
        <Image
          resizeMode="contain"
          style={{
            height: "40%",
            width: "60%",
            alignSelf: "center",
          }}
          source={{
            uri: image,
          }}
        />

        <Text style={{ textAlign: "center", marginTop: 2 }}>{title}</Text>
        {/* </TouchableOpacity> */}
      </View>
    );
  };

  const [active, setActive] = useState(false);

  return (
    <View>
      <Image
        resizeMode="contain"
        style={{
          height: "50%",
          width: "60%",
          marginTop: -50,
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
      {renderCardRow(0, 3)}
      {renderCardRow(3, 6)}

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
      {selectedCard != null && dailyReminder && (
        <View
          style={{
            height: 50,
            // backgroundColor: "yellow",
            flexDirection: "row",
            justifyContent: "space-around",
            marginTop: 15,
            marginBottom: 16,
          }}
        >
          <Text
            style={{
              fontFamily: "Inter_700Bold",
              fontSize: 17,
              marginTop: 8,
            }}
          >
            Daily Reminder
          </Text>
          <Switch
            value={dailyReminder}
            onValueChange={onToggleDailyReminder}
            trackColor={{ true: "black", false: color.lightGrey }}
            thumbColor={reminderTime ? "white" : "white"}
          />
        </View>
      )}
      {/* <Button
      onPress={toggleBottomNavigationView}
      //on Press of the button bottom sheet will be visible
      title="Show Bottom Sheet"
    /> */}
      <ScrollView>
        <BottomSheet
          visible={visible}
          //setting the visibility state of the bottom shee
          onBackButtonPress={toggleBottomNavigationView}
          //Toggling the visibility state on the click of the back botton
          onBackdropPress={toggleBottomNavigationView}
        >
          <View style={styles.bottomNavigationView}>
            <Text
              style={{ alignSelf: "flex-end", marginRight: 15, marginTop: 10 }}
            >
              <Entypo
                name="cross"
                size={24}
                color="black"
                onPress={toggleBottomNavigationView}
              />
            </Text>
            <View
            // style={{
            //   flex: 1,
            //   flexDirection: "column",
            //   justifyContent: "space-between",
            // }}
            >
              <Text
                style={{
                  textAlign: "center",
                  padding: 20,
                  fontSize: 20,
                }}
              >
                Add your own routine
              </Text>
              <TextInput
                value={customTask}
                onChangeText={(text) => setCustomTask(text)}
                style={{ borderBottomWidth: 1, padding: 10 }}
                placeholder="Eg. After shutting down my laptop"
              />
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 8,
                }}
              >
                <Text>It's best to be as specific as possible!</Text>
                {/* <Text>0/24</Text> */}
              </View>
              <View style={styles.buttonParent}>
                <TouchableOpacity
                  style={styles.setRoutineButton}
                  onPress={setRoutine}
                  // onSubmit={handleSubmit}
                >
                  <Text
                    style={{
                      color: "white",
                      fontFamily: "Inter_700Bold",
                      fontSize: 20,
                    }}
                  >
                    Set Routine
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </BottomSheet>
      </ScrollView>
      <View style={styles.buttonParent}>
        <TouchableOpacity
          style={styles.button}
          onPress={setReminder}
          disabled={dailyReminder && selectedCard ? false : true}

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
  parentContainer: {},

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
    marginTop: 15,
    alignItems: "center",
  },
  setRoutineButton: {
    backgroundColor: color.grey,
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    width: "90%",
    // position: "absolute",
    marginTop: 5,
    bottom: 0,
  },
  button: {
    backgroundColor: color.grey,
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    width: "90%",
    position: "absolute",
    bottom: 0,
  },
  bottomNavigationView: {
    backgroundColor: "#fff",
    width: "100%",
    height: 280,
    // justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  setReminderCardContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 110,
    height: 135,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "white",
    elevation: 5,
  },
});

export default SetReminderScreen;
