<template>
  <div class="lyric" id="lyricWrap">
    <ul>
      <li
        v-for="(item, index) in lyricInfo.lyricsList"
        :key="index + key"
        :datas="item.time"
        :class="item.isLight ? 'lineheight' : ''"
        :ref="item.isLight ? 'DOMlineheight' : ''"
      >
        {{ item.title }}
      </li>
    </ul>
  </div>
</template>
<script setup>
import { inject, reactive, watchEffect, computed, ref } from "vue";
const music = inject("music");
const lyricInfo = reactive({});
const key = ref(1000);
watchEffect(() => {
  lyricInfo.lyricsList = computed(() => music.lyricsList);
});
music.listenTimeupdateEvent(async (time) => {
  await music.lyricsStrLight(time);
  lyricInfo.lyricsList = computed(() => music.lyricsList);
  await lyricsScroll(time);
});
function lyricsScroll(time) {
  const lyricWrap = document.getElementById("lyricWrap");
  let domLiLightDom = document.getElementsByClassName("lineheight");
  if (domLiLightDom) {
    const domLiLignt = domLiLightDom[0];
    if (domLiLignt) {
      lyricWrap.scrollTop = domLiLignt.offsetTop - 200;
    }
  }
}
</script>
<style lang="scss" scope>
.lyric {
  width: 100%;
  background: #000;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  box-sizing: border-box;
  padding-top: 50px;
  color: gray;
}
.lineheight {
  color: #ffffff !important;
}
ul,
li {
  list-style: none;
}
li {
  line-height: 40px;
}
</style>
