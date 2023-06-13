package com.code.controller.monitor;

import com.alibaba.fastjson2.JSON;
import com.alibaba.fastjson2.TypeReference;
import com.code.entity.monitor.OnlineUser;
import com.code.entity.system.LoginLog;
import com.code.entity.system.SysUser;
import com.code.service.system.ILoginService;
import com.code.utils.*;
import eu.bitwalker.useragentutils.UserAgent;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiModelProperty;
import io.swagger.annotations.ApiOperation;
import org.apache.catalina.User;
import org.apache.commons.lang3.StringUtils;
import org.apache.logging.log4j.core.util.JsonUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.*;
import java.util.concurrent.TimeUnit;

@RestController
@Api(tags = "在线用户管理接口")
@RequestMapping("/monitor/online")
public class OnlineController {

    @Resource
    private RedisUtil redisUtil;

    @Resource
    private ILoginService iLoginService;


    /**
     * 获取在线用户列表
     *
     * @return Result
     */
    @ApiOperation(value = "获取在线用户列表")
    @PostMapping("/select")
    public Result getOnlineUser(@RequestBody Map<String, String> map) {
        List<String> keys = redisUtil.scan("USER_*");
        ArrayList<OnlineUser> onlineUsers = new ArrayList<>();
        for (String key : keys) {
            Long userId = Long.valueOf(key.split("_")[1]);

            LoginLog loginLog = iLoginService.selectLatest(userId);
            OnlineUser onlineUser = JSON.parseObject(JSON.toJSONString(loginLog), OnlineUser.class);

            HashMap<String, String> token = JSON.parseObject(JSON.toJSONString(redisUtil.get("USER_" + userId)), HashMap.class);
            onlineUser.setToken(token.get("access_token"));

            Object status = redisUtil.get("ONLINE_USER_" + userId);
            onlineUser.setStatusName(status == null ? "离开" : "在线");


            onlineUsers.add(onlineUser);
        }

        return Result.ok().put(onlineUsers);
    }

    /**
     * 更新在线用户状态
     *
     * @return Result
     */
    @ApiOperation(value = "更新在线用户状态")
    @GetMapping("/update")
    public Result updateOnlineUser() {
        SysUser sysUser = UserThreadLocal.get();
        redisUtil.set("ONLINE_USER_" + sysUser.getUserId(), sysUser.getUserId(), 5, TimeUnit.SECONDS);
        return Result.ok();
    }

    /**
     * 强退在线用户
     *
     * @return Result
     */
    @ApiOperation(value = "强退在线用户")
    @GetMapping("/delete")
    public Result deleteOnlineUser(@RequestParam(value = "token") String token) {
        Map<String, Object> map = JwtToken.checkToken(token);
        iLoginService.loginOut(token);
        Integer userId = (Integer) map.get("userId");
        redisUtil.delete("ONLINE_USER_" + userId);
        return Result.ok();
    }

}
