import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Unwind from "./UnwindLastNavigator";
import MorningJournals from "../components/MorningJournalStack";
import SleepJournal from "./SleepJournalStack";
import DailyTasks from "../screens/dailyReminder/dailyTasks";
import SetReminderScreen from "../screens/dailyReminder/setReminderScreen";
import Reminders from "../screens/dailyReminder/reminders";
import DailyReminderScreen from "../screens/dailyReminder/dailyReminderScreen";
import DeepBreathingExercise from "../screens/dailyReminder/deepBreathingExercise/deepBreathingExercise";
import DeepBreathingExerciseAudio from "../screens/dailyReminder/deepBreathingExercise/deepBreathingExerciseAudio";
import DeepBreathingExerciseOverview from "../screens/dailyReminder/deepBreathingExercise/deepBreathingExerciseOverview";
import DeepBreathingExerciseGoodWork from "../screens/dailyReminder/deepBreathingExercise/deepBreathingExerciseGoodWork";
import DeepBreathingExerciseLastTip from "../screens/dailyReminder/deepBreathingExercise/deepBreathingExerciseLastTip";
import FiveSensesGroundingTechniqueTip1 from "../screens/dailyReminder/FiveSensesGroundingTechnique/fiveSensesGroundingTechniqueTip1";
import FiveSensesGroundingTechniqueAudio from "../screens/dailyReminder/FiveSensesGroundingTechnique/fiveSensesGroundingTechniqueAudio";
import FiveSenseGroundingTechniqueLastTip from "../screens/dailyReminder/FiveSensesGroundingTechnique/fiveSenseGroundingTechniqueLastTip";
import UnplugAndUnwindAudio from "../screens/dailyReminder/unplugAndUnwind/unplugAndUnwindAudio";
import UnplugAndUnwindTip from "../screens/dailyReminder/unplugAndUnwind/unpluAndUnwindLastTip";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    // <NavigationContainer>
    <Stack.Navigator>
      {/* <Stack.Screen
          name="guided journaling main"
          component={GuidedJournalingMain}
          options={{
            headerTitle: "Journal",
            // headerRight: () => <GuiedJournalingHeader />,
          }}
        /> */}
      {/* <Stack.Screen name="Tab Navigator" component={TabNavigator} /> */}
      {/* <Stack.Screen
          name="guided journaling tips"
          component={GuidedJournalingTips}
        /> */}

      <Stack.Screen name="Daily Tasks" component={DailyTasks} />
      <Stack.Screen name="Daily Reminder" component={DailyReminderScreen} />
      <Stack.Screen
        name="Set Reminder"
        component={SetReminderScreen}
        options={{
          title: "Reminder",
        }}
      />
      <Stack.Screen name="Reminders" component={Reminders} />
      <Stack.Screen
        name="Breathing Exercises Tips"
        component={DeepBreathingExercise}
        //options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Breathing Exercises Audio"
        component={DeepBreathingExerciseAudio}
        //options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Deep Breathing Exercise Overview"
        component={DeepBreathingExerciseOverview}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="deep breathing exercise good work"
        component={DeepBreathingExerciseGoodWork}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Deep Breathing Exercise Tip"
        component={DeepBreathingExerciseLastTip}
      />
      <Stack.Screen
        name="five senses grounding technique tip1"
        component={FiveSensesGroundingTechniqueTip1}
      />
      <Stack.Screen
        name="five sense grounding technique audio"
        component={FiveSensesGroundingTechniqueAudio}
      />
      <Stack.Screen
        name="five senses grounding technique last tip"
        component={FiveSenseGroundingTechniqueLastTip}
      />
      <Stack.Screen name="UnwindLast" component={Unwind} />
      <Stack.Screen
        name="unplugunwind audio"
        component={UnplugAndUnwindAudio}
      />
      <Stack.Screen
        name="unplugunwindlast tip"
        component={UnplugAndUnwindTip}
      />
      <Stack.Screen
        name="Sleep Journal"
        component={SleepJournal}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Morning Journals"
        component={MorningJournals}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen
          name="welcome"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        /> */}
      {/* <Stack.Screen
          name="Main Screen"
          component={MainScreen}
          options={{
            headerTitle: "Main Screen",
            headerRight: () => <MainScreenHeader />,
          }}
        /> */}
      {/* <Stack.Screen name="Profile" component={Profile} /> */}

      {/* <Stack.Screen
          name="Screen1"
          component={Screen1}
          options={{ headerShown: false }}
        /> */}
      {/* <Stack.Screen
          name="Screen2"
          component={Screen2}
          options={{ headerShown: false }}
        /> */}
      {/* <Stack.Screen
          name="Screen3"
          component={Screen3}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Getting Started"
          component={GettingStarted}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SigninSplash"
          component={SigninSplash}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Create Account"
          component={CreateAccount}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Sign in"
          component={Signin}
          options={{ headerShown: false }}
        /> */}
      {/* <Stack.Screen
          name="Forgot Password"
          component={ForgotPassword}
          options={{ headerShown: false }}
        /> */}
      {/* <Stack.Screen name="Profile" component={Profile} /> */}

      {/* <Stack.Screen name="Settings" component={Setting} /> */}
      {/* <Stack.Screen
          name="WelcomeScreen"
          component={WelcomeScreen}
          options={{
            headerShown: false,
          }}
        /> */}
    </Stack.Navigator>
    // </NavigationContainer>
  );
};

export default Navigation;
