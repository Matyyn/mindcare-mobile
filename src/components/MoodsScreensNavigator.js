import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MainScreen from "../screens/pyscological profile/MainPyschologicalScreen";
import AnxietyTest from "./AnxietyNavigator";
import DepressionTest from "./DepressionNavigator";
import Insights from "./InsightsTab";
import { Ionicons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();
const Navigation = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main Screen"
        component={MainScreen}
        options={{
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate("Insights")}>
              <Ionicons name="add-circle" size={30} color="black" />
            </TouchableOpacity>
          ),
          //headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="Anxiety Test"
        component={AnxietyTest}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Depression Test"
        component={DepressionTest}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default Navigation;
