package com.code.service.system.impl;

import com.code.entity.system.CurrentMenu;
import com.code.entity.system.Menu;
import com.code.entity.system.RoleMenu;
import com.code.entity.system.SysUser;
import com.code.mapper.system.MenuMapper;
import com.code.service.system.IMenuService;
import com.code.service.system.IRoleMenuService;
import com.code.utils.UserThreadLocal;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
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
public class MenuService implements IMenuService {

    @Resource
    private MenuMapper menuMapper;

    @Resource
    private IRoleMenuService iRoleMenuService;

    /**
     * 获取用户权限菜单列表
     *
     * @param userId userId
     * @param parent menuId
     * @return ArrayList
     */
    private ArrayList<CurrentMenu> getCurrentMenus(Long userId, Long parent) {
        ArrayList<CurrentMenu> currentMenus = menuMapper.selectCurrentMenu(userId, parent);
        for (CurrentMenu currentMenu : currentMenus) {
            ArrayList<CurrentMenu> menuArrayList = getCurrentMenus(userId, currentMenu.getMenuId());
            if (menuArrayList.size() > 0) {
                currentMenu.setChildren(menuArrayList);
            }
        }
        return currentMenus;
    }

    /**
     * 获取用户权限菜单列表（用于导航菜单）
     *
     * @param userId 用户id
     * @return ArrayList
     */
    @Override
    public ArrayList<CurrentMenu> selectCurrentMenu(long userId) {
        return getCurrentMenus(userId, 0L);
    }

    /**
     * 获取用户权限菜单列表（用于shiro授权）
     *
     * @param userId userId
     * @return ArrayList<Menu>
     */
    @Override
    public ArrayList<Menu> selectRoleMenuByUserId(Long userId) {
        return menuMapper.selectRoleMenuByUserId(userId);
    }

    /**
     * 查询子列表
     *
     * @param arrayList 菜单列表
     */
    private void getMenuChildren(ArrayList<Menu> arrayList) {
        // 获取子菜单
        for (Menu menu : arrayList) {
            HashMap<String, Object> map = new HashMap<>();
            map.put("parent", menu.getMenuId());
            ArrayList<Menu> menus = menuMapper.selectMenu(map);
            if (menus.size() != 0) {
                map.clear();
                getMenuChildren(menus);
                menu.setChildren(menus);
            }

        }
    }

    /**
     * 查询列表
     *
     * @param map map
     * @return ArrayList
     */
    @Override
    public ArrayList<Menu> selectMenuList(Map<String, Object> map) {
        map.put("parent", 0);
        ArrayList<Menu> menuList = menuMapper.selectMenu(map);
        getMenuChildren(menuList);
        return menuList;
    }

    /**
     * 新增数据
     *
     * @param menu 菜单
     * @return status
     */
    @Override
    @Transactional(rollbackFor = Exception.class)
    public int addMenu(Menu menu) {
        SysUser user = UserThreadLocal.get();
        menu.setCreateTime(new Date());
        menu.setCreator(user.getUserId());
        int status = menuMapper.insertSelective(menu);

        SysUser sysUser = UserThreadLocal.get();
        if (sysUser.getRoleCode().equals("admin")) {
            RoleMenu roleMenu = new RoleMenu();
            roleMenu.setRoleId(sysUser.getRoleId());
            roleMenu.setMenuId(menu.getMenuId());
            iRoleMenuService.addRoleMenu(roleMenu);
        }
        return status;
    }

    /**
     * 修改数据
     *
     * @param menu 菜单
     */
    @Override
    public int editMenu(Menu menu) {
        SysUser user = UserThreadLocal.get();
        menu.setLmt(new Date());
        menu.setModifier(user.getUserId());
        return menuMapper.updateByPrimaryKeySelective(menu);
    }

    /**
     * 查看详情
     *
     * @param id 菜单id
     * @return Menu
     */
    @Override
    public Menu getDetailsById(Long id) {
        return menuMapper.selectByPrimaryKey(id);
    }

    /**
     * 删除数据
     *
     * @param id id
     * @return status
     */
    @Override
    public int deleteById(Long id) {
        return menuMapper.deleteByPrimaryKey(id);
    }

    /**
     * 批量删除
     *
     * @param ids ids
     * @return status
     */
    @Override
    public int deleteBatch(List<Long> ids) {

        for (Long id : ids) {
            menuMapper.deleteByPrimaryKey(id);
        }

        return 1;
    }

    /**
     * 用户状态变更
     *
     * @param menuId menuId
     * @return 0/1
     */
    @Override
    public int updateStatus(Long menuId) {
        return menuMapper.updateStatus(menuId);
    }

    /**
     * 显示变更
     *
     * @param menuId menuId
     * @return 0/1
     */
    @Override
    public int updateShow(Long menuId) {
        return menuMapper.updateShow(menuId);
    }


}

