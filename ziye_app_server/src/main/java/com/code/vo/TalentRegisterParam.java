package com.code.vo;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Data
public class TalentRegisterParam {

    @ApiModelProperty(value = "id")
    private Long talentId;

    @ApiModelProperty(value = "用户名")
    @NotBlank(message = "请填写用户名")
    private String talentName;

    @ApiModelProperty(value = "密码")
    @NotBlank(message = "请填写密码")
    private String password;

    @ApiModelProperty(value = "邮箱")
    @Email(message = "请填写正确的邮箱")
    private String email;

    @ApiModelProperty(value = "手机号")
    @NotBlank(message = "请填写手机号")
    private String mobile;

    @ApiModelProperty(value = "状态")
    private String code;

}
