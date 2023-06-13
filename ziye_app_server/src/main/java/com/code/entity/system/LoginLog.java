package com.code.entity.system;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.alibaba.excel.annotation.ExcelProperty;
import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;


@Data
@Table(name = "`user_login`")
@ApiModel(value="UserLogin对象", description="登录日志对象")
public class LoginLog implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "`id`")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ApiModelProperty(value = "用户ID")
    @Column(name = "user_id")
    @ExcelProperty("用户ID")
    private Long userId;

    @ApiModelProperty(value = "登录地址")
    @Column(name = "address")
    @ExcelProperty("登录地址")
    private String address;

    @ApiModelProperty(value = "登录地点")
    @Column(name = "place")
    @ExcelProperty("登录地点")
    private String place;

    @ApiModelProperty(value = "浏览器")
    @Column(name = "browser")
    @ExcelProperty("浏览器")
    private String browser;

    @ApiModelProperty(value = "操作系统")
    @Column(name = "system")
    @ExcelProperty("操作系统")
    private String system;

    @ApiModelProperty(value = "登录状态")
    @Column(name = "status")
    private Integer status;

    @ApiModelProperty(value = "登录时间")
    @Column(name = "login_time")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    @ExcelProperty("登录时间")
    private Date loginTime;

    @ApiModelProperty(value = "用户名称")
    @Transient
    @ExcelProperty("用户名称")
    private String username;

    @ApiModelProperty(value = "状态名称")
    @Transient
    @ExcelProperty("状态名称")
    private String statusName;

}
