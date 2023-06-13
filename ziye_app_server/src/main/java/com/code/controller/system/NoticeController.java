package com.code.controller.system;

import com.code.common.logAop.LogAnnotation;
import com.code.entity.system.Inform;
import com.code.entity.system.Notice;
import com.code.entity.system.NoticeUser;
import com.code.service.system.IInformService;
import com.code.service.system.INoticeService;
import com.code.utils.Result;
import com.code.utils.ResultCode;
import com.code.vo.PushInformParam;
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
@Api(tags = "通知公告管理接口")
@RequestMapping("/notice")
public class NoticeController {

    @Resource
    private INoticeService iNoticeService;

    @Resource
    private IInformService iInformService;

    private static final Logger LOGGER = LoggerFactory.getLogger(NoticeController.class);

    /**
     * 查询列表
     *
     * @param response response
     * @param map      map
     * @return Result
     */
    @ApiOperation(value = "查询列表", notes = "{\"pageNum\": 1,\"pageSize\": 10}")
    @PostMapping("/list")
    @LogAnnotation(module = "通知公告管理接口", operator = "获取通知公告列表")
    public Result noticeList(HttpServletResponse response, @RequestBody(required = false) Map<String, String> map) {
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

            if (map.containsKey("title")) {
                params.put("title", map.get("title"));
            }
            if (map.containsKey("noticeType")) {
                params.put("noticeType", map.get("noticeType"));
            }
            if (map.containsKey("creatTimeFrom") && map.containsKey("creatTimeTo")) {
                params.put("creatTimeFrom", map.get("creatTimeFrom"));
                params.put("creatTimeTo", map.get("creatTimeTo"));
            }

            PageInfo<Notice> pages = iNoticeService.selectPageList(params, pageNum, pageSize);
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
    @LogAnnotation(module = "通知公告管理接口", operator = "新增数据")
    public Result insert(@RequestBody Notice notice) {
        int status = iNoticeService.insertNotice(notice);
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
    public Result update(@RequestBody Notice notice) {
        int status = iNoticeService.updateNotice(notice);
        if (status > 0) {
            return Result.ok("更新成功");
        } else {
            return Result.error(ResultCode.UPDATE_ERROR);
        }
    }

    /**
     * 通知公告状态变更
     *
     * @param Id Id
     * @return Result
     */
    @ApiOperation(value = "通知公告状态变更")
    @GetMapping("/update/status")
    @LogAnnotation(module = "通知公告管理接口", operator = "通知公告状态变更")
    public Result updateStatus(@RequestParam(value = "id") Long Id) {
        int status = iNoticeService.updateStatus(Id);
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
        Notice notice = iNoticeService.selectNoticeById(id);
        return Result.ok().put(notice);
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
        int status = iNoticeService.deleteNotice(id);
        if (status > 0) {
            return Result.ok("删除成功");
        } else {
            return Result.error(ResultCode.DELETE_ERROR);
        }
    }


    /**
     * 获取用户列表
     *
     * @param response response
     * @param map      map
     * @return Result
     */
    @ApiOperation(value = "查询列表", notes = "{\"pageNum\": 1,\"pageSize\": 10}")
    @PostMapping("/user/list")
    @LogAnnotation(module = "通知公告管理接口", operator = "获取用户列表")
    public Result userList(HttpServletResponse response, @RequestBody(required = false) Map<String, String> map) {
        response.setCharacterEncoding("utf-8");

        int pageNum = 1;//默认从第一页查询
        int pageSize = 20;//默认每页展示10条
        try {
            if (map.containsKey("pageNum")) {
                pageNum = Integer.parseInt(map.get("pageNum"));
            }
            if (map.containsKey("pageSize")) {
                pageSize = Integer.parseInt(map.get("pageSize"));
            }

            HashMap<String, Object> params = new HashMap<>();
            params.put("noticeId", map.get("noticeId"));
            if (map.containsKey("username")) {
                params.put("username", map.get("username"));
            }
            if (map.containsKey("isPush")) {
                params.put("isPush", map.get("isPush"));
            }
            if (map.containsKey("creatTimeFrom") && map.containsKey("creatTimeTo")) {
                params.put("creatTimeFrom", map.get("creatTimeFrom"));
                params.put("creatTimeTo", map.get("creatTimeTo"));
            }

            PageInfo<NoticeUser> pages = iNoticeService.selectPageListUser(params, pageNum, pageSize);
            return Result.ok().putPage(pages);

        } catch (Exception e) {
            LOGGER.error(e.toString());
            return Result.error(e.getMessage());
        }

    }


}
