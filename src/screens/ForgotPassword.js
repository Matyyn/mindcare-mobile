import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  TouchableOpacity,
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
import Constants from "expo-constants";
const splashImage = require("../../assets/images/splash.png");

const ForgotPassword = () => {
  const createAccountValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Please enter valid email")
      .required("Email Address is Required"),
  });
  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <Image
        resizeMode="cover"
        style={{
          height: "40%",
          width: "100%",
          marginTop: "5%",
          marginBottom: "5%",
          alignSelf: "center",
        }}
        source={splashImage}
      />
      <Text style={styles.text}>Forgot Password</Text>
      <Formik
        validationSchema={createAccountValidationSchema}
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values) => {
          //   const response = await axios.post("http://localhost:5000/signin", {
          //     header: {
          //       "content-type": "appliction/form-data",
          //     },
          //     body: JSON.stringify(values),
          //   });
          Alert.alert(
            null,
            "A reset link has been sent to your email account",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
              },
              { text: "OK", onPress: () => console.log("Ok") },
            ]
          );
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
            </View>

            <View style={styles.buttonParent}>
              <TouchableOpacity
                style={styles.button}
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
                  Request Reset
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAwareScrollView>
        )}
      </Formik>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text: {
    fontWeight: "bold",
    fontSize: 40,
    textAlign: "center",
    color: color.grey,
  },
  textInputContainer: {
    marginBottom: 5,
    marginTop: 10,
  },

  TextInput: {
    borderRadius: 15,
    width: "90%",
    alignSelf: "center",
    backgroundColor: "white",
  },
  buttonParent: {
    marginTop: "50%",
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
export default ForgotPassword;
