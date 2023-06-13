package com.code.service.system.impl;

import com.code.entity.system.RoleMenu;
import com.code.mapper.system.RoleMenuMapper;
import com.code.service.system.IRoleMenuService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;

@Service
public class RoleMenuService implements IRoleMenuService {

    @Resource
    private RoleMenuMapper roleMenuMapper;

    /**
     * 根据roleId获取列表
     *
     * @param roleId 角色id
     * @return ArrayList<RoleMenu>
     */
    @Override
    public ArrayList<RoleMenu> selectByRoleId(Long roleId) {
        return roleMenuMapper.selectByRoleId(roleId);
    }

    /**
     * 新增数据
     *
     * @param roleMenu 权限菜单
     * @return status
     */
    @Override
    public int addRoleMenu(RoleMenu roleMenu) {
        return roleMenuMapper.insertSelective(roleMenu);
    }

    /**
     * 删除数据
     *
     * @param id id
     * @return status
     */
    @Override
    public int deleteById(Long id) {
        return roleMenuMapper.deleteByPrimaryKey(id);
    }

    /**
     * 根据roleId删除数据
     *
     * @param roleId 角色id
     * @return status
     */
    @Override
    public int deleteByRoleId(Long roleId) {
        return roleMenuMapper.deleteByRoleId(roleId);
    }


}
