// import React, { useState, useEffect } from "react";
// import {
//   View,
//   FlatList,
//   Text,
//   ToastAndroid,
//   StyleSheet,
//   TouchableOpacity,
// } from "react-native";
// import useStore from "../zustand/store";
// import axios from "axios";
// import Icon from "react-native-vector-icons/Entypo";

// function YourComponent() {
//   const { responseData, setJournalsCount } = useStore();
//   const [journalsData, setJournalsData] = useState([]);

//   useEffect(() => {    
//     getJournals();
//   }, []);
//   async function getJournals() {
//     try {
//       const response = await axios.get(`/journals/${responseData._id}`);
//       setJournalsData(response.data.data);
//       //console.log('res', response.data.data);
//       const objects = [];
//       const countsByDate = {};
//       headings.forEach((item, index) => {
//         const journalsForType = response.data.data[index]?.value;
//         if (journalsForType) {
//           journalsForType.forEach((valueItem) => {
//             if (
//               valueItem.questions.length > 0 ||
//               valueItem.answers.length > 0
//             ) {
//               const date = formatDate(valueItem.createdAt);
//               countsByDate[date] = (countsByDate[date] || 0) + 1;
//             }
//           });
//         }
//       });
//       const countsByDateArray = [];
//       let counter = 1;
//       for (const date in countsByDate) {
//         if (countsByDate.hasOwnProperty(date)) {
//           countsByDateArray.push({
//             id: counter++,
//             date: date,
//             count: countsByDate[date],
//           });
//         }
//       }
//       //console.log('cs',countsByDateArray);        
//       setJournalsCount(countsByDateArray);        
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   }

//   const headings = [
//     "Gratitude Journals",
//     "Problem Solving Journals",
//     "Goal Setting Journals",
//     "Self Affirmation Journals",
//     "Open Journals",
//     "Challenging Negative Thoughts About Yourself Journals",
//     "Building a Self Care Plans",
//     "Anxiety Thought Record Journals",
//     "Reflection Journals",
//     "Calming the Minds",
//     "Dream Journals",
//     "Finding Peaceful Spaces",
//     "Looking Forward to Tomorrows",
//     "Planning the Day Aheads",
//   ];

//   function formatDate(iso) {
//     const date = iso.split("T")[0];
//     return date;
//   }
//   async function handleDelete(item, valueItem) {
//     try {
//       let endpoint = "";
//       switch (item) {
//         case "Gratitude Journals":
//           endpoint = "/gratitude-journal";
//           break;
//         case "Problem Solving Journals":
//           endpoint = "/problem-solving-journal";
//           break;
//         case "Goal Setting Journals":
//           endpoint = "/goal-setting-journal";
//           break;
//         case "Self Affirmation Journals":
//           endpoint = "/self-affirmation-journal";
//           break;
//         case "Open Journals":
//           endpoint = "/open-journal";
//           break;
//         case "Challenging Negative Thoughts About Yourself Journals":
//           endpoint = "/negative-thoughts-journal";
//           break;
//         case "Building a Self Care Plans":
//           endpoint = "/selfcare-journal";
//           break;
//         case "Anxiety Thought Record Journals":
//           endpoint = "/anxiety-journal";
//           break;
//         case "Reflection Journals":
//           endpoint = "/reflection-journal";
//           break;
//         case "Calming the Minds":
//           endpoint = "/calming-the-mind";
//           break;
//         case "Dream Journals":
//           endpoint = "/dream-journal";
//           break;
//         case "Finding Peaceful Spaces":
//           endpoint = "/finding-peaceful-space";
//           break;
//         case "Looking Forward to Tomorrows":
//           endpoint = "/looking-forward-to-tomorrow";
//           break;
//         case "Planning the Day Aheads":
//           endpoint = "/planning-the-day-ahead";
//           break;
//         default:
//           console.log("Unknown journal type:", item);
//           break;
//       }

//       if (endpoint) {
//         await axios.delete(`${endpoint}/${valueItem._id}`);
//         const updatedData = [...journalsData];
//         const dataIndex = headings.indexOf(item);
//         if (dataIndex !== -1) {
//           updatedData[dataIndex].value = updatedData[dataIndex].value.filter(
//             (item) => item._id !== valueItem._id
//           );
//           setJournalsData(updatedData);
//         }
//         ToastAndroid.show(`One ${item} Deleted`, ToastAndroid.LONG);
//         await getJournals();
//       }
//     } catch (error) {
//       console.error("Error deleting journal:", error);
//     }
//   }
//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={headings}
//         keyExtractor={(item, index) => index.toString()}
//         renderItem={({ item, index }) => (
//           <>
//             <View style={styles.headingContainer}>
//               <Text style={styles.heading}>
//                 {item} ({journalsData[index]?.value.length})
//               </Text>
//             </View>
//             {journalsData[index]?.value.length > 0 ? (
//               journalsData[index].value.map((valueItem, valueIndex) => (
//                 <View key={valueIndex} style={[styles.card]}>
//                   <View style={styles.dataContainer}>
//                     <Text style={styles.detail}>
//                       {valueItem.questions.join(", ")}
//                     </Text>
//                     <Text style={styles.detail}>
//                       {valueItem.answers.join(", ")}
//                     </Text>
//                   </View>
//                   <View style={styles.footer}>
//                     <TouchableOpacity
//                       onPress={() => handleDelete(item, valueItem)}
//                     >
//                       <Icon
//                         name="trash"
//                         size={25}
//                         style={styles.deleteButton}
//                       />
//                     </TouchableOpacity>
//                     <Text style={styles.date}>
//                       {formatDate(valueItem.createdAt)}
//                     </Text>
//                   </View>
//                 </View>
//               ))
//             ) : (
//               <View style={[styles.card, styles.noJournalCard]}>
//                 <Text style={styles.noJournal}>No journal present</Text>
//               </View>
//             )}
//           </>
//         )}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//   },
//   headingContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginLeft: 14,
//     marginBottom: 8,
//   },
//   heading: {
//     fontWeight: "900",
//     fontSize: 20,
//   },
//   card: {
//     backgroundColor: "white",
//     borderRadius: 8,
//     padding: 16,
//     marginBottom: 16,
//     elevation: 3,
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },
//   dataContainer: {
//     flex: 1,
//   },
//   detail: {
//     fontSize: 18,
//     marginTop: 10,
//     fontWeight: "600",
//   },
//   noJournalCard: {
//     justifyContent: "center",
//     alignItems: "center",
import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  Text,
  ToastAndroid,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import useStore from "../zustand/store";
