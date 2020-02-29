CREATE TABLE `textures` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `email` VARCHAR(50) NOT NULL,
  `characterOne` INT(11) NOT NULL,
  `characterTwo` INT(11) NOT NULL,
  `characterThree` INT(11) NOT NULL,
  `characterFour` INT(11) NOT NULL,
  `accountCreated` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `lastLogin` TIMESTAMP NOT NULL,
  `lastLoginIp` VARCHAR(40) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8;