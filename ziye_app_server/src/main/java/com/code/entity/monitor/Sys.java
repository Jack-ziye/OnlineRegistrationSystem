package com.code.entity.monitor;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@ApiModel(value="Sys对象", description="")
public class Sys {

    @ApiModelProperty(value = "服务器名称")
    private String name;

    @ApiModelProperty(value = "已使用")
    private String ip;

    @ApiModelProperty(value = "操作系统")
    private String osName;

    @ApiModelProperty(value = "系统架构")
    private String osArch;

}
