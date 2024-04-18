import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { format } from "date-fns";
import Weather from "./Weather";

export default function Forecast({ data }) {
  const [forecasts, setForecasts] = useState([]);

  useEffect(() => {
    if (!data || !data.list) {
      console.error("Data or data.list is missing!");
      return;
    }

    const forecastData = data.list.map((f) => {
      const dt = new Date(f.dt * 1000);
      return {
        date: dt,
        hour: dt.getHours(),
        temp: Math.round(f.main.temp),
        icon: f.weather[0].icon,
        name: format(dt, "EEEE"),
      };
    });

    let newForecastData = forecastData
      .map((forecast) => {
        return forecast.name;
      })
      .filter((day, index, self) => {
        return self.indexOf(day) === index;
      })
      .map((day) => {
        return {
          day,
          data: forecastData.filter((forecast) => forecast.name === day),
        };
      });

    setForecasts(newForecastData);
  }, [data]);

  return (
    <ScrollView
      style={styles.scroll}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {forecasts.map((f, index) => (
        <View key={index}>
          <Text style={styles.day}>{f.day.toUpperCase()}</Text>
          <View style={styles.container}>
            {f.data.map((w, innerIndex) => (
              <Weather key={`${index}-${innerIndex}`} forecast={w} />
            ))}
          </View>
        </View>
      ))}
    </ScrollView>
  );
  
}

const styles = StyleSheet.create({
  scroll: {
    width: "100%",
    height: "35%",
  },
  day: {
    color: "#fff",
    fontSize:16,
    fontWeight:"bold",
    marginBottom:10,
    marginLeft:5,
  },
  container:{
    flexDirection:"row",
    marginLeft:5,
    marginRight:15,
  }
});
