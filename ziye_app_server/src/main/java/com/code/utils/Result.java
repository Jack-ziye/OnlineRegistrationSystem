package com.code.utils;

import com.github.pagehelper.PageInfo;

import java.util.HashMap;

/**
 * @Description: 通用返回对象封装
 * @date 2022年10月20日
 */
public class Result extends HashMap<String, Object> {

    private static final long serialVersionUID = 1L;

    public Result() {
        super.put("code", "");
        super.put("data", "");
        super.put("message", "");
    }

    public static Result error(String msg) {
        Result result = new Result();
        result.put("code", ResultCode.SYSTEM_ERROR.status());
        result.put("message", msg);
        return result;
    }

    public static Result error(int code, String msg) {
        Result result = new Result();
        result.put("code", code);
        result.put("message", msg);
        return result;
    }

    public static Result error(ResultCode resultCode) {
        Result result = new Result();
        result.put("code", resultCode.status());
        result.put("message", resultCode.message());
        return result;
    }

    public static Result ok() {
        Result result = new Result();
        result.put("code", ResultCode.SUCCESS.status());
        result.put("message", ResultCode.SUCCESS.message());
        return result;
    }

    public static Result ok(String msg) {
        Result result = new Result();
        result.put("code", ResultCode.SUCCESS.status());
        result.put("message", msg);
        return result;
    }

    public Result put(Object value) {
        super.put("data", value);
        return this;
    }

    @SuppressWarnings("rawtypes")
    public Result putPage(PageInfo page) {
        PageObject obj = new PageObject()
                .setContent(page.getList())
                .setPageNum(page.getPageNum())
                .setPageSize(page.getPageSize())
                .setTotalPages(page.getTotal());
        return put(obj);
    }

}
