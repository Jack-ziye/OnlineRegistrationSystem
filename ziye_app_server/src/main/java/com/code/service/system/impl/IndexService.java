package com.code.service.system.impl;


import com.code.entity.system.Index;
import com.code.mapper.system.IndexMapper;
import com.code.service.system.IIndexService;

import org.springframework.stereotype.Service;

import javax.annotation.Resource;


@Service
public class IndexService implements IIndexService {

    @Resource
    private IndexMapper indexMapper;

    @Override
    public Index selectData() {
        return indexMapper.selectData();
    }
}
