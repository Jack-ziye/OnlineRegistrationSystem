package com.code.controller.system;

import com.alibaba.excel.EasyExcel;
import com.alibaba.fastjson2.JSON;
import com.code.common.logAop.LogAnnotation;
import com.code.entity.system.CurrentMenu;
import com.code.entity.system.LoginLog;
import com.code.entity.system.SysUser;
import com.code.service.system.ILoginService;
import com.code.service.system.IMenuService;
import com.code.utils.*;
import com.code.vo.LoginParam;
import com.code.vo.MobileLoginParam;
import com.github.pagehelper.PageInfo;
import eu.bitwalker.useragentutils.UserAgent;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.net.URLEncoder;
import java.util.*;
import java.util.concurrent.TimeUnit;

@RestController
@Api(tags = "登录管理接口")
@RequestMapping("/user")
public class LoginController {
    @Resource
    private ILoginService iLoginService;

    @Resource
    private IMenuService iMenuService;

    @Resource
    private ThreadService threadService;

    @Resource
    private RedisUtil redisUtil;

    private static final Logger LOGGER = LoggerFactory.getLogger(UserController.class);

    /**
     * 设置日志信息
     *
     * @param user 用户信息
     * @return 日志信息
     */
    private LoginLog setLoginLog(SysUser user, Integer status) {
        HttpServletRequest httpServletRequest = HttpContextUtils.getHttpServletRequest();
        UserAgent userAgent = UserAgent.parseUserAgentString(httpServletRequest.getHeader("user-agent"));

        LoginLog login = new LoginLog();
        login.setUserId(user.getUserId());
        login.setAddress(IpUtils.getIpAddress(httpServletRequest));
        login.setBrowser(userAgent.getBrowser().toString());
        login.setSystem(userAgent.getOperatingSystem().getName());
        login.setStatus(status);
        login.setLoginTime(new Date());
        login.setUsername(user.getUsername());

        return login;
    }

