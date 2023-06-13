import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useStore } from "@/store";
import { observer } from "mobx-react-lite";
import "@/styles/layout.scss";
import { Layout, Menu, Breadcrumb, Tabs, Modal, Avatar, Space, Dropdown, Button } from "antd";
import * as AntdIcon from "@ant-design/icons";
import { http, flatten, removeToken, viewListener, customObserver } from "@/utils";
import Logo from "@/assets/logo64.png";
import routers from "@/config/routers";

/**
 * 获取面包屑列表
 * @values 路由项
 * @path 路由地址
 */
const getBreadcrumbList = (values, path) => {
  if (path === "/") return [];

  for (const item of values) {
    if (item.path === "/" || item.path === "") continue;

    if (item.path === path) {
      return [{ path: item.path, label: item.label }];
    } else if (path.includes(item.path)) {
      const list = [];
      list.push({ path: item.path, label: item.label });
      list.push(getBreadcrumbList(item.children, path)[0]);
      return list;
    }
  }
  return [];
};

const menuListFilter = (values) => {
  const list = [];

  for (const item of values) {
    // 字符串转图标
    if (item.icon) {
      item.icon = React.createElement(AntdIcon[item.icon]);
    }
    item.key = item.path;
    for (const key in item) {
      if (!["key", "path", "label", "icon", "children"].includes(key)) {
        delete item[key];
      }
    }

    if (item.children) {
      list.push({ ...item, children: menuListFilter(item.children) });
    } else {
      list.push(item);
    }
  }
  return list;
};

