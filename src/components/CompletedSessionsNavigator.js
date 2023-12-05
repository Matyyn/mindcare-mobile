import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CompletedSessions from '../screens/FindingTherapistScreens/CompletedSessions'
import ChatScreen from '../screens/FindingTherapistScreens/chatScreen'
import ReviewScreen from '../screens/FindingTherapistScreens/Review'
import CallScreen from '../screens/FindingTherapistScreens/CallScreen'
const Stack = createNativeStackNavigator();
const Navigation = ({navigation}) => {
  return (
      <Stack.Navigator>    
        <Stack.Screen
          name="Completed Sessions"
          component={CompletedSessions}
          options={{headerShown:false}}
        />
        <Stack.Screen
          name="Chat"
          component={ChatScreen}
        />   
        <Stack.Screen
          name="Call"
          component={CallScreen}
        />          
        <Stack.Screen
          name="Review"
          component={ReviewScreen}
        />                   
      </Stack.Navigator>    
  );
};

export default Navigation;
