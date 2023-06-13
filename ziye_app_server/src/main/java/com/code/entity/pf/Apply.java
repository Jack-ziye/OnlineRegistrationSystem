package com.code.entity.pf;

import com.alibaba.excel.annotation.ExcelProperty;
import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Data
@Table(name = "`pf_apply`")
@ApiModel(value="apply对象", description="")
public class Apply {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "`id`")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @ExcelProperty("ID")
    private Long applyId;

    @ApiModelProperty(value = "类别名称")
    @Transient
    @ExcelProperty("栏目名称")
    private String categoryName;

    @ApiModelProperty(value = "项目id")
    @Column(name = "`project_id`")
    private Long projectId;

    @ApiModelProperty(value = "项目名称")
    @Transient
    @ExcelProperty("项目名称")
    private String projectName;

    @ApiModelProperty(value = "人才id")
    @Column(name = "talent_id")
    private Long talentId;

    @ApiModelProperty(value = "人才名称")
    @Transient
    @ExcelProperty("人才名称")
    private String talentName;

    @ApiModelProperty(value = "状态")
    @Column(name = "`status`")
    private Integer status;

    @ApiModelProperty(value = "状态名称")
    @ExcelProperty("状态名称")
    @Transient
    private String statusName;

    @ApiModelProperty(value = "反馈信息")
    @Column(name = "feedback")
    @ExcelProperty("反馈信息")
    private String feedback;

    @ApiModelProperty(value = "置顶")
    @Column(name = "`is_top`")
    private Integer isTop;

    @ApiModelProperty(value = "创建时间")
    @Column(name = "create_time")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    @ExcelProperty("报名时间")
    private Date createTime;

    @ApiModelProperty(value = "最后更新时间")
    @Column(name = "lmt")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private Date lmt;





    @ApiModelProperty(value = "项目")
    @Transient
    private Project project;

    @ApiModelProperty(value = "人才")
    @Transient
    private Talent talent;

}
