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
const store = useMusicStore()
const { MUSIC } = storeToRefs(store);
const music = inject("music");
const { musicConfig } = music;
const isLoop = musicConfig.loop;
const { musicList, musicInfo, hash } = MUSIC.value;
watchEffect(() => {
  console.log({ musicList, musicInfo, hash, MUSIC, music });
});
function control() {
  if (music.audio.paused) {
    music.play();
  } else {
    music.pause();
  }
}
const playHash = computed(() => hash);
function findMusic(type) {
  console.log(musicList, type, playHash.value);
  return musicList.reduce((prev, next, index) => {
    if (next.FileHash === playHash.value) {
      if (type === "next") {
        console.log(1111, index, musicList.length);
        if (index + 1 >= musicList.length) {
          prev = musicList[0];
        } else {
          prev = musicList[index + 1];
        }
      } else if (type === "prev") {
        if (index - 1 < 0) {
          prev = musicList[musicList.length - 1];
        } else {
          prev = musicList[index - 1];
        }
      }
    }
    return prev;
  }, {});
}
async function left() {
  const result = findMusic("prev");
  console.log({ result });
  const { FileHash: prevHash } = result;
  await store.getMusicInfo({
    hash: prevHash,
    type: 3,
  });
  music.play();
}
async function next() {
  const result = findMusic("next");
  const { FileHash: nextHash } = result;
  console.log(1111,nextHash, result, store) ;
  await store.getMusicInfo({
    hash: nextHash,
    type: 3,
  });
  music.play();
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