import axios from "axios";
import Icon from "react-native-vector-icons/Entypo";

function YourComponent() {
  const { responseData } = useStore();
  const [journalsData, setJournalsData] = useState([]);

  useEffect(() => {
    getJournals();
  }, []);

  async function getJournals() {
    try {
      const response = await axios.get(`/journals/${responseData._id}`);
      setJournalsData(response.data.data);
      
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  async function handleDelete(item, valueItem) {
    try {
      let endpoint = "";
      switch (item) {
        case "Gratitude Journals":
          endpoint = "/gratitude-journal";
          break;
        case "Problem Solving Journals":
          endpoint = "/problem-solving-journal";
          break;
        case "Goal Setting Journals":
          endpoint = "/goal-setting-journal";
          break;
        case "Self Affirmation Journals":
          endpoint = "/self-affirmation-journal";
          break;
        case "Open Journals":
          endpoint = "/open-journal";
          break;
        case "Challenging Negative Thoughts About Yourself Journals":
          endpoint = "/negative-thoughts-journal";
          break;
        case "Building a Self Care Plans":
          endpoint = "/selfcare-journal";
          break;
        case "Anxiety Thought Record Journals":
          endpoint = "/anxiety-journal";
          break;
        case "Reflection Journals":
          endpoint = "/reflection-journal";
          break;
        case "Calming the Minds":
          endpoint = "/calming-the-mind";
          break;
        case "Dream Journals":
          endpoint = "/dream-journal";
          break;
        case "Finding Peaceful Spaces":
          endpoint = "/finding-peaceful-space";
          break;
        case "Looking Forward to Tomorrows":
          endpoint = "/looking-forward-to-tomorrow";
          break;
        case "Planning the Day Aheads":
          endpoint = "/planning-the-day-ahead";
          break;
        default:
          console.log("Unknown journal type:", item);
          break;
      }

      if (endpoint) {
        await axios.delete(`${endpoint}/${valueItem._id}`);
        const updatedData = [...journalsData];
        // Remove the references to headings
        setJournalsData(updatedData);
        ToastAndroid.show(`One ${item} Deleted`, ToastAndroid.LONG);
        await getJournals();
      }   
     } catch (error) {
      console.error("Error deleting journal:", error);
    }
  }
  function formatDate(iso) {
    const date = iso.split("T")[0];
    return date;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={journalsData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View>
            <View style={styles.headingContainer}>
              <Text style={styles.heading}>
                {getJournalType(index)} ({item.length})
              </Text>
            </View>
            {item.length > 0 ? (
              item.map((valueItem, valueIndex) => (
                <View key={valueIndex} style={[styles.card]}>
                  <View style={styles.dataContainer}>
                    <Text style={styles.detail}>
                      {valueItem.questions.join(", ")}
                    </Text>
                    <Text style={styles.detail}>
                      {valueItem.answers.join(", ")}
                    </Text>
                  </View>
                  <View style={styles.footer}>
                    <TouchableOpacity
                      onPress={() => handleDelete(getJournalType(index), valueItem)}
                    >
                      <Icon name="trash" size={25} style={styles.deleteButton} />
                    </TouchableOpacity>
                    <Text style={styles.date}>
                      {formatDate(valueItem.createdAt)}
                    </Text>
                  </View>
                </View>
              ))
            ) : (
              <View style={[styles.card, styles.noJournalCard]}>
                <Text style={styles.noJournal}>No journal present</Text>
              </View>
            )}
          </View>
        )}
      />
    </View>
  );
}

function getJournalType(index) {
  const journalTypes = [
    "Gratitude Journals",
    "Problem Solving Journals",
    "Goal Setting Journals",
    "Self Affirmation Journals",
    "Open Journals",
    "Challenging Negative Thoughts About Yourself Journals",
    "Building a Self Care Plans",
    "Anxiety Thought Record Journals",
    "Reflection Journals",
    "Calming the Minds",
    "Dream Journals",
    "Finding Peaceful Spaces",
    "Looking Forward to Tomorrows",
    "Planning the Day Aheads",
  ];

  return journalTypes[index];
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  headingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 14,
    marginBottom: 8,
  },
  heading: {
    fontWeight: "900",
    fontSize: 20,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dataContainer: {
    flex: 1,
  },
  detail: {
    fontSize: 18,
    marginTop: 10,
    fontWeight: "600",
  },
  noJournalCard: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  noJournal: {
    fontSize: 18,
    fontStyle: "italic",
  },
  footer: {
    flexDirection: "column",
    alignItems: "flex-end",
    marginTop: 10,
  },
  date: {
    fontSize: 16,
    marginTop: 30,
  },
  deleteButton: {
    fontSize: 30,
    marginRight: 15,
    color: "red",
    fontWeight: "bold",
  },
});

export default YourComponent;
