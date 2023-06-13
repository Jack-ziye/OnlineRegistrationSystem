package com.code.service.system;

import com.code.entity.system.LoginLog;
import com.code.entity.system.SysUser;
import com.github.pagehelper.PageInfo;

import java.util.HashMap;
import java.util.List;

public interface ILoginService {

    SysUser login(String username);

    SysUser selectUserByToken(String token);

    PageInfo<LoginLog> selectPageList(HashMap<String, Object> map, int pageNum, int pageSize);

    int addLoginLog(LoginLog login);

    int deleteLoginLog(Long id);

    int deleteBatch(List<Long> ids);

    SysUser mobileLogin(String mobile);

    LoginLog selectLatest(Long userId);

    int loginOut(String token);

    List<LoginLog> selectExcelList(HashMap<String, Object> params);
}
