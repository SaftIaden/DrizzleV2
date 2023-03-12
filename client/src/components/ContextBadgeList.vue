<template>
  <div>
    <!-- weather map badge -->
    <ContextBadge>
      <template #content>
        <div class="map-container q-pa-sm">
          <div class="map" id="map"></div>
        </div>
      </template>
    </ContextBadge>
  </div>
</template>

<script setup lang="ts">
import mapbox from 'mapbox-gl';
import { ref, Ref, onMounted } from 'vue';
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
}

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
