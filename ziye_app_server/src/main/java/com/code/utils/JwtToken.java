package com.code.utils;

import com.code.entity.pf.Talent;
import com.code.entity.system.SysUser;
import io.jsonwebtoken.*;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class JwtToken {

    private static final String tokenKey = "_ziye_";
    private static final Integer tokenTime = 2 * 3600;
    private static final Integer refreshTokenTime = 24 * 3600;

    /**
     * token 创建
     *
     * @param user 用户实体类
     * @return token
     */
    public static String createToken(SysUser user) {

        HashMap<String, Object> claim = new HashMap<>();
        claim.put("userId", user.getUserId());

        JwtBuilder jwtBuilder = Jwts.builder()
                .signWith(SignatureAlgorithm.HS256, tokenKey)
                .setClaims(claim)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + tokenTime * 1000));

        return "Bearer " + jwtBuilder.compact();
    }
    /**
     * token 创建
     *
     * @param talent 用户实体类
     * @return token
     */
    public static String createToken(Talent talent) {

        HashMap<String, Object> claim = new HashMap<>();
        claim.put("talentId", talent.getTalentId());

        JwtBuilder jwtBuilder = Jwts.builder()
                .signWith(SignatureAlgorithm.HS256, tokenKey)
                .setClaims(claim)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + tokenTime * 1000));

        return "Bearer " + jwtBuilder.compact();
    }

    /**
     * refreshToken 创建
     *
     * @param user 用户实体类
     * @return token
     */
    public static String createRefreshToken(SysUser user) {

        HashMap<String, Object> claim = new HashMap<>();
        claim.put("userId", user.getUserId());

        JwtBuilder jwtBuilder = Jwts.builder()
                .signWith(SignatureAlgorithm.HS256, tokenKey)
                .setClaims(claim)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + refreshTokenTime * 1000));

        return "Bearer " + jwtBuilder.compact();
    }

    /**
     * refreshToken 创建
     *
     * @param talent 用户实体类
     * @return token
     */
    public static String createRefreshToken(Talent talent) {

        HashMap<String, Object> claim = new HashMap<>();
        claim.put("talentId", talent.getTalentId());

        JwtBuilder jwtBuilder = Jwts.builder()
                .signWith(SignatureAlgorithm.HS256, tokenKey)
                .setClaims(claim)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + refreshTokenTime * 1000));

        return "Bearer " + jwtBuilder.compact();
    }

    /**
     * 获取token信息
     *
     * @param token token
     * @return 值
     */
    public static Map<String, Object> checkToken(String token) {

        token = token.split(" ")[1];

        try {
            return Jwts.parser().setSigningKey(tokenKey).parseClaimsJws(token).getBody();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    /**
     * 获取token过期时间
     *
     * @param token token
     * @return 过期时间(秒) 0：已过期
     */
    public static long getTokenExpired(String token) {
        token = token.split(" ")[1];
        try {
            Claims claims = Jwts.parser()
                    .setSigningKey(tokenKey)
                    .parseClaimsJws(token)
                    .getBody();

            Date expiration = claims.getExpiration();
            long time = expiration.getTime() - new Date().getTime();
            return time / 1000;
        } catch (ExpiredJwtException e) {
            return 0;
        }
    }


    /**
     * token 续期
     *
     * @param token token
     * @return tokenRefresh
     */
    public static String tokenRefresh(String token) {
        token = token.split(" ")[1];

        Claims claims = Jwts.parser()
                .setSigningKey(tokenKey)
                .parseClaimsJws(token)
                .getBody();

        JwtBuilder jwtBuilder = Jwts.builder()
                .signWith(SignatureAlgorithm.HS256, tokenKey)
                .setClaims(claims)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 60 * 1000));
        return "Bearer " + jwtBuilder.compact();
    }

}
