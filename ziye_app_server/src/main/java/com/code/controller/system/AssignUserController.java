package com.code.controller.system;

import com.code.common.logAop.LogAnnotation;
import com.code.entity.system.RoleUser;
import com.code.entity.system.SysUser;
import com.code.service.system.IAssignUserService;
import com.code.utils.Result;
import com.code.utils.ResultCode;
import com.github.pagehelper.PageInfo;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;
import java.util.*;

@RestController
@Api(tags = "用户分配管理接口")
@RequestMapping("/assign/user")
public class AssignUserController {

    @Resource
    private IAssignUserService iAssignUserService;

    private static final Logger LOGGER = LoggerFactory.getLogger(AssignUserController.class);

    /**
     * 获取分配用户列表
     *
     * @param response response
     * @param map      map
     * @return Result
     */
    @ApiOperation(value = "查询列表", notes = "{\"pageNum\": 1,\"pageSize\": 10} searchWord (用户名)关键词[可选]")
    @PostMapping("/list")
    @LogAnnotation(module = "用户管理接口", operator = "获取分配用户列表")
    @RequiresPermissions(value = {"system:user:list"})
    public Result userListByRoleId(HttpServletResponse response, @RequestBody(required = false) Map<String, String> map) {
        response.setCharacterEncoding("utf-8");

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

            if (map.containsKey("roleId")) {
                params.put("roleId", map.get("roleId"));
            }
            if (map.containsKey("type")) {
                params.put("type", map.get("type"));
            }
            if (map.containsKey("username")) {
                params.put("username", map.get("username"));
            }
            if (map.containsKey("mobile")) {
                params.put("mobile", map.get("mobile"));
            }

            PageInfo<SysUser> pages = iAssignUserService.selectPageList(params, pageNum, pageSize);
            return Result.ok().putPage(pages);

        } catch (Exception e) {
            LOGGER.error(e.toString());
            return Result.error(e.getMessage());
        }

    }


    /**
     * 添加分配用户
     *
     * @param map map
     * @return Result
     */
    @ApiOperation(value = "添加分配用户", notes = "{ userId: 4 }")
    @PostMapping("/update")
    @RequiresPermissions(value = {"system:user:delete"})
    @LogAnnotation(module = "用户分配管理接口", operator = "添加分配用户")
    public Result updateAssignUser(@RequestBody Map<String, String> map) {

        Long roleId = Long.valueOf(map.get("roleId"));
        List<String> users = Arrays.asList(map.get("users").split(","));

        int status = iAssignUserService.updateAssignUser(roleId, users);

        if(status == 0){
            Result.error(ResultCode.ASSIGN_ERROR);
        }
        return Result.ok("添加成功");
    }

    /**
     * 取消分配用户
     *
     * @param id id
     * @return Result
     */
    @ApiOperation(value = "取消分配用户", notes = "{ userId: 4 }")
    @PostMapping("/delete")
    @RequiresPermissions(value = {"system:user:delete"})
    @LogAnnotation(module = "用户分配管理接口", operator = "取消分配用户")
    public Result deleteAssignUser(@RequestParam Long id) {
        int status = iAssignUserService.deleteAssignUser(id);
        if (status == 0) {
            return Result.error(ResultCode.CANCEL_ERROR);
        }
        return Result.ok("取消成功");
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

        int status = iAssignUserService.deleteBatch(ids);
        if (status > 0) {
            return Result.ok("取消成功");
        } else {
            return Result.error(ResultCode.DELETE_ERROR);
        }
    }

}

