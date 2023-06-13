package com.code.entity.system;

import java.util.ArrayList;
import java.util.Date;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@Table(name = "`sys_menu`")
@ApiModel(value="CurrentMenu对象", description="")
public class Menu {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "`id`")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long menuId;

    @ApiModelProperty(value = "父级菜单ID")
    @Column(name = "parent")
    private Long parent;

    @ApiModelProperty(value = "菜单类型")
    @Column(name = "type")
    private Integer menuType;

    @ApiModelProperty(value = "菜单名称")
    @Column(name = "`name`")
    private String menuName;

    @ApiModelProperty(value = "菜单图标")
    @Column(name = "icon")
    private String menuIcon;

    @ApiModelProperty(value = "路由地址")
    @Column(name = "path")
    private String menuPath;

    @ApiModelProperty(value = "权限标识")
    @Column(name = "code")
    private String menuCode;

    @ApiModelProperty(value = "显示顺序")
    @Column(name = "order_Index")
    private Integer orderIndex;

    @ApiModelProperty(value = "菜单状态")
    @Column(name = "`status`")
    private Integer status;

    @ApiModelProperty(value = "菜单显示")
    @Column(name = "`show`")
    private Integer show;

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

    @ApiModelProperty(value = "子菜单")
    @OneToMany(mappedBy = "menu")
    private ArrayList<Menu> children;

    @ApiModelProperty(value = "状态名称")
    @Transient
    private String statusName;

    @ApiModelProperty(value = "显示名称")
    @Transient
    private String showName;

}


