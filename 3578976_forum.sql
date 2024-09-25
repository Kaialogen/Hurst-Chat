-- MySQL dump 10.16  Distrib 10.1.48-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: fdb27.runhosting.com    Database: 3578976_forum
-- ------------------------------------------------------
-- Server version	5.7.40-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categories` (
  `cat_id` int(8) NOT NULL AUTO_INCREMENT,
  `cat_name` varchar(100) NOT NULL,
  `cat_description` varchar(100) NOT NULL,
  PRIMARY KEY (`cat_id`)
) ENGINE=InnoDB AUTO_INCREMENT=87 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (53,'Computer Science',''),(54,'Business',''),(55,'Geography',''),(73,'test3','test3'),(74,'<script>','test4'),(75,'test4','test4'),(76,'<script>2','dgrgrgrgr'),(77,'test4','test4'),(78,'test5','test5'),(79,'test6','test'),(80,'smcicjnocwjnc','html>/html>'),(81,'compsci','script>alert(\"hello\")/script>'),(82,'C',''),(83,'veew','dvew'),(84,'Furries',''),(85,'Furries 2',''),(86,'Furries','Furries are great');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `posts` (
  `post_id` int(8) NOT NULL AUTO_INCREMENT,
  `post_content` varchar(255) CHARACTER SET utf8 NOT NULL,
  `post_date` datetime NOT NULL,
  `post_topic` varchar(255) CHARACTER SET utf8 NOT NULL,
  `post_by` varchar(255) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`post_id`)
) ENGINE=MyISAM AUTO_INCREMENT=48 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (1,'test group','2020-09-17 12:33:08','','2'),(2,'Big Chungus','2020-09-17 15:30:28','','8'),(3,'Chungus','2020-09-17 15:50:38','','8'),(4,'Chungus','2020-09-17 15:51:05','','8'),(5,'<img src=\"https://www.google.com/url?sa=i&url=https%3A%2F%2Ftime.com%2Fcollection%2F100-most-influential-people-2019%2F5567713%2Fninja%2F&psig=AOvVaw3M5D-KAjsXYukT9cKajvBn&ust=1600444429134000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCLDyjKDG8OsCFQAAAAAdAAAA','2020-09-17 15:54:12','','4'),(6,'This subject pepega','2020-09-21 13:30:41','','9'),(7,'This subject only requires a GCSE in Dance, Food Tech and a 3 in foundation maths.\r\n\r\n','2020-09-21 13:31:23','','8'),(8,'I said what I said','2020-09-21 13:44:58','','8'),(9,'I said what I said','2020-09-22 08:52:58','','8'),(10,'<iframe width=\"956\" height=\"538\" src=\"https://www.youtube.com/embed/5BOhZs2v-xk\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>','2020-09-22 17:58:44','','6'),(11,'\r\n\r\n<body>\r\n	\r\n	<div id=\"tester\" style=\"width:1000px;height:600px;\"></div>\r\n	<script src=\"https://cdn.plot.ly/plotly-latest.min.js\"></script>\r\n	\r\n	<script>\r\n	\r\n	var data = []\r\n	for (i= 0; i<1000000; i++)\r\n		{\r\n			data.push(Math.floor(Math.random() * 10000','2020-09-23 10:53:25','','5'),(12,'','2020-09-23 10:53:39','','5'),(13,'I hate harry! Leave a comment if you agree','2020-09-24 22:08:10','','12'),(14,'Test if this breaks the website?','2020-09-25 13:11:30','','8'),(15,'It\'s working','2020-09-27 21:00:05','7','2'),(16,'test','2020-09-27 21:03:05','8','2'),(17,'Yes indeed i can post','2020-09-27 21:15:43','7','4'),(18,'This is a strong message','2020-09-28 11:05:59','8','8'),(19,'I love computer science!\r\n','2020-09-28 11:08:15','7','5'),(20,'<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/XshAjaVeX40\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>','2020-09-28 11:08:40','7','4'),(21,'<html>\r\n<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/XshAjaVeX40\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>\r\n</html>','2020-09-28 11:09:02','7','4'),(22,'Anyone want to do any extra programming with me?\r\n\r\n','2020-09-28 11:09:16','7','4'),(23,'Finds water in the desert\r\n\r\nDrowns','2020-09-28 11:15:33','','8'),(24,'Finds water in the desert\r\n\r\n\r\nDrowns','2020-09-28 11:16:01','21','8'),(25,'Any python programmers online?','2020-09-28 11:42:13','7','8'),(26,'Easter egg','2020-09-28 11:45:04','16','8'),(27,'Sexy sexy in my bum','2020-09-30 17:03:05','','2'),(28,'Anyone got any spare CPUs laying about?','2020-10-01 15:52:59','7','2'),(29,'hate','2020-10-01 16:00:35','18','2'),(30,'I prefer AQA computer science to OCR computer science','2020-10-08 15:14:27','7','2'),(31,'I can code in python','2020-10-08 15:16:11','7','2'),(32,'','2020-10-08 15:16:22','7','2'),(33,'','2020-10-08 15:16:58','7','2'),(34,'html>','2020-10-08 15:18:09','7','2'),(35,'','2020-11-10 15:20:10','','6'),(36,'?php header(\"Location: https://educat2020.herokuapp.com/\"); exit; ?>','2020-11-10 15:22:25','7','6'),(37,'?php header(\"Location: https://educat2020.herokuapp.com/\"); exit; ?>','2020-11-10 15:22:58','7','6'),(38,'script>','2020-11-10 15:23:14','7','6'),(39,'iscript>','2020-11-10 15:23:26','7','6'),(40,'https://portal.hppc.co.uk/index/2\r\n\r\n','2020-11-19 16:49:25','17','2'),(41,'Who even am I?','2020-11-30 14:09:54','8','17'),(42,'hello Kai!','2021-08-21 18:24:30','7','21'),(43,'','2021-08-21 18:32:20','','22'),(44,'','2021-08-21 18:33:05','','22'),(45,'','2022-01-10 12:36:12','','2'),(46,'Lol','2022-11-14 13:13:51','26','25'),(47,'Kai smells','2022-11-14 13:14:26','17','25');
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `replies`
--

DROP TABLE IF EXISTS `replies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `replies` (
  `reply_id` int(8) NOT NULL,
  `reply_content` text NOT NULL,
  `reply_date` datetime NOT NULL,
  `reply_topic` int(8) NOT NULL,
  `reply_by` int(8) NOT NULL,
  PRIMARY KEY (`reply_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `replies`
--

LOCK TABLES `replies` WRITE;
/*!40000 ALTER TABLE `replies` DISABLE KEYS */;
/*!40000 ALTER TABLE `replies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `topics`
--

DROP TABLE IF EXISTS `topics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `topics` (
  `topic_id` int(8) NOT NULL AUTO_INCREMENT,
  `topic_subject` varchar(255) NOT NULL,
  `topic_date` datetime NOT NULL,
  `topic_cat` int(8) NOT NULL,
  `topic_by` int(8) NOT NULL,
  PRIMARY KEY (`topic_id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `topics`
--

LOCK TABLES `topics` WRITE;
/*!40000 ALTER TABLE `topics` DISABLE KEYS */;
INSERT INTO `topics` VALUES (7,'A-Level','2020-09-21 13:30:41',53,9),(8,'U only need 3 GCSEs if that','2020-09-21 13:31:23',54,8),(9,'Btec Btec Economics','2020-09-21 13:44:58',54,8),(13,'Oh so you failed youe GCSEs?','2020-09-22 08:52:58',54,8),(17,'GCSE','2020-09-23 10:53:39',53,5),(18,'Harry hate pge','2020-09-24 22:08:10',70,12),(19,'UwU','2020-09-25 13:11:30',70,8),(21,'Bad Luck Brian','2020-09-28 11:15:33',56,8),(23,'Violent Gay Sex','2020-09-30 17:03:05',72,2),(24,'<?php ','2020-11-10 15:20:10',53,6),(25,'<script>alert(\"hello\")</script>','2021-08-21 18:32:20',53,22),(26,'lol','2021-08-21 18:33:05',53,22),(27,'test','2022-01-10 12:36:12',74,2);
/*!40000 ALTER TABLE `topics` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `user_id` int(8) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(30) NOT NULL,
  `user_pass` varchar(255) NOT NULL,
  `user_email` varchar(255) NOT NULL,
  `user_date` datetime NOT NULL,
  `user_level` int(11) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (2,'kai','a94a8fe5ccb19ba61c4c0873d391e987982fbbd3','kai@gmail.com','2020-09-07 14:23:09',1),(3,'test','5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8','test@gmail.com','2020-09-14 18:57:11',0),(4,'jame','85aa06b0424a711a0ab39f92e984384eb3767787','jamesstevenson1811@gmail.com','2020-09-14 19:41:19',0),(5,'joemamam','16a9a54ddf4259952e3c118c763138e83693d7fd','joe@joe','2020-09-15 11:08:44',0),(6,'Dillon','a7281a1ccd1a65025a08fe1cdac2a7265c8794d1','dillon@dillon.dillon','2020-09-15 12:09:39',0),(7,'MScott38','62ad99cdbc48fddaa33af88369a55d2615c3cba5','matthew.scott@hppc.co.uk','2020-09-16 07:25:29',0),(8,'xXProSnipes69Xx','260e912f4beb4b1d9fdcf5a87be925727ddc2856','Bigpp@gmail.com','2020-09-17 08:54:11',0),(9,'Dillon','516b9783fca517eecbd1d064da2d165310b19759','dillon@dillon.dillon','2020-09-21 13:29:46',0),(10,'Hello','b5b29c53e3c71cb9c6581ab053d7758fab8ca24d','AAAAAAAAAAAAAAAAAAAAAAAAAA@AAAAAAAAAAA','2020-09-22 08:51:19',0),(11,'test2','a94a8fe5ccb19ba61c4c0873d391e987982fbbd3','test@hppc.co.uk','2020-09-24 15:18:09',0),(12,'harryiscool69','886e043f0e83e93ae076c14b415dc16a46924357','20SpillerH09@collyers.ac.uk','2020-09-24 22:07:16',0),(13,'test','a94a8fe5ccb19ba61c4c0873d391e987982fbbd3','test@test.com','2020-09-28 11:32:14',0),(14,'Orchard','8641691ce5a2a1511bdc25de1cacf41922551463','giles.orchard@hppc.co.uk','2020-09-30 10:01:26',0),(15,'test4','1ff2b3704aede04eecb51e50ca698efd50a1379b','dfdfd@as.com','2020-11-06 21:56:19',0),(16,'Testlevel','70ccd9007338d6d81dd3b6271621b9cf9a97ea00','random@hppc.co.uk','2020-11-06 23:00:54',0),(17,'Joe','89661149f1b62ff47dd5a6fe4f979c9f53f619b6','joe@joe','2020-11-30 14:09:17',0),(18,'admin','d033e22ae348aeb5660fc2140aec35850c4da997','admin@gmail.com','2021-01-06 12:52:07',0),(19,'TestAccount0123456789','ab4823abe081b1448aec528044d11c08afd43e7c','aaaaaa@hppc.co.uk','2021-02-20 19:09:01',0),(20,'kai','b2c4ee5de82866db38f79c6d4a91a626486b70e9','test@hppc.co.uk','2021-02-20 19:13:20',0),(21,'rosie','71e99fe88cb8b48526df11cab53f36d3f38d6f80','rosie@rosie.com','2021-08-21 18:23:49',0),(22,'mali','8cb2237d0679ca88db6464eac60da96345513964','mali123@gmail.com','2021-08-21 18:31:09',0),(23,'kaialogen','5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8','vnjvwnj@dbebe.com','2022-01-10 12:32:19',0),(24,'test','ae6505043478874c98106457508b36f23c50bd1e','test@test.com','2022-11-14 13:09:52',0),(25,'Test1','a94a8fe5ccb19ba61c4c0873d391e987982fbbd3','test@test.com','2022-11-14 13:12:25',0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database '3578976_forum'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-25 14:41:25
