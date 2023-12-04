
import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MainScreenHeader from "../headers/mainScreenHeader";
import GuidedJournalingMain from "./guidedJournalingMain";
import GuiedJournalingHeader from "../headers/guiedJournalingHeader";
import GuidedJournalingTips from "../screens/guided journaling/guidedJournalingTips";
import SleepJournal from "../screens/guided journaling/sleepJournal";
import WeeklyInsights from '../screens/pyscological profile/weeklyInsights'
import MonthlyInsights from '../screens/pyscological profile/monthlyInsights'
import WriteJournalScreen from "../screens/guided journaling/WritingJournal";
import CompleteJournalScreen from "../screens/guided journaling/completionScreen"
import InsightsTab from './InsightsTab'
import JournalsTab from './JournalLogsTab'
const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>      
        <Stack.Screen
          name="guided journaling main"
          component={GuidedJournalingMain}
          options={{
            headerTitle: "Journals",
            // headerRight: () => <GuiedJournalingHeader />,
          }}
        /> 
         <Stack.Screen
          name="guided journaling tips"
          component={GuidedJournalingTips}
        />
        <Stack.Screen
          name="writeJournal"
          component={WriteJournalScreen}
          options={{
            headerTitle: "Write Journals",
            // headerRight: () => <GuiedJournalingHeader />,
          }}
        />
        <Stack.Screen
          name="completeJournal"
          component={CompleteJournalScreen}
          options={{
            headerTitle: "Complete Journal",
            // headerRight: () => <GuiedJournalingHeader />,
          }}
        />
        <Stack.Screen name="Sleep Journal" component={SleepJournal} /> 
        <Stack.Screen name="Insights" component={InsightsTab}/>
        <Stack.Screen name="JournalsTab" component={JournalsTab}/>
        {/* <Stack.Screen
          name="welcome"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
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
    </NavigationContainer>
  );
};

export default Navigation;
