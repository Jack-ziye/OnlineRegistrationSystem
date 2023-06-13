/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 50726
 Source Host           : localhost:3306
 Source Schema         : ziye_app

 Target Server Type    : MySQL
 Target Server Version : 50726
 File Encoding         : 65001

 Date: 12/04/2023 17:32:20
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for pf_apply
-- ----------------------------
DROP TABLE IF EXISTS `pf_apply`;
CREATE TABLE `pf_apply`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '申请Id',
  `project_id` bigint(20) NOT NULL COMMENT '项目ID',
  `talent_id` bigint(20) NOT NULL COMMENT '人才ID',
  `feedback` varchar(2000) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '反馈信息',
  `status` int(2) NULL DEFAULT 0 COMMENT '状态',
  `order_index` bigint(20) NULL DEFAULT 0 COMMENT '显示顺序',
  `is_top` int(2) NULL DEFAULT 0 COMMENT '置顶',
  `create_time` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `lmt` datetime(0) NULL DEFAULT NULL COMMENT '最后更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of pf_apply
-- ----------------------------
INSERT INTO `pf_apply` VALUES (1, 1, 1, NULL, 0, 0, 0, '2023-03-15 19:09:47', NULL);
INSERT INTO `pf_apply` VALUES (2, 1, 2, '', 0, 0, 1, '2023-03-15 19:09:51', '2023-03-20 00:05:57');
INSERT INTO `pf_apply` VALUES (3, 2, 2, NULL, 0, 0, 0, '2023-03-15 19:01:53', '2023-03-07 00:18:52');

-- ----------------------------
-- Table structure for pf_category
-- ----------------------------
DROP TABLE IF EXISTS `pf_category`;
CREATE TABLE `pf_category`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '类别ID',
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '名称',
  `remark` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '备注',
  `status` int(2) NULL DEFAULT 0 COMMENT '状态',
  `order_index` bigint(20) NULL DEFAULT 0 COMMENT '显示顺序',
  `creator` bigint(20) NULL DEFAULT NULL COMMENT '创建用户ID',
  `create_time` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `modifier` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '最后修改人',
  `lmt` datetime(0) NULL DEFAULT NULL COMMENT '最后更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 8 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of pf_category
-- ----------------------------
INSERT INTO `pf_category` VALUES (1, '考试报名', NULL, 0, 1, 1, '2023-03-05 12:55:19', '1', '2023-03-15 17:33:26');
INSERT INTO `pf_category` VALUES (3, '活动报名', NULL, 0, 2, 1, '2023-03-09 20:20:47', '1', '2023-03-09 20:20:47');
INSERT INTO `pf_category` VALUES (6, '测试栏目', NULL, 0, 1, 1, '2023-03-23 11:28:48', '1', '2023-03-23 11:28:48');

-- ----------------------------
-- Table structure for pf_news
-- ----------------------------
DROP TABLE IF EXISTS `pf_news`;
CREATE TABLE `pf_news`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '新闻ID',
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '标题',
  `content` varchar(20000) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '内容',
  `status` int(2) NULL DEFAULT 0 COMMENT '状态',
  `order_index` bigint(20) NULL DEFAULT 0 COMMENT '显示顺序',
  `is_top` int(2) NULL DEFAULT 0 COMMENT '置顶',
  `creator` bigint(20) NULL DEFAULT NULL COMMENT '创建用户ID',
  `create_time` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `modifier` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '最后修改人',
  `lmt` datetime(0) NULL DEFAULT NULL COMMENT '最后更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of pf_news
-- ----------------------------
INSERT INTO `pf_news` VALUES (1, '测试', '<p>测试数据</p>', 1, 0, 0, 1, '2023-03-05 00:21:42', '1', '2023-03-19 13:26:58');

-- ----------------------------
-- Table structure for pf_project
-- ----------------------------
DROP TABLE IF EXISTS `pf_project`;
CREATE TABLE `pf_project`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '项目ID',
  `category_id` bigint(20) NOT NULL DEFAULT 1 COMMENT '类别ID',
  `cover` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '封面url',
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '名称',
  `content` varchar(2000) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '内容',
  `start_time` datetime(0) NOT NULL COMMENT '开始时间',
  `end_time` datetime(0) NOT NULL COMMENT '结束时间',
  `quota` bigint(20) NULL DEFAULT -1 COMMENT '名额（-1无限制）',
  `remark` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '备注',
  `status` int(2) NULL DEFAULT 0 COMMENT '状态',
  `is_top` int(2) NULL DEFAULT 0 COMMENT '是否置顶',
  `creator` bigint(20) NULL DEFAULT NULL COMMENT '创建用户ID',
  `create_time` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `modifier` bigint(255) NULL DEFAULT NULL COMMENT '最后修改人',
  `lmt` datetime(0) NULL DEFAULT NULL COMMENT '最后更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 11 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of pf_project
-- ----------------------------
INSERT INTO `pf_project` VALUES (1, 1, '/upload/85d7615ff6e34b32ad8086804a815857.png', '测试数据', '测试内容', '2023-04-12 00:00:00', '2023-04-12 00:00:00', -1, 'foiLSlpODEwEpnydBPvDydGXNLPlbVlWaVvLudWomGLtXZiEbs', 297948443, 1, 1, '2023-04-12 00:00:00', 1, '2023-04-12 00:00:00');
INSERT INTO `pf_project` VALUES (2, 1, '/upload/85d7615ff6e34b32ad8086804a815857.png', '测试数据', '测试内容', '2023-04-12 00:00:00', '2023-04-12 00:00:00', -1, 'zfGHnumKcRtbSQAeYOoWgDuLWYoiPYGYrGoYYAYbNVfIFNPQhD', 505856833, 1, 1, '2023-04-12 00:00:00', 1, '2023-04-12 00:00:00');
INSERT INTO `pf_project` VALUES (3, 1, '/upload/85d7615ff6e34b32ad8086804a815857.png', '测试数据', '测试内容', '2023-04-12 00:00:00', '2023-04-12 00:00:00', -1, 'KKESfEAyICWgMzBbiTgjjjyRKtiBsHeXylgcSbvhUOqjyvOjBQ', 405116567, 1, 1, '2023-04-12 00:00:00', 1, '2023-04-12 00:00:00');
INSERT INTO `pf_project` VALUES (4, 1, '/upload/85d7615ff6e34b32ad8086804a815857.png', '测试数据', '测试内容', '2023-04-12 00:00:00', '2023-04-12 00:00:00', -1, 'HQpWQePAGpwFQfOQyNmxitYBpteHpMKsCwBOZDJYIgDZoSNiOG', 1747237709, 1, 1, '2023-04-12 00:00:00', 1, '2023-04-12 00:00:00');
INSERT INTO `pf_project` VALUES (5, 1, '/upload/85d7615ff6e34b32ad8086804a815857.png', '测试数据', '测试内容', '2023-04-12 00:00:00', '2023-04-12 00:00:00', -1, 'FMwVkrjNugkFWUGpKQHbLOHIDqlPrtaOLfRNkthlAOGbxaNOgW', 670457468, 1, 1, '2023-04-12 00:00:00', 1, '2023-04-12 00:00:00');
INSERT INTO `pf_project` VALUES (6, 1, '/upload/85d7615ff6e34b32ad8086804a815857.png', '测试数据', '测试内容', '2023-04-12 00:00:00', '2023-04-12 00:00:00', -1, 'PPGKcOYpbcLxNVQbBLkcyBTGqwSpxFNbqfhfmupIUVZaHwVtpX', 184546751, 1, 1, '2023-04-12 00:00:00', 1, '2023-04-12 00:00:00');
INSERT INTO `pf_project` VALUES (7, 1, '/upload/85d7615ff6e34b32ad8086804a815857.png', '测试数据', '测试内容', '2023-04-12 00:00:00', '2023-04-12 00:00:00', -1, 'UEnvjeASZOXKNSfcNgmrPzfPDeeJTStmQDYCReFpXFDYZqqISO', 1821291858, 1, 1, '2023-04-12 00:00:00', 1, '2023-04-12 00:00:00');
INSERT INTO `pf_project` VALUES (8, 1, '/upload/85d7615ff6e34b32ad8086804a815857.png', '测试数据', '测试内容', '2023-04-12 00:00:00', '2023-04-12 00:00:00', -1, 'FwLpXUDOIHJNOumYJhmuzhEmNjfmvcMazTFTmFJXrVHFvPBflJ', 193918403, 1, 1, '2023-04-12 00:00:00', 1, '2023-04-12 00:00:00');
INSERT INTO `pf_project` VALUES (9, 1, '/upload/85d7615ff6e34b32ad8086804a815857.png', '测试数据', '<p>测试内容</p>', '2023-04-12 00:00:00', '2023-04-12 00:00:00', -1, 'AfOIagOltFfkQiLKdxJmzupVuygXfgFyDbdUVrGlEPztXVtrxP', 1025763587, 1, 1, '2023-04-12 00:00:00', 1, '2023-04-12 16:19:58');
INSERT INTO `pf_project` VALUES (10, 1, '/upload/85d7615ff6e34b32ad8086804a815857.png', '测试数据', '测试内容', '2023-04-12 00:00:00', '2023-04-12 00:00:00', -1, 'OTinYsUREbtcMeYqClYazuuQfyvAuLDcqBQzCGTwAtBYHbZqFJ', 1506381370, 1, 1, '2023-04-12 00:00:00', 1, '2023-04-12 00:00:00');

