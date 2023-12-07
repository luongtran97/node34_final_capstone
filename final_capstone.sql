/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE TABLE `Banner` (
  `ma_banner` int NOT NULL AUTO_INCREMENT,
  `hinh_anh` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ma_phim` int DEFAULT NULL,
  PRIMARY KEY (`ma_banner`),
  KEY `ma_phim` (`ma_phim`),
  CONSTRAINT `Banner_ibfk_1` FOREIGN KEY (`ma_phim`) REFERENCES `Phim` (`ma_phim`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `CumRap` (
  `ma_cum_rap` int NOT NULL AUTO_INCREMENT,
  `ten_cum_rap` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `dia_chi` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ma_he_thong_rap` int DEFAULT NULL,
  PRIMARY KEY (`ma_cum_rap`),
  KEY `ma_he_thong_rap` (`ma_he_thong_rap`),
  CONSTRAINT `CumRap_ibfk_1` FOREIGN KEY (`ma_he_thong_rap`) REFERENCES `HeThongRap` (`ma_he_thong_rap`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `DatVe` (
  `tai_khoan` int DEFAULT NULL,
  `ma_lich_chieu` int DEFAULT NULL,
  `ma_ghe` int DEFAULT NULL,
  `ma_dat_ve` int NOT NULL AUTO_INCREMENT,
  `tinh_trang` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`ma_dat_ve`),
  KEY `tai_khoan` (`tai_khoan`),
  KEY `ma_lich_chieu` (`ma_lich_chieu`),
  KEY `ma_ghe` (`ma_ghe`),
  CONSTRAINT `DatVe_ibfk_1` FOREIGN KEY (`tai_khoan`) REFERENCES `NguoiDung` (`id_nguoi_dung`),
  CONSTRAINT `DatVe_ibfk_2` FOREIGN KEY (`ma_lich_chieu`) REFERENCES `LichChieu` (`ma_lich_chieu`),
  CONSTRAINT `DatVe_ibfk_3` FOREIGN KEY (`ma_ghe`) REFERENCES `Ghe` (`ma_ghe`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Ghe` (
  `ma_ghe` int NOT NULL AUTO_INCREMENT,
  `ten_ghe` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `loai_ghe` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ma_rap` int DEFAULT NULL,
  PRIMARY KEY (`ma_ghe`),
  KEY `ma_rap` (`ma_rap`),
  CONSTRAINT `Ghe_ibfk_1` FOREIGN KEY (`ma_rap`) REFERENCES `RapPhim` (`ma_rap`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `HeThongRap` (
  `ma_he_thong_rap` int NOT NULL AUTO_INCREMENT,
  `ten_he_thong_rap` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `logo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`ma_he_thong_rap`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `LichChieu` (
  `ma_lich_chieu` int NOT NULL AUTO_INCREMENT,
  `ma_rap` int DEFAULT NULL,
  `ma_phim` int DEFAULT NULL,
  `ngay_gio_chieu` datetime DEFAULT NULL,
  `gia_ve` int DEFAULT NULL,
  PRIMARY KEY (`ma_lich_chieu`),
  KEY `ma_phim` (`ma_phim`),
  KEY `ma_rap` (`ma_rap`),
  CONSTRAINT `LichChieu_ibfk_1` FOREIGN KEY (`ma_rap`) REFERENCES `RapPhim` (`ma_rap`),
  CONSTRAINT `LichChieu_ibfk_2` FOREIGN KEY (`ma_phim`) REFERENCES `Phim` (`ma_phim`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `NguoiDung` (
  `id_nguoi_dung` int NOT NULL AUTO_INCREMENT,
  `tai_khoan` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `ho_ten` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `so_dt` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mat_khau` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `loai_nguoi_dung` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id_nguoi_dung`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `Phim` (
  `ma_phim` int NOT NULL AUTO_INCREMENT,
  `ten_phim` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `trailer` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hinh_anh` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mo_ta` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ngay_khoi_chieu` date DEFAULT NULL,
  `danh_gia` int DEFAULT NULL,
  `hot` tinyint(1) DEFAULT NULL,
  `dang_chieu` tinyint(1) DEFAULT NULL,
  `sap_chieu` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`ma_phim`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `RapPhim` (
  `ma_rap` int NOT NULL AUTO_INCREMENT,
  `ten_rap` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ma_cum_rap` int DEFAULT NULL,
  PRIMARY KEY (`ma_rap`),
  KEY `ma_cum_rap` (`ma_cum_rap`),
  CONSTRAINT `RapPhim_ibfk_1` FOREIGN KEY (`ma_cum_rap`) REFERENCES `CumRap` (`ma_cum_rap`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `Banner` (`ma_banner`, `hinh_anh`, `ma_phim`) VALUES
(1, '1701858538074_erd .png', 1);
INSERT INTO `Banner` (`ma_banner`, `hinh_anh`, `ma_phim`) VALUES
(3, '1700562414706_meo.jpg', 2);
INSERT INTO `Banner` (`ma_banner`, `hinh_anh`, `ma_phim`) VALUES
(5, '1700562414706_meo.jpg', 3);
INSERT INTO `Banner` (`ma_banner`, `hinh_anh`, `ma_phim`) VALUES
(6, '1700562414706_meo.jpg', 4);

INSERT INTO `CumRap` (`ma_cum_rap`, `ten_cum_rap`, `dia_chi`, `ma_he_thong_rap`) VALUES
(1, 'BHD Star Cineplex - 3/2', 'L5-Vincom 3/2, 3C Đường 3/2, Q.10', 1);
INSERT INTO `CumRap` (`ma_cum_rap`, `ten_cum_rap`, `dia_chi`, `ma_he_thong_rap`) VALUES
(2, 'BHD Star Cineplex - Bitexco', 'L3-Bitexco Icon 68, 2 Hải Triều, Q.1', 1);
INSERT INTO `CumRap` (`ma_cum_rap`, `ten_cum_rap`, `dia_chi`, `ma_he_thong_rap`) VALUES
(3, 'BHD Star Cineplex - Phạm Hùng', 'L4-Satra Phạm Hùng, C6/27 Phạm Hùng, Bình Chánh', 1);
INSERT INTO `CumRap` (`ma_cum_rap`, `ten_cum_rap`, `dia_chi`, `ma_he_thong_rap`) VALUES
(4, 'BHD Star Cineplex - Vincom Lê Văn Việt', 'L4-Vincom Plaza, 50 Lê Văn Việt, Q.9', 1),
(5, 'BHD Star Cineplex - Vincom Quang Trun', 'B1-Vincom QT, 190 Quang Trung, Gò Vấp', 1),
(6, 'BHD Star Cineplex - Vincom Thảo Điền', 'L5-Megamall, 159 XL Hà Nội, Q.2', 1),
(7, 'CGV - Aeon Bình Tân', 'Tầng 3, TTTM Aeon Mall Bình Tân, Số 1 đường số 17A, khu phố 11, Bình Trị Đông B, Bình Tân', 5),
(8, 'CGV - Aeon Tân Phú', '30 Bờ Bao Tân Thắng, Sơn Kỳ, Tân Phú', 5),
(9, 'CGV - CGV Saigonres Nguyễn Xí', 'Tầng 4-5, Saigonres Plaza, 79/81 Nguyễn Xí, P. 26, Bình Thạnh', 5),
(10, 'CGV - Crescent Mall', 'Lầu 5, Crescent Mall, Đại lộ Nguyễn Văn Linh, Phú Mỹ Hưng, Q. 7', 5),
(11, 'CGV - CT Plaza', '60A Trường Sơn,P. 2, Tân Bình', 5),
(12, 'CGV - Golden Plaza', 'Tầng 4, Trung tâm thương mại Golden Plaza, 922 Nguyễn Trãi, P. 14, Q. 5', 5),
(13, 'CGV - Hoàng Văn Thụ', 'Tầng 1 và 2 Gala Center, 415 Hoàng Văn Thụ, P. 2, Tân Bình', 5),
(14, 'CGV - Hùng Vương Plaza', 'Lầu 7, 126 Hùng Vương, Q. 5', 5),
(15, 'GLX - Huỳnh Tấn Phát', '1362 Huỳnh Tấn Phát, KP1, Phú Mỹ, Q. 7', 2),
(16, 'GLX - Kinh Dương Vương', '718bis Kinh Dương Vương, Q.', 2),
(17, 'GLX - Nguyễn Du', '116 Nguyễn Du, Q.1', 2),
(18, 'GLX - Nguyễn Văn Quá', '119B Nguyễn Văn Quá, Đông Hưng Thuận, Q.12, TPHCM', 2),
(19, 'GLX - Phạm Văn Chí', 'Lầu 5, TTTM Platinum Plaza, 634 Phạm Văn Chí, Q.6', 2),
(20, 'GLX - Quang Trung', 'L3-Co.opmart Foodcosa, 304A Quang Trung, Gò Vấp', 2),
(21, 'GLX - Tân Bình', '246 Nguyễn Hồng Đào, Tân Bình', 2),
(22, 'Lotte - Cantavil', 'L7-Cantavil Premier, Xa Lộ Hà Nội, Q.2', 3),
(23, 'Lotte - Cộng Hòa', 'L4-Pico Plaza, 20 Cộng Hòa, Tân Bình', 3),
(24, 'Lotte - Diamond', 'L13-Diamond Plaza, 34 Lê Duẩn, Q.1', 3),
(25, 'Lotte - Gò Vấp', 'L3-Lotte Mart, 242 Nguyễn Văn Lượng, Gò Vấp', 3),
(26, 'Lotte - Nam Sài Gòn', 'L3-Lotte Mart NSG, 469 Nguyễn Hữu Thọ, Q.7', 3),
(27, 'Lotte - Nowzone', 'L5-Nowzone, 235 Nguyễn Văn Cừ, Q.1', 3),
(28, 'Lotte - Phú Thọ', 'L4-Lotte Mart Phú Thọ, Q.11', 3),
(29, 'MegaGS - Cao Thắng', '19 Cao Thắng, Q.3', 4);

INSERT INTO `DatVe` (`tai_khoan`, `ma_lich_chieu`, `ma_ghe`, `ma_dat_ve`, `tinh_trang`) VALUES
(4, 1, 1, 8, 0);
INSERT INTO `DatVe` (`tai_khoan`, `ma_lich_chieu`, `ma_ghe`, `ma_dat_ve`, `tinh_trang`) VALUES
(1, 2, 1, 11, 1);
INSERT INTO `DatVe` (`tai_khoan`, `ma_lich_chieu`, `ma_ghe`, `ma_dat_ve`, `tinh_trang`) VALUES
(1, 2, 2, 12, 1);
INSERT INTO `DatVe` (`tai_khoan`, `ma_lich_chieu`, `ma_ghe`, `ma_dat_ve`, `tinh_trang`) VALUES
(2, 1, 1, 13, 0);

INSERT INTO `Ghe` (`ma_ghe`, `ten_ghe`, `loai_ghe`, `ma_rap`) VALUES
(1, 'A1', 'thuong', 1);
INSERT INTO `Ghe` (`ma_ghe`, `ten_ghe`, `loai_ghe`, `ma_rap`) VALUES
(2, 'A2', 'thuong', 1);
INSERT INTO `Ghe` (`ma_ghe`, `ten_ghe`, `loai_ghe`, `ma_rap`) VALUES
(3, 'A3', 'vip', 1);
INSERT INTO `Ghe` (`ma_ghe`, `ten_ghe`, `loai_ghe`, `ma_rap`) VALUES
(4, 'A4', 'vip', 1),
(5, 'A5', 'vip', 1),
(6, 'A6', 'vip', 1),
(7, 'A7', 'vip', 1),
(8, 'A8', 'vip', 1),
(9, 'A9', 'vip', 1),
(10, 'A10', 'vip', 1),
(11, 'B1', 'thuong', 1),
(12, 'B2', 'thuong', 1),
(13, 'B3', 'thuong', 1),
(14, 'B4', 'thuong', 1),
(15, 'B5', 'thuong', 1),
(16, 'B6', 'thuong', 1),
(17, 'A1', 'thuong', 2),
(18, 'A2', 'thuong', 2),
(19, 'A3', 'vip', 2),
(20, 'A4', 'vip', 2),
(21, 'A5', 'vip', 2),
(22, 'A6', 'vip', 2),
(23, 'A7', 'vip', 2),
(24, 'A8', 'vip', 2),
(25, 'A9', 'vip', 2),
(26, 'A10', 'vip', 2),
(27, 'B1', 'thuong', 2),
(28, 'B2', 'thuong', 2),
(29, 'B3', 'thuong', 2),
(30, 'B4', 'thuong', 2),
(31, 'B5', 'thuong', 2),
(32, 'B6', 'thuong', 2),
(33, 'A1', 'thuong', 3),
(34, 'A2', 'thuong', 3),
(35, 'A3', 'vip', 3),
(36, 'A4', 'vip', 3),
(37, 'A5', 'vip', 3),
(38, 'A6', 'vip', 3),
(39, 'A7', 'vip', 3),
(40, 'A8', 'vip', 3),
(41, 'A9', 'vip', 3),
(42, 'A10', 'vip', 3),
(43, 'B1', 'thuong', 3),
(44, 'B2', 'thuong', 3),
(45, 'B3', 'thuong', 3),
(46, 'B4', 'thuong', 3),
(47, 'B5', 'thuong', 3),
(48, 'B6', 'thuong', 3),
(49, 'A1', 'vip', 4),
(50, 'A2', 'thuong', 4),
(51, 'A6', 'thuong', 4);

INSERT INTO `HeThongRap` (`ma_he_thong_rap`, `ten_he_thong_rap`, `logo`) VALUES
(1, 'BHD Star Cineplex', NULL);
INSERT INTO `HeThongRap` (`ma_he_thong_rap`, `ten_he_thong_rap`, `logo`) VALUES
(2, 'Galaxy', '1700563253706_fb.jpg');
INSERT INTO `HeThongRap` (`ma_he_thong_rap`, `ten_he_thong_rap`, `logo`) VALUES
(3, 'LotteCinima', NULL);
INSERT INTO `HeThongRap` (`ma_he_thong_rap`, `ten_he_thong_rap`, `logo`) VALUES
(4, 'MegaGS', NULL),
(5, 'CGV', NULL),
(7, 'CinemaDX', '1701873937912_meo.jpg');

INSERT INTO `LichChieu` (`ma_lich_chieu`, `ma_rap`, `ma_phim`, `ngay_gio_chieu`, `gia_ve`) VALUES
(1, 1, 1, '2019-01-02 14:10:00', 75000);
INSERT INTO `LichChieu` (`ma_lich_chieu`, `ma_rap`, `ma_phim`, `ngay_gio_chieu`, `gia_ve`) VALUES
(2, 1, 2, '2019-01-02 14:10:00', 75000);
INSERT INTO `LichChieu` (`ma_lich_chieu`, `ma_rap`, `ma_phim`, `ngay_gio_chieu`, `gia_ve`) VALUES
(3, 1, 3, '2019-01-02 14:10:00', 75000);
INSERT INTO `LichChieu` (`ma_lich_chieu`, `ma_rap`, `ma_phim`, `ngay_gio_chieu`, `gia_ve`) VALUES
(4, 1, 4, '2019-01-02 14:10:00', 75000),
(5, 1, 5, '2019-01-02 14:10:00', 75000),
(6, 1, 6, '2019-01-02 14:10:00', 75000),
(7, 2, 7, '2019-01-02 14:10:00', 75000),
(8, 2, 8, '2019-01-02 14:10:00', 75000),
(9, 2, 9, '2019-01-02 14:10:00', 75000),
(15, 3, 10, '2019-01-02 14:10:00', 75000),
(16, 4, 10, '2019-01-02 14:10:00', 75000),
(17, 6, 11, '2019-01-02 14:10:00', 75000),
(18, 7, 12, '2019-01-02 14:10:00', 75000);

INSERT INTO `NguoiDung` (`id_nguoi_dung`, `tai_khoan`, `ho_ten`, `email`, `so_dt`, `mat_khau`, `loai_nguoi_dung`) VALUES
(1, 'string', 'abc', 'abc', 'string', '$2b$10$qkSTWPFGuLLSxeTYi1HujOYd0lxyQAzxLtkuVRei102FRk0/AuOf.', 'string');
INSERT INTO `NguoiDung` (`id_nguoi_dung`, `tai_khoan`, `ho_ten`, `email`, `so_dt`, `mat_khau`, `loai_nguoi_dung`) VALUES
(2, 'string', 'string1', 'string2', 'string', '$2b$10$GVBy2Pa0T00z4iQVIJo/.egpGD363iGgYcJopO94Ataa.lZQ9pgI2', 'admin');
INSERT INTO `NguoiDung` (`id_nguoi_dung`, `tai_khoan`, `ho_ten`, `email`, `so_dt`, `mat_khau`, `loai_nguoi_dung`) VALUES
(4, 'string222', 'string', 'string', 'string', '$2b$10$dXsYV1B0EwP2HNFtZeRpYuCeOw8xmHXS.2iRsSiN.S9cHZ81Tjtfy', 'string');
INSERT INTO `NguoiDung` (`id_nguoi_dung`, `tai_khoan`, `ho_ten`, `email`, `so_dt`, `mat_khau`, `loai_nguoi_dung`) VALUES
(6, 'string', 'string', 'stringa', 'string', '$2b$10$PDAkN7vCqB7JXau8lvmpp.fLjc69NxXXAlNGQZOKeaTPnhAJGLfFW', 'string'),
(7, 'admin', 'string', 'admin@gmail.com', 'string', '$2b$10$kd8UbUhPiutNzlsvFzigo.TTgALBYeP3p0Z/2ztWMRmeOH4zkWR8K', 'user'),
(9, 'testing123', 'nguyen van c', 'testting132', 'string', '$2b$10$OyeoQBQwm/3xZ/NCDHWokepbFgjbA7kTQaNk5diDv3ZQEjNwe/IaG', 'user');

INSERT INTO `Phim` (`ma_phim`, `ten_phim`, `trailer`, `hinh_anh`, `mo_ta`, `ngay_khoi_chieu`, `danh_gia`, `hot`, `dang_chieu`, `sap_chieu`) VALUES
(1, 'Black Window', '1701857847846_file.mp4', '1701857831884_erd .png', 'phim hot mua he', '2023-12-06', 0, 1, 1, 1);
INSERT INTO `Phim` (`ma_phim`, `ten_phim`, `trailer`, `hinh_anh`, `mo_ta`, `ngay_khoi_chieu`, `danh_gia`, `hot`, `dang_chieu`, `sap_chieu`) VALUES
(2, 'Lat mat 48h123', NULL, NULL, 'Lat mat 48h123', '2023-11-10', 0, 0, 0, 0);
INSERT INTO `Phim` (`ma_phim`, `ten_phim`, `trailer`, `hinh_anh`, `mo_ta`, `ngay_khoi_chieu`, `danh_gia`, `hot`, `dang_chieu`, `sap_chieu`) VALUES
(3, 'John Wick 2', '', NULL, '', '2023-11-11', 0, 0, 0, 0);
INSERT INTO `Phim` (`ma_phim`, `ten_phim`, `trailer`, `hinh_anh`, `mo_ta`, `ngay_khoi_chieu`, `danh_gia`, `hot`, `dang_chieu`, `sap_chieu`) VALUES
(4, 'Avenger Endgame 2', NULL, NULL, NULL, '2023-11-12', 1, 1, 1, 1),
(5, 'AudioPhile', '', NULL, NULL, '2023-11-13', 0, 0, 0, 0),
(6, 'Cá mập cắn cáp', NULL, NULL, NULL, '2023-11-14', 1, 1, 1, 1),
(7, 'Wrath Of Man - 2', NULL, NULL, NULL, '2023-11-15', 1, 1, 1, 1),
(8, 'Jurassic World 4', NULL, NULL, NULL, '2023-11-16', 1, 1, 1, 1),
(9, 'Mad Max Road', NULL, NULL, NULL, '2023-11-17', 0, 0, 0, 0),
(10, 'Mắt Biếc', NULL, NULL, NULL, '2023-11-18', 1, 1, 1, 1),
(11, 'Chuyến tàu may mắn', NULL, '1701857345552_erd .png', NULL, '2023-11-09', 0, 0, 0, 1),
(12, 'Cuộc sống Mông Cổ', NULL, NULL, NULL, '2023-11-08', 1, 0, 1, 1),
(13, 'Avenger  ', NULL, NULL, NULL, '2023-11-07', 1, 1, 1, 0),
(14, 'Wanted', NULL, NULL, NULL, '2023-11-20', 0, 1, 0, 1),
(15, 'Hobbs and Shaw', NULL, NULL, NULL, '2023-11-21', 0, 1, 0, 1);

INSERT INTO `RapPhim` (`ma_rap`, `ten_rap`, `ma_cum_rap`) VALUES
(1, 'Rap1', 1);
INSERT INTO `RapPhim` (`ma_rap`, `ten_rap`, `ma_cum_rap`) VALUES
(2, 'Rap2', 1);
INSERT INTO `RapPhim` (`ma_rap`, `ten_rap`, `ma_cum_rap`) VALUES
(3, 'Rap3', 1);
INSERT INTO `RapPhim` (`ma_rap`, `ten_rap`, `ma_cum_rap`) VALUES
(4, 'Rap4', 1),
(5, 'Rap5', 1),
(6, 'Rap6', 1),
(7, 'Rap7', 1),
(8, 'Rap8', 1),
(9, 'Rap9', 1),
(10, 'Rap1', 2),
(11, 'Rap2', 2),
(12, 'Rap3', 2),
(13, 'Rap4', 2),
(14, 'Rap5', 2),
(15, 'Rap6', 2),
(16, 'Rap7', 2),
(17, 'Rap8', 2),
(18, 'Rap9', 2),
(19, 'Rap1', 3),
(20, 'Rap2', 3),
(21, 'Rap3', 3),
(22, 'Rap4', 3),
(23, 'Rap5', 3),
(24, 'Rap6', 3),
(25, 'Rap7', 3),
(26, 'Rap8', 3),
(27, 'Rap1', 4),
(28, 'Rap2', 4),
(29, 'Rap3', 4),
(30, 'Rap4', 4),
(31, 'Rap5', 4),
(32, 'Rap6', 4),
(33, 'Rap7', 4),
(34, 'Rap1', 5),
(35, 'Rap2', 5),
(36, 'Rap3', 5),
(37, 'Rap4', 5),
(38, 'Rap5', 5);


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;