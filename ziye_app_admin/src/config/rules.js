const rules = {
  username: [
    { required: true, message: "请输入用户名称" },
    {
      pattern: /^[a-zA-Z]{4,18}$/,
      message: "必须是字母，且不少于4位",
    },
  ],
  nickName: [{ required: true, message: "请输入用户昵称" }],
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
  email: [{ type: "email", message: "请输入正确的邮箱" }],
  mobile: [
    { required: true, message: "请输入手机号" },
    {
      pattern: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
      message: "请输入正确的手机号",
    },
  ],
  roleName: [{ required: true, message: "请输入角色名称" }],
  roleCode: [
    { required: true, message: "请输入权限标识" },
    {
      pattern: /^[a-zA-Z]{4,18}$/,
      message: "必须是字母，且不少于4位",
    },
  ],
  orderIndex: [{ required: true, message: "请选择显示顺序" }],
  noticeTitle: [{ required: true, message: "请输入标题" }],
  noticeType: [{ required: true, message: "请选择类型" }],
  noticeContent: [{ required: true, message: "请输入内容" }],

  menuName: [{ required: true, message: "请输入菜单名称" }],
  menuIcon: [{ required: true, message: "请选择图标" }],
  menuPath: [{ required: true, message: "请输入路由地址" }],

  dictName: [{ required: true, message: "请输入字典名称" }],
  dictType: [{ required: true, message: "请输入字典类型" }],
  dictKey: [{ required: true, message: "请输入字典键名" }],
  dictValue: [{ required: true, message: "请输入字典键值" }],
  configName: [{ required: true, message: "请输入参数名称" }],
  configKey: [
    { required: true, message: "请输入参数键名" },
    {
      pattern: /^[a-zA-Z]{4,18}$/,
      message: "必须是字母，且不少于4位",
    },
  ],
  configValue: [{ required: true, message: "请输入参数键值" }],

  feedback: [{ required: true, message: "请输入反馈信息" }],
};

export default rules;
