package com.code.service.pf;

import com.code.entity.pf.Talent;
import com.code.entity.system.SysUser;
import com.github.pagehelper.PageInfo;

import java.util.HashMap;
import java.util.List;

public interface ITalentService {

    /**
     * 分页查询
     *
     * @param map map
     * @return PageInfo<SysTalent>
     */
    PageInfo<Talent> selectPageList(HashMap<String, Object> map, int pageNum, int pageSize);

    /**
     * 查看详情
     *
     * @param talentId talentId
     * @return Result
     */
    Talent selectDetails(Long talentId);

    /**
     * 根据id获取人才信息
     *
     * @param talentId talentId
     * @return Result
     */
    Talent selectTalentById(Long talentId);

    Talent selectTalentByName(String talentName);

    Talent selectTalentByMobile(String mobile);

    int insertTalent(Talent talent);

    int updateTalent(Talent talent);

    int updateStatus(Long talentId);

    int deleteTalent(Long talentId);

    int deleteBatch(List<Long> ids);


    List<Talent> selectExcelList(HashMap<String, Object> params);
}
