import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Moods from "../components/MoodsNavigator";
import RoutineBuilder from "../components/SleepTrackerNavigator";
import Therapist from "../components/FindingTherapistNavigator";
import InsightsTab from "../components/InsightsTab";
import MoodsScreen from "../components/MoodsScreensNavigator";
import navigationStack from "../components/Navigation";
import LearningPathsNavigator from "../components/LearningPathsNavigator";
import RescueStack from "../components/RescueSessionsNavigator";
import ReminderNavigator from "../components/ReminderNavigator";
import { Menu } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome5";
import axios from "axios";
import { useEffect } from "react";
const Stack = createNativeStackNavigator();
import useStore from "./zustand/store";
const Card = ({ imageSource, title, cardTitle, cardText, navigation }) => {
  const { responseData } = useStore();
  const [notification, setNotification] = useState([]);
  useEffect(async () => {
    const response = await axios.get(`/notification/${responseData._id}`);
    //console.log("user response", response.data.data);

    // Filter the data
    const filteredData = response.data.data.filter(
      (item) => item.notificationTitle === "Appointment Accepted",
    );
    //console.log("Filtered data", filteredData);
    setNotification(filteredData);
  }, []);
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ marginHorizontal: 5, backgroundColor: "#FFF" }}>
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={
              <TouchableOpacity onPress={openMenu}>
                <Icon
                  name="clipboard-list"
                  size={30}
                  color="black"
                  style={styles.copyIcon}
                />
              </TouchableOpacity>
            }
          >
            {/* {notification.map((notification, index) => ( */}
            <Menu.Item
              //key={index}
              onPress={() => {}}
              title="Appointment Accepted By the Therapist"
              body={notification.notificationBody}
            />
            {/* ))} */}
          </Menu>
        </View>
      ),
    });
  }, [navigation, visible]);
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Image source={imageSource} style={styles.image} />
      </View>
      <View style={styles.rightContainer}>
        {/* <Text style={styles.cardTitle}>{cardTitle}</Text> */}
        <Text style={styles.cardAdditionalText}>{cardText}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate(title)}
        >
          <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Carousel = ({ navigation }) => {
  const cards = [
    {
      imageSource:
        "https://firebasestorage.googleapis.com/v0/b/mind-care-b5645.appspot.com/o/images%2F2.png?alt=media&token=57be424f-357f-4730-8e50-ebdee240a5e8",
      title: "Select Mood",
      additionalText: "Record our daily mood here",
      cardTitle: "Select Mood",
      cardText: "Discover what issues are you facing.",
    },
    {
      imageSource:
        "https://firebasestorage.googleapis.com/v0/b/mind-care-b5645.appspot.com/o/images%2FfindTherapist.png?alt=media&token=984f98c9-ea13-4e98-b230-5c63f70be984",
      title: "View Pyschological Profile",
      additionalText: "Attempt different types of Beck Inventory Tests",
      cardTitle: "Pyschological Profile ",
      cardText: "Attempt Tests",
    },
    {
      imageSource:
        "https://firebasestorage.googleapis.com/v0/b/mind-care-b5645.appspot.com/o/images%2FguidedJournaling.png?alt=media&token=224c20b1-cbc8-462b-b852-d51165d0edd6",
      title: "Guided Journals",
      additionalText: "Explore guided journaling for self-reflection",
      cardTitle: "Guided Journals",
      cardText: "Engage in meaningful self-reflection",
    },
    {
      imageSource:
        "https://firebasestorage.googleapis.com/v0/b/mind-care-b5645.appspot.com/o/images%2FfindTherapist.png?alt=media&token=984f98c9-ea13-4e98-b230-5c63f70be984",
      title: "Find Therapist",
      additionalText: "Find the right therapist for your needs",
      cardTitle: "Find a Therapist",
      cardText: "Discover professionals who can help you",
    },
    {
      imageSource:
        "https://firebasestorage.googleapis.com/v0/b/mind-care-b5645.appspot.com/o/images%2FrescueSessions.png?alt=media&token=475a639b-2dad-4bb7-abda-a62e2829e151",
      title: "Rescue Sessions",
      additionalText: "Quick 3-5 min sessions for difficult emotions",
      cardTitle: "Need help with a rough day?",
      cardText: "Gain relief in 3-5 min",
    },
    {
      imageSource:
        "https://firebasestorage.googleapis.com/v0/b/mind-care-b5645.appspot.com/o/images%2FlearningPaths.png?alt=media&token=e911affc-1e34-4024-9f76-864b5eb914d6",
      title: "Learning Paths",
      additionalText: "Discover structured learning paths for personal growth",
      cardTitle: "Learning Paths",
      cardText: "Embark on a journey of personal growth",
    },
    {
      imageSource:
        "https://firebasestorage.googleapis.com/v0/b/mind-care-b5645.appspot.com/o/images%2FroutineBuilder.png?alt=media&token=5e29c38b-0eec-4d43-859f-c076feea6fa1",
      title: "Routine Builder",
      additionalText: "Create and maintain healthy routines",
      cardTitle: "Build Healthy Routines",
      cardText: "Establish habits for a balanced life",
    },
    {
      imageSource:
        "https://firebasestorage.googleapis.com/v0/b/mind-care-b5645.appspot.com/o/images%2FphysicalHealth.png?alt=media&token=7f9bbd64-eb79-4f4e-953f-fddee5f3e59b",
      title: "Physical Health",
      additionalText: "Improve your physical well-being through exercises",
      cardTitle: "Physical Health",
      cardText: "Enhance your well-being through exercises",
    },
  ];

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollViewContent}
    >
      {cards.map((card, index) => (
        <>
          <Text style={styles.title}>{card.title}</Text>
          <Text style={styles.additionalText}>{card.additionalText}</Text>

          <Card
            key={index}
            imageSource={{ uri: card.imageSource }}
            title={card.title}
            additionalText={card.additionalText}
            cardTitle={card.cardTitle}
            cardText={card.cardText}
            navigation={navigation}
          />
        </>
      ))}
    </ScrollView>
  );
};

