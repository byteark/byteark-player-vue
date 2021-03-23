<template>
  <div
    :class="{'fill-layout': isFillLayout}"
    class="byteark-player-container">
    <PlayerPlaceholder
      @click.native="onClickPlaceholder"
      v-if="!renderComponent"
      :options="defaultOptions" />
    <ErrorMessageContainer
      v-if="playerState.error"
      :error="playerState.error"/>
    <div
      v-show="renderComponent && !playerState.error && playerState.loaded"
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
import ErrorMessageContainer from './ErrorMessageContainer.vue';
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
    lazyload: {
      type: Boolean,
      default: () => true,
    },
  },
  components: {
    ErrorMessageContainer,
    PlayerPlaceholder,
  },
  data() {
    return {
      audioOnlyMode: false,
      videoNode: null,
      renderComponent: false,
      player: null,
      play: false,
      firstPlay: true,
      videoEnded: false,
      playerState: {
        loaded: false,
        ready: false,
        error: null,
      },
      defaultOptions: {
        aspectRatio: '16:9',
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
        plugins: [],
      },
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
    isFluidLayout() {
      return this.defaultOptions.fluid;
    },
    isFillLayout() {
      return this.defaultOptions.fill;
    },
  },
  watch: {
    async options() {
      this.overrideDefaultOptions();

      if (!this.options) {
        this.renderComponent = false;
      }
      this.$nextTick(() => {
        this.renderComponent = true;
      });

      await this.initPlayerInstance();
    },
  },
  async beforeMount() {
    if (this.options) {
      this.overrideDefaultOptions();
    }
    if (!this.lazyload) {
      await this.initPlayerInstance();
    }
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose();
      this.playerState.ready = false;
      this.playerState.loaded = false;
    }
  },
  methods: {
    async onClickPlaceholder() {
      const placeHolder = document.querySelector('.player-place-holder');
      if (placeHolder) {
        placeHolder.classList.add('played');
      }
      if (this.lazyload) {
        await this.initPlayerInstance();
        if (this.player) {
          this.player.play();
        }
      }
    },
    async initPlayerInstance() {
      await this.loadPlayerResources();
      await this.setupPlayer();
      await this.createPlayerInstance();

      if (this.autoplay) {
        this.play = true;
        this.$emit('firstplay', this.player);
        this.firstPlay = false;
      }

      const videoJsElement = document.querySelector('.video-js');

      if (this.defaultOptions.fill) {
        videoJsElement.classList.remove('vjs-fluid');
        videoJsElement.classList.add('vjs-fill');
      } else {
        // Fluid Layout
        if (this.defaultOptions.aspectRatio === '16:9') {
          videoJsElement.classList.add('vjs-16-9');
        }
        if (this.defaultOptions.aspectRatio === '4:3') {
          videoJsElement.classList.add('vjs-4-3');
        }
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
      this.renderComponent = true;
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
      try {
        const promises = [];
        promises.push(
          loadScriptOrStyle(
            `byteark-player-script-${this.defaultOptions.playerVersion}`,
            `${this.defaultOptions.playerEndpoint}/${this.defaultOptions.playerVersion}/${this.defaultOptions.playerJsFileName}`,
            'script',
          ),
        );
        promises.push(
          loadScriptOrStyle(
            `byteark-player-style-${this.defaultOptions.playerVersion}`,
            `${this.defaultOptions.playerEndpoint}/${this.defaultOptions.playerVersion}/${this.defaultOptions.playerCssFileName}`,
            'style',
          ),
        );
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
        await window.bytearkPlayer.setup(this.defaultOptions, loadScriptOrStyle);

        this.defaultOnPlayerSetup();
      } catch (originalError) {
        this.defaultOnPlayerSetupError(originalError);
        // Rethrow to stop following statements.
        throw originalError;
      }
    },
    async createPlayerInstance() {
      this.videoNode = this.$refs.videoNode;

      // check can autoplay video
      /* eslint-disable */
      const autoplayResult_ = await window.bytearkPlayer.canAutoplay(this.options);
      this.defaultOptions.autoplayResult_ = autoplayResult_;
      this.defaultOptions.autoplay = autoplayResult_.autoplay;
      this.defaultOptions.muted = autoplayResult_.muted;
      /* eslint-enable */

      this.player = this.defaultCreatePlayerFunction(
        this.videoNode,
        this.defaultOptions,
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
    overrideDefaultOptions() {
      this.defaultOptions = {
        ...this.defaultOptions,
        ...this.options,
      };
    },
  },
};
</script>

<style lang="scss">
.byteark-player-container {
  position: relative;
  width: 100%;
  height: auto;
  .player-container {
    position: relative;
    width: 100%;
    height: 100%;
    .video-js {
      min-width: 100%;
      min-height: 100%;
    }
  }
  &.fill-layout {
    height: 100%;
  }
}
</style>
