import axios from 'axios';
import { defineStore } from 'pinia';
import type { currentWeather } from '../types';

const useWeatherStore = defineStore('weatherStore', {
  state: () => ({
    pending: true,
    currentWeatherData: null as currentWeather | null,
  }),
  actions: {
    async getCurrentWeatherData(lat: number = 40.73061, long: number = -73.935242) {
      this.pending = true;

      const { data }: { data: currentWeather } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${import.meta.env.VITE_OPEN_WEATHER_API_KEY}&units=metric`);

      data.dt *= 1000;
      this.currentWeatherData = data;
      this.pending = false;
    },

    async getCurrentWeatherDataByLocation(locationStr: string) {
      this.pending = true;

      const res = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${locationStr}&limit=5&appid=${import.meta.env.VITE_OPEN_WEATHER_API_KEY}`);
      const { lat, lon: long } = res.data[0];

      const { data }: { data: currentWeather } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${import.meta.env.VITE_OPEN_WEATHER_API_KEY}&units=metric`);

      data.dt *= 1000;
      this.currentWeatherData = data;
      this.pending = false;
    },
  },
});

export default useWeatherStore;
