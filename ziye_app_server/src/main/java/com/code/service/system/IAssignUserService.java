package com.code.service.system;

import com.code.entity.system.RoleUser;
import com.code.entity.system.SysUser;
import com.github.pagehelper.PageInfo;

import java.util.HashMap;
import java.util.List;

public interface IAssignUserService {

    /**
     * 获取已分配用户列表
     *
     * @param params  params
     * @param pageNum pageNum
     * @param pageSize pageSize
     * @return SysUserList
     */
    PageInfo<SysUser> selectPageList(HashMap<String, Object> params, int pageNum, int pageSize);

    int deleteAssignUser(Long userId);

    int insertAssignUser(RoleUser roleUser);

    int deleteBatch(List<Long> ids);

    int updateAssignUser(Long roleId, List<String> users);

}
