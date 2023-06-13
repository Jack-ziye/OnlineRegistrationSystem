package com.code.vo;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class LoginParam {

    @ApiModelProperty(value = "用户名")
    @NotBlank(message = "请填写用户名")
    private String username;

    @ApiModelProperty(value = "密码")
    @NotBlank(message = "请填写密码")
    private String password;

}
