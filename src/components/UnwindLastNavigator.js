import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SleepJournal from "../screens/guided journaling/sleepJournal";
import WriteJournalScreen from "../screens/guided journaling/WritingJournal";
import UnplugAndUnwindTip from "../screens/dailyReminder/unplugAndUnwind/unplugAndUnwindTip";
import UnplugAndUnwindLastTip from "../screens/dailyReminder/unplugAndUnwind/unpluAndUnwindLastTip";
import UnplugAndUnwindAudio from "../screens/dailyReminder/unplugAndUnwind/unplugAndUnwindAudio";
import UnplugAndUnwindOverview from "../screens/dailyReminder/unplugAndUnwind/unplugAndUnwindOverview";
import InsightsTab from "./InsightsTab";
import JournalsTab from "./JournalLogsTab";
const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="unplug and unwind"
        component={UnplugAndUnwindTip}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="unplug and unwind audio"
        component={UnplugAndUnwindAudio}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="unplug and unwind overview"
        component={UnplugAndUnwindOverview}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="unplug and unwind last tip"
        component={UnplugAndUnwindLastTip}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default Navigation;
