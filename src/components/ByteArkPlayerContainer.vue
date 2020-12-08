<template>
  <div
    :style="`${fill ? 'height: 100%' : ''}`"
    class="byteark-player-container">
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
        controls
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
    onPlayerSetup: {
      type: Function,
      default: () => {},
    },
    onPlayerSetupError: {
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
      playerEndpoint: 'https://byteark-sdk.cdn.byteark.com/player-core',
      playerVersion: 'v2',
      playerJsFileName: 'byteark-player.min.js',
      playerCssFileName: 'byteark-player.min.css',
      techCanOverridePoster: false,
      player: null,
      plugins: [],
      playerState: {
        loaded: false,
        ready: false,
        error: null,
      },
      renderComponent: true,
      play: false,
      firstPlay: true,
      videoEnded: false,
      videoNode: null,
    };
  },
  computed: {
    hasPlayListener() {
      return this.$listeners && this.$listeners.play;
    },
    hasPauseListener() {
      return this.$listeners && this.$listeners.pause;
    },
    hasSeekListener() {
      return this.$listeners && this.$listeners.seeking;
    },
    hasEndedListener() {
      return this.$listeners && this.$listeners.ended;
    },
    hasTimeUpdateListener() {
      return this.$listeners && this.$listeners.timeupdate;
    },
    hasFullScreenListener() {
      return this.$listeners && this.$listeners.fullscreenchange;
    },
    hasVolumeListener() {
      return this.$listeners && this.$listeners.volumechange;
    },
    hasRateListener() {
      return this.$listeners && this.$listeners.ratechange;
    },
    hasPiPListeners() {
      return this.$listeners
        && (this.$listeners.enterpictureinpicture || this.$listeners.leavepictureinpicture);
    },
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
      await this.setupPlayer();
      await this.createPlayerInstance();

      if (this.autoplay) {
        this.play = true;
        this.$emit('firstplay', this.player);
        this.firstPlay = false;
      }
    },
    defaultOnPlayerLoaded() {
      try {
        this.$emit('loaded', this.player);
      } catch (error) {
        this.playerState.error = error;
      }
    },
    defaultOnPlayerLoadingError(originalError) {
      this.playerState.error = {
        error: {
          code: 'ERROR_BYTEARK_PLAYER_VUE_100001',
          message: 'Sorry, something went wrong when loading the video player.',
          messageSecondary: 'Please refresh the page to try again.',
        },
        originalError,
      };
      this.$emit('error', originalError);
    },
    defaultOnPlayerSetup() {
      this.playerState.loaded = true;

      if (this.onPlayerSetup) {
        this.onPlayerSetup();
      }
    },
    defaultOnPlayerSetupError(originalError) {
      if (this.onPlayerSetupError) {
        this.onPlayerSetupError(originalError);
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
    defaultOnPlayerCreated() {
      if (this.player) {
        this.playerState.ready = true;
        this.playerState.loaded = true;
        this.player.on('waiting', () => {
          this.$emit('waiting', this.player);
        });
        if (this.hasEndedListener) {
          this.player.on('ended', () => {
            this.videoEnded = true;
            this.$emit('ended', this.player);
          });
        }
        if (this.hasPlayListener) {
          this.player.on('play', () => {
            this.play = true;
            if (this.firstPlay) {
              this.$emit('firstplay', this.player);
              this.firstPlay = false;
            } else {
              this.$emit('play', this.player, this.player.currentTime());
            }
          });
        }
        if (this.hasPauseListener) {
          this.player.on('pause', () => {
            if (!this.videoEnded) {
              this.$emit('pause', this.player, this.player.currentTime());
            }
            this.play = false;
          });
        }
        if (this.hasTimeUpdateListener) {
          this.player.on('timeupdate', () => {
            this.$emit('timeupdate', this.player, this.player.currentTime());
          });
        }
        if (this.hasSeekListener) {
          this.player.on('seeking', () => {
            this.$emit('seeking', this.player, this.player.currentTime());
          });
        }
        if (this.hasFullScreenListener) {
          this.player.on('fullscreenchange', () => {
            this.$emit('fullscreenchange', this.player, this.player.isFullscreen());
          });
        }
        if (this.hasVolumeListener) {
          this.player.on('volumechange', () => {
            this.$emit('volumechange', this.player, this.player.volume());
          });
        }
        if (this.hasRateListener) {
          this.player.on('ratechange', () => {
            this.$emit('ratechange', this.player, this.player.playbackRate());
          });
        }
        if (this.hasPiPListeners) {
          this.player.on('enterpictureinpicture', () => {
            this.$emit('enterpictureinpicture', this.player);
          });
          this.player.on('leavepictureinpicture', () => {
            this.$emit('leavepictureinpicture', this.player);
          });
        }
      }
      this.$emit('created', this.player);
    },
    async loadPlayerResources() {
      if (this.options.techCanOverridePoster) {
        this.techCanOverridePoster = this.options.techCanOverridePoster;
      }
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
        this.defaultOnPlayerLoadingError(originalError);
        // Rethrow to stop following statements.
        throw originalError;
      }
      this.defaultOnPlayerLoaded();
    },
    async setupPlayer() {
      try {
        await window.bytearkPlayer.setup(this.options, loadScriptOrStyle);

        this.defaultOnPlayerSetup();
      } catch (originalError) {
        this.defaultOnPlayerSetupError(originalError);
        // Rethrow to stop following statements.
        throw originalError;
      }
    },
    async createPlayerInstance() {
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

      // check can autoplay video
      // eslint-disable-next-line no-underscore-dangle
      const autoplayResult_ = await window.bytearkPlayer.canAutoplay(this.options);

      // eslint-disable-next-line no-underscore-dangle
      this.options.autoplayResult_ = autoplayResult_;

      this.options.autoplay = autoplayResult_.autoplay;

      this.options.muted = autoplayResult_.muted;

      this.player = this.defaultCreatePlayerFunction(
        this.videoNode,
        this.options,
        this.defaultOnReady,
      );

      this.defaultOnPlayerCreated();
    },
    defaultOnReady() {
      this.$emit('ready', this.player);
      this.videoEnded = false;
    },
    defaultCreatePlayerFunction(videoNode, options, onReady) {
      return window.bytearkPlayer.init(videoNode, options, onReady);
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

      if (newValue.playerEndpoint) {
        this.playerEndpoint = newValue.playerEndpoint;
      }

      if (newValue.playerVersion) {
        this.playerVersion = newValue.playerVersion;
      }

      if (newValue.playerJsFileName) {
        this.playerJsFileName = newValue.playerJsFileName;
      }

      if (newValue.playerCssFileName) {
        this.playerCssFileName = newValue.playerCssFileName;
      }

      if (newValue.techCanOverridePoster) {
        this.techCanOverridePoster = newValue.techCanOverridePoster;
      }

      if (newValue.plugins) {
        this.plugins = newValue.plugins;
      }
    },
  },
};
</script>
<style lang="scss">
.byteark-player-container {
  position: relative;
  width: 100%;

  height: auto;
}
.player-container {
  &.container-fill {
    position: relative;
    width: 100%;
    height: 100%;
  }
}

</style>
