<template>
  <div class="slide-bar">
    <div class="left">{{ showLabelLeft }}</div>
    <var-slider v-model="pregress" class="slider"></var-slider>
    <div class="right">{{ showLabelRight }}</div>
  </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted, toRefs, inject, watchEffect } from "vue";
import { timeFormat } from "@/utils/pipe.js";
const music = inject("music");
const pregress = ref(0);
const showLabelLeft = ref("");
const showLabelRight = ref("");
music.listenTimeupdateEvent((time) => {
  const currentTime = music.musicConfig.currentTime;
  const duration = Math.ceil((time * 100) / currentTime);
  pregress.value = duration;
  showLabelLeft.value = timeFormat(duration);
  showLabelRight.value = timeFormat(currentTime);
});
</script>
<style lang="scss" scope>
.slide-bar {
  padding: 40px 0;
  display: flex;
  flex-direction: row;
  .slider {
    flex: 1;
  }
}
</style>
