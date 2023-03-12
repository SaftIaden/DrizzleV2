<template>
  <div>
    <!-- air pollution badge -->
    <ContextBadge title="Air Pollution">
      <template #content>
        <AirPollutionBadge></AirPollutionBadge>
      </template>
    </ContextBadge>

    <!-- weather map badge -->
    <ContextBadge title="Radar">
      <template #content>
        <MapBadge></MapBadge>
      </template>
    </ContextBadge>
  </div>
</template>

<script setup lang="ts">
import ContextBadge from './ContextBadge.vue';
import MapBadge from './MapBadge.vue';
import AirPollutionBadge from './AirPollutionBadge.vue';
</script>
