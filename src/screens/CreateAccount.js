// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   Alert,
//   TouchableOpacity,
// } from "react-native";
// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// import React from "react";
// import axios from "axios";
// import { useState } from "react";
// import { TextInput, Checkbox, Button } from "react-native-paper";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { Formik } from "formik";
// import * as yup from "yup";
// import color from "../constants/colors";
// import Constants from "expo-constants";
// const splashImage = require("../../assets/images/splash.png");

// const CreateAccount = ({ navigation }) => {
//   const [secureTextEntry, setSecureTextEntry] = useState(true);

//   const createAccountValidationSchema = yup.object().shape({
//     firstName: yup
//       .string()
//       .min(3, ({ min }) => `Name must be at least ${min} characters`)
//       .required("First Name is Required"),
//     lastName: yup
//       .string()
//       .min(3, ({ min }) => `Name must be at least ${min} characters`)
//       .required("Last Name is Required"),
//     email: yup
//       .string()
//       .email("Please enter valid email")
//       .required("Email Address is Required"),
//     password: yup
//       .string()
//       .min(8, ({ min }) => `Password must be at least ${min} characters`)
//       .required("Password is required"),
//     // confirmPassword: yup
//     //   .string()
//     //   .required("Please confirm your password")
//     //   .oneOf([yup.ref("password")], "Passwords do not match"),
//   });

//   return (
//     <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
//       <Image
//         resizeMode="cover"
//         style={{
//           height: "25%",
//           width: "65%",
//           marginTop: "5%",
//           alignSelf: "center",
//         }}
//         source={splashImage}
//       />
//       <Text style={styles.text}>Mind Care</Text>
//       <Formik
//         validationSchema={createAccountValidationSchema}
//         initialValues={{
//           firstName: "",
//           lastName: "",
//           email: "",
//           password: "",
//           //confirmPassword: "",
//         }}
//         onSubmit={async (values) => {
//          // const response = await axios.post("/signup",values);
//          delete values.confirmPassword
//          console.log('values',values)
//          try{
//             const response = await axios.post("/signup",
//               // header: {
//               //   "content-type": "appliction/json",
//               // },
//               // body:values,
//               values
//             );
//             console.log(response.status)
//           Alert.alert(null, "Account Created", [
//             {
//               text: "Cancel",
//               onPress: () => console.log("Cancel Pressed"),
//               style: "cancel",
//             },
//             { text: "OK", onPress: () => navigation.navigate("Sign in") },
//           ]);
//         }catch(error){
//           console.log(error)
//         }
//         }}
//       >
//         {({
//           handleChange,
//           handleBlur,
//           handleSubmit,
//           values,
//           errors,
//           isValid,
//         }) => (
//           <KeyboardAwareScrollView>
//             <View>
//               <View style={styles.textInputContainer}>
//                 <TextInput
//                   onChangeText={handleChange("firstName")}
//                   onBlur={handleBlur("firstName")}
//                   value={values.firstName}
//                   placeholder="First Name"
//                   style={styles.TextInput}
//                   mode="outlined"
//                   error={errors.firstName}
//                   theme={{
//                     colors: {
//                       primary: color.lightGrey,
//                     },
//                   }}
//                 />
//                 {errors.firstName && (
//                   <Text style={styles.errorText}>{errors.firstName}</Text>
//                 )}
//               </View>
//               <View style={styles.textInputContainer}>
//                 <TextInput
//                   onChangeText={handleChange("lastName")}
//                   onBlur={handleBlur("lastName")}
//                   value={values.lastName}
//                   placeholder="Last Name"
//                   style={styles.TextInput}
//                   mode="outlined"
//                   error={errors.lastName}
//                   theme={{
//                     colors: {
//                       primary: color.lightGrey,
//                     },
//                   }}
//                 />
//                 {errors.lastName && (
//                   <Text style={styles.errorText}>{errors.lastName}</Text>
//                 )}
//               </View>
//               <View style={styles.textInputContainer}>
//                 <TextInput
//                   onChangeText={handleChange("email")}
//                   onBlur={handleBlur("email")}
//                   value={values.email}
//                   placeholder="Email"
//                   style={styles.TextInput}
//                   mode="outlined"
//                   error={errors.email}
//                   theme={{
//                     colors: {
//                       primary: color.lightGrey,
//                     },
//                   }}
//                 />
//                 {errors.email && (
//                   <Text style={styles.errorText}>{errors.email}</Text>
//                 )}
//               </View>
//               <View style={styles.textInputContainer}>
//                 <TextInput
//                   onChangeText={handleChange("password")}
//                   onBlur={handleBlur("password")}
//                   value={values.password}
//                   placeholder="Password"
//                   style={styles.TextInput}
//                   mode="outlined"
//                   error={errors.password}
//                   theme={{
//                     colors: {
//                       primary: color.lightGrey,
//                     },
//                   }}
//                   secureTextEntry={secureTextEntry}
//                   right={
//                     <TextInput.Icon
//                       icon="eye"
//                       onPress={() => {
//                         setSecureTextEntry(!secureTextEntry);
//                         return false;
//                       }}
//                       backgroundColor="white"
//                     />
//                   }
//                 />
//                 {errors.password && (
//                   <Text style={styles.errorText}>{errors.password}</Text>
//                 )}
//               </View>
//               {/* <View style={styles.textInputContainer}>
//                 <TextInput
//                   onChangeText={handleChange("confirmPassword")}
//                   onBlur={handleBlur("confirmPassword")}
//                   value={values.confirmPassword}
//                   placeholder="Confirm Password"
//                   style={styles.TextInput}
//                   mode="outlined"
//                   error={errors.confirmPassword}
//                   theme={{
//                     colors: {
//                       primary: color.lightGrey,
//                     },
//                   }}
//                   secureTextEntry={secureTextEntry}
//                   right={
//                     <TextInput.Icon
//                       icon="eye"
//                       onPress={() => {
//                         setSecureTextEntry(!secureTextEntry);
//                         return false;
//                       }}
//                       backgroundColor="white"
//                     />
//                   }
//                 />
//                 {errors.confirmPassword && (
//                   <Text style={styles.errorText}>{errors.confirmPassword}</Text>
//                 )}
//               </View> */}
//             </View>

