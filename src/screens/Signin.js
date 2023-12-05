import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
  KeyboardAvoidingView,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import React from "react";
import axios from "axios";
import { useState } from "react";
import { TextInput, Checkbox, Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { Formik } from "formik";
import * as yup from "yup";
import color from "../constants/colors";
const splashImage = require("../../assets/images/splash.png");
import useStore from "../screens/zustand/store";
import { trackEvent } from "@aptabase/react-native";

const Signin = ({ navigation }) => {
  const { setResponseData } = useStore();
  const [checked, setChecked] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  // //console.log(Constants.expoConfig.extra.apiUrl);

  const loginValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Please enter valid email")
      .required("Email Address is Required"),
    password: yup
      .string()
      .min(8, ({ min }) => `Password must be at least ${min} characters`)
      .required("Password is required"),
  });

  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <Image
        resizeMode="cover"
        style={{
          height: "50%",
          width: "100%",
          alignSelf: "center",
        }}
        source={splashImage}
      />
      <Text style={styles.text}>Mind Care</Text>
      <Formik
        validationSchema={loginValidationSchema}
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values) => {
          const response = await axios.post("/login", values);
          let value = response.data.data.data;
          //console.log("value", value);
          if (value.isBlocked == false) {
            setResponseData(value);
            trackEvent("Signin");
            ToastAndroid.show("Successful Sign In", ToastAndroid.LONG);
            navigation.navigate("Tabs");
          } else if (value.isBlocked == true) {
            navigation.navigate("Blocked");
          } else {
            ToastAndroid.show(
              "Please Enter Correct Credentials!",
              ToastAndroid.LONG,
            );
          }
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          isValid,
        }) => (
          <KeyboardAwareScrollView>
            <View>
              <View style={styles.textInputContainer}>
                <TextInput
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  placeholder="Email"
                  style={styles.TextInput}
                  mode="outlined"
                  error={errors.email}
                  theme={{
                    colors: {
                      primary: color.lightGrey,
                    },
                  }}
                />
                {errors.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}
              </View>
              <View style={styles.textInputContainer}>
                <TextInput
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  placeholder="Password"
                  style={styles.TextInput}
                  mode="outlined"
                  error={errors.password}
                  theme={{
                    colors: {
                      primary: color.lightGrey,
                    },
                  }}
                  secureTextEntry={secureTextEntry}
                  right={
                    <TextInput.Icon
                      icon="eye"
                      onPress={() => {
                        setSecureTextEntry(!secureTextEntry);
                        return false;
                      }}
                      backgroundColor="white"
                    />
                  }
                />
                {errors.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}
              </View>
            </View>

            <View style={styles.checkboxParentContainer}>
              <View style={styles.checkboxContainer}>
                {/* <Checkbox
                  status={checked ? "checked" : "unchecked"}
                  color={color.grey}
                  onPress={() => {
                    setChecked(!checked);
                  }}
                /> */}
                <Text></Text>
              </View>
              <View>
                <Text style={{ fontWeight: "600" }}>Forgot Password?</Text>
              </View>
            </View>
            <View style={styles.buttonParent}>
              <TouchableOpacity
                style={styles.button}
                // onSubmit={handleSubmit}
                onPress={handleSubmit}
                disabled={!isValid}
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
          </KeyboardAwareScrollView>
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default Signin;

const styles = StyleSheet.create({
  text: {
    fontWeight: "bold",
    fontSize: 40,
    textAlign: "center",
    color: color.grey,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxParentContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "90%",
    alignSelf: "center",
  },
  textInputContainer: {
    marginBottom: "3%",
    marginTop: "5%",
  },

  TextInput: {
    borderRadius: 15,
    width: "90%",
    alignSelf: "center",
    backgroundColor: "white",
  },
  buttonParent: {
    marginTop: "10%",
    alignItems: "center",
  },
  button: {
    backgroundColor: color.grey,
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    width: "90%",
  },
  errorText: {
    fontSize: 15,
    color: "red",
    marginLeft: "5%",
  },
});
