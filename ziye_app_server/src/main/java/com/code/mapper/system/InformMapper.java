package com.code.mapper.system;


import com.code.entity.system.Inform;
import com.code.entity.system.Notice;
import tk.mybatis.mapper.common.Mapper;

import java.util.HashMap;
import java.util.List;

public interface InformMapper extends Mapper<Inform> {

    List<Inform> selectPageList(HashMap<String, Object> map);

    Inform selectById(Long informId);

    int updateReadStatus(Long informId, Integer status);

    int deleteInformByNoticeIdAndUserId(Long noticeId, Long userId);

}