//             <View style={styles.buttonParent}>
//               <TouchableOpacity
//                 style={styles.button}
//                 onPress={handleSubmit}
//                 disabled={!isValid}
//               >
//                 <Text
//                   style={{
//                     color: "white",
//                     fontFamily: "Inter_700Bold",
//                     fontSize: 20,
//                   }}
//                 >
//                   Create Account
//                 </Text>
//               </TouchableOpacity>
//             </View>
//             <View
//               style={{
//                 flexDirection: "row",
//                 justifyContent: "center",
//                 marginTop: 3,
//               }}
//             >
//               <Text style={{ color: color.darkGrey }}>
//                 Already have an account?
//               </Text>
//               <TouchableOpacity onPress={() => navigation.navigate("Sign in")}>
//                 <Text style={{ fontWeight: "bold", marginLeft: 5 }}>
//                   Log in
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           </KeyboardAwareScrollView>
//         )}
//       </Formik>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   text: {
//     fontWeight: "bold",
//     fontSize: 40,
//     textAlign: "center",
//     color: color.grey,
//   },
//   textInputContainer: {
//     marginBottom: 5,
//     marginTop: 10,
//   },

//   TextInput: {
//     borderRadius: 15,
//     width: "90%",
//     alignSelf: "center",
//     backgroundColor: "white",
//   },
//   buttonParent: {
//     marginTop: 40,
//     alignItems: "center",
//   },
//   button: {
//     backgroundColor: color.grey,
//     alignItems: "center",
//     padding: 10,
//     borderRadius: 10,
//     width: "90%",
//   },
//   errorText: {
//     fontSize: 15,
//     color: "red",
//     marginLeft: "5%",
//   },
// });
// export default CreateAccount;

// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   ScrollView,
//   TouchableOpacity,
//   KeyboardAvoidingView,
//   ToastAndroid,
// } from "react-native";
// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// import axios from "axios";
// import { TextInput, Checkbox, Button } from "react-native-paper";
// import { RadioButton } from "react-native-paper";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { Formik } from "formik";
// import * as yup from "yup";
// import color from "../constants/colors";
// import useStore from "../screens/zustand/store";
// import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

// const splashImage = require("../../assets/images/splash.png");
// const genderOptions = [
//   { label: "Male", value: "male" },
//   { label: "Female", value: "female" },
//   { label: "Other", value: "other" },
// ];

// const Signin = ({ navigation }) => {
//   //const [showDatePicker, setShowDatePicker] = useState(false);
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const { setResponseData } = useStore();
//   const [checked, setChecked] = useState(false);
//   const [secureTextEntry, setSecureTextEntry] = useState(true);

//   const showDatePicker = async () => {
//     try {
//       const { action, year, month, day } = await DateTimePickerAndroid.open({
//         date: new Date(), // You can set the initial date here
//         mode: 'spinner', // Choose 'spinner' or 'calendar' based on your preference
//       });

//       if (action === DateTimePickerAndroid.dateSetAction) {
//         const selected = new Date(year, month, day);
//         setSelectedDate(selected);
//         setFieldValue("dateOfBirth", selected.toISOString().split('T')[0]);
//       }
//     } catch ({ code, message }) {
//       console.warn("Cannot open date picker", message);
//     }
//   };

//   const loginValidationSchema = yup.object().shape({
//     email: yup
//       .string()
//       .email("Please enter a valid email")
//       .required("Email Address is Required"),
//     password: yup
//       .string()
//       .min(8, "Password must be at least 8 characters")
//       .required("Password is required"),
//     confirmPassword: yup
//       .string()
//       .oneOf([yup.ref("password"), null], "Passwords must match"),
//     gender: yup.string().required("Gender is required"),
//     dateOfBirth: yup.date().nullable(),
//     firstName: yup.string().required("First Name is required"),
//     lastName: yup.string().required("Last Name is required"),
//     // Add other validation rules for gender and dateOfBirth if needed
//   });

