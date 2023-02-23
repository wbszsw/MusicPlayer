class Lyrics {
  getlyricsList(lyricsStr) {
    let list = lyricsStr.split("\n");
    return list.reduce((prev, next) => {
      let t = next.substring(next.indexOf("[") + 1, next.indexOf("]"));
      prev.push({
        time: (t.split(":")[0] * 60 + parseFloat(t.split(":")[1])).toFixed(3),
        title: next.substring(next.indexOf("]") + 1, next.length),
        isLight: false,
      });
    }, []);
  }
  lyricsStrLight(time, lyricList) {
    for (let i = 0; i < lyricList.length; i++) {
      if (lyricList[i].time && !isNaN(lyricList[i].time)) {
        if (lyricList[i].time <= time && lyricList[i + 1].time >= time) {
          lyricList[i].isLight = true;
        } else {
          lyricList[i].isLight = false;
        }
      }
    }
  }
}
export default Lyrics;
