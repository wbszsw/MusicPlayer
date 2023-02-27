import { ref, computed, reactive } from "vue";
import { defineStore } from "pinia";
import utils from "@/utils";
import {
  getMusicList as getMusicListApi,
  getMusicInfo as getMusicInfoApi,
} from "@/api/index.js";
export const useMusicStore = defineStore("MUSIC", () => {
  const MUSIC = reactive({
    musicList: [],
    musicInfo: {},
    hash:""
  });
  function changeHash(str) {
    MUSIC.hash = str;
  }
  let musicList = [];
  const getMusicList = async (params: Object) => {
    const res = await getMusicListApi(params);
    const list = res?.data?.data?.data?.lists || [];
    musicList = list.map((item) => utils.songPipeView(item));
    MUSIC.musicList = musicList;
    return computed(() => MUSIC.musicList);
  };
  // 做个缓存
  let musicInfo = reactive({});
  const getMusicInfo = async (params: Object) => {
    let id;
    if (!musicInfo[params.hash]) {
      const infos = await getMusicInfoApi(params);
      let info = infos.data.data.data;
      musicInfo[info.hash] = info;
      id = info.hash;
    } else {
      id = params.hash;
    }
    MUSIC.musicInfo = musicInfo[id];
    return computed(() => musicInfo[id]);
  };
  return {
    musicList: MUSIC.musicList,
    getMusicList,
    musicInfo,
    getMusicInfo,
    hash: MUSIC.hash,
    changeHash,
    MUSIC
  };
});
