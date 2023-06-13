package com.code.service.web;

import com.code.entity.pf.Talent;


public interface ITalentLoginService {

    int register(Talent talent);

    Talent login(String talentName);

    Talent selectTalentByToken(String token);

    Talent mobileLogin(String mobile);
}
