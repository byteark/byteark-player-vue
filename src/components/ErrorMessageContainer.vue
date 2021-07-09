<template>
  <div class="error-message-container">
    <div class="error-group">
      <p class="primary-text">{{error.message}}</p>
      <p class="secondary-text">{{error.messageSecondary}}</p>
      <p class="error-text">{{error.code}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.error-message-container {
  font-family: inherit;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  width: 100%;
  height: 100%;
  .primary-text {
    color: #eaeaea;
    font-weight: bold;
    margin-bottom: 0;
  }
  .secondary-text {
    color: #bababa;
    font-weight: bold;
    margin-bottom: 0;
  }
  .error-text {
    color: #7a7a7a;
    font-size: smaller;
    margin-top: 1rem;
    margin-bottom: 0;
  }
}
</style>
