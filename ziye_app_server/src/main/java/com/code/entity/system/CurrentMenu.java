package com.code.entity.system;

import java.util.List;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;


@Data
@Table(name = "`sys_menu`")
@ApiModel(value="Menu对象", description="")
public class CurrentMenu {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "`id`")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonIgnore
    private Long menuId;

    @ApiModelProperty(value = "父级菜单ID")
    @Column(name = "parent")
    @JsonIgnore
    private Long parent;

    @ApiModelProperty(value = "菜单名称")
    @Column(name = "name")
    private String label;

    @ApiModelProperty(value = "路由地址")
    @Column(name = "path")
    private String path;

    @ApiModelProperty(value = "菜单图标")
    @Column(name = "icon")
    private String icon;

    @ApiModelProperty(value = "子菜单")
    @OneToMany
    private List<CurrentMenu> children;



}
