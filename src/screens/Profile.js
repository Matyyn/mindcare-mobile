import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Button,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import React from "react";
import axios from "axios";
import { useState } from "react";
import { TextInput, Checkbox, RadioButton } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { Formik } from "formik";
import * as yup from "yup";
import color from "../constants/colors";
const profile = require("../../assets/images/profile.png");
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import { firebaseApp } from "../../firebase/firebase";
import { getStorage, uploadBytes, ref, getDownloadURL } from "firebase/storage";

const Profile = () => {
  // var d = new Date().toLocaleDateString();
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const storage = getStorage(firebaseApp);

  const [date, setDate] = useState(new Date());
  const [selectedGender, setSelectedGender] = useState("");
  const [show, setShow] = useState(false);
  const [gender, setGender] = useState("female");

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    //console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const uploadImage = async () => {
    const picRef = ref(storage, "images/sample.jpg");
    const response = await fetch(image);
    console.log(response);
    const blob = await response.blob();
    const result = await uploadBytes(picRef, blob);
    const url = await getDownloadURL(result.ref);
    console.log(url);
  };
  const onChange = (event, selectedDate) => {
    console.log(event, selectedDate.toLocaleDateString());
  };

  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const createAccountValidationSchema = yup.object().shape({
    firstName: yup
      .string()
      .min(3, ({ min }) => `Name must be at least ${min} characters`)
      .required("First Name is Required"),
    lastName: yup
      .string()
      .min(3, ({ min }) => `Name must be at least ${min} characters`)
      .required("Last Name is Required"),
    email: yup
      .string()
      .email("Please enter valid email")
      .required("Email Address is Required"),
  });
  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <View style={styles.container}>
        {image && <Image source={image} style={{ width: 170, height: 200 }} />}
        <Button title="Select Image" onPress={pickImage} />
        {!uploading ? (
          <Button title="Upload Image" onPress={uploadImage} />
        ) : (
          <ActivityIndicator size={"small"} color="black" />
        )}
      </View>
      {/* <TouchableOpacity onPress={pickImage}>
        <Text> Pick Image</Text>
      </TouchableOpacity> */}
      {/* <View>
        <Image
          resizeMode="cover"
          style={{
            alignSelf: "center",
          }}
          source={profile}
        />
      </View> */}
      <Formik
        validationSchema={createAccountValidationSchema}
        enableReinitialize={true}
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          dateOfBirth: date.toLocaleDateString(),
          gender: "",
        }}
        onSubmit={(values) => {
          alert(JSON.stringify(values));
        }}
      >
        {({
          handleChange,
          handleBlur,
          setFieldValue,
          handleSubmit,
          values,
          errors,
          isValid,
        }) => (
          <KeyboardAwareScrollView>
            <View>
              <View style={styles.textInputContainer}>
                <TextInput
                  onChangeText={handleChange("firstName")}
                  onBlur={handleBlur("firstName")}
                  value={values.firstName}
                  placeholder="First Name"
                  style={styles.TextInput}
                  mode="outlined"
                  error={errors.firstName}
                  theme={{
                    colors: {
                      primary: color.lightGrey,
                    },
                  }}
                />
                {errors.firstName && (
                  <Text style={styles.errorText}>{errors.firstName}</Text>
                )}
              </View>
              <View style={styles.textInputContainer}>
                <TextInput
                  onChangeText={handleChange("lastName")}
                  onBlur={handleBlur("lastName")}
                  value={values.lastName}
                  placeholder="Last Name"
                  style={styles.TextInput}
                  mode="outlined"
                  error={errors.lastName}
                  theme={{
                    colors: {
                      primary: color.lightGrey,
                    },
                  }}
                />
                {errors.lastName && (
                  <Text style={styles.errorText}>{errors.lastName}</Text>
                )}
              </View>
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
                  editable={false}
                  onBlur={handleBlur("dateofBirth")}
                  value={values.dateOfBirth}
                  placeholder="Date of Birth"
                  style={styles.TextInput}
                  mode="outlined"
                  theme={{
                    colors: {
                      primary: color.lightGrey,
                    },
                  }}
                />
                <Ionicons
                  style={{
                    position: "absolute",
                    marginLeft: 300,
                    marginTop: 18,
                  }}
                  name="calendar-sharp"
                  size={24}
                  color="black"
                  onPress={showDatepicker}
                />
              </View>
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  placeholderText="Date of Birth"
                  mode="time"
                  is24Hour={true}
                  onChange={onChange}
                />
              )}
            </View>

            <View style={{ marginLeft: 10, marginTop: 3 }}>
              <Text style={{ marginLeft: 10, marginTop: 5, fontWeight: 500 }}>
                Select Gender
              </Text>
              <RadioButton.Group
                onValueChange={handleChange("gender")}
                value={values.gender}
              >
                <View style={{ flexDirection: "row" }}>
                  <RadioButton value="Male"></RadioButton>
                  <Text style={{ marginTop: 8 }}>Male</Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <RadioButton value="Female"></RadioButton>
                  <Text style={{ marginTop: 8 }}>Female</Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <RadioButton value="Prefer not to say"></RadioButton>
                  <Text style={{ marginTop: 8 }}>Prefer not to say</Text>
                </View>
              </RadioButton.Group>
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

const styles = StyleSheet.create({
  text: {
    fontWeight: "bold",
    fontSize: 40,
    textAlign: "center",
    color: color.grey,
  },
  textInputContainer: {
    marginTop: 3,
  },

  TextInput: {
    borderRadius: 15,
    width: "90%",
    alignSelf: "center",
    backgroundColor: "white",
    // height: 45,
  },
  buttonParent: {
    marginTop: 10,
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
  genderContainer: {
    borderColor: color.darkGrey,
    borderWidth: 1,
    width: "90%",
    alignSelf: "center",
    borderRadius: 5,
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
export default Profile;
