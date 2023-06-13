package com.code.service.system;

import com.code.entity.system.Config;
//import com.baomidou.mybatisplus.extension.service.IService;

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
public interface IConfigService {

    /**
     * 分页查询列表
     *
     * @param map      map
     * @param pageNum  pageNum
     * @param pageSize pageSize
     * @return PageInfo<Config>
     */
    PageInfo<Config> selectPageList(HashMap<String, Object> map, int pageNum, int pageSize);

    /**
     * 新增数据
     *
     * @param config config
     */
    int addConfig(Config config);

    /**
     * 修改数据
     *
     * @param config config
     */
    int editConfig(Config config);

    /**
     * 查看详情
     *
     * @param id configId
     * @return status
     */
    Config getDetailsById(Long id);

    /**
     * 删除数据
     *
     * @param id configId
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

}

