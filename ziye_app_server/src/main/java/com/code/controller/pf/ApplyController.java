package com.code.controller.pf;

import com.alibaba.excel.EasyExcel;
import com.code.common.logAop.LogAnnotation;
import com.code.entity.pf.Apply;
import com.code.entity.pf.Talent;
import com.code.entity.system.SysUser;
import com.code.service.pf.IApplyService;
import com.code.utils.Result;
import com.code.utils.ResultCode;
import com.code.utils.UserThreadLocal;
import com.github.pagehelper.PageInfo;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.util.*;

/**
 * <p>
 * Controller
 * </p>
 *
 * @author ziye
 * @since 2022-10-30
 */
@RestController
@Api(tags = "报名-申请管理接口")
@RequestMapping("/apply")
public class ApplyController {

    @Resource
    private IApplyService iProjectApplyService;

    private static final Logger LOGGER = LoggerFactory.getLogger(ApplyController.class);

    /**
     * 查询列表
     *
     * @param response response
     * @param map      map
     * @return Result
     */
    @ApiOperation(value = "查询列表", notes = "{\"pageNum\": 1,\"pageSize\": 10} searchWord (申请名)关键词[可选]")
    @PostMapping("/list")
    @LogAnnotation(module = "申请管理接口", operator = "获取申请列表")
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
            params.put("status", "0");

            if (map.containsKey("projectName")) {
                params.put("projectName", map.get("projectName"));
            }
            if (map.containsKey("talentName")) {
                params.put("talentName", map.get("talentName"));
            }
            if (map.containsKey("creatTimeFrom") && map.containsKey("creatTimeTo")) {
                params.put("creatTimeFrom", map.get("creatTimeFrom"));
                params.put("creatTimeTo", map.get("creatTimeTo"));
            }

            PageInfo<Apply> pages = iProjectApplyService.selectPageList(params, pageNum, pageSize);
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
    public Result insert(@RequestBody Apply apply) {
        int status = iProjectApplyService.insertApply(apply);
        iProjectApplyService.insertApply(apply);
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
    public Result update(@RequestBody Apply apply) {
        int status = iProjectApplyService.updateApply(apply);
        if (status > 0) {
            return Result.ok("更新成功");
        } else {
            return Result.error(ResultCode.UPDATE_ERROR);
        }
    }

    /**
     * 报名审核通过
     *
     * @param Id Id
     * @return Result
     */
    @ApiOperation(value = "报名审核")
    @GetMapping("/update/audit")
    @LogAnnotation(module = "报名申请管理接口", operator = "报名审核通过")
    public Result audit(@RequestParam(value = "id") Long Id) {

        int status = iProjectApplyService.updateStatus(Id);
        if (status == 0) {
            return Result.error(ResultCode.UPDATE_ERROR);
        }
        return Result.ok();
    }

    /**
     * 报名审核不通过
     *
     * @param map { applyId: int, feedback: String }
     * @return Result
     */
    @ApiOperation(value = "报名审核不通过")
    @PostMapping("/update/failAudit")
    @LogAnnotation(module = "报名申请管理接口", operator = "报名审核不通过")
    public Result audit(@RequestBody(required = false) Map<String, String> map) {

        if (!map.containsKey("id") && !map.containsKey("feedback")) {
            return Result.error(ResultCode.PARAM_ERROR);
        }

        Apply apply = new Apply();
        apply.setApplyId(Long.valueOf(map.get("applyId")));
        apply.setFeedback(map.get("feedback"));
        apply.setStatus(-1);

        int status = iProjectApplyService.updateApply(apply);
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
    @GetMapping("/details")
    public Result details(@RequestParam Long id) {
        Apply apply = iProjectApplyService.selectDetails(id);
        return Result.ok().put(apply);
    }

    /**
     * 根据iD获取信息
     *
     * @param id id
     * @return Result
     */
    @ApiOperation(value = "查看详情")
    @GetMapping("/info")
    public Result info(@RequestParam Long id) {
        Apply apply = iProjectApplyService.selectApplyById(id);
        return Result.ok().put(apply);
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
        int status = iProjectApplyService.deleteApply(id);
        if (status > 0) {
            return Result.ok("删除成功");
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
//    @RequiresPermissions(value = {"system:apply:export"})
    public Result exportExcel(HttpServletRequest request, HttpServletResponse response, @RequestBody Map<String, Object> map) throws Exception {
        HashMap<String, Object> params = new HashMap<>();

        if (map.containsKey("talentId")) {
            params.put("talentId", map.get("talentId"));
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

        List<Apply> resultList = iProjectApplyService.selectExcelList(params);
        EasyExcel.write(saveFile, Apply.class)
                .includeColumnFieldNames(propsName)
                .sheet("报名申请信息")
                .doWrite(resultList);

        return Result.ok().put(filePath);
    }


}
