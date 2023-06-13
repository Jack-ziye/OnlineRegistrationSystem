package com.code.mapper.system;

import com.code.entity.system.Role;
import tk.mybatis.mapper.common.Mapper;

import java.util.HashMap;
import java.util.List;

/**
 * <p>
 * Mapper 接口
 * </p>
 *
 * @author ziye
 * @since 2022-10-30
 */
public interface RoleMapper extends Mapper<Role> {

    /**
     * 分页查询
     *
     * @param map map
     * @return List<Role>
     */
    List<Role> selectPage(HashMap<String, Object> map);

    /**
     * 用户状态变更
     *
     * @param roleId roleId
     * @return Result
     */
    int updateStatus(Long roleId);
}

