package com.code.service.system.impl;

import com.alibaba.fastjson2.JSON;
import com.baomidou.mybatisplus.core.toolkit.StringUtils;
import com.code.entity.system.LoginLog;
import com.code.entity.system.SysUser;
import com.code.mapper.system.LoginMapper;
import com.code.service.system.ILoginService;
import com.code.service.system.IUserService;
import com.code.utils.JwtToken;
import com.code.utils.RedisUtil;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class LoginService implements ILoginService {

    @Resource
    private IUserService iUserService;

    @Resource
    private LoginMapper loginMapper;

    @Resource
    private RedisUtil redisUtil;

    /**
     * 用户登录
     *
     * @param username 用户名
     * @return 用户信息
     */
    @Override
    public SysUser login(String username) {
        return iUserService.selectByUsername(username);
    }

    @Override
    public SysUser mobileLogin(String mobile) {
        return iUserService.selectByMobile(mobile);
    }

    @Override
    public LoginLog selectLatest(Long userId) {
        return loginMapper.selectLatest(userId);
    }

    @Override
    public int loginOut(String token) {
        Map<String, Object> map = JwtToken.checkToken(token);
        Integer userId = (Integer) map.get("userId");
        Object getToken = redisUtil.get("USER_" + userId);
        HashMap<String, String> tokenMap = JSON.parseObject(JSON.toJSONString(getToken), HashMap.class);
        redisUtil.delete("TOKEN_ACCESS_" + tokenMap.get("access_token"));
        redisUtil.delete("TOKEN_REFRESH_" + tokenMap.get("refresh_token"));
        redisUtil.delete("USER_" + userId);
        return 1;
    }



    /**
     * 获取当前用户信息
     *
     * @param token token
     * @return 用户信息
     */
    @Override
    public SysUser selectUserByToken(String token) {
        if (StringUtils.isBlank(token)) {
            return null;
        }
        Object getUser = redisUtil.get("TOKEN_ACCESS_" + token);
        SysUser sysUser = JSON.parseObject(JSON.toJSONString(getUser), SysUser.class);
        if (sysUser == null) {
            return null;
        }
        return iUserService.selectUserById(sysUser.getUserId());
    }

    /**
     * 分页查询列表
     *
     * @param map map
     * @return 登录日志
     */
    @Override
    public PageInfo<LoginLog> selectPageList(HashMap<String, Object> map, int pageNum, int pageSize) {
        PageHelper.startPage(pageNum, pageSize);
        List<LoginLog> loginList = loginMapper.selectPage(map);
        PageInfo<LoginLog> pages = new PageInfo<>(loginList);
        return pages;
    }

    /**
     * 新增数据(日志)
     *
     * @param login 登录信息
     */
    @Override
    public int addLoginLog(LoginLog login) {
        return loginMapper.insertSelective(login);
    }

    /**
     * 删除数据(登录日志)
     *
     * @param id 日志id
     * @return 0/1
     */
    @Override
    public int deleteLoginLog(Long id) {
        return loginMapper.deleteByPrimaryKey(id);
    }

    /**
     * 批量删除数据
     *
     * @param ids ID集合
     * @return 0/1
     */
    @Override
    public int deleteBatch(List<Long> ids) {
        for (Long id : ids) {
            loginMapper.deleteByPrimaryKey(id);
        }
        return 1;
    }

    @Override
    public List<LoginLog> selectExcelList(HashMap<String, Object> params) {
        return loginMapper.selectPage(params);
    }

}
