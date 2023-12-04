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

function YourComponent({navigation}) {
  const { responseData } = useStore();
  const [journalsData, setJournalsData] = useState([]);
  React.useLayoutEffect(() => {
    navigation.setOptions({  
       title:'Rescue Sessions List'    
    });
  }, [navigation]);
  useEffect(() => {
    getJournals();
  }, []);

  async function getJournals() {
    try {
      const response = await axios.get(`/rescue-sessions/${responseData._id}`);
      setJournalsData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
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
        keyExtractor={(item) => item.type}
        renderItem={({ item }) => (
          <View>
            <View style={styles.headingContainer}>
              <Text style={styles.heading}>
                {item.type} ({item.data.length})
              </Text>
            </View>
            {item.data.length > 0 ? (
              item.data.map((valueItem, valueIndex) => (
                <View key={valueIndex} style={[styles.card]}>
                  <View style={styles.dataContainer}>
                    <Text style={styles.detail}>
                      Qs: {valueItem.questions.join(", ")}
                    </Text>
                    <Text style={styles.detail}>
                      Ans: {valueItem.results.join(", ")}
                    </Text>
                  </View>
                  <View style={styles.footer}>                    
                    <Text style={styles.date}>
                      {formatDate(valueItem.checkInDate)}
                    </Text>
                  </View>
                </View>
              ))
            ) : (
              <View style={[styles.card, styles.noJournalCard]}>
                <Text style={styles.noJournal}>No Rescue Session present</Text>
              </View>
            )}
          </View>
        )}
      />
    </View>
  );
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
    fontWeight: "500",
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
    marginTop: 50,
  },
  date: {
    fontSize: 18,
    fontWeight:'600',
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
