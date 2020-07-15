<template>
  <div class="container">
    <section class="section-welcome">
      <div class="heading">
          <h1>ByteArk Player Container for Vue.js</h1>
      </div>
      <p>
        Welcome! This is an example for ByteArk Player Container for Vue.js
        For the repository, see <a href="https://github.com/byteark/byteark-player-vue">https://github.com/byteark/byteark-player-vue</a>
      </p>
    </section>
    <section class="section-examples">
      <h2>Examples</h2>
      <p>
        The following is the most common example for videos that inline with your content.
        This player is created with fluid layout mode, and setting aspect ratio to 16:9.
      </p>
      <ByteArkPlayerContainer
        :playerVersion="v2"
        :options="options" />
    </section>
    <section class="section-more-examples">
      <h2>More Examples</h2>
      <ul>
        <li>
          <router-link to="/fluid">
            Fluid Layout
          </router-link>
        </li>
        <li>
          <router-link to="/fill">
            Fill Layout
          </router-link>
        </li>
      </ul>
    </section>
  </div>
</template>
<script>
import ByteArkPlayerContainer from '@byteark/byteark-player-vue';

export default {
  data() {
    return {
      options: {
        fluid: true,
        autoplay: false,
        aspectRatio: '16:9',
        poster: 'https://qoder.byteark.com/images/video-frames/1/GU/cg/1GUcgd3XwsmD-large.jpg',
        sources: {
          src: 'https://inox-bhm9yr.cdn.byteark.com/video-objects/RI2PimuHxDXw/playlist.m3u8',
          type: 'application/x-mpegURL',
          title: 'Big Buck Bunny',
        },
      },
    };
  },
  components: {
    ByteArkPlayerContainer,
  },
};
</script>

<style lang="scss" scoped>
.container {
  padding: 60px 0;
  .heading {
    text-align: center;
    padding: 8vh 0;
  }
  section {
    margin: 20px 0;
  }
}
</style>
