<template>
  <div>
    <!-- weather map badge -->
    <ContextBadge title="Maps">
      <template #content>
        <div class="font-kanit">
          <q-checkbox dark v-model="showLayersModel" val="temp" label="Temperatur" />
          <q-checkbox dark v-model="showLayersModel" val="clouds" label="Clouds" />
          <q-checkbox dark v-model="showLayersModel" val="precipitation" label="Precipitaion" />
        </div>
        <div class="map-container q-mt-sm">
          <div class="map" id="map"></div>
        </div>
      </template>
    </ContextBadge>
  </div>
</template>

<script setup lang="ts">
import mapbox from 'mapbox-gl';
import { ref, Ref, onMounted, watch } from 'vue';
import getPosition from '@/composables/getLocation';
import ContextBadge from './ContextBadge.vue';

mapbox.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

const map: Ref<mapbox.Map | undefined> = ref();
const cloudLayer: mapbox.AnyLayer = {
  id: 'clouds',
  type: 'raster',
  source: 'clouds',
  minzoom: 0,
  maxzoom: 22,
};
const precipitaionLayer: mapbox.AnyLayer = {
  id: 'precipitation',
  type: 'raster',
  source: 'precipitation',
  minzoom: 0,
  maxzoom: 22,
};
const temperatureLayer: mapbox.AnyLayer = {
  id: 'temperature',
  type: 'raster',
  source: 'temperature',
  minzoom: 0,
  maxzoom: 22,
};

const showLayersModel: Ref<string[]> = ref(['temp']);

function onMapLoad() {
  map.value?.addSource('clouds', {
    type: 'raster',
    tiles: [`https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${import.meta.env.VITE_OPEN_WEATHER_API_KEY}`],
    tileSize: 128,
  });
  map.value?.addSource('precipitation', {
    type: 'raster',
    tiles: [`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${import.meta.env.VITE_OPEN_WEATHER_API_KEY}`],
    tileSize: 128,
  });
  map.value?.addSource('temperature', {
    type: 'raster',
    tiles: [`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${import.meta.env.VITE_OPEN_WEATHER_API_KEY}`],
    tileSize: 128,
  });

  map.value?.addControl(
    new mapbox.GeolocateControl({
      showUserLocation: true,
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
      showUserHeading: true,
    }),
  );

  map.value?.addLayer(temperatureLayer);
}

function updateVisibleLayers() {
  if (map.value?.getLayer('clouds')) map.value.removeLayer('clouds');
  if (map.value?.getLayer('precipitation')) map.value.removeLayer('precipitation');
  if (map.value?.getLayer('temperature')) map.value.removeLayer('temperature');

  if (showLayersModel.value.includes('temp')) map.value?.addLayer(temperatureLayer);
  if (showLayersModel.value.includes('clouds')) map.value?.addLayer(cloudLayer);
  if (showLayersModel.value.includes('precipitation')) map.value?.addLayer(precipitaionLayer);
}

watch(showLayersModel, () => {
  updateVisibleLayers();
});

onMounted(async () => {
  const { coords } = await getPosition();

  map.value = new mapbox.Map({
    container: 'map',
    style: 'mapbox://styles/htltheo/clf5ixsy4008m01qkh6302xkf',
    center: [coords.longitude, coords.latitude],
    zoom: 4,
  });

  map.value.on('load', onMapLoad);
});
</script>

<style scoped lang="scss">
.map {
  width: 100%;
  height: 40vh;

  border-radius: 10px;
}
</style>
