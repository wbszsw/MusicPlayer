export function songPipeView(params) {
  const { SongName, AlbumName, SingerName, OriOtherName } = params;
  let name = SongName,
    auther = SingerName;
  return { ...params, name, auther, id: Symbol() };
}

export function timeFormat(num) {
  if (Object.prototype.toString.call(num) !== "[object Number]")
    return "时间戳格式不对";
  let mins = null,
    seconds = null;
  if (num > 60) {
    mins = parseInt(num / 60);
    seconds = (num % 60).toFixed(2);
    return getMinAndSeconds(mins, seconds);
  } else {
    num < 10 ? `0${num}` : num.toFixed(2);
    return `00:${num}`;
  }
}

export function getMinAndSeconds(mins, seconds) {
  if (mins < 10) {
    mins = `0${mins}`;
  }
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
  return `${mins}:${seconds}`;
}
export default {
  songPipeView,
  timeFormat,
  getMinAndSeconds,
};
