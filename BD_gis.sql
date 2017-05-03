-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         5.7.17-log - MySQL Community Server (GPL)
-- SO del servidor:              Win64
-- HeidiSQL Versión:             9.4.0.5125
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Volcando estructura de base de datos para usuario
CREATE DATABASE IF NOT EXISTS `usuario` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `usuario`;

-- Volcando estructura para tabla usuario.barrio
CREATE TABLE IF NOT EXISTS `barrio` (
  `cod_barrio` int(11) NOT NULL,
  `nom_barrio` varchar(50) NOT NULL,
  `cod_comuna` int(11) NOT NULL,
  PRIMARY KEY (`cod_barrio`),
  KEY `cod_comuna` (`cod_comuna`),
  CONSTRAINT `cod_comuna` FOREIGN KEY (`cod_comuna`) REFERENCES `comuna` (`cod_comuna`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- La exportación de datos fue deseleccionada.
-- Volcando estructura para tabla usuario.comuna
CREATE TABLE IF NOT EXISTS `comuna` (
  `cod_comuna` int(11) NOT NULL,
  `nom_comuna` varchar(50) NOT NULL,
  PRIMARY KEY (`cod_comuna`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- La exportación de datos fue deseleccionada.
-- Volcando estructura para tabla usuario.inmueble
CREATE TABLE IF NOT EXISTS `inmueble` (
  `cod_inmueble` int(11) NOT NULL,
  `estado` varchar(50) NOT NULL,
  `tipo_inmueble` int(11) NOT NULL,
  `habitaciones` int(11) NOT NULL,
  `baños` int(11) NOT NULL,
  `barrio` int(11) NOT NULL,
  `latitud` double NOT NULL,
  `longitud` double NOT NULL,
  PRIMARY KEY (`cod_inmueble`),
  KEY `barrio` (`barrio`),
  KEY `tipo_inmueble` (`tipo_inmueble`),
  CONSTRAINT `barrio` FOREIGN KEY (`barrio`) REFERENCES `barrio` (`cod_barrio`),
  CONSTRAINT `tipo_inmueble` FOREIGN KEY (`tipo_inmueble`) REFERENCES `tipo_inmueble` (`cod_tipo_inmueble`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- La exportación de datos fue deseleccionada.
-- Volcando estructura para tabla usuario.tipo_inmueble
CREATE TABLE IF NOT EXISTS `tipo_inmueble` (
  `cod_tipo_inmueble` int(11) NOT NULL,
  `nom_tipo_usuario` varchar(50) NOT NULL,
  PRIMARY KEY (`cod_tipo_inmueble`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- La exportación de datos fue deseleccionada.
-- Volcando estructura para tabla usuario.tipo_usuario
CREATE TABLE IF NOT EXISTS `tipo_usuario` (
  `roll` varchar(40) NOT NULL,
  `id_Tipo` int(11) NOT NULL,
  PRIMARY KEY (`id_Tipo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- La exportación de datos fue deseleccionada.
-- Volcando estructura para tabla usuario.usuario
CREATE TABLE IF NOT EXISTS `usuario` (
  `identificacion` int(11) NOT NULL,
  `nombre` varchar(40) NOT NULL,
  `apellido` varchar(40) NOT NULL,
  `usuario` varchar(40) NOT NULL,
  `nacimiento` date NOT NULL,
  `pass` varchar(200) NOT NULL,
  `email` varchar(40) NOT NULL,
  `telefono` double NOT NULL,
  `tipo_usuario` int(11) NOT NULL DEFAULT '2',
  `fecha_registro` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`identificacion`),
  UNIQUE KEY `usuario` (`usuario`),
  KEY `FKtipo_usuario` (`tipo_usuario`),
  CONSTRAINT `FKtipo_usuario` FOREIGN KEY (`tipo_usuario`) REFERENCES `tipo_usuario` (`id_Tipo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- La exportación de datos fue deseleccionada.
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
