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

 Date: 08/05/2022 23:11:56
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for categorias
-- ----------------------------
DROP TABLE IF EXISTS `categorias`;
CREATE TABLE `categorias`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
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
-- Table structure for ciudades
-- ----------------------------
DROP TABLE IF EXISTS `ciudades`;
CREATE TABLE `ciudades`  (
  `id` bigint NOT NULL,
  `cod_region` varchar(10) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `cod_provincia` varchar(10) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `cod_comuna` varchar(10) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `nombre` varchar(50) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of ciudades
-- ----------------------------

-- ----------------------------
-- Table structure for clientes
-- ----------------------------
DROP TABLE IF EXISTS `clientes`;
CREATE TABLE `clientes`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
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
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of clientes
-- ----------------------------
INSERT INTO `clientes` VALUES (2, '11.111.111-1', 'Marcelo', 'Bravo', 'Castillo', '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '$2b$10$Ead6AIGPX.1cs9UlPF6sxerGCO9/yFTjI7a6hpP.0nOT4Ve1UtNai', 'mabc@live.cl', '+ 56 9 98765432', 'perfil.jpg', '1234', 'Talca', 'Cerca de colegio', '2021-08-10 00:00:00', '2021-09-30 00:00:00', NULL);
INSERT INTO `clientes` VALUES (3, '22.222.222-2', 'Juan', 'Pérez', 'Pereira', '1 Nortre 2 Sur', '13', '131', '13108', 'Santiago', '$2b$10$rlcE3dGyjc2dyqynHPkCCeOZyxbdoeNhYHwW8TKmV6hnov73ecQg6', 'juan@ejemplo.cl', '09 87654321', NULL, '5432', '0', 'Cerca del costanera', '2021-08-11 00:00:00', '2021-08-11 00:00:00', NULL);
INSERT INTO `clientes` VALUES (4, '33.333.333-3', 'Carla', 'Contreras', 'Jerez', '1 Oriente 1 Poniente', '07', '071', '07105', 'Talca', '$2b$10$L0PIiJtrTHY15M19p1RUm.bDjyZCVLH4qkOJbpal7kxt5nS.Qp7E2', 'carla@ejemplo.cl', '091234587654', NULL, '123', '0', 'Cerca de la plaza de armas', '2021-08-11 00:00:00', '2021-08-11 00:00:00', NULL);
INSERT INTO `clientes` VALUES (5, '77.777.777-7', 'Carla', 'Perez', 'Corales', '1 Oriente 3 y 4 poniente', '07', '073', '07301', 'Curicó', '$2b$10$r/fhKct8pGr5st3leghri.T23JkvwJspJxyWebW/RJLNQLKG6aBKO', 'carla@ejemplo.cl', '0909878765', 'descarga.png', '3210', '', 'Cerca de supermercado Lider', '2021-09-28 00:00:00', '2021-09-28 00:00:00', NULL);
INSERT INTO `clientes` VALUES (6, '77.777.777-7', 'Valeria', 'Maza', 'Perez', '1 Oriente 4 y 5 poniente', '13', '131', '13109', 'La cisterna', '$2b$10$rAOJOwq34ICdsPZdzuZhku6UjKfyvNuCPPlMQ.IqYvpBN6pF1JcNa', 'valeria_perez@ejemplo.cl', '1234554321', 'descarga.png', '123', '4', 'Cerca de supermercado Totus', '2021-09-28 00:00:00', '2021-09-28 00:00:00', NULL);

-- ----------------------------
-- Table structure for companias_envios
-- ----------------------------
DROP TABLE IF EXISTS `companias_envios`;
CREATE TABLE `companias_envios`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `codigo` varchar(10) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `nombre` varchar(50) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
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
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `nombre_app` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of configuracion
-- ----------------------------
INSERT INTO `configuracion` VALUES (1, 'Mabc App', '2021-05-27 23:19:32', '2021-05-27 23:19:32');

-- ----------------------------
-- Table structure for despachos_ventas
-- ----------------------------
DROP TABLE IF EXISTS `despachos_ventas`;
CREATE TABLE `despachos_ventas`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `venta_id` bigint UNSIGNED NOT NULL,
  `direccion` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `region` varchar(10) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `provincia` varchar(10) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `comuna` varchar(10) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `ciudad` varchar(20) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `casa_num` varchar(10) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `block_num` varchar(10) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL,
  `referencia` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL,
  `shipping_cod` bigint UNSIGNED NOT NULL,
  `fecha_despacho` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `ventas-despachos`(`venta_id`) USING BTREE,
  INDEX `companias_evios-despacho_ventas`(`shipping_cod`) USING BTREE,
  CONSTRAINT `companias_evios-despacho_ventas` FOREIGN KEY (`shipping_cod`) REFERENCES `companias_envios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ventas-despachos` FOREIGN KEY (`venta_id`) REFERENCES `ventas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 586 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of despachos_ventas
-- ----------------------------
INSERT INTO `despachos_ventas` VALUES (580, 612, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2022-02-07 00:00:00', '2022-02-07 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (581, 613, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2022-02-10 00:00:00', '2022-02-10 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (582, 614, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2022-02-10 00:00:00', '2022-02-10 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (583, 615, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2022-02-10 00:00:00', '2022-02-10 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (584, 616, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2022-02-10 00:00:00', '2022-02-10 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (585, 617, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2022-02-10 00:00:00', '2022-02-10 00:00:00', NULL);
INSERT INTO `despachos_ventas` VALUES (586, 618, '12 Norte 16 Oriente, #2288, Talca', '07', '071', '07101', 'Talca', '1234', 'Talca', 'Cerca de colegio', 1, NULL, '2022-02-10 00:00:00', '2022-02-10 00:00:00', NULL);

-- ----------------------------
-- Table structure for detalle_ventas
-- ----------------------------
DROP TABLE IF EXISTS `detalle_ventas`;
CREATE TABLE `detalle_ventas`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `venta_id` bigint UNSIGNED NOT NULL,
  `producto_id` bigint UNSIGNED NOT NULL,
  `precio_neto` int NOT NULL COMMENT 'Precio al momento de la venta',
  `impuesto` int NOT NULL COMMENT 'Promedio de los porcentajes de impuestos aplicados',
  `JSON_impuestos` varchar(300) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT '' COMMENT 'JSON con los códigos de los impuestos y porcentaje de cada impuesto',
  `precio_venta` int NOT NULL,
  `cantidad` int NOT NULL,
  `total_producto` int NOT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `talla` varchar(10) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `ventas-detalle_ventas`(`venta_id`) USING BTREE,
  CONSTRAINT `ventas-detalle_ventas` FOREIGN KEY (`venta_id`) REFERENCES `ventas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 759 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of detalle_ventas
-- ----------------------------
INSERT INTO `detalle_ventas` VALUES (752, 612, 71, 29990, 19, NULL, 35688, 1, 35688, '2022-02-07 00:00:00', '2022-02-07 00:00:00', NULL, NULL);
INSERT INTO `detalle_ventas` VALUES (753, 612, 70, 27990, 19, NULL, 33308, 1, 33308, '2022-02-07 00:00:00', '2022-02-07 00:00:00', NULL, NULL);
INSERT INTO `detalle_ventas` VALUES (754, 613, 80, 28000, 19, NULL, 33320, 1, 33320, '2022-02-10 00:00:00', '2022-02-10 00:00:00', NULL, NULL);
INSERT INTO `detalle_ventas` VALUES (755, 614, 80, 28000, 19, NULL, 33320, 1, 33320, '2022-02-10 00:00:00', '2022-02-10 00:00:00', NULL, '9');
INSERT INTO `detalle_ventas` VALUES (756, 615, 80, 28000, 19, NULL, 33320, 1, 33320, '2022-02-10 00:00:00', '2022-02-10 00:00:00', NULL, '9');
INSERT INTO `detalle_ventas` VALUES (757, 616, 80, 28000, 19, NULL, 33320, 1, 33320, '2022-02-10 00:00:00', '2022-02-10 00:00:00', NULL, '9');
INSERT INTO `detalle_ventas` VALUES (758, 617, 80, 28000, 19, NULL, 33320, 1, 33320, '2022-02-10 00:00:00', '2022-02-10 00:00:00', NULL, '9');
INSERT INTO `detalle_ventas` VALUES (759, 618, 80, 28000, 19, NULL, 33320, 1, 33320, '2022-02-10 00:00:00', '2022-02-10 00:00:00', NULL, '9');

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
  `src_imagen` varchar(500) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `texto` varchar(200) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT '',
  `link` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL,
  `posicion` bigint NOT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 30 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of imagenes_marquesina_home
-- ----------------------------
INSERT INTO `imagenes_marquesina_home` VALUES (25, 'carrousel 1.png', '', '', 10, '2021-07-13 00:00:00', '2021-07-13 00:00:00', NULL);
INSERT INTO `imagenes_marquesina_home` VALUES (26, 'carrousel 3.png', '', '', 20, '2021-07-13 00:00:00', '2021-07-13 00:00:00', NULL);
INSERT INTO `imagenes_marquesina_home` VALUES (27, 'WIN_20200709_19_11_53_Pro (2).jpg', 'cccccccccccccccc', 'link cccccccccccccccc', 30, '2021-07-13 00:00:00', '2021-07-13 00:00:00', '2022-02-07 00:00:00');
INSERT INTO `imagenes_marquesina_home` VALUES (28, 'carrousel 4.png', '', '', 30, '2021-07-16 00:00:00', '2021-07-16 00:00:00', NULL);
INSERT INTO `imagenes_marquesina_home` VALUES (29, 'carrousel 5.png', '', '', 40, '2021-07-16 00:00:00', '2021-07-16 00:00:00', NULL);
INSERT INTO `imagenes_marquesina_home` VALUES (30, 'carrousel 2.png', '', '', 15, '2021-07-17 00:00:00', '2021-07-17 00:00:00', NULL);

-- ----------------------------
-- Table structure for imagenes_productos
-- ----------------------------
DROP TABLE IF EXISTS `imagenes_productos`;
CREATE TABLE `imagenes_productos`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `producto_id` bigint UNSIGNED NOT NULL,
  `source_image` varchar(500) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `imagen_principal` tinyint NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_imagenes_productos-productos`(`producto_id`) USING BTREE,
  CONSTRAINT `fk_imagenes_productos-productos` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 337 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = Dynamic;

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
INSERT INTO `imagenes_productos` VALUES (321, 70, 'zapatilla ua - 724601-0001-004.jpg', 0, '2021-07-02 09:44:05', '2022-02-09 00:00:00', NULL);
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
INSERT INTO `imagenes_productos` VALUES (335, 80, 'traje-baño-mujer-1.webp', 1, '2022-01-09 21:42:51', '2022-01-09 21:42:51', NULL);
INSERT INTO `imagenes_productos` VALUES (336, 80, 'traje-baño-mujer-2.webp', 0, '2022-01-09 21:42:51', '2022-01-09 21:42:51', NULL);
INSERT INTO `imagenes_productos` VALUES (337, 80, 'traje-baño-mujer-3.webp', 0, '2022-01-09 21:42:51', '2022-01-09 21:42:51', NULL);

-- ----------------------------
-- Table structure for impuestos
-- ----------------------------
DROP TABLE IF EXISTS `impuestos`;
CREATE TABLE `impuestos`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `sigla` varchar(15) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `porcentaje` decimal(65, 0) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
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
  `id` bigint NOT NULL AUTO_INCREMENT,
  `producto_id` bigint UNSIGNED NOT NULL,
  `impuesto_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_impuestos_productos-productos`(`producto_id`) USING BTREE,
  INDEX `fk_impuestos_productos-impuestos`(`impuesto_id`) USING BTREE,
  CONSTRAINT `fk_impuestos_productos-impuestos` FOREIGN KEY (`impuesto_id`) REFERENCES `impuestos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_impuestos_productos-productos` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 211 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = Dynamic;

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
INSERT INTO `impuestos_productos` VALUES (210, 70, 30, '2022-02-09 00:00:00', '2022-02-09 00:00:00', NULL);
INSERT INTO `impuestos_productos` VALUES (211, 80, 10, '2022-02-09 00:00:00', '2022-02-09 00:00:00', NULL);

-- ----------------------------
-- Table structure for marcas
-- ----------------------------
DROP TABLE IF EXISTS `marcas`;
CREATE TABLE `marcas`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = Dynamic;

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
INSERT INTO `marcas` VALUES (9, 'Froens', '2022-02-09 00:00:00', '2022-02-09 00:00:00', NULL);

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
  `menu_padre_id` bigint UNSIGNED NOT NULL DEFAULT 0,
  `posicion` int UNSIGNED NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `menus_nombre_unique`(`nombre`) USING BTREE,
  UNIQUE INDEX `menus_url_unique`(`url`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 37 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = DYNAMIC;

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
INSERT INTO `menus` VALUES (37, 'Tallas', 'tallas', '2022-02-07 00:00:00', '2022-02-07 00:00:00', NULL, 19, 90);

-- ----------------------------
-- Table structure for menus_tienda
-- ----------------------------
DROP TABLE IF EXISTS `menus_tienda`;
CREATE TABLE `menus_tienda`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `url` varchar(100) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `menu_padre_id` bigint NULL DEFAULT NULL,
  `posicion` int UNSIGNED NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime NULL DEFAULT NULL,
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
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 20 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = DYNAMIC;

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
INSERT INTO `pantallas` VALUES (6, 'Videos', '2021-04-28 19:48:21', '2021-04-28 19:48:21', NULL, 13, 1, 1, 1);
INSERT INTO `pantallas` VALUES (11, 'Personalizar', '2021-05-26 00:00:00', '2021-05-26 00:00:00', NULL, 22, 1, 0, 0);
INSERT INTO `pantallas` VALUES (14, 'Impuestos', '2021-06-12 00:00:00', '2021-06-12 00:00:00', NULL, 24, 1, 1, 1);
INSERT INTO `pantallas` VALUES (15, 'Categorías', '2021-06-14 00:00:00', '2021-06-14 00:00:00', NULL, 25, 1, 1, 1);
INSERT INTO `pantallas` VALUES (16, 'Sub-categorias', '2021-06-18 00:00:00', '2021-06-18 00:00:00', NULL, 26, 1, 1, 1);
INSERT INTO `pantallas` VALUES (17, 'Marcas', '2021-06-19 00:00:00', '2021-06-19 00:00:00', NULL, 27, 1, 1, 1);
INSERT INTO `pantallas` VALUES (18, 'Unidades', '2021-06-21 00:00:00', '2021-06-21 00:00:00', NULL, 28, 1, 1, 1);
INSERT INTO `pantallas` VALUES (19, 'Productos', '2021-06-23 00:00:00', '2021-06-23 00:00:00', NULL, 29, 1, 1, 1);
INSERT INTO `pantallas` VALUES (20, 'Secciones tienda', '2021-07-06 00:00:00', '2021-11-15 00:00:00', NULL, 31, 0, 1, 0);
INSERT INTO `pantallas` VALUES (21, 'Menú Tienda', '2021-07-10 00:00:00', '2021-07-10 00:00:00', NULL, 32, 1, 1, 1);
INSERT INTO `pantallas` VALUES (22, 'Secciones pág. Home', '2021-07-20 00:00:00', '2021-07-20 00:00:00', NULL, 33, 1, 1, 1);
INSERT INTO `pantallas` VALUES (23, 'Depachos', '2021-08-26 00:00:00', '2021-08-26 00:00:00', NULL, 34, 0, 1, 1);
INSERT INTO `pantallas` VALUES (24, 'Precios', '2021-09-20 00:00:00', '2021-10-31 00:00:00', NULL, 35, 1, 0, 0);
INSERT INTO `pantallas` VALUES (25, 'Clientes', '2021-09-27 00:00:00', '2021-09-27 00:00:00', NULL, 36, 1, 1, 1);
INSERT INTO `pantallas` VALUES (26, 'Tallas', '2022-02-07 00:00:00', '2022-02-07 00:00:00', NULL, 37, 1, 1, 1);

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
) ENGINE = InnoDB AUTO_INCREMENT = 57 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of permisos
-- ----------------------------
INSERT INTO `permisos` VALUES (1, 1, 1, 1, 1, 1, 1, '2021-02-06 22:33:59', '2022-02-07 00:00:00', NULL);
INSERT INTO `permisos` VALUES (2, 1, 2, 1, 1, 1, 1, '2021-02-06 22:33:59', '2022-02-07 00:00:00', NULL);
INSERT INTO `permisos` VALUES (3, 1, 3, 1, 1, 1, 1, '2021-02-08 13:32:30', '2022-02-07 00:00:00', NULL);
INSERT INTO `permisos` VALUES (5, 1, 4, 1, 1, 1, 1, '2021-02-10 11:39:33', '2022-02-07 00:00:00', NULL);
INSERT INTO `permisos` VALUES (6, 1, 5, 1, 1, 1, 1, '2021-02-10 11:42:38', '2022-02-07 00:00:00', NULL);
INSERT INTO `permisos` VALUES (7, 1, 6, 1, 0, 1, 1, '2021-04-28 20:03:52', '2022-02-07 00:00:00', NULL);
INSERT INTO `permisos` VALUES (8, 6, 1, 0, 0, 0, 0, '2021-05-19 00:00:00', '2022-05-08 00:00:00', NULL);
INSERT INTO `permisos` VALUES (9, 6, 2, 0, 0, 0, 0, '2021-05-19 00:00:00', '2022-05-08 00:00:00', NULL);
INSERT INTO `permisos` VALUES (10, 6, 3, 0, 0, 0, 0, '2021-05-19 00:00:00', '2022-05-08 00:00:00', NULL);
INSERT INTO `permisos` VALUES (11, 6, 4, 0, 0, 0, 0, '2021-05-19 00:00:00', '2022-05-08 00:00:00', NULL);
INSERT INTO `permisos` VALUES (12, 6, 5, 0, 0, 0, 0, '2021-05-19 00:00:00', '2022-05-08 00:00:00', NULL);
INSERT INTO `permisos` VALUES (13, 6, 6, 1, 1, 1, 1, '2021-05-19 00:00:00', '2022-05-08 00:00:00', NULL);
INSERT INTO `permisos` VALUES (26, 2, 1, 0, 0, 0, 0, '2021-05-19 00:00:00', '2021-05-26 00:00:00', NULL);
INSERT INTO `permisos` VALUES (27, 2, 2, 1, 1, 1, 0, '2021-05-19 00:00:00', '2021-05-26 00:00:00', NULL);
INSERT INTO `permisos` VALUES (28, 2, 3, 1, 0, 0, 0, '2021-05-19 00:00:00', '2021-05-26 00:00:00', NULL);
INSERT INTO `permisos` VALUES (29, 2, 4, 0, 0, 0, 0, '2021-05-19 00:00:00', '2021-05-26 00:00:00', NULL);
INSERT INTO `permisos` VALUES (30, 2, 5, 1, 0, 0, 0, '2021-05-19 00:00:00', '2021-05-26 00:00:00', NULL);
INSERT INTO `permisos` VALUES (31, 2, 6, 1, 1, 1, 1, '2021-05-19 00:00:00', '2021-05-26 00:00:00', NULL);
INSERT INTO `permisos` VALUES (44, 1, 11, 1, 1, 0, 0, '2021-05-26 00:00:00', '2022-02-07 00:00:00', NULL);
INSERT INTO `permisos` VALUES (45, 1, 14, 1, 1, 1, 1, '2021-06-12 00:00:00', '2022-02-07 00:00:00', NULL);
INSERT INTO `permisos` VALUES (46, 1, 15, 1, 1, 1, 1, '2021-06-14 00:00:00', '2022-02-07 00:00:00', NULL);
INSERT INTO `permisos` VALUES (47, 1, 16, 1, 1, 1, 1, '2021-06-18 00:00:00', '2022-02-07 00:00:00', NULL);
INSERT INTO `permisos` VALUES (48, 1, 17, 1, 1, 1, 1, '2021-06-19 00:00:00', '2022-02-07 00:00:00', NULL);
INSERT INTO `permisos` VALUES (49, 1, 18, 1, 1, 1, 1, '2021-06-21 00:00:00', '2022-02-07 00:00:00', NULL);
INSERT INTO `permisos` VALUES (50, 1, 19, 1, 1, 1, 1, '2021-06-23 00:00:00', '2022-02-07 00:00:00', NULL);
INSERT INTO `permisos` VALUES (51, 1, 20, 1, 0, 1, 0, '2021-07-06 00:00:00', '2022-02-07 00:00:00', NULL);
INSERT INTO `permisos` VALUES (52, 1, 21, 1, 1, 1, 1, '2021-07-10 00:00:00', '2022-02-07 00:00:00', NULL);
INSERT INTO `permisos` VALUES (53, 1, 22, 1, 1, 1, 1, '2021-07-20 00:00:00', '2022-02-07 00:00:00', NULL);
INSERT INTO `permisos` VALUES (54, 1, 23, 1, 0, 1, 1, '2021-08-26 00:00:00', '2022-02-07 00:00:00', NULL);
INSERT INTO `permisos` VALUES (55, 1, 24, 1, 1, 0, 0, '2021-09-20 00:00:00', '2022-02-07 00:00:00', NULL);
INSERT INTO `permisos` VALUES (56, 1, 25, 1, 1, 1, 1, '2021-09-27 00:00:00', '2022-02-07 00:00:00', NULL);
INSERT INTO `permisos` VALUES (57, 1, 26, 1, 1, 1, 1, '2022-02-07 00:00:00', '2022-02-07 00:00:00', NULL);
INSERT INTO `permisos` VALUES (58, 6, 11, 0, 0, 0, 0, '2022-05-08 00:00:00', '2022-05-08 00:00:00', NULL);
INSERT INTO `permisos` VALUES (59, 6, 14, 1, 1, 1, 1, '2022-05-08 00:00:00', '2022-05-08 00:00:00', NULL);
INSERT INTO `permisos` VALUES (60, 6, 15, 1, 1, 1, 1, '2022-05-08 00:00:00', '2022-05-08 00:00:00', NULL);
INSERT INTO `permisos` VALUES (61, 6, 16, 1, 1, 1, 1, '2022-05-08 00:00:00', '2022-05-08 00:00:00', NULL);
INSERT INTO `permisos` VALUES (62, 6, 17, 1, 1, 1, 1, '2022-05-08 00:00:00', '2022-05-08 00:00:00', NULL);
INSERT INTO `permisos` VALUES (63, 6, 18, 1, 1, 1, 1, '2022-05-08 00:00:00', '2022-05-08 00:00:00', NULL);
INSERT INTO `permisos` VALUES (64, 6, 19, 1, 1, 1, 1, '2022-05-08 00:00:00', '2022-05-08 00:00:00', NULL);
INSERT INTO `permisos` VALUES (65, 6, 20, 1, 0, 1, 0, '2022-05-08 00:00:00', '2022-05-08 00:00:00', NULL);
INSERT INTO `permisos` VALUES (66, 6, 21, 1, 1, 1, 1, '2022-05-08 00:00:00', '2022-05-08 00:00:00', NULL);
INSERT INTO `permisos` VALUES (67, 6, 22, 1, 1, 1, 1, '2022-05-08 00:00:00', '2022-05-08 00:00:00', NULL);
INSERT INTO `permisos` VALUES (68, 6, 23, 1, 0, 1, 1, '2022-05-08 00:00:00', '2022-05-08 00:00:00', NULL);
INSERT INTO `permisos` VALUES (69, 6, 24, 1, 1, 0, 0, '2022-05-08 00:00:00', '2022-05-08 00:00:00', NULL);
INSERT INTO `permisos` VALUES (70, 6, 25, 1, 1, 1, 1, '2022-05-08 00:00:00', '2022-05-08 00:00:00', NULL);
INSERT INTO `permisos` VALUES (71, 6, 26, 1, 1, 1, 1, '2022-05-08 00:00:00', '2022-05-08 00:00:00', NULL);

-- ----------------------------
-- Table structure for precios_productos
-- ----------------------------
DROP TABLE IF EXISTS `precios_productos`;
CREATE TABLE `precios_productos`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `producto_id` bigint UNSIGNED NOT NULL,
  `precio` int NULL DEFAULT NULL,
  `descuento` int NULL DEFAULT 0,
  `descuento_maximo` int NULL DEFAULT 0,
  `fecha_desde` timestamp NULL DEFAULT NULL,
  `fecha_hasta` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_precios_productos-productos`(`producto_id`) USING BTREE,
  CONSTRAINT `fk_precios_productos-productos` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 30 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of precios_productos
-- ----------------------------
INSERT INTO `precios_productos` VALUES (1, 60, 498190, 6, 12, '2021-09-28 06:00:00', '2021-10-18 06:00:00', '2021-06-24 18:57:04', '2021-10-31 00:00:00', NULL);
INSERT INTO `precios_productos` VALUES (2, 60, 450000, 16, 20, '2021-10-16 00:00:00', '2021-10-31 00:00:00', '2021-06-24 19:13:30', '2021-09-19 00:00:00', '2021-09-22 00:00:00');
INSERT INTO `precios_productos` VALUES (15, 61, 93500, 15, 20, '2021-09-22 06:00:00', '2021-10-02 06:00:00', '2021-09-19 00:00:00', '2021-10-31 00:00:00', NULL);
INSERT INTO `precios_productos` VALUES (16, 62, 55000, 50, 60, '2021-09-19 00:00:00', '2021-10-10 00:00:00', '2021-09-19 00:00:00', '2021-09-19 00:00:00', '2021-09-19 00:00:00');
INSERT INTO `precios_productos` VALUES (17, 73, 20000, 29, 30, '2021-10-01 00:00:00', '2021-10-07 00:00:00', '2021-09-19 00:00:00', '2021-09-19 00:00:00', '2021-09-19 00:00:00');
INSERT INTO `precios_productos` VALUES (18, 72, NULL, NULL, NULL, '2021-09-30 00:00:00', '2021-10-03 00:00:00', '2021-09-22 00:00:00', '2021-10-31 00:00:00', NULL);
INSERT INTO `precios_productos` VALUES (19, 69, 7000, 30, NULL, '2021-10-06 12:00:00', '2021-10-15 12:00:00', '2021-09-22 00:00:00', '2021-10-31 00:00:00', NULL);
INSERT INTO `precios_productos` VALUES (20, 66, NULL, NULL, NULL, NULL, NULL, '2021-09-22 00:00:00', '2021-10-31 00:00:00', NULL);
INSERT INTO `precios_productos` VALUES (21, 63, 47500, 5, NULL, NULL, NULL, '2021-09-22 00:00:00', '2021-10-31 00:00:00', NULL);
INSERT INTO `precios_productos` VALUES (22, 67, NULL, NULL, NULL, NULL, NULL, '2021-09-22 00:00:00', '2021-09-23 00:00:00', NULL);
INSERT INTO `precios_productos` VALUES (23, 65, NULL, NULL, NULL, NULL, NULL, '2021-09-22 00:00:00', '2021-09-23 00:00:00', NULL);
INSERT INTO `precios_productos` VALUES (24, 68, NULL, NULL, NULL, NULL, NULL, '2021-09-22 00:00:00', '2021-09-23 00:00:00', NULL);
INSERT INTO `precios_productos` VALUES (25, 71, NULL, NULL, NULL, NULL, NULL, '2021-09-22 00:00:00', '2021-09-23 00:00:00', NULL);
INSERT INTO `precios_productos` VALUES (26, 60, 400000, 6, 12, '2021-09-28 06:00:00', '2021-10-18 06:00:00', '2021-09-22 00:00:00', '2021-10-31 00:00:00', NULL);
INSERT INTO `precios_productos` VALUES (27, 72, 5002, 49, NULL, '2021-09-25 09:00:00', '2021-09-29 09:00:00', '2021-09-22 00:00:00', '2021-10-31 00:00:00', NULL);
INSERT INTO `precios_productos` VALUES (28, 69, 7700, 23, NULL, '2021-09-25 14:41:54', '2021-10-05 06:00:00', '2021-09-22 00:00:00', '2021-10-31 00:00:00', NULL);
INSERT INTO `precios_productos` VALUES (29, 66, 55922, 20, NULL, '2021-09-27 10:35:01', '2021-10-03 10:34:52', '2021-09-22 00:00:00', '2021-10-31 00:00:00', NULL);
INSERT INTO `precios_productos` VALUES (30, 70, 23231, 17, NULL, NULL, NULL, '2021-09-23 00:00:00', '2021-09-23 00:00:00', NULL);

-- ----------------------------
-- Table structure for productos
-- ----------------------------
DROP TABLE IF EXISTS `productos`;
CREATE TABLE `productos`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `descripcion` varchar(1000) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `precio_venta_normal` int UNSIGNED NOT NULL,
  `stock` bigint UNSIGNED NOT NULL DEFAULT 0,
  `unidad_id` bigint NOT NULL,
  `marca_id` bigint UNSIGNED NOT NULL,
  `categoria_id` bigint NOT NULL,
  `sub_categoria_id` bigint UNSIGNED NOT NULL,
  `talla_id` bigint UNSIGNED NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_productos-marcas`(`marca_id`) USING BTREE,
  INDEX `fk_productos-categorias`(`categoria_id`) USING BTREE,
  INDEX `fk_productos-sub_categorias`(`sub_categoria_id`) USING BTREE,
  INDEX `fk_productos-unidades`(`unidad_id`) USING BTREE,
  CONSTRAINT `fk_productos-categorias` FOREIGN KEY (`categoria_id`) REFERENCES `categorias` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_productos-marcas` FOREIGN KEY (`marca_id`) REFERENCES `marcas` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_productos-sub_categorias` FOREIGN KEY (`sub_categoria_id`) REFERENCES `sub_categorias` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_productos-unidades` FOREIGN KEY (`unidad_id`) REFERENCES `unidades` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 80 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of productos
-- ----------------------------
INSERT INTO `productos` VALUES (60, 'Drone Phantom 3', 'Phantom 3 standar fácil de pilotar, vuelo estacionario de modo gps, registros automáticos de vuelo videocámara 2.7 k fotos de 12 megapixeles', 529990, 22, 3, 4, 1, 3, NULL, '2021-06-23 00:00:00', '2021-09-06 00:00:00', NULL);
INSERT INTO `productos` VALUES (61, 'Celular LG X CAM', 'Celular LG X-CAM liberado con chip movistar', 110000, 40, 3, 4, 1, 4, NULL, '2021-06-24 00:00:00', '2021-09-06 00:00:00', NULL);
INSERT INTO `productos` VALUES (62, 'Celular LG K41S', 'Celular LG K41S liberado con chip movistar', 110000, 4, 3, 4, 1, 4, NULL, '2021-06-24 00:00:00', '2021-09-06 00:00:00', NULL);
INSERT INTO `productos` VALUES (63, 'Notebook aweiou', 'Laptop portátil ', 50000, 46, 3, 3, 1, 3, NULL, '2021-07-03 00:00:00', '2021-09-06 00:00:00', NULL);
INSERT INTO `productos` VALUES (64, 'trtrtrtrtr', 'trtrtrtrtr', 500000, 100, 1, 2, 1, 3, NULL, '2021-07-03 00:00:00', '2021-07-03 00:00:00', '2021-07-03 00:00:00');
INSERT INTO `productos` VALUES (65, 'Pesos Para Tobillos Y Muñecas (3 Kg El Par)', 'Pesos Para Tobillos Y Muñecas (3 Kg El Par)', 9990, 86, 3, 2, 5, 6, NULL, '2021-07-26 00:00:00', '2021-09-06 00:00:00', NULL);
INSERT INTO `productos` VALUES (66, 'Maleta Pesas 20 Kg', 'Maleta Pesas 20 Kg, 4 discos de 2,5 Kilos, 4 pesos, de 1,5 Kilos, 2 barras de 2 Kilos c/u, 1 maleta plástica para transporte', 69990, 0, 3, 2, 5, 7, NULL, '2021-07-26 00:00:00', '2021-07-26 00:00:00', NULL);
INSERT INTO `productos` VALUES (67, 'Pesa Rusa Kettlebell 7 Kg', 'Pesa Rusa Kettlebell 7 Kg, Color negro', 21990, 99, 3, 5, 5, 7, NULL, '2021-07-26 00:00:00', '2021-07-26 00:00:00', NULL);
INSERT INTO `productos` VALUES (68, 'Six Pack Maquina Abdominales 5 min shape', 'Maquina Para Abdominales SIX PACKCon esta Maquina podrás realizar ejercicios abdominales.Trabaja los músculos del abdomen sector alto, medio, bajo y oblicuos, También hombros, pecho, espalda y piernas.Posee 6 posiciones para ajuste de dificultad + 1 posición para guardar el producto para que no utilice espacio al terminar de utilizarlo quedando totalmente vertical.Incluye Pantalla donde se puede ver: Tiempo ? Calorías quemadas ? Contador de Repeticiones ? Tiempo.Pantalla necesita 1 pila AA, ( INCLUIDA )Ancho máximo 54 cmAltura producto: Dependerá del nivel de dificultad seleccionado.Altura máxima: (posición guardado): 125 cm', 48990, 76, 3, 5, 5, 7, NULL, '2021-07-26 00:00:00', '2021-09-06 00:00:00', NULL);
INSERT INTO `productos` VALUES (69, 'Balon De Basketball 6 Muuk', 'La pelota de Basketball MUUK de tamaño Juvenil para entrenamiento, ideal para uso en exteriores. Elaborado con materiales altamente durables y resistentes, contiene cámara de butilo que retiene más el aire y viene encordado en nylon, lo que le hace conservar su esfericidad y un bote uniforme.', 10000, 100, 3, 4, 5, 7, NULL, '2021-07-26 00:00:00', '2021-08-22 00:00:00', NULL);
INSERT INTO `productos` VALUES (70, 'Zapatilla Under Armour GS Charged Pursuit 2 Negra Unisex', 'Zapatilla running para niñas y niños, modelo gs charged pursuit 2 de color negro, marca Under Armour', 27990, 97, 5, 6, 5, 5, NULL, '2021-08-02 00:00:00', '2022-02-09 00:00:00', NULL);
INSERT INTO `productos` VALUES (71, 'Zapatilla Running Adidas Unisex Tensaur Run K Negro', 'Zapatilla running unisex marca Adidas modelo Tensaur Run K de color negro con forro textil. Calzado con cordón y fit bajo el tobillo', 29990, 99, 5, 2, 5, 5, NULL, '2021-08-02 00:00:00', '2021-08-02 00:00:00', NULL);
INSERT INTO `productos` VALUES (72, 'BALANZA DIGITAL NAPPO 180KG', 'Nueva balanza Nappo con diseño ergonómico, de excelente calidad, que gracias a su graduación de 100 gramos aseguran la mayor exactitud del peso.  Con capacidad de hasta 180KG. Ideal para colocar en el baño de tu casa, y pesarte despues de hacer ejercicio o en cualquier momento.', 9990, 13, 3, 7, 1, 8, NULL, '2021-09-06 00:00:00', '2021-09-06 00:00:00', NULL);
INSERT INTO `productos` VALUES (73, 'ZAPATILLA SKECHERS MICROSPEC MAX', 'Skechers es una marca global que se especializa en diseñar y desarrollar productos de Lifestyle y Performance conocidos por su estilo, innovación, calidad y comodidad. Junto con su variada oferta de calzado, Skechers posee colecciones para hombres, mujeres y niños, incluyendo una creciente gama de productos creados para brindar comodidad y estilo a toda la familia.', 27990, 59, 3, 8, 5, 5, NULL, '2021-09-06 00:00:00', '2021-09-06 00:00:00', NULL);
INSERT INTO `productos` VALUES (80, 'Bikini Capri Negro', 'Fabricado a partir de 4 botellas plasticas Pet. Diseñado por froens y fabricados en colombia, este producto es responsable con el medio ambiente', 28000, 14, 3, 9, 6, 17, NULL, '2022-02-09 00:00:00', '2022-02-09 00:00:00', NULL);

-- ----------------------------
-- Table structure for productos_secciones_home
-- ----------------------------
DROP TABLE IF EXISTS `productos_secciones_home`;
CREATE TABLE `productos_secciones_home`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `seccion_id` bigint UNSIGNED NOT NULL,
  `producto_id` bigint UNSIGNED NOT NULL,
  `texto1` varchar(100) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT '',
  `texto2` varchar(100) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT '',
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
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
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `role_id` int UNSIGNED NOT NULL,
  `user_id` int UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 33 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = DYNAMIC;

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
INSERT INTO `role_user` VALUES (35, 6, 73, NULL, NULL, NULL);

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
) ENGINE = InnoDB AUTO_INCREMENT = 27 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = DYNAMIC;

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
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
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
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `categoria_id` bigint NOT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_categ-sub_categ`(`categoria_id`) USING BTREE,
  CONSTRAINT `fk_categ-sub_categ` FOREIGN KEY (`categoria_id`) REFERENCES `categorias` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 17 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = Dynamic;

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
INSERT INTO `sub_categorias` VALUES (14, 'Poleras Hombre', 6, '2022-02-08 00:00:00', '2022-02-08 00:00:00', NULL);
INSERT INTO `sub_categorias` VALUES (15, 'Poleras Mujer', 6, '2022-02-08 00:00:00', '2022-02-08 00:00:00', NULL);
INSERT INTO `sub_categorias` VALUES (16, 'Notebooks', 4, '2022-02-08 00:00:00', '2022-02-08 00:00:00', NULL);
INSERT INTO `sub_categorias` VALUES (17, 'Traje de Baño Mujer', 6, '2022-02-09 00:00:00', '2022-02-09 00:00:00', NULL);

-- ----------------------------
-- Table structure for tallas
-- ----------------------------
DROP TABLE IF EXISTS `tallas`;
CREATE TABLE `tallas`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `talla` varchar(10) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 16 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tallas
-- ----------------------------
INSERT INTO `tallas` VALUES (9, 'M', '2022-02-08 00:00:00', '2022-02-09 00:00:00', NULL);
INSERT INTO `tallas` VALUES (10, '42', '2022-02-08 00:00:00', '2022-02-08 00:00:00', NULL);
INSERT INTO `tallas` VALUES (11, '40', '2022-02-08 00:00:00', '2022-02-08 00:00:00', NULL);
INSERT INTO `tallas` VALUES (12, '41', '2022-02-08 00:00:00', '2022-02-08 00:00:00', NULL);
INSERT INTO `tallas` VALUES (13, 'S', '2022-02-08 00:00:00', '2022-02-09 00:00:00', NULL);
INSERT INTO `tallas` VALUES (14, 'L', '2022-02-08 00:00:00', '2022-02-09 00:00:00', NULL);
INSERT INTO `tallas` VALUES (15, 'XS', '2022-02-08 00:00:00', '2022-02-09 00:00:00', NULL);
INSERT INTO `tallas` VALUES (16, 'XL', '2022-02-09 00:00:00', '2022-02-09 00:00:00', NULL);

-- ----------------------------
-- Table structure for tallas_productos
-- ----------------------------
DROP TABLE IF EXISTS `tallas_productos`;
CREATE TABLE `tallas_productos`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `producto_id` bigint UNSIGNED NOT NULL,
  `talla_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `tallas_producto-producto`(`producto_id`) USING BTREE,
  INDEX `tallas_producto-tallas`(`talla_id`) USING BTREE,
  CONSTRAINT `tallas_producto-producto` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `tallas_producto-tallas` FOREIGN KEY (`talla_id`) REFERENCES `tallas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 89 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tallas_productos
-- ----------------------------
INSERT INTO `tallas_productos` VALUES (7, 70, 11, '2022-02-09 00:00:00', '2022-02-09 00:00:00', NULL);
INSERT INTO `tallas_productos` VALUES (8, 70, 12, '2022-02-09 00:00:00', '2022-02-09 00:00:00', NULL);
INSERT INTO `tallas_productos` VALUES (10, 70, 11, '2022-02-09 00:00:00', '2022-02-09 00:00:00', NULL);
INSERT INTO `tallas_productos` VALUES (11, 70, 12, '2022-02-09 00:00:00', '2022-02-09 00:00:00', NULL);
INSERT INTO `tallas_productos` VALUES (13, 70, 11, '2022-02-09 00:00:00', '2022-02-09 00:00:00', NULL);
INSERT INTO `tallas_productos` VALUES (14, 70, 12, '2022-02-09 00:00:00', '2022-02-09 00:00:00', NULL);
INSERT INTO `tallas_productos` VALUES (16, 70, 11, '2022-02-09 00:00:00', '2022-02-09 00:00:00', NULL);
INSERT INTO `tallas_productos` VALUES (17, 70, 12, '2022-02-09 00:00:00', '2022-02-09 00:00:00', NULL);
INSERT INTO `tallas_productos` VALUES (19, 70, 11, '2022-02-09 00:00:00', '2022-02-09 00:00:00', NULL);
INSERT INTO `tallas_productos` VALUES (20, 70, 12, '2022-02-09 00:00:00', '2022-02-09 00:00:00', NULL);
INSERT INTO `tallas_productos` VALUES (22, 70, 11, '2022-02-09 00:00:00', '2022-02-09 00:00:00', NULL);
INSERT INTO `tallas_productos` VALUES (23, 70, 12, '2022-02-09 00:00:00', '2022-02-09 00:00:00', NULL);
INSERT INTO `tallas_productos` VALUES (25, 70, 11, '2022-02-09 00:00:00', '2022-02-09 00:00:00', NULL);
INSERT INTO `tallas_productos` VALUES (26, 70, 12, '2022-02-09 00:00:00', '2022-02-09 00:00:00', NULL);
INSERT INTO `tallas_productos` VALUES (28, 70, 11, '2022-02-09 00:00:00', '2022-02-09 00:00:00', NULL);
INSERT INTO `tallas_productos` VALUES (29, 70, 12, '2022-02-09 00:00:00', '2022-02-09 00:00:00', NULL);
INSERT INTO `tallas_productos` VALUES (31, 70, 11, '2022-02-09 00:00:00', '2022-02-09 00:00:00', NULL);
INSERT INTO `tallas_productos` VALUES (32, 70, 12, '2022-02-09 00:00:00', '2022-02-09 00:00:00', NULL);
INSERT INTO `tallas_productos` VALUES (34, 70, 11, '2022-02-09 00:00:00', '2022-02-09 00:00:00', NULL);
INSERT INTO `tallas_productos` VALUES (35, 70, 12, '2022-02-09 00:00:00', '2022-02-09 00:00:00', NULL);
INSERT INTO `tallas_productos` VALUES (37, 70, 11, '2022-02-09 00:00:00', '2022-02-09 00:00:00', NULL);
INSERT INTO `tallas_productos` VALUES (38, 70, 12, '2022-02-09 00:00:00', '2022-02-09 00:00:00', NULL);
INSERT INTO `tallas_productos` VALUES (40, 70, 11, '2022-02-09 00:00:00', '2022-02-09 00:00:00', NULL);
INSERT INTO `tallas_productos` VALUES (41, 70, 12, '2022-02-09 00:00:00', '2022-02-09 00:00:00', NULL);
INSERT INTO `tallas_productos` VALUES (43, 70, 11, '2022-02-09 00:00:00', '2022-02-09 00:00:00', NULL);
INSERT INTO `tallas_productos` VALUES (44, 70, 12, '2022-02-09 00:00:00', '2022-02-09 00:00:00', NULL);
INSERT INTO `tallas_productos` VALUES (46, 70, 11, '2022-02-09 00:00:00', '2022-02-09 00:00:00', NULL);
INSERT INTO `tallas_productos` VALUES (47, 70, 12, '2022-02-09 00:00:00', '2022-02-09 00:00:00', NULL);
INSERT INTO `tallas_productos` VALUES (49, 70, 11, '2022-02-09 00:00:00', '2022-02-09 00:00:00', NULL);
INSERT INTO `tallas_productos` VALUES (50, 70, 12, '2022-02-09 00:00:00', '2022-02-09 00:00:00', NULL);
INSERT INTO `tallas_productos` VALUES (52, 70, 11, '2022-02-09 00:00:00', '2022-02-09 00:00:00', NULL);
INSERT INTO `tallas_productos` VALUES (53, 70, 12, '2022-02-09 00:00:00', '2022-02-09 00:00:00', NULL);
INSERT INTO `tallas_productos` VALUES (55, 70, 11, '2022-02-09 00:00:00', '2022-02-09 00:00:00', NULL);
INSERT INTO `tallas_productos` VALUES (56, 70, 12, '2022-02-09 00:00:00', '2022-02-09 00:00:00', NULL);
INSERT INTO `tallas_productos` VALUES (58, 70, 11, '2022-02-09 00:00:00', '2022-02-09 00:00:00', NULL);
INSERT INTO `tallas_productos` VALUES (59, 70, 12, '2022-02-09 00:00:00', '2022-02-09 00:00:00', NULL);
INSERT INTO `tallas_productos` VALUES (61, 70, 11, '2022-02-09 00:00:00', '2022-02-09 00:00:00', NULL);
INSERT INTO `tallas_productos` VALUES (62, 70, 12, '2022-02-09 00:00:00', '2022-02-09 00:00:00', NULL);
INSERT INTO `tallas_productos` VALUES (64, 70, 11, '2022-02-09 00:00:00', '2022-02-09 00:00:00', NULL);
INSERT INTO `tallas_productos` VALUES (65, 70, 12, '2022-02-09 00:00:00', '2022-02-09 00:00:00', NULL);
INSERT INTO `tallas_productos` VALUES (67, 70, 11, '2022-02-09 00:00:00', '2022-02-09 00:00:00', NULL);
INSERT INTO `tallas_productos` VALUES (68, 70, 12, '2022-02-09 00:00:00', '2022-02-09 00:00:00', NULL);
INSERT INTO `tallas_productos` VALUES (70, 70, 11, '2022-02-09 00:00:00', '2022-02-09 00:00:00', NULL);
INSERT INTO `tallas_productos` VALUES (71, 70, 12, '2022-02-09 00:00:00', '2022-02-09 00:00:00', NULL);
INSERT INTO `tallas_productos` VALUES (73, 70, 11, '2022-02-09 00:00:00', '2022-02-09 00:00:00', NULL);
INSERT INTO `tallas_productos` VALUES (74, 70, 12, '2022-02-09 00:00:00', '2022-02-09 00:00:00', NULL);
INSERT INTO `tallas_productos` VALUES (76, 70, 11, '2022-02-09 00:00:00', '2022-02-09 00:00:00', NULL);
INSERT INTO `tallas_productos` VALUES (77, 70, 12, '2022-02-09 00:00:00', '2022-02-09 00:00:00', NULL);
INSERT INTO `tallas_productos` VALUES (79, 70, 11, '2022-02-09 00:00:00', '2022-02-09 00:00:00', NULL);
INSERT INTO `tallas_productos` VALUES (80, 70, 12, '2022-02-09 00:00:00', '2022-02-09 00:00:00', NULL);
INSERT INTO `tallas_productos` VALUES (82, 70, 11, '2022-02-09 00:00:00', '2022-02-09 00:00:00', NULL);
INSERT INTO `tallas_productos` VALUES (83, 70, 12, '2022-02-09 00:00:00', '2022-02-09 00:00:00', NULL);
INSERT INTO `tallas_productos` VALUES (85, 70, 11, '2022-02-09 00:00:00', '2022-02-09 00:00:00', NULL);
INSERT INTO `tallas_productos` VALUES (86, 70, 12, '2022-02-09 00:00:00', '2022-02-09 00:00:00', NULL);
INSERT INTO `tallas_productos` VALUES (88, 80, 9, '2022-02-09 00:00:00', '2022-02-09 00:00:00', NULL);
INSERT INTO `tallas_productos` VALUES (89, 80, 14, '2022-02-09 00:00:00', '2022-02-09 00:00:00', NULL);

-- ----------------------------
-- Table structure for tallas_subcategorias
-- ----------------------------
DROP TABLE IF EXISTS `tallas_subcategorias`;
CREATE TABLE `tallas_subcategorias`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `tallas_id` bigint UNSIGNED NOT NULL,
  `sub_categorias_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `tallas_subcategorias-tallas`(`tallas_id`) USING BTREE,
  INDEX `tallas_subcategorias-subcategorias`(`sub_categorias_id`) USING BTREE,
  CONSTRAINT `tallas_subcategorias-subcategorias` FOREIGN KEY (`sub_categorias_id`) REFERENCES `sub_categorias` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `tallas_subcategorias-tallas` FOREIGN KEY (`tallas_id`) REFERENCES `tallas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 247 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tallas_subcategorias
-- ----------------------------
INSERT INTO `tallas_subcategorias` VALUES (3, 9, 14, '2022-02-08 00:00:00', '2022-02-08 00:00:00', NULL);
INSERT INTO `tallas_subcategorias` VALUES (4, 9, 15, '2022-02-08 00:00:00', '2022-02-08 00:00:00', NULL);
INSERT INTO `tallas_subcategorias` VALUES (5, 10, 5, '2022-02-08 00:00:00', '2022-02-08 00:00:00', NULL);
INSERT INTO `tallas_subcategorias` VALUES (6, 11, 5, '2022-02-08 00:00:00', '2022-02-08 00:00:00', NULL);
INSERT INTO `tallas_subcategorias` VALUES (7, 12, 5, '2022-02-08 00:00:00', '2022-02-08 00:00:00', NULL);
INSERT INTO `tallas_subcategorias` VALUES (8, 13, 14, '2022-02-08 00:00:00', '2022-02-08 00:00:00', NULL);
INSERT INTO `tallas_subcategorias` VALUES (9, 13, 15, '2022-02-08 00:00:00', '2022-02-08 00:00:00', NULL);
INSERT INTO `tallas_subcategorias` VALUES (10, 14, 14, '2022-02-08 00:00:00', '2022-02-08 00:00:00', NULL);
INSERT INTO `tallas_subcategorias` VALUES (11, 14, 15, '2022-02-08 00:00:00', '2022-02-08 00:00:00', NULL);
INSERT INTO `tallas_subcategorias` VALUES (124, 9, 17, '2022-02-09 00:00:00', '2022-02-09 00:00:00', NULL);
INSERT INTO `tallas_subcategorias` VALUES (125, 15, 14, '2022-02-09 00:00:00', '2022-02-09 00:00:00', NULL);
INSERT INTO `tallas_subcategorias` VALUES (126, 15, 15, '2022-02-09 00:00:00', '2022-02-09 00:00:00', NULL);
INSERT INTO `tallas_subcategorias` VALUES (244, 14, 17, '2022-02-09 00:00:00', '2022-02-09 00:00:00', NULL);
INSERT INTO `tallas_subcategorias` VALUES (245, 16, 14, '2022-02-09 00:00:00', '2022-02-09 00:00:00', NULL);
INSERT INTO `tallas_subcategorias` VALUES (246, 16, 15, '2022-02-09 00:00:00', '2022-02-09 00:00:00', NULL);
INSERT INTO `tallas_subcategorias` VALUES (247, 16, 17, '2022-02-09 00:00:00', '2022-02-09 00:00:00', NULL);

-- ----------------------------
-- Table structure for tienda
-- ----------------------------
DROP TABLE IF EXISTS `tienda`;
CREATE TABLE `tienda`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `nombre_tienda` varchar(100) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `fono_venta` varchar(30) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `email` varchar(150) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `direccion` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tienda
-- ----------------------------
INSERT INTO `tienda` VALUES (1, 'Marcelo Market 2', '+56 1 987654321', 'bravomarcelo@hotmail.es', '12 Norte 16 Oriente # 1234', '2021-07-06 00:00:00', '2021-11-10 00:00:00');

-- ----------------------------
-- Table structure for tipos_de_pago
-- ----------------------------
DROP TABLE IF EXISTS `tipos_de_pago`;
CREATE TABLE `tipos_de_pago`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `codigo` varchar(10) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL COMMENT 'Código definido por WebPay',
  `nombre` varchar(50) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL COMMENT 'Nombre de la forma de pago ',
  `descripcion` varchar(400) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
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
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `nombre_plural` varchar(50) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL DEFAULT '',
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
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
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
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
) ENGINE = InnoDB AUTO_INCREMENT = 71 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, 'Marcelo', 'mabc@live.cl', NULL, '$2b$10$q1ZwYwzfy2QlUzY2fTuLCuZvOJRyQrHmIVMVNMIOIlHAXdj6zliYG', NULL, '2020-11-22 00:00:00', '2021-06-15 00:00:00', NULL, 'Bravo', 'Castillo', '12 Norte 16 Oriente, #2288, Talca', 'Mi Avatar.jpg', '987654321');
INSERT INTO `users` VALUES (19, 'Valeria', 'prueba@ejemplo.cl', NULL, '$2b$10$BCo6PZMKbxA/3ROLBo7D1uynIWQ/7GO6LQdk0qez0k9VZhmilWur.', NULL, '2021-01-22 21:47:01', '2021-05-26 00:00:00', NULL, 'Maza', 'sozza', '12 Norte 123', 'descarga.png', '');
INSERT INTO `users` VALUES (30, 'Marcelo Antonio', 'marcelo.a.bravo.c@gmail.cl', NULL, '$2b$10$66WGQByMZWmVkOtRin00eOGUlw2BKuWu5/nS2Gm.fDEGH0/otpWLi', NULL, '2021-05-05 01:13:57', '2021-06-27 00:00:00', NULL, 'Bravo', 'Castillo', '12 Norte #123', 'FB_IMG_1619323830505.jpg', '');
INSERT INTO `users` VALUES (62, 'Mariela Andrea', 'mariela2@ejemplo.cl', NULL, '$2b$10$b.qrq9mTNfYSgdPqC.veQuWXNDHe0OeCrlVHVisek7VtrtlhD5Mf6', NULL, '2021-05-05 01:13:57', '2021-04-08 00:00:00', NULL, 'Bezoain', 'Bravo', '12 Norte #123', 'fgfgfgfgfgf', '');
INSERT INTO `users` VALUES (71, 'wawawaawa', 'prueba2@ejemplo.cl', NULL, '$2b$10$4vk0/hohwXVdCxkC039iju7eJT9poh.5jR86Ed9mzHqGkXNdAGl42', NULL, '2021-06-07 00:00:00', '2021-06-07 00:00:00', '2021-06-07 00:00:00', 'esesesesesese vvgvgvv', 'drdrdrdrdrd', 'tftftftftftftftft', NULL, '6676767676767');
INSERT INTO `users` VALUES (73, 'Pedro', 'prueba3@ejemplo3.cl', NULL, '$2b$10$GCW/XjHJigALbEmLs10M4ue.DCIJvyK92/tssMEdnY0RHFCG4YHTG', NULL, '2022-05-08 00:00:00', '2022-05-08 00:00:00', NULL, 'Perez', 'Pereira', '1 Sur 3 poniente, sin número', '', '0987654321');

-- ----------------------------
-- Table structure for ventas
-- ----------------------------
DROP TABLE IF EXISTS `ventas`;
CREATE TABLE `ventas`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `fecha_venta_tienda` timestamp NOT NULL,
  `total` bigint NOT NULL,
  `fecha_anulacion` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 618 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of ventas
-- ----------------------------
INSERT INTO `ventas` VALUES (612, '2022-02-07 00:00:00', 68996, NULL, '2022-02-07 00:00:00', '2022-02-07 00:00:00', NULL);
INSERT INTO `ventas` VALUES (613, '2022-02-10 00:00:00', 33320, NULL, '2022-02-10 00:00:00', '2022-02-10 00:00:00', NULL);
INSERT INTO `ventas` VALUES (614, '2022-02-10 00:00:00', 33320, NULL, '2022-02-10 00:00:00', '2022-02-10 00:00:00', NULL);
INSERT INTO `ventas` VALUES (615, '2022-02-10 00:00:00', 33320, NULL, '2022-02-10 00:00:00', '2022-02-10 00:00:00', NULL);
INSERT INTO `ventas` VALUES (616, '2022-02-10 00:00:00', 33320, NULL, '2022-02-10 00:00:00', '2022-02-10 00:00:00', NULL);
INSERT INTO `ventas` VALUES (617, '2022-02-10 00:00:00', 33320, NULL, '2022-02-10 00:00:00', '2022-02-10 00:00:00', NULL);
INSERT INTO `ventas` VALUES (618, '2022-02-10 00:00:00', 33320, NULL, '2022-02-10 00:00:00', '2022-02-10 00:00:00', NULL);

-- ----------------------------
-- Table structure for ventas_clientes
-- ----------------------------
DROP TABLE IF EXISTS `ventas_clientes`;
CREATE TABLE `ventas_clientes`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `venta_id` bigint UNSIGNED NOT NULL,
  `cliente_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `ventas-ventas_clientes`(`venta_id`) USING BTREE,
  INDEX `ventas-clientes`(`cliente_id`) USING BTREE,
  CONSTRAINT `ventas-clientes` FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ventas-ventas_clientes` FOREIGN KEY (`venta_id`) REFERENCES `ventas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 602 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of ventas_clientes
-- ----------------------------
INSERT INTO `ventas_clientes` VALUES (596, 612, 2, '2022-02-07 00:00:00', '2022-02-07 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (597, 613, 2, '2022-02-10 00:00:00', '2022-02-10 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (598, 614, 2, '2022-02-10 00:00:00', '2022-02-10 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (599, 615, 2, '2022-02-10 00:00:00', '2022-02-10 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (600, 616, 2, '2022-02-10 00:00:00', '2022-02-10 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (601, 617, 2, '2022-02-10 00:00:00', '2022-02-10 00:00:00', NULL);
INSERT INTO `ventas_clientes` VALUES (602, 618, 2, '2022-02-10 00:00:00', '2022-02-10 00:00:00', NULL);

-- ----------------------------
-- Table structure for ventas_clientes_sin_registrar
-- ----------------------------
DROP TABLE IF EXISTS `ventas_clientes_sin_registrar`;
CREATE TABLE `ventas_clientes_sin_registrar`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `venta_id` bigint UNSIGNED NOT NULL,
  `rut` varchar(13) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `nombres` varchar(50) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `apellido1` varchar(50) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `apellido2` varchar(50) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL,
  `fono` varchar(20) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `ventas-ventas_clientes_sin_registrar`(`venta_id`) USING BTREE,
  CONSTRAINT `ventas-ventas_clientes_sin_registrar` FOREIGN KEY (`venta_id`) REFERENCES `ventas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of ventas_clientes_sin_registrar
-- ----------------------------

-- ----------------------------
-- Table structure for ventas_webpay
-- ----------------------------
DROP TABLE IF EXISTS `ventas_webpay`;
CREATE TABLE `ventas_webpay`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `venta_id` bigint UNSIGNED NOT NULL,
  `vci` varchar(10) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL,
  `amount` int NOT NULL COMMENT 'monto',
  `buy_order` varchar(15) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL COMMENT 'número de orden de compra',
  `status` varchar(15) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL COMMENT 'estado',
  `session_id` varchar(15) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL COMMENT 'codigo sessión webpay',
  `card_number` varchar(20) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL,
  `card_detail` varchar(300) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL COMMENT 'JSON con el detalle de la tarjeta',
  `accounting_date` varchar(10) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL COMMENT 'Fecha contable',
  `transaction_date` varchar(30) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL COMMENT 'Fecha del servidor de webpay',
  `authorization_code` varchar(15) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL,
  `payment_type_code` varchar(10) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL COMMENT 'tipo de pago',
  `response_code` int NULL DEFAULT NULL,
  `installments_number` int NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `ventas-ventas_webpay`(`venta_id`) USING BTREE,
  CONSTRAINT `ventas-ventas_webpay` FOREIGN KEY (`venta_id`) REFERENCES `ventas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 558 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of ventas_webpay
-- ----------------------------
INSERT INTO `ventas_webpay` VALUES (552, 612, 'TSY', 68996, '1572', 'AUTHORIZED', '13440', '7763', '1', '0207', '2022-02-07T17:04:58.210Z', '1415', 'VD', 0, 0, '2022-02-07 00:00:00', '2022-02-07 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (553, 613, 'TSY', 33320, '6912', 'AUTHORIZED', '18595', '7763', '1', '0210', '2022-02-10T16:07:34.848Z', '1415', 'VD', 0, 0, '2022-02-10 00:00:00', '2022-02-10 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (554, 614, 'TSY', 33320, '9958', 'AUTHORIZED', '19200', '7763', '1', '0210', '2022-02-10T16:25:54.126Z', '1415', 'VD', 0, 0, '2022-02-10 00:00:00', '2022-02-10 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (555, 615, 'TSY', 33320, '9958', 'AUTHORIZED', '19200', '7763', '1', '0210', '2022-02-10T16:25:54.126Z', '1415', 'VD', 0, 0, '2022-02-10 00:00:00', '2022-02-10 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (556, 616, 'TSY', 33320, '9958', 'AUTHORIZED', '19200', '7763', '1', '0210', '2022-02-10T16:25:54.126Z', '1415', 'VD', 0, 0, '2022-02-10 00:00:00', '2022-02-10 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (557, 617, 'TSY', 33320, '9958', 'AUTHORIZED', '19200', '7763', '1', '0210', '2022-02-10T16:25:54.126Z', '1415', 'VD', 0, 0, '2022-02-10 00:00:00', '2022-02-10 00:00:00', NULL);
INSERT INTO `ventas_webpay` VALUES (558, 618, 'TSY', 33320, '6194', 'AUTHORIZED', '11542', '7763', '1', '0210', '2022-02-10T16:38:45.800Z', '1415', 'VD', 0, 0, '2022-02-10 00:00:00', '2022-02-10 00:00:00', NULL);

SET FOREIGN_KEY_CHECKS = 1;
