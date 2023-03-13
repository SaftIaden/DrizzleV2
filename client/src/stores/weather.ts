import axios from 'axios';
import { defineStore } from 'pinia';
import type { currentWeather, forecast, airPollution } from '../types';

const useWeatherStore = defineStore('weatherStore', {
  state: () => ({
    pendingCurrent: true,
    pendingForecast: true,
    pendingAirPollution: true,
    currentWeatherData: null as currentWeather | null,
    currentAirPollution: null as airPollution | null,
    forecastData: null as forecast | null,
  }),

  actions: {
    async getCurrentWeatherData(lat: number = 40.73061, long: number = -73.935242) {
      this.pendingCurrent = true;

      try {
        const { data }: { data: currentWeather } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${import.meta.env.VITE_OPEN_WEATHER_API_KEY}&units=metric`);

        data.dt *= 1000;
        this.currentWeatherData = data;
        this.pendingCurrent = false;
      } catch (err) {
        this.currentWeatherData = null;
        this.pendingCurrent = false;
      }
    },

    async getForecast(lat: number = 40.73061, long: number = -73.935242) {
      this.pendingForecast = true;

      try {
        const { data }: { data: forecast } = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${import.meta.env.VITE_OPEN_WEATHER_API_KEY}&units=metric`);

        for (const forecastItem of data.list) {
          forecastItem.dt *= 1000;
        }
        this.forecastData = data;
        this.pendingForecast = false;
      } catch (err) {
        this.pendingForecast = false;
        this.forecastData = null;
      }
    },

    async getCurrentAirPollution(lat: number = 40.73061, long: number = -73.935242) {
      this.pendingAirPollution = true;

      try {
        const { data }: { data: airPollution } = await axios.get(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${long}&appid=${import.meta.env.VITE_OPEN_WEATHER_API_KEY}`);

        for (const pollutionItem of data.list) {
          pollutionItem.dt *= 1000;
        }
        this.currentAirPollution = data;
        this.pendingAirPollution = false;
      } catch (err) {
        this.pendingAirPollution = false;
        this.currentAirPollution = null;
      }
    },

    async getWeatherForLocation(locationStr: string) {
      this.pendingCurrent = true;
      this.pendingForecast = true;
      this.pendingAirPollution = true;

      try {
        const res = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${locationStr}&limit=5&appid=${import.meta.env.VITE_OPEN_WEATHER_API_KEY}`);
        const { lat, lon: long } = res.data[0];

        this.getCurrentWeatherData(lat, long);
        this.getForecast(lat, long);
        this.getCurrentAirPollution(lat, long);
      } catch (err) {
        this.pendingCurrent = false;
        this.pendingForecast = false;
        this.pendingAirPollution = false;
      }
    },

    async getWeatherForLocationByCoords(lat: number, long: number) {
      this.pendingCurrent = true;
      this.pendingForecast = true;
      this.pendingAirPollution = true;

      this.getCurrentWeatherData(lat, long);
      this.getForecast(lat, long);
      this.getCurrentAirPollution(lat, long);
    },
  },
});

export default useWeatherStore;
