package com.code.config;

import com.code.handler.LoginInterceptor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import javax.annotation.Resource;

@Configuration
public class WebMVCConfig implements WebMvcConfigurer {

    @Resource
    private LoginInterceptor loginInterceptor;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // 跨域配置
        registry.addMapping("/**")
                .allowedOrigins("*")
                .allowedMethods("*")
                .allowedHeaders("*")
                .exposedHeaders("*");
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(loginInterceptor)
                .addPathPatterns("/**").excludePathPatterns("/swagger-resources/**")
                .excludePathPatterns("/static/**")
                .excludePathPatterns("/user/login").excludePathPatterns("/user/logout")
                .excludePathPatterns("/user/mobile-login")
                .excludePathPatterns("/send/code/mobile")
                .excludePathPatterns("/web/**")
                .excludePathPatterns("/talent/login")
                .excludePathPatterns("/talent/mobile-login")
                .excludePathPatterns("/talent/register");
    }

}
