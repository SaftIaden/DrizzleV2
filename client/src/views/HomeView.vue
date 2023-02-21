<template>
  <q-layout>
    <q-page-container>
      <SearchBar></SearchBar>
      <QuickWeatherInfo></QuickWeatherInfo>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import SearchBar from '../components/SearchBar.vue';
import QuickWeatherInfo from '../components/QuickWeatherInfo.vue';
</script>
