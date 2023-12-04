import React from "react";
import { useState, useEffect } from "react";
import { TouchableOpacity,View, StyleSheet, FlatList, Text } from "react-native";
import GuidedJournalCard from "../../components/GuidedJournalCard";
import journalingData from "../../data/guidedJournalingData";
import Icon from 'react-native-vector-icons/FontAwesome5';

const RecommendedScreen = ({ navigation }) => {
  const [numColumns, setNumColumns] = useState(2);
  const [recommendedData, setRecommendedData] = useState([]);

  useEffect(() => {    
    const randomData = getRandomData(journalingData, 2); 
    setRecommendedData(randomData);
    
  }, [navigation]);

  const getRandomData = (data, count) => {
    const shuffledData = data.sort(() => 0.5 - Math.random());
    return shuffledData.slice(0, count);
  };

  return (
    <View>
      <Text style={{fontSize:18,margin:10}}>Recommended Journals</Text>
      <FlatList
        data={recommendedData}
        key={numColumns}
        numColumns={numColumns}
        renderItem={({ item }) => (
          <GuidedJournalCard title={item.title} image={item.imgUrl} />
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
