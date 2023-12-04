import React from 'react';
import { View, Text } from 'react-native';
//import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MyJournals from '../screens/guided journaling/MyJournals';
import CalendarView from '../screens/guided journaling/calendarScreen';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
const Tab = createMaterialTopTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      "tabBarActiveTintColor": "black",
      "tabBarInactiveTintColor": "black",
      "tabBarLabelStyle": {
        "fontSize": 16,
        "fontWeight": 500
      },
      "tabBarStyle": {
        "elevation": 10,
        "shadowOpacity": 0
      }
    }}>
    <Tab.Screen name="My Journals" component={MyJournals} />    
    <Tab.Screen name="Calendar View" component={CalendarView} />    
  </Tab.Navigator>
);

export default TabNavigator;
