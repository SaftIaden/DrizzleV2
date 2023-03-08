<template>
  <div>
    <q-btn flat round color="accent" icon="fa-solid fa-chevron-left" size=".5rem" />

    <q-btn v-if="!starred" @click="starLocation" flat round color="accent" icon="fa-regular fa-star" size=".5rem" />
    <q-btn v-else @click="unstarLocation" flat round color="accent" icon="fa-solid fa-star" size=".5rem" />

    <q-btn flat round color="accent" icon="fa-solid fa-chevron-right" size=".5rem" />
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

function unstarLocation(): void {}

weatherStore.$subscribe((mutation, { pendingCurrent, pendingForecast, currentWeatherData }) => {
  if (!pendingCurrent && !pendingForecast) {
    if (userStore.preferences.starredLocations.find(({ lat, long }) => lat === currentWeatherData?.coord.lat && long === currentWeatherData.coord.lon)) starred.value = true;
    else starred.value = false;
  }
});
</script>
