import React from "react";
import { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Divider, Text, Switch } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import color from "../constants/colors";

const Settings = () => {
  const [darkMode, switchDarkMode] = useState(false);
  const [pushNotification, switchPushNotification] = useState(false);

  const onToggleDarkMode = () => switchDarkMode(!darkMode);
  const onTogglePushNotification = () => switchPushNotification(!darkMode);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={{ marginRight: 10 }}>
        <Text style={{ fontWeight: "bold", marginBottom: 7, fontSize: 17 }}>
          Application Settings
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ marginTop: 13, fontSize: 15 }}>Dark Mode</Text>
          <Switch value={darkMode} onValueChange={onToggleDarkMode} />
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ marginTop: 13, fontSize: 15 }}>
            Push Notifications
          </Text>
          <Switch
            value={pushNotification}
            onValueChange={onTogglePushNotification}
          />
        </View>

        <Divider />
      </View>
      <View>
        <Text style={styles.heading}>Payment Settings</Text>
        <View style={styles.content}>
          <Text style={styles.text}>Payment Cards</Text>
          <AntDesign name="right" size={15} color="black" />
        </View>
        <View style={styles.content}>
          <Text style={styles.text}>Transaction History</Text>
          <AntDesign name="right" size={15} color="black" />
        </View>
        <View style={styles.content}>
          <Text style={styles.text}>Delete Account</Text>
          <AntDesign name="right" size={15} color="black" />
        </View>
        <View style={styles.content}>
          <Text style={styles.text}>Logout</Text>
          <AntDesign name="right" size={15} color="black" />
        </View>
        <Divider />
      </View>
      <View>
        <Text style={styles.heading}>Account Settings</Text>
        <View style={styles.content}>
          <Text style={styles.text}>Invite Friends</Text>
          <AntDesign name="right" size={15} color="black" />
        </View>
        <View style={styles.content}>
          <Text style={styles.text}>Change Password</Text>
          <AntDesign name="right" size={15} color="black" />
        </View>
        <View style={styles.content}>
          <Text style={styles.text}>Delete Account</Text>
          <AntDesign name="right" size={15} color="black" />
        </View>
        <View style={styles.content}>
          <Text style={styles.text}>Logout</Text>
          <AntDesign name="right" size={15} color="black" />
        </View>
        <Divider />
      </View>
      <View style={styles.buttonParent}>
        <TouchableOpacity
          style={styles.button}
          //   onPress={handleSubmit}
        >
          <Text
            style={{
              color: "white",
              fontFamily: "Inter_700Bold",
              fontSize: 20,
            }}
          >
            Ok
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    paddingLeft: 40,
    paddingTop: 10,
    backgroundColor: "white",
    flex: 1,
  },
  heading: {
    fontWeight: "bold",
    marginBottom: 15,
    fontSize: 17,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
    marginRight: 25,
  },
  text: {
    fontSize: 15,
    // fontWeight: "600",
  },
  buttonParent: {
    marginTop: 40,
  },
  button: {
    backgroundColor: color.grey,
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    width: "90%",
  },
});

export default Settings;
