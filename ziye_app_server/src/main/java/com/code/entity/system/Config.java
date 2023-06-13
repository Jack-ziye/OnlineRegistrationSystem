package com.code.entity.system;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@Table(name = "`sys_config`")
@ApiModel(value="Config对象", description="")
public class Config implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "`id`")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long configId;

    @ApiModelProperty(value = "参数名称")
    @Column(name = "`name`")
    @NotBlank(message = "请填写参数名称")
    private String configName;

    @ApiModelProperty(value = "字典键名")
    @Column(name = "`key`")
    @NotBlank(message = "请填写字典键名")
    private String configKey;

    @ApiModelProperty(value = "字典键值")
    @Column(name = "`value`")
    @NotBlank(message = "请填写字典键值")
    private String configValue;

    @ApiModelProperty(value = "系统内置")
    @Column(name = "builtIn")
    private Integer builtIn;

    @ApiModelProperty(value = "备注")
    @Column(name = "remark")
    private String remark;

    @ApiModelProperty(value = "创建时间")
    @Column(name = "create_time")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private Date createTime;

}
