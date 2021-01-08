-- MySQL dump 10.13  Distrib 5.5.46, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: PartesAuxiliars
-- ------------------------------------------------------
-- Server version	5.5.46-0ubuntu0.12.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `partes`
--

DROP TABLE IF EXISTS `partes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `partes` (
  `codiParte` int(11) NOT NULL AUTO_INCREMENT,
  `hab` varchar(255) DEFAULT NULL,
  `parte` varchar(255) DEFAULT NULL,
  `idServei` int(11) DEFAULT NULL,
  PRIMARY KEY (`codiParte`),
  KEY `idServei` (`idServei`),
  CONSTRAINT `partes_ibfk_1` FOREIGN KEY (`idServei`) REFERENCES `serveis` (`codiServei`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `partes`
--

LOCK TABLES `partes` WRITE;
/*!40000 ALTER TABLE `partes` DISABLE KEYS */;
INSERT INTO `partes` VALUES (1,'101','sfdf asdf asdf',6),(2,'102','xxxxx xxxx',6),(3,'103','yyyy yy y yyy',6),(4,'104','aixo es una prova',6),(5,'105','prova 2',6),(6,'106','prova 3',6),(7,'107','prova 4',6),(8,'108','prova 5',6),(9,'109','prova 6',6),(10,'110','prova 7',6),(13,'103','prova 3',24),(14,'104','prova 4',24),(16,'106','prova 6',24),(17,'107','prova 7',24),(19,'109','prova 9',24),(20,'110','prova 10',24),(21,'111','prova 11',24),(22,'112','prova 12',24),(24,'101','parte 1',27),(27,'104','parte 4',27),(28,'103','parte 3',27),(29,'101','parte 1',30),(30,'102','parte 2',30),(31,'103','parte 3',30),(32,'104','Parte 4',30),(33,'1','parte numero 1',31),(34,'2','parte numero 2',31);
/*!40000 ALTER TABLE `partes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `serveis`
--

DROP TABLE IF EXISTS `serveis`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `serveis` (
  `codiServei` int(11) NOT NULL AUTO_INCREMENT,
  `data` date DEFAULT NULL,
  `servei` varchar(255) DEFAULT NULL,
  `torn` varchar(255) DEFAULT NULL,
  `auxiliar` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`codiServei`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `serveis`
--

LOCK TABLES `serveis` WRITE;
/*!40000 ALTER TABLE `serveis` DISABLE KEYS */;
INSERT INTO `serveis` VALUES (6,'2017-03-10','UH1','Mati',NULL),(7,'2017-03-10','UH2','Tarda',NULL),(8,'2017-03-10','UH1','Tarda',NULL),(9,'2017-03-10','UH1','Nit',NULL),(10,'2017-03-10','UH2','Mati',NULL),(11,'2017-03-10','UH2','Nit',NULL),(12,'2017-03-10','UH3','Mati',NULL),(13,'2017-03-10','UH3','Tarda',NULL),(14,'2017-03-10','UH3','Nit',NULL),(19,'2017-03-10','UH4','Mati',NULL),(20,'2017-03-10','UH4','Tarda',NULL),(21,'2017-03-10','UH4','Nit',NULL),(22,'2017-03-09','UH1','Mati',NULL),(23,'2017-03-13','UH1','Mati',NULL),(24,'2017-03-17','UH1','Mati','ZZZZZZZZZZ'),(25,'2017-03-17','UH1','Tarda',NULL),(26,'2017-03-17','UH1','Nit',NULL),(27,'2017-03-20','UH1','Mati','pepito de los palotes'),(28,'2017-03-20','UH1','Tarda',NULL),(29,'2017-03-06','UH1','Tarda',NULL),(30,'2017-03-22','UH1','Mati','joana'),(31,'2017-06-20','UH1','Mati','pepita'),(32,'2017-06-19','UH1','Mati',NULL),(33,'2017-06-15','UH1','Mati',NULL),(34,'2017-06-08','UH1','Mati',NULL),(35,'2017-06-05','UH1','Mati',NULL),(36,'2017-06-12','UH1','Mati',NULL),(37,'2017-06-17','UH1','Mati',NULL),(38,'2017-06-23','UH1','Mati',NULL),(39,'2017-06-14','UH1','Mati',NULL),(40,'2017-06-13','UH1','Mati',NULL),(41,'2017-06-29','UH1','Mati','Sandra');
/*!40000 ALTER TABLE `serveis` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-06-20 10:04:42
