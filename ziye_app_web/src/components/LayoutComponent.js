import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import "@/styles/layout.scss";
import { Layout, Menu, Button, Avatar, Dropdown, Space, Drawer, Modal } from "antd";
import {
  MenuOutlined,
  LogoutOutlined,
  UserOutlined,
  CloseOutlined,
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

  const items = [
    { label: "首页", key: "/" },
    { label: "新闻中心", key: "/news" },
    { label: "报名中心", key: "/sign-up" },
  ];

  useEffect(() => {
    userStore.setUserInfo();
  }, [userStore]);

  const loginOut = async () => {
    Modal.confirm({
      title: "退出登录",
      icon: <ExclamationCircleOutlined />,
      content: "您是否确定退出登录",
      onOk: async () => {
        await http.get("talent/logout").finally(() => {
          userStore.clearUserInfo();
        });
      },
    });
    setOpen(false);
  };

  const dropdownMenu = [
    {
      key: "1",
      label: (
        <Space onClick={() => navigate("/profile")}>
          <UserOutlined />
          <span>个人中心</span>
        </Space>
      ),
    },
    { type: "divider" },
    {
      key: "4",
      label: (
        <Space onClick={loginOut}>
          <LogoutOutlined />
          <span>退出登录</span>
        </Space>
      ),
    },
  ];

  return (
    <div className="layout">
      <div className="layout-header">
        <div className="logo_card" onClick={() => navigate("/")}>
          叶子起点
        </div>
        <Menu mode="horizontal" defaultSelectedKeys={[pathname]} items={items} onSelect={({ key }) => navigate(key)} />
        <div className="login_card">
          {userStore.userInfo.talentName ? (
            <div className="info_card">
              <Dropdown menu={{ items: dropdownMenu }} placement="bottom">
                <Avatar
                  src={userStore.userInfo.avatar && process.env.REACT_APP_APIURL + userStore.userInfo.avatar}
                  icon={<UserOutlined />}
                />
              </Dropdown>
            </div>
          ) : (
            <div className="btn_card">
              <span onClick={() => navigate("login")}>登录</span>
              <span>/</span>
              <span onClick={() => navigate("register")}>注册</span>
            </div>
          )}
        </div>
        <Button className="menu_btn" type="link" icon={<MenuOutlined />} onClick={() => setOpen(true)} />
      </div>

      <Content className="site-layout-content">
        <Outlet />
        <div className="layout-footer">
          <div className="info">
            声明：网站所有的信息均用于测试数据，如涉及版权问题，请作者致电与我们联系删除（2296543112@qq.com）
          </div>
          <Space>
            <Button type="link" href="https://beian.miit.gov.cn/" target="_blank">
              琼ICP备2023001825号-1
            </Button>
            <Button type="link" href="http://admin.aiziye.cn/" target="_blank">
              进入后台
            </Button>
          </Space>
        </div>
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
            <Menu
              mode="inline"
              defaultSelectedKeys={[pathname]}
              items={items}
              onSelect={({ key }) => {
                setOpen(false);
                navigate(key);
              }}
            />
            {!!userStore.userInfo.talentId && (
              <Button type="link" danger onClick={loginOut}>
                退出登录
                <LogoutOutlined />
              </Button>
            )}
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default observer(LayoutComponent);
