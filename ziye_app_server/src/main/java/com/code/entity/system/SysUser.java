package com.code.entity.system;

import com.alibaba.excel.annotation.ExcelProperty;
import com.alibaba.fastjson2.annotation.JSONField;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Data
@Table(name = "`sys_user`")
@ApiModel(value = "User对象", description = "用户表")
public class SysUser {

    @ApiModelProperty(value = "id")
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @ExcelProperty("ID")
    private Long userId;

    @ApiModelProperty(value = "用户头像")
    @Column(name = "avatar")
    @ExcelProperty("用户头像")
    private String avatar;

    @ApiModelProperty(value = "用户名称")
    @Column(name = "username")
    private String username;

    @ApiModelProperty(value = "密码")
    @Column(name = "password")
    @JSONField(serialize = false)
    private String password;

    @ApiModelProperty(value = "用户昵称")
    @Column(name = "nickname")
    @ExcelProperty("用户昵称")
    private String nickName;

    @ApiModelProperty(value = "手机号")
    @Column(name = "mobile")
    @ExcelProperty("手机号")
    private String mobile;

    @ApiModelProperty(value = "邮箱")
    @Column(name = "email")
    @ExcelProperty("邮箱")
    private String email;

    @ApiModelProperty(value = "用户状态")
    @Column(name = "status")
    private Integer status;

    @ApiModelProperty(value = "创建人")
    @Column(name = "creator")
    private Long creator;

    @ApiModelProperty(value = "创建时间")
    @Column(name = "create_time")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    @ExcelProperty("创建时间")
    private Date createTime;

    @ApiModelProperty(value = "最后修改时间")
    @Column(name = "lmt")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private Date lmt;

    @ApiModelProperty(value = "最后修改人")
    @Column(name = "modifier")
    private Long modifier;

    @ApiModelProperty(value = "角色ID")
    @Transient
    private Long roleId;

    @ApiModelProperty(value = "角色名称")
    @ExcelProperty("角色名称")
    @Transient
    private String roleName;

    @ApiModelProperty(value = "权限标识")
    @ExcelProperty("权限标识")
    @Transient
    private String roleCode;

    @ApiModelProperty(value = "状态名称")
    @ExcelProperty("状态名称")
    @Transient
    private String statusName;


}
