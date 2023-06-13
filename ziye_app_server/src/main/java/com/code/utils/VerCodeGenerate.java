package com.code.utils;

import java.security.SecureRandom;
import java.util.Random;

/**
 * @Description 生成验证码工具类
 * @Date 2022/08/28
 * @Author  ziye
 */
public class VerCodeGenerate {

    private static final String SYMBOLS_NUMBER = "0123456789";
    private static final String SYMBOLS = "0123456789ABCDEFGHIGKLMNOPQRSTUVWXYZ";
    private static final Random RANDOM = new SecureRandom();

    /**
     *
     * @param len length
     * @return code
     */
    public static String getVerCode(int len) {
        char[] numbers = new char[len];
        for (int i = 0; i < numbers.length; i++) {
            numbers[i] = SYMBOLS.charAt(RANDOM.nextInt(SYMBOLS.length()));
        }
        return new String(numbers);
    }

    /**
     * 数字验证码
     *
     * @param len length
     * @return numberCode
     */
    public static String getNumberVerCode(int len) {
        char[] numbers = new char[len];
        for (int i = 0; i < numbers.length; i++) {
            numbers[i] = SYMBOLS_NUMBER.charAt(RANDOM.nextInt(SYMBOLS_NUMBER.length()));
        }
        return new String(numbers);
    }
}
