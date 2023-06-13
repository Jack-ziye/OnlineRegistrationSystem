import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, Tabs, Image } from "antd";
import { LockOutlined, UserOutlined, MobileOutlined, VerifiedOutlined } from "@ant-design/icons";
import "@/styles/login.scss";
import { http } from "@/utils";

const rules = {
  talentName: [
    { required: true, message: "请输入用户名称" },
    {
      pattern: /^[a-zA-Z]{4,18}$/,
      message: "必须是字母，且不少于4位",
    },
  ],
  password: [
    { required: true, message: "请输入密码" },
    {
      pattern: /^(?=.*[a-zA-Z])(?=.*\d)[^]{6,18}$/,
      message: "必须包含字母和数字，且不少于6位",
    },
  ],
  validPassword: [
    { required: true, message: "请输入确认密码" },
    ({ getFieldValue }) => ({
      validator(_, value) {
        if (!value || getFieldValue("password") === value) {
          return Promise.resolve();
        }

        return Promise.reject(new Error("密码不一致"));
      },
    }),
  ],
  mobile: [
    { required: true, message: "请输入手机号" },
    {
      pattern: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
      message: "请输入正确的手机号",
    },
  ],
};

const MobileRegisterFrom = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [time, setTime] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      if (time && time !== 0) {
        setTime(time - 1);
      } else {
        return clearInterval(timer);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [time]);

  const sendCode = () => {
    form.validateFields(["mobile"]).then(async (values) => {
      await http.post(`send/code/mobile?mobile=${values.mobile}`);
      setTime(60);
    });
  };

  const onFinish = async () => {
    form.validateFields().then(async (values) => {
      await http.post("talent/register", values);
      navigate("/login");
    });
  };

  return (
    <>
      <Form form={form} name="normal_login" className="login-form" onFinish={onFinish} autoComplete="off">
        <Form.Item name="talentName" rules={rules.talentName}>
          <Input prefix={<UserOutlined />} placeholder="用户名" allowClear maxLength="18" />
        </Form.Item>
        <Form.Item name="password" rules={rules.password}>
          <Input.Password maxLength="24" prefix={<LockOutlined />} placeholder="密码" />
        </Form.Item>
        <Form.Item name="password0" rules={rules.validPassword}>
          <Input.Password maxLength="24" prefix={<LockOutlined />} placeholder="确认密码" />
        </Form.Item>
        <Form.Item name="mobile" rules={rules.mobile}>
          <Input prefix={<MobileOutlined />} placeholder="手机号" allowClear maxLength="11" />
        </Form.Item>

        <Form.Item className="form_inline">
          <Form.Item name="code" rules={[{ required: true, message: "请输入验证码" }]}>
            <Input prefix={<VerifiedOutlined />} placeholder="验证码" allowClear maxLength="11" />
          </Form.Item>
          <Button className="timer_btn" type="link" onClick={sendCode}>
            {time ? `${time}秒后重新获取` : "获取验证码"}
          </Button>
        </Form.Item>
        <Form.Item className="custom">
          <Button type="primary" htmlType="submit">
            <span>立即注册</span>
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

const RegisterComponent = () => {
  document.title = "注册中心";
  const navigate = useNavigate();

  const items = [
    {
      key: "1",
      label: "账号注册",
      children: <MobileRegisterFrom />,
    },
  ];
  return (
    <div className="login_wapper">
      <div className="header_card">
        <div className="logo_title">叶子起点</div>
      </div>
      <div className="main_card">
        <div className="label_card">
          <div className="title">
            <Image src={require("@/assets/logo64.png")} preview={false} />
            <span>叶子起点</span>
          </div>
          <div className="siteName">网上报名用户注册中心</div>
        </div>
        <div className="login_card">
          <div className="register_card" onClick={() => navigate("/login")}>
            登录
          </div>
          <div className="form_card">
            <Tabs defaultActiveKey="1" items={items} size="small" destroyInactiveTabPane />
          </div>
        </div>
      </div>
      <div className="info_card"></div>
    </div>
  );
};

export default RegisterComponent;
