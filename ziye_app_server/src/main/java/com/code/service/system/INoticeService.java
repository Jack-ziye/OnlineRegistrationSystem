package com.code.service.system;

import com.code.entity.system.Notice;
import com.code.entity.system.NoticeUser;
import com.github.pagehelper.PageInfo;

import java.util.HashMap;
import java.util.List;

public interface INoticeService {

    /**
     * 分页查询
     *
     * @param map map
     * @return PageInfo<SysNotice>
     */
    PageInfo<Notice> selectPageList(HashMap<String, Object> map, int pageNum, int pageSize);

    Notice selectNoticeById(Long noticeId);

    int insertNotice(Notice notice);

    int updateNotice(Notice notice);

    int updateStatus(Long noticeId);

    int deleteNotice(Long noticeId);

    int deleteBatch(List<Long> ids);

    PageInfo<NoticeUser> selectPageListUser(HashMap<String, Object> params, int pageNum, int pageSize);

    List<NoticeUser> selectListUserByNoticeId(Long noticeId);
}
