package com.code.service.system.impl;


import com.code.entity.system.Inform;
import com.code.entity.system.Notice;
import com.code.mapper.system.InformMapper;
import com.code.service.system.IInformService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.persistence.Transient;
import java.util.Date;
import java.util.HashMap;
import java.util.List;


@Service
public class InformService implements IInformService {

    @Resource
    private InformMapper informMapper;

    /**
     * 查询列表
     *
     * @param map      map
     * @return PageInfo<Inform>
     */
    @Override
    public PageInfo<Inform> selectPageList(HashMap<String, Object> map, int pageNum, int pageSize) {
        PageHelper.startPage(pageNum, pageSize);
        List<Inform> informList = informMapper.selectPageList(map);
        PageInfo<Inform> pages = new PageInfo<>(informList);
        return pages;
    }

    /**
     * 根据Id查询数据
     *
     * @param informId informId
     * @return Inform
     */
    @Override
    public Inform selectInformById(Long informId) {
        return informMapper.selectById(informId);
    }


    /**
     * 插入数据
     *
     * @param inform inform
     * @return status
     */
    @Override
    public int insertInform(Inform inform) {
        Date date = new Date();
        inform.setCreateTime(date);
        return informMapper.insertSelective(inform);
    }

    /**
     * 更新数据
     *
     * @param inform inform
     * @return status
     */
    @Override
    @Transient
    public int updateInform(Inform inform) {
        return informMapper.updateByPrimaryKeySelective(inform);
    }



    /**
     * 用户状态变更
     *
     * @return 0/1
     */
    @Override
    public int updateReadStatus(Long informId, Integer status) {
        return informMapper.updateReadStatus(informId, status);
    }

    /**
     * 删除数据
     *
     * @param informId informParam
     * @return status
     */
    @Override
    public int deleteInform(Long informId) {
        return informMapper.deleteByPrimaryKey(informId);
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
            informMapper.deleteByPrimaryKey(id);
        }

        return 1;
    }

    @Override
    public int deleteInformByNoticeIdAndUserId(Long noticeId, Long userId) {
        return informMapper.deleteInformByNoticeIdAndUserId(noticeId, userId);
    }


}

