package com.code.entity.system;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.persistence.*;


@Data
@Table(name = "`role_user`")
@ApiModel(value = "RoleUser对象", description = "角色用户")
public class RoleUser {

    @Id
    @Column(name = "`id`")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ApiModelProperty(value = "角色ID")
    @Column(name = "role_id")
    private Long roleId;

    @ApiModelProperty(value = "用户ID")
    @Column(name = "user_id")
    private Long userId;

    public RoleUser(Long roleId, Long userId) {
        this.roleId = roleId;
        this.userId = userId;
    }

}
