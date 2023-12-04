// // DailyWebView.js
// import React from 'react';
// import { WebView } from 'react-native-webview';

// const DailyWebView = () => {
//   const dailyCoUrl = 'https://mindcare.daily.co/mindcare';

//   return (
//     <WebView
//       source={{ uri: dailyCoUrl }}
//       style={{ flex: 1 }}
//     />
//   );
// };
// import React, { useEffect } from 'react';
// import { View } from 'react-native';
// import { WebView } from 'react-native-webview';
// import * as Permissions from 'expo-permissions';

// const requestPermissions = async () => {
//   const { status } = await Permissions.askAsync(Permissions.CAMERA, Permissions.AUDIO_RECORDING);
//   if (status !== 'granted') {
//     alert('Sorry, we need camera and audio permissions to make this work!');
//   }
// };

// const App = () => {
//   useEffect(() => {
//     requestPermissions();
//   }, []);

//   return (
//     <View style={{ flex: 1 }}>
//       <WebView
//         source={{ uri: 'https://mindcare.daily.co/mindcare' }}
//         style={{ flex: 1, height: 20 }}
//       />
//     </View>
//   );
// };

// export default App;

// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity } from 'react-native';
// import { AntDesign } from '@expo/vector-icons';

// const ReviewScreen = () => {
//   const [starCount, setStarCount] = useState(0);

//   const handleStarPress = (count) => {
//     setStarCount(count);
//   };

//   return (
//     <>
//       <View style={{ flexDirection: 'row', marginTop: 50 ,justifyContent:"space-evenly",marginHorizontal:20}}>
//         {[1, 2, 3, 4, 5].map((index) => (
//           <TouchableOpacity key={index} onPress={() => handleStarPress(index)}>
//             <AntDesign
//               name={index <= starCount ? 'star' : 'staro'}
//               size={40}
//               color={index <= starCount ? 'gold' : 'black'}
//             />
//           </TouchableOpacity>
//         ))}
//       </View>
//       <Text>Selected Star Count: {starCount}</Text>
//     </>
//   );
// };

// export default ReviewScreen;

import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { TextInput, Text } from "react-native-paper";
import { Formik } from "formik";
import StarRating from "react-native-star-rating";
import * as yup from "yup";
import useStore from "../zustand/store";
import { useNavigation } from "@react-navigation/native";
const validationSchema = yup.object().shape({
  description: yup.string().required("Description is required"),
});
import axios from "axios";
import { trackEvent } from "@aptabase/react-native";

const App = () => {
  useEffect(() => {
    trackEvent("Call Screen");
  }, []);
  const TherapistDetails = useStore((state) => state.selectedItem);
  const navigation = useNavigation();
  const description = useStore((state) => state.problemDesciption);
  const [starCount, setStarCount] = useState(1); // set initial star count to 1

  const handleStarPress = (rating) => {
    setStarCount(rating);
  };

  const headers = {
    "Content-Type": "application/json",
  };

  const onSubmit = async (values, { setSubmitting }) => {
    const object = {
      review: values.description,
      rating: values.stars,
    };
    const id = "6568eb75090f3ade761638dc";
    const response = await axios.patch(`/therapist-review/${id}`, object);
    console.log(response.status);
    navigation.goBack();
    // setSubmitting(false);
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          description: "",
          stars: 1,
        }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          isSubmitting,
          setFieldValue,
        }) => (
          <View>
            <Text style={{ fontSize: 22, fontWeight: 700, marginBottom: 25 }}>
              Rate Your Experience:
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                marginBottom: 25,
              }}
            >
              <StarRating
                disabled={false}
                maxStars={5}
                minStars={1}
                rating={values.stars}
                selectedStar={(rating) => {
                  setFieldValue("stars", rating);
                  handleStarPress(rating);
                }}
                starSize={40}
                fullStarColor="gold"
                starStyle={{ marginRight: 20 }}
              />
            </View>
            <Text style={{ fontSize: 22, fontWeight: 700, marginBottom: 15 }}>
              Review:
            </Text>
            <TextInput
              onChangeText={(text) => {
                const wordCount = text.trim().split(/\s+/).length;
                if (wordCount <= 30) {
                  handleChange("description")(text);
                }
              }}
              onBlur={handleBlur("description")}
              value={values.description}
              multiline
              numberOfLines={5}
              style={{ fontSize: 22, backgroundColor: "#d3d3d3" }}
              error={touched.description && errors.description}
            />
            <Text style={styles.wordCount}>
              {values.description.trim().split(/\s+/).length}/30 words
            </Text>
            <TouchableOpacity
              mode="contained"
              onPress={handleSubmit}
              disabled={!values.description.trim() || isSubmitting}
              style={[
                styles.button,
                {
                  backgroundColor:
                    !values.description.trim() || isSubmitting
                      ? "#696B81"
                      : "#2D3748",
                },
              ]}
            >
              <Text
                style={{ color: "white", fontWeight: "bold", fontSize: 22 }}
              >
                Next
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  button: {
    marginTop: 20,
    textAlign: "center",
    alignItems: "center",
    paddingVertical: 16,
    borderRadius: 8,
  },
  wordCount: {
    alignSelf: "flex-end",
    marginTop: 5,
    color: "#999",
  },
});

export default App;

// DailyWebView.js
// import React, { useEffect } from 'react';
// import { WebView } from 'react-native-webview';
// import { request, PERMISSIONS } from 'react-native-permissions';

// const DailyWebView = () => {
//   const dailyCoUrl = 'https://mindcare.daily.co/mindcare';

//   useEffect(() => {
//     const requestPermissions = async () => {
//       try {
//         const cameraPermission = await request(PERMISSIONS.IOS.CAMERA);
//         const micPermission = await request(PERMISSIONS.IOS.MICROPHONE);

//         if (cameraPermission === 'granted' && micPermission === 'granted') {
//           console.log('Camera and microphone permissions granted');
//         } else {
//           console.log('Camera and/or microphone permissions not granted');
//         }
//       } catch (error) {
//         console.error('Error requesting permissions:', error);
//       }
//     };

//     requestPermissions();
//   }, []);

//   return (
//     <WebView
//       source={{ uri: dailyCoUrl }}
//       style={{ flex: 1 }}
//     />
//   );
// };

// export default DailyWebView;
