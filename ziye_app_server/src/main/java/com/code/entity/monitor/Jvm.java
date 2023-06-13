package com.code.entity.monitor;

import com.code.utils.ArithUtil;
import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.lang.management.ManagementFactory;
import java.util.Date;

@Data
@ApiModel(value="Jvm对象", description="")
public class Jvm {

    @ApiModelProperty(value = "总使用率")
    private double total;

    @ApiModelProperty(value = "系统使用率")
    private double max;

    @ApiModelProperty(value = "空闲")
    private double free;

    @ApiModelProperty(value = "jdk版本")
    private String version;

    @ApiModelProperty(value = "jdk版本")
    private String home;

    @ApiModelProperty(value = "启动时间")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private Date startTime;

    @ApiModelProperty(value = "运行时间")
    private String runTime;

    public double getTotal() {
        return ArithUtil.div(total, (1024 * 1024), 2);
    }

    public double getMax() {
        return ArithUtil.div(max, (1024 * 1024), 2);
    }


    public double getFree() {
        return ArithUtil.div(free, (1024 * 1024), 2);
    }

    public double getUsed() {
        return ArithUtil.div(total - free, (1024 * 1024), 2);
    }

    /**
     * 资源的使用率
     */
    public double getUsageRate() {
        return ArithUtil.mul(ArithUtil.div(total - free, total, 4), 100);
    }

    /**
     * 获取JDK名称
     */
    public String getName() {
        return ManagementFactory.getRuntimeMXBean().getVmName();
    }

    /**
     * JDK启动时间
     */
    public Date getStartTime() {
        return startTime;
    }

    /**
     * JDK运行时间
     */
    public String getRunTime() {
        return runTime;
    }

}
