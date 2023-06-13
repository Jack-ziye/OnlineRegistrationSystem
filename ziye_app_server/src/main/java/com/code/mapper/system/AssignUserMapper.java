package com.code.mapper.system;

import com.code.entity.system.RoleUser;
import com.code.entity.system.SysUser;
import tk.mybatis.mapper.common.Mapper;

import java.util.HashMap;
import java.util.List;

public interface AssignUserMapper extends Mapper<SysUser> {

    /**
     * 获取已分配用户列表
     *
     * @param map map
     * @return List<SysUser>
     */
    List<SysUser> selectPageList(HashMap<String, Object> map);

    int deleteAssignUser(Long userId);

    int insertAssignUser(RoleUser roleUser);

}
