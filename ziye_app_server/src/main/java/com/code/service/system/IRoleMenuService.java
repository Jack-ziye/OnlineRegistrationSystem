package com.code.service.system;

import com.code.entity.system.RoleMenu;

import java.util.ArrayList;

public interface IRoleMenuService {

    int addRoleMenu(RoleMenu roleMenu);

    ArrayList<RoleMenu> selectByRoleId(Long id);

    int deleteById(Long id);

    int deleteByRoleId(Long roleId);


}
