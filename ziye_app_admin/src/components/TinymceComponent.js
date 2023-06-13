import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Button, Space } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function TinymceComponent({ initValue, label, onClick }) {
  const editorRef = useRef(null);
  const navigate = useNavigate();
  const [value, setValue] = useState();

  /**
   * 防抖
   *
   * @param {Function} fn
   * @param {Number} delay
   * @returns
   */
  const debounce = function (fn, delay) {
    let timer = null;
    return function (...value) {
      timer !== null && clearTimeout(timer);
      timer = setTimeout(() => fn(...value), delay);
    };
  };

  useEffect(() => {
    initValue && setValue(initValue);
  }, [initValue]);

  const initConfig = {
    menubar: false,
    language: "zh-Hans",
    selector: "textarea",
    plugins: [
      "advlist",
      "autolink",
      "lists",
      "link",
      "image",
      "charmap",
      "preview",
      "anchor",
      "searchreplace",
      "visualblocks",
      "code",
      "fullscreen",
      "insertdatetime",
      "media",
      "table",
      "code",
      "help",
      "wordcount",
    ],
    placeholder: "请输入内容",
    toolbar: [
      "blocks fontfamily fontsize forecolor backcolor | bold italic underline strikethrough lineheight | alignleft aligncenter alignright alignjustify | " +
        "bullist numlist outdent indent | hr table image charmap removeformat | preview print fullscreen undo redo ",
    ],
    content_style: "body { font-family: Times New Roman, Arial, sans-serif; font-size: 14px }",
  };

  return (
    <div className="myEditor">
      <Editor
        tinymceScriptSrc={"/tinymce/tinymce.min.js"}
        apiKey="xokqkkpb7ng0gtudq5mv8ca01zup3iqc3uwk1s503hhevwcz"
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue={initValue}
        init={initConfig}
        onEditorChange={debounce((value) => setValue(value), 200)}
      />
      <div className="header_card">
        <Space>
          <Button onClick={() => navigate(-1)}>取消</Button>
          <Button type="primary" onClick={() => onClick(value)} disabled={!value}>
            {label || "提交"}
          </Button>
        </Space>
      </div>
    </div>
  );
}

export default TinymceComponent;
