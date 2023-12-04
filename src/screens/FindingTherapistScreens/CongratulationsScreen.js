import React from 'react';
import { TouchableOpacity, View, Text, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CongratulationsScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.centerContent}>
        <Image
          source={{
            uri: 'https://firebasestorage.googleapis.com/v0/b/mind-care-b5645.appspot.com/o/images%2FHappy%20Earth-cuate.png?alt=media&token=c8ce0606-7eba-44c9-bf92-8d0c785f0669',
          }}
          style={styles.image}
        />
        <Text style={styles.congratsText}>Congratulations on booking an appointment!</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate('Sessions');
          }}>
          <Text style={styles.buttonText}>Okay Got It!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  centerContent: {
    alignItems: 'center',
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 125,
    resizeMode: 'contain',
  },
  congratsText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  button: {
    backgroundColor: '#2D3748',
    paddingVertical: 16,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 22,
    fontWeight: '700',
    color: 'white',
    textAlign: 'center',
  },
});

export default CongratulationsScreen;
