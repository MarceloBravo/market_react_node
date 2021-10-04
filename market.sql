/*
 Navicat Premium Data Transfer

 Source Server         : MySql 3306
 Source Server Type    : MySQL
 Source Server Version : 80020
 Source Host           : localhost:3306
 Source Schema         : market

 Target Server Type    : MySQL
 Target Server Version : 80020
 File Encoding         : 65001

 Date: 03/10/2021 11:39:53
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for categorias
-- ----------------------------
DROP TABLE IF EXISTS `categorias`;
CREATE TABLE `categorias`  (
  `id` bigint(0) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `created_at` timestamp(0) NOT NULL,
  `updated_at` timestamp(0) NOT NULL,
  `deleted_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of categorias
-- ----------------------------
INSERT INTO `categorias` VALUES (1, 'Electrónica', '2021-06-13 00:00:00', '2021-06-13 00:00:00', NULL);
INSERT INTO `categorias` VALUES (4, 'Computación', '2021-06-13 00:00:00', '2021-06-13 00:00:00', NULL);
INSERT INTO `categorias` VALUES (5, 'Deportes', '2021-06-14 00:00:00', '2021-06-14 00:00:00', NULL);
INSERT INTO `categorias` VALUES (6, 'Vestuario', '2021-06-14 00:00:00', '2021-06-14 00:00:00', NULL);
INSERT INTO `categorias` VALUES (7, 'wawawawawaw esese', '2021-06-14 00:00:00', '2021-06-14 00:00:00', '2021-06-14 00:00:00');

-- ----------------------------
-- Table structure for clientes
-- ----------------------------
DROP TABLE IF EXISTS `clientes`;
CREATE TABLE `clientes`  (
  `id` bigint(0) UNSIGNED NOT NULL AUTO_INCREMENT,
  `rut` varchar(14) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `nombres` varchar(50) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `apellido1` varchar(50) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `apellido2` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT '',
  `direccion` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL,
  `cod_region` varchar(10) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `cod_provincia` varchar(10) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL COMMENT 'Código obtenido desde la página \"Api: División Político Administrativa\"',
  `cod_comuna` varchar(10) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL COMMENT 'Código obtenido desde la página \"Api: División Político Administrativa\"',
  `ciudad` varchar(20) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `password` varchar(70) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `fono` varchar(20) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `foto` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL,
  `casa_num` varchar(10) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `block_num` varchar(10) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT '',
  `referencia` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT '' COMMENT 'Reeferencias adicionales para la dirección del cliente',
  `created_at` timestamp(0) NOT NULL,
  `updated_at` timestamp(0) NOT NULL,
  `deleted_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of clientes
-- ----------------------------
INSERT INTO `clientes` VALUES (2, '11.111.111-1', 'Marcelo', 'Bravo', 'Castillo', '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '$2b$10$Ead6AIGPX.1cs9UlPF6sxerGCO9/yFTjI7a6hpP.0nOT4Ve1UtNai', 'mabc@prueba.cl', '+ 56 9 98765432', 'perfil.jpg', '1234', 'Talca', 'Cerca de colegio', '2021-08-10 00:00:00', '2021-09-30 00:00:00', NULL);
INSERT INTO `clientes` VALUES (3, '22.222.222-2', 'Juan', 'Pérez', 'Pereira', '1 Nortre 2 Sur', '13', '131', '13108', 'Santiago', '$2b$10$rlcE3dGyjc2dyqynHPkCCeOZyxbdoeNhYHwW8TKmV6hnov73ecQg6', 'juan@ejemplo.cl', '09 87654321', NULL, '5432', '0', 'Cerca del costanera', '2021-08-11 00:00:00', '2021-08-11 00:00:00', NULL);
INSERT INTO `clientes` VALUES (4, '33.333.333-3', 'Carla', 'Contreras', 'Jerez', '1 Oriente 1 Poniente', '07', '071', '07105', 'Talca', '$2b$10$L0PIiJtrTHY15M19p1RUm.bDjyZCVLH4qkOJbpal7kxt5nS.Qp7E2', 'carla@ejemplo.cl', '091234587654', NULL, '123', '0', 'Cerca de la plaza de armas', '2021-08-11 00:00:00', '2021-08-11 00:00:00', NULL);
INSERT INTO `clientes` VALUES (5, '77.777.777-7', 'Carla', 'Perez', 'Corales', '1 Oriente 3 y 4 poniente', '07', '073', '07301', 'Curicó', '$2b$10$r/fhKct8pGr5st3leghri.T23JkvwJspJxyWebW/RJLNQLKG6aBKO', 'carla@ejemplo.cl', '0909878765', 'descarga.png', '3210', '', 'Cerca de supermercado Lider', '2021-09-28 00:00:00', '2021-09-28 00:00:00', NULL);
INSERT INTO `clientes` VALUES (6, '88.888.888-8', 'Valeria', 'Maza', 'Perez', '1 Oriente 4 y 5 poniente', '13', '131', '13109', 'La cisterna', '$2b$10$rAOJOwq34ICdsPZdzuZhku6UjKfyvNuCPPlMQ.IqYvpBN6pF1JcNa', 'valeria_perez@ejemplo.cl', '1234554321', 'descarga.png', '123', '4', 'Cerca de supermercado Totus', '2021-09-28 00:00:00', '2021-09-28 00:00:00', NULL);

-- ----------------------------
-- Table structure for companias_envios
-- ----------------------------
DROP TABLE IF EXISTS `companias_envios`;
CREATE TABLE `companias_envios`  (
  `id` bigint(0) UNSIGNED NOT NULL AUTO_INCREMENT,
  `codigo` varchar(10) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `nombre` varchar(50) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `created_at` timestamp(0) NOT NULL,
  `updated_at` timestamp(0) NOT NULL,
  `deleted_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of companias_envios
-- ----------------------------
INSERT INTO `companias_envios` VALUES (1, 'chexp', 'Chile Express', '2021-08-24 18:32:25', '2021-08-24 18:32:25', NULL);

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
INSERT INTO `configuracion` VALUES (1, 'Mabc App', '2021-05-27 23:19:32', '2021-05-27 23:19:32');

-- ----------------------------
-- Table structure for despachos_ventas
-- ----------------------------
DROP TABLE IF EXISTS `despachos_ventas`;
CREATE TABLE `despachos_ventas`  (
  `id` bigint(0) UNSIGNED NOT NULL AUTO_INCREMENT,
  `venta_id` bigint(0) UNSIGNED NOT NULL,
  `direccion` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `region` varchar(10) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `provincia` varchar(10) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `comuna` varchar(10) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `ciudad` varchar(20) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `casa_num` varchar(10) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `block_num` varchar(10) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL,
  `referencia` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL,
  `shipping_cod` bigint(0) UNSIGNED NOT NULL,
  `fecha_despacho` timestamp(0) NULL DEFAULT NULL,
  `created_at` timestamp(0) NOT NULL,
  `updated_at` timestamp(0) NOT NULL,
  `deleted_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `ventas-despachos`(`venta_id`) USING BTREE,
  INDEX `companias_evios-despacho_ventas`(`shipping_cod`) USING BTREE,
  CONSTRAINT `companias_evios-despacho_ventas` FOREIGN KEY (`shipping_cod`) REFERENCES `companias_envios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ventas-despachos` FOREIGN KEY (`venta_id`) REFERENCES `ventas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 418 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of despachos_ventas
-- ----------------------------
INSERT INTO `despachos_ventas` VALUES (32, 53, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-23 00:00:00', '2021-08-23 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (33, 54, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, '2021-09-07 00:00:00', '2021-08-23 00:00:00', '2021-09-07 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (34, 55, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, '2021-08-26 00:00:00', '2021-08-23 00:00:00', '2021-08-26 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (35, 60, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, '2021-09-25 00:00:00', '2021-08-25 00:00:00', '2021-09-25 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (36, 61, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, '2021-08-26 00:00:00', '2021-08-25 00:00:00', '2021-08-26 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (37, 62, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, '2021-09-30 00:00:00', '2021-08-28 00:00:00', '2021-09-30 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (38, 63, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-28 00:00:00', '2021-08-28 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (39, 64, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, '2021-09-03 00:00:00', '2021-08-28 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (40, 65, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-28 00:00:00', '2021-08-28 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (41, 66, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-28 00:00:00', '2021-08-28 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (42, 67, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (43, 68, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (44, 69, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (45, 70, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (46, 71, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (47, 72, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (48, 73, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (49, 74, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (50, 75, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (51, 76, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (52, 77, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (53, 78, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (54, 79, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (55, 80, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (56, 81, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (57, 82, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (58, 83, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (59, 84, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (60, 85, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (61, 86, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (62, 87, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (63, 88, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (64, 89, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (65, 90, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (66, 91, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (67, 92, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (68, 93, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (69, 94, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (70, 95, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (71, 96, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (72, 97, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (73, 98, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (74, 99, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (75, 100, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (76, 101, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (77, 102, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (78, 103, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (79, 104, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (80, 105, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (81, 106, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (82, 107, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (83, 108, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (84, 109, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (85, 110, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (86, 111, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (87, 112, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (88, 113, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (89, 114, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (90, 115, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (91, 116, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (92, 117, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (93, 118, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (94, 119, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (95, 120, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (96, 121, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (97, 122, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (98, 123, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (99, 124, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (100, 125, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (101, 126, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (102, 127, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (103, 128, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (104, 129, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (105, 130, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (106, 131, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (107, 132, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (108, 133, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (109, 134, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (110, 135, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (111, 136, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (112, 137, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (113, 138, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (114, 139, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (115, 140, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (116, 141, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (117, 142, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (118, 143, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (119, 144, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (120, 145, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (121, 146, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (122, 147, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (123, 148, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (124, 149, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (125, 150, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (126, 151, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (127, 152, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (128, 153, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (129, 154, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (130, 155, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (131, 156, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (132, 157, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (133, 158, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (134, 159, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (135, 160, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (136, 161, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (137, 162, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (138, 163, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (139, 164, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (140, 165, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (141, 166, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (142, 167, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (143, 168, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (144, 169, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (145, 170, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (146, 171, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (147, 172, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (148, 173, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (149, 174, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (150, 175, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (151, 176, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (152, 177, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (153, 178, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (154, 179, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (155, 180, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (156, 181, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (157, 182, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (158, 183, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (159, 184, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (160, 185, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (161, 186, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (162, 187, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (163, 188, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (164, 189, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (165, 190, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (166, 191, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (167, 192, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (168, 193, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (169, 194, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (170, 195, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (171, 196, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (172, 197, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (173, 198, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (174, 199, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (175, 200, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (177, 202, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (178, 203, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (179, 204, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (180, 205, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (184, 209, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (185, 210, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (186, 211, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (187, 212, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (188, 213, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (189, 214, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (190, 215, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (191, 216, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (192, 217, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (193, 218, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (194, 219, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (195, 220, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (196, 221, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (197, 222, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (198, 223, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (199, 224, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (200, 225, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (201, 226, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (202, 227, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (203, 228, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (204, 229, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (205, 230, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (206, 231, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (207, 232, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (208, 233, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (209, 234, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (210, 235, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (211, 236, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (212, 237, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (213, 238, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (214, 239, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (215, 240, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (216, 241, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (217, 242, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (218, 243, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (219, 244, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (220, 245, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (221, 246, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (222, 247, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (223, 248, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (224, 249, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (225, 250, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (226, 251, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (227, 252, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (228, 253, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (229, 254, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (230, 255, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (231, 256, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (232, 257, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (233, 258, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (234, 259, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (235, 260, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (236, 261, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (237, 262, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (238, 263, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (239, 264, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (240, 265, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (241, 266, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (242, 267, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (243, 268, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (244, 269, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (245, 270, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (246, 271, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (247, 272, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (248, 273, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (249, 274, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (250, 275, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (251, 276, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (252, 277, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (253, 278, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (254, 279, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (255, 280, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (256, 281, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (257, 282, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (258, 283, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (259, 284, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (260, 285, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (261, 286, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (262, 287, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (263, 288, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (264, 289, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (265, 290, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (266, 291, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (267, 292, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (268, 293, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (269, 294, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (270, 295, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (271, 296, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (272, 297, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (273, 298, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (274, 299, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (276, 301, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (277, 302, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (278, 303, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (279, 304, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (280, 305, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (282, 307, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (283, 308, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (284, 309, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (285, 310, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (286, 311, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (287, 312, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (288, 313, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (289, 314, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (290, 315, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (291, 316, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (292, 317, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (293, 318, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (294, 319, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (295, 320, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (296, 321, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (297, 322, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (298, 323, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (300, 325, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (301, 326, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (302, 327, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (303, 328, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (304, 329, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (305, 330, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (306, 331, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (307, 332, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (308, 333, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (309, 334, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (310, 335, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (311, 336, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (312, 337, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (313, 338, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (314, 339, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (315, 340, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (316, 341, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (317, 342, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (318, 343, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (319, 344, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (320, 345, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (321, 346, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (322, 347, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (323, 348, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (324, 349, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (325, 350, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (326, 351, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (327, 352, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (328, 353, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (329, 354, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (330, 355, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (331, 356, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (332, 357, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (333, 358, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (334, 359, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (335, 360, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (336, 361, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (337, 362, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (338, 363, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (339, 364, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (340, 365, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (341, 366, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (342, 367, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (343, 368, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (344, 369, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (345, 370, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (346, 371, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (347, 372, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (348, 373, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (349, 374, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (350, 375, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (351, 376, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (352, 377, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (353, 378, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (354, 379, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (355, 380, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (356, 381, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (357, 382, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (358, 383, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (359, 384, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (360, 385, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (361, 386, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (362, 387, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (363, 388, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (364, 389, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (365, 390, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (366, 391, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (367, 392, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (368, 393, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (369, 394, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (370, 395, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (371, 396, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (372, 397, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (373, 398, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (374, 399, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (375, 400, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (376, 401, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (377, 402, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (378, 403, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (379, 404, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (380, 405, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (381, 406, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (382, 407, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (383, 408, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (384, 409, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (386, 411, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (387, 412, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (388, 413, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (389, 414, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (390, 415, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (391, 416, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (392, 417, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (393, 418, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (394, 419, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (395, 420, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (396, 421, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (397, 422, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (398, 423, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (399, 424, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (400, 425, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (401, 426, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (402, 427, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (403, 428, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (404, 429, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (405, 430, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (406, 431, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (407, 432, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (408, 433, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (409, 434, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (410, 435, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (411, 436, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (412, 437, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (413, 438, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (414, 439, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (415, 440, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (416, 441, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (417, 442, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-25 00:00:00', '2021-09-25 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (418, 443, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2021-09-30 00:00:00', '2021-09-30 00:00:00', NULL);

-- ----------------------------
-- Table structure for detalle_ventas
-- ----------------------------
DROP TABLE IF EXISTS `detalle_ventas`;
CREATE TABLE `detalle_ventas`  (
  `id` bigint(0) UNSIGNED NOT NULL AUTO_INCREMENT,
  `venta_id` bigint(0) UNSIGNED NOT NULL,
  `producto_id` bigint(0) UNSIGNED NOT NULL,
  `precio_neto` int(0) NOT NULL COMMENT 'Precio al momento de la venta',
  `impuesto` int(0) NOT NULL COMMENT 'Promedio de los porcentajes de impuestos aplicados',
  `JSON_impuestos` varchar(300) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT '' COMMENT 'JSON con los códigos de los impuestos y porcentaje de cada impuesto',
  `precio_venta` int(0) NOT NULL,
  `cantidad` int(0) NOT NULL,
  `total_producto` int(0) NOT NULL,
  `created_at` timestamp(0) NOT NULL,
  `updated_at` timestamp(0) NOT NULL,
  `deleted_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `ventas-detalle_ventas`(`venta_id`) USING BTREE,
  CONSTRAINT `ventas-detalle_ventas` FOREIGN KEY (`venta_id`) REFERENCES `ventas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 469 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of detalle_ventas
-- ----------------------------
INSERT INTO `detalle_ventas` VALUES (63, 53, 65, 9990, 19, NULL, 11888, 2, 23776, '2021-08-23 00:00:00', '2021-08-23 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (64, 53, 69, 10000, 19, NULL, 11900, 1, 11900, '2021-08-23 00:00:00', '2021-08-23 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (65, 54, 61, 110000, 19, NULL, 130900, 1, 130900, '2021-08-23 00:00:00', '2021-08-23 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (66, 54, 69, 10000, 19, NULL, 11900, 2, 23800, '2021-08-23 00:00:00', '2021-08-23 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (67, 54, 70, 27990, 19, NULL, 33308, 1, 33308, '2021-08-23 00:00:00', '2021-08-23 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (68, 55, 65, 9990, 19, NULL, 11888, 2, 23776, '2021-08-23 00:00:00', '2021-08-23 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (69, 55, 69, 10000, 19, NULL, 11900, 1, 11900, '2021-08-23 00:00:00', '2021-08-23 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (78, 60, 65, 9990, 19, NULL, 11888, 1, 11888, '2021-08-25 00:00:00', '2021-08-25 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (79, 60, 69, 10000, 19, NULL, 11900, 2, 23800, '2021-08-25 00:00:00', '2021-08-25 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (80, 61, 61, 110000, 19, NULL, 130900, 1, 130900, '2021-08-25 00:00:00', '2021-08-25 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (81, 62, 68, 48990, 19, NULL, 58298, 1, 58298, '2021-08-28 00:00:00', '2021-08-28 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (82, 62, 70, 27990, 19, NULL, 33308, 1, 33308, '2021-08-28 00:00:00', '2021-08-28 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (83, 63, 68, 48990, 19, NULL, 58298, 1, 58298, '2021-08-28 00:00:00', '2021-08-28 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (84, 63, 70, 27990, 19, NULL, 33308, 1, 33308, '2021-08-28 00:00:00', '2021-08-28 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (85, 64, 63, 50000, 19, NULL, 59500, 2, 119000, '2021-08-28 00:00:00', '2021-08-28 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (86, 65, 63, 50000, 19, NULL, 59500, 2, 119000, '2021-08-28 00:00:00', '2021-08-28 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (87, 66, 62, 110000, 19, NULL, 130900, 1, 130900, '2021-08-28 00:00:00', '2021-08-28 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (88, 67, 69, 10000, 19, NULL, 11900, 1, 11900, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (89, 68, 69, 10000, 19, NULL, 11900, 1, 11900, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (90, 69, 66, 69990, 19, NULL, 83288, 1, 83288, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (91, 70, 66, 69990, 19, NULL, 83288, 1, 83288, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (92, 71, 68, 48990, 19, NULL, 58298, 1, 58298, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (93, 72, 71, 29990, 19, NULL, 35688, 1, 35688, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (94, 73, 60, 529990, 19, NULL, 630688, 1, 630688, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (95, 74, 69, 10000, 19, NULL, 11900, 1, 11900, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (96, 75, 63, 50000, 19, NULL, 59500, 1, 59500, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (97, 76, 65, 9990, 19, NULL, 11888, 1, 11888, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (98, 77, 71, 29990, 19, NULL, 35688, 1, 35688, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (99, 78, 70, 27990, 19, NULL, 33308, 1, 33308, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (100, 79, 61, 110000, 19, NULL, 130900, 1, 130900, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (101, 80, 63, 50000, 19, NULL, 59500, 1, 59500, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (102, 81, 68, 48990, 19, NULL, 58298, 1, 58298, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (103, 82, 67, 21990, 19, NULL, 26168, 1, 26168, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (104, 83, 71, 29990, 19, NULL, 35688, 1, 35688, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (105, 84, 61, 110000, 19, NULL, 130900, 1, 130900, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (106, 85, 63, 50000, 19, NULL, 59500, 1, 59500, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (107, 86, 67, 21990, 19, NULL, 26168, 1, 26168, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (108, 87, 68, 48990, 19, NULL, 58298, 1, 58298, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (109, 88, 65, 9990, 19, NULL, 11888, 1, 11888, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (110, 89, 63, 50000, 19, NULL, 59500, 1, 59500, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (111, 90, 71, 29990, 19, NULL, 35688, 1, 35688, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (112, 91, 67, 21990, 19, NULL, 26168, 1, 26168, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (113, 92, 65, 9990, 19, NULL, 11888, 1, 11888, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (114, 93, 63, 50000, 19, NULL, 59500, 1, 59500, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (115, 94, 71, 29990, 19, NULL, 35688, 1, 35688, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (116, 95, 65, 9990, 19, NULL, 11888, 1, 11888, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (117, 96, 65, 9990, 19, NULL, 11888, 1, 11888, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (118, 97, 69, 10000, 19, NULL, 11900, 1, 11900, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (119, 98, 71, 29990, 19, NULL, 35688, 1, 35688, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (120, 98, 66, 69990, 19, NULL, 83288, 1, 83288, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (121, 99, 67, 21990, 19, NULL, 26168, 1, 26168, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (122, 100, 71, 29990, 19, NULL, 35688, 1, 35688, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (123, 101, 63, 50000, 19, NULL, 59500, 1, 59500, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (124, 102, 63, 50000, 19, NULL, 59500, 1, 59500, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (125, 103, 70, 27990, 19, NULL, 33308, 1, 33308, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (126, 104, 66, 69990, 19, NULL, 83288, 1, 83288, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (127, 105, 60, 529990, 19, NULL, 630688, 1, 630688, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (128, 106, 67, 21990, 19, NULL, 26168, 1, 26168, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (129, 107, 68, 48990, 19, NULL, 58298, 1, 58298, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (130, 108, 62, 110000, 19, NULL, 130900, 1, 130900, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (131, 109, 70, 27990, 19, NULL, 33308, 1, 33308, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (132, 110, 60, 529990, 19, NULL, 630688, 1, 630688, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (133, 111, 60, 529990, 19, NULL, 630688, 1, 630688, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (134, 112, 71, 29990, 19, NULL, 35688, 1, 35688, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (135, 113, 68, 48990, 19, NULL, 58298, 1, 58298, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (136, 114, 63, 50000, 19, NULL, 59500, 1, 59500, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (137, 115, 61, 110000, 19, NULL, 130900, 1, 130900, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (138, 116, 66, 69990, 19, NULL, 83288, 1, 83288, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (139, 117, 70, 27990, 19, NULL, 33308, 1, 33308, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (140, 118, 65, 9990, 19, NULL, 11888, 1, 11888, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (141, 119, 63, 50000, 19, NULL, 59500, 1, 59500, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (142, 120, 68, 48990, 19, NULL, 58298, 1, 58298, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (143, 121, 70, 27990, 19, NULL, 33308, 1, 33308, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (144, 122, 68, 48990, 19, NULL, 58298, 1, 58298, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (145, 123, 63, 50000, 19, NULL, 59500, 1, 59500, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (146, 124, 68, 48990, 19, NULL, 58298, 1, 58298, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (147, 125, 68, 48990, 19, NULL, 58298, 1, 58298, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (148, 126, 63, 50000, 19, NULL, 59500, 1, 59500, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (149, 127, 61, 110000, 19, NULL, 130900, 1, 130900, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (150, 128, 62, 110000, 19, NULL, 130900, 1, 130900, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (151, 128, 63, 50000, 19, NULL, 59500, 1, 59500, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (152, 129, 71, 29990, 19, NULL, 35688, 1, 35688, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (153, 130, 68, 48990, 19, NULL, 58298, 1, 58298, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (154, 131, 63, 50000, 19, NULL, 59500, 1, 59500, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (155, 132, 63, 50000, 19, NULL, 59500, 1, 59500, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (156, 133, 63, 50000, 19, NULL, 59500, 1, 59500, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (157, 134, 62, 110000, 19, NULL, 130900, 1, 130900, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (158, 135, 63, 50000, 19, NULL, 59500, 1, 59500, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (159, 136, 63, 50000, 19, NULL, 59500, 1, 59500, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (160, 137, 61, 110000, 19, NULL, 130900, 1, 130900, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (161, 138, 63, 50000, 19, NULL, 59500, 1, 59500, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (162, 139, 63, 50000, 19, NULL, 59500, 1, 59500, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (163, 140, 68, 48990, 19, NULL, 58298, 1, 58298, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (164, 141, 62, 110000, 19, NULL, 130900, 1, 130900, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (165, 142, 62, 110000, 19, NULL, 130900, 1, 130900, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (166, 142, 63, 50000, 19, NULL, 59500, 1, 59500, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (167, 143, 63, 50000, 19, NULL, 59500, 1, 59500, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (168, 144, 62, 110000, 19, NULL, 130900, 1, 130900, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (169, 145, 63, 50000, 19, NULL, 59500, 1, 59500, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (170, 146, 63, 50000, 19, NULL, 59500, 1, 59500, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (171, 147, 63, 50000, 19, NULL, 59500, 1, 59500, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (172, 148, 63, 50000, 19, NULL, 59500, 1, 59500, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (173, 149, 63, 50000, 19, NULL, 59500, 1, 59500, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (174, 150, 63, 50000, 19, NULL, 59500, 1, 59500, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (175, 151, 63, 50000, 19, NULL, 59500, 1, 59500, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (176, 152, 61, 110000, 19, NULL, 130900, 1, 130900, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (177, 153, 63, 50000, 19, NULL, 59500, 1, 59500, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (178, 154, 63, 50000, 19, NULL, 59500, 1, 59500, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (179, 155, 68, 48990, 19, NULL, 58298, 1, 58298, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (180, 156, 68, 48990, 19, NULL, 58298, 1, 58298, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (181, 157, 63, 50000, 19, NULL, 59500, 1, 59500, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (182, 158, 61, 110000, 19, NULL, 130900, 1, 130900, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (183, 159, 60, 529990, 19, NULL, 630688, 1, 630688, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (184, 160, 62, 110000, 19, NULL, 130900, 1, 130900, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (185, 161, 61, 110000, 19, NULL, 130900, 1, 130900, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (186, 162, 63, 50000, 19, NULL, 59500, 1, 59500, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (187, 163, 63, 50000, 19, NULL, 59500, 1, 59500, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (188, 164, 68, 48990, 19, NULL, 58298, 1, 58298, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (189, 165, 63, 50000, 19, NULL, 59500, 1, 59500, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (190, 166, 62, 110000, 19, NULL, 130900, 1, 130900, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (191, 167, 62, 110000, 19, NULL, 130900, 1, 130900, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (192, 168, 63, 50000, 19, NULL, 59500, 1, 59500, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (193, 169, 63, 50000, 19, NULL, 59500, 1, 59500, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (194, 170, 60, 529990, 19, NULL, 630688, 1, 630688, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (195, 171, 63, 50000, 19, NULL, 59500, 1, 59500, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (196, 172, 62, 110000, 19, NULL, 130900, 1, 130900, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (197, 173, 63, 50000, 19, NULL, 59500, 1, 59500, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (198, 174, 63, 50000, 19, NULL, 59500, 1, 59500, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (199, 175, 61, 110000, 19, NULL, 130900, 1, 130900, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (200, 176, 61, 110000, 19, NULL, 130900, 1, 130900, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (201, 177, 63, 50000, 19, NULL, 59500, 1, 59500, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (202, 178, 61, 110000, 19, NULL, 130900, 1, 130900, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (203, 179, 63, 50000, 19, NULL, 59500, 1, 59500, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (204, 180, 63, 50000, 19, NULL, 59500, 1, 59500, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (205, 181, 63, 50000, 19, NULL, 59500, 1, 59500, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (206, 182, 65, 9990, 19, NULL, 11888, 1, 11888, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (207, 182, 68, 48990, 19, NULL, 58298, 1, 58298, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (208, 183, 63, 50000, 19, NULL, 59500, 1, 59500, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (209, 184, 63, 50000, 19, NULL, 59500, 1, 59500, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (210, 185, 61, 110000, 19, NULL, 130900, 1, 130900, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (211, 186, 61, 110000, 19, NULL, 130900, 1, 130900, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (212, 187, 60, 529990, 19, NULL, 630688, 1, 630688, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (213, 188, 61, 110000, 19, NULL, 130900, 1, 130900, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (214, 189, 61, 110000, 19, NULL, 130900, 1, 130900, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (215, 190, 65, 9990, 19, NULL, 11888, 1, 11888, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (216, 191, 61, 110000, 19, NULL, 130900, 1, 130900, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (217, 192, 63, 50000, 19, NULL, 59500, 1, 59500, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (218, 193, 60, 529990, 19, NULL, 630688, 1, 630688, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (219, 194, 60, 529990, 19, NULL, 630688, 1, 630688, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (220, 195, 60, 529990, 19, NULL, 630688, 1, 630688, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (221, 196, 61, 110000, 19, NULL, 130900, 1, 130900, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (222, 197, 61, 110000, 19, NULL, 130900, 1, 130900, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (223, 198, 60, 529990, 19, NULL, 630688, 1, 630688, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (224, 199, 61, 110000, 19, NULL, 130900, 1, 130900, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (225, 200, 61, 110000, 19, NULL, 130900, 1, 130900, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (227, 202, 71, 29990, 19, NULL, 35688, 1, 35688, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (228, 203, 66, 69990, 19, NULL, 83288, 1, 83288, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (229, 204, 62, 110000, 19, NULL, 130900, 1, 130900, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (230, 205, 71, 29990, 19, NULL, 35688, 1, 35688, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (234, 209, 68, 48990, 19, NULL, 58298, 1, 58298, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (235, 210, 61, 110000, 19, NULL, 130900, 1, 130900, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (236, 211, 61, 110000, 19, NULL, 130900, 1, 130900, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (237, 212, 60, 529990, 19, NULL, 630688, 1, 630688, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (238, 213, 60, 529990, 19, NULL, 630688, 1, 630688, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (239, 214, 60, 529990, 19, NULL, 630688, 1, 630688, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (240, 215, 60, 529990, 19, NULL, 630688, 1, 630688, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (241, 216, 60, 529990, 19, NULL, 630688, 1, 630688, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (242, 217, 60, 529990, 19, NULL, 630688, 1, 630688, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (243, 218, 60, 529990, 19, NULL, 630688, 1, 630688, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (244, 219, 60, 529990, 19, NULL, 630688, 1, 630688, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (245, 220, 60, 529990, 19, NULL, 630688, 1, 630688, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (246, 221, 60, 529990, 19, NULL, 630688, 1, 630688, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (247, 222, 60, 529990, 19, NULL, 630688, 1, 630688, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (248, 223, 60, 529990, 19, NULL, 630688, 1, 630688, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (249, 224, 60, 529990, 19, NULL, 630688, 1, 630688, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (250, 225, 60, 529990, 19, NULL, 630688, 1, 630688, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (251, 226, 60, 529990, 19, NULL, 630688, 1, 630688, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (252, 227, 60, 529990, 19, NULL, 630688, 1, 630688, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (253, 228, 60, 529990, 19, NULL, 630688, 1, 630688, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (254, 229, 60, 529990, 19, NULL, 630688, 1, 630688, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (255, 230, 60, 529990, 19, NULL, 630688, 1, 630688, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (256, 231, 60, 529990, 19, NULL, 630688, 1, 630688, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (257, 232, 60, 529990, 19, NULL, 630688, 1, 630688, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (258, 233, 60, 529990, 19, NULL, 630688, 1, 630688, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (259, 234, 60, 529990, 19, NULL, 630688, 1, 630688, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (260, 235, 60, 529990, 19, NULL, 630688, 1, 630688, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (261, 236, 60, 529990, 19, NULL, 630688, 1, 630688, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (262, 237, 60, 529990, 19, NULL, 630688, 1, 630688, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (263, 238, 60, 529990, 19, NULL, 630688, 1, 630688, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (264, 239, 60, 529990, 19, NULL, 630688, 1, 630688, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (265, 240, 60, 529990, 19, NULL, 630688, 1, 630688, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (266, 241, 60, 529990, 19, NULL, 630688, 1, 630688, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (267, 242, 60, 529990, 19, NULL, 630688, 1, 630688, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (268, 243, 60, 529990, 19, NULL, 630688, 1, 630688, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (269, 244, 60, 529990, 19, NULL, 630688, 1, 630688, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (270, 245, 60, 529990, 19, NULL, 630688, 1, 630688, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (271, 246, 60, 529990, 19, NULL, 630688, 1, 630688, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (272, 247, 60, 529990, 19, NULL, 630688, 1, 630688, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (273, 248, 60, 529990, 19, NULL, 630688, 1, 630688, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (274, 249, 60, 529990, 19, NULL, 630688, 1, 630688, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (275, 250, 60, 529990, 19, NULL, 630688, 1, 630688, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (276, 251, 60, 529990, 19, NULL, 630688, 1, 630688, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (277, 252, 60, 529990, 19, NULL, 630688, 1, 630688, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (278, 253, 60, 529990, 19, NULL, 630688, 1, 630688, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (279, 254, 60, 529990, 19, NULL, 630688, 1, 630688, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (280, 255, 60, 529990, 19, NULL, 630688, 1, 630688, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (281, 256, 60, 529990, 19, NULL, 630688, 1, 630688, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (282, 257, 60, 529990, 19, NULL, 630688, 1, 630688, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (283, 258, 60, 529990, 19, NULL, 630688, 1, 630688, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (284, 259, 60, 529990, 19, NULL, 630688, 1, 630688, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (285, 260, 60, 529990, 19, NULL, 630688, 1, 630688, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (286, 261, 60, 529990, 19, NULL, 630688, 1, 630688, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (287, 262, 60, 529990, 19, NULL, 630688, 1, 630688, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (288, 263, 60, 529990, 19, NULL, 630688, 1, 630688, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (289, 264, 60, 529990, 19, NULL, 630688, 1, 630688, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (290, 265, 60, 529990, 19, NULL, 630688, 1, 630688, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (291, 266, 60, 529990, 19, NULL, 630688, 1, 630688, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (292, 267, 60, 529990, 19, NULL, 630688, 1, 630688, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (293, 268, 60, 529990, 19, NULL, 630688, 1, 630688, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (294, 269, 60, 529990, 19, NULL, 630688, 1, 630688, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (295, 270, 60, 529990, 19, NULL, 630688, 1, 630688, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (296, 271, 60, 529990, 19, NULL, 630688, 1, 630688, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (297, 272, 60, 529990, 19, NULL, 630688, 1, 630688, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (298, 273, 60, 529990, 19, NULL, 630688, 1, 630688, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (299, 274, 60, 529990, 19, NULL, 630688, 1, 630688, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (300, 275, 60, 529990, 19, NULL, 630688, 1, 630688, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (301, 276, 60, 529990, 19, NULL, 630688, 1, 630688, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (302, 277, 60, 529990, 19, NULL, 630688, 1, 630688, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (303, 278, 60, 529990, 19, NULL, 630688, 1, 630688, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (304, 279, 60, 529990, 19, NULL, 630688, 1, 630688, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (305, 280, 60, 529990, 19, NULL, 630688, 1, 630688, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (306, 281, 60, 529990, 19, NULL, 630688, 1, 630688, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (307, 282, 60, 529990, 19, NULL, 630688, 1, 630688, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (308, 283, 60, 529990, 19, NULL, 630688, 1, 630688, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (309, 284, 60, 529990, 19, NULL, 630688, 1, 630688, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (310, 285, 60, 529990, 19, NULL, 630688, 1, 630688, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (311, 286, 60, 529990, 19, NULL, 630688, 1, 630688, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (312, 287, 60, 529990, 19, NULL, 630688, 1, 630688, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (313, 288, 60, 529990, 19, NULL, 630688, 1, 630688, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (314, 289, 60, 529990, 19, NULL, 630688, 1, 630688, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (315, 290, 60, 529990, 19, NULL, 630688, 1, 630688, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (316, 291, 60, 529990, 19, NULL, 630688, 1, 630688, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (317, 292, 60, 529990, 19, NULL, 630688, 1, 630688, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (318, 293, 60, 529990, 19, NULL, 630688, 1, 630688, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (319, 294, 60, 529990, 19, NULL, 630688, 1, 630688, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (320, 295, 60, 529990, 19, NULL, 630688, 1, 630688, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (321, 296, 60, 529990, 19, NULL, 630688, 1, 630688, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (322, 297, 60, 529990, 19, NULL, 630688, 1, 630688, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (323, 298, 60, 529990, 19, NULL, 630688, 1, 630688, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (324, 299, 60, 529990, 19, NULL, 630688, 1, 630688, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (326, 301, 61, 110000, 19, NULL, 130900, 1, 130900, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (327, 302, 61, 110000, 19, NULL, 130900, 1, 130900, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (328, 303, 61, 110000, 19, NULL, 130900, 1, 130900, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (329, 304, 61, 110000, 19, NULL, 130900, 1, 130900, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (330, 305, 61, 110000, 19, NULL, 130900, 1, 130900, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (332, 307, 62, 110000, 19, NULL, 130900, 1, 130900, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (333, 308, 62, 110000, 19, NULL, 130900, 1, 130900, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (334, 309, 62, 110000, 19, NULL, 130900, 1, 130900, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (335, 310, 62, 110000, 19, NULL, 130900, 1, 130900, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (336, 311, 62, 110000, 19, NULL, 130900, 1, 130900, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (337, 312, 62, 110000, 19, NULL, 130900, 1, 130900, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (338, 313, 62, 110000, 19, NULL, 130900, 1, 130900, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (339, 314, 62, 110000, 19, NULL, 130900, 1, 130900, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (340, 315, 62, 110000, 19, NULL, 130900, 1, 130900, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (341, 316, 62, 110000, 19, NULL, 130900, 1, 130900, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (342, 317, 62, 110000, 19, NULL, 130900, 1, 130900, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (343, 318, 62, 110000, 19, NULL, 130900, 1, 130900, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (344, 319, 62, 110000, 19, NULL, 130900, 1, 130900, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (345, 320, 62, 110000, 19, NULL, 130900, 1, 130900, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (346, 321, 62, 110000, 19, NULL, 130900, 1, 130900, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (347, 322, 62, 110000, 19, NULL, 130900, 1, 130900, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (348, 323, 62, 110000, 19, NULL, 130900, 1, 130900, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (350, 325, 65, 9990, 19, NULL, 11888, 1, 11888, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (351, 326, 65, 9990, 19, NULL, 11888, 1, 11888, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (352, 327, 65, 9990, 19, NULL, 11888, 1, 11888, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (353, 328, 65, 9990, 19, NULL, 11888, 1, 11888, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (354, 329, 65, 9990, 19, NULL, 11888, 1, 11888, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (355, 330, 65, 9990, 19, NULL, 11888, 1, 11888, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (356, 331, 65, 9990, 19, NULL, 11888, 1, 11888, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (357, 332, 65, 9990, 19, NULL, 11888, 1, 11888, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (358, 333, 65, 9990, 19, NULL, 11888, 1, 11888, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (359, 334, 65, 9990, 19, NULL, 11888, 1, 11888, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (360, 335, 65, 9990, 19, NULL, 11888, 1, 11888, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (361, 336, 65, 9990, 19, NULL, 11888, 1, 11888, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (362, 337, 65, 9990, 19, NULL, 11888, 1, 11888, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (363, 338, 65, 9990, 19, NULL, 11888, 1, 11888, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (364, 339, 65, 9990, 19, NULL, 11888, 1, 11888, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (365, 340, 65, 9990, 19, NULL, 11888, 1, 11888, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (366, 341, 65, 9990, 19, NULL, 11888, 1, 11888, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (367, 342, 65, 9990, 19, NULL, 11888, 1, 11888, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (368, 343, 65, 9990, 19, NULL, 11888, 1, 11888, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (369, 344, 65, 9990, 19, NULL, 11888, 1, 11888, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (370, 345, 65, 9990, 19, NULL, 11888, 1, 11888, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (371, 346, 65, 9990, 19, NULL, 11888, 1, 11888, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (372, 347, 65, 9990, 19, NULL, 11888, 1, 11888, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (373, 348, 65, 9990, 19, NULL, 11888, 1, 11888, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (374, 349, 65, 9990, 19, NULL, 11888, 1, 11888, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (375, 350, 65, 9990, 19, NULL, 11888, 1, 11888, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (376, 351, 65, 9990, 19, NULL, 11888, 1, 11888, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (377, 352, 65, 9990, 19, NULL, 11888, 1, 11888, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (378, 353, 65, 9990, 19, NULL, 11888, 1, 11888, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (379, 354, 65, 9990, 19, NULL, 11888, 1, 11888, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (380, 355, 65, 9990, 19, NULL, 11888, 1, 11888, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (381, 356, 65, 9990, 19, NULL, 11888, 1, 11888, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (382, 357, 65, 9990, 19, NULL, 11888, 1, 11888, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (383, 358, 65, 9990, 19, NULL, 11888, 1, 11888, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (384, 359, 65, 9990, 19, NULL, 11888, 1, 11888, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (385, 360, 65, 9990, 19, NULL, 11888, 1, 11888, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (386, 361, 65, 9990, 19, NULL, 11888, 1, 11888, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (387, 362, 65, 9990, 19, NULL, 11888, 1, 11888, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (388, 363, 65, 9990, 19, NULL, 11888, 1, 11888, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (389, 364, 65, 9990, 19, NULL, 11888, 1, 11888, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (390, 365, 65, 9990, 19, NULL, 11888, 1, 11888, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (391, 366, 65, 9990, 19, NULL, 11888, 1, 11888, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (392, 367, 65, 9990, 19, NULL, 11888, 1, 11888, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (393, 368, 65, 9990, 19, NULL, 11888, 1, 11888, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (394, 369, 65, 9990, 19, NULL, 11888, 1, 11888, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (395, 370, 65, 9990, 19, NULL, 11888, 1, 11888, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (396, 371, 65, 9990, 19, NULL, 11888, 1, 11888, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (397, 372, 65, 9990, 19, NULL, 11888, 1, 11888, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (398, 373, 65, 9990, 19, NULL, 11888, 1, 11888, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (399, 374, 65, 9990, 19, NULL, 11888, 1, 11888, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (400, 375, 65, 9990, 19, NULL, 11888, 1, 11888, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (401, 376, 65, 9990, 19, NULL, 11888, 1, 11888, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (402, 377, 65, 9990, 19, NULL, 11888, 1, 11888, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (403, 378, 65, 9990, 19, NULL, 11888, 1, 11888, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (404, 379, 65, 9990, 19, NULL, 11888, 1, 11888, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (405, 380, 65, 9990, 19, NULL, 11888, 1, 11888, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (406, 381, 65, 9990, 19, NULL, 11888, 1, 11888, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (407, 382, 65, 9990, 19, NULL, 11888, 1, 11888, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (408, 383, 65, 9990, 19, NULL, 11888, 1, 11888, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (409, 384, 65, 9990, 19, NULL, 11888, 1, 11888, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (410, 385, 65, 9990, 19, NULL, 11888, 1, 11888, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (411, 386, 65, 9990, 19, NULL, 11888, 1, 11888, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (412, 387, 65, 9990, 19, NULL, 11888, 1, 11888, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (413, 388, 65, 9990, 19, NULL, 11888, 1, 11888, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (414, 389, 65, 9990, 19, NULL, 11888, 1, 11888, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (415, 390, 65, 9990, 19, NULL, 11888, 1, 11888, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (416, 391, 65, 9990, 19, NULL, 11888, 1, 11888, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (417, 392, 65, 9990, 19, NULL, 11888, 1, 11888, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (418, 393, 65, 9990, 19, NULL, 11888, 1, 11888, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (419, 394, 65, 9990, 19, NULL, 11888, 1, 11888, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (420, 395, 65, 9990, 19, NULL, 11888, 1, 11888, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (421, 396, 65, 9990, 19, NULL, 11888, 1, 11888, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (422, 397, 65, 9990, 19, NULL, 11888, 1, 11888, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (423, 398, 65, 9990, 19, NULL, 11888, 1, 11888, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (424, 399, 65, 9990, 19, NULL, 11888, 1, 11888, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (425, 400, 65, 9990, 19, NULL, 11888, 1, 11888, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (426, 401, 65, 9990, 19, NULL, 11888, 1, 11888, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (427, 402, 65, 9990, 19, NULL, 11888, 1, 11888, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (428, 403, 65, 9990, 19, NULL, 11888, 1, 11888, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (429, 404, 65, 9990, 19, NULL, 11888, 1, 11888, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (430, 405, 65, 9990, 19, NULL, 11888, 1, 11888, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (431, 406, 65, 9990, 19, NULL, 11888, 1, 11888, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (432, 407, 65, 9990, 19, NULL, 11888, 1, 11888, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (433, 408, 65, 9990, 19, NULL, 11888, 1, 11888, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (434, 409, 65, 9990, 19, NULL, 11888, 1, 11888, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (436, 411, 70, 27990, 19, NULL, 33308, 1, 33308, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (437, 412, 70, 27990, 19, NULL, 33308, 1, 33308, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (438, 413, 70, 27990, 19, NULL, 33308, 1, 33308, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (439, 414, 70, 27990, 19, NULL, 33308, 1, 33308, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (440, 415, 70, 27990, 19, NULL, 33308, 1, 33308, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (441, 416, 70, 27990, 19, NULL, 33308, 1, 33308, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (442, 417, 70, 27990, 19, NULL, 33308, 1, 33308, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (443, 418, 70, 27990, 19, NULL, 33308, 1, 33308, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (444, 419, 70, 27990, 19, NULL, 33308, 1, 33308, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (445, 420, 70, 27990, 19, NULL, 33308, 1, 33308, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (446, 421, 70, 27990, 19, NULL, 33308, 1, 33308, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (447, 422, 70, 27990, 19, NULL, 33308, 1, 33308, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (448, 423, 70, 27990, 19, NULL, 33308, 1, 33308, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (449, 424, 70, 27990, 19, NULL, 33308, 1, 33308, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (450, 425, 70, 27990, 19, NULL, 33308, 1, 33308, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (451, 426, 70, 27990, 19, NULL, 33308, 1, 33308, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (452, 427, 70, 27990, 19, NULL, 33308, 1, 33308, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (453, 428, 70, 27990, 19, NULL, 33308, 1, 33308, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (454, 429, 70, 27990, 19, NULL, 33308, 1, 33308, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (455, 430, 70, 27990, 19, NULL, 33308, 1, 33308, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (456, 431, 70, 27990, 19, NULL, 33308, 1, 33308, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (457, 432, 70, 27990, 19, NULL, 33308, 1, 33308, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (458, 433, 70, 27990, 19, NULL, 33308, 1, 33308, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (459, 434, 70, 27990, 19, NULL, 33308, 1, 33308, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (460, 435, 70, 27990, 19, NULL, 33308, 1, 33308, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (461, 436, 70, 27990, 19, NULL, 33308, 1, 33308, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (462, 437, 70, 27990, 19, NULL, 33308, 1, 33308, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (463, 438, 70, 27990, 19, NULL, 33308, 1, 33308, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (464, 439, 70, 27990, 19, NULL, 33308, 1, 33308, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (465, 440, 70, 27990, 19, NULL, 33308, 1, 33308, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (466, 441, 70, 27990, 19, NULL, 33308, 1, 33308, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (467, 442, 73, 27990, 19, NULL, 33308, 1, 33308, '2021-09-25 00:00:00', '2021-09-25 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (468, 442, 69, 7000, 19, NULL, 8330, 1, 8330, '2021-09-25 00:00:00', '2021-09-25 00:00:00', NULL);
INSERT INTO `detalle_ventas` VALUES (469, 443, 67, 21990, 19, NULL, 26168, 1, 26168, '2021-09-30 00:00:00', '2021-09-30 00:00:00', NULL);

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
-- Table structure for imagenes_marquesina_home
-- ----------------------------
DROP TABLE IF EXISTS `imagenes_marquesina_home`;
CREATE TABLE `imagenes_marquesina_home`  (
  `id` bigint(0) UNSIGNED NOT NULL AUTO_INCREMENT,
  `src_imagen` varchar(500) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `texto` varchar(200) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT '',
  `link` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL,
  `posicion` bigint(0) NOT NULL,
  `created_at` timestamp(0) NOT NULL,
  `updated_at` timestamp(0) NOT NULL,
  `deleted_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 30 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of imagenes_marquesina_home
-- ----------------------------
INSERT INTO `imagenes_marquesina_home` VALUES (25, 'carrousel 1.png', 'trtrtrtrtrtrtrtrtr', '', 10, '2021-07-13 00:00:00', '2021-07-13 00:00:00', NULL);
INSERT INTO `imagenes_marquesina_home` VALUES (26, 'carrousel 3.png', 'Producto 2', 'link al producto 2', 20, '2021-07-13 00:00:00', '2021-07-13 00:00:00', NULL);
INSERT INTO `imagenes_marquesina_home` VALUES (27, 'WIN_20200709_19_11_53_Pro (2).jpg', 'cccccccccccccccc', 'link cccccccccccccccc', 30, '2021-07-13 00:00:00', '2021-07-13 00:00:00', '2021-09-30 00:00:00');
INSERT INTO `imagenes_marquesina_home` VALUES (28, 'carrousel 4.png', 'producto 3', 'link producto 3', 30, '2021-07-16 00:00:00', '2021-07-16 00:00:00', NULL);
INSERT INTO `imagenes_marquesina_home` VALUES (29, 'carrousel 5.png', '', '', 40, '2021-07-16 00:00:00', '2021-07-16 00:00:00', NULL);
INSERT INTO `imagenes_marquesina_home` VALUES (30, 'carrousel 2.png', 'Parlantes', 'link parlantes', 15, '2021-07-17 00:00:00', '2021-07-17 00:00:00', NULL);

-- ----------------------------
-- Table structure for imagenes_productos
-- ----------------------------
DROP TABLE IF EXISTS `imagenes_productos`;
CREATE TABLE `imagenes_productos`  (
  `id` bigint(0) UNSIGNED NOT NULL AUTO_INCREMENT,
  `producto_id` bigint(0) UNSIGNED NOT NULL,
  `source_image` varchar(500) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `imagen_principal` tinyint(0) NOT NULL DEFAULT 0,
  `created_at` timestamp(0) NOT NULL,
  `updated_at` timestamp(0) NOT NULL,
  `deleted_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_imagenes_productos-productos`(`producto_id`) USING BTREE,
  CONSTRAINT `fk_imagenes_productos-productos` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 334 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of imagenes_productos
-- ----------------------------
INSERT INTO `imagenes_productos` VALUES (298, 62, 'lg k41s.jpg', 1, '2021-06-23 17:56:02', '2021-06-23 17:56:02', NULL);
INSERT INTO `imagenes_productos` VALUES (299, 62, '132525505833.JPG', 0, '2021-06-23 17:56:02', '2021-09-06 00:00:00', NULL);
INSERT INTO `imagenes_productos` VALUES (301, 61, 'lg x-cam.jpg', 1, '2021-06-24 10:50:43', '2021-09-06 00:00:00', NULL);
INSERT INTO `imagenes_productos` VALUES (302, 63, 'notebook idp3-b.jpg', 1, '2021-06-25 10:48:06', '2021-06-25 10:48:06', NULL);
INSERT INTO `imagenes_productos` VALUES (303, 63, 'notebook lenovo idp3.jpg', 0, '2021-06-25 10:48:06', '2021-06-25 10:48:06', NULL);
INSERT INTO `imagenes_productos` VALUES (304, 63, 'notebook idp3-c.jpg', 0, '2021-06-25 10:48:06', '2021-09-06 00:00:00', NULL);
INSERT INTO `imagenes_productos` VALUES (305, 60, 'dron phantom3.jpg', 1, '2021-06-25 10:55:46', '2021-06-25 10:55:46', NULL);
INSERT INTO `imagenes_productos` VALUES (306, 60, 'dron phantom3-b.jpg', 0, '2021-06-25 10:55:46', '2021-06-25 10:55:46', NULL);
INSERT INTO `imagenes_productos` VALUES (307, 60, 'dron phantom3-c.jpg', 0, '2021-06-25 10:55:46', '2021-09-06 00:00:00', NULL);
INSERT INTO `imagenes_productos` VALUES (308, 65, 'pesos tobillos muñecas 1.jpg', 1, '2021-06-26 12:16:05', '2021-06-26 12:16:05', NULL);
INSERT INTO `imagenes_productos` VALUES (309, 65, 'pesos tobillos muñecas 2.jpg', 0, '2021-06-26 12:16:05', '2021-09-06 00:00:00', NULL);
INSERT INTO `imagenes_productos` VALUES (310, 66, 'maleta-mancuenrnas 1.jpg', 1, '2021-06-26 12:19:30', '2021-06-26 12:19:30', NULL);
INSERT INTO `imagenes_productos` VALUES (311, 66, 'maleta-mancuenrnas 2.jpg', 0, '2021-06-26 12:19:30', '2021-06-26 12:19:30', NULL);
INSERT INTO `imagenes_productos` VALUES (312, 66, 'maleta-mancuenrnas 3.jpg', 0, '2021-06-26 12:19:30', '2021-06-26 12:19:30', NULL);
INSERT INTO `imagenes_productos` VALUES (313, 67, 'pesa-rusa 1.jpg', 1, '2021-06-26 12:39:36', '2021-06-26 12:39:36', NULL);
INSERT INTO `imagenes_productos` VALUES (314, 67, 'pesa-rusa 2.jpg', 0, '2021-06-26 12:39:36', '2021-06-26 12:39:36', NULL);
INSERT INTO `imagenes_productos` VALUES (315, 68, 'maquina abs 1.jpg', 1, '2021-06-26 13:08:42', '2021-06-26 13:08:42', NULL);
INSERT INTO `imagenes_productos` VALUES (316, 68, 'maquina abs 2.jpg', 0, '2021-06-26 13:08:42', '2021-09-06 00:00:00', NULL);
INSERT INTO `imagenes_productos` VALUES (317, 69, 'balon basquet.jpg', 1, '2021-06-26 13:15:56', '2021-08-22 00:00:00', NULL);
INSERT INTO `imagenes_productos` VALUES (318, 70, 'zapatilla ua - 724601-0001-001.png', 1, '2021-07-02 09:44:05', '2021-07-02 09:44:05', NULL);
INSERT INTO `imagenes_productos` VALUES (319, 70, 'zapatilla ua - 724601-0001-002.jpg', 0, '2021-07-02 09:44:05', '2021-07-02 09:44:05', NULL);
INSERT INTO `imagenes_productos` VALUES (320, 70, 'zapatilla ua - 724601-0001-003.jpg', 0, '2021-07-02 09:44:05', '2021-07-02 09:44:05', NULL);
INSERT INTO `imagenes_productos` VALUES (321, 70, 'zapatilla ua - 724601-0001-004.jpg', 0, '2021-07-02 09:44:05', '2021-07-02 09:44:05', NULL);
INSERT INTO `imagenes_productos` VALUES (322, 71, 'zapatillas adidas 956973-0001-001.jpg', 1, '2021-07-02 12:45:51', '2021-07-02 12:45:51', NULL);
INSERT INTO `imagenes_productos` VALUES (323, 71, 'zapatillas adidas 956973-0001-002.jpg', 0, '2021-07-02 12:45:51', '2021-07-02 12:45:51', NULL);
INSERT INTO `imagenes_productos` VALUES (324, 71, 'zapatillas adidas 956973-0001-003.jpg', 0, '2021-07-02 12:45:51', '2021-07-02 12:45:51', NULL);
INSERT INTO `imagenes_productos` VALUES (325, 71, 'zapatillas adidas 956973-0001-004.jpg', 0, '2021-07-02 12:45:51', '2021-07-02 12:45:51', NULL);
INSERT INTO `imagenes_productos` VALUES (326, 71, 'zapatillas adidas 956973-0001-005.jpg', 0, '2021-07-02 12:45:51', '2021-07-02 12:45:51', NULL);
INSERT INTO `imagenes_productos` VALUES (327, 72, 'balanza.jpg', 1, '2021-08-06 15:24:46', '2021-08-06 15:24:46', NULL);
INSERT INTO `imagenes_productos` VALUES (328, 72, 'balanza2.jpg', 0, '2021-08-06 15:24:46', '2021-08-06 15:24:46', NULL);
INSERT INTO `imagenes_productos` VALUES (329, 72, 'balanza3.jpg', 0, '2021-08-06 15:24:46', '2021-09-06 00:00:00', NULL);
INSERT INTO `imagenes_productos` VALUES (330, 73, 'zapatilla skecher 2.jpg', 1, '2021-08-06 15:37:25', '2021-08-06 15:37:25', NULL);
INSERT INTO `imagenes_productos` VALUES (331, 73, 'zapatilla skecher 3.jpg', 0, '2021-08-06 15:37:25', '2021-08-06 15:37:25', NULL);
INSERT INTO `imagenes_productos` VALUES (332, 73, 'zapatilla skecher 4.jpg', 0, '2021-08-06 15:37:25', '2021-08-06 15:37:25', NULL);
INSERT INTO `imagenes_productos` VALUES (333, 73, 'zapatilla skecher 5.jpg', 0, '2021-08-06 15:37:25', '2021-08-06 15:37:25', NULL);
INSERT INTO `imagenes_productos` VALUES (334, 73, 'zapatilla skechers.jpg', 0, '2021-08-06 15:37:25', '2021-08-06 15:37:25', NULL);

-- ----------------------------
-- Table structure for impuestos
-- ----------------------------
DROP TABLE IF EXISTS `impuestos`;
CREATE TABLE `impuestos`  (
  `id` bigint(0) UNSIGNED NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `sigla` varchar(15) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `porcentaje` decimal(65, 0) NOT NULL,
  `created_at` timestamp(0) NULL DEFAULT NULL,
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  `deleted_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `nombre`(`nombre`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 30 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of impuestos
-- ----------------------------
INSERT INTO `impuestos` VALUES (4, 'IHIHIHIIHI', 'ABC', 10, '2021-06-11 00:00:00', '2021-06-11 00:00:00', '2021-06-13 00:00:00');
INSERT INTO `impuestos` VALUES (5, 'IHIHIHIIHI2', 'ABCD', 10, '2021-06-11 00:00:00', '2021-06-11 00:00:00', '2021-06-13 00:00:00');
INSERT INTO `impuestos` VALUES (6, 'IHIHIHIIHI3 szszs', 'ABCE', 10, '2021-06-11 00:00:00', '2021-06-13 00:00:00', '2021-06-13 00:00:00');
INSERT INTO `impuestos` VALUES (7, 'IHIHIHIIHI4', 'ABCF', 10, '2021-06-11 00:00:00', '2021-06-11 00:00:00', '2021-06-13 00:00:00');
INSERT INTO `impuestos` VALUES (8, 'IHIHIHIIHI5', 'ABCG', 10, '2021-06-11 00:00:00', '2021-06-11 00:00:00', '2021-06-13 00:00:00');
INSERT INTO `impuestos` VALUES (10, 'Impuesto al Valor Agregado', 'IVA', 19, '2021-06-11 00:00:00', '2021-06-11 00:00:00', NULL);
INSERT INTO `impuestos` VALUES (30, 'Impuesto de alcoholes', 'ILA', 15, '2021-06-13 00:00:00', '2021-06-13 00:00:00', NULL);

-- ----------------------------
-- Table structure for impuestos_productos
-- ----------------------------
DROP TABLE IF EXISTS `impuestos_productos`;
CREATE TABLE `impuestos_productos`  (
  `id` bigint(0) NOT NULL AUTO_INCREMENT,
  `producto_id` bigint(0) UNSIGNED NOT NULL,
  `impuesto_id` bigint(0) UNSIGNED NOT NULL,
  `created_at` timestamp(0) NOT NULL,
  `updated_at` timestamp(0) NOT NULL,
  `deleted_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_impuestos_productos-productos`(`producto_id`) USING BTREE,
  INDEX `fk_impuestos_productos-impuestos`(`impuesto_id`) USING BTREE,
  CONSTRAINT `fk_impuestos_productos-impuestos` FOREIGN KEY (`impuesto_id`) REFERENCES `impuestos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_impuestos_productos-productos` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 194 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of impuestos_productos
-- ----------------------------
INSERT INTO `impuestos_productos` VALUES (177, 60, 10, '2021-06-23 00:00:00', '2021-06-23 00:00:00', NULL);
INSERT INTO `impuestos_productos` VALUES (179, 61, 10, '2021-06-24 00:00:00', '2021-06-24 00:00:00', NULL);
INSERT INTO `impuestos_productos` VALUES (182, 62, 10, '2021-06-24 00:00:00', '2021-06-24 00:00:00', NULL);
INSERT INTO `impuestos_productos` VALUES (184, 63, 10, '2021-07-03 00:00:00', '2021-07-03 00:00:00', NULL);
INSERT INTO `impuestos_productos` VALUES (185, 64, 10, '2021-07-03 00:00:00', '2021-07-03 00:00:00', '2021-07-03 00:00:00');
INSERT INTO `impuestos_productos` VALUES (186, 65, 10, '2021-07-26 00:00:00', '2021-07-26 00:00:00', NULL);
INSERT INTO `impuestos_productos` VALUES (187, 66, 10, '2021-07-26 00:00:00', '2021-07-26 00:00:00', NULL);
INSERT INTO `impuestos_productos` VALUES (188, 67, 10, '2021-07-26 00:00:00', '2021-07-26 00:00:00', NULL);
INSERT INTO `impuestos_productos` VALUES (189, 68, 10, '2021-07-26 00:00:00', '2021-07-26 00:00:00', NULL);
INSERT INTO `impuestos_productos` VALUES (190, 69, 10, '2021-07-26 00:00:00', '2021-07-26 00:00:00', NULL);
INSERT INTO `impuestos_productos` VALUES (191, 70, 10, '2021-08-02 00:00:00', '2021-08-02 00:00:00', NULL);
INSERT INTO `impuestos_productos` VALUES (192, 71, 10, '2021-08-02 00:00:00', '2021-08-02 00:00:00', NULL);
INSERT INTO `impuestos_productos` VALUES (193, 72, 10, '2021-09-06 00:00:00', '2021-09-06 00:00:00', NULL);
INSERT INTO `impuestos_productos` VALUES (194, 73, 10, '2021-09-06 00:00:00', '2021-09-06 00:00:00', NULL);

-- ----------------------------
-- Table structure for marcas
-- ----------------------------
DROP TABLE IF EXISTS `marcas`;
CREATE TABLE `marcas`  (
  `id` bigint(0) UNSIGNED NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `created_at` timestamp(0) NOT NULL,
  `updated_at` timestamp(0) NOT NULL,
  `deleted_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of marcas
-- ----------------------------
INSERT INTO `marcas` VALUES (2, 'Adidas', '2021-06-19 00:00:00', '2021-06-19 00:00:00', NULL);
INSERT INTO `marcas` VALUES (3, 'Lenovo', '2021-06-19 00:00:00', '2021-06-19 00:00:00', NULL);
INSERT INTO `marcas` VALUES (4, 'Chancho 3', '2021-06-19 00:00:00', '2021-06-19 00:00:00', NULL);
INSERT INTO `marcas` VALUES (5, 'Oxford', '2021-07-26 00:00:00', '2021-07-26 00:00:00', NULL);
INSERT INTO `marcas` VALUES (6, 'Under Armour', '2021-08-02 00:00:00', '2021-08-02 00:00:00', NULL);
INSERT INTO `marcas` VALUES (7, 'Nappo', '2021-09-06 00:00:00', '2021-09-06 00:00:00', NULL);
INSERT INTO `marcas` VALUES (8, 'Skechers', '2021-09-06 00:00:00', '2021-09-06 00:00:00', NULL);

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
  `menu_padre_id` bigint(0) UNSIGNED NOT NULL DEFAULT 0,
  `posicion` int(0) UNSIGNED NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `menus_nombre_unique`(`nombre`) USING BTREE,
  UNIQUE INDEX `menus_url_unique`(`url`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 36 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of menus
-- ----------------------------
INSERT INTO `menus` VALUES (1, 'Pantallas', 'pantallas', '2021-01-28 19:24:05', '2021-06-07 00:00:00', NULL, 15, 20);
INSERT INTO `menus` VALUES (3, 'Roles', 'roles', '2021-01-30 17:58:04', '2021-02-10 01:22:29', NULL, 15, 30);
INSERT INTO `menus` VALUES (4, 'Usuarios', 'usuarios', '2021-01-30 17:59:32', '2021-02-10 01:22:40', NULL, 15, 40);
INSERT INTO `menus` VALUES (5, 'Menús', 'menus', '2021-01-30 18:28:46', '2021-02-10 01:18:08', NULL, 15, 10);
INSERT INTO `menus` VALUES (13, 'Videos', 'videos', '2021-02-09 08:52:46', '2021-04-28 20:05:36', '2021-08-13 00:00:00', 19, 0);
INSERT INTO `menus` VALUES (14, 'Permisos', 'permisos', '2021-02-10 11:41:45', '2021-02-10 11:41:45', NULL, 15, 50);
INSERT INTO `menus` VALUES (15, 'Configuración', NULL, '2021-02-11 13:18:07', '2021-02-11 13:18:11', NULL, 0, 20);
INSERT INTO `menus` VALUES (19, 'Mantenedores', NULL, '2021-02-11 13:19:24', '2021-09-06 00:00:00', NULL, 0, 10);
INSERT INTO `menus` VALUES (22, 'Personalizar', 'personalizar', '2021-05-26 00:00:00', '2021-05-26 00:00:00', NULL, 15, 70);
INSERT INTO `menus` VALUES (23, 'tftftf', 'tftftftf', '2021-06-07 00:00:00', '2021-06-07 00:00:00', '2021-06-07 00:00:00', 1, 1000);
INSERT INTO `menus` VALUES (24, 'Impuestos', 'impuestos', '2021-06-12 00:00:00', '2021-06-12 00:00:00', NULL, 19, 10);
INSERT INTO `menus` VALUES (25, 'Categorías', 'categorias', '2021-06-14 00:00:00', '2021-06-14 00:00:00', NULL, 19, 30);
INSERT INTO `menus` VALUES (26, 'Sub-categorías', 'sub_categorias', '2021-06-18 00:00:00', '2021-06-18 00:00:00', NULL, 19, 40);
INSERT INTO `menus` VALUES (27, 'Marcas', 'marcas', '2021-06-19 00:00:00', '2021-06-19 00:00:00', NULL, 19, 50);
INSERT INTO `menus` VALUES (28, 'Unidades', 'unidades', '2021-06-21 00:00:00', '2021-06-21 00:00:00', NULL, 19, 50);
INSERT INTO `menus` VALUES (29, 'Productos', 'productos', '2021-06-23 00:00:00', '2021-06-23 00:00:00', NULL, 19, 60);
INSERT INTO `menus` VALUES (30, 'Tienda', '', '2021-07-06 00:00:00', '2021-07-06 00:00:00', NULL, 0, 5);
INSERT INTO `menus` VALUES (31, 'Config tienda', 'tienda', '2021-07-06 00:00:00', '2021-07-06 00:00:00', NULL, 30, 10);
INSERT INTO `menus` VALUES (32, 'Menú Tienda', 'menus_tienda', '2021-07-10 00:00:00', '2021-07-10 00:00:00', NULL, 30, 20);
INSERT INTO `menus` VALUES (33, 'Secciones Home', 'secciones_home', '2021-07-20 00:00:00', '2021-07-20 00:00:00', NULL, 30, 30);
INSERT INTO `menus` VALUES (34, 'Despachos', 'detalle_despacho', '2021-08-26 00:00:00', '2021-08-26 00:00:00', NULL, 30, 5);
INSERT INTO `menus` VALUES (35, 'Precios', 'precios', '2021-09-20 00:00:00', '2021-09-20 00:00:00', NULL, 19, 70);
INSERT INTO `menus` VALUES (36, 'Clientes', 'clientes', '2021-09-27 00:00:00', '2021-09-27 00:00:00', NULL, 19, 80);

-- ----------------------------
-- Table structure for menus_tienda
-- ----------------------------
DROP TABLE IF EXISTS `menus_tienda`;
CREATE TABLE `menus_tienda`  (
  `id` bigint(0) UNSIGNED NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `url` varchar(100) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `menu_padre_id` bigint(0) NULL DEFAULT NULL,
  `posicion` int(0) UNSIGNED NOT NULL,
  `created_at` datetime(0) NOT NULL,
  `updated_at` datetime(0) NOT NULL,
  `deleted_at` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of menus_tienda
-- ----------------------------
INSERT INTO `menus_tienda` VALUES (1, 'Electrónica', 'catalogo', 0, 10, '2021-07-10 00:00:00', '2021-08-13 00:00:00', NULL);
INSERT INTO `menus_tienda` VALUES (2, 'Computación', 'catalogo', 0, 20, '2021-07-10 00:00:00', '2021-08-13 00:00:00', NULL);
INSERT INTO `menus_tienda` VALUES (3, 'Deportes', 'catalogo', 0, 30, '2021-07-10 00:00:00', '2021-08-13 00:00:00', NULL);

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
) ENGINE = InnoDB AUTO_INCREMENT = 25 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

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
INSERT INTO `pantallas` VALUES (14, 'Impuestos', '2021-06-12 00:00:00', '2021-06-12 00:00:00', NULL, 24, 1, 1, 1);
INSERT INTO `pantallas` VALUES (15, 'Categorías', '2021-06-14 00:00:00', '2021-06-14 00:00:00', NULL, 25, 1, 1, 1);
INSERT INTO `pantallas` VALUES (16, 'Sub-categorias', '2021-06-18 00:00:00', '2021-06-18 00:00:00', NULL, 26, 1, 1, 1);
INSERT INTO `pantallas` VALUES (17, 'Marcas', '2021-06-19 00:00:00', '2021-06-19 00:00:00', NULL, 27, 1, 1, 1);
INSERT INTO `pantallas` VALUES (18, 'Unidades', '2021-06-21 00:00:00', '2021-06-21 00:00:00', NULL, 28, 1, 1, 1);
INSERT INTO `pantallas` VALUES (19, 'Productos', '2021-06-23 00:00:00', '2021-06-23 00:00:00', NULL, 29, 1, 1, 1);
INSERT INTO `pantallas` VALUES (20, 'Tienda', '2021-07-06 00:00:00', '2021-07-06 00:00:00', NULL, 31, 0, 1, 0);
INSERT INTO `pantallas` VALUES (21, 'Menú Tienda', '2021-07-10 00:00:00', '2021-07-10 00:00:00', NULL, 32, 1, 1, 1);
INSERT INTO `pantallas` VALUES (22, 'Secciones pág. Home', '2021-07-20 00:00:00', '2021-07-20 00:00:00', NULL, 33, 1, 1, 1);
INSERT INTO `pantallas` VALUES (23, 'Depachos', '2021-08-26 00:00:00', '2021-08-26 00:00:00', NULL, 34, 0, 1, 1);
INSERT INTO `pantallas` VALUES (24, 'Precios', '2021-09-20 00:00:00', '2021-09-21 00:00:00', NULL, 35, 1, 0, 1);
INSERT INTO `pantallas` VALUES (25, 'Clientes', '2021-09-27 00:00:00', '2021-09-27 00:00:00', NULL, 36, 1, 1, 1);

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
) ENGINE = InnoDB AUTO_INCREMENT = 56 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of permisos
-- ----------------------------
INSERT INTO `permisos` VALUES (1, 1, 1, 1, 1, 1, 1, '2021-02-06 22:33:59', '2021-09-27 00:00:00', NULL);
INSERT INTO `permisos` VALUES (2, 1, 2, 1, 1, 1, 1, '2021-02-06 22:33:59', '2021-09-27 00:00:00', NULL);
INSERT INTO `permisos` VALUES (3, 1, 3, 1, 1, 1, 1, '2021-02-08 13:32:30', '2021-09-27 00:00:00', NULL);
INSERT INTO `permisos` VALUES (5, 1, 4, 1, 1, 1, 1, '2021-02-10 11:39:33', '2021-09-27 00:00:00', NULL);
INSERT INTO `permisos` VALUES (6, 1, 5, 1, 1, 1, 1, '2021-02-10 11:42:38', '2021-09-27 00:00:00', NULL);
INSERT INTO `permisos` VALUES (7, 1, 6, 1, 0, 1, 1, '2021-04-28 20:03:52', '2021-09-27 00:00:00', NULL);
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
INSERT INTO `permisos` VALUES (44, 1, 11, 1, 1, 0, 0, '2021-05-26 00:00:00', '2021-09-27 00:00:00', NULL);
INSERT INTO `permisos` VALUES (45, 1, 14, 1, 1, 1, 1, '2021-06-12 00:00:00', '2021-09-27 00:00:00', NULL);
INSERT INTO `permisos` VALUES (46, 1, 15, 1, 1, 1, 1, '2021-06-14 00:00:00', '2021-09-27 00:00:00', NULL);
INSERT INTO `permisos` VALUES (47, 1, 16, 1, 1, 1, 1, '2021-06-18 00:00:00', '2021-09-27 00:00:00', NULL);
INSERT INTO `permisos` VALUES (48, 1, 17, 1, 1, 1, 1, '2021-06-19 00:00:00', '2021-09-27 00:00:00', NULL);
INSERT INTO `permisos` VALUES (49, 1, 18, 1, 1, 1, 1, '2021-06-21 00:00:00', '2021-09-27 00:00:00', NULL);
INSERT INTO `permisos` VALUES (50, 1, 19, 1, 1, 1, 1, '2021-06-23 00:00:00', '2021-09-27 00:00:00', NULL);
INSERT INTO `permisos` VALUES (51, 1, 20, 1, 0, 1, 0, '2021-07-06 00:00:00', '2021-09-27 00:00:00', NULL);
INSERT INTO `permisos` VALUES (52, 1, 21, 1, 1, 1, 1, '2021-07-10 00:00:00', '2021-09-27 00:00:00', NULL);
INSERT INTO `permisos` VALUES (53, 1, 22, 1, 1, 1, 1, '2021-07-20 00:00:00', '2021-09-27 00:00:00', NULL);
INSERT INTO `permisos` VALUES (54, 1, 23, 1, 0, 1, 1, '2021-08-26 00:00:00', '2021-09-27 00:00:00', NULL);
INSERT INTO `permisos` VALUES (55, 1, 24, 1, 1, 0, 1, '2021-09-20 00:00:00', '2021-09-27 00:00:00', NULL);
INSERT INTO `permisos` VALUES (56, 1, 25, 1, 1, 1, 1, '2021-09-27 00:00:00', '2021-09-27 00:00:00', NULL);

-- ----------------------------
-- Table structure for precios_productos
-- ----------------------------
DROP TABLE IF EXISTS `precios_productos`;
CREATE TABLE `precios_productos`  (
  `id` bigint(0) NOT NULL AUTO_INCREMENT,
  `producto_id` bigint(0) UNSIGNED NOT NULL,
  `precio` int(0) NULL DEFAULT NULL,
  `descuento` int(0) NULL DEFAULT 0,
  `descuento_maximo` int(0) NULL DEFAULT 0,
  `fecha_desde` timestamp(0) NULL DEFAULT NULL,
  `fecha_hasta` timestamp(0) NULL DEFAULT NULL,
  `created_at` timestamp(0) NOT NULL,
  `updated_at` timestamp(0) NOT NULL,
  `deleted_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_precios_productos-productos`(`producto_id`) USING BTREE,
  CONSTRAINT `fk_precios_productos-productos` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 30 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of precios_productos
-- ----------------------------
INSERT INTO `precios_productos` VALUES (1, 60, 500000, 6, 12, '2021-09-28 03:00:00', '2021-10-18 03:00:00', '2021-06-24 18:57:04', '2021-09-30 00:00:00', NULL);
INSERT INTO `precios_productos` VALUES (2, 60, 450000, 16, 20, '2021-10-16 00:00:00', '2021-10-31 00:00:00', '2021-06-24 19:13:30', '2021-09-19 00:00:00', '2021-09-22 00:00:00');
INSERT INTO `precios_productos` VALUES (15, 61, 93500, 15, 20, '2021-09-22 03:00:00', '2021-10-02 03:00:00', '2021-09-19 00:00:00', '2021-09-30 00:00:00', NULL);
INSERT INTO `precios_productos` VALUES (16, 62, 55000, 50, 60, '2021-09-19 00:00:00', '2021-10-10 00:00:00', '2021-09-19 00:00:00', '2021-09-19 00:00:00', '2021-09-19 00:00:00');
INSERT INTO `precios_productos` VALUES (17, 73, 20000, 29, 30, '2021-10-01 00:00:00', '2021-10-07 00:00:00', '2021-09-19 00:00:00', '2021-09-19 00:00:00', '2021-09-19 00:00:00');
INSERT INTO `precios_productos` VALUES (18, 72, NULL, NULL, NULL, '2021-09-29 21:00:00', '2021-10-02 21:00:00', '2021-09-22 00:00:00', '2021-09-30 00:00:00', NULL);
INSERT INTO `precios_productos` VALUES (19, 69, 7000, 30, NULL, '2021-10-06 09:00:00', '2021-10-15 09:00:00', '2021-09-22 00:00:00', '2021-09-30 00:00:00', NULL);
INSERT INTO `precios_productos` VALUES (20, 66, NULL, NULL, NULL, NULL, NULL, '2021-09-22 00:00:00', '2021-09-30 00:00:00', NULL);
INSERT INTO `precios_productos` VALUES (21, 63, 47500, 5, NULL, NULL, NULL, '2021-09-22 00:00:00', '2021-09-30 00:00:00', NULL);
INSERT INTO `precios_productos` VALUES (22, 67, NULL, NULL, NULL, NULL, NULL, '2021-09-22 00:00:00', '2021-09-23 00:00:00', NULL);
INSERT INTO `precios_productos` VALUES (23, 65, NULL, NULL, NULL, NULL, NULL, '2021-09-22 00:00:00', '2021-09-23 00:00:00', NULL);
INSERT INTO `precios_productos` VALUES (24, 68, NULL, NULL, NULL, NULL, NULL, '2021-09-22 00:00:00', '2021-09-23 00:00:00', NULL);
INSERT INTO `precios_productos` VALUES (25, 71, NULL, NULL, NULL, NULL, NULL, '2021-09-22 00:00:00', '2021-09-23 00:00:00', NULL);
INSERT INTO `precios_productos` VALUES (26, 60, 400000, 6, 12, '2021-09-28 03:00:00', '2021-10-18 03:00:00', '2021-09-22 00:00:00', '2021-09-30 00:00:00', NULL);
INSERT INTO `precios_productos` VALUES (27, 72, 5002, 49, NULL, '2021-09-25 06:00:00', '2021-09-29 06:00:00', '2021-09-22 00:00:00', '2021-09-30 00:00:00', NULL);
INSERT INTO `precios_productos` VALUES (28, 69, 7700, 23, NULL, '2021-09-25 11:41:54', '2021-10-05 03:00:00', '2021-09-22 00:00:00', '2021-09-30 00:00:00', NULL);
INSERT INTO `precios_productos` VALUES (29, 66, 55922, 20, NULL, '2021-09-27 07:35:01', '2021-10-03 07:34:52', '2021-09-22 00:00:00', '2021-09-30 00:00:00', NULL);
INSERT INTO `precios_productos` VALUES (30, 70, 23231, 17, NULL, NULL, NULL, '2021-09-23 00:00:00', '2021-09-23 00:00:00', NULL);

-- ----------------------------
-- Table structure for productos
-- ----------------------------
DROP TABLE IF EXISTS `productos`;
CREATE TABLE `productos`  (
  `id` bigint(0) UNSIGNED NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `descripcion` varchar(1000) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `precio_venta_normal` int(0) UNSIGNED NOT NULL,
  `stock` bigint(0) UNSIGNED NOT NULL DEFAULT 0,
  `unidad_id` bigint(0) NOT NULL,
  `marca_id` bigint(0) UNSIGNED NOT NULL,
  `categoria_id` bigint(0) NOT NULL,
  `sub_categoria_id` bigint(0) UNSIGNED NOT NULL,
  `created_at` timestamp(0) NOT NULL,
  `updated_at` timestamp(0) NOT NULL,
  `deleted_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_productos-marcas`(`marca_id`) USING BTREE,
  INDEX `fk_productos-categorias`(`categoria_id`) USING BTREE,
  INDEX `fk_productos-sub_categorias`(`sub_categoria_id`) USING BTREE,
  INDEX `fk_productos-unidades`(`unidad_id`) USING BTREE,
  CONSTRAINT `fk_productos-categorias` FOREIGN KEY (`categoria_id`) REFERENCES `categorias` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_productos-marcas` FOREIGN KEY (`marca_id`) REFERENCES `marcas` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_productos-sub_categorias` FOREIGN KEY (`sub_categoria_id`) REFERENCES `sub_categorias` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_productos-unidades` FOREIGN KEY (`unidad_id`) REFERENCES `unidades` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 73 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of productos
-- ----------------------------
INSERT INTO `productos` VALUES (60, 'Drone Phantom 3', 'Phantom 3 standar fácil de pilotar, vuelo estacionario de modo gps, registros automáticos de vuelo videocámara 2.7 k fotos de 12 megapixeles', 529990, 50, 3, 4, 1, 3, '2021-06-23 00:00:00', '2021-09-06 00:00:00', NULL);
INSERT INTO `productos` VALUES (61, 'Celular LG X CAM', 'Celular LG X-CAM liberado con chip movistar', 110000, 70, 3, 4, 1, 4, '2021-06-24 00:00:00', '2021-09-06 00:00:00', NULL);
INSERT INTO `productos` VALUES (62, 'Celular LG K41S', 'Celular LG K41S liberado con chip movistar', 110000, 60, 3, 4, 1, 4, '2021-06-24 00:00:00', '2021-09-06 00:00:00', NULL);
INSERT INTO `productos` VALUES (63, 'Notebook aweiou', 'Laptop portátil ', 50000, 90, 3, 3, 1, 3, '2021-07-03 00:00:00', '2021-09-06 00:00:00', NULL);
INSERT INTO `productos` VALUES (64, 'trtrtrtrtr', 'trtrtrtrtr', 500000, 100, 1, 2, 1, 3, '2021-07-03 00:00:00', '2021-07-03 00:00:00', '2021-07-03 00:00:00');
INSERT INTO `productos` VALUES (65, 'Pesos Para Tobillos Y Muñecas (3 Kg El Par)', 'Pesos Para Tobillos Y Muñecas (3 Kg El Par)', 9990, 100, 3, 2, 5, 6, '2021-07-26 00:00:00', '2021-09-06 00:00:00', NULL);
INSERT INTO `productos` VALUES (66, 'Maleta Pesas 20 Kg', 'Maleta Pesas 20 Kg, 4 discos de 2,5 Kilos, 4 pesos, de 1,5 Kilos, 2 barras de 2 Kilos c/u, 1 maleta plástica para transporte', 69990, 14, 3, 2, 5, 7, '2021-07-26 00:00:00', '2021-07-26 00:00:00', NULL);
INSERT INTO `productos` VALUES (67, 'Pesa Rusa Kettlebell 7 Kg', 'Pesa Rusa Kettlebell 7 Kg, Color negro', 21990, 9, 3, 5, 5, 7, '2021-07-26 00:00:00', '2021-07-26 00:00:00', NULL);
INSERT INTO `productos` VALUES (68, 'Six Pack Maquina Abdominales 5 min shape', 'Maquina Para Abdominales SIX PACKCon esta Maquina podrás realizar ejercicios abdominales.Trabaja los músculos del abdomen sector alto, medio, bajo y oblicuos, También hombros, pecho, espalda y piernas.Posee 6 posiciones para ajuste de dificultad + 1 posición para guardar el producto para que no utilice espacio al terminar de utilizarlo quedando totalmente vertical.Incluye Pantalla donde se puede ver: Tiempo ? Calorías quemadas ? Contador de Repeticiones ? Tiempo.Pantalla necesita 1 pila AA, ( INCLUIDA )Ancho máximo 54 cmAltura producto: Dependerá del nivel de dificultad seleccionado.Altura máxima: (posición guardado): 125 cm', 48990, 15, 3, 5, 5, 7, '2021-07-26 00:00:00', '2021-09-06 00:00:00', NULL);
INSERT INTO `productos` VALUES (69, 'Balon De Basketball 6 Muuk', 'La pelota de Basketball MUUK de tamaño Juvenil para entrenamiento, ideal para uso en exteriores. Elaborado con materiales altamente durables y resistentes, contiene cámara de butilo que retiene más el aire y viene encordado en nylon, lo que le hace conservar su esfericidad y un bote uniforme.', 10000, 2, 3, 4, 5, 7, '2021-07-26 00:00:00', '2021-08-22 00:00:00', NULL);
INSERT INTO `productos` VALUES (70, 'Zapatilla Under Armour GS Charged Pursuit 2 Negra Unisex', 'Zapatilla running para niñas y niños, modelo gs charged pursuit 2 de color negro, marca Under Armour', 27990, 0, 5, 6, 5, 5, '2021-08-02 00:00:00', '2021-08-02 00:00:00', NULL);
INSERT INTO `productos` VALUES (71, 'Zapatilla Running Adidas Unisex Tensaur Run K Negro', 'Zapatilla running unisex marca Adidas modelo Tensaur Run K de color negro con forro textil. Calzado con cordón y fit bajo el tobillo', 29990, 6, 5, 2, 5, 5, '2021-08-02 00:00:00', '2021-08-02 00:00:00', NULL);
INSERT INTO `productos` VALUES (72, 'BALANZA DIGITAL NAPPO 180KG', 'Nueva balanza Nappo con diseño ergonómico, de excelente calidad, que gracias a su graduación de 100 gramos aseguran la mayor exactitud del peso.  Con capacidad de hasta 180KG. Ideal para colocar en el baño de tu casa, y pesarte despues de hacer ejercicio o en cualquier momento.', 9990, 30, 3, 7, 1, 8, '2021-09-06 00:00:00', '2021-09-06 00:00:00', NULL);
INSERT INTO `productos` VALUES (73, 'ZAPATILLA SKECHERS MICROSPEC MAX', 'Skechers es una marca global que se especializa en diseñar y desarrollar productos de Lifestyle y Performance conocidos por su estilo, innovación, calidad y comodidad. Junto con su variada oferta de calzado, Skechers posee colecciones para hombres, mujeres y niños, incluyendo una creciente gama de productos creados para brindar comodidad y estilo a toda la familia.', 27990, 59, 3, 8, 5, 5, '2021-09-06 00:00:00', '2021-09-06 00:00:00', NULL);

-- ----------------------------
-- Table structure for productos_secciones_home
-- ----------------------------
DROP TABLE IF EXISTS `productos_secciones_home`;
CREATE TABLE `productos_secciones_home`  (
  `id` bigint(0) UNSIGNED NOT NULL AUTO_INCREMENT,
  `seccion_id` bigint(0) UNSIGNED NOT NULL,
  `producto_id` bigint(0) UNSIGNED NOT NULL,
  `texto1` varchar(100) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT '',
  `texto2` varchar(100) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT '',
  `created_at` timestamp(0) NOT NULL,
  `updated_at` timestamp(0) NOT NULL,
  `deleted_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk-secciones-productos_secciones`(`seccion_id`) USING BTREE,
  INDEX `fk-secciones-productos`(`producto_id`) USING BTREE,
  CONSTRAINT `fk-secciones-productos` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk-secciones-productos_secciones` FOREIGN KEY (`seccion_id`) REFERENCES `secciones_home` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of productos_secciones_home
-- ----------------------------
INSERT INTO `productos_secciones_home` VALUES (1, 6, 60, 'Texto 1 prod 60 actualizado otra vez', 'Texto 2 prod 60 actualizado otra vez', '2021-07-20 00:00:00', '2021-07-20 00:00:00', '2021-07-22 00:00:00');
INSERT INTO `productos_secciones_home` VALUES (4, 6, 63, 'Notebook lenovo', '2 Terabites', '2021-07-22 00:00:00', '2021-07-22 00:00:00', '2021-07-22 00:00:00');
INSERT INTO `productos_secciones_home` VALUES (5, 6, 61, 'La mejor cámara', 'al mejor precio', '2021-07-22 00:00:00', '2021-07-25 00:00:00', NULL);
INSERT INTO `productos_secciones_home` VALUES (6, 6, 62, '4 cámaras, más memoria', 'la mejor tecnología', '2021-07-22 00:00:00', '2021-07-25 00:00:00', NULL);
INSERT INTO `productos_secciones_home` VALUES (8, 6, 63, 'Ideal para jugar', 'y trabajar', '2021-07-22 00:00:00', '2021-07-25 00:00:00', NULL);
INSERT INTO `productos_secciones_home` VALUES (9, 6, 60, '', '', '2021-07-22 00:00:00', '2021-07-25 00:00:00', NULL);
INSERT INTO `productos_secciones_home` VALUES (10, 7, 66, '', '', '2021-07-26 00:00:00', '2021-07-26 00:00:00', NULL);
INSERT INTO `productos_secciones_home` VALUES (11, 7, 67, '', '', '2021-07-26 00:00:00', '2021-07-26 00:00:00', NULL);
INSERT INTO `productos_secciones_home` VALUES (12, 7, 65, '', '', '2021-07-26 00:00:00', '2021-07-26 00:00:00', NULL);
INSERT INTO `productos_secciones_home` VALUES (13, 7, 68, '', '', '2021-07-26 00:00:00', '2021-07-26 00:00:00', NULL);
INSERT INTO `productos_secciones_home` VALUES (14, 7, 69, '', '', '2021-07-26 00:00:00', '2021-07-26 00:00:00', NULL);

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
) ENGINE = InnoDB AUTO_INCREMENT = 33 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

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
) ENGINE = InnoDB AUTO_INCREMENT = 27 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

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
-- Table structure for secciones_home
-- ----------------------------
DROP TABLE IF EXISTS `secciones_home`;
CREATE TABLE `secciones_home`  (
  `id` bigint(0) UNSIGNED NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `created_at` timestamp(0) NOT NULL,
  `updated_at` timestamp(0) NOT NULL,
  `deleted_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of secciones_home
-- ----------------------------
INSERT INTO `secciones_home` VALUES (6, 'Tecnología', '2021-07-20 00:00:00', '2021-07-25 00:00:00', NULL);
INSERT INTO `secciones_home` VALUES (7, 'Deportes', '2021-07-26 00:00:00', '2021-07-26 00:00:00', NULL);

-- ----------------------------
-- Table structure for sub_categorias
-- ----------------------------
DROP TABLE IF EXISTS `sub_categorias`;
CREATE TABLE `sub_categorias`  (
  `id` bigint(0) UNSIGNED NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `categoria_id` bigint(0) NOT NULL,
  `created_at` timestamp(0) NOT NULL,
  `updated_at` timestamp(0) NOT NULL,
  `deleted_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_categ-sub_categ`(`categoria_id`) USING BTREE,
  CONSTRAINT `fk_categ-sub_categ` FOREIGN KEY (`categoria_id`) REFERENCES `categorias` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sub_categorias
-- ----------------------------
INSERT INTO `sub_categorias` VALUES (3, 'Televisores', 1, '2021-06-18 00:00:00', '2021-06-18 00:00:00', NULL);
INSERT INTO `sub_categorias` VALUES (4, 'Parlantes', 1, '2021-06-18 00:00:00', '2021-06-18 00:00:00', NULL);
INSERT INTO `sub_categorias` VALUES (5, 'Zapatillas 3', 5, '2021-06-18 00:00:00', '2021-06-18 00:00:00', NULL);
INSERT INTO `sub_categorias` VALUES (6, 'Futbol', 5, '2021-06-18 00:00:00', '2021-06-18 00:00:00', NULL);
INSERT INTO `sub_categorias` VALUES (7, 'Fitness', 5, '2021-07-26 00:00:00', '2021-07-26 00:00:00', NULL);
INSERT INTO `sub_categorias` VALUES (8, 'Balanzas Digitales', 1, '2021-09-06 00:00:00', '2021-09-06 00:00:00', NULL);
INSERT INTO `sub_categorias` VALUES (9, 'qwertyuio', 4, '2021-09-29 00:00:00', '2021-09-29 00:00:00', '2021-09-29 00:00:00');
INSERT INTO `sub_categorias` VALUES (10, 'sesesesse', 1, '2021-09-29 00:00:00', '2021-09-29 00:00:00', '2021-09-29 00:00:00');
INSERT INTO `sub_categorias` VALUES (11, 'wawawaa', 1, '2021-09-29 00:00:00', '2021-09-29 00:00:00', '2021-09-29 00:00:00');
INSERT INTO `sub_categorias` VALUES (12, 'wawaawawa', 1, '2021-09-29 00:00:00', '2021-09-29 00:00:00', '2021-09-29 00:00:00');
INSERT INTO `sub_categorias` VALUES (13, 'wawawawawawa', 1, '2021-09-29 00:00:00', '2021-09-29 00:00:00', '2021-10-01 00:00:00');

-- ----------------------------
-- Table structure for tienda
-- ----------------------------
DROP TABLE IF EXISTS `tienda`;
CREATE TABLE `tienda`  (
  `id` bigint(0) UNSIGNED NOT NULL AUTO_INCREMENT,
  `nombre_tienda` varchar(100) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `fono_venta` varchar(30) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `email` varchar(150) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `direccion` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `created_at` timestamp(0) NOT NULL,
  `updated_at` timestamp(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tienda
-- ----------------------------
INSERT INTO `tienda` VALUES (1, 'Marcelo Market 2', '+56 1 987654321', 'mabcmarket@ejemplo.cl', '12 Norte 16 Oriente # 1234', '2021-07-06 00:00:00', '2021-08-23 00:00:00');

-- ----------------------------
-- Table structure for tipos_de_pago
-- ----------------------------
DROP TABLE IF EXISTS `tipos_de_pago`;
CREATE TABLE `tipos_de_pago`  (
  `id` bigint(0) UNSIGNED NOT NULL AUTO_INCREMENT,
  `codigo` varchar(10) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL COMMENT 'Código definido por WebPay',
  `nombre` varchar(50) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL COMMENT 'Nombre de la forma de pago ',
  `descripcion` varchar(400) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `created_at` timestamp(0) NOT NULL,
  `updated_at` timestamp(0) NOT NULL,
  `deleted_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tipos_de_pago
-- ----------------------------
INSERT INTO `tipos_de_pago` VALUES (1, 'VN', 'Venta Normal', 'Pago en 1 cuota', '2021-08-21 09:20:42', '2021-08-21 09:20:47', NULL);
INSERT INTO `tipos_de_pago` VALUES (2, 'S2', '2 Cuotas sin interés', 'El comercio recibe el pago en 2 cuotas iguales sin interés.', '2021-08-21 09:21:27', '2021-08-21 09:21:30', NULL);
INSERT INTO `tipos_de_pago` VALUES (3, 'SI', '3 Cuotas sin interés', 'El comercio recibe el pago en 3 cuotas iguales sin interés.', '2021-08-21 09:22:12', '2021-08-21 09:22:15', NULL);
INSERT INTO `tipos_de_pago` VALUES (4, 'NC', 'N Cuotas sin interés', 'El comercio recibe el pago en un número de cuotas iguales y sin interés que el tarjetahabiente puede elegir de entre un rango de 2 y N (el valor N es definido por el comercio y no puede ser superior a 12)', '2021-08-21 09:22:45', '2021-08-21 09:22:49', NULL);
INSERT INTO `tipos_de_pago` VALUES (5, 'VC', 'Cuotas normales', 'El emisor ofrece al tarjetahabiente entre 2 y 48 cuotas. El emisor define si son sin interés (si ha establecido un rango de cuotas en promoción) o con interés. El emisor también puede ofrecer de 1 hasta 3 meses de pago diferida. Todo esto sin impacto para el comercio que en esta modalidad de cuotas siempre recibe el pago en 48 horas hábiles.', '2021-08-21 09:23:18', '2021-08-21 09:23:21', NULL);
INSERT INTO `tipos_de_pago` VALUES (6, 'VD', 'Venta dévito Redcompra', 'Pago con tarjeta de débito Redcompra.', '2021-08-21 09:24:48', '2021-08-21 09:24:51', NULL);
INSERT INTO `tipos_de_pago` VALUES (7, 'VP', 'Venta Prepago', 'Pago con tarjeta de débito Redcompra.', '2021-08-21 09:25:11', '2021-08-21 09:25:14', NULL);

-- ----------------------------
-- Table structure for unidades
-- ----------------------------
DROP TABLE IF EXISTS `unidades`;
CREATE TABLE `unidades`  (
  `id` bigint(0) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `nombre_plural` varchar(50) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL DEFAULT '',
  `created_at` timestamp(0) NOT NULL,
  `updated_at` timestamp(0) NOT NULL,
  `deleted_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of unidades
-- ----------------------------
INSERT INTO `unidades` VALUES (1, 'Litro', 'Litros', '2021-06-21 00:00:00', '2021-06-21 00:00:00', NULL);
INSERT INTO `unidades` VALUES (3, 'Unidad', 'Unidades', '2021-06-21 00:00:00', '2021-06-21 00:00:00', NULL);
INSERT INTO `unidades` VALUES (4, 'Caja 2', '', '2021-06-21 00:00:00', '2021-06-21 00:00:00', '2021-06-21 00:00:00');
INSERT INTO `unidades` VALUES (5, 'Par', 'pares', '2021-08-02 00:00:00', '2021-08-02 00:00:00', NULL);

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
  `remember_token` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
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
) ENGINE = InnoDB AUTO_INCREMENT = 71 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, 'Marcelo', 'mabc@prueba.cl', NULL, '$2b$10$q1ZwYwzfy2QlUzY2fTuLCuZvOJRyQrHmIVMVNMIOIlHAXdj6zliYG', NULL, '2020-11-22 00:00:00', '2021-06-15 00:00:00', NULL, 'Bravo', 'Castillo', '12 Norte 16 Oriente, #2288, Talca', 'Mi Avatar.jpg', '987654321');
INSERT INTO `users` VALUES (19, 'Valeria', 'prueba@ejemplo.cl', NULL, '$2b$10$BCo6PZMKbxA/3ROLBo7D1uynIWQ/7GO6LQdk0qez0k9VZhmilWur.', NULL, '2021-01-22 21:47:01', '2021-05-26 00:00:00', NULL, 'Maza', 'sozza', '12 Norte 123', 'descarga.png', '');
INSERT INTO `users` VALUES (30, 'Marcelo Antonio', 'marcelo.a.bravo.c@gmail.cl', NULL, '$2b$10$66WGQByMZWmVkOtRin00eOGUlw2BKuWu5/nS2Gm.fDEGH0/otpWLi', NULL, '2021-05-05 01:13:57', '2021-06-27 00:00:00', NULL, 'Bravo', 'Castillo', '12 Norte #123', 'FB_IMG_1619323830505.jpg', '');
INSERT INTO `users` VALUES (62, 'Mariela Andrea', 'mariela2@ejemplo.cl', NULL, '$2b$10$b.qrq9mTNfYSgdPqC.veQuWXNDHe0OeCrlVHVisek7VtrtlhD5Mf6', NULL, '2021-05-05 01:13:57', '2021-04-08 00:00:00', NULL, 'Bezoain', 'Bravo', '12 Norte #123', 'fgfgfgfgfgf', '');
INSERT INTO `users` VALUES (71, 'wawawaawa', 'prueba2@ejemplo.cl', NULL, '$2b$10$4vk0/hohwXVdCxkC039iju7eJT9poh.5jR86Ed9mzHqGkXNdAGl42', NULL, '2021-06-07 00:00:00', '2021-06-07 00:00:00', '2021-06-07 00:00:00', 'esesesesesese vvgvgvv', 'drdrdrdrdrd', 'tftftftftftftftft', NULL, '6676767676767');

-- ----------------------------
-- Table structure for ventas
-- ----------------------------
DROP TABLE IF EXISTS `ventas`;
CREATE TABLE `ventas`  (
  `id` bigint(0) UNSIGNED NOT NULL AUTO_INCREMENT,
  `fecha_venta_tienda` timestamp(0) NOT NULL,
  `total` bigint(0) NOT NULL,
  `fecha_anulacion` timestamp(0) NULL DEFAULT NULL,
  `created_at` timestamp(0) NOT NULL,
  `updated_at` timestamp(0) NOT NULL,
  `deleted_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 443 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of ventas
-- ----------------------------
INSERT INTO `ventas` VALUES (53, '2021-08-23 00:00:00', 35676, '2021-08-26 00:00:00', '2021-08-23 00:00:00', '2021-08-23 00:00:00', NULL);
INSERT INTO `ventas` VALUES (54, '2021-08-23 00:00:00', 188008, NULL, '2021-08-23 00:00:00', '2021-08-23 00:00:00', NULL);
INSERT INTO `ventas` VALUES (55, '2021-08-23 00:00:00', 35676, NULL, '2021-08-23 00:00:00', '2021-08-23 00:00:00', NULL);
INSERT INTO `ventas` VALUES (60, '2021-08-25 00:00:00', 35688, NULL, '2021-08-25 00:00:00', '2021-08-25 00:00:00', NULL);
INSERT INTO `ventas` VALUES (61, '2021-08-25 00:00:00', 130900, NULL, '2021-08-25 00:00:00', '2021-08-25 00:00:00', NULL);
INSERT INTO `ventas` VALUES (62, '2021-08-28 00:00:00', 91606, NULL, '2021-08-28 00:00:00', '2021-08-28 00:00:00', NULL);
INSERT INTO `ventas` VALUES (63, '2021-08-28 00:00:00', 91606, NULL, '2021-08-28 00:00:00', '2021-08-28 00:00:00', NULL);
INSERT INTO `ventas` VALUES (64, '2021-08-28 00:00:00', 119000, NULL, '2021-08-28 00:00:00', '2021-08-28 00:00:00', NULL);
INSERT INTO `ventas` VALUES (65, '2021-08-28 00:00:00', 119000, NULL, '2021-08-28 00:00:00', '2021-08-28 00:00:00', NULL);
INSERT INTO `ventas` VALUES (66, '2021-08-28 00:00:00', 130900, NULL, '2021-08-28 00:00:00', '2021-08-28 00:00:00', NULL);
INSERT INTO `ventas` VALUES (67, '2021-08-29 00:00:00', 11900, NULL, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas` VALUES (68, '2021-08-29 00:00:00', 11900, NULL, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas` VALUES (69, '2021-08-29 00:00:00', 83288, NULL, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas` VALUES (70, '2021-08-29 00:00:00', 83288, NULL, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas` VALUES (71, '2021-08-29 00:00:00', 58298, NULL, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas` VALUES (72, '2021-08-29 00:00:00', 35688, NULL, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas` VALUES (73, '2021-08-29 00:00:00', 630688, NULL, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas` VALUES (74, '2021-08-29 00:00:00', 11900, NULL, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas` VALUES (75, '2021-08-29 00:00:00', 59500, NULL, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas` VALUES (76, '2021-08-29 00:00:00', 11888, NULL, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas` VALUES (77, '2021-08-29 00:00:00', 35688, NULL, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas` VALUES (78, '2021-08-29 00:00:00', 33308, NULL, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas` VALUES (79, '2021-08-29 00:00:00', 130900, NULL, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas` VALUES (80, '2021-08-29 00:00:00', 59500, NULL, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas` VALUES (81, '2021-08-29 00:00:00', 58298, NULL, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas` VALUES (82, '2021-08-29 00:00:00', 26168, NULL, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas` VALUES (83, '2021-08-29 00:00:00', 35688, NULL, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas` VALUES (84, '2021-08-29 00:00:00', 130900, NULL, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas` VALUES (85, '2021-08-29 00:00:00', 59500, NULL, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas` VALUES (86, '2021-08-29 00:00:00', 26168, NULL, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas` VALUES (87, '2021-08-29 00:00:00', 58298, NULL, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas` VALUES (88, '2021-08-29 00:00:00', 11888, NULL, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas` VALUES (89, '2021-08-29 00:00:00', 59500, NULL, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas` VALUES (90, '2021-08-29 00:00:00', 35688, NULL, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas` VALUES (91, '2021-08-29 00:00:00', 26168, NULL, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas` VALUES (92, '2021-08-29 00:00:00', 11888, NULL, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas` VALUES (93, '2021-08-29 00:00:00', 59500, NULL, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas` VALUES (94, '2021-08-29 00:00:00', 35688, NULL, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas` VALUES (95, '2021-08-29 00:00:00', 11888, NULL, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas` VALUES (96, '2021-08-29 00:00:00', 11888, NULL, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas` VALUES (97, '2021-08-29 00:00:00', 11900, NULL, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas` VALUES (98, '2021-08-29 00:00:00', 118976, NULL, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas` VALUES (99, '2021-08-29 00:00:00', 26168, NULL, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas` VALUES (100, '2021-08-29 00:00:00', 35688, NULL, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas` VALUES (101, '2021-08-29 00:00:00', 59500, NULL, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas` VALUES (102, '2021-08-29 00:00:00', 59500, NULL, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas` VALUES (103, '2021-08-29 00:00:00', 33308, NULL, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas` VALUES (104, '2021-08-29 00:00:00', 83288, NULL, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas` VALUES (105, '2021-08-29 00:00:00', 630688, NULL, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas` VALUES (106, '2021-08-29 00:00:00', 26168, NULL, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas` VALUES (107, '2021-08-29 00:00:00', 58298, NULL, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas` VALUES (108, '2021-08-29 00:00:00', 130900, NULL, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas` VALUES (109, '2021-08-29 00:00:00', 33308, NULL, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas` VALUES (110, '2021-08-29 00:00:00', 630688, NULL, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas` VALUES (111, '2021-08-29 00:00:00', 630688, NULL, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas` VALUES (112, '2021-08-29 00:00:00', 35688, NULL, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas` VALUES (113, '2021-08-29 00:00:00', 58298, NULL, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas` VALUES (114, '2021-08-29 00:00:00', 59500, NULL, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas` VALUES (115, '2021-08-29 00:00:00', 130900, NULL, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas` VALUES (116, '2021-08-30 00:00:00', 83288, NULL, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `ventas` VALUES (117, '2021-08-30 00:00:00', 33308, NULL, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `ventas` VALUES (118, '2021-08-30 00:00:00', 11888, NULL, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `ventas` VALUES (119, '2021-08-30 00:00:00', 59500, NULL, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `ventas` VALUES (120, '2021-08-30 00:00:00', 58298, NULL, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `ventas` VALUES (121, '2021-08-30 00:00:00', 33308, NULL, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `ventas` VALUES (122, '2021-08-30 00:00:00', 58298, NULL, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `ventas` VALUES (123, '2021-08-30 00:00:00', 59500, NULL, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `ventas` VALUES (124, '2021-08-30 00:00:00', 58298, NULL, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `ventas` VALUES (125, '2021-08-30 00:00:00', 58298, NULL, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `ventas` VALUES (126, '2021-08-30 00:00:00', 59500, NULL, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `ventas` VALUES (127, '2021-08-30 00:00:00', 130900, NULL, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `ventas` VALUES (128, '2021-08-30 00:00:00', 190400, NULL, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `ventas` VALUES (129, '2021-08-30 00:00:00', 35688, NULL, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `ventas` VALUES (130, '2021-08-30 00:00:00', 58298, NULL, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `ventas` VALUES (131, '2021-08-30 00:00:00', 59500, NULL, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `ventas` VALUES (132, '2021-08-30 00:00:00', 59500, NULL, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `ventas` VALUES (133, '2021-08-30 00:00:00', 59500, NULL, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `ventas` VALUES (134, '2021-08-30 00:00:00', 130900, NULL, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `ventas` VALUES (135, '2021-08-30 00:00:00', 59500, NULL, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `ventas` VALUES (136, '2021-08-30 00:00:00', 59500, NULL, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `ventas` VALUES (137, '2021-08-30 00:00:00', 130900, NULL, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `ventas` VALUES (138, '2021-08-30 00:00:00', 59500, NULL, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `ventas` VALUES (139, '2021-08-30 00:00:00', 59500, NULL, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `ventas` VALUES (140, '2021-08-31 00:00:00', 58298, NULL, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas` VALUES (141, '2021-08-31 00:00:00', 130900, NULL, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas` VALUES (142, '2021-08-31 00:00:00', 190400, NULL, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas` VALUES (143, '2021-08-31 00:00:00', 59500, NULL, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas` VALUES (144, '2021-08-31 00:00:00', 130900, NULL, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas` VALUES (145, '2021-08-31 00:00:00', 59500, NULL, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas` VALUES (146, '2021-08-31 00:00:00', 59500, NULL, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas` VALUES (147, '2021-08-31 00:00:00', 59500, NULL, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas` VALUES (148, '2021-08-31 00:00:00', 59500, NULL, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas` VALUES (149, '2021-08-31 00:00:00', 59500, NULL, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas` VALUES (150, '2021-08-31 00:00:00', 59500, NULL, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas` VALUES (151, '2021-08-31 00:00:00', 59500, NULL, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas` VALUES (152, '2021-08-31 00:00:00', 130900, NULL, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas` VALUES (153, '2021-08-31 00:00:00', 59500, NULL, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas` VALUES (154, '2021-08-31 00:00:00', 59500, NULL, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas` VALUES (155, '2021-08-31 00:00:00', 58298, NULL, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas` VALUES (156, '2021-08-31 00:00:00', 58298, NULL, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas` VALUES (157, '2021-08-31 00:00:00', 59500, NULL, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas` VALUES (158, '2021-08-31 00:00:00', 130900, NULL, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas` VALUES (159, '2021-08-31 00:00:00', 630688, NULL, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas` VALUES (160, '2021-08-31 00:00:00', 130900, NULL, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas` VALUES (161, '2021-08-31 00:00:00', 130900, NULL, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas` VALUES (162, '2021-08-31 00:00:00', 59500, NULL, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas` VALUES (163, '2021-08-31 00:00:00', 59500, NULL, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas` VALUES (164, '2021-08-31 00:00:00', 58298, NULL, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas` VALUES (165, '2021-08-31 00:00:00', 59500, NULL, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas` VALUES (166, '2021-08-31 00:00:00', 130900, NULL, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas` VALUES (167, '2021-08-31 00:00:00', 130900, NULL, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas` VALUES (168, '2021-08-31 00:00:00', 59500, NULL, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas` VALUES (169, '2021-08-31 00:00:00', 59500, NULL, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas` VALUES (170, '2021-08-31 00:00:00', 630688, NULL, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas` VALUES (171, '2021-08-31 00:00:00', 59500, NULL, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas` VALUES (172, '2021-08-31 00:00:00', 130900, NULL, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas` VALUES (173, '2021-08-31 00:00:00', 59500, NULL, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas` VALUES (174, '2021-08-31 00:00:00', 59500, NULL, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas` VALUES (175, '2021-08-31 00:00:00', 130900, NULL, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas` VALUES (176, '2021-08-31 00:00:00', 130900, NULL, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas` VALUES (177, '2021-08-31 00:00:00', 59500, NULL, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas` VALUES (178, '2021-08-31 00:00:00', 130900, NULL, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas` VALUES (179, '2021-08-31 00:00:00', 59500, NULL, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas` VALUES (180, '2021-08-31 00:00:00', 59500, NULL, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas` VALUES (181, '2021-08-31 00:00:00', 59500, NULL, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas` VALUES (182, '2021-08-31 00:00:00', 70186, NULL, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas` VALUES (183, '2021-08-31 00:00:00', 59500, NULL, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas` VALUES (184, '2021-09-01 00:00:00', 59500, NULL, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas` VALUES (185, '2021-09-01 00:00:00', 130900, NULL, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas` VALUES (186, '2021-09-01 00:00:00', 130900, NULL, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas` VALUES (187, '2021-09-01 00:00:00', 630688, NULL, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas` VALUES (188, '2021-09-01 00:00:00', 130900, NULL, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas` VALUES (189, '2021-09-01 00:00:00', 130900, NULL, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas` VALUES (190, '2021-09-01 00:00:00', 11888, NULL, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas` VALUES (191, '2021-09-01 00:00:00', 130900, NULL, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas` VALUES (192, '2021-09-01 00:00:00', 59500, NULL, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas` VALUES (193, '2021-09-01 00:00:00', 630688, NULL, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas` VALUES (194, '2021-09-01 00:00:00', 630688, NULL, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas` VALUES (195, '2021-09-01 00:00:00', 630688, NULL, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas` VALUES (196, '2021-09-01 00:00:00', 130900, NULL, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas` VALUES (197, '2021-09-01 00:00:00', 130900, NULL, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas` VALUES (198, '2021-09-01 00:00:00', 630688, NULL, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas` VALUES (199, '2021-09-01 00:00:00', 130900, NULL, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas` VALUES (200, '2021-09-01 00:00:00', 130900, NULL, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas` VALUES (202, '2021-09-01 00:00:00', 35688, NULL, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas` VALUES (203, '2021-09-01 00:00:00', 83288, NULL, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas` VALUES (204, '2021-09-01 00:00:00', 130900, NULL, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas` VALUES (205, '2021-09-01 00:00:00', 35688, NULL, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas` VALUES (209, '2021-09-01 00:00:00', 58298, NULL, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas` VALUES (210, '2021-09-01 00:00:00', 130900, NULL, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas` VALUES (211, '2021-09-01 00:00:00', 130900, NULL, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas` VALUES (212, '2021-09-01 00:00:00', 630688, NULL, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas` VALUES (213, '2021-09-01 00:00:00', 630688, NULL, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas` VALUES (214, '2021-09-01 00:00:00', 630688, NULL, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas` VALUES (215, '2021-09-01 00:00:00', 630688, NULL, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas` VALUES (216, '2021-09-01 00:00:00', 630688, NULL, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas` VALUES (217, '2021-09-01 00:00:00', 630688, NULL, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas` VALUES (218, '2021-09-01 00:00:00', 630688, NULL, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas` VALUES (219, '2021-09-01 00:00:00', 630688, NULL, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas` VALUES (220, '2021-09-01 00:00:00', 630688, NULL, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas` VALUES (221, '2021-09-01 00:00:00', 630688, NULL, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas` VALUES (222, '2021-09-01 00:00:00', 630688, NULL, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas` VALUES (223, '2021-09-01 00:00:00', 630688, NULL, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas` VALUES (224, '2021-09-01 00:00:00', 630688, NULL, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas` VALUES (225, '2021-09-01 00:00:00', 630688, NULL, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas` VALUES (226, '2021-09-01 00:00:00', 630688, NULL, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas` VALUES (227, '2021-09-01 00:00:00', 630688, NULL, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas` VALUES (228, '2021-09-01 00:00:00', 630688, NULL, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas` VALUES (229, '2021-09-01 00:00:00', 630688, NULL, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas` VALUES (230, '2021-09-01 00:00:00', 630688, NULL, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas` VALUES (231, '2021-09-01 00:00:00', 630688, NULL, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas` VALUES (232, '2021-09-01 00:00:00', 630688, NULL, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas` VALUES (233, '2021-09-01 00:00:00', 630688, NULL, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas` VALUES (234, '2021-09-01 00:00:00', 630688, NULL, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas` VALUES (235, '2021-09-01 00:00:00', 630688, NULL, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas` VALUES (236, '2021-09-01 00:00:00', 630688, NULL, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas` VALUES (237, '2021-09-01 00:00:00', 630688, NULL, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas` VALUES (238, '2021-09-01 00:00:00', 630688, NULL, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas` VALUES (239, '2021-09-01 00:00:00', 630688, NULL, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas` VALUES (240, '2021-09-01 00:00:00', 630688, NULL, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas` VALUES (241, '2021-09-01 00:00:00', 630688, NULL, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas` VALUES (242, '2021-09-01 00:00:00', 630688, NULL, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas` VALUES (243, '2021-09-01 00:00:00', 630688, NULL, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas` VALUES (244, '2021-09-01 00:00:00', 630688, NULL, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas` VALUES (245, '2021-09-01 00:00:00', 630688, NULL, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas` VALUES (246, '2021-09-01 00:00:00', 630688, NULL, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas` VALUES (247, '2021-09-03 00:00:00', 630688, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (248, '2021-09-03 00:00:00', 630688, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (249, '2021-09-03 00:00:00', 630688, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (250, '2021-09-03 00:00:00', 630688, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (251, '2021-09-03 00:00:00', 630688, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (252, '2021-09-03 00:00:00', 630688, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (253, '2021-09-03 00:00:00', 630688, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (254, '2021-09-03 00:00:00', 630688, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (255, '2021-09-03 00:00:00', 630688, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (256, '2021-09-03 00:00:00', 630688, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (257, '2021-09-03 00:00:00', 630688, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (258, '2021-09-03 00:00:00', 630688, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (259, '2021-09-03 00:00:00', 630688, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (260, '2021-09-03 00:00:00', 630688, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (261, '2021-09-03 00:00:00', 630688, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (262, '2021-09-03 00:00:00', 630688, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (263, '2021-09-03 00:00:00', 630688, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (264, '2021-09-03 00:00:00', 630688, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (265, '2021-09-03 00:00:00', 630688, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (266, '2021-09-03 00:00:00', 630688, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (267, '2021-09-03 00:00:00', 630688, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (268, '2021-09-03 00:00:00', 630688, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (269, '2021-09-03 00:00:00', 630688, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (270, '2021-09-03 00:00:00', 630688, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (271, '2021-09-03 00:00:00', 630688, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (272, '2021-09-03 00:00:00', 630688, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (273, '2021-09-03 00:00:00', 630688, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (274, '2021-09-03 00:00:00', 630688, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (275, '2021-09-03 00:00:00', 630688, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (276, '2021-09-03 00:00:00', 630688, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (277, '2021-09-03 00:00:00', 630688, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (278, '2021-09-03 00:00:00', 630688, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (279, '2021-09-03 00:00:00', 630688, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (280, '2021-09-03 00:00:00', 630688, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (281, '2021-09-03 00:00:00', 630688, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (282, '2021-09-03 00:00:00', 630688, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (283, '2021-09-03 00:00:00', 630688, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (284, '2021-09-03 00:00:00', 630688, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (285, '2021-09-03 00:00:00', 630688, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (286, '2021-09-03 00:00:00', 630688, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (287, '2021-09-03 00:00:00', 630688, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (288, '2021-09-03 00:00:00', 630688, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (289, '2021-09-03 00:00:00', 630688, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (290, '2021-09-03 00:00:00', 630688, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (291, '2021-09-03 00:00:00', 630688, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (292, '2021-09-03 00:00:00', 630688, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (293, '2021-09-03 00:00:00', 630688, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (294, '2021-09-03 00:00:00', 630688, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (295, '2021-09-03 00:00:00', 630688, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (296, '2021-09-03 00:00:00', 630688, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (297, '2021-09-03 00:00:00', 630688, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (298, '2021-09-03 00:00:00', 630688, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (299, '2021-09-03 00:00:00', 630688, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (301, '2021-09-03 00:00:00', 130900, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (302, '2021-09-03 00:00:00', 130900, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (303, '2021-09-03 00:00:00', 130900, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (304, '2021-09-03 00:00:00', 130900, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (305, '2021-09-03 00:00:00', 130900, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (307, '2021-09-03 00:00:00', 130900, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (308, '2021-09-03 00:00:00', 130900, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (309, '2021-09-03 00:00:00', 130900, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (310, '2021-09-03 00:00:00', 130900, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (311, '2021-09-03 00:00:00', 130900, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (312, '2021-09-03 00:00:00', 130900, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (313, '2021-09-03 00:00:00', 130900, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (314, '2021-09-03 00:00:00', 130900, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (315, '2021-09-03 00:00:00', 130900, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (316, '2021-09-03 00:00:00', 130900, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (317, '2021-09-03 00:00:00', 130900, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (318, '2021-09-03 00:00:00', 130900, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (319, '2021-09-03 00:00:00', 130900, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (320, '2021-09-03 00:00:00', 130900, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (321, '2021-09-03 00:00:00', 130900, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (322, '2021-09-03 00:00:00', 130900, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (323, '2021-09-03 00:00:00', 130900, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (325, '2021-09-03 00:00:00', 11888, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (326, '2021-09-03 00:00:00', 11888, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (327, '2021-09-03 00:00:00', 11888, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (328, '2021-09-03 00:00:00', 11888, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (329, '2021-09-03 00:00:00', 11888, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (330, '2021-09-03 00:00:00', 11888, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (331, '2021-09-03 00:00:00', 11888, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (332, '2021-09-03 00:00:00', 11888, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (333, '2021-09-03 00:00:00', 11888, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (334, '2021-09-03 00:00:00', 11888, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (335, '2021-09-03 00:00:00', 11888, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (336, '2021-09-03 00:00:00', 11888, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (337, '2021-09-03 00:00:00', 11888, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (338, '2021-09-03 00:00:00', 11888, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (339, '2021-09-03 00:00:00', 11888, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (340, '2021-09-03 00:00:00', 11888, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (341, '2021-09-03 00:00:00', 11888, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (342, '2021-09-03 00:00:00', 11888, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (343, '2021-09-03 00:00:00', 11888, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (344, '2021-09-03 00:00:00', 11888, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (345, '2021-09-03 00:00:00', 11888, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (346, '2021-09-03 00:00:00', 11888, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (347, '2021-09-03 00:00:00', 11888, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (348, '2021-09-03 00:00:00', 11888, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (349, '2021-09-03 00:00:00', 11888, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (350, '2021-09-03 00:00:00', 11888, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (351, '2021-09-03 00:00:00', 11888, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (352, '2021-09-03 00:00:00', 11888, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (353, '2021-09-03 00:00:00', 11888, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (354, '2021-09-03 00:00:00', 11888, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (355, '2021-09-03 00:00:00', 11888, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (356, '2021-09-03 00:00:00', 11888, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (357, '2021-09-03 00:00:00', 11888, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (358, '2021-09-03 00:00:00', 11888, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (359, '2021-09-03 00:00:00', 11888, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (360, '2021-09-03 00:00:00', 11888, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (361, '2021-09-03 00:00:00', 11888, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (362, '2021-09-03 00:00:00', 11888, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (363, '2021-09-03 00:00:00', 11888, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (364, '2021-09-03 00:00:00', 11888, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (365, '2021-09-03 00:00:00', 11888, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (366, '2021-09-03 00:00:00', 11888, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (367, '2021-09-03 00:00:00', 11888, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (368, '2021-09-03 00:00:00', 11888, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (369, '2021-09-03 00:00:00', 11888, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (370, '2021-09-03 00:00:00', 11888, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (371, '2021-09-03 00:00:00', 11888, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (372, '2021-09-03 00:00:00', 11888, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (373, '2021-09-03 00:00:00', 11888, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (374, '2021-09-03 00:00:00', 11888, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (375, '2021-09-03 00:00:00', 11888, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (376, '2021-09-03 00:00:00', 11888, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (377, '2021-09-03 00:00:00', 11888, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (378, '2021-09-03 00:00:00', 11888, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (379, '2021-09-03 00:00:00', 11888, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (380, '2021-09-03 00:00:00', 11888, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (381, '2021-09-03 00:00:00', 11888, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (382, '2021-09-03 00:00:00', 11888, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (383, '2021-09-03 00:00:00', 11888, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (384, '2021-09-03 00:00:00', 11888, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (385, '2021-09-03 00:00:00', 11888, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (386, '2021-09-03 00:00:00', 11888, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (387, '2021-09-03 00:00:00', 11888, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (388, '2021-09-03 00:00:00', 11888, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (389, '2021-09-03 00:00:00', 11888, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (390, '2021-09-03 00:00:00', 11888, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (391, '2021-09-03 00:00:00', 11888, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (392, '2021-09-03 00:00:00', 11888, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (393, '2021-09-03 00:00:00', 11888, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (394, '2021-09-03 00:00:00', 11888, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (395, '2021-09-03 00:00:00', 11888, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (396, '2021-09-03 00:00:00', 11888, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (397, '2021-09-03 00:00:00', 11888, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (398, '2021-09-03 00:00:00', 11888, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (399, '2021-09-03 00:00:00', 11888, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (400, '2021-09-03 00:00:00', 11888, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (401, '2021-09-03 00:00:00', 11888, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (402, '2021-09-03 00:00:00', 11888, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (403, '2021-09-03 00:00:00', 11888, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (404, '2021-09-03 00:00:00', 11888, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (405, '2021-09-03 00:00:00', 11888, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (406, '2021-09-03 00:00:00', 11888, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (407, '2021-09-03 00:00:00', 11888, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (408, '2021-09-03 00:00:00', 11888, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (409, '2021-09-03 00:00:00', 11888, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (411, '2021-09-03 00:00:00', 33308, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (412, '2021-09-03 00:00:00', 33308, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (413, '2021-09-03 00:00:00', 33308, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (414, '2021-09-03 00:00:00', 33308, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (415, '2021-09-03 00:00:00', 33308, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (416, '2021-09-03 00:00:00', 33308, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (417, '2021-09-03 00:00:00', 33308, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (418, '2021-09-03 00:00:00', 33308, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (419, '2021-09-03 00:00:00', 33308, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (420, '2021-09-03 00:00:00', 33308, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (421, '2021-09-03 00:00:00', 33308, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (422, '2021-09-03 00:00:00', 33308, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (423, '2021-09-03 00:00:00', 33308, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (424, '2021-09-03 00:00:00', 33308, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (425, '2021-09-03 00:00:00', 33308, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (426, '2021-09-03 00:00:00', 33308, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (427, '2021-09-03 00:00:00', 33308, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (428, '2021-09-03 00:00:00', 33308, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (429, '2021-09-03 00:00:00', 33308, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (430, '2021-09-03 00:00:00', 33308, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (431, '2021-09-03 00:00:00', 33308, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (432, '2021-09-03 00:00:00', 33308, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (433, '2021-09-03 00:00:00', 33308, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (434, '2021-09-03 00:00:00', 33308, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (435, '2021-09-03 00:00:00', 33308, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (436, '2021-09-03 00:00:00', 33308, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (437, '2021-09-03 00:00:00', 33308, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (438, '2021-09-03 00:00:00', 33308, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (439, '2021-09-03 00:00:00', 33308, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (440, '2021-09-03 00:00:00', 33308, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (441, '2021-09-03 00:00:00', 33308, NULL, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas` VALUES (442, '2021-09-25 00:00:00', 41638, NULL, '2021-09-25 00:00:00', '2021-09-25 00:00:00', NULL);
INSERT INTO `ventas` VALUES (443, '2021-09-30 00:00:00', 26168, NULL, '2021-09-30 00:00:00', '2021-09-30 00:00:00', NULL);

-- ----------------------------
-- Table structure for ventas_clientes
-- ----------------------------
DROP TABLE IF EXISTS `ventas_clientes`;
CREATE TABLE `ventas_clientes`  (
  `id` bigint(0) UNSIGNED NOT NULL AUTO_INCREMENT,
  `venta_id` bigint(0) UNSIGNED NOT NULL,
  `cliente_id` bigint(0) UNSIGNED NOT NULL,
  `created_at` timestamp(0) NOT NULL,
  `updated_at` timestamp(0) NOT NULL,
  `deleted_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `ventas-ventas_clientes`(`venta_id`) USING BTREE,
  INDEX `ventas-clientes`(`cliente_id`) USING BTREE,
  CONSTRAINT `ventas-clientes` FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ventas-ventas_clientes` FOREIGN KEY (`venta_id`) REFERENCES `ventas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 427 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of ventas_clientes
-- ----------------------------
INSERT INTO `ventas_clientes` VALUES (37, 53, 2, '2021-08-23 00:00:00', '2021-08-23 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (38, 54, 2, '2021-08-23 00:00:00', '2021-08-23 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (39, 55, 2, '2021-08-23 00:00:00', '2021-08-23 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (44, 60, 2, '2021-08-25 00:00:00', '2021-08-25 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (45, 61, 2, '2021-08-25 00:00:00', '2021-08-25 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (46, 62, 2, '2021-08-28 00:00:00', '2021-08-28 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (47, 63, 2, '2021-08-28 00:00:00', '2021-08-28 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (48, 64, 2, '2021-08-28 00:00:00', '2021-08-28 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (49, 65, 2, '2021-08-28 00:00:00', '2021-08-28 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (50, 66, 2, '2021-08-28 00:00:00', '2021-08-28 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (51, 67, 2, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (52, 68, 2, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (53, 69, 2, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (54, 70, 2, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (55, 71, 2, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (56, 72, 2, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (57, 73, 2, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (58, 74, 2, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (59, 75, 2, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (60, 76, 2, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (61, 77, 2, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (62, 78, 2, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (63, 79, 2, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (64, 80, 2, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (65, 81, 2, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (66, 82, 2, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (67, 83, 2, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (68, 84, 2, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (69, 85, 2, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (70, 86, 2, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (71, 87, 2, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (72, 88, 2, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (73, 89, 2, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (74, 90, 2, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (75, 91, 2, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (76, 92, 2, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (77, 93, 2, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (78, 94, 2, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (79, 95, 2, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (80, 96, 2, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (81, 97, 2, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (82, 98, 2, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (83, 99, 2, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (84, 100, 2, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (85, 101, 2, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (86, 102, 2, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (87, 103, 2, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (88, 104, 2, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (89, 105, 2, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (90, 106, 2, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (91, 107, 2, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (92, 108, 2, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (93, 109, 2, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (94, 110, 2, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (95, 111, 2, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (96, 112, 2, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (97, 113, 2, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (98, 114, 2, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (99, 115, 2, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (100, 116, 2, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (101, 117, 2, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (102, 118, 2, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (103, 119, 2, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (104, 120, 2, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (105, 121, 2, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (106, 122, 2, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (107, 123, 2, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (108, 124, 2, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (109, 125, 2, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (110, 126, 2, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (111, 127, 2, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (112, 128, 2, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (113, 129, 2, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (114, 130, 2, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (115, 131, 2, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (116, 132, 2, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (117, 133, 2, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (118, 134, 2, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (119, 135, 2, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (120, 136, 2, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (121, 137, 2, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (122, 138, 2, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (123, 139, 2, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (124, 140, 2, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (125, 141, 2, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (126, 142, 2, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (127, 143, 2, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (128, 144, 2, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (129, 145, 2, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (130, 146, 2, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (131, 147, 2, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (132, 148, 2, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (133, 149, 2, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (134, 150, 2, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (135, 151, 2, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (136, 152, 2, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (137, 153, 2, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (138, 154, 2, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (139, 155, 2, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (140, 156, 2, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (141, 157, 2, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (142, 158, 2, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (143, 159, 2, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (144, 160, 2, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (145, 161, 2, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (146, 162, 2, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (147, 163, 2, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (148, 164, 2, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (149, 165, 2, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (150, 166, 2, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (151, 167, 2, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (152, 168, 2, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (153, 169, 2, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (154, 170, 2, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (155, 171, 2, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (156, 172, 2, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (157, 173, 2, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (158, 174, 2, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (159, 175, 2, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (160, 176, 2, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (161, 177, 2, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (162, 178, 2, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (163, 179, 2, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (164, 180, 2, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (165, 181, 2, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (166, 182, 2, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (167, 183, 2, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (168, 184, 2, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (169, 185, 2, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (170, 186, 2, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (171, 187, 2, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (172, 188, 2, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (173, 189, 2, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (174, 190, 2, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (175, 191, 2, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (176, 192, 2, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (177, 193, 2, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (178, 194, 2, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (179, 195, 2, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (180, 196, 2, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (181, 197, 2, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (182, 198, 2, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (183, 199, 2, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (184, 200, 2, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (186, 202, 2, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (187, 203, 2, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (188, 204, 2, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (189, 205, 2, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (193, 209, 2, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (194, 210, 2, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (195, 211, 2, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (196, 212, 2, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (197, 213, 2, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (198, 214, 2, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (199, 215, 2, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (200, 216, 2, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (201, 217, 2, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (202, 218, 2, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (203, 219, 2, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (204, 220, 2, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (205, 221, 2, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (206, 222, 2, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (207, 223, 2, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (208, 224, 2, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (209, 225, 2, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (210, 226, 2, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (211, 227, 2, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (212, 228, 2, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (213, 229, 2, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (214, 230, 2, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (215, 231, 2, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (216, 232, 2, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (217, 233, 2, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (218, 234, 2, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (219, 235, 2, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (220, 236, 2, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (221, 237, 2, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (222, 238, 2, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (223, 239, 2, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (224, 240, 2, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (225, 241, 2, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (226, 242, 2, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (227, 243, 2, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (228, 244, 2, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (229, 245, 2, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (230, 246, 2, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (231, 247, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (232, 248, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (233, 249, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (234, 250, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (235, 251, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (236, 252, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (237, 253, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (238, 254, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (239, 255, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (240, 256, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (241, 257, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (242, 258, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (243, 259, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (244, 260, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (245, 261, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (246, 262, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (247, 263, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (248, 264, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (249, 265, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (250, 266, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (251, 267, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (252, 268, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (253, 269, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (254, 270, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (255, 271, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (256, 272, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (257, 273, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (258, 274, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (259, 275, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (260, 276, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (261, 277, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (262, 278, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (263, 279, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (264, 280, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (265, 281, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (266, 282, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (267, 283, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (268, 284, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (269, 285, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (270, 286, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (271, 287, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (272, 288, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (273, 289, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (274, 290, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (275, 291, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (276, 292, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (277, 293, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (278, 294, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (279, 295, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (280, 296, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (281, 297, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (282, 298, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (283, 299, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (285, 301, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (286, 302, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (287, 303, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (288, 304, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (289, 305, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (291, 307, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (292, 308, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (293, 309, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (294, 310, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (295, 311, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (296, 312, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (297, 313, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (298, 314, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (299, 315, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (300, 316, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (301, 317, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (302, 318, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (303, 319, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (304, 320, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (305, 321, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (306, 322, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (307, 323, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (309, 325, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (310, 326, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (311, 327, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (312, 328, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (313, 329, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (314, 330, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (315, 331, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (316, 332, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (317, 333, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (318, 334, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (319, 335, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (320, 336, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (321, 337, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (322, 338, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (323, 339, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (324, 340, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (325, 341, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (326, 342, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (327, 343, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (328, 344, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (329, 345, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (330, 346, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (331, 347, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (332, 348, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (333, 349, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (334, 350, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (335, 351, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (336, 352, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (337, 353, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (338, 354, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (339, 355, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (340, 356, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (341, 357, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (342, 358, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (343, 359, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (344, 360, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (345, 361, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (346, 362, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (347, 363, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (348, 364, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (349, 365, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (350, 366, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (351, 367, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (352, 368, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (353, 369, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (354, 370, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (355, 371, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (356, 372, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (357, 373, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (358, 374, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (359, 375, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (360, 376, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (361, 377, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (362, 378, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (363, 379, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (364, 380, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (365, 381, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (366, 382, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (367, 383, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (368, 384, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (369, 385, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (370, 386, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (371, 387, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (372, 388, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (373, 389, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (374, 390, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (375, 391, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (376, 392, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (377, 393, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (378, 394, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (379, 395, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (380, 396, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (381, 397, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (382, 398, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (383, 399, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (384, 400, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (385, 401, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (386, 402, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (387, 403, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (388, 404, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (389, 405, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (390, 406, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (391, 407, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (392, 408, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (393, 409, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (395, 411, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (396, 412, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (397, 413, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (398, 414, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (399, 415, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (400, 416, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (401, 417, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (402, 418, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (403, 419, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (404, 420, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (405, 421, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (406, 422, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (407, 423, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (408, 424, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (409, 425, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (410, 426, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (411, 427, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (412, 428, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (413, 429, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (414, 430, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (415, 431, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (416, 432, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (417, 433, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (418, 434, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (419, 435, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (420, 436, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (421, 437, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (422, 438, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (423, 439, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (424, 440, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (425, 441, 2, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (426, 442, 2, '2021-09-25 00:00:00', '2021-09-25 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (427, 443, 2, '2021-09-30 00:00:00', '2021-09-30 00:00:00', NULL);

-- ----------------------------
-- Table structure for ventas_clientes_sin_registrar
-- ----------------------------
DROP TABLE IF EXISTS `ventas_clientes_sin_registrar`;
CREATE TABLE `ventas_clientes_sin_registrar`  (
  `id` bigint(0) UNSIGNED NOT NULL AUTO_INCREMENT,
  `venta_id` bigint(0) UNSIGNED NOT NULL,
  `rut` varchar(13) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `nombres` varchar(50) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `apellido1` varchar(50) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `apellido2` varchar(50) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL,
  `fono` varchar(20) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `created_at` timestamp(0) NOT NULL,
  `updated_at` timestamp(0) NOT NULL,
  `deleted_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `ventas-ventas_clientes_sin_registrar`(`venta_id`) USING BTREE,
  CONSTRAINT `ventas-ventas_clientes_sin_registrar` FOREIGN KEY (`venta_id`) REFERENCES `ventas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for ventas_webpay
-- ----------------------------
DROP TABLE IF EXISTS `ventas_webpay`;
CREATE TABLE `ventas_webpay`  (
  `id` bigint(0) UNSIGNED NOT NULL AUTO_INCREMENT,
  `venta_id` bigint(0) UNSIGNED NOT NULL,
  `vci` varchar(10) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL,
  `amount` int(0) NOT NULL COMMENT 'monto',
  `buy_order` varchar(15) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL COMMENT 'número de orden de compra',
  `status` varchar(15) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL COMMENT 'estado',
  `session_id` varchar(15) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL COMMENT 'codigo sessión webpay',
  `card_number` varchar(20) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL,
  `card_detail` varchar(300) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL COMMENT 'JSON con el detalle de la tarjeta',
  `accounting_date` varchar(10) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL COMMENT 'Fecha contable',
  `transaction_date` varchar(30) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL COMMENT 'Fecha del servidor de webpay',
  `authorization_code` varchar(15) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL,
  `payment_type_code` varchar(10) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL COMMENT 'tipo de pago',
  `response_code` int(0) NULL DEFAULT NULL,
  `installments_number` int(0) NULL DEFAULT NULL,
  `created_at` timestamp(0) NOT NULL,
  `updated_at` timestamp(0) NOT NULL,
  `deleted_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `ventas-ventas_webpay`(`venta_id`) USING BTREE,
  CONSTRAINT `ventas-ventas_webpay` FOREIGN KEY (`venta_id`) REFERENCES `ventas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 401 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of ventas_webpay
-- ----------------------------
INSERT INTO `ventas_webpay` VALUES (24, 53, 'TSY', 35676, '7647', 'AUTHORIZED', '15448', '7763', '1', '0823', '2021-08-23T19:48:34.444Z', '1415', 'VD', 0, 0, '2021-08-23 00:00:00', '2021-08-23 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (25, 54, 'TSY', 188008, '6150', 'AUTHORIZED', '15921', '7763', '1', '0823', '2021-08-23T19:52:26.318Z', '1415', 'VD', 0, 0, '2021-08-23 00:00:00', '2021-08-23 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (26, 55, 'TSY', 35676, '6995', 'AUTHORIZED', '17356', '7763', '1', '0823', '2021-08-23T19:59:32.928Z', '1415', 'VD', 0, 0, '2021-08-23 00:00:00', '2021-08-23 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (27, 60, 'TSY', 35688, '7921', 'AUTHORIZED', '15551', '7763', '1', '0825', '2021-08-26T01:31:11.314Z', '1415', 'VD', 0, 0, '2021-08-25 00:00:00', '2021-08-25 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (28, 61, 'TSY', 130900, '5888', 'AUTHORIZED', '15802', '7763', '1', '0825', '2021-08-26T01:53:01.408Z', '1415', 'VD', 0, 0, '2021-08-25 00:00:00', '2021-08-25 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (29, 62, 'TSY', 91606, '304', 'AUTHORIZED', '12716', '7763', '1', '0828', '2021-08-28T13:52:33.219Z', '1415', 'VD', 0, 0, '2021-08-28 00:00:00', '2021-08-28 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (30, 63, 'TSY', 91606, '304', 'AUTHORIZED', '12716', '7763', '1', '0828', '2021-08-28T13:52:33.219Z', '1415', 'VD', 0, 0, '2021-08-28 00:00:00', '2021-08-28 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (31, 64, 'TSY', 119000, '8624', 'AUTHORIZED', '18116', '7763', '1', '0828', '2021-08-28T22:59:52.035Z', '1415', 'VD', 0, 0, '2021-08-28 00:00:00', '2021-08-28 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (32, 65, 'TSY', 119000, '8624', 'AUTHORIZED', '18116', '7763', '1', '0828', '2021-08-28T22:59:52.035Z', '1415', 'VD', 0, 0, '2021-08-28 00:00:00', '2021-08-28 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (33, 66, 'TSY', 130900, '9193', 'AUTHORIZED', '19298', '7763', '1', '0828', '2021-08-28T23:06:03.832Z', '1415', 'VD', 0, 0, '2021-08-28 00:00:00', '2021-08-28 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (34, 67, 'TSY', 11900, '86', 'AUTHORIZED', '11187', '7763', '1', '0829', '2021-08-29T04:00:03.830Z', '1415', 'VD', 0, 0, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (35, 68, 'TSY', 11900, '86', 'AUTHORIZED', '11187', '7763', '1', '0829', '2021-08-29T04:00:03.830Z', '1415', 'VD', 0, 0, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (36, 69, 'TSY', 83288, '2795', 'AUTHORIZED', '14105', '7763', '1', '0829', '2021-08-29T04:08:09.258Z', '1415', 'VD', 0, 0, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (37, 70, 'TSY', 83288, '2795', 'AUTHORIZED', '14105', '7763', '1', '0829', '2021-08-29T04:08:09.258Z', '1415', 'VD', 0, 0, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (38, 71, 'TSY', 58298, '6007', 'AUTHORIZED', '16323', '7763', '1', '0829', '2021-08-29T04:11:09.591Z', '1415', 'VD', 0, 0, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (39, 72, 'TSY', 35688, '6548', 'AUTHORIZED', '18856', '7763', '1', '0829', '2021-08-29T12:49:48.448Z', '1415', 'VD', 0, 0, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (40, 73, 'TSY', 630688, '3538', 'AUTHORIZED', '12696', '7763', '1', '0829', '2021-08-29T13:04:52.533Z', '1415', 'VD', 0, 0, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (41, 74, 'TSY', 11900, '8579', 'AUTHORIZED', '10075', '7763', '1', '0829', '2021-08-29T13:11:00.746Z', '1415', 'VD', 0, 0, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (42, 75, 'TSY', 59500, '8542', 'AUTHORIZED', '13686', '7763', '1', '0829', '2021-08-29T13:17:14.739Z', '1415', 'VD', 0, 0, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (43, 76, 'TSY', 11888, '583', 'AUTHORIZED', '13992', '7763', '1', '0829', '2021-08-29T13:20:35.453Z', '1415', 'VD', 0, 0, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (44, 77, 'TSY', 35688, '2059', 'AUTHORIZED', '12982', '7763', '1', '0829', '2021-08-29T13:24:49.453Z', '1415', 'VD', 0, 0, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (45, 78, 'TSY', 33308, '3881', 'AUTHORIZED', '11696', '7763', '1', '0829', '2021-08-29T13:28:35.237Z', '1415', 'VD', 0, 0, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (46, 79, 'TSY', 130900, '6459', 'AUTHORIZED', '13708', '7763', '1', '0829', '2021-08-29T13:30:45.743Z', '1415', 'VD', 0, 0, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (47, 80, 'TSY', 59500, '1259', 'AUTHORIZED', '19137', '7763', '1', '0829', '2021-08-29T13:33:02.896Z', '1415', 'VD', 0, 0, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (48, 81, 'TSY', 58298, '6311', 'AUTHORIZED', '11197', '7763', '1', '0829', '2021-08-29T13:35:01.638Z', '1415', 'VD', 0, 0, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (49, 82, 'TSY', 26168, '4128', 'AUTHORIZED', '11656', '7763', '1', '0829', '2021-08-29T13:41:08.414Z', '1415', 'VD', 0, 0, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (50, 83, 'TSY', 35688, '6785', 'AUTHORIZED', '10375', '7763', '1', '0829', '2021-08-29T13:43:20.315Z', '1415', 'VD', 0, 0, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (51, 84, 'TSY', 130900, '8601', 'AUTHORIZED', '17605', '7763', '1', '0829', '2021-08-29T13:45:40.913Z', '1415', 'VD', 0, 0, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (52, 85, 'TSY', 59500, '4946', 'AUTHORIZED', '18127', '7763', '1', '0829', '2021-08-29T13:49:17.362Z', '1415', 'VD', 0, 0, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (53, 86, 'TSY', 26168, '2291', 'AUTHORIZED', '11286', '7763', '1', '0829', '2021-08-29T13:51:11.170Z', '1415', 'VD', 0, 0, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (54, 87, 'TSY', 58298, '2617', 'AUTHORIZED', '19766', '7763', '1', '0829', '2021-08-29T13:58:56.106Z', '1415', 'VD', 0, 0, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (55, 88, 'TSY', 11888, '4953', 'AUTHORIZED', '16752', '7763', '1', '0829', '2021-08-29T14:00:32.530Z', '1415', 'VD', 0, 0, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (56, 89, 'TSY', 59500, '4709', 'AUTHORIZED', '14288', '7763', '1', '0829', '2021-08-29T14:06:21.792Z', '1415', 'VD', 0, 0, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (57, 90, 'TSY', 35688, '1238', 'AUTHORIZED', '18725', '7763', '1', '0829', '2021-08-29T14:08:51.415Z', '1415', 'VD', 0, 0, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (58, 91, 'TSY', 26168, '6707', 'AUTHORIZED', '14252', '7763', '1', '0829', '2021-08-29T14:10:40.154Z', '1415', 'VD', 0, 0, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (59, 92, 'TSY', 11888, '9818', 'AUTHORIZED', '17920', '7763', '1', '0829', '2021-08-29T14:12:20.580Z', '1415', 'VD', 0, 0, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (60, 93, 'TSY', 59500, '612', 'AUTHORIZED', '18804', '7763', '1', '0829', '2021-08-29T14:22:12.884Z', '1415', 'VD', 0, 0, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (61, 94, 'TSY', 35688, '427', 'AUTHORIZED', '14748', '7763', '1', '0829', '2021-08-29T14:26:12.651Z', '1415', 'VD', 0, 0, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (62, 95, 'TSY', 11888, '3806', 'AUTHORIZED', '16406', '7763', '1', '0829', '2021-08-29T16:59:27.606Z', '1415', 'VD', 0, 0, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (63, 96, 'TSY', 11888, '3229', 'AUTHORIZED', '11104', '7763', '1', '0829', '2021-08-29T17:33:56.361Z', '1415', 'VD', 0, 0, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (64, 97, 'TSY', 11900, '5404', 'AUTHORIZED', '14496', '7763', '1', '0829', '2021-08-29T17:35:52.616Z', '1415', 'VD', 0, 0, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (65, 98, 'TSY', 118976, '9058', 'AUTHORIZED', '11646', '7763', '1', '0829', '2021-08-29T18:12:40.493Z', '1415', 'VD', 0, 0, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (66, 99, 'TSY', 26168, '6029', 'AUTHORIZED', '18619', '7763', '1', '0829', '2021-08-29T18:15:18.667Z', '1415', 'VD', 0, 0, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (67, 100, 'TSY', 35688, '9578', 'AUTHORIZED', '11917', '7763', '1', '0829', '2021-08-29T18:17:40.969Z', '1415', 'VD', 0, 0, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (68, 101, 'TSY', 59500, '509', 'AUTHORIZED', '15806', '7763', '1', '0829', '2021-08-29T18:22:29.516Z', '1415', 'VD', 0, 0, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (69, 102, 'TSY', 59500, '7195', 'AUTHORIZED', '15713', '7763', '1', '0829', '2021-08-30T00:09:30.786Z', '1415', 'VD', 0, 0, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (70, 103, 'TSY', 33308, '3787', 'AUTHORIZED', '10824', '7763', '1', '0829', '2021-08-30T00:12:13.224Z', '1415', 'VD', 0, 0, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (71, 104, 'TSY', 83288, '8830', 'AUTHORIZED', '12151', '7763', '1', '0829', '2021-08-30T00:49:35.167Z', '1415', 'VD', 0, 0, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (72, 105, 'TSY', 630688, '957', 'AUTHORIZED', '18877', '7763', '1', '0829', '2021-08-30T01:00:09.712Z', '1415', 'VD', 0, 0, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (73, 106, 'TSY', 26168, '7725', 'AUTHORIZED', '17130', '7763', '1', '0829', '2021-08-30T01:06:49.685Z', '1415', 'VD', 0, 0, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (74, 107, 'TSY', 58298, '487', 'AUTHORIZED', '17532', '7763', '1', '0829', '2021-08-30T01:09:29.754Z', '1415', 'VD', 0, 0, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (75, 108, 'TSY', 130900, '6586', 'AUTHORIZED', '14498', '7763', '1', '0829', '2021-08-30T01:14:48.566Z', '1415', 'VD', 0, 0, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (76, 109, 'TSY', 33308, '5351', 'AUTHORIZED', '16871', '7763', '1', '0829', '2021-08-30T01:23:20.220Z', '1415', 'VD', 0, 0, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (77, 110, 'TSY', 630688, '9987', 'AUTHORIZED', '19005', '7763', '1', '0829', '2021-08-30T01:37:02.997Z', '1415', 'VD', 0, 0, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (78, 111, 'TSY', 630688, '9850', 'AUTHORIZED', '12653', '7763', '1', '0829', '2021-08-30T01:43:16.074Z', '1415', 'VD', 0, 0, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (79, 112, 'TSY', 35688, '9886', 'AUTHORIZED', '12180', '7763', '1', '0829', '2021-08-30T01:45:14.717Z', '1415', 'VD', 0, 0, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (80, 113, 'TSY', 58298, '7915', 'AUTHORIZED', '18823', '7763', '1', '0829', '2021-08-30T01:48:34.592Z', '1415', 'VD', 0, 0, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (81, 114, 'TSY', 59500, '8485', 'AUTHORIZED', '17103', '7763', '1', '0829', '2021-08-30T01:52:29.881Z', '1415', 'VD', 0, 0, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (82, 115, 'TSY', 130900, '3546', 'AUTHORIZED', '19478', '7763', '1', '0829', '2021-08-30T01:54:36.723Z', '1415', 'VD', 0, 0, '2021-08-29 00:00:00', '2021-08-29 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (83, 116, 'TSY', 83288, '5490', 'AUTHORIZED', '16005', '7763', '1', '0830', '2021-08-30T12:22:51.556Z', '1415', 'VD', 0, 0, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (84, 117, 'TSY', 33308, '6560', 'AUTHORIZED', '17711', '7763', '1', '0830', '2021-08-30T12:32:40.373Z', '1415', 'VD', 0, 0, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (85, 118, 'TSY', 11888, '7569', 'AUTHORIZED', '19877', '7763', '1', '0830', '2021-08-30T12:38:16.789Z', '1415', 'VD', 0, 0, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (86, 119, 'TSY', 59500, '1534', 'AUTHORIZED', '16499', '7763', '1', '0830', '2021-08-30T12:41:09.555Z', '1415', 'VD', 0, 0, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (87, 120, 'TSY', 58298, '4579', 'AUTHORIZED', '11991', '7763', '1', '0830', '2021-08-30T16:47:54.663Z', '1415', 'VD', 0, 0, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (88, 121, 'TSY', 33308, '4150', 'AUTHORIZED', '17348', '7763', '1', '0830', '2021-08-30T22:00:24.945Z', '1415', 'VD', 0, 0, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (89, 122, 'TSY', 58298, '5843', 'AUTHORIZED', '19905', '7763', '1', '0830', '2021-08-30T23:50:47.819Z', '1415', 'VD', 0, 0, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (90, 123, 'TSY', 59500, '9153', 'AUTHORIZED', '14843', '7763', '1', '0830', '2021-08-31T00:03:19.572Z', '1415', 'VD', 0, 0, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (91, 124, 'TSY', 58298, '7396', 'AUTHORIZED', '12371', '7763', '1', '0830', '2021-08-31T00:13:11.851Z', '1415', 'VD', 0, 0, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (92, 125, 'TSY', 58298, '2057', 'AUTHORIZED', '16955', '7763', '1', '0830', '2021-08-31T00:20:34.335Z', '1415', 'VD', 0, 0, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (93, 126, 'TSY', 59500, '831', 'AUTHORIZED', '10688', '7763', '1', '0830', '2021-08-31T00:24:39.394Z', '1415', 'VD', 0, 0, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (94, 127, 'TSY', 130900, '1868', 'AUTHORIZED', '13080', '7763', '1', '0830', '2021-08-31T00:26:55.888Z', '1415', 'VD', 0, 0, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (95, 128, 'TSY', 190400, '1556', 'AUTHORIZED', '14239', '7763', '1', '0830', '2021-08-31T01:05:19.605Z', '1415', 'VD', 0, 0, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (96, 129, 'TSY', 35688, '4060', 'AUTHORIZED', '17180', '7763', '1', '0830', '2021-08-31T01:14:47.113Z', '1415', 'VD', 0, 0, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (97, 130, 'TSY', 58298, '5102', 'AUTHORIZED', '12120', '7763', '1', '0830', '2021-08-31T01:49:59.999Z', '1415', 'VD', 0, 0, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (98, 131, 'TSY', 59500, '2135', 'AUTHORIZED', '15233', '7763', '1', '0830', '2021-08-31T01:53:29.765Z', '1415', 'VD', 0, 0, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (99, 132, 'TSY', 59500, '8090', 'AUTHORIZED', '10084', '7763', '1', '0830', '2021-08-31T01:56:26.068Z', '1415', 'VD', 0, 0, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (100, 133, 'TSY', 59500, '4331', 'AUTHORIZED', '15867', '7763', '1', '0830', '2021-08-31T01:58:13.011Z', '1415', 'VD', 0, 0, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (101, 134, 'TSY', 130900, '5251', 'AUTHORIZED', '12628', '7763', '1', '0830', '2021-08-31T02:08:23.423Z', '1415', 'VD', 0, 0, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (102, 135, 'TSY', 59500, '4860', 'AUTHORIZED', '19150', '7763', '1', '0830', '2021-08-31T02:15:03.464Z', '1415', 'VD', 0, 0, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (103, 136, 'TSY', 59500, '7984', 'AUTHORIZED', '10652', '7763', '1', '0830', '2021-08-31T02:27:12.203Z', '1415', 'VD', 0, 0, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (104, 137, 'TSY', 130900, '148', 'AUTHORIZED', '19563', '7763', '1', '0830', '2021-08-31T02:28:59.198Z', '1415', 'VD', 0, 0, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (105, 138, 'TSY', 59500, '6406', 'AUTHORIZED', '16824', '7763', '1', '0830', '2021-08-31T02:33:52.783Z', '1415', 'VD', 0, 0, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (106, 139, 'TSY', 59500, '7804', 'AUTHORIZED', '11006', '7763', '1', '0830', '2021-08-31T02:35:44.899Z', '1415', 'VD', 0, 0, '2021-08-30 00:00:00', '2021-08-30 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (107, 140, 'TSY', 58298, '5454', 'AUTHORIZED', '12959', '7763', '1', '0831', '2021-08-31T15:12:09.532Z', '1415', 'VD', 0, 0, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (108, 141, 'TSY', 130900, '3154', 'AUTHORIZED', '13933', '7763', '1', '0831', '2021-08-31T15:20:05.711Z', '1415', 'VD', 0, 0, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (109, 142, 'TSY', 190400, '1750', 'AUTHORIZED', '12035', '7763', '1', '0831', '2021-08-31T15:33:37.891Z', '1415', 'VD', 0, 0, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (110, 143, 'TSY', 59500, '8528', 'AUTHORIZED', '13020', '7763', '1', '0831', '2021-08-31T15:35:37.112Z', '1415', 'VD', 0, 0, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (111, 144, 'TSY', 130900, '14', 'AUTHORIZED', '17771', '7763', '1', '0831', '2021-08-31T15:37:04.329Z', '1415', 'VD', 0, 0, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (112, 145, 'TSY', 59500, '7500', 'AUTHORIZED', '12030', '7763', '1', '0831', '2021-08-31T15:39:03.215Z', '1415', 'VD', 0, 0, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (113, 146, 'TSY', 59500, '1455', 'AUTHORIZED', '18243', '7763', '1', '0831', '2021-08-31T15:41:23.516Z', '1415', 'VD', 0, 0, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (114, 147, 'TSY', 59500, '9221', 'AUTHORIZED', '16914', '7763', '1', '0831', '2021-08-31T16:04:32.982Z', '1415', 'VD', 0, 0, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (115, 148, 'TSY', 59500, '8061', 'AUTHORIZED', '17852', '7763', '1', '0831', '2021-08-31T16:17:21.248Z', '1415', 'VD', 0, 0, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (116, 149, 'TSY', 59500, '1848', 'AUTHORIZED', '17713', '7763', '1', '0831', '2021-08-31T16:20:39.811Z', '1415', 'VD', 0, 0, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (117, 150, 'TSY', 59500, '2688', 'AUTHORIZED', '14398', '7763', '1', '0831', '2021-08-31T16:22:54.043Z', '1415', 'VD', 0, 0, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (118, 151, 'TSY', 59500, '385', 'AUTHORIZED', '15580', '7763', '1', '0831', '2021-08-31T16:33:26.850Z', '1415', 'VD', 0, 0, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (119, 152, 'TSY', 130900, '1661', 'AUTHORIZED', '18479', '7763', '1', '0831', '2021-08-31T16:40:34.053Z', '1415', 'VD', 0, 0, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (120, 153, 'TSY', 59500, '9372', 'AUTHORIZED', '12526', '7763', '1', '0831', '2021-08-31T16:46:14.281Z', '1415', 'VD', 0, 0, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (121, 154, 'TSY', 59500, '6119', 'AUTHORIZED', '18326', '7763', '1', '0831', '2021-08-31T16:48:31.221Z', '1415', 'VD', 0, 0, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (122, 155, 'TSY', 58298, '2036', 'AUTHORIZED', '12801', '7763', '1', '0831', '2021-08-31T18:19:41.272Z', '1415', 'VD', 0, 0, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (123, 156, 'TSY', 58298, '1467', 'AUTHORIZED', '16749', '7763', '1', '0831', '2021-08-31T18:25:37.392Z', '1415', 'VD', 0, 0, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (124, 157, 'TSY', 59500, '6356', 'AUTHORIZED', '15380', '7763', '1', '0831', '2021-08-31T18:30:31.800Z', '1415', 'VD', 0, 0, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (125, 158, 'TSY', 130900, '3795', 'AUTHORIZED', '19224', '7763', '1', '0831', '2021-08-31T18:35:59.043Z', '1415', 'VD', 0, 0, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (126, 159, 'TSY', 630688, '6206', 'AUTHORIZED', '14512', '7763', '1', '0831', '2021-08-31T18:38:27.059Z', '1415', 'VD', 0, 0, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (127, 160, 'TSY', 130900, '2868', 'AUTHORIZED', '16388', '7763', '1', '0831', '2021-08-31T18:40:34.739Z', '1415', 'VD', 0, 0, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (128, 161, 'TSY', 130900, '9225', 'AUTHORIZED', '18027', '7763', '1', '0831', '2021-08-31T18:51:16.848Z', '1415', 'VD', 0, 0, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (129, 162, 'TSY', 59500, '5538', 'AUTHORIZED', '14718', '7763', '1', '0831', '2021-08-31T20:58:30.561Z', '1415', 'VD', 0, 0, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (130, 163, 'TSY', 59500, '1430', 'AUTHORIZED', '18462', '7763', '1', '0831', '2021-08-31T21:16:33.913Z', '1415', 'VD', 0, 0, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (131, 164, 'TSY', 58298, '9577', 'AUTHORIZED', '17327', '7763', '1', '0831', '2021-08-31T23:59:30.231Z', '1415', 'VD', 0, 0, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (132, 165, 'TSY', 59500, '6250', 'AUTHORIZED', '16625', '7763', '1', '0831', '2021-09-01T00:04:33.830Z', '1415', 'VD', 0, 0, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (133, 166, 'TSY', 130900, '886', 'AUTHORIZED', '17544', '7763', '1', '0831', '2021-09-01T00:11:36.350Z', '1415', 'VD', 0, 0, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (134, 167, 'TSY', 130900, '587', 'AUTHORIZED', '18854', '7763', '1', '0831', '2021-09-01T00:15:18.323Z', '1415', 'VD', 0, 0, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (135, 168, 'TSY', 59500, '3071', 'AUTHORIZED', '10737', '7763', '1', '0831', '2021-09-01T00:19:39.267Z', '1415', 'VD', 0, 0, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (136, 169, 'TSY', 59500, '6364', 'AUTHORIZED', '11810', '7763', '1', '0831', '2021-09-01T01:17:07.320Z', '1415', 'VD', 0, 0, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (137, 170, 'TSY', 630688, '6178', 'AUTHORIZED', '17202', '7763', '1', '0831', '2021-09-01T01:31:46.845Z', '1415', 'VD', 0, 0, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (138, 171, 'TSY', 59500, '4972', 'AUTHORIZED', '12608', '7763', '1', '0831', '2021-09-01T01:35:28.552Z', '1415', 'VD', 0, 0, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (139, 172, 'TSY', 130900, '9992', 'AUTHORIZED', '12539', '7763', '1', '0831', '2021-09-01T01:40:18.673Z', '1415', 'VD', 0, 0, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (140, 173, 'TSY', 59500, '6877', 'AUTHORIZED', '15444', '7763', '1', '0831', '2021-09-01T01:43:19.495Z', '1415', 'VD', 0, 0, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (141, 174, 'TSY', 59500, '8832', 'AUTHORIZED', '11899', '7763', '1', '0831', '2021-09-01T01:47:46.841Z', '1415', 'VD', 0, 0, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (142, 175, 'TSY', 130900, '2662', 'AUTHORIZED', '17857', '7763', '1', '0831', '2021-09-01T01:52:26.728Z', '1415', 'VD', 0, 0, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (143, 176, 'TSY', 130900, '6623', 'AUTHORIZED', '16697', '7763', '1', '0831', '2021-09-01T01:54:49.173Z', '1415', 'VD', 0, 0, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (144, 177, 'TSY', 59500, '2305', 'AUTHORIZED', '15143', '7763', '1', '0831', '2021-09-01T02:04:03.090Z', '1415', 'VD', 0, 0, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (145, 178, 'TSY', 130900, '1271', 'AUTHORIZED', '14486', '7763', '1', '0831', '2021-09-01T02:08:33.258Z', '1415', 'VD', 0, 0, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (146, 179, 'TSY', 59500, '7771', 'AUTHORIZED', '18903', '7763', '1', '0831', '2021-09-01T02:11:07.622Z', '1415', 'VD', 0, 0, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (147, 180, 'TSY', 59500, '4305', 'AUTHORIZED', '16872', '7763', '1', '0831', '2021-09-01T02:19:12.003Z', '1415', 'VD', 0, 0, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (148, 181, 'TSY', 59500, '4583', 'AUTHORIZED', '12369', '7763', '1', '0831', '2021-09-01T02:21:08.229Z', '1415', 'VD', 0, 0, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (149, 182, 'TSY', 70186, '8585', 'AUTHORIZED', '13200', '7763', '1', '0831', '2021-09-01T02:24:35.088Z', '1415', 'VD', 0, 0, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (150, 183, 'TSY', 59500, '7980', 'AUTHORIZED', '14197', '7763', '1', '0831', '2021-09-01T02:30:05.276Z', '1415', 'VD', 0, 0, '2021-08-31 00:00:00', '2021-08-31 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (151, 184, 'TSY', 59500, '8395', 'AUTHORIZED', '12348', '7763', '1', '0901', '2021-09-01T13:09:47.360Z', '1415', 'VD', 0, 0, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (152, 185, 'TSY', 130900, '9201', 'AUTHORIZED', '18521', '7763', '1', '0901', '2021-09-01T13:15:24.113Z', '1415', 'VD', 0, 0, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (153, 186, 'TSY', 130900, '3557', 'AUTHORIZED', '19151', '7763', '1', '0901', '2021-09-01T13:18:41.627Z', '1415', 'VD', 0, 0, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (154, 187, 'TSY', 630688, '1247', 'AUTHORIZED', '12310', '7763', '1', '0901', '2021-09-01T13:20:26.965Z', '1415', 'VD', 0, 0, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (155, 188, 'TSY', 130900, '8509', 'AUTHORIZED', '14003', '7763', '1', '0901', '2021-09-01T13:23:44.562Z', '1415', 'VD', 0, 0, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (156, 189, 'TSY', 130900, '7525', 'AUTHORIZED', '16683', '7763', '1', '0901', '2021-09-01T13:26:32.546Z', '1415', 'VD', 0, 0, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (157, 190, 'TSY', 11888, '5518', 'AUTHORIZED', '19057', '7763', '1', '0901', '2021-09-01T13:28:26.709Z', '1415', 'VD', 0, 0, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (158, 191, 'TSY', 130900, '7541', 'AUTHORIZED', '10929', '7763', '1', '0901', '2021-09-01T13:29:45.463Z', '1415', 'VD', 0, 0, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (159, 192, 'TSY', 59500, '6352', 'AUTHORIZED', '12761', '7763', '1', '0901', '2021-09-01T13:31:51.655Z', '1415', 'VD', 0, 0, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (160, 193, 'TSY', 630688, '9387', 'AUTHORIZED', '16296', '7763', '1', '0901', '2021-09-01T13:37:09.794Z', '1415', 'VD', 0, 0, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (161, 194, 'TSY', 630688, '8353', 'AUTHORIZED', '12490', '7763', '1', '0901', '2021-09-01T13:38:27.480Z', '1415', 'VD', 0, 0, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (162, 195, 'TSY', 630688, '3458', 'AUTHORIZED', '13117', '7763', '1', '0901', '2021-09-01T13:40:19.922Z', '1415', 'VD', 0, 0, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (163, 196, 'TSY', 130900, '6966', 'AUTHORIZED', '19906', '7763', '1', '0901', '2021-09-01T13:41:46.182Z', '1415', 'VD', 0, 0, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (164, 197, 'TSY', 130900, '3948', 'AUTHORIZED', '14422', '7763', '1', '0901', '2021-09-01T13:44:51.449Z', '1415', 'VD', 0, 0, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (165, 198, 'TSY', 630688, '1749', 'AUTHORIZED', '19692', '7763', '1', '0901', '2021-09-01T13:45:57.708Z', '1415', 'VD', 0, 0, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (166, 199, 'TSY', 130900, '6106', 'AUTHORIZED', '15313', '7763', '1', '0901', '2021-09-01T13:47:16.254Z', '1415', 'VD', 0, 0, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (167, 200, 'TSY', 130900, '8993', 'AUTHORIZED', '15393', '7763', '1', '0901', '2021-09-01T13:48:27.528Z', '1415', 'VD', 0, 0, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (168, 202, 'TSY', 35688, '9901', 'AUTHORIZED', '10019', '7763', '1', '0901', '2021-09-01T13:52:38.423Z', '1415', 'VD', 0, 0, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (169, 203, 'TSY', 83288, '641', 'AUTHORIZED', '10712', '7763', '1', '0901', '2021-09-01T13:56:22.961Z', '1415', 'VD', 0, 0, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (170, 204, 'TSY', 130900, '4239', 'AUTHORIZED', '15038', '7763', '1', '0901', '2021-09-01T16:21:01.700Z', '1415', 'VD', 0, 0, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (171, 205, 'TSY', 35688, '3246', 'AUTHORIZED', '15395', '7763', '1', '0901', '2021-09-01T16:27:16.187Z', '1415', 'VD', 0, 0, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (172, 209, 'TSY', 58298, '2913', 'AUTHORIZED', '13352', '7763', '1', '0901', '2021-09-01T16:53:41.887Z', '1415', 'VD', 0, 0, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (173, 210, 'TSY', 130900, '7871', 'AUTHORIZED', '16903', '7763', '1', '0901', '2021-09-01T16:57:19.254Z', '1415', 'VD', 0, 0, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (174, 211, 'TSY', 130900, '2327', 'AUTHORIZED', '16556', '7763', '1', '0901', '2021-09-01T16:58:34.709Z', '1415', 'VD', 0, 0, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (175, 212, 'TSY', 630688, '8897', 'AUTHORIZED', '19816', '7763', '1', '0901', '2021-09-01T17:00:18.023Z', '1415', 'VD', 0, 0, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (176, 213, 'TSY', 630688, '7622', 'AUTHORIZED', '19799', '7763', '1', '0901', '2021-09-01T17:02:19.941Z', '1415', 'VD', 0, 0, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (177, 214, 'TSY', 630688, '979', 'AUTHORIZED', '13236', '7763', '1', '0901', '2021-09-01T17:03:41.428Z', '1415', 'VD', 0, 0, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (178, 215, 'TSY', 630688, '919', 'AUTHORIZED', '16856', '7763', '1', '0901', '2021-09-01T17:05:48.371Z', '1415', 'VD', 0, 0, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (179, 216, 'TSY', 630688, '3881', 'AUTHORIZED', '13706', '7763', '1', '0901', '2021-09-01T17:07:51.198Z', '1415', 'VD', 0, 0, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (180, 217, 'TSY', 630688, '415', 'AUTHORIZED', '18771', '7763', '1', '0901', '2021-09-01T17:09:57.033Z', '1415', 'VD', 0, 0, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (181, 218, 'TSY', 630688, '7853', 'AUTHORIZED', '16380', '7763', '1', '0901', '2021-09-01T17:12:34.128Z', '1415', 'VD', 0, 0, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (182, 219, 'TSY', 630688, '4906', 'AUTHORIZED', '10497', '7763', '1', '0901', '2021-09-01T17:16:12.326Z', '1415', 'VD', 0, 0, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (183, 220, 'TSY', 630688, '9695', 'AUTHORIZED', '14310', '7763', '1', '0901', '2021-09-01T17:18:59.293Z', '1415', 'VD', 0, 0, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (184, 221, 'TSY', 630688, '7910', 'AUTHORIZED', '16197', '7763', '1', '0901', '2021-09-01T17:21:16.405Z', '1415', 'VD', 0, 0, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (185, 222, 'TSY', 630688, '3700', 'AUTHORIZED', '12104', '7763', '1', '0901', '2021-09-01T17:23:16.015Z', '1415', 'VD', 0, 0, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (186, 223, 'TSY', 630688, '3607', 'AUTHORIZED', '12797', '7763', '1', '0901', '2021-09-01T17:25:26.288Z', '1415', 'VD', 0, 0, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (187, 224, 'TSY', 630688, '8847', 'AUTHORIZED', '11257', '7763', '1', '0901', '2021-09-01T17:27:59.720Z', '1415', 'VD', 0, 0, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (188, 225, 'TSY', 630688, '2362', 'AUTHORIZED', '19309', '7763', '1', '0901', '2021-09-01T17:30:52.472Z', '1415', 'VD', 0, 0, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (189, 226, 'TSY', 630688, '7818', 'AUTHORIZED', '17439', '7763', '1', '0901', '2021-09-01T17:33:50.233Z', '1415', 'VD', 0, 0, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (190, 227, 'TSY', 630688, '5673', 'AUTHORIZED', '12508', '7763', '1', '0901', '2021-09-01T17:35:59.859Z', '1415', 'VD', 0, 0, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (191, 228, 'TSY', 630688, '2258', 'AUTHORIZED', '15366', '7763', '1', '0901', '2021-09-01T17:38:28.315Z', '1415', 'VD', 0, 0, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (192, 229, 'TSY', 630688, '3420', 'AUTHORIZED', '14865', '7763', '1', '0901', '2021-09-01T18:06:24.702Z', '1415', 'VD', 0, 0, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (193, 230, 'TSY', 630688, '228', 'AUTHORIZED', '15869', '7763', '1', '0901', '2021-09-01T18:08:54.375Z', '1415', 'VD', 0, 0, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (194, 231, 'TSY', 630688, '2100', 'AUTHORIZED', '13476', '7763', '1', '0901', '2021-09-01T18:11:33.378Z', '1415', 'VD', 0, 0, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (195, 232, 'TSY', 630688, '184', 'AUTHORIZED', '15097', '7763', '1', '0901', '2021-09-01T18:15:28.553Z', '1415', 'VD', 0, 0, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (196, 233, 'TSY', 630688, '6864', 'AUTHORIZED', '18844', '7763', '1', '0901', '2021-09-01T18:17:13.565Z', '1415', 'VD', 0, 0, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (197, 234, 'TSY', 630688, '9469', 'AUTHORIZED', '16623', '7763', '1', '0901', '2021-09-01T18:25:17.797Z', '1415', 'VD', 0, 0, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (198, 235, 'TSY', 630688, '9801', 'AUTHORIZED', '18736', '7763', '1', '0901', '2021-09-01T18:28:52.626Z', '1415', 'VD', 0, 0, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (199, 236, 'TSY', 630688, '9317', 'AUTHORIZED', '11389', '7763', '1', '0901', '2021-09-01T18:31:07.332Z', '1415', 'VD', 0, 0, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (200, 237, 'TSY', 630688, '2217', 'AUTHORIZED', '10474', '7763', '1', '0901', '2021-09-01T18:33:35.890Z', '1415', 'VD', 0, 0, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (201, 238, 'TSY', 630688, '1761', 'AUTHORIZED', '14634', '7763', '1', '0901', '2021-09-01T18:36:41.787Z', '1415', 'VD', 0, 0, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (202, 239, 'TSY', 630688, '1015', 'AUTHORIZED', '14717', '7763', '1', '0901', '2021-09-01T18:40:31.164Z', '1415', 'VD', 0, 0, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (203, 240, 'TSY', 630688, '2981', 'AUTHORIZED', '18253', '7763', '1', '0901', '2021-09-01T18:43:29.321Z', '1415', 'VD', 0, 0, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (204, 241, 'TSY', 630688, '7', 'AUTHORIZED', '17699', '7763', '1', '0901', '2021-09-01T18:45:32.800Z', '1415', 'VD', 0, 0, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (205, 242, 'TSY', 630688, '5777', 'AUTHORIZED', '18076', '7763', '1', '0901', '2021-09-01T18:46:49.682Z', '1415', 'VD', 0, 0, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (206, 243, 'TSY', 630688, '6704', 'AUTHORIZED', '10130', '7763', '1', '0901', '2021-09-01T19:20:59.513Z', '1415', 'VD', 0, 0, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (207, 244, 'TSY', 630688, '9756', 'AUTHORIZED', '16282', '7763', '1', '0901', '2021-09-01T19:23:08.321Z', '1415', 'VD', 0, 0, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (208, 245, 'TSY', 630688, '8179', 'AUTHORIZED', '18223', '7763', '1', '0901', '2021-09-01T19:32:54.344Z', '1415', 'VD', 0, 0, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (209, 246, 'TSY', 630688, '5398', 'AUTHORIZED', '13780', '7763', '1', '0901', '2021-09-02T01:18:47.484Z', '1415', 'VD', 0, 0, '2021-09-01 00:00:00', '2021-09-01 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (210, 247, 'TSY', 630688, '5796', 'AUTHORIZED', '14470', '7763', '1', '0903', '2021-09-03T12:39:08.313Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (211, 248, 'TSY', 630688, '6170', 'AUTHORIZED', '15334', '7763', '1', '0903', '2021-09-03T20:11:29.074Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (212, 249, 'TSY', 630688, '6170', 'AUTHORIZED', '15334', '7763', '1', '0903', '2021-09-03T20:11:29.074Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (213, 250, 'TSY', 630688, '6170', 'AUTHORIZED', '15334', '7763', '1', '0903', '2021-09-03T20:11:29.074Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (214, 251, 'TSY', 630688, '6170', 'AUTHORIZED', '15334', '7763', '1', '0903', '2021-09-03T20:11:29.074Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (215, 252, 'TSY', 630688, '6170', 'AUTHORIZED', '15334', '7763', '1', '0903', '2021-09-03T20:11:29.074Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (216, 253, 'TSY', 630688, '6170', 'AUTHORIZED', '15334', '7763', '1', '0903', '2021-09-03T20:11:29.074Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (217, 254, 'TSY', 630688, '6170', 'AUTHORIZED', '15334', '7763', '1', '0903', '2021-09-03T20:11:29.074Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (218, 255, 'TSY', 630688, '6623', 'AUTHORIZED', '17138', '7763', '1', '0903', '2021-09-03T20:40:05.430Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (219, 256, 'TSY', 630688, '6623', 'AUTHORIZED', '17138', '7763', '1', '0903', '2021-09-03T20:40:05.430Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (220, 257, 'TSY', 630688, '6623', 'AUTHORIZED', '17138', '7763', '1', '0903', '2021-09-03T20:40:05.430Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (221, 258, 'TSY', 630688, '6623', 'AUTHORIZED', '17138', '7763', '1', '0903', '2021-09-03T20:40:05.430Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (222, 259, 'TSY', 630688, '6623', 'AUTHORIZED', '17138', '7763', '1', '0903', '2021-09-03T20:40:05.430Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (223, 260, 'TSY', 630688, '6623', 'AUTHORIZED', '17138', '7763', '1', '0903', '2021-09-03T20:40:05.430Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (224, 261, 'TSY', 630688, '6623', 'AUTHORIZED', '17138', '7763', '1', '0903', '2021-09-03T20:40:05.430Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (225, 262, 'TSY', 630688, '6623', 'AUTHORIZED', '17138', '7763', '1', '0903', '2021-09-03T20:40:05.430Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (226, 263, 'TSY', 630688, '6623', 'AUTHORIZED', '17138', '7763', '1', '0903', '2021-09-03T20:40:05.430Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (227, 264, 'TSY', 630688, '6623', 'AUTHORIZED', '17138', '7763', '1', '0903', '2021-09-03T20:40:05.430Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (228, 265, 'TSY', 630688, '6623', 'AUTHORIZED', '17138', '7763', '1', '0903', '2021-09-03T20:40:05.430Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (229, 266, 'TSY', 630688, '6623', 'AUTHORIZED', '17138', '7763', '1', '0903', '2021-09-03T20:40:05.430Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (230, 267, 'TSY', 630688, '6623', 'AUTHORIZED', '17138', '7763', '1', '0903', '2021-09-03T20:40:05.430Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (231, 268, 'TSY', 630688, '6623', 'AUTHORIZED', '17138', '7763', '1', '0903', '2021-09-03T20:40:05.430Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (232, 269, 'TSY', 630688, '6623', 'AUTHORIZED', '17138', '7763', '1', '0903', '2021-09-03T20:40:05.430Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (233, 270, 'TSY', 630688, '6623', 'AUTHORIZED', '17138', '7763', '1', '0903', '2021-09-03T20:40:05.430Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (234, 271, 'TSY', 630688, '6623', 'AUTHORIZED', '17138', '7763', '1', '0903', '2021-09-03T20:40:05.430Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (235, 272, 'TSY', 630688, '6623', 'AUTHORIZED', '17138', '7763', '1', '0903', '2021-09-03T20:40:05.430Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (236, 273, 'TSY', 630688, '6623', 'AUTHORIZED', '17138', '7763', '1', '0903', '2021-09-03T20:40:05.430Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (237, 274, 'TSY', 630688, '6623', 'AUTHORIZED', '17138', '7763', '1', '0903', '2021-09-03T20:40:05.430Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (238, 275, 'TSY', 630688, '6623', 'AUTHORIZED', '17138', '7763', '1', '0903', '2021-09-03T20:40:05.430Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (239, 276, 'TSY', 630688, '6623', 'AUTHORIZED', '17138', '7763', '1', '0903', '2021-09-03T20:40:05.430Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (240, 277, 'TSY', 630688, '6623', 'AUTHORIZED', '17138', '7763', '1', '0903', '2021-09-03T20:40:05.430Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (241, 278, 'TSY', 630688, '6623', 'AUTHORIZED', '17138', '7763', '1', '0903', '2021-09-03T20:40:05.430Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (242, 279, 'TSY', 630688, '6623', 'AUTHORIZED', '17138', '7763', '1', '0903', '2021-09-03T20:40:05.430Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (243, 280, 'TSY', 630688, '6623', 'AUTHORIZED', '17138', '7763', '1', '0903', '2021-09-03T20:40:05.430Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (244, 281, 'TSY', 630688, '6623', 'AUTHORIZED', '17138', '7763', '1', '0903', '2021-09-03T20:40:05.430Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (245, 282, 'TSY', 630688, '6623', 'AUTHORIZED', '17138', '7763', '1', '0903', '2021-09-03T20:40:05.430Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (246, 283, 'TSY', 630688, '6623', 'AUTHORIZED', '17138', '7763', '1', '0903', '2021-09-03T20:40:05.430Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (247, 284, 'TSY', 630688, '6623', 'AUTHORIZED', '17138', '7763', '1', '0903', '2021-09-03T20:40:05.430Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (248, 285, 'TSY', 630688, '6623', 'AUTHORIZED', '17138', '7763', '1', '0903', '2021-09-03T20:40:05.430Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (249, 286, 'TSY', 630688, '6623', 'AUTHORIZED', '17138', '7763', '1', '0903', '2021-09-03T20:40:05.430Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (250, 287, 'TSY', 630688, '6623', 'AUTHORIZED', '17138', '7763', '1', '0903', '2021-09-03T20:40:05.430Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (251, 288, 'TSY', 630688, '6623', 'AUTHORIZED', '17138', '7763', '1', '0903', '2021-09-03T20:40:05.430Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (252, 289, 'TSY', 630688, '6623', 'AUTHORIZED', '17138', '7763', '1', '0903', '2021-09-03T20:40:05.430Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (253, 290, 'TSY', 630688, '6623', 'AUTHORIZED', '17138', '7763', '1', '0903', '2021-09-03T20:40:05.430Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (254, 291, 'TSY', 630688, '6623', 'AUTHORIZED', '17138', '7763', '1', '0903', '2021-09-03T20:40:05.430Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (255, 292, 'TSY', 630688, '6623', 'AUTHORIZED', '17138', '7763', '1', '0903', '2021-09-03T20:40:05.430Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (256, 293, 'TSY', 630688, '6623', 'AUTHORIZED', '17138', '7763', '1', '0903', '2021-09-03T20:40:05.430Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (257, 294, 'TSY', 630688, '6623', 'AUTHORIZED', '17138', '7763', '1', '0903', '2021-09-03T20:40:05.430Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (258, 295, 'TSY', 630688, '6623', 'AUTHORIZED', '17138', '7763', '1', '0903', '2021-09-03T20:40:05.430Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (259, 296, 'TSY', 630688, '6623', 'AUTHORIZED', '17138', '7763', '1', '0903', '2021-09-03T20:40:05.430Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (260, 297, 'TSY', 630688, '6623', 'AUTHORIZED', '17138', '7763', '1', '0903', '2021-09-03T20:40:05.430Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (261, 298, 'TSY', 630688, '6623', 'AUTHORIZED', '17138', '7763', '1', '0903', '2021-09-03T20:40:05.430Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (262, 299, 'TSY', 630688, '6623', 'AUTHORIZED', '17138', '7763', '1', '0903', '2021-09-03T20:40:05.430Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (263, 301, 'TSY', 130900, '9341', 'AUTHORIZED', '13370', '7763', '1', '0903', '2021-09-03T21:29:50.056Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (264, 302, 'TSY', 130900, '9341', 'AUTHORIZED', '13370', '7763', '1', '0903', '2021-09-03T21:29:50.056Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (265, 303, 'TSY', 130900, '9341', 'AUTHORIZED', '13370', '7763', '1', '0903', '2021-09-03T21:29:50.056Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (266, 304, 'TSY', 130900, '9341', 'AUTHORIZED', '13370', '7763', '1', '0903', '2021-09-03T21:29:50.056Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (267, 305, 'TSY', 130900, '9341', 'AUTHORIZED', '13370', '7763', '1', '0903', '2021-09-03T21:29:50.056Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (268, 307, 'TSY', 130900, '3731', 'AUTHORIZED', '11647', '7763', '1', '0903', '2021-09-03T21:35:28.600Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (269, 308, 'TSY', 130900, '3731', 'AUTHORIZED', '11647', '7763', '1', '0903', '2021-09-03T21:35:28.600Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (270, 309, 'TSY', 130900, '3731', 'AUTHORIZED', '11647', '7763', '1', '0903', '2021-09-03T21:35:28.600Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (271, 310, 'TSY', 130900, '3731', 'AUTHORIZED', '11647', '7763', '1', '0903', '2021-09-03T21:35:28.600Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (272, 311, 'TSY', 130900, '3731', 'AUTHORIZED', '11647', '7763', '1', '0903', '2021-09-03T21:35:28.600Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (273, 312, 'TSY', 130900, '3731', 'AUTHORIZED', '11647', '7763', '1', '0903', '2021-09-03T21:35:28.600Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (274, 313, 'TSY', 130900, '3731', 'AUTHORIZED', '11647', '7763', '1', '0903', '2021-09-03T21:35:28.600Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (275, 314, 'TSY', 130900, '3731', 'AUTHORIZED', '11647', '7763', '1', '0903', '2021-09-03T21:35:28.600Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (276, 315, 'TSY', 130900, '3731', 'AUTHORIZED', '11647', '7763', '1', '0903', '2021-09-03T21:35:28.600Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (277, 316, 'TSY', 130900, '3731', 'AUTHORIZED', '11647', '7763', '1', '0903', '2021-09-03T21:35:28.600Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (278, 317, 'TSY', 130900, '3731', 'AUTHORIZED', '11647', '7763', '1', '0903', '2021-09-03T21:35:28.600Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (279, 318, 'TSY', 130900, '3731', 'AUTHORIZED', '11647', '7763', '1', '0903', '2021-09-03T21:35:28.600Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (280, 319, 'TSY', 130900, '3731', 'AUTHORIZED', '11647', '7763', '1', '0903', '2021-09-03T21:35:28.600Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (281, 320, 'TSY', 130900, '3731', 'AUTHORIZED', '11647', '7763', '1', '0903', '2021-09-03T21:35:28.600Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (282, 321, 'TSY', 130900, '3731', 'AUTHORIZED', '11647', '7763', '1', '0903', '2021-09-03T21:35:28.600Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (283, 322, 'TSY', 130900, '3731', 'AUTHORIZED', '11647', '7763', '1', '0903', '2021-09-03T21:35:28.600Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (284, 323, 'TSY', 130900, '3731', 'AUTHORIZED', '11647', '7763', '1', '0903', '2021-09-03T21:35:28.600Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (285, 325, 'TSY', 11888, '2649', 'AUTHORIZED', '11178', '7763', '1', '0903', '2021-09-03T21:49:16.252Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (286, 326, 'TSY', 11888, '2649', 'AUTHORIZED', '11178', '7763', '1', '0903', '2021-09-03T21:49:16.252Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (287, 327, 'TSY', 11888, '2649', 'AUTHORIZED', '11178', '7763', '1', '0903', '2021-09-03T21:49:16.252Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (288, 328, 'TSY', 11888, '9471', 'AUTHORIZED', '17436', '7763', '1', '0903', '2021-09-03T21:57:25.441Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (289, 329, 'TSY', 11888, '9471', 'AUTHORIZED', '17436', '7763', '1', '0903', '2021-09-03T21:57:25.441Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (290, 330, 'TSY', 11888, '9471', 'AUTHORIZED', '17436', '7763', '1', '0903', '2021-09-03T21:57:25.441Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (291, 331, 'TSY', 11888, '9471', 'AUTHORIZED', '17436', '7763', '1', '0903', '2021-09-03T21:57:25.441Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (292, 332, 'TSY', 11888, '9471', 'AUTHORIZED', '17436', '7763', '1', '0903', '2021-09-03T21:57:25.441Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (293, 333, 'TSY', 11888, '9471', 'AUTHORIZED', '17436', '7763', '1', '0903', '2021-09-03T21:57:25.441Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (294, 334, 'TSY', 11888, '9471', 'AUTHORIZED', '17436', '7763', '1', '0903', '2021-09-03T21:57:25.441Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (295, 335, 'TSY', 11888, '9471', 'AUTHORIZED', '17436', '7763', '1', '0903', '2021-09-03T21:57:25.441Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (296, 336, 'TSY', 11888, '9471', 'AUTHORIZED', '17436', '7763', '1', '0903', '2021-09-03T21:57:25.441Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (297, 337, 'TSY', 11888, '9471', 'AUTHORIZED', '17436', '7763', '1', '0903', '2021-09-03T21:57:25.441Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (298, 338, 'TSY', 11888, '9471', 'AUTHORIZED', '17436', '7763', '1', '0903', '2021-09-03T21:57:25.441Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (299, 339, 'TSY', 11888, '9471', 'AUTHORIZED', '17436', '7763', '1', '0903', '2021-09-03T21:57:25.441Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (300, 340, 'TSY', 11888, '9471', 'AUTHORIZED', '17436', '7763', '1', '0903', '2021-09-03T21:57:25.441Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (301, 341, 'TSY', 11888, '9471', 'AUTHORIZED', '17436', '7763', '1', '0903', '2021-09-03T21:57:25.441Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (302, 342, 'TSY', 11888, '9471', 'AUTHORIZED', '17436', '7763', '1', '0903', '2021-09-03T21:57:25.441Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (303, 343, 'TSY', 11888, '9471', 'AUTHORIZED', '17436', '7763', '1', '0903', '2021-09-03T21:57:25.441Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (304, 344, 'TSY', 11888, '9471', 'AUTHORIZED', '17436', '7763', '1', '0903', '2021-09-03T21:57:25.441Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (305, 345, 'TSY', 11888, '9471', 'AUTHORIZED', '17436', '7763', '1', '0903', '2021-09-03T21:57:25.441Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (306, 346, 'TSY', 11888, '9471', 'AUTHORIZED', '17436', '7763', '1', '0903', '2021-09-03T21:57:25.441Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (307, 347, 'TSY', 11888, '9471', 'AUTHORIZED', '17436', '7763', '1', '0903', '2021-09-03T21:57:25.441Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (308, 348, 'TSY', 11888, '9471', 'AUTHORIZED', '17436', '7763', '1', '0903', '2021-09-03T21:57:25.441Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (309, 349, 'TSY', 11888, '9471', 'AUTHORIZED', '17436', '7763', '1', '0903', '2021-09-03T21:57:25.441Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (310, 350, 'TSY', 11888, '9471', 'AUTHORIZED', '17436', '7763', '1', '0903', '2021-09-03T21:57:25.441Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (311, 351, 'TSY', 11888, '9471', 'AUTHORIZED', '17436', '7763', '1', '0903', '2021-09-03T21:57:25.441Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (312, 352, 'TSY', 11888, '9471', 'AUTHORIZED', '17436', '7763', '1', '0903', '2021-09-03T21:57:25.441Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (313, 353, 'TSY', 11888, '9471', 'AUTHORIZED', '17436', '7763', '1', '0903', '2021-09-03T21:57:25.441Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (314, 354, 'TSY', 11888, '9471', 'AUTHORIZED', '17436', '7763', '1', '0903', '2021-09-03T21:57:25.441Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (315, 355, 'TSY', 11888, '9471', 'AUTHORIZED', '17436', '7763', '1', '0903', '2021-09-03T21:57:25.441Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (316, 356, 'TSY', 11888, '9471', 'AUTHORIZED', '17436', '7763', '1', '0903', '2021-09-03T21:57:25.441Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (317, 357, 'TSY', 11888, '9471', 'AUTHORIZED', '17436', '7763', '1', '0903', '2021-09-03T21:57:25.441Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (318, 358, 'TSY', 11888, '9471', 'AUTHORIZED', '17436', '7763', '1', '0903', '2021-09-03T21:57:25.441Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (319, 359, 'TSY', 11888, '9471', 'AUTHORIZED', '17436', '7763', '1', '0903', '2021-09-03T21:57:25.441Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (320, 360, 'TSY', 11888, '9471', 'AUTHORIZED', '17436', '7763', '1', '0903', '2021-09-03T21:57:25.441Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (321, 361, 'TSY', 11888, '9471', 'AUTHORIZED', '17436', '7763', '1', '0903', '2021-09-03T21:57:25.441Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (322, 362, 'TSY', 11888, '9471', 'AUTHORIZED', '17436', '7763', '1', '0903', '2021-09-03T21:57:25.441Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (323, 363, 'TSY', 11888, '9471', 'AUTHORIZED', '17436', '7763', '1', '0903', '2021-09-03T21:57:25.441Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (324, 364, 'TSY', 11888, '9471', 'AUTHORIZED', '17436', '7763', '1', '0903', '2021-09-03T21:57:25.441Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (325, 365, 'TSY', 11888, '9471', 'AUTHORIZED', '17436', '7763', '1', '0903', '2021-09-03T21:57:25.441Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (326, 366, 'TSY', 11888, '9471', 'AUTHORIZED', '17436', '7763', '1', '0903', '2021-09-03T21:57:25.441Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (327, 367, 'TSY', 11888, '9471', 'AUTHORIZED', '17436', '7763', '1', '0903', '2021-09-03T21:57:25.441Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (328, 368, 'TSY', 11888, '9471', 'AUTHORIZED', '17436', '7763', '1', '0903', '2021-09-03T21:57:25.441Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (329, 369, 'TSY', 11888, '9471', 'AUTHORIZED', '17436', '7763', '1', '0903', '2021-09-03T21:57:25.441Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (330, 370, 'TSY', 11888, '9471', 'AUTHORIZED', '17436', '7763', '1', '0903', '2021-09-03T21:57:25.441Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (331, 371, 'TSY', 11888, '9471', 'AUTHORIZED', '17436', '7763', '1', '0903', '2021-09-03T21:57:25.441Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (332, 372, 'TSY', 11888, '9471', 'AUTHORIZED', '17436', '7763', '1', '0903', '2021-09-03T21:57:25.441Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (333, 373, 'TSY', 11888, '9471', 'AUTHORIZED', '17436', '7763', '1', '0903', '2021-09-03T21:57:25.441Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (334, 374, 'TSY', 11888, '9471', 'AUTHORIZED', '17436', '7763', '1', '0903', '2021-09-03T21:57:25.441Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (335, 375, 'TSY', 11888, '9471', 'AUTHORIZED', '17436', '7763', '1', '0903', '2021-09-03T21:57:25.441Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (336, 376, 'TSY', 11888, '9471', 'AUTHORIZED', '17436', '7763', '1', '0903', '2021-09-03T21:57:25.441Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (337, 377, 'TSY', 11888, '9471', 'AUTHORIZED', '17436', '7763', '1', '0903', '2021-09-03T21:57:25.441Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (338, 378, 'TSY', 11888, '9471', 'AUTHORIZED', '17436', '7763', '1', '0903', '2021-09-03T21:57:25.441Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (339, 379, 'TSY', 11888, '9471', 'AUTHORIZED', '17436', '7763', '1', '0903', '2021-09-03T21:57:25.441Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (340, 380, 'TSY', 11888, '9471', 'AUTHORIZED', '17436', '7763', '1', '0903', '2021-09-03T21:57:25.441Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (341, 381, 'TSY', 11888, '9471', 'AUTHORIZED', '17436', '7763', '1', '0903', '2021-09-03T21:57:25.441Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (342, 382, 'TSY', 11888, '9471', 'AUTHORIZED', '17436', '7763', '1', '0903', '2021-09-03T21:57:25.441Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (343, 383, 'TSY', 11888, '9471', 'AUTHORIZED', '17436', '7763', '1', '0903', '2021-09-03T21:57:25.441Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (344, 384, 'TSY', 11888, '9471', 'AUTHORIZED', '17436', '7763', '1', '0903', '2021-09-03T21:57:25.441Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (345, 385, 'TSY', 11888, '9471', 'AUTHORIZED', '17436', '7763', '1', '0903', '2021-09-03T21:57:25.441Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (346, 386, 'TSY', 11888, '9471', 'AUTHORIZED', '17436', '7763', '1', '0903', '2021-09-03T21:57:25.441Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (347, 387, 'TSY', 11888, '9471', 'AUTHORIZED', '17436', '7763', '1', '0903', '2021-09-03T21:57:25.441Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (348, 388, 'TSY', 11888, '9471', 'AUTHORIZED', '17436', '7763', '1', '0903', '2021-09-03T21:57:25.441Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (349, 389, 'TSY', 11888, '9471', 'AUTHORIZED', '17436', '7763', '1', '0903', '2021-09-03T21:57:25.441Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (350, 390, 'TSY', 11888, '9471', 'AUTHORIZED', '17436', '7763', '1', '0903', '2021-09-03T21:57:25.441Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (351, 391, 'TSY', 11888, '9471', 'AUTHORIZED', '17436', '7763', '1', '0903', '2021-09-03T21:57:25.441Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (352, 392, 'TSY', 11888, '9471', 'AUTHORIZED', '17436', '7763', '1', '0903', '2021-09-03T21:57:25.441Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (353, 393, 'TSY', 11888, '9471', 'AUTHORIZED', '17436', '7763', '1', '0903', '2021-09-03T21:57:25.441Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (354, 394, 'TSY', 11888, '9471', 'AUTHORIZED', '17436', '7763', '1', '0903', '2021-09-03T21:57:25.441Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (355, 395, 'TSY', 11888, '9471', 'AUTHORIZED', '17436', '7763', '1', '0903', '2021-09-03T21:57:25.441Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (356, 396, 'TSY', 11888, '9471', 'AUTHORIZED', '17436', '7763', '1', '0903', '2021-09-03T21:57:25.441Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (357, 397, 'TSY', 11888, '9471', 'AUTHORIZED', '17436', '7763', '1', '0903', '2021-09-03T21:57:25.441Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (358, 398, 'TSY', 11888, '9471', 'AUTHORIZED', '17436', '7763', '1', '0903', '2021-09-03T21:57:25.441Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (359, 399, 'TSY', 11888, '9471', 'AUTHORIZED', '17436', '7763', '1', '0903', '2021-09-03T21:57:25.441Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (360, 400, 'TSY', 11888, '9471', 'AUTHORIZED', '17436', '7763', '1', '0903', '2021-09-03T21:57:25.441Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (361, 401, 'TSY', 11888, '9471', 'AUTHORIZED', '17436', '7763', '1', '0903', '2021-09-03T21:57:25.441Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (362, 402, 'TSY', 11888, '9471', 'AUTHORIZED', '17436', '7763', '1', '0903', '2021-09-03T21:57:25.441Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (363, 403, 'TSY', 11888, '9471', 'AUTHORIZED', '17436', '7763', '1', '0903', '2021-09-03T21:57:25.441Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (364, 404, 'TSY', 11888, '9471', 'AUTHORIZED', '17436', '7763', '1', '0903', '2021-09-03T21:57:25.441Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (365, 405, 'TSY', 11888, '9471', 'AUTHORIZED', '17436', '7763', '1', '0903', '2021-09-03T21:57:25.441Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (366, 406, 'TSY', 11888, '9471', 'AUTHORIZED', '17436', '7763', '1', '0903', '2021-09-03T21:57:25.441Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (367, 407, 'TSY', 11888, '9471', 'AUTHORIZED', '17436', '7763', '1', '0903', '2021-09-03T21:57:25.441Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (368, 408, 'TSY', 11888, '9471', 'AUTHORIZED', '17436', '7763', '1', '0903', '2021-09-03T21:57:25.441Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (369, 409, 'TSY', 11888, '9471', 'AUTHORIZED', '17436', '7763', '1', '0903', '2021-09-03T21:57:25.441Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (370, 411, 'TSY', 33308, '6483', 'AUTHORIZED', '19428', '7763', '1', '0903', '2021-09-03T22:38:31.796Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (371, 412, 'TSY', 33308, '6483', 'AUTHORIZED', '19428', '7763', '1', '0903', '2021-09-03T22:38:31.796Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (372, 413, 'TSY', 33308, '6483', 'AUTHORIZED', '19428', '7763', '1', '0903', '2021-09-03T22:38:31.796Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (373, 414, 'TSY', 33308, '6483', 'AUTHORIZED', '19428', '7763', '1', '0903', '2021-09-03T22:38:31.796Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (374, 415, 'TSY', 33308, '6483', 'AUTHORIZED', '19428', '7763', '1', '0903', '2021-09-03T22:38:31.796Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (375, 416, 'TSY', 33308, '6483', 'AUTHORIZED', '19428', '7763', '1', '0903', '2021-09-03T22:38:31.796Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (376, 417, 'TSY', 33308, '6483', 'AUTHORIZED', '19428', '7763', '1', '0903', '2021-09-03T22:38:31.796Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (377, 418, 'TSY', 33308, '6483', 'AUTHORIZED', '19428', '7763', '1', '0903', '2021-09-03T22:38:31.796Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (378, 419, 'TSY', 33308, '6483', 'AUTHORIZED', '19428', '7763', '1', '0903', '2021-09-03T22:38:31.796Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (379, 420, 'TSY', 33308, '6483', 'AUTHORIZED', '19428', '7763', '1', '0903', '2021-09-03T22:38:31.796Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (380, 421, 'TSY', 33308, '6483', 'AUTHORIZED', '19428', '7763', '1', '0903', '2021-09-03T22:38:31.796Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (381, 422, 'TSY', 33308, '6483', 'AUTHORIZED', '19428', '7763', '1', '0903', '2021-09-03T22:38:31.796Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (382, 423, 'TSY', 33308, '6483', 'AUTHORIZED', '19428', '7763', '1', '0903', '2021-09-03T22:38:31.796Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (383, 424, 'TSY', 33308, '6483', 'AUTHORIZED', '19428', '7763', '1', '0903', '2021-09-03T22:38:31.796Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (384, 425, 'TSY', 33308, '6483', 'AUTHORIZED', '19428', '7763', '1', '0903', '2021-09-03T22:38:31.796Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (385, 426, 'TSY', 33308, '6483', 'AUTHORIZED', '19428', '7763', '1', '0903', '2021-09-03T22:38:31.796Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (386, 427, 'TSY', 33308, '6483', 'AUTHORIZED', '19428', '7763', '1', '0903', '2021-09-03T22:38:31.796Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (387, 428, 'TSY', 33308, '6483', 'AUTHORIZED', '19428', '7763', '1', '0903', '2021-09-03T22:38:31.796Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (388, 429, 'TSY', 33308, '6483', 'AUTHORIZED', '19428', '7763', '1', '0903', '2021-09-03T22:38:31.796Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (389, 430, 'TSY', 33308, '6483', 'AUTHORIZED', '19428', '7763', '1', '0903', '2021-09-03T22:38:31.796Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (390, 431, 'TSY', 33308, '6483', 'AUTHORIZED', '19428', '7763', '1', '0903', '2021-09-03T22:38:31.796Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (391, 432, 'TSY', 33308, '6483', 'AUTHORIZED', '19428', '7763', '1', '0903', '2021-09-03T22:38:31.796Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (392, 433, 'TSY', 33308, '6483', 'AUTHORIZED', '19428', '7763', '1', '0903', '2021-09-03T22:38:31.796Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (393, 434, 'TSY', 33308, '6483', 'AUTHORIZED', '19428', '7763', '1', '0903', '2021-09-03T22:38:31.796Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (394, 435, 'TSY', 33308, '6483', 'AUTHORIZED', '19428', '7763', '1', '0903', '2021-09-03T22:38:31.796Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (395, 436, 'TSY', 33308, '6483', 'AUTHORIZED', '19428', '7763', '1', '0903', '2021-09-03T22:38:31.796Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (396, 437, 'TSY', 33308, '6483', 'AUTHORIZED', '19428', '7763', '1', '0903', '2021-09-03T22:38:31.796Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (397, 438, 'TSY', 33308, '6483', 'AUTHORIZED', '19428', '7763', '1', '0903', '2021-09-03T22:38:31.796Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (398, 439, 'TSY', 33308, '6483', 'AUTHORIZED', '19428', '7763', '1', '0903', '2021-09-03T22:38:31.796Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (399, 440, 'TSY', 33308, '6483', 'AUTHORIZED', '19428', '7763', '1', '0903', '2021-09-03T22:38:31.796Z', '1415', 'VD', 0, 0, '2021-09-03 00:00:00', '2021-09-03 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (400, 442, 'TSY', 41638, '8388', 'AUTHORIZED', '13225', '7763', '1', '0925', '2021-09-25T18:44:43.135Z', '1415', 'VD', 0, 0, '2021-09-25 00:00:00', '2021-09-25 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (401, 443, 'TSY', 26168, '3414', 'AUTHORIZED', '11736', '7060', '1', '0930', '2021-09-30T22:08:08.071Z', '1819', 'VD', 0, 0, '2021-09-30 00:00:00', '2021-09-30 00:00:00', NULL);

SET FOREIGN_KEY_CHECKS = 1;
