package com.code.entity.system;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.persistence.*;

@Data
@Table(name = "`sys_user`")
@ApiModel(value = "NoticeUser对象", description = "推送用户表")
public class NoticeUser extends SysUser{

    @ApiModelProperty(value = "推送id")
    @Transient
    private Long informId;

    @ApiModelProperty(value = "是否已读")
    @Transient
    private Integer isRead;

}
