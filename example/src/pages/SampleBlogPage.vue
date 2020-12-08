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
        @ready="onPlayerReady"
        @firstplay="onVideoFirstPlay"
        @play="onVideoPlay"
        @pause="onVideoPause"
        @ended="onVideoEnded"
        @timeupdate="onTimeChanged"
        @seeking="onVideoSeeked"
        @waiting="onWaitingVideo"
        @fullscreenchange="onToggleFullScreen"
        @volumechange="onVolumeChanged"
        @ratechange="onPlaybackSpeedChanged"
        @enterpictureinpicture="onPiPEntered"
        @leavepictureinpicture="onPiPExited"
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
      player: null,
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
        playbackRates: [0.5, 1, 1.5, 2],
      },
    };
  },
  components: {
    ByteArkPlayerContainer,
  },
  methods: {
    /* eslint-disable */
    onPlayerReady(player) {
      this.player = player;
      console.log('I\'m Ready!');
    },
    onVideoFirstPlay(player) {
      console.log('This is the first play.');
    },
    onVideoPlay(player, currentTime) {
      console.log(`You hit play, Current Time: ${currentTime} seconds.`);
    },
    onVideoPause(player, currentTime) {
      console.log(`You hit pause, Current Time: ${currentTime} seconds.`);
    },
    onTimeChanged(player, currentTime) {
      console.log(`Time Updated, , Current Time: ${currentTime} seconds.`);
    },
    onVideoEnded(player) {
      console.log('The video ended. What to watch next?');
    },
    onVideoSeeked(player, currentTime) {
      console.log(`You seeked the video to: ${currentTime} seconds.`);
    },
    onWaitingVideo(player) {
      console.log('Waiting for the video...');
    },
    onToggleFullScreen(player, isFullscreen) {
      if (isFullscreen) {
        console.log('You entered Full Screen Mode.');
      } else {
        console.log('You exited Full Screen Mode.');
      }
    },
    onVolumeChanged(player, volume) {
      console.log(`You adjusted the volume to ${volume}`);
    },
    onPlaybackSpeedChanged(player, playbackSpeed) {
      console.log(`You adjusted the playback speed to ${playbackSpeed}x`);
    },
    onPiPEntered(player) {
      console.log('You entered Picture-in-Picture Mode.');
    },
    onPiPExited(player) {
      console.log('You exited Picture-in-Picture Mode.');
    },
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
