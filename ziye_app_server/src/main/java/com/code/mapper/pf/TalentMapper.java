package com.code.mapper.pf;

import com.code.entity.pf.Talent;
import com.code.entity.system.SysUser;
import tk.mybatis.mapper.common.Mapper;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public interface TalentMapper extends Mapper<Talent> {

    /**
     * 分页查询
     *
     * @param map map
     * @return 项目列表
     */
    List<Talent> selectPageList(HashMap<String, Object> map);

    /**
     * 查看详情
     *
     * @param talentId 项目ID
     * @return 项目详情
     */
    Talent selectById(Long talentId);

    Talent selectByName(String talentName);

    Talent selectByMobile(String mobile);

    /**
     * 更新状态
     *
     * @param talentId 项目ID
     * @return 成功/失败
     */
    int updateStatus(Long talentId);


    /**
     * 通过项目Id获取人才列表
     *
     * @param projectId 人才ID
     * @return 人才列表
     */
    ArrayList<Talent> selectListByProjectId(Long projectId);




}
