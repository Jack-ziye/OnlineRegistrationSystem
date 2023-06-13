package com.code.entity.system;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Table;
import java.util.List;

@Data
@ApiModel(value = "Index对象", description = "首页对象")
public class Index {

    @ApiModelProperty(value = "项目总数")
    private Integer projectTotal;

    @ApiModelProperty(value = "人才总数")
    private Integer talentTotal;

    @ApiModelProperty(value = "总提交数")
    private Integer applyTotal;

    @ApiModelProperty(value = "今日提交申请数")
    private Integer todayApplyTotal;

    @ApiModelProperty(value = "近7天提交数")
    private String recentlyApply;

    @ApiModelProperty(value = "未审核")
    private String unaudited;

    @ApiModelProperty(value = "通过")
    private String applyPass;

    @ApiModelProperty(value = "未通过")
    private String applyNotPass;

}