const InformComponent = () => {
  const [noticeType, setNoticeType] = useState("0");
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const items = [
    { key: "0", label: `通知` },
    { key: "1", label: `公告` },
    { key: "2", label: `消息` },
  ];

  useEffect(() => {
    (async () => {
      const res = await http.post("/inform/list/current", { noticeType });
      res.content.map((item) => (item.key = item.informId));
      setData(res.content);
    })();
  }, [noticeType]);

  const viewDetail = (values) => {
    Modal.info({
      title: values.noticeTitle,
      content: <div style={{ paddingRight: "8px", maxHeight: "400px", overflowY: "auto" }}>{values.noticeContent}</div>,
      width: 640,
      okText: "关闭",
    });
    http.get(`/inform/update/read?id=${values.informId}&isRead=1`);
  };

  return (
    <>
      <Dropdown
        trigger={["click"]}
        menu={{
          items: [
            {
              key: "1",
              label: <Tabs defaultActiveKey={"0"} items={items} onChange={(value) => setNoticeType(value)} />,
            },
            {
              key: "2",
              label: (
                <div className="dropdown_info_card">
                  {data.map((item) => (
                    <div className="info_item" key={item.key} onClick={() => viewDetail(item)}>
                      <div className="label">{item.noticeContent}</div>
                      <div className="info">
                        <span>{item.noticeTitle}</span>
                        <span>{item.createTime}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ),
            },
            { type: "divider" },
            {
              key: "3",
              style: { textAlign: "right" },
              label: (
                <Button type="link" size="small" disabled={!data.length} onClick={() => navigate("/system/inform")}>
                  更多
                </Button>
              ),
            },
          ],
        }}
      >
        <AntdIcon.BellOutlined />
      </Dropdown>
    </>
  );
};

const LayoutComponent = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [collapsedWidth, setCollapsedWidth] = useState(60);
  const [menuList, setMenuList] = useState([]);
  const [breadcrumbList, setBreadcrumbList] = useState([]);
  const [tabList, setTabList] = useState([{ label: "首页", key: "/", closable: false }]);

  const navigate = useNavigate();
  const location = useLocation();
  const { userStore } = useStore();

  useEffect(() => {
    userStore.getUserInfo();
    // 在线心跳
    if (!userStore.userInfo.userId) {
      viewListener({
        delay: 0,
        handleEnter: (state) => {
          const createTimer = () => {
            http.get("/monitor/online/update");
            const timer = setInterval(async () => {
              await http.get("/monitor/online/update").catch(() => {
                clearInterval(timer);
              });
            }, 4000);
            return timer;
          };

          const { initObserver, addObserver } = customObserver();
          initObserver({
            delay: 0,
            onEnter: () => {
              state.timer = createTimer();
            },
            onLeave: () => {
              state.timer && clearInterval(state.timer);
            },
          });
          addObserver(document.querySelector(".layout"));
        },
        handleLeave: (state) => {
          state.timer && clearInterval(state.timer);
        },
      });
    }
  }, [userStore]);

  useEffect(() => {
    (async () => {
      const data = await http.get("user/current/menu");
      const menus = [{ label: "首页", path: "/", icon: "HomeOutlined" }, ...data];
      setMenuList(menuListFilter(menus));
    })();
  }, []);

  useEffect(() => {
    const { pathname } = location;
    setBreadcrumbList(getBreadcrumbList(routers, pathname));
    setTabList((tabs) => {
      // 过滤掉需要销毁的
      tabs = tabs.filter((tab) => !tab.destroy);
      // 添加tab
      if (!tabs.find((value) => value.key === pathname)) {
        // 获取当前菜单项信息
        const avg = flatten(routers).find((value) => value.path === pathname);
        // 设置tab相关参数
        const tab = { ...avg, key: pathname, path: pathname };

        return [...tabs, tab];
      }
      return [...tabs];
    });
  }, [location]);

  window.addEventListener("resize", () => {
    if (window.innerWidth < 992) {
      setCollapsedWidth(0);
    } else {
      setCollapsedWidth(60);
    }
  });

  const removeTab = (targetKey) => {
    // 获取当前数组下标
    const index = tabList.findIndex((value) => value.key === targetKey);

    const newTabs = tabList.filter((value) => value.key !== targetKey);
    setTabList(newTabs);

    // 是否删除当前页
    if (targetKey === location.pathname) {
      navigate(newTabs[index] ? newTabs[index].key : newTabs[index - 1].key);
    }
  };

  const loginOut = () => {
    Modal.confirm({
      title: "退出登录",
      icon: <AntdIcon.ExclamationCircleOutlined />,
      content: "是否确定退出登录",
      onOk: async () => {
        await http.get("/user/logout").finally(() => {
          removeToken();
          navigate("/login", { replace: true });
        });
      },
    });
  };

  const dropdownMenu = (
    <Menu
      items={[
        {
          key: "1",
          label: (
            <Space onClick={() => navigate("/user/profile")}>
              <AntdIcon.UserOutlined />
              <span>个人中心</span>
            </Space>
          ),
        },
        { type: "divider" },
        {
          key: "4",
          label: (
            <Space onClick={loginOut}>
              <AntdIcon.LogoutOutlined />
              <span>退出登录</span>
            </Space>
          ),
        },
      ]}
    />
  );

  // 全屏
  const intoFullScreen = () => {
    const element = document.body;
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    }
    setIsFullScreen(true);
  };

  // 退出全屏
  const exitFullScreen = () => {
    if (document.exitFullScreen) {
      document.exitFullScreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
    setIsFullScreen(false);
  };

  return (
    <Layout className="layout" hasSider>
      <Layout.Sider
        className="sider-wrapper"
        breakpoint="lg"
        trigger={null}
        collapsible
        collapsedWidth={collapsedWidth}
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="logo_card">
          <Avatar src={Logo} />
          <span className="info">{document.title}</span>
        </div>
        <div className="menu_card">
          <Menu
            theme="dark"
            mode={"inline"}
            items={menuList}
            defaultOpenKeys={[location.pathname.match(/(\S*)\//)[1]]}
            selectedKeys={[location.pathname]}
            onSelect={({ key }) => navigate(key)}
          />
        </div>
      </Layout.Sider>
      <Layout className="site-layout">
        <Layout.Header className="header">
          <div className="breadcrumb_info_card">
            <div className="header_left">
              {React.createElement(collapsed ? AntdIcon.MenuUnfoldOutlined : AntdIcon.MenuFoldOutlined, {
                className: "trigger",
                onClick: () => setCollapsed(!collapsed),
              })}
              <Breadcrumb>
                <Breadcrumb.Item>首页</Breadcrumb.Item>
                {breadcrumbList.map((item) => (
                  <Breadcrumb.Item key={item.path}>{item.label}</Breadcrumb.Item>
                ))}
              </Breadcrumb>
            </div>
            <div className="header_right">
              {isFullScreen ? (
                <AntdIcon.FullscreenExitOutlined onClick={exitFullScreen} />
              ) : (
                <AntdIcon.FullscreenOutlined onClick={intoFullScreen} />
              )}

              <InformComponent />

              <Dropdown overlay={dropdownMenu}>
                <Avatar src={process.env.REACT_APP_APIURL + userStore.userInfo.avatar} />
              </Dropdown>
            </div>
          </div>
          <div className="tabs_nav_card">
            <Tabs
              hideAdd
              size="small"
              type="editable-card"
              items={tabList}
              activeKey={location.pathname}
              onEdit={removeTab}
              onTabClick={(item) => navigate(item)}
              destroyInactiveTabPane
            ></Tabs>
          </div>
        </Layout.Header>
        <Layout.Content className="main">
          <Outlet />
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default observer(LayoutComponent);
