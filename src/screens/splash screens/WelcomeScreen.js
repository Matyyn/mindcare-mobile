import React,{ useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
const welcome = require("../../../assets/images/welcome.png");
import color from "../../constants/colors";

const WelcomeScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("Screen1"); 
    }, 1500); 

    return () => clearTimeout(timer); 
  }, []);
  return (
    <SafeAreaView>
      <View style={styles.imageContainer}>
        <Image source={welcome} style={styles.image} />
        <Text style={styles.text}> Welcome to Mind Care </Text>
      </View>
      <View style={{ paddingLeft: 40, paddingRight: 40 }}>
        <Text
          style={{ textAlign: "center", color: color.darkGrey, fontSize: 20 }}
        >
          Speak with licensed therapists or take on self guided programs,
          entirely within a single platform
        </Text>
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
    marginTop:"20%",
    fontSize: 30,
    fontWeight: "bold",
    color: color.grey,
    textAlign: "center",
  },
  buttonParent: {
    marginTop: 60,
    alignItems: "center",
  },
  button: {
    color: color.grey,
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    width: "90%",
  },
});

export default WelcomeScreen;
