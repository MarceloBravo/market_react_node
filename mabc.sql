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

 Date: 30/01/2022 12:25:10
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for categorias
-- ----------------------------
DROP TABLE IF EXISTS `categorias`;
CREATE TABLE `categorias`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `src_imagen` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `link` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `categorias_nombre_unique`(`nombre`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of categorias
-- ----------------------------
INSERT INTO `categorias` VALUES (1, 'Electrodomésticos', '2021-10-30 17:12:46', '2021-11-07 22:20:58', NULL, NULL, NULL);
INSERT INTO `categorias` VALUES (2, 'Ropa de hombre', '2021-10-30 17:13:03', '2021-10-30 17:13:36', '2021-10-30 17:13:36', NULL, NULL);
INSERT INTO `categorias` VALUES (3, 'qwertyuio', '2021-10-30 17:13:45', '2021-10-30 17:17:47', '2021-10-30 17:17:47', NULL, NULL);
INSERT INTO `categorias` VALUES (4, 'Informática', '2021-10-30 17:23:40', '2021-10-30 17:23:40', NULL, NULL, NULL);
INSERT INTO `categorias` VALUES (5, 'qasdfghj', '2021-10-30 17:23:52', '2021-10-30 17:23:58', '2021-10-30 17:23:58', NULL, NULL);
INSERT INTO `categorias` VALUES (6, 'Ropa de Mujer', '2021-12-07 22:36:07', '2021-12-07 22:36:07', NULL, 'bg-2.jpg', NULL);
INSERT INTO `categorias` VALUES (7, 'Navidad', '2021-12-07 22:47:53', '2021-12-07 22:47:53', NULL, 'bg-4.jpg', NULL);
INSERT INTO `categorias` VALUES (8, 'Calzado', '2021-12-07 22:48:47', '2021-12-07 22:48:47', NULL, 'bg-3.jpg', NULL);
INSERT INTO `categorias` VALUES (9, 'Electrónica', '2021-12-10 19:27:18', '2021-12-10 19:27:18', NULL, NULL, 'electronica');
INSERT INTO `categorias` VALUES (10, 'Deportes', '2021-12-11 16:14:21', '2021-12-11 17:02:58', NULL, 'deportes-hd.jpg', 'deportes');

-- ----------------------------
-- Table structure for clientes
-- ----------------------------
DROP TABLE IF EXISTS `clientes`;
CREATE TABLE `clientes`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `nombres` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `apellido1` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `apellido2` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `cod_region` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `cod_provincia` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `cod_comuna` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `ciudad` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `direccion` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(70) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `fono` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `foto` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `casa_num` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `block_num` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `referencia` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `rut` varchar(13) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `clientes_rut_unique`(`rut`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of clientes
-- ----------------------------
INSERT INTO `clientes` VALUES (1, 'Marcelo Antonio', 'Bravo', 'Castillo', '07', '071', '07101', 'Talca', '1 NORTE 2 ORIENTE', '$2y$10$YmTMn3X4/l086hicL2ifcujATOAcXUoM/l44cyholcGeUTx4HL8na', 'prueba2@ejemplo2.cl', '0987654321', NULL, '123A', NULL, 'Pasaje sin número', '2021-11-18 19:04:44', '2021-11-18 23:12:29', NULL, '11.111.111-1');
INSERT INTO `clientes` VALUES (2, 'Paula', 'Perez', 'Perez', '07', '071', '07101', 'Talca', '1 Sur 3 poniente', '$2y$10$SPcUqdzrXUYgqwfcny3vPu67fh7UGqlVwhzKfhEWOdS9Kt/YIml5C', 'paula@ejemplo.cl', '0987654321', 'descarga.png', '123', '01', 'Frente al puente azúl', '2021-11-20 00:08:23', '2021-12-23 12:21:48', NULL, '22.222.222-2');
INSERT INTO `clientes` VALUES (3, 'Carla', 'Contreras', 'Jerez', '07', '071', '07101', 'Talca', '1 sur 2 oriente #123', '$2y$10$qSv/fT7NBzoTTG7QkAGWp.oXAuOkGzAos1ZxVDFLaoO/yfYanVk6.', 'carla@ejemplo.cl', '0987651234', NULL, '123', 'A', 'Frente de la plaza', '2021-12-23 12:27:01', '2021-12-23 12:27:39', NULL, '33.333.333-3');

-- ----------------------------
-- Table structure for config_oferta_principal
-- ----------------------------
DROP TABLE IF EXISTS `config_oferta_principal`;
CREATE TABLE `config_oferta_principal`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `texto1` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `texto2` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `texto_boton` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `src_imagen` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `link` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `posicion_horizontal` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT 'pos_center',
  `posicion_vertical` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT 'pos_middle',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of config_oferta_principal
-- ----------------------------
INSERT INTO `config_oferta_principal` VALUES (4, 'Texto 1', 'Texto 2', 'Texto botón', 'bg-5.jpg', 'Link', 'derecha', 'medio', '2021-12-09 22:19:24', '2021-12-10 14:58:50', '2021-12-10 14:58:50');
INSERT INTO `config_oferta_principal` VALUES (5, '-60% de descuento', 'Nueva temporada', 'Ver el catálogo', 'bg-5.jpg', 'moda', 'derecha', 'medio', '2021-12-10 15:04:29', '2021-12-10 15:04:29', NULL);

-- ----------------------------
-- Table structure for configuracion
-- ----------------------------
DROP TABLE IF EXISTS `configuracion`;
CREATE TABLE `configuracion`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `nombre_app` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of configuracion
-- ----------------------------
INSERT INTO `configuracion` VALUES (1, 'Mabc App', NULL, '2021-11-07 23:00:05');

-- ----------------------------
-- Table structure for despachos_ventas
-- ----------------------------
DROP TABLE IF EXISTS `despachos_ventas`;
CREATE TABLE `despachos_ventas`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `venta_id` bigint UNSIGNED NOT NULL,
  `direccion` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `region` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `provincia` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `comuna` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `ciudad` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `casa_num` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `block_num` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `referencia` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `shipping_cod` bigint NOT NULL,
  `fecha_despacho` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `despachos_ventas_venta_id_foreign`(`venta_id`) USING BTREE,
  CONSTRAINT `despachos_ventas_venta_id_foreign` FOREIGN KEY (`venta_id`) REFERENCES `ventas` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 69 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of despachos_ventas
-- ----------------------------
INSERT INTO `despachos_ventas` VALUES (3, 24, '1 NORTE 2 ORIENTE', '07', '071', '07101', 'Talca', '123A', NULL, 'Pasaje sin número', 0, NULL, '2022-01-02 14:26:19', '2022-01-02 14:26:19', NULL);
INSERT INTO `despachos_ventas` VALUES (4, 25, '1 NORTE 2 ORIENTE', '07', '071', '07101', 'Talca', '123A', NULL, 'Pasaje sin número', 0, NULL, '2022-01-02 14:30:15', '2022-01-02 14:30:15', NULL);
INSERT INTO `despachos_ventas` VALUES (6, 28, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '12345', '1A', 'Sin referencias', 0, NULL, '2022-01-02 14:41:30', '2022-01-04 20:36:50', '2022-01-04 20:36:50');
INSERT INTO `despachos_ventas` VALUES (9, 29, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '12345', '1A', 'Sin referencias', 0, NULL, '2022-01-02 15:08:03', '2022-01-02 15:08:03', NULL);
INSERT INTO `despachos_ventas` VALUES (42, 30, '1 NORTE 2 ORIENTE', '07', '071', '07101', 'Talca', '123A', NULL, 'Pasaje sin número', 0, NULL, '2022-01-04 15:01:36', '2022-01-09 16:11:58', '2022-01-09 16:11:58');
INSERT INTO `despachos_ventas` VALUES (47, 31, '1 NORTE 2 ORIENTE', '07', '071', '07101', 'Talca', '123A', NULL, 'Pasaje sin número', 0, NULL, '2022-01-04 15:15:52', '2022-01-04 15:15:52', NULL);
INSERT INTO `despachos_ventas` VALUES (48, 32, '1 NORTE 2 ORIENTE', '07', '071', '07101', 'Talca', '123A', NULL, 'Pasaje sin número', 0, NULL, '2022-01-05 15:16:28', '2022-01-09 15:26:26', '2022-01-09 15:26:26');
INSERT INTO `despachos_ventas` VALUES (49, 33, '1 NORTE 2 ORIENTE', '07', '071', '07101', 'Talca', '123A', NULL, 'Pasaje sin número', 0, '2022-01-06 16:09:13', '2022-01-06 12:30:50', '2022-01-06 16:09:16', NULL);
INSERT INTO `despachos_ventas` VALUES (50, 34, '1 NORTE 2 ORIENTE', '07', '071', '07101', 'Talca', '123A', NULL, 'Pasaje sin número', 0, '2022-01-07 00:00:00', '2022-01-06 12:33:59', '2022-01-07 02:06:51', NULL);
INSERT INTO `despachos_ventas` VALUES (51, 34, '1 NORTE 2 ORIENTE', '07', '071', '07101', 'Talca', '123A', NULL, 'Pasaje sin número', 0, '2022-01-07 00:00:00', '2022-01-06 12:54:02', '2022-01-07 02:06:51', NULL);
INSERT INTO `despachos_ventas` VALUES (52, 35, '1 NORTE 2 ORIENTE', '07', '071', '07101', 'Talca', '123A', NULL, 'Pasaje sin número', 0, '2022-01-06 21:08:16', '2022-01-06 12:55:13', '2022-01-06 21:08:17', NULL);
INSERT INTO `despachos_ventas` VALUES (53, 35, '1 NORTE 2 ORIENTE', '07', '071', '07101', 'Talca', '123A', NULL, 'Pasaje sin número', 0, '2022-01-06 20:27:26', '2022-01-06 12:56:02', '2022-01-06 20:27:29', NULL);
INSERT INTO `despachos_ventas` VALUES (54, 36, '1 NORTE 2 ORIENTE', '07', '071', '07101', 'Talca', '123A', NULL, 'Pasaje sin número', 0, NULL, '2022-01-06 13:01:03', '2022-01-06 13:01:03', NULL);
INSERT INTO `despachos_ventas` VALUES (55, 37, '1 NORTE 2 ORIENTE', '07', '071', '07101', 'Talca', '123A', NULL, 'Pasaje sin número', 0, NULL, '2022-01-06 13:03:46', '2022-01-09 16:13:32', '2022-01-09 16:13:32');
INSERT INTO `despachos_ventas` VALUES (56, 38, '1 NORTE 2 ORIENTE', '07', '071', '07101', 'Talca', '123A', NULL, 'Pasaje sin número', 0, NULL, '2022-01-06 13:05:28', '2022-01-09 16:15:29', '2022-01-09 16:15:29');
INSERT INTO `despachos_ventas` VALUES (57, 39, '1 NORTE 2 ORIENTE', '07', '071', '07101', 'Talca', '123A', NULL, 'Pasaje sin número', 0, '2022-01-09 00:00:00', '2022-01-06 13:09:46', '2022-01-09 16:16:15', NULL);
INSERT INTO `despachos_ventas` VALUES (58, 40, '1 NORTE 2 ORIENTE', '07', '071', '07101', 'Talca', '123A', NULL, 'Pasaje sin número', 0, NULL, '2022-01-06 13:20:17', '2022-01-06 13:20:17', NULL);
INSERT INTO `despachos_ventas` VALUES (59, 41, '1 NORTE 2 ORIENTE', '07', '071', '07101', 'Talca', '123A', NULL, 'Pasaje sin número', 0, NULL, '2022-01-06 13:22:16', '2022-01-06 13:22:16', NULL);
INSERT INTO `despachos_ventas` VALUES (60, 41, '1 NORTE 2 ORIENTE', '07', '071', '07101', 'Talca', '123A', NULL, 'Pasaje sin número', 0, NULL, '2022-01-06 13:23:42', '2022-01-06 13:23:42', NULL);
INSERT INTO `despachos_ventas` VALUES (61, 42, '1 NORTE 2 ORIENTE', '07', '071', '07101', 'Talca', '123A', NULL, 'Pasaje sin número', 0, NULL, '2022-01-06 13:25:13', '2022-01-06 13:25:13', NULL);
INSERT INTO `despachos_ventas` VALUES (64, 44, '1 NORTE 2 ORIENTE', '07', '071', '07101', 'Talca', '123A', NULL, 'Pasaje sin número', 0, NULL, '2022-01-30 01:59:58', '2022-01-30 01:59:58', NULL);
INSERT INTO `despachos_ventas` VALUES (67, 47, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', '01', 'Cerca de colegio', 0, NULL, '2022-01-30 02:14:06', '2022-01-30 02:14:06', NULL);
INSERT INTO `despachos_ventas` VALUES (68, 48, '1 NORTE 2 ORIENTE', '07', '071', '07101', 'Talca', '123A', NULL, 'Pasaje sin número', 0, NULL, '2022-01-30 15:05:08', '2022-01-30 15:05:08', NULL);

-- ----------------------------
-- Table structure for detalle_ventas
-- ----------------------------
DROP TABLE IF EXISTS `detalle_ventas`;
CREATE TABLE `detalle_ventas`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `venta_id` bigint UNSIGNED NOT NULL,
  `producto_id` bigint UNSIGNED NOT NULL,
  `precio_neto` bigint NOT NULL COMMENT 'Precio neto sin impuestos',
  `impuestos` bigint NOT NULL COMMENT 'Promedio de los porcentajes de impuestos aplicados',
  `JSON_impuestos` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT 'JSON con los códigos de los impuestos y porcentaje de cada impuesto',
  `precio_venta` bigint NOT NULL COMMENT 'precio con impuestos',
  `cantidad` bigint NOT NULL,
  `total_producto` bigint NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `detalle_ventas_venta_id_foreign`(`venta_id`) USING BTREE,
  INDEX `detalle_ventas_producto_id_foreign`(`producto_id`) USING BTREE,
  CONSTRAINT `detalle_ventas_producto_id_foreign` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `detalle_ventas_venta_id_foreign` FOREIGN KEY (`venta_id`) REFERENCES `ventas` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 44 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of detalle_ventas
-- ----------------------------
INSERT INTO `detalle_ventas` VALUES (14, 30, 18, 33380, 19, NULL, 39722, 1, 39722, '2022-01-04 15:03:44', '2022-01-09 16:11:58', '2022-01-09 16:11:58');
INSERT INTO `detalle_ventas` VALUES (15, 30, 24, 11500, 19, NULL, 13685, 1, 13685, '2022-01-04 15:03:44', '2022-01-09 16:11:58', '2022-01-09 16:11:58');
INSERT INTO `detalle_ventas` VALUES (16, 30, 18, 33380, 19, NULL, 39722, 1, 39722, '2022-01-04 15:04:47', '2022-01-09 16:11:58', '2022-01-09 16:11:58');
INSERT INTO `detalle_ventas` VALUES (17, 30, 24, 11500, 19, NULL, 13685, 1, 13685, '2022-01-04 15:04:47', '2022-01-09 16:11:58', '2022-01-09 16:11:58');
INSERT INTO `detalle_ventas` VALUES (18, 31, 22, 650000, 19, NULL, 773500, 1, 773500, '2022-01-04 15:14:15', '2022-01-04 15:15:52', '2022-01-04 15:15:52');
INSERT INTO `detalle_ventas` VALUES (19, 31, 20, 50000, 19, NULL, 59500, 1, 59500, '2022-01-04 15:14:15', '2022-01-04 15:15:52', '2022-01-04 15:15:52');
INSERT INTO `detalle_ventas` VALUES (20, 32, 20, 50000, 19, NULL, 59500, 1, 59500, '2022-01-05 15:16:28', '2022-01-09 15:26:26', '2022-01-09 15:26:26');
INSERT INTO `detalle_ventas` VALUES (21, 32, 10, 32600, 19, NULL, 38794, 1, 38794, '2022-01-05 15:16:28', '2022-01-09 15:26:26', '2022-01-09 15:26:26');
INSERT INTO `detalle_ventas` VALUES (22, 33, 24, 11500, 19, NULL, 13685, 1, 13685, '2022-01-06 12:30:50', '2022-01-06 16:09:16', '2022-01-06 16:09:16');
INSERT INTO `detalle_ventas` VALUES (23, 33, 18, 33380, 19, NULL, 39722, 1, 39722, '2022-01-06 12:30:50', '2022-01-06 16:09:16', '2022-01-06 16:09:16');
INSERT INTO `detalle_ventas` VALUES (24, 34, 10, 32600, 19, NULL, 38794, 1, 46165, '2022-01-06 12:33:59', '2022-01-07 01:34:07', NULL);
INSERT INTO `detalle_ventas` VALUES (25, 34, 7, 33000, 19, NULL, 39270, 1, 46731, '2022-01-06 12:33:59', '2022-01-07 01:34:07', NULL);
INSERT INTO `detalle_ventas` VALUES (26, 35, 24, 11500, 19, NULL, 13685, 1, 16285, '2022-01-06 12:55:13', '2022-01-06 21:08:17', NULL);
INSERT INTO `detalle_ventas` VALUES (27, 35, 25, 529900, 19, NULL, 630581, 1, 750391, '2022-01-06 12:55:13', '2022-01-06 21:08:17', NULL);
INSERT INTO `detalle_ventas` VALUES (28, 36, 18, 33380, 19, NULL, 39722, 1, 39722, '2022-01-06 13:01:03', '2022-01-06 13:01:03', NULL);
INSERT INTO `detalle_ventas` VALUES (29, 36, 20, 50000, 19, NULL, 59500, 1, 59500, '2022-01-06 13:01:03', '2022-01-06 13:01:03', NULL);
INSERT INTO `detalle_ventas` VALUES (30, 37, 6, 110000, 19, NULL, 130900, 1, 130900, '2022-01-06 13:03:46', '2022-01-09 16:13:32', '2022-01-09 16:13:32');
INSERT INTO `detalle_ventas` VALUES (31, 37, 20, 50000, 19, NULL, 59500, 1, 59500, '2022-01-06 13:03:46', '2022-01-09 16:13:32', '2022-01-09 16:13:32');
INSERT INTO `detalle_ventas` VALUES (32, 38, 17, 33700, 19, NULL, 40103, 1, 40103, '2022-01-06 13:05:28', '2022-01-09 16:15:29', '2022-01-09 16:15:29');
INSERT INTO `detalle_ventas` VALUES (33, 38, 20, 50000, 19, NULL, 59500, 1, 59500, '2022-01-06 13:05:28', '2022-01-09 16:15:29', '2022-01-09 16:15:29');
INSERT INTO `detalle_ventas` VALUES (34, 39, 19, 35688, 19, NULL, 42469, 1, 42469, '2022-01-06 13:09:47', '2022-01-06 13:09:47', NULL);
INSERT INTO `detalle_ventas` VALUES (35, 39, 24, 11500, 19, NULL, 13685, 1, 13685, '2022-01-06 13:09:48', '2022-01-06 13:09:48', NULL);
INSERT INTO `detalle_ventas` VALUES (36, 40, 20, 50000, 19, NULL, 59500, 1, 59500, '2022-01-06 13:20:17', '2022-01-06 13:20:17', NULL);
INSERT INTO `detalle_ventas` VALUES (37, 40, 24, 11500, 19, NULL, 13685, 1, 13685, '2022-01-06 13:20:17', '2022-01-06 13:20:17', NULL);
INSERT INTO `detalle_ventas` VALUES (38, 41, 10, 32600, 19, NULL, 38794, 1, 38794, '2022-01-06 13:22:16', '2022-01-06 13:23:42', '2022-01-06 13:23:42');
INSERT INTO `detalle_ventas` VALUES (39, 41, 11, 39990, 19, NULL, 47588, 1, 47588, '2022-01-06 13:22:16', '2022-01-06 13:23:42', '2022-01-06 13:23:42');
INSERT INTO `detalle_ventas` VALUES (40, 42, 6, 110000, 19, NULL, 130900, 1, 130900, '2022-01-06 13:25:13', '2022-01-06 13:25:13', NULL);
INSERT INTO `detalle_ventas` VALUES (41, 42, 7, 33000, 19, NULL, 39270, 1, 39270, '2022-01-06 13:25:13', '2022-01-06 13:25:13', NULL);
INSERT INTO `detalle_ventas` VALUES (42, 47, 24, 13685, 19, NULL, 13685, 1, 16285, '2022-01-30 02:14:06', '2022-01-30 02:14:06', NULL);
INSERT INTO `detalle_ventas` VALUES (43, 48, 24, 13685, 19, NULL, 13685, 1, 16285, '2022-01-30 15:05:08', '2022-01-30 15:05:08', NULL);

-- ----------------------------
-- Table structure for failed_jobs
-- ----------------------------
DROP TABLE IF EXISTS `failed_jobs`;
CREATE TABLE `failed_jobs`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `failed_jobs_uuid_unique`(`uuid`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of failed_jobs
-- ----------------------------

-- ----------------------------
-- Table structure for imagenes_marquesina_home
-- ----------------------------
DROP TABLE IF EXISTS `imagenes_marquesina_home`;
CREATE TABLE `imagenes_marquesina_home`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `src_imagen` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `texto` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `link` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `posicion` int NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `texto2` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `texto_boton` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `posicion_horizontal` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pos_left',
  `posicion_vertical` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pos_middle',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 25 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of imagenes_marquesina_home
-- ----------------------------
INSERT INTO `imagenes_marquesina_home` VALUES (1, 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', 'Imagen 1', 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', 0, '2021-11-29 22:16:43', '2021-11-29 22:22:33', '2021-11-29 22:22:33', NULL, NULL, 'pos_left', 'pos_middle');
INSERT INTO `imagenes_marquesina_home` VALUES (2, 'bg-1.jpg', 'Nueva temporada 2022', NULL, 10, '2021-11-29 22:16:43', '2021-12-01 01:20:08', NULL, 'Lo más nuevo para éste verano', 'Ver colección 2022', 'pos_left', 'pos_middle');
INSERT INTO `imagenes_marquesina_home` VALUES (3, 'zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz', 'Imagen 3', 'cccccccccccccccccccccccccccccc', 2, '2021-11-29 22:16:43', '2021-11-29 22:22:34', '2021-11-29 22:22:34', NULL, NULL, 'pos_left', 'pos_middle');
INSERT INTO `imagenes_marquesina_home` VALUES (4, 'breadcumb2.jpg', 'Imagen secundaria', 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', 20, '2021-11-29 22:18:18', '2021-12-01 17:04:54', '2021-12-01 17:04:54', NULL, NULL, 'pos_left', 'pos_middle');
INSERT INTO `imagenes_marquesina_home` VALUES (5, 'breadcumb2.jpg', NULL, NULL, 20, '2021-11-29 22:18:18', '2021-12-01 17:10:33', NULL, NULL, NULL, 'pos_left', 'pos_middle');
INSERT INTO `imagenes_marquesina_home` VALUES (6, 'blog5.jpg', 'qaqaqaqaqaq', 'qaqaqaqa', 40, '2021-12-01 16:46:13', '2021-12-01 16:55:44', '2021-12-01 16:55:44', NULL, NULL, 'pos_left', 'pos_middle');
INSERT INTO `imagenes_marquesina_home` VALUES (7, 'blog5.jpg', 'qaqaqaqaqaq', 'qaqaqaqa', 40, '2021-12-01 16:46:14', '2021-12-01 16:55:44', '2021-12-01 16:55:44', NULL, NULL, 'pos_left', 'pos_middle');
INSERT INTO `imagenes_marquesina_home` VALUES (8, 'blog5.jpg', 'qaqaqaqaqaq', 'qaqaqaqa', 40, '2021-12-01 16:48:41', '2021-12-01 16:55:44', '2021-12-01 16:55:44', NULL, NULL, 'pos_left', 'pos_middle');
INSERT INTO `imagenes_marquesina_home` VALUES (9, 'blog5.jpg', 'qaqaqaqaqaq', 'qaqaqaqa', 30, '2021-12-01 16:49:33', '2021-12-01 17:21:20', '2021-12-01 17:21:20', NULL, NULL, 'pos_left', 'pos_middle');
INSERT INTO `imagenes_marquesina_home` VALUES (10, 'bg-2.jpg', 'asdfghjkjhgfd', 'wertyuiutre', 100, '2021-12-01 16:54:25', '2021-12-01 16:56:32', '2021-12-01 16:56:32', NULL, NULL, 'pos_left', 'pos_middle');
INSERT INTO `imagenes_marquesina_home` VALUES (20, 'bg-5.jpg', 'Moda y tecnología', NULL, 40, '2021-12-01 17:10:33', '2021-12-01 17:10:33', NULL, 'Lo mejor en ', 'Ver más', 'pos_right', 'pos_middle');
INSERT INTO `imagenes_marquesina_home` VALUES (21, 'bg-5.jpg', NULL, NULL, 30, '2021-12-01 17:11:33', '2021-12-01 17:17:32', '2021-12-01 17:17:32', NULL, NULL, 'pos_left', 'pos_middle');
INSERT INTO `imagenes_marquesina_home` VALUES (22, 'blog1.jpg', NULL, NULL, 30, '2021-12-01 17:21:20', '2021-12-01 17:31:35', '2021-12-01 17:31:35', NULL, NULL, 'pos_left', 'pos_middle');
INSERT INTO `imagenes_marquesina_home` VALUES (23, 'blog2.jpg', NULL, NULL, 50, '2021-12-01 17:31:36', '2021-12-01 18:13:33', '2021-12-01 18:13:33', NULL, NULL, 'pos_left', 'pos_middle');
INSERT INTO `imagenes_marquesina_home` VALUES (24, 'blog1.jpg', NULL, NULL, 0, '2021-12-01 18:13:15', '2021-12-01 18:13:33', '2021-12-01 18:13:33', NULL, NULL, 'pos_left', 'pos_middle');

-- ----------------------------
-- Table structure for imagenes_producto
-- ----------------------------
DROP TABLE IF EXISTS `imagenes_producto`;
CREATE TABLE `imagenes_producto`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `producto_id` bigint NOT NULL,
  `source_image` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `imagen_principal` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 94 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of imagenes_producto
-- ----------------------------
INSERT INTO `imagenes_producto` VALUES (11, 6, '20161211_140336.jpg', '2021-11-22 15:53:21', '2021-11-23 01:20:47', '2021-11-23 01:20:47', 0);
INSERT INTO `imagenes_producto` VALUES (12, 6, '20161225_134748.jpg', '2021-11-22 15:53:21', '2021-11-22 20:03:51', '2021-11-22 20:03:51', 0);
INSERT INTO `imagenes_producto` VALUES (14, 6, '20170216_122733_Signature.jpg', '2021-11-22 15:53:21', '2021-11-23 01:20:47', '2021-11-23 01:20:47', 1);
INSERT INTO `imagenes_producto` VALUES (15, 6, '20170216_122807.jpg', '2021-11-22 15:53:21', '2021-11-22 20:07:31', '2021-11-22 20:07:31', 0);
INSERT INTO `imagenes_producto` VALUES (16, 6, '20170216_122816.jpg', '2021-11-22 15:53:21', '2021-12-10 19:23:35', '2021-12-10 19:23:35', 1);
INSERT INTO `imagenes_producto` VALUES (17, 6, '20170216_123147.jpg', '2021-11-22 15:53:21', '2021-12-10 19:23:35', '2021-12-10 19:23:35', 0);
INSERT INTO `imagenes_producto` VALUES (18, 6, '20170216_123203.jpg', '2021-11-22 15:53:21', '2021-12-10 19:23:35', '2021-12-10 19:23:35', 0);
INSERT INTO `imagenes_producto` VALUES (19, 6, '20170216_123220.jpg', '2021-11-22 15:53:21', '2021-12-10 19:23:35', '2021-12-10 19:23:35', 0);
INSERT INTO `imagenes_producto` VALUES (26, 6, 'DSC_0032-1.JPG', '2021-11-22 20:07:31', '2021-11-23 01:23:48', '2021-11-23 01:23:48', 0);
INSERT INTO `imagenes_producto` VALUES (27, 6, 'DSC_0035.JPG', '2021-11-22 20:07:31', '2021-11-23 01:24:27', '2021-11-23 01:24:27', 0);
INSERT INTO `imagenes_producto` VALUES (28, 6, 'DSC_0036.JPG', '2021-11-22 20:07:31', '2021-12-10 19:23:35', '2021-12-10 19:23:35', 0);
INSERT INTO `imagenes_producto` VALUES (39, 6, '20170819_143641.jpg', '2021-11-23 00:44:35', '2021-11-23 01:23:48', '2021-11-23 01:23:48', 0);
INSERT INTO `imagenes_producto` VALUES (40, 6, '20170819_143823.jpg', '2021-11-23 00:44:35', '2021-11-23 01:23:48', '2021-11-23 01:23:48', 0);
INSERT INTO `imagenes_producto` VALUES (41, 6, '20210520_144419.jpg', '2021-11-23 00:44:35', '2021-12-10 19:23:35', '2021-12-10 19:23:35', 0);
INSERT INTO `imagenes_producto` VALUES (42, 6, '20210520_144446.jpg', '2021-11-23 00:44:35', '2021-12-10 19:23:35', '2021-12-10 19:23:35', 0);
INSERT INTO `imagenes_producto` VALUES (43, 6, 'dktzweZ-robotech-wallpaper.jpg', '2021-11-23 01:24:27', '2021-12-10 19:23:35', '2021-12-10 19:23:35', 0);
INSERT INTO `imagenes_producto` VALUES (44, 7, '20170216_123147.jpg', '2021-11-23 10:47:08', '2021-12-10 22:14:53', '2021-12-10 22:14:53', 0);
INSERT INTO `imagenes_producto` VALUES (45, 7, '20170216_123203.jpg', '2021-11-23 10:47:08', '2021-12-10 22:14:53', '2021-12-10 22:14:53', 0);
INSERT INTO `imagenes_producto` VALUES (46, 7, '20170216_123220.jpg', '2021-11-23 10:47:08', '2021-12-10 22:14:53', '2021-12-10 22:14:53', 0);
INSERT INTO `imagenes_producto` VALUES (47, 7, '20170216_123244.jpg', '2021-11-23 10:47:08', '2021-12-10 22:14:53', '2021-12-10 22:14:53', 0);
INSERT INTO `imagenes_producto` VALUES (48, 7, '20170216_123408.jpg', '2021-11-23 10:47:08', '2021-12-10 22:14:53', '2021-12-10 22:14:53', 1);
INSERT INTO `imagenes_producto` VALUES (49, 8, 'product-1.jpg', '2021-12-10 18:21:44', '2021-12-10 18:21:44', NULL, 1);
INSERT INTO `imagenes_producto` VALUES (50, 9, 'product-2.jpg', '2021-12-10 18:26:27', '2021-12-10 18:26:27', NULL, 1);
INSERT INTO `imagenes_producto` VALUES (51, 10, 'product-3.jpg', '2021-12-10 18:29:34', '2021-12-10 18:29:34', NULL, 1);
INSERT INTO `imagenes_producto` VALUES (52, 11, 'product-4.jpg', '2021-12-10 18:32:51', '2021-12-10 18:32:51', NULL, 1);
INSERT INTO `imagenes_producto` VALUES (53, 12, 'product-7.jpg', '2021-12-10 18:35:01', '2021-12-10 18:35:01', NULL, 1);
INSERT INTO `imagenes_producto` VALUES (54, 13, 'product-5.jpg', '2021-12-10 18:36:53', '2021-12-10 18:36:53', NULL, 1);
INSERT INTO `imagenes_producto` VALUES (55, 14, 'product-8.jpg', '2021-12-10 19:19:15', '2021-12-10 19:19:15', NULL, 1);
INSERT INTO `imagenes_producto` VALUES (56, 15, 'product-big-1.jpg', '2021-12-10 19:22:01', '2021-12-10 19:22:01', NULL, 1);
INSERT INTO `imagenes_producto` VALUES (57, 15, 'product-big-3.jpg', '2021-12-10 19:22:01', '2021-12-10 19:22:01', NULL, 0);
INSERT INTO `imagenes_producto` VALUES (58, 6, 'lg x-cam.jpg', '2021-12-10 19:23:35', '2021-12-10 19:23:35', NULL, 1);
INSERT INTO `imagenes_producto` VALUES (59, 16, 'lg k41s.jpg', '2021-12-10 19:25:39', '2021-12-10 19:25:39', NULL, 1);
INSERT INTO `imagenes_producto` VALUES (60, 7, '132525505833.JPG', '2021-12-10 22:14:53', '2021-12-12 12:24:25', '2021-12-12 12:24:25', 1);
INSERT INTO `imagenes_producto` VALUES (61, 17, 'zapatilla ua - 724601-0001-001.png', '2021-12-11 15:25:36', '2021-12-11 15:25:36', NULL, 1);
INSERT INTO `imagenes_producto` VALUES (62, 17, 'zapatilla ua - 724601-0001-002.jpg', '2021-12-11 15:25:36', '2021-12-11 15:25:36', NULL, 0);
INSERT INTO `imagenes_producto` VALUES (63, 17, 'zapatilla ua - 724601-0001-003.jpg', '2021-12-11 15:25:36', '2021-12-11 15:25:36', NULL, 0);
INSERT INTO `imagenes_producto` VALUES (64, 17, 'zapatilla ua - 724601-0001-004.jpg', '2021-12-11 15:25:36', '2021-12-11 15:25:36', NULL, 0);
INSERT INTO `imagenes_producto` VALUES (65, 18, 'zapatilla skecher 2.jpg', '2021-12-11 15:46:59', '2021-12-11 15:46:59', NULL, 1);
INSERT INTO `imagenes_producto` VALUES (66, 18, 'zapatilla skecher 3.jpg', '2021-12-11 15:46:59', '2021-12-11 15:46:59', NULL, 0);
INSERT INTO `imagenes_producto` VALUES (67, 18, 'zapatilla skecher 4.jpg', '2021-12-11 15:46:59', '2021-12-11 15:46:59', NULL, 0);
INSERT INTO `imagenes_producto` VALUES (68, 18, 'zapatilla skecher 5.jpg', '2021-12-11 15:46:59', '2021-12-11 15:46:59', NULL, 0);
INSERT INTO `imagenes_producto` VALUES (69, 18, 'zapatilla skechers.jpg', '2021-12-11 15:46:59', '2021-12-11 15:46:59', NULL, 0);
INSERT INTO `imagenes_producto` VALUES (70, 19, 'zapatillas adidas 956973-0001-001.jpg', '2021-12-11 15:58:15', '2021-12-11 15:58:15', NULL, 1);
INSERT INTO `imagenes_producto` VALUES (71, 19, 'zapatillas adidas 956973-0001-002.jpg', '2021-12-11 15:58:15', '2021-12-11 15:58:15', NULL, 0);
INSERT INTO `imagenes_producto` VALUES (72, 19, 'zapatillas adidas 956973-0001-003.jpg', '2021-12-11 15:58:15', '2021-12-11 15:58:15', NULL, 0);
INSERT INTO `imagenes_producto` VALUES (73, 19, 'zapatillas adidas 956973-0001-004.jpg', '2021-12-11 15:58:15', '2021-12-11 15:58:15', NULL, 0);
INSERT INTO `imagenes_producto` VALUES (74, 19, 'zapatillas adidas 956973-0001-004.png', '2021-12-11 15:58:15', '2021-12-11 15:58:15', NULL, 0);
INSERT INTO `imagenes_producto` VALUES (75, 19, 'zapatillas adidas 956973-0001-005.jpg', '2021-12-11 15:58:15', '2021-12-11 15:58:15', NULL, 0);
INSERT INTO `imagenes_producto` VALUES (76, 20, 'maleta-mancuenrnas 1.jpg', '2021-12-11 16:31:48', '2021-12-11 16:31:48', NULL, 1);
INSERT INTO `imagenes_producto` VALUES (77, 20, 'maleta-mancuenrnas 2.jpg', '2021-12-11 16:31:48', '2021-12-11 16:31:48', NULL, 0);
INSERT INTO `imagenes_producto` VALUES (78, 20, 'maleta-mancuenrnas 3.jpg', '2021-12-11 16:31:48', '2021-12-11 16:31:48', NULL, 0);
INSERT INTO `imagenes_producto` VALUES (79, 21, 'maquina abs 1.jpg', '2021-12-12 12:05:34', '2021-12-12 12:05:34', NULL, 1);
INSERT INTO `imagenes_producto` VALUES (80, 21, 'maquina abs 2.jpg', '2021-12-12 12:05:34', '2021-12-12 12:05:34', NULL, 0);
INSERT INTO `imagenes_producto` VALUES (81, 22, 'notebook idp3-b.jpg', '2021-12-12 12:17:16', '2021-12-12 12:17:16', NULL, 1);
INSERT INTO `imagenes_producto` VALUES (82, 22, 'notebook idp3-c.jpg', '2021-12-12 12:17:16', '2021-12-12 12:17:16', NULL, 0);
INSERT INTO `imagenes_producto` VALUES (83, 22, 'notebook lenovo idp3.jpg', '2021-12-12 12:17:16', '2021-12-12 12:17:16', NULL, 0);
INSERT INTO `imagenes_producto` VALUES (84, 7, 'hdd3.webp', '2021-12-12 12:24:26', '2021-12-12 12:38:39', NULL, 0);
INSERT INTO `imagenes_producto` VALUES (85, 7, 'hdd.webp', '2021-12-12 12:24:26', '2021-12-12 12:38:39', NULL, 0);
INSERT INTO `imagenes_producto` VALUES (86, 7, 'hdd2.webp', '2021-12-12 12:24:26', '2021-12-12 12:38:39', NULL, 0);
INSERT INTO `imagenes_producto` VALUES (87, 23, 'balon basquet.jpg', '2021-12-12 12:27:00', '2021-12-12 12:27:00', NULL, 1);
INSERT INTO `imagenes_producto` VALUES (88, 24, 'balanza.jpg', '2021-12-12 12:31:34', '2021-12-12 12:31:34', NULL, 1);
INSERT INTO `imagenes_producto` VALUES (89, 24, 'balanza2.jpg', '2021-12-12 12:31:34', '2021-12-12 12:31:34', NULL, 0);
INSERT INTO `imagenes_producto` VALUES (90, 25, 'dron phantom3.jpg', '2021-12-12 12:35:35', '2021-12-12 12:35:35', NULL, 1);
INSERT INTO `imagenes_producto` VALUES (91, 25, 'dron phantom3-b.jpg', '2021-12-12 12:35:35', '2021-12-12 12:35:35', NULL, 0);
INSERT INTO `imagenes_producto` VALUES (92, 25, 'dron phantom3-c.jpg', '2021-12-12 12:35:35', '2021-12-12 12:35:35', NULL, 0);
INSERT INTO `imagenes_producto` VALUES (93, 7, 'hd4.jpg', '2021-12-12 12:38:39', '2021-12-12 12:38:39', NULL, 1);

-- ----------------------------
-- Table structure for impuestos
-- ----------------------------
DROP TABLE IF EXISTS `impuestos`;
CREATE TABLE `impuestos`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `sigla` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `porcentaje` double UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `impuestos_nombre_unique`(`nombre`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of impuestos
-- ----------------------------
INSERT INTO `impuestos` VALUES (1, 'Impuesto al valor agregado', 'IVA', 19, '2021-10-25 19:02:54', '2021-10-25 19:05:31', NULL);
INSERT INTO `impuestos` VALUES (2, 'Impuesto 2', 'ILA', 25, '2021-10-25 19:03:37', '2021-10-25 19:07:22', NULL);
INSERT INTO `impuestos` VALUES (3, 'aaaaaa dxdxdxd dxdxdx', 'bbb dxdxdx', 12, '2021-10-27 11:50:49', '2021-11-07 22:33:02', '2021-11-07 22:33:02');
INSERT INTO `impuestos` VALUES (4, 'aaaaaa modificado', 'bbb2', 12, '2021-10-27 11:51:12', '2021-10-27 12:04:56', '2021-10-27 12:04:56');

-- ----------------------------
-- Table structure for marcas
-- ----------------------------
DROP TABLE IF EXISTS `marcas`;
CREATE TABLE `marcas`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `src_imagen` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `mostrar_en_home` tinyint NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `marcas_nombre_unique`(`nombre`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 21 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of marcas
-- ----------------------------
INSERT INTO `marcas` VALUES (1, 'Index', '2021-10-23 22:57:08', '2021-10-23 22:57:08', NULL, '', 0);
INSERT INTO `marcas` VALUES (2, 'Samsung', '2021-10-23 23:00:38', '2021-10-23 23:00:38', NULL, '', 0);
INSERT INTO `marcas` VALUES (3, 'LG', '2021-10-23 23:05:43', '2021-10-23 23:05:43', NULL, '', 0);
INSERT INTO `marcas` VALUES (4, 'Adidas', '2021-10-23 23:10:08', '2021-10-23 23:10:08', NULL, '', 0);
INSERT INTO `marcas` VALUES (5, 'AAAAAAAAAA', '2021-10-23 23:10:30', '2021-10-23 23:21:04', '2021-10-23 23:21:04', '', 0);
INSERT INTO `marcas` VALUES (6, 'qwertasdfgh dxdxdxd', '2021-11-07 22:36:23', '2021-11-07 22:36:49', '2021-11-07 22:36:49', '', 0);
INSERT INTO `marcas` VALUES (7, 'Mango', '2021-12-06 15:57:02', '2021-12-12 18:09:40', NULL, 'brand2.png', 1);
INSERT INTO `marcas` VALUES (8, 'TOPSHOP', '2021-12-06 16:39:11', '2021-12-06 16:39:11', NULL, 'brand1.png', 1);
INSERT INTO `marcas` VALUES (9, 'Zara', '2021-12-06 16:56:12', '2021-12-06 16:56:12', NULL, 'brand3.png', 1);
INSERT INTO `marcas` VALUES (10, 'Bershka', '2021-12-06 16:59:26', '2021-12-06 16:59:26', NULL, 'brand4.png', 1);
INSERT INTO `marcas` VALUES (11, 'Asos', '2021-12-06 17:02:55', '2021-12-12 18:08:38', NULL, 'brand5.png', 1);
INSERT INTO `marcas` VALUES (12, 'Under Armour', '2021-12-06 17:04:25', '2021-12-06 17:04:25', NULL, NULL, 0);
INSERT INTO `marcas` VALUES (13, 'skechers', '2021-12-11 15:45:22', '2021-12-11 15:45:22', NULL, NULL, 0);
INSERT INTO `marcas` VALUES (14, 'Oxford', '2021-12-11 16:10:21', '2021-12-11 16:10:21', NULL, 'logo-oxford-300x151 (1).png', 1);
INSERT INTO `marcas` VALUES (15, 'Lenovo', '2021-12-12 12:11:21', '2021-12-12 12:11:21', NULL, 'lenovo icon.png', 1);
INSERT INTO `marcas` VALUES (16, 'Muuk', '2021-12-12 12:25:53', '2021-12-12 12:25:53', NULL, NULL, 0);
INSERT INTO `marcas` VALUES (17, 'Nappo', '2021-12-12 12:28:43', '2021-12-12 12:28:43', NULL, NULL, 0);
INSERT INTO `marcas` VALUES (18, 'Phantom', '2021-12-12 12:34:34', '2021-12-12 12:34:34', NULL, NULL, 0);

-- ----------------------------
-- Table structure for menus
-- ----------------------------
DROP TABLE IF EXISTS `menus`;
CREATE TABLE `menus`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `url` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `menu_padre_id` bigint NOT NULL,
  `posicion` int UNSIGNED NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `menus_nombre_unique`(`nombre`) USING BTREE,
  UNIQUE INDEX `menus_url_unique`(`url`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 38 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of menus
-- ----------------------------
INSERT INTO `menus` VALUES (1, 'Pantallas', 'pantallas', '2021-01-28 19:24:05', '2021-06-07 00:00:00', NULL, 15, 20);
INSERT INTO `menus` VALUES (3, 'Roles', 'roles', '2021-01-30 17:58:04', '2021-02-10 01:22:29', NULL, 15, 30);
INSERT INTO `menus` VALUES (4, 'Usuarios', 'usuarios', '2021-01-30 17:59:32', '2021-02-10 01:22:40', NULL, 15, 40);
INSERT INTO `menus` VALUES (5, 'Menús', 'menus', '2021-01-30 18:28:46', '2021-02-10 01:18:08', NULL, 15, 10);
INSERT INTO `menus` VALUES (13, 'Secciones', 'secciones_home', '2021-02-09 08:52:46', '2021-12-09 15:08:19', NULL, 19, 30);
INSERT INTO `menus` VALUES (14, 'Permisos', 'permisos', '2021-02-10 11:41:45', '2021-02-10 11:41:45', NULL, 15, 50);
INSERT INTO `menus` VALUES (15, 'Configuración', NULL, '2021-02-11 13:18:07', '2021-10-23 12:42:12', NULL, 0, 30);
INSERT INTO `menus` VALUES (19, 'Tienda', NULL, '2021-02-11 13:19:24', '2021-11-29 13:16:19', NULL, 0, 10);
INSERT INTO `menus` VALUES (22, 'Personalizar', 'personalizar', '2021-05-26 00:00:00', '2021-05-26 00:00:00', NULL, 15, 70);
INSERT INTO `menus` VALUES (23, 'tftftf', 'tftftftf', '2021-06-07 00:00:00', '2021-06-07 00:00:00', '2021-06-07 00:00:00', 1, 1000);
INSERT INTO `menus` VALUES (24, 'Mantenedores', NULL, '2021-10-23 12:35:36', '2021-11-17 15:59:27', NULL, 0, 20);
INSERT INTO `menus` VALUES (25, 'Marcas', 'marcas', '2021-10-23 12:47:13', '2021-10-23 12:56:51', NULL, 24, 10);
INSERT INTO `menus` VALUES (26, 'Impuestos', 'impuestos', '2021-10-26 11:42:30', '2021-10-26 11:42:30', NULL, 24, 20);
INSERT INTO `menus` VALUES (27, 'Categorías', 'categorias', '2021-10-30 11:32:54', '2021-10-30 11:35:46', NULL, 24, 30);
INSERT INTO `menus` VALUES (28, 'Subcategorías', 'sub_categorias', '2021-11-06 22:42:58', '2021-11-06 22:44:04', NULL, 24, 40);
INSERT INTO `menus` VALUES (29, 'aaaaaaaaaaaa cc', 'aaaaaaaaaaaa', '2021-11-07 22:41:10', '2021-11-07 22:43:00', '2021-11-07 22:43:00', 24, 100);
INSERT INTO `menus` VALUES (30, 'Unidades', 'unidades', '2021-11-17 19:30:49', '2021-11-17 19:33:28', NULL, 24, 50);
INSERT INTO `menus` VALUES (31, 'Clientes', 'clientes', '2021-11-18 23:08:48', '2021-11-18 23:08:48', NULL, 24, 60);
INSERT INTO `menus` VALUES (32, 'Productos', 'productos', '2021-11-21 12:42:02', '2021-11-21 12:42:02', NULL, 24, 70);
INSERT INTO `menus` VALUES (33, 'Precios', 'precios', '2021-11-23 21:38:20', '2021-11-23 21:41:50', NULL, 24, 80);
INSERT INTO `menus` VALUES (34, 'Config. Home Tienda', 'configuracion_tienda', '2021-11-29 15:52:36', '2021-12-09 15:09:24', NULL, 19, 20);
INSERT INTO `menus` VALUES (35, 'Tallas', 'tallas', '2021-12-21 11:03:58', '2021-12-21 11:03:58', NULL, 24, 90);
INSERT INTO `menus` VALUES (36, 'Descripción', 'descripcion', '2022-01-03 11:43:55', '2022-01-03 11:43:55', NULL, 19, 30);
INSERT INTO `menus` VALUES (37, 'Despachos', 'despachos', '2022-01-03 11:48:59', '2022-01-03 11:48:59', NULL, 19, 30);

-- ----------------------------
-- Table structure for migrations
-- ----------------------------
DROP TABLE IF EXISTS `migrations`;
CREATE TABLE `migrations`  (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 59 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = DYNAMIC;

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
INSERT INTO `migrations` VALUES (21, '2021_10_23_213517_create_marcas_table', 13);
INSERT INTO `migrations` VALUES (22, '2021_10_25_175211_create_impuestos_table', 14);
INSERT INTO `migrations` VALUES (23, '2021_10_30_011930_create_categorias_table', 15);
INSERT INTO `migrations` VALUES (24, '2021_11_06_114229_create_sub_categoria_table', 16);
INSERT INTO `migrations` VALUES (25, '2021_11_17_160239_create_unidades_table', 17);
INSERT INTO `migrations` VALUES (26, '2021_11_17_162202_add_field_sigla_to_unidades', 17);
INSERT INTO `migrations` VALUES (27, '2021_11_18_151256_create_clientes_table', 18);
INSERT INTO `migrations` VALUES (28, '2021_11_18_223641_add_field_rut_to_clientes', 19);
INSERT INTO `migrations` VALUES (29, '2021_11_20_004247_create_productos_table', 20);
INSERT INTO `migrations` VALUES (30, '2021_11_20_012727_create_producto_impuesto_table', 21);
INSERT INTO `migrations` VALUES (31, '2021_11_20_121046_create_imagenes_producto_table', 22);
INSERT INTO `migrations` VALUES (32, '2021_11_20_121615_add_field_imagen_principal_to_imagenes_producto', 23);
INSERT INTO `migrations` VALUES (34, '2021_11_23_154752_create_precios_table', 24);
INSERT INTO `migrations` VALUES (35, '2021_11_25_103136_add_field_to_productos', 25);
INSERT INTO `migrations` VALUES (36, '2021_11_29_133355_create_tienda_table', 26);
INSERT INTO `migrations` VALUES (37, '2021_11_29_211607_create_imagenes_marquesina_home_table', 27);
INSERT INTO `migrations` VALUES (38, '2021_12_01_184647_create_secciones_home_table', 28);
INSERT INTO `migrations` VALUES (39, '2021_12_02_142514_create_productos_secciones_home_table', 29);
INSERT INTO `migrations` VALUES (40, '2021_12_06_154028_add_field_src_image_to_marcas', 30);
INSERT INTO `migrations` VALUES (41, '2021_12_09_171150_create_config_oferta_principal_table', 31);
INSERT INTO `migrations` VALUES (42, '2021_12_12_155006_add_field_precio_costo_to_productos', 32);
INSERT INTO `migrations` VALUES (43, '2021_12_20_184539_create_tallas_table', 33);
INSERT INTO `migrations` VALUES (44, '2021_12_20_200043_create_tipo_productos_table', 34);
INSERT INTO `migrations` VALUES (45, '2021_12_20_200559_add_field_tipo_producto_to_tallas', 35);
INSERT INTO `migrations` VALUES (46, '2021_12_21_180824_create_tallas_productos_table', 36);
INSERT INTO `migrations` VALUES (48, '2021_12_28_215059_create_ventas_table', 38);
INSERT INTO `migrations` VALUES (54, '2021_12_28_222845_create_ventas_cliente_tiendas_table', 39);
INSERT INTO `migrations` VALUES (55, '2021_12_28_230024_create_ventas_cliente_invitados_table', 39);
INSERT INTO `migrations` VALUES (56, '2022_01_01_160751_create_despachos_ventas_table', 39);
INSERT INTO `migrations` VALUES (57, '2021_12_27_180637_create_web_pays_table', 40);
INSERT INTO `migrations` VALUES (58, '2022_01_03_161241_create_detalle_ventas_table', 41);
INSERT INTO `migrations` VALUES (59, '2022_01_10_175804_create_visitas_table', 42);

-- ----------------------------
-- Table structure for pantallas
-- ----------------------------
DROP TABLE IF EXISTS `pantallas`;
CREATE TABLE `pantallas`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `menus_id` bigint UNSIGNED NOT NULL,
  `permite_crear` tinyint NOT NULL DEFAULT 1,
  `permite_modificar` tinyint NOT NULL DEFAULT 1,
  `permite_eliminar` tinyint NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `pantallas_nombre_unique`(`nombre`) USING BTREE,
  INDEX `pantallas_menus_id_foreign`(`menus_id`) USING BTREE,
  CONSTRAINT `pantallas_menus_id_foreign` FOREIGN KEY (`menus_id`) REFERENCES `menus` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 26 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of pantallas
-- ----------------------------
INSERT INTO `pantallas` VALUES (1, 'Menús', '2021-02-01 19:05:06', '2021-06-07 00:00:00', NULL, 5, 1, 1, 1);
INSERT INTO `pantallas` VALUES (2, 'Usuarios', '2021-02-03 23:46:32', '2021-02-03 23:53:01', NULL, 4, 1, 1, 1);
INSERT INTO `pantallas` VALUES (3, 'Roles', '2021-02-07 20:13:10', '2021-02-07 20:13:16', NULL, 3, 1, 1, 1);
INSERT INTO `pantallas` VALUES (4, 'Pantallas', '2021-02-10 11:39:11', '2021-02-10 11:39:11', NULL, 1, 1, 1, 1);
INSERT INTO `pantallas` VALUES (5, 'Permisos', '2021-02-10 11:42:10', '2021-02-10 11:42:10', NULL, 14, 0, 1, 0);
INSERT INTO `pantallas` VALUES (6, 'Secciones', '2021-04-28 19:48:21', '2021-12-09 15:08:01', NULL, 13, 1, 1, 1);
INSERT INTO `pantallas` VALUES (11, 'Personalizar', '2021-05-26 00:00:00', '2021-05-26 00:00:00', NULL, 22, 1, 0, 0);
INSERT INTO `pantallas` VALUES (14, 'Marcas', '2021-10-23 12:48:11', '2021-10-23 13:24:04', NULL, 25, 1, 1, 1);
INSERT INTO `pantallas` VALUES (15, 'Impuestos', '2021-10-26 11:43:00', '2021-10-26 11:43:00', NULL, 26, 1, 1, 1);
INSERT INTO `pantallas` VALUES (16, 'Categorías', '2021-10-30 11:33:26', '2021-10-30 11:33:26', NULL, 27, 1, 1, 1);
INSERT INTO `pantallas` VALUES (17, 'Subcategorías', '2021-11-06 22:45:24', '2021-11-06 23:03:32', NULL, 28, 1, 1, 1);
INSERT INTO `pantallas` VALUES (18, 'AAAAAAAA cc', '2021-11-07 22:45:47', '2021-11-07 22:46:35', '2021-11-07 22:46:35', 27, 1, 1, 1);
INSERT INTO `pantallas` VALUES (19, 'Unidades', '2021-11-17 19:31:39', '2021-11-17 19:31:39', NULL, 30, 1, 1, 1);
INSERT INTO `pantallas` VALUES (20, 'Clientes', '2021-11-18 23:09:15', '2021-11-18 23:09:15', NULL, 31, 1, 1, 1);
INSERT INTO `pantallas` VALUES (21, 'Productos', '2021-11-21 12:42:32', '2021-11-21 12:42:32', NULL, 32, 1, 1, 1);
INSERT INTO `pantallas` VALUES (22, 'Precios', '2021-11-23 21:39:09', '2021-11-23 21:39:09', NULL, 33, 1, 1, 1);
INSERT INTO `pantallas` VALUES (23, 'Configuración Home Tienda', '2021-11-29 15:53:19', '2021-12-09 15:09:08', NULL, 34, 1, 1, 1);
INSERT INTO `pantallas` VALUES (24, 'Tallas', '2021-12-21 11:04:20', '2021-12-21 11:04:20', NULL, 35, 1, 1, 1);
INSERT INTO `pantallas` VALUES (25, 'Despachos', '2022-01-03 11:50:22', '2022-01-03 11:50:22', NULL, 37, 1, 1, 1);

-- ----------------------------
-- Table structure for password_resets
-- ----------------------------
DROP TABLE IF EXISTS `password_resets`;
CREATE TABLE `password_resets`  (
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  INDEX `password_resets_email_index`(`email`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of password_resets
-- ----------------------------

-- ----------------------------
-- Table structure for permisos
-- ----------------------------
DROP TABLE IF EXISTS `permisos`;
CREATE TABLE `permisos`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `roles_id` bigint UNSIGNED NOT NULL,
  `pantallas_id` bigint UNSIGNED NOT NULL,
  `acceder` tinyint(1) NOT NULL DEFAULT 0,
  `crear` tinyint(1) NOT NULL DEFAULT 0,
  `modificar` tinyint(1) NOT NULL DEFAULT 0,
  `eliminar` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `permisos_roles_id_foreign`(`roles_id`) USING BTREE,
  INDEX `permisos_pantallas_id_foreign`(`pantallas_id`) USING BTREE,
  CONSTRAINT `permisos_pantallas_id_foreign` FOREIGN KEY (`pantallas_id`) REFERENCES `pantallas` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `permisos_roles_id_foreign` FOREIGN KEY (`roles_id`) REFERENCES `roles` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 56 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of permisos
-- ----------------------------
INSERT INTO `permisos` VALUES (1, 1, 1, 1, 1, 1, 1, '2021-02-06 22:33:59', '2022-01-03 11:50:44', NULL);
INSERT INTO `permisos` VALUES (2, 1, 2, 1, 1, 1, 1, '2021-02-06 22:33:59', '2022-01-03 11:50:45', NULL);
INSERT INTO `permisos` VALUES (3, 1, 3, 1, 1, 1, 1, '2021-02-08 13:32:30', '2022-01-03 11:50:45', NULL);
INSERT INTO `permisos` VALUES (5, 1, 4, 1, 1, 1, 1, '2021-02-10 11:39:33', '2022-01-03 11:50:45', NULL);
INSERT INTO `permisos` VALUES (6, 1, 5, 1, 1, 1, 1, '2021-02-10 11:42:38', '2022-01-03 11:50:45', NULL);
INSERT INTO `permisos` VALUES (7, 1, 6, 1, 1, 1, 1, '2021-04-28 20:03:52', '2022-01-03 11:50:45', NULL);
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
INSERT INTO `permisos` VALUES (44, 1, 11, 1, 1, 0, 0, '2021-05-26 00:00:00', '2022-01-03 11:50:45', NULL);
INSERT INTO `permisos` VALUES (45, 1, 14, 1, 1, 1, 1, '2021-10-23 12:52:11', '2022-01-03 11:50:45', NULL);
INSERT INTO `permisos` VALUES (46, 1, 15, 1, 1, 1, 1, '2021-10-26 16:11:10', '2022-01-03 11:50:45', NULL);
INSERT INTO `permisos` VALUES (47, 1, 16, 1, 1, 1, 1, '2021-10-30 11:33:54', '2022-01-03 11:50:45', NULL);
INSERT INTO `permisos` VALUES (48, 1, 17, 1, 1, 1, 1, '2021-11-06 22:46:20', '2022-01-03 11:50:45', NULL);
INSERT INTO `permisos` VALUES (49, 1, 19, 1, 1, 1, 1, '2021-11-17 19:32:00', '2022-01-03 11:50:45', NULL);
INSERT INTO `permisos` VALUES (50, 1, 20, 1, 1, 1, 1, '2021-11-18 23:09:46', '2022-01-03 11:50:45', NULL);
INSERT INTO `permisos` VALUES (51, 1, 21, 1, 1, 1, 1, '2021-11-21 12:42:47', '2022-01-03 11:50:45', NULL);
INSERT INTO `permisos` VALUES (52, 1, 22, 1, 1, 0, 1, '2021-11-23 21:39:26', '2022-01-03 11:50:45', NULL);
INSERT INTO `permisos` VALUES (53, 1, 23, 1, 0, 1, 0, '2021-11-29 15:53:35', '2022-01-03 11:50:45', NULL);
INSERT INTO `permisos` VALUES (54, 1, 24, 1, 1, 1, 1, '2021-12-21 11:04:43', '2022-01-03 11:50:45', NULL);
INSERT INTO `permisos` VALUES (55, 1, 25, 1, 0, 1, 1, '2022-01-03 11:50:45', '2022-01-03 11:50:45', NULL);

-- ----------------------------
-- Table structure for precios
-- ----------------------------
DROP TABLE IF EXISTS `precios`;
CREATE TABLE `precios`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `producto_id` bigint NOT NULL,
  `precio` int UNSIGNED NOT NULL,
  `descuento` double(3, 1) UNSIGNED NOT NULL,
  `fecha_desde` date NOT NULL,
  `fecha_hasta` date NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of precios
-- ----------------------------
INSERT INTO `precios` VALUES (1, 6, 95700, 13.0, '2021-11-23', '2021-11-30', '2021-11-23 18:43:11', '2021-11-25 15:56:06', NULL);
INSERT INTO `precios` VALUES (2, 7, 30000, 10.0, '2021-11-23', '2021-11-26', '2021-11-23 18:44:11', '2021-11-25 15:56:07', '2021-11-25 15:56:07');
INSERT INTO `precios` VALUES (3, 7, 28380, 14.0, '2021-11-23', '2021-11-26', '2021-11-25 15:56:06', '2021-11-25 15:56:06', NULL);
INSERT INTO `precios` VALUES (4, 7, 28050, 15.0, '2021-11-23', '2021-11-26', '2021-11-25 15:56:07', '2021-11-25 15:56:07', NULL);

-- ----------------------------
-- Table structure for producto_impuesto
-- ----------------------------
DROP TABLE IF EXISTS `producto_impuesto`;
CREATE TABLE `producto_impuesto`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `producto_id` bigint NOT NULL,
  `impuesto_id` bigint NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 21 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of producto_impuesto
-- ----------------------------
INSERT INTO `producto_impuesto` VALUES (1, 6, 1, '2021-11-20 17:33:18', '2021-12-10 19:32:21', NULL);
INSERT INTO `producto_impuesto` VALUES (2, 7, 1, '2021-11-23 10:47:08', '2021-12-12 12:38:39', NULL);
INSERT INTO `producto_impuesto` VALUES (3, 8, 1, '2021-12-10 18:21:44', '2021-12-10 18:21:44', NULL);
INSERT INTO `producto_impuesto` VALUES (4, 9, 1, '2021-12-10 18:26:27', '2021-12-10 18:26:27', NULL);
INSERT INTO `producto_impuesto` VALUES (5, 10, 1, '2021-12-10 18:29:34', '2021-12-10 18:29:34', NULL);
INSERT INTO `producto_impuesto` VALUES (6, 11, 1, '2021-12-10 18:32:51', '2021-12-10 18:32:51', NULL);
INSERT INTO `producto_impuesto` VALUES (7, 12, 1, '2021-12-10 18:35:01', '2021-12-10 18:35:01', NULL);
INSERT INTO `producto_impuesto` VALUES (8, 13, 1, '2021-12-10 18:36:53', '2021-12-10 18:36:53', NULL);
INSERT INTO `producto_impuesto` VALUES (9, 14, 1, '2021-12-10 19:19:15', '2021-12-21 23:05:53', NULL);
INSERT INTO `producto_impuesto` VALUES (10, 15, 1, '2021-12-10 19:22:01', '2021-12-10 19:22:01', NULL);
INSERT INTO `producto_impuesto` VALUES (11, 16, 1, '2021-12-10 19:25:39', '2021-12-10 19:32:00', NULL);
INSERT INTO `producto_impuesto` VALUES (12, 17, 1, '2021-12-11 15:25:36', '2021-12-11 15:25:36', NULL);
INSERT INTO `producto_impuesto` VALUES (13, 18, 1, '2021-12-11 15:46:59', '2021-12-11 15:46:59', NULL);
INSERT INTO `producto_impuesto` VALUES (14, 19, 1, '2021-12-11 15:58:15', '2021-12-11 15:58:15', NULL);
INSERT INTO `producto_impuesto` VALUES (15, 20, 1, '2021-12-11 16:31:48', '2021-12-11 16:31:48', NULL);
INSERT INTO `producto_impuesto` VALUES (16, 21, 1, '2021-12-12 12:05:34', '2021-12-12 12:05:34', NULL);
INSERT INTO `producto_impuesto` VALUES (17, 22, 1, '2021-12-12 12:17:16', '2021-12-12 12:17:16', NULL);
INSERT INTO `producto_impuesto` VALUES (18, 23, 1, '2021-12-12 12:27:00', '2021-12-12 12:27:00', NULL);
INSERT INTO `producto_impuesto` VALUES (19, 24, 1, '2021-12-12 12:31:34', '2021-12-12 16:01:15', NULL);
INSERT INTO `producto_impuesto` VALUES (20, 25, 1, '2021-12-12 12:35:35', '2021-12-12 12:35:35', NULL);

-- ----------------------------
-- Table structure for productos
-- ----------------------------
DROP TABLE IF EXISTS `productos`;
CREATE TABLE `productos`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `descripcion` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `precio_venta_normal` bigint UNSIGNED NOT NULL,
  `stock` int UNSIGNED NOT NULL,
  `unidad_id` bigint NOT NULL,
  `marca_id` bigint NOT NULL,
  `categoria_id` bigint NOT NULL,
  `sub_categoria_id` bigint NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `descuento_maximo` double(3, 1) UNSIGNED NOT NULL,
  `precio_costo` int NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 26 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of productos
-- ----------------------------
INSERT INTO `productos` VALUES (6, 'Celular X-CAM', 'Celular LG X-CAM, 2 cámaras, liberado', 110000, 50, 3, 2, 9, 6, '2021-11-20 16:04:37', '2022-01-09 16:13:32', NULL, 15.0, 0);
INSERT INTO `productos` VALUES (7, 'Disco duro', 'qwertyui ghjkjhgfdfghjkl', 33000, 19, 3, 3, 4, 2, '2021-11-23 10:47:07', '2022-01-06 13:25:11', NULL, 20.0, 0);
INSERT INTO `productos` VALUES (8, 'Mini Vestido Knot Font', 'Mauris viverra cursus ante laoreet eleifend. Donec vel fringilla ante. Aenean finibus velit id urna vehicula, nec maximus est sollicitudin.', 30000, 19, 3, 7, 6, 5, '2021-12-10 18:21:44', '2022-01-30 01:51:24', NULL, 10.0, 0);
INSERT INTO `productos` VALUES (9, 'vestido cruzado desplazado de popelina', 'vestido cruzado desplazado de popelina. Mauris viverra cursus ante laoreet eleifend. Donec vel fringilla ante. Aenean finibus velit id urna vehicula, nec maximus est sollicitudin.', 25900, 10, 3, 8, 6, 5, '2021-12-10 18:26:27', '2021-12-10 18:26:27', NULL, 15.0, 0);
INSERT INTO `productos` VALUES (10, 'Petite Crepe Wrap mini dress', 'Minivestido cruzado de crepé Petite. Mauris viverra cursus ante laoreet eleifend. Donec vel fringilla ante. Aenean finibus velit id urna vehicula, nec maximus est sollicitudin.', 32600, 28, 3, 7, 6, 5, '2021-12-10 18:29:34', '2022-01-09 15:26:26', NULL, 15.0, 0);
INSERT INTO `productos` VALUES (11, 'Vestido estilo jersey con cinturón pequeño', 'Petite belted jumper dress. Mauris viverra cursus ante laoreet eleifend. Donec vel fringilla ante. Aenean finibus velit id urna vehicula, nec maximus est sollicitudin.', 39990, 8, 3, 10, 6, 5, '2021-12-10 18:32:51', '2022-01-06 13:22:14', NULL, 17.0, 0);
INSERT INTO `productos` VALUES (12, 'Petite belted jumper dress', 'Vestido estilo jersey con cinturón pequeño. Mauris viverra cursus ante laoreet eleifend. Donec vel fringilla ante. Aenean finibus velit id urna vehicula, nec maximus est sollicitudin.', 25990, 15, 3, 9, 6, 5, '2021-12-10 18:35:01', '2021-12-10 18:35:01', NULL, 12.0, 0);
INSERT INTO `productos` VALUES (13, 'Two Shoulder Glitter Midi Dress', 'Vestido midi con purpurina de dos hombros. Mauris viverra cursus ante laoreet eleifend. Donec vel fringilla ante. Aenean finibus velit id urna vehicula, nec maximus est sollicitudin.', 13500, 20, 3, 11, 6, 5, '2021-12-10 18:36:53', '2021-12-10 18:36:53', NULL, 5.0, 0);
INSERT INTO `productos` VALUES (14, 'Coffee dress midi skirt', 'Vestido café falda media. Mauris viverra cursus ante laoreet eleifend. Donec vel fringilla ante. Aenean finibus velit id urna vehicula, nec maximus est sollicitudin.', 35700, 25, 3, 8, 6, 5, '2021-12-10 19:19:15', '2021-12-10 19:19:15', NULL, 15.0, 0);
INSERT INTO `productos` VALUES (15, 'Petite crepe wrap mini black dress', 'Vestido negro pequeño cruzado de crepé. Mauris viverra cursus ante laoreet eleifend. Donec vel fringilla ante. Aenean finibus velit id urna vehicula, nec maximus est sollicitudin.', 27600, 15, 3, 7, 6, 5, '2021-12-10 19:22:01', '2021-12-10 19:22:01', NULL, 20.0, 0);
INSERT INTO `productos` VALUES (16, 'Celular LG K-41S', 'Celular LG K-41S, Liberado con chip movistar + plan de 350GB  por 14990 mensual', 112, 10, 3, 3, 9, 6, '2021-12-10 19:25:39', '2021-12-10 19:32:00', NULL, 10.0, 0);
INSERT INTO `productos` VALUES (17, 'Zapatilla Under Armour', 'Zapatilla Under Armour hombre, talla 42', 33700, 16, 3, 12, 8, 7, '2021-12-11 15:25:36', '2022-01-09 16:15:29', NULL, 10.0, 0);
INSERT INTO `productos` VALUES (18, 'ZAPATILLA SKECHERS MICROSPEC MAX', 'Skechers es una marca global que se especializa en diseñar y desarrollar productos de Lifestyle y Performance conocidos por su estilo, innovación, calidad y comodidad. Junto con su variada oferta de calzado, Skechers posee colecciones para hombres, mujeres y niños, incluyendo una creciente gama de productos creados para brindar comodidad y estilo a toda la familia.', 33380, 22, 3, 13, 8, 7, '2021-12-11 15:46:59', '2022-01-09 16:11:58', NULL, 15.0, 0);
INSERT INTO `productos` VALUES (19, 'Zapatilla Running Adidas Unisex Tensaur Run K Negro', 'Zapatilla running unisex marca Adidas modelo Tensaur Run K de color negro con forro textil. Calzado con cordón y fit bajo el tobillo', 35688, 13, 3, 4, 8, 7, '2021-12-11 15:58:15', '2022-01-06 13:16:33', NULL, 10.0, 0);
INSERT INTO `productos` VALUES (20, 'Maleta Pesas 20 Kg', 'Maleta Pesas 20 Kg, 4 discos de 2,5 Kilos, 4 pesos, de 1,5 Kilos, 2 barras de 2 Kilos c/u, 1 maleta plástica para transporte', 50000, 15, 3, 14, 10, 8, '2021-12-11 16:31:48', '2022-01-09 16:15:29', NULL, 20.0, 0);
INSERT INTO `productos` VALUES (21, 'Six Pack Maquina Abdominales 5 min shape', 'Maquina Para Abdominales SIX PACKCon esta Maquina podrás realizar ejercicios abdominales.Trabaja los músculos del abdomen sector alto, medio, bajo y oblicuos, También hombros, pecho, espalda y piernas.Posee 6 posiciones para ajuste de dificultad + 1 posición para guardar el producto para que no utilice espacio al terminar de utilizarlo quedando totalmente vertical.Incluye Pantalla donde se puede ver: Tiempo ? Calorías quemadas ? Contador de Repeticiones ? Tiempo.Pantalla necesita 1 pila AA, ( INCLUIDA )Ancho máximo 54 cmAltura producto: Dependerá del nivel de dificultad seleccionado.Altura máxima: (posición guardado): 125 cm', 58298, 15, 3, 14, 10, 8, '2021-12-12 12:05:34', '2021-12-12 12:05:34', NULL, 15.0, 0);
INSERT INTO `productos` VALUES (22, 'Notebook Lenovo', 'Intel(R) Core(TM) i7-7500U CPU @ 2.70GHz   2.90 GHz, 12 GB Ram, Window 11 de 64 bits, procesador basado en x64', 650000, 30, 3, 15, 1, 1, '2021-12-12 12:17:16', '2021-12-12 12:17:16', NULL, 10.0, 0);
INSERT INTO `productos` VALUES (23, 'Balon De Basketball 6 Muuk', 'La pelota de Basketball MUUK de tamaño Juvenil para entrenamiento, ideal para uso en exteriores. Elaborado con materiales altamente durables y resistentes, contiene cámara de butilo que retiene más el aire y viene encordado en nylon, lo que le hace conservar su esfericidad y un bote uniforme.', 11900, 49, 3, 16, 10, 8, '2021-12-12 12:27:00', '2022-01-29 20:10:20', NULL, 15.0, 0);
INSERT INTO `productos` VALUES (24, 'BALANZA DIGITAL NAPPO 180KG', 'Nueva balanza Nappo con diseño ergonómico, de excelente calidad, que gracias a su graduación de 100 gramos aseguran la mayor exactitud del peso. Con capacidad de hasta 180KG. Ideal para colocar en el baño de tu casa, y pesarte despues de hacer ejercicio o en cualquier momento.', 11500, 44, 3, 17, 1, 9, '2021-12-12 12:31:34', '2022-01-30 15:05:05', NULL, 10.0, 10000);
INSERT INTO `productos` VALUES (25, 'Drone Phantom 3', 'Phantom 3 standar fácil de pilotar, vuelo estacionario de modo gps, registros automáticos de vuelo videocámara 2.7 k fotos de 12 megapixeles', 529900, 100, 3, 18, 9, 6, '2021-12-12 12:35:35', '2021-12-12 12:35:35', NULL, 15.0, 0);

-- ----------------------------
-- Table structure for productos_secciones_home
-- ----------------------------
DROP TABLE IF EXISTS `productos_secciones_home`;
CREATE TABLE `productos_secciones_home`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `seccion_id` bigint NOT NULL,
  `producto_id` bigint NOT NULL,
  `texto1` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `texto2` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 37 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of productos_secciones_home
-- ----------------------------
INSERT INTO `productos_secciones_home` VALUES (1, 12, 1, 'AAAAAAAAAAAAAAAAAAAAAAA', 'BBBBBBBBBBBBBBBBBBBBBBB', '2021-12-02 17:51:03', '2021-12-11 12:13:38', '2021-12-11 12:13:38');
INSERT INTO `productos_secciones_home` VALUES (2, 13, 6, 'producto 6', 'xxfffxfxfxfxfxfxfxxfxfx', '2021-12-02 17:58:19', '2021-12-02 17:58:19', NULL);
INSERT INTO `productos_secciones_home` VALUES (3, 13, 7, 'producto 7', NULL, '2021-12-02 17:58:19', '2021-12-02 17:58:19', NULL);
INSERT INTO `productos_secciones_home` VALUES (4, 12, 6, NULL, NULL, '2021-12-02 18:43:17', '2021-12-11 15:47:24', '2021-12-11 15:47:24');
INSERT INTO `productos_secciones_home` VALUES (8, 15, 6, 'Texto 1 para el celular', 'Texto 2 para el Celular', '2021-12-03 21:16:07', '2021-12-03 21:16:07', NULL);
INSERT INTO `productos_secciones_home` VALUES (9, 15, 7, 'Texto 1 para el hdd', 'Teto 2 para el hdd', '2021-12-03 21:16:07', '2021-12-12 12:19:42', '2021-12-12 12:19:42');
INSERT INTO `productos_secciones_home` VALUES (10, 16, 6, 'Texto 1 para el celular', 'Texto 2 para el Celular', '2021-12-03 21:18:07', '2021-12-03 21:18:07', NULL);
INSERT INTO `productos_secciones_home` VALUES (11, 16, 7, 'Texto 1 para el hdd', 'Teto 2 para el hdd', '2021-12-03 21:18:07', '2021-12-03 21:18:07', NULL);
INSERT INTO `productos_secciones_home` VALUES (12, 17, 6, 'Texto 1 celular LG - Oferta', 'Texto 2 celular LG - Oferta', '2021-12-03 21:25:16', '2021-12-03 21:51:59', NULL);
INSERT INTO `productos_secciones_home` VALUES (13, 17, 7, 'Texto 1 Disco duro- Oferta', 'Texto 2 Disco duro- Oferta', '2021-12-03 21:25:16', '2021-12-12 12:18:44', '2021-12-12 12:18:44');
INSERT INTO `productos_secciones_home` VALUES (14, 16, 16, 'Celular LG - K41S, 4 Cámaras, Liberado', 'Oferta CiverDay, Despacho Gratis', '2021-12-10 19:37:13', '2021-12-10 19:38:39', NULL);
INSERT INTO `productos_secciones_home` VALUES (15, 18, 14, 'Falda midi vestido café', 'Últimas unidades, Despacho gratis', '2021-12-10 19:47:48', '2021-12-10 19:47:48', NULL);
INSERT INTO `productos_secciones_home` VALUES (16, 18, 8, 'Marca Mango, Temporada 2022', 'Oferta CiverDay, Despacho gratis', '2021-12-10 19:47:48', '2021-12-10 19:47:48', NULL);
INSERT INTO `productos_secciones_home` VALUES (17, 18, 12, 'Vestido estilo jersey con cinturón pequeño', 'Avance de temporada', '2021-12-10 19:47:48', '2021-12-10 19:47:48', NULL);
INSERT INTO `productos_secciones_home` VALUES (18, 18, 15, 'Vestido negro pequeño cruzado de crepé', 'Colección 2020', '2021-12-10 19:47:48', '2021-12-10 19:47:48', NULL);
INSERT INTO `productos_secciones_home` VALUES (19, 18, 10, 'Minivestido cruzado de crepé Petite', 'Colección 2020, últimas unidades', '2021-12-10 19:47:48', '2021-12-10 19:47:48', NULL);
INSERT INTO `productos_secciones_home` VALUES (20, 18, 13, 'Vestido midi con purpurina de dos hombros', 'Avance de temporada 2022', '2021-12-10 19:47:48', '2021-12-10 19:47:48', NULL);
INSERT INTO `productos_secciones_home` VALUES (21, 18, 9, 'Pocas unidades', NULL, '2021-12-10 19:47:48', '2021-12-10 19:47:48', NULL);
INSERT INTO `productos_secciones_home` VALUES (22, 18, 11, 'Ideal para fiestas de fin de año', 'Despacho gratis', '2021-12-10 19:47:48', '2021-12-10 19:47:48', NULL);
INSERT INTO `productos_secciones_home` VALUES (23, 12, 17, NULL, NULL, '2021-12-11 15:30:38', '2021-12-11 15:30:38', NULL);
INSERT INTO `productos_secciones_home` VALUES (24, 12, 18, NULL, NULL, '2021-12-11 15:47:24', '2021-12-11 15:47:24', NULL);
INSERT INTO `productos_secciones_home` VALUES (25, 12, 19, NULL, NULL, '2021-12-11 15:58:48', '2021-12-11 15:58:48', NULL);
INSERT INTO `productos_secciones_home` VALUES (26, 12, 20, NULL, NULL, '2021-12-11 16:32:21', '2021-12-11 16:32:21', NULL);
INSERT INTO `productos_secciones_home` VALUES (27, 17, 21, NULL, NULL, '2021-12-12 12:06:33', '2021-12-12 12:06:33', NULL);
INSERT INTO `productos_secciones_home` VALUES (28, 13, 22, NULL, NULL, '2021-12-12 12:17:39', '2021-12-12 12:17:39', NULL);
INSERT INTO `productos_secciones_home` VALUES (29, 17, 14, NULL, NULL, '2021-12-12 12:18:44', '2021-12-12 12:18:44', NULL);
INSERT INTO `productos_secciones_home` VALUES (30, 17, 10, NULL, NULL, '2021-12-12 12:18:44', '2021-12-12 12:18:44', NULL);
INSERT INTO `productos_secciones_home` VALUES (31, 15, 8, NULL, NULL, '2021-12-12 12:19:42', '2021-12-12 12:19:42', NULL);
INSERT INTO `productos_secciones_home` VALUES (32, 15, 20, NULL, NULL, '2021-12-12 12:19:42', '2021-12-12 12:19:42', NULL);
INSERT INTO `productos_secciones_home` VALUES (33, 17, 23, NULL, NULL, '2021-12-12 12:27:19', '2021-12-12 12:27:19', NULL);
INSERT INTO `productos_secciones_home` VALUES (34, 15, 24, NULL, NULL, '2021-12-12 12:32:25', '2021-12-12 12:32:25', NULL);
INSERT INTO `productos_secciones_home` VALUES (35, 13, 25, NULL, NULL, '2021-12-12 12:36:01', '2021-12-12 12:36:01', NULL);
INSERT INTO `productos_secciones_home` VALUES (36, 16, 25, NULL, NULL, '2021-12-12 12:36:35', '2021-12-12 12:36:35', NULL);

-- ----------------------------
-- Table structure for role_user
-- ----------------------------
DROP TABLE IF EXISTS `role_user`;
CREATE TABLE `role_user`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `role_id` int UNSIGNED NOT NULL,
  `user_id` int UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 35 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = DYNAMIC;

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
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `roles_name_unique`(`name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 33 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = DYNAMIC;

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
INSERT INTO `roles` VALUES (28, 'aaaaaaaaaaaaaa', 'eeeeeeeeeeeeeeeee', '2021-11-07 23:04:51', '2021-11-07 23:09:44', '2021-11-07 23:09:44');
INSERT INTO `roles` VALUES (29, 'wawawaw', 'xxxxxxxxxxxxx', '2021-11-07 23:10:09', '2021-11-07 23:11:30', '2021-11-07 23:11:30');
INSERT INTO `roles` VALUES (30, 'ssssssssssss', 'dxdxdxdxdd', '2021-11-07 23:11:43', '2021-11-07 23:12:19', '2021-11-07 23:12:19');
INSERT INTO `roles` VALUES (31, 'qwertyui', 'asdfghjffff', '2021-11-07 23:24:50', '2021-11-07 23:24:55', '2021-11-07 23:24:55');
INSERT INTO `roles` VALUES (32, 'qwertfgvbnm', 'asdfghjkl nm,', '2021-11-07 23:25:53', '2021-11-07 23:25:59', '2021-11-07 23:25:59');

-- ----------------------------
-- Table structure for secciones_home
-- ----------------------------
DROP TABLE IF EXISTS `secciones_home`;
CREATE TABLE `secciones_home`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `secciones_home_nombre_unique`(`nombre`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 19 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of secciones_home
-- ----------------------------
INSERT INTO `secciones_home` VALUES (12, 'Deportes', '2021-12-02 17:51:03', '2021-12-07 21:49:55', NULL);
INSERT INTO `secciones_home` VALUES (13, 'Electrónica', '2021-12-02 17:58:19', '2021-12-02 17:58:19', NULL);
INSERT INTO `secciones_home` VALUES (15, 'Ofertas del mes', '2021-12-03 21:16:07', '2021-12-07 21:49:34', NULL);
INSERT INTO `secciones_home` VALUES (16, 'Tecnología', '2021-12-03 21:18:07', '2021-12-03 21:18:07', NULL);
INSERT INTO `secciones_home` VALUES (17, 'Navidad', '2021-12-03 21:25:16', '2021-12-07 21:01:20', NULL);
INSERT INTO `secciones_home` VALUES (18, 'Ropa de Mujer', '2021-12-10 19:47:47', '2021-12-10 19:47:47', NULL);

-- ----------------------------
-- Table structure for sub_categorias
-- ----------------------------
DROP TABLE IF EXISTS `sub_categorias`;
CREATE TABLE `sub_categorias`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `categoria_id` int UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `sub_categoria_nombre_unique`(`nombre`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of sub_categorias
-- ----------------------------
INSERT INTO `sub_categorias` VALUES (1, 'Notebooks', 1, '2021-11-06 13:16:21', '2021-11-06 13:16:21', NULL);
INSERT INTO `sub_categorias` VALUES (2, 'Almacenamiento', 4, '2021-11-07 00:23:25', '2021-11-07 00:23:25', NULL);
INSERT INTO `sub_categorias` VALUES (3, 'aaaaaaaaaaaa', 1, '2021-11-07 00:24:10', '2021-11-07 00:33:32', '2021-11-07 00:33:32');
INSERT INTO `sub_categorias` VALUES (4, 'AAAAAAAAA', 1, '2021-11-07 23:16:15', '2021-11-07 23:16:54', '2021-11-07 23:16:54');
INSERT INTO `sub_categorias` VALUES (5, 'Vestidos', 6, '2021-12-10 18:18:45', '2021-12-10 18:18:45', NULL);
INSERT INTO `sub_categorias` VALUES (6, 'Telefonía Celular', 9, '2021-12-10 19:27:56', '2021-12-10 19:27:56', NULL);
INSERT INTO `sub_categorias` VALUES (7, 'Zapatillas', 8, '2021-12-11 15:24:15', '2021-12-11 15:24:15', NULL);
INSERT INTO `sub_categorias` VALUES (8, 'Fitness', 10, '2021-12-11 16:30:09', '2021-12-11 16:30:09', NULL);
INSERT INTO `sub_categorias` VALUES (9, 'Salud', 1, '2021-12-12 12:30:46', '2021-12-12 12:30:46', NULL);

-- ----------------------------
-- Table structure for tallas
-- ----------------------------
DROP TABLE IF EXISTS `tallas`;
CREATE TABLE `tallas`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `talla` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `sub_categoria_id` bigint NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of tallas
-- ----------------------------
INSERT INTO `tallas` VALUES (1, 'XS', 5, '2021-12-20 21:04:49', '2021-12-20 21:15:44', NULL);
INSERT INTO `tallas` VALUES (2, 'S', 5, '2021-12-20 21:16:17', '2021-12-21 11:14:46', NULL);

-- ----------------------------
-- Table structure for tallas_productos
-- ----------------------------
DROP TABLE IF EXISTS `tallas_productos`;
CREATE TABLE `tallas_productos`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `talla_id` bigint NOT NULL,
  `sub_categoria_id` bigint NOT NULL,
  `producto_id` bigint NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of tallas_productos
-- ----------------------------
INSERT INTO `tallas_productos` VALUES (1, 1, 5, 14, '2021-12-21 19:08:09', '2021-12-21 23:05:53', NULL);
INSERT INTO `tallas_productos` VALUES (2, 2, 5, 14, '2021-12-21 19:08:09', '2021-12-21 23:05:53', NULL);
INSERT INTO `tallas_productos` VALUES (7, 2, 5, 14, '2021-12-21 19:17:56', '2021-12-21 19:19:27', '2021-12-21 19:19:27');

-- ----------------------------
-- Table structure for tienda
-- ----------------------------
DROP TABLE IF EXISTS `tienda`;
CREATE TABLE `tienda`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `nombre_tienda` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `fono_venta` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `direccion` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `tienda_nombre_tienda_unique`(`nombre_tienda`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of tienda
-- ----------------------------
INSERT INTO `tienda` VALUES (1, 'Mi tienda Angular', '09-87654321', 'tienda@ejemplo.cl', '1 Norte 3 y 4 Oriente #123, Talca', '2021-11-29 11:00:38', '2021-11-30 10:53:29');

-- ----------------------------
-- Table structure for unidades
-- ----------------------------
DROP TABLE IF EXISTS `unidades`;
CREATE TABLE `unidades`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `nombre_plural` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `unidades_nombre_unique`(`nombre`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of unidades
-- ----------------------------
INSERT INTO `unidades` VALUES (1, 'Litros', '2021-11-17 16:52:56', '2021-11-17 16:54:48', NULL, '');
INSERT INTO `unidades` VALUES (2, 'metros', '2021-11-17 16:55:31', '2021-11-17 16:55:31', NULL, '');
INSERT INTO `unidades` VALUES (3, 'Unidad', '2021-11-17 16:56:02', '2021-11-17 16:56:02', NULL, '');
INSERT INTO `unidades` VALUES (4, 'Unidasdfghjkad', '2021-11-17 16:56:58', '2021-11-17 19:38:22', '2021-11-17 19:38:22', '');
INSERT INTO `unidades` VALUES (5, 'AAAAAAAAAAAA', '2021-11-17 20:56:24', '2021-11-17 21:02:16', '2021-11-17 21:02:16', 'cccccccccccc');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `a_paterno` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `a_materno` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `direccion` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `foto` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `fono` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `users_email_unique`(`email`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 72 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, 'Marcelo', 'mabc@live.cl', NULL, '$2b$10$q1ZwYwzfy2QlUzY2fTuLCuZvOJRyQrHmIVMVNMIOIlHAXdj6zliYG', NULL, '2020-11-22 00:00:00', '2021-11-08 16:24:32', NULL, 'Bravo', 'Castillo', '12 Norte 16 Oriente, #2288, Talca', 'Mi Avatar.jpg', '987654321');
INSERT INTO `users` VALUES (19, 'Valeria z', 'prueba@ejemplo.cl', NULL, '$2b$10$BCo6PZMKbxA/3ROLBo7D1uynIWQ/7GO6LQdk0qez0k9VZhmilWur.', NULL, '2021-01-22 21:47:01', '2021-11-08 16:15:12', NULL, 'Maza', 'sozza', '12 Norte 123', 'descarga.png', '');
INSERT INTO `users` VALUES (30, 'Marcelo Antonio', 'marcelo.a.bravo.c@gmail.cl', NULL, '$2b$10$66WGQByMZWmVkOtRin00eOGUlw2BKuWu5/nS2Gm.fDEGH0/otpWLi', NULL, '2021-05-05 01:13:57', '2021-06-08 00:00:00', NULL, 'Bravo', 'Castillo', '12 Norte #123', 'yo.jpg', '');
INSERT INTO `users` VALUES (62, 'Mariela Andrea', 'mariela2@ejemplo.cl', NULL, '$2b$10$b.qrq9mTNfYSgdPqC.veQuWXNDHe0OeCrlVHVisek7VtrtlhD5Mf6', NULL, '2021-05-05 01:13:57', '2021-04-08 00:00:00', NULL, 'Bezoain', 'Bravo', '12 Norte #123', 'fgfgfgfgfgf', '');
INSERT INTO `users` VALUES (71, 'wawawaawa', 'prueba2@ejemplo.cl', NULL, '$2b$10$4vk0/hohwXVdCxkC039iju7eJT9poh.5jR86Ed9mzHqGkXNdAGl42', NULL, '2021-06-07 00:00:00', '2021-06-07 00:00:00', '2021-06-07 00:00:00', 'esesesesesese vvgvgvv', 'drdrdrdrdrd', 'tftftftftftftftft', NULL, '6676767676767');

-- ----------------------------
-- Table structure for ventas
-- ----------------------------
DROP TABLE IF EXISTS `ventas`;
CREATE TABLE `ventas`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `fecha_venta_tienda` timestamp NOT NULL,
  `total` bigint UNSIGNED NOT NULL,
  `fecha_anulacion` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 49 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of ventas
-- ----------------------------
INSERT INTO `ventas` VALUES (18, '2022-01-02 00:57:06', 54399, NULL, '2022-01-02 03:19:47', '2022-01-02 03:19:47', NULL);
INSERT INTO `ventas` VALUES (19, '2022-01-02 00:57:06', 54399, NULL, '2022-01-02 03:21:46', '2022-01-02 03:21:46', NULL);
INSERT INTO `ventas` VALUES (20, '2022-01-02 00:00:00', 54264, NULL, '2022-01-02 14:15:03', '2022-01-02 14:15:03', NULL);
INSERT INTO `ventas` VALUES (21, '2022-01-02 00:00:00', 54264, NULL, '2022-01-02 14:19:45', '2022-01-02 14:19:45', NULL);
INSERT INTO `ventas` VALUES (22, '2022-01-02 00:00:00', 54264, NULL, '2022-01-02 14:21:04', '2022-01-02 14:21:04', NULL);
INSERT INTO `ventas` VALUES (23, '2022-01-02 00:00:00', 54264, NULL, '2022-01-02 14:24:25', '2022-01-02 14:24:25', NULL);
INSERT INTO `ventas` VALUES (24, '2022-01-02 00:00:00', 54264, NULL, '2022-01-02 14:26:01', '2022-01-02 14:26:01', NULL);
INSERT INTO `ventas` VALUES (25, '2022-01-02 00:00:00', 54264, NULL, '2022-01-02 14:29:52', '2022-01-02 14:29:52', NULL);
INSERT INTO `ventas` VALUES (26, '2022-01-02 00:00:00', 54264, NULL, '2022-01-02 14:38:06', '2022-01-02 14:38:06', NULL);
INSERT INTO `ventas` VALUES (27, '2022-01-02 00:00:00', 54264, NULL, '2022-01-02 14:39:39', '2022-01-02 14:39:39', NULL);
INSERT INTO `ventas` VALUES (28, '2022-01-02 00:00:00', 54264, NULL, '2022-01-02 14:41:18', '2022-01-02 14:41:18', NULL);
INSERT INTO `ventas` VALUES (29, '2022-01-02 00:00:00', 54264, NULL, '2022-01-02 15:07:47', '2022-01-02 15:07:47', NULL);
INSERT INTO `ventas` VALUES (30, '2022-01-03 00:00:00', 53407, NULL, '2022-01-03 18:28:58', '2022-01-09 16:11:58', '2022-01-09 16:11:58');
INSERT INTO `ventas` VALUES (31, '2022-01-04 00:00:00', 833000, NULL, '2022-01-04 15:14:05', '2022-01-04 15:14:05', NULL);
INSERT INTO `ventas` VALUES (32, '2022-01-05 00:00:00', 98294, NULL, '2022-01-05 15:16:22', '2022-01-09 15:26:26', '2022-01-09 15:26:26');
INSERT INTO `ventas` VALUES (33, '2022-01-06 00:00:00', 53407, NULL, '2022-01-06 12:30:43', '2022-01-06 12:30:43', NULL);
INSERT INTO `ventas` VALUES (34, '2022-01-06 00:00:00', 78064, NULL, '2022-01-06 12:33:54', '2022-01-06 12:33:54', NULL);
INSERT INTO `ventas` VALUES (35, '2022-01-06 00:00:00', 644266, NULL, '2022-01-06 12:55:07', '2022-01-06 12:55:07', NULL);
INSERT INTO `ventas` VALUES (36, '2022-01-06 00:00:00', 99222, NULL, '2022-01-06 13:00:49', '2022-01-06 13:00:49', NULL);
INSERT INTO `ventas` VALUES (37, '2022-01-06 00:00:00', 190400, NULL, '2022-01-06 13:03:02', '2022-01-09 16:13:32', '2022-01-09 16:13:32');
INSERT INTO `ventas` VALUES (38, '2022-01-06 00:00:00', 99603, NULL, '2022-01-06 13:04:42', '2022-01-09 16:15:29', '2022-01-09 16:15:29');
INSERT INTO `ventas` VALUES (39, '2022-01-06 00:00:00', 56154, NULL, '2022-01-06 13:06:28', '2022-01-06 13:06:28', NULL);
INSERT INTO `ventas` VALUES (40, '2022-01-06 00:00:00', 73185, NULL, '2022-01-06 13:20:11', '2022-01-06 13:20:11', NULL);
INSERT INTO `ventas` VALUES (41, '2022-01-06 00:00:00', 86382, NULL, '2022-01-06 13:22:03', '2022-01-06 13:22:03', NULL);
INSERT INTO `ventas` VALUES (42, '2022-01-06 00:00:00', 170170, NULL, '2022-01-06 13:25:08', '2022-01-06 13:25:08', NULL);
INSERT INTO `ventas` VALUES (43, '2022-01-29 00:00:00', 14161, NULL, '2022-01-29 20:10:17', '2022-01-29 20:10:17', NULL);
INSERT INTO `ventas` VALUES (44, '2022-01-30 00:00:00', 35700, NULL, '2022-01-30 01:51:20', '2022-01-30 01:51:20', NULL);
INSERT INTO `ventas` VALUES (45, '2022-01-30 00:00:00', 13685, NULL, '2022-01-30 02:04:25', '2022-01-30 02:04:25', NULL);
INSERT INTO `ventas` VALUES (46, '2022-01-30 00:00:00', 13685, NULL, '2022-01-30 02:10:27', '2022-01-30 02:10:27', NULL);
INSERT INTO `ventas` VALUES (47, '2022-01-30 00:00:00', 13685, NULL, '2022-01-30 02:14:00', '2022-01-30 02:14:00', NULL);
INSERT INTO `ventas` VALUES (48, '2022-01-30 00:00:00', 13685, NULL, '2022-01-30 15:05:01', '2022-01-30 15:05:01', NULL);

-- ----------------------------
-- Table structure for ventas_cliente_invitado
-- ----------------------------
DROP TABLE IF EXISTS `ventas_cliente_invitado`;
CREATE TABLE `ventas_cliente_invitado`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `venta_id` bigint UNSIGNED NOT NULL,
  `rut` varchar(13) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `nombres` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `apellido1` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `apellido2` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `fono` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `ventas_cliente_invitado_venta_id_foreign`(`venta_id`) USING BTREE,
  CONSTRAINT `ventas_cliente_invitado_venta_id_foreign` FOREIGN KEY (`venta_id`) REFERENCES `ventas` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of ventas_cliente_invitado
-- ----------------------------
INSERT INTO `ventas_cliente_invitado` VALUES (1, 28, '11.111.111-1', 'Marcelo', 'Bravo', 'Castillo', '091234587654', 'mabc@live.cl', '2022-01-02 15:01:40', '2022-01-02 15:01:40', NULL);
INSERT INTO `ventas_cliente_invitado` VALUES (4, 29, '11.111.111-1', 'Marcelo', 'Bravo', 'Castillo', '091234587654', 'mabc@live.cl', '2022-01-02 15:07:57', '2022-01-02 15:07:57', NULL);
INSERT INTO `ventas_cliente_invitado` VALUES (5, 29, '11.111.111-1', 'Marcelo', 'Bravo', 'Castillo', '091234587654', 'mabc@live.cl', '2022-01-02 16:32:59', '2022-01-02 16:32:59', NULL);
INSERT INTO `ventas_cliente_invitado` VALUES (6, 29, '11.111.111-1', 'Marcelo', 'Bravo', 'Castillo', '091234587654', 'mabc@live.cl', '2022-01-02 16:35:25', '2022-01-02 16:35:25', NULL);
INSERT INTO `ventas_cliente_invitado` VALUES (7, 46, '11.111.111-1', 'Marcelo Antonio', 'Bravo', 'Castillo', '0987654321', 'prueba2@ejemplo2.cl', '2022-01-30 02:10:33', '2022-01-30 02:10:33', NULL);
INSERT INTO `ventas_cliente_invitado` VALUES (8, 46, '11.111.111-1', 'Marcelo Antonio', 'Bravo', 'Castillo', '0987654321', 'prueba2@ejemplo2.cl', '2022-01-30 02:12:47', '2022-01-30 02:12:47', NULL);
INSERT INTO `ventas_cliente_invitado` VALUES (9, 47, '11.111.111-1', 'Marcelo Antonio', 'Bravo', 'Castillo', '0987654321', 'prueba2@ejemplo2.cl', '2022-01-30 02:14:05', '2022-01-30 02:14:05', NULL);

-- ----------------------------
-- Table structure for ventas_cliente_tienda
-- ----------------------------
DROP TABLE IF EXISTS `ventas_cliente_tienda`;
CREATE TABLE `ventas_cliente_tienda`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `venta_id` bigint UNSIGNED NOT NULL,
  `cliente_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `ventas_cliente_tienda_venta_id_foreign`(`venta_id`) USING BTREE,
  INDEX `ventas_cliente_tienda_cliente_id_foreign`(`cliente_id`) USING BTREE,
  CONSTRAINT `ventas_cliente_tienda_cliente_id_foreign` FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `ventas_cliente_tienda_venta_id_foreign` FOREIGN KEY (`venta_id`) REFERENCES `ventas` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 37 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of ventas_cliente_tienda
-- ----------------------------
INSERT INTO `ventas_cliente_tienda` VALUES (5, 18, 1, '2022-01-02 03:19:48', '2022-01-02 03:19:48', NULL);
INSERT INTO `ventas_cliente_tienda` VALUES (6, 19, 1, '2022-01-02 03:21:47', '2022-01-02 03:21:47', NULL);
INSERT INTO `ventas_cliente_tienda` VALUES (7, 23, 1, '2022-01-02 14:24:36', '2022-01-02 14:24:36', NULL);
INSERT INTO `ventas_cliente_tienda` VALUES (8, 24, 1, '2022-01-02 14:26:10', '2022-01-02 14:26:10', NULL);
INSERT INTO `ventas_cliente_tienda` VALUES (9, 25, 1, '2022-01-02 14:30:12', '2022-01-02 14:30:12', NULL);
INSERT INTO `ventas_cliente_tienda` VALUES (13, 30, 1, '2022-01-03 18:29:03', '2022-01-09 16:11:58', '2022-01-09 16:11:58');
INSERT INTO `ventas_cliente_tienda` VALUES (14, 30, 1, '2022-01-03 21:18:53', '2022-01-09 16:11:58', '2022-01-09 16:11:58');
INSERT INTO `ventas_cliente_tienda` VALUES (15, 31, 1, '2022-01-04 15:14:10', '2022-01-04 15:14:10', NULL);
INSERT INTO `ventas_cliente_tienda` VALUES (16, 31, 1, '2022-01-04 15:15:51', '2022-01-04 15:15:51', NULL);
INSERT INTO `ventas_cliente_tienda` VALUES (17, 32, 1, '2022-01-05 15:16:27', '2022-01-09 15:26:26', '2022-01-09 15:26:26');
INSERT INTO `ventas_cliente_tienda` VALUES (18, 33, 1, '2022-01-06 12:30:49', '2022-01-06 12:30:49', NULL);
INSERT INTO `ventas_cliente_tienda` VALUES (19, 34, 1, '2022-01-06 12:33:58', '2022-01-06 12:33:58', NULL);
INSERT INTO `ventas_cliente_tienda` VALUES (20, 34, 1, '2022-01-06 12:54:01', '2022-01-06 12:54:01', NULL);
INSERT INTO `ventas_cliente_tienda` VALUES (21, 35, 1, '2022-01-06 12:55:12', '2022-01-06 12:55:12', NULL);
INSERT INTO `ventas_cliente_tienda` VALUES (22, 35, 1, '2022-01-06 12:56:01', '2022-01-06 12:56:01', NULL);
INSERT INTO `ventas_cliente_tienda` VALUES (23, 36, 1, '2022-01-06 13:01:02', '2022-01-06 13:01:02', NULL);
INSERT INTO `ventas_cliente_tienda` VALUES (24, 37, 1, '2022-01-06 13:03:45', '2022-01-09 16:13:32', '2022-01-09 16:13:32');
INSERT INTO `ventas_cliente_tienda` VALUES (25, 38, 1, '2022-01-06 13:04:48', '2022-01-09 16:15:29', '2022-01-09 16:15:29');
INSERT INTO `ventas_cliente_tienda` VALUES (26, 39, 1, '2022-01-06 13:09:44', '2022-01-06 13:09:44', NULL);
INSERT INTO `ventas_cliente_tienda` VALUES (27, 40, 1, '2022-01-06 13:20:16', '2022-01-06 13:20:16', NULL);
INSERT INTO `ventas_cliente_tienda` VALUES (28, 41, 1, '2022-01-06 13:22:15', '2022-01-06 13:22:15', NULL);
INSERT INTO `ventas_cliente_tienda` VALUES (29, 41, 1, '2022-01-06 13:23:41', '2022-01-06 13:23:41', NULL);
INSERT INTO `ventas_cliente_tienda` VALUES (30, 42, 1, '2022-01-06 13:25:12', '2022-01-06 13:25:12', NULL);
INSERT INTO `ventas_cliente_tienda` VALUES (31, 43, 1, '2022-01-29 20:10:22', '2022-01-29 20:10:22', NULL);
INSERT INTO `ventas_cliente_tienda` VALUES (32, 43, 1, '2022-01-29 20:13:00', '2022-01-29 20:13:00', NULL);
INSERT INTO `ventas_cliente_tienda` VALUES (33, 44, 1, '2022-01-30 01:51:25', '2022-01-30 01:51:25', NULL);
INSERT INTO `ventas_cliente_tienda` VALUES (34, 44, 1, '2022-01-30 01:59:57', '2022-01-30 01:59:57', NULL);
INSERT INTO `ventas_cliente_tienda` VALUES (35, 45, 1, '2022-01-30 02:04:31', '2022-01-30 02:04:31', NULL);
INSERT INTO `ventas_cliente_tienda` VALUES (36, 48, 1, '2022-01-30 15:05:07', '2022-01-30 15:05:07', NULL);

-- ----------------------------
-- Table structure for visitas
-- ----------------------------
DROP TABLE IF EXISTS `visitas`;
CREATE TABLE `visitas`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `visitas_mes` bigint NULL DEFAULT 0,
  `visitas_anio` bigint UNSIGNED NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of visitas
-- ----------------------------
INSERT INTO `visitas` VALUES (1, 37, 37, '2022-01-10 00:00:00', '2022-01-30 14:01:35');

-- ----------------------------
-- Table structure for web_pay
-- ----------------------------
DROP TABLE IF EXISTS `web_pay`;
CREATE TABLE `web_pay`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `venta_id` bigint UNSIGNED NOT NULL,
  `vci` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `ammount` bigint NOT NULL COMMENT 'monto',
  `buy_order` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `status` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `session_id` varchar(61) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `card_number` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `card_detail` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `account_date` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `transaccion_date` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `authorization_code` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `payment_type_code` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `response_code` int NULL DEFAULT NULL,
  `installments_numbers` int UNSIGNED NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 40 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of web_pay
-- ----------------------------
INSERT INTO `web_pay` VALUES (1, 0, 'TSY', 99222, '1', 'AUTHORIZED', '4519', '7763', '{\"card_number\":\"7763\"}', '0101', '2022-01-01T23:45:22.177Z', '1415', 'VD', 0, 0, '2022-01-01 23:45:16', '2022-01-01 23:46:12', NULL);
INSERT INTO `web_pay` VALUES (2, 0, 'TSY', 54264, '2', 'AUTHORIZED', '8226', '7763', '{\"card_number\":\"7763\"}', '0101', '2022-01-01T23:49:22.840Z', '1415', 'VD', 0, 0, '2022-01-01 23:49:18', '2022-01-01 23:49:47', NULL);
INSERT INTO `web_pay` VALUES (3, 0, 'TSY', 54264, '3', 'AUTHORIZED', '6942', '7763', '{\"card_number\":\"7763\"}', '0102', '2022-01-02T12:51:18.484Z', '1415', 'VD', 0, 0, '2022-01-02 12:51:11', '2022-01-02 12:52:04', NULL);
INSERT INTO `web_pay` VALUES (4, 0, 'TSY', 54264, '4', 'AUTHORIZED', '6218', '7763', '{\"card_number\":\"7763\"}', '0102', '2022-01-02T14:11:46.032Z', '1415', 'VD', 0, 0, '2022-01-02 14:11:41', '2022-01-02 14:12:11', NULL);
INSERT INTO `web_pay` VALUES (5, 0, 'TSY', 54264, '5', 'AUTHORIZED', '3914', '7763', '{\"card_number\":\"7763\"}', '0102', '2022-01-02T14:13:19.548Z', '1415', 'VD', 0, 0, '2022-01-02 14:13:14', '2022-01-02 14:13:44', NULL);
INSERT INTO `web_pay` VALUES (6, 0, 'TSY', 54264, '6', 'AUTHORIZED', '7677', '7763', '{\"card_number\":\"7763\"}', '0102', '2022-01-02T14:14:44.605Z', '1415', 'VD', 0, 0, '2022-01-02 14:14:39', '2022-01-02 14:15:03', NULL);
INSERT INTO `web_pay` VALUES (7, 0, 'TSY', 54264, '7', 'AUTHORIZED', '7162', '7763', '{\"card_number\":\"7763\"}', '0102', '2022-01-02T14:19:16.425Z', '1415', 'VD', 0, 0, '2022-01-02 14:19:11', '2022-01-02 14:19:45', NULL);
INSERT INTO `web_pay` VALUES (8, 0, 'TSY', 54264, '8', 'AUTHORIZED', '6805', '7763', '{\"card_number\":\"7763\"}', '0102', '2022-01-02T14:20:43.242Z', '1415', 'VD', 0, 0, '2022-01-02 14:20:38', '2022-01-02 14:21:04', NULL);
INSERT INTO `web_pay` VALUES (9, 0, 'TSY', 54264, '9', 'AUTHORIZED', '9403', '7763', '{\"card_number\":\"7763\"}', '0102', '2022-01-02T14:23:53.025Z', '1415', 'VD', 0, 0, '2022-01-02 14:23:48', '2022-01-02 14:24:25', NULL);
INSERT INTO `web_pay` VALUES (10, 0, 'TSY', 54264, '10', 'AUTHORIZED', '5118', '7763', '{\"card_number\":\"7763\"}', '0102', '2022-01-02T14:25:41.425Z', '1415', 'VD', 0, 0, '2022-01-02 14:25:36', '2022-01-02 14:26:01', NULL);
INSERT INTO `web_pay` VALUES (11, 25, 'TSY', 54264, '11', 'AUTHORIZED', '3830', '7763', '{\"card_number\":\"7763\"}', '0102', '2022-01-02T14:29:28.613Z', '1415', 'VD', 0, 0, '2022-01-02 14:29:23', '2022-01-02 14:29:52', NULL);
INSERT INTO `web_pay` VALUES (12, 26, 'TSY', 54264, '12', 'AUTHORIZED', '1911', '7763', '{\"card_number\":\"7763\"}', '0102', '2022-01-02T14:37:42.098Z', '1415', 'VD', 0, 0, '2022-01-02 14:37:37', '2022-01-02 14:38:06', NULL);
INSERT INTO `web_pay` VALUES (13, 27, 'TSY', 54264, '13', 'AUTHORIZED', '1439', '7763', '{\"card_number\":\"7763\"}', '0102', '2022-01-02T14:39:17.891Z', '1415', 'VD', 0, 0, '2022-01-02 14:39:13', '2022-01-02 14:39:40', NULL);
INSERT INTO `web_pay` VALUES (14, 28, 'TSY', 54264, '14', 'AUTHORIZED', '6087', '7763', '{\"card_number\":\"7763\"}', '0102', '2022-01-02T14:40:55.507Z', '1415', 'VD', 0, 0, '2022-01-02 14:40:50', '2022-01-02 14:41:18', NULL);
INSERT INTO `web_pay` VALUES (15, 29, 'TSY', 54264, '15', 'AUTHORIZED', '5705', '7763', '{\"card_number\":\"7763\"}', '0102', '2022-01-02T15:07:23.174Z', '1415', 'VD', 0, 0, '2022-01-02 15:07:18', '2022-01-02 15:07:47', NULL);
INSERT INTO `web_pay` VALUES (16, 30, 'TSY', 53407, '16', 'AUTHORIZED', '7106', '7763', '{\"card_number\":\"7763\"}', '0103', '2022-01-03T18:28:16.924Z', '1415', 'VD', 0, 0, '2022-01-03 18:28:10', '2022-01-09 16:11:58', '2022-01-09 16:11:58');
INSERT INTO `web_pay` VALUES (17, 31, 'TSY', 833000, '17', 'AUTHORIZED', '7549', '7763', '{\"card_number\":\"7763\"}', '0104', '2022-01-04T15:13:05.159Z', '1415', 'VD', 0, 0, '2022-01-04 15:12:54', '2022-01-04 15:14:05', NULL);
INSERT INTO `web_pay` VALUES (18, 32, 'TSY', 98294, '18', 'AUTHORIZED', '5813', '7763', '{\"card_number\":\"7763\"}', '0105', '2022-01-05T15:14:39.394Z', '1415', 'VD', 0, 0, '2022-01-05 15:14:29', '2022-01-09 15:26:26', '2022-01-09 15:26:26');
INSERT INTO `web_pay` VALUES (19, 33, 'TSY', 53407, '19', 'AUTHORIZED', '4310', '7763', '{\"card_number\":\"7763\"}', '0106', '2022-01-06T12:29:45.616Z', '1415', 'VD', 0, 0, '2022-01-06 12:29:33', '2022-01-06 12:30:44', NULL);
INSERT INTO `web_pay` VALUES (20, 34, 'TSY', 78064, '20', 'AUTHORIZED', '7523', '7763', '{\"card_number\":\"7763\"}', '0106', '2022-01-06T12:33:24.244Z', '1415', 'VD', 0, 0, '2022-01-06 12:33:13', '2022-01-06 12:33:54', NULL);
INSERT INTO `web_pay` VALUES (21, 35, 'TSY', 644266, '21', 'AUTHORIZED', '2958', '7763', '{\"card_number\":\"7763\"}', '0106', '2022-01-06T12:54:50.403Z', '1415', 'VD', 0, 0, '2022-01-06 12:54:39', '2022-01-06 12:55:08', NULL);
INSERT INTO `web_pay` VALUES (22, 36, 'TSY', 99222, '22', 'AUTHORIZED', '1909', '7763', '{\"card_number\":\"7763\"}', '0106', '2022-01-06T13:00:18.069Z', '1415', 'VD', 0, 0, '2022-01-06 13:00:07', '2022-01-06 13:00:49', NULL);
INSERT INTO `web_pay` VALUES (23, 37, 'TSY', 190400, '23', 'AUTHORIZED', '3790', '7763', '{\"card_number\":\"7763\"}', '0106', '2022-01-06T13:02:32.701Z', '1415', 'VD', 0, 0, '2022-01-06 13:02:22', '2022-01-09 16:13:32', '2022-01-09 16:13:32');
INSERT INTO `web_pay` VALUES (24, 38, 'TSY', 99603, '24', 'AUTHORIZED', '9314', '7763', '{\"card_number\":\"7763\"}', '0106', '2022-01-06T13:04:28.473Z', '1415', 'VD', 0, 0, '2022-01-06 13:04:18', '2022-01-09 16:15:29', '2022-01-09 16:15:29');
INSERT INTO `web_pay` VALUES (25, 39, 'TSY', 56154, '25', 'AUTHORIZED', '4953', '7763', '{\"card_number\":\"7763\"}', '0106', '2022-01-06T13:06:13.484Z', '1415', 'VD', 0, 0, '2022-01-06 13:06:02', '2022-01-06 13:06:28', NULL);
INSERT INTO `web_pay` VALUES (26, 0, NULL, 73185, '8491', NULL, '2045', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-01-06 13:18:15', '2022-01-06 13:18:15', NULL);
INSERT INTO `web_pay` VALUES (27, 40, 'TSY', 73185, '27', 'AUTHORIZED', '1935', '7763', '{\"card_number\":\"7763\"}', '0106', '2022-01-06T13:19:52.226Z', '1415', 'VD', 0, 0, '2022-01-06 13:19:41', '2022-01-06 13:20:11', NULL);
INSERT INTO `web_pay` VALUES (28, 41, 'TSY', 86382, '28', 'AUTHORIZED', '5471', '7763', '{\"card_number\":\"7763\"}', '0106', '2022-01-06T13:21:50.622Z', '1415', 'VD', 0, 0, '2022-01-06 13:21:40', '2022-01-06 13:22:03', NULL);
INSERT INTO `web_pay` VALUES (29, 42, 'TSY', 170170, '29', 'AUTHORIZED', '2253', '7763', '{\"card_number\":\"7763\"}', '0106', '2022-01-06T13:24:54.280Z', '1415', 'VD', 0, 0, '2022-01-06 13:24:43', '2022-01-06 13:25:08', NULL);
INSERT INTO `web_pay` VALUES (30, 0, NULL, 14161, '8486', NULL, '8058', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-01-29 19:57:36', '2022-01-29 19:57:36', NULL);
INSERT INTO `web_pay` VALUES (31, 43, 'TSY', 14161, '31', 'AUTHORIZED', '1887', '7763', '{\"card_number\":\"7763\"}', '0129', '2022-01-29T20:09:07.405Z', '1415', 'VD', 0, 0, '2022-01-29 20:09:05', '2022-01-29 20:10:17', NULL);
INSERT INTO `web_pay` VALUES (32, 0, NULL, 35700, '2106', NULL, '5659', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-01-29 20:27:45', '2022-01-29 20:27:45', NULL);
INSERT INTO `web_pay` VALUES (33, 0, NULL, 35700, '3435', NULL, '8541', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-01-29 20:35:34', '2022-01-29 20:35:34', NULL);
INSERT INTO `web_pay` VALUES (34, 0, NULL, 35700, '5316', NULL, '1284', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-01-29 20:38:03', '2022-01-29 20:38:03', NULL);
INSERT INTO `web_pay` VALUES (35, 44, 'TSY', 35700, '35', 'AUTHORIZED', '8345', '7763', '{\"card_number\":\"7763\"}', '0129', '2022-01-30T01:50:49.223Z', '1415', 'VD', 0, 0, '2022-01-30 01:50:46', '2022-01-30 01:51:20', NULL);
INSERT INTO `web_pay` VALUES (36, 45, 'TSY', 13685, '36', 'AUTHORIZED', '1173', '7763', '{\"card_number\":\"7763\"}', '0129', '2022-01-30T02:04:00.987Z', '1415', 'VD', 0, 0, '2022-01-30 02:03:59', '2022-01-30 02:04:26', NULL);
INSERT INTO `web_pay` VALUES (37, 46, 'TSY', 13685, '37', 'AUTHORIZED', '4632', '7763', '{\"card_number\":\"7763\"}', '0129', '2022-01-30T02:09:53.025Z', '1415', 'VD', 0, 0, '2022-01-30 02:09:52', '2022-01-30 02:10:27', NULL);
INSERT INTO `web_pay` VALUES (38, 47, 'TSY', 13685, '38', 'AUTHORIZED', '7979', '7763', '{\"card_number\":\"7763\"}', '0129', '2022-01-30T02:13:31.900Z', '1415', 'VD', 0, 0, '2022-01-30 02:13:31', '2022-01-30 02:14:00', NULL);
INSERT INTO `web_pay` VALUES (39, 48, 'TSY', 13685, '39', 'AUTHORIZED', '8206', '7763', '{\"card_number\":\"7763\"}', '0130', '2022-01-30T15:04:08.330Z', '1415', 'VD', 0, 0, '2022-01-30 15:04:04', '2022-01-30 15:05:01', NULL);

SET FOREIGN_KEY_CHECKS = 1;
