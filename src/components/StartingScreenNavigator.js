import { View, Text, Button, Settings } from "react-native";
import React from "react";
import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
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
import Tabs from "./TabNavigator";
import BlockedAccountScreen from "../screens/BlockedAccount";
//import GuidedJournalingMain from "../screens/guided journaling/guidedJournalingMain";
//import GuiedJournalingHeader from "../headers/guiedJournalingHeader";
//import GuidedJournalingTips from "../screens/guided journaling/guidedJournalingTips";
//import SleepJournal from "../screens/guided journaling/sleepJournal";
//import DailyReminderScreen from "../screens/splash screens/dailyReminder/dailyReminderScreen";
//import TabNavigator from "./TabNavigator";
//import SetReminderScreen from "../screens/splash screens/dailyReminder/setReminderScreen";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
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
        {/* <Stack.Screen name="Sleep Journal" component={SleepJournal} /> */}
        {/* <Stack.Screen name="Daily Reminder" component={DailyReminderScreen} />
        <Stack.Screen
          name="Set Reminder"
          component={SetReminderScreen}
          options={{
            title: "Reminder",
          }}
        /> */}
        <Stack.Screen
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
        />
          */}

        <Stack.Screen
          name="Screen1"
          component={Screen1}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Screen2"
          component={Screen2}
          options={{ headerShown: false }}
        />
        <Stack.Screen
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
        <Stack.Screen name="Create Account" component={CreateAccount} />
        <Stack.Screen
          name="Sign in"
          component={Signin}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Forgot Password"
          component={ForgotPassword}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Blocked"
          component={BlockedAccountScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Tabs"
          component={Tabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Settings" component={Setting} />
        <Stack.Screen
          name="WelcomeScreen"
          component={WelcomeScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
