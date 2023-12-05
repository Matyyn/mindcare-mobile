import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Avatar, Card } from "react-native-paper";
import useStore from "../../screens/zustand/store";
import axios from "axios";
import SingleComment from "./SingleComment";
import Comment from "./Comment";

const PostComments = ({ route }) => {
  const { responseData } = useStore();

  const { postId, post } = route.params;
  const [userId, setUserId] = useState(responseData._id);
  const [isReadMore, setIsReadMore] = useState(true);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ////console.log("post id in post comments: ", postId);
    axios.get(`/comments/${postId}`).then((response) => {
      ////console.log("response: ", response);
      ////console.log("response data: ", response.data);
      ////console.log("comment response data data", response.data.data);
      setComments(response.data.data);
      setLoading(false);
    });
  }, []);

  const dateConversion = (createdAt) => {
    const date = new Date(createdAt);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const formattedDate = `${year}-${String(month).padStart(2, "0")}-${String(
      day,
    )}`;
    ////console.log(formattedDate);
    return formattedDate;
  };

  return (
    <View style={styles.container}>
      {post.therapistId && (
        <Card style={styles.card}>
          <Card.Content style={styles.cardContent}>
            <View style={styles.titleContainer}>
              <Avatar.Image
                size={40}
                source={post.therapistId.picture}
                style={styles.avatarIcon}
              />
              <View style={styles.textContainer}>
                <Text style={styles.titleText}>
                  {`${post.therapistId.firstName} ${post.therapistId.lastName}`}
                </Text>
                <Text style={styles.subtitleText}>
                  {dateConversion(post.createdAt)}
                </Text>
              </View>
            </View>

            <Text variant="titleLarge" style={{ fontWeight: "bold" }}>
              {post.title}
            </Text>
            <Text style={styles.bodyText}>
              {isReadMore ? post.body : post.body}
              {post.body.length > 300 && (
                <TouchableWithoutFeedback onPress={toggleReadMore}>
                  <Text style={styles.readMoreText}>
                    {isReadMore ? " read less" : " read more"}
                  </Text>
                </TouchableWithoutFeedback>
              )}
            </Text>
            <Card.Actions>
              <Comment postId={post._id} clientId={userId} />
            </Card.Actions>
          </Card.Content>
        </Card>
      )}

      {post.clientId && (
        <Card style={styles.card}>
          <Card.Content style={styles.cardContent}>
            <View style={styles.titleContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.titleText}>
                  {`${post.clientId.firstName} ${post.clientId.lastName}`}
                </Text>
                <Text style={styles.subtitleText}>
                  {dateConversion(post.createdAt)}
                </Text>
              </View>
            </View>
            <TouchableOpacity>
              <Text variant="titleLarge">{post.title}</Text>
              <Text style={styles.bodyText}>
                {isReadMore ? post.body : post.body}
                {post.body.length > 300 && (
                  <TouchableWithoutFeedback onPress={toggleReadMore}>
                    <Text style={styles.readMoreText}>
                      {isReadMore ? " read less" : " read more"}
                    </Text>
                  </TouchableWithoutFeedback>
                )}
              </Text>
            </TouchableOpacity>
            <Card.Actions>
              <Comment postId={post._id} clientId={userId} />
            </Card.Actions>
          </Card.Content>
        </Card>
      )}

      {loading ? (
        <ActivityIndicator style={styles.loader} size="large" color="#2196F3" />
      ) : (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          {comments.map((comment) => (
            <SingleComment key={comment._id} comment={comment} post={post} />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  scrollViewContent: {
    flexGrow: 1,
    padding: 16,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    borderRadius: 10,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  cardContent: {
    padding: 16,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarIcon: {
    marginRight: 8,
  },
  textContainer: {
    flex: 1,
  },
  titleText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  subtitleText: {
    fontSize: 14,
    color: "gray",
  },
  bodyText: {
    fontSize: 16,
    lineHeight: 24,
    color: "black",
    marginVertical: 10,
  },
  readMoreText: {
    color: "rgb(192, 192, 192)",
    textDecorationLine: "underline",
    marginLeft: 5,
  },
});

export default PostComments;
