import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  TextInput,
  Text,
  StyleSheet,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import axios from "axios";
import color from "../../constants/colors";
import useStore from "../../screens/zustand/store";
import { trackEvent } from "@aptabase/react-native";

export default function Reply({ postId, clientId, commentId }) {
  const [isReplying, setIsReplying] = useState(false);
  const [replyBody, setReplyBody] = useState("");
  const [replyState, setReplyState] = useState(false);
  const { responseData } = useStore();
  const userId = responseData._id;

  useEffect(() => {
    trackEvent("Replying to Comment");
  }, []);

  useEffect(() => {}, [replyState]);

  const postReply = async () => {
    //console.log("reply body: ", replyBody);
    //console.log("post id for comment: ", postId);
    //console.log("reply therapist id: ", clientId);
    //console.log("comment id for reply: ", commentId);
    const replyObject = {
      postId: postId,
      clientId: userId,
      body: replyBody,
      commentId: commentId,
    };
    const response = await axios.post(
      `/reply-to-comment/${commentId}`,
      replyObject
    );
    //console.log("reply response: ", response);
    setReplyBody("");
    // setCommentState(!replyState);
  };

  return (
    <View style={styles.commentContainer}>
      {isReplying ? (
        <View style={styles.replyContainer}>
          <TouchableOpacity style={styles.postButton} onPress={postReply}>
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

      {isReplying && (
        <TextInput
          style={styles.input}
          placeholder="What are your thoughts?"
          value={replyBody}
          onChangeText={(text) => setReplyBody(text)}
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  commentContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  replyContainer: {
    flexDirection: "row",
    paddingTop: 10,
    paddingBottom: 5,
  },
  postButton: {
    marginRight: 10,
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
    marginLeft: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#CCCCCC", // Adjust the color as needed

    paddingHorizontal: 10,
  },
  cancelButton: {
    backgroundColor: "#DC3545", // Adjust the color as needed
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
  },
});
