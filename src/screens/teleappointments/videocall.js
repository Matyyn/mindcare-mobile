import React, { Component, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { WebView } from "react-native-webview";
import { trackEvent } from "@aptabase/react-native";

export default MyWebComponent = () => {
  useEffect(() => {
    trackEvent("Video Call");
  }, []);
  return (
    <WebView
      source={{ uri: "https://mindcare.daily.co/mindcare" }}
      style={{ flex: 1 }}
    />
  );
};
