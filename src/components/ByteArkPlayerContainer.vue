<template>
  <div style="position: relative; height: 100%">
    <template v-if="playerContainerState.showPlaceholder">
      <PlayerPlaceholder
        :aspect-ratio="props.options.aspectRatio"
        :on-click="onClickPlaceholder"
        :custom-class="props.customClass"
        :error="playerContainerState.error"
        :lazyload="lazyload"
        :loaded="playerContainerState.loaded"
        :player-options="props.options"
      />
    </template>
    <div :style="{ display: playerContainerState.showPlaceholder ? 'none' : 'initial' }">
      <template v-if="playerContainerState.error === null">
        <audio
          v-if="options.audioOnlyMode"
          ref="mediaRef"
          :class="`video-js ${props.customClass || ''}`"
        />
        <video
          v-if="!options.audioOnlyMode"
          ref="mediaRef"
          playsinline
          :class="`video-js ${props.customClass || ''} ${
            props.options.fluid
              ? props.options.aspectRatio === '4:3'
                ? 'vjs-4-3'
                : props.options.aspectRatio === '16:9'
                  ? 'vjs-16-9'
                  : ''
              : ''
          }`"
        />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, onMounted, onUnmounted, toRaw } from 'vue';
import PlayerPlaceholder from './PlayerPlaceholder.vue';
import {
  PLAYER_ENDPOINT,
  PLAYER_SERVER_ENDPOINT,
  PLAYER_VERSION,
  PLAYER_JS_FILENAME,
  PLAYER_CSS_FILENAME,
} from '../constants';
import {
  updatePlayerOptions,
  checkIfCanUseDOM,
  loadPlayerResources,
  clearPlayerResources,
  setupPlayerOptions,
  setupPlayer,
  createPlayerInstance,
  defaultCreatePlayerFunction,
  defaultSetupPlayerFunction,
  ByteArkPlayerContainerError,
  LoadPlayerResourceError,
  SetupPlayerOptionsError,
  useListeners,
} from '../utils';
import type {
  ByteArkPlayerContainerProps,
  ByteArkPlayerContainerEvents,
  ByteArkPlayerContainerState,
  ByteArkPlayer,
  ByteArkPlayerError,
} from '../types';

window.bytearkPlayer = window.bytearkPlayer || {};

// define component's props
const props = defineProps<ByteArkPlayerContainerProps>();

// define component's events
const emit = defineEmits<ByteArkPlayerContainerEvents>();

const {
  createPlayerFunction = defaultCreatePlayerFunction,
  lazyload = false,
  playerEndpoint = PLAYER_ENDPOINT,
  playerServerEndpoint = PLAYER_SERVER_ENDPOINT,
  playerVersion = PLAYER_VERSION,
  playerJsFileName = PLAYER_JS_FILENAME,
  playerCssFileName = PLAYER_CSS_FILENAME,
  setupPlayerFunction = defaultSetupPlayerFunction,
  ...rest
} = props;

const listeners = useListeners();

// Refs for player and media elements
const playerRef = ref<ByteArkPlayer | null>(null);
const mediaRef = ref<HTMLMediaElement | null>(null);
const initializeInProgressRef = ref<boolean>(false);

const playerContainerState = reactive<ByteArkPlayerContainerState>({
  loaded: false,
  ready: false,
  error: null,
  showPlaceholder: true,
});

const onPlayerLoaded = () => {
  if (listeners.onLoaded) {
    emit('loaded');
  }

  if (props.onPlayerLoaded && typeof props.onPlayerLoaded === 'function') {
    props.onPlayerLoaded();
  }
};

const onPlayerLoadError = (
  error: ByteArkPlayerContainerError,
  originalError: ByteArkPlayerError | unknown,
) => {
  playerContainerState.error = error;

  if (listeners.onLoaderror) {
    emit('loaderror', error, originalError);
  }

  if (props.onPlayerLoadError && typeof props.onPlayerLoadError === 'function') {
    props.onPlayerLoadError(error, originalError);
  }
};

const onPlayerSetup = () => {
  playerContainerState.loaded = true;

  if (listeners.onSetup) {
    emit('setup');
  }

  if (props.onPlayerSetup && typeof props.onPlayerSetup === 'function') {
    props.onPlayerSetup();
  }
};

const onPlayerSetupError = (
  error: ByteArkPlayerContainerError,
  originalError: ByteArkPlayerError | unknown,
) => {
  playerContainerState.error = error;

  if (listeners.onSetuperror) {
    emit('setuperror', error, originalError);
  }

  if (props.onPlayerSetupError && typeof props.onPlayerSetupError === 'function') {
    props.onPlayerSetupError(error, originalError);
  }
};

const onPlayerCreated = () => {
  playerContainerState.showPlaceholder = false;

  const player = toRaw(playerRef.value);

  if (!player) {
    console.error('Player instance is not available');

    return;
  }

  if (listeners.onCreated) {
    emit('created', player);
  }

  if (props.onPlayerCreated && typeof props.onPlayerCreated === 'function') {
    props.onPlayerCreated(player);
  }
};

const onPlayerReady = () => {
  playerContainerState.ready = true;

  const player = toRaw(playerRef.value);

  if (!player) {
    console.error('Player instance is not available');

    return;
  }

  if (listeners.onReady) {
    emit('ready', player);
  }

  if (props.onPlayerReady && typeof props.onPlayerReady === 'function') {
    props.onPlayerReady(player);
  }

  if (listeners.onFirstplay) {
    player.one('play', () => emit('firstplay', player));
  }

  if (listeners.onPlay) {
    player.on('play', () => emit('play', player, player.currentTime()));
  }

  if (listeners.onPause) {
    player.on('pause', () => emit('pause', player, player.currentTime()));
  }

  if (listeners.onEnded) {
    player.on('ended', () => emit('ended', player));
  }

  if (listeners.onTimeupdate) {
    player.on('timeupdate', () => emit('timeupdate', player, player.currentTime()));
  }

  if (listeners.onSeeking) {
    player.on('seeking', () => emit('seeking', player, player.currentTime()));
  }

  if (listeners.onSeeked) {
    player.on('seeked', () => emit('seeked', player, player.currentTime()));
  }

  if (listeners.onWaiting) {
    player.on('waiting', () => emit('waiting', player));
  }

  if (listeners.onStalled) {
    player.on('stalled', () => emit('stalled', player));
  }

  if (listeners.onFullscreenchange) {
    player.on('fullscreenchange', () => emit('fullscreenchange', player, player.isFullscreen()));
  }

  if (listeners.onVolumechange) {
    player.on('volumechange', () => emit('volumechange', player, player.volume()));
  }

  if (listeners.onRatechange) {
    player.on('ratechange', () => emit('ratechange', player, player.playbackRate()));
  }

  if (listeners.onEnterpictureinpicture) {
    player.on('enterpictureinpicture', () => emit('enterpictureinpicture', player));
  }

  if (listeners.onLeavepictureinpicture) {
    player.on('leavepictureinpicture', () => emit('leavepictureinpicture', player));
  }

  if (listeners.onError) {
    player.on('error', () => emit('error', player, player.error()));
  }

  if (lazyload) {
    requestAnimationFrame(async () => {
      await player.play();
    });
  }
};

// Handle placeholder click for lazy loading
const onClickPlaceholder = async () => {
  if (lazyload) {
    await initializePlayer();
  }

  playerContainerState.showPlaceholder = false;
};

// Initialization function
const initializePlayer = async () => {
  // we'll not create a real player on server side rendering
  if (!checkIfCanUseDOM()) {
    return;
  }

  // prevent multiple initialization
  if (initializeInProgressRef.value) {
    return;
  }

  initializeInProgressRef.value = true;

  try {
    await loadPlayerResources({
      playerJsFileName,
      playerCssFileName,
      playerVersion,
      playerEndpoint,
      playerServerEndpoint,
      playerSlugId: rest.playerSlugId,
    });

    onPlayerLoaded();

    const options = await setupPlayerOptions(toRaw(props.options));

    await setupPlayer(options, setupPlayerFunction);

    onPlayerSetup();

    playerRef.value = await createPlayerInstance(
      mediaRef.value,
      options,
      createPlayerFunction,
      onPlayerReady,
    );

    onPlayerCreated();
  } catch (error) {
    if (error instanceof LoadPlayerResourceError) {
      onPlayerSetupError(error, error.originalError);
    } else if (error instanceof SetupPlayerOptionsError) {
      onPlayerLoadError(error, error.originalError);
    } else if (error instanceof ByteArkPlayerContainerError) {
      playerContainerState.error = error as ByteArkPlayerContainerError;
    }

    console.error(error);
  } finally {
    initializeInProgressRef.value = false;
  }
};

// Initialization on component mount
onMounted(async () => {
  if (!lazyload) {
    await initializePlayer();
  }
});

// Cleanup on component unmount
onUnmounted(() => {
  if (playerRef.value) {
    playerRef.value.dispose();

    playerRef.value = null;
  }

  // reset state to initial
  playerContainerState.loaded =false;
  playerContainerState.ready =false;
  playerContainerState.error = null;
  playerContainerState.showPlaceholder = true;

  // reset the initialize in progress flag
  initializeInProgressRef.value = false;

  // remove the player resources
  clearPlayerResources();
});

// Watch props and update player if they change
watch(
  props,
  (newProps) => {
    if (playerRef.value) {
      updatePlayerOptions(toRaw(playerRef.value), newProps.options);
    }
  },
  { deep: true },
);
</script>
