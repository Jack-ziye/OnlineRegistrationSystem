package com.code.entity.monitor;

import com.code.utils.ArithUtil;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@ApiModel(value="Mem对象", description="")
public class Mem {

    @ApiModelProperty(value = "总内存")
    private double total;

    @ApiModelProperty(value = "已使用")
    private double used;

    @ApiModelProperty(value = "空闲")
    private double free;

    public double getTotal() {
        return ArithUtil.div(total, (1024 * 1024 * 1024), 2);
    }

    public double getUsed() {
        return ArithUtil.div(used, (1024 * 1024 * 1024), 2);
    }

    public double getFree() {
        return ArithUtil.div(free, (1024 * 1024 * 1024), 2);
    }

    /**
     * 资源的使用率
     */
    public double getUsageRate() {
        return ArithUtil.mul(ArithUtil.div(used, total, 4), 100);
    }

}
