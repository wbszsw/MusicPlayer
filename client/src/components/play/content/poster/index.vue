<template>
  <div class="poster">
    <div class="img-post">
      <img :src="postUrl" alt="" />
    </div>
  </div>
</template>
<script setup>
import { useMusicStore } from "@/stores/music";
import { storeToRefs } from "pinia";
import { ref } from "vue";
const musicStore = storeToRefs(new useMusicStore());
const { MUSIC } = musicStore;
const { musicInfo } = MUSIC.value;
console.log("musicInfo", musicInfo);
const { img } = musicInfo;
const postUrl = ref(img);
</script>
<style lang="scss" scope>
.poster {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  .img-post {
    animation-name: imgRotate;
    animation-duration: 4s;
    img {
      width: 100%;
      border-radius: 50%;
    }
  }
}
@keyframes imgRotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
