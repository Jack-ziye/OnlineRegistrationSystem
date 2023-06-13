package com.code.vo;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class ProjectTalentParam {

    @ApiModelProperty(value = "项目id")
    @NotBlank(message = "请填写项目id")
    private Long projectId;

    @ApiModelProperty(value = "人才id")
    @NotBlank(message = "请填写人才id")
    private Long talentId;

}
