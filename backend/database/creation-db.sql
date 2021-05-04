CREATE SCHEMA IF NOT EXISTS `dw_webapp` DEFAULT CHARACTER SET utf8mb4 ;

CREATE TABLE IF NOT EXISTS `dw_webapp`.`users` (
  `usr_id` INT NOT NULL AUTO_INCREMENT,
  `usr_login` VARCHAR(255) NOT NULL,
  `usr_name` VARCHAR(100) NOT NULL,
  `usr_surname` VARCHAR(500) NOT NULL,
  `usr_password` VARCHAR(100) NOT NULL,
  `usr_email` VARCHAR(255) NOT NULL,
  `usr_admin_flag` INT NOT NULL,
  PRIMARY KEY (`usr_id`))
ENGINE = InnoDB;