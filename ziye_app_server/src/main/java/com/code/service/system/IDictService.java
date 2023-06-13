package com.code.service.system;

import com.code.entity.system.Dict;

import java.util.List;

import com.github.pagehelper.PageInfo;

import java.util.HashMap;

/**
 * <p>
 * 业务类
 * </p>
 *
 * @author ziye
 * @since 2022-10-30
 */
public interface IDictService {

    /**
     * 分页查询列表
     *
     * @param map map
     * @return PageInfo
     */
    PageInfo<Dict> selectPageList(HashMap<String, Object> map, int pageNum, int pageSize);

    /**
     * 新增数据
     *
     * @param dict dict
     */
    int addDict(Dict dict);

    /**
     * 修改数据
     *
     * @param dict dict
     * @return status
     */
    int editDict(Dict dict);

    /**
     * 查看详情
     *
     * @param id id
     * @return status
     */
    Dict getDetailsById(Long id);

    /**
     * 删除数据
     *
     * @param id id
     * @return status
     */
    int deleteById(Long id);

    /**
     * 批量删除
     *
     * @param ids ids
     * @return status
     */
    int deleteBatch(List<Long> ids);

    /**
     * 状态变更
     *
     * @param dictId dictId
     * @return 0/1
     */
    int updateStatus(Long dictId);

    List<Dict> selectExcelList(HashMap<String, Object> params);

}

