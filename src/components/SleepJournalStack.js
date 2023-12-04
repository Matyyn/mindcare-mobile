import { View, Text, Button, Settings } from "react-native";
import React from "react";
import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DailyTasks from "../screens/dailyReminder/dailyTasks";
import Signin from "../screens/Signin";
import CreateAccount from "../screens/CreateAccount";
import ForgotPassword from "../screens/ForgotPassword";
import Profile from "../screens/Profile";
import MainScreen from "../screens/MainScreen";
import Setting from "../screens/Settings";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { Header } from "react-native/Libraries/NewAppScreen";
import WelcomeScreen from "../screens/splash screens/WelcomeScreen";
import Screen1 from "../screens/splash screens/Screen1";
import Screen2 from "../screens/splash screens/Screen2";
import Screen3 from "../screens/splash screens/Screen3";
import GettingStarted from "../screens/splash screens/GettingStarted";
import SigninSplash from "../screens/splash screens/SigninSplash";
import MainScreenHeader from "../headers/mainScreenHeader";
import GuidedJournalingMain from "../screens/guided journaling/guidedJournalingMain";
import GuiedJournalingHeader from "../headers/guiedJournalingHeader";
import GuidedJournalingTips from "../screens/guided journaling/guidedJournalingTips";
import SleepJournal from "../screens/guided journaling/sleepJournal";
import WeeklyInsights from '../screens/pyscological profile/weeklyInsights'
import MonthlyInsights from '../screens/pyscological profile/monthlyInsights'
import WriteJournalScreen from "../screens/guided journaling/WritingJournal";
import CompleteJournalScreen from "../screens/guided journaling/completionScreen"
import InsightsTab from './InsightsTab'
import SelectMood from './MoodsNavigator'
import JournalsTab from './JournalLogsTab'
const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    
      <Stack.Navigator>              
        <Stack.Screen name="Sleep Journal" component={SleepJournal} />         
        <Stack.Screen
          name="writeJournal"
          component={WriteJournalScreen}
          options={{
            headerTitle: "Write Journals",
            // headerRight: () => <GuiedJournalingHeader />,
          }}
        />
        <Stack.Screen name="Insights" component={InsightsTab}/>
        <Stack.Screen name="JournalsTab" options={{
            headerTitle: "Journals Logs",        
          }} component={JournalsTab}/>        
      </Stack.Navigator>
    
  );
};

export default Navigation;
