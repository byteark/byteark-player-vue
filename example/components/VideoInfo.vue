<template>
  <div>
    <h1 class="h4">
      {{ props.title }}
    </h1>
    <p class="text-muted mt-4">
      {{ props.description }}
    </p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string;
  description: string;
}>();
</script>
