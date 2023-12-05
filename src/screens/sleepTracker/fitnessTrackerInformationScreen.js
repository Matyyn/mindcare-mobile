import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Formik } from "formik";
import * as yup from "yup";
import { TextInput, Button } from "react-native-paper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import useStore from "../zustand/store";
import axios from "axios";
import color from "../../constants/colors";

const Signup = ({ navigation }) => {
  const signupValidationSchema = yup.object().shape({
    height: yup.number().required("Height is required"),
    weight: yup.number().required("Weight is required"),
  });
  const { responseData } = useStore();
  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <Formik
        validationSchema={signupValidationSchema}
        initialValues={{ height: "", weight: "" }}
        onSubmit={async (values) => {
          const heightInMeters = values.height / 100;
          const weightInKg = values.weight;
          const bmi = weightInKg / (heightInMeters * heightInMeters);
          //console.log("Height:", values.height);
          //console.log("Weight:", values.weight);
          //console.log("BMI:", bmi);

          const object = {
            height: values.height,
            weight: values.weight,
            bmi: bmi,
            logDate: Date.now(),
          };

          const response = await axios.post(
            `/fitness-tracker/${responseData._id}`,
            object,
          );
          //console.log(response.data.data);
          ToastAndroid.show("Data Posted Successfully", ToastAndroid.LONG);
          navigation.navigate("Fitness Information Screen");
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
              {/* <Text style={{fontSize:24,marginLeft:20}}>Fitness Data</Text> */}
              <View style={styles.textInputContainer}>
                <TextInput
                  onChangeText={handleChange("height")}
                  onBlur={handleBlur("height")}
                  value={values.height.toString()}
                  placeholder="Height (cm)"
                  style={styles.TextInput}
                  mode="outlined"
                  keyboardType="numeric"
                  error={errors.height}
                />
                {errors.height && (
                  <Text style={styles.errorText}>{errors.height}</Text>
                )}
              </View>
              <View style={styles.textInputContainer}>
                <TextInput
                  onChangeText={handleChange("weight")}
                  onBlur={handleBlur("weight")}
                  value={values.weight.toString()}
                  placeholder="Weight (kg)"
                  style={styles.TextInput}
                  mode="outlined"
                  keyboardType="numeric"
                  error={errors.weight}
                />
                {errors.weight && (
                  <Text style={styles.errorText}>{errors.weight}</Text>
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
                  Save
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAwareScrollView>
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  text: {
    fontWeight: "bold",
    fontSize: 40,
    textAlign: "center",
    color: "grey",
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
