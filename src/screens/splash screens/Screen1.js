import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
const screen1 = require("../../../assets/images/screen1.png");
import color from "../../constants/colors";

const Screen1 = ({ navigation }) => {
  return (
    <SafeAreaView>
      <View style={styles.imageContainer}>
        <Image source={screen1} style={styles.image} />
        <Text style={styles.text}>
          {" "}
          Thousand of Therapists to help your mental health!
        </Text>
      </View>

      <View style={styles.buttonParent}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Screen2")}
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

export default Screen1;
