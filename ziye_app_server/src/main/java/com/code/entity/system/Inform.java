package com.code.entity.system;

import com.alibaba.excel.annotation.ExcelProperty;
import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Data
@Table(name = "`sys_inform`")
@ApiModel(value="inform对象", description="推送通知对象")
public class Inform {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "`id`")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long informId;

    @ApiModelProperty(value = "通知id")
    @Column(name = "`notice_id`")
    private Long noticeId;

    @ApiModelProperty(value = "用户id")
    @Column(name = "`user_id`")
    private Long userId;

    @ApiModelProperty(value = "是否已读")
    @Column(name = "`is_read`")
    private Integer isRead;

    @ApiModelProperty(value = "创建时间")
    @Column(name = "create_time")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private Date createTime;

    @ApiModelProperty(value = "状态名称")
    @ExcelProperty("状态名称")
    @Transient
    private String readName;

    @ApiModelProperty(value = "类型名称")
    @Transient
    private String noticeTypeName;

    @ApiModelProperty(value = "标题")
    @Transient
    private String noticeTitle;

    @ApiModelProperty(value = "内容")
    @Transient
    private String noticeContent;

}
