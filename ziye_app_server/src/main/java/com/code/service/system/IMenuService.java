package com.code.service.system;

import com.code.entity.system.CurrentMenu;
import com.code.entity.system.Menu;
//import com.baomidou.mybatisplus.extension.service.IService;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * <p>
 * 业务类
 * </p>
 *
 * @author ziye
 * @since 2022-10-30
 */
public interface IMenuService {

    /**
     * 获取用户权限菜单列表
     *
     * @param userId 用户id
     * @return ArrayList
     */
    ArrayList<CurrentMenu> selectCurrentMenu(long userId);

    /**
     * 查询列表
     *
     * @param map map
     * @return ArrayList<Menu>
     */
    ArrayList<Menu> selectMenuList(Map<String, Object> map);

    /**
     * 获取用户权限菜单
     *
     * @param userId userId
     * @return ArrayList<Menu>
     */
    ArrayList<Menu> selectRoleMenuByUserId(Long userId);

    /**
     * 新增数据
     *
     * @param menu menu
     */
    int addMenu(Menu menu);

    /**
     * 修改数据
     *
     * @param menu menu
     */
    int editMenu(Menu menu);

    /**
     * 查看详情
     *
     * @param id id
     * @return Menu
     */
    Menu getDetailsById(Long id);

    /**
     * 删除数据
     *
     * @param id id
     * @return  status
     */
    int deleteById(Long id);

    /**
     * 批量删除
     *
     * @param ids ids
     * @return status
     */
    int deleteBatch(List<Long> ids);

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
     * @return Result
     */
    int updateShow(Long menuId);
}

