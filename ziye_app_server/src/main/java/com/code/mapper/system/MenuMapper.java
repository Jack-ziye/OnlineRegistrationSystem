package com.code.mapper.system;

import com.code.entity.system.CurrentMenu;
import com.code.entity.system.Menu;
import tk.mybatis.mapper.common.Mapper;

import java.util.ArrayList;
import java.util.Map;

/**
 * <p>
 * Mapper 接口
 * </p>
 *
 * @author ziye
 * @since 2022-10-30
 */
public interface MenuMapper extends Mapper<Menu> {

    /**
     * 分页查询
     *
     * @param map map
     * @return ArrayList<Menu>
     */
    ArrayList<Menu> selectMenu(Map<String, Object> map);

    /**
     * 获取当前用户权限菜单
     *
     * @param userId userId
     * @param parent parent
     * @return ArrayList<CurrentMenu>
     */
    ArrayList<CurrentMenu> selectCurrentMenu(Long userId, Long parent);

    /**
     * 获取用户权限菜单列表
     *
     * @param userId userId
     * @return ArrayList<CurrentMenu>
     */
    ArrayList<Menu> selectRoleMenuByUserId(Long userId);

    /**
     * 用户状态变更
     *
     * @param menuId menuId
     * @return Result
     */
    int updateStatus(Long menuId);

    /**
     * 显示变更
     *
     * @param menuId menuId
     * @return 0/1
     */
    int updateShow(Long menuId);
}

