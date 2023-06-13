package com.code.service.pf.impl;


import com.code.entity.pf.Project;
import com.code.entity.pf.Talent;
import com.code.mapper.pf.ProjectMapper;
import com.code.mapper.pf.TalentMapper;
import com.code.service.pf.IProjectService;
import com.code.utils.UserThreadLocal;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.persistence.Transient;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;


@Service
public class ProjectService implements IProjectService {

    @Resource
    private ProjectMapper projectMapper;

    @Resource
    private TalentMapper talentMapper;

    private void setUpdateInfo(Project project) {
        Long userId = UserThreadLocal.get().getUserId();
        project.setLmt(new Date());
        project.setModifier(userId);
    }

    /**
     * 查询列表
     *
     * @param map      map
     * @param pageNum  pageNum
     * @param pageSize pageSize
     * @return PageInfo<Project>
     */
    @Override
    public PageInfo<Project> selectPageList(HashMap<String, Object> map, int pageNum, int pageSize) {
        PageHelper.startPage(pageNum, pageSize);
        List<Project> projectList = projectMapper.selectPageList(map);
        PageInfo<Project> pages = new PageInfo<>(projectList);
        return pages;
    }

    /**
     * 查看详情
     *
     * @param projectId projectId
     * @return Project
     */
    @Override
    public Project selectDetails(Long projectId) {
        Project project = projectMapper.selectById(projectId);
        // 获取人才
        ArrayList<Talent> talents = talentMapper.selectListByProjectId(projectId);
        project.setTalentList(talents);
        return project;
    }

    /**
     * 根据ID获取项目
     *
     * @param projectId projectId
     * @return Project
     */
    @Override
    public Project selectProjectById(Long projectId) {
        return projectMapper.selectById(projectId);
    }


    /**
     * 插入数据
     *
     * @param project project
     * @return status
     */
    @Override
    public int insertProject(Project project) {
        Long userId = UserThreadLocal.get() == null ? null : UserThreadLocal.get().getUserId();
        Date date = new Date();
        project.setCreateTime(date);
        project.setLmt(date);
        project.setCreator(userId);
        setUpdateInfo(project);
        return projectMapper.insertSelective(project);
    }

    /**
     * 更新数据
     *
     * @param project project
     * @return status
     */
    @Override
    @Transient
    public int updateProject(Project project) {
        setUpdateInfo(project);
        return projectMapper.updateByPrimaryKeySelective(project);
    }



    /**
     * 用户状态变更
     *
     * @return 0/1
     */
    @Override
    public int updateStatus(Long projectId) {
        return projectMapper.updateStatus(projectId);
    }

    /**
     * 删除数据
     *
     * @param projectId projectParam
     * @return status
     */
    @Override
    public int deleteProject(Long projectId) {
        return projectMapper.deleteByPrimaryKey(projectId);
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
            projectMapper.deleteByPrimaryKey(id);
        }

        return 1;
    }

    @Override
    public List<Project> selectExcelList(HashMap<String, Object> params) {
        return projectMapper.selectPageList(params);
    }


}

