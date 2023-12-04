import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Insights from "../screens/InsightsProfile";
import InsightsTab from "./InsightsTab";
import MoodsScreen from "./MoodsScreensNavigator";
import SetReminderScreen from "../screens/dailyReminder/setReminderScreen";
import Reminders from "../screens/dailyReminder/reminders";
import SleepTracker from "./SleepTrackerNavigator"


const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    //    <NavigationContainer>
    <Stack.Navigator>      
      <Stack.Screen
        name="Set Reminder"
        component={SetReminderScreen}
        options={{
          title: "Reminder",
        }}
      />
      <Stack.Screen name="Reminders" component={Reminders} />
    </Stack.Navigator>
  );
};

export default Navigation;
