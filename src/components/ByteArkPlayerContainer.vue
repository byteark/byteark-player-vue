<template>
  <div>
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
        :ref="onVideoNodeCreated"
        :class="`video-js ${customClass}`"
        :style="`${!playerState.loaded ? 'display: none;' : ''}`" />
      <video
        playsInline
        :ref="onVideoNodeCreated"
        :class="`video-js ${customClass}`"
        :style="`${!playerState.loaded ? 'display: none;' : ''}`" />
    </div>
  </div>
</template>

<script>
import PlayerPlaceholder from '@/components/PlayerPlaceholder.vue';
import loadScriptOrStyle from '@/helpers/loadScriptOrStyle.js';

export default {
  props: {
    aspectRatio: {
      type: String,
      default: () => '16:9',
    },
    audioOnlyMode: {
      type: Boolean,
      default: () => false,
    },
    autoplay: {
      type: Boolean,
      default: () => true,
    },
    controls: {
      type: Boolean,
      default: () => true,
    },
    createPlayerFunction: {
      type: Function,
      default: () => this.defaultCreatePlayerFunction(),
    },
    customClass: {
      type: String,
      default: () => '',
    },
    fill: {
      type: Boolean,
      default: () => true,
    },
    fluid: {
      type: Boolean,
      default: () => true,
    },
    playsinline: {
      type: Boolean,
      default: () => true,
    },
    onPlayerCreated: {
      type: Function,
      default: () => null,
    },
    onPlayerLoaded: {
      type: Function,
      default: () => null,
    },
    onPlayerLoadError: {
      type: Function,
      default: () => null,
    },
    onReady: {
      type: Function,
      default: () => null,
    },
    poster: {
      type: String,
      default: () => '',
    },
    sources: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    PlayerPlaceholder,
  },
  data() {
    return {
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
    };
  },
  async beforeMount() {
    await this.loadPlayerResources();
    await this.createPlayerInstance();
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose();
      this.playerState.ready = false
    }
  },
  methods: {
    onPlayerLoaded() {
      this.playerState.loaded = true;
      try {
        this.onPlayerLoaded();
      } catch (error) {
        console.error(error);
      }
    },
    onPlayerLoadError(originalError) {
      this.playerState.error = {
        error: {
          code: 'ERROR_BYTEARK_PLAYER_VUE_100001',
          message: 'Sorry, something went wrong when loading the video player.',
          messageSecondary: 'Please refresh the page to try again.'
        },
        originalError,
      };
    },
    onPlayerCreated() {
      if (this.onPlayerCreated) {
        this.onPlayerCreated(this.player)
      }
    },
    onReady() {
      if (this.onReady) {
        this.onReady(this.player)
      }
    },
    async loadPlayerResources() {
      try {
        const promises = []
        if (this.playerJsFileName) {
          promises.push(
            loadScriptOrStyle(
              `byteark-player-script-${this.playerVersion}`,
              `${this.playerEndpoint}/${this.playerVersion}/${this.playerJsFileName}`,
              'script'
            )
          );
        }
        if (this.playerCssFileName) {
          promises.push(
            loadScriptOrStyle(
              `byteark-player-style-${this.playerVersion}`,
              `${this.playerEndpoint}/${this.playerVersion}/${this.playerCssFileName}`,
              'style'
            )
          );
        }
        await Promise.all(promises);
      } catch (originalError) {
        this.onPlayerLoadError(originalError);
        // Rethrow to stop following statements.
        throw originalError;
      }
      this.onPlayerLoaded();
    },
    createPlayerInstance() {
      this.player = this.createPlayerFunction(
        this.videoNode,
        this.props,
        this.onReady
      );
      this.onPlayerCreated();
    },
    defaultCreatePlayerFunction(videoNode, options, onReady) {
      return bytearkPlayer(videoNode, options, onReady)
    },
    onVideoNodeCreated(node) {
      this.videoNode = node;
    },
  },
};
</script>

<style scoped>

</style>
