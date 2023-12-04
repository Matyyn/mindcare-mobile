import React, { useEffect, useState } from "react";
import useStore from "../zustand/store";
import { useNavigation } from "@react-navigation/native";
import { trackEvent } from "@aptabase/react-native";

import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  View,
} from "react-native";

const TextInputExample = () => {
  const navigation = useNavigation();
  const { items, setSelectedItem } = useStore();
  const [text, onChangeText] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedId, setSelectedId] = useState();

  useEffect(() => {
    trackEvent("Top Doctors");
  }, []);

  useEffect(() => {
    const filtered = items.filter((item) => {
      const fullName = `${item.firstName} ${item.lastName}`.toLowerCase();
      return fullName.includes(text.toLowerCase());
    });
    setFilteredItems(filtered);
  }, [text, items]);

  const Item = ({ item, onPress }) => (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Image source={{ uri: item.picture }} style={styles.cardImage} />
      <Text style={styles.cardTitle}>
        {item.firstName} {item.lastName}
      </Text>
      <Text style={styles.cardSubtitle}>{item.specialization}</Text>
      <Text style={styles.cardText}>Experience: {item.experience} Years</Text>
      <Text style={styles.cardText}>
        Charges Session: $ {item.sessionCharges / 100}
      </Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";
    const color = item.id === selectedId ? "white" : "black";
    return (
      <Item
        item={item}
        onPress={() => {
          navigation.navigate("Doctor Details");
          setSelectedId(item.id);
          setSelectedItem(item);
        }}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search Therapist"
        onChangeText={onChangeText}
        value={text}
      />
      {/* <Text style={styles.heading}>Top Therapists</Text> */}
      <FlatList
        data={filteredItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
        style={styles.flatList}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
  input: {
    height: 40,
    marginVertical: 12,
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
  },
  heading: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 24,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    elevation: 3,
    marginBottom: 20,
    padding: 16,
  },
  cardImage: {
    width: 130,
    height: 130,
    alignSelf: "center",
    borderRadius: 20,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  cardSubtitle: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 10,
  },
  cardText: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 10,
  },
  cardRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  flatList: {
    marginLeft: "4%",
  },
});

export default TextInputExample;
