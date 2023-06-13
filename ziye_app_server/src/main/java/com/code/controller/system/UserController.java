package com.code.controller.system;

import com.alibaba.excel.EasyExcel;
import com.alibaba.fastjson2.JSON;
import com.code.entity.system.Role;
import com.code.service.system.IUserService;
import com.code.utils.Md5Utils;
import com.code.utils.ResultCode;
import com.code.utils.UserThreadLocal;
import com.code.vo.ResetPwdParam;
import com.code.vo.UpdatePwdParam;
import com.github.pagehelper.PageInfo;

import com.code.common.logAop.LogAnnotation;
import com.code.entity.system.SysUser;

import com.code.utils.Result;
import com.code.vo.UserParam;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

import org.apache.commons.codec.digest.DigestUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.net.URLEncoder;
import java.util.*;

@RestController
@Api(tags = "用户管理接口")
@RequestMapping("/user")
public class UserController {

    @Resource
    private IUserService iUserService;

    private static final Logger LOGGER = LoggerFactory.getLogger(UserController.class);

    /**
     * 查询列表
     *
     * @param response response
     * @param map      map
     * @return Result
     */
    @ApiOperation(value = "查询列表", notes = "{\"pageNum\": 1,\"pageSize\": 10} searchWord (用户名)关键词[可选]")
    @PostMapping("/list")
    @LogAnnotation(module = "用户管理接口", operator = "查询用户列表")
    @RequiresPermissions(value = {"system:user:list"})
    public Result userList(HttpServletResponse response, @RequestBody(required = false) Map<String, String> map) {
        response.setCharacterEncoding("utf-8");
        SysUser sysUser = UserThreadLocal.get();
        int pageNum = 1;//默认从第一页查询
        int pageSize = 10;//默认每页展示100000条
        try {
            if (map.containsKey("pageNum")) {
                pageNum = Integer.parseInt(map.get("pageNum"));
            }
            if (map.containsKey("pageSize")) {
                pageSize = Integer.parseInt(map.get("pageSize"));
            }

            HashMap<String, Object> params = new HashMap<>();
            params.put("currentUserId", sysUser.getUserId());

            if (map.containsKey("username")) {
                params.put("username", map.get("username"));
            }
            if (map.containsKey("creatTimeFrom") && map.containsKey("creatTimeTo")) {
                params.put("creatTimeFrom", map.get("creatTimeFrom"));
                params.put("creatTimeTo", map.get("creatTimeTo"));
            }

            PageInfo<SysUser> pages = iUserService.selectPageList(params, pageNum, pageSize);
            return Result.ok().putPage(pages);

        } catch (Exception e) {
            LOGGER.error(e.toString());
            return Result.error(e.getMessage());
        }

    }

    /**
     * 根据id查询用户
     *
     * @param userId userId
     * @return Result
     */
    @ApiOperation(value = "查询用户")
    @PostMapping("/select")
    @RequiresPermissions(value = {"system:user:select"})
    @LogAnnotation(module = "用户管理接口", operator = "查询用户")
    public Result selectUserById(@RequestParam(value = "id") Long userId) {
        SysUser sysUser = iUserService.selectUserById(userId);
        if (sysUser == null) {
            return Result.error(ResultCode.USER_IS_EXIST);
        }

        return Result.ok().put(sysUser);
    }

    /**
     * 添加数据
     *
     * @param userParam userParam
     * @return Result
     */
    @ApiOperation(value = "添加用户", notes = "{\"username\": \"username\",\"password\": \"password\"}")
    @PostMapping("/insert")
    @RequiresPermissions(value = {"system:user:insert"})
    @LogAnnotation(module = "用户管理接口", operator = "添加用户")
    public Result insertUser(@RequestBody @Validated UserParam userParam) {
        userParam.setPassword(Md5Utils.encrypt(userParam.getPassword()));
        SysUser user = JSON.parseObject(JSON.toJSONString(userParam), SysUser.class);
        int status = iUserService.insertUser(user);
        if (status == 0) {
            return Result.error(ResultCode.ADD_ERROR);
        } else if (status == -1) {
            return Result.error(ResultCode.USERNAME_IS_EXISTED);
        }
        return Result.ok("添加成功");
    }

    /**
     * 修改数据
     *
     * @param userParam userParam
     * @return Result
     */
    @ApiOperation(value = "修改用户", notes = "{ id: 4,\"username\": \"username\",\"password\": \"password\" }")
    @PostMapping("/update")
    @RequiresPermissions(value = {"system:user:update"})
    @LogAnnotation(module = "用户管理接口", operator = "修改用户")
    public Result updateUser(@RequestBody UserParam userParam) {
        if (StringUtils.isNotBlank(userParam.getPassword())) {
            userParam.setPassword(Md5Utils.encrypt(userParam.getPassword()));
        }
        SysUser user = JSON.parseObject(JSON.toJSONString(userParam), SysUser.class);
        int status = iUserService.updateUser(user);
        if (status == 0) {
            return Result.error(ResultCode.UPDATE_ERROR);
        }
        return Result.ok("更新成功");
    }

