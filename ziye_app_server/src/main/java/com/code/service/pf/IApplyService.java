package com.code.service.pf;

import com.code.entity.pf.Apply;
import com.github.pagehelper.PageInfo;

import java.util.HashMap;
import java.util.List;

public interface IApplyService {

    /**
     * 分页查询
     *
     * @param map map
     * @return PageInfo<SysApply>
     */
    PageInfo<Apply> selectPageList(HashMap<String, Object> map, int pageNum, int pageSize);

    Apply selectApplyById(Long applyId);

    Apply selectDetails(Long applyId);

    Apply selectByProjectIdAndTalentId(Long projectId, Long talentId);

    /**
     * 插入数据
     *
     * @param apply apply
     * @return 1 成功 / 0 失败 / -1 过期 / -2 满额
     */
    int insertApply(Apply apply);

    int updateApply(Apply apply);

    int updateStatus(Long applyId);

    int deleteApply(Long applyId);

    int deleteBatch(List<Long> ids);


    List<Apply> selectExcelList(HashMap<String, Object> params);
}
