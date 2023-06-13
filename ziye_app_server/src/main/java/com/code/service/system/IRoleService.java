package com.code.service.system;

import com.code.entity.system.Role;
//import com.baomidou.mybatisplus.extension.service.IService;

import java.util.List;

import com.code.entity.system.SysUser;
import com.github.pagehelper.PageInfo;
import java.util.HashMap;

/**
 * <p>
 *  业务类
 * </p>
 *
 * @author ziye
 * @since 2022-10-30
 */
public interface IRoleService  {

    /**
    * 分页查询列表
    * @param map map
    * @return PageInfo
    */
    PageInfo<Role> selectPageList(HashMap<String, Object> map, int pageNum, int pageSize);

    /**
    * 新增数据
    * @param role
    */
    int addRole(Role role);

    /**
    * 修改数据
    * @param role
    */
    int editRole(Role role);

    /**
    * 查看详情
    * @param id
    * @return
    */
    Role getDetailsById(Long id);

    /**
    * 删除数据
    * @param id
    * @return
    */
    int deleteById(Long id);

    /**
    * 批量删除
    * @param ids
    * @return
    */
    int deleteBatch(List<Long> ids);

    /**
     * 用户状态变更
     *
     * @param roleId roleId
     * @return Result
     */
    int updateStatus(Long roleId);


    List<Role> selectExcelList(HashMap<String, Object> params);
}

