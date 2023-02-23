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
            <var-icon name="information" />
          </template>
        </var-cell>
      </div>
    </TransitionGroup>
  </div>
</template>
<script setup>
import { reactive, watchEffect, watch, computed, toRefs, onUpdated } from "vue";
import { useRouter } from "vue-router";
import { getMusicInfo } from "@/api";
import { useMusicStore } from "@/stores/music";
const router = useRouter();
const props = defineProps(["searchList", "b"]);
let { searchList } = toRefs(props);
const musicStore = useMusicStore();
watch(
  searchList,
  (old, newl) => {
    console.log({ searchList });
  },
  { immediate: true, deep: true }
);
watchEffect(() => {
  console.log("searchList", searchList);
});

onUpdated(() => {
  console.log(searchList);
});
async function toListen(params, indexs) {
  const { type, FileHash } = params;
  musicStore
    .getMusicInfo({
      hash: FileHash,
      type: 3,
    })
    .then((datas) => {
      const musicInfos = {
        author_name: datas.author_name,
        haibao: datas.img,
        lyrics: datas.lyrics,
        play_url: datas.play_url,
        song_name: datas.song_name,
        album_name: datas.album_name,
        type: 3,
        // 根据播放id来控制循环播放对下一首
        bofangId: indexs,
      };
      router.push({ name: "play", query: { ...musicInfos } });
    });
}
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
</style>
