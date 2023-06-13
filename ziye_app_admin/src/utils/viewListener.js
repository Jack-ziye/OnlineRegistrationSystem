/**
 * 视图监听器
 *
 * @param {Number} delay 延时
 * @param {Object} state 状态管理
 * @param {Number} frist 首次执行
 * @param {Function} handleEnter 进入时执行函数
 * @param {Function} handleLeave 离开时执行函数
 *
 * @template TestCode
 *  import viewListener from "{path}/viewListener";
 *  viewListener({
        delay: 0,
        handleEnter: (state) => console.log("handleEnter", state),
        handleLeave: (state) => console.log("handleLeave", state),
      });
 *
 */

const viewListener = ({ delay = 200, state = {}, frist = true, handleEnter = () => {}, handleLeave = () => {} }) => {
  let _hidden, _visibilityChange;

  if (typeof document.hidden !== "undefined") {
    _hidden = "hidden";
    _visibilityChange = "visibilitychange";
  } else if (typeof document.msHidden !== "undefined") {
    _hidden = "msHidden";
    _visibilityChange = "msvisibilitychange";
  } else {
    return undefined;
  }

  frist && handleEnter(state);

  document.addEventListener(_visibilityChange, () => {
    if (document[_hidden]) {
      setTimeout(() => handleLeave(state), delay);
    } else {
      setTimeout(() => handleEnter(state), delay);
    }
  });
};

export default viewListener;
