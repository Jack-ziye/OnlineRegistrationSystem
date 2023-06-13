package com.code.entity.system;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.persistence.*;

@Data
@Table(name = "`role_menu`")
@ApiModel(value="RoleMenu对象", description="菜单权限")
public class RoleMenu {

    @Id
    @Column(name = "`id`")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ApiModelProperty(value = "角色ID")
    @Column(name = "role_id")
    private Long roleId;

    @ApiModelProperty(value = "菜单ID")
    @Column(name = "menu_id")
    private Long menuId;

}
