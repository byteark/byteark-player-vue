<template>
  <div>
    <SiteNav />
    <div class="container">
      <h4 class="mt-4">
        Fluid Layout Example
      </h4>
      <div class="row mt-4">
        <div
          class="col-sm-8"
          style="position: relative;"
        >
          <div
            class="player-container"
            style="position: relative;"
          >
            <ByteArkPlayerContainer
              :options="options"
              :onPlayerCreated="player => console.log('Player created:', player)"
              :onReady="player => console.log('Player ready:', player)"
            />
          </div>
          <div class="mt-4">
            <VideoInfo
              :title="video.title"
              :description="video.description"
            />
          </div>
        </div>
        <div class="col-sm-4">
          <VideoList
            :videos="videos"
            :onVideoSelected="setVideo"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import ByteArkPlayerContainer from '../../src';
import { SiteNav, VideoList, VideoInfo } from '../components';
import { videos } from '../videos';

import type { ByteArkPlayerOptions } from '../../src';
import type { IVideo } from '../videos';

const video = ref(videos[0]);

const options: ByteArkPlayerOptions = {
  fluid: true,
  autoplay: false,
  aspectRatio: '16:9',
  poster: video.value.poster,
  sources: [
    {
      src: video.value.src,
      type: video.value.type,
      title: video.value.title,
    },
  ],
};

const setVideo = (selectedVideo: IVideo) => {
  video.value = selectedVideo;

  options.poster = selectedVideo.poster;
  options.sources = [
    {
      src: selectedVideo.src,
      type: selectedVideo.type,
      title: selectedVideo.title,
    },
  ];
};
</script>
