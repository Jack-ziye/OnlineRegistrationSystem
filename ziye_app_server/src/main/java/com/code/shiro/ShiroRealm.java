package com.code.shiro;

import com.code.entity.system.Menu;
import com.code.entity.system.SysUser;
import com.code.service.system.ILoginService;
import com.code.service.system.IMenuService;
import org.apache.shiro.authc.*;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Set;


public class ShiroRealm extends AuthorizingRealm {

    @Resource
    private ILoginService iLoginService;

    @Resource
    private IMenuService iMenuService;

    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principalCollection) {
        SimpleAuthorizationInfo info = new SimpleAuthorizationInfo();
        Set<String> permSet = new HashSet<>();
        if (principalCollection != null) {
            SysUser sysUser = (SysUser) principalCollection.getPrimaryPrincipal();
            ArrayList<Menu> menus = iMenuService.selectRoleMenuByUserId(sysUser.getUserId());
            for (Menu menu : menus) {
                permSet.add(menu.getMenuCode());
            }
        }
        if (permSet.size() > 0) {
            info.addStringPermissions(permSet);
        }
        return info;
    }

    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken authenticationToken) throws AuthenticationException {
        String token = (String) authenticationToken.getCredentials();
        SysUser user = iLoginService.selectUserByToken(token);
        if (user == null) {
            throw new UnknownAccountException();
        }
        return new SimpleAuthenticationInfo(user, token, getName());
    }

    @Override
    public boolean supports(AuthenticationToken token) {
        return token instanceof ShiroToken;
    }

}
