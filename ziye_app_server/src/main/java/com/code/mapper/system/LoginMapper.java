package com.code.mapper.system;

import com.code.entity.system.LoginLog;
import tk.mybatis.mapper.common.Mapper;

import java.util.HashMap;
import java.util.List;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author ziye
 * @since 2022-10-30
 */
public interface LoginMapper extends Mapper<LoginLog> {

    List<LoginLog> selectPage(HashMap<String, Object> map);

    LoginLog selectLatest(Long userId);
}

