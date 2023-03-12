<template>
  <div class="container q-mt-lg q-mx-lg">
    <div v-if="!weatherStore.pendingForecast" class="column">
      <div v-for="(day, i) in firstForecastOfEachDay" :class="`col row no-wrap text-center forecast-day q-pa-sm ${i === 4 ? 'no-border' : ''}`" style="max-height: 2.5rem" :key="day.dt">
        <span class="col-2 text-body1 font-kanit-medium text-left">{{ format(day.dt, 'eee') }}</span>
        <div class="col-3">
          <span class="text-body1 font-inter-bold">{{ Math.round(dailyForecastProps[i].maxTemp) }}/</span>
          <span class="text-body2 font-inter">{{ Math.round(dailyForecastProps[i].minTemp) }}</span>
        </div>

        <div class="col-2">
          <q-img class="forecast-icon" :no-spinner="true" :src="`http://openweathermap.org/img/wn/${dailyForecastProps[i].weatherIcon}@2x.png`" width="1.5rem"></q-img>
        </div>

        <span v-if="dailyForecastProps[i].avgRain" class="col-5 text-body1 font-kanit-light">{{ dailyForecastProps[i].avgRain }} <span class="text-smaller font-inter-medium">mm</span></span>
        <span v-else class="col-5 text-body1 font-kanit-light">{{ dailyForecastProps[i].weatherText }}</span>
      </div>
    </div>

    <div v-else class="column">
      <div v-for="i in 5" :class="`col row no-wrap text-center forecast-day q-pa-sm ${i === 5 ? 'no-border' : ''}`" style="max-height: 2.5rem" :key="i">
        <q-skeleton type="rect" width="100%" height="1.5rem" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue';
import { format } from 'date-fns';
import { useWeatherStore } from '../stores';
import { forecastListItem, dailyForecastCalculations } from '../types';

const weatherStore = useWeatherStore();

const firstForecastOfEachDay: Ref<forecastListItem[] | undefined> = ref();
const dailyForecastProps: Ref<dailyForecastCalculations[]> = ref([]);

function getDailyData(firstHourItem: forecastListItem): dailyForecastCalculations {
  const index = weatherStore.forecastData?.list.findIndex((i) => i.dt === firstHourItem.dt);
  const hourlyForecastsForDay: forecastListItem[] | undefined = weatherStore.forecastData?.list.slice(index, (index as number) + 8);

  if (hourlyForecastsForDay) {
    let minTemp = 100;
    let maxTemp = -273;
    let rainSum = 0.0;
    let rainAddedCount = 0;
    let weatherIcon = hourlyForecastsForDay[3].weather[0].icon as string;
    let weatherText = hourlyForecastsForDay[3].weather[0].description as string;

    for (const { main, rain, weather } of hourlyForecastsForDay) {
      // calc min and max temp for day
      minTemp = main.temp_min < minTemp ? main.temp_min : minTemp;
      maxTemp = main.temp_max > maxTemp ? main.temp_max : maxTemp;

      // average rain volume over day if defined
      if (rain) {
        rainSum += rain['3h'];
        rainAddedCount += 1;

        weatherIcon = weather[0].icon;
        weatherText = weather[0].description;
      }
    }

    return { minTemp, maxTemp, avgRain: Math.round((rainSum / rainAddedCount) * 100) / 100, weatherIcon, weatherText };
  }

  return { minTemp: 999, maxTemp: 999, weatherIcon: '04d', weatherText: 'no data' };
}

weatherStore.$subscribe((mutation, { pendingForecast, forecastData }) => {
  if (!pendingForecast && forecastData) {
    firstForecastOfEachDay.value = weatherStore.forecastData?.list.filter((li) => new Date(li.dt).getHours() === 1);
    dailyForecastProps.value = [];
    firstForecastOfEachDay.value?.forEach((val) => dailyForecastProps.value.push(getDailyData(val)));
  }
});
</script>

<style scoped lang="scss">
.container {
  border-radius: 15px;
  border: 1.5px solid $accent;

  background-color: $primary;
  color: $accent;
}

.forecast-icon {
  position: relative;
  transform: scale(2);
}

.forecast-day {
  border-bottom: 1px solid $accent;
}

.no-border {
  border-bottom: none;
}
</style>
