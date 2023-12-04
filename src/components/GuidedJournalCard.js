import React from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Avatar, Button, Card } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const GuidedJournalCard = ({ key, image, title }) => {
  const navigation = useNavigation();

  return (
    <View key={key} style={styles.cardContainer}>
      <TouchableOpacity
        onPress={() => {
          {            
              navigation.navigate("guided journaling tips", {
                journalTitle: title,
              });            
          }

        }}
      >
        <Card>
          <Card.Cover source={image} />
        </Card>
      </TouchableOpacity>

      <Text style={{ margin: 5, fontWeight: 500 }}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    margin: 5,
    height: 200,
    marginBottom: 35,
  },
});

export default GuidedJournalCard;
