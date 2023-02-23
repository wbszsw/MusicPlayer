<script setup lang="ts">
import { RouterView } from "vue-router";
import { toRefs, watch } from "vue";
import { useMusicStore } from "@/stores/music.ts";
const musicStore = useMusicStore();
const { musicInfo } = toRefs(musicStore);
console.log("musicInfo", musicInfo);
watch(
  () => {
    musicInfo;
  },
  (val) => {
    console.log(111111,{ val });
  }
);
</script>

<template>
  <!-- :src="musicInfo.play_url" -->
  <audio autoplay />
  <RouterView />
</template>

<style lang="scss">
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  #app {
    margin: 0;
    padding: 0;
    height: 100%;
    overflow: hidden;
    box-sizing: border-box;
    padding: 20px;
    .page {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
