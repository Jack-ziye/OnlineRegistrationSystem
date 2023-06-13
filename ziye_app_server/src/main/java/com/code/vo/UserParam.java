package com.code.vo;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Data
public class UserParam {

    @ApiModelProperty(value = "id")
    private Long userId;

    @ApiModelProperty(value = "头像")
    private String avatar;

    @ApiModelProperty(value = "用户名")
    @NotBlank(message = "请填写用户名")
    private String username;

    @ApiModelProperty(value = "密码")
    @NotBlank(message = "请填写密码")
    private String password;

    @ApiModelProperty(value = "昵称")
    @NotBlank(message = "请填写昵称")
    private String nickName;

    @ApiModelProperty(value = "邮箱")
    @Email(message = "请填写正确的邮箱")
    private String email;

    @ApiModelProperty(value = "手机号")
    private String mobile;

    @ApiModelProperty(value = "状态")
    private Integer status;

}
