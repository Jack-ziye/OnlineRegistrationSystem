package com.code.utils;

public enum ResultCode {

    SUCCESS(1000, "success"),

    SYSTEM_ERROR(2000, "系统异常, 请联系管理员"),
    SQL_ERROR(2000, "SQL异常, 请联系管理员"),

    USER_IS_EXIST(2001, "用户不存在"),
    USERNAME_IS_EXISTED(2002, "用户名已存在"),
    MOBILE_IS_EXISTED(2003, "手机号已存在"),
    MOBILE_NO_BINDING(2004, "手机号未绑定"),
    PASSWORD_ERROR(2005, "密码错误"),
    PASSWORD_NO_EQUAL(2006, "密码不一致"),
    PASSWORD_INPUT_NO_EQUAL(2007, "确认密码不一致"),
    USER_DISABLE(2008, "您的账号已停用，请联系管理员进行恢复"),


    VAR_CODE_NO_EQUAL(2010, "验证码错误，请输入正确验证码"),
    VAR_CODE_IS_EXIST(2011, "验证码已过期，请重新获取验证码"),

    ADD_ERROR(2020, "添加失败"),
    UPDATE_ERROR(2021, "修改失败"),
    DELETE_ERROR(2022, "删除失败"),
    ASSIGN_ERROR(2023,"分配失败"),
    CANCEL_ERROR(2024,"取消失败"),


    UPLOAD_ERROR(2040,"上传失败"),
    UPLOAD_IS_NULL(2041,"上传失败, 请选择文件"),

    TOKEN_IS_EXIST(3000, "请先登录"),
    TOKEN_IS_EXISTED(3000, "您的账号已在其他设备上登录"),
    TOKEN_ERROR(3000, "登录失效，请重新登录"),
    TOKEN_EXPIRED(3001, "token失效"),
    AUTH_NO_ERROR(3002, "未获取访问相关权限"),
    PARAM_ERROR(4000, "参数错误"),
    HEADER_PARAM_ERROR(4001, "请求头参数缺失");

    private final Integer status;

    private final String message;

    ResultCode(Integer status, String message) {
        this.status = status;
        this.message = message;
    }

    public Integer status() {
        return this.status;
    }

    public String message() {
        return this.message;
    }

}
