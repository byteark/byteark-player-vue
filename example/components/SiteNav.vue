<template>
  <header class="navbar navbar-light bg-light">
    <div class="container">
      <RouterLink
        to="/"
        class="navbar-brand"
      >
        ByteArk Player Container for Vue
      </RouterLink>
      <ul class="navbar-nav">
        <li class="nav-item">
          <RouterLink
            to="/"
            class="nav-link"
          >
            <span class="mr-1">&#8592;</span>
            <span>Back to Home</span>
          </RouterLink>
        </li>
      </ul>
    </div>
  </header>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>
