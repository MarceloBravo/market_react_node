/*
 Navicat Premium Data Transfer

 Source Server         : MySql 3306
 Source Server Type    : MySQL
 Source Server Version : 80020
 Source Host           : localhost:3306
 Source Schema         : mabc

 Target Server Type    : MySQL
 Target Server Version : 80020
 File Encoding         : 65001

 Date: 11/06/2021 16:20:21
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for configuracion
-- ----------------------------
DROP TABLE IF EXISTS `configuracion`;
CREATE TABLE `configuracion`  (
  `id` bigint(0) UNSIGNED NOT NULL AUTO_INCREMENT,
  `nombre_app` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp(0) NULL DEFAULT NULL,
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of configuracion
-- ----------------------------
INSERT INTO `configuracion` VALUES (1, 'Mabc App', NULL, '2021-05-27 23:19:32');

-- ----------------------------
-- Table structure for failed_jobs
-- ----------------------------
DROP TABLE IF EXISTS `failed_jobs`;
CREATE TABLE `failed_jobs`  (
  `id` bigint(0) UNSIGNED NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `failed_jobs_uuid_unique`(`uuid`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for menus
-- ----------------------------
DROP TABLE IF EXISTS `menus`;
CREATE TABLE `menus`  (
  `id` bigint(0) UNSIGNED NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `url` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `created_at` timestamp(0) NULL DEFAULT NULL,
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  `deleted_at` timestamp(0) NULL DEFAULT NULL,
  `menu_padre_id` bigint(0) NOT NULL,
  `posicion` int(0) UNSIGNED NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `menus_nombre_unique`(`nombre`) USING BTREE,
  UNIQUE INDEX `menus_url_unique`(`url`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 24 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of menus
-- ----------------------------
INSERT INTO `menus` VALUES (1, 'Pantallas', 'pantallas', '2021-01-28 19:24:05', '2021-06-07 00:00:00', NULL, 15, 20);
INSERT INTO `menus` VALUES (3, 'Roles', 'roles', '2021-01-30 17:58:04', '2021-02-10 01:22:29', NULL, 15, 30);
INSERT INTO `menus` VALUES (4, 'Usuarios', 'usuarios', '2021-01-30 17:59:32', '2021-02-10 01:22:40', NULL, 15, 40);
INSERT INTO `menus` VALUES (5, 'Menús', 'menus', '2021-01-30 18:28:46', '2021-02-10 01:18:08', NULL, 15, 10);
INSERT INTO `menus` VALUES (13, 'Videos', 'videos', '2021-02-09 08:52:46', '2021-04-28 20:05:36', NULL, 19, 0);
INSERT INTO `menus` VALUES (14, 'Permisos', 'permisos', '2021-02-10 11:41:45', '2021-02-10 11:41:45', NULL, 15, 50);
INSERT INTO `menus` VALUES (15, 'Configuración', NULL, '2021-02-11 13:18:07', '2021-02-11 13:18:11', NULL, 0, 20);
INSERT INTO `menus` VALUES (19, 'Páginas', NULL, '2021-02-11 13:19:24', '2021-02-11 13:19:28', NULL, 0, 10);
INSERT INTO `menus` VALUES (22, 'Personalizar', 'personalizar', '2021-05-26 00:00:00', '2021-05-26 00:00:00', NULL, 15, 70);
INSERT INTO `menus` VALUES (23, 'tftftf', 'tftftftf', '2021-06-07 00:00:00', '2021-06-07 00:00:00', '2021-06-07 00:00:00', 1, 1000);

-- ----------------------------
-- Table structure for migrations
-- ----------------------------
DROP TABLE IF EXISTS `migrations`;
CREATE TABLE `migrations`  (
  `id` int(0) UNSIGNED NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 20 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of migrations
-- ----------------------------
INSERT INTO `migrations` VALUES (1, '2014_10_12_000000_create_users_table', 1);
INSERT INTO `migrations` VALUES (2, '2014_10_12_100000_create_password_resets_table', 1);
INSERT INTO `migrations` VALUES (3, '2019_08_19_000000_create_failed_jobs_table', 1);
INSERT INTO `migrations` VALUES (4, '2020_11_22_183950_create_roles_table', 1);
INSERT INTO `migrations` VALUES (5, '2020_11_22_184449_create_role_user_table', 1);
INSERT INTO `migrations` VALUES (6, '2021_01_18_210538_add_field_to_users_table', 2);
INSERT INTO `migrations` VALUES (7, '2021_01_25_143936_create_pantallas_table', 3);
INSERT INTO `migrations` VALUES (8, '2021_01_25_144702_create_menus_table', 3);
INSERT INTO `migrations` VALUES (10, '2021_01_25_145856_add_flied_to_patallas', 4);
INSERT INTO `migrations` VALUES (11, '2021_01_28_171711_create_table_menus', 5);
INSERT INTO `migrations` VALUES (14, '2021_02_06_175219_create_table_permisos', 6);
INSERT INTO `migrations` VALUES (15, '2021_02_09_114555_add_field_to_menus', 7);
INSERT INTO `migrations` VALUES (16, '2021_02_09_162752_create_grupos_menus_table', 8);
INSERT INTO `migrations` VALUES (17, '2021_02_09_162856_add_flieds_to_menus', 9);
INSERT INTO `migrations` VALUES (18, '2021_02_10_113119_add_field_to_grupos_menus', 10);
INSERT INTO `migrations` VALUES (19, '2021_04_30_211828_add_field_foto_to_users', 11);
INSERT INTO `migrations` VALUES (20, '2021_05_27_020353_create_configuracion_table', 12);

-- ----------------------------
-- Table structure for pantallas
-- ----------------------------
DROP TABLE IF EXISTS `pantallas`;
CREATE TABLE `pantallas`  (
  `id` bigint(0) UNSIGNED NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp(0) NULL DEFAULT NULL,
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  `deleted_at` timestamp(0) NULL DEFAULT NULL,
  `menus_id` bigint(0) UNSIGNED NOT NULL,
  `permite_crear` tinyint(0) NOT NULL DEFAULT 1,
  `permite_modificar` tinyint(0) NOT NULL DEFAULT 1,
  `permite_eliminar` tinyint(0) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `pantallas_nombre_unique`(`nombre`) USING BTREE,
  INDEX `pantallas_menus_id_foreign`(`menus_id`) USING BTREE,
  CONSTRAINT `pantallas_menus_id_foreign` FOREIGN KEY (`menus_id`) REFERENCES `menus` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of pantallas
-- ----------------------------
INSERT INTO `pantallas` VALUES (1, 'Menús', '2021-02-01 19:05:06', '2021-06-07 00:00:00', NULL, 5, 1, 1, 1);
INSERT INTO `pantallas` VALUES (2, 'Usuarios', '2021-02-03 23:46:32', '2021-02-03 23:53:01', NULL, 4, 1, 1, 1);
INSERT INTO `pantallas` VALUES (3, 'Roles', '2021-02-07 20:13:10', '2021-02-07 20:13:16', NULL, 3, 1, 1, 1);
INSERT INTO `pantallas` VALUES (4, 'Pantallas', '2021-02-10 11:39:11', '2021-02-10 11:39:11', NULL, 1, 1, 1, 1);
INSERT INTO `pantallas` VALUES (5, 'Permisos', '2021-02-10 11:42:10', '2021-02-10 11:42:10', NULL, 14, 0, 1, 0);
INSERT INTO `pantallas` VALUES (6, 'Videos', '2021-04-28 19:48:21', '2021-04-28 19:48:21', NULL, 13, 1, 1, 1);
INSERT INTO `pantallas` VALUES (11, 'Personalizar', '2021-05-26 00:00:00', '2021-05-26 00:00:00', NULL, 22, 1, 0, 0);

-- ----------------------------
-- Table structure for password_resets
-- ----------------------------
DROP TABLE IF EXISTS `password_resets`;
CREATE TABLE `password_resets`  (
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp(0) NULL DEFAULT NULL,
  INDEX `password_resets_email_index`(`email`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for permisos
-- ----------------------------
DROP TABLE IF EXISTS `permisos`;
CREATE TABLE `permisos`  (
  `id` bigint(0) UNSIGNED NOT NULL AUTO_INCREMENT,
  `roles_id` bigint(0) UNSIGNED NOT NULL,
  `pantallas_id` bigint(0) UNSIGNED NOT NULL,
  `acceder` tinyint(1) NOT NULL DEFAULT 0,
  `crear` tinyint(1) NOT NULL DEFAULT 0,
  `modificar` tinyint(1) NOT NULL DEFAULT 0,
  `eliminar` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp(0) NULL DEFAULT NULL,
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  `deleted_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `permisos_roles_id_foreign`(`roles_id`) USING BTREE,
  INDEX `permisos_pantallas_id_foreign`(`pantallas_id`) USING BTREE,
  CONSTRAINT `permisos_pantallas_id_foreign` FOREIGN KEY (`pantallas_id`) REFERENCES `pantallas` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `permisos_roles_id_foreign` FOREIGN KEY (`roles_id`) REFERENCES `roles` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 45 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of permisos
-- ----------------------------
INSERT INTO `permisos` VALUES (1, 1, 1, 1, 1, 1, 1, '2021-02-06 22:33:59', '2021-06-07 00:00:00', NULL);
INSERT INTO `permisos` VALUES (2, 1, 2, 1, 1, 1, 1, '2021-02-06 22:33:59', '2021-06-07 00:00:00', NULL);
INSERT INTO `permisos` VALUES (3, 1, 3, 1, 1, 1, 1, '2021-02-08 13:32:30', '2021-06-07 00:00:00', NULL);
INSERT INTO `permisos` VALUES (5, 1, 4, 1, 1, 1, 1, '2021-02-10 11:39:33', '2021-06-07 00:00:00', NULL);
INSERT INTO `permisos` VALUES (6, 1, 5, 1, 1, 1, 1, '2021-02-10 11:42:38', '2021-06-07 00:00:00', NULL);
INSERT INTO `permisos` VALUES (7, 1, 6, 1, 0, 1, 1, '2021-04-28 20:03:52', '2021-06-07 00:00:00', NULL);
INSERT INTO `permisos` VALUES (8, 6, 1, 0, 0, 0, 0, '2021-05-19 00:00:00', '2021-05-25 00:00:00', NULL);
INSERT INTO `permisos` VALUES (9, 6, 2, 1, 1, 1, 1, '2021-05-19 00:00:00', '2021-05-25 00:00:00', NULL);
INSERT INTO `permisos` VALUES (10, 6, 3, 1, 1, 1, 1, '2021-05-19 00:00:00', '2021-05-25 00:00:00', NULL);
INSERT INTO `permisos` VALUES (11, 6, 4, 1, 0, 0, 1, '2021-05-19 00:00:00', '2021-05-25 00:00:00', NULL);
INSERT INTO `permisos` VALUES (12, 6, 5, 1, 0, 0, 0, '2021-05-19 00:00:00', '2021-05-25 00:00:00', NULL);
INSERT INTO `permisos` VALUES (13, 6, 6, 1, 1, 1, 1, '2021-05-19 00:00:00', '2021-05-25 00:00:00', NULL);
INSERT INTO `permisos` VALUES (26, 2, 1, 0, 0, 0, 0, '2021-05-19 00:00:00', '2021-05-26 00:00:00', NULL);
INSERT INTO `permisos` VALUES (27, 2, 2, 1, 1, 1, 0, '2021-05-19 00:00:00', '2021-05-26 00:00:00', NULL);
INSERT INTO `permisos` VALUES (28, 2, 3, 1, 0, 0, 0, '2021-05-19 00:00:00', '2021-05-26 00:00:00', NULL);
INSERT INTO `permisos` VALUES (29, 2, 4, 0, 0, 0, 0, '2021-05-19 00:00:00', '2021-05-26 00:00:00', NULL);
INSERT INTO `permisos` VALUES (30, 2, 5, 1, 0, 0, 0, '2021-05-19 00:00:00', '2021-05-26 00:00:00', NULL);
INSERT INTO `permisos` VALUES (31, 2, 6, 1, 1, 1, 1, '2021-05-19 00:00:00', '2021-05-26 00:00:00', NULL);
INSERT INTO `permisos` VALUES (44, 1, 11, 1, 1, 0, 0, '2021-05-26 00:00:00', '2021-06-07 00:00:00', NULL);

-- ----------------------------
-- Table structure for role_user
-- ----------------------------
DROP TABLE IF EXISTS `role_user`;
CREATE TABLE `role_user`  (
  `id` bigint(0) UNSIGNED NOT NULL AUTO_INCREMENT,
  `role_id` int(0) UNSIGNED NOT NULL,
  `user_id` int(0) UNSIGNED NOT NULL,
  `created_at` timestamp(0) NULL DEFAULT NULL,
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  `deleted_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 35 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of role_user
-- ----------------------------
INSERT INTO `role_user` VALUES (1, 1, 1, '2020-12-04 21:45:34', '2020-12-04 21:45:41', NULL);
INSERT INTO `role_user` VALUES (6, 1, 19, '2021-01-22 22:30:37', '2021-01-22 22:30:37', NULL);
INSERT INTO `role_user` VALUES (13, 1, 21, '2021-01-31 13:39:38', '2021-01-31 13:39:38', NULL);
INSERT INTO `role_user` VALUES (14, 1, 22, '2021-01-31 21:32:58', '2021-01-31 21:32:58', NULL);
INSERT INTO `role_user` VALUES (16, 1, 23, '2021-05-04 16:54:26', '2021-05-04 16:54:26', NULL);
INSERT INTO `role_user` VALUES (18, 1, 24, '2021-05-04 17:18:51', '2021-05-04 17:18:51', NULL);
INSERT INTO `role_user` VALUES (21, 1, 26, '2021-05-04 18:29:59', '2021-05-04 18:29:59', NULL);
INSERT INTO `role_user` VALUES (22, 1, 27, '2021-05-05 00:32:02', '2021-05-05 00:32:02', NULL);
INSERT INTO `role_user` VALUES (24, 1, 28, '2021-05-05 00:37:05', '2021-05-05 00:37:05', NULL);
INSERT INTO `role_user` VALUES (27, 1, 29, '2021-05-05 00:52:28', '2021-05-05 00:52:28', NULL);
INSERT INTO `role_user` VALUES (29, 1, 30, '2021-05-05 01:13:57', '2021-05-05 01:13:57', NULL);
INSERT INTO `role_user` VALUES (31, 1, 69, NULL, NULL, NULL);
INSERT INTO `role_user` VALUES (33, 1, 71, NULL, NULL, '2021-06-07 00:00:00');

-- ----------------------------
-- Table structure for roles
-- ----------------------------
DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles`  (
  `id` bigint(0) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp(0) NULL DEFAULT NULL,
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  `deleted_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `roles_name_unique`(`name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 28 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of roles
-- ----------------------------
INSERT INTO `roles` VALUES (1, 'admin', 'Administrador', '2020-11-22 00:00:00', '2021-05-28 00:00:00', NULL);
INSERT INTO `roles` VALUES (2, 'user', 'Usuario', '2020-11-22 00:00:00', '2021-06-07 00:00:00', NULL);
INSERT INTO `roles` VALUES (6, 'Invitado', 'Rol invitado', '2021-01-15 19:42:17', '2021-01-15 19:42:17', NULL);
INSERT INTO `roles` VALUES (24, 'qaqaqa', 'wawawa bbh', '2021-06-07 00:00:00', '2021-06-07 00:00:00', '2021-06-07 00:00:00');
INSERT INTO `roles` VALUES (25, 'qaqaqaqaa', 'qaqaqaqaqaqa', '2021-06-07 00:00:00', '2021-06-07 00:00:00', '2021-06-07 00:00:00');
INSERT INTO `roles` VALUES (26, 'xdxdxdxdxdx', 'dxddxd cfcfcfc', '2021-06-07 00:00:00', '2021-06-07 00:00:00', '2021-06-07 00:00:00');
INSERT INTO `roles` VALUES (27, 'qawaw cgfcfcfcf', 'ddxdxdxdxdxdx', '2021-06-07 00:00:00', '2021-06-07 00:00:00', '2021-06-07 00:00:00');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` bigint(0) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp(0) NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `created_at` timestamp(0) NULL DEFAULT NULL,
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  `deleted_at` timestamp(0) NULL DEFAULT NULL,
  `a_paterno` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `a_materno` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `direccion` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `foto` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `fono` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `users_email_unique`(`email`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 72 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, 'Marcelo', 'mabc@live.cl', NULL, '$2b$10$q1ZwYwzfy2QlUzY2fTuLCuZvOJRyQrHmIVMVNMIOIlHAXdj6zliYG', NULL, '2020-11-22 00:00:00', '2021-06-09 00:00:00', NULL, 'Bravo', 'Castillo', '12 Norte 16 Oriente, #2288, Talca', 'Mi Avatar.jpg', '987654321');
INSERT INTO `users` VALUES (19, 'Valeria', 'prueba@ejemplo.cl', NULL, '$2b$10$BCo6PZMKbxA/3ROLBo7D1uynIWQ/7GO6LQdk0qez0k9VZhmilWur.', NULL, '2021-01-22 21:47:01', '2021-05-26 00:00:00', NULL, 'Maza', 'sozza', '12 Norte 123', 'descarga.png', '');
INSERT INTO `users` VALUES (30, 'Marcelo Antonio', 'marcelo.a.bravo.c@gmail.cl', NULL, '$2b$10$66WGQByMZWmVkOtRin00eOGUlw2BKuWu5/nS2Gm.fDEGH0/otpWLi', NULL, '2021-05-05 01:13:57', '2021-06-08 00:00:00', NULL, 'Bravo', 'Castillo', '12 Norte #123', 'yo.jpg', '');
INSERT INTO `users` VALUES (62, 'Mariela Andrea', 'mariela2@ejemplo.cl', NULL, '$2b$10$b.qrq9mTNfYSgdPqC.veQuWXNDHe0OeCrlVHVisek7VtrtlhD5Mf6', NULL, '2021-05-05 01:13:57', '2021-04-08 00:00:00', NULL, 'Bezoain', 'Bravo', '12 Norte #123', 'fgfgfgfgfgf', '');
INSERT INTO `users` VALUES (71, 'wawawaawa', 'prueba2@ejemplo.cl', NULL, '$2b$10$4vk0/hohwXVdCxkC039iju7eJT9poh.5jR86Ed9mzHqGkXNdAGl42', NULL, '2021-06-07 00:00:00', '2021-06-07 00:00:00', '2021-06-07 00:00:00', 'esesesesesese vvgvgvv', 'drdrdrdrdrd', 'tftftftftftftftft', NULL, '6676767676767');

SET FOREIGN_KEY_CHECKS = 1;
