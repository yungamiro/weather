import { Text, SafeAreaView, StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import Constants from "expo-constants";
import axios from "axios";
import CurrentWeather from "./components/CurrentWeather";
import Forecast from "./components/Forecast";

const API_KEY = Constants?.expoConfig?.extra?.EXPO_API_END_POINT;
const API_URL = (lat, lon) =>
  `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&lang=eng&units=metric`;

export default function App() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const getCoordinates = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Location permission not granted");
        return;
      }
      const userLocation = await Location.getCurrentPositionAsync();
      getWeather(userLocation);
    };

    getCoordinates();
  }, []);

  const getWeather = async (location) => {
    try {
      const response = await axios.get(
        API_URL(location.coords.latitude, location.coords.longitude)
      );
      setData(response.data);
      setLoading(false);
    } catch (e) {
      console.log("error in getWeather", e);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <CurrentWeather data={data} />
      <Forecast data={data} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#000000",
    padding: 8,
  },
});
