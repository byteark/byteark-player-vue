<template>
  <li>
    <a
      class="media my-2"
      @click.prevent="onClick">
      <img
        class="rounded mr-3"
        style="width: 100%"
        :src="poster"
        :alt="title" />
      <div class="media-body">
        <p class="h6 mt-0 mb-1">{{title}}</p>
      </div>
    </a>
  </li>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    poster: {
      type: String,
      required: true,
    },
    onVideoSelected: {
      type: Function,
      required: true,
    },
  },
  methods: {
    onClick() {
      this.onVideoSelected();
    },
  },
};
</script>
