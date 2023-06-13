package com.code.service.pf.impl;


import com.code.entity.pf.Category;
import com.code.mapper.pf.CategoryMapper;
import com.code.service.pf.ICategoryService;
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
public class CategoryService implements ICategoryService {

    @Resource
    private CategoryMapper categoryMapper;

    private void setUpdateInfo(Category category) {
        Long userId = UserThreadLocal.get().getUserId();
        category.setLmt(new Date());
        category.setModifier(userId);
    }

    /**
     * 查询列表
     *
     * @param map      map
     * @param pageNum  pageNum
     * @param pageSize pageSize
     * @return PageInfo<Category>
     */
    @Override
    public PageInfo<Category> selectPageList(HashMap<String, Object> map, int pageNum, int pageSize) {
        PageHelper.startPage(pageNum, pageSize);
        List<Category> categoryList = categoryMapper.selectPageList(map);
        PageInfo<Category> pages = new PageInfo<>(categoryList);
        return pages;
    }

    @Override
    public List<Category> selectList() {
        return categoryMapper.selectAll();
    }

    /**
     * 根据Id查询数据
     *
     * @param categoryId categoryId
     * @return Category
     */
    @Override
    public Category selectCategoryById(Long categoryId) {
        return categoryMapper.selectById(categoryId);
    }


    /**
     * 插入数据
     *
     * @param category category
     * @return status
     */
    @Override
    public int insertCategory(Category category) {
        Long userId = UserThreadLocal.get() == null ? null : UserThreadLocal.get().getUserId();
        Date date = new Date();
        category.setCreateTime(date);
        category.setLmt(date);
        category.setCreator(userId);
        setUpdateInfo(category);
        return categoryMapper.insertSelective(category);
    }

    /**
     * 更新数据
     *
     * @param category category
     * @return status
     */
    @Override
    @Transient
    public int updateCategory(Category category) {
        setUpdateInfo(category);
        return categoryMapper.updateByPrimaryKeySelective(category);
    }



    /**
     * 用户状态变更
     *
     * @return 0/1
     */
    @Override
    public int updateStatus(Long categoryId) {
        return categoryMapper.updateStatus(categoryId);
    }

    /**
     * 删除数据
     *
     * @param categoryId categoryParam
     * @return status
     */
    @Override
    public int deleteCategory(Long categoryId) {
        return categoryMapper.deleteByPrimaryKey(categoryId);
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
            categoryMapper.deleteByPrimaryKey(id);
        }

        return 1;
    }



}

