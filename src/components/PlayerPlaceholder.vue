<template>
  <div
    v-if="error"
    :style="placeholderCustomStyle"
  >
    <PlayerLoadErrorMessage :error="error" />
  </div>
  <div
    v-if="!error"
    :class="customClass"
    :style="placeholderCustomStyle"
    @click="onClick"
  >
    <svg
      v-if="shouldShowPlayIcon"
      class="play-icon"
      width="90"
      viewBox="0 0 60 60"
      :style="playIconStyle"
    >
      <!-- eslint-disable max-len -->
      <path
        :style="pathStyle"
        d="M47.43,27.26,14.11,5.87A3.34,3.34,0,0,0,9,8.79V51.56a3.34,3.34,0,0,0,5.11,2.91L47.43,33.09A3.49,3.49,0,0,0,47.43,27.26Z"
      />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { CSSProperties } from 'vue';
import PlayerLoadErrorMessage from './PlayerLoadErrorMessage.vue';
import { ByteArkPlayerContainerError, getPlaceholderPaddingTopFromAspectRatio } from '../utils';
import type { ByteArkPlayerOptions } from '../types';

interface Props {
  aspectRatio: string | undefined;
  onClick: () => void;
  customClass?: string;
  error: ByteArkPlayerContainerError | null;
  lazyload: boolean;
  loaded: boolean;
  playerOptions: ByteArkPlayerOptions;
}

const props = defineProps<Props>();

const options = props.playerOptions;

const placeholderCustomStyle: CSSProperties = {
  position: 'relative',
  width: '100%',
  minWidth: '100%',
  background: '#000000',
  backgroundImage: 'none',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
};

if (options.fluid) {
  placeholderCustomStyle.paddingTop = `${getPlaceholderPaddingTopFromAspectRatio(
    props.aspectRatio || '16:9',
  )}%`;
}

if (!options.fluid && options.fill) {
  placeholderCustomStyle.height = '100%';
  placeholderCustomStyle.minHeight = '100%';
}

if (props.lazyload && !props.loaded) {
  placeholderCustomStyle.position = 'relative';
}

if (props.lazyload && props.loaded) {
  placeholderCustomStyle.position = 'absolute';
}

if (!props.error) {
  // set placeholder poster image
  placeholderCustomStyle.backgroundImage = `url(${options.poster})`;

  placeholderCustomStyle.cursor = 'pointer';
}

const playIconStyle: CSSProperties = {
  position: 'absolute',
  width: '90px',
  top: '50%',
  left: '50%',
  marginTop: '-2.75em',
  marginLeft: '-2.75em',
  background: 'rgba(0, 0, 0, 0.85)',
  borderRadius: '50%',
};

const pathStyle: CSSProperties = {
  fill: '#FFF',
  transform: 'translateX(13px) translateY(9px) scale(0.7)',
};

const shouldShowPlayIcon =
  options.controls === undefined || options.controls === null || options.controls === true;
</script>
