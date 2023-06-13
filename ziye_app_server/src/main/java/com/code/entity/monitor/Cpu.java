package com.code.entity.monitor;


import com.code.utils.ArithUtil;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@ApiModel(value = "Cpu对象", description = "")
public class Cpu {

    @ApiModelProperty(value = "核心数")
    private int num;

    @ApiModelProperty(value = "总使用率")
    private double total;

    @ApiModelProperty(value = "系统使用率")
    private double system;

    @ApiModelProperty(value = "用户使用率")
    private double used;

    @ApiModelProperty(value = "等待")
    private double wait;

    @ApiModelProperty(value = "空闲")
    private double free;

    public int getNum() {
        return num;
    }

    public double getTotal() {
        return ArithUtil.round(ArithUtil.mul(total, 100), 2);
    }

    public double getSystemRate() {
        return ArithUtil.round(ArithUtil.mul(system / total, 100), 2);
    }

    public double getUsedRate() {
        return ArithUtil.round(ArithUtil.mul(used / total, 100), 2);
    }

    public double getWaitRate() {
        return ArithUtil.round(ArithUtil.mul(wait / total, 100), 2);
    }

    public double getFreeRate() {
        return ArithUtil.round(ArithUtil.mul(free / total, 100), 2);
    }

    public double getTotalRate() {
        return ArithUtil.add(getUsedRate(), getSystemRate());
    }

}
