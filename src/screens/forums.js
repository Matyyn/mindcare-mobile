import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { trackEvent } from "@aptabase/react-native";

const Forums = () => {
  useEffect(() => {
    trackEvent("Forums");
  }, []);
  return (
    <View>
      <Text>Forums</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Forums;