    /**
     * 用户状态变更
     *
     * @param userId userId
     * @return Result
     */
    @ApiOperation(value = "用户状态变更")
    @GetMapping("/update/status")
    @RequiresPermissions(value = {"system:user:update"})
    @LogAnnotation(module = "用户管理接口", operator = "用户状态变更")
    public Result updateUserStatus(@RequestParam(value = "id") Long userId) {
        int status = iUserService.updateUserStatus(userId);
        if (status == 0) {
            return Result.error(ResultCode.UPDATE_ERROR);
        }
        return Result.ok();
    }

    /**
     * 重置密码
     *
     * @param pwdParam pwdParam
     * @return Result
     */
    @ApiOperation(value = "重置密码")
    @PostMapping("/reset/password")
    @RequiresPermissions(value = {"system:user:update"})
    @LogAnnotation(module = "用户管理接口", operator = "重置密码")
    public Result resetUserPassword(@RequestBody ResetPwdParam pwdParam) {

        if (!pwdParam.getPassword().equals(pwdParam.getValidPassword())) {
            return Result.error(ResultCode.PASSWORD_NO_EQUAL);
        }
        pwdParam.setPassword(Md5Utils.encrypt(pwdParam.getPassword()));
        SysUser user = JSON.parseObject(JSON.toJSONString(pwdParam), SysUser.class);
        int status = iUserService.updateUser(user);
        if (status == 0) {
            return Result.error(ResultCode.UPDATE_ERROR);
        }
        return Result.ok("更新成功");
    }

    /**
     * 修改密码
     *
     * @param param updatePwdParam
     * @return Result
     */
    @ApiOperation(value = "修改密码")
    @PostMapping("/update/password")
    @RequiresPermissions(value = {"system:user:update"})
    @LogAnnotation(module = "用户管理接口", operator = "修改密码")
    public Result updateUserPassword(@RequestBody UpdatePwdParam param) {

        // 确认密码比较
        if (!param.getPassword().equals(param.getValidPassword())) {
            return Result.error(ResultCode.PASSWORD_INPUT_NO_EQUAL);
        }

        String password = UserThreadLocal.get().getPassword();
        // 输入旧密码加密比较
        param.setOldPassword(Md5Utils.encrypt(param.getOldPassword()));
        if (!password.equals(param.getOldPassword())) {
            return Result.error(ResultCode.PASSWORD_NO_EQUAL);
        }

        param.setPassword(Md5Utils.encrypt(param.getPassword()));
        SysUser user = JSON.parseObject(JSON.toJSONString(param), SysUser.class);
        int status = iUserService.updateUser(user);
        if (status == 0) {
            return Result.error(ResultCode.UPDATE_ERROR);
        }
        return Result.ok("更新成功");
    }

    /**
     * 删除用户
     *
     * @param id userId
     * @return Result
     */
    @ApiOperation(value = "删除用户", notes = "{ userId: 4 }")
    @PostMapping("/delete")
    @RequiresPermissions(value = {"system:user:delete"})
    @LogAnnotation(module = "用户管理接口", operator = "删除用户")
    public Result deleteUser(@RequestParam Long id) {

        int status = iUserService.deleteUser(id);
        if (status == 0) {
            return Result.error(ResultCode.DELETE_ERROR);
        }
        return Result.ok("删除成功");
    }

    /**
     * 批量删除数据
     *
     * @param ids ID集合
     * @return Result
     */
    @ApiOperation(value = "批量删除数据")
    @RequiresPermissions(value = {"system:user:delete"})
    @PostMapping("/deleteBatch")
    public Result deleteBatch(@RequestParam List<Long> ids) {

        int status = iUserService.deleteBatch(ids);
        if (status > 0) {
            return Result.ok("ok");
        } else {
            return Result.error(ResultCode.DELETE_ERROR);
        }
    }

    /**
     * 导出数据
     *
     * @param map props
     */
    @ApiOperation(value = "导出数据")
    @PostMapping("/export")
    @RequiresPermissions(value = {"system:user:export"})
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

        List<SysUser> resultList = iUserService.selectExcelList(params);
        EasyExcel.write(saveFile, SysUser.class)
                .includeColumnFieldNames(propsName)
                .sheet("用户信息")
                .doWrite(resultList);

        return Result.ok().put(filePath);
    }

}

