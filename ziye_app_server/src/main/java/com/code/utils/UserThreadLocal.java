package com.code.utils;

import com.code.entity.system.SysUser;

public class UserThreadLocal {

    private UserThreadLocal() {
    }

    private static final ThreadLocal<SysUser> LOCAL = new ThreadLocal<>();


    public static void put(SysUser user) {
        LOCAL.set(user);
    }

    public static SysUser get() {
        return LOCAL.get();
    }

    public static void remove() {
        LOCAL.remove();
    }

}
