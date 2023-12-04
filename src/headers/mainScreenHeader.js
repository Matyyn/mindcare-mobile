import React from "react";
import { View, StyleSheet } from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";

const MainScreenHeader = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
        // backgroundColor: "yellow",
        // width: "40%",
      }}
    >
      <Ionicons
        name="notifications-outline"
        size={24}
        color="black"
        style={{ marginRight: 10 }}
      />
      <MaterialIcons name="forward-to-inbox" size={24} color="black" />
    </View>
  );
};

const styles = StyleSheet.create({});

export default MainScreenHeader;
