package com.code.vo;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.util.List;

@Data
public class PushInformParam {

    @ApiModelProperty(value = "通知id")
    private Long noticeId;

    @ApiModelProperty(value = "通知id")
    private List<Long> userList;

}
