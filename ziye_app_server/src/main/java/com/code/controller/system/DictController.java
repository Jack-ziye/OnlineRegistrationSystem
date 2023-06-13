package com.code.controller.system;

import com.alibaba.excel.EasyExcel;
import com.code.common.logAop.LogAnnotation;
import com.code.entity.system.SysUser;
import com.code.utils.Result;
import com.code.utils.ResultCode;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.web.bind.annotation.*;
import com.code.entity.system.Dict;
import com.code.service.system.IDictService;

import java.io.File;
import java.net.URLEncoder;
import java.util.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
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
@Api(tags = "字典管理接口")
@RequestMapping("/dict")
public class DictController {

    private static final Logger LOGGER = LoggerFactory.getLogger(DictController.class);

    @Resource
    private IDictService iDictService;

    /**
     * 查询列表
     *
     * @param map
     * @return
     */
    @ApiOperation(value = "查询列表")
    @PostMapping("/list")
    @RequiresPermissions(value = {"system:dict:list"})
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

            if (map.containsKey("dictName")) {
                params.put("dictName", map.get("dictName"));
            }

            if (map.containsKey("dictType")) {
                params.put("dictType", map.get("dictType"));
            }

            PageInfo<Dict> pages = iDictService.selectPageList(params, pageNum, pageSize);
            return Result.ok().putPage(pages);
        } catch (Exception e) {
            LOGGER.error(e.toString());
            return Result.error(e.getMessage());
        }
    }

    /**
     * 新增数据
     *
     * @param dict
     * @return
     */
    @ApiOperation(value = "新增数据")
    @PostMapping("/insert")
    @RequiresPermissions(value = {"system:dict:insert"})
    public Result insertDict(@RequestBody Dict dict) {
        int status = iDictService.addDict(dict);
        if (status > 0) {
            return Result.ok("添加成功");
        } else {
            return Result.error("添加失败");
        }
    }

    /**
     * 修改数据
     *
     * @param dict
     * @return
     */
    @ApiOperation(value = "修改数据")
    @PostMapping("/update")
    @RequiresPermissions(value = {"system:dict:update"})
    public Result updateDict(@RequestBody Dict dict) {
        int status = iDictService.editDict(dict);
        if (status > 0) {
            return Result.ok("更新成功");
        } else {
            return Result.error("更新失败");
        }
    }

    /**
     * 状态变更
     *
     * @param dictId dictId
     * @return Result
     */
    @ApiOperation(value = "状态变更")
    @GetMapping("/update/status")
    @RequiresPermissions(value = {"system:dict:update"})
    @LogAnnotation(module = "用户管理接口", operator = "状态变更")
    public Result updateStatus(@RequestParam(value = "id") Long dictId) {
        int status = iDictService.updateStatus(dictId);
        if (status == 0) {
            return Result.error(ResultCode.UPDATE_ERROR);
        }
        return Result.ok();
    }

    /**
     * 根据ID删除记录
     *
     * @param id
     * @return
     */
    @ApiOperation(value = "根据ID删除记录")
    @PostMapping("/delete")
    @RequiresPermissions(value = {"system:dict:delete"})
    public Result deleteDict(@RequestParam Long id) {
        int status = iDictService.deleteById(id);
        if (status > 0) {
            return Result.ok("删除成功");
        } else {
            return Result.error("删除失败");
        }
    }

    /**
     * 批量删除数据
     *
     * @param ids ID集合
     * @return
     */
    @ApiOperation(value = "批量删除数据")
    @PostMapping("/deleteBatch")
    @RequiresPermissions(value = {"system:dict:delete"})
    public Result deleteBatch(@RequestParam(value = "ids", required = true) List<Long> ids) {
        int status = iDictService.deleteBatch(ids);
        if (status > 0) {
            return Result.ok("删除成功");
        } else {
            return Result.error("删除失败");
        }
    }

    /**
     * 导出数据
     *
     * @param map props
     */
    @ApiOperation(value = "导出数据")
    @PostMapping("/export")
    @RequiresPermissions(value = {"system:dict:export"})
    public Result exportExcel(HttpServletRequest request, HttpServletResponse response, @RequestBody Map<String, Object> map) throws Exception {
        HashMap<String, Object> params = new HashMap<>();

        if (map.containsKey("dictId")) {
            params.put("dictId", map.get("dictId"));
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

        List<Dict> resultList = iDictService.selectExcelList(params);
        EasyExcel.write(saveFile, Dict.class)
                .includeColumnFieldNames(propsName)
                .sheet("角色信息")
                .doWrite(resultList);

        return Result.ok().put(filePath);

    }

}
