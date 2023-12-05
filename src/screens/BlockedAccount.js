import React from "react";
import { View, Text, TouchableOpacity, Linking } from "react-native";
import color from "../constants/colors";

const BlockedAccountScreen = () => {
  const handleContactAdmin = () => {
    Linking.openURL("mailto:mateen.2k19@gmail.com");
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}
    >
      <Text style={{ fontSize: 20, marginBottom: 20 }}>
        Account blocked due to violation
      </Text>
      <TouchableOpacity
        onPress={handleContactAdmin}
        style={{
          backgroundColor: color.grey,
          alignItems: "center",
          padding: 10,
          borderRadius: 10,
          width: "90%",
        }}
      >
        <Text
          style={{
            color: "white",
            fontFamily: "Inter_700Bold",
            fontSize: 20,
          }}
        >
          Contact Admin
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BlockedAccountScreen;
