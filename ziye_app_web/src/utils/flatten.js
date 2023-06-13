// 扁平化
const flatten = (arr) => {
  return arr.reduce(function (prev, item) {
    prev.push(item);
    return prev.concat(
      Array.isArray(item.children) ? flatten(item.children) : []
    );
  }, []);
};

export default flatten;
