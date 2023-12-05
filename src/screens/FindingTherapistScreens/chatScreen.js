import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import useStore from "../zustand/store";
import { trackEvent } from "@aptabase/react-native";

const ChatScreen = ({ route }) => {
  const { responseData } = useStore();
  const { item } = route.params;
  //console.log("item", item);

  // const [chatData, setChatData] = useState([
  //   {
  //     id: "1",
  //     username: "John",
  //     lastMessage: "Hi there!",
  //     lastMessageTime: "10:30 AM",
  //     messages: [],
  //   },
  //   {
  //     id: "2",
  //     username: "Alice",
  //     lastMessage: "How are you?",
  //     lastMessageTime: "11:15 AM",
  //     messages: [],
  //   },
  //   // Add more chat data as needed
  // ]);

  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [therapistMessages, setTherapistMessages] = useState([]);
  const messageObject = {
    message: message,
    senderRole: "client",
    recieverRole: "therapist",
    senderId: responseData._id,
    recieverId: item._id,
    timeStamp: new Date().toLocaleTimeString(),
  };
  useEffect(() => {
    trackEvent("Chat Screen");
    const newSocket = io.connect(
      "https://mind-care-backend-7dd9b4794b38.herokuapp.com",
    );
    setSocket(newSocket);
    newSocket.emit("addUser", messageObject);
    newSocket.on("get-message", (message) => {
      setMessages((messages) => [...messages, message]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (socket) {
      //console.log(messageObject);
      socket.emit("send-message", messageObject);
      setMessage("");
    }
  };

  const [selectedChat, setSelectedChat] = useState(true);

  const array = [...messages];
  const sortedMessages = array.sort((a, b) => {
    const timestampA = new Date(a.timeStamp).getTime();
    const timestampB = new Date(b.timeStamp).getTime();
    return timestampB - timestampA;
  });
  const handleChatPress = (chatId) => {
    setSelectedChat(chatId);
  };

  const handleBack = () => {
    setSelectedChat(null);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.chatItem}
      onPress={() => handleChatPress(item.id)}
    >
      <Text style={styles.username}>{item.username}</Text>
      <Text style={styles.lastMessage}>{item.lastMessage}</Text>
      <Text style={styles.lastMessageTime}>{item.lastMessageTime}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* {selectedChat ? (
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Text style={styles.backButtonText}>{'<-  '}</Text>
            <Text style={styles.headerText}>{chatData.find((chat) => chat.id === selectedChat)?.username}</Text>
          </TouchableOpacity>
        </View>
      ) : null} */}
      {selectedChat && (
        <KeyboardAvoidingView
          // behavior="padding"
          style={styles.chatContainer}
        >
          <ScrollView
            ref={(ref) => {
              this.scrollView = ref;
            }}
            onContentSizeChange={() => {
              this.scrollView.scrollToEnd({ animated: true });
            }}
          >
            {sortedMessages.map((message, index) => (
              <View
                style={{
                  backgroundColor: "#575f6d",
                  padding: 10,
                  fontSize: 20,
                  borderRadius: 10,
                  color: "white",
                  alignSelf:
                    message.senderRole === "client" ? "flex-end" : "flex-start",
                }}
              >
                <Text
                  key={index}
                  style={{
                    textAlign:
                      message.senderRole === "client" ? "right" : "left",
                    color: "white",
                    fontSize: 18,
                  }}
                >
                  {message.message}
                </Text>
                <Text
                  style={{ textAlign: "right", fontSize: 12, color: "white" }}
                >
                  {message.timeStamp}
                </Text>
              </View>
            ))}

            {/* {messages.map((item, index) => (
              <View
                key={index}
                style={[styles.messageContainer, { alignSelf: "flex-start" }]}
              >
                <View
                  style={[styles.messageBubble, { backgroundColor: "#E5E5E5" }]}
                >
                  <Text style={[styles.messageText, { color: "black" }]}>
                    {item.message}
                  </Text>
                  <Text style={styles.messageTime}>{item.timeStamp}</Text>
                </View>
              </View>
            ))} */}
          </ScrollView>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Type your message..."
              value={message}
              onChangeText={setMessage}
            />
            <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
              <Text style={styles.sendButtonText}>Send</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      )}
      {/* 
      {!selectedChat && (
        <FlatList
          data={chatData}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          style={{ marginTop: 20 }}
        />
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    padding: 16,
    paddingTop: 0,
  },
  chatItem: {
    flex: 1,
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#E5E5E5",
  },
  username: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  lastMessage: {
    fontSize: 16,
    marginBottom: 4,
  },
  lastMessageTime: {
    fontSize: 14,
    color: "#888888",
  },
  chatContainer: {
    flex: 1,
    marginTop: 10,
    padding: 16,
    borderWidth: 1,
    borderColor: "#A0A0A0",
    borderRadius: 8,
  },
  sentMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#2D3748",
    padding: 8,
    borderRadius: 8,
    marginBottom: 8,
    maxWidth: "70%",
  },
  receivedMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#E5E5E5",
    padding: 8,
    borderRadius: 8,
    marginBottom: 8,
    maxWidth: "70%",
  },
  messageText: {
    color: "white",
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",

    marginBottom: 16,
  },
  input: {
    flex: 1,
    marginRight: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#A0A0A0",
    borderRadius: 8,
  },
  sendButton: {
    backgroundColor: "#2D3748",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  sendButtonText: {
    color: "white",
    padding: 4,
    fontSize: 18,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  backButton: {
    padding: 10,
    borderRadius: 5,
    flexDirection: "row",
  },
  backButtonText: {
    color: "#2D3748",
    fontWeight: "bold",
    fontSize: 22,
  },
  headerText: {
    color: "#2D3748",
    fontSize: 22,
    fontWeight: "bold",
  },

  messageContainer: {
    marginBottom: 8,
    maxWidth: "70%",
  },
  messageBubble: {
    padding: 8,
    borderRadius: 8,
    maxWidth: "100%",
  },
  messageText: {
    fontSize: 16,
  },
  messageTime: {
    color: "#888888",
    fontSize: 12,
    alignSelf: "flex-end",
  },
});

export default ChatScreen;
