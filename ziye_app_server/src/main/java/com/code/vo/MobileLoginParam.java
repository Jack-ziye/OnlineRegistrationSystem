package com.code.vo;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class MobileLoginParam {

    @ApiModelProperty(value = "手机号")
    @NotBlank(message = "请输入手机号")
    private String mobile;

    @ApiModelProperty(value = "验证码")
    @NotBlank(message = "请输入验证码")
    private String code;

}