-- ----------------------------
-- Table structure for pf_talent
-- ----------------------------
DROP TABLE IF EXISTS `pf_talent`;
CREATE TABLE `pf_talent`  (
  `id` bigint(20) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT COMMENT '人才ID',
  `talent_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '姓名',
  `password` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '密码',
  `mobile` varchar(13) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '手机号',
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '邮箱',
  `status` int(1) NOT NULL DEFAULT 0 COMMENT '用户状态',
  `create_time` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `creator` bigint(20) NULL DEFAULT NULL COMMENT '创建人',
  `lmt` datetime(0) NULL DEFAULT NULL COMMENT '最后更新时间',
  `modifier` bigint(20) NULL DEFAULT NULL COMMENT '最后修改人',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of pf_talent
-- ----------------------------
INSERT INTO `pf_talent` VALUES (00000000000000000001, '裴文诗', '111111', '15091919602', '2296543112@qq.com', 0, '2023-03-04 15:56:50', 1, '2023-03-15 17:53:21', 1);
INSERT INTO `pf_talent` VALUES (00000000000000000002, '子叶', 'ziye1011', '15091919602', '2296543112@qq.com', 0, '2023-03-06 18:49:12', 1, '2023-03-15 17:53:32', 1);

-- ----------------------------
-- Table structure for role_menu
-- ----------------------------
DROP TABLE IF EXISTS `role_menu`;
CREATE TABLE `role_menu`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `role_id` bigint(20) NOT NULL COMMENT '角色ID',
  `menu_id` bigint(20) NOT NULL COMMENT '菜单ID',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 86 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of role_menu
-- ----------------------------
INSERT INTO `role_menu` VALUES (1, 1, 1);
INSERT INTO `role_menu` VALUES (3, 1, 10);
INSERT INTO `role_menu` VALUES (12, 1, 20);
INSERT INTO `role_menu` VALUES (19, 1, 12);
INSERT INTO `role_menu` VALUES (29, 1, 11);
INSERT INTO `role_menu` VALUES (30, 1, 23);
INSERT INTO `role_menu` VALUES (42, 1, 13);
INSERT INTO `role_menu` VALUES (43, 1, 14);
INSERT INTO `role_menu` VALUES (44, 1, 15);
INSERT INTO `role_menu` VALUES (45, 1, 21);
INSERT INTO `role_menu` VALUES (46, 1, 22);
INSERT INTO `role_menu` VALUES (47, 2, 2);
INSERT INTO `role_menu` VALUES (48, 2, 16);
INSERT INTO `role_menu` VALUES (49, 2, 17);
INSERT INTO `role_menu` VALUES (50, 2, 18);
INSERT INTO `role_menu` VALUES (51, 1, 2);
INSERT INTO `role_menu` VALUES (52, 1, 3);
INSERT INTO `role_menu` VALUES (53, 1, 16);
INSERT INTO `role_menu` VALUES (54, 1, 17);
INSERT INTO `role_menu` VALUES (55, 1, 18);
INSERT INTO `role_menu` VALUES (56, 1, 19);
INSERT INTO `role_menu` VALUES (57, 1, 24);
INSERT INTO `role_menu` VALUES (58, 1, 25);
INSERT INTO `role_menu` VALUES (59, 1, 29);
INSERT INTO `role_menu` VALUES (60, 1, 30);
INSERT INTO `role_menu` VALUES (61, 1, 31);
INSERT INTO `role_menu` VALUES (62, 1, 32);
INSERT INTO `role_menu` VALUES (63, 1, 33);
INSERT INTO `role_menu` VALUES (64, 1, 34);
INSERT INTO `role_menu` VALUES (65, 1, 35);
INSERT INTO `role_menu` VALUES (66, 1, 36);
INSERT INTO `role_menu` VALUES (67, 1, 37);
INSERT INTO `role_menu` VALUES (68, 1, 38);
INSERT INTO `role_menu` VALUES (69, 1, 39);
INSERT INTO `role_menu` VALUES (70, 1, 40);
INSERT INTO `role_menu` VALUES (71, 1, 41);
INSERT INTO `role_menu` VALUES (72, 1, 42);
INSERT INTO `role_menu` VALUES (73, 1, 43);
INSERT INTO `role_menu` VALUES (74, 1, 44);
INSERT INTO `role_menu` VALUES (75, 1, 45);
INSERT INTO `role_menu` VALUES (76, 1, 46);
INSERT INTO `role_menu` VALUES (77, 1, 47);
INSERT INTO `role_menu` VALUES (78, 1, 48);
INSERT INTO `role_menu` VALUES (79, 1, 49);
INSERT INTO `role_menu` VALUES (80, 1, 50);
INSERT INTO `role_menu` VALUES (81, 1, 51);
INSERT INTO `role_menu` VALUES (82, 1, 52);
INSERT INTO `role_menu` VALUES (83, 1, 53);
INSERT INTO `role_menu` VALUES (84, 1, 54);
INSERT INTO `role_menu` VALUES (85, 1, 55);

-- ----------------------------
-- Table structure for role_user
-- ----------------------------
DROP TABLE IF EXISTS `role_user`;
CREATE TABLE `role_user`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `role_id` bigint(20) NULL DEFAULT NULL COMMENT '角色ID',
  `user_id` bigint(20) NULL DEFAULT NULL COMMENT '用户ID',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 17 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of role_user
-- ----------------------------
INSERT INTO `role_user` VALUES (1, 1, 1);
INSERT INTO `role_user` VALUES (2, 2, 2);
INSERT INTO `role_user` VALUES (15, 2, 6);
INSERT INTO `role_user` VALUES (16, 2, 5);

-- ----------------------------
-- Table structure for sys_config
-- ----------------------------
DROP TABLE IF EXISTS `sys_config`;
CREATE TABLE `sys_config`  (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '字典名称',
  `key` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '字典键名',
  `value` varchar(5000) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '字典键值',
  `builtIn` int(2) NULL DEFAULT NULL COMMENT '系统内置',
  `remark` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' COMMENT '备注',
  `create_time` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_config
-- ----------------------------
INSERT INTO `sys_config` VALUES (1, '登录验证窗口', 'loginVaildation', '0', 0, '', '2022-11-09 13:58:15');
INSERT INTO `sys_config` VALUES (2, '测试', 'test', 'false', 1, '', NULL);

-- ----------------------------
-- Table structure for sys_dict
-- ----------------------------
DROP TABLE IF EXISTS `sys_dict`;
CREATE TABLE `sys_dict`  (
  `id` bigint(6) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '字典名称',
  `type` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '字典类型',
  `key` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '字典键名',
  `value` varchar(5000) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '字典键值',
  `remark` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' COMMENT '备注',
  `status` int(2) NULL DEFAULT NULL COMMENT '状态',
  `order_index` int(10) NULL DEFAULT 0 COMMENT '排序字段',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_dict
-- ----------------------------
INSERT INTO `sys_dict` VALUES (000001, '状态', 'system_status', '0', '正常', '', 0, 1);
INSERT INTO `sys_dict` VALUES (000003, '状态', 'system_status', '1', '停用', '', 0, 2);
INSERT INTO `sys_dict` VALUES (000005, '菜单显示', 'system_menu_show', '0', '显示', '', 0, 1);
INSERT INTO `sys_dict` VALUES (000006, '菜单显示', 'system_menu_show', '1', '隐藏', '', 0, 2);
INSERT INTO `sys_dict` VALUES (000007, '报名状态', 'pf_apply_status', '0', '审核中', '', 0, 2);
INSERT INTO `sys_dict` VALUES (000008, '报名状态', 'pf_apply_status', '1', '审核通过', '', 0, 3);
INSERT INTO `sys_dict` VALUES (000009, '报名状态', 'pf_apply_status', '-1', '审核不通过', '', 0, 1);
INSERT INTO `sys_dict` VALUES (000010, '项目状态', 'pf_project_status', '1', '下架中', '', 0, 2);
INSERT INTO `sys_dict` VALUES (000011, '项目状态', 'pf_project_status', '0', '发布中', '', 0, 1);
INSERT INTO `sys_dict` VALUES (000012, '新闻状态', 'pf_news_status', '0', '发布中', '', 0, 1);
INSERT INTO `sys_dict` VALUES (000013, '新闻状态', 'pf_news_status', '1', '下架中', '', 0, 2);

-- ----------------------------
-- Table structure for sys_menu
-- ----------------------------
DROP TABLE IF EXISTS `sys_menu`;
CREATE TABLE `sys_menu`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `parent` bigint(255) NOT NULL COMMENT '父级菜单ID',
  `type` int(2) NOT NULL DEFAULT 0 COMMENT '菜单类型',
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '菜单名称',
  `icon` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '菜单图标',
  `path` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '路由地址',
  `code` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '权限标识',
  `order_index` int(2) NULL DEFAULT 0 COMMENT '显示顺序',
  `status` int(2) NULL DEFAULT 0 COMMENT '菜单状态',
  `show` int(2) NULL DEFAULT 0 COMMENT '菜单显示',
  `creator` bigint(20) NULL DEFAULT NULL COMMENT '创建人',
  `create_time` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `lmt` datetime(0) NULL DEFAULT NULL COMMENT '最后更新时间',
  `modifier` bigint(2) NULL DEFAULT NULL COMMENT '最后修改人',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 56 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_menu
-- ----------------------------
INSERT INTO `sys_menu` VALUES (1, 0, 0, '系统管理', 'SettingOutlined', '/system', NULL, 1, 0, 0, 1, '2022-11-01 17:16:59', '2023-03-23 16:57:15', 1);
INSERT INTO `sys_menu` VALUES (2, 0, 0, '系统监控', 'FundProjectionScreenOutlined', '/monitor', NULL, 2, 0, 0, 1, '2022-11-01 19:20:43', '2023-03-23 16:57:17', 1);
INSERT INTO `sys_menu` VALUES (10, 1, 1, '用户管理', 'UserOutlined', '/system/user', 'system:user:list', 1, 0, 0, 1, '2022-11-01 17:17:44', '2022-11-01 17:17:46', 1);
INSERT INTO `sys_menu` VALUES (11, 1, 1, '角色管理', 'TeamOutlined', '/system/role', 'system:role:list', 2, 0, 0, 1, '2022-11-01 18:08:05', '2022-11-01 17:17:01', 1);
INSERT INTO `sys_menu` VALUES (12, 1, 1, '菜单管理', 'ApartmentOutlined', '/system/menu', 'system:menu:list', 3, 0, 0, 1, '2022-11-01 18:08:58', '2022-11-01 17:17:01', 1);
INSERT INTO `sys_menu` VALUES (13, 1, 1, '字典管理', 'ReadOutlined', '/system/dict', 'system:dict:list', 4, 0, 0, 1, '2022-11-01 19:19:11', '2022-11-01 17:17:01', 1);
INSERT INTO `sys_menu` VALUES (14, 1, 1, '参数设置', 'FormOutlined', '/system/config', 'system:config:list', 5, 1, 1, 1, '2022-11-01 19:19:37', '2022-11-01 17:17:01', 1);
INSERT INTO `sys_menu` VALUES (15, 1, 1, '登录日志', 'ProfileOutlined', '/system/log-info', 'system:loginLog:list', 6, 0, 0, 1, '2022-11-01 19:20:22', '2022-11-01 17:17:01', 1);
INSERT INTO `sys_menu` VALUES (16, 2, 1, '在线用户', 'WifiOutlined', '/monitor/online', 'monitor:online:list', 1, 1, 0, 1, '2022-11-01 19:21:05', '2022-11-01 17:17:01', 1);
INSERT INTO `sys_menu` VALUES (17, 2, 1, '服务监控', 'FundOutlined', '/monitor/server', 'monitor:server:list', 2, 0, 0, 1, '2022-11-01 19:21:33', '2022-11-01 17:17:01', 1);
INSERT INTO `sys_menu` VALUES (18, 2, 1, '缓存监控', 'SlidersOutlined', '/monitor/cache', 'monitor:cache:list', 3, 0, 0, 1, '2022-11-01 19:21:58', '2022-11-01 17:17:01', 1);
INSERT INTO `sys_menu` VALUES (19, 3, 1, '人才库', 'ApiOutlined', '/enroll/user', 'enroll:user:list', 1, 0, 0, 1, '2022-12-07 19:53:16', '2022-12-09 21:40:37', 1);
INSERT INTO `sys_menu` VALUES (20, 10, 2, '添加用户', 'UserAddOutlined', '/system/user/insert', 'system:user:insert', 2, 0, 0, 1, '2022-12-07 19:59:43', '2022-12-15 19:50:32', 1);
INSERT INTO `sys_menu` VALUES (21, 10, 2, '修改用户', 'EditOutlined', '/system/user/update', 'system:user:update', 3, 0, 0, 1, '2022-12-07 20:01:10', '2022-12-15 19:50:36', 1);
INSERT INTO `sys_menu` VALUES (22, 10, 2, '删除用户', 'UserDeleteOutlined', '/system/user/delete', 'system:user:delete', 4, 0, 0, 1, '2022-12-07 21:21:41', '2022-12-15 19:50:41', 1);
INSERT INTO `sys_menu` VALUES (23, 11, 2, '添加角色', 'PlusOutlined', '/system/role/insert', 'system:role:insert', 2, 0, 0, 1, '2022-12-07 21:22:26', '2022-12-20 18:29:47', 1);
INSERT INTO `sys_menu` VALUES (24, 3, 1, '栏目管理', 'UnorderedListOutlined', '/enroll/column/list', 'enroll:column:list', 2, 0, 0, 1, '2022-12-09 21:40:03', '2022-12-09 21:40:40', 1);
INSERT INTO `sys_menu` VALUES (25, 11, 2, '修改角色', 'EditOutlined', '/system/role/update', 'system:role:update', 3, 0, 0, 1, '2022-12-09 21:44:17', '2022-12-20 18:11:00', 1);
INSERT INTO `sys_menu` VALUES (29, 3, 1, '项目管理', 'AccountBookOutlined', '/enroll/project/list', 'enroll:project:list', 3, 0, 0, 1, '2022-12-09 22:25:40', '2022-12-09 22:25:52', 1);
INSERT INTO `sys_menu` VALUES (30, 10, 2, '导出数据', 'ExportOutlined', '/system/user/export', 'system:user:export', 5, 0, 0, 1, '2022-12-15 18:35:13', '2022-12-15 19:50:46', 1);
INSERT INTO `sys_menu` VALUES (31, 10, 2, '查看详情', 'UserOutlined', '/system/user/select', 'system:user:select', 1, 0, 0, 1, '2022-12-15 19:50:20', '2022-12-15 19:58:30', 1);
INSERT INTO `sys_menu` VALUES (32, 11, 2, '删除角色', 'DeleteOutlined', '/system/role/delete', 'system:role:delete', 4, 0, 0, 1, '2022-12-20 18:07:42', '2022-12-20 18:11:12', 1);
INSERT INTO `sys_menu` VALUES (33, 12, 2, '添加菜单', 'PlusOutlined', '/system/menu/insert', 'system:menu:insert', 2, 0, 0, 1, '2022-12-20 18:28:00', NULL, NULL);
INSERT INTO `sys_menu` VALUES (34, 12, 2, '修改菜单', 'EditOutlined', '/system/menu/update', 'system:menu:update', 3, 0, 0, 1, '2022-12-20 18:30:56', NULL, NULL);
INSERT INTO `sys_menu` VALUES (35, 12, 2, '删除菜单', 'DeleteOutlined', '/system/menu/delete', 'system:menu:delete', 4, 0, 0, 1, '2022-12-20 18:31:40', NULL, NULL);
INSERT INTO `sys_menu` VALUES (36, 13, 2, '添加字典', 'PlusOutlined', '/system/dict/insert', 'system:dict:insert', 2, 0, 0, 1, '2022-12-20 18:32:55', NULL, NULL);
INSERT INTO `sys_menu` VALUES (37, 13, 2, '修改字典', 'EditOutlined', '/system/dict/update', 'system:dict:update', 3, 0, 0, 1, '2022-12-20 19:26:58', '2022-12-20 19:27:32', 1);
INSERT INTO `sys_menu` VALUES (38, 13, 2, '删除字典', 'DeleteOutlined', '/system/dict/delete', 'system:dict:delete', 4, 0, 0, 1, '2022-12-20 19:27:28', '2022-12-20 19:28:08', 1);
INSERT INTO `sys_menu` VALUES (39, 14, 2, '添加参数', 'PlusOutlined', '/system/config/insert', 'system:config:insert', 2, 0, 0, 1, '2022-12-20 19:28:41', '2022-12-20 19:30:49', 1);
INSERT INTO `sys_menu` VALUES (40, 14, 2, '修改参数', 'EditOutlined', '/system/config/update', 'system:config:update', 3, 0, 0, 1, '2022-12-20 19:29:05', NULL, NULL);
INSERT INTO `sys_menu` VALUES (41, 14, 2, '删除参数', 'DeleteOutlined', '/system/config/delete', 'system:config:delete', 4, 0, 0, 1, '2022-12-20 19:29:26', NULL, NULL);
INSERT INTO `sys_menu` VALUES (42, 15, 2, '删除日志', 'DeleteOutlined', '/system/log-info/delete', 'system:log-info:delete', 4, 0, 0, 1, '2022-12-20 19:30:26', NULL, NULL);
INSERT INTO `sys_menu` VALUES (43, 15, 2, '导出数据', 'ExportOutlined', '/system/log-info/export', 'system:log-info:export', 5, 0, 0, 1, '2022-12-20 19:46:55', NULL, NULL);
INSERT INTO `sys_menu` VALUES (44, 14, 2, '导出数据 ', 'ExportOutlined', '/system/config/export', 'system:config:export', 5, 0, 0, 1, '2022-12-20 19:47:47', NULL, NULL);
INSERT INTO `sys_menu` VALUES (45, 13, 2, '导出数据', 'ExportOutlined', '/system/dict/export', 'system:dict:export', 5, 0, 0, 1, '2022-12-20 19:48:15', NULL, NULL);
INSERT INTO `sys_menu` VALUES (46, 11, 2, '导出数据', 'ExportOutlined', '/system/role/export', 'system:role:export', 5, 0, 0, 1, '2022-12-20 19:48:54', NULL, NULL);
INSERT INTO `sys_menu` VALUES (47, 0, 0, '报名管理', 'AccountBookOutlined', '/pf', NULL, 2, 0, 0, 1, '2023-03-09 19:04:13', NULL, NULL);
INSERT INTO `sys_menu` VALUES (48, 47, 1, '新闻管理', 'BookOutlined', '/pf/news', 'pf:news:list', 1, 0, 0, 1, '2023-03-09 19:06:14', NULL, NULL);
INSERT INTO `sys_menu` VALUES (49, 47, 1, '栏目管理', 'AimOutlined', '/pf/category', 'pf:category:list', 3, 0, 0, 1, '2023-03-09 19:21:34', '2023-03-09 19:23:57', 1);
INSERT INTO `sys_menu` VALUES (50, 47, 1, '人才管理', 'AimOutlined', '/pf/talent', 'pf:talent:list', 2, 0, 0, 1, '2023-03-09 19:24:30', NULL, NULL);
INSERT INTO `sys_menu` VALUES (51, 47, 1, '项目管理', 'AimOutlined', '/pf/project', 'pf:project:list', 4, 0, 0, 1, '2023-03-09 19:24:55', '2023-03-09 19:25:08', 1);
INSERT INTO `sys_menu` VALUES (53, 51, 1, '添加项目', 'AimOutlined', '/pf/project/add', 'pf:project:add', 1, 0, 1, 1, '2023-03-10 23:39:19', '2023-03-11 00:11:07', 1);
INSERT INTO `sys_menu` VALUES (54, 47, 1, '申请管理', 'AimOutlined', '/pf/apply', 'pf:apply:list', 5, 0, 0, 1, '2023-03-15 19:05:44', NULL, NULL);
INSERT INTO `sys_menu` VALUES (55, 11, 1, '分配用户', 'AimOutlined', '/system/role/assgin/user', 'system:role:assgin:user:list', 6, 0, 1, 1, '2023-03-21 14:31:03', NULL, NULL);

-- ----------------------------
-- Table structure for sys_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_role`;
CREATE TABLE `sys_role`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '角色名称',
  `code` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '权限标识',
  `order_index` int(10) NULL DEFAULT NULL COMMENT '排序字段',
  `status` int(2) NULL DEFAULT 0 COMMENT '状态',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '备注',
  `create_user` bigint(20) NULL DEFAULT NULL COMMENT '角色创建人',
  `create_time` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '创建时间',
  `update_time` datetime(0) NULL DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `uq_role_name`(`name`) USING BTREE,
  UNIQUE INDEX `uq_role_code`(`code`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_role
-- ----------------------------
INSERT INTO `sys_role` VALUES (1, '超级管理员', 'admin', 1, 0, NULL, 1, '2022-11-01 01:07:59', '2022-12-09 21:18:59');
INSERT INTO `sys_role` VALUES (2, '普通用户', 'user', 2, 0, NULL, 1, '2022-11-01 11:31:22', '2023-03-23 17:26:53');

-- ----------------------------
-- Table structure for sys_user
-- ----------------------------
DROP TABLE IF EXISTS `sys_user`;
CREATE TABLE `sys_user`  (
  `id` bigint(20) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT,
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '头像',
  `username` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '姓名',
  `password` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '密码',
  `nickname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '用户昵称',
  `mobile` varchar(13) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '手机号',
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '邮箱',
  `status` int(1) NOT NULL DEFAULT 0 COMMENT '用户状态',
  `create_time` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `creator` bigint(20) NULL DEFAULT NULL COMMENT '创建人',
  `lmt` datetime(0) NULL DEFAULT NULL COMMENT '最后更新时间',
  `modifier` bigint(20) NOT NULL COMMENT '最后修改人',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `uq_user_username`(`username`) USING BTREE,
  UNIQUE INDEX `uq_user_mobile`(`mobile`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = 'SSO用户' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_user
-- ----------------------------
INSERT INTO `sys_user` VALUES (00000000000000000001, '/upload/6c196d4c3768490ca85d5c57455f1764.png', 'ziye', '1d15950ac5287d10472790c1d6101c89', 'ziye', '15013861386', '2296543112@qq.com', 0, '2022-10-31 21:35:13', NULL, '2023-04-12 17:16:27', 1);
INSERT INTO `sys_user` VALUES (00000000000000000002, '/upload/6c196d4c3768490ca85d5c57455f1764.png', 'admin', 'b5b728f311b568000ffd2aac7a78bc25', '管理员', '15091919602', '2296543112@qq.com', 0, '2022-11-03 20:52:31', NULL, '2022-12-15 18:18:44', 1);
INSERT INTO `sys_user` VALUES (00000000000000000003, '/upload/6c196d4c3768490ca85d5c57455f1764.png', 'test', '336a8c706f54a9e7fc1e61920353bca6', '测试', '15099999999', NULL, 0, '2023-03-21 11:50:10', 1, '2023-03-21 11:50:10', 1);
INSERT INTO `sys_user` VALUES (00000000000000000004, '/upload/6c196d4c3768490ca85d5c57455f1764.png', 'liuyj', '95d3403105f902904ccf03bb8e5cdb58', 'liuyj', '15092222222', NULL, 0, '2023-03-21 11:52:19', 1, '2023-03-23 16:53:55', 1);
INSERT INTO `sys_user` VALUES (00000000000000000005, '/upload/6c196d4c3768490ca85d5c57455f1764.png', 'zhong', '4fd6e788ca14e6b34f237eff1f435b17', 'zhong', '15099999997', NULL, 0, '2023-03-21 11:58:14', 1, '2023-03-23 16:53:53', 1);
INSERT INTO `sys_user` VALUES (00000000000000000006, '/upload/6c196d4c3768490ca85d5c57455f1764.png', 'zhang', '05f12742ae69c85e88dc1be5c9150699', 'zhang', '13622222454', NULL, 0, '2023-03-21 19:08:14', 1, '2023-03-23 17:30:32', 1);

-- ----------------------------
-- Table structure for user_login
-- ----------------------------
DROP TABLE IF EXISTS `user_login`;
CREATE TABLE `user_login`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) NOT NULL COMMENT '用户ID',
  `token` varchar(1000) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'token',
  `address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '登录地址',
  `place` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '登录地点',
  `browser` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '浏览器',
  `system` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '操作系统',
  `status` int(2) NULL DEFAULT NULL COMMENT '登录状态',
  `login_time` datetime(0) NOT NULL COMMENT '登录时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 340 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_login
-- ----------------------------
INSERT INTO `user_login` VALUES (186, 1, NULL, '0:0:0:0:0:0:0:1', NULL, 'CHROME10', 'Windows 10', 0, '2022-12-12 20:48:04');
INSERT INTO `user_login` VALUES (187, 1, NULL, '0:0:0:0:0:0:0:1', NULL, 'CHROME10', 'Windows 10', 0, '2022-12-12 21:08:42');
INSERT INTO `user_login` VALUES (188, 2, NULL, '0:0:0:0:0:0:0:1', NULL, 'CHROME10', 'Windows 10', 0, '2022-12-12 21:10:53');
INSERT INTO `user_login` VALUES (189, 2, NULL, '0:0:0:0:0:0:0:1', NULL, 'CHROME10', 'Windows 10', 0, '2022-12-12 21:18:56');
INSERT INTO `user_login` VALUES (190, 1, NULL, '0:0:0:0:0:0:0:1', NULL, 'CHROME10', 'Windows 10', 0, '2022-12-12 21:28:52');
INSERT INTO `user_login` VALUES (191, 1, NULL, '0:0:0:0:0:0:0:1', NULL, 'CHROME10', 'Windows 10', 0, '2022-12-12 21:29:31');
INSERT INTO `user_login` VALUES (192, 1, NULL, '0:0:0:0:0:0:0:1', NULL, 'CHROME10', 'Windows 10', 0, '2022-12-12 21:29:55');
INSERT INTO `user_login` VALUES (193, 1, NULL, '0:0:0:0:0:0:0:1', NULL, 'CHROME10', 'Windows 10', 0, '2022-12-12 23:08:39');
INSERT INTO `user_login` VALUES (194, 1, NULL, '0:0:0:0:0:0:0:1', NULL, 'CHROME10', 'Windows 10', 0, '2022-12-12 23:10:24');
INSERT INTO `user_login` VALUES (195, 1, NULL, '0:0:0:0:0:0:0:1', NULL, 'CHROME10', 'Windows 10', 0, '2022-12-12 23:10:52');
INSERT INTO `user_login` VALUES (196, 1, NULL, '0:0:0:0:0:0:0:1', NULL, 'CHROME10', 'Windows 10', 0, '2022-12-12 23:14:43');
INSERT INTO `user_login` VALUES (197, 1, NULL, '0:0:0:0:0:0:0:1', NULL, 'CHROME10', 'Windows 10', 0, '2022-12-12 23:24:32');
INSERT INTO `user_login` VALUES (198, 1, NULL, '0:0:0:0:0:0:0:1', NULL, 'CHROME10', 'Windows 10', 0, '2022-12-12 23:32:14');
INSERT INTO `user_login` VALUES (199, 1, NULL, '0:0:0:0:0:0:0:1', NULL, 'CHROME10', 'Windows 10', 0, '2022-12-12 23:32:41');
INSERT INTO `user_login` VALUES (200, 1, NULL, '0:0:0:0:0:0:0:1', NULL, 'CHROME10', 'Windows 10', 0, '2022-12-12 23:33:22');
INSERT INTO `user_login` VALUES (201, 1, NULL, '0:0:0:0:0:0:0:1', NULL, 'CHROME10', 'Windows 10', 0, '2022-12-12 23:49:39');
INSERT INTO `user_login` VALUES (202, 1, NULL, '0:0:0:0:0:0:0:1', NULL, 'CHROME10', 'Windows 10', 0, '2022-12-12 23:50:11');
INSERT INTO `user_login` VALUES (203, 1, NULL, '0:0:0:0:0:0:0:1', NULL, 'CHROME10', 'Windows 10', 0, '2022-12-12 23:51:23');
INSERT INTO `user_login` VALUES (204, 1, NULL, '0:0:0:0:0:0:0:1', NULL, 'CHROME10', 'Windows 10', 0, '2022-12-12 23:52:55');
INSERT INTO `user_login` VALUES (205, 1, NULL, '0:0:0:0:0:0:0:1', NULL, 'CHROME10', 'Windows 10', 0, '2022-12-13 00:27:04');
INSERT INTO `user_login` VALUES (206, 1, NULL, '0:0:0:0:0:0:0:1', NULL, 'CHROME10', 'Windows 10', 0, '2022-12-13 00:31:58');
INSERT INTO `user_login` VALUES (207, 1, NULL, '0:0:0:0:0:0:0:1', NULL, 'CHROME10', 'Windows 10', 0, '2022-12-13 00:37:57');
INSERT INTO `user_login` VALUES (208, 1, NULL, '0:0:0:0:0:0:0:1', NULL, 'CHROME10', 'Windows 10', 0, '2022-12-13 13:35:34');
INSERT INTO `user_login` VALUES (209, 1, NULL, '0:0:0:0:0:0:0:1', NULL, 'CHROME10', 'Windows 10', 0, '2022-12-13 15:20:07');
INSERT INTO `user_login` VALUES (210, 1, NULL, '0:0:0:0:0:0:0:1', NULL, 'CHROME10', 'Windows 10', 0, '2022-12-13 15:20:07');
INSERT INTO `user_login` VALUES (211, 1, NULL, '0:0:0:0:0:0:0:1', NULL, 'CHROME10', 'Windows 10', 0, '2022-12-13 15:21:29');
INSERT INTO `user_login` VALUES (212, 1, NULL, '0:0:0:0:0:0:0:1', NULL, 'CHROME10', 'Windows 10', 0, '2022-12-13 19:49:30');
INSERT INTO `user_login` VALUES (213, 1, NULL, '0:0:0:0:0:0:0:1', NULL, 'CHROME10', 'Windows 10', 0, '2022-12-14 11:27:22');
INSERT INTO `user_login` VALUES (214, 1, NULL, '0:0:0:0:0:0:0:1', NULL, 'CHROME10', 'Windows 10', 0, '2022-12-14 20:34:29');
INSERT INTO `user_login` VALUES (215, 1, NULL, '0:0:0:0:0:0:0:1', NULL, 'CHROME10', 'Windows 10', 0, '2022-12-14 20:36:36');
INSERT INTO `user_login` VALUES (216, 2, NULL, '0:0:0:0:0:0:0:1', NULL, 'CHROME10', 'Windows 10', 0, '2022-12-14 22:42:39');
INSERT INTO `user_login` VALUES (217, 2, NULL, '0:0:0:0:0:0:0:1', NULL, 'CHROME10', 'Windows 10', 0, '2022-12-14 22:43:50');
INSERT INTO `user_login` VALUES (218, 2, NULL, '0:0:0:0:0:0:0:1', NULL, 'CHROME10', 'Windows 10', 0, '2022-12-14 22:45:54');
INSERT INTO `user_login` VALUES (219, 2, NULL, '0:0:0:0:0:0:0:1', NULL, 'CHROME10', 'Windows 10', 0, '2022-12-14 22:49:26');
INSERT INTO `user_login` VALUES (220, 1, NULL, '0:0:0:0:0:0:0:1', NULL, 'CHROME10', 'Windows 10', 0, '2022-12-15 16:58:28');
INSERT INTO `user_login` VALUES (221, 1, NULL, '0:0:0:0:0:0:0:1', NULL, 'CHROME10', 'Windows 10', 0, '2022-12-15 23:57:34');
INSERT INTO `user_login` VALUES (222, 1, NULL, '0:0:0:0:0:0:0:1', NULL, 'CHROME10', 'Windows 10', 0, '2022-12-16 00:11:32');
INSERT INTO `user_login` VALUES (223, 1, NULL, '0:0:0:0:0:0:0:1', NULL, 'CHROME10', 'Windows 10', 0, '2022-12-16 00:12:13');
INSERT INTO `user_login` VALUES (224, 1, NULL, '0:0:0:0:0:0:0:1', NULL, 'CHROME10', 'Windows 10', 0, '2022-12-16 11:35:40');
INSERT INTO `user_login` VALUES (225, 1, NULL, '0:0:0:0:0:0:0:1', NULL, 'CHROME10', 'Windows 10', 0, '2022-12-16 12:10:44');
INSERT INTO `user_login` VALUES (226, 1, NULL, '0:0:0:0:0:0:0:1', NULL, 'CHROME10', 'Windows 10', 0, '2022-12-16 13:15:56');
INSERT INTO `user_login` VALUES (227, 2, NULL, '0:0:0:0:0:0:0:1', NULL, 'CHROME10', 'Windows 10', 0, '2022-12-16 13:38:50');
INSERT INTO `user_login` VALUES (228, 2, NULL, '0:0:0:0:0:0:0:1', NULL, 'CHROME10', 'Windows 10', 0, '2022-12-16 13:41:34');
INSERT INTO `user_login` VALUES (229, 2, 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NzExNzE4NDEsInVzZXJJZCI6MiwiaWF0IjoxNjcxMTcwMDQxfQ.m_lxsjzfbWsqALGuzZ5gUGnriEoMmPdwwYpsTtazpMU', '0:0:0:0:0:0:0:1', NULL, 'CHROME10', 'Windows 10', 0, '2022-12-16 13:54:02');
INSERT INTO `user_login` VALUES (230, 1, 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NzExNzIzMzIsInVzZXJJZCI6MSwiaWF0IjoxNjcxMTcwNTMyfQ.e0MsOI9raw_NiJQggQSZqsT6TRw7IRYBQCnf1tvQFOc', '0:0:0:0:0:0:0:1', NULL, 'CHROME10', 'Windows 10', 1, '2022-12-16 14:02:13');
INSERT INTO `user_login` VALUES (231, 1, 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NzExNzQ2MDIsInVzZXJJZCI6MSwiaWF0IjoxNjcxMTcyODAyfQ.UmnbywLoj0y66K_djfkhOYEkprhJh9O48tNa7dNiTa0', '0:0:0:0:0:0:0:1', NULL, 'CHROME10', 'Windows 10', 1, '2022-12-16 14:40:03');
INSERT INTO `user_login` VALUES (232, 1, 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NzExNzY2MDMsInVzZXJJZCI6MSwiaWF0IjoxNjcxMTc0ODAzfQ.JhTOwMZ74if7HHXUdXj9zhnkxK-DvtEKzXwVcN_dqf4', '0:0:0:0:0:0:0:1', NULL, 'CHROME10', 'Windows 10', 1, '2022-12-16 15:13:23');
INSERT INTO `user_login` VALUES (233, 1, 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NzExNzg4NzAsInVzZXJJZCI6MSwiaWF0IjoxNjcxMTc3MDcwfQ.AqUdWrYa11C2-jYMnxEUeLmSebsceNL3Df7VTB8TyNw', '0:0:0:0:0:0:0:1', NULL, 'CHROME10', 'Windows 10', 1, '2022-12-16 15:51:11');
INSERT INTO `user_login` VALUES (234, 2, 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NzExNzg5MDAsInVzZXJJZCI6MiwiaWF0IjoxNjcxMTc3MTAwfQ.gKXnwS_O_XBAWuqooc0OD7hpObppe3Me8-NI4qOVPVI', '0:0:0:0:0:0:0:1', NULL, 'CHROME10', 'Windows 10', 0, '2022-12-16 15:51:40');
INSERT INTO `user_login` VALUES (235, 1, 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NzExOTE2NjEsInVzZXJJZCI6MSwiaWF0IjoxNjcxMTg5ODYxfQ.vvfiePz1wPZS9Fy0Hw2udclccdc4KpQDRGtdQETioiY', '0:0:0:0:0:0:0:1', NULL, 'CHROME10', 'Windows 10', 1, '2022-12-16 19:24:21');
INSERT INTO `user_login` VALUES (236, 1, 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NzE1MzIxNTMsInVzZXJJZCI6MSwiaWF0IjoxNjcxNTMwMzUzfQ.S2KkV0X2tTpd_J6KXIuYLeCsUuaSyL2iUqi-0qD2uus', '0:0:0:0:0:0:0:1', NULL, 'CHROME10', 'Windows 10', 0, '2022-12-20 17:59:13');
INSERT INTO `user_login` VALUES (237, 2, 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NzE1MzI3NzMsInVzZXJJZCI6MiwiaWF0IjoxNjcxNTMwOTczfQ.iBUfzW1ox1SJA82a_HZWk5bnDFAzZSdoIJWfwkR8IAM', '0:0:0:0:0:0:0:1', NULL, 'CHROME10', 'Windows 10', 0, '2022-12-20 18:09:33');
INSERT INTO `user_login` VALUES (238, 1, 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NzE1MzM5NzEsInVzZXJJZCI6MSwiaWF0IjoxNjcxNTMyMTcxfQ.LoHJrFZ9Foy8P8AhFTzg6vcsL41OwIDMy2qlqJOWx9c', '0:0:0:0:0:0:0:1', NULL, 'CHROME10', 'Windows 10', 1, '2022-12-20 18:29:31');
INSERT INTO `user_login` VALUES (239, 1, 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NzE1MzY1NTAsInVzZXJJZCI6MSwiaWF0IjoxNjcxNTM0NzUwfQ.2k8ErqVS8MRx9JtHCCEseiUnIAGID-IbyaiK6U-Neh8', '0:0:0:0:0:0:0:1', NULL, 'CHROME10', 'Windows 10', 1, '2022-12-20 19:12:30');
INSERT INTO `user_login` VALUES (240, 1, 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NzE1MzgzNDksInVzZXJJZCI6MSwiaWF0IjoxNjcxNTM2NTQ5fQ.cTzqPsR27fUzKB1LsouNQiC7M9itd2tcwXA3IUpDx5Y', '0:0:0:0:0:0:0:1', NULL, 'CHROME10', 'Windows 10', 1, '2022-12-20 19:42:29');
INSERT INTO `user_login` VALUES (241, 1, 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NzE1NDAxNzUsInVzZXJJZCI6MSwiaWF0IjoxNjcxNTM4Mzc1fQ.NFkIloZL_T7J93nfqvIqlPsWWNQJyfwsaZOh03BaME0', '0:0:0:0:0:0:0:1', NULL, 'CHROME10', 'Windows 10', 1, '2022-12-20 20:12:56');
INSERT INTO `user_login` VALUES (242, 1, 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NzE1NDIzNzMsInVzZXJJZCI6MSwiaWF0IjoxNjcxNTQwNTczfQ.lVxLJcXMKo_KY0CVHMgNUkbYE2gBQjA_YVrm4fZ617M', '0:0:0:0:0:0:0:1', NULL, 'CHROME10', 'Windows 10', 1, '2022-12-20 20:49:33');
INSERT INTO `user_login` VALUES (243, 1, 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NzE2MjUzMTgsInVzZXJJZCI6MSwiaWF0IjoxNjcxNjIzNTE4fQ.68WAbp3A_6-lQtuPXwYcr25NSe5cf9_124A59eWCQp0', '0:0:0:0:0:0:0:1', NULL, 'CHROME10', 'Windows 10', 0, '2022-12-21 19:51:58');
INSERT INTO `user_login` VALUES (244, 1, 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2Nzc5MDM3MDksInVzZXJJZCI6MSwiaWF0IjoxNjc3OTAxOTA5fQ.k-m0cEdF06dgkRhzjfVF0Jqfg7hwgQf2lKWSpXlNkpo', '0:0:0:0:0:0:0:1', NULL, 'CHROME11', 'Windows 10', 0, '2023-03-04 11:51:49');
INSERT INTO `user_login` VALUES (245, 2, 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2Nzc5MDM3ODcsInVzZXJJZCI6MiwiaWF0IjoxNjc3OTAxOTg3fQ.3sPCLGl2Pm3AxRpeojSUn-I5gSAMXpqVx4CzHpEw-qo', '0:0:0:0:0:0:0:1', NULL, 'CHROME11', 'Windows 10', 0, '2023-03-04 11:53:07');
INSERT INTO `user_login` VALUES (246, 1, 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2Nzc5MDM4MTUsInVzZXJJZCI6MSwiaWF0IjoxNjc3OTAyMDE1fQ.Hv7r5tel3669I5GLIvQt7WU4zl8gNIqWL7iM1RkiVgM', '0:0:0:0:0:0:0:1', NULL, 'CHROME11', 'Windows 10', 0, '2023-03-04 11:53:36');
INSERT INTO `user_login` VALUES (247, 2, 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2Nzc5MDM4NTUsInVzZXJJZCI6MiwiaWF0IjoxNjc3OTAyMDU1fQ.gu0nrCzNijOocYqXxKzOsW26ny241BBreKNJKfYlF2U', '0:0:0:0:0:0:0:1', NULL, 'CHROME11', 'Windows 10', 0, '2023-03-04 11:54:16');
INSERT INTO `user_login` VALUES (248, 1, 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2Nzc5MDM4OTEsInVzZXJJZCI6MSwiaWF0IjoxNjc3OTAyMDkxfQ.nh5U5qI2LO3AU060Zd3HebbIydoeyPrGkHTIJAHmSdQ', '0:0:0:0:0:0:0:1', NULL, 'CHROME11', 'Windows 10', 0, '2023-03-04 11:54:51');
INSERT INTO `user_login` VALUES (249, 1, 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2Nzc5MTM3MDEsInVzZXJJZCI6MSwiaWF0IjoxNjc3OTExOTAxfQ.DpikJc67MxIH_jg2uInx9YclfcxePhLEuQ_TPXO_3QM', '0:0:0:0:0:0:0:1', NULL, 'CHROME11', 'Windows 10', 1, '2023-03-04 14:38:22');
INSERT INTO `user_login` VALUES (250, 1, 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2Nzc5MTg3MzcsInVzZXJJZCI6MSwiaWF0IjoxNjc3OTE2OTM3fQ.3tpHfGEtwBxKAsBOY1ZjRZkjAW7wMYVuTYKLTfqPFRI', '0:0:0:0:0:0:0:1', NULL, 'CHROME11', 'Windows 10', 1, '2023-03-04 16:02:18');
INSERT INTO `user_login` VALUES (251, 1, 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2Nzc5MjU1NDIsInVzZXJJZCI6MSwiaWF0IjoxNjc3OTIzNzQyfQ.PmE0les7PIyI1E6JEs6O4AfSEpNDO5Mxn-BjQlJ7hII', '0:0:0:0:0:0:0:1', NULL, 'CHROME11', 'Windows 10', 1, '2023-03-04 17:55:43');
INSERT INTO `user_login` VALUES (252, 1, 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2Nzc5NDc3ODcsInVzZXJJZCI6MSwiaWF0IjoxNjc3OTQ1OTg3fQ.YcntIdVLNmSqGegdrkjmIrMEth-mYDn7JvEWov29ekU', '0:0:0:0:0:0:0:1', NULL, 'CHROME11', 'Windows 10', 1, '2023-03-05 00:06:28');
INSERT INTO `user_login` VALUES (253, 1, 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2Nzc5OTMxMTMsInVzZXJJZCI6MSwiaWF0IjoxNjc3OTkxMzEzfQ.nykAQ_6lU1i9me55CV2zd3MQd1qNhVFKsA3PBNcRrVc', '0:0:0:0:0:0:0:1', NULL, 'CHROME11', 'Windows 10', 0, '2023-03-05 12:41:53');
INSERT INTO `user_login` VALUES (254, 1, 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2Nzc5OTg5OTIsInVzZXJJZCI6MSwiaWF0IjoxNjc3OTkxNzkyfQ.zyKqUcd01RN8hkDZQL9pYA3uZhb-xXPhcyGfxmzQgWg', '0:0:0:0:0:0:0:1', NULL, 'CHROME11', 'Windows 10', 0, '2023-03-05 12:49:53');
INSERT INTO `user_login` VALUES (255, 1, 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NzgwNDA3NzMsInVzZXJJZCI6MSwiaWF0IjoxNjc4MDMzNTczfQ.BkXVKAjdhkUYNgVGd24BLfZ66QeZrYhc9D_RTY7ENBw', '0:0:0:0:0:0:0:1', NULL, 'CHROME11', 'Windows 10', 1, '2023-03-06 00:26:14');
INSERT INTO `user_login` VALUES (256, 1, 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NzgxMDY4NjQsInVzZXJJZCI6MSwiaWF0IjoxNjc4MDk5NjY0fQ.hMMxXS52EzsynPkWLcKBOpx5ZP1qvPgeboBJGJJBLcU', '0:0:0:0:0:0:0:1', NULL, 'CHROME11', 'Windows 10', 0, '2023-03-06 18:47:45');
INSERT INTO `user_login` VALUES (257, 1, 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NzgxMjQ3MzQsInVzZXJJZCI6MSwiaWF0IjoxNjc4MTE3NTM0fQ.KVEfympJ4c7G9dS9HG_dn4UUyDVm84p4T-9xB0ZF82w', '0:0:0:0:0:0:0:1', NULL, 'CHROME11', 'Windows 10', 0, '2023-03-06 23:45:35');
INSERT INTO `user_login` VALUES (258, 1, 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NzgyODExNzYsInVzZXJJZCI6MSwiaWF0IjoxNjc4MjczOTc2fQ.cD5zPD5Js0CSxyCCF4SLFrMxC6RSkWzM-QeFwDHjWOM', '0:0:0:0:0:0:0:1', NULL, 'CHROME11', 'Windows 10', 0, '2023-03-08 19:12:57');
INSERT INTO `user_login` VALUES (259, 1, 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NzgzNjY3MTYsInVzZXJJZCI6MSwiaWF0IjoxNjc4MzU5NTE2fQ.jTpvxiGUIM6Dn8kUEwgaeqmaQg30kuOhH42miMnwosM', '0:0:0:0:0:0:0:1', NULL, 'CHROME11', 'Windows 10', 0, '2023-03-09 18:58:36');
INSERT INTO `user_login` VALUES (260, 1, 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NzgzODc4NzgsInVzZXJJZCI6MSwiaWF0IjoxNjc4MzgwNjc4fQ.Kqvfyo2DnvnShFsgOsluZ_s1an6Pndng_KePvQUzg-Y', '0:0:0:0:0:0:0:1', NULL, 'CHROME11', 'Windows 10', 1, '2023-03-10 00:51:19');
INSERT INTO `user_login` VALUES (261, 1, 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2Nzg0NTI5MjgsInVzZXJJZCI6MSwiaWF0IjoxNjc4NDQ1NzI4fQ.0lg79MGItRU04chU70a5i8lpGBw76wwlzKKFloplAvU', '0:0:0:0:0:0:0:1', NULL, 'CHROME11', 'Windows 10', 1, '2023-03-10 18:55:28');
INSERT INTO `user_login` VALUES (262, 1, 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2Nzg0NjcwODYsInVzZXJJZCI6MSwiaWF0IjoxNjc4NDU5ODg2fQ.6Gyw3WP948NjvucV0pAiay0VCTSPw202Rc8LzVR6VDg', '0:0:0:0:0:0:0:1', NULL, 'CHROME11', 'Windows 10', 1, '2023-03-10 22:51:26');
INSERT INTO `user_login` VALUES (263, 1, 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2Nzg1MTcyNjIsInVzZXJJZCI6MSwiaWF0IjoxNjc4NTEwMDYyfQ.nLORDoDHmNCRRyiP-wzJ4qVq72afveCKpUlvPftJx7Y', '0:0:0:0:0:0:0:1', NULL, 'CHROME11', 'Windows 10', 1, '2023-03-11 12:47:43');
INSERT INTO `user_login` VALUES (264, 1, 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2Nzg1NDAzNDMsInVzZXJJZCI6MSwiaWF0IjoxNjc4NTMzMTQzfQ.Q1aLHkWLWGlltquYRL0LhUAcBE1obXYMA-hucBycFzk', '0:0:0:0:0:0:0:1', NULL, 'CHROME11', 'Windows 10', 1, '2023-03-11 19:12:23');
INSERT INTO `user_login` VALUES (265, 1, 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2Nzg1NDkyMTIsInVzZXJJZCI6MSwiaWF0IjoxNjc4NTQyMDEyfQ.4E7SjV03uNlZ8gTWNsxXxuAYqYDObp6w1eu-LhfS8eI', '0:0:0:0:0:0:0:1', NULL, 'CHROME11', 'Windows 10', 1, '2023-03-11 21:40:13');
INSERT INTO `user_login` VALUES (266, 1, 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2Nzg1NTc2NjYsInVzZXJJZCI6MSwiaWF0IjoxNjc4NTUwNDY2fQ.AlMkD6W93nRxLpP0caa6p-gL-y-TcU4t5a5bfbn7CEo', '0:0:0:0:0:0:0:1', NULL, 'CHROME11', 'Windows 10', 1, '2023-03-12 00:01:07');
INSERT INTO `user_login` VALUES (267, 1, 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2Nzg2MDQ2MjQsInVzZXJJZCI6MSwiaWF0IjoxNjc4NTk3NDI0fQ._KErio4mES4CO82KvkuizojlsY4IEcuUJTPkLgR1PWw', '0:0:0:0:0:0:0:1', NULL, 'CHROME11', 'Windows 10', 1, '2023-03-12 13:03:45');
INSERT INTO `user_login` VALUES (268, 1, 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2Nzg2MTc4NTMsInVzZXJJZCI6MSwiaWF0IjoxNjc4NjEwNjUzfQ.gy6FTzf4O3q4pEiHmRIAZHbOFVvtV0GapKOIMCVoAEs', '0:0:0:0:0:0:0:1', NULL, 'CHROME11', 'Windows 10', 1, '2023-03-12 16:44:13');
INSERT INTO `user_login` VALUES (269, 1, 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2Nzg3MTkzMDQsInVzZXJJZCI6MSwiaWF0IjoxNjc4NzEyMTA0fQ.hg5OxivxMLt2LGr9VvzC3_CpgPX4pngt6D0ZSckCvc8', '0:0:0:0:0:0:0:1', NULL, 'CHROME11', 'Windows 10', 0, '2023-03-13 20:55:04');
INSERT INTO `user_login` VALUES (270, 1, 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2Nzg3MjY2NzgsInVzZXJJZCI6MSwiaWF0IjoxNjc4NzE5NDc4fQ.6_og8CTCPlDpT8g7Vx6S2djHGsR3fLopA7yzzv_o6AA', '0:0:0:0:0:0:0:1', NULL, 'CHROME11', 'Windows 10', 1, '2023-03-13 22:57:59');
INSERT INTO `user_login` VALUES (271, 1, 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2Nzg4NTIyNTQsInVzZXJJZCI6MSwiaWF0IjoxNjc4ODQ1MDU0fQ.5BEuhLFmFMSRek2uPoPK-UNLaGRLu_IJJP1H7ycl7VU', '0:0:0:0:0:0:0:1', NULL, 'CHROME11', 'Windows 10', 0, '2023-03-15 09:50:54');
INSERT INTO `user_login` VALUES (272, 1, 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2Nzg4NjQxNzUsInVzZXJJZCI6MSwiaWF0IjoxNjc4ODU2OTc1fQ.UWM0Av28iq5w0f_VgRINFSB2QCAuIvQTfWxVnHSY7lY', '0:0:0:0:0:0:0:1', NULL, 'CHROME11', 'Windows 10', 1, '2023-03-15 13:09:35');
INSERT INTO `user_login` VALUES (273, 1, 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2Nzg4NzI5NTgsInVzZXJJZCI6MSwiaWF0IjoxNjc4ODY1NzU4fQ.FE4kvHAWI0GaPnNfZnZ_ulHnE8__ELaexmGJ0Pas8BE', '0:0:0:0:0:0:0:1', NULL, 'CHROME11', 'Windows 10', 1, '2023-03-15 15:35:59');
INSERT INTO `user_login` VALUES (274, 1, 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2Nzg4ODAyMzUsInVzZXJJZCI6MSwiaWF0IjoxNjc4ODczMDM1fQ.DJMjUL_h77E6pVAwP3P_IyN0RlGNAaWzzUfIjFbpzlI', '0:0:0:0:0:0:0:1', NULL, 'CHROME11', 'Windows 10', 1, '2023-03-15 17:37:15');
INSERT INTO `user_login` VALUES (275, 1, 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2Nzg4ODgyMjMsInVzZXJJZCI6MSwiaWF0IjoxNjc4ODgxMDIzfQ.r6zGOj6evpi2SDajK0sQHVQs37ypT7JBC_iRbq28AJM', '0:0:0:0:0:0:0:1', NULL, 'CHROME11', 'Windows 10', 1, '2023-03-15 19:50:23');
INSERT INTO `user_login` VALUES (276, 1, 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2Nzg4OTgzODUsInVzZXJJZCI6MSwiaWF0IjoxNjc4ODkxMTg1fQ.TTTppRbpHuANayv7s5crI6KvQHY3ID6nmewQUYmjK0g', '0:0:0:0:0:0:0:1', NULL, 'CHROME11', 'Windows 10', 1, '2023-03-15 22:39:45');
INSERT INTO `user_login` VALUES (277, 1, 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2Nzg5NjExMzQsInVzZXJJZCI6MSwiaWF0IjoxNjc4OTUzOTM0fQ.UTZ_Rl3o2ZuT2rYNqn-FfS0dOFiwcP3xRVAHTBxTQhE', '0:0:0:0:0:0:0:1', NULL, 'CHROME11', 'Windows 10', 1, '2023-03-16 16:05:34');
INSERT INTO `user_login` VALUES (278, 1, 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2Nzg5NzExMzEsInVzZXJJZCI6MSwiaWF0IjoxNjc4OTYzOTMxfQ.nbuj_XgxQRXkCXLoVc50DHHiYt8yWm_IAcITiUN8rLQ', '0:0:0:0:0:0:0:1', NULL, 'CHROME11', 'Windows 10', 1, '2023-03-16 18:52:11');
INSERT INTO `user_login` VALUES (279, 1, 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2Nzg5ODA0MzIsInVzZXJJZCI6MSwiaWF0IjoxNjc4OTczMjMyfQ.uTuNZQECXHuWoLuFWLlb_mAMXcmKo9FBEk-hca2BNz0', '0:0:0:0:0:0:0:1', NULL, 'CHROME11', 'Windows 10', 1, '2023-03-16 21:27:12');
INSERT INTO `user_login` VALUES (280, 1, 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2Nzg5ODc2NDQsInVzZXJJZCI6MSwiaWF0IjoxNjc4OTgwNDQ0fQ.z0CB1W-hr0uJ2JW-ZFDtVUe2nh74_lSaFecNliD3AUo', '0:0:0:0:0:0:0:1', NULL, 'CHROME11', 'Windows 10', 1, '2023-03-16 23:27:24');
INSERT INTO `user_login` VALUES (281, 1, 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NzkwMjQzNzAsInVzZXJJZCI6MSwiaWF0IjoxNjc5MDE3MTcwfQ.FoEMKmQDQC9AAwDTIanKEiUG-kLellFIDo8iE3u6VYw', '0:0:0:0:0:0:0:1', NULL, 'CHROME11', 'Windows 10', 1, '2023-03-17 09:39:30');
INSERT INTO `user_login` VALUES (282, 1, 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NzkwNTE2MzYsInVzZXJJZCI6MSwiaWF0IjoxNjc5MDQ0NDM2fQ.RdvpKBdw_mu1brJXhYM0zyM7oL2DcD30UK-Bhhpy16Y', '0:0:0:0:0:0:0:1', NULL, 'CHROME11', 'Windows 10', 1, '2023-03-17 17:13:57');
INSERT INTO `user_login` VALUES (283, 1, 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NzkwNTg4NDUsInVzZXJJZCI6MSwiaWF0IjoxNjc5MDUxNjQ1fQ.w-fCcipx4oWB3IgJ873PdwAqI-nmxuV5DHftrdYJYvo', '0:0:0:0:0:0:0:1', NULL, 'CHROME11', 'Windows 10', 1, '2023-03-17 19:14:05');
INSERT INTO `user_login` VALUES (284, 1, 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NzkwNzc5NjIsInVzZXJJZCI6MSwiaWF0IjoxNjc5MDcwNzYyfQ.fOcvZgjOERf5B-DZ6FhV9JOt3tODH0zvsF8F8hxoY6w', '0:0:0:0:0:0:0:1', NULL, 'CHROME11', 'Windows 10', 1, '2023-03-18 00:32:43');
INSERT INTO `user_login` VALUES (285, 1, 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NzkxMjE0MDAsInVzZXJJZCI6MSwiaWF0IjoxNjc5MTE0MjAwfQ.V8VR39JdAGv1z7G_Yt6uEfCXYYKMGNKDvSV6kVikdGM', '0:0:0:0:0:0:0:1', NULL, 'CHROME11', 'Windows 10', 0, '2023-03-18 12:36:41');
INSERT INTO `user_login` VALUES (286, 1, 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NzkxMjI1MzgsInVzZXJJZCI6MSwiaWF0IjoxNjc5MTE1MzM4fQ.8wz40iXMfUqMTqZU-3CmTFaIJhSqpHWn6HvIFU9QU6o', '0:0:0:0:0:0:0:1', NULL, 'CHROME11', 'Windows 10', 0, '2023-03-18 12:55:38');
INSERT INTO `user_login` VALUES (287, 1, 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NzkxNTkxMTUsInVzZXJJZCI6MSwiaWF0IjoxNjc5MTUxOTE1fQ.D-gn8Ky4KRpAkSSLkvwdUo7Q2Mf2W74Pv7NzxV_Hppk', '0:0:0:0:0:0:0:1', NULL, 'CHROME11', 'Windows 10', 1, '2023-03-18 23:05:15');
INSERT INTO `user_login` VALUES (288, 1, 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NzkyMDkwNzYsInVzZXJJZCI6MSwiaWF0IjoxNjc5MjAxODc2fQ.QDfcH8U_tJnJBg0nm5i04wuJWDF5tX1oLQa-x5z9a4c', '0:0:0:0:0:0:0:1', NULL, 'CHROME11', 'Windows 10', 1, '2023-03-19 12:57:56');
INSERT INTO `user_login` VALUES (289, 1, 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NzkyMTYzOTgsInVzZXJJZCI6MSwiaWF0IjoxNjc5MjA5MTk4fQ.k2U4DE7QBcP731zcOpIase1VF0uiTmEIsEYmmB8NPxM', '0:0:0:0:0:0:0:1', NULL, 'CHROME11', 'Windows 10', 1, '2023-03-19 14:59:58');
INSERT INTO `user_login` VALUES (290, 1, 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NzkyMzU0NzUsInVzZXJJZCI6MSwiaWF0IjoxNjc5MjI4Mjc1fQ.vase-CHxoskKUbVxO2tA4VU8HDuKVR2s_JZ0fZkjLy0', '0:0:0:0:0:0:0:1', NULL, 'CHROME11', 'Windows 10', 1, '2023-03-19 20:17:56');
INSERT INTO `user_login` VALUES (291, 1, 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NzkyNDYwMzQsInVzZXJJZCI6MSwiaWF0IjoxNjc5MjM4ODM0fQ.u55M9VerEQOfXzy-HcclzBeTfynukZJ46m_EEf09a5c', '0:0:0:0:0:0:0:1', NULL, 'CHROME11', 'Windows 10', 1, '2023-03-19 23:13:54');
INSERT INTO `user_login` VALUES (292, 1, 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NzkzNzEzMTgsInVzZXJJZCI6MSwiaWF0IjoxNjc5MzY0MTE4fQ.Zm_JfjV-yhL4rrZN5O-co17NYkt_3H2jBGguERTnzUs', '0:0:0:0:0:0:0:1', NULL, 'CHROME11', 'Windows 10', 0, '2023-03-21 10:01:59');
INSERT INTO `user_login` VALUES (293, 1, 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NzkzODU1NjEsInVzZXJJZCI6MSwiaWF0IjoxNjc5Mzc4MzYxfQ.CqaI3kjN4GIcQ_tTrpWjVBOEQRziAi6Tu-5MXJqVY0s', '0:0:0:0:0:0:0:1', NULL, 'CHROME11', 'Windows 10', 0, '2023-03-21 13:59:22');
INSERT INTO `user_login` VALUES (294, 1, 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NzkzOTI5OTcsInVzZXJJZCI6MSwiaWF0IjoxNjc5Mzg1Nzk3fQ.9C2HAMT1YZUNhKqsuoT6o4biAGbEXW7CsOdpeLEzCzw', '0:0:0:0:0:0:0:1', NULL, 'CHROME11', 'Windows 10', 1, '2023-03-21 16:03:18');
INSERT INTO `user_login` VALUES (295, 1, 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2Nzk0MDI3NjMsInVzZXJJZCI6MSwiaWF0IjoxNjc5Mzk1NTYzfQ.7eZEJUclLvRZmVYMJmrbpV9tc26PUMAoYEXTHZfetjs', '0:0:0:0:0:0:0:1', NULL, 'CHROME11', 'Windows 10', 1, '2023-03-21 18:46:03');
INSERT INTO `user_login` VALUES (296, 1, 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2Nzk0MDk5NjIsInVzZXJJZCI6MSwiaWF0IjoxNjc5NDAyNzYyfQ.cpWnQu0qKIafyUmMGoyCbWnVmJNJHMgYAXAcNOM6thI', '0:0:0:0:0:0:0:1', NULL, 'CHROME11', 'Windows 10', 1, '2023-03-21 20:46:02');
INSERT INTO `user_login` VALUES (297, 1, 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2Nzk0MTcxODcsInVzZXJJZCI6MSwiaWF0IjoxNjc5NDA5OTg3fQ.wvfP4WhG9__L9nKuPPLme-gMH2yEDF60jypc52x2Lc4', '0:0:0:0:0:0:0:1', NULL, 'CHROME11', 'Windows 10', 1, '2023-03-21 22:46:27');
INSERT INTO `user_login` VALUES (298, 1, 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2Nzk0NTYwMjEsInVzZXJJZCI6MSwiaWF0IjoxNjc5NDQ4ODIxfQ.1WEweywjqu9yERZ48twtIpF-5zd7Yheot3PxEFMTGrE', '0:0:0:0:0:0:0:1', NULL, 'CHROME11', 'Windows 10', 1, '2023-03-22 09:33:42');
INSERT INTO `user_login` VALUES (299, 1, 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2Nzk0NzI3MzgsInVzZXJJZCI6MSwiaWF0IjoxNjc5NDY1NTM4fQ.hynU1b7ZB4u6e4K7RS4fYKOGYjmd4rvhX__E4PqvWgs', '0:0:0:0:0:0:0:1', NULL, 'CHROME11', 'Windows 10', 1, '2023-03-22 14:12:19');
INSERT INTO `user_login` VALUES (300, 1, 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2Nzk0ODAwMTksInVzZXJJZCI6MSwiaWF0IjoxNjc5NDcyODE5fQ.n2YU-bRX_iCSrdLgD_4wJ2oooFNKG5NMhOdi5C7jH-8', '0:0:0:0:0:0:0:1', NULL, 'CHROME11', 'Windows 10', 1, '2023-03-22 16:13:39');
INSERT INTO `user_login` VALUES (301, 1, 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2Nzk0OTA3NDYsInVzZXJJZCI6MSwiaWF0IjoxNjc5NDgzNTQ2fQ.usrryPPD2VQLXPCCCMJt8aVd1zxeDbmfCWD7rUagf4c', '0:0:0:0:0:0:0:1', NULL, 'CHROME11', 'Windows 10', 1, '2023-03-22 19:12:26');
INSERT INTO `user_login` VALUES (302, 1, 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2Nzk0OTM0NzYsInVzZXJJZCI6MSwiaWF0IjoxNjc5NDg2Mjc2fQ.PI4lGi3oapPy0qpNLyqSkujb8BeqkkhOnOVM-mSwslI', '0:0:0:0:0:0:0:1', NULL, 'CHROME11', 'Windows 10', 0, '2023-03-22 19:57:56');
INSERT INTO `user_login` VALUES (303, 1, 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2Nzk0OTQzNjYsInVzZXJJZCI6MSwiaWF0IjoxNjc5NDg3MTY2fQ.NuaeDK7Zk20Ym1ODi25Ijq9AK9aqdzYoFqMlQK4AD-0', '0:0:0:0:0:0:0:1', NULL, 'CHROME11', 'Windows 10', 0, '2023-03-22 20:12:47');
INSERT INTO `user_login` VALUES (304, 1, 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2Nzk1NDc0NzQsInVzZXJJZCI6MSwiaWF0IjoxNjc5NTQwMjc0fQ.0S44YYUERusnk9PYGZbB1z8mjCA5GdpqfaXOWJcDtYo', '0:0:0:0:0:0:0:1', NULL, 'CHROME11', 'Windows 10', 0, '2023-03-23 10:57:55');
INSERT INTO `user_login` VALUES (305, 1, 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2Nzk1NjE5MDEsInVzZXJJZCI6MSwiaWF0IjoxNjc5NTU0NzAxfQ.lhkSg0uQDRb9Gsb1AxpkXqnJu--IVs52WFTe2xt6im0', '0:0:0:0:0:0:0:1', NULL, 'CHROME11', 'Windows 10', 1, '2023-03-23 14:58:21');
INSERT INTO `user_login` VALUES (306, 1, 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2Nzk1Njg5NTAsInVzZXJJZCI6MSwiaWF0IjoxNjc5NTYxNzUwfQ.KbNNSdSzK5-bxGaIJZwmu6mUCXCW1a6brBaCoal_VOc', '0:0:0:0:0:0:0:1', NULL, 'CHROME11', 'Windows 10', 0, '2023-03-23 16:55:50');
INSERT INTO `user_login` VALUES (307, 1, 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2Nzk1NjkwMjcsInVzZXJJZCI6MSwiaWF0IjoxNjc5NTYxODI3fQ.XLQgIQAZoT-yvfN2NpxEjdIYyiUll_XfD4NFmcoCmFg', '0:0:0:0:0:0:0:1', NULL, 'CHROME11', 'Windows 10', 0, '2023-03-23 16:57:07');
INSERT INTO `user_login` VALUES (308, 1, 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2Nzk1NzA2NjEsInVzZXJJZCI6MSwiaWF0IjoxNjc5NTYzNDYxfQ.eSRe3H38hNq1yfsVHk4x340yW3DqIzYXTzugOkW2nNI', '0:0:0:0:0:0:0:1', NULL, 'CHROME11', 'Windows 10', 0, '2023-03-23 17:24:21');
INSERT INTO `user_login` VALUES (309, 1, 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2Nzk1NzExNzMsInVzZXJJZCI6MSwiaWF0IjoxNjc5NTYzOTczfQ.VJmTo9MxFBxlrTGCNO18Vp6xJ-lTtTlfJNADZIGvj8o', '0:0:0:0:0:0:0:1', NULL, 'CHROME11', 'Windows 10', 0, '2023-03-23 17:32:53');
INSERT INTO `user_login` VALUES (310, 2, 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2Nzk2NTcyNzcsInVzZXJJZCI6MiwiaWF0IjoxNjc5NjUwMDc3fQ.KcUv83e8RHSQbDMlW96m_tBAPhEkkNyKeXhrWt-RL7A', '0:0:0:0:0:0:0:1', NULL, 'CHROME11', 'Windows 10', 0, '2023-03-24 17:27:58');
INSERT INTO `user_login` VALUES (311, 2, 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2Nzk2NTgzODUsInVzZXJJZCI6MiwiaWF0IjoxNjc5NjUxMTg1fQ.HQNbhIh-38mO3qb4Dc-ZjZQIe3QymDVHmKeYADaqCmI', '0:0:0:0:0:0:0:1', NULL, 'CHROME11', 'Windows 10', 0, '2023-03-24 17:46:26');
INSERT INTO `user_login` VALUES (312, 2, 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2Nzk2NTg2MTksInVzZXJJZCI6MiwiaWF0IjoxNjc5NjUxNDE5fQ.1qA9gnVe6Qnzsn9YtalX4Q_xdre2XrPGLzP1E_oNrBY', '0:0:0:0:0:0:0:1', NULL, 'CHROME11', 'Windows 10', 0, '2023-03-24 17:50:20');
INSERT INTO `user_login` VALUES (313, 2, 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2Nzk2NTkwNTcsInVzZXJJZCI6MiwiaWF0IjoxNjc5NjUxODU3fQ.uim5p2A_nhoHDQCeOYH33nKMowLLFbfHGBaXcBeKBK8', '0:0:0:0:0:0:0:1', NULL, 'CHROME11', 'Windows 10', 0, '2023-03-24 17:57:38');
INSERT INTO `user_login` VALUES (314, 2, 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2Nzk2NjMwODgsInVzZXJJZCI6MiwiaWF0IjoxNjc5NjU1ODg4fQ.uZCVQIfH7C7DL5mV9WNsHyCIslAZek2P7a75IvfoblA', '0:0:0:0:0:0:0:1', NULL, 'CHROME11', 'Windows 10', 0, '2023-03-24 19:04:49');
INSERT INTO `user_login` VALUES (315, 2, 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2Nzk2NjM0MjgsInVzZXJJZCI6MiwiaWF0IjoxNjc5NjU2MjI4fQ.ihx6M7mcPzVK_FmwcSJodM7qXXzlrEDk-_aAiRJhLV8', '0:0:0:0:0:0:0:1', NULL, 'CHROME11', 'Windows 10', 0, '2023-03-24 19:10:29');
INSERT INTO `user_login` VALUES (316, 1, 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2ODExMzk3ODAsInVzZXJJZCI6MSwiaWF0IjoxNjgxMTM5NzIwfQ.T4sGa5w_G-PjbbMzgbUjRDNlnf0BnEwPPKPWzfrAgBk', '0:0:0:0:0:0:0:1', NULL, 'CHROME11', 'Windows 10', 0, '2023-04-10 23:15:21');
INSERT INTO `user_login` VALUES (317, 1, 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2ODExMzk4NjYsInVzZXJJZCI6MSwiaWF0IjoxNjgxMTM5ODA2fQ.mgpjObRmVCINrtbELX5T-bfRrF70uGJB6HPLy6DkIUQ', '0:0:0:0:0:0:0:1', NULL, 'CHROME11', 'Windows 10', 1, '2023-04-10 23:16:46');
INSERT INTO `user_login` VALUES (318, 1, 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2ODExMzk5NTEsInVzZXJJZCI6MSwiaWF0IjoxNjgxMTM5ODkxfQ.RhHU8RpqqldiF6RZ3zH7o8UsxwFrpWCC_TRCRq_gXes', '0:0:0:0:0:0:0:1', NULL, 'CHROME11', 'Windows 10', 1, '2023-04-10 23:18:11');
INSERT INTO `user_login` VALUES (319, 1, 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2ODExNDAyNzksInVzZXJJZCI6MSwiaWF0IjoxNjgxMTQwMjE5fQ.r0Q6idRiBMWDj5MA60Pge-KsUVTRk5dl3UinYkAARlI', '0:0:0:0:0:0:0:1', NULL, 'CHROME11', 'Windows 10', 0, '2023-04-10 23:23:39');
INSERT INTO `user_login` VALUES (320, 1, 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2ODExNDAzMjgsInVzZXJJZCI6MSwiaWF0IjoxNjgxMTQwMjY4fQ.X0ChM17Xh9g5W4QggZeUFB7dZWHguWtoMFK7kZmUvJ0', '0:0:0:0:0:0:0:1', NULL, 'CHROME11', 'Windows 10', 0, '2023-04-10 23:24:28');
INSERT INTO `user_login` VALUES (321, 1, 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2ODExNDA0MTYsInVzZXJJZCI6MSwiaWF0IjoxNjgxMTQwMzU2fQ.Jh99kBOQJsOMLqTGWrYj3N-jy7XLODKPR8DLhM2WuLw', '0:0:0:0:0:0:0:1', NULL, 'CHROME11', 'Windows 10', 1, '2023-04-10 23:25:56');
INSERT INTO `user_login` VALUES (322, 1, 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2ODExNDA1MDMsInVzZXJJZCI6MSwiaWF0IjoxNjgxMTQwNDQzfQ.pV3cPCCe_7UnCPq-0z3m_gsgw1WNRB5Q2rxoTI3OMd8', '0:0:0:0:0:0:0:1', NULL, 'CHROME11', 'Windows 10', 1, '2023-04-10 23:27:24');
INSERT INTO `user_login` VALUES (323, 1, 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2ODExNDA1NjYsInVzZXJJZCI6MSwiaWF0IjoxNjgxMTQwNTA2fQ.MSRqu81hwmRI6x1UVfAyQ4Tqp52A6HLY-bheuxdnnGE', '0:0:0:0:0:0:0:1', NULL, 'CHROME11', 'Windows 10', 1, '2023-04-10 23:28:26');
INSERT INTO `user_login` VALUES (324, 1, 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2ODExNDc4MzMsInVzZXJJZCI6MSwiaWF0IjoxNjgxMTQwNjMzfQ.F75o8MLVThzHtsSpLEkInNm_rX4qLj35zSdTF5XQQl4', '0:0:0:0:0:0:0:1', NULL, 'CHROME11', 'Windows 10', 1, '2023-04-10 23:30:33');
INSERT INTO `user_login` VALUES (325, 1, 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2ODExNTIyOTcsInVzZXJJZCI6MSwiaWF0IjoxNjgxMTQ1MDk3fQ.BRBfqoF8s7jWZH6smhq6Va3PBlnGYVqDTPwR4vEH7kg', '0:0:0:0:0:0:0:1', NULL, 'CHROME11', 'Windows 10', 0, '2023-04-11 00:44:58');
INSERT INTO `user_login` VALUES (326, 1, 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2ODExODIyNzYsInVzZXJJZCI6MSwiaWF0IjoxNjgxMTc1MDc2fQ.y6v1sEBy108TM__P0e45Bjkc94ZV5_JKs4ReJ3_khcA', '0:0:0:0:0:0:0:1', NULL, 'CHROME11', 'Windows 10', 1, '2023-04-11 09:04:37');
INSERT INTO `user_login` VALUES (327, 2, 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2ODExNzg0MzUsInVzZXJJZCI6MiwiaWF0IjoxNjgxMTc3MjM1fQ.F9t_1UJNABSh0MkcCJCw2duJNA6YLTqRsOo0aY0EXSw', '0:0:0:0:0:0:0:1', NULL, 'CHROME11', 'Windows 10', 0, '2023-04-11 09:40:36');
INSERT INTO `user_login` VALUES (328, 1, 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2ODExNzg3NDYsInVzZXJJZCI6MSwiaWF0IjoxNjgxMTc3NTQ2fQ.0p6n2SndTk8w_Lou1f8Mpw8RW0O7vyNbt69qYK5YPT0', '0:0:0:0:0:0:0:1', NULL, 'CHROME11', 'Windows 10', 0, '2023-04-11 09:45:46');
INSERT INTO `user_login` VALUES (329, 1, 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2ODExNzkwMDYsInVzZXJJZCI6MSwiaWF0IjoxNjgxMTc3ODA2fQ.-UNatw91f7M-w4hurk_0PeqbDYxZYX7-73J03vLl3Z0', '0:0:0:0:0:0:0:1', NULL, 'CHROME11', 'Windows 10', 0, '2023-04-11 09:50:07');
INSERT INTO `user_login` VALUES (330, 1, 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2ODExNzk4MTEsInVzZXJJZCI6MSwiaWF0IjoxNjgxMTc4NjExfQ.hcqWmhEM220MjOguFYbRdw-sswlxf55A_RKdN7WfkK8', '0:0:0:0:0:0:0:1', NULL, 'CHROME11', 'Windows 10', 0, '2023-04-11 10:03:32');
INSERT INTO `user_login` VALUES (331, 2, 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2ODExNzk4NTIsInVzZXJJZCI6MiwiaWF0IjoxNjgxMTc4NjUyfQ.eDv9xhYUyM_I9RMaKEaI6jgpvTiel2Ns9pQpOjORqH8', '0:0:0:0:0:0:0:1', NULL, 'CHROME11', 'Windows 10', 0, '2023-04-11 10:04:12');
INSERT INTO `user_login` VALUES (332, 1, 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2ODExODc0MTgsInVzZXJJZCI6MSwiaWF0IjoxNjgxMTgwMjE4fQ.kAFS7iWi1ENqnZW2-ww68JlhQjXTX-LnghOoRvcS0CA', '0:0:0:0:0:0:0:1', NULL, 'CHROME11', 'Windows 10', 1, '2023-04-11 10:30:19');
INSERT INTO `user_login` VALUES (333, 1, 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2ODExOTY4NjUsInVzZXJJZCI6MSwiaWF0IjoxNjgxMTg5NjY1fQ.8aju3UxXOTmDLG1ZQuWE9S2g9SxyW6RMxa23Bz20Png', '0:0:0:0:0:0:0:1', NULL, 'CHROME11', 'Windows 10', 1, '2023-04-11 13:07:45');
INSERT INTO `user_login` VALUES (334, 2, 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2ODExOTcwMTQsInVzZXJJZCI6MiwiaWF0IjoxNjgxMTg5ODE0fQ.moJwEMp_KPmD0_gnE7XkPcPXOScS9RoVuoqygBucNLc', '0:0:0:0:0:0:0:1', NULL, 'CHROME11', 'Windows 10', 0, '2023-04-11 13:10:15');
INSERT INTO `user_login` VALUES (335, 2, 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2ODExOTcyNTQsInVzZXJJZCI6MiwiaWF0IjoxNjgxMTkwMDU0fQ.X6k7HduytYQW23m-tJAoT9WONXlKvPbw7Rwyt5cKyo8', '0:0:0:0:0:0:0:1', NULL, 'CHROME11', 'Windows 10', 0, '2023-04-11 13:14:15');
INSERT INTO `user_login` VALUES (336, 1, 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2ODEyMDUxMjMsInVzZXJJZCI6MSwiaWF0IjoxNjgxMTk3OTIzfQ.zGK3ocY3K-WyJYp1hTbYPHhOp4oS1bzY0-L-zLQPLRQ', '0:0:0:0:0:0:0:1', NULL, 'CHROME11', 'Windows 10', 1, '2023-04-11 15:25:24');
INSERT INTO `user_login` VALUES (337, 1, 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2ODEyMTQwMTksInVzZXJJZCI6MSwiaWF0IjoxNjgxMjA2ODE5fQ.fjF_2f3slTVWLbKvz-emrENmrd4S3RYmRqta8Ylb6Mk', '0:0:0:0:0:0:0:1', NULL, 'CHROME11', 'Windows 10', 1, '2023-04-11 17:53:39');
INSERT INTO `user_login` VALUES (338, 1, 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2ODEyODI4OTYsInVzZXJJZCI6MSwiaWF0IjoxNjgxMjc1Njk2fQ.YfYM-L0Tc9QhQ6X8bCSBNy9sdZHU1jPO0p4kwqk0qQ8', '0:0:0:0:0:0:0:1', NULL, 'CHROME11', 'Windows 10', 1, '2023-04-12 13:01:37');
INSERT INTO `user_login` VALUES (339, 1, 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2ODEyOTQxNDEsInVzZXJJZCI6MSwiaWF0IjoxNjgxMjg2OTQxfQ.b6azTFDIVkb3s7l2bDBfQz6sNzN2XNJsGznozOlAc_A', '0:0:0:0:0:0:0:1', NULL, 'CHROME11', 'Windows 10', 1, '2023-04-12 16:09:02');

SET FOREIGN_KEY_CHECKS = 1;