//   return (
//     <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
//       <Image
//         resizeMode="cover"
//         style={{
//           height: "50%",
//           width: "100%",
//           alignSelf: "center",
//         }}
//         source={splashImage}
//       />
//       <Text style={styles.text}>Mind Care</Text>
//       <Formik
//         validationSchema={loginValidationSchema}
//         initialValues={{
//           email: "",
//           password: "",
//           confirmPassword: "",
//           gender: "",
//           dateOfBirth: null,
//           firstName: "",
//           lastName: "",
//         }}
//         onSubmit={async (values) => {
//           console.log(values);
//           // const response = await axios.post("/login", values);
//           // const value = response.data.data;
//           // if (response.data.status === "success") {
//           //   setResponseData(value);
//           //   ToastAndroid.show("Successful Sign In", ToastAndroid.LONG);
//           //   navigation.navigate("Tabs");
//           // } else {
//           //   ToastAndroid.show(
//           //     "Please Enter Correct Credentials!",
//           //     ToastAndroid.LONG
//           //   );
//           // }
//         }}
//       >
//         {({
//           handleChange,
//           handleBlur,
//           handleSubmit,
//           values,
//           errors,
//           isValid,
//           setFieldValue,
//         }) => (
//           <KeyboardAwareScrollView>
//             <View>
//               <View style={styles.textInputContainer}>
//                 <TextInput
//                   onChangeText={handleChange("firstName")}
//                   onBlur={handleBlur("firstName")}
//                   value={values.firstName}
//                   placeholder="First Name"
//                   style={styles.TextInput}
//                   mode="outlined"
//                   error={errors.firstName}
//                   theme={{
//                     colors: {
//                       primary: color.lightGrey,
//                     },
//                   }}
//                 />
//                 {errors.firstName && (
//                   <Text style={styles.errorText}>{errors.firstName}</Text>
//                 )}
//               </View>
//               <View style={styles.textInputContainer}>
//                 <TextInput
//                   onChangeText={handleChange("lastName")}
//                   onBlur={handleBlur("lastName")}
//                   value={values.lastName}
//                   placeholder="Last Name"
//                   style={styles.TextInput}
//                   mode="outlined"
//                   error={errors.lastName}
//                   theme={{
//                     colors: {
//                       primary: color.lightGrey,
//                     },
//                   }}
//                 />
//                 {errors.lastName && (
//                   <Text style={styles.errorText}>{errors.lastName}</Text>
//                 )}
//               </View>
//               <View style={styles.textInputContainer}>
//                 {/* Add this part for the gender radio buttons */}
//                 <Text>Gender</Text>
//                 <RadioButton.Group
//                   onValueChange={(value) => setFieldValue("gender", value)}
//                   value={values.gender}
//                 >
//                   {genderOptions.map((option) => (
//                     <View
//                       key={option.value}
//                       style={{ flexDirection: "row", alignItems: "center" }}
//                     >
//                       <RadioButton value={option.value} color={color.grey} />
//                       <Text>{option.label}</Text>
//                     </View>
//                   ))}
//                 </RadioButton.Group>
//                 {errors.gender && (
//                   <Text style={styles.errorText}>{errors.gender}</Text>
//                 )}
//               </View>
//               <View style={styles.textInputContainer}>
//                 <TextInput
//                   onChangeText={handleChange("email")}
//                   onBlur={handleBlur("email")}
//                   value={values.email}
//                   placeholder="Email"
//                   style={styles.TextInput}
//                   mode="outlined"
//                   error={errors.email}
//                   theme={{
//                     colors: {
//                       primary: color.lightGrey,
//                     },
//                   }}
//                 />
//                 {errors.email && (
//                   <Text style={styles.errorText}>{errors.email}</Text>
//                 )}
//               </View>
//               <View style={styles.textInputContainer}>
//                 <TextInput
//                   onChangeText={handleChange("password")}
//                   onBlur={handleBlur("password")}
//                   value={values.password}
//                   placeholder="Password"
//                   style={styles.TextInput}
//                   mode="outlined"
//                   error={errors.password}
//                   theme={{
//                     colors: {
//                       primary: color.lightGrey,
//                     },
//                   }}
//                   secureTextEntry={secureTextEntry}
//                   right={
//                     <TextInput.Icon
//                       icon="eye"
//                       onPress={() => {
//                         setSecureTextEntry(!secureTextEntry);
//                         return false;
//                       }}
//                       backgroundColor="white"
//                     />
//                   }
//                 />
//                 {errors.password && (
//                   <Text style={styles.errorText}>{errors.password}</Text>
//                 )}
//               </View>
//               <View style={styles.textInputContainer}>
//                 <TextInput
//                   onChangeText={handleChange("confirmPassword")}
//                   onBlur={handleBlur("confirmPassword")}
//                   value={values.confirmPassword}
//                   placeholder="Confirm Password"
//                   style={styles.TextInput}
//                   mode="outlined"
//                   error={errors.confirmPassword}
//                   theme={{
//                     colors: {
//                       primary: color.lightGrey,
//                     },
//                   }}
//                   secureTextEntry={secureTextEntry}
//                   right={
//                     <TextInput.Icon
//                       icon="eye"
//                       onPress={() => {
//                         setSecureTextEntry(!secureTextEntry);
//                         return false;
//                       }}
//                       backgroundColor="white"
//                     />
//                   }
//                 />
//                 {errors.confirmPassword && (
//                   <Text style={styles.errorText}>{errors.confirmPassword}</Text>
//                 )}
//               </View>
//               <View style={styles.textInputContainer}>
//         {/* Add this part for the date of birth */}
//         <TextInput
//           onChangeText={handleChange("dateOfBirth")}
//           onBlur={handleBlur("dateOfBirth")}
//           value={values.dateOfBirth}
//           placeholder="Date of Birth"
//           style={styles.TextInput}
//           mode="outlined"
//           error={errors.dateOfBirth}
//           theme={{
//             colors: {
//               primary: color.lightGrey,
//             },
//           }}
//         />
//         <TouchableOpacity onPress={showDatePicker}>
//           <Text>Select Date</Text>
//         </TouchableOpacity>
//         {selectedDate && (
//           <Text>{selectedDate.toDateString()}</Text>
//         )}
//         {errors.dateOfBirth && (
//           <Text style={styles.errorText}>{errors.dateOfBirth}</Text>
//         )}
//       </View>
//             </View>
//             <View style={styles.checkboxParentContainer}>
//               <View style={styles.checkboxContainer}>
//                 <Checkbox
//                   status={checked ? "checked" : "unchecked"}
//                   color={color.grey}
//                   onPress={() => {
//                     setChecked(!checked);
//                   }}
//                 />
//                 <Text>Remember Me</Text>
//               </View>
//               <View>
//                 <Text style={{ fontWeight: "600" }}>Forgot Password?</Text>
//               </View>
//             </View>
//             <View style={styles.buttonParent}>
//               <TouchableOpacity
//                 style={styles.button}
//                 onPress={handleSubmit}
//                 disabled={!isValid}
//               >
//                 <Text
//                   style={{
//                     color: "white",
//                     fontFamily: "Inter_700Bold",
//                     fontSize: 20,
//                   }}
//                 >
//                   Sign in
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           </KeyboardAwareScrollView>
//         )}
//       </Formik>
//     </SafeAreaView>
//   );
// };

