// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   TextInput,
//   ToastAndroid,
// } from "react-native";
// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// import { Formik } from "formik";
// import * as yup from "yup";
// import DateTimePicker from "@react-native-community/datetimepicker";
// import Icon from "react-native-vector-icons/Ionicons";
// import color from "../../constants/colors";
// import Constants from "expo-constants";

// const validationSchema = yup.object().shape({
//   startTime: yup.date().required("Please select a start time"),
//   endTime: yup.date().required("Please select an end time"),
//   timeInBed: yup.string().required("Time in Bed is required"),
//   totalSleepTime: yup.string().required("Total Sleep Time is required"),
//   timeAwake: yup.string().required("Time Awake is required"),
// });

// const TimePickerScreen = () => {
//   const [showStartTimePicker, setShowStartTimePicker] = useState(false);
//   const [startSelectedTime, setStartSelectedTime] = useState(new Date());

//   const [showEndTimePicker, setShowEndTimePicker] = useState(false);
//   const [endSelectedTime, setEndSelectedTime] = useState(new Date());

//   const toggleTimePicker = (pickerType) => {
//     if (pickerType === "start") {
//       setShowStartTimePicker(!showStartTimePicker);
//     } else if (pickerType === "end") {
//       setShowEndTimePicker(!showEndTimePicker);
//     }
//   };

//   const handleTimeChange = (event, selectedTime, pickerType) => {
//     if (event.type === "set") {
//       if (pickerType === "start") {
//         setStartSelectedTime(selectedTime);
//       } else if (pickerType === "end") {
//         setEndSelectedTime(selectedTime);
//       }
//     } else {
//       setShowStartTimePicker(false);
//       setShowEndTimePicker(false);
//     }
//   };

//   return (
//     <KeyboardAwareScrollView
//       style={{ backgroundColor: "white" }}
//       contentContainerStyle={{ flexGrow: 1 }}
//     >
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <View
//           style={{ alignItems: "flex-start", marginBottom: 20, marginLeft: 10 }}
//         >
//           <Text
//             style={{
//               fontSize: 22,
//               color: color.grey,
//               marginLeft: 10,
//               marginBottom: 10,
//             }}
//           >
//             Start Time
//           </Text>
//           <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
//             <TextInput
//               style={{
//                 flex: 1,
//                 fontSize: 22,
//                 borderBottomWidth: 1,
//                 paddingVertical: 10,
//                 paddingHorizontal: 10,
//                 backgroundColor: color.lightGrey,
//                 borderRadius: 10,
//                 width: "60%",
//                 color: "black",
//                 marginLeft: 10,
//               }}
//               value={startSelectedTime.toLocaleTimeString()}
//               editable={false}
//             />
//             <TouchableOpacity onPress={() => toggleTimePicker("start")}>
//               <Icon name="time-outline" size={36} color="blue" />
//             </TouchableOpacity>
//           </View>
//         </View>

//         <View
//           style={{ alignItems: "flex-start", marginBottom: 20, marginLeft: 10 }}>
//           <Text
//             style={{
//               fontSize: 22,
//               color: color.grey,
//               marginLeft: 10,
//               marginBottom: 10,
//             }}
//           >
//             End Time
//           </Text>
//           <View style={{ flexDirection: "row", alignItems: "flex-start"}}>
//             <TextInput
//               style={{
//                 flex: 1,
//                 fontSize: 22,
//                 borderBottomWidth: 1,
//                 paddingVertical: 10,
//                 paddingHorizontal: 10,
//                 backgroundColor: color.lightGrey,
//                 borderRadius: 10,
//                 width: "60%",
//                 color: "black",
//                 marginLeft: 10,
//             }}
//               value={endSelectedTime.toLocaleTimeString()}
//               editable={false}
//             />
//             <TouchableOpacity onPress={() => toggleTimePicker("end")}>
//               <Icon name="time-outline" size={36} color="blue" />
//             </TouchableOpacity>
//           </View>
//         </View>

//         <Formik
//           initialValues={{
//             startTime: startSelectedTime,
//             endTime: endSelectedTime,
//             timeInBed: "",
//             totalSleepTime: "",
//             timeAwake: "",
//           }}
//           validationSchema={validationSchema}
//           onSubmit={(values) => {

