import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
const splash = require("../../../assets/images/splash.png");
import color from "../../constants/colors";

const GettingStarted = ({ navigation }) => {
  return (
    <SafeAreaView>
      <View style={styles.imageContainer}>
        <Image source={splash} style={styles.image} />
        <Text style={styles.text}>Mind Care </Text>
      </View>

      <View style={styles.buttonParent}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("SigninSplash")}
        >
          <Text
            style={{
              color: "white",
              fontFamily: "Inter_700Bold",
              fontSize: 20,
            }}
          >
            Get Started
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
    fontSize: 45,
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

export default GettingStarted;
