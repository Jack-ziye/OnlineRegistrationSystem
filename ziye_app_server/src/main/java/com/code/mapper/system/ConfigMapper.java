package com.code.mapper.system;

import com.code.entity.system.Config;
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
public interface ConfigMapper extends Mapper<Config> {

    /**
    * 分页查询
    * @param map map
    * @return ArrayList<Config>
    */
    ArrayList<Config> selectPage(HashMap<String, Object> map);

}

