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
import { trackEvent } from "@aptabase/react-native";
import { Avatar, Button, Card } from "react-native-paper";
import useStore from "../../screens/zustand/store";
import { AntDesign } from "@expo/vector-icons";
// import { FontAwesome5 } from "@expo/vector-icons";
import axios from "axios";
import { Entypo } from "@expo/vector-icons";
import Comment from "./Comment";
import { useNavigation } from "@react-navigation/native";
import Reply from "./Reply";

const SingleComment = ({ comment, post }) => {
  const { responseData } = useStore();

  const [userId, setUserId] = useState(responseData._id);

  const [isReadMore, setIsReadMore] = useState(true);
  const [commentData, setCommentData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    // //console.log("user id: ", userId);
    //console.log("post in single comment: ", post);
    //console.log("comment: ", comment);
    //console.log("comment client id: ", comment.clientId);
    //console.log("comment replies: ", comment.replies);
  }, []);
  //   //console.log("comment id: ", comment._id);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  const truncatedText = comment.body.slice(0, 300);
  const dateConversion = (createdAt) => {
    const date = new Date(createdAt); // Create a Date object from the ISO string
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Months are 0-based, so add 1
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const formattedDate = `${year}-${String(month).padStart(2, "0")}-${String(
      day
    )}`;
    //console.log(formattedDate);
    return formattedDate;
  };
  const deleteComment = (commentId) => {
    //console.log("inside delete func");
    axios
      .delete(`/comments/${commentId}`)
      .then(() => {
        setCommentData((prevData) =>
          prevData.filter((comment) => comment._id !== commentId)
        );
      })
      .catch((error) => {
        console.error(error);
      });
    trackEvent("Comment Deleted");
  };
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  const addUpvote = async (commentId) => {
    //console.log("HWyyyyy");
    const commentSelected = {
      commentId: commentId,
      clientId: userId,
    };
    axios
      .post(`/upvote-comments/${commentId}`, commentSelected)
      .then((response) => {
        trackEvent("Comment Upvoted");
        //console.log("response: ", response.data);
      });
  };
  const addDownvote = async (commentId) => {
    //console.log("HWyyyyy");
    const commentSelected = {
      commentId: commentId,
      clientId: userId,
    };
    axios
      .post(`/downvote-comments/${commentId}`, commentSelected)
      .then((response) => {
        trackEvent("Comment Downvoted");

        //console.log("response: ", response.data);
      });
  };

  const removeUpvote = async (commentId) => {
    const upvoteId = comment.upvotes.find((upvote) => {
      if (upvote.commentId == commentId) {
        return upvote._id;
      }
    });
    //console.log("upvote Id after: ", upvoteId._id);
    axios
      .delete(`/upvote-comment/${commentId}/${upvoteId._id}`)
      .then((response) => {
        const deletedComment = response.data;
        trackEvent("Upvote from Comment removed");
        //console.log("upvote undone: ", deletedComment);
      });
  };

  const removeDownvote = async (commentId) => {
    const downvoteId = comment.downvotes.find((downvote) => {
      if (downvote.commentId == commentId) {
        return downvote._id;
      }
    });
    //console.log("downvote Id after: ", downvoteId._id);
    axios
      .delete(`/downvote-comment/${commentId}/${downvoteId._id}`)
      .then((response) => {
        const deletedComment = response.data;
        trackEvent("Downvote from Comment removed");

        //console.log("downvote undone: ", deletedComment);
      });
  };
  const getUpvoteStatus = (comment) => {
    //console.log("get upvote status function");
    //console.log("comment: ", comment);
    //console.log("comment.upvotes: ", comment.upvotes);

    const hasUpvoted = comment.upvotes.some((upvote) => {
      if (upvote.clientId) {
        return upvote.clientId === userId;
      }
      return false;
    });

    //console.log("hasUpvoted status: ", hasUpvoted);
    return hasUpvoted;
  };

  const getDownvoteStatus = (comment) => {
    //console.log("get downvote status function");
    //console.log("commentt: ", comment);
    //console.log("comment.downvotes: ", comment.upvotes);

    const hasDownvoted = comment.downvotes.some((downvote) => {
      if (downvote.clientId) {
        return downvote.clientId === userId;
      }
      return false;
    });

    //console.log("hasDownvoted status: ", hasDownvoted);
    return hasDownvoted;
  };
  return (
    <View>
      {
        comment.therapistId && (
          // <ScrollView style={{ flexGrow: 1 }}>

          <Card style={styles.card}>
            <Card.Content style={styles.cardContent}>
              <View style={styles.titleContainer}>
                <Avatar.Image
                  size={40}
                  source={comment.therapistId.picture}
                  style={styles.avatarIcon}
                />
                <View style={styles.textContainer}>
                  <Text style={styles.titleText}>
                    {`@${comment.therapistId.firstName} ${comment.therapistId.lastName}`}
                  </Text>
                  <TouchableOpacity
                    style={styles.optionsIcon}
                    onPress={toggleModal}
                  >
                    <Entypo
                      name="dots-three-vertical"
                      size={24}
                      color="black"
                    />
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
                              id: comment._id,
                              clientId: userId,
                              type: "comment",
                            });
                          }}
                        >
                          <Text style={styles.optionText}>Report Comment</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </Modal>
                  <Text style={styles.subtitleText}>
                    {dateConversion(comment.createdAt)}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("comment comments", {
                    commentId: comment._id,
                  });
                }}
              >
                <Text variant="titleLarge">{comment.title}</Text>
                <Text style={styles.bodyText}>
                  {isReadMore ? comment.body : truncatedText}
                  {comment.body.length > 300 && (
                    <Text style={styles.readMoreText}>
                      {isReadMore ? " read less" : " read more"}
                    </Text>
                  )}
                </Text>
              </TouchableOpacity>
            </Card.Content>
            {comment.body != "Comment Deleted" && (
              <Card.Actions>
                <Reply
                  // comment={comment}
                  commentId={comment._id}
                  clientId={userId}
                  // postId={post._id}
                />
                {getUpvoteStatus(comment) ? (
                  <MaterialCommunityIcons
                    name="arrow-up-bold"
                    size={24}
                    color="black"
                    onPress={() => removeUpvote(comment._id)}
                  />
                ) : (
                  <MaterialCommunityIcons
                    name="arrow-up-bold-outline"
                    size={24}
                    color="black"
                    onPress={() => addUpvote(comment._id)}
                  />
                )}
                {getDownvoteStatus(comment) ? (
                  <MaterialCommunityIcons
                    name="arrow-down-bold"
                    size={24}
                    color="black"
                    onPress={() => removeDownvote(comment._id)}
                  />
                ) : (
                  <MaterialCommunityIcons
                    name="arrow-down-bold-outline"
                    size={24}
                    color="black"
                    onPress={() => addDownvote(comment._id)}
                  />
                )}
              </Card.Actions>
            )}
            {comment.replies.map((reply) => {
              return (
                <Card style={styles.card}>
                  <Card.Content style={styles.cardContent}>
                    <View style={styles.titleContainer}>
                      {/* <Avatar.Image
                        size={40}
                        source={reply.clientId.profilePicture}
                        style={styles.avatarIcon}
                      /> */}
                      <View style={styles.textContainer}>
                        <Text style={styles.titleText}>
                          {reply.therapistId
                            ? `@${reply.therapistId.firstName} ${reply.therapistId.lastName}`
                            : `@${reply.clientId.firstName} ${reply.clientId.lastName}`}
                        </Text>
                        <TouchableOpacity
                          style={styles.optionsIcon}
                          onPress={toggleModal}
                        >
                          <Entypo
                            name="dots-three-vertical"
                            size={24}
                            color="black"
                          />
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
                                    id: reply._id,
                                    clientId: userId,
                                    type: "comment",
                                  });
                                }}
                              >
                                <Text style={styles.optionText}>
                                  Report Comment
                                </Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                        </Modal>
                        <Text style={styles.subtitleText}>
                          {dateConversion(comment.createdAt)}
                        </Text>
                      </View>
                    </View>
                    <Text variant="titleLarge">{reply.title}</Text>
                    <Text style={styles.bodyText}>
                      {isReadMore ? reply.body : truncatedText}
                      {reply.body.length > 300 && (
                        <Text style={styles.readMoreText}>
                          {isReadMore ? " read less" : " read more"}
                        </Text>
                      )}
                    </Text>
                  </Card.Content>

                  {/* {reply.body != "Comment Deleted" && (
                  <Card.Actions>
                    {userId == reply.clientId._id && (
                      <TouchableOpacity
                        onPress={() => deleteComment(reply._id)}
                      >
                        <AntDesign name="delete" size={24} color="black" />
                      </TouchableOpacity>
                    )}
                    <Comment commentId={comment._id} clientId={userId} />
                    {getUpvoteStatus(comment) ? (
                      <MaterialCommunityIcons
                        name="arrow-up-bold"
                        size={24}
                        color="black"
                        onPress={() => removeUpvote(comment._id)}
                      />
                    ) : (
                      <MaterialCommunityIcons
                        name="arrow-up-bold-outline"
                        size={24}
                        color="black"
                        onPress={() => addUpvote(comment._id)}
                      />
                    )}
                    {getDownvoteStatus(comment) ? (
                      <MaterialCommunityIcons
                        name="arrow-down-bold"
                        size={24}
                        color="black"
                        onPress={() => removeDownvote(comment._id)}
                      />
                    ) : (
                      <MaterialCommunityIcons
                        name="arrow-down-bold-outline"
                        size={24}
                        color="black"
                        onPress={() => addDownvote(comment._id)}
                      />
                    )}
                  </Card.Actions>
                )} */}
                </Card>
              );
            })}
          </Card>
        )

        // </ScrollView>
      }

      {comment.clientId && (
        // <View>
        //   <Text>{comment.body}</Text>
        // </View>
        <Card style={styles.card}>
          <Card.Content style={styles.cardContent}>
            <View style={styles.titleContainer}>
              <Avatar.Image
                size={40}
                source={comment.clientId.profilePicture}
                style={styles.avatarIcon}
              />
              <View style={styles.textContainer}>
                <Text style={styles.titleText}>
                  {`@${comment.clientId.firstName} ${comment.clientId.lastName}`}
                </Text>
                {comment.body !== "Comment Deleted" && (
                  <>
                    {userId === comment.clientId._id ? (
                      <>
                        <TouchableOpacity
                          style={styles.optionsIcon}
                          onPress={toggleModal}
                        >
                          <Entypo
                            name="dots-three-vertical"
                            size={24}
                            color="black"
                          />
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
                                  deleteComment(comment._id);
                                }}
                              >
                                <Text style={styles.optionText}>
                                  Delete Comment
                                </Text>
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
                          <Entypo
                            name="dots-three-vertical"
                            size={24}
                            color="black"
                          />
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
                                    id: comment._id,
                                    clientId: userId,
                                    type: "comment",
                                  });
                                }}
                              >
                                <Text style={styles.optionText}>
                                  Report Comment
                                </Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                        </Modal>
                      </>
                    )}
                  </>
                )}
                <Text style={styles.subtitleText}>
                  {dateConversion(comment.createdAt)}
                </Text>
              </View>
            </View>
            {/* <Text variant="titleLarge">{comment.title}</Text> */}

            <Text style={styles.bodyText}>
              {isReadMore ? comment.body : truncatedText}
              {comment.body.length > 300 && (
                <TouchableWithoutFeedback onPress={toggleReadMore}>
                  <Text style={styles.readMoreText}>
                    {isReadMore ? " read less" : " read more"}
                  </Text>
                </TouchableWithoutFeedback>
              )}
            </Text>
          </Card.Content>
          {comment.body != "Comment Deleted" && (
            <Card.Actions>
              <Reply commentId={comment._id} clientId={userId} />
              {getUpvoteStatus(comment) ? (
                <MaterialCommunityIcons
                  name="arrow-up-bold"
                  size={24}
                  color="black"
                  onPress={() => removeUpvote(comment._id)}
                />
              ) : (
                <MaterialCommunityIcons
                  name="arrow-up-bold-outline"
                  size={24}
                  color="black"
                  onPress={() => addUpvote(comment._id)}
                />
              )}
              {getDownvoteStatus(comment) ? (
                <MaterialCommunityIcons
                  name="arrow-down-bold"
                  size={24}
                  color="black"
                  onPress={() => removeDownvote(comment._id)}
                />
              ) : (
                <MaterialCommunityIcons
                  name="arrow-down-bold-outline"
                  size={24}
                  color="black"
                  onPress={() => addDownvote(comment._id)}
                />
              )}
            </Card.Actions>
          )}
          {comment.replies.map((reply) => {
            return (
              <Card style={styles.card}>
                <Card.Content style={styles.cardContent}>
                  <View style={styles.titleContainer}>
                    {/* <Avatar.Image
                      size={40}
                      source={comment.clientId.profilePicture}
                      style={styles.avatarIcon}
                    /> */}
                    <View style={styles.textContainer}>
                      <Text style={styles.titleText}>
                        {reply.therapistId
                          ? `@${reply.therapistId.firstName} ${reply.therapistId.lastName}`
                          : `@${reply.clientId.firstName} ${reply.clientId.lastName}`}
                      </Text>
                      <TouchableOpacity
                        style={styles.optionsIcon}
                        onPress={toggleModal}
                      >
                        <Entypo
                          name="dots-three-vertical"
                          size={24}
                          color="black"
                        />
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
                                  id: reply._id,
                                  clientId: userId,
                                  type: "comment",
                                });
                              }}
                            >
                              <Text style={styles.optionText}>
                                Report Comment
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </Modal>
                      <Text style={styles.subtitleText}>
                        {dateConversion(comment.createdAt)}
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity>
                    <Text variant="titleLarge">{reply.title}</Text>
                    <Text style={styles.bodyText}>
                      {isReadMore ? reply.body : truncatedText}
                      {reply.body.length > 300 && (
                        <TouchableWithoutFeedback onPress={toggleReadMore}>
                          <Text style={styles.readMoreText}>
                            {isReadMore ? " read less" : " read more"}
                          </Text>
                        </TouchableWithoutFeedback>
                      )}
                    </Text>
                  </TouchableOpacity>
                </Card.Content>
                {/* {reply.body != "Comment Deleted" && (
                  <Card.Actions>
                    {userId == reply.clientId._id && (
                      <TouchableOpacity
                        onPress={() => deleteComment(reply._id)}
                      >
                        <AntDesign name="delete" size={24} color="black" />
                      </TouchableOpacity>
                    )}
                    <Comment commentId={comment._id} clientId={userId} />
                    {getUpvoteStatus(comment) ? (
                      <MaterialCommunityIcons
                        name="arrow-up-bold"
                        size={24}
                        color="black"
                        onPress={() => removeUpvote(comment._id)}
                      />
                    ) : (
                      <MaterialCommunityIcons
                        name="arrow-up-bold-outline"
                        size={24}
                        color="black"
                        onPress={() => addUpvote(comment._id)}
                      />
                    )}
                    {getDownvoteStatus(comment) ? (
                      <MaterialCommunityIcons
                        name="arrow-down-bold"
                        size={24}
                        color="black"
                        onPress={() => removeDownvote(comment._id)}
                      />
                    ) : (
                      <MaterialCommunityIcons
                        name="arrow-down-bold-outline"
                        size={24}
                        color="black"
                        onPress={() => addDownvote(comment._id)}
                      />
                    )}
                  </Card.Actions>
                )} */}
              </Card>
            );
          })}
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
    color: "black", // Adjust the color as needed
    marginVertical: 10,
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
export default SingleComment;
