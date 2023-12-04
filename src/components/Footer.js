import React from "react";
import { View, StyleSheet, Text } from "react-native";

const Footer = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}></View>
      <View style={styles.footer}>
        <Text>This footer will be pushed to the bottom</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ecf0f1",
  },
  content: {
    flex: 1,
  },
  footer: {
    backgroundColor: "blue",
    padding: 40,
  },
});

export default Footer;
