import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import color from "../../constants/colors";
import Icon from "react-native-vector-icons/FontAwesome5";
const GuidedJournalingTips = ({ navigation, route }) => {
  const { journalTitle } = route.params;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: journalTitle,
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
  }, [navigation, journalTitle]);
  const [tip1, setTip1] = useState(
    "Reflect on the good things in your life that you are grateful for",
  );

  return (
    <SafeAreaView>
      <View>
        <View style={styles.container}>
          <Text style={styles.text}>{tip1}</Text>
        </View>

        <View style={styles.buttonParent}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate("writeJournal", { journalTitle });
            }}
          >
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 250,
    marginHorizontal: 25,
  },
  text: {
    color: color.grey,
    fontSize: 22,
    fontWeight: 500,
    textAlign: "center",
  },
  buttonParent: {
    marginTop: 200,
    alignItems: "center",
  },
  button: {
    backgroundColor: color.grey,
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    width: "90%",
  },
  buttonText: {
    color: "white",
    fontFamily: "Inter_700Bold",
    fontSize: 20,
  },
});

export default GuidedJournalingTips;
