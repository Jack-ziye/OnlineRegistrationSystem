function debounce(fn, delay = 1000) {
  let timer = null;
  return function _debounce(params) {
    if (timer !== null) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => fn(params), delay);
  };
}

export default debounce;
