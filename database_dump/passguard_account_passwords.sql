-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: passguard
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `account_passwords`
--

DROP TABLE IF EXISTS `account_passwords`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account_passwords` (
  `id` int NOT NULL AUTO_INCREMENT,
  `site_name` varchar(255) NOT NULL,
  `site_url` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `pass` varchar(255) NOT NULL,
  `iv` varchar(255) NOT NULL,
  `default_img` varchar(255) NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `account_passwords_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account_passwords`
--

LOCK TABLES `account_passwords` WRITE;
/*!40000 ALTER TABLE `account_passwords` DISABLE KEYS */;
INSERT INTO `account_passwords` VALUES (1,'Linkedin','linkedin.com','example@gmail.com1','783ba5fe','c7772f0cb46a918d6ce7a4276fdd018d','false',1),(2,'Facebook','facebook.com','example@gmail.com','a208d3c1','b33e3c793e24ccc4660400e08190fcbd','false',1),(3,'Reddit ','reddit.com','example@email.com','afec6370','05454795e82dbc4e4aeb3094bdd1a8ac','false',1),(4,'Spotify','spotify.com','example@email.com','cf7d1c65a84c66d3','11b024827dc8c284916a31af3c404fed','false',1),(5,'Gmail','gmail.com','hello@gmail.com','7c71936c','8647a46a7b5b8c8f143d64fe21ed69ec','false',1),(6,'Amazon','amazon.com','example@gmail.com','700049b7','00f3f0adf5a005b0b6fca3b4002921d5','false',1),(7,'Uber','uber.com','example@gmail.com','b40d5edb','e97b5d9f694dd77310025d7462235ea8','false',1),(8,'Instagram','instragram.com','example@gmail.com','666520b6','58c5d231314e48df5f5c4a814b0f099a','false',1),(9,'Paypal','paypal.com','example@gmail.com','1f062bd5','e777eb94cdf082ca4a1895c55ac3dbe4','false',1),(11,'Newegg','newegg.ca','example@gmail.com','19b66cf7','698a0d6ecb1ec292ae1d2ad70f493ec8','false',1),(15,'youtube','https://www.youtube.com/','jim@gmail.com','c41b10a1ef7a0060','fff99fd730c138268fe1450017853fa6','false',1);
/*!40000 ALTER TABLE `account_passwords` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-07 16:22:53
