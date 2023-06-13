package com.code.controller.system;

import com.code.common.logAop.LogAnnotation;
import com.code.entity.system.Inform;
import com.code.entity.system.Notice;
import com.code.entity.system.NoticeUser;
import com.code.entity.system.SysUser;
import com.code.service.system.IInformService;
import com.code.service.system.INoticeService;
import com.code.utils.Result;
import com.code.utils.ResultCode;
import com.code.utils.UserThreadLocal;
import com.code.vo.PushInformParam;
import com.github.pagehelper.PageInfo;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

/**
 * <p>
 * Controller
 * </p>
 *
 * @author ziye
 * @since 2022-10-30
 */
@RestController
@Api(tags = "推送通知管理接口")
@RequestMapping("/inform")
public class InformController {

    @Resource
    private IInformService iInformService;

    @Resource
    private INoticeService iNoticeService;

    private static final Logger LOGGER = LoggerFactory.getLogger(NoticeController.class);

    /**
     * 查询列表
     *
     * @param map      map
     * @return Result
     */
    @ApiOperation(value = "查询列表")
    @PostMapping("/list")
    @LogAnnotation(module = "推送通知管理接口", operator = "获取推送通知列表")
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

            if (map.containsKey("noticeId")) {
                params.put("noticeId", map.get("noticeId"));
            }
            if (map.containsKey("userId")) {
                params.put("userId", map.get("userId"));
            }
            if (map.containsKey("isRead")) {
                params.put("isRead", map.get("isRead"));
            }
            if (map.containsKey("noticeType")) {
                params.put("noticeType", map.get("noticeType"));
            }
            if (map.containsKey("creatTimeFrom") && map.containsKey("creatTimeTo")) {
                params.put("creatTimeFrom", map.get("creatTimeFrom"));
                params.put("creatTimeTo", map.get("creatTimeTo"));
            }

            PageInfo<Inform> pages = iInformService.selectPageList(params, pageNum, pageSize);
            return Result.ok().putPage(pages);

        } catch (Exception e) {
            LOGGER.error(e.toString());
            return Result.error(e.getMessage());
        }
    }

    /**
     * 获取当前推送消息
     *
     * @param map map
     * @return Result
     */
    @ApiOperation(value = "获取当前推送消息")
    @PostMapping("/list/current")
    @LogAnnotation(module = "推送通知管理接口", operator = "获取当前推送消息")
    public Result userCurrentList(@RequestBody(required = false) Map<String, String> map) {
        SysUser sysUser = UserThreadLocal.get();
        HashMap<String, Object> params = new HashMap<>();
        params.put("userId", sysUser.getUserId());
        if (map.containsKey("isRead")) {
            params.put("isRead", 0);
        }
        if (map.containsKey("noticeType")) {
            params.put("noticeType", map.get("noticeType"));
        }

        PageInfo<Inform> pages = iInformService.selectPageList(params, 1,10);
        return Result.ok().putPage(pages);
    }

    /**
     * 新增数据
     *
     * @param inform Inform
     * @return Result
     */
    @ApiOperation(value = "新增数据")
    @PostMapping("/insert")
    @LogAnnotation(module = "推送通知管理接口", operator = "新增数据")
    public Result insert(@RequestBody Inform inform) {
        int status = iInformService.insertInform(inform);
        if (status > 0) {
            return Result.ok("添加成功");
        } else {
            return Result.error(ResultCode.ADD_ERROR);
        }
    }

    /**
     * 修改数据
     *
     * @param inform Inform
     * @return Result
     */
    @ApiOperation(value = "修改数据")
    @PostMapping("/update")
    public Result update(@RequestBody Inform inform) {
        int status = iInformService.updateInform(inform);
        if (status > 0) {
            return Result.ok("推送成功");
        } else {
            return Result.error(ResultCode.UPDATE_ERROR);
        }
    }

    /**
     * 推送通知已读变更
     *
     * @param id id
     * @return Result
     */
    @ApiOperation(value = "推送通知已读变更")
    @GetMapping("/update/read")
    @LogAnnotation(module = "推送通知管理接口", operator = "推送通知已读变更")
    public Result updateStatus(@RequestParam(value = "id") Long id, @RequestParam(value = "isRead") Integer isRead) {
        int status = iInformService.updateReadStatus(id, isRead);
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
        Inform inform  = iInformService.selectInformById(id);
        return Result.ok().put(inform);
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
        int status = iInformService.deleteInform(id);
        if (status > 0) {
            return Result.ok("取消成功");
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
//    @RequiresPermissions(value = {"system:user:delete"})
    @PostMapping("/deleteBatch")
    public Result deleteBatch(@RequestParam List<Long> ids) {

        int status = iInformService.deleteBatch(ids);
        if (status > 0) {
            return Result.ok("ok");
        } else {
            return Result.error(ResultCode.DELETE_ERROR);
        }
    }

    /**
     * 推送消息
     *
     * @param param PushInformParam
     * @return Result
     */
    @ApiOperation(value = "推送消息")
    @PostMapping("/push")
    @LogAnnotation(module = "推送通知管理接口", operator = "推送消息")
    public Result push(@RequestBody PushInformParam param) {
        Long noticeId = param.getNoticeId();

        // 获取已推送的用户列表
        List<NoticeUser> noticeUsers = iNoticeService.selectListUserByNoticeId(noticeId);
        // 获取当前
        List<Long> userList = param.getUserList();
        // 过滤掉已推送的用户列表
        userList.removeIf(userId -> noticeUsers.removeIf(noticeUser -> noticeUser.getUserId().equals(userId)));

        // 推送
        for (Long userId : userList) {
            Inform inform = new Inform();
            inform.setNoticeId(noticeId);
            inform.setUserId(userId);
            iInformService.insertInform(inform);
        }

        return Result.ok("推送成功");
    }


    /**
     * 取消推送消息
     *
     * @param param PushInformParam
     * @return Result
     */
    @ApiOperation(value = "取消推送消息")
    @PostMapping("/cancel-push")
    @LogAnnotation(module = "推送通知管理接口", operator = "取消推送消息")
    public Result cancelPush(@RequestBody PushInformParam param) {
        Long noticeId = param.getNoticeId();

        for (Long userId : param.getUserList()) {
            iInformService.deleteInformByNoticeIdAndUserId(noticeId,userId);
        }

        return Result.ok("推送成功");
    }


}
