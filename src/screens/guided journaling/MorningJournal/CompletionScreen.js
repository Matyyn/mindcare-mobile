import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
//import color from "../../constants/colors";
import Icon from 'react-native-vector-icons/FontAwesome5';
const CompleteJournalScreen = ({ navigation }) => {
  const [journalText, setJournalText] = useState("");

  const handleComplete = () => {
    const now = new Date();
    const currentTime = `${now.getHours()}:${now.getMinutes()}`;
    // TODO: save the journal entry to a database or file
    navigation.goBack();
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Daily Tasks')}>
          <Icon name="times" size={30} color="black" style={styles.closeIcon} />
        </TouchableOpacity>
      ),
      // headerRight: () => (
      //   <TouchableOpacity onPress={() => navigation.navigate('JournalsTab')}>
      //     <Icon name="clipboard-list" size={30} color="black" style={styles.copyIcon} />
      //   </TouchableOpacity>
      // ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
        <Text style={styles.heading}>Well Done 🎉</Text>
        <Text style={styles.subHeading}>
          You can find your past entries under Journal Logs.
        </Text>
        <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigation.navigate('JournalsTab')
              }}
            >
              <Text style={styles.buttonText}>Complete</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  closeIcon: {
    marginRight: 10,
  },
  heading: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subHeading: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: 600,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#2D3748',
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    width: "90%",
    marginTop:20,
    marginBottom:30
  },
  buttonText: {
    color: "white",
    fontFamily: "Inter_700Bold",
    fontSize: 20,
  },
});

export default CompleteJournalScreen;
