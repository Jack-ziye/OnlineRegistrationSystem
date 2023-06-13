package com.code.vo;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Data
@Table(name = "`sys_menu`")
@ApiModel(value="Menu对象", description="")
public class MenuParam {

    @Id
    @Column(name = "`id`")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long menuId;

    @ApiModelProperty(value = "父级菜单ID")
    private Long parent;

    @ApiModelProperty(value = "菜单名称")
    @NotBlank(message = "请填写菜单名称")
    private String menuName;

    @ApiModelProperty(value = "菜单图标")
    @NotBlank(message = "请填写菜单图标")
    private String menuIcon;

    @ApiModelProperty(value = "显示顺序")
    private Integer orderIndex;

    @ApiModelProperty(value = "路由地址")
    @NotBlank(message = "请填写路由地址")
    private String menuPath;

    @ApiModelProperty(value = "菜单状态")
    @Column(name = "status")
    private Integer status;

    @ApiModelProperty(value = "备注")
    @Column(name = "remark")
    private String remark;


}
