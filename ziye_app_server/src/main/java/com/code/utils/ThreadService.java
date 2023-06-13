package com.code.utils;

import com.code.entity.pf.News;
import com.code.entity.pf.Project;
import com.code.entity.pf.Talent;
import com.code.entity.system.Inform;
import com.code.entity.system.LoginLog;
import com.code.entity.system.Notice;
import com.code.entity.system.SysUser;
import com.code.service.pf.INewsService;
import com.code.service.pf.IProjectService;
import com.code.service.system.IInformService;
import com.code.service.system.ILoginService;
import com.code.service.system.INoticeService;
import eu.bitwalker.useragentutils.UserAgent;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.concurrent.TimeUnit;

@Component
@Slf4j
public class ThreadService {

    @Resource
    private ILoginService iLoginService;

    @Resource
    private INewsService iNewsService;

    @Resource
    private IProjectService iProjectService;

    @Resource
    private INoticeService iNoticeService;

    @Resource
    private IInformService informService;

    /**
     * 添加登录日志
     *
     * @param loginLog 登录日志信息
     */
    @Async("TaskExecutor")
    public void addLoginLog(LoginLog loginLog) {
        log.info("==================== 添加登录日志 start ====================");
        iLoginService.addLoginLog(loginLog);
        log.info("==================== 添加登录日志 end ====================");
    }

    /**
     * 更新阅读数
     *
     * @param news 登录日志信息
     */
    @Async("TaskExecutor")
    public void updateNewsReads(News news) {
        iNewsService.updateNewsReads(news.getNewsId());
    }

    /**
     * 推送消息
     */
    @Async("TaskExecutor")
    public void pushInform(Long projectId, Talent talent) {
        log.info("==================== 推送通知 start ====================");
        Project project = iProjectService.selectProjectById(projectId);
        String content = talent.getTalentName() + "已提交报名申请，请及时审核申请";

        Notice notice = new Notice();
        notice.setTitle("提交推送");
        notice.setContent(content);
        notice.setNoticeType(2);
        iNoticeService.insertNotice(notice);

        Inform inform = new Inform();
        inform.setNoticeId(notice.getNoticeId());
        inform.setUserId(project.getCreator());
        informService.insertInform(inform);

        log.info("==================== 推送通知 end ====================");
    }

}
