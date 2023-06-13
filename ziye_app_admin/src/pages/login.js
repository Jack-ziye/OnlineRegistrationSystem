import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Checkbox, Form, Input, Tabs } from "antd";
import { LockOutlined, UserOutlined, RightOutlined, MobileOutlined, VerifiedOutlined } from "@ant-design/icons";
import "@/styles/login.scss";
import ParticlesComponent from "@/components/ParticlesComponent";
import ValidationDialog from "@/components/ValidationDialog";
import { http, setToken, getUsername, setUsername } from "@/utils";
import rules from "@/config/rules";

// 防机器人校验
const LoginValidationDialog = true;

const MobileLoginFrom = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [model, setModel] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [time, setTime] = useState(false);

  const login = async () => {
    const { access_token, refresh_token } = await http.post("/user/mobile-login", model);
    setToken(access_token, refresh_token);
    navigate("/", { replace: true });
  };

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

  const onFinish = async (values) => {
    setModel(values);
    LoginValidationDialog ? setIsModalOpen(true) : login();
  };

  return (
    <>
      <ValidationDialog isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} callback={login} />
      <Form
        form={form}
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true, username: getUsername() }}
        onFinish={onFinish}
        autoComplete="off"
      >
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
        <Form.Item className="custom"></Form.Item>
        <Form.Item className="custom">
          <Button type="primary" htmlType="submit">
            <span>立即登录</span>
            <RightOutlined />
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

const LoginFrom = () => {
  const navigate = useNavigate();

  const [model, setModel] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const login = async () => {
    const status = model.remember;
    delete model.remember;
    const { access_token, refresh_token } = await http.post("/user/login", model);
    setToken(access_token, refresh_token);
    status && setUsername(model.username);
    navigate("/", { replace: true });
  };

  const onFinish = async (values) => {
    setModel(values);
    LoginValidationDialog ? setIsModalOpen(true) : login();
  };

  return (
    <>
      <ValidationDialog isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} callback={login} />
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true, username: getUsername() }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item name="username" rules={[{ required: true, message: "请输入账号" }]}>
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
            <RightOutlined />
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

const LoginComponent = () => {
  document.title = "登录中心";

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
      <ParticlesComponent />
      <div className="login_card">
        <div className="card_body">
          <Tabs defaultActiveKey="1" items={items} size="small" destroyInactiveTabPane />
          <div className="info_card">
            <div className="info_title">叶子起点</div>
            <div className="info_note">
              <div className="tmp">网上报名后台管理系统</div>
              <div className="other">登录视为您已同意第三方账号绑定协议、服务条款、隐私政策</div>
            </div>
          </div>
        </div>
      </div>
      <div className="record_card">
        <div className="icp_number">
          <Button type="link" href="http://beian.miit.gov.cn/">
            © aiziye.com 版权所有 琼ICP备2023001825号-1
          </Button>
        </div>
      </div>
    </div>
  );
};
export default LoginComponent;
