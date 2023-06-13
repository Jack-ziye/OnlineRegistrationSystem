let observer = null;

const initIntersectionObserver = ({
  root = null,
  delay = 200, // 延时
  threshold = 0.5,
  frist = true, // 是否首次执行
  onEnter = () => {},
  onLeave = () => {},
}) => {
  observer = new IntersectionObserver(
    function (entries) {
      for (const entrie of entries) {
        if (!frist) {
          frist = !frist;
          return;
        }
        if (entrie.isIntersecting === true) {
          setTimeout(() => onEnter(entrie), delay);
        } else {
          setTimeout(() => onLeave(entrie), delay);
        }
      }
    },
    { root: root, threshold }
  );

  return observer;
};

const addObserver = (target) => {
  if (observer === null || observer === undefined) {
    throw new Error("IntersectionObserver is not init!");
  }

  if (target === null || target === undefined) {
    throw new Error("Please enter target, target is not null!");
  }

  target = target instanceof NodeList || target instanceof Array ? target : [target];
  for (const iterator of target) {
    observer.observe(iterator);
  }
};

const customObserver = () => {
  return {
    initObserver: initIntersectionObserver,
    addObserver: addObserver,
  };
};

export default customObserver;
