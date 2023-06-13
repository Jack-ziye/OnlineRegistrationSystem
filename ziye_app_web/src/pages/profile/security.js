import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "@/store";
import { observer } from "mobx-react-lite";
import { CheckOutlined } from "@ant-design/icons";
import "@/styles/profile/security.scss";
import { Button, Form, Input, Modal } from "antd";
import { http, removeToken } from "@/utils";
import { useForm } from "antd/es/form/Form";
import rules from "@/config/rules";

const EditorPassword = () => {
  const [form] = useForm();
  const { userStore } = useStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const saveData = () => {
    form.validateFields().then(async (values) => {
      setLoading(true);
      values.talentId = userStore.userInfo.talentId;
      await http.post("/talent/current/update/password", values).finally(() => {
        setLoading(false);
      });
      Modal.info({
        title: "提示",
        content: "请重新登录",
        onOk: async () => {
          await http.get("/talent/logout").finally(() => {
            removeToken();
            navigate("/login", { replace: true });
          });
        },
      });
    });
  };

  return (
    <div className="security-warrper">
      <div className="editor_password">
        <div className="header_card">修改密码</div>
        <div className="body_card">
          <Form form={form} autoComplete="off" labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
            <Form.Item name="oldPassword" label="旧密码" rules={rules.oldPassword}>
              <Input.Password placeholder="旧密码" allowClear maxLength="18" />
            </Form.Item>
            <Form.Item name="password" label="新密码" rules={rules.password}>
              <Input.Password maxLength="24" placeholder="新密码" />
            </Form.Item>
            <Form.Item name="validPassword" label="确认密码" rules={rules.validPassword}>
              <Input.Password maxLength="24" placeholder="确认密码" />
            </Form.Item>
          </Form>
          <div className="button_card">
            <Button type="primary" icon={<CheckOutlined />} onClick={saveData} loading={loading}>
              保存
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(EditorPassword);
