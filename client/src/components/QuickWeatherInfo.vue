<template>
  <div>
    <div class="locationDisplay row q-mt-lg q-mx-lg q-pl-sm">
      <span v-if="!weatherStore.pendingCurrent" class="col-9 font-kanit-medium text-subtitle1"> {{ weatherStore.currentWeatherData?.name }}, {{ weatherStore.currentWeatherData?.sys.country }}</span>
      <q-skeleton v-else type="text" width="40%" />

      <div class="col-3 q-mt-xs text-right">
        <StarLocation></StarLocation>
      </div>
    </div>

    <div class="container q-mx-lg q-px-sm q-py-xs">
      <div v-if="weatherStore.pendingCurrent" class="row">
        <div class="col">
          <div class="row">
            <q-skeleton type="text" width="50%" />
          </div>

          <div class="row">
            <q-skeleton type="QToggle" class="q-my-sm" width="65%" height="5.5rem" />
          </div>

          <div class="row">
            <q-skeleton type="text" width="60%" />
          </div>
        </div>

        <div class="col">
          <div class="row justify-end">
            <q-skeleton type="QToggle" class="q-my-sm" width="60%" height="5rem" />
          </div>

          <div class="col">
            <div class="row">
              <div class="col text-right">
                <q-icon name="fa-solid fa-water" class="q-mr-md" />
              </div>
              <div class="col-8 justify-center">
                <q-skeleton type="text" width="30%" />
              </div>
            </div>

            <div class="row">
              <div class="col text-right">
                <q-icon name="fa-solid fa-wind" class="q-mr-md" />
              </div>
              <div class="col-8 justify-center">
                <q-skeleton type="text" width="60%" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="row">
        <div class="col">
          <div class="row">
            <span class="font-kanit-light text-smaller">updated at {{ format(weatherStore.currentWeatherData?.dt as number, 'HH:mm') }} </span>
          </div>

          <div class="row">
            <span class="text-h1 font-inter-bold">{{ Math.round(weatherStore.currentWeatherData?.main.temp as number) }}</span>
            <span class="text-subtitle1 font-inter-medium">°C</span>
          </div>

          <div class="row">
            <span class="font-kanit-light">Feels like&nbsp;</span>
            <span class="font-inter-bold"> {{ Math.round(weatherStore.currentWeatherData?.main.feels_like as number) }}°C</span>
          </div>
        </div>

        <div class="col">
          <div class="row justify-end">
            <q-img :no-spinner="true" :src="`http://openweathermap.org/img/wn/${weatherStore.currentWeatherData?.weather[0].icon}@2x.png`" width="5.5rem"></q-img>
          </div>

          <div class="col">
            <div class="row">
              <div class="col text-right">
                <q-icon name="fa-solid fa-water" class="q-mr-md" />
              </div>
              <div class="col-9 text-center">
                <span class="font-inter-medium text-body2">{{ weatherStore.currentWeatherData?.main.humidity }}</span>
                <span class="font-kanit-light text-smaller">%</span>
              </div>
            </div>

            <div class="row">
              <div class="col text-right">
                <q-icon name="fa-solid fa-wind" class="q-mr-md" />
              </div>
              <div class="col-9 text-center">
                <span class="font-inter-medium text-body2">{{ weatherStore.currentWeatherData?.wind.speed }}</span>
                <span class="font-kanit-light text-smaller">kph</span>
                <span class="font-inter-medium text-body2"> / {{ weatherStore.currentWeatherData?.wind.deg }}°</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { format } from 'date-fns';
import { useWeatherStore } from '../stores';
import StarLocation from './StarLocation.vue';

const weatherStore = useWeatherStore();
</script>

<style scoped lang="scss">
.container {
  border-radius: 15px;
  border: 1.5px solid $accent;

  background-color: $primary;
  color: $accent;
}

.locationDisplay {
  color: $accent;
}
</style>
