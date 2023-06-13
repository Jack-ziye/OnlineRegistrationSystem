import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import "@/styles/profile/layout.scss";
import { Layout, Menu, Avatar, Button, Drawer, Modal } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  CloseOutlined,
  LeftOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { useStore } from "@/store";
import { http } from "@/utils";
const { Content } = Layout;

const LayoutComponent = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { userStore } = useStore();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    userStore.setUserInfo();
  }, [userStore]);

  const items = [
    { label: "基本信息", key: "/profile" },
    { label: "报名申请", key: "/profile/apply" },
    { label: "安全设置", key: "/profile/security" },
    { label: "官网首页", key: "/" },
  ];

  const loginOut = async () => {
    Modal.confirm({
      title: "退出登录",
      icon: <ExclamationCircleOutlined />,
      content: "您是否确定退出登录",
      onOk: async () => {
        await http.get("talent/logout").finally(() => {
          userStore.clearUserInfo();
          navigate("/login", { replace: true });
        });
      },
    });
  };

  return (
    <div className="user-layout">
      <div className="layout-header">
        <div className="logo_card" onClick={() => navigate("/")}>
          个人中心
        </div>
        <div className="login_card">
          <Avatar
            src={userStore.userInfo.avatar && process.env.REACT_APP_APIURL + userStore.userInfo.avatar}
            icon={<UserOutlined />}
          />
          <Button icon={<LogoutOutlined />} onClick={loginOut}></Button>
        </div>
      </div>

      <Content className="site-layout-content">
        <div className="layout-sider">
          <Menu selectedKeys={[pathname]} mode="inline" items={items} onSelect={({ key }) => navigate(key)} />
        </div>
        <div className="layout-main">
          <Outlet />
        </div>
        <LeftOutlined className="menu_foled" onClick={() => setOpen(true)} />
      </Content>

      <Drawer width="" headerStyle={{ display: "none" }} onClose={() => setOpen(false)} open={open}>
        <Button className="closed" type="link" icon={<CloseOutlined />} onClick={() => setOpen(false)} />
        <div className="body_card">
          <div className="user_card" onClick={() => navigate(userStore.userInfo.talentName ? "/profile" : "/login")}>
            <Avatar
              size={64}
              src={userStore.userInfo.avatar && process.env.REACT_APP_APIURL + userStore.userInfo.avatar}
              icon={<UserOutlined />}
              onClick={() => navigate("/")}
            />
            <div style={{ padding: "8px 0px" }}>{userStore.userInfo.talentName || "请登录"} </div>
          </div>
          <div className="menu_card">
            <Menu mode="inline" defaultSelectedKeys={[pathname]} items={items} onSelect={({ key }) => navigate(key)} />
          </div>
          <Button type="link" danger onClick={loginOut}>
            退出登录
            <LogoutOutlined />
          </Button>
        </div>
      </Drawer>
    </div>
  );
};

export default observer(LayoutComponent);
