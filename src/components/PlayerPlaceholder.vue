<template>
  <div
    :class="{'fluid': isFluidLayout}"
    class="player-place-holder"
    :style="customStyle">
<!--    eslint-disable-next-line-->
    <svg class="play-icon" width="90" viewBox="0 0 60 60"><path d="M47.43,27.26,14.11,5.87A3.34,3.34,0,0,0,9,8.79V51.56a3.34,3.34,0,0,0,5.11,2.91L47.43,33.09A3.49,3.49,0,0,0,47.43,27.26Z"/></svg>
  </div>
</template>

<script>
import PlayIcon from '../icons/ByteArkPlayer-Play.svg';
import calculatePlaceholderPaddingTopFromAspectRatio from '../helpers/styleCalculator';

export default {
  props: {
    options: {
      type: Object,
      required: true,
    },
    error: {
      type: Object,
      default: () => null,
    },
  },
  data() {
    return {
      PlayIcon,
    };
  },
  computed: {
    isFluidLayout() {
      return this.options && this.options.fluid;
    },
    customStyle() {
      let style = '';
      if (this.isFluidLayout) {
        const ratio = calculatePlaceholderPaddingTopFromAspectRatio(this.options.aspectRatio);
        style += `padding-top: ${ratio}%;`;
      }
      style += `background-image: url(${this.options.poster});`;
      return style;
    },
  },
};
</script>

<style lang="scss" scoped>
.player-place-holder {
  position: relative;
  width: 100%;
  min-width: 100%;
  background-color: #000000;
  background-size: cover;
  background-repeat: no-repeat;
  cursor: pointer;
  &.fluid {
    height: 100%;
  }
  &.played {
    position: absolute;
  }

  .play-icon {
    position: absolute;
    width: 90px;
    top: 50%;
    left: 50%;
    margin-top: -2.75em;
    margin-left: -2.75em;
    background: rgba(0, 0, 0, 0.7);
    border-radius: 50%;
    path {
      fill: #FFF;
      transform: translateX(13px) translateY(9px) scale(0.7);
    }
  }
}
</style>
