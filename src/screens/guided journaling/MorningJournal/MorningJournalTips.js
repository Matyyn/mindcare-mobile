import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
//import color from "../../constants/colors";
import Icon from 'react-native-vector-icons/FontAwesome5';
const GuidedJournalingTips = ({ navigation, route }) => {
  useEffect(() => {
    // const { journalName } = route.params;
    //send journal name in the api call and get the response back
  }, []);
  

  React.useLayoutEffect(() => {
    navigation.setOptions({      
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('JournalsTab')}>
          <Icon name="clipboard-list" size={30} color="black" style={styles.copyIcon} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);
  const [tip1, setTip1] = useState(
    "Reflect on the good things in your life that you are grateful for"
  );
  const [tip2, setTip2] = useState(
    "Gratitude is a powerful catalyst for happiness. It's the spark that lights a fire of joy in your soul"
  );
  const [tip3, setTip3] = useState(
    "Gratitude makes sense of our past, brings peace for today, and creates a vision for tomorrow"
  );
  const [tip4, setTip4] = useState("bye");

  return (
    <SafeAreaView>
      {tip1 && (
        <View
        //   style={{
        //     marginVertical: 250,
        //     marginHorizontal: 25,
        //   }}
        >
          <View style={styles.container}>
            <Text style={styles.text}>{tip1}</Text>
          </View>

          <View style={styles.buttonParent}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigation.navigate('writeJournal');
              }}
            >
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {!tip1 && tip2 && (
        <View>
          <View style={styles.container}>
            <Text style={styles.text}>{tip2}</Text>
          </View>
          <View style={styles.buttonParent}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigation.navigate('writeJournal');
              }}
            >
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {!tip2 && tip3 && (
        <View>
          <View style={styles.container}>
            <Text style={styles.text}>{tip3}</Text>
          </View>
          <View style={styles.buttonParent}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigation.navigate('writeJournal');
              }}
            >
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 250,
    marginHorizontal: 25,
  },
  text: {
    color: "#2D3748",
    fontSize: 22,
    fontWeight: 500,
    textAlign: "center",
  },
  buttonParent: {
    marginTop: 200,
    alignItems: "center",
  },
  button: {
    backgroundColor: "#2D3748",
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
