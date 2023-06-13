package com.code.entity.pf;

import com.alibaba.excel.annotation.ExcelProperty;
import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import org.apache.ibatis.annotations.Many;

import javax.persistence.*;
import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@Table(name = "`pf_project`")
@ApiModel(value="project对象", description="")
public class Project {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "`id`")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @ExcelProperty("ID")
    private Long projectId;

    @ApiModelProperty(value = "类别ID")
    @Column(name = "category_id")
    private Long categoryId;

    @ApiModelProperty(value = "封面地址")
    @Column(name = "cover")
    private String cover;

    @ApiModelProperty(value = "项目名称")
    @Column(name = "`name`")
    @ExcelProperty("项目名称")
    private String projectName;

    @ApiModelProperty(value = "项目内容")
    @Column(name = "`content`")
    private String content;

    @ApiModelProperty(value = "费用")
    @Column(name = "expense")
    private Double expense;

    @ApiModelProperty(value = "名额")
    @Column(name = "`quota`")
    private Integer quota;

    @ApiModelProperty(value = "开始时间")
    @Column(name = "start_time")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    @ExcelProperty("开始时间")
    private Date startTime;

    @ApiModelProperty(value = "结束时间")
    @Column(name = "end_time")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    @ExcelProperty("结束时间")
    private Date endTime;

    @ApiModelProperty(value = "项目状态")
    @Column(name = "`status`")
    private Integer status;

    @ApiModelProperty(value = "置顶")
    @Column(name = "`is_top`")
    private Integer isTop;

    @ApiModelProperty(value = "备注")
    @Column(name = "`remark`")
    private String remark;

    @ApiModelProperty(value = "创建时间")
    @Column(name = "create_time")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    @ExcelProperty("创建时间")
    private Date createTime;

    @ApiModelProperty(value = "创建人")
    @Column(name = "creator")
    private Long creator;

    @ApiModelProperty(value = "最后更新时间")
    @Column(name = "lmt")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private Date lmt;

    @ApiModelProperty(value = "最后修改人")
    @Column(name = "modifier")
    private Long modifier;

    @ApiModelProperty(value = "状态名称")
    @Transient
    private String statusName;

    @ApiModelProperty(value = "状态说明")
    @Transient
    @ExcelProperty("状态")
    private String statusInfo;

    @ApiModelProperty(value = "类别名称")
    @ExcelProperty("类别名称")
    @Transient
    private String categoryName;

    /**
     *
     */

    @ApiModelProperty(value = "剩余时间")
    @Transient
    private Long diffTime;

    @ApiModelProperty(value = "用户名称")
    @Transient
    private String username;

    @ApiModelProperty(value = "剩余名额")
    @Transient
    private Integer diffQuota;

    @ApiModelProperty(value = "报名时间")
    @Transient
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private Date applyTime;

    @ApiModelProperty(value = "报名状态")
    @Transient
    private String applyStatusName;

    @ApiModelProperty(value = "人才列表")
    @Transient
    private ArrayList<Talent> talentList;

}
