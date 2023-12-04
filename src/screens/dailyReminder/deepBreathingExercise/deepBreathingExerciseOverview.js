
import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import color from "../../../constants/colors";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const DeepBreathingExerciseOverview = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.parentContainer}>
      <View style={styles.upperContainer}>
        <Text style={{ marginLeft: 10 }}>
          <Entypo name="cross" size={24} color="white" />
        </Text>
        <Text style={styles.heading}>DEEP BREATHING EXERCISE</Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Overview</Text>
        <Text style={styles.text}>
          Inhale slowly and deeply through your nose for 3 seconds. Your
          shoulders should be relazed. Your stomach pushed out, and chest should
          slightly.
        </Text>
        <Text style={styles.text}>
          Exhale slowly thorugh your mouth for 3 seconds.
        </Text>
        <Text style={styles.text}>
          As you blow air out, purse your lips slightly, but keep your jaw
          relaxed. You may hear a soft whosshing sound as you exhale.
        </Text>
        <Text style={styles.text}>Repeat thid 10 times.</Text>
      </View>
      <View>
        <TouchableOpacity
          style={styles.forBackContainer}
          onPress={() => {
            navigation.goBack("five sense grounding technique audio");
          }}
        >
          <Text>Audio Mode</Text>
          <MaterialIcons name="menu-book" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity
          style={styles.icon}
          onPress={() => {
            navigation.goBack("five sense grounding technique audio");
          }}
        >
          <Text>
            <AntDesign name="left" size={24} color="black" />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.icon}
          onPress={() => {
            navigation.navigate("deep breathing exercise good work");
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
    backgroundColor: color.grey,
    flex: 1,
    // justifyContent: "space-between",
  },
  upperContainer: {
    flexDirection: "row",
  },
  contentContainer: {
    padding: 15,
  },
  title: {
    color: "white",
    fontSize: 22,
    fontFamily: "Inter_700Bold",
  },
  text: {
    color: "white",
    fontFamily: "Inter_700Bold",
    fontSize: 16,
    marginBottom: 30,
  },
  heading: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
    marginLeft: 50,
  },
  forBackContainer: {
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-around",
    borderRadius: 20,
    width: 150,
    alignSelf: "center",
    padding: 10,
    marginTop: 180,
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
    marginTop: 40,
    marginHorizontal: 15,
  },
});

export default DeepBreathingExerciseOverview;
