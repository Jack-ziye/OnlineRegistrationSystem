package com.code.service.system.impl;

import com.code.entity.system.Dict;
import com.code.mapper.system.DictMapper;
import com.code.service.system.IDictService;
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
public class DictService  implements IDictService {
	
	@Resource
	private DictMapper dictMapper;
	
    /**
    * 分页查询列表
    * @param map map
    * @return PageInfo
    */
    @Override
    public PageInfo<Dict> selectPageList(HashMap<String, Object> map, int pageNum, int pageSize)  {
        PageHelper.startPage(pageNum, pageSize);
        ArrayList<Dict> dictArrayList = dictMapper.selectPage(map);
        return new PageInfo<>(dictArrayList);
    }

    /**
    * 新增数据
    * @param dict dict
    */
    @Override
    public int addDict(Dict dict) {
        return dictMapper.insertSelective(dict);
    }

    /**
    * 修改数据
    * @param dict dict
    */
    @Override
    public int editDict(Dict dict) {
        return dictMapper.updateByPrimaryKeySelective(dict);
    }

    /**
    * 查看详情
    * @param id id
    * @return Dict
    */
    @Override
    public Dict getDetailsById(Long id) {
        return dictMapper.selectByPrimaryKey(id);
    }

    /**
    * 删除数据
    * @param id id
    * @return status
    */
    @Override
    public int deleteById(Long id) {
        return dictMapper.deleteByPrimaryKey(id);
    }

    /**
    * 批量删除
    * @param ids ids
    * @return status
    */
    @Override
    public int deleteBatch(List<Long> ids) {
    
    	for (Long id : ids) {
			dictMapper.deleteByPrimaryKey(id);
		}
		
        return 1;
    }

    /**
     * 状态变更
     *
     * @param dictId dictId
     * @return 0/1
     */
    @Override
    public int updateStatus(Long dictId) {
        return dictMapper.updateStatus(dictId);
    }

    @Override
    public List<Dict> selectExcelList(HashMap<String, Object> params) {
        return dictMapper.selectPage(params);
    }

}

