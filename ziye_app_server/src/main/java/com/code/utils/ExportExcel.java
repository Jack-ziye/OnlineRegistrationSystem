package com.code.utils;

import com.alibaba.excel.EasyExcel;
import com.alibaba.excel.write.builder.ExcelWriterSheetBuilder;
import org.apache.poi.ss.formula.functions.T;
import org.springframework.http.MediaType;

import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
import java.net.URLEncoder;
import java.util.Collection;
import java.util.Set;

public class ExportExcel {

    private String fileName;

    private String sheet;

    private Set<String> propsName;

    private Collection<T> date;

    private Class<T> cls;

    public void initialize(String fileName, Set<String> propsName, Class<T> cls) {

        this.fileName = fileName;
        this.propsName = propsName;
        this.cls = cls;

    }

    public ExportExcel writeFile(HttpServletResponse response, Collection<T> date) throws IOException {
        response.setContentType(MediaType.APPLICATION_OCTET_STREAM_VALUE);
        response.setHeader("Content-Disposition", "attachment;filename=" + URLEncoder.encode(fileName, "utf-8"));
        EasyExcel.write(response.getOutputStream(), cls)
                .includeColumnFieldNames(propsName).sheet(sheet).doWrite(date);
        return this;
    }

}
