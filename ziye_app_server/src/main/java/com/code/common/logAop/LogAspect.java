package com.code.common.logAop;

import com.alibaba.fastjson.JSON;
import com.code.utils.HttpContextUtils;
import com.code.utils.IpUtils;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import java.lang.reflect.Method;

@Component
@Aspect
@Slf4j
public class LogAspect {

    @Pointcut("@annotation(com.code.common.logAop.LogAnnotation)")
    public void pt() {
    }

    @Around("pt()")
    public Object log(ProceedingJoinPoint joinPoint) throws Throwable {
        long beginTime = System.currentTimeMillis();

        Object result = joinPoint.proceed();

        long time = System.currentTimeMillis() - beginTime;
        recordLog(joinPoint, time);
        return result;
    }

    private void recordLog(ProceedingJoinPoint joinPoint, long time) {

        MethodSignature signature = (MethodSignature) joinPoint.getSignature();
        Method method = signature.getMethod();
        LogAnnotation logAnnotation = method.getAnnotation(LogAnnotation.class);

        log.info("==================== log start ====================");
        log.info("module: {}", logAnnotation.module());
        log.info("operator: {}", logAnnotation.operator());

        // 获取方法路径
        String className = joinPoint.getTarget().getClass().getName();
        String methodName = signature.getName();
        log.info("request method: {}", className + "." + methodName + "()");

        try {
            // 获取方法参数
            Object[] args = joinPoint.getArgs();
            log.info("params: {}", JSON.toJSONString(args[args.length - 1]));
        } catch (Exception e) {
            log.info("params: {}", e.getMessage());
        }

        // 获取IP地址
        HttpServletRequest httpServletRequest = HttpContextUtils.getHttpServletRequest();
        log.info("ip address: {}", IpUtils.getIpAddress(httpServletRequest));

        log.info("execute time: {} ms", time);
        log.info("==================== log  end  ====================");

    }

}
