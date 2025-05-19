<template>
  <div>
    <div style="position: relative; width: 100%; height: 75vh;">
      <ByteArkPlayerContainer
        :options="options"
        :onPlayerCreated="player => console.log('Player created:', player)"
        :onReady="player => console.log('Player ready:', player)"
      />
    </div>
    <SiteNav />
    <div class="container mt-4">
      <h4 class="mt-4">
        Fill Layout Example
      </h4>
      <div class="row mt-4">
        <div class="col-sm-8">
          <div class="mt-4">
            <VideoInfo
              :title="video.title"
              :description="video.description"
            />
          </div>
        </div>
        <div class="col-sm-4 mt-1">
          <VideoList
            :videos="videos"
            @videoSelected="setVideo"
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
  fill: true,
  autoplay: false,
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
