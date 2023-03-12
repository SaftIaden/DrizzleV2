<template>
  <div class="container q-mt-lg q-mx-lg q-pa-sm">
    <span class="text-h4 font-kanit-medium">{{ props.title ? props.title : 'Title' }}</span>
    <slot name="content"></slot>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: String,
});
</script>

<style scoped lang="scss">
.container {
  border-radius: 15px;
  border: 1.5px solid $accent;

  background-color: $primary;
  color: $accent;
}
</style>
