<template>
  <div class="play-control">
    <div class="loop pd-r-30" @click="loop()">
      <var-icon name="refresh" :color="isLoop ? '#2979ff' : ''" />
    </div>
    <div class="control">
      <div class="prev" @click="prev()">
        <var-icon name="chevron-left" color="#2979ff" />
      </div>
      <div class="type" @click="control()">
        <var-icon name="play-circle-outline" color="#2979ff" />
      </div>
      <div class="next" @click="next()">
        <var-icon name="chevron-right" color="#2979ff" />
      </div>
    </div>
    <div class="enum pd-l-30">
      <var-icon name="format-list-checkbox" color="#2979ff" />
    </div>
  </div>
</template>
<script setup>
import { inject, watch, watchEffect, ref, computed } from "vue";
import { useMusicStore } from "@/stores/music";
import { storeToRefs } from "pinia";
const store = useMusicStore();
const { MUSIC, changePlay } = storeToRefs(store);
const music = inject("music");
const { musicConfig } = music;
const isLoop = musicConfig.loop;
const { musicList, musicInfo, hash } = MUSIC.value;
import eventBus from "@/event";
function control() {
  if (music.audio.paused) {
    music.play();
  } else {
    music.pause();
  }
}

async function prev() {
  store.changePlay("prev");
}
async function next() {
  store.changePlay("next");
}
function loop() {
  isLoop.value = !isLoop.value;
}
</script>
<style lang="scss" scope>
.play-control {
  display: flex;
  flex-direction: row;
  .control {
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .pd-l-30 {
    padding-left: 30px;
  }
  .pd-r-30 {
    padding-right: 30px;
  }
}
</style>
