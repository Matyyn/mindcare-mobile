import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DepressionTest from'../screens/pyscological profile/depressionTest'
import DepressionTestResult from'../screens/pyscological profile/depressionTestResult'
import DepressionTestTip from'../screens/pyscological profile/depressionTipScreen'
const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    
      <Stack.Navigator>
        <Stack.Screen
          name="Depression Test Tip"
          component={DepressionTestTip}
        />       
        <Stack.Screen
          name="Depression Test"
          component={DepressionTest}  
          options={{headerBackVisible: false}}        
        /> 
         <Stack.Screen
          name="Depression Test Result"
          component={DepressionTestResult}
        />
      </Stack.Navigator>    
  );
};

export default Navigation;
