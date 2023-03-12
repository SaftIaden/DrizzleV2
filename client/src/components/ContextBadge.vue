<template>
  <div class="container q-mt-lg q-mx-lg">
    <slot name="content"></slot>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.container {
  border-radius: 15px;
  border: 1.5px solid $accent;

  background-color: $primary;
  color: $accent;
}
</style>
