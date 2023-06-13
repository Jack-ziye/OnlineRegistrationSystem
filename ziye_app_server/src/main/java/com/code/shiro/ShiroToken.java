package com.code.shiro;

import org.apache.shiro.authc.AuthenticationToken;

public class ShiroToken implements AuthenticationToken {

    private String token;

    public ShiroToken(String token) {
        this.token = token;
    }

    @Override
    public Object getPrincipal() {
        return token;
    }

    @Override
    public Object getCredentials() {
        return token;
    }
}