//             console.log("Form Values:", values);
//             ToastAndroid.show(
//                 "Sleep Schedule Added",
//                 ToastAndroid.LONG
//               );
//           }}
//         >
//           {({ values, handleSubmit, errors, handleChange }) => (
//             <>
//               {showStartTimePicker && (
//                 <DateTimePicker
//                   value={startSelectedTime}
//                   mode="time"
//                   is24Hour={true}
//                   display="spinner"
//                   onChange={(event, selectedTime) =>
//                     handleTimeChange(event, selectedTime, "start")
//                   }
//                 />
//               )}

//               {showEndTimePicker && (
//                 <DateTimePicker
//                   value={endSelectedTime}
//                   mode="time"
//                   is24Hour={true}
//                   display="spinner"
//                   onChange={(event, selectedTime) =>
//                     handleTimeChange(event, selectedTime, "end")
//                   }
//                 />
//               )}
//               <View
//                 style={{
//                   alignItems: "flex-start",
//                   marginBottom: 20,
//                 }}
//               >
//                 <Text
//                   style={{
//                     fontSize: 22,
//                     color: color.grey,
//                     marginBottom: 10,
//                   }}
//                 >
//                   Time in Bed
//                 </Text>
//                 <View
//                   style={{
//                     flexDirection: "row",
//                     alignItems: "flex-start",
//                     width: "90%",
//                   }}
//                 >
//                   <TextInput
//                     style={{
//                       flex: 1,
//                       fontSize: 22,
//                       borderBottomWidth: 1,
//                       paddingVertical: 10,
//                       paddingHorizontal: 10,
//                       backgroundColor: color.lightGrey,
//                       borderRadius: 10,
//                       width: "40%",
//                       color: "black",

//                     }}
//                     keyboardType="numeric"
//                     maxLength={2}
//                     value={values.timeInBed}
//                     onChangeText={handleChange("timeInBed")}
//                   />
//                 </View>
//                 {errors.timeInBed && (
//                   <Text style={{ color: "red",marginLeft:10,fontSize:18 }}>{errors.timeInBed}</Text>
//                 )}
//               </View>
//               <View
//                 style={{
//                   alignItems: "flex-start",
//                   marginBottom: 20,

//                 }}
//               >
//                 <Text
//                   style={{
//                     fontSize: 22,
//                     color: color.grey,
//                     marginLeft: 10,
//                     marginBottom: 10,
//                   }}
//                 >
//                   Total Sleep Time
//                 </Text>
//                 <View
//                   style={{
//                     flexDirection: "row",
//                     alignItems: "flex-start",
//                     width: "90%",
//                   }}
//                 >
//                   <TextInput
//                     style={{
//                       flex: 1,
//                       fontSize: 22,
//                       borderBottomWidth: 1,
//                       paddingVertical: 10,
//                       paddingHorizontal: 10,
//                       backgroundColor: color.lightGrey,
//                       borderRadius: 10,
//                       width: "45%",
//                       color: "black",
//                     }}
//                     keyboardType="numeric"
//                     value={values.totalSleepTime}
//                     onChangeText={handleChange("totalSleepTime")}
//                   />
//                 </View>
//                 {errors.totalSleepTime && (
//                   <Text style={{ color: "red",marginLeft:10,fontSize:18 }}>{errors.totalSleepTime}</Text>
//                 )}
//               </View>
//               <View
//                 style={{
//                   alignItems: "flex-start",
//                   marginBottom: 20,
//                 }}
//               >
//                 <Text
//                   style={{
//                     fontSize: 22,
//                     color: color.grey,
//                     marginLeft: 10,
//                     marginBottom: 10,
//                   }}
//                 >
//                   Time Awake
//                 </Text>
//                 <View
//                   style={{
//                     flexDirection: "row",
//                     alignItems: "flex-start",
//                     width: "90%",
//                   }}
//                 >
//                   <TextInput
//                     style={{
//                       flex: 1,
//                       fontSize: 22,
//                       borderBottomWidth: 1,
//                       paddingVertical: 10,
//                       paddingHorizontal: 10,
//                       backgroundColor: color.lightGrey,
//                       borderRadius: 10,
//                       width: "45%",
//                       color: "black",
//                     }}
//                     keyboardType="numeric"
//                     value={values.timeAwake}
//                     onChangeText={handleChange("timeAwake")}
//                   />
//                 </View>
//                 {errors.timeAwake && (
//                   <Text style={{ color: "red",marginLeft:10,fontSize:18 }}>{errors.timeAwake}</Text>
//                 )}
//               </View>
//               <TouchableOpacity
//                 style={{
//                   backgroundColor: color.grey,
//                   alignItems: "center",
//                   padding: 10,
//                   borderRadius: 10,
//                   width: "90%",
//                   marginTop: 20,
//                 }}
//                 onPress={handleSubmit}
//               >
//                 <Text
//                   style={{
//                     color: "white",
//                     fontFamily: "Inter_700Bold",
//                     fontSize: 20,
//                   }}
//                 >
//                   Submit
//                 </Text>
//               </TouchableOpacity>
//             </>
//           )}
//         </Formik>
//       </View>
//     </KeyboardAwareScrollView>
//   );
// };

