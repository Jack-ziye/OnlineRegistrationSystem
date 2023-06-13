package com.code.controller.monitor;

import com.code.utils.RedisUtil;
import com.code.utils.Result;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

@RestController
@Api(tags = "在线用户管理接口")
@RequestMapping("/monitor/cache")
public class CacheController {

    @Resource
    private RedisUtil redisUtil;

    /**
     * 获取缓存列表
     *
     * @return Result
     */
    @ApiOperation(value = "获取在线用户列表")
    @PostMapping
    public Result getServer(@RequestBody Map<String, String> map) {
        List<String> keys = redisUtil.scan("*");

        return Result.ok().put(keys);
    }

}
