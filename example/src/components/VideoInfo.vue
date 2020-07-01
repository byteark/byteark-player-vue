<template>
  <div>
    <h1 class="h4">{{video.title}}</h1>
    <p class="text-muted mt-4">{{video.description}}</p>
  </div>
</template>

<script>
export default {
  props: {
    video: {
      type: Object,
      required: true,
    },
  },
};
</script>
