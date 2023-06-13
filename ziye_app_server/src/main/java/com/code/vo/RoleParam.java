package com.code.vo;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.validation.constraints.NotBlank;
import java.util.List;

@Data
public class RoleParam {

    @Id
    @Column(name = "`id`")
    private Long roleId;

    @ApiModelProperty(value = "角色名称")
    @NotBlank(message = "请填写角色名称")
    private String roleName;

    @ApiModelProperty(value = "权限标识")
    @NotBlank(message = "请填写权限标识")
    private String roleCode;

    @ApiModelProperty(value = "显示顺序")
    private Integer orderIndex;

    @ApiModelProperty(value = "菜单权限")
    private List<String> roleMenu;

    @ApiModelProperty(value = "备注")
    private String remark;

}
