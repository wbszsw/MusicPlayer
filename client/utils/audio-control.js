/**
 * @desc 振荡器
 */
class audioControl {
  constructor(audioCtx) {
    if (!audioCtx) {
      return new Error("请先传入audioCtx对象");
    }
    this.audioCtx = audioCtx;
  }
  // 创建振荡器
  createAudioOscillator() {
    this.audioOscillator = this.audioCtx.createOscillator();
  }
  // 设置振荡器参数
  setAudioOscillatorParams(params) {
    if (!this.audioOscillator) {
      return new Error("请先创建振荡器");
    }
    const { type, frequency } = params;
    if (type) {
      //设置波形，可选值：'square','triangle','sawtooth','sine'
      this.audioOscillator.type = type;
    }
    if (frequency) {
      //频率
      this.audioOscillator.frequency.value = frequency.value;
    }
  }
  // 创建音量节点
  createAudioGainNode() {
    this.audioGainNode = this.audioCtx.createGain();
  }
  //设置🥤节点参数
  setAudioGainNodeParams(params) {
    if (!this.audioGainNode) {
      return new Error("请先创建音量节点");
    }
    const {
      audioPlayType,
      setValueAtTime = {},
      linearRampToValueAtTime = {},
      exponentialRampToValueAtTime = {},
    } = params;
    if (audioPlayType === "setValueAtTime") {
      const { start, currentTime } = setValueAtTime;
      //AudioParam.setValueAtTime()方法，该方法支持两个参数，一个是音量（范围0-1），另一个参数是时间。这里调用setValueAtTime(0, audioCtx.currentTime)表示当下就把音量设为0，也就是没声音。
      this.audioGainNode.gain.setValueAtTime(start, currentTime);
    } else if (audioPlayType === "linearRampToValueAtTime") {
      const { volume, currentTime, section } = linearRampToValueAtTime;
      // linearRampToValueAtTime()方法表示音量在某时间线性变化到某值，这里linearRampToValueAtTime(1, audioCtx.currentTime + 0.01)实际上表示的是在0.01秒的时间内，声音音量线性从0到1。
      this.audioGainNode.gain.linearRampToValueAtTime(
        volume,
        currentTime + section
      );
    } else if (audioPlayType === "exponentialRampToValueAtTime") {
      const { start, end } = exponentialRampToValueAtTime;
      // 音频音量变化，淡入淡出
      //exponentialRampToValueAtTime()方法表示音量在某时间指数变化到某值，这里的exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1)实际上表示的是在1.00秒的时间内，音量由之前的1以指数曲线的速度降到极低的0.001音量
      this.audioGainNode.gain.exponentialRampToValueAtTime(start, end);
    }
  }
  // 关联振荡器和音量控制器：
  audioOscillatorRelationAudioGainNode() {
    if (!this.audioOscillator || !this.audioGainNode) {
      return new Error("请先创建音乐节点或者振荡器");
    }
    this.audioOscillator.connect(this.audioGainNode);
  }
  // 音量控制器关联目的输出节点
  audioControlRelationOutputNode() {
    this.audioGainNode.connect(this.audioCtx.destination);
  }
  set relationType(type) {
    if (type === 1) {
      this.audioOscillatorRelationAudioGainNode();
    } else if (type === 2) {
      this.audioControlRelationOutputNode();
    }
  }
}
export default audioControl;
