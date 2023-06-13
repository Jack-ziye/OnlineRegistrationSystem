package com.code.vo;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class UpdatePwdParam {

    @ApiModelProperty(value = "userId")
    private Long userId;

    @ApiModelProperty(value = "talentId")
    private Long talentId;

    @ApiModelProperty(value = "旧密码")
    @NotBlank(message = "请填写旧密码")
    private String oldPassword;

    @ApiModelProperty(value = "密码")
    @NotBlank(message = "请填写密码")
    private String password;

    @ApiModelProperty(value = "密码")
    @NotBlank(message = "请填写密码")
    private String validPassword;

}
