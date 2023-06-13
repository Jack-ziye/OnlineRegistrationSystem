package com.code;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import tk.mybatis.spring.annotation.MapperScan;

@SpringBootApplication
@MapperScan(basePackages = "com.code.mapper")
@EnableTransactionManagement
public class ZiyeAppServerApplication {

    public static void main(String[] args) {
        SpringApplication.run(ZiyeAppServerApplication.class, args);
    }

}
