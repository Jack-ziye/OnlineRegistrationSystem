package com.code.controller.system;

import com.code.common.logAop.LogAnnotation;
import com.code.entity.system.Menu;
import com.code.service.system.IMenuService;
import com.code.utils.Result;
import com.code.utils.ResultCode;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Map;

import javax.annotation.Resource;

/**
 * <p>
 * Controller
 * </p>
 *
 * @author ziye
 * @since 2022-10-30
 */
@RestController
@Api(tags = "菜单管理接口")
@RequestMapping("/menu")
public class MenuController {

    @Resource
    private IMenuService iMenuService;

    /**
     * 查询列表
     *
     * @param map map
     * @return Result
     */
    @ApiOperation(value = "查询列表")
    @PostMapping("/list")
    public Result selectMenuList(@RequestBody Map<String, Object> map) {
        ArrayList<Menu> menuList = iMenuService.selectMenuList(map);
        return Result.ok().put(menuList);
    }

    /**
     * 新增数据
     *
     * @param menu Menu
     * @return Result
     */
    @ApiOperation(value = "新增数据")
    @PostMapping("/insert")
    @LogAnnotation(module = "菜单管理接口", operator = "新增数据")
    public Result insertMenu(@RequestBody Menu menu) {
        int status = iMenuService.addMenu(menu);
        if (status > 0) {
            return Result.ok("添加成功");
        } else {
            return Result.error(ResultCode.ADD_ERROR);
        }
    }

    /**
     * 修改数据
     *
     * @param menu menu
     * @return Result
     */
    @ApiOperation(value = "修改数据")
    @PostMapping("/update")
    public Result updateMenu(@RequestBody Menu menu) {
        int status = iMenuService.editMenu(menu);
        if (status > 0) {
            return Result.ok("更新成功");
        } else {
            return Result.error(ResultCode.UPDATE_ERROR);
        }
    }

    /**
     * 用户状态变更
     *
     * @param menuId menuId
     * @return Result
     */
    @ApiOperation(value = "用户状态变更")
    @GetMapping("/update/status")
    @LogAnnotation(module = "菜单管理接口", operator = "菜单状态变更")
    public Result updateStatus(@RequestParam(value = "id") Long menuId) {
        int status = iMenuService.updateStatus(menuId);
        if (status == 0) {
            return Result.error(ResultCode.UPDATE_ERROR);
        }
        return Result.ok();
    }

    /**
     * 显示变更
     *
     * @param menuId menuId
     * @return Result
     */
    @ApiOperation(value = "用户状态变更")
    @GetMapping("/update/show")
    @LogAnnotation(module = "菜单管理接口", operator = "菜单显示变更")
    public Result updateShow(@RequestParam(value = "id") Long menuId) {
        int status = iMenuService.updateShow(menuId);
        if (status == 0) {
            return Result.error(ResultCode.UPDATE_ERROR);
        }
        return Result.ok();
    }

    /**
     * 查看详情
     *
     * @param id id
     * @return Result
     */
    @ApiOperation(value = "查看详情")
    @GetMapping("/info")
    public Result info(@RequestParam Long id) {
        Menu menu = iMenuService.getDetailsById(id);
        return Result.ok().put(menu);
    }

    /**
     * 根据ID删除记录
     *
     * @param id id
     * @return Result
     */
    @ApiOperation(value = "根据ID删除记录")
    @PostMapping("/delete")
    public Result deleteMenu(@RequestParam Long id) {
        int status = iMenuService.deleteById(id);
        if (status > 0) {
            return Result.ok("删除成功");
        } else {
            return Result.error(ResultCode.DELETE_ERROR);
        }
    }

}
