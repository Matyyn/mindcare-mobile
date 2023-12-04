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

const SigninSplash = ({ navigation }) => {
  return (
    <SafeAreaView>
      <View style={styles.imageContainer}>
        <Image source={splash} style={styles.image} />
        <Text style={styles.text}> Mind Care </Text>
      </View>

      <View style={styles.buttonParent}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Sign in")}
        >
          <Text
            style={{
              color: "white",
              fontFamily: "Inter_700Bold",
              fontSize: 20,
            }}
          >
            Sign in
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 5,
        }}
      >
        <Text style={{ color: color.darkGrey,fontSize:20,marginTop:5 }}>Don't have an account?</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Create Account");
          }}
        >
          <Text style={{ fontWeight: "bold", marginLeft: 5 ,fontSize:20,marginTop:5 }}>Sign up</Text>
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
    marginTop:"10%",
    fontSize: 35,
    fontWeight: "bold",
    color: color.grey,
    textAlign: "center",
  },
  buttonParent: {
    marginTop: 40,
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

export default SigninSplash;
