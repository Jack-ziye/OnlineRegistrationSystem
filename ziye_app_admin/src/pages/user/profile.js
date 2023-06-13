import React, { useState } from "react";
import { useStore } from "@/store";
import { observer } from "mobx-react-lite";
import "@/styles/user-profile.scss";
import { EditOutlined, CloseOutlined, CheckOutlined, FormOutlined, CopyOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space, Modal, message } from "antd";
import CropperComponent from "@/components/CropperComponent";
import { http, removeToken } from "@/utils";
import { useForm } from "antd/es/form/Form";
import { useNavigate } from "react-router-dom";

const EditorPassword = ({ editorStatus, setEdiotStatus }) => {
  const [form] = useForm();
  const { userStore } = useStore();
  const navigate = useNavigate();

  const rules = {
    oldPassword: [{ required: true, message: "请输入账号" }],
    password: [{ required: true, message: "请输入密码" }],
    confirmPassword: [{ required: true, message: "请输入密码" }],
  };

  const saveData = () => {
    form.validateFields().then(async (values) => {
      values.userId = userStore.userInfo.userId;
      await http.post("/user/update/password", values);
      Modal.info({
        title: "提示",
        content: "请重新登录",
        onOk: async () => {
          await http.get("/user/logout").finally(() => {
            removeToken();
            navigate("/login", { replace: true });
          });
        },
      });
    });
  };

  return (
    <>
      <div className="editor_card" style={{ height: !editorStatus && "0px" }}>
        {editorStatus && (
          <Form form={form} autoComplete="off" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
            <Form.Item name="oldPassword" label="旧密码" rules={rules.oldPassword}>
              <Input.Password placeholder="旧密码" allowClear maxLength="18" />
            </Form.Item>
            <Form.Item name="password" label="新密码" rules={rules.password}>
              <Input.Password maxLength="24" placeholder="新密码" />
            </Form.Item>
            <Form.Item name="validPassword" label="确认密码" rules={rules.confirmPassword}>
              <Input.Password maxLength="24" placeholder="确认密码" />
            </Form.Item>
          </Form>
        )}
      </div>
      <div className="button_card">
        {editorStatus ? (
          <Space>
            <Button
              icon={<CloseOutlined />}
              onClick={() => {
                form.resetFields();
                setEdiotStatus(false);
              }}
            >
              取消
            </Button>
            <Button type="primary" icon={<CheckOutlined />} onClick={saveData}>
              保存
            </Button>
          </Space>
        ) : (
          <Button type="primary" icon={<EditOutlined />} onClick={() => setEdiotStatus(true)}>
            修改密码
          </Button>
        )}
      </div>
    </>
  );
};

const ProfileComponent = () => {
  const [editorStatus, setEdiotStatus] = useState(false);
  const { userStore } = useStore();

  const userInfoData = {
    avatar: userStore.userInfo.avatar,
    userId: userStore.userInfo.userId,
    username: userStore.userInfo.username,
    nickName: userStore.userInfo.nickName,
    roleName: userStore.userInfo.roleName,
    mobile: userStore.userInfo.mobile,
    email: userStore.userInfo.email,
    createTime: userStore.userInfo.createTime,
  };

  const userInfoItems = [
    { key: "userId", label: "账号ID", copy: true },
    { key: "username", label: "用户名称" },
    { key: "roleName", label: "所属角色" },
    { key: "mobile", label: "手机号", editor: true },
    { key: "email", label: "邮箱地址", editor: true },
    { key: "createTime", label: "注册时间" },
  ];

  const editorInfo = ({ key, label, rule }) => {
    Modal.confirm({
      icon: <EditOutlined />,
      title: `编辑${label}`,
      content: (
        <Form autoComplete="off">
          <Form.Item name={key} rules={rule}>
            <Input placeholder={`请输入${label}`} allowClear maxLength="18" />
          </Form.Item>
        </Form>
      ),
      onOk: () => {},
    });
  };

  return (
    <>
      <div className="profile-wapper">
        <div className="basic_card">
          <div className="content_card">
            <div className="avatar_card">
              <CropperComponent
                avatar={true}
                value={userInfoData.avatar}
                onOk={async (file) => {
                  let formData = new FormData();
                  formData.append("file", file);
                  const res = await http.post("/file/upload", formData);
                  await http.post("user/update", { userId: userInfoData.userId, avatar: res });
                }}
              />
            </div>
            <div className="user_card">
              <div className="username_info">
                <span style={{ paddingRight: "8px" }}>{userInfoData["nickName"]}</span>
                <Button
                  type="link"
                  icon={<FormOutlined />}
                  onClick={() =>
                    editorInfo({
                      key: "nickName",
                      label: "用户昵称",
                      rule: [{ required: true, message: "请输入用户昵称" }],
                    })
                  }
                ></Button>
              </div>
              <div className="other_info">
                {userInfoItems.map((item) => (
                  <div className="other_info-item" key={item.key}>
                    <div className="label">{item.label}</div>
                    <div className="values">{userInfoData[item.key]}</div>
                    {item.editor && (
                      <Button type="link" icon={<FormOutlined />} onClick={() => editorInfo(item)}></Button>
                    )}
                    {item.copy && (
                      <Button
                        type="link"
                        icon={<CopyOutlined />}
                        onClick={() => {
                          navigator.clipboard.writeText(userInfoData[item.key]);
                          message.success("复制成功");
                        }}
                      ></Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="operation_card">
            <EditorPassword editorStatus={editorStatus} setEdiotStatus={setEdiotStatus} />
          </div>
        </div>
      </div>
    </>
  );
};

export default observer(ProfileComponent);
