import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

const TinymceComponent = (props) => {
  const editorRef = useRef(null);

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
    <Editor
      {...props}
      tinymceScriptSrc={"/tinymce/tinymce.min.js"}
      apiKey="xokqkkpb7ng0gtudq5mv8ca01zup3iqc3uwk1s503hhevwcz"
      onInit={(evt, editor) => (editorRef.current = editor)}
      init={initConfig}
      onEditorChange={(value) => props.onChange(value)}
      onChange={null}
    />
  );
};

export default TinymceComponent;
