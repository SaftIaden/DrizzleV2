<template>
  <div>
    <div v-if="weatherStore.pendingAirPollution">
      <div class="row q-my-md">
        <q-skeleton class="col-6 q-ml-sm q-mr-lg" type="circle" size="6rem"></q-skeleton>
        <q-skeleton class="col-6" type="rect"></q-skeleton>
      </div>
    </div>
    <div v-else>
      <div class="row q-my-md">
        <q-circular-progress show-value :min="0" :max="5" class="col-4 q-ml-sm q-mr-lg" :value="6 - aqiIndexCircleValue" :thickness="0.15" :color="aqiProps?.color">
          <span class="text-body1 font-kanit">{{ aqiCodes[aqiIndexCircleValue] }}</span>
        </q-circular-progress>
        <span class="col-6 font-kanit text-body2">{{ aqiProps?.text }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue';
import { useWeatherStore } from '@/stores';
import { aqiCodes } from '@/types';

const weatherStore = useWeatherStore();

const aqiIndexCircleValue: Ref<aqiCodes> = ref(0);
const aqiProps: Ref<{ color: string; text: string } | undefined> = ref();

function getAqiProps(index: aqiCodes) {
  switch (index) {
    case aqiCodes.Good:
      return { color: 'positive', text: 'Air quality is satisfactory, and air pollution poses little or no risk.' };

    case aqiCodes.Fair:
      return { color: 'info', text: 'Air quality is acceptable. However, there may be a risk for some people, particularly those who are unusually sensitive to air pollution.' };

    case aqiCodes.Moderate:
      return { color: 'info', text: 'Members of sensitive groups may experience health effects. The general public is less likely to be affected.' };

    case aqiCodes.Poor:
      return { color: 'secondary', text: 'Some members of the general public may experience health effects; members of sensitive groups may experience more serious health effects.' };

    case aqiCodes['Very Poor']:
      return { color: 'negative', text: 'Health alert: The risk of health effects is increased for everyone.' };

    default:
      return { color: 'info', text: 'No Data!' };
  }
}

weatherStore.$subscribe((mutation, state) => {
  if (!state.pendingAirPollution && state.currentAirPollution) {
    aqiIndexCircleValue.value = state.currentAirPollution.list[0].main.aqi;
    aqiProps.value = getAqiProps(state.currentAirPollution.list[0].main.aqi);
  }
});
</script>
