package com.code.service.system.impl;

import com.code.entity.system.Config;
import com.code.mapper.system.ConfigMapper;
import com.code.service.system.IConfigService;
//import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;
import com.github.pagehelper.PageInfo;
import com.github.pagehelper.PageHelper;

import java.util.ArrayList;
import java.util.List;
import java.util.HashMap;
import javax.annotation.Resource;

/**
 * <p>
 *  业务实现类
 * </p>
 *
 * @author ziye
 * @since 2022-10-30
 */
@Service
public class ConfigService  implements IConfigService {
	
	@Resource
	private ConfigMapper configMapper;
	
    /**
    * 分页查询列表
    * @param map map
    * @return PageInfo<Config>
    */
    @Override
    public PageInfo<Config> selectPageList(HashMap<String, Object> map, int pageNum, int pageSize)  {
        PageHelper.startPage(pageNum, pageSize);
        ArrayList<Config> configs = configMapper.selectPage(map);
        return new PageInfo<>(configs);
    }

    /**
    * 新增数据
    * @param config
    */
    @Override
    public int addConfig(Config config) {
        return configMapper.insertSelective(config);
    }

    /**
    * 修改数据
    * @param config
    */
    @Override
    public int editConfig(Config config) {
        return configMapper.updateByPrimaryKeySelective(config);
    }

    /**
    * 查看详情
    * @param id
    * @return
    */
    @Override
    public Config getDetailsById(Long id) {
        return configMapper.selectByPrimaryKey(id);
    }

    /**
    * 删除数据
    * @param id
    * @return
    */
    @Override
    public int deleteById(Long id) {
        return configMapper.deleteByPrimaryKey(id);
    }

    /**
    * 批量删除
    * @param ids
    * @return
    */
    @Override
    public int deleteBatch(List<Long> ids) {
    
    	for (Long id : ids) {
			configMapper.deleteByPrimaryKey(id);
		}
		
        return 1;
    }

}

