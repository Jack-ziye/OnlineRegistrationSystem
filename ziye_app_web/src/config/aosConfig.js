/* eslint-disable no-dupe-keys */
const config = {
  disable: "mobile", //屏幕尺寸小于1024禁用
  startEvent: "DOMContentLoaded", //在文档上分派的事件的名称，AOS应该在这个事件上初始化
  // initClassName: "aos-init", //初始化后应用的类
  animatedClassName: "aos-animate", //类应用于动画
  useClassNames: false, //如果为真，将添加' data-aos '的内容作为滚动类
  disableMutationObserver: false, //禁用自动突变检测(高级)
  debounceDelay: 50, //调整窗口大小时使用的deboundelay延迟(高级)
  throttleDelay: 99, // 滚动页面时使用油门的延迟(高级)

  // useClassNames: true,
  initClassName: false,
  // animatedClassName: "aos-animate",

  //可以通过' data-aos-* '属性覆盖每个元素的设置:
  offset: 120, //与原始触发点的偏移量(单位:px)
  delay: 0, //值从0到3000，步骤为50ms
  duration: 400, //从0到3000的值，步长50ms
  easing: "ease", // AOS动画的默认easing
  once: false, // 动画是否只会触发一次，或者每次上下滚动都会触发（默认false）
  mirror: false, //当滚动时元素是否动画化
  anchorPlacement: "top-bottom", //锚位置，触发动画时元素位于屏幕的位置（默认top-bottom）
};

export default config;
