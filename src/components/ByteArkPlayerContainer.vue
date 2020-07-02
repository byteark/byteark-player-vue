<template>
  <div class="byteark-player-container">
    <PlayerPlaceholder
      v-if="!playerState.loaded"
      :class="customClass"
      :aspectRatio="aspectRatio"
      :error="playerState.error"
      :fill="fill"
      :fluid="fluid" />
    <div
      v-if="!playerState.error"
      class="player-container">
      <audio
        v-if="audioOnlyMode"
        ref="audioNode"
        :class="`video-js ${customClass}`"
        :style="`${!playerState.loaded ? 'display: none;' : ''}`" />
      <video
        playsInline
        ref="videoNode"
        :class="`video-js ${customClass}`"
        :style="`${!playerState.loaded ? 'display: none;' : ''}`" />
    </div>
  </div>
</template>

<script>
import PlayerPlaceholder from './PlayerPlaceholder.vue';
import loadScriptOrStyle from '../helpers/loadScriptOrStyle';

export default {
  name: 'ByteArkPlayerContainer',
  props: {
    createPlayerFunction: {
      type: Function,
      default: () => {},
    },
    customClass: {
      type: String,
      default: () => '',
    },
    onPlayerCreated: {
      type: Function,
      default: () => {},
    },
    onPlayerLoaded: {
      type: Function,
      default: () => {},
    },
    onPlayerLoadError: {
      type: Function,
      default: () => {},
    },
    onReady: {
      type: Function,
      default: () => {},
    },
    options: {
      type: Object,
      default: () => ({}),
    },
  },
  components: {
    PlayerPlaceholder,
  },
  data() {
    return {
      aspectRatio: '16:9',
      audioOnlyMode: true,
      autoPlay: true,
      controls: true,
      fill: true,
      fluid: true,
      playsInLine: true,
      poster: '',
      sources: {},
      playerEndpoint: 'https://byteark-sdk.cdn.byteark.com/player/',
      playerVersion: 'v1',
      playerJsFileName: 'byteark-player.min.js',
      playerCssFileName: 'byteark-player.min.css',
      techCanOverridePoster: false,
      player: null,
      playerState: {
        loaded: false,
        ready: false,
        error: null,
      },
      videoStyle: {},
      videoNode: null,
      audioNode: null,
    };
  },
  watch: {
    options(newValue) {
      this.options = newValue;
    },
  },
  async beforeMount() {
    await this.loadPlayerResources();
  },
  async mounted() {
    await this.createPlayerInstance();
  },
  beforeDestroy() {
    if (this.player) {
      this.player = null;
      this.playerState.ready = false;
    }
  },
  methods: {
    defaultOnPlayerLoaded() {
      this.playerState.loaded = true;
      if (this.onPlayerLoaded) {
        try {
          this.onPlayerLoaded();
        } catch (error) {
          console.error(error);
        }
      }
    },
    defaultOnPlayerLoadError(originalError) {
      if (this.onPlayerLoadError) {
        this.onPlayerLoadError(originalError);
      } else {
        this.playerState.error = {
          error: {
            code: 'ERROR_BYTEARK_PLAYER_VUE_100001',
            message: 'Sorry, something went wrong when loading the video player.',
            messageSecondary: 'Please refresh the page to try again.',
          },
          originalError,
        };
      }
    },
    async loadPlayerResources() {
      try {
        const promises = [];
        if (this.playerJsFileName) {
          promises.push(
            loadScriptOrStyle(
              `byteark-player-script-${this.playerVersion}`,
              `${this.playerEndpoint}/${this.playerVersion}/${this.playerJsFileName}`,
              'script',
            ),
          );
        }
        if (this.playerCssFileName) {
          promises.push(
            loadScriptOrStyle(
              `byteark-player-style-${this.playerVersion}`,
              `${this.playerEndpoint}/${this.playerVersion}/${this.playerCssFileName}`,
              'style',
            ),
          );
        }
        await Promise.all(promises);
      } catch (originalError) {
        this.defaultOnPlayerLoadError(originalError);
        // Rethrow to stop following statements.
        throw originalError;
      }
      this.defaultOnPlayerLoaded();
    },
    createPlayerInstance() {
      this.videoNode = this.$refs.videoNode;
      this.audioNode = this.$refs.audioNode;

      if (this.options.poster) {
        this.poster = this.options.poster;
      }
      if (this.options.aspectRatio) {
        this.aspectRatio = this.options.aspectRatio;
      }
      if (this.options.sources) {
        this.sources = this.options.sources;
      }

      this.player = this.defaultCreatePlayerFunction(this.videoNode, this.options, this.onReady);
      this.defaultOnPlayerCreated();
    },
    defaultCreatePlayerFunction(videoNode, options, onReady) {
      // eslint-disable-next-line
      return bytearkPlayer(videoNode, options, onReady);
    },
    defaultOnPlayerCreated() {
      if (this.player) {
        const div = document.getElementsByClassName('video-js')[0];
        div.classList.remove('vjs-controls-disabled');
      }
    },
  },
};
</script>
<style lang="scss">
.container-fill {
  .byteark-player-container, .player-container {
    position: relative;
    width: 100%;
    height: 100%;
  }
}
</style>
