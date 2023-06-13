package com.code.vo;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class ResetPwdParam {

    @ApiModelProperty(value = "id")
    private Long userId;

    @ApiModelProperty(value = "密码")
    @NotBlank(message = "请填写密码")
    private String password;

    @ApiModelProperty(value = "密码")
    @NotBlank(message = "请填写密码")
    private String validPassword;

}
