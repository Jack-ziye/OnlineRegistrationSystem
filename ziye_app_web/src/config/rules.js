const rules = {
  oldPassword: [{ required: true, message: "请输入旧密码" }],
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
};

export default rules;