const App = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Carousel} options={{}} />
      <Stack.Screen
        name="Select Mood"
        component={Moods}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Guided Journals"
        component={navigationStack}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Find Therapist"
        component={Therapist}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Learning Paths"
        component={LearningPathsNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Rescue Sessions"
        component={RescueStack}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Routine Builder"
        component={ReminderNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Physical Health"
        component={RoutineBuilder}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="View Pyschological Profile"
        component={MoodsScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Insights"
        component={InsightsTab}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  container: {
    flexDirection: "row",
    height: 170,
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "#FBFCf8",
    borderRadius: 15,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 10,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  additionalText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#888",
    marginBottom: 10,
  },
  cardContainer: {
    flex: 1,
    justifyContent: "space-between",
    height: 200,
    backgroundColor: "#fff",
    borderRadius: 8,
  },
  cardTitle: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "bold",
    color: "#2D3748",
  },
  cardAdditionalText: {
    fontSize: 18,
    color: "#2D3748",
    marginBottom: 25,
    marginBottom: 5,
  },
  button: {
    padding: 15,
    fontSize: 14,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 15,
    alignSelf: "flex-start",
  },
  buttonText: {
    color: "#2D3748",
    fontSize: 14,
    fontWeight: "bold",
  },
  cardContainer: {
    flexDirection: "row",
    overflow: "hidden",
  },
  leftContainer: {
    padding: 10,
    aspectRatio: 1,
    backgroundColor: "#FBFCf8",
  },
  rightContainer: {
    flex: 1,
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  image: {
    width: 120,
    backgroundColor: "#fff",
    height: 120,
    resizeMode: "stretch",
    borderRadius: 10,
  },
});

export default App;
