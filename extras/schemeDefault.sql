# ************************************************************
# Sequel Pro SQL dump
# Versión 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: sisgedopra.cjukhdrk5wtn.us-east-2.rds.amazonaws.com (MySQL 5.5.5-10.1.34-MariaDB)
# Base de datos: insomnia
# Tiempo de Generación: 2018-12-11 02:03:15 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Volcado de tabla documents
# ------------------------------------------------------------

DROP TABLE IF EXISTS `documents`;

CREATE TABLE `documents` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `creatorId` int(11) unsigned NOT NULL,
  `type` int(11) unsigned NOT NULL,
  `finished` tinyint(1) NOT NULL DEFAULT '0',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `document_creatorId_index` (`creatorId`),
  KEY `FK_document_type` (`type`),
  CONSTRAINT `FK_document_creator` FOREIGN KEY (`creatorId`) REFERENCES `users` (`id`),
  CONSTRAINT `FK_document_type` FOREIGN KEY (`type`) REFERENCES `documentsType` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;



# Volcado de tabla documentsType
# ------------------------------------------------------------

DROP TABLE IF EXISTS `documentsType`;

CREATE TABLE `documentsType` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

LOCK TABLES `documentsType` WRITE;
/*!40000 ALTER TABLE `documentsType` DISABLE KEYS */;

INSERT INTO `documentsType` (`id`, `name`)
VALUES
	(1,'letter');

/*!40000 ALTER TABLE `documentsType` ENABLE KEYS */;
UNLOCK TABLES;


# Volcado de tabla transfers
# ------------------------------------------------------------

DROP TABLE IF EXISTS `transfers`;

CREATE TABLE `transfers` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `documentId` int(11) unsigned NOT NULL,
  `userIdFrom` int(11) unsigned NOT NULL,
  `userIdTo` int(11) unsigned NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `approved` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `FK_transferDocument_documentId` (`documentId`),
  KEY `FK_transferFrom_userId` (`userIdFrom`),
  KEY `FK_transferTo_userId` (`userIdTo`),
  CONSTRAINT `FK_transferDocument_documentId` FOREIGN KEY (`documentId`) REFERENCES `documents` (`id`),
  CONSTRAINT `FK_transferFrom_userId` FOREIGN KEY (`userIdFrom`) REFERENCES `users` (`id`),
  CONSTRAINT `FK_transferTo_userId` FOREIGN KEY (`userIdTo`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;



# Volcado de tabla users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `lastName` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `dni` int(11) NOT NULL,
  `dniValidator` char(1) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
