import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CreatePost from "./community forum/CreatePost";
import MainScreen from "./community forum/CommunityForumMainScreen";
import PostComments from "./community forum/postComments";
import Report from "./community forum/Report";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="main screen"
        component={MainScreen}
        options={{ title: "Forum" }}
      />
      <Stack.Screen name="create post" component={CreatePost} />
      <Stack.Screen name="post comments" component={PostComments} />
      <Stack.Screen
        name="report"
        component={Report}
        options={{ title: "Report an issue" }}
      />
    </Stack.Navigator>
  );
};
export default Navigation;
