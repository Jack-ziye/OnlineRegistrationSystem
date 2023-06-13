package com.code.service.pf.impl;


import com.code.entity.pf.Project;
import com.code.entity.pf.Talent;
import com.code.entity.system.SysUser;
import com.code.mapper.pf.ProjectMapper;
import com.code.mapper.pf.TalentMapper;
import com.code.service.pf.ITalentService;
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
public class TalentService implements ITalentService {

    @Resource
    private TalentMapper talentMapper;

    @Resource
    private ProjectMapper projectMapper;

    private void setUpdateInfo(Talent talent) {
        talent.setLmt(new Date());
    }

    /**
     * 查询列表
     *
     * @param map      map
     * @param pageNum  pageNum
     * @param pageSize pageSize
     * @return PageInfo<Talent>
     */
    @Override
    public PageInfo<Talent> selectPageList(HashMap<String, Object> map, int pageNum, int pageSize) {
        PageHelper.startPage(pageNum, pageSize);
        List<Talent> talentList = talentMapper.selectPageList(map);
        PageInfo<Talent> pages = new PageInfo<>(talentList);
        return pages;
    }


    /**
     * 查看详情
     *
     * @param talentId talentId
     * @return Talent
     */
    @Override
    public Talent selectDetails(Long talentId) {
        Talent talent = talentMapper.selectById(talentId);
        // 获取项目列表
        ArrayList<Project> projects = projectMapper.selectListByTalentId(talentId);
        talent.setProjectList(projects);
        return talent;
    }

    /**
     * 根据id获取人才信息
     *
     * @param talentId talentId
     * @return Result
     */
    @Override
    public Talent selectTalentById(Long talentId) {
        return talentMapper.selectById(talentId);
    }

    @Override
    public Talent selectTalentByName(String talentName) {
        return talentMapper.selectByName(talentName);
    }

    @Override
    public Talent selectTalentByMobile(String mobile) {
        return talentMapper.selectByMobile(mobile);
    }


    /**
     * 插入数据
     *
     * @param talent talent
     * @return status
     */
    @Override
    public int insertTalent(Talent talent) {
        Date date = new Date();
        talent.setCreateTime(date);
        talent.setLmt(date);
        setUpdateInfo(talent);
        return talentMapper.insertSelective(talent);
    }

    /**
     * 更新数据
     *
     * @param talent talent
     * @return status
     */
    @Override
    @Transient
    public int updateTalent(Talent talent) {
        setUpdateInfo(talent);
        return talentMapper.updateByPrimaryKeySelective(talent);
    }

    /**
     * 用户状态变更
     *
     * @return 0/1
     */
    @Override
    public int updateStatus(Long talentId) {
        return talentMapper.updateStatus(talentId);
    }

    /**
     * 删除数据
     *
     * @param talentId talentParam
     * @return status
     */
    @Override
    public int deleteTalent(Long talentId) {
        return talentMapper.deleteByPrimaryKey(talentId);
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
            talentMapper.deleteByPrimaryKey(id);
        }

        return 1;
    }

    @Override
    public List<Talent> selectExcelList(HashMap<String, Object> params) {
        return talentMapper.selectPageList(params);
    }


}

