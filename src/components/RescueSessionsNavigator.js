import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RescueSession from '../screens/rescue sessions/rescueSessionsMain'
import RStips from "../screens/rescue sessions/rescueSessionsTips";
import RStips2 from "../screens/rescue sessions/rescueSessionsTips2";
import Player from "../screens/rescue sessions/rescueSessionPlayer"
import Questions from "../screens/rescue sessions/questionsScreen"
import CompletionScreen from "../screens/rescue sessions/completionScreen"
import RescueSessionTab from "../screens/rescue sessions/rescueSessionsList"

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
      <Stack.Navigator>         
      <Stack.Screen
          name="rescue sessions main"
          component={RescueSession}
          options={{
            headerTitle: "Rescue Sessions",
          }}
        /> 
         <Stack.Screen
          name="rescue sessions tips"
          component={RStips}
          options={{
            headerTitle: "Rescue Session Tips",
          }}
        />
        <Stack.Screen
          name="rescue sessions tips2"
          component={RStips2}
          options={{
            headerTitle: "Rescue Session Tips",
          }}
        />
         <Stack.Screen
          name="Player"
          component={Player}
          // options={{
          //   headerTitle: "Rescue Session Tips",
          // }}
        />
        <Stack.Screen
          name="questions"
          component={Questions}
        /> 
       <Stack.Screen name="Completion" component={CompletionScreen} /> 
       <Stack.Screen name="RescueSessionsTab" component={RescueSessionTab}/>
    </Stack.Navigator>


  );
};

export default Navigation;
