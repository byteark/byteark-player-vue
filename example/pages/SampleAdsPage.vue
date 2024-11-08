<template>
  <div>
    <SiteNav />
    <div class="container">
      <h4 class="mt-4">
        {{ 'Advertisement Example' }}
      </h4>
      <div class="row mt-4">
        <div
          class="col"
          style="position: relative"
        >
          <div
            class="player-container"
            style="position: relative"
          >
            <ByteArkPlayerContainer
              :options="options"
              :onPlayerCreated="(player) => console.log('Player created:', player)"
              :onReady="(player) => console.log('Player ready:', player)"
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
  muted: true,
  aspectRatio: '16:9',
  poster: videos[0].poster,
  sources: [
    {
      src: videos[0].src,
      type: videos[0].type,
      title: videos[0].title,
    },
  ],
  plugins: {
    bytearkAds: {
      adTagUrl:
        'https://pubads.g.doubleclick.net/gampad/ads?iu=/21775744923/external/single_preroll_skippable&sz=640x480&ciu_szs=300x250%2C728x90&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator=',
    },
  },
};
</script>
