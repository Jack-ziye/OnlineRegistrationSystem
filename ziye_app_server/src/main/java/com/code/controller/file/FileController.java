package com.code.controller.file;

import com.code.common.logAop.LogAnnotation;
import com.code.utils.Result;
import com.code.utils.ResultCode;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.util.FileSystemUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.Date;
import java.util.UUID;

/**
 * <p>
 * Controller
 * </p>
 *
 * @author ziye
 * @since 2023-4-11
 */
@RestController
@Api(tags = "文件管理接口")
@RequestMapping("/file")
public class FileController {

    @Value("${file.upload.dir}")
    private String savePath;

    /**
     * 文件上传
     *
     * @return Result
     */
    @ApiOperation(value = "文件上传")
    @PostMapping("/upload")
    @LogAnnotation(module = "文件管理接口", operator = "文件上传")
    public Result upload(@RequestParam("file") MultipartFile file) {

        // 获取文件名
        String fileName = file.getOriginalFilename();

        // 获取文件的后缀名
        String suffixName = fileName.substring(fileName.lastIndexOf("."));

        fileName = UUID.randomUUID().toString().replace("-", "") + suffixName;
        String filePath = savePath + "/" + fileName;
        String fileDir = System.getProperty("user.dir") + "/static";

        // 构建上传路径
        File saveFile = new File(fileDir + filePath);

        // 检测是否存在目录
        if (!saveFile.getParentFile().exists()) {
            saveFile.getParentFile().mkdirs();
        }

        try {
            file.transferTo(saveFile);
            return Result.ok().put(filePath);
        } catch (IllegalStateException | IOException e) {
            e.printStackTrace();
            return Result.error(ResultCode.UPLOAD_ERROR);
        }
    }

    /**
     * 删除导出文件
     *
     * @return Result
     */
    @ApiOperation(value = "删除导出文件")
    @GetMapping("/remove")
    @LogAnnotation(module = "文件管理接口", operator = "删除导出文件")
    public void remove(@RequestParam(value = "url") String url) {
        String fileDir = System.getProperty("user.dir") + "/static";
        // 构建上传路径
        File file = new File(fileDir + url);
        // 检测是否存在目录
        if (file.getParentFile().exists()) {
            FileSystemUtils.deleteRecursively(file);
        }

    }

}
