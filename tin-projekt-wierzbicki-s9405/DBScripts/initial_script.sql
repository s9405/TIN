CREATE SCHEMA IF NOT EXISTS `tin`;

CREATE TABLE IF NOT EXISTS `tin`.`Player`
    ( `_id` INT UNSIGNED NOT NULL AUTO_INCREMENT ,
      `firstName` VARCHAR(50) NOT NULL ,
      `lastName` VARCHAR(50) NOT NULL ,
      `email` VARCHAR(50) NOT NULL ,
      PRIMARY KEY (`_id`),
      UNIQUE INDEX `player_id_UNIQUE` (`_id` ASC)
    ) ENGINE = InnoDB CHARSET=utf8 COLLATE utf8_general_ci;

CREATE TABLE IF NOT EXISTS `tin`.`Playing_field`
    ( `_id` INT UNSIGNED NOT NULL AUTO_INCREMENT ,
      `name` VARCHAR(50) NOT NULL ,
	  `adress` VARCHAR(50) NOT NULL ,
      `cloackroom` DECIMAL(1) NOT NULL ,
      PRIMARY KEY (`_id`),
      UNIQUE INDEX `playing_field_id_UNIQUE` (`_id` ASC)
    ) ENGINE = InnoDB CHARSET=utf8 COLLATE utf8_general_ci;

CREATE TABLE IF NOT EXISTS `tin`.`Event`
    ( `_id` INT UNSIGNED NOT NULL AUTO_INCREMENT ,
      `max_number_of_player` DECIMAL(5) UNSIGNED NOT NULL ,
      `begin_time` DATETIME NOT NULL ,
      `end_time` DATETIME NULL ,
      `player_id` INT UNSIGNED NOT NULL ,
      `playing_field_id` INT UNSIGNED NOT NULL ,
      PRIMARY KEY (`_id`),
      UNIQUE INDEX `employment_id_UNIQUE` (`_id` ASC),
      CONSTRAINT `player_fk` FOREIGN KEY (`player_id`) REFERENCES `tin`.`Player` (`_id`),
      CONSTRAINT `playing_field_fk` FOREIGN KEY (`playing_field_id`) REFERENCES `tin`.`Playing_field` (`_id`)
    ) ENGINE = InnoDB CHARSET=utf8 COLLATE utf8_general_ci;

INSERT IGNORE INTO `tin`.`Player` (`_id`, `firstName`, `lastName`, `email`) VALUES
  (1, 'Jan', 'Kowalski', 'jan.kowalski@google.com'),
  (2, 'Pawel', 'Nowak', 'p.nowak@google.com'),
  (3, 'Grzegorz', 'Brzeczyszczykiewicz', 'g.b@wp.pl')
;

INSERT IGNORE INTO `tin`.`Playing_field` (`_id`, `name`, `adress`, `cloackroom`) VALUES
  (1, 'Orlik targówek 2', 'Ossowskiego 2', 0),
  (2, 'Hala sportowa praga pn', 'Szanajcy 2', 1)
;

INSERT IGNORE INTO `tin`.`Event` (`_id`, `player_id`, `playing_field_id`, `max_number_of_player`, `begin_time`, `end_time`) VALUES
  (1, 1, 1, 10, '2020-01-01 12:00:00', '2020-01-01 13:00:00'),
  (2, 2, 1, 8, '2020-12-01 18:00:00', '2020-12-01 19:30:00'),
  (3, 1, 2, 6, '2020-09-02 20:00:00', '2020-09-02 21:00:00')