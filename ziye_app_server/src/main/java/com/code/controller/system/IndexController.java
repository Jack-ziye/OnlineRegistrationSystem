package com.code.controller.system;

import com.code.common.logAop.LogAnnotation;
import com.code.entity.system.Index;
import com.code.service.system.IIndexService;
import com.code.utils.Result;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

@RestController
@Api(tags = "首页管理接口")
@RequestMapping("/index")
public class IndexController {


    @Resource
    private IIndexService iIndexService;

    /**
     * 获取首页数据
     *
     * @return Result
     */
    @ApiOperation(value = "查询列表")
    @GetMapping("/data")
    @LogAnnotation(module = "首页管理接口", operator = "获取首页数据")
    public Result selectData() {
        Index data = iIndexService.selectData();
        System.out.println("========================================");
        System.out.println(data);
        System.out.println("========================================");
        return Result.ok().put(data);
    }



}

