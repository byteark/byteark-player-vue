<template>
  <div>
    <h2 class="h6 mb-3">Recommended Videos</h2>
    <ul
      class="list-unstyled"
      v-for="(video, index) in videos"
      :key="index">
      <VideoListItem
        :key="video.videoId"
        :title="video.title"
        :poster="video.poster"
        :video.sync="video"
        @onVideoSelected="setVideo(video)" />
    </ul>
  </div>
</template>

<script>
import VideoListItem from '@/components/VideoListItem.vue';

export default {
  props: {
    videos: {
      type: Array,
      required: true,
    },
  },
  components: {
    VideoListItem,
  },
  methods: {
    setVideo(video) {
      this.$emit('update:video', video);
    },
  },
};
</script>
