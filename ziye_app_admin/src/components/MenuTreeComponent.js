import { Tree } from "antd";
import { flatten } from "@/utils";
import { useState, useEffect } from "react";

const MenuTreeComponent = (props) => {
  const [checkedKeys, setCheckedKeys] = useState([]);

  const menuFilter = (currentList, sourceList, fieldNameKeys) => {
    if (!currentList.length || !sourceList.length) return [];

    let fieldNames = { key: "key", title: "title", children: "children" };
    if (fieldNameKeys) {
      fieldNames = fieldNameKeys;
    }
    const listA = [...currentList];
    const listB = flatten([...sourceList]);
    const newList = listA.filter((item) => {
      const menu = listB.find((value) => `${value[fieldNames.key]}` === `${item}`);
      return !menu[fieldNames.children];
    });
    return [...newList];
  };

  useEffect(() => {
    if (props.value) {
      const { value, treeData, fieldNames } = props;
      const list = menuFilter(value, treeData, fieldNames);
      setCheckedKeys(list);
    }
  }, [props]);

  const onCheck = (checkedKeys, e) => {
    props.onCheck && props.onCheck(checkedKeys, e);
    props.onChange && props.onChange([...e.halfCheckedKeys, ...checkedKeys].sort((a, b) => a - b));
  };

  return <Tree {...props} checkedKeys={checkedKeys} onCheck={onCheck} />;
};

export default MenuTreeComponent;
