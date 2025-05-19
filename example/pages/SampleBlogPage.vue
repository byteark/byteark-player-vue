<template>
  <div
    class="container"
    style="max-width: 800px;"
  >
    <div class="row">
      <div class="col-12">
        <SiteHeader />
        <section class="mt-4 mb-4">
          <p>
            Welcome! This is an example for ByteArk Player Container for Vue.
            For the repository, see
            <a
              href="https://github.com/byteark/byteark-player-vue"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://github.com/byteark/byteark-player-vue
            </a>
          </p>
        </section>
        <section class="mt-4 mb-4">
          <h2 class="h5">
            Examples
          </h2>
          <p>
            The following is the most common example for videos that inline with your content.
            This player is created with fluid layout mode, and setting aspect ratio to 16:9.
          </p>
          <div
            class="player-container mt-4 mb-4"
            style="position: relative;"
          >
            <ByteArkPlayerContainer :options="options" />
          </div>
        </section>
        <section class="mt-4 mb-4">
          <h2 class="h5">
            More Examples
          </h2>
          <ul>
            <li>
              <RouterLink to="/fluid">
                Fluid Layout
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/fill">
                Fill Layout
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/full">
                Full Page Layout
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/lazyload">
                Lazy Load Player
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/autoplay">
                Autoplay
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/ads">
                Advertisement
              </RouterLink>
            </li>
          </ul>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';

import ByteArkPlayerContainer from '../../src';
import { SiteHeader } from '../components';
import { videos } from '../videos';

import type { ByteArkPlayerOptions } from '../../src';

const options: ByteArkPlayerOptions = {
  fluid: true,
  autoplay: false,
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
