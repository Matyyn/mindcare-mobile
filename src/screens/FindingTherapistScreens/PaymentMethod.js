import React from "react";
import {
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
  View,
  Text,
} from "react-native";
import color from "../../constants/colors";
import { Formik } from "formik";
import { TextInput } from "react-native-paper";
import * as Yup from "yup";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import useStore from "../zustand/store";
import { useNavigation } from "@react-navigation/native";

const paymentValidationSchema = Yup.object().shape({
  cardName: Yup.string().required("Card Name is required"),
  cardNumber: Yup.string()
    .required("Card Number is required")
    .matches(/^\d{16}$/, "Invalid Card Number"),
  cvv: Yup.string()
    .required("CVV is required")
    .matches(/^\d{3}$/, "Invalid CVV"),
  expiryDate: Yup.string()
    .required("Expiry Date is required")
    .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Invalid Expiry Date (MM/YY)"),
});
const CreditCardScreen = () => {
  const navigation = useNavigation();
  const description = useStore((state) => state.creditCardDetails);
  const setcreditDetails = useStore((state) => state.setcreditDetails);
  return (
    <ScrollView>
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
          Add Credit Card
        </Text>
        <View
          style={{
            backgroundColor: "#f2f2f2",
            height: 230,
          }}
        >
          <Image
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRrzHCFTDK7yulP3VMV0upK4UAWpX3oA4p6VWhnC_eanEvYzA9TDhTgxDCHsLB1Ut0arU&usqp=CAU",
            }}
            height={200}
            style={{ borderRadius: 20 }}
            width={"auto"}
          />
        </View>
        <Formik
          validationSchema={paymentValidationSchema}
          initialValues={{
            cardName: "",
            cardNumber: "",
            cvv: "",
            expiryDate: "",
          }}
          onSubmit={(values) => {
            console.log(values);
            setcreditDetails(values.cardNumber.toString());
            navigation.navigate('Review Summary')
          }}>
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
                {/* Card Name */}
                <View style={styles.textInputContainer}>
                  <TextInput
                    label="Card Name"
                    onChangeText={handleChange("cardName")}
                    onBlur={handleBlur("cardName")}
                    value={values.cardName}
                    style={styles.TextInput}
                    mode="outlined"
                    error={errors.cardName}
                    theme={{
                      colors: {
                        primary: color.lightGrey,
                      },
                    }}
                  />
                  {errors.cardName && (
                    <Text style={styles.errorText}>{errors.cardName}</Text>
                  )}
                </View>

                {/* Card Number */}
                <View style={styles.textInputContainer}>
                  <TextInput
                    label="Card Number"
                    onChangeText={handleChange("cardNumber")}
                    onBlur={handleBlur("cardNumber")}
                    value={values.cardNumber}
                    keyboardType="numeric"
                    style={styles.TextInput}
                    mode="outlined"
                    error={errors.cardNumber}
                    theme={{
                      colors: {
                        primary: color.lightGrey,
                      },
                    }}
                  />
                  {errors.cardNumber && (
                    <Text style={styles.errorText}>{errors.cardNumber}</Text>
                  )}
                </View>

                {/* CVV */}
                <View style={styles.textInputContainer}>
                  <TextInput
                    label="CVV"
                    onChangeText={handleChange("cvv")}
                    onBlur={handleBlur("cvv")}
                    value={values.cvv}
                    keyboardType="numeric"
                    style={styles.TextInput}
                    mode="outlined"
                    error={errors.cvv}
                    theme={{
                      colors: {
                        primary: color.lightGrey,
                      },
                    }}
                  />
                  {errors.cvv && (
                    <Text style={styles.errorText}>{errors.cvv}</Text>
                  )}
                </View>

                {/* Expiry Date */}
                <View style={styles.textInputContainer}>
                  <TextInput
                    label="Expiry Date (MM/YY)"
                    onChangeText={handleChange("expiryDate")}
                    onBlur={handleBlur("expiryDate")}
                    value={values.expiryDate}
                    style={styles.TextInput}
                    mode="outlined"
                    error={errors.expiryDate}
                    theme={{
                      colors: {
                        primary: color.lightGrey,
                      },
                    }}
                  />
                  {errors.expiryDate && (
                    <Text style={styles.errorText}>{errors.expiryDate}</Text>
                  )}
                </View>
                <TouchableOpacity
                  onPress={handleSubmit} // This triggers the form submission
                  style={{
                    textAlign: "center",
                    alignItems: "center",
                    backgroundColor: "#2D3748",
                    paddingVertical: 16,
                    marginTop: 10,
                    borderRadius: 8,
                  }}
                  disabled={!isValid}
                >
                  <Text
                    style={{ fontSize: 22, fontWeight: 700, color: "white" }}
                  >
                    Submit
                  </Text>
                </TouchableOpacity>
              </View>
            </KeyboardAwareScrollView>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
};

export default CreditCardScreen;

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

  textInputContainer: {
    marginBottom: "2%",
  },

  TextInput: {
    borderRadius: 20,
    width: "100%",
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
