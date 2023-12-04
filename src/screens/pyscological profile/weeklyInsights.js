// import React,{useState} from 'react';
// import Slider from '@react-native-community/slider';
// import {
//   SafeAreaView,
//   Text,
//   View,
//   StyleSheet,
//   Dimensions,
//   ScrollView,
// } from 'react-native';
// //import {LineChart} from 'react-native-chart-kit';
// //import { LineChart, Grid } from 'react-native-svg-charts';

// const MyLineChart = () => {
//     const data = [10, 12, 15, 8, 5, 9, 11];
//     const months = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Friday', 'Sat'];
//     const maxDataValue = Math.max(...data);
//     return (
//       <View style={styles.chartContainer}>
//       <View style={styles.gridContainer}>

//       </View>
//       <View style={styles.barContainer}>
//         {data.map((value, index) => (
//           <View key={index}>
//           <View style={[styles.bar, { height: (value / maxDataValue) * 200 }]}>
//             <Text style={styles.barText}>{value}</Text>
//           </View>
//           <Text style={styles.monthText}>{months[index]}</Text>
//         </View>
//         ))}
//       </View>
//     </View>

//     );
//   };

// const FrequentEmotions=()=>{
//   return (
//       <>
//       <View style={{marginBottom:'10%',flexDirection:'row',marginLeft:'7%',marginRight:'7%',justifyContent: 'space-between'}}>
//       <View style={[styles.tag, styles.tag1]}>
//         <Text style={styles.tagText}>Sad</Text>
//       </View>
//       <View style={[styles.tag, styles.tag2]}>
//         <Text style={styles.tagText}>Optimistic</Text>
//       </View>
//       <View style={[styles.tag, styles.tag3]}>
//         <Text style={styles.tagText}>Relaxed</Text>
//       </View>
//       </View>
//       </>
//   );
// }
// const StressScale = () => {
//   const [sliderValue, setSliderValue] = useState('Low');

//   const handleSliderChange = (value) => {
//     let selectedValue;
//     switch (value) {
//       case 0:
//         selectedValue = 'Low';
//         break;
//       case 33:
//         selectedValue = 'Average';
//         break;
//       case 66:
//         selectedValue = 'High';
//         break;
//       case 100:
//         selectedValue = 'Highest';
//         break;
//     }
//     setSliderValue(selectedValue);
//   };

//   const renderSliderOptions = () => {
//     const options = ['Low', 'Average', 'High', 'Highest'];

//     return options.map((option, index) => (
//       <Text key={index} style={sliderValue === option ? styles.selectedOption : styles.option}>
//         {option}
//       </Text>
//     ));
//   };

//   return (
//     <>
//       <View style={styles.sliderContainer}>
//          <Slider
//           style={styles.slider}
//           minimumValue={0}
//           maximumValue={100}
//           step={33}
//           value={
//             sliderValue === 'Low'
//               ? 0
//               : sliderValue === 'Average'
//               ? 33
//               : sliderValue === 'High'
//               ? 66
//               : 100
//           }
//           onValueChange={handleSliderChange}
//           minimumTrackTintColor="red" // Adjust the color as needed
//            disabled ={true}
//           maximumTrackTintColor="white" // Adjust the color as needed
//           thumbTintColor="black" // Adjust the color as needed
//         />
//       </View>
//       <View style={styles.optionsContainer}>{renderSliderOptions()}</View>
//     </>
//   );
// };

// const App = () => {
//   return (
//     <SafeAreaView style={{flex: 1}}>
//         <View style={styles.container}>
//               <Text style={styles.header}>Mood Graph</Text>
//               <MyLineChart />
//               <Text style={styles.header}>Frequent Emotions</Text>
//               <Text style={styles.paragraph}>Top 3 emotions eperienced in this period</Text>
//               <FrequentEmotions/>
//               <Text style={styles.header}>Stress Scale</Text>
//               <Text style={styles.paragraph}>Stress scale in this period</Text>
//               <StressScale/>
//         </View>
//     </SafeAreaView>
//   );
// };

// export default App;

// const styles = StyleSheet.create({
//   sliderContainer: {
//     marginTop:'6%',
//     backgroundColor: 'orange',
//     textAlign: 'center',
//     paddingTop: 15,
//     paddingBottom: 15,
//     borderRadius:10,
//     marginLeft:'6%',
//     marginRight:'6%'
//   },
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//     textAlign: 'center',
//     padding: 10,
//     height:'100%'
//   },
//   header: {
//     textAlign: 'left',
//     fontSize: 20,
//     fontWeight:'600',
//     paddingLeft: 25,
//     marginTop: 16,
//   },
//   paragraph: {
//     textAlign: 'left',
//     fontSize: 12,
//     paddingLeft: 25,
//   },
//   tag: {
//     padding: 10,
//     paddingHorizontal: 16,
//     borderRadius: 5,
//     marginTop: 5,
//     alignSelf: 'flex-start',
//   },
//   tag1: {
//    backgroundColor: '#FF6347', // Tomato
//   },
//   tag2: {
//     backgroundColor: 'lightgreen', // Deep Sky Blue
//   },
//   tag3: {
//     backgroundColor: '#FFD700', // Yellow

