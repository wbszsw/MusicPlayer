import Lyrics from "./lyrics";
const lyrics = new Lyrics();
import AudioHandle from "./audio-handle";
class Music extends AudioHandle {
  static AUDIO_CONFIG = {
    // 循环播放
    loop: false,
    // 显示原生控制界面
    controls: false,
    // autoplay 自动播放
    autoplay: true,
    //静音
    muted: false,
    // (只读) 返回当前音频/视频的URL
    currentSrc: "",
    //(只读) 返回当前音频/视频的长度（以秒计）
    duration: 0,
    //设置或返回音频/视频的当前播放位置（以秒计）
    currentTime: 1,
    //设置或返回音频/视频的当前音量，范围0~1
    volume: 1,
    //设置或返回音频/视频的当前播放速度 0,1,2
    playbackRate: 1,
    //(只读) 返回音频/视频是否播放完毕 true 已经播放完毕
    ended: false,
    // (只读) 设置或返回音频/视频是否暂停  true 暂停
    paused: false,
  };
  constructor(audioDom) {
    super(audioDom);
    this.musicConfig = { ...Music.AUDIO_CONFIG };
    this.audio = audioDom;
  }
  get audioReady() {
    return this.audio && this.music;
  }
  set musicInfo(music) {
    this.music = music;
    const { lyrics } = this.lyricsStr;
    this.lyricsList = lyrics.getlyricsList(lyrics);
  }
  set audioConfigParams(params) {
    this.musicConfig = {
      ...Music.AUDIO_CONFIG,
      ...params,
    };
  }
  listenCanplayEvent(callback) {
    this.canplayEvent((time) => {
      this.audioConfigParams = { duration: time };
      callback(time);
    });
  }
  listenTimeupdateEvent(callback) {
    this.timeupdateEvent((time) => {
      this.audioConfigParams = { currentTime: time };
      callback(time);
    });
  }
}
export default Music;
