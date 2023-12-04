import React from "react";
import { View, FlatList, Image } from "react-native";
import { Card, Text } from "react-native-paper";
import StarRating from "react-native-star-rating";

const data = [
  {
    id: "1",
    name: "John Doe",
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    rating: 4,
  },
  {
    id: "2",
    name: "John Doe",
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    rating: 3.5,
  },
];

const renderItem = ({ item }) => (
  <Card style={{ marginVertical: 10,backgroundColor: "#D3D3D3", }}>
    <Card.Content>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",          
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={{
              uri: "https://reactnative.dev/img/tiny_logo.png",
            }}
            style={{ width: 40, height: 40, marginRight: 15, borderRadius: 50 }}
          />
          <Text style={{ marginTop: 5 }}>{item.name}</Text>
        </View>
        <StarRating
          disabled={true}
          maxStars={5}
          rating={item.rating}
          starSize={20}
          fullStarColor="gold"
        />        
      </View>
      <Text>{item.review}</Text>
    </Card.Content>
  </Card>
);

const App = () => {
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontWeight: 800, fontSize: 18 }}>Reviews</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default App;
