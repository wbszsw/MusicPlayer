<template>
  <div class="about">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script setup>
  import {ref, reactive} from "vue"
  const msg = ref('This is an page')
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
