<template>
  <q-layout>
    <q-page-container>
      <SearchBar></SearchBar>
      <QuickWeatherInfo></QuickWeatherInfo>
      <ForecastWeather></ForecastWeather>
      <ContextBadgeList></ContextBadgeList>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import SearchBar from '@/components/SearchBar.vue';
import QuickWeatherInfo from '@/components/QuickWeatherInfo.vue';
import ForecastWeather from '@/components/ForecastWeather.vue';
import ContextBadgeList from '@/components/ContextBadgeList.vue';
</script>
