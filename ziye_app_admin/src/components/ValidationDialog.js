import React from "react";
import { ReloadOutlined } from "@ant-design/icons";
import { Modal, Avatar, message } from "antd";
import "@/styles/login.scss";
import { useState } from "react";
import Valid_bg from "../assets/starry.jpg";
import { useEffect } from "react";

const ValidationDialog = ({ isModalOpen, setIsModalOpen, callback }) => {
  const [textList, setTextList] = useState([]); // 文字序列
  const [validTextList, setVaildTextList] = useState([]); // 验证文字序列
  const [activeNum, setActiveNum] = useState(0); // 点击次数

  const makeTextList = () => {
    const len = 4; // 文字字数
    let list = []; // 文字序列
    let textKey = [0, 0, 0]; // 验证文字序列

    // 生成随机数
    const randomNum = (min, max) => {
      return min + Math.round(Math.random() * (max - min));
    };

    // 添加验证文字序列
    const pushText = (value) => {
      const k = randomNum(0, textKey.length - 1);
      if (textKey[k] === 0) {
        textKey[k] = value;
      } else {
        let flag = true; // 是否已经放满标记
        for (let i = 0; i < textKey.length; i++) {
          if (textKey[i] === 0) {
            textKey[i] = value;
            flag = false;
            break;
          }
        }

        if (flag && k % 2) {
          textKey[k] = value;
        }
      }
    };

    for (let i = 0; i < len; i++) {
      // 生成样式
      const start = 30 + 100 * i;
      const left = randomNum(start, start + 70);
      const top = i % 2 ? randomNum(20, 140) : randomNum(60, 180);
      const angle = randomNum(0, 45) + "deg";
      const style = { left, top, transform: `rotate(-${angle})`, color: "#fff" };

      // 生成汉字
      let text = "\\u" + (Math.floor(Math.random() * (40869 - 19968)) + 19968).toString(16);
      text = unescape(text.replace(/\\u/g, "%u"));

      list.push({ key: i + 1, style, text });
      pushText({ key: i + 1, text, status: false });
    }
    setVaildTextList(textKey);
    return list;
  };

  useEffect(() => {
    setActiveNum(0);
    isModalOpen && setTextList(makeTextList());
  }, [isModalOpen]);

  // 点击验证
  const validation = (e, value) => {
    if (validTextList[activeNum].key === value.key) {
      const dom = document.createElement("div");
      dom.innerText = activeNum + 1;
      dom.style.left = "0px";
      dom.style.top = "0px";
      dom.style.width = "20px";
      dom.style.height = "20px";
      dom.style.zIndex = 1;
      dom.style.position = "absolute";

      dom.style.fontSize = "14px";
      dom.style.textAlign = "center";
      dom.style.backgroundColor = "#67C23A";
      dom.style.transform = e.target.style.transform.replace("-", "");
      dom.style.top = e.nativeEvent.offsetY - 10 + "px";
      dom.style.left = e.nativeEvent.offsetX - 10 + "px";
      e.target.appendChild(dom);

      validTextList[activeNum].status = true;
      setActiveNum(activeNum + 1);
      if (activeNum === validTextList.length - 1) {
        setIsModalOpen(false);
        callback();
      }
    } else {
      message.info("请重新验证");
      reload();
    }
  };

  // 刷新
  const reload = () => {
    setActiveNum(0);
    setTextList(makeTextList());
  };

  return (
    <Modal
      className="valid_card"
      title="请完成验证"
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      footer={null}
      destroyOnClose
    >
      <div className="image_card">
        <Avatar shape="square" src={Valid_bg} />
        <div className="text_card">
          {textList.map((item) => (
            <span style={item.style} key={item.key} onClick={(e) => validation(e, item)}>
              {item.text}
            </span>
          ))}
          <ReloadOutlined onClick={reload} style={{ color: "#fff" }} />
        </div>
      </div>
      <div className="info_card">
        请依次点击：
        {validTextList.map((item) => (
          <span key={item.key} style={{ color: item.status && "#67C23A" }}>
            {item.text}
          </span>
        ))}
      </div>
    </Modal>
  );
};

export default ValidationDialog;
