<template>
  <q-layout>
    <q-page-container>
      <q-slide-transition>
        <div v-if="update" class="reloadPopup q-mx-lg q-pb-sm font-kanit text-center text-white">
          <span class="text-body1 block">There is an update!</span>
          <q-btn @click="reloadSW" dense unelevated rounded color="primary" label="reload" class="q-px-xl q-mt-sm"></q-btn>
        </div>
      </q-slide-transition>

      <RouterView />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { RouterView } from 'vue-router';
import { useWeatherStore } from './stores';
import { getLocation } from './composables';

const weatherStore = useWeatherStore();

const update = ref(false);

async function registerSW(): Promise<void> {
  const registration = await navigator.serviceWorker.getRegistration();
  if (!registration) {
    console.log('registration failed!');
    return;
  }
  registration.addEventListener('updatefound', () => (update.value = true));
  if (registration.waiting) update.value = true;
}

async function reloadSW() {
  const registration = await navigator.serviceWorker.getRegistration();
  if (registration) registration.waiting?.postMessage({ type: 'SKIP_WAITING' });
  window.location.reload();
}

onMounted(async () => {
  registerSW();

  try {
    const pos = await getLocation({ enableHighAccuracy: true });

    weatherStore.getCurrentWeatherData(pos.coords.latitude, pos.coords.longitude);
    weatherStore.getForecast(pos.coords.latitude, pos.coords.longitude);
  } catch (error) {
    weatherStore.getCurrentWeatherData();
    weatherStore.getForecast();
  }
});
</script>

<style lang="scss">
@font-face {
  font-family: 'Kanit Medium';
  src: url('/fonts/Kanit/Kanit-Medium.ttf') format('truetype');
  font-display: swap;
}

.font-kanit-medium {
  font-family: 'Kanit Medium';
}

@font-face {
  font-family: 'Kanit Light';
  src: url('/fonts/Kanit/Kanit-Light.ttf') format('truetype');
  font-display: swap;
}

.font-kanit-light {
  font-family: 'Kanit Light';
}

@font-face {
  font-family: 'Kanit';
  src: url('/fonts/Kanit/Kanit-Regular.ttf') format('truetype');
  font-display: swap;
}

.font-kanit {
  font-family: 'Kanit';
}

@font-face {
  font-family: 'Inter';
  src: url('/fonts/Inter/Inter-Regular.ttf') format('truetype');
  font-display: swap;
}

.font-inter {
  font-family: 'Inter';
}

@font-face {
  font-family: 'Inter Bold';
  src: url('/fonts/Inter/Inter-Bold.ttf') format('truetype');
  font-display: swap;
}

.font-inter-bold {
  font-family: 'Inter Bold';
}

@font-face {
  font-family: 'Inter Medium';
  src: url('/fonts/Inter/Inter-Medium.ttf') format('truetype');
  font-display: swap;
}

.font-inter-medium {
  font-family: 'Inter Medium';
}

.text-smaller {
  font-size: 0.7rem;
}

body {
  background-color: $dark;
}

.reloadPopup {
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;

  background-color: $secondary;
}
</style>
