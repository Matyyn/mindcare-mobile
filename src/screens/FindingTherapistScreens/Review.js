import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import StarRating from 'react-native-star-rating';

const RatingScreen = () => {
  const [starCount, setStarCount] = useState(0);

  const handleStarPress = (rating) => {
    setStarCount(rating);
  };

  const handleSubmit = () => {

    console.log('Selected Rating:', starCount);

  };

  return (
    <View style={styles.container}>
  <Text style={styles.title}>Rate Your Experience</Text>

  <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
  <StarRating
        disabled={false}
        maxStars={5}
        rating={starCount}
        selectedStar={handleStarPress}
        starSize={40}
        fullStarColor="gold"
        starStyle={{ marginRight: 20 }} 
      />
  </View>

  <TouchableOpacity
    onPress={handleSubmit}
    style={[
      styles.button,
      {
        backgroundColor: starCount === 0 ? '#A0A0A0' : '#2D3748',
      },
    ]}
    disabled={starCount === 0}
  >
    <Text style={styles.buttonText}>Submit Rating</Text>
  </TouchableOpacity>
</View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    marginTop: 30,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default RatingScreen;