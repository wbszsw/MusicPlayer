<template>
  <div class="search-list">
    <TransitionGroup name="list" tag="div">
      <div
        v-for="(item, index) in searchList"
        :key="item.id"
        @click="toListen(item)"
      >
        <var-cell icon="fire" :title="item.name">
          <template #extra>
            <span v-if="playIndex === index">播放</span>
            <var-icon name="information" />
          </template>
        </var-cell>
      </div>
    </TransitionGroup>
  </div>
</template>
<script setup>
import {
  ref,
  reactive,
  watchEffect,
  watch,
  computed,
  toRefs,
  onUpdated,
} from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { getMusicInfo } from "@/api";
import { useMusicStore } from "@/stores/music";
const router = useRouter();
const props = defineProps(["searchList", "b"]);
let { searchList } = toRefs(props);
const musicStore = useMusicStore();
const { MUSIC } = storeToRefs(musicStore);
async function toListen(params, indexs) {
  const { type, FileHash } = params;
  const datas = await musicStore.getMusicInfo({
    hash: FileHash,
    type: 3,
  });
  musicStore.changeHash(FileHash);
  const { author_name, img, lyrics, play_url, song_name, album_name } = datas;
  const musicInfos = {
    author_name: author_name,
    haibao: img,
    lyrics: lyrics,
    play_url: play_url,
    song_name: song_name,
    album_name: album_name,
    type: 3,
    // 根据播放id来控制循环播放对下一首
    bofangId: indexs,
  };
  router.push({ name: "play", query: { ...musicInfos } });
}
const playIndex = ref(-1);
watchEffect(() => {
  const index = searchList.value.findIndex(
    (item) => item.FileHash === MUSIC.value.musicInfo.hash
  );
  console.log(
    "触发",
    searchList.value,
    index,
    MUSIC.value.musicInfo.FileHash,
    MUSIC.value.musicInfo.hash
  );
  playIndex.value = index;
});
</script>
<style lang="scss" scope>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.search-list {
  :deep(.var-cell__extra) {
    flex: none;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 60px;
  }
}
</style>