// export default Signin;

// const styles = StyleSheet.create({
//   text: {
//     fontWeight: "bold",
//     fontSize: 40,
//     textAlign: "center",
//     color: color.grey,
//   },
//   checkboxContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   checkboxParentContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     width: "90%",
//     alignSelf: "center",
//   },
//   textInputContainer: {
//     marginBottom: "3%",
//     marginTop: "5%",
//   },

//   TextInput: {
//     borderRadius: 15,
//     width: "90%",
//     alignSelf: "center",
//     backgroundColor: "white",
//   },
//   buttonParent: {
//     marginTop: "10%",
//     alignItems: "center",
//   },
//   button: {
//     backgroundColor: color.grey,
//     alignItems: "center",
//     padding: 10,
//     borderRadius: 10,
//     width: "90%",
//   },
//   errorText: {
//     fontSize: 15,
//     color: "red",
//     marginLeft: "5%",
//   },
// });

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ToastAndroid,
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
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import { firebaseApp } from "../../firebase/firebase";
import { getStorage, uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { useNavigation } from "@react-navigation/native";

const Profile = () => {
  const navigation = useNavigation();
  // var d = new Date().toLocaleDateString();
  const [image, setImage] = useState("");
  const [time, setTime] = useState();
  const [isImage, setisImage] = useState("");
  const storage = getStorage(firebaseApp);
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [urlImage, setUrlImage] = useState("");

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      console.log("Selected image URI:", result.assets[0].uri);
      setisImage(result.assets[0].uri);
    }
  };

  const uploadImage = async () => {
    if (!image) {
      console.error("No image selected.");
      return;
    }

    const picRef = ref(storage, `Client/images/${isImage}`);
    const response = await fetch(image);
    const blob = await response.blob();

    try {
      const result = await uploadBytes(picRef, blob);
      const url = await getDownloadURL(result.ref);
      setUrl(url);
      console.log("Image uploaded. URL:", url);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
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
  const onChange = (event, selectedDate) => {
    setTime(selectedDate.toLocaleDateString());
    console.log(selectedDate.toLocaleDateString());
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
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
    profilePicture: yup.string().required("Image is required"),
  });
  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      {/* <View style={styles.container}>
        {image && <Image source={image} style={{ width: 170, height: 200 }} />}
        <Button title="Select Image" onPress={pickImage} />
        {!uploading ? (
          <Button title="Upload Image" onPress={uploadImage} />
        ) : (
          <ActivityIndicator size={"small"} color="black" />
        )}
      </View>
       */}
            <View>                
                {/* <Text style={{textAlign:"center",fontSize:25,fontWeight:'700',marginTop:20,marginBottom:20}}>Sign Up</Text> */}
                <View style={{ marginLeft: 115 }}>
                  {isImage ? (
                    <Image
                      source={{ uri: image }}
                      width={180}
                      height={180}
                      borderRadius={90}
                      borderColor="black"
                      marginBottom={10}
                    />
                  ) : (
                    <Image
                      source={{
                        uri:"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAIQA6wMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAAFBgMEAAIHAQj/xAA6EAACAQMDAQYEBQMDBAMBAAABAgMABBEFEiExBhMiQVFhFHGBkQcjMqHRFbHBQlKSNGJy4SQzshb/xAAaAQACAwEBAAAAAAAAAAAAAAADBAECBQAG/8QAKxEAAgIBBAEEAQIHAAAAAAAAAAECAxEEEiExIgUTQVEyFDMVI0JSYXGB/9oADAMBAAIRAxEAPwDm6n1qOUZrZvDUbtxWrKIqpEJX0rUJzUoBNasCDQmuS6Zm3IrQxc1ICaw5qMHZIzGKxYxmtxzV7QtOGra3Z6a03ci5k2d5t3beCen0rmljJyyweYs9KxIgW4ruOj/hfoNuFa6S4u2Hncycf8U2j75pjPYzQPgJrWLS7SISRsgaOEAjI6g9c0D9RX8F9kj56s0xIKYWbdbbfUUCRXhOyUYlTwuPRhwR96uxTkjBNNyh0I2PkHXEDGVsDzrVI3jai6xq5JIrWeJQpOKMqeMlVqXnALdvWimhXASZc4IB5oNdHB4ol2bjM1xjyzQXHDDt5hk6PaX8RgAYAUEnkiW+7wquAauXFqYrfPPTypYu3dZT4ieao0duH+K/g+E4weKRO0Mw+IJUY+lENFjkmXxOdvzoPrt5YPdPDFcpIyZyynw5Hv0qssdslZkQ2N424A9KKySCaLbjyoLaWkwkSRlHdtja6uGU/UGmCG08AJ6etWqrUmCunsFy6h2ykY4rX4RHTIozf26AMTjNDLUlpNo6UfaovBZTco8Ama1CMcVX7o56U13OnExFlGflQCaIxy4K1WdXBNd2eD2yjK84owk+FAqnaR7gOKvfDcCiwjJLgXtnFvkz4gitvjTWjWx9K0+G96tmwH4MF3C4Aqofaid1HuXIoesbbufWgzxkdrlwSQRlq9nh2+VXrWIBeQKy5jyOKttWAfuPdgGwR7mxU81vsXNbW8WHqxc8rj0roxjjk6U5Z4K1rbd41WrfOmapZ3inaIJ0kLegB5/bNe2A2sDUt+oljIwORzV9kHBoo7Zqw+ibQh0znOPOrI4IPpS72Muze9ntMuGbLvaoJP8AzUbW/cUwjrXncbco2O0mcJ7Z6SLHtFqKKmAZmkAHo3i/zQCCMl8V0X8VoPh9XhuMDFxbjH/kpwf2K1zqKbEprcjJOuLMaSkptBFIiFFQ3Q2xk+dTRTBlxUV5/wDXTUGnEW53i9cAs+KauxlmTMCR50uGLLmnfsoFQrnAoDj2x2T4SG24tVaHaelB20WKV8gCiOo3qQoeapWesQ85NCbwEzHOANrmi395dWukaVNHbxzZe5lZsBF9WPp14HWq19+HFkLFm0fWPjLgcLwvd/t0px/pWm394Lot8RdpAGEUsWEGR5EjnqRx60M0/sm2mXqXdrG8LPLlo4lVURcEbeP1Z9/pisu6/wAmkatNHimzl2qaLfaLMBcKiS+YjfJpk7P9oEvIRbXkmLpVwhIwJAMcZ9fn1o12z0yBbxmuM4YbkcckfOubalA1vcnnw5OCPT1o2nvl2A1WmT4+B0v0aViAMcc1WtLF1YNjPNa9lr43tsYZiWkix4ic5XypjdY0A9K3a9lkFIwbHKqWw8ihBhwRxigOqWI70kUxQTIUahOpsN2alxi+wcZyT4BkMfd4zV1DkCqRfmp4pK5bSZqT5LDLmtdh9q2D5rM1OIlE5ELaczceVR/0g5zj7UyDb6CttyjoBUe1Ep+osXyL409gMAVq2nOfKmQBSOgr3auOgqXXEj37BYXTSD0rx9MZh0pm2j0rUqPSo9uJPv2C2NOdema8axf1NMT4HlUWAfKp9uJ3vTY6/hhMY9CNsw/6edlHyPiH9zTt58CuddgrgR6hdWxOBLEHHzU/wx+1dFjOQK87q69l7R6HSWOyhN9iN+MFiZ9DtLtR4refBP8A2sMY+4FcXclXOeK+iu2tp8Z2U1OJVLOsBlQerJ4v8V863BzIeKa0ss14AXLFhfsA7454og1oXGDUOhjIHFMAQ4/TWrVWnEyb7HGfAuPp5U5FENPLwEcmiDw5/wBNVnUq3TiulSvgiF7lwzXUrmWVSqsaGW/fd8gLYUsAxJ6DPJopsLnkGq+qWU7WEnwSEzcEY4yPPFDlT4Nho3eaiwxp958Pexanp3wQty6xyGJ22zKWwTtZRgjqDyetPEutwx7gPEB0r55NxPFMRMrq6nO1uMfSjP8A/WXzwrDnnbt3HrXnbqZZyj1FV8GuTompxQ6+7XLyzIsZERSHqxJ+XlSL+IGjQ6TcWaQTtK8yHKt1XGP5xTP2VXVo9KlcXieIblj7rc3Po2elLOm2M2oajdahfO0rrKUUtzjHH7VXR1yst2pna62uqjc0UtEhksGLkncw5HlRma9kdeCastYAt+mt1scDpXpoUuKwjyk71N7mD4r+SMYJqKa5M5OTzVi/sGI8A/aq9nZOrZcH7V22WcF1KDjlGiqx8qlCsOgq/HbDzFWo7dAOlF9pfYF3gpQ4rPH6UY7hPSte5T0qkqiFZkm3VuozWqxMaspFgUSM2+0Akl8HiDHFb4rzbivR86tkptPcCtCBXjybeKiMma7J2wkaMHzrVYh61GXNbx767KO2v7CnZ1hb6zbPwAzbD9eK6fAwaNTXIQzoQ6cMpyPnXSm1u2giQlJXZ4u/CRxs3gwCSSBgD5kVjeqRxOMzb9JszCUH/sNFRLG8bDh1Kn5HivmLV7Y2OpXNoRgwStGR8jiu96p2qi0mzFxf2tzFI3Edvsy0jHoAwJX9+Mjzri3bnfJ2jlu5Ld7Y3sMV13DjlN6jIPH+4NS+knzgdvWcMm0ALheKZsA0q6CfCtM6E44rfp/BHm9XnezfYD5V73KnqorBW4Jo3Apyadyo/wBIrZI1HlWxBbgdf2oPd6/awyd1bkzuTjKKSv09fpQ52wj2EjVZPot6nolprHc2soj+Jct3Gf1HaMnHt0+4qvp3Ym18ZlVlIPAbqKD9qde/pfabS5LLbJdadDtuEX9Idv1r+/7Uaj7c2Btpr9O870L4bN+GLeQ+XvXmfUJ2WWfy+j2HpShVRix8hLUzD2e0ltx3bF8CDkk+VJmk6lcRT99eShYiWIiUAKmTnigupa5qepXPxF9OZAzZ7pRhV+Q/mvZZWaMGNW2E43Y4z6UTR0unl9g/ULv1GIroebPU7C/k2QSYfOArjBPyoh3QQkFcVzCNH3daZdH1yW3Cw3RMkXQZOSvyNbENT/cYF2lxzBjS8KEc4qtJboKuFT55qN43NOKUXyIrcimI1HlXoUZr2YNH1qON8mrZRbEmicR58687j3rcGtO+qrcTkp/BvG3tUwPFaLHit8cVTf8A4LbEvk1ZuKhaSpSuRxWndDzxmpUn9HKK+yFuaxQPOrAi4rwx129/Rbx+yIYHlViILUJjOa2B2jmo3P6IcE/knIFGbq7gh7Nm9uJWVlt5LEcZH5jIPUYPC8kgetLxYnoaL6G5l/IdmXEykMGxjeCh6+5X60l6jDfTn6HfTZe3djPZZttSsGu7TWrxDqt003wwEMiTfCHaWUKqHaCccnJ+fWlH8SJZtU07R9auIGt7gvcWc8RXBUpIduR8sn611WDQrLSW3RxtcteOu6S7bvZBIEIVtze2RgYxk4pb/E+1fU+w15d7PHY3UcqrsClV4R/7lvlWVXiLTSNuXKwc87PAGNTTMAMUs9nOY1xmmUA16Or8EeY1X7jJkArclVUsTgAZJqJc0O7S3RtNGnK53SYjGPfr+1TOeyLYCFe+Siilq2pi/wA2dvlLUN+Y3nJ6Z9vaj3ZTsRb3FlFe6lqJjhMrGONMBgFOMhvI5pE0ydu8KjBeRjtzwFXjLGmeXXL6xsIbazuHjjiQAFAqMT1Pixu5JPQiseUnNm7VCFcsSXAu9qtK0211+7h0pHFvE2AZGLFj1LZPJznNUDkqFJyB7VNcSmSZ5ZG3O/U1Eh3DOPtUpJEyk28lzQLW2utXtba6tZrhJ5BHshfY2T5j5U8dpdM0Kw7MQxvHN8LaXDLGbOZXdpWzneT7D/Fc9zLEQ8RZG5G5SQea0E88MUkQEncSEF0Q+FiOhI9RSt9DnNTUsYGKr1CDi1nJjBRkpkAngGoI5/zVCnqDXktyrL4MZHk3FUIG3SEjjyphz+AcYZTbOn6BfpPYxiQ+ONxExPmD+k/4owyLzSD2au/hb5Gkj72NvC6YByPXHt1+lPV7m2mkjJJCk4bGMjyNOaWx8wZl6qjHmgfqO0KSPKhltL+YM9KmuJDLKcHiqkkbxNnHFM5y8nQglHD7DagEVUfG41pDdHusZqs1ypJOa6diRWmmSbyFZrlIjgmoxfxk4yKWdevHWUrHxk0Ps7iXeMk8+9TLURjwwlegc47sjVfavHAh56UNtu0Akm25yM8US7BaXba52utba+w8CK8rRt0faOB9+fpXZ9e0TTr3RLi1ntoREsR24QDYQMgj0xSluv2ywkMVaCO04+NUiWPcSM+lew6nHIM54pG1CSULtViR61rZTSKv6jRf1izjBX+GprI7y6nGrYBFRSaijEDPWlCaVmkUljnNEYkcBW8sVy1EpvxRL0VdSTbGq2lDqKmjdmM0MRAmkiYRezgbkP8AyUVQ0xt8WPahWs6lJYXEc0Wd8Lq6/NTmiXyzS9wtRDGoW34Oq3bp2k0O3vI7oWkVx3M0dzuIERx4ucgcjj5/KmS8060v9D1PToRHsmjkhkC46leM++CD9qS+xtndXWi3lpaqXitrlmtlchUeN/GBnBxwSp9sedPGl6ZFp8W5iqt3aofFwABx/Yc48q87HpHoZLk4T2dRo4xHIMOh2t8x1pj3KBkkVQ1C2S37RaqbQiW0F22yePxId3ixuHGRnH0odq95JAhwMV6OmadSkec1FLd+37GASoTjIpc7X3O5RDID3QDAH1fH/uqGiajdX+pQ2sKl5ZnCIo8yTU3bXs3rdtevJJZyyQ4yDGQ+PXgc/tSmq1MXDCYzptDOFmWhQjupYbhZQfEo2j2potZFltFeRmkcnOWalCRWDhCrA9MEEHNPeg2cEGkR3F+W/wBSqkKgsSMZOT0A6fOsx2KKyzUnpbr5KumOZMoLbGeRRHHyTREabsO3bTfF2aOnalHHIQUeDvg7nG0YyQw8iMirCdn7iTdIY1yS20BSwfHnuHA9s129swbZXqbjjoRrq17tRkfciqOoxPHApReD55zXQp9FSWQxJPCrxkLKGXATPTnz9PKql9pcMdkiOm5wzA7029MeR5HWu3yKq2yC3SXBym8tZwneNGwQ+eOKqWzBSct866BeWix2kyoDtZeRSh/SQ15teQxp4SSBkjJqsbMs1dHqlemiS0LTsoLPHET4tpwSKeJrsfCxoZnkwgAdmySB0yaIaD2A0lEV7q9ubotzjiNT9uf3rPxA0u30620uWwRlhBaFgXLY8x1+tH0+qhu8RjUaGeMy6BVqVJ3E5GalvWjljOKDTTssGV61Stb6Ylg7cVre+orazNWlcnuTN7m6MMhUZ5rRbjKjmoLod49SxxDYKTc8mhGKjErXcvf3LE9M1bhtwY8gc1HHpVy8h8JovHbNbwAMOcVXa5PLLSsUIpIH2N5eaRqEN/YSFLiE5U/z7Uw63+JHaDW7Q2LRwWkLjEphU7n9sk8Cg8SLLNjirx09P1Ac4oM0myPdxwCWsQ8Q4OelULiD4dTxRuSURPt9KGas6svHvTFS3Jtnb25JAkOTICemaNfFL3CjIzQHdtORU0chYiraebUmi11W5IbtGmxHkmhWspJf38NraIZJZXCIg82JqEX/AMPBhTg4rTszeqvazSLi6kCwreR94zdApOCfbrRNXdivC7FdNp8W72dt7GWl3o2ldzPfpePa25/Kt7cguFXgBs5Y+Wcc0W1jude7LmO5eeyt7qNGmDpslWPcCyEHlSQCvtmp9Aje0e+s2tUgW3myk3eb+8VuVzzkEdOfpSf26e6ufxH7J2MVw0tpJv7+3gYjIB5Zx0K9OvofWsKpSS8+zWnKLfj0FdYutMstJFhplnutVj7vuYE8Mfo2PIe/9zXM9ctwbfOM4FdqvpIdJtEYNDCrSxRtuQlSpbGOPM54rm+rakLHWru3WwhVo532OfEdu44x5U5prlp1PPO4Vs0k9TZHb8An8NtENldNr96jRKgZLNGGDITwz/IcgfWj3abUy8ZYNyfSg02p3clwJJS7gH9qGa1etc3CW9uMluPcVmXudtnibtNcKK/IB6m8btvcBiG4z6+tMfZm40+HTIL/AFNJ5UtXLdxBGWaZixKj0A8JyT7etKmoxETlc5AGBRPT55bfTMJK0Y3BfCcE9T5fOnvaUIpS5Ma/1Cyifu1cZ4/4Ptvr91eJearqlvFA9xhIbV8t3UfG0N/3Hkn6VWi1yVnJa4Dcthtg3Lnrg44oFPOlvp8FsP1uTI5FRfFxogRAxY+1dLyeUeautssm5DBfa/LMZHaQYLZ27AQfnxz9agt9akulkinmZ1Yg4KDjHHHoMcfSgVxdKEI8WD7VFp90gn53VTawTjOUXkPOkU4ZQ45BpTvYd08gU9PCce1MHfQYYyOAPMmh9rFHeC5mt4wqb9vHngdatXHDGvToONmRk7L6jJcWAiGTLFx9KYNRtRreiSWRx3jYeEnykXp9+R9aR+y0z2esbG4RxzT1aNuTeowMn6UhOLpvyj2sJK6jk5dfK8W6J1Kup2lSMEEUPiRs5xT/ANr9HEuotdon5dyqyAjpnGG/cE/WgUdgsanIFbMJ7opmJKPttxF6bIccGtldgAMGib2XeN4B0qI2UgONtXRG8dbG3t3DFQDz5ihOtooYqnGKaLPT+4g5BJ86VtfDRznI4q28pNAW2hZZwRTEICbbd54odYqHKkDNHcf/AB8AUJgZPLEvUAVmb1oZOC/B5orrhKysfeqGlxm6uwmMiiV8DMekyzpHZtr4gn9JNMD9h+6iLAc44pk0Sx+FhDYGPYUcuJQttyPKpjPDGZU5jubOI6vYtazmJvKoYLXKhlKgggjI60V7Vyb75yo4BNBY7h14qtnLAwfjwd1XXoxeafr8dpJdJPpxW9+GfJWRcFB3efF1cAgZFe9ktRj17tJea0+iPpsogW2QzpiV0yWJJ+wx7da4hHfTIT3c0kef9jEf2rof4PapI3aK5tLiZ5DPbb1MjFjlSPX2Y/alXW1yEU8vA46926s9In1C1ubKWW5t22xxKoIfgFTk9OCDXIbvXb28vTc3EEmSSeFz15p3/FXTmTtFBcxg7bmAA4/3Kcf2I+1DNDs2HJxVnplZFSK16t0zcRb/AKxqDoVhgkAx12H/ADW1rIYi80zBrhxjA/0056rYPLAdnHXpxS3a6S6zMzjz86vTpEpcEanWtxe4AX2/vSxHXmobOdpzFASR+YSflR/XLRIoj0yPSlOMtHI0mcAk7T7UW+va8CqkrqxhuL6N5Wfnb0X5Co7W7Ekrv4iq5oNJdq4Cxr9au9+LayCIMu/JoGBZ6fC6LD3ayMVCnFRGZreRJQp255qtDJtXdW13OWh27fc120lU84wG9Z/6eOaLwxyJlqsdirlWt76DA4dZFJ888H/8igqapDeaK1i52zx8o2f1D0qXsnO6X00QH60HH1ror6D6ap1vkaNSCadaXOppEXaGMkL79B9M1zvUNd1TUpN11eTED9MaMVVfkBXWpLRLvTpraYZSeNo2+RBFcq0vs5qWoXM8ECxq1uxSR5GwNw8hxknzodijnLNSG7G2Ie/D7VLqTUJNPurmSW2MLOiyOW2MGXpnpnJpn1dVQExnilHTNF1DRNThmuVQxyI6pNG+VY8ZHPIphklMqcknPWiVtNcC12U8Mk0aMSyEN0xxVqW1HeNwOtQaRiOc+mKuSygyN4h1ouQKSCkmt3Cx8RQf8T/NKOv6jLNMCyRjjyB/msrKgLIr6ffSKpwqfv8AzRH+pzbD4I/sf5rKyoF5LkWNavJJCdyrnPlmqWjXkkV0GULn3zXtZREGj+J0Cx127EIXbEfmD/NSajrl0YgNkWD7H+aysof9Q3L8BduUS5glkkQbvalS5UJMwXpXtZRJCdXRGv6hTX+HUrx9tdHdDgmZkPuDG4P96ysqj6Zd9o65+IVtHJY2MjDxLMwB9iP/AFQDToUVOFrKyiU/tC8/3gmUVkwRQu9gjTO0VlZRqeyL0nET9VRZtTggkGY3lVWHqKRNauXa8mACqqMUVFGAAOlZWUvqn5F9KvEqpO6AMuATWGaR3YlzkHjFZWUtkawsnhu5gpAavDJIx5kb71lZUZOikeKSzYJpu7EKnfD8tQWOCwHPFZWVeIOf5HSEACAD0q/2Y0Wzkj1tirBrlSWYEZQ7Rkr6HgVlZVLehlPAK7TaHa6ZptnLbyXDF5DlZpS4yRnPPP74pfYDA4rKyrVdC+p/M3g8MbkdcVWeZ9x6VlZRwB//2Q==",
                      }}
                      width={180}
                      height={180}
                      borderRadius={90}
                      borderColor="black"
                      marginBottom={10}
                    />
                  )}
                </View>
                <View flexDirection="row" gap={10} style={{ marginLeft: 70 }}>
                  <TouchableOpacity
                    onPress={pickImage}
                    style={{
                      backgroundColor: color.grey,
                      padding: 17,
                      borderRadius: 10,
                      width: "40%",
                      size: "md",
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        textAlign: "center",
                        fontSize: 16,
                      }}
                    >
                      Select Image
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={async () => {
                      if (!image) {
                        console.error("No image selected.");
                        return;
                      }
                      const picRef = ref(storage, `Client/images/${isImage}`);
                      const response = await fetch(image);
                      const blob = await response.blob();
                      try {
                        const result = await uploadBytes(picRef, blob);
                        const url = await getDownloadURL(result.ref);
                        console.log("Image uploaded. URL:", url);
                        setUrlImage(url);
                        // Set the profilePicture value in Formik using setFieldValue
                      } catch (error) {
                        console.error("Error uploading image:", error);
                      }
                            
                    }}
                    style={{
                      backgroundColor: color.grey,
                      padding: 17,
                      borderRadius: 10,
                      width: "40%",
                      size: "md",
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        textAlign: "center",
                        fontSize: 16,
                      }}
                    >
                      Upload Image
                    </Text>
                  </TouchableOpacity>
                </View>
      
              </View>
            <Formik
              validationSchema={createAccountValidationSchema}
              enableReinitialize={true}
              initialValues={{
                firstName: "",
                lastName: "",
                email: "",
                dateOfBirth: Date.now(),
                gender: "Male",
                password: "",
                confirmPassword: "",
                profilePicture: urlImage,
              }}
              onSubmit={async (values) => {
          console.log(values);
          delete values.confirmPassword;
          try {
            const response = await axios.post("/signup", values);            
            if (response.status === 200) {
              ToastAndroid.show(
                "Successfully Created An Account",
                ToastAndroid.LONG
              );
              navigation.navigate("Sign in");
            } else {
              ToastAndroid.show("Account Creation Failed", ToastAndroid.LONG);
            }
          } catch (error) {
            console.log(error);
          }
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
                  value={time}
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
              <Text
                style={{
                  marginLeft: 10,
                  marginTop: 5,
                  fontWeight: 600,
                  fontSize: 18,
                }}
              >
                Select Gender
              </Text>
              <RadioButton.Group
                onValueChange={handleChange("gender")}
                value={values.gender}
              >
                <View style={{ flexDirection: "row", marginLeft: 10 }}>
                  <RadioButton value="Male"></RadioButton>
                  <Text style={{ marginTop: 8, fontSize: 18 }}>Male</Text>
                  <RadioButton value="Female"></RadioButton>
                  <Text style={{ marginTop: 8, fontSize: 18 }}>Female</Text>
                  <RadioButton value="Prefer not to say"></RadioButton>
                  <Text style={{ marginTop: 8, fontSize: 18 }}>
                    Prefer not to say
                  </Text>
                </View>
              </RadioButton.Group>
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
                secureTextEntry={true} // Hide the password
                theme={{
                  colors: {
                    primary: color.lightGrey,
                  },
                }}
              />
              {errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
            </View>
            <View style={styles.textInputContainer}>
              <TextInput
                onChangeText={handleChange("confirmPassword")}
                onBlur={handleBlur("confirmPassword")}
                value={values.confirmPassword}
                placeholder="Confirm Password"
                style={styles.TextInput}
                mode="outlined"
                error={errors.confirmPassword}
                secureTextEntry={true} // Hide the password
                theme={{
                  colors: {
                    primary: color.lightGrey,
                  },
                }}
              />
              {errors.confirmPassword && (
                <Text style={styles.errorText}>{errors.confirmPassword}</Text>
              )}
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
                  Sign Up
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
