import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import color from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import useStore from "../zustand/store";
import axios from "axios";

const DailyTasks = ({ navigation }) => {
  const { isDPEValue, isFSGValue, isUPUWValue, responseData } = useStore();
  const [DPE, setDPE] = useState();
  const [FSG, setFSG] = useState();
  const [UPUW, setUPUW] = useState();
  const [journal, setJournal] = useState(false);

  useEffect(() => {
    async function getData() {
      const Breathing = await axios.get(
        `breathing-excercise/${responseData._id}`,
      );
      const newData = Breathing.data.data;
      //console.log(newData);
      if (
        newData.createdAt.split("T")[0] ===
        new Date().toISOString().split("T")[0]
      ) {
        setDPE(newData);
      }
    }
    async function getFiveSenses() {
      const FiveSenses = await axios.get(
        `five-senses-excercise/${responseData._id}`,
      );
      const newData = FiveSenses.data.data;
      if (
        newData.createdAt.split("T")[0] ===
        new Date().toISOString().split("T")[0]
      ) {
        setFSG(newData);
      }
    }
    async function getUPUW() {
      const Unplug = await axios.get(
        `unplug-unwind-excercise/${responseData._id}`,
      );
      const newData = Unplug.data.data;
      if (
        newData.createdAt.split("T")[0] ===
        new Date().toISOString().split("T")[0]
      ) {
        setUPUW(newData);
      }
    }
    async function getJournal() {
      const open = await axios.get(`open-journal/${responseData._id}`);
      const openJournal = open.data.data;
      const currentDate = new Date().toISOString().split("T")[0];
      let foundMatch = false;

      for (let i = 0; i < openJournal.length; i++) {
        if (openJournal[i].createdAt.split("T")[0] === currentDate) {
          foundMatch = true;
          break;
        }
      }
      //console.log(foundMatch);
      if (foundMatch) {
        setJournal(true);
      }
    }
    //console.log(journal);
    getJournal();
    getData();
    getFiveSenses();
    getUPUW();
  }, []);
  const TaskCard = ({ title, content }) => {
    return (
      <View style={styles.taskCard}>
        <View></View>
        <View>
          <Text style={styles.subHeading}>{title}</Text>
          <Text style={styles.content}>{content}</Text>
        </View>
      </View>
    );
  };
  const isDPECompleted = DPE && DPE.completed === true;
  const isFSGCompleted = FSG && FSG.completed === true;
  const isUPUWCompleted = UPUW && UPUW.completed === true;
  return (
    <ScrollView>
      <View style={styles.setReminderContainer}>
        <View style={{ width: "52%", marginTop: 30 }}>
          <Text style={{ marginLeft: 25, fontSize: 15, color: color.darkGrey }}>
            Make your afternoon focused, productive and stress-free with these
            activities only
          </Text>
          <View style={styles.buttonParent}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigation.navigate("Set Reminder");
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Text>
                  <Ionicons
                    name="notifications-sharp"
                    size={20}
                    color="white"
                  />
                </Text>
                <Text
                  style={{
                    color: "white",
                    fontFamily: "Inter_700Bold",
                    fontSize: 15,
                    marginLeft: 5,
                  }}
                >
                  Set Reminder
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <Image
          source={{
            uri: "https://firebasestorage.googleapis.com/v0/b/mindcare-691a2.appspot.com/o/set-reminder-images%2FClimbing-amico.png?alt=media&token=b0b74ac2-9399-47d7-91bd-8bdba27ad9fc",
          }}
          style={styles.image}
        />
      </View>
      <View>
        <Text style={styles.heading}>Morning</Text>

        <TouchableOpacity
          onPress={() => {
            if (!isDPECompleted) {
              navigation.navigate("Breathing Exercises Tips");
            }
          }}
          disabled={isDPECompleted}
          style={[
            styles.taskCard,
            isDPECompleted
              ? { backgroundColor: "lightgreen" }
              : { backgroundColor: color.lightGrey },
          ]}
        >
          <View>
            <Text style={styles.subHeading}>
              Deep Breathing Exercise
              {isDPECompleted && " - Completed"}
            </Text>
            <Text style={styles.content}>
              Feel more composed and collected to kickstart your day
            </Text>
          </View>
        </TouchableOpacity>

        {journal ? (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Morning Journals");
            }}
            disabled={true}
            style={[styles.taskCard, { backgroundColor: "lightgreen" }]}
          >
            <View>
              <Text style={styles.subHeading}>Morning Journal - Completed</Text>
              <Text style={styles.content}>
                Set your intentions and achieve your goal of the day
              </Text>
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Morning Journals");
            }}
          >
            <TaskCard
              title="Morning Journal"
              content="Set your intentions and achieve your goal of the day"
            />
          </TouchableOpacity>
        )}
      </View>
      <View>
        <Text style={styles.heading}>Afternoon</Text>
        {journal ? (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Morning Journals");
            }}
            disabled={true}
            style={[styles.taskCard, { backgroundColor: "lightgreen" }]}
          >
            <View>
              <Text style={styles.subHeading}>
                Plan breaks to reduce distractions - Completed
              </Text>
              <Text style={styles.content}>
                Stay focused on your taks by taking intentional breaks
              </Text>
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Morning Journals");
            }}
          >
            <TaskCard
              title="Plan breaks to reduce distractions"
              content="Stay focused on your taks by taking intentional breaks"
            />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={() => {
            if (!isFSGCompleted) {
              navigation.navigate("five senses grounding technique tip1");
            }
          }}
          disabled={isFSGCompleted}
          style={[
            styles.taskCard,
            isFSGCompleted
              ? { backgroundColor: "lightgreen" }
              : { backgroundColor: color.lightGrey },
          ]}
        >
          <View>
            <Text style={styles.subHeading}>
              Five Senses Grounding Technique
              {isFSGCompleted && " - Completed"}
            </Text>
            <Text style={styles.content}>
              Activate your five sense and re-center yourself in the present
              moment
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.heading}>Evening</Text>
        <TouchableOpacity
          onPress={() => {
            if (!isUPUWCompleted) {
              navigation.navigate("UnwindLast");
            }
          }}
          disabled={isUPUWCompleted}
          style={[
            styles.taskCard,
            isUPUWCompleted
              ? { backgroundColor: "lightgreen" }
              : { backgroundColor: color.lightGrey },
          ]}
        >
          <View>
            <Text style={styles.subHeading}>
              Unplug and Unwind
              {isUPUWCompleted && " - Completed"}
            </Text>
            <Text style={styles.content}>
              A 1-minute meditation will help you unplug and let go
            </Text>
          </View>
        </TouchableOpacity>
        {journal ? (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Morning Journals");
            }}
            disabled={true}
            style={[styles.taskCard, { backgroundColor: "lightgreen" }]}
          >
            <View>
              <Text style={styles.subHeading}>Journal - Completed</Text>
              <Text style={styles.content}>
                Our dreams can help us process our lives and be arich source of
                inspiration
              </Text>
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Morning Journals");
            }}
          >
            <TaskCard
              title="Journal"
              content="Our dreams can help us process our lives and be arich source of inspiration"
            />
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  setReminderContainer: {
    flexDirection: "row",
  },
  taskCard: {
    flexDirection: "row",
    backgroundColor: color.lightGrey,
    padding: 16,
    marginHorizontal: 15,
    borderRadius: 10,
    marginBottom: 5,
  },
  heading: {
    fontFamily: "Inter_700Bold",
    fontSize: 15,
    marginLeft: 15,
    marginBottom: 7,
  },
  subHeading: {
    fontFamily: "Inter_700Bold",
  },

  image: {
    width: 170,
    height: 170,
  },
  buttonParent: {
    marginTop: 15,
    alignItems: "center",
  },
  button: {
    backgroundColor: color.grey,
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    width: 150,
  },
});

export default DailyTasks;
