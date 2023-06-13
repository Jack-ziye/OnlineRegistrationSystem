package com.code.mapper.system;

import com.code.entity.system.SysUser;
import tk.mybatis.mapper.common.Mapper;
import java.util.HashMap;
import java.util.List;

public interface UserMapper extends Mapper<SysUser> {

    List<SysUser> selectPageList(HashMap<String, Object> map);

    SysUser selectById(Long userId);

    SysUser selectByUsername(String username);

    int updateUserStatus(Long userId);

    SysUser selectByMobile(String mobile);
}
