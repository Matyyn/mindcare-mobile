import React from "react";
import { TouchableOpacity } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TipScreen from '../screens/sleepTracker/TipScreen'
import SleepInfo from '../screens/sleepTracker/SleepInformationScreen'
import InfoScreen from '../screens/sleepTracker/InformationScreen'
import FitnessInfo from '../screens/sleepTracker/FitnessTipScreen'
import SelectionScreen from '../screens/sleepTracker/selectionScreen'
import FitnessInfoGetting from '../screens/sleepTracker/fitnessTrackerInformationScreen'
import FitnessInformation from '../screens/sleepTracker/fitnessInformationScreen'
import { Ionicons } from "@expo/vector-icons";
const Stack = createNativeStackNavigator();
const Navigation = ({navigation}) => {
  return (
      <Stack.Navigator>    
        <Stack.Screen
          name="Trackers"
          component={SelectionScreen}
          // options={{
          //   headerRight: () => (
          //     <TouchableOpacity onPress={() => navigation.navigate('Information Screen')}>
          //       <Ionicons name="fitness" size={35} style={{marginRight:10}} color="black" />
          //     </TouchableOpacity>
          //   )
          // }}
        />
        <Stack.Screen
          name="Fitness Tracker Tip"
          component={FitnessInfo}
          options={{
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate('Fitness Information Screen')}>
                <Ionicons name="fitness" size={35} style={{marginRight:10}} color="black" />
              </TouchableOpacity>
            )
          }}
        />        
        <Stack.Screen
          name="Fitness Schedule"
          component={FitnessInfoGetting}
          options={{
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate('Fitness Information Screen')}>
                <Ionicons name="fitness" size={35} style={{marginRight:10}} color="black" />
              </TouchableOpacity>
            )
          }}
        />  
        <Stack.Screen
          name="Fitness Information Screen"
          component={FitnessInformation}
        />  
        <Stack.Screen
          name="Sleep Tracker Tip"
          component={TipScreen}
          options={{
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate('Information Screen')}>
                <Ionicons name="fitness" size={35} style={{marginRight:10}} color="black" />
              </TouchableOpacity>
            )
          }}
        />      
        <Stack.Screen
          name="Sleep Schedule"
          component={SleepInfo}
          options={{
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate('Information Screen')}>
                <Ionicons name="fitness" size={35} style={{marginRight:10}} color="black" />
              </TouchableOpacity>
            )
          }}
        />  
        <Stack.Screen
          name="Information Screen"
          component={InfoScreen}
        />  
      </Stack.Navigator>    
  );
};

export default Navigation;
