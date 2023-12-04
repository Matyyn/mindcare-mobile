
import React, { useState } from "react";
import { View, Text,FlatList, StyleSheet, Switch, TouchableOpacity } from "react-native";
//import { FlashList } from "@shopify/flash-list";
import { AntDesign } from "@expo/vector-icons";
import color from "../../constants/colors";
import { BottomSheet } from "react-native-btr";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
const Reminders = ({ navigation }) => {
  const [reminderMode, switchReminderMode] = useState(true);
  const [visible, setVisible] = useState(false);
  const [reminderType, setReminderType] = useState(null);
  const [reminderTime, setReminderTime] = useState(null);

  const toggleBottomNavigationView = ({ navigation }) => {
    //Toggling the visibility state of the bottom sheet
    setVisible(!visible);
  };
  const onToggleReminderMode = () => switchReminderMode(!reminderMode);

  const Item = ({ reminderType, reminderTime, reminderSwitch }) => {
    setReminderType(reminderType);
    setReminderTime(reminderTime);
    return (
      <View style={styles.item}>
        <View style={{ flexDirection: "row", marginTop: 8 }}>
          <Switch
            value={reminderSwitch}
            onValueChange={onToggleReminderMode}
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
            onPress={toggleBottomNavigationView}
          />
        </Text>
      </View>
    );
  };

  const renderItem = ({ item }) => {
    return (
      <Item
        reminderTime={item.reminderTime}
        reminderType={item.reminderType}
        reminderSwitch={item.switch}
      />
    );
  };

  const DATA = [
    {
      reminderType: "Afternoon",
      reminderTime: "5:00pm",
      switch: true,
    },
    {
      reminderType: "Afternoon",
      reminderTime: "5:00pm",
      switch: false,
    },
    {
      reminderType: "Morning",
      reminderTime: "5:00pm",
      switch: true,
    },
    {
      reminderType: "Afternoon",
      reminderTime: "5:00pm",
      switch: true,
    },
    {
      reminderType: "Afternoon",
      reminderTime: "5:00pm",
      switch: false,
    },
    {
      reminderType: "Afternoon",
      reminderTime: "5:00pm",
      switch: true,
    },
    {
      reminderType: "Afternoon",
      reminderTime: "5:00pm",
      switch: true,
    },
    {
      reminderType: "Afternoon",
      reminderTime: "5:00pm",
      switch: true,
    },
  ];

  return (
    <View style={{ height: "90%" }}>
      <FlatList data={DATA} renderItem={renderItem} estimatedItemSize={100} />

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
                    reminder_type: reminderType,
                    reminder_time: reminderTime,
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
              <TouchableOpacity style={{ flexDirection: "row" }}>
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
