import React, { useState,useEffect} from 'react';
import useStore from '../zustand/store';
import { useNavigation } from "@react-navigation/native";
//import ContentBasedRecommender from 'content-based-recommender';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  View,
} from 'react-native';
import axios  from 'axios';

const TextInputExample = () => { 
  const navigation = useNavigation();  
  const [text, onChangeText] = React.useState('');
  const [selectedId, setSelectedId] = useState();
  const { items, initializeItems,addItem ,setSelectedItem} = useStore();
  const [searchResults, setSearchResults] = useState([])
  const Item = ({ item, onPress }) => (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: 'auto',
        borderColor: 'black',
        borderWidth: 2,
        margin: 5,
        borderRadius: 20,
        padding: 20, 
      }}
    >
      <Image
        source={{
          uri: item.picture,
        }}
        style={{ width: 100, height: 100, alignSelf: 'center' ,marginBottom:20}}
      />
      <Text style={{ fontSize: 20 }}>{item.firstName} {item.lastName}</Text>
      <Text style={{ fontSize: 18 }}>{item.specialization}</Text>
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ fontSize: 16 }}>Experience:</Text>
        <Text style={{ fontSize: 16 }}>{item.experience} Years</Text>
      </View>
      <Text>Charges Session: $ {item.sessionCharges / 100}</Text>
    </TouchableOpacity>
  );
  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
    const color = item.id === selectedId ? 'white' : 'black';

    return (
      <Item
        item={item}
        onPress={() => 
        {
         setSelectedId(item.id)
         setSelectedItem(item)
         navigation.navigate('Doctor Details')
        }
        }
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };
  const renderItemFeatured = ({ item }) => {
    const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
    const color = item.id === selectedId ? 'white' : 'black';

    return (
      <Item
        item={item}
        onPress={() => 
        {
         setSelectedId(item.id)
         setSelectedItem(item)
         navigation.navigate('Doctor Details')
        }
        }
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };  
  const [featuredTherapist,setFeaturedTherapist] = useState([])
  useEffect(async()=>{
    //navigation.navigate('Top Doctors')
      const response = await axios.get("/therapists")
      const responseFeatured = await axios.get("https://mind-care-backend-7dd9b4794b38.herokuapp.com/api/v1/therapist/query/?verifiedAccount=true")      
      setFeaturedTherapist(responseFeatured.data.data)
      //console.log(response.data)
      initializeItems(response.data.data)
  },[])
  //content Recommendation

  // const recommender = new ContentBasedRecommender({
  //   minScore: 0.1,
  //   maxSimilarDocuments: 100,
  // });
  // const recommendedDocuments = recommender.recommend(DATA, {
  //   documentId: 1,
  // });
  
  // console.log(recommendedDocuments);  
  //To display only 10 results
  const lessItems = items.slice(0,10)
  // search
  const handleSearch = () => {  
    const filteredItems = items.filter((item) =>
      item.firstName.toLowerCase().includes(text.toLowerCase()) ||
      item.lastName.toLowerCase().includes(text.toLowerCase())
    );
    setSearchResults(text === '' ? items : filteredItems);
  };
  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        placeholder="Search Therapist"
        onChangeText={(text) => {
          onChangeText(text);
          handleSearch(text); 
        }}
        value={text}
      />
      <View style={{flexDirection:'row',justifyContent: 'space-between',marginRight:'6%',marginLeft:'6%'}}>
        <Text style={{  marginTop: 10, marginBottom: 10, fontWeight: 600, fontSize: 20 }}>Top Therapists</Text>
          <TouchableOpacity style={{fontWeight:'700',alignSelf:'flex-end'}} onPress={()=>{navigation.navigate('Top Therapists')}}>
          <Text style={{  marginTop: 10, marginBottom: 10, fontWeight: 600, fontSize: 16 }}>Show All</Text>
          </TouchableOpacity>
      </View>
      <FlatList
        data={searchResults.length > 0 ? searchResults : items.slice(0, 10)}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
        horizontal={true}
        style={{ marginLeft: '4%',marginRight:'4%' }}
      />

      <View style={{flexDirection:'row',justifyContent: 'space-between',marginRight:'6%',marginLeft:'6%'}}>
        <Text style={{  marginTop: 10, marginBottom: 10, fontWeight: 600, fontSize: 20 }}>Featured Therapists</Text>
          {/* <TouchableOpacity style={{fontWeight:'700',alignSelf:'flex-end'}} onPress={()=>{navigation.navigate('Top Doctors')}}>
          <Text style={{  marginTop: 10, marginBottom: 10, fontWeight: 600, fontSize: 16 }}>Show All</Text>
          </TouchableOpacity> */}
      </View>
      <FlatList
        data={featuredTherapist}
        renderItem={renderItemFeatured}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
        horizontal={true}
        style={{ marginLeft: '4%',marginRight:'4%' }}
      />        
      {/* <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
        horizontal={true}
        style={{ marginLeft: '4%' }}
      /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 20,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
});

export default TextInputExample;
