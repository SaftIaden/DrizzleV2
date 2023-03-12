<template>
  <div>
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
</script>
