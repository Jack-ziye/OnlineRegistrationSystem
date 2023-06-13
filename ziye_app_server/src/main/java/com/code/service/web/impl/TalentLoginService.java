package com.code.service.web.impl;


import com.alibaba.fastjson2.JSON;
import com.baomidou.mybatisplus.core.toolkit.StringUtils;
import com.code.entity.pf.Talent;

import com.code.entity.system.SysUser;
import com.code.service.pf.ITalentService;
import com.code.service.web.ITalentLoginService;

import com.code.utils.RedisUtil;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;


@Service
public class TalentLoginService implements ITalentLoginService {

    @Resource
    private ITalentService iTalentService;

    @Resource
    private RedisUtil redisUtil;

    @Override
    public int register(Talent talent) {
        return iTalentService.insertTalent(talent);
    }

    @Override
    public Talent login(String talentName) {
        return iTalentService.selectTalentByName(talentName);
    }

    @Override
    public Talent selectTalentByToken(String token) {
        if (StringUtils.isBlank(token)) {
            return null;
        }
        Object getTalent = redisUtil.get("TOKEN_ACCESS_" + token);
        Talent talent = JSON.parseObject(JSON.toJSONString(getTalent), Talent.class);
        if (talent == null) {
            return null;
        }
        return iTalentService.selectTalentById(talent.getTalentId());
    }

    @Override
    public Talent mobileLogin(String mobile) {
        return iTalentService.selectTalentByMobile(mobile);
    }
}
