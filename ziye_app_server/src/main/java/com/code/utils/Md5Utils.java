package com.code.utils;

import org.apache.commons.codec.digest.DigestUtils;

public class Md5Utils {

    private static final String slat = "_ziye_";

    public static String encrypt(String str) {
        return DigestUtils.md5Hex(str + slat);
    }

}
