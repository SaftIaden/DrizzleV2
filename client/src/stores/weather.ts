import axios from 'axios';
import { defineStore } from 'pinia';
import type { currentWeather, forecast } from '../types';

const useWeatherStore = defineStore('weatherStore', {
  state: () => ({
    pendingCurrent: true,
    pendingForecast: true,
    currentWeatherData: null as currentWeather | null,
    forecastData: null as forecast | null,
  }),

  actions: {
    async getCurrentWeatherData(lat: number = 40.73061, long: number = -73.935242) {
      this.pendingCurrent = true;

      const { data }: { data: currentWeather } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${import.meta.env.VITE_OPEN_WEATHER_API_KEY}&units=metric`);

      data.dt *= 1000;
      this.currentWeatherData = data;
      this.pendingCurrent = false;
    },

    async getForecast(lat: number = 40.73061, long: number = -73.935242) {
      this.pendingForecast = true;

      const { data }: { data: forecast } = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${import.meta.env.VITE_OPEN_WEATHER_API_KEY}&units=metric`);

      for (const forecastItem of data.list) {
        forecastItem.dt *= 1000;
      }
      this.forecastData = data;
      this.pendingForecast = false;
    },

    async getWeatherForLocation(locationStr: string) {
      this.pendingCurrent = true;

      const res = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${locationStr}&limit=5&appid=${import.meta.env.VITE_OPEN_WEATHER_API_KEY}`);
      const { lat, lon: long } = res.data[0];

      this.getCurrentWeatherData(lat, long);
      this.getForecast(lat, long);
    },
  },
});

export default useWeatherStore;
