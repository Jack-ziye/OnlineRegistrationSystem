package com.code.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2WebMvc;

@Configuration
@EnableSwagger2WebMvc
public class SwaggerConfig {

    @Bean(value = "defaultApi2")
    public Docket defaultApi2() {
        Docket docket = new Docket(DocumentationType.SWAGGER_2)
                .apiInfo(new ApiInfoBuilder()
                        .title("ziye_app")
                        .contact(new Contact("ziye", null, null))
                        .description("子叶管理系统接口文档")
                        .termsOfServiceUrl("http://localhost:8000/")
                        .version("1.0")
                        .build())
                //分组名称
                .groupName("2.0版本")
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.code.controller")) //这里指定Controller扫描包路径
                .paths(PathSelectors.any())
                .build();
        return docket;
    }

}
