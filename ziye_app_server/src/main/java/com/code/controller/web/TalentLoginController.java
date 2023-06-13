package com.code.controller.web;

import com.alibaba.fastjson2.JSON;
import com.alibaba.fastjson2.JSONObject;
import com.code.common.logAop.LogAnnotation;
import com.code.controller.system.UserController;
import com.code.entity.pf.Talent;
import com.code.entity.system.SysUser;
import com.code.service.pf.ITalentService;
import com.code.service.system.ILoginService;
import com.code.service.web.ITalentLoginService;
import com.code.utils.*;
import com.code.vo.LoginParam;
import com.code.vo.MobileLoginParam;
import com.code.vo.TalentLoginParam;
import com.code.vo.TalentRegisterParam;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.*;
import java.util.concurrent.TimeUnit;

@RestController
@Api(tags = "人才登录管理接口")
@RequestMapping("/talent")
public class TalentLoginController {


    @Resource
    private ITalentLoginService iTalentLoginService;

    @Resource
    private RedisUtil redisUtil;

    /**
     * token设置
     *
     * @param talent talent
     * @return token
     */
    private HashMap<String, String> setToken(Talent talent) {
        String accessToken = JwtToken.createToken(talent);
        String refreshToken = JwtToken.createRefreshToken(talent);
        redisUtil.set("TOKEN_ACCESS_" + accessToken, talent, JwtToken.getTokenExpired(accessToken), TimeUnit.MINUTES);
        redisUtil.set("TOKEN_REFRESH_" + refreshToken, talent, JwtToken.getTokenExpired(refreshToken), TimeUnit.MINUTES);

        HashMap<String, String> token = new HashMap<>();
        token.put("access_token", accessToken);
        token.put("refresh_token", refreshToken);
        redisUtil.set("TALENT_" + talent.getTalentId(), token, JwtToken.getTokenExpired(accessToken), TimeUnit.MINUTES);

        return token;
    }

    /**
     * 用户登录
     *
     * @param loginParam loginParam
     * @return Result
     */
    @ApiOperation(value = "用户登录", notes = "{\"username\": \"username\",\"password\": \"password\"}")
    @PostMapping("/login")
    @LogAnnotation(module = "登录管理接口", operator = "用户登录")
    public Result login(@RequestBody @Validated TalentLoginParam loginParam) {
        loginParam.setPassword(Md5Utils.encrypt(loginParam.getPassword()));

        Talent talent = iTalentLoginService.login(loginParam.getTalentName());
        if (talent == null) {
            return Result.error(ResultCode.USER_IS_EXIST);
        } else if (!talent.getPassword().equals(loginParam.getPassword())) {
            return Result.error(ResultCode.PASSWORD_ERROR);
        } else if (talent.getStatus() != 0) {
            return Result.error(ResultCode.USER_DISABLE);
        }

        return Result.ok().put(setToken(talent));
    }

    /**
     * 手机号登录
     *
     * @param param mobileLoginParam
     * @return Result
     */
    @ApiOperation(value = "手机号登录")
    @PostMapping("/mobile-login")
    @LogAnnotation(module = "登录管理接口", operator = "手机号登录")
    public Result mobileLogin(@RequestBody @Validated MobileLoginParam param) {

        // 验证码判断
        String varCode = (String) redisUtil.get("CODE_MOBILE_" + param.getMobile());
        if (varCode == null) {
            return Result.error(ResultCode.VAR_CODE_IS_EXIST);
        } else if (!varCode.equals(param.getCode())) {
            return Result.error(ResultCode.VAR_CODE_NO_EQUAL);
        }
        // 清除验证码缓存
        redisUtil.delete("CODE_MOBILE_" + param.getMobile());

        Talent talent = iTalentLoginService.mobileLogin(param.getMobile());
        if (talent == null) {
            return Result.error(ResultCode.MOBILE_NO_BINDING);
        } else if (talent.getStatus() != 0) {
            return Result.error(ResultCode.USER_DISABLE);
        }

        return Result.ok().put(setToken(talent));
    }

    /**
     * 退出登录
     *
     * @param token token
     * @return Result
     */
    @ApiOperation(value = "退出登录")
    @GetMapping("/logout")
    @LogAnnotation(module = "登录管理接口", operator = "退出登录")
    public Result logout(@RequestHeader("Token") String token) {
        Map<String, Object> map = JwtToken.checkToken(token);
        Integer talentId = (Integer) map.get("talentId");
        Object getToken = redisUtil.get("TALENT_" + talentId);
        HashMap<String, String> tokenMap = JSON.parseObject(JSON.toJSONString(getToken), HashMap.class);
        redisUtil.delete("TOKEN_ACCESS_" + tokenMap.get("access_token"));
        redisUtil.delete("TOKEN_REFRESH_" + tokenMap.get("refresh_token"));
        return Result.ok();
    }

    /**
     * 登录续期
     *
     * @param accToken access_token
     * @param refToken refresh_token
     * @return Result
     */
    @ApiOperation(value = "登录续期")
    @GetMapping("/token/refresh")
    public Result tokenRefresh(@RequestHeader("Token") String accToken, @RequestHeader("Refresh-Token") String refToken) {

        // 获取用户信息
        Object getTalent = redisUtil.get("TOKEN_REFRESH_" + refToken);
        Talent talent = JSON.parseObject(JSON.toJSONString(getTalent), Talent.class);
        if (talent == null) {
            return Result.error(ResultCode.TOKEN_ERROR);
        }
        redisUtil.delete("TOKEN_ACCESS_" + accToken);
        redisUtil.delete("TOKEN_REFRESH_" + refToken);

        // 更新token >>> 创建新的token并返回
        return Result.ok().put(setToken(talent));
    }

    /**
     * 人才注册
     *
     * @param param talentRegisterParam
     * @return Result
     */
    @ApiOperation(value = "人才注册")
    @PostMapping("/register")
    @LogAnnotation(module = "人才登录管理接口", operator = "人才注册")
    public Result register(@RequestBody @Validated TalentRegisterParam param) {

        // 验证码判断
        String varCode = (String) redisUtil.get("CODE_MOBILE_" + param.getMobile());
        if (varCode == null) {
            return Result.error(ResultCode.VAR_CODE_IS_EXIST);
        } else if (!varCode.equals(param.getCode())) {
            return Result.error(ResultCode.VAR_CODE_NO_EQUAL);
        }
        // 清除验证码缓存
        redisUtil.delete("CODE_MOBILE_" + param.getMobile());

        param.setPassword(Md5Utils.encrypt(param.getPassword()));
        Talent talent = JSONObject.parseObject(JSONObject.toJSONString(param), Talent.class);
        int status = iTalentLoginService.register(talent);
        if (status == 0) {
            return Result.error("注册失败");
        }
        return Result.ok("注册成功");
    }

    /**
     * 获取当前用户信息
     *
     * @param token token
     * @return Result
     */
    @ApiOperation(value = "获取当前用户信息")
    @GetMapping("/current")
    public Result currentUser(@RequestHeader("Token") String token) {
        Talent talent = iTalentLoginService.selectTalentByToken(token);

        if (talent == null) {
            return Result.error(ResultCode.TOKEN_ERROR);
        }

        return Result.ok().put(talent);
    }

}
