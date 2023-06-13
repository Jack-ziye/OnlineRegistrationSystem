package com.code.controller.web;


import com.alibaba.fastjson2.JSON;
import com.code.common.logAop.LogAnnotation;
import com.code.entity.pf.Apply;
import com.code.entity.pf.Category;
import com.code.entity.pf.Project;
import com.code.entity.pf.Talent;
import com.code.entity.system.SysUser;
import com.code.service.pf.IApplyService;
import com.code.service.pf.ICategoryService;
import com.code.service.pf.IProjectService;
import com.code.service.pf.ITalentService;
import com.code.utils.*;
import com.code.vo.ProjectTalentParam;
import com.code.vo.UpdatePwdParam;
import com.github.pagehelper.PageInfo;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
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
@Api(tags = "前台用户管理接口")
@RequestMapping("/talent/current")
public class TalentProfileController {

    @Resource
    private IApplyService iApplyService;

    @Resource
    private ITalentService iTalentService;

    @Resource
    private ThreadService threadService;


    /**
     * 更新人才信息
     *
     * @param talent 人才
     * @return Result
     */
    @ApiOperation(value = "更新人才信息")
    @PostMapping("/update")
    @LogAnnotation(module = "前台用户管理接口", operator = "更新人才信息")
    public Result updateTalent(@RequestBody Talent talent) {
        int status = iTalentService.updateTalent(talent);
        if (status > 0) {
            return Result.ok("更新成功");
        } else {
            return Result.error(ResultCode.UPDATE_ERROR);
        }
    }

    /**
     * 修改密码
     *
     * @param param updatePwdParam
     * @return Result
     */
    @ApiOperation(value = "修改密码")
    @PostMapping("/update/password")
    @LogAnnotation(module = "人才前台管理接口", operator = "修改密码")
    public Result updateUserPassword(@RequestBody UpdatePwdParam param) {

        // 确认密码比较
        if (!param.getPassword().equals(param.getValidPassword())) {
            return Result.error(ResultCode.PASSWORD_INPUT_NO_EQUAL);
        }

        String password = TalentThreadLocal.get().getPassword();
        // 输入旧密码加密比较
        param.setOldPassword(Md5Utils.encrypt(param.getOldPassword()));
        if (!password.equals(param.getOldPassword())) {
            return Result.error(ResultCode.PASSWORD_NO_EQUAL);
        }

        param.setPassword(Md5Utils.encrypt(param.getPassword()));
        Talent talent = JSON.parseObject(JSON.toJSONString(param), Talent.class);
        int status = iTalentService.updateTalent(talent);
        if (status == 0) {
            return Result.error(ResultCode.UPDATE_ERROR);
        }
        return Result.ok("修改成功");
    }


    /**
     * 获取当前用户报名申请
     *
     * @return Result
     */
    @ApiOperation(value = "获取当前用户报名申请")
    @PostMapping("/apply/list")
    @LogAnnotation(module = "前台用户管理接口", operator = "获取当前用户报名申请")
    public Result selectCurrentApply(@RequestBody(required = false) Map<String, String> map) {

        int pageNum = 1;//默认从第一页查询
        int pageSize = 10;//默认每页展示10条

        if (map.containsKey("pageNum")) {
            pageNum = Integer.parseInt(map.get("pageNum"));
        }
        if (map.containsKey("pageSize")) {
            pageSize = Integer.parseInt(map.get("pageSize"));
        }

        HashMap<String, Object> params = new HashMap<String, Object>();
        Talent talent = TalentThreadLocal.get();
        params.put("talentId", talent.getTalentId());
        if (map.containsKey("projectName")) {
            params.put("projectName", map.get("projectName"));
        }
        if (map.containsKey("status")) {
            params.put("status", map.get("status"));
        }
        PageInfo<Apply> pages = iApplyService.selectPageList(params, pageNum, pageSize);
        return Result.ok().putPage(pages);
    }


    /**
     * 提交报名申请
     *
     * @return Result
     */
    @ApiOperation(value = "提交报名申请")
    @GetMapping("/apply/add")
    @LogAnnotation(module = "前台管理接口", operator = "提交报名申请")
    public Result applyInsert(@RequestParam(value = "id") Long projectId) {
        // 查询申请判断是否已提交
        Talent talent = TalentThreadLocal.get();
        Apply res = iApplyService.selectByProjectIdAndTalentId(projectId, talent.getTalentId());
        if (res != null) {
            Result.ok("您已提交过申请，可以在个人中心中查看");
        }

        // 添加申请
        Apply apply = new Apply();
        apply.setProjectId(projectId);
        apply.setTalentId(talent.getTalentId());
        int status = iApplyService.insertApply(apply);
        if (status == 0) {
            Result.error("提交失败");
        }

        // 推送通知
        threadService.pushInform(projectId, talent);
        return Result.error("");
    }


    /**
     * 查看详情
     *
     * @return Result
     */
    @ApiOperation(value = "查看详情")
    @GetMapping("/apply/details")
    @LogAnnotation(module = "前台用户管理接口", operator = "查看详情")
    public Result selectApplyById(@RequestParam(value = "id") Long applyId) {

        Apply apply = iApplyService.selectDetails(applyId);
        return Result.ok().put(apply);

    }

    /**
     * 当前用户根据项目id获取报名申请
     *
     * @return Result
     */
    @ApiOperation(value = "当前用户根据项目id获取报名申请")
    @GetMapping("/apply/info")
    @LogAnnotation(module = "前台用户管理接口", operator = "当前用户根据项目id获取报名申请")
    public Result selectApplyByProjectId(@RequestParam(value = "id") Long projectId) {
        Talent talent = TalentThreadLocal.get();
        Apply apply = iApplyService.selectByProjectIdAndTalentId(projectId, talent.getTalentId());
        return Result.ok().put(apply);

    }

}
