import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import color from "../../../constants/colors";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const UnplugAndUnwindOverview = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.parentContainer}>
      <View style={styles.upperContainer}>
        <Text style={{ marginLeft: 10 }}>
          <Entypo name="cross" size={24} color="white" />
        </Text>
        <Text style={styles.heading}>UNPLUG AND UNWIND</Text>
      </View>
      <Text style={styles.title}>Overview</Text>

      <ScrollView>
        <View style={styles.contentContainer}>
          <Text style={styles.text}>
            Sometimes when you're feeling stressed or anxious, we may start to
            ruminate on our negative thoughts and get lost in our thoughts.
          </Text>
          <Text style={styles.text}>
            So today we're going to do a quick grounding technique to help
            activate your 5 senses and stay in the present moment.
          </Text>
          <Text style={styles.text}>
            Let's start with what you can see. Look around yo and name 5 thngs
            you can see.
          </Text>
          <Text style={styles.text}>
            It could be a bird, a pencil, a tree, or even a scratch on the
            ceiling. Pay attention to their colours and the textures and linger
            your eyes on them for a moment.
          </Text>
          <Text style={styles.text}>
            Now, let's move on to what you can touch. Spot 4 things you can
            touch around you.
          </Text>
          <Text style={styles.text}>
            It could be your phone, your hair, your table, and so on. Notice
            what each item feels like as you touch it. Is it soft or rough? Is
            it hot or cold? Take a moment to appreciate how it feels.
          </Text>
          <Text style={styles.text}>
            When you're ready, nme 3 things you can hear. Turn into your
            surroundings and focus on the ambient noises yo can hear, like a
            ticking clock, birdsong or a car engine.
          </Text>
          <Text style={styles.text}>
            Now, try to spot 2 things you can smell. You could wlak around and
            pck upsomething, like fresh laundry, a scented candle, or perfume.
            Is it a strong or a weak smell? Is the scent pleasant?
          </Text>
          <Text style={styles.text}>
            And lastly, notice 1 thing you can taste. If you don't taste
            anything, you could chew on a pece of gum or sip some coffee. What
            is its flavour? Is it sweet or bitter?
          </Text>
          <Text style={styles.text}>
            When you'r done, take a moment to thank yourself for giving yourself
            these few minutes to reset and take care of yourself.
          </Text>
        </View>
      </ScrollView>

      <View style={styles.iconContainer}>
        <TouchableOpacity
          style={styles.icon}
          onPress={() => {
            navigation.goBack("breathing exercise");
          }}
        >
          <Text>
            <AntDesign name="left" size={24} color="black" />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.forBackContainer}
          onPress={() => {
            navigation.goBack("unplug and unwind audio");
          }}
        >
          <Text>Audio Mode</Text>
          <MaterialIcons name="menu-book" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.icon}
          onPress={() => {
            navigation.navigate("unplug and unwind last tip");
          }}
        >
          <Text>
            <AntDesign name="right" size={24} color="black" />
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    backgroundColor: color.grey,
    flex: 1,
    // justifyContent: "space-between",
  },
  upperContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  heading: {
    fontSize: 14,
    color: "white",
    textAlign: "center",
    marginLeft: 10,
  },
  contentContainer: {
    padding: 15,
  },
  title: {
    color: "white",
    fontSize: 22,
    fontFamily: "Inter_700Bold",
    marginLeft: 10,
    marginTop: 40,
  },
  text: {
    color: "white",
    fontFamily: "Inter_700Bold",
    fontSize: 16,
    marginBottom: 30,
  },

  forBackContainer: {
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-around",
    borderRadius: 20,
    width: 150,
    alignSelf: "center",
    padding: 10,
    // marginTop: 180,
  },
  icon: {
    backgroundColor: "white",
    height: 40,
    width: 40,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "stretch",
    marginTop: 5,
    marginHorizontal: 15,
    marginVertical: 5,
  },
});
export default UnplugAndUnwindOverview;
