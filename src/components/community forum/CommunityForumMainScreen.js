import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import useStore from "../../screens/zustand/store";
import axios from "axios";
import SinglePost from "./SinglePost";

const CommunityForumMainScreen = () => {
  const navigation = useNavigation();
  const { responseData } = useStore();
  const [postData, setPostData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/posts").then((response) => {

      // //console.log("response: ", response);
      // //console.log("response data: ", response.data);
      // //console.log("post: ", response.data.data);

      setPostData(response.data.data);
      setLoading(false);
      // initializeVoteStates(response.data.data);
    });
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator
          style={styles.loader}
          size="large"
          color="#2196F3" // Accent color
        />
      ) : (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          {postData.map((post) => {
            if (post) {

              ////console.log("single post: ", post);

              return <SinglePost key={post._id} post={post} />;
            }
          })}
        </ScrollView>
      )}

      <View style={styles.plusCircleContainer}>
        <AntDesign
          name="pluscircle"
          size={40}
          color="black"
          onPress={() => {
            navigation.navigate("create post");
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5", // Light background color
  },
  scrollViewContent: {
    flexGrow: 1,
    padding: 16,
  },
  plusCircleContainer: {
    position: "absolute",
    bottom: 16,
    left: 16,
    padding: 12,
    borderRadius: 50, // Make it a circle
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CommunityForumMainScreen;
