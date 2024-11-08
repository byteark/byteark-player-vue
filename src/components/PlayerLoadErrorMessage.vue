<!-- eslint-disable max-len -->
<template>
  <div class="error-message-container">
    <div>
      <p class="primary-text">
        {{ error.message }}
      </p>
      <p class="secondary-text">
        {{ error.messageSecondary }}
      </p>
      <p class="error-code-text">
        {{ error.code }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ByteArkPlayerContainerError } from '../utils';

interface Props {
  error: ByteArkPlayerContainerError | null;
}

const props = defineProps<Props>();

const error = props.error || {
  message: 'An unknown error occurred',
  messageSecondary: 'Please refresh the page to try again.',
  code: 'ERROR_BYTEARK_PLAYER_VUE_100000',
};
</script>

<style lang="scss" scoped>
.error-message-container {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu',
  'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;

  .primary-text {
    color: #eaeaea;
    font-weight: bold;
    margin-bottom: 0;
  }

  .secondary-text {
    color: #bababa;
    margin-bottom: 0;
  }

  .error-code-text {
    color: #7a7a7a;
    font-size: smaller;
    margin-top: 1rem;
    margin-bottom: 0;
  }
}
</style>
