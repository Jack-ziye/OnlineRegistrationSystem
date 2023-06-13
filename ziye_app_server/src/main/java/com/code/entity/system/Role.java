package com.code.entity.system;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.*;

import com.alibaba.excel.annotation.ExcelProperty;
import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@Table(name = "`sys_role`")
@ApiModel(value="Role对象", description="")
public class Role implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "`id`")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @ExcelProperty("ID")
    private Long roleId;

    @ApiModelProperty(value = "角色名称")
    @Column(name = "name")
    @ExcelProperty("角色名称")
    private String roleName;

    @ApiModelProperty(value = "权限标识")
    @Column(name = "code")
    @ExcelProperty("权限标识")
    private String roleCode;

    @ApiModelProperty(value = "显示顺序")
    @Column(name = "order_index")
    private Integer orderIndex;

    @ApiModelProperty(value = "菜单权限")
    private List<Long> roleMenu;

    @ApiModelProperty(value = "备注")
    @Column(name = "remark")
    private String remark;

    @ApiModelProperty(value = "状态")
    @Column(name = "status")
    private Integer status;

    @ApiModelProperty(value = "创建时间")
    @Column(name = "create_time")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    @ExcelProperty("创建时间")
    private Date createTime;

    @ApiModelProperty(value = "角色创建人")
    @Column(name = "create_user")
    private Long createUser;

    @ApiModelProperty(value = "更新时间")
    @Column(name = "update_time")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private Date updateTime;

    @ApiModelProperty(value = "状态名称")
    @Transient
    @ExcelProperty("状态")
    private String statusName;

}
