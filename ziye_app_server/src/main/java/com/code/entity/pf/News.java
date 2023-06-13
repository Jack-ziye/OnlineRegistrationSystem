package com.code.entity.pf;

import com.alibaba.excel.annotation.ExcelProperty;
import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Data
@Table(name = "`pf_news`")
@ApiModel(value="news对象", description="新闻对象")
public class News {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "`id`")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long newsId;

    @ApiModelProperty(value = "封面地址")
    @Column(name = "cover")
    private String cover;

    @ApiModelProperty(value = "新闻名称")
    @Column(name = "`title`")
    private String title;

    @ApiModelProperty(value = "副标题")
    @Column(name = "`subtitle`")
    private String subtitle;

    @ApiModelProperty(value = "新闻名称")
    @Column(name = "`content`")
    private String content;

    @ApiModelProperty(value = "阅读数")
    @Column(name = "reads")
    private Long reads;

    @ApiModelProperty(value = "新闻状态")
    @Column(name = "`status`")
    private Integer status;

    @ApiModelProperty(value = "置顶")
    @Column(name = "`is_top`")
    private Integer isTop;

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
