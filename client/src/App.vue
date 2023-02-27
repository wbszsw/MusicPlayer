<script setup>
import { RouterView } from "vue-router";
import { watch, reactive, onMounted, ref, provide, watchEffect } from "vue";
import { useMusicStore } from "@/stores/music.ts";
import { storeToRefs } from "pinia";
import Music from "@/utils/music";
const musicStore = useMusicStore();
const store = storeToRefs(musicStore);
const { MUSIC } = store;
const playUrl = ref("");
let music = null;
watchEffect(() => {
  const { musicInfo } = MUSIC.value;
  if (music) {
    music.musicInfo = musicInfo;
  }
  const url = musicInfo.play_url ? musicInfo.play_url : "";
  playUrl.value = url;
});
watch(MUSIC, (val) => {});
onMounted(() => {
  const audioDom = document.querySelector("#audioDom");
  music = new Music(audioDom);
  provide("music", music);
});
</script>

<template>
  <!--  -->
  <audio autoplay :src="playUrl" ref="audioRef" id="audioDom" />
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component
        :is="Component"
        :key="$route.name"
        v-if="$route.meta.keepAlive"
      />
    </keep-alive>
    <component
      :is="Component"
      :key="$route.name"
      v-if="!$route.meta.keepAlive"
    />
  </router-view>
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
