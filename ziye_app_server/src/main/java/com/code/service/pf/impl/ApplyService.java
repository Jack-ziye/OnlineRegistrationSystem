package com.code.service.pf.impl;


import com.code.entity.pf.Apply;
import com.code.entity.pf.Project;
import com.code.entity.pf.Talent;
import com.code.mapper.pf.ApplyMapper;
import com.code.service.pf.IApplyService;
import com.code.service.pf.IProjectService;
import com.code.service.pf.ITalentService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.persistence.Transient;
import java.util.Date;
import java.util.HashMap;
import java.util.List;


@Service
public class ApplyService implements IApplyService {

    @Resource
    private ApplyMapper applyMapper;

    @Resource
    private IProjectService iProjectService;

    @Resource
    private ITalentService iTalentService;

    private void setUpdateInfo(Apply apply) {
        apply.setLmt(new Date());
    }

    /**
     * 查询列表
     *
     * @param map      map
     * @param pageNum  pageNum
     * @param pageSize pageSize
     * @return PageInfo<Apply>
     */
    @Override
    public PageInfo<Apply> selectPageList(HashMap<String, Object> map, int pageNum, int pageSize) {
        PageHelper.startPage(pageNum, pageSize);
        List<Apply> applyList = applyMapper.selectPageList(map);
        PageInfo<Apply> pages = new PageInfo<>(applyList);
        return pages;
    }

    /**
     * 根据Id查询数据
     *
     * @param applyId applyId
     * @return Apply
     */
    @Override
    public Apply selectApplyById(Long applyId) {
        return applyMapper.selectById(applyId);
    }

    @Override
    public Apply selectDetails(Long applyId) {
        Apply apply = applyMapper.selectById(applyId);
        Talent talent = iTalentService.selectTalentById(apply.getTalentId());
        Project project = iProjectService.selectProjectById(apply.getProjectId());

        apply.setTalent(talent);
        apply.setProject(project);

        return apply;
    }

    @Override
    public Apply selectByProjectIdAndTalentId(Long projectId, Long talentId) {
        return applyMapper.selectByProjectIdAndTalentId(projectId, talentId);
    }


    /**
     * 插入数据
     *
     * @param apply apply
     * @return status 1 成功 / 0 失败 / -1 过期 / -2 满额
     */
    @Override
    public int insertApply(Apply apply) {

        Project project = iProjectService.selectProjectById(apply.getProjectId());
        if (project.getDiffTime() <= 0) {
            return -1;
        } else if (project.getDiffQuota() == 0) {
            return -2;
        }

        Date date = new Date();
        apply.setCreateTime(date);
        apply.setLmt(date);
        setUpdateInfo(apply);
        return applyMapper.insertSelective(apply);
    }

    /**
     * 更新数据
     *
     * @param apply apply
     * @return status
     */
    @Override
    @Transient
    public int updateApply(Apply apply) {
        setUpdateInfo(apply);
        return applyMapper.updateByPrimaryKeySelective(apply);
    }


    /**
     * 用户状态变更
     *
     * @return 0/1
     */
    @Override
    public int updateStatus(Long applyId) {
        return applyMapper.updateStatus(applyId);
    }

    /**
     * 删除数据
     *
     * @param applyId applyParam
     * @return status
     */
    @Override
    public int deleteApply(Long applyId) {
        return applyMapper.deleteByPrimaryKey(applyId);
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
            applyMapper.deleteByPrimaryKey(id);
        }

        return 1;
    }

    @Override
    public List<Apply> selectExcelList(HashMap<String, Object> params) {
        return applyMapper.selectPageList(params);
    }


}

