const routers = [
  { label: "首页", path: "/" },
  { label: "个人中心", path: "/user/profile" },
  { label: "系统设置", path: "/user/setting" },
  {
    label: "系统管理",
    path: "/system",
    icon: "SettingOutlined",
    children: [
      { label: "推送通知", path: "/system/notice/push", destroy: true },
      { label: "通知公告", path: "/system/notice" },
      { label: "消息管理", path: "/system/inform" },
      { label: "用户管理", path: "/system/user" },
      { label: "分配用户", path: "/system/role/assgin/user", destroy: true },
      { label: "角色管理", path: "/system/role" },
      { label: "菜单管理", path: "/system/menu" },
      { label: "字典管理", path: "/system/dict" },
      { label: "参数设置", path: "/system/config" },
      { label: "登录日志", path: "/system/log-info" },
    ],
  },
  {
    label: "系统监控",
    path: "/monitor",
    icon: "FundProjectionScreenOutlined",
    children: [
      { label: "在线用户", path: "/monitor/online" },
      { label: "服务监控", path: "/monitor/server" },
      { label: "缓存监控", path: "/monitor/cache" },
    ],
  },
  {
    label: "报名管理",
    path: "/pf",
    icon: "FundProjectionScreenOutlined",
    children: [
      { label: "添加新闻", path: "/pf/news/add" },
      { label: "修改新闻", path: "/pf/news/editor", destroy: true },
      { label: "新闻详情", path: "/pf/news/details", destroy: true },
      { label: "新闻管理", path: "/pf/news" },

      { label: "栏目管理", path: "/pf/category" },

      { label: "人才详情", path: "/pf/talent/details", destroy: true },
      { label: "人才管理", path: "/pf/talent" },

      { label: "添加项目", path: "/pf/project/add" },
      { label: "修改项目", path: "/pf/project/editor", destroy: true },
      { label: "项目详情", path: "/pf/project/details", destroy: true },
      { label: "项目管理", path: "/pf/project" },

      { label: "申请详情", path: "/pf/apply/details", destroy: true },
      { label: "申请管理", path: "/pf/apply" },
    ],
  },
];

export default routers;
