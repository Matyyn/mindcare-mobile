
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native"; // Import the useNavigation hook
import color from "../constants/colors";

const PersonalInsightCard = ({ title, icon, marginBottom }) => {
  const navigation = useNavigation(); // Access the navigation object using the useNavigation hook

  return (
    // <SafeAreaView style={{ backgroundColor: "#FFEBEB", height: 500 }}>
    <View>
      <TouchableOpacity onPress={()=>navigation.navigate(title)}>
        <View style={[styles.container, { marginBottom: marginBottom }]}>
          <Text
            style={{
              color: color.grey,
              fontWeight: "700",
            }}
          >
            {title}
          </Text>
          <View>{icon}</View>
        </View>
      </TouchableOpacity>
    </View>

    // </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    // margin: 20,
    elevation: 5,
    borderRadius: 10,
    width: "90%",
    alignSelf: "center",
    padding: 15,
  },
});

export default PersonalInsightCard;
