// import React from "react";
// import { useState } from "react";
// import { View, StyleSheet, FlatList,TouchableOpacity } from "react-native";
// import RescueSessionCard from "../../components/RescueSessionsCard"
// import rescueData from "../../data/rescueSessionData";
// import Icon from 'react-native-vector-icons/FontAwesome5';
// const GuidedJournalingMain = ({navigation}) => {
//   const [numColumns, setNumColumns] = useState(2);
//   React.useLayoutEffect(() => {
//     navigation.setOptions({
//       headerRight: () => (
//         <TouchableOpacity onPress={() => navigation.navigate('RescueSessionsTab')}>
//           <Icon name="clipboard-list" size={30} color="black" style={styles.copyIcon} />
//         </TouchableOpacity>
//       ),
//     });
//   }, [navigation]);
//   return (
//     <View>
//       <FlatList
//         data={rescueData}
//         key={numColumns}
//         numColumns={numColumns}
//         renderItem={({ item }) => (
//           <RescueSessionCard title={item.title} image={item.imgUrl} />
//         )}
//         keyExtractor={(item) => item.id}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({});

// export default GuidedJournalingMain;
// RecommendedScreen.js
import React from "react";
import { useState, useEffect } from "react";
import {
  TouchableOpacity,
  View,
  StyleSheet,
  FlatList,
  Text,
} from "react-native";
import RescueSessionCard from "../../components/RescueSessionsCard";
import rescueData from "../../data/rescueSessionData";
import Icon from "react-native-vector-icons/FontAwesome5";
import { trackEvent } from "@aptabase/react-native";

const RecommendedScreen = ({ navigation }) => {
  const [numColumns, setNumColumns] = useState(2);
  const [recommendedData, setRecommendedData] = useState([]);
  useEffect(() => {
    trackEvent("Recommended Rescue Sessions");
  }, []);
  useEffect(() => {
    const randomData = getRandomData(rescueData, 2);
    setRecommendedData(randomData);
  }, [navigation]);

  const getRandomData = (data, count) => {
    const shuffledData = data.sort(() => 0.5 - Math.random());
    return shuffledData.slice(0, count);
  };

  return (
    <View>
      <Text style={{ fontSize: 18, margin: 10,fontWeight:'bold' }}>
        Recommended Rescue Sessions
      </Text>
      <FlatList
        data={recommendedData}
        key={numColumns}
        numColumns={numColumns}
        renderItem={({ item }) => (
          <RescueSessionCard title={item.title} image={item.imgUrl} />
        )}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text>No recommendations available</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  copyIcon: {
    marginRight: 20,
  },
});

export default RecommendedScreen;
