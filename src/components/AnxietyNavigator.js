
import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AnxietyTestTip from'../screens/pyscological profile/anxietyTipScreen'
import AnxietyTest from'../screens/pyscological profile/anxietyTest'
import AnxietyTestResult from'../screens/pyscological profile/anxietyTestResult'
const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    
      <Stack.Navigator>      
        <Stack.Screen
          name="Anxiety Test Tip"
          component={AnxietyTestTip}
          
        /> 
        <Stack.Screen
          name="Anxiety Test"
          component={AnxietyTest}
          options={{headerBackVisible: false}}   
        /> 
         <Stack.Screen
          name="Anxiety Test Result"
          component={AnxietyTestResult}
        />
      </Stack.Navigator>    
  );
};

export default Navigation;
