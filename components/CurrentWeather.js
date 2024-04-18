import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { isSameDay } from "date-fns";
const getIcon = (icon) => `https://openweathermap.org/img/wn/${icon}@4x.png`;
export default function CurrentWeather({ data }) {
  const [currentWeather, setCurrentWeather] = useState(null);

  useEffect(() => {
    if (data && data.list && data.city) {
      const today = new Date();
      const liveWeather = data.list.filter((forecast) => {
        const forecastDate = new Date(forecast.dt * 1000);
        return isSameDay(today, forecastDate);
      });
      setCurrentWeather(liveWeather[0]);
    }
  }, [data]);

  if (!currentWeather) {
    return (
      <View style={styles.container}>
        <Text>Loading weather...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.city}>
        {data?.city?.name || "City Name Not Available"}
      </Text>
      <Text style={styles.today}>Today</Text>
      <Image
        source={{ uri: getIcon(currentWeather.weather[0].icon) }}
        style={styles.image}
      ></Image>
      <Text style={styles.temps}>
        {Math.round(currentWeather?.main?.temp)}°C
      </Text>
      <Text style={styles.description}>
        {currentWeather?.weather[0]?.description}
      </Text>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    alignItems: "center",
    height: "65%",
  },
  city: {
    fontSize: 36,
    fontWeight: 500,
    color: "#ffffff",
  },
  today: {
    fontSize: 24,
    fontWeight: 300,
    color:  "#ffffff",
  },
  image: {
    width: 150,
    height: 150,
    marginVertical: 20,
  },
  temps: {
    fontSize: 80,
    fontWeight: "bold",
    color: "#ffffff",
  },
  description: {
    fontSize: 24,
    fontWeight: "bold",
    color:  "#ffffff",
  },
});
