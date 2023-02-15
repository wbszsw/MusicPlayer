import audioControl from "./audio-control";
class audioSystem extends audioControl {
  constructor(window) {
    this.window = window;
    this.initAudioSystem();
  }
  initAudioSystem() {
    const AudioContext =
      this.window.AudioContext || this.window.webkitAudioContext;
    try {
      this.audioCtx = new AudioContext();
    } catch (e) {
      this.audioCtx = null;
      console.log("浏览器不支持...");
    }
  }
}
export default audioSystem;
