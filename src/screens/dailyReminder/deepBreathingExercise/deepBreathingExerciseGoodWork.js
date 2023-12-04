
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import color from "../../../constants/colors";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const DeepBreathingExerciseGoodWork = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.parentContainer}>
      <View style={styles.upperContainer}>
        <Text style={{ marginLeft: 10 }}>
          <Entypo name="cross" size={24} color="white" />
        </Text>
        <Text style={styles.heading}>DEEP BREATHING EXERCISE</Text>
      </View>
      <View style={styles.mainContainer}>
        <Text style={styles.title}>Good Work</Text>
        <Text style={styles.text}>
          Use this exercise to help control your physical reactions.
        </Text>
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity
          style={styles.icon}
          onPress={() => {
            navigation.goBack("deep breathing exercis overview");
          }}
        >
          <Text>
            <AntDesign name="left" size={24} color="black" />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.icon}
          onPress={() => {
            navigation.navigate("deep breathing exercise last tip");
          }}
        >
          <Text>
            <AntDesign name="right" size={24} color="black" />
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    backgroundColor: color.orange,
    flex: 1,
    // justifyContent: "space-between",
  },
  upperContainer: {
    flexDirection: "row",
  },
  mainContainer: {
    padding: 50,
    marginVertical: 180,
  },
  heading: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
    marginLeft: 50,
  },
  text: {
    color: "white",
    fontFamily: "Inter_400Regular",
    fontSize: 22,
    marginBottom: 30,
    textAlign: "center",
  },
  icon: {
    backgroundColor: "white",
    height: 40,
    width: 40,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "stretch",
    marginTop: 45,
    marginHorizontal: 15,
  },
  title: {
    color: "white",
    fontSize: 20,
    fontFamily: "Inter_700Bold",
    textAlign: "center",
  },
});

export default DeepBreathingExerciseGoodWork;

