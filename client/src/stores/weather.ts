import axios from 'axios';
import { defineStore } from 'pinia';
import type { currentWeather } from '../types';

const useWeatherStore = defineStore('weatherStore', {
  state: () => ({
    pending: true,
    currentWeatherData: null as currentWeather | null,
  }),
  actions: {
    async getCurrentWeatherData(lat: number, long: number) {
      const { data }: { data: currentWeather } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${import.meta.env.VITE_OPEN_WEATHER_API_KEY}&units=metric`);
      data.dt *= 1000;
      this.currentWeatherData = data;
      this.pending = false;
    },
  },
});

export default useWeatherStore;
