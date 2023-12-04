
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const DailyReminderScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Daily Reminder</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Reminders")}>
        <Text>Set Reminder</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({});

export default DailyReminderScreen;
