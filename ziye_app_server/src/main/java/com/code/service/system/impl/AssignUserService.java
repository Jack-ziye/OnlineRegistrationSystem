package com.code.service.system.impl;

import com.code.entity.system.RoleUser;
import com.code.entity.system.SysUser;
import com.code.mapper.system.AssignUserMapper;
import com.code.service.system.IAssignUserService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;


@Service
public class AssignUserService implements IAssignUserService {

    @Resource
    private AssignUserMapper assignUserMapper;


    /**
     * 获取已分配用户列表
     *
     * @param map      map
     * @param pageNum  pageNum
     * @param pageSize pageSize
     * @return PageInfo<SysUser>
     */
    @Override
    public PageInfo<SysUser> selectPageList(HashMap<String, Object> map, int pageNum, int pageSize) {
        PageHelper.startPage(pageNum, pageSize);
        List<SysUser> userList = assignUserMapper.selectPageList(map);
        PageInfo<SysUser> pages = new PageInfo<>(userList);
        return pages;
    }


    @Override
    @Transactional(rollbackFor = Exception.class)
    public int updateAssignUser(Long roleId, List<String> users) {

        int status = 0;

        for (String userId : users) {
            deleteAssignUser(Long.valueOf(userId));
            status += insertAssignUser(new RoleUser(roleId, Long.valueOf(userId)));
        }

        return status;
    }

    @Override
    public int deleteAssignUser(Long userId) {
        return assignUserMapper.deleteAssignUser(userId);
    }

    @Override
    public int insertAssignUser(RoleUser roleUser) {
        return assignUserMapper.insertAssignUser(roleUser);
    }

    @Override
    public int deleteBatch(List<Long> ids) {
        int status = 0;
        for (Long id : ids) {
            status += assignUserMapper.deleteAssignUser(id);
        }
        return status;
    }


}
