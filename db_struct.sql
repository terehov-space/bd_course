use bd_course;

DROP TABLE IF EXISTS time_management;
DROP TABLE IF EXISTS statuses;
DROP TABLE IF EXISTS tasks;
DROP TABLE IF EXISTS workers;

CREATE TABLE workers (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `firstName` VARCHAR(255) NOT NULL,
  `lastName` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE tasks (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT DEFAULT NULL,
  `workerId` INT NOT NULL,
  `grade` INT NOT NULL,
  FOREIGN KEY (`workerId`) REFERENCES `workers` (`id`)
);

CREATE TABLE statuses (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT DEFAULT NULL
);

CREATE TABLE time_management (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `workerId` INT NOT NULL,
  `taskId` INT NOT NULL,
  `statusId` INT NOT NULL DEFAULT 1,
  `hours` INT NOT NULL,
  `comment` TEXT NOT NULL,
  `createdAt` DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`workerId`) REFERENCES `workers` (`id`),
  FOREIGN KEY (`taskId`) REFERENCES `tasks` (`id`),
  FOREIGN KEY (`statusId`) REFERENCES `statuses` (`id`)
);
