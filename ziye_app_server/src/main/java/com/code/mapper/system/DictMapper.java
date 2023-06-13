package com.code.mapper.system;

import com.code.entity.system.Dict;
import tk.mybatis.mapper.common.Mapper;

import java.util.ArrayList;
import java.util.HashMap;
/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author ziye
 * @since 2022-10-30
 */
public interface DictMapper extends Mapper<Dict> {

    /**
    * 分页查询
    * @param map map
    * @return ArrayList<Dict>
    */
    ArrayList<Dict> selectPage(HashMap<String, Object> map);

    /**
     * 状态变更
     *
     * @param dictId dictId
     * @return 0/1
     */
    int updateStatus(Long dictId);
}

