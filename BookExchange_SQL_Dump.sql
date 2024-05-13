/*
SQLyog Community v13.2.1 (64 bit)
MySQL - 8.0.37 : Database - mf_suger_uat
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`mf_suger_uat` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `mf_suger_uat`;

/*Table structure for table `books` */

DROP TABLE IF EXISTS `books`;

CREATE TABLE `books` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `author` varchar(255) NOT NULL,
  `genre` varchar(255) NOT NULL,
  `book_condition` varchar(255) NOT NULL,
  `available` tinyint(1) NOT NULL DEFAULT '1',
  `owner_id` int NOT NULL,
  `price` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `owner_id` (`owner_id`),
  CONSTRAINT `books_ibfk_1` FOREIGN KEY (`owner_id`) REFERENCES `mf_user` (`pk_mf_user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `books` */

insert  into `books`(`id`,`title`,`author`,`genre`,`book_condition`,`available`,`owner_id`,`price`) values 
(12,'A Book 1','A Auth 1','A Gen 1','A Con 1',0,4,100.00),
(13,'A2','A2','A2','A2',0,6,80.00),
(14,'A3','A3','A3','A3',1,2,90.00),
(15,'B1','B1','B1','B1',0,4,70.00),
(17,'B2','B2','B2','B2',0,3,1000.00),
(18,'b7','b7','b7','b7',0,7,999.00),
(19,'Z1','z1','z1','z1',0,2,78.00),
(20,'z2','z2','z2','z2',1,3,67.00),
(21,'C1','c1','c1','Good',1,6,100.00),
(22,'C2','c2','c2','Bad',1,2,200.00),
(23,'K1','k1','k1k','Good',1,7,200.00),
(24,'K2','k2','k2','Old',1,4,100.00);

/*Table structure for table `exchange_requests` */

DROP TABLE IF EXISTS `exchange_requests`;

CREATE TABLE `exchange_requests` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `requested_book_id` int NOT NULL,
  `requesting_user_id` int NOT NULL,
  `status` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `transaction_type` varchar(100) DEFAULT NULL,
  `exchange_book_id` int DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `owner_user_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `requested_book_id` (`requested_book_id`),
  KEY `requesting_user_id` (`requesting_user_id`),
  KEY `fk_exchange_book_id` (`exchange_book_id`),
  KEY `fk_owner_user_id` (`owner_user_id`),
  CONSTRAINT `exchange_requests_ibfk_1` FOREIGN KEY (`requested_book_id`) REFERENCES `books` (`id`),
  CONSTRAINT `exchange_requests_ibfk_2` FOREIGN KEY (`requesting_user_id`) REFERENCES `mf_user` (`pk_mf_user_id`),
  CONSTRAINT `fk_exchange_book_id` FOREIGN KEY (`exchange_book_id`) REFERENCES `books` (`id`),
  CONSTRAINT `fk_owner_user_id` FOREIGN KEY (`owner_user_id`) REFERENCES `mf_user` (`pk_mf_user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `exchange_requests` */

insert  into `exchange_requests`(`id`,`requested_book_id`,`requesting_user_id`,`status`,`created_at`,`transaction_type`,`exchange_book_id`,`updated_at`,`owner_user_id`) values 
(18,18,2,'Approved','2024-05-13 04:48:18','RENT',NULL,'2024-05-13 04:48:18',4),
(20,19,4,'Approved','2024-05-13 04:48:46','RENT',NULL,'2024-05-13 04:48:46',3),
(24,19,2,'Approved','2024-05-13 05:06:22','EXCHANGE',12,'2024-05-13 05:06:22',3),
(25,17,3,'Approved','2024-05-13 05:07:24','EXCHANGE',12,'2024-05-13 05:07:24',4),
(26,15,6,'Approved','2024-05-13 23:42:11','RENT',NULL,'2024-05-13 23:42:11',4),
(27,13,6,'Approved','2024-05-13 23:42:44','EXCHANGE',22,'2024-05-13 23:42:44',2),
(28,12,7,'Approved','2024-05-13 23:46:08','RENT',NULL,'2024-05-13 23:46:08',4),
(29,18,7,'Approved','2024-05-13 23:46:29','EXCHANGE',24,'2024-05-13 23:46:29',4);

/*Table structure for table `map_role_user` */

DROP TABLE IF EXISTS `map_role_user`;

CREATE TABLE `map_role_user` (
  `pk_map_role_user_id` int NOT NULL AUTO_INCREMENT,
  `fk_user_id` int DEFAULT NULL,
  `fk_role_id` int DEFAULT NULL,
  PRIMARY KEY (`pk_map_role_user_id`),
  KEY `fk_user_id` (`fk_user_id`),
  KEY `fk_role_id` (`fk_role_id`),
  CONSTRAINT `map_role_user_ibfk_1` FOREIGN KEY (`fk_user_id`) REFERENCES `mf_user` (`pk_mf_user_id`),
  CONSTRAINT `map_role_user_ibfk_2` FOREIGN KEY (`fk_role_id`) REFERENCES `mf_role` (`pk_mf_role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `map_role_user` */

insert  into `map_role_user`(`pk_map_role_user_id`,`fk_user_id`,`fk_role_id`) values 
(1,1,1),
(2,2,2),
(3,3,2),
(4,4,2),
(5,5,2),
(6,6,2),
(7,7,2);

/*Table structure for table `mf_role` */

DROP TABLE IF EXISTS `mf_role`;

CREATE TABLE `mf_role` (
  `pk_mf_role_id` int NOT NULL AUTO_INCREMENT,
  `role_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`pk_mf_role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `mf_role` */

insert  into `mf_role`(`pk_mf_role_id`,`role_name`) values 
(1,'admin'),
(2,'customer');

/*Table structure for table `mf_user` */

DROP TABLE IF EXISTS `mf_user`;

CREATE TABLE `mf_user` (
  `pk_mf_user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `fullname` varchar(255) DEFAULT NULL,
  `email` varchar(200) DEFAULT NULL,
  `phonenumber` varchar(200) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`pk_mf_user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `mf_user` */

insert  into `mf_user`(`pk_mf_user_id`,`username`,`fullname`,`email`,`phonenumber`,`password`) values 
(1,'sayantanb','Sayantan Biswas','sayantan@gmail.com','+919735493701','$2a$12$0nXA34l3UDm2826PmFS06uxkJD6KisBRPn6vKxAK/eNKzKv8fM9WK'),
(2,'aaaa','aaaa','sayantan@gmail.com','+919735493701','$2a$12$2Ke5SSEnJduGQq9AjH6WUObPNQvwFAHrMH7L1pXqC7D4irh9yZ2Xy'),
(3,'zzzz','zzzz','sayantan@gmail.com','+919735493701','$2a$12$b8x22k4K9JsgfssNwIqmdOWf5tT5GcidzEk5qCGh84.GOqmqs8Th6'),
(4,'bbbb','bbbb','sayantan@gmail.com','+919735493701','$2a$12$b8x22k4K9JsgfssNwIqmdOWf5tT5GcidzEk5qCGh84.GOqmqs8Th6'),
(5,'ffff','ffff','ffff@gmail.com',NULL,'$2a$10$MAozMEQnN6pv7XKn/GK9.uocO.iLtp1LxLoYpTTF/fqueXHrHN14i'),
(6,'cccc','cccc','a@gmail.com',NULL,'$2a$10$lqcmMV92sFp4BmE8wXbUnuFbvX.gxDjFVugsxNG0Xl8jQoyoHUf1G'),
(7,'kkkk','kkkk','kk@gmail.com',NULL,'$2a$10$msPyKFtiGHE.8GEWakksj.beMF.UaniAyQChCE/f4iIla1cNPPo8W');

/*Table structure for table `roles` */

DROP TABLE IF EXISTS `roles`;

CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `roles` */

insert  into `roles`(`id`,`name`) values 
(2,'ROLE_ADMIN'),
(1,'ROLE_USER');

/* Procedure structure for procedure `update_budget_view` */

/*!50003 DROP PROCEDURE IF EXISTS  `update_budget_view` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `update_budget_view`(IN update_date_param DATE, IN user_id INT)
BEGIN
	DECLARE done INT DEFAULT FALSE;
	DECLARE pid INT;
	DECLARE act_amount DECIMAL(10, 2);
	DECLARE rem_amount DECIMAL(10, 2);
	DECLARE sum_amount DECIMAL(10, 2);
	declare st_day int;
	declare d_day int;
	declare month_of_budget VARCHAR(100);
	declare year_of_budget INT;
	declare lower_date date;
	declare temp_due_date date;
	DECLARE credit_card_cursor CURSOR FOR SELECT pk_credit_card_id FROM credit_card WHERE fk_user_id = user_id;
	
	DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
	
	OPEN credit_card_cursor;
	
	credit_card_loop: LOOP
		FETCH credit_card_cursor INTO pid;
		IF done THEN
			LEAVE credit_card_loop;
		END IF;
		
		select statement_date,due_date into st_day, d_day from credit_card where pk_credit_card_id=pid;
		SET temp_due_date = CONCAT(DATE_FORMAT(update_date_param, '%Y-%m'), '-', LPAD(d_day, 2, '0'));
		if st_day > d_day then
			set temp_due_date = date_add(temp_due_date, INTERVAL 1 MONTH);
		end if;
		
		SET lower_date = CONCAT(DATE_FORMAT(update_date_param, '%Y-%m'), '-', LPAD(st_day, 2, '0'));
		
		if (day(update_date_param) < st_day) then
			set lower_date = DATE_SUB(lower_date, INTERVAL 1 MONTH);
		else
			SET temp_due_date = DATE_ADD(temp_due_date, INTERVAL 1 MONTH);
		end if;
		
		set month_of_budget = monthname(temp_due_date);
		set year_of_budget = year(temp_due_date);
		
		SELECT SUM(e.amount) INTO sum_amount
			FROM expense e
			WHERE e.fk_credit_card_id = pid AND e.expense_date between lower_date and update_date_param;
			
		if sum_amount is null then
			set sum_amount = 0;
		end if;

		IF EXISTS (SELECT 1 FROM budget_view WHERE fk_credit_card_id = pid AND budget_month = month_of_budget AND budget_year = year_of_budget) THEN
			select actual_amount, remaining_amount into act_amount, rem_amount from budget_view 
			WHERE fk_credit_card_id = pid AND budget_month = month_of_budget AND budget_year = year_of_budget;
			set rem_amount = sum_amount - act_amount + rem_amount;
			UPDATE budget_view
				SET actual_amount = sum_amount, remaining_amount = rem_amount, update_date = update_date_param
				WHERE fk_credit_card_id = pid AND budget_month = month_of_budget AND budget_year = year_of_budget;
		ELSE
			INSERT INTO budget_view (fk_credit_card_id, budget_month, budget_year, actual_amount, remaining_amount, update_date)
				VALUES (
				    pid,
				    month_of_budget,
				    year_of_budget,
				    sum_amount,
				    sum_amount,
				    update_date_param
				);
		end if;

		
	END LOOP credit_card_loop;

	CLOSE credit_card_cursor;

END */$$
DELIMITER ;

/* Procedure structure for procedure `update_test_budget_view` */

/*!50003 DROP PROCEDURE IF EXISTS  `update_test_budget_view` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `update_test_budget_view`(IN update_date_param DATE, IN user_id INT)
BEGIN
	DECLARE done INT DEFAULT 0;
	DECLARE pid INT;
	DECLARE act_amount DECIMAL(10, 2);
	DECLARE rem_amount DECIMAL(10, 2);
	DECLARE last_date DATE;
	DECLARE sum_amount DECIMAL(10, 2);
	DECLARE credit_card_cursor CURSOR FOR SELECT pk_credit_card_id FROM credit_card WHERE fk_user_id = user_id;
	
	DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;
	
	OPEN credit_card_cursor;
	
		credit_card_loop: LOOP
		FETCH credit_card_cursor INTO pid;
		IF done=1 THEN
		LEAVE credit_card_loop;
	    END IF;

	    -- Debugging: Print pid
	    SELECT CONCAT("Processing credit card ID: ", pid);
	    
	    set act_amount = 0;
	    set rem_amount = 0;
	    set last_date = null;

	    
	    
	    SELECT SUM(e.amount) INTO sum_amount
			FROM expense e
			WHERE e.fk_credit_card_id = pid AND e.expense_date < update_date_param;


	    -- Debugging: Print details
	    IF last_date IS NULL THEN
		SELECT CONCAT("Last date is NULL for credit card ID ", pid, " and sum amount is ", sum_amount);
	    ELSE
		SELECT CONCAT("Last date is NOT NULL for credit card ID ", pid, " and sum amount is ", sum_amount);
	    END IF;

	    
	END LOOP credit_card_loop;


	CLOSE credit_card_cursor;

END */$$
DELIMITER ;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
