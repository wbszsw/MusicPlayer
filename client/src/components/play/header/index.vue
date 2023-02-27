<template>
  <div class="header">
    <div class="left">
      <var-icon name="chevron-left" @click="back()" />
    </div>
    <div class="content">
      <div class="name">{{ name }}</div>
      <div class="author">{{ author }}</div>
    </div>
    <div class="right"></div>
  </div>
</template>
<script setup>
import { ref, toRef } from "vue";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useMusicStore } from "@/stores/music";
const musicStore = storeToRefs(new useMusicStore());
const { musicInfo } = musicStore.MUSIC.value;
const { author_name, audio_name } = musicInfo;
const router = useRouter();
const author = ref(author_name);
const name = ref(audio_name);
function back() {
  router.go(-1);
}
</script>
<style lang="scss" scope>
.header {
  display: flex;
  flex-direction: row;
  align-items: center;
  .content {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    align-items: center;
  }
}
</style>
