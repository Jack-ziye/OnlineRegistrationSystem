package com.code.entity.system;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.NotBlank;

import com.alibaba.excel.annotation.ExcelProperty;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@Table(name = "`sys_dict`")
@ApiModel(value="Dict对象", description="")
public class Dict implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "`id`")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @ExcelProperty("ID")
    private Long dictId;

    @ApiModelProperty(value = "字典名称")
    @Column(name = "`name`")
    @ExcelProperty("字典名称")
    @NotBlank(message = "请填写字典名称")
    private String dictName;

    @ApiModelProperty(value = "字典类型")
    @Column(name = "type")
    @ExcelProperty("字典类型")
    @NotBlank(message = "请填写字典类型")
    private String dictType;

    @ApiModelProperty(value = "字典键名")
    @Column(name = "`key`")
    @ExcelProperty("字典键名")
    @NotBlank(message = "请填写字典键名")
    private String dictKey;

    @ApiModelProperty(value = "字典键值")
    @Column(name = "`value`")
    @ExcelProperty("字典键值")
    @NotBlank(message = "请填写字典键值")
    private String dictValue;

    @ApiModelProperty(value = "备注")
    @Column(name = "remark")
    private String remark;

    @ApiModelProperty(value = "状态")
    @Column(name = "status")
    private Integer status;

    @ApiModelProperty(value = "排序字段")
    @Column(name = "order_index")
    @ExcelProperty("排序字段")
    private Integer orderIndex;

    @ApiModelProperty(value = "状态名称")
    @Transient
    @ExcelProperty("状态名称")
    private String statusName;

}
