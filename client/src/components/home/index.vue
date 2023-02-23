<template>
  <div class="wrap">
    <search
      @searchUpdateData="searchUpdateData"
      :loading="loading"
      class="layout-top"
    />
    <content :searchList="searchList" :b="b" class="layout-bottom" />
  </div>
</template>
<script setup>
import search from "./search/index.vue";
import content from "./content/index.vue";
import { reactive, ref } from "vue";
import { useMusicStore } from "@/stores/music";
const musicStore = useMusicStore();
let loading = ref(false);
let searchList = [];
let b = ref(4);
async function searchUpdateData(name, loadingStaus) {
  loading = loadingStaus;
  let list = await musicStore.getMusicList({
    type: 3,
    SerchMsg: name,
  });
  searchList = list;
  b.value = 5;
  loading = false;
}
</script>
<style lang="scss" scope>
.wrap {
  display: flex;
  flex-direction: column;
  height: 100%;
  //   .layout-top {

  //   }
  .layout-bottom {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
  }
}
</style>
