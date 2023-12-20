import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  TextInput,
  Text,
  StyleSheet,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import color from "../../constants/colors";
import axios from "axios";
import useStore from "../../screens/zustand/store";
import { trackEvent } from "@aptabase/react-native";

export default function Comment({ postId, clientId, type }) {
  const [isReplying, setIsReplying] = useState(false);
  const [commentBody, setCommentBody] = useState("");
  const { responseData } = useStore();
  const userId = responseData._id;

  useEffect(() => {
    trackEvent("Create Comment");
    ////console.log(responseData);
    ////console.log("user iddddd: ", userId);
  }, []);
  const postComment = async () => {
    ////console.log("comment body: ", commentBody);
    ////console.log("post id for comment: ", postId);
    // Assuming you are using some API for posting comments in React Native
    // Adjust the API call accordingly
    // const response = await YourApi.postComment(postId, userId, commentBody);
    // ////console.log('comment response: ', response);
    const commentObject = {
      postId: postId,
      clientId: userId,
      body: commentBody,
    };

    ////console.log("comment object: ", commentObject.clientId);

    const response = await axios.post(`/comments/${postId}`, commentObject);
    ////console.log("comment response: ", response);
    setCommentBody("");
    setIsReplying(false);
  };

  return (
    <View style={styles.commentContainer}>
      {isReplying && (
        <TextInput
          style={styles.input}
          placeholder="What are your thoughts?"
          value={commentBody}
          onChangeText={(text) => setCommentBody(text)}
        />
      )}
      {isReplying ? (
        <View style={styles.replyContainer}>
          <TouchableOpacity style={styles.postButton} onPress={postComment}>
            <Text style={styles.buttonText}>Post</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => setIsReplying(false)}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity onPress={() => setIsReplying(true)}>
          <FontAwesome5 name="comment-alt" size={22} color="black" />
        </TouchableOpacity>
      )}
    </View>
  //   <View style={{...styles.commentContainer, justifyContent: 'center', alignItems: 'center'}}>
  //   {isReplying && (
  //     <View style={{width:'80%',marginLeft:10}}>
  //       <TextInput
  //         style={styles.input}
  //         placeholder="What are your thoughts?"
  //         value={commentBody}
  //         onChangeText={(text) => setCommentBody(text)}
  //       />
  //       <View style={{...styles.commentContainer, justifyContent: 'center', alignItems: 'center'}}>
  //         <TouchableOpacity style={styles.postButton} onPress={postComment}>
  //           <Text style={styles.buttonText}>Post</Text>
  //         </TouchableOpacity>
  //         <TouchableOpacity
  //           style={styles.cancelButton}
  //           onPress={() => setIsReplying(false)}
  //         >
  //           <Text style={styles.buttonText}>Cancel</Text>
  //         </TouchableOpacity>
  //       </View>
  //     </View>
  //   )}
  //   {!isReplying && (
  //     <TouchableOpacity onPress={() => setIsReplying(true)}>
  //       <FontAwesome5 name="comment-alt" size={22} color="black" />
  //     </TouchableOpacity>
  //   )}
  // </View>
  );
}

const styles = StyleSheet.create({
  commentContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent:'space-evenly',
    marginVertical: 10,
  },
  replyContainer: {
    flexDirection: "row",
    paddingTop: 10,
    paddingBottom: 5,
  },
  postButton: {
    marginRight: 10,
    marginLeft:5,
    backgroundColor: color.grey,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
  },
  buttonText: {
    color: "#FFFFFF", // Adjust the color as needed
  },
  input: {
    flex: 1,    
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#CCCCCC", // Adjust the color as needed
    paddingHorizontal: 10,
    height:37
  },
  cancelButton: {
    backgroundColor: "#DC3545", // Adjust the color as needed
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
  },
});
