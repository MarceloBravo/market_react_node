/*
 Navicat Premium Data Transfer

 Source Server         : MySql 3306
 Source Server Type    : MySQL
 Source Server Version : 80020
 Source Host           : localhost:3306
 Source Schema         : mabc_react

 Target Server Type    : MySQL
 Target Server Version : 80020
 File Encoding         : 65001

 Date: 06/06/2021 11:56:53
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
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of configuracion
-- ----------------------------
INSERT INTO `configuracion` VALUES (1, 'Mabc Market', '2021-05-29 00:00:00', '2021-06-01 23:16:10');

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
  `url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `menu_padre_id` bigint(0) NULL DEFAULT NULL,
  `posicion` int(0) UNSIGNED NOT NULL DEFAULT 0,
  `created_at` timestamp(0) NULL DEFAULT NULL,
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  `deleted_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `menus_nombre_unique`(`nombre`) USING BTREE,
  UNIQUE INDEX `menus_url_unique`(`url`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of menus
-- ----------------------------
INSERT INTO `menus` VALUES (1, 'Menus', 'menus', 6, 10, '2021-02-23 00:00:00', '2021-05-31 16:43:22', NULL);
INSERT INTO `menus` VALUES (2, 'Pantallas', 'pantallas', 6, 20, '2021-02-23 20:56:08', '2021-03-02 17:21:19', NULL);
INSERT INTO `menus` VALUES (3, 'Roles', 'roles', 6, 30, '2021-02-23 20:56:29', '2021-03-02 17:26:14', NULL);
INSERT INTO `menus` VALUES (4, 'Usuarios', 'usuarios', 6, 40, '2021-02-23 20:56:39', '2021-03-03 00:38:30', NULL);
INSERT INTO `menus` VALUES (5, 'Permisos', 'permisos', 6, 50, '2021-02-23 20:56:50', '2021-02-23 20:56:50', NULL);
INSERT INTO `menus` VALUES (6, 'Configuración', NULL, NULL, 20, '2021-05-21 20:14:49', '2021-05-21 20:14:54', NULL);
INSERT INTO `menus` VALUES (7, 'Mantenedores', NULL, NULL, 10, '2021-05-21 20:15:41', '2021-05-21 20:15:45', NULL);
INSERT INTO `menus` VALUES (8, 'Personalizar', 'personalizar', 6, 60, '2021-05-29 19:16:02', '2021-05-29 21:54:46', NULL);

-- ----------------------------
-- Table structure for migrations
-- ----------------------------
DROP TABLE IF EXISTS `migrations`;
CREATE TABLE `migrations`  (
  `id` int(0) UNSIGNED NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of migrations
-- ----------------------------
INSERT INTO `migrations` VALUES (1, '2014_10_12_000000_create_users_table', 1);
INSERT INTO `migrations` VALUES (2, '2014_10_12_100000_create_password_resets_table', 1);
INSERT INTO `migrations` VALUES (3, '2019_08_19_000000_create_failed_jobs_table', 1);
INSERT INTO `migrations` VALUES (4, '2021_02_13_153529_create_roles_table', 1);
INSERT INTO `migrations` VALUES (5, '2021_02_13_154002_add_field_to_users', 1);
INSERT INTO `migrations` VALUES (6, '2021_02_13_155031_create_roles_users_table', 1);
INSERT INTO `migrations` VALUES (9, '2021_02_22_115500_create__menus_table', 2);
INSERT INTO `migrations` VALUES (10, '2021_03_08_154030_create_pantallas_table', 3);
INSERT INTO `migrations` VALUES (11, '2021_04_13_191434_create_permisos_table', 4);
INSERT INTO `migrations` VALUES (12, '2021_05_29_130649_create_configuracion_table', 5);
INSERT INTO `migrations` VALUES (13, '2021_05_29_215746_add_field_to_pantallas', 6);

-- ----------------------------
-- Table structure for pantallas
-- ----------------------------
DROP TABLE IF EXISTS `pantallas`;
CREATE TABLE `pantallas`  (
  `id` bigint(0) UNSIGNED NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `menus_id` bigint(0) UNSIGNED NOT NULL,
  `created_at` timestamp(0) NULL DEFAULT NULL,
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  `deleted_at` timestamp(0) NULL DEFAULT NULL,
  `permite_crear` tinyint(1) NOT NULL DEFAULT 1,
  `permite_editar` tinyint(1) NOT NULL DEFAULT 1,
  `permite_eliminar` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `pantallas_menus_id_foreign`(`menus_id`) USING BTREE,
  CONSTRAINT `pantallas_menus_id_foreign` FOREIGN KEY (`menus_id`) REFERENCES `menus` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of pantallas
-- ----------------------------
INSERT INTO `pantallas` VALUES (1, 'Menús', 1, '2021-03-10 17:00:30', '2021-03-16 12:49:38', NULL, 1, 1, 1);
INSERT INTO `pantallas` VALUES (3, 'Pantallas', 2, '2021-03-16 17:44:11', '2021-03-16 17:44:11', NULL, 1, 1, 1);
INSERT INTO `pantallas` VALUES (6, 'Permisos', 5, '2021-04-23 14:13:50', '2021-04-23 14:13:50', NULL, 1, 1, 1);
INSERT INTO `pantallas` VALUES (7, 'Roles', 3, '2021-05-21 20:22:23', '2021-05-21 20:22:23', NULL, 1, 1, 1);
INSERT INTO `pantallas` VALUES (8, 'Usuarios', 4, '2021-05-21 20:22:35', '2021-05-21 20:22:35', NULL, 1, 1, 1);
INSERT INTO `pantallas` VALUES (9, 'Personalizar', 8, '2021-05-29 19:19:31', '2021-05-30 00:12:30', NULL, 1, 0, 0);

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
  `rol_id` bigint(0) UNSIGNED NOT NULL,
  `pantalla_id` bigint(0) UNSIGNED NOT NULL,
  `acceso` tinyint(1) NOT NULL DEFAULT 0,
  `crear` tinyint(1) NOT NULL DEFAULT 0,
  `editar` tinyint(1) NOT NULL DEFAULT 0,
  `eliminar` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp(0) NULL DEFAULT NULL,
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `permisos_rol_id_foreign`(`rol_id`) USING BTREE,
  INDEX `permisos_pantalla_id_foreign`(`pantalla_id`) USING BTREE,
  CONSTRAINT `permisos_pantalla_id_foreign` FOREIGN KEY (`pantalla_id`) REFERENCES `pantallas` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `permisos_rol_id_foreign` FOREIGN KEY (`rol_id`) REFERENCES `roles` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of permisos
-- ----------------------------
INSERT INTO `permisos` VALUES (1, 1, 1, 1, 1, 1, 1, '2021-04-27 13:15:30', '2021-05-28 23:16:29');
INSERT INTO `permisos` VALUES (2, 1, 3, 1, 1, 1, 1, '2021-04-27 13:15:31', '2021-05-23 14:08:57');
INSERT INTO `permisos` VALUES (3, 1, 6, 1, 1, 1, 1, '2021-04-27 13:15:31', '2021-04-27 18:07:06');
INSERT INTO `permisos` VALUES (4, 2, 1, 0, 0, 0, 0, '2021-04-27 19:21:29', '2021-05-23 19:50:41');
INSERT INTO `permisos` VALUES (5, 2, 3, 1, 1, 1, 1, '2021-04-27 19:21:29', '2021-04-27 20:20:49');
INSERT INTO `permisos` VALUES (6, 2, 6, 1, 0, 0, 0, '2021-04-27 19:21:29', '2021-04-27 20:20:49');
INSERT INTO `permisos` VALUES (7, 1, 7, 1, 1, 1, 1, '2021-05-21 20:22:57', '2021-05-23 14:08:57');
INSERT INTO `permisos` VALUES (8, 1, 8, 1, 1, 1, 1, '2021-05-21 20:22:57', '2021-05-21 20:22:57');
INSERT INTO `permisos` VALUES (9, 2, 7, 0, 0, 0, 0, '2021-05-23 19:36:31', '2021-05-23 19:36:31');
INSERT INTO `permisos` VALUES (10, 2, 8, 0, 0, 0, 0, '2021-05-23 19:36:31', '2021-05-23 19:36:31');
INSERT INTO `permisos` VALUES (11, 1, 9, 1, 1, 1, 1, '2021-05-29 19:19:49', '2021-05-29 19:19:49');

-- ----------------------------
-- Table structure for roles
-- ----------------------------
DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles`  (
  `id` bigint(0) UNSIGNED NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `descripcion` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp(0) NULL DEFAULT NULL,
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  `deleted_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `roles_nombre_unique`(`nombre`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of roles
-- ----------------------------
INSERT INTO `roles` VALUES (1, 'Admin', 'Rol administrador', '2021-02-13 00:00:00', '2021-02-13 00:00:00', NULL);
INSERT INTO `roles` VALUES (2, 'User', 'Usuario standard', '2021-02-13 00:00:00', '2021-02-13 00:00:00', NULL);

-- ----------------------------
-- Table structure for roles_users
-- ----------------------------
DROP TABLE IF EXISTS `roles_users`;
CREATE TABLE `roles_users`  (
  `id` bigint(0) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` bigint(0) NOT NULL,
  `rol_id` bigint(0) NOT NULL,
  `created_at` timestamp(0) NULL DEFAULT NULL,
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  `deleted_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of roles_users
-- ----------------------------
INSERT INTO `roles_users` VALUES (1, 1, 1, '2021-03-29 09:02:12', '2021-03-29 09:02:17', NULL);
INSERT INTO `roles_users` VALUES (2, 1, 2, '2021-03-29 09:04:42', '2021-03-29 09:04:46', NULL);
INSERT INTO `roles_users` VALUES (3, 17, 1, '2021-04-05 14:56:41', '2021-04-05 14:56:41', NULL);
INSERT INTO `roles_users` VALUES (4, 17, 2, '2021-04-05 14:56:41', '2021-04-05 14:56:41', NULL);
INSERT INTO `roles_users` VALUES (5, 16, 1, '2021-04-06 14:36:24', '2021-04-06 14:36:24', NULL);
INSERT INTO `roles_users` VALUES (6, 16, 2, '2021-04-06 14:36:24', '2021-04-06 14:36:24', NULL);
INSERT INTO `roles_users` VALUES (7, 2, 1, '2021-04-06 14:37:39', '2021-04-06 14:37:39', NULL);
INSERT INTO `roles_users` VALUES (8, 2, 2, '2021-04-06 14:37:39', '2021-04-06 14:37:39', NULL);
INSERT INTO `roles_users` VALUES (9, 18, 1, '2021-04-13 17:29:18', '2021-04-13 17:29:18', NULL);
INSERT INTO `roles_users` VALUES (10, 18, 2, '2021-04-13 17:29:18', '2021-04-13 17:29:18', NULL);

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
  `apellido1` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `apellido2` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `fono` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `direccion` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `users_email_unique`(`email`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 18 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, 'Marcelo', 'mabc@live.cl', NULL, '$2y$10$CH1wbDnqCQLIst0kGfvaXeV4996Bwo7ihK4uR1qKSn2s5X9hRnxtu', NULL, '2021-02-13 00:00:00', '2021-04-03 18:43:05', NULL, 'Bravo', 'Castillo', '0987654321', '12 Norte 16 Oriente');
INSERT INTO `users` VALUES (2, 'Pedro', 'prueba@ejemplo.cl', NULL, '$2y$10$lH24rJrqozTLXGkJnoh4yurvPUrffY.WLad/JPZWXvQaQL4spkQte', NULL, '2021-02-13 00:00:00', '2021-02-13 00:00:00', NULL, 'Perez', 'Pereira', '09123456789', '12 Sur 16 Poniente, 1234');
INSERT INTO `users` VALUES (18, 'Juana', 'jauana@ejemplo.cl', NULL, '$2y$10$ac.2Mr8KAtw7aZUd0Rgf5unhZsQ78fxIDPp5axarT83Gv6rxwb8c.', NULL, '2021-04-13 17:29:17', '2021-04-13 17:29:17', NULL, 'Contreras', 'Pereira', '123456789', '1 sur 17 Oriente');

SET FOREIGN_KEY_CHECKS = 1;
