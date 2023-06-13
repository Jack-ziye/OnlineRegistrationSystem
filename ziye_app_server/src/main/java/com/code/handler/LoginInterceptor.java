package com.code.handler;

import com.alibaba.fastjson2.JSON;
import com.baomidou.mybatisplus.core.toolkit.StringUtils;
import com.code.entity.pf.Talent;
import com.code.entity.system.SysUser;
import com.code.service.system.impl.LoginService;
import com.code.service.web.ITalentLoginService;
import com.code.utils.*;
import lombok.extern.slf4j.Slf4j;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;

@Component
@Slf4j
public class LoginInterceptor implements HandlerInterceptor {

    @Resource
    private LoginService loginService;

    @Resource
    private ITalentLoginService iTalentLoginService;

    @Resource
    private RedisUtil redisUtil;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        response.setContentType("application/json;charset=utf-8");
        if (!(handler instanceof HandlerMethod)) {
            return true;
        }

        // 打印日志
        String accessToken = request.getHeader("Authorization");
        String webAccessToken = request.getHeader("Token");
        log.info("==================== request start ====================");
        log.info("request uri: {}", request.getRequestURI());
        log.info("request method: {}", request.getMethod());
        log.info("==================== request  end  ====================");

        // token 不存在
        if (StringUtils.isBlank(accessToken) && StringUtils.isBlank(webAccessToken)) {
            Result result = Result.error(ResultCode.TOKEN_IS_EXIST);
            response.getWriter().print(JSON.toJSONString(result));
            return false;
        }

        String refreshToken = request.getHeader("Refresh-Token");
        if (!StringUtils.isBlank(refreshToken)) {
            if (JwtToken.getTokenExpired(refreshToken) == 0) {
                Result result = Result.error(ResultCode.TOKEN_ERROR);
                response.getWriter().print(JSON.toJSONString(result));
                return false;
            }
            return true;
        }

        // web 端 token校验
        if (StringUtils.isNotBlank(webAccessToken)) {

            // token过期
            if (JwtToken.getTokenExpired(webAccessToken) == 0) {
                Result result = Result.error(ResultCode.TOKEN_EXPIRED);
                response.getWriter().print(JSON.toJSONString(result));
                return false;
            }

            Talent talent = iTalentLoginService.selectTalentByToken(webAccessToken);
            // 用户不存在
            if (talent == null) {
                Result result = Result.error(ResultCode.TOKEN_ERROR);
                response.getWriter().print(JSON.toJSONString(result));
                return false;
            }

            // 用户挤线判断
            Object getToken = redisUtil.get("TALENT_" + talent.getTalentId());
            HashMap<String, String> token = JSON.parseObject(JSON.toJSONString(getToken), HashMap.class);
            if (!token.get("access_token").equals(webAccessToken)) {
                Result result = Result.error(ResultCode.TOKEN_IS_EXISTED);
                response.getWriter().print(JSON.toJSONString(result));
                return false;
            }
            TalentThreadLocal.put(talent);
            return true;
        }



        // admin 端 token校验

        // token过期
        if (JwtToken.getTokenExpired(accessToken) == 0) {
            Result result = Result.error(ResultCode.TOKEN_EXPIRED);
            response.getWriter().print(JSON.toJSONString(result));
            return false;
        }

        // 用户不存在
        SysUser user = loginService.selectUserByToken(accessToken);
        if (user == null) {
            Result result = Result.error(ResultCode.TOKEN_ERROR);
            response.getWriter().print(JSON.toJSONString(result));
            return false;
        }

        // 用户挤线判断
        Object getToken = redisUtil.get("USER_" + user.getUserId());
        HashMap<String, String> token = JSON.parseObject(JSON.toJSONString(getToken), HashMap.class);
        if (!token.get("access_token").equals(accessToken)) {
            Result result = Result.error(ResultCode.TOKEN_IS_EXISTED);
            response.getWriter().print(JSON.toJSONString(result));
            return false;
        }

        UserThreadLocal.put(user);
        return true;
    }


    @Override
    public void afterCompletion(@NotNull HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        UserThreadLocal.remove();
    }

}
