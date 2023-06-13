import { Modal } from "antd";
import { useState, useRef } from "react";
import Draggable from "react-draggable";

/**
 * 拖拽对话框
 *
 * @param {*} props
 * @returns
 */
const DragDialogComponent = (props) => {
  const [disabled, setDisabled] = useState(true);
  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  });
  const draggleRef = useRef(null);

  const onStart = (_event, uiData) => {
    const { clientWidth, clientHeight } = window.document.documentElement;
    const targetRect = draggleRef.current?.getBoundingClientRect();
    if (!targetRect) {
      return;
    }
    setBounds({
      left: -targetRect.left + uiData.x,
      right: clientWidth - (targetRect.right - uiData.x),
      top: -targetRect.top + uiData.y,
      bottom: clientHeight - (targetRect.bottom - uiData.y),
    });
  };

  return (
    <Modal
      {...props}
      className={`drag_modal ${props.className}`}
      title={
        <div
          style={{ cursor: "move" }}
          onMouseOver={() => disabled && setDisabled(false)}
          onMouseOut={() => setDisabled(true)}
        >
          {props.title}
        </div>
      }
      modalRender={(modal) => (
        <Draggable disabled={disabled} bounds={bounds} onStart={(event, uiData) => onStart(event, uiData)}>
          <div ref={draggleRef}>{modal}</div>
        </Draggable>
      )}
    ></Modal>
  );
};

export default DragDialogComponent;
