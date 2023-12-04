import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

export default MyWebComponent = () => {
  return <WebView source={{ uri: 'https://mindcare.daily.co/mindcare' }} style={{ flex: 1 }} />;
}