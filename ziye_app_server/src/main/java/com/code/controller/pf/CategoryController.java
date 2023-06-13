package com.code.controller.pf;

import com.code.common.logAop.LogAnnotation;
import com.code.entity.pf.Category;
import com.code.entity.system.SysUser;
import com.code.service.pf.ICategoryService;
import com.code.utils.Result;
import com.code.utils.ResultCode;
import com.code.utils.UserThreadLocal;
import com.github.pagehelper.PageInfo;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;

/**
 * <p>
 * Controller
 * </p>
 *
 * @author ziye
 * @since 2022-10-30
 */
@RestController
@Api(tags = "报名-类别管理接口")
@RequestMapping("/category")
public class CategoryController {

    @Resource
    private ICategoryService iCategoryService;

    private static final Logger LOGGER = LoggerFactory.getLogger(CategoryController.class);

    /**
     * 查询列表
     *
     * @param response response
     * @param map      map
     * @return Result
     */
    @ApiOperation(value = "查询列表", notes = "{\"pageNum\": 1,\"pageSize\": 10} searchWord (类别名)关键词[可选]")
    @PostMapping("/list")
    @LogAnnotation(module = "类别管理接口", operator = "获取类别列表")
    public Result userList(HttpServletResponse response, @RequestBody(required = false) Map<String, String> map) {
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

            if (map.containsKey("categoryName")) {
                params.put("categoryName", map.get("categoryName"));
            }
            if (map.containsKey("creatTimeFrom") && map.containsKey("creatTimeTo")) {
                params.put("creatTimeFrom", map.get("creatTimeFrom"));
                params.put("creatTimeTo", map.get("creatTimeTo"));
            }

            PageInfo<Category> pages = iCategoryService.selectPageList(params, pageNum, pageSize);
            return Result.ok().putPage(pages);

        } catch (Exception e) {
            LOGGER.error(e.toString());
            return Result.error(e.getMessage());
        }

    }

    /**
     * 新增数据
     *
     * @param  
     * @return Result
     */
    @ApiOperation(value = "新增数据")
    @PostMapping("/insert")
    @LogAnnotation(module = "菜单管理接口", operator = "新增数据")
    public Result insert(@RequestBody Category category) {
        int status = iCategoryService.insertCategory(category);
        if (status > 0) {
            return Result.ok("添加成功");
        } else {
            return Result.error(ResultCode.ADD_ERROR);
        }
    }

    /**
     * 修改数据
     *
     * @param  
     * @return Result
     */
    @ApiOperation(value = "修改数据")
    @PostMapping("/update")
    public Result update(@RequestBody Category category) {
        int status = iCategoryService.updateCategory(category);
        if (status > 0) {
            return Result.ok("更新成功");
        } else {
            return Result.error(ResultCode.UPDATE_ERROR);
        }
    }

    /**
     * 类别状态变更
     *
     * @param Id Id
     * @return Result
     */
    @ApiOperation(value = "类别状态变更")
    @GetMapping("/update/status")
    @LogAnnotation(module = "菜单管理接口", operator = "菜单状态变更")
    public Result updateStatus(@RequestParam(value = "id") Long Id) {
        int status = iCategoryService.updateStatus(Id);
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
        Category category  = iCategoryService.selectCategoryById(id);
        return Result.ok().put(category);
    }

    /**
     * 根据ID删除记录
     *
     * @param id id
     * @return Result
     */
    @ApiOperation(value = "根据ID删除记录")
    @PostMapping("/delete")
    public Result delete(@RequestParam Long id) {
        int status = iCategoryService.deleteCategory(id);
        if (status > 0) {
            return Result.ok("删除成功");
        } else {
            return Result.error(ResultCode.DELETE_ERROR);
        }
    }

}
