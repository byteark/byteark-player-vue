<template>
  <li>
    <a
      class="media my-2"
      href="#"
      @click="onClick"
    >
      <img
        class="rounded mr-3"
        style="width: 100px"
        :src="props.poster"
        :alt="props.title"
      >
      <div class="media-body">
        <p class="h6 mt-0 mb-1">{{ props.title }}</p>
      </div>
    </a>
  </li>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string;
  poster: string;
  onVideoSelected: () => void;
}>();

const onClick = (e: Event) => {
  e.preventDefault();
  props.onVideoSelected();
};
</script>
