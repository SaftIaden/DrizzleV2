<template>
  <div class="container q-mt-lg q-mx-lg">
    <div v-if="!weatherStore.pendingForecast" class="column">
      <div v-for="day of weatherStore.forecastData?.list.filter((li) => new Date(li.dt).getHours() === 1)" class="col row text-center forecast-day q-pa-sm" :key="day.dt">
        <span class="col-2 text-body1 font-kanit-medium text-left">{{ format(day.dt, 'eee') }}</span>
        <div class="col-3">
          <span class="text-body1 font-inter-bold">{{ Math.round(getMinMaxTempPerDay(day).maxTemp) }}/</span>
          <span class="text-body2 font-inter">{{ Math.round(getMinMaxTempPerDay(day).minTemp) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { format } from 'date-fns';
import { useWeatherStore } from '../stores';
import { forecastListItem } from '../types';

const weatherStore = useWeatherStore();

function getMinMaxTempPerDay(firstHourItem: forecastListItem) {
  const index = weatherStore.forecastData?.list.findIndex((i) => i.dt === firstHourItem.dt);
  const hourlyForecastsForDay: forecastListItem[] | undefined = weatherStore.forecastData?.list.slice(index, (index as number) + 8);

  if (hourlyForecastsForDay) {
    let minTemp = 100;
    let maxTemp = -273;

    for (const { main } of hourlyForecastsForDay) {
      minTemp = main.temp_min < minTemp ? main.temp_min : minTemp;
      maxTemp = main.temp_max > maxTemp ? main.temp_max : maxTemp;
    }

    return { minTemp, maxTemp };
  }

  return { minTemp: 999, maxTemp: 999 };
}
</script>

<style scoped lang="scss">
.container {
  border-radius: 15px;
  border: 1.5px solid $accent;

  background-color: $primary;
  color: $accent;
}

.forecast-day {
  border-bottom: 1px solid $accent;
}
</style>