//   },
//   tagText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },      chartContainer: {
//     flex: 1,
//     backgroundColor: 'white',
//     paddingHorizontal: 16,
//     paddingBottom: 16,
//   },
//   gridContainer: {
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingTop: 8,
//     paddingHorizontal: 4,
//   },
//   gridLine: {
//     width: 1,
//     height: '100%',
//     backgroundColor: '#CCCCCC',
//   },
//   barContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'flex-end',
//     marginTop: 8,
//   },
//   bar: {
//     width: 30,
//     backgroundColor: 'orange',
//     borderRadius: 4,
//     alignItems: 'center',
//     justifyContent: 'flex-end',
//     marginBottom: 4,
//   },
//   barText: {
//     color: 'white',
//     fontSize: 12,
//     fontWeight: 'bold',
//     marginBottom: 4,
//   },
//   monthText: {
//     color: 'black',
//     fontSize: 10,
//   },
//   slider: {
//     width: '90%',
//     marginLeft:'5%',
//     marginRight:'5%'
//   },
//   optionsContainer: {
//     flexDirection: 'row',
//     marginHorizontal:20,
//     justifyContent: 'space-between',
//     marginTop: 16,
//   },
//   option: {
//     fontSize: 16,
//     color: '#000',
//     fontWeight:'700',
//     marginLeft:'1%',marginRight:'1%'
//   },
//   selectedOption: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#00BFFF',
//     marginLeft:'1%',marginRight:'1%'
//   },
// });
import axios from "axios";
import React, { useState, useEffect } from "react";
import Slider from "@react-native-community/slider";
import { View, StyleSheet, Text } from "react-native";
import { VictoryBar, VictoryChart, VictoryAxis } from "victory-native";
import useStore from "../zustand/store";
import { trackEvent } from "@aptabase/react-native";

const dailyInsights = () => {
  const { responseData } = useStore();

  const weekdays = [
    { name: "Sun", emoji: "🙂" },
    { name: "Mon", emoji: "" },
    { name: "Tue", emoji: "" },
    { name: "Wed", emoji: "🙂" },
    { name: "Thu", emoji: "" },
    { name: "Fri", emoji: "" },
    { name: "Sat", emoji: "" },
  ];

  const [userData, setData] = useState([]);
  const [stress, setStress] = useState();

  useEffect(async () => {
    trackEvent("Weekly INsigts");
    const response = await axios.get(
      `/psychological-profile/${responseData._id}`
    );
    console.log(response.data.data.profile);
    const rawData = response.data.data.profile;

    const emojiMapping = {
      Happy: "😄",
      Awesome: "🤩",
      Neutral: "😐",
      Sad: "😢",
      Griefed: "😔",
    };
    const moodValueMapping = {
      Awesome: 1,
      Happy: 2,
      Neutral: 3,
      Sad: 4,
      Griefed: 5,
    };

    const stressTimelineMap = {};
    const processedData = [];

    rawData.forEach((item) => {
      const { checkinDate, emotion, stressTimeline } = item;
      const checkinDateObj = new Date(checkinDate);
      const day = checkinDateObj.toLocaleString("en-US", { weekday: "long" });
      const emoji = emojiMapping[emotion];
      const moodValue = moodValueMapping[emotion];

      if (!processedData.some((data) => data.day === day)) {
        processedData.push({
          day: day.split(",")[0],
          emoji,
          moodValue,
          stressTimeline,
        });
      }

      if (stressTimeline in stressTimelineMap) {
        stressTimelineMap[stressTimeline]++;
      } else {
        stressTimelineMap[stressTimeline] = 1;
      }
    });

    let mostFrequentStressTimeline = "";
    let maxFrequency = 0;

    Object.keys(stressTimelineMap).forEach((stressTimeline) => {
      if (stressTimelineMap[stressTimeline] > maxFrequency) {
        mostFrequentStressTimeline = stressTimeline;
        maxFrequency = stressTimelineMap[stressTimeline];
      }
    });

    console.log("Most frequent stressTimeline:", mostFrequentStressTimeline);
    setStress(mostFrequentStressTimeline);
    setData(processedData);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Weekly Mood</Text>
      <View style={styles.circleContainer}>
        {userData.map((selected, index) => (
          <View key={index} style={styles.circle}>
            {selected.emoji ? (
              <Text style={styles.emoji}>{selected.emoji}</Text>
            ) : (
              <View style={styles.emptyCircle} />
            )}
            <Text style={styles.weekday}>{selected.day}</Text>
          </View>
        ))}
      </View>
      <Text style={styles.chartHeading}>Weekly Mood Graph</Text>
      <VictoryChart domainPadding={{ x: 25 }}>
        <VictoryAxis
          tickValues={userData.map((item) => item.day)}
          style={styles.axis}
        />
        <VictoryAxis dependentAxis style={styles.axis} />
        <VictoryBar data={userData} x="day" y="moodValue" style={styles.bar} />
      </VictoryChart>
      <Text style={styles.chartHeading}>Frequent Stress Level</Text>
      <View style={styles.stressTag}>
        <Text style={styles.stressTagText}>Stress: {stress}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    padding: 20,
    paddingTop: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  sliderContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  circleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    alignItems: "center",
    marginHorizontal: 8,
  },
  emptyCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 5,
  },
  emoji: {
    fontSize: 40,
    marginBottom: 5,
  },
  weekday: {
    fontSize: 14,
    fontWeight: "bold",
  },
  stressTag: {
    backgroundColor: "#007acc",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    alignSelf: "flex-start",
    marginVertical: 10,
  },
  stressTagText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 22,
  },
  chartHeading: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },
  axis: {
    tickLabels: {
      fontSize: 12,
      fontWeight: "bold",
    },
  },
  bar: {
    data: { fill: "#007acc" },
  },
});

export default dailyInsights;
