<template>
  <div>
    <SiteNav />
    <div class="container">
      <h4 class="mt-4">
        Autoplay Example
      </h4>
      <div class="row mt-4">
        <div
          class="col"
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
              :title="videos[0].title"
              :description="videos[0].description"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ByteArkPlayerContainer from '../../src';
import { SiteNav, VideoInfo } from '../components';
import { videos } from '../videos';
import type { ByteArkPlayerOptions } from '../../src';

const options: ByteArkPlayerOptions = {
  fluid: true,
  autoplay: 'any',
  aspectRatio: '16:9',
  poster: videos[0].poster,
  sources: [
    {
      src: videos[0].src,
      type: videos[0].type,
      title: videos[0].title,
    },
  ],
};
</script>
