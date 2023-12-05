import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import color from "../../constants/colors";
import Icon from "react-native-vector-icons/FontAwesome5";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

const GuidedJournalingTips = ({ navigation, route }) => {
  const { journalTitle } = route.params;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: journalTitle,
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate("rescue sessions main")}
        >
          <Ionicons
            name="close"
            size={30}
            color="black"
            style={{ marginRight: 10 }}
          />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate("RescueSessionsTab")}
        >
          <Icon
            name="clipboard-list"
            size={30}
            color="black"
            style={styles.copyIcon}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation, journalTitle]);

  const [tip1, setTip1] = useState(
    "Optimize audio rescue sessions: Use quality headphones, find a quiet space, manage distractions, and set a comfortable listening volume.",
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.centered}>
        <Text style={styles.text}>{tip1}</Text>
      </View>

      <View style={styles.bottom}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => {
            navigation.navigate("rescue sessions main", { journalTitle });
          }}
        >
          <Ionicons name="chevron-back" size={40} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => {
            navigation.navigate("rescue sessions tips2", { journalTitle });
          }}
        >
          <Ionicons name="chevron-forward-outline" size={40} color="black" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "lightgreen",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    //marginTop: 0,
    marginHorizontal: 25,
  },
  text: {
    color: color.grey,
    fontSize: 22,
    fontWeight: "600",
    textAlign: "center",
  },
  bottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "lightgreen",
    padding: 15,
    //marginBottom: 8,
  },
  iconButton: {
    backgroundColor: "white",
    borderRadius: 50,
    paddingLeft: 2,
    paddingRight: 2,
  },
});

export default GuidedJournalingTips;
