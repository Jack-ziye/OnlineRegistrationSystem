import React, { useRef, useState, useEffect } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { Upload, message, Image, Button } from "antd";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import DialogComponent from "@/components/DialogComponent";
import "@/styles/cropper.scss";

const CropperComponent = (props) => {
  const cropperRef = useRef();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState();

  const [originUrl, setOriginUrl] = useState();
  const [cropperFile, setCropperFile] = useState();

  useEffect(() => {
    if (!props.value) return;
    // 判断文件或地址
    const value = props.value instanceof File ? window.URL.createObjectURL(props.value) : props.value;
    const url = value.includes("http://") ? value : process.env.REACT_APP_APIURL + value;
    setImageUrl(url);
    setOriginUrl(url);
  }, [props.value]);

  const beforeUpload = async (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("只能上传jpeg或png格式图片");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("最大不能超过2MB!");
    }
    setOriginUrl(window.URL.createObjectURL(file));
    return false;
  };

  const onCrop = () => {
    const cropper = cropperRef.current?.cropper;
    cropper.getCroppedCanvas().toBlob((blob) => {
      const suffixName = blob.type.replace("image/", ".");
      const file = new File([blob], new Date().getTime() + suffixName, { type: blob.type });
      setCropperFile(file);
    });
  };

  const handleOk = () => {
    setImageUrl(URL.createObjectURL(cropperFile));
    props.onChange && props.onChange(cropperFile);
    props.onOk && props.onOk(cropperFile);
    setIsModalOpen(false);
  };

  const handleCancel = async () => {
    setIsModalOpen(false);
  };

  return (
    <div className="cropper_wrapper">
      {props.avatar ? (
        <div className="upload_avatar_card" onClick={() => setIsModalOpen(true)}>
          {imageUrl ? (
            <Image src={imageUrl || undefined} preview={false} />
          ) : (
            <div className="upload_card">
              <PlusOutlined />
            </div>
          )}
        </div>
      ) : (
        <div className="upload_image_card" onClick={() => setIsModalOpen(true)}>
          {imageUrl ? (
            <div className="image_card">
              <Image src={imageUrl || undefined} preview={false} />
            </div>
          ) : (
            <div className="upload_card">
              <PlusOutlined />
            </div>
          )}
        </div>
      )}

      <DialogComponent title="裁剪图片" width={1000} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <div className="cropper_image_card">
          <Cropper
            src={originUrl || undefined}
            ref={cropperRef}
            className="cropper_card"
            dragMode={"move"} // 单击设置为移动图片
            scalable={true} // 缩放
            rotatable={true} // 是否可以旋转
            guides={false} // 网格线
            movable={true} // 移动图像
            viewMode={0} // 裁剪框不能超过画布大小
            autoCropArea={0.8} // 定义自动裁剪的大小比
            cropBoxMovable={true} // 裁剪框是否移动
            cropBoxResizable={false} // 裁剪框大小是否变化
            initialAspectRatio={props.avatar ? 1 : 4 / 3} // 定义裁剪框的初始宽高比
            crop={onCrop}
          />

          <div className={props.avatar ? "avatar_card" : "image_card"}>
            <Image src={cropperFile ? window.URL.createObjectURL(cropperFile) : undefined} preview={false} />
          </div>
        </div>
        <div className="option_card">
          <Upload accept=".jpg,.png" showUploadList={false} beforeUpload={beforeUpload}>
            <Button icon={<UploadOutlined />}>上传图片</Button>
          </Upload>
          <Button
            icon={<UploadOutlined />}
            onClick={() => {
              console.log(cropperRef.current?.cropper);
            }}
          >
            重置大小
          </Button>
        </div>
      </DialogComponent>
    </div>
  );
};

export default CropperComponent;
