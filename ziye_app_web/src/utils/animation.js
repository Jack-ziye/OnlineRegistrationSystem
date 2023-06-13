/**
 * 动画
 *
 * @param {*} root
 */
const animation = ({
  root = null,
  target,
  animationName = "z-animation",
  delay = 200,
  threshold = 0.5,
  onEnter = () => {},
  onLeave = () => {},
}) => {
  let ob = new IntersectionObserver(
    function (entries) {
      for (const entrie of entries) {
        if (entrie.isIntersecting === true) {
          setTimeout(() => onEnter(entrie, animationName), delay);
        } else {
          setTimeout(() => onLeave(entrie, animationName), delay);
        }
      }
    },
    {
      root: root,
      threshold: threshold,
    }
  );
  for (const iterator of target) {
    ob.observe(iterator);
  }
};

export default animation;
