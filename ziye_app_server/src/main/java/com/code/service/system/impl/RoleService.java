package com.code.service.system.impl;

import com.code.entity.system.Role;
import com.code.entity.system.RoleMenu;
import com.code.entity.system.SysUser;
import com.code.mapper.system.RoleMapper;
import com.code.service.system.IRoleMenuService;
import com.code.service.system.IRoleService;
import com.code.utils.UserThreadLocal;
import org.springframework.stereotype.Service;
import com.github.pagehelper.PageInfo;
import com.github.pagehelper.PageHelper;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.HashMap;
import javax.annotation.Resource;

/**
 * <p>
 * 业务实现类
 * </p>
 *
 * @author ziye
 * @since 2022-10-30
 */
@Service
public class RoleService implements IRoleService {

    @Resource
    private RoleMapper roleMapper;

    @Resource
    private IRoleMenuService iRoleMenuService;

    /**
     * 置入菜单列表
     *
     * @param role
     * @return
     */
    private void setRoleMenu(Role role){
        ArrayList<RoleMenu> roleMenus = iRoleMenuService.selectByRoleId(role.getRoleId());
        ArrayList<Long> arrayList = new ArrayList<>();
        for (RoleMenu roleMenu: roleMenus){
            arrayList.add(roleMenu.getMenuId());
        }
        role.setRoleMenu(arrayList);
    }

    /**
     * 分页查询列表
     *
     * @param map
     * @return
     */
    @Override
    public PageInfo<Role> selectPageList(HashMap<String, Object> map, int pageNum, int pageSize) {
        PageHelper.startPage(pageNum, pageSize);
        List<Role> roleList = roleMapper.selectPage(map);

        for (Role role: roleList){
            setRoleMenu(role);
        }

        PageInfo<Role> pages = new PageInfo<>(roleList);
        return pages;
    }

    /**
     * 新增数据
     *
     * @param role
     */
    @Override
    @Transactional(rollbackFor = Exception.class)
    public int addRole(Role role) {
        SysUser user = UserThreadLocal.get();
        role.setCreateTime(new Date());
        role.setCreateUser(user.getUserId());
        int status = roleMapper.insertSelective(role);

        if (role.getRoleMenu() != null) {
            for (Long menuId : role.getRoleMenu()) {
                RoleMenu roleMenu = new RoleMenu();
                roleMenu.setRoleId(role.getRoleId());
                roleMenu.setMenuId(menuId);
                iRoleMenuService.addRoleMenu(roleMenu);
            }
        }

        return status;
    }

    /**
     * 修改数据
     *
     * @param role
     */
    @Override
    @Transactional(rollbackFor = Exception.class)
    public int editRole(Role role) {
        role.setUpdateTime(new Date());
        int status = roleMapper.updateByPrimaryKeySelective(role);

        if (role.getRoleMenu() == null || role.getRoleMenu().size() == 0) {
            iRoleMenuService.deleteByRoleId(role.getRoleId());
        } else {
            // 获取原有
            ArrayList<RoleMenu> originalRoleMenu = iRoleMenuService.selectByRoleId(role.getRoleId());
            // 获取当前
            List<Long> currentRoleMenu = role.getRoleMenu();
            // 过滤
            currentRoleMenu.removeIf(menuId -> originalRoleMenu.removeIf(roleMenu -> menuId.equals(roleMenu.getMenuId())));

            // 删除原有
            for (RoleMenu roleMenu : originalRoleMenu) {
                iRoleMenuService.deleteById(roleMenu.getId());
            }
            // 添加
            for (Long menuId : currentRoleMenu) {
                RoleMenu roleMenu = new RoleMenu();
                roleMenu.setRoleId(role.getRoleId());
                roleMenu.setMenuId(menuId);
                iRoleMenuService.addRoleMenu(roleMenu);
            }
        }

        return status;
    }

    /**
     * 查看详情
     *
     * @param id
     * @return
     */
    @Override
    public Role getDetailsById(Long id) {
        return roleMapper.selectByPrimaryKey(id);
    }

    /**
     * 删除数据
     *
     * @param id
     * @return
     */
    @Override
    @Transactional(rollbackFor = Exception.class)
    public int deleteById(Long id) {
        iRoleMenuService.deleteByRoleId(id);
        return roleMapper.deleteByPrimaryKey(id);
    }

    /**
     * 批量删除
     *
     * @param ids
     * @return
     */
    @Override
    public int deleteBatch(List<Long> ids) {

        for (Long id : ids) {
            roleMapper.deleteByPrimaryKey(id);
        }

        return 1;
    }

    /**
     * 用户状态变更
     *
     * @param roleId roleId
     * @return Result
     */
    @Override
    public int updateStatus(Long roleId) {
        return roleMapper.updateStatus(roleId);
    }

    @Override
    public List<Role> selectExcelList(HashMap<String, Object> params) {
        return roleMapper.selectPage(params);
    }

}

