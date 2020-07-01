<template>
  <div>
    <h1 class="h4">{{title}}</h1>
    <p class="text-muted mt-4">{{description}}</p>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  }
}
</script>
