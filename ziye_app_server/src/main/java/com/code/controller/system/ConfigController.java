package com.code.controller.system;

import com.code.utils.Result;
import com.code.utils.ResultCode;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import com.code.entity.system.Config;
import com.code.service.system.IConfigService;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;

import com.github.pagehelper.PageInfo;

/**
 * <p>
 * Controller
 * </p>
 *
 * @author ziye
 * @since 2022-10-30
 */
@RestController
@Api(tags = "参数设置管理接口")
@RequestMapping("/config")
public class ConfigController {

    private static final Logger LOGGER = LoggerFactory.getLogger(ConfigController.class);

    @Resource
    private IConfigService iConfigService;

    /**
     * 查询列表
     *
     * @param map map
     * @return Result
     */
    @ApiOperation(value = "查询列表")
    @PostMapping("/list")
    @RequiresPermissions(value = {"system:config:list"})
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

            HashMap<String, Object> params = new HashMap<>();

            if (map.containsKey("configName")) {
                params.put("configName", map.get("configName"));
            }
            if (map.containsKey("configKey")) {
                params.put("configKey", map.get("configKey"));
            }

            PageInfo<Config> pages = iConfigService.selectPageList(params, pageNum, pageSize);
            return Result.ok().putPage(pages);
        } catch (Exception e) {
            LOGGER.error(e.toString());
            return Result.error(e.getMessage());
        }
    }

    /**
     * 新增数据
     *
     * @param config config
     * @return Result
     */
    @ApiOperation(value = "新增数据")
    @PostMapping("/insert")
    @RequiresPermissions(value = {"system:config:insert"})
    public Result insertConfig(@RequestBody @Validated Config config) {
        config.setCreateTime(new Date());
        int status = iConfigService.addConfig(config);
        if (status > 0) {
            return Result.ok("添加成功");
        } else {
            return Result.error(ResultCode.ADD_ERROR);
        }
    }

    /**
     * 修改数据
     *
     * @param config config
     * @return Result
     */
    @ApiOperation(value = "修改数据")
    @PostMapping("/update")
    @RequiresPermissions(value = {"system:config:update"})
    public Result updateConfig(@RequestBody Config config) {
        int status = iConfigService.editConfig(config);
        if (status > 0) {
            return Result.ok("更新成功");
        } else {
            return Result.error(ResultCode.UPDATE_ERROR);
        }
    }

    /**
     * 查看详情
     *
     * @param id id
     * @return Result
     */
    @ApiOperation(value = "查看详情")
    @GetMapping("/info")
    @RequiresPermissions(value = {"system:config:info"})
    public Result info(@RequestParam Long id) {
        Config config = iConfigService.getDetailsById(id);
        return Result.ok().put(config);
    }

    /**
     * 根据ID删除记录
     *
     * @param id id
     * @return Result
     */
    @ApiOperation(value = "根据ID删除记录")
    @PostMapping("/delete")
    @RequiresPermissions(value = {"system:config:delete"})
    public Result deleteConfig(@RequestParam Long id) {
        int status = iConfigService.deleteById(id);
        if (status > 0) {
            return Result.ok("删除成功");
        } else {
            return Result.error(ResultCode.DELETE_ERROR);
        }
    }

    /**
     * 批量删除数据
     *
     * @param ids ID集合
     * @return Result
     */
    @ApiOperation(value = "批量删除数据")
    @PostMapping("/deleteBatch")
    @RequiresPermissions(value = {"system:config:delete"})
    public Result deleteBatch(@RequestParam(value = "ids") List<Long> ids) {
        int status = iConfigService.deleteBatch(ids);
        if (status > 0) {
            return Result.ok("删除成功");
        } else {
            return Result.error(ResultCode.DELETE_ERROR);
        }
    }

}
