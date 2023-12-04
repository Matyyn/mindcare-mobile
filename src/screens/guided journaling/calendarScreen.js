// import React, { useState } from "react";
// import { View, StyleSheet, Text } from "react-native";
// import { Calendar } from "react-native-calendars";
// import useStore from "../zustand/store";

// const CalendarScreen = () => {
//   const {journalsCount} =useStore();
//   const [selectedDate, setSelectedDate] = useState(null);

//   const handleDateSelect = (date) => {
//     setSelectedDate(date.dateString);
//   };

//   const markedDates = {};
//   journalsCount.forEach((entry) => {
//     markedDates[entry.date] = { selected: true, marked: true, dotColor: 'yellow' };
//   });

//   const selectedDateCount = journalsCount.find((entry) => entry.date === selectedDate)?.count || 0;
//   const today = new Date().toISOString().split("T")[0];
//   return (
//     <View style={styles.container}>
//       <Calendar
//         onDayPress={handleDateSelect}
//         markedDates={markedDates}
//         style={{ borderRadius: 15 }}
//         maxDate={today}
//       />

//       <View style={styles.entriesContainer}>
//         <Text style={styles.selectedDate}>
//           Summary of {selectedDate || "Today"}
//         </Text>
//         <View style={{ flexDirection: "row" }}>
//           <Text style={styles.totalJournals}>
//             Total Journals: {selectedDateCount}
//           </Text>
//         </View>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 30,
//   },
//   entriesContainer: {
//     marginTop: 20,
//     marginBottom: 20,
//     backgroundColor: "lightgreen",
//     borderRadius: 10,
//     padding: 12,
//   },
//   selectedDate: {
//     fontWeight: "600",
//     fontSize: 18,
//     padding: 10,
//   },
//   totalJournals: {
//     fontWeight: "600",
//     fontSize: 18,
//     padding: 10,
//     paddingTop: 0,
//   },
// });

// export default CalendarScreen;
import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Calendar } from "react-native-calendars";
import axios from "axios";
import useStore from "../zustand/store";

const CalendarScreen = () => {
  const { responseData } = useStore();
  const [selectedDate, setSelectedDate] = useState(null);
  const [journalsCount, setJournalsCount] = useState([]);
  const [markedDates, setMarkedDates] = useState({});

  useEffect(() => {
    fetchJournals();
  }, []);

  const fetchJournals = async () => {
    try {
      const response = await axios.get(`/journals/${responseData._id}`);
      const journalData = response.data.data;
      const dateCounts = {};

      // Process the journal data to calculate counts for each date
      journalData.forEach((entry) => {
        if (entry.length > 0) {
          // Check if the entry array is not empty
          const date = entry[0].createdAt.split("T")[0]; // Use entry[0] to access the first entry's createdAt
          dateCounts[date] = (dateCounts[date] || 0) + 1;
        }
      });

      setJournalsCount(dateCounts);
    } catch (error) {
      console.error("Error fetching journals:", error);
    }
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date.dateString);
  };

  useEffect(() => {
    // Update marked dates whenever journalsCount changes
    const marked = {};
    for (const date in journalsCount) {
      marked[date] = {
        selected: selectedDate === date,
        marked: true,
        dotColor: "yellow",
        selectedColor: "blue",
      };
    }
    setMarkedDates(marked);
  }, [journalsCount, selectedDate]);

  const selectedDateCount = journalsCount[selectedDate] || 0;
  const today = new Date().toISOString().split("T")[0];

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={handleDateSelect}
        markedDates={markedDates}
        style={{ borderRadius: 15 }}
        maxDate={today}
      />

      <View style={styles.entriesContainer}>
        <Text style={styles.selectedDate}>
          Summary of {selectedDate || "Today"}
        </Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.totalJournals}>
            Total Journals: {selectedDateCount}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
  },
  entriesContainer: {
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: "lightgreen",
    borderRadius: 10,
    padding: 12,
  },
  selectedDate: {
    fontWeight: "600",
    fontSize: 18,
    padding: 10,
  },
  totalJournals: {
    fontWeight: "600",
    fontSize: 18,
    padding: 10,
    paddingTop: 0,
  },
});

export default CalendarScreen;
