import axios from "./axios";
import base from "./base";
import qs from 'qs'

export function getMusicList(params) {
  return axios.post(`${base.development}/getSongList`, qs.stringify(params));
}
export function getMusicInfo(params) {
  return axios.post(`${base.development}/getSongInFo`, qs.stringify(params));
}
// export default {
//   getMusicList,
//   getMusicInfo,
// };
