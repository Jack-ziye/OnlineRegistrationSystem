package com.code.entity.system;

import com.alibaba.excel.annotation.ExcelProperty;
import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Data
@Table(name = "`sys_notice`")
@ApiModel(value="notice对象", description="通知公告对象")
public class Notice {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "`id`")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long noticeId;

    @ApiModelProperty(value = "标题")
    @Column(name = "`title`")
    private String title;

    @ApiModelProperty(value = "内容")
    @Column(name = "`content`")
    private String content;

    @ApiModelProperty(value = "类型")
    @Column(name = "type")
    private Integer noticeType;

    @ApiModelProperty(value = "类型名称")
    @Transient
    private String typeName;

    @ApiModelProperty(value = "状态")
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
