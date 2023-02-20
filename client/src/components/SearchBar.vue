<template>
  <q-input rounded dense bg-color="primary" :dark="true" placeholder="Search for Places" color="accent" class="q-ma-lg font-kanit" outlined v-model="searchString">
    <template v-slot:append>
      <q-icon class="q-mx-xs" size="1rem" name="fa-solid fa-microphone-lines"></q-icon>
      <q-icon class="q-ml-xs" size="1rem" name="fa-solid fa-search"></q-icon>
    </template>
  </q-input>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const searchString = ref('');
</script>

<style scoped lang="sass">
.font-kanit
  font-family: "Kanit"
</style>
