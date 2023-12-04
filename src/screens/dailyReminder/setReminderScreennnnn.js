
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
} from "react-native";
import { BottomSheet } from "react-native-btr";

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

  const handleCardPress = (title, id) => {
    console.log(title);
    console.log(id);
    setSelectedCard(title);
    setReminderId(id);
    setDailyReminder(true);
  };

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
    console.log("reminder type: ", selectedCard);
    console.log("daily reminder:", dailyReminder);
    Alert.alert(null, "Reminder set", [
      {
        text: "OK",
        onPress: () => navigation.navigate("Reminders"),
      },
    ]);
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
    const [isSelected, setSelection] = useState(false);
    const [checked, setChecked] = useState(false);
    // key = { reminderId };
    const check = () => {
      console.log("hello");
      console.log(image);
    };
    return (
      <View style={styles.setReminderCardContainer}>
        {/* <TouchableOpacity onPress={check}> */}
        {/*     <Checkbox value={isSelected} onValueChange={setSelection} /> */}
        <Checkbox
          status={checkBoxState ? "checked" : "unchecked"}
          onPress={() => {
            console.log(isActive);
            setChecked(checkBoxState);
          }}
        />
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
      {renderCardRow(0, 3)}
      {renderCardRow(3, 6)}

      {/* <View>
        <View style={styles.cardContainer}>
          <TouchableOpacity
            onPress={() => {
              handleCardPress("After getting out of bed");
              setActive(!active);
            }}
          >
            <SetReminderCard
              isActive={active}
              setActive={setActive}
              title="After getting out of bed"
              image="https://firebasestorage.googleapis.com/v0/b/mindcare-691a2.appspot.com/o/set-reminder-images%2Fsunrise.png?alt=media&token=5c7f0513-2b3d-4157-9573-3b534c649798"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              handleCardPress("After Breakfast");
              setActive(!active);
            }}
          >
            <SetReminderCard
              isActive={active}
              title="After Breakfast"
              image="https://firebasestorage.googleapis.com/v0/b/mindcare-691a2.appspot.com/o/set-reminder-images%2Fbreakfast.png?alt=media&token=48a93895-1232-4b66-8a1c-a5d28633fd3e"
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              handleCardPress("Having Lunch/Dinner");
              setActive(!active);
            }}
          >
            <SetReminderCard
              isActive={active}
              title="Having Lunch/Dinner"
              image="https://firebasestorage.googleapis.com/v0/b/mindcare-691a2.appspot.com/o/set-reminder-images%2Flunch-time.png?alt=media&token=e79c7049-41dd-4cf6-87da-a154ec52cca9"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.cardContainer}>
          <TouchableOpacity
            onPress={() => {
              handleCardPress("After Work");
              setActive(!active);
            }}
          >
            <SetReminderCard
              isActive={active}
              title="After Work"
              image="https://firebasestorage.googleapis.com/v0/b/mindcare-691a2.appspot.com/o/set-reminder-images%2Fhard-work.png?alt=media&token=8c98b4d8-ba62-4550-adf4-8bdf999d4a41"
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              handleCardPress("Before Bed");
              setActive(!active);
            }}
          >
            <SetReminderCard
              title="Before Bed"
              image="https://firebasestorage.googleapis.com/v0/b/mindcare-691a2.appspot.com/o/set-reminder-images%2Fmoon.png?alt=media&token=da54b17a-0516-48bd-a038-6c40bea4e50d"
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={toggleBottomNavigationView}>
            <SetReminderCard
              isActive={active}
              title="Add your own"
              image="https://firebasestorage.googleapis.com/v0/b/mindcare-691a2.appspot.com/o/set-reminder-images%2Fadd%20task.png?alt=media&token=2c903988-589b-40c8-be7e-579b8586018a"
            />
          </TouchableOpacity>
        </View>
      </View> */}

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
                style={styles.button}
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
  button: {
    backgroundColor: color.grey,
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    width: "90%",
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
    width: 110,
    height: 135,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "white",
    elevation: 5,
  },
});

export default SetReminderScreen;
