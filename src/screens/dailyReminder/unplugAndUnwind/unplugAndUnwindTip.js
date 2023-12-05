// import React, { useEffect, useState } from "react";
// import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import color from "../../../constants/colors";
// import { AntDesign } from "@expo/vector-icons";
// import { Entypo } from "@expo/vector-icons";
// const UnplugAndUnwindTip = ({ navigation }) => {
//   return (
//     <SafeAreaView style={styles.parentContainer}>
//       <View style={styles.upperContainer}>
//         <TouchableOpacity onPress={() => navigation.navigate("Task")}>
//           <Text style={{ marginLeft: 10 }}>
//             <Entypo name="cross" size={24} color="white" />
//           </Text>
//         </TouchableOpacity>

//         <Text style={styles.heading}>UNPLUG AND UNWIND</Text>
//       </View>

//       <View>
//         <View style={styles.container}>
//           <Text style={styles.text}>
//             You're about to listen to an audio recording.
//           </Text>
//           <Text style={styles.heading}>
//             Put your earphones and press play when you're ready.
//           </Text>
//         </View>

//         <View style={styles.iconContainer}>
//           <TouchableOpacity
//             onPress={() => navigation.navigate("Task")}
//             style={styles.icon}
//           >
//             <Text>
//               <AntDesign name="left" size={24} color="black" />
//             </Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             onPress={() => navigation.navigate("unplug and unwind audio")}
//             style={styles.icon}
//           >
//             <Text>
//               <AntDesign name="right" size={24} color="black" />
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   parentContainer: {
//     backgroundColor: color.grey,
//     flex: 1,
//   },
//   upperContainer: {
//     flexDirection: "row",
//     marginTop: 10,
//   },
//   heading: {
//     fontSize: 18,
//     color: "white",
//     textAlign: "center",
//   },
//   icon: {
//     backgroundColor: "white",
//     height: 40,
//     width: 40,
//     borderRadius: 100,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   iconContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 250,
//     marginHorizontal: 15,
//     alignSelf: "stretch",
//   },
//   container: {
//     // backgroundColor: "black",
//     height: 150,
//     marginTop: 250,
//     marginHorizontal: 30,
//     justifyContent: "center",
//   },
//   text: {
//     color: "white",
//     fontSize: 22,
//     fontWeight: 500,
//     textAlign: "center",
//   },
//   buttonParent: {
//     marginTop: 200,
//     alignItems: "center",
//   },
//   button: {
//     backgroundColor: color.grey,
//     alignItems: "center",
//     padding: 10,
//     borderRadius: 10,
//     width: "90%",
//   },
//   buttonText: {
//     color: "white",
//     fontFamily: "Inter_700Bold",
//     fontSize: 20,
//   },
// });
// export default UnplugAndUnwindTip;
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import color from "../../../constants/colors";
import Icon from "react-native-vector-icons/FontAwesome5";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

const GuidedJournalingTips = ({ navigation }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.navigate("Daily Tasks")}>
          <Ionicons
            name="close"
            size={30}
            color="black"
            style={{ marginRight: 10 }}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const [tip1, setTip1] = useState(
    "You're about to listen to an audio recording.Put your earphones and press play when you're ready.",
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.centered}>
        <Text style={styles.text}>{tip1}</Text>
      </View>

      <View style={styles.bottom}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => {
            navigation.navigate("Daily Tasks");
          }}
        >
          <Ionicons name="chevron-back" size={40} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => {
            navigation.navigate("unplugunwind audio");
          }}
        >
          <Ionicons name="chevron-forward-outline" size={40} color="black" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "lightgreen",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    //marginTop: 0,
    marginHorizontal: 25,
  },
  text: {
    color: color.grey,
    fontSize: 22,
    fontWeight: "600",
    textAlign: "center",
  },
  bottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "lightgreen",
    padding: 15,
    //marginBottom: 8,
  },
  iconButton: {
    backgroundColor: "white",
    borderRadius: 50,
    paddingLeft: 2,
    paddingRight: 2,
  },
});

export default GuidedJournalingTips;
