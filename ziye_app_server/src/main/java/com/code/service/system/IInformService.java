package com.code.service.system;

import com.code.entity.system.Inform;
import com.code.entity.system.Notice;
import com.github.pagehelper.PageInfo;

import java.util.HashMap;
import java.util.List;

public interface IInformService {

    PageInfo<Inform> selectPageList(HashMap<String, Object> map, int pageNum, int pageSize);

    Inform selectInformById(Long informId);

    int insertInform(Inform inform);

    int updateInform(Inform inform);

    int updateReadStatus(Long informId, Integer status);

    int deleteInform(Long informId);

    int deleteBatch(List<Long> ids);

    int deleteInformByNoticeIdAndUserId(Long noticeId, Long userId);
}
