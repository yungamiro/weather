import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
const getIcon = (icon) => `https://openweathermap.org/img/wn/${icon}@2x.png`;

export default function Weather({ forecast }) {
  return (
    <View style={styles.container}>
      <Text style={styles.hour}>{forecast.hour}:00</Text>
      <Image
        source={{ uri: getIcon(forecast?.icon) }}
        style={styles.image}
      ></Image>
      <Text style={styles.temp}>{forecast.temp}°C</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    width: 75,
    height: 140,
    paddingVertical: 6,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginRight: 10,
    borderRadius: 50,
  },
  image: {
    width: 50,
    height: 50,
  },
  temp: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