// export default TimePickerScreen;
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from "react-native-vector-icons/Ionicons";
import color from "../../constants/colors";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";
import useStore from "../zustand/store";

const validationSchema = yup.object().shape({
  startTime: yup.date().required("Please select a start time"),
  endTime: yup.date().required("Please select an end time"),
  timeInBed: yup.string().required("Time in Bed is required"),
  totalSleepTime: yup.string().required("Total Sleep Time is required"),
  timeAwake: yup.string().required("Time Awake is required"),
});

const TimePickerScreen = ({ navigation }) => {
  const { responseData } = useStore();
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [startSelectedTime, setStartSelectedTime] = useState(new Date());

  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const [endSelectedTime, setEndSelectedTime] = useState(new Date());

  const toggleTimePicker = (pickerType) => {
    if (pickerType === "start") {
      setShowStartTimePicker(!showStartTimePicker);
    } else if (pickerType === "end") {
      setShowEndTimePicker(!showEndTimePicker);
    }
  };

  const handleTimeChange = (event, selectedTime, pickerType, setFieldValue) => {
    if (event.type === "set") {
      if (pickerType === "start") {
        setStartSelectedTime(selectedTime);
        setFieldValue("startTime", selectedTime);
      } else if (pickerType === "end") {
        setEndSelectedTime(selectedTime);
        setFieldValue("endTime", selectedTime);
      }
    }
    setShowStartTimePicker(false);
    setShowEndTimePicker(false);
  };

  return (
    <KeyboardAwareScrollView
      style={{ backgroundColor: "white" }}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View style={styles.container}>
        <Text style={styles.heading}>Sleep Schedule</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Start Time</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.timeInput}
              value={startSelectedTime.toLocaleTimeString()}
              editable={false}
            />
            <TouchableOpacity
              style={styles.icon}
              onPress={() => toggleTimePicker("start")}
            >
              <Icon name="time-outline" size={24} color="#007AFF" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>End Time</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.timeInput}
              value={endSelectedTime.toLocaleTimeString()}
              editable={false}
            />
            <TouchableOpacity
              style={styles.icon}
              onPress={() => toggleTimePicker("end")}
            >
              <Icon name="time-outline" size={24} color="#007AFF" />
            </TouchableOpacity>
          </View>
        </View>

        <Formik
          initialValues={{
            startTime: startSelectedTime,
            endTime: endSelectedTime,
            timeInBed: "",
            totalSleepTime: "",
            timeAwake: "",
          }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            const object={
                "logDate":Date.now(),
                "sleepEndTime":values.endTime,
                "sleepStartTime":values.startTime,
                "timeAwake":values.timeAwake,
                "timeInBed":values.timeInBed,
                "totalSleepTime":values.totalSleepTime
            }
            const response = await axios.post(`/sleep-tracker/${responseData._id}`,object);
            console.log(response.data.data)
            // console.log("Form Values:", values);
            // console.log("Start Time:", startSelectedTime);
            // console.log("End Time:", endSelectedTime);
            navigation.navigate("Information Screen");
          }}
        >
          {({ handleSubmit, setFieldValue, values, handleChange, errors }) => (
            <>
              {showStartTimePicker && (
                <DateTimePicker
                  value={startSelectedTime}
                  mode="time"
                  is24Hour={true}
                  display="inline"
                  onChange={(event, selectedTime) =>
                    handleTimeChange(
                      event,
                      selectedTime,
                      "start",
                      setFieldValue
                    )
                  }
                />
              )}

              {showEndTimePicker && (
                <DateTimePicker
                  value={endSelectedTime}
                  mode="time"
                  is24Hour={true}
                  display="inline"
                  onChange={(event, selectedTime) =>
                    handleTimeChange(event, selectedTime, "end", setFieldValue)
                  }
                />
              )}

              <View
                style={{
                  alignItems: "flex-start",
                  marginBottom: 20,
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    color: color.grey,
                    marginBottom: 10,
                  }}
                >
                  Time in Bed
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "flex-start",
                    width: "100%",
                  }}
                >
                  <TextInput
                    style={{
                      flex: 1,
                      fontSize: 22,
                      borderBottomWidth: 1,
                      paddingVertical: 10,
                      paddingHorizontal: 10,
                      backgroundColor: color.lightGrey,
                      borderRadius: 10,
                      width: "40%",
                      color: "black",
                    }}
                    keyboardType="numeric"
                    maxLength={2}
                    value={values.timeInBed}
                    onChangeText={handleChange("timeInBed")}
                  />
                </View>
                {errors.timeInBed && (
                  <Text style={{ color: "red", marginLeft: 10, fontSize: 18 }}>
                    {errors.timeInBed}
                  </Text>
                )}
              </View>
              <View
                style={{
                  alignItems: "flex-start",
                  marginBottom: 20,
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    color: color.grey,
                    marginLeft: 10,
                    marginBottom: 10,
                  }}
                >
                  Total Sleep Time
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "flex-start",
                    width: "100%",
                  }}
                >
                  <TextInput
                    style={{
                      flex: 1,
                      fontSize: 22,
                      borderBottomWidth: 1,
                      paddingVertical: 10,
                      paddingHorizontal: 10,
                      backgroundColor: color.lightGrey,
                      borderRadius: 10,
                      width: "50%",
                      color: "black",
                    }}
                    keyboardType="numeric"
                    value={values.totalSleepTime}
                    onChangeText={handleChange("totalSleepTime")}
                  />
                </View>
                {errors.totalSleepTime && (
                  <Text style={{ color: "red", marginLeft: 10, fontSize: 18 }}>
                    {errors.totalSleepTime}
                  </Text>
                )}
              </View>
              <View
                style={{
                  alignItems: "flex-start",
                  marginBottom: 20,
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    color: color.grey,
                    marginLeft: 10,
                    marginBottom: 10,
                  }}
                >
                  Time Awake
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "flex-start",
                    width: "100%",
                  }}
                >
                  <TextInput
                    style={{
                      flex: 1,
                      fontSize: 22,
                      borderBottomWidth: 1,
                      paddingVertical: 10,
                      paddingHorizontal: 10,
                      backgroundColor: color.lightGrey,
                      borderRadius: 10,
                      width: "45%",
                      color: "black",
                    }}
                    keyboardType="numeric"
                    value={values.timeAwake}
                    onChangeText={handleChange("timeAwake")}
                  />
                </View>
                {errors.timeAwake && (
                  <Text style={{ color: "red", marginLeft: 10, fontSize: 18 }}>
                    {errors.timeAwake}
                  </Text>
                )}
              </View>
              <TouchableOpacity
                style={{
                  backgroundColor: color.grey,
                  alignItems: "center",
                  padding: 10,
                  borderRadius: 10,
                  width: "90%",
                  marginTop: 20,
                  marginLeft: 20,
                }}
                onPress={handleSubmit}
              >
                <Text
                  style={{
                    color: "white",
                    fontFamily: "Inter_700Bold",
                    fontSize: 20,
                  }}
                >
                  Submit
                </Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "left",
    color: "#333",
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  timeInput: {
    flex: 1,
    fontSize: 18,
    borderBottomWidth: 1,
    paddingVertical: 0,
    color: "black",
  },
  icon: {
    marginLeft: 10,
  },
  submitButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  submitButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default TimePickerScreen;
