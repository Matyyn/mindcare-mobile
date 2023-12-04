import React from "react";
import { useState } from "react";
import { View, StyleSheet, FlatList,TouchableOpacity } from "react-native";
import GuiedJournalingHeader from "../headers/guiedJournalingHeader";
import GuidedJournalCard from "./GuidedJournalCard";
import journalingData from "../data/guidedJournalingData";
//import { FlashList } from "@shopify/flash-list";
import Icon from 'react-native-vector-icons/FontAwesome';
const GuidedJournalingMain = ({navigation}) => {
  const [numColumns, setNumColumns] = useState(2);
  React.useLayoutEffect(() => {
    navigation.setOptions({     
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('JournalsTab')}>
          <Icon name="copy" size={25} color="black" style={styles.copyIcon} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);
  return (    
    <View>
      <FlatList
        data={journalingData}
        key={numColumns}
        numColumns={numColumns}
        renderItem={({ item }) => (
          <GuidedJournalCard title={item.title} image={item.imgUrl} />
        )}
        keyExtractor={(item) => item.id}
      />
      {/* <Footer/> */}
      {/* <ScrollView>
        <GuiedJournalingHeader />
        {journalingData.map((item) => {
          return (
            <GuidedJournalCard
              key={item.id}
              image={item.imgUrl}
              title={item.title}
            />
          );
        })}
      </ScrollView> */}
    </View>
  );
};

const styles = StyleSheet.create({});

export default GuidedJournalingMain;
