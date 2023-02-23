function debounce(fn, wait = 500) {
  let timer = null;
  return function () {
    if (timer) {
      return;
    }
    setTimeout(() => {
      fn();
      clearTimeout(timer);
    }, wait);
  };
}
export default {
    debounce
}