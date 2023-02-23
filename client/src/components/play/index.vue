<template>
  <div class="play-wrap">
    <play-header />
    <play-content class="play-content" />
    <div class="play-footer">
      <play-slide-bar />
      <play-control />
    </div>
  </div>
</template>
<script setup>
import playHeader from "@/components/play/header/index.vue";
import playContent from "@/components/play/content/index.vue";
import playSlideBar from "@/components/play/slide-bar/index.vue";
import playControl from "@/components/play/control/index.vue";
</script>
<style lang="scss" scope>
.play-wrap {
  display: flex;
  flex-direction: column;
  height: 100%;
  .play-content {
    display: flex;
    flex-grow: 1;
  }
  .play-footer {
  }
}
</style>
