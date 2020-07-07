<template>
  <div
    class="byteark-player-container"
    @click="playOrPause">
    <PlayerPlaceholder
      v-if="!playerState.loaded"
      :class="customClass"
      :aspectRatio="aspectRatio"
      :error="playerState.error"
      :fill="fill"
      :fluid="fluid" />
    <div
      v-if="renderComponent && !playerState.error && playerState.loaded"
      :class="{'container-fill' : fill}"
      class="player-container">
      <audio
        v-if="audioOnlyMode"
        ref="videoNode"
        :class="`video-js ${customClass}`" />
      <video
        playsInline
        v-if="!audioOnlyMode"
        ref="videoNode"
        :class="`video-js ${customClass}`" />
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
      default() {
        return {};
      },
    },
  },
  components: {
    PlayerPlaceholder,
  },
  data() {
    return {
      aspectRatio: '16:9',
      audioOnlyMode: false,
      autoplay: true,
      controls: true,
      fill: false,
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
      renderComponent: true,
      play: false,
      videoNode: null,
    };
  },
  watch: {
    async options(newValue) {
      this.options = newValue;
      this.mapValues(newValue);

      this.renderComponent = false;
      this.$nextTick(() => {
        this.renderComponent = true;
      });

      await this.initPlayerInstance();
    },
  },
  async beforeMount() {
    if (this.options) {
      this.mapValues(this.options);
    }
    await this.initPlayerInstance();
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose();
      this.playerState.ready = false;
      this.playerState.loaded = false;
    }
  },
  methods: {
    async initPlayerInstance() {
      await this.loadPlayerResources();
      await this.createPlayerInstance();
      if (this.autoplay) {
        this.play = true;
      }
    },
    defaultOnPlayerLoaded() {
      this.playerState.loaded = true;
      if (this.onPlayerLoaded) {
        try {
          this.onPlayerLoaded();
        } catch (error) {
          this.playerState.error = error;
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

      if (this.options.poster) {
        this.poster = this.options.poster;
      }
      if (this.options.aspectRatio) {
        this.aspectRatio = this.options.aspectRatio;
      }
      if (this.options.sources) {
        this.sources = this.options.sources;
      }

      this.player = this.defaultCreatePlayerFunction(
        this.videoNode,
        this.options,
        this.defaultOnReady,
      );

      this.defaultOnPlayerCreated();
    },
    defaultOnReady() {
      if (this.onReady) {
        this.onReady();
      }
    },
    defaultCreatePlayerFunction(videoNode, options, onReady) {
      // eslint-disable-next-line
      return bytearkPlayer(videoNode, options, onReady);
    },
    defaultOnPlayerCreated() {
      if (this.player) {
        this.playerState.ready = true;
        this.playerState.loaded = true;
        // eslint-disable-next-line
        const div = document.getElementById(this.player.id_);
        div.classList.remove('vjs-controls-disabled');
        if (this.options.fill) {
          div.classList.remove('vjs-fluid');
          div.classList.add('vjs-fill');
        }
      }
    },
    playOrPause() {
      const playPromise = this.player.play();
      if (playPromise !== undefined) {
        playPromise
          // eslint-disable-next-line
          .then((_) => {
            if (this.play) {
              this.player.pause();
              this.play = false;
            } else {
              this.play = true;
            }
          }).catch((error) => {
            this.playerState.error = error;
          });
      }
    },
    mapValues(newValue) {
      this.autoplay = newValue.autoplay;
      this.fluid = newValue.fluid;
      this.fill = newValue.fill;
      if (newValue.aspectRatio) {
        this.aspectRatio = newValue.aspectRatio;
      }
      if (newValue.sources) {
        this.sources = newValue.sources;
      }
      if (newValue.poster) {
        this.poster = newValue.poster;
      }
    },
  },
};
</script>
<style lang="scss">
.player-container {
  &.container-fill {
    position: relative;
    width: 100%;
    height: 100%;
  }
}
.byteark-player-container {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
