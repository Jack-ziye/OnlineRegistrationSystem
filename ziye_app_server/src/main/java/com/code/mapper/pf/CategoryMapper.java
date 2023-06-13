package com.code.mapper.pf;

import com.code.entity.pf.Category;
import tk.mybatis.mapper.common.Mapper;

import java.util.HashMap;
import java.util.List;

public interface CategoryMapper extends Mapper<Category> {

    List<Category> selectPageList(HashMap<String, Object> map);

    Category selectById(Long categoryId);

    int updateStatus(Long categoryId);

}
