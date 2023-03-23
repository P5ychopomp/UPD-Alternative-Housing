-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: localhost    Database: alternative_housing
-- ------------------------------------------------------
-- Server version	8.0.30

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
-- Table structure for table `accounts`
--

DROP TABLE IF EXISTS `accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accounts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `last_name` varchar(128) DEFAULT NULL,
  `first_name` varchar(128) DEFAULT NULL,
  `email` varchar(64) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `profile_picture` varchar(255) DEFAULT NULL,
  `facebook` varchar(45) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts`
--

LOCK TABLES `accounts` WRITE;
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
INSERT INTO `accounts` VALUES (1,'Team1','Susan','team.susan1@up.edu.ph','$2b$10$bswR4IDqkoDjFAlfqRO.xeUCR7uMFrywXP/PnFrrAXI/oBiywuC2q',NULL,NULL,NULL,'2023-03-23 23:40:58'),(2,'Team2','Susan','team.susan2@up.edu.ph','$2b$10$ApZ.kNL9epAmr8eXGtPGYOMX0jU7vNZIw7O.BtnE3NM.HYWaaKmWy',NULL,NULL,NULL,'2023-03-23 23:41:21'),(3,'Team3','Susan','team.susan3@up.edu.ph','$2b$10$EoMrLYgIaST4fa8YFgIiCOTg/lwezE72IOQ6HmY5V2o3chEMPj38O',NULL,NULL,NULL,'2023-03-23 23:41:28'),(4,'Team4','Susan','team.susan4@up.edu.ph','$2b$10$YYaeL4tV27trI0WW4jTmW.ZTYCfkc7mGnvvSEEkDfG0vLCEfaeMNW',NULL,NULL,NULL,'2023-03-23 23:41:34'),(5,'Team5','Susan','team.susan5@up.edu.ph','$2b$10$ZokxoMLgMggjFgIpqwlX9.gzxAQsUUA1Prc7aynQ76v0X1w72DVlK',NULL,NULL,NULL,'2023-03-23 23:41:41'),(6,'Team6','Susan','team.susan6@up.edu.ph','$2b$10$AfacgHvgcRH3bwZcgp780uQSrpHadkwf4MjR200t/mXMbFOUSaC42',NULL,NULL,NULL,'2023-03-23 23:41:47'),(7,'Team7','Susan','team.susan7@up.edu.ph','$2b$10$oViiMKzf40OQGzLU3kQc5uT.ASsAI0LX7GCf//KOVnRDQIO6epLjq',NULL,NULL,NULL,'2023-03-23 23:41:53'),(8,'Team8','Susan','team.susan8@up.edu.ph','$2b$10$Z5qr0h6uuDYgJPKLbMTgCuHreIcj0dAEVVoZ.gtvuZawO3Adymequ',NULL,NULL,NULL,'2023-03-23 23:41:59'),(9,'Team9','Susan','team.susan9@up.edu.ph','$2b$10$LkOem.ny2G2Qffcap.4LKeAXOKCpu1KjxqkmVcVJb6lpN4Gvxb8JS',NULL,NULL,NULL,'2023-03-23 23:42:04'),(10,'Team10','Susan','team.susan10@up.edu.ph','$2b$10$Y5AOUpKhtzuj7SrjNaCcpOsv8fiHx0V5sakPkgUf7Q7yNhCdgO7uO',NULL,NULL,NULL,'2023-03-23 23:42:11'),(11,'Team11','Susan','team.susan11@up.edu.ph','$2b$10$TKj94SCsN2WRJCjJplTdhO/4e/RFJcFGd8ePbV6EQTt3lKS.0nstO',NULL,NULL,NULL,'2023-03-23 23:42:22'),(12,'Team12','Susan','team.susan12@up.edu.ph','$2b$10$oQQLehgNLzX4eNpP7o6pDeoXdrUFLU4I9BmVt0/TtLRI5XHnx/WYW',NULL,NULL,NULL,'2023-03-23 23:42:39'),(13,'Team13','Susan','team.susan13@up.edu.ph','$2b$10$OgBy7BWCcdDsD3/8tjSJ3.aFPuVcShEarbjomtl/llwCNeE3.MKa2',NULL,NULL,NULL,'2023-03-23 23:42:45'),(14,'Team14','Susan','team.susan14@up.edu.ph','$2b$10$uBS340sPVh70c5lRBd9uYeQm8qcZ7whF9n9jGzULUE8D2yxnncmv6',NULL,NULL,NULL,'2023-03-23 23:42:50'),(15,'Team15','Susan','team.susan15@up.edu.ph','$2b$10$xrfnLgcDW0KPUnZ4jd9sWuYBPU6a2E07yoZzLaRNz90dK.BmwYXvG',NULL,NULL,NULL,'2023-03-23 23:42:55');
/*!40000 ALTER TABLE `accounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `properties`
--

DROP TABLE IF EXISTS `properties`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `properties` (
  `property_id` int NOT NULL AUTO_INCREMENT,
  `property_name` varchar(45) DEFAULT NULL,
  `unit_num` varchar(20) DEFAULT NULL,
  `street_address` varchar(100) DEFAULT NULL,
  `brgy` varchar(100) DEFAULT NULL,
  `city_municip` varchar(100) DEFAULT NULL,
  `rate` decimal(10,2) DEFAULT NULL,
  `lot_area` decimal(8,2) DEFAULT NULL,
  `lot_type` varchar(100) DEFAULT NULL,
  `min_month_stay` tinyint(1) DEFAULT NULL,
  `num_bedrooms` tinyint(1) DEFAULT NULL,
  `num_bathrooms` tinyint(1) DEFAULT NULL,
  `occupancy` tinyint(1) DEFAULT NULL,
  `furnishing` varchar(10) DEFAULT NULL,
  `curfew` tinyint DEFAULT NULL,
  `inclusion` set('Electricity','Water','Wifi','Kitchen','Parking') DEFAULT NULL,
  `other_details` varchar(45) DEFAULT NULL,
  `img_url` varchar(255) DEFAULT NULL,
  `date_posted` date DEFAULT NULL,
  `landlord_id` int DEFAULT NULL,
  PRIMARY KEY (`property_id`),
  KEY `id_idx` (`landlord_id`),
  CONSTRAINT `id` FOREIGN KEY (`landlord_id`) REFERENCES `accounts` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=99 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `properties`
--

LOCK TABLES `properties` WRITE;
/*!40000 ALTER TABLE `properties` DISABLE KEYS */;
INSERT INTO `properties` VALUES (1,'House1','520','Pres. Roxas','Commonwealth','Quezon City',4000.00,16.00,'Boarding House',12,1,0,4,'None',0,NULL,NULL,'property_img/House1.png','2023-08-04',5),(2,'House2','429','Riverside St','Commonwealth','Quezon City',11750.00,39.00,'Apartment',12,2,1,4,'Full',0,NULL,NULL,'property_img/House2.png','2023-08-03',8),(3,'House3','89','Maginoo','Diliman','Quezon City',2000.00,24.00,'Dormitory',6,1,0,3,'None',0,NULL,NULL,'property_img/House3.png','2022-10-04',5),(4,'House4','847','E. Ma Guerrero','Diliman','Quezon City',3000.00,20.00,'Dormitory',12,1,1,5,'Full',0,NULL,NULL,'property_img/House4.png','2022-10-05',9),(5,'House5','549','Lunas St','Commonwealth','Quezon City',3750.00,24.00,'Dormitory',6,1,0,2,'None',0,NULL,NULL,'property_img/House5.png','2023-11-12',9),(6,'House6','591','Osmena','Loyola Heights','Quezon City',11750.00,24.00,'Condominium',12,2,1,4,'None',0,NULL,NULL,'property_img/House6.png','2022-11-06',6),(7,'House7','333','Dr Gregorio T. Velasquez','Diliman','Quezon City',3500.00,19.00,'Boarding House',12,1,0,1,'Full',0,NULL,NULL,'property_img/House7.png','2023-09-11',8),(9,'House9','747','R. P. De Guzman','Diliman','Quezon City',1750.00,18.00,'Boarding House',12,1,1,5,'Semi',1,NULL,NULL,'property_img/House9.png','2022-10-01',6),(11,'House11','226','Quezon','Loyola Heights','Quezon City',4500.00,23.00,'Boarding House',12,1,1,2,'Semi',1,NULL,NULL,'property_img/House11.png','2023-07-12',5),(12,'House12','291','College Lane','Loyola Heights','Quezon City',20500.00,39.00,'Apartment',12,1,1,4,'None',0,NULL,NULL,'property_img/House12.png','2022-06-10',5),(13,'House13','517','San Diego St','Commonwealth','Quezon City',3000.00,18.00,'Dormitory',6,1,1,4,'Semi',1,NULL,NULL,'property_img/House13.png','2022-03-06',8),(15,'House15','594','Eugenio Lopez Dr','Diliman','Quezon City',3000.00,17.00,'Dormitory',6,1,0,5,'Full',1,NULL,NULL,'property_img/House15.png','2023-11-02',4),(16,'House16','602','Zen Garden Path','Loyola Heights','Quezon City',21500.00,38.00,'Apartment',12,3,1,1,'Full',0,NULL,NULL,'property_img/House16.png','2022-11-03',10),(19,'House19','387','Ma Theresa','Commonwealth','Quezon City',14000.00,15.00,'Condominium',12,3,1,1,'None',0,NULL,NULL,'property_img/House19.png','2023-04-10',15),(20,'House20','824','Magsaysay','Loyola Heights','Quezon City',4750.00,19.00,'Boarding House',12,1,0,2,'None',1,NULL,NULL,'property_img/House20.png','2022-01-08',5),(22,'House22','650','Kamagong St','Commonwealth','Quezon City',3250.00,24.00,'Dormitory',6,1,0,3,'None',1,NULL,NULL,'property_img/House22.png','2023-03-07',3),(23,'House23','301','Ernestine','Commonwealth','Quezon City',22500.00,34.00,'Apartment',12,1,1,2,'None',0,NULL,NULL,'property_img/House23.png','2023-06-11',7),(24,'House24','269','Magsaysay','Loyola Heights','Quezon City',23750.00,22.00,'Apartment',12,3,1,6,'Full',0,NULL,NULL,'property_img/House24.png','2022-04-10',12),(25,'House25','174','F. Maramag','Diliman','Quezon City',22750.00,16.00,'Condominium',12,1,1,2,'Semi',0,NULL,NULL,'property_img/House25.png','2022-05-04',12),(26,'House26','231','Xavierville Ave','Loyola Heights','Quezon City',2750.00,24.00,'Dormitory',6,1,0,6,'None',0,NULL,NULL,'property_img/House26.png','2022-02-02',2),(29,'House29','866','Aglipay St','Diliman','Quezon City',2500.00,20.00,'Dormitory',12,1,0,1,'Semi',0,NULL,NULL,'property_img/House29.png','2022-10-05',1),(30,'House30','61','A. Melchor','Loyola Heights','Quezon City',4750.00,16.00,'Boarding House',6,1,1,2,'Semi',0,NULL,NULL,'property_img/House30.png','2022-11-06',5),(32,'House32','161','Malihim','Diliman','Quezon City',1000.00,17.00,'Boarding House',12,1,1,6,'Semi',1,NULL,NULL,'property_img/House32.png','2022-02-02',9),(33,'House33','605','Maunawain','Diliman','Quezon City',1250.00,24.00,'Dormitory',12,1,1,6,'Semi',1,NULL,NULL,'property_img/House33.png','2022-04-12',3),(34,'House34','62','Scout Rallos Extension','Diliman','Quezon City',10750.00,22.00,'Apartment',12,1,1,3,'Semi',0,NULL,NULL,'property_img/House34.png','2023-11-10',4),(35,'House35','693','Katipunan Ave','Loyola Heights','Quezon City',4750.00,20.00,'Boarding House',6,1,0,4,'Semi',1,NULL,NULL,'property_img/House35.png','2022-12-02',13),(36,'House36','859','T. Evangelista','Loyola Heights','Quezon City',4750.00,16.00,'Boarding House',6,1,1,5,'Full',1,NULL,NULL,'property_img/House36.png','2023-03-12',7),(37,'House37','117','Mahusay','Diliman','Quezon City',17000.00,29.00,'Apartment',12,3,1,4,'Full',0,NULL,NULL,'property_img/House37.png','2022-08-02',10),(38,'House38','309','Hon. B. Soliven','Commonwealth','Quezon City',13000.00,28.00,'Apartment',12,3,1,3,'Full',0,NULL,NULL,'property_img/House38.png','2022-11-09',7),(39,'House39','632','Path To Mabilis/Maunland','Diliman','Quezon City',19250.00,17.00,'Condominium',12,1,1,2,'Full',0,NULL,NULL,'property_img/House39.png','2022-04-02',1),(40,'House40','211','NIA Rd','Diliman','Quezon City',1500.00,18.00,'Dormitory',6,1,1,1,'None',1,NULL,NULL,'property_img/House40.png','2023-03-01',11),(41,'House41','557','Matthew St','Commonwealth','Quezon City',2000.00,15.00,'Dormitory',6,1,0,6,'None',1,NULL,NULL,'property_img/House41.png','2023-07-01',6),(42,'House42','552','Malambing','Diliman','Quezon City',14250.00,28.00,'Apartment',12,2,1,5,'None',0,NULL,NULL,'property_img/House42.png','2022-01-05',11),(43,'House43','640','Nicanor Reyes','Loyola Heights','Quezon City',2750.00,18.00,'Dormitory',12,1,1,2,'Full',0,NULL,NULL,'property_img/House43.png','2023-11-11',10),(44,'House44','409','Gonzales Street','Diliman','Quezon City',1750.00,15.00,'Dormitory',12,1,0,5,'Semi',1,NULL,NULL,'property_img/House44.png','2023-04-10',13),(46,'House46','174','J. C. De Jesus','Diliman','Quezon City',3250.00,22.00,'Boarding House',12,1,0,6,'Full',0,NULL,NULL,'property_img/House46.png','2022-01-03',12),(47,'House47','936','B. Burgos','Loyola Heights','Quezon City',14000.00,16.00,'Condominium',12,1,1,1,'Full',0,NULL,NULL,'property_img/House47.png','2022-07-01',14),(48,'House48','640','Dear St','Commonwealth','Quezon City',1250.00,23.00,'Boarding House',12,1,0,4,'Semi',1,NULL,NULL,'property_img/House48.png','2023-01-04',2),(51,'House51','781','Beethoven','Commonwealth','Quezon City',1000.00,24.00,'Dormitory',12,1,1,1,'Full',1,NULL,NULL,'property_img/House51.png','2022-08-07',7),(53,'House53','314','Sto. Nino','Commonwealth','Quezon City',4500.00,21.00,'Boarding House',6,1,0,1,'None',0,NULL,NULL,'property_img/House53.png','2023-09-03',7),(56,'House56','20','Esteban Abada St','Loyola Heights','Quezon City',4500.00,21.00,'Boarding House',12,1,1,3,'Full',1,NULL,NULL,'property_img/House56.png','2023-08-10',1),(57,'House57','862','Dona Maria','Commonwealth','Quezon City',3000.00,15.00,'Dormitory',12,1,1,4,'Full',0,NULL,NULL,'property_img/House57.png','2023-08-07',13),(58,'House58','951','Marathon','Diliman','Quezon City',23250.00,23.00,'Apartment',12,2,1,4,'Full',0,NULL,NULL,'property_img/House58.png','2022-04-11',6),(59,'House59','472','Thornton Drive','Loyola Heights','Quezon City',2000.00,15.00,'Dormitory',6,1,0,2,'Semi',0,NULL,NULL,'property_img/House59.png','2022-01-09',8),(60,'House60','419','Katipunan Ave','Loyola Heights','Quezon City',3500.00,23.00,'Boarding House',12,1,1,2,'Full',0,NULL,NULL,'property_img/House60.png','2023-10-12',14),(61,'House61','662','Sanchez St','Commonwealth','Quezon City',12500.00,21.00,'Condominium',12,2,1,6,'Semi',0,NULL,NULL,'property_img/House61.png','2022-10-09',7),(62,'House62','804','B. Gonzales','Loyola Heights','Quezon City',2250.00,23.00,'Dormitory',12,1,1,4,'Full',0,NULL,NULL,'property_img/House62.png','2022-08-01',10),(63,'House63','207','Matipuno St','Diliman','Quezon City',13750.00,22.00,'Apartment',12,1,1,1,'Full',0,NULL,NULL,'property_img/House63.png','2023-06-01',11),(64,'House64','462','D. Carmencita','Commonwealth','Quezon City',23500.00,29.00,'Apartment',12,3,1,3,'Full',0,NULL,NULL,'property_img/House64.png','2023-11-07',9),(65,'House65','326','Mark Street','Commonwealth','Quezon City',3500.00,15.00,'Boarding House',6,1,0,5,'Semi',0,NULL,NULL,'property_img/House65.png','2023-04-04',12),(66,'House66','958','Magsaysay','Loyola Heights','Quezon City',16500.00,21.00,'Apartment',12,1,1,4,'None',0,NULL,NULL,'property_img/House66.png','2023-12-03',2),(67,'House67','597','Mabuhay Street','Diliman','Quezon City',1000.00,21.00,'Boarding House',12,1,0,1,'Semi',1,NULL,NULL,'property_img/House67.png','2023-06-05',7),(68,'House68','210','President Carlos P. Garcia Ave','Loyola Heights','Quezon City',1250.00,24.00,'Dormitory',12,1,1,3,'Semi',1,NULL,NULL,'property_img/House68.png','2023-11-07',6),(70,'House70','176','San Pascual','Commonwealth','Quezon City',3000.00,19.00,'Dormitory',12,1,0,2,'Full',1,NULL,NULL,'property_img/House70.png','2022-12-11',6),(71,'House71','801','S. Flores','Diliman','Quezon City',1250.00,21.00,'Dormitory',12,1,1,6,'Semi',1,NULL,NULL,'property_img/House71.png','2022-01-09',12),(72,'House72','612','Thomas St','Commonwealth','Quezon City',1250.00,16.00,'Boarding House',6,1,0,6,'Full',1,NULL,NULL,'property_img/House72.png','2022-02-05',13),(73,'House73','709','Maunlad','Diliman','Quezon City',1750.00,20.00,'Boarding House',12,1,0,6,'Semi',1,NULL,NULL,'property_img/House73.png','2023-07-04',11),(74,'House74','192','Topside Valley','Loyola Heights','Quezon City',2500.00,15.00,'Boarding House',6,1,1,2,'Semi',1,NULL,NULL,'property_img/House74.png','2022-04-06',11),(76,'House76','118','Sct. De Guia St','Diliman','Quezon City',2250.00,21.00,'Dormitory',6,1,0,2,'None',0,NULL,NULL,'property_img/House76.png','2023-09-09',13),(78,'House78','386','Quezon','Loyola Heights','Quezon City',1250.00,22.00,'Boarding House',12,1,1,4,'Full',0,NULL,NULL,'property_img/House78.png','2022-06-12',12),(79,'House79','137','Matipid','Diliman','Quezon City',18750.00,20.00,'Condominium',12,1,1,4,'Semi',0,NULL,NULL,'property_img/House79.png','2023-05-01',8),(85,'House85','671','Matimpiin','Diliman','Quezon City',18000.00,33.00,'Apartment',12,1,1,6,'None',0,NULL,NULL,'property_img/House85.png','2022-05-03',10),(86,'House86','117','Rosa Alvero','Loyola Heights','Quezon City',3000.00,16.00,'Boarding House',12,1,1,4,'None',1,NULL,NULL,'property_img/House86.png','2023-05-12',9),(87,'House87','974','Visayas Ave','Diliman','Quezon City',1000.00,15.00,'Dormitory',6,1,0,5,'Full',1,NULL,NULL,'property_img/House87.png','2022-08-06',10),(89,'House89','662','J. Escaler','Loyola Heights','Quezon City',2500.00,20.00,'Boarding House',6,1,1,5,'Semi',0,NULL,NULL,'property_img/House89.png','2022-02-04',7),(90,'House90','979','Kristong Hari','Diliman','Quezon City',4000.00,21.00,'Boarding House',6,1,1,2,'Full',0,NULL,NULL,'property_img/House90.png','2023-10-10',6),(91,'House91','959','Ernestito','Commonwealth','Quezon City',3000.00,23.00,'Dormitory',6,1,0,2,'Full',0,NULL,NULL,'property_img/House91.png','2023-10-05',12),(92,'House92','590','Aguinaldo','Diliman','Quezon City',14750.00,22.00,'Condominium',12,1,1,5,'Full',0,NULL,NULL,'property_img/House92.png','2023-11-12',5),(93,'House93','945','Quirino','Loyola Heights','Quezon City',3250.00,15.00,'Dormitory',12,1,0,2,'Semi',1,NULL,NULL,'property_img/House93.png','2023-12-08',12),(94,'House94','684','Republic Ave','Commonwealth','Quezon City',3750.00,19.00,'Dormitory',12,1,1,6,'Semi',1,NULL,NULL,'property_img/House94.png','2023-09-11',8),(95,'House95','402','Sumapi Drive','Commonwealth','Quezon City',3000.00,18.00,'Boarding House',6,1,0,4,'Semi',0,NULL,NULL,'property_img/House95.png','2023-07-09',10),(96,'House96','907','Pugo St','Commonwealth','Quezon City',2750.00,21.00,'Dormitory',12,1,0,2,'Semi',0,NULL,NULL,'property_img/House96.png','2023-02-02',12),(97,'House97','327','Quisumbing Drive','Loyola Heights','Quezon City',3750.00,18.00,'Boarding House',12,1,0,5,'None',0,NULL,NULL,'property_img/House97.png','2022-12-12',2),(98,'House98','727','Zen Garden Path','Loyola Heights','Quezon City',4000.00,16.00,'Boarding House',6,1,1,5,'Full',0,NULL,NULL,'property_img/House98.png','2022-05-09',13);
/*!40000 ALTER TABLE `properties` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int unsigned NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('Xv-hD8FAA4gdv7mr0Bvq231g3P0RGt8w',1679672576,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"}}');
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-03-24  0:45:10
