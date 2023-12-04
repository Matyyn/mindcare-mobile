import React from "react";
import { useState, useEffect } from "react";
import {
  Text,
  ScrollView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import GuidedJournalCard from "../../components/GuidedJournalCard";
import journalingData from "../../data/guidedJournalingData";
import RecommendedScreen from "./RecommendedJournals";
import Icon from "react-native-vector-icons/FontAwesome5";
import { trackEvent } from "@aptabase/react-native";

const GuidedJournalingMain = ({ navigation }) => {
  useEffect(() => {
    trackEvent("Guided Journaling");
  }, []);
  const [numColumns, setNumColumns] = useState(2);
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate("JournalsTab")}>
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
        <Text style={{ fontSize: 18, margin: 10 }}>Journals</Text>
        <FlatList
          data={journalingData}
          key={numColumns}
          numColumns={numColumns}
          renderItem={({ item }) => (
            <GuidedJournalCard title={item.title} image={item.imgUrl} />
          )}
          keyExtractor={(item) => item.id}
        />
      </>
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default GuidedJournalingMain;
