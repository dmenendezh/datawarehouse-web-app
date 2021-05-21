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


CREATE TABLE IF NOT EXISTS `dw_webapp`.`regions` (
  `region_id` INT NOT NULL AUTO_INCREMENT,
  `region_name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`region_id`))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `dw_webapp`.`countries` (
  `country_id` INT NOT NULL AUTO_INCREMENT,
  `country_name` VARCHAR(255) NOT NULL,
  `region_id` INT NOT NULL,
  PRIMARY KEY (`country_id`),
  INDEX `fk_regions_idx` (`region_id` ASC),
  CONSTRAINT `fk_regions`
    FOREIGN KEY (`region_id`)
    REFERENCES `dw_webapp`.`regions` (`region_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `dw_webapp`.`cities` (
  `city_id` INT NOT NULL AUTO_INCREMENT,
  `city_name` VARCHAR(255) NOT NULL,
  `country_id` INT NOT NULL,
  PRIMARY KEY (`city_id`),
  INDEX `fk_country_idx` (`country_id` ASC),
  CONSTRAINT `fk_country`
    FOREIGN KEY (`country_id`)
    REFERENCES `dw_webapp`.`countries` (`country_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `dw_webapp`.`companies` (
  `company_id` INT NOT NULL AUTO_INCREMENT,
  `company_name` VARCHAR(255) NOT NULL,
  `company_address` VARCHAR(255) NOT NULL,
  `company_email` VARCHAR(255) NOT NULL,
  `city_id` INT NOT NULL,
  PRIMARY KEY (`company_id`),
  INDEX `fk_company_idx` (`company_id` ASC),
  CONSTRAINT `fk_city`
    FOREIGN KEY (`city_id`)
    REFERENCES `dw_webapp`.`cities` (`city_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `dw_webapp`.`contacts` (
  `contact_id` INT NOT NULL AUTO_INCREMENT,
  `contact_name` VARCHAR(255) NOT NULL,
  `contact_surname` VARCHAR(255) NOT NULL,
  `contact_charge` VARCHAR(255) NOT NULL,
  `contact_email` VARCHAR(255) NOT NULL,
  `company_id` INT NOT NULL,
  `region_id` INT NOT NULL,
  `country_id` INT NOT NULL,
  `city_id` INT NOT NULL,
  `contact_address` VARCHAR(255) NOT NULL,
  `contact_interest` INT NOT NULL,
  PRIMARY KEY (`contact_id`),
  INDEX `fk_contact_idx` (`contact_id` ASC),
  CONSTRAINT `fk_company`
    FOREIGN KEY (`company_id`)
    REFERENCES `dw_webapp`.`companies` (`company_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
    CONSTRAINT `fk_contact_region`
    FOREIGN KEY (`region_id`)
    REFERENCES `dw_webapp`.`regions` (`region_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
    CONSTRAINT `fk_contact_country`
    FOREIGN KEY (`country_id`)
    REFERENCES `dw_webapp`.`countries` (`country_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION, 
    CONSTRAINT `fk_contact_city`
    FOREIGN KEY (`city_id`)
    REFERENCES `dw_webapp`.`cities` (`city_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;