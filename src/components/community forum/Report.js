import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { List, RadioButton } from "react-native-paper";
import color from "../../constants/colors";
import axios from "axios";
import useStore from "../../screens/zustand/store";
import { trackEvent } from "@aptabase/react-native";

const Report = ({ route }) => {
  const { id, clientId, type } = route.params;
  const [checked, setChecked] = useState("");
  const { responseData } = useStore();
  const userId = responseData._id;

  useEffect(() => {
    trackEvent("Report");
    ////console.log("clientId: ", clientId);
    ////console.log("id: ", id);
  }, []);
  const submitReport = async () => {
    ////console.log("checked: ", checked);

    if (type == "comment") {
      const reportObject = {
        commentId: id,
        clientId: userId,
        violation: checked,
      };
      const response = await axios.post(`/report-comments/${id}`, reportObject);
      ////console.log("report response: ", response);
    } else if (type == "post") {
      const reportObject = {
        postId: id,
        clientId: userId,
        violation: checked,
      };
      const response = await axios.post(`/report-post/${id}`, reportObject);
      ////console.log("report response: ", response);
    }
  };

  return (
    <View style={styles.parentContainer}>
      <Text style={styles.heading}>Gathering info</Text>
      <View>
        <View style={styles.listItemContainer}>
          <View style={styles.listItemContent}>
            <List.Item
              title="Spam"
              description="Posting malicious links, misusing hashtags, fake engagements, receptive replies"
              titleStyle={styles.listItem} // Apply the style here
            />
          </View>
          <RadioButton
            value="spam"
            status={checked === "spam" ? "checked" : "unchecked"}
            onPress={() => setChecked("spam")}
          />
        </View>

        <View style={styles.listItemContainer}>
          <View style={styles.listItemContent}>
            <List.Item
              title="Suicide or self-harm"
              description="Encouraging, promoting, providing instructions or sharing strategies for self-harm"
              titleStyle={styles.listItem} // Apply the style here
            />
          </View>
          <RadioButton
            value="suicide"
            status={checked === "suicide" ? "checked" : "unchecked"}
            onPress={() => setChecked("suicide")}
          />
        </View>

        <View style={styles.listItemContainer}>
          <View style={styles.listItemContent}>
            <List.Item
              title="Deceptive identities"
              description="Impersonation, non compliant accounts"
              titleStyle={styles.listItem} // Apply the style here
            />
          </View>
          <RadioButton
            value="deceptive"
            status={checked === "deceptive" ? "checked" : "unchecked"}
            onPress={() => setChecked("deceptive")}
          />
        </View>

        <View style={styles.listItemContainer}>
          <View style={styles.listItemContent}>
            <List.Item
              title="Violent and hateful entities"
              description="Violent posts, hate groups and network"
              titleStyle={styles.listItem} // Apply the style here
            />
          </View>
          <RadioButton
            value="violent"
            status={checked === "violent" ? "checked" : "unchecked"}
            onPress={() => setChecked("violent")}
          />
        </View>
      </View>
      <View style={styles.buttonParent}>
        <TouchableOpacity
          style={[styles.button, { opacity: checked ? 1 : 0.5 }]}
          onPress={submitReport}
          disabled={checked == ""}
        >
          <Text
            style={{
              color: "white",
              fontFamily: "Inter_700Bold",
              fontSize: 20,
            }}
          >
            Submit Report
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    padding: 25,
  },
  heading: {
    fontWeight: "bold",
    fontSize: 15,
  },
  listItem: {
    fontWeight: "bold",
  },
  listItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center", // Align items vertically in the center
    marginBottom: 10, // Add margin for separation between items
  },
  listItemContent: {
    flex: 1, // Allow the content to take up available space
  },
  buttonParent: {
    marginTop: 150,
    alignItems: "center",
  },
  button: {
    backgroundColor: color.grey,
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    width: "90%",
  },
});

export default Report;
