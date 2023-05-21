import { timeFormat } from "./pipe";
class AudioHandle {
  constructor(audio) {
    this.audio = audio;
  }
  /**
   * @description 播放
   */

  play() {
    this.audio.play();
  }

  /**
   * @description 暂停
   */

  pause() {
    this.audio.pause();
  }

  /**
   * @description 监听oncanplay: 音频可以播放事件(缓冲已足够开始时)
   */
  canplayEvent(callback) {
    this.audio.addEventListener("canplay", () => {
      callback(this.audio.duration);
    });
  }

  /**
   * @description 监听ontimeupdate 播放时间更新的事件
   */
  timeupdateEvent(callback) {
    this.audio.addEventListener("timeupdate", () => {
      if (this.audio.currentTime) {
        callback(this.audio.currentTime);
      }
    });
  }
}
export default AudioHandle;
