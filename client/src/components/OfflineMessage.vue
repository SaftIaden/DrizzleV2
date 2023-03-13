<template>
  <div class="text-center justify-center items-center q-pa-lg">
    <q-icon name="fa-solid fa-droplet-slash" class="offline-color" size="4rem"></q-icon>
    <span class="block offline-color text-smaller font-kanit q-mt-sm">Drizzle can't connect to the Internet</span>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.offline-color {
  color: rgba(219, 230, 255, 0.6);
}
</style>
