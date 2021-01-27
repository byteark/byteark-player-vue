<template>
  <div
    :class="{'fluid': isFluidLayout}"
    class="player-place-holder"
    :style="customStyle">
  </div>
</template>

<script>
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
  computed: {
    isFluidLayout() {
      return this.options && this.options.fluid;
    },
    customStyle() {
      if (this.isFluidLayout) {
        const ratio = calculatePlaceholderPaddingTopFromAspectRatio(this.options.aspectRatio);
        return `padding-top: ${ratio}%`;
      }
      return '';
    },
  },
};
</script>

<style lang="scss" scoped>
.player-place-holder {
  position: absolute;
  width: 100%;
  min-width: 100%;
  background-color: #000000;
  &.fluid {
    height: 100%;
  }
}
</style>
