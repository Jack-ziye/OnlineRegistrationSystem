package com.code.service.system;

import com.github.pagehelper.PageInfo;
import com.code.entity.system.SysUser;

import java.util.HashMap;
import java.util.List;

public interface IUserService {

    /**
     * 分页查询
     *
     * @param map map
     * @return PageInfo<SysUser>
     */
    PageInfo<SysUser> selectPageList(HashMap<String, Object> map, int pageNum, int pageSize);

    SysUser selectUserById(Long userId);

    SysUser selectByUsername(String username);

    SysUser selectByMobile(String mobile);

    int insertUser(SysUser user);

    int updateUser(SysUser user);

    int deleteUser(Long userId);

    int deleteBatch(List<Long> ids);

    List<SysUser> selectExcelList(HashMap<String, Object> params);

    int updateUserStatus(Long userId);


}
