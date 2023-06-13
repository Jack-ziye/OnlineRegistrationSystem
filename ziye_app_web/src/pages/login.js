import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Checkbox, Form, Input, Tabs, Image, Modal } from "antd";
import { LockOutlined, UserOutlined, MobileOutlined, VerifiedOutlined } from "@ant-design/icons";
import "@/styles/login.scss";
import { http, setToken, getUsername, setUsername } from "@/utils";

const MobileLoginFrom = () => {
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
      const { access_token, refresh_token } = await http.post("/talent/mobile-login", values);
      setToken(access_token, refresh_token);
      Modal.confirm({
        title: "提示",
        // icon: <ExclamationCircleOutlined />,
        content: "请选择跳转方式",
        onCancel: () => navigate(-1),
        onOk: () => navigate("/profile"),
      });
    });
  };

  return (
    <>
      <Form
        form={form}
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true, username: getUsername() }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          name="mobile"
          rules={[
            { required: true, message: "请输入手机号" },
            {
              pattern: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
              message: "请输入正确的手机号",
            },
          ]}
        >
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
        <Form.Item className="custom"></Form.Item>
        <Form.Item className="custom">
          <Button type="primary" htmlType="submit">
            <span>立即登录</span>
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

const LoginFrom = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = () => {
    form.validateFields().then(async (values) => {
      const status = values.remember;
      delete values.remember;
      const { access_token, refresh_token } = await http.post("/talent/login", values);
      setToken(access_token, refresh_token);
      status && setUsername(values.talentName);
      Modal.confirm({
        title: "提示",
        // icon: <ExclamationCircleOutlined />,
        content: "请选择进入页面",
        cancelText: "返回",
        okText: "个人中心",
        onCancel: () => navigate(-1),
        onOk: () => navigate("/profile"),
      });
    });
  };

  return (
    <>
      <Form
        form={form}
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true, talentName: getUsername() }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item name="talentName" rules={[{ required: true, message: "请输入账号" }]}>
          <Input prefix={<UserOutlined />} placeholder="账号" allowClear maxLength="18" />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: "请输入密码" }]}>
          <Input.Password maxLength="24" prefix={<LockOutlined />} placeholder="密码" />
        </Form.Item>
        <Form.Item className="custom">
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>记住账号</Checkbox>
          </Form.Item>
        </Form.Item>

        <Form.Item className="custom">
          <Button type="primary" htmlType="submit">
            <span>立即登录</span>
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

const LoginComponent = () => {
  document.title = "登录中心";
  const navigate = useNavigate();

  const items = [
    {
      key: "1",
      label: "账号登录",
      children: <LoginFrom />,
    },
    {
      key: "2",
      label: "手机号登录",
      children: <MobileLoginFrom />,
    },
  ];
  return (
    <div className="login_wapper">
      <div className="header_card">
        <div className="logo_title" onClick={() => navigate("/")}>
          叶子起点
        </div>
      </div>
      <div className="main_card">
        <div className="label_card">
          <div className="title">
            <Image src={require("@/assets/logo64.png")} preview={false} />
            <span>叶子起点</span>
          </div>
          <div className="siteName">网上报名用户登录中心</div>
        </div>
        <div className="login_card">
          <div className="register_card" onClick={() => navigate("/register")}>
            注册
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

export default LoginComponent;
