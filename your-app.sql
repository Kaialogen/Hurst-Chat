-- MySQL dump for social media data

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

-- Table structure for `categories`
DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
  `cat_id` int(8) NOT NULL AUTO_INCREMENT,
  `cat_name` varchar(100) NOT NULL,
  `cat_description` varchar(255) NOT NULL,
  PRIMARY KEY (`cat_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- Inserting data for `categories`
INSERT INTO `categories` VALUES
(1, 'Technology', 'Discussions on the latest in technology and gadgets'),
(2, 'Health & Wellness', 'Share tips on fitness, mental health, and general wellness'),
(3, 'Gaming', 'Talk about your favorite video games and latest updates'),
(4, 'Education', 'Resources and discussions on learning and education'),
(5, 'Lifestyle', 'Share insights on fashion, travel, food, and more');

-- Table structure for `posts`
DROP TABLE IF EXISTS `posts`;
CREATE TABLE `posts` (
  `post_id` int(8) NOT NULL AUTO_INCREMENT,
  `post_content` varchar(255) NOT NULL,
  `post_date` datetime NOT NULL,
  `post_topic` int(8) NOT NULL,
  `post_by` int(8) NOT NULL,
  PRIMARY KEY (`post_id`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- Inserting data for `posts`
INSERT INTO `posts` VALUES
(1, 'I love discussing the latest tech trends!', '2023-09-17 12:33:08', 1, 2),
(2, 'What are your tips for staying fit during winter?', '2023-09-18 14:50:30', 2, 3),
(3, 'Has anyone tried the new Zelda game?', '2023-09-19 10:45:22', 3, 4),
(4, 'I just started learning Python! Any resources?', '2023-09-20 16:25:11', 4, 5),
(5, 'Check out my travel blog for more!', '2023-09-21 18:33:44', 5, 6);

-- Table structure for `replies`
DROP TABLE IF EXISTS `replies`;
CREATE TABLE `replies` (
  `reply_id` int(8) NOT NULL AUTO_INCREMENT,
  `reply_content` text NOT NULL,
  `reply_date` datetime NOT NULL,
  `reply_topic` int(8) NOT NULL,
  `reply_by` int(8) NOT NULL,
  PRIMARY KEY (`reply_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Table structure for `topics`
DROP TABLE IF EXISTS `topics`;
CREATE TABLE `topics` (
  `topic_id` int(8) NOT NULL AUTO_INCREMENT,
  `topic_subject` varchar(255) NOT NULL,
  `topic_date` datetime NOT NULL,
  `topic_cat` int(8) NOT NULL,
  `topic_by` int(8) NOT NULL,
  PRIMARY KEY (`topic_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- Inserting data for `topics`
INSERT INTO `topics` VALUES
(1, 'Latest in Tech News', '2023-09-15 10:20:10', 1, 2),
(2, 'Healthy Habits for a Balanced Life', '2023-09-16 11:25:50', 2, 3),
(3, 'Best Games of 2023', '2023-09-17 14:45:00', 3, 4),
(4, 'Learning Programming', '2023-09-18 15:30:00', 4, 5),
(5, 'Travel Destinations for 2024', '2023-09-19 16:00:00', 5, 6);

-- Table structure for `users`
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `user_id` int(8) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(30) NOT NULL,
  `user_pass` varchar(255) NOT NULL,
  `user_email` varchar(255) NOT NULL,
  `user_date` datetime NOT NULL,
  `user_level` int(11) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- Inserting data for `users`
INSERT INTO `users` VALUES
(1, 'admin', SHA1('adminpass'), 'admin@socialmedia.com', '2023-09-07 10:00:00', 1),
(2, 'techguru', SHA1('password123'), 'techguru@socialmedia.com', '2023-09-10 12:00:00', 0),
(3, 'fitnesslover', SHA1('fitlife2023'), 'fitnesslover@socialmedia.com', '2023-09-12 14:00:00', 0),
(4, 'gamer123', SHA1('gamerpass456'), 'gamer123@socialmedia.com', '2023-09-14 16:00:00', 0),
(5, 'studentcoder', SHA1('codeislife789'), 'studentcoder@socialmedia.com', '2023-09-16 18:00:00', 0),
(6, 'traveller', SHA1('wanderlust987'), 'traveller@socialmedia.com', '2023-09-18 20:00:00', 0);

/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-25 15:30:00
