package com.code.service.pf;

import com.code.entity.pf.Category;
import com.github.pagehelper.PageInfo;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public interface ICategoryService {

    /**
     * 分页查询
     *
     * @param map map
     * @return PageInfo<SysCategory>
     */
    PageInfo<Category> selectPageList(HashMap<String, Object> map, int pageNum, int pageSize);

    List<Category> selectList();

    Category selectCategoryById(Long categoryId);

    int insertCategory(Category category);

    int updateCategory(Category category);

    int updateStatus(Long categoryId);

    int deleteCategory(Long categoryId);

    int deleteBatch(List<Long> ids);


}
