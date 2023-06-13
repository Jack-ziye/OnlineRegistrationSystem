package com.code.mapper.pf;

import com.code.entity.pf.Project;
import com.code.entity.pf.Talent;
import tk.mybatis.mapper.common.Mapper;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public interface ProjectMapper extends Mapper<Project> {

    /**
     * 分页查询
     *
     * @param map map
     * @return 项目列表
     */
    List<Project> selectPageList(HashMap<String, Object> map);

    /**
     * 查看详情
     *
     * @param projectId 项目ID
     * @return 项目详情
     */
    Project selectById(Long projectId);

    /**
     * 更新状态
     *
     * @param projectId 项目ID
     * @return 成功/失败
     */
    int updateStatus(Long projectId);

    /**
     * 通过人才Id获取人才列表
     *
     * @param talentId 人才ID
     * @return 项目列表
     */
    ArrayList<Project> selectListByTalentId(Long talentId);

}
