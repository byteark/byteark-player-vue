<template>
  <div class="player-place-holder">
    <div
      v-if="!error"
      :class="customClass"
      :style="customStyle">
    </div>
    <ErrorMessageContainer
      v-if="error"
      :error="error"/>
  </div>
</template>

<script>
import ErrorMessageContainer from './ErrorMessageContainer.vue';
import calculatePlaceholderPaddingTopFromAspectRatio from '../helpers/styleCalculator';

export default {
  props: {
    customClass: {
      type: String,
      default: () => '',
    },
    fluid: {
      type: Boolean,
      default: () => true,
    },
    fill: {
      type: Boolean,
      default: () => false,
    },
    aspectRatio: {
      type: String,
      default: () => '16:9',
    },
    error: {
      type: Object,
      default: () => null,
    },
  },
  data() {
    return {
      customStyle: '',
    };
  },
  created() {
    this.checkProps();
  },
  components: {
    ErrorMessageContainer,
  },
  methods: {
    checkProps() {
      if (this.fluid) {
        this.customStyle += 'padding-top: ';
        this.customStyle += calculatePlaceholderPaddingTopFromAspectRatio(this.aspectRatio);
        this.customStyle += '%;';
      }
      if (!this.fluid && this.fill) {
        this.customStyle += 'height: 100%;';
        this.customStyle += 'minHeight: 100%';
      }
    },
  },
};
</script>

<style scoped>
.player-place-holder {
  position: relative;
  width: 100%;
  min-width: 100%;
  background-color: #000000;
}
</style>
