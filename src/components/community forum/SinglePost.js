import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Avatar, Button, Card } from "react-native-paper";
import useStore from "../../screens/zustand/store";
import { trackEvent } from "@aptabase/react-native";
import { Entypo } from "@expo/vector-icons";
import axios from "axios";
import Comment from "./Comment";
import { useNavigation } from "@react-navigation/native";

const SinglePost = ({ post }) => {
  const { responseData } = useStore();

  const [userId, setUserId] = useState();
  useEffect(() => {
    setUserId(responseData._id);
  }, [responseData]);
  const [isReadMore, setIsReadMore] = useState(true);
  const [upvoted, setUpvoted] = useState(false);
  const [downvoted, setDownvoted] = useState(false);
  const [postData, setPostData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const navigation = useNavigation();
  
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  const truncatedText = post.body.slice(0, 300);
  const dateConversion = (createdAt) => {
    const date = new Date(createdAt); // Create a Date object from the ISO string
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Months are 0-based, so add 1
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const formattedDate = `${year}-${String(month).padStart(2, "0")}-${String(
      day,
    )}`;
    return formattedDate;
  };
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  const deletePost = (postId) => {
    axios
      .delete(`/posts/${postId}`)
      .then(() => {
        setPostData((prevData) =>
          prevData.filter((post) => post._id !== postId),
        );
      })
      .catch((error) => {
        console.error(error);
      });
    toggleModal();
    trackEvent("Post Deleted");
  };
  const addUpvote = async (postId, clientId) => {
    trackEvent("Post Upvoted");

    const postSelected = {
      postId: postId,
      clientId: userId,
    };
    axios.post(`/upvote-post/${postId}`, postSelected).then((response) => {});
    setUpvoted(true);
  };
  const addDownvote = async (postId, clientId) => {
    trackEvent("Post Downvoted");
    const postSelected = {
      postId: postId,
      clientId: userId,
    };
    axios.post(`/downvote-post/${postId}`, postSelected).then((response) => {
      //////console.log("response: ", response.data);
    });
  };

  const removeUpvote = async (postId) => {
    const upvoteId = post.upvotes.find((upvote) => {
      if (upvote.postId == postId) {
        return upvote._id;
      }
    });

    ////////console.log("upvote Id after: ", upvoteId._id);
    axios.delete(`/upvote-post/${postId}/${upvoteId._id}`).then((response) => {
      const deletedPost = response.data;
      trackEvent("Upvote removed from post");
      ////////console.log("upvote undone: ", deletedPost);
    });
    setUpvoted(false);
  };

  const removeDownvote = async (postId) => {
    const downvoteId = post.downvotes.find((downvote) => {
      if (downvote.postId == postId) {
        return downvote._id;
      }
    });

    ////////console.log("upvote Id after: ", downvoteId._id);
    axios
      .delete(`/downvote-post/${postId}/${downvoteId._id}`)
      .then((response) => {
        const deletedPost = response.data;
        trackEvent("Downvote removed from post");

        //////console.log("downvote undone: ", deletedPost);
      });
  };
  const getUpvoteStatus = (post) => {
    //////console.log("get upvote status function");
    //////console.log("postttttttt: ", post);
    //////console.log("post.upvotes: ", post.upvotes);

    const hasUpvoted = post.upvotes.some((upvote) => {
      if (upvote.clientId) {
        return upvote.clientId === userId;
      }
      return false;
    });
    // setUpvoted(hasUpvoted);
    ////////console.log("hasUpvoted status: ", hasUpvoted);
    return hasUpvoted;
  };

  const getDownvoteStatus = (post) => {
    //////console.log("get downvote status function");
    //////console.log("posttttt: ", post);
    //////console.log("post.downvotes: ", post.downvotes);

    const hasDownvoted = post.downvotes.some((downvote) => {
      if (downvote.clientId) {
        return downvote.clientId === userId;
      }
      return false;
    });
    // setDownvoted(hasDownvoted);

    ////////console.log("hasDownvoted status: ", hasDownvoted);

    //////console.log("hasDownvoted status: ", hasDownvoted);

    return hasDownvoted;
  };
  return (
    <View>
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
                <Text style={styles.nameText}>
                  {`${post.therapistId.firstName} ${post.therapistId.lastName}`}
                </Text>
                <TouchableOpacity
                  style={styles.optionsIcon}
                  onPress={toggleModal}
                >
                  <Entypo name="dots-three-vertical" size={24} color="black" />
                </TouchableOpacity>

                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={isModalVisible}
                  onRequestClose={toggleModal}
                >
                  <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("report", {
                            id: post._id,
                            clientId: userId,
                            type: "post",
                          });
                        }}
                      >
                        <Text style={styles.optionText}>Report Post</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Modal>
                <Text style={styles.subtitleText}>
                  {dateConversion(post.createdAt)}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("post comments", {
                  postId: post._id,
                  post: post,
                });
              }}
            >
              <Text style={styles.titleText}>{post.title}</Text>

              <Text style={styles.bodyText}>
                {isReadMore ? post.body : truncatedText}
                {post.body.length > 300 && (
                  <TouchableWithoutFeedback onPress={toggleReadMore}>
                    <Text style={styles.readMoreText}>
                      {isReadMore ? " read less" : " read more"}
                    </Text>
                  </TouchableWithoutFeedback>
                )}
              </Text>
            </TouchableOpacity>
            <View style={{ alignItems: 'flex-end' }}>
              <Comment postId={post._id} clientId={userId} />
            </View>
          </Card.Content>
          <Card.Actions>

            {/* Upvote and Downvote buttons */}
            {getUpvoteStatus(post) ? (
              <MaterialCommunityIcons
                name="arrow-up-bold"
                size={24}
                color="black"
                onPress={() => removeUpvote(post._id)}
              />
            ) : (
              <MaterialCommunityIcons
                name="arrow-up-bold-outline"
                size={24}
                color="black"
                onPress={() => addUpvote(post._id, post.therapistId._id)}
              />
            )}
            {getDownvoteStatus(post) ? (
              <MaterialCommunityIcons
                name="arrow-down-bold"
                size={24}
                color="black"
                onPress={() => removeDownvote(post._id)}
              />
            ) : (
              <MaterialCommunityIcons
                name="arrow-down-bold-outline"
                size={24}
                color="black"
                onPress={() =>
                  addDownvote(post._id, post.therapistId._id, "therapist")
                }
              />
            )}
          </Card.Actions>
        </Card>
      )}

      {post.clientId && (
        <Card style={styles.card}>
          <Card.Content style={styles.cardContent}>
            <View style={styles.titleContainer}>
              <Avatar.Image
                size={40}
                source={post.clientId.profilePicture}
                style={styles.avatarIcon}
              />
              <View style={styles.textContainer}>
                <Text style={styles.nameText}>
                  {`${post.clientId.firstName} ${post.clientId.lastName}`}
                </Text>
                <Text style={styles.subtitleText}>
                  {dateConversion(post.createdAt)}
                </Text>
              </View>
            </View>

            {/* {userId === post.clientId._id && (
              <>
                <TouchableOpacity
                  style={styles.optionsIcon}
                  onPress={toggleModal}
                >
                  <Entypo name="dots-three-vertical" size={24} color="black" />
                </TouchableOpacity>

                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={isModalVisible}
                  onRequestClose={toggleModal}
                >
                  <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                      <TouchableOpacity
                        onPress={() => {
                          deletePost(post._id);
                        }}
                      >
                        <Text style={styles.optionText}>Delete Post</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Modal>
              </>
            )} */}

            {userId === post.clientId._id ? (
              <>
                <TouchableOpacity
                  style={styles.optionsIcon}
                  onPress={toggleModal}
                >
                  <Entypo name="dots-three-vertical" size={24} color="black" />
                </TouchableOpacity>

                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={isModalVisible}
                  onRequestClose={toggleModal}
                >
                  <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                      <TouchableOpacity
                        onPress={() => {
                          deletePost(post._id);
                        }}
                      >
                        <Text style={styles.optionText}>Delete Post</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Modal>
              </>
            ) : (
              <>
                <TouchableOpacity
                  style={styles.optionsIcon}
                  onPress={toggleModal}
                >
                  <Entypo name="dots-three-vertical" size={24} color="black" />
                </TouchableOpacity>

                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={isModalVisible}
                  onRequestClose={toggleModal}
                >
                  <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("report", {
                            id: post._id,
                            clientId: userId,
                            type: "post",
                          });
                        }}
                      >
                        <Text style={styles.optionText}>Report Post</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Modal>
              </>
            )}

            <TouchableOpacity
              onPress={() => {
                navigation.navigate("post comments", {
                  postId: post._id,
                  post: post,
                });
              }}
            >
              <Text style={styles.titleText}>{post.title}</Text>
              <Text style={styles.bodyText}>
                {isReadMore ? post.body : truncatedText}
                {post.body.length > 300 && (
                  <TouchableWithoutFeedback onPress={toggleReadMore}>
                    <Text style={styles.readMoreText}>
                      {isReadMore ? " read less" : " read more"}
                    </Text>
                  </TouchableWithoutFeedback>
                )}
              </Text>
            </TouchableOpacity>
            <View style={{ alignItems: 'flex-end' }}>
              <Comment postId={post._id} clientId={userId} />
            </View>
          </Card.Content>
          <Card.Actions>
            {/* <Comment postId={post._id} clientId={userId} /> */}
            
            {getUpvoteStatus(post) ? (
              <MaterialCommunityIcons
                name="arrow-up-bold"
                size={24}
                color="black"
                onPress={() => removeUpvote(post._id)}
              />
            ) : (
              <MaterialCommunityIcons
                name="arrow-up-bold-outline"
                size={24}
                color="black"
                onPress={() => addUpvote(post._id, post.clientId._id)}
              />
            )}
            {getDownvoteStatus(post) ? (
              <MaterialCommunityIcons
                name="arrow-down-bold"
                size={24}
                color="black"
                onPress={() => removeDownvote(post._id)}
              />
            ) : (
              <MaterialCommunityIcons
                name="arrow-down-bold-outline"
                size={24}
                color="black"
                onPress={() =>
                  addDownvote(post._id, post.clientId._id, "client")
                }
              />
            )}
          </Card.Actions>
        </Card>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    marginVertical: 8,
    marginHorizontal: 16,
  },

  commentCard: {
    // height: 450,
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
    // backgroundColor: "lightblue",
    marginRight: 8,
  },
  textContainer: {
    flex: 1,
  },
  titleText: {
    marginTop: 3,
    fontSize: 15,
    fontWeight: "bold",
    marginLeft:40
  },
nameText:{
  marginTop: 3,
  fontSize: 15,
  fontWeight: "bold",
},
  subtitleText: {
    fontSize: 14,
    color: "gray",
  },
  bodyText: {
    fontSize: 16,
    lineHeight: 24,
    color: "black", // Adjust the color as needed
    marginVertical: 10,
    marginLeft:40
  },
  readMoreText: {
    color: "rgb(192, 192, 192)",
    textDecorationLine: "underline",
    marginLeft: 5,
  },
  optionsIcon: {
    position: "absolute",
    top: 0,
    right: 0,
    padding: 10,
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 150,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    elevation: 5,
  },
  optionText: {
    fontSize: 16,
    marginVertical: 8,
  },
});

export default SinglePost;
