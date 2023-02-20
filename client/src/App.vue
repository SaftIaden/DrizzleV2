<template>
  <q-layout>
    <q-page-container>
      <RouterView />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';
import { useWeatherStore } from './stores';
import { getLocation } from './composables';

const weatherStore = useWeatherStore();

onMounted(async () => {
  try {
    const pos = await getLocation({ enableHighAccuracy: true });
    weatherStore.getCurrentWeatherData(pos.coords.latitude, pos.coords.longitude);
  } catch (error) {
    console.log(error);
    weatherStore.getCurrentWeatherData(40.73061, -73.935242);
  }
});
</script>

<style lang="sass">
@font-face
  font-family: "Kanit Medium"
  src: url("/fonts/Kanit/Kanit-Medium.ttf") format('truetype')
  font-display: swap

@font-face
  font-family: "Kanit Light"
  src: url("/fonts/Kanit/Kanit-Light.ttf") format('truetype')
  font-display: swap

@font-face
  font-family: "Kanit"
  src: url("/fonts/Kanit/Kanit-Regular.ttf") format('truetype')
  font-display: swap

body
  background-color: $dark
</style>
