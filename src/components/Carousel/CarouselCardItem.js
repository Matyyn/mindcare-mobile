import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import color from "../../constants/colors";
import { useNavigation } from "@react-navigation/native";

export const SLIDER_WIDTH = Dimensions.get("window").width + 0;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.9);

const CarouselCardItem = ({ item, index }) => {
  // const navigation = useNavigation();

  return (
    <View style={styles.container} key={index}>
      <TouchableOpacity
        onPress={() => {
          // navigation.navigate(`${item.screenName}`);
          // console.log("item: ", item.screenName);
        }}
      >
        <Text style={styles.header}>{item.title}</Text>
        <Image source={item.imgUrl} style={styles.image} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.grey,
    borderRadius: 8,
    width: ITEM_WIDTH,
    // paddingBottom: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  image: {
    width: 150,
    height: 150,
    alignSelf: "flex-end",
  },
  header: {
    color: "white",
    fontSize: 20,
    fontWeight: 500,
    paddingLeft: 20,
    paddingTop: 20,
  },
});

export default CarouselCardItem;
