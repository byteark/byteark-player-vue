<template>
  <div
    style="background-color: #000;
           position: absolute;
           left: 0;
           right: 0;
           top: 0;
           bottom: 0;
           overflow: hidden;"
  >
    <ByteArkPlayerContainer :options="options" />
  </div>
</template>

<script setup lang="ts">
import ByteArkPlayerContainer from '../../src';
import { videos } from '../videos';

import type { ByteArkPlayerOptions } from '../../src';

const options: ByteArkPlayerOptions = {
  fill: true,
  autoplay: false,
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
