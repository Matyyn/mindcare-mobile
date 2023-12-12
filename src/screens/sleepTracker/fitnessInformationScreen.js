import React, { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import * as Location from "expo-location";
import { Accelerometer } from "expo-sensors";
import axios from "axios";
import useStore from "../zustand/store";
import color from "../../constants/colors";
import { trackEvent } from "@aptabase/react-native";

export default function App() {
  const [mapRegion, setMapRegion] = useState({
    latitude: 33.651592,
    longitude: 73.156456,
    latitudeDelta: 0.04,
    longitudeDelta: 0.05,
  });
  const [errorMsg, setErrorMsg] = useState(null);

  const userLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Location Permission not Granted");
      return;
    }
    let location = await Location.getCurrentPositionAsync({
      enableHighAccuracy: true,
    });
    setMapRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.04,
      longitudeDelta: 0.05,
    });
  };

  useEffect(() => {
    trackEvent("Fitness Information");
    userLocation();
  }, []);

  const [isAccelerometerAvailable, setIsAccelerometerAvailable] =
    useState(false);
  const [stepCount, setStepCount] = useState(0);

  useEffect(() => {
    let subscription;

    Accelerometer.isAvailableAsync().then((result) => {
      setIsAccelerometerAvailable(result);
    });

    if (isAccelerometerAvailable) {
      subscription = Accelerometer.addListener((accelerometerData) => {
        const { x, y, z } = accelerometerData;
        const acceleration = Math.sqrt(x * x + y * y + z * z);
        const stepThreshold = 1.2;
        if (acceleration > stepThreshold) {
          setStepCount((prevCount) => prevCount + 1);
        }
      });
    }

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, [isAccelerometerAvailable]);

  const stepLengthMeters = 0.7;
  const distanceTraveledKm = (stepCount * stepLengthMeters) / 1000;
  //const bmi = 23.5;
  const { responseData } = useStore();
  const [bmi, setBmi] = useState(0);
  const [weight, setWeight] = useState(0);
  useEffect(() => {
    async function getBMI() {
      const response = await axios.get(`/fitness-tracker/${responseData._id}`);
      ////console.log(response.data.data)
      const array = response.data.data;
      const firstBmi = array[0].bmi;
      const firstWeight = array[0].weight;
      setBmi(firstBmi.toFixed(2));
      setWeight(firstWeight.toFixed(2));
      // //console.log(firstBmi)
    }
    getBMI();
  }, []);
  const calculateCaloriesBurned = () => {
    const metValue = 3.9;

    const bmr = 88.362 + 13.397 * weight;

    const caloriesBurned = (bmr / 24) * metValue * stepCount;

    const caloriesBurnedKcal = caloriesBurned / 1000;

    return Math.round(caloriesBurnedKcal);
  };

  const caloriesBurnt = calculateCaloriesBurned();

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <MapView style={styles.map} region={mapRegion}>
          <Marker coordinate={mapRegion} title="Marker" />
        </MapView>
        {errorMsg && <Text style={styles.errorText}>{errorMsg}</Text>}
        <TouchableOpacity onPress={userLocation} style={styles.locationButton}>
          <Text style={styles.locationButtonText}>Get Location</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.statsContainer}>
        <Text style={styles.statsTitle}>Stats</Text>
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statTitle}>Steps Count</Text>
            <Text style={styles.statValue}>{stepCount}</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statTitle}>Distance Traveled (km)</Text>
            <Text style={styles.statValue}>
              {distanceTraveledKm.toFixed(2)}
            </Text>
          </View>
        </View>
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statTitle}>BMI</Text>
            <Text style={styles.statValue}>{bmi}</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statTitle}>Calories Burnt (Kcal)</Text>
            <Text style={styles.statValue}>{caloriesBurnt}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    flex: 1,
    marginTop: 20,
    marginHorizontal: 20,
  },
  map: {
    flex: 1,
    borderRadius: 10,
  },
  locationButton: {
    backgroundColor: color.grey,
    width: "100%",
    paddingVertical: 15,
    paddingHorizontal: 2,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginVertical: 10,
  },
  locationButtonText: {
    fontWeight: "bold",
    color: "white",
    backgroundColor:'#2D3748',
    fontSize: 18,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginVertical: 10,
  },
  statsContainer: {
    flex: 1,
    backgroundColor: "white",
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  statsTitle: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 15,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 8,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  statTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  statValue: {
    fontSize: 24,
    color: "#333",
  },
});
