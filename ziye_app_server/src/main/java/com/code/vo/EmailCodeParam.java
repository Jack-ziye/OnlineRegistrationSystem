package com.code.vo;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Data
public class EmailCodeParam {

    @ApiModelProperty(value = "邮箱")
    @NotBlank(message = "请填写邮箱")
    @Email(message = "请填写正确的邮箱")
    private String email;

}
