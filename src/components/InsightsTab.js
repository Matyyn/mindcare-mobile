import React from "react";
import { View, Text } from "react-native";
//import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DailyInsights from "../screens/pyscological profile/dailyInsights";
import WeeklyInsights from "../screens/pyscological profile/weeklyInsights";
import MonthlyInsights from "../screens/pyscological profile/monthlyInsights";
//import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
const Tab = createMaterialTopTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    tabBarOptions={{
      style: { elevation: 10, shadowOpacity: 0 },
      labelStyle: { fontSize: 16, fontWeight: "bold" },
      activeTintColor: "black",
      inactiveTintColor: "black",
    }}
  >
    {/* <Tab.Screen name="Daily" component={DailyInsights} /> */}
    <Tab.Screen name="Weekly" component={WeeklyInsights} />
    <Tab.Screen name="Monthly" component={MonthlyInsights} />
  </Tab.Navigator>
);

export default TabNavigator;
