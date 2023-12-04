import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
const screen3 = require("../../../assets/images/screen3.png");
import color from "../../constants/colors";

const Screen3 = ({ navigation }) => {
  return (
    <SafeAreaView>
      <View style={styles.imageContainer}>
        <Image source={screen3} style={styles.image} />
        <Text style={styles.text}>
          Let's start living healthy with us right now!{" "}
        </Text>
      </View>

      <View style={styles.buttonParent}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate("Getting Started");
          }}
        >
          <Text
            style={{
              color: "white",
              fontFamily: "Inter_700Bold",
              fontSize: 20,
            }}
          >
            Next
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: "center",
    height: "80%",
    flexWrap: "wrap",
  },
  image: {
    height: "55%",
    width: "100%",
    marginTop: 90,
  },
  text: {
    fontSize: 35,
    fontWeight: "bold",
    color: color.grey,
    textAlign: "center",
  },
  buttonParent: {
    marginTop: 60,
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

export default Screen3;
