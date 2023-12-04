import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LearningPaths from "../screens/LearningPaths/LearningPaths";
import RescueStack from '../components/RescueSessionsNavigator'
import navigationStack from '../components/Navigation'
const Stack = createNativeStackNavigator();
const Navigation = () => {
  return (
    
      <Stack.Navigator>
        <Stack.Screen
          name="Learning Paths"
          component={LearningPaths}
        />       
        <Stack.Screen
          name="Rescue Sessions"
          component={RescueStack}  
          options={{headerShown: false}}        
        /> 
         <Stack.Screen
          name="Guided Journals"
          component={navigationStack}
          options={{headerShown: false}}  
        />
      </Stack.Navigator>    
  );
};

export default Navigation;
