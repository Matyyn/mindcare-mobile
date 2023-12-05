import React from "react";
import { useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Text,
} from "react-native";
import RescueSessionCard from "../../components/RescueSessionsCard";
import RecommendedScreen from "./recommendedSession";
import rescueData from "../../data/rescueSessionData";
import Icon from "react-native-vector-icons/FontAwesome5";
const GuidedJournalingMain = ({ navigation }) => {
  const [numColumns, setNumColumns] = useState(2);
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate("RescueSessionsTab")}
        >
          <Icon
            name="clipboard-list"
            size={30}
            color="black"
            style={styles.copyIcon}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);
  return (
    <ScrollView style={{ margin: 10 }}>
      <>
        <RecommendedScreen />
        <Text style={{ fontSize: 18, margin: 10 }}>Rescue Sessions</Text>
        <FlatList
          data={rescueData}
          key={numColumns}
          numColumns={numColumns}
          renderItem={({ item }) => (
            <RescueSessionCard title={item.title} image={item.imgUrl} />
          )}
          keyExtractor={(item) => item.id}
        />
      </>
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default GuidedJournalingMain;
