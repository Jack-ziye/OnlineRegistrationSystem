package com.code.controller.send;

import com.code.utils.*;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.concurrent.TimeUnit;

/**
 * <p>
 * Controller
 * </p>
 *
 * @author ziye
 * @since 2022-10-30
 */
@RestController
@Api(tags = "信息管理接口")
@RequestMapping("/send")
public class CodeController {

    private static final Integer CODE_TIMER = 5;

    @Resource
    private RedisUtil redisUtil;

    /**
     * 发送手机验证码
     *
     * @param mobile 手机号
     * @return Result
     */
    @ApiOperation(value = "发送手机验证码")
    @PostMapping("/code/mobile")
    public Result sendMobileCode(@RequestParam(value = "mobile") String mobile) throws Exception {
        // 获取验证码
        String varCode = VerCodeGenerate.getNumberVerCode(6);
        // 发送验证码
        HashMap<String, Object> hashMap = ShortMessage.SendMessage(mobile, varCode);
        String resCode = (String) hashMap.get("code");
        String message = (String) hashMap.get("message");
        if (resCode.equals("OK")) {
            redisUtil.set("CODE_MOBILE_" + mobile, varCode, CODE_TIMER, TimeUnit.MINUTES);
            return Result.ok("发送成功, 验证码5分钟内有效");
        }
        return Result.error(message).put(hashMap);
    }

}
