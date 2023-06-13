package com.code.handler;


import cn.hutool.core.lang.ClassScanner;
import com.code.utils.Result;
import com.code.utils.ResultCode;
import io.swagger.annotations.ApiModelProperty;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authz.UnauthorizedException;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingRequestHeaderException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import java.lang.reflect.Field;
import java.sql.SQLException;
import java.sql.SQLSyntaxErrorException;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    @ResponseBody
    public Result doException(Exception e) {
        e.printStackTrace();
        return Result.error(ResultCode.SYSTEM_ERROR);
    }

    /**
     * sql异常捕获
     *
     * @param e 错误信息集合
     * @return 错误信息
     */
    @ExceptionHandler(SQLSyntaxErrorException.class)
    @ResponseBody
    public Result handleSQLSyntaxErrorException(SQLSyntaxErrorException e) {
        e.printStackTrace();
        return Result.error(ResultCode.SQL_ERROR);
    }

    /**
     * sql异常捕获(索引字段存在相同的值)
     *
     * @param e 错误信息集合
     * @return 错误信息
     */
    @ExceptionHandler(DuplicateKeyException.class)
    @ResponseBody
    public Result handleDuplicateKeyException(SQLException e) {
        e.printStackTrace();
        String regex = "Duplicate entry '(.*?)' for key 'uq_(.*?)_(.*?)'";
        Matcher matcher = Pattern.compile(regex).matcher(e.getMessage());

        if (matcher.find()) {

            String value = matcher.group(1);
            String table = matcher.group(2);
            String keys = matcher.group(3);

            Set<Class<?>> scan = ClassScanner.scanPackage("com.code.entity");
            String message = scan.stream()
                    .filter(c -> c.getName().toLowerCase().contains(table))
                    .map(item -> {
                        Field[] declaredFields = item.getDeclaredFields();
                        for (Field declaredField : declaredFields) {
                            if (keys.contains(declaredField.getName())) {
                                return declaredField.getAnnotation(ApiModelProperty.class).value();
                            }
                        }
                        return "";
                    }).findFirst().orElse("");
            return Result.error(ResultCode.SYSTEM_ERROR.status(), message + "" + value + "已存在");
        }
        return Result.error(ResultCode.SQL_ERROR);
    }

    /**
     * 权限错误拦截处理
     *
     * @param e 错误信息集合
     * @return 错误信息
     */
    @ExceptionHandler(UnknownAccountException.class)
    @ResponseBody
    public Result handlerUnknownAccountExceptionException(UnknownAccountException e) {
        return Result.error(ResultCode.TOKEN_ERROR);
    }

    /**
     * token 错误拦截处理
     *
     * @param e 错误信息集合
     * @return 错误信息
     */
    @ExceptionHandler(UnauthorizedException.class)
    @ResponseBody
    public Result handlerExceptionResolverException(UnauthorizedException e) {
        return Result.error(ResultCode.AUTH_NO_ERROR);
    }

    /**
     * 请求头参数缺失拦截处理
     *
     * @param e 错误信息集合
     * @return 错误信息
     */
    @ExceptionHandler(MissingRequestHeaderException.class)
    @ResponseBody
    public Result handleMissingRequestHeaderException(MissingRequestHeaderException e) {
        return Result.error(ResultCode.HEADER_PARAM_ERROR);
    }

    /**
     * 校验错误拦截处理
     *
     * @param e 错误信息集合
     * @return 错误信息
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseBody
    public Result handleMethodArgumentNotValidException(MethodArgumentNotValidException e) {
        String message = e.getBindingResult().getFieldError().getDefaultMessage();
        return Result.error(ResultCode.PARAM_ERROR.status(), "参数错误, " + message);
    }


}
