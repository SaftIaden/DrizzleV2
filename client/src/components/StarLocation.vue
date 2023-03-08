<template>
  <div>
    <q-btn @click="toLastStar" flat round color="accent" icon="fa-solid fa-chevron-left" size=".5rem" />

    <q-btn v-if="!starred" @click="starLocation" flat round color="accent" icon="fa-regular fa-star" size=".5rem" />
    <q-btn v-else @click="unstarLocation" flat round color="accent" icon="fa-solid fa-star" size=".5rem" />

    <q-btn @click="toNextStar" flat round color="accent" icon="fa-solid fa-chevron-right" size=".5rem" />
  </div>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue';
import { useWeatherStore, useUserStore } from '../stores';

const weatherStore = useWeatherStore();
const userStore = useUserStore();

const starred: Ref<boolean> = ref(false);

function starLocation(): void {
  starred.value = true;
  if (weatherStore.currentWeatherData) userStore.preferences?.starredLocations.push({ lat: weatherStore.currentWeatherData.coord.lat, long: weatherStore.currentWeatherData.coord.lon });
  else starred.value = false;
}

function unstarLocation(): void {
  const index: number = userStore.preferences.starredLocations.findIndex(({ lat, long }) => lat === weatherStore.currentWeatherData?.coord.lat && long === weatherStore.currentWeatherData.coord.lon);
  userStore.preferences.starredLocations.splice(index, 1);

  starred.value = false;
}

function toFirstStar() {
  if (userStore.preferences.starredLocations.length === 0) return;

  const { lat, long } = userStore.preferences.starredLocations[0];
  weatherStore.getWeatherForLocationByCoords(lat, long);
}

function toLastStar() {
  const index: number = userStore.preferences.starredLocations.findIndex(({ lat, long }) => lat === weatherStore.currentWeatherData?.coord.lat && long === weatherStore.currentWeatherData.coord.lon);

  if (index === 0) return;
  if (index === -1) {
    toFirstStar();
    return;
  }

  const { lat, long } = userStore.preferences.starredLocations[index - 1];
  weatherStore.getWeatherForLocationByCoords(lat, long);
}

function toNextStar() {
  const index: number = userStore.preferences.starredLocations.findIndex(({ lat, long }) => lat === weatherStore.currentWeatherData?.coord.lat && long === weatherStore.currentWeatherData.coord.lon);

  if (index === userStore.preferences.starredLocations.length - 1) return;
  if (index === -1) {
    toFirstStar();
    return;
  }

  const { lat, long } = userStore.preferences.starredLocations[index + 1];
  weatherStore.getWeatherForLocationByCoords(lat, long);
}

weatherStore.$subscribe((mutation, { pendingCurrent, pendingForecast, currentWeatherData }) => {
  if (!pendingCurrent && !pendingForecast) {
    if (userStore.preferences.starredLocations.find(({ lat, long }) => lat === currentWeatherData?.coord.lat && long === currentWeatherData.coord.lon)) starred.value = true;
    else starred.value = false;
  }
});
</script>
