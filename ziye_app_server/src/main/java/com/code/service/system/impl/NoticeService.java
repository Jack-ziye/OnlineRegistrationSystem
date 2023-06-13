package com.code.service.system.impl;


import com.code.entity.system.Notice;
import com.code.entity.system.NoticeUser;
import com.code.mapper.system.NoticeMapper;
import com.code.service.system.INoticeService;
import com.code.utils.UserThreadLocal;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.persistence.Transient;
import java.util.Date;
import java.util.HashMap;
import java.util.List;


@Service
public class NoticeService implements INoticeService {

    @Resource
    private NoticeMapper noticeMapper;

    private void setUpdateInfo(Notice notice) {
        notice.setLmt(new Date());
    }

    /**
     * 查询列表
     *
     * @param map      map
     * @param pageNum  pageNum
     * @param pageSize pageSize
     * @return PageInfo<Notice>
     */
    @Override
    public PageInfo<Notice> selectPageList(HashMap<String, Object> map, int pageNum, int pageSize) {
        PageHelper.startPage(pageNum, pageSize);
        List<Notice> noticeList = noticeMapper.selectPageList(map);
        PageInfo<Notice> pages = new PageInfo<>(noticeList);
        return pages;
    }

    /**
     * 根据Id查询数据
     *
     * @param noticeId noticeId
     * @return Notice
     */
    @Override
    public Notice selectNoticeById(Long noticeId) {
        return noticeMapper.selectById(noticeId);
    }


    /**
     * 插入数据
     *
     * @param notice notice
     * @return status
     */
    @Override
    public int insertNotice(Notice notice) {
        Long userId = UserThreadLocal.get() == null ? null : UserThreadLocal.get().getUserId();
        Date date = new Date();
        notice.setCreateTime(date);
        notice.setLmt(date);
        notice.setCreator(userId);
        setUpdateInfo(notice);
        return noticeMapper.insertSelective(notice);
    }

    /**
     * 更新数据
     *
     * @param notice notice
     * @return status
     */
    @Override
    @Transient
    public int updateNotice(Notice notice) {
        setUpdateInfo(notice);
        return noticeMapper.updateByPrimaryKeySelective(notice);
    }


    /**
     * 用户状态变更
     *
     * @return 0/1
     */
    @Override
    public int updateStatus(Long noticeId) {
        return noticeMapper.updateStatus(noticeId);
    }

    /**
     * 删除数据
     *
     * @param noticeId noticeParam
     * @return status
     */
    @Override
    public int deleteNotice(Long noticeId) {
        return noticeMapper.deleteByPrimaryKey(noticeId);
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
            noticeMapper.deleteByPrimaryKey(id);
        }

        return 1;
    }

    @Override
    public PageInfo<NoticeUser> selectPageListUser(HashMap<String, Object> map, int pageNum, int pageSize) {
        PageHelper.startPage(pageNum, pageSize);
        List<NoticeUser> noticeList = noticeMapper.selectPageUserList(map);
        PageInfo<NoticeUser> pages = new PageInfo<>(noticeList);
        return pages;
    }

    @Override
    public List<NoticeUser> selectListUserByNoticeId(Long noticeId) {
        List<NoticeUser> noticeList = noticeMapper.selectListUserByNoticeId(noticeId);
        return noticeList;
    }


}

