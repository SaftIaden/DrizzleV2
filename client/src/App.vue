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
    weatherStore.getCurrentWeatherData(40.73061, -73.935242);
  }
});
</script>

<style lang="sass">
@font-face
  font-family: "Kanit Medium"
  src: url("/fonts/Kanit/Kanit-Medium.ttf") format('truetype')
  font-display: swap

.font-kanit-medium
  font-family: "Kanit Medium"

@font-face
  font-family: "Kanit Light"
  src: url("/fonts/Kanit/Kanit-Light.ttf") format('truetype')
  font-display: swap

.font-kanit-light
  font-family: "Kanit Light"

@font-face
  font-family: "Kanit"
  src: url("/fonts/Kanit/Kanit-Regular.ttf") format('truetype')
  font-display: swap

.font-kanit
  font-family: "Kanit"

@font-face
  font-family: "Inter"
  src: url("/fonts/Inter/Inter-Regular.ttf") format("truetype")
  font-display: swap

.font-inter
  font-family: "Inter"

@font-face
  font-family: "Inter Bold"
  src: url("/fonts/Inter/Inter-Bold.ttf") format("truetype")
  font-display: swap

.font-inter-bold
  font-family: "Inter Bold"

@font-face
  font-family: "Inter Medium"
  src: url("/fonts/Inter/Inter-Medium.ttf") format("truetype")
  font-display: swap

.font-inter-medium
  font-family: "Inter Medium"

.text-smaller
  font-size: 0.7rem

body
  background-color: $dark
</style>
