package com.code.service.pf.impl;


import com.code.entity.pf.News;
import com.code.mapper.pf.NewsMapper;
import com.code.service.pf.INewsService;
import com.code.utils.UserThreadLocal;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.persistence.Transient;
import java.util.Date;
import java.util.HashMap;
import java.util.List;


@Service
public class NewsService implements INewsService {

    @Resource
    private NewsMapper newsMapper;

    private void setUpdateInfo(News news) {
        Long userId = UserThreadLocal.get().getUserId();
        news.setLmt(new Date());
        news.setModifier(userId);
    }

    /**
     * 查询列表
     *
     * @param map      map
     * @param pageNum  pageNum
     * @param pageSize pageSize
     * @return PageInfo<News>
     */
    @Override
    public PageInfo<News> selectPageList(HashMap<String, Object> map, int pageNum, int pageSize) {
        PageHelper.startPage(pageNum, pageSize);
        List<News> newsList = newsMapper.selectPageList(map);
        PageInfo<News> pages = new PageInfo<>(newsList);
        return pages;
    }

    /**
     * 根据Id查询数据
     *
     * @param newsId newsId
     * @return News
     */
    @Override
    public News selectNewsById(Long newsId) {
        return newsMapper.selectById(newsId);
    }


    /**
     * 插入数据
     *
     * @param news news
     * @return status
     */
    @Override
    public int insertNews(News news) {
        Long userId = UserThreadLocal.get() == null ? null : UserThreadLocal.get().getUserId();
        Date date = new Date();
        news.setCreateTime(date);
        news.setLmt(date);
        news.setCreator(userId);
        setUpdateInfo(news);
        return newsMapper.insertSelective(news);
    }

    /**
     * 更新数据
     *
     * @param news news
     * @return status
     */
    @Override
    @Transient
    public int updateNews(News news) {
        setUpdateInfo(news);
        return newsMapper.updateByPrimaryKeySelective(news);
    }



    /**
     * 用户状态变更
     *
     * @return 0/1
     */
    @Override
    public int updateStatus(Long newsId) {
        return newsMapper.updateStatus(newsId);
    }

    /**
     * 删除数据
     *
     * @param newsId newsParam
     * @return status
     */
    @Override
    public int deleteNews(Long newsId) {
        return newsMapper.deleteByPrimaryKey(newsId);
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
            newsMapper.deleteByPrimaryKey(id);
        }

        return 1;
    }

    /**
     * 更新阅读数
     *
     * @param newsId 新闻id
     * @return status
     */
    @Override
    public int updateNewsReads(Long newsId) {
        return newsMapper.updateNewsReads(newsId);
    }


}

