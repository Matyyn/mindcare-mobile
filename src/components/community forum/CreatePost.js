import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
} from "react-native";
import axios from "axios";
import useStore from "../../screens/zustand/store";
import color from "../../constants/colors";
import { useNavigation } from "@react-navigation/native";
import { trackEvent } from "@aptabase/react-native";

const CreatePost = () => {
  const { responseData } = useStore();
  const navigation = useNavigation();

  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [selectedTags, setSelectedTags] = useState([]); // State to track the selected button
  const [postData, setPostData] = useState();

  useEffect(() => {
    trackEvent("Create Post");
  }, []);

  const uploadData = () => {
    ////console.log("client OSAASA: ", responseData._id);
    ////console.log("client id: ", responseData._id);
    ////console.log(postTitle);
    ////console.log(postBody, "postBody");

    setPostData({
      title: postTitle,
      body: postBody,
      tags: selectedTags,
      clientId: responseData._id,
    });

    // ////console.log(postData, "postBody");

    // ////console.log("post data: ", postData);
  };

  const fetchData = async () => {
    // ////console.log("IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIINNNNNNNNNNNNNNNNNNNNNNnnn");

    try {
      ////console.log("post data: ", postData);
      const response = await axios.post("/posts", postData);
      //console.log("response: ", response);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (postData != null) {
      fetchData();
      navigation.navigate("main screen");
    } // Call the async function
  }, [postData]);

  const setTags = (tag) => {
    const found = selectedTags.find((button) => button == tag);
    ////console.log("found: ", found);
    if (!found) {
      ////console.log("hello");
      setSelectedTags([...selectedTags, tag]);
    }
    ////console.log("Selected button:", selectedTags);
  };

  const removeTag = (tag) => {
    setSelectedTags((prevTags) => prevTags.filter((object) => object != tag));
    ////console.log("selected tags after removal: ", selectedTags);
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={postTitle}
        onChangeText={(newTitle) => setPostTitle(newTitle)}
        style={styles.inputTitle}
        placeholder="Title"
      />
      <TextInput
        value={postBody}
        onChangeText={(newBody) => setPostBody(newBody)}
        style={styles.inputPost}
        placeholder="Post Body"
        multiline={true}
        numberOfLines={15}
      />
      <View>
        {selectedTags && (
          <View>
            <View style={styles.buttonContainer}>
              {/* <Text>Selected tags:</Text> */}

              {selectedTags.map((tag) => {
                return (
                  <TouchableOpacity
                    key={tag}
                    style={[styles.button, { backgroundColor: "grey" }]}
                    onPress={() => removeTag(tag)}
                  >
                    <Text style={styles.buttonText}>{tag} x</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#805AD5" }]}
            onPress={() => setTags("Anxiety")}
          >
            <Text style={styles.buttonText}>Anxiety</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#D53F8C" }]}
            onPress={() => setTags("Depression")}
          >
            <Text style={styles.buttonText}>Depression</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#DD6B20" }]}
            onPress={() => setTags("Advice")}
          >
            <Text style={styles.buttonText}>Advice</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ marginTop: "10%", alignItems: "center" }}>
        <TouchableOpacity
          style={{
            backgroundColor: color.grey,
            alignItems: "center",
            padding: 10,
            borderRadius: 10,
            width: "90%",
          }}
          onPress={() => {
            uploadData();
          }}
        >
          <Text
            style={{
              color: "white",
              fontFamily: "Inter_700Bold",
              fontSize: 20,
            }}
          >
            Create Post
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  inputTitle: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  inputPost: {
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 50,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  button: {
    padding: 10,
    borderRadius: 10,
    width: 106,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  buttonColors: {
    Anxiety: "#805AD5",
    Depression: "#D53F8C",
    Advice: "#DD6B20",
  },
});

export default CreatePost;
