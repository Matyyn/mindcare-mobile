import React, { useEffect } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { TextInput, Text } from "react-native-paper";
import { Formik } from "formik";
import * as yup from "yup";
import useStore from "../zustand/store";
import { useNavigation } from "@react-navigation/native";
import { trackEvent } from "@aptabase/react-native";

const validationSchema = yup.object().shape({
  description: yup.string().required("Description is required"),
});
import axios from "axios";

const App = () => {
  useEffect(() => {
    trackEvent("Appointment Reason");
  }, []);
  const { setPaymentLink, setProblemDescription, setPaymentId } = useStore();
  const TherapistDetails = useStore((state) => state.selectedItem);
  const navigation = useNavigation();
  const description = useStore((state) => state.problemDesciption);
  //const setProblemDescription = useStore((state) => state.setProblemDescription);
  const headers = {
    "Content-Type": "application/json",
  };

  const onSubmit = async (values, { setSubmitting }) => {
    console.log(values);
    setProblemDescription(values.description);
    setSubmitting(false);
    const response = await axios.post("/payments", {
      sessionCharges: parseInt(TherapistDetails.sessionCharges),
    });
    console.log(response.data.data.url);
    setPaymentId(response.data.data.id);
    console.log(response.data.data.id);
    setPaymentLink(response.data.data.url);
    navigation.navigate("Payment Method");
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          description: "",
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
        }) => (
          <View>
            <Text style={{ fontSize: 22, fontWeight: 700, marginBottom: 15 }}>
              Description:
            </Text>
            <TextInput
              onChangeText={(text) => {
                const wordCount = text.trim().split(/\s+/).length;
                if (wordCount <= 100) {
                  handleChange("description")(text);
                }
              }}
              onBlur={handleBlur("description")}
              value={values.description}
              multiline
              numberOfLines={10}
              style={{ fontSize: 22 }}
              error={touched.description && errors.description}
            />
            <Text style={styles.wordCount}>
              {values.description.trim().split(/\s+/).length}/100 words
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
                      ? "rgba(45, 55, 72, 0.6)"
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
