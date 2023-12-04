import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Switch,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import color from "../../constants/colors";
import { BottomSheet } from "react-native-btr";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import axios from "axios";
import useStore from "../zustand/store";
import { trackEvent } from "@aptabase/react-native";

const Reminders = ({ navigation }) => {
  const [visible, setVisible] = useState(false);
  const [reminders, setReminders] = useState([]);
  const [selectedReminderId, setSelectedReminderId] = useState("id");

  const { responseData } = useStore();

  useEffect(() => {
    trackEvent("Reminders");
    console.log("inside reminders useeffect");
    axios.get(`/reminders/${responseData._id}`).then((response) => {
      console.log("reminders response: ", response);
      console.log("reminders response data ", response.data.data);
      setReminders(response.data.data);
    });
  }, []);
  useEffect(() => {}, [reminders]);
  const toggleBottomNavigationView = () => {
    setVisible(!visible);
    console.log("reminder id inside bottom van view2: ", selectedReminderId);
  };
  // const onToggleReminderMode = () => switchReminderMode(!reminderMode);
  const onToggleReminderMode = (reminderId) => {
    setReminders((prevReminders) =>
      prevReminders.map((reminder) =>
        reminder._id === reminderId
          ? { ...reminder, turnOn: !reminder.turnOn }
          : reminder
      )
    );
    const found = reminders.find((reminder) => reminder._id == reminderId);
    console.log("found: ", found.turnOn);
    axios
      .patch(`/reminders/${reminderId}`, { turnOn: !found.turnOn })
      .then((response) => {
        console.log("response: ", response.data);
      });
  };

  const test = (reminderId) => {
    console.log("inside test");
    console.log("reminder id: ", reminderId);
    setSelectedReminderId(reminderId);
    console.log("selectedReminderId: ", selectedReminderId);
  };
  useEffect(() => {
    console.log("selectedReminderId changed: ", selectedReminderId);
    if (selectedReminderId != "id") {
      toggleBottomNavigationView();
    }
  }, [selectedReminderId]);

  const Item = ({ reminderType, reminderTime, reminderSwitch, reminderId }) => {
    // setReminderType(reminderType);
    // setReminderTime(reminderTime);
    // console.log("Item. ReminderId: ", reminderId);
    return (
      <View style={styles.item}>
        <View style={{ flexDirection: "row", marginTop: 8 }}>
          <Switch
            value={reminderSwitch}
            // onValueChange={onToggleReminderMode}
            onValueChange={() => onToggleReminderMode(reminderId)}
            trackColor={{ true: "black", false: color.lightGrey }}
            thumbColor={reminderTime ? "white" : "white"}
          />
          <View>
            <Text>{reminderType}</Text>
            <Text>{reminderTime}</Text>
          </View>
        </View>

        <Text style={{ marginTop: 20, marginRight: 10 }}>
          <AntDesign
            name="right"
            size={15}
            color="black"
            onPress={() => {
              test(reminderId);
            }}
          />
        </Text>
      </View>
    );
  };

  const renderItem = ({ item }) => {
    // console.log("item id: ", item._id);
    return (
      <Item
        reminderTime={item.time}
        reminderType={item.type}
        reminderSwitch={item.turnOn}
        reminderId={item._id}
      />
    );
  };

  const deleteReminder = () => {
    console.log("inside delete func");
    console.log("reminder id: ", selectedReminderId);
    axios
      .delete(`/reminders/${selectedReminderId}`)
      .then(() => {
        setReminders((prevData) =>
          prevData.filter((reminder) => reminder._id !== selectedReminderId)
        );
        ToastAndroid.show("Reminder Deleted!", ToastAndroid.LONG);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <View style={{ height: "90%" }}>
      <FlatList
        data={reminders}
        renderItem={renderItem}
        estimatedItemSize={100}
      />

      <View style={styles.buttonParent}>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate("Set Reminder", {
              flag: "without params",
            })
          }
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
      <BottomSheet
        visible={visible}
        //setting the visibility state of the bottom shee
        onBackButtonPress={toggleBottomNavigationView}
        //Toggling the visibility state on the click of the back botton
        onBackdropPress={toggleBottomNavigationView}
      >
        <View style={styles.bottomNavigationView}>
          <Text
            style={{ alignSelf: "flex-start", marginLeft: 10, marginTop: 10 }}
          >
            <Entypo
              name="cross"
              size={24}
              color="black"
              onPress={toggleBottomNavigationView}
            />
          </Text>
          <View style={{ marginLeft: 50, marginTop: 60 }}>
            <View style={{ marginBottom: 10 }}>
              <TouchableOpacity
                style={{ flexDirection: "row" }}
                onPress={() => {
                  navigation.navigate("Set Reminder", {
                    flag: "with params",
                    reminderId: selectedReminderId,
                  });
                }}
              >
                <Text>
                  <Feather name="edit-3" size={24} color="black" />
                </Text>
                <Text
                  style={{
                    fontFamily: "Inter_700Bold",
                    fontSize: 16,
                    color: color.grey,
                    marginLeft: 10,
                  }}
                >
                  Edit/View reminder
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                style={{ flexDirection: "row" }}
                onPress={deleteReminder}
              >
                <Text>
                  <MaterialCommunityIcons
                    name="delete-outline"
                    size={24}
                    color="black"
                  />
                </Text>
                <Text
                  style={{
                    fontFamily: "Inter_700Bold",
                    fontSize: 16,
                    color: color.grey,
                    marginLeft: 10,
                  }}
                >
                  Delete this reminder
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    height: 70,
    backgroundColor: "white",
    margin: 10,
    borderRadius: 10,
    padding: 5,
    justifyContent: "space-between",
    elevation: 5,
  },
  buttonParent: {
    marginTop: 55,
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
    height: 250,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
});

export default Reminders;
