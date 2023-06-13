package com.code.utils;


import com.alibaba.fastjson2.JSONObject;
import com.aliyun.dysmsapi20170525.models.SendSmsRequest;
import com.aliyun.dysmsapi20170525.models.SendSmsResponse;
import com.aliyun.dysmsapi20170525.Client;
import com.aliyun.teaopenapi.models.Config;
import com.google.gson.Gson;

import java.util.HashMap;

public class ShortMessage {
    private static final String ACCESS_KEY_ID = "LTAI5tALiwQvaFwFLQWWVJE1";
    private static final String ACCESS_KEY_SECRET = "oZQLfiaGAHBE1DSrnvO0VjJsR5O5zo";
    private static final String SIGN_NAME = "叶子起点";
    private static final String TEMPLATE_CODE = "SMS_274945036";

    public static Client createClient(String accessKeyId, String accessKeySecret) throws Exception {
        Config config = new Config();
        config.setAccessKeyId(accessKeyId);
        config.setAccessKeySecret(accessKeySecret);
        // 访问的域名
        config.endpoint = "dysmsapi.aliyuncs.com";
        return new Client(config);
    }

    public static HashMap<String, Object> SendMessage(String mobile, String code) throws Exception {
        Client client = createClient(ACCESS_KEY_ID, ACCESS_KEY_SECRET);

        HashMap<String, Object> hashMap = new HashMap<>();
        hashMap.put("code", code);

        SendSmsRequest request = new SendSmsRequest();
        request.setPhoneNumbers(mobile);
        request.setSignName(SIGN_NAME);
        request.setTemplateCode(TEMPLATE_CODE);
        request.setTemplateParam(JSONObject.toJSONString(hashMap));
        SendSmsResponse response = client.sendSms(request);
        return JSONObject.parseObject(new Gson().toJson(response.getBody()));
    }

}
