import { ref, computed, reactive } from "vue";
import { defineStore } from "pinia";
import utils from "@/utils";
import {
  getMusicList as getMusicListApi,
  getMusicInfo as getMusicInfoApi,
} from "@/api/index.js";
export const useMusicStore = defineStore("MUSIC", () => {
  let musicList: Array = [];
  const getMusicList = async (params: Object) => {
    musicList = [];
    const res = await getMusicListApi(params);
    const list = res?.data?.data?.data?.lists || [];
    musicList = list.map((item) => utils.songPipeView(item));
    return computed(() => musicList);
  };
  // 做个缓存
  let musicInfo = {};
  const getMusicInfo = async (params: Object) => {
    let id: null = null;
    if (!musicInfo[params.id]) {
      const infos = await getMusicInfoApi(params);
      let info = infos.data.data.data;
      musicInfo[info.id] = info;
      id = info.id;
    } else {
      id = params.id;
    }
    return computed(() => musicInfo[id]);
  };
  return { musicList, getMusicList, musicInfo, getMusicInfo };
});
