package com.code.mapper.pf;

import com.code.entity.pf.News;
import tk.mybatis.mapper.common.Mapper;

import java.util.HashMap;
import java.util.List;

public interface NewsMapper extends Mapper<News> {

    List<News> selectPageList(HashMap<String, Object> map);

    News selectById(Long newsId);

    int updateStatus(Long newsId);

    int updateNewsReads(Long newsId);
}
