<template>
  <div>
    <h2 class="h6 mb-3">
      Recommended Videos
    </h2>
    <ul class="list-unstyled">
      <VideoListItem
        v-for="video in props.videos"
        :key="video.videoId"
        :title="video.title"
        :poster="video.poster"
        :on-video-selected="() => onVideoSelected(video)"
      />
    </ul>
  </div>
</template>

<script setup lang="ts">
import VideoListItem from './VideoListItem.vue';
import { IVideo } from '../videos';

const props = defineProps<{
  videos: IVideo[];
  onVideoSelected: (video: IVideo) => void;
}>();

const onVideoSelected = (video: IVideo) => {
  props.onVideoSelected(video);
};
</script>
