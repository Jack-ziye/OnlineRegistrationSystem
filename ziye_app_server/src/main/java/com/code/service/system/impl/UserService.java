package com.code.service.system.impl;

import com.code.utils.UserThreadLocal;
import com.github.pagehelper.PageInfo;
import com.github.pagehelper.PageHelper;

import com.code.entity.system.SysUser;
import com.code.mapper.system.UserMapper;
import com.code.service.system.IUserService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.persistence.Transient;
import java.util.Date;
import java.util.HashMap;
import java.util.List;


@Service
public class UserService implements IUserService {

    @Resource
    private UserMapper userMapper;

    /**
     * 修改相关信息设置
     *
     * @param user user
     */
    private void setUpdateInfo(SysUser user) {
        Long userId = UserThreadLocal.get().getUserId();
        user.setLmt(new Date());
        user.setModifier(userId);
    }

    /**
     * 查询列表
     *
     * @param map      map
     * @param pageNum  pageNum
     * @param pageSize pageSize
     * @return PageInfo<SysUser>
     */
    @Override
    public PageInfo<SysUser> selectPageList(HashMap<String, Object> map, int pageNum, int pageSize) {
        PageHelper.startPage(pageNum, pageSize);
        List<SysUser> userList = userMapper.selectPageList(map);
        PageInfo<SysUser> pages = new PageInfo<>(userList);
        return pages;
    }

    /**
     * 根据Id查询数据
     *
     * @param userId userId
     * @return SysUser
     */
    @Override
    public SysUser selectUserById(Long userId) {
        return userMapper.selectById(userId);
    }

    /**
     * 根据用户名查询数据(用于用户登录)
     *
     * @param username username
     * @return SysUser
     */
    @Override
    public SysUser selectByUsername(String username) {
        return userMapper.selectByUsername(username);
    }

    @Override
    public SysUser selectByMobile(String mobile) {
        return userMapper.selectByMobile(mobile);
    }

    /**
     * 插入数据
     *
     * @param user user
     * @return status
     */
    @Override
    public int insertUser(SysUser user) {
        Long userId = UserThreadLocal.get() == null ? null : UserThreadLocal.get().getUserId();
        Date date = new Date();
        user.setCreateTime(date);
        user.setLmt(date);
        user.setCreator(userId);
        setUpdateInfo(user);
        return userMapper.insert(user);
    }

    /**
     * 更新数据
     *
     * @param user user
     * @return status
     */
    @Override
    @Transient
    public int updateUser(SysUser user) {
        setUpdateInfo(user);
        return userMapper.updateByPrimaryKeySelective(user);
    }

    /**
     * 用户状态变更
     *
     * @return 0/1
     */
    @Override
    public int updateUserStatus(Long userId) {
        return userMapper.updateUserStatus(userId);
    }

    /**
     * 删除数据
     *
     * @param userId userParam
     * @return status
     */
    @Override
    public int deleteUser(Long userId) {
        return userMapper.deleteByPrimaryKey(userId);
    }

    /**
     * 批量删除
     *
     * @param ids ids
     * @return 1
     */
    @Override
    public int deleteBatch(List<Long> ids) {

        for (Long id : ids) {
            userMapper.deleteByPrimaryKey(id);
        }

        return 1;
    }

    /**
     * 导出数据
     *
     * @param params
     * @return List<SysUser>
     */
    @Override
    public List<SysUser> selectExcelList(HashMap<String, Object> params) {
        return userMapper.selectPageList(params);
    }



}
