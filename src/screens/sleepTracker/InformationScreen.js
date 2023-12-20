import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import Svg, { Circle, Text as SvgText } from "react-native-svg";
import { VictoryBar, VictoryChart, VictoryAxis } from "victory-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import useStore from "../zustand/store";
import axios from "axios";

const CircularProgress = ({ radius, strokeWidth, progress, heading }) => {
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <View style={styles.circularProgressContainer}>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>{heading}</Text>
      </View>
      <Svg width={radius * 2} height={radius * 2}>
        <Circle
          cx={radius}
          cy={radius}
          r={radius - strokeWidth / 2}
          stroke="#E0E0E0"
          strokeWidth={strokeWidth}
        />
        <Circle
          cx={radius}
          cy={radius}
          r={radius - strokeWidth / 2}  
          stroke="#FFC727"
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
        />
        <SvgText
          x={radius}
          y={radius}
          fontSize={20}
          fontWeight="bold"
          textAnchor="middle"
          alignmentBaseline="central"
        >
          {`${progress}%`}
        </SvgText>
      </Svg>
    </View>
  );
};

const App = () => {
  const [currentProgress1, setCurrentProgress1] = useState(0);
  const [currentProgress2, setCurrentProgress2] = useState(0);
  const [quality, setQuality] = useState(0);
  const [sleepTime, setSleepTime] = useState(0);
  const [efficiency, setEfficiency] = useState(0);
  const { responseData } = useStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const progress1 = await axios.get(`/sleep-quality/${responseData._id}`);
        //console.log('sleep',progress1.data)
        const progress2 = await axios.get(
          `/sleep-efficiency/${responseData._id}`,
        );
        // const stats = await axios.get(`/sleep-stats/${responseData._id}`)
        // console.log(progress1.data.data);
        // console.log(progress2.data.data);
        //console.log(stats.sleepSchedule.totalSleepTime)
        //const daysOfWeek = getDayOfWeek(stats.sleepSchedule.logDate)
        //console.log(daysOfWeek)
        // setSleepTime(stats.sleepSchedule.totalSleepTime)
        setQuality(progress1.data.data);
        setEfficiency(progress2.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [responseData]);

  useEffect(() => {
    const animationInterval1 = setInterval(() => {
      if (currentProgress1 < quality) {
        setCurrentProgress1(currentProgress1 + 1);
      } else {
        clearInterval(animationInterval1);
      }
    }, 20);

    const animationInterval2 = setInterval(() => {
      if (currentProgress2 < efficiency) {
        setCurrentProgress2(currentProgress2 + 1);
      } else {
        clearInterval(animationInterval2);
      }
    }, 20);

    return () => {
      clearInterval(animationInterval1);
      clearInterval(animationInterval2);
    };
  }, [currentProgress1, currentProgress2, quality, efficiency]);

  const barChartData = [
    { day: "Mon", hours: 7 },
    { day: "Tue", hours: 6 },
    { day: "Wed", hours: 8 },
    { day: "Thu", hours: 7.5 },
    { day: "Fri", hours: 6.5 },
    { day: "Sat", hours: 6 },
    { day: "Sun", hours: 5 },
  ];

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <View style={styles.row}>
          <CircularProgress
            radius={80}
            strokeWidth={10}
            progress={currentProgress1}
            heading={`Sleep Quality: ${efficiency.toFixed(0)}%`}
          />
          <CircularProgress
            radius={80}
            strokeWidth={10}
            progress={currentProgress2}
            heading={`Sleep Efficiency: ${efficiency.toFixed(0)}%`}
          />
        </View>
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>Sleep Duration</Text>
        </View>
        <VictoryChart domainPadding={{ x: 25 }}>
          <VictoryAxis
            tickValues={barChartData.map((item) => item.day)}
            style={{
              tickLabels: {
                fontSize: 12,
                fontWeight: "bold",
              },
            }}
          />
          <VictoryAxis
            dependentAxis
            style={{
              tickLabels: {
                fontSize: 12,
                fontWeight: "bold",
              },
            }}
          />
          <VictoryBar
            data={barChartData}
            x="day"
            y="hours"
            style={{ data: { fill: "#FFC727" } }}
          />
        </VictoryChart>
        <View style={styles.paragaphContainer}>
          <Text style={styles.heading}>Recommendations</Text>
        </View>
        <View style={styles.paragaphContainer}>
          <Text style={styles.paragraph}>
            A sleep efficiency of {efficiency.toFixed()}% indicates that out of the total time spent
            in bed, only {efficiency.toFixed()}% of that time was actually spent asleep.
          </Text>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 30,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    gap: 25,
    paddingHorizontal: 10,
  },
  circularProgressContainer: {
    alignItems: "center",
  },
  headingContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  heading: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  paragaphContainer: {
    alignItems: "flex-start",
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 18,
    fontWeight: "500",
    color: "black",
    textAlign: "justify",
    marginLeft: 35,
    marginRight: 35,
  },
});

export default App;
