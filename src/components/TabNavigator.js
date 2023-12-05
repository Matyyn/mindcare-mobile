import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MainScreen from "../screens/MainScreen";
import Forums from "../screens/forums";
import Therapy from "../components/SessionsTabNavigator";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import InsightsProfile from "./ProfileStack";
import Navigation from "../components/CommunityForumStack";
import DailyTasks from "./DailyTaskStack";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const [selectedTab, setSelectedTab] = useState("Home");

  const getTabImage = (routeName) => {
    switch (routeName) {
      case "Home":
        return require("../../assets/icons/house.png");
      case "Forum":
        return require("../../assets/icons/community.png");
      case "Therapy":
        return require("../../assets/icons/online-meeting.png");
      case "Task":
        return require("../../assets/icons/clipboard.png");
      case "Insight Profile":
        return require("../../assets/icons/programmer.png");
      default:
        return null;
    }
  };

  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        showLabel: false,
      }}
      screenOptions={({ route }) => ({
        tabBarButton: ({ onPress }) => {
          const isHomeTab = route.name === "Home";
          const iconSize =
            selectedTab === route.name ? 36 : isHomeTab ? 24 : 24;

          let iconType;
          let iconName;

          switch (route.name) {
            case "Home":
              iconType = MaterialCommunityIcons;
              iconName = "home-variant";
              break;
            case "Forum":
              iconType = FontAwesome;
              iconName = "wechat";
              break;
            case "Therapy":
              iconType = Ionicons;
              iconName = "videocam";
              break;
            case "Task":
              iconType = MaterialCommunityIcons;
              iconName = "clipboard-list-outline";
              break;
            case "Insight Profile":
              iconType = FontAwesome5;
              iconName = "user-alt";
              break;
            default:
              iconType = MaterialCommunityIcons;
              iconName = "home-variant";
          }

          return (
            <TouchableOpacity
              onPress={() => {
                setSelectedTab(route.name);
                onPress();
              }}
              style={[
                styles.tabBarButton,
                selectedTab === route.name && styles.selectedTabBarButton,
              ]}
            >
              {isHomeTab ? (
                <View style={styles.homeButton}>
                  <Image
                    source={getTabImage(route.name)}
                    style={styles.tabImage}
                  />
                </View>
              ) : (
                <Image
                  source={getTabImage(route.name)}
                  style={styles.tabImage}
                />
              )}
            </TouchableOpacity>
          );
        },
      })}
    >
      <Tab.Screen
        name="Forum"
        component={Navigation}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen name="Therapy" component={Therapy} />
      <Tab.Screen
        name="Home"
        component={MainScreen}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Task"
        component={DailyTasks}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen name="Insight Profile" component={InsightsProfile} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  selectedTabBarButton: {
    borderBottomWidth: 4,
    borderColor: "grey",
  },
  homeButton: {
    backgroundColor: "grey",
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: -30,
  },
  tabImage: {
    width: 40,
    height: 40,
  },
});

export default TabNavigator;
