import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Calendar } from "react-native-calendars";
import { useNavigation } from "@react-navigation/native";
import useStore from "../zustand/store";
import { trackEvent } from "@aptabase/react-native";
const CalendarScreen = () => {
  useEffect(() => {
    trackEvent("Booking Appointment");
  }, []);
  const navigation = useNavigation();
  const { setAppointmentSelectedDate, setAppointmentSelectedTimeIndex } =
    useStore();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeIndex, setSelectedTimeIndex] = useState(null);
  const timeOptions = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
  ];

  const onDateSelect = (day) => {
    const currentDate = new Date();
    const selectedDay = new Date(day.dateString);

    if (selectedDay >= currentDate) {
      setSelectedDate(day.dateString);
      setAppointmentSelectedDate(day.dateString);
      setSelectedTimeIndex(null);
    }
  };

  const onTimeSelect = (index) => {
    setSelectedTimeIndex(index);
    const selectedTime = timeOptions[index];
    setAppointmentSelectedTimeIndex(selectedTime);
  };

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={onDateSelect}
        markedDates={selectedDate ? { [selectedDate]: { selected: true } } : {}}
        minDate={new Date().toISOString().split("T")[0]}
        disabledDaysIndexes={[0, 6]}
      />

      {selectedDate && (
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 20, marginLeft: "2%", fontWeight: "bold" }}>
            Select Hour:
          </Text>
          <View style={styles.timeContainer}>
            <View style={styles.column}>
              {timeOptions.slice(0, 3).map((time, index) => (
                <TouchableOpacity
                  key={time}
                  onPress={() => onTimeSelect(index)}
                  style={[
                    styles.timeOption,
                    selectedTimeIndex === index && styles.selectedTime,
                  ]}
                >
                  <Text style={{ textAlign: "center", fontSize: 22 }}>
                    {time}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.column}>
              {timeOptions.slice(3, 6).map((time, index) => (
                <TouchableOpacity
                  key={time}
                  onPress={() => onTimeSelect(index + 3)}
                  style={[
                    styles.timeOption,
                    selectedTimeIndex === index + 3 && styles.selectedTime,
                  ]}
                >
                  <Text style={{ textAlign: "center", fontSize: 22 }}>
                    {time}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.column}>
              {timeOptions.slice(6).map((time, index) => (
                <TouchableOpacity
                  key={time}
                  onPress={() => onTimeSelect(index + 6)}
                  style={[
                    styles.timeOption,
                    selectedTimeIndex === index + 6 && styles.selectedTime,
                  ]}
                >
                  <Text style={{ textAlign: "center", fontSize: 22 }}>
                    {time}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      )}

      {selectedTimeIndex !== null && (
        <TouchableOpacity
          mode="contained"
          onPress={() => {
            navigation.navigate("Appointment Reason");
          }}
          style={styles.button}
        >
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 22 }}>
            Next
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  timeContainer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  column: {
    flex: 1,
  },
  timeOption: {
    paddingVertical: 10,
    borderWidth: 1,
    margin: 5,
    borderColor: "gray",
    borderRadius: 5,
  },
  selectedTime: {
    backgroundColor: "lightblue",
  },
  button: {
    marginTop: 20,
    textAlign: "center",
    backgroundColor: "#2D3748",
    alignItems: "center",
    paddingVertical: 16,
    borderRadius: 8,
  },
});

export default CalendarScreen;
