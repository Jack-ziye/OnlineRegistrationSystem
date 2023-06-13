package com.code.mapper.system;

import com.code.entity.system.Index;

import tk.mybatis.mapper.common.Mapper;


public interface IndexMapper extends Mapper<Index> {

    Index selectData();


}
