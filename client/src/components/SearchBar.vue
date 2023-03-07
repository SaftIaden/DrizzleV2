<template>
  <q-form @submit.prevent="searchLocation">
    <q-input rounded dense bg-color="primary" :dark="true" placeholder="Search for Places" color="accent" class="q-mx-lg q-mt-lg font-kanit" outlined v-model="searchString">
      <template v-slot:append>
        <q-icon class="q-mx-xs" size="1rem" name="fa-solid fa-microphone-lines"></q-icon>
        <q-icon @click="searchLocation" class="cursor-click q-ml-xs" size="1rem" name="fa-solid fa-search"></q-icon>
      </template>
    </q-input>
  </q-form>
</template>

<script setup lang="ts">
import type { Ref } from 'vue';
import { ref } from 'vue';
import { useWeatherStore } from '../stores';

const weatherStore = useWeatherStore();

const searchString: Ref<string> = ref('');

async function searchLocation() {
  weatherStore.getCurrentWeatherDataByLocation(searchString.value);
}
</script>

<style scoped lang="scss">
.cursor-click {
  cursor: pointer;
}
</style>
