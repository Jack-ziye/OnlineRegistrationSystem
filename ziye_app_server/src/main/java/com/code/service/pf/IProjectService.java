package com.code.service.pf;

import com.code.entity.pf.Project;
import com.github.pagehelper.PageInfo;

import java.util.HashMap;
import java.util.List;

public interface IProjectService {

    /**
     * 分页查询
     *
     * @param map map
     * @return PageInfo<SysProject>
     */
    PageInfo<Project> selectPageList(HashMap<String, Object> map, int pageNum, int pageSize);

    Project selectDetails(Long projectId);

    Project selectProjectById(Long projectId);

    int insertProject(Project project);

    int updateProject(Project project);

    int updateStatus(Long projectId);

    int deleteProject(Long projectId);

    int deleteBatch(List<Long> ids);


    List<Project> selectExcelList(HashMap<String, Object> params);
}
