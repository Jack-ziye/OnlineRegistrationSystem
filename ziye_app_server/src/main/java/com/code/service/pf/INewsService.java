package com.code.service.pf;

import com.code.entity.pf.News;
import com.github.pagehelper.PageInfo;

import java.util.HashMap;
import java.util.List;

public interface INewsService {

    /**
     * 分页查询
     *
     * @param map map
     * @return PageInfo<SysNews>
     */
    PageInfo<News> selectPageList(HashMap<String, Object> map, int pageNum, int pageSize);

    News selectNewsById(Long newsId);

    int insertNews(News news);

    int updateNews(News news);

    int updateStatus(Long newsId);

    int deleteNews(Long newsId);

    int deleteBatch(List<Long> ids);

    int updateNewsReads(Long newsId);
}