    /**
     * token设置
     *
     * @param user user
     * @return token
     */
    private HashMap<String, String> setToken(SysUser user) {
        String accessToken = JwtToken.createToken(user);
        String refreshToken = JwtToken.createRefreshToken(user);
        redisUtil.set("TOKEN_ACCESS_" + accessToken, user, JwtToken.getTokenExpired(accessToken), TimeUnit.MINUTES);
        redisUtil.set("TOKEN_REFRESH_" + refreshToken, user, JwtToken.getTokenExpired(refreshToken), TimeUnit.MINUTES);

        HashMap<String, String> token = new HashMap<>();
        token.put("access_token", accessToken);
        token.put("refresh_token", refreshToken);
        redisUtil.set("USER_" + user.getUserId(), token, JwtToken.getTokenExpired(accessToken), TimeUnit.MINUTES);

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
    public Result login(@RequestBody @Validated LoginParam loginParam) {
        loginParam.setPassword(Md5Utils.encrypt(loginParam.getPassword()));

        SysUser user = iLoginService.login(loginParam.getUsername());


        if (user == null) {
            return Result.error(ResultCode.USER_IS_EXIST);
        } else if (!user.getPassword().equals(loginParam.getPassword())) {
            LoginLog loginLog = setLoginLog(user, 1);
            threadService.addLoginLog(loginLog);
            return Result.error(ResultCode.PASSWORD_ERROR);
        } else if (user.getStatus() != 0) {
            return Result.error(ResultCode.USER_DISABLE);
        }

        // 用户登录设置
        HashMap<String, String> token = setToken(user);
        LoginLog loginLog = setLoginLog(user, 0);
        // 添加登录日志
        threadService.addLoginLog(loginLog);

        return Result.ok().put(token);
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

        SysUser user = iLoginService.mobileLogin(param.getMobile());
        if (user == null) {
            return Result.error(ResultCode.MOBILE_NO_BINDING);
        }

        // 验证码判断
        String varCode = (String) redisUtil.get("CODE_MOBILE_" + param.getMobile());
        if (varCode == null) {
            return Result.error(ResultCode.VAR_CODE_IS_EXIST);
        } else if (!varCode.equals(param.getCode())) {
            LoginLog loginLog = setLoginLog(user, 2);
            threadService.addLoginLog(loginLog);
            return Result.error(ResultCode.VAR_CODE_NO_EQUAL);
        } else if (user.getStatus() != 0) {
            return Result.error(ResultCode.USER_DISABLE);
        }
        // 清除验证码缓存
        redisUtil.delete("CODE_MOBILE_" + param.getMobile());

        // 登录设置
        HashMap<String, String> token = setToken(user);
        // 添加登录日志
        LoginLog loginLog = setLoginLog(user, 0);
        threadService.addLoginLog(loginLog);

        return Result.ok().put(token);
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
    public Result logout(@RequestHeader("Authorization") String token) {
        iLoginService.loginOut(token);
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
    public Result tokenRefresh(@RequestHeader("Authorization") String accToken, @RequestHeader("Refresh-Token") String refToken) {
        // 获取用户信息
        Object getUser = redisUtil.get("TOKEN_REFRESH_" + refToken);
        SysUser user = JSON.parseObject(JSON.toJSONString(getUser), SysUser.class);
        if (user == null) {
            return Result.error(ResultCode.TOKEN_ERROR);
        }
        redisUtil.delete("TOKEN_ACCESS_" + accToken);
        redisUtil.delete("TOKEN_REFRESH_" + refToken);

        // 更新token >>> 创建新的token并返回
        HashMap<String, String> token = setToken(user);
        LoginLog loginLog = setLoginLog(user, 0);
        threadService.addLoginLog(loginLog);

        return Result.ok().put(token);
    }


    // -------------------------------------------------------------------------------------------------------------------


    /**
     * 获取当前用户信息
     *
     * @param token token
     * @return Result
     */
    @ApiOperation(value = "获取当前用户信息")
    @GetMapping("/current")
    public Result currentUser(@RequestHeader("Authorization") String token) {
        SysUser user = iLoginService.selectUserByToken(token);

        if (user == null) {
            return Result.error(ResultCode.TOKEN_ERROR);
        }

        return Result.ok().put(user);
    }

    /**
     * 获取当前用户菜单
     *
     * @return Result
     */
    @ApiOperation(value = "获取当前用户菜单")
    @GetMapping("/current/menu")
    public Result currentList() {
        Long userId = UserThreadLocal.get().getUserId();
        ArrayList<CurrentMenu> menus = iMenuService.selectCurrentMenu(userId);
        return Result.ok().put(menus);
    }


    // -------------------------------------------------------------------------------------------------------------------


    /**
     * 查询列表-登录日志
     *
     * @param map map
     * @return Result
     */
    @ApiOperation(value = "查询列表-登录日志")
    @PostMapping("/loginLog")
    public Result pageList(HttpServletResponse response, @RequestBody Map<String, String> map) {
        response.setCharacterEncoding("utf-8");
        int pageNum = 1;//默认从第一页查询
        int pageSize = 10;//默认每页展示10条
        try {
            if (map.containsKey("pageNum")) {
                pageNum = Integer.parseInt(map.get("pageNum"));
            }
            if (map.containsKey("pageSize")) {
                pageSize = Integer.parseInt(map.get("pageSize"));
            }

            HashMap<String, Object> params = new HashMap<String, Object>();

            if (map.containsKey("username")) {
                params.put("username", map.get("username"));
            }
            if (map.containsKey("address")) {
                params.put("address", map.get("address"));
            }
            if (map.containsKey("status")) {
                params.put("status", map.get("status"));
            }
            if (map.containsKey("loginTimeFrom") && map.containsKey("loginTimeTo")) {
                params.put("loginTimeFrom", map.get("loginTimeFrom"));
                params.put("loginTimeTo", map.get("loginTimeTo"));
            }

            PageInfo<LoginLog> pages = iLoginService.selectPageList(params, pageNum, pageSize);
            return Result.ok().putPage(pages);
        } catch (Exception e) {
            LOGGER.error(e.toString());
            return Result.error(e.getMessage());
        }
    }

    /**
     * 删除数据-登录日志
     *
     * @param id 日志id
     * @return Result
     */
    @ApiOperation(value = "删除数据-登录日志")
    @PostMapping("/loginLog/delete")
    public Result deleteLoginLogById(@RequestParam Long id) {

        int status = iLoginService.deleteLoginLog(id);
        if (status == 0) {
            return Result.error("删除失败");
        }
        return Result.ok("删除成功");
    }

    /**
     * 批量删除数据
     *
     * @param ids ID集合
     * @return Result
     */
    @ApiOperation(value = "批量删除数据-登录日志")
    @PostMapping("/loginLog/deleteBatch")
    public Result deleteBatch(@RequestParam(value = "ids", required = true) List<Long> ids) {

        int status = iLoginService.deleteBatch(ids);
        if (status == 0) {
            return Result.error("删除失败");
        }
        return Result.ok("删除成功");
    }


    /**
     * 导出数据
     *
     * @param map props
     */
    @ApiOperation(value = "导出数据")
    @PostMapping("/loginLog/export")
    @RequiresPermissions(value = {"system:loginLog:export"})
    public Result exportExcel(HttpServletRequest request, HttpServletResponse response, @RequestBody Map<String, Object> map) throws Exception {
        HashMap<String, Object> params = new HashMap<>();

        if (map.containsKey("userId")) {
            params.put("userId", map.get("userId"));
        }

        Set<String> propsName = new HashSet<>();

        if (map.containsKey("props")) {
            propsName.addAll((ArrayList<String>) map.get("props"));
        }

        // 构建文件
        String filePath = "/save/" + UUID.randomUUID().toString().replace("-", "") + ".xlsx";
        String fileDir = System.getProperty("user.dir") + "/static";
        // 构建上传路径
        File saveFile = new File(fileDir + filePath);
        // 检测是否存在目录
        if (!saveFile.getParentFile().exists()) {
            saveFile.getParentFile().mkdirs();
        }

        List<LoginLog> resultList = iLoginService.selectExcelList(params);
        EasyExcel.write(saveFile, LoginLog.class)
                .includeColumnFieldNames(propsName)
                .sheet("角色信息")
                .doWrite(resultList);

        return Result.ok().put(filePath);
    }

}
