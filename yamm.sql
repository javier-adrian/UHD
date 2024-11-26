/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19-11.6.2-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: health
-- ------------------------------------------------------
-- Server version	11.6.2-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*M!100616 SET @OLD_NOTE_VERBOSITY=@@NOTE_VERBOSITY, NOTE_VERBOSITY=0 */;

--
-- Table structure for table `statement`
--

DROP TABLE IF EXISTS `statement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `statement` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user` int(11) DEFAULT NULL,
  `amount` int(11) NOT NULL,
  `timestamp` datetime DEFAULT NULL,
  `description` varchar(72) DEFAULT NULL,
  `type` varchar(50) DEFAULT NULL,
  `currency` varchar(3) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user` (`user`),
  CONSTRAINT `statement_ibfk_1` FOREIGN KEY (`user`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=143 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `statement`
--

LOCK TABLES `statement` WRITE;
/*!40000 ALTER TABLE `statement` DISABLE KEYS */;
INSERT INTO `statement` VALUES
(96,1,10000,'2024-11-01 14:30:00','Payment for service','expense','USD'),
(97,1,25000,'2024-11-02 09:15:00','Refund received','income','USD'),
(99,1,15000,'2024-11-04 12:00:00','Dinner with friends','expense','USD'),
(100,1,50000,'2024-11-05 08:30:00','Freelance work payment','income','USD'),
(101,1,12000,'2024-11-06 11:15:00','Electricity bill','expense','PHP'),
(102,1,80000,'2024-11-07 19:00:00','Freelance project payment','income','USD'),
(103,1,7500,'2024-11-08 16:20:00','Uber ride','expense','USD'),
(104,1,100000,'2024-11-09 07:10:00','Rent payment','expense','EUR'),
(105,1,20000,'2024-11-10 18:00:00','Book purchase','expense','USD'),
(106,1,13500,'2023-12-14 21:45:00','Movie tickets','expense','USD'),
(107,1,45000,'2024-01-02 09:30:00','New Year gift','expense','EUR'),
(108,1,80000,'2024-02-05 17:20:00','Freelance web design','income','USD'),
(109,1,2500,'2024-03-03 12:00:00','Breakfast at cafe','expense','USD'),
(110,1,60000,'2024-03-19 08:00:00','Work equipment purchase','expense','USD'),
(111,1,90000,'2024-04-10 15:10:00','Online course subscription','expense','USD'),
(112,1,15000,'2024-04-25 22:50:00','Concert ticket','expense','USD'),
(113,1,300000,'2024-05-15 11:30:00','Real estate rental income','income','USD'),
(114,1,3500,'2024-06-02 07:55:00','Taxi fare','expense','USD'),
(115,1,20000,'2024-06-30 20:20:00','Birthday gift for friend','expense','USD'),
(116,1,500000,'2024-07-12 14:25:00','Freelance project payment','income','USD'),
(117,1,9500,'2024-07-29 18:00:00','Dinner at restaurant','expense','USD'),
(118,1,150000,'2024-08-09 13:10:00','Side business payment','income','USD'),
(119,1,35000,'2024-09-01 16:30:00','Personal loan repayment','income','USD'),
(120,1,62000,'2024-09-17 10:40:00','Car repair bill','expense','USD'),
(121,1,10000,'2024-09-25 23:50:00','Late-night snacks','expense','USD'),
(122,1,100000,'2024-10-03 06:45:00','Vacation flight tickets','expense','USD'),
(123,1,72000,'2024-10-11 19:00:00','Rental property repair','expense','USD'),
(124,1,35000,'2024-10-28 09:00:00','Online shopping for gadgets','expense','USD'),
(125,1,25000,'2024-11-02 10:15:00','Weekend getaway','expense','USD'),
(126,1,45000,'2024-11-13 15:30:00','Freelance design work','income','USD'),
(127,1,110000,'2024-11-21 08:00:00','Business consulting payment','income','USD'),
(128,1,24500,'2020-01-15 14:32:00','Purchase of office supplies','expense','USD'),
(129,1,100500,'2021-07-21 08:10:30','Salary payment','income','USD'),
(130,1,3500,'2022-03-03 09:45:10','Lunch at restaurant','expense','USD'),
(131,1,12400,'2022-11-25 12:20:45','Book purchase','expense','USD'),
(132,1,23500,'2023-02-07 10:05:15','Freelance work payment','income','USD'),
(133,1,5800,'2023-06-17 16:30:25','Grocery shopping','expense','USD'),
(134,1,6500,'2019-09-10 11:22:35','Medical bill payment','expense','USD'),
(135,1,9500,'2020-10-23 13:35:50','Car repair','expense','USD'),
(136,1,50000,'2021-12-05 17:50:05','Freelance contract payment','income','USD'),
(137,1,13500,'2021-02-17 14:25:20','Travel reimbursement','income','USD'),
(138,1,5500,'2018-11-30 18:10:40','Electronics purchase','expense','USD'),
(139,1,7850,'2022-05-09 07:55:15','Online course subscription','expense','USD'),
(140,1,12000,'2022-12-25 21:00:00','Christmas bonus','income','USD'),
(141,1,4200,'2023-04-18 09:17:30','Dining out with friends','expense','USD'),
(142,1,56000,'2019-03-12 15:00:55','Contractor invoice','income','USD');
/*!40000 ALTER TABLE `statement` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) DEFAULT NULL,
  `password` varchar(20) DEFAULT NULL,
  `email` varchar(80) DEFAULT NULL,
  `number` varchar(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES
(1,'Adrian','peK5uIs11kK9w','agjavier@kld.edu.ph','09611487850'),
(2,'ajf','pe9r.7C/MFTZw','lkasdfj@gmail.com','09611487850');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*M!100616 SET NOTE_VERBOSITY=@OLD_NOTE_VERBOSITY */;

-- Dump completed on 2024-11-26 21:48:24
