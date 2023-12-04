import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';

const Card = ({ imageSource, title, cardTitle, cardText ,navigation}) => {
  return (
    <View style={styles.container}>      
        <View style={styles.leftContainer}>
          <Image source={{uri:imageSource}} style={styles.image} />
        </View>
        <View style={styles.rightContainer}>
          <Text style={styles.cardTitle}>{cardTitle}</Text>
          <Text style={styles.cardAdditionalText}>{cardText}</Text>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate(title)}>
            <Text style={styles.buttonText}>{title}</Text>
          </TouchableOpacity>
        </View>      
    </View>
  );
};

const Carousel = ({ navigation }) => {
  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>      
      <View>
        <Text style={styles.title}>Anxiety Test</Text>
        <Text style={styles.additionalText}>Perform the test in 3-5 mins</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Anxiety Test')}>
          <Card
            imageSource="https://img.freepik.com/premium-vector/online-test-with-thumbs-up-icons-workplace-illustration-vector-illustration_627993-407.jpg?w=2000"
            title="Anxiety Test"
            cardTitle="Anxiety Test"
            cardText="Discover what issues are you facing."
            navigation={navigation}
          />
        </TouchableOpacity>
      </View>

      <View>
        <Text style={styles.title}>Depression Test</Text>
        <Text style={styles.additionalText}>Perform the test in 3-5 mins</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Depression Test')}>
          <Card
            imageSource="https://img.freepik.com/premium-vector/online-test-with-thumbs-up-icons-workplace-illustration-vector-illustration_627993-407.jpg?w=2000"
            title="Depression Test"
            cardTitle="Depression Test"
            cardText="Discover what issues are you facing."
            navigation={navigation}
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  container: {
    flexDirection: 'row',
    height: 170,
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: 'grey',
    borderRadius: 15,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 10,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  additionalText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#888',
    marginBottom: 10,
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'space-between',
    height: 200,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  cardTitle: {
    fontSize: 16,
    marginBottom:10,
    fontWeight: 'bold',
    color: 'white',
  },
  cardAdditionalText: {
    fontSize: 14,
    color: 'white',
    marginBottom:15,
    marginBottom: 5,
  },
  button: {
    padding: 17,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 15,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardContainer: {
    flexDirection: 'row',
    overflow: 'hidden',
  },
  leftContainer: {
    padding: 10,
    aspectRatio: 1,
    backgroundColor: 'grey',
  },
  rightContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  image: {
    width: 120,
    backgroundColor: '#fff',
    height: 120,
    resizeMode: 'contain',
    borderRadius: 10,
  },
});

export default Carousel;
