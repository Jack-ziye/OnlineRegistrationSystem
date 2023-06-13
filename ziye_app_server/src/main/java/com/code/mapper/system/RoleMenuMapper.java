package com.code.mapper.system;

import com.code.entity.system.RoleMenu;
import tk.mybatis.mapper.common.Mapper;

import java.util.ArrayList;

public interface RoleMenuMapper extends Mapper<RoleMenu> {

    ArrayList<RoleMenu> selectByRoleId(Long roleId);

    int deleteByRoleId(Long roleId);

}
