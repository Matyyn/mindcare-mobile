import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Image, Text } from "react-native";
// import Checkbox from "expo-checkbox";

const SetReminderCard = ({ title, image, radioBox }) => {
  const [isSelected, setSelection] = useState(false);

  const check = () => {
    console.log("hello");
    console.log(image);
  };
  return (
    <View style={styles.cardContainer}>
      {/* <TouchableOpacity onPress={check}> */}
      {/*     <Checkbox value={isSelected} onValueChange={setSelection} /> */}
      <Image
        resizeMode="contain"
        style={{
          height: "70%",
          width: "70%",
          alignSelf: "center",
        }}
        source={{
          uri: image,
        }}
      />

      <Text style={{ textAlign: "center", marginTop: 2 }}>{title}</Text>
      {/* </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: 110,
    height: 135,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "white",
    elevation: 5,
  },
});

export default SetReminderCard;
