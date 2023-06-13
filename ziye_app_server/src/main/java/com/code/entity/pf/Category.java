package com.code.entity.pf;

import com.alibaba.excel.annotation.ExcelProperty;
import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Data
@Table(name = "`pf_category`")
@ApiModel(value="new对象", description="")
public class Category {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "`id`")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long categoryId;

    @ApiModelProperty(value = "类别名称")
    @Column(name = "`name`")
    private String categoryName;

    @ApiModelProperty(value = "类别名称")
    @Column(name = "`remark`")
    private String remark;

    @ApiModelProperty(value = "显示顺序")
    @Column(name = "order_Index")
    private Integer orderIndex;

    @ApiModelProperty(value = "类别状态")
    @Column(name = "`status`")
    private Integer status;

    @ApiModelProperty(value = "创建时间")
    @Column(name = "create_time")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
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
    @ExcelProperty("状态名称")
    @Transient
    private String statusName;

}
