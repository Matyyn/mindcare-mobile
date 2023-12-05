import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { TextInput, Text } from "react-native-paper";
import { Formik } from "formik";
import StarRating from "react-native-star-rating";
import * as yup from "yup";
import useStore from "../zustand/store";
import { useNavigation } from "@react-navigation/native";
import { trackEvent } from "@aptabase/react-native";
import axios from "axios";

const validationSchema = yup.object().shape({
description: yup.string().required("Description is required"),
});

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