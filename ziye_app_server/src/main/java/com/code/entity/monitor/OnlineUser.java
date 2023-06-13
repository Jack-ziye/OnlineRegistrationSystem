package com.code.entity.monitor;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.Date;

@Data
@ApiModel(value="OnlineUser对象", description="在线用户对象")
public class OnlineUser {

    @ApiModelProperty(value = "用户ID")
    private Long userId;

    @ApiModelProperty(value = "token")
    private String token;

    @ApiModelProperty(value = "登录地址")
    private String address;

    @ApiModelProperty(value = "登录地点")
    private String place;

    @ApiModelProperty(value = "浏览器")
    private String browser;

    @ApiModelProperty(value = "操作系统")
    private String system;

    @ApiModelProperty(value = "状态")
    private String statusName;

    @ApiModelProperty(value = "登录时间")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private Date loginTime;

    @ApiModelProperty(value = "用户名称")
    private String username;

}
