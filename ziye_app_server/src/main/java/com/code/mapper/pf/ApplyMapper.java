package com.code.mapper.pf;

import com.code.entity.pf.Apply;
import tk.mybatis.mapper.common.Mapper;

import java.util.HashMap;
import java.util.List;

public interface ApplyMapper extends Mapper<Apply> {

    List<Apply> selectPageList(HashMap<String, Object> map);

    Apply selectById(Long applyId);

    int updateStatus(Long applyId);

    Apply selectByProjectIdAndTalentId(Long projectId, Long talentId);

}
