package com.code.controller.monitor;

import com.code.service.monitor.IServerService;
import com.code.utils.Result;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.HashMap;


/**
 * <p>
 * Controller
 * </p>
 *
 * @author ziye
 * @since 2022-12-13
 */
@RestController
@Api(tags = "服务监控管理接口")
@RequestMapping("/monitor/server")
public class ServerController {

    @Resource
    private IServerService iServerService;

    /**
     * 获取服务信息
     *
     * @return Result
     */
    @ApiOperation(value = "获取服务信息")
    @GetMapping
    public Result getServer() {
        HashMap<String, Object> serverInfo = iServerService.getServerInfo();
        return Result.ok().put(serverInfo);
    }

}
