USE bd_course;

INSERT INTO `statuses` (`title`, `description`) VALUES
('На рассмотрении', 'Ждет одобрения администрации'),
('Отклонен', 'Отклонено администрацией'),
('Одобрен', 'Одобрено администрацией');

INSERT INTO `workers` (`firstName`, `lastName`, `phone`) VALUES 
('Иван', 'Иванов', '89999999999'),
('Артем', 'Артемов', '89998888888'),
('Роман', 'Романов', '89997777777'),
('Александр', 'Александров', '89996666666');

INSERT INTO `tasks` (`title`, `description`, `workerId`, `grade`) VALUES
('Задача#1', 'Описание задачи #1', 1, 20),
('Задача#2', 'Описание задачи #2', 2, 15),
('Задача#3', 'Описание задачи #3', 2, 17),
('Задача#4', 'Описание задачи #4', 3, 33),
('Задача#5', 'Описание задачи #5', 3, 22),
('Задача#6', 'Описание задачи #6', 3, 11),
('Задача#7', 'Описание задачи #7', 4, 19),
('Задача#8', 'Описание задачи #8', 4, 17),
('Задача#9', 'Описание задачи #9', 4, 5),
('Задача#10', 'Описание задачи #10', 4, 3);

INSERT INTO `time_management` (`workerId`, `taskId`, `statusId`, `hours`, `comment`) VALUES
(1, 1, 3, 11, 'Делал задачу'),
(2, 2, 3, 3, 'Делал задачу'),
(2, 3, 3, 1, 'Делал задачу'),
(2, 3, 3, 7, 'Делал задачу'),
(2, 3, 3, 9, 'Делал задачу'),
(3, 4, 3, 2, 'Делал задачу'),
(3, 4, 3, 5, 'Делал задачу'),
(3, 5, 3, 1, 'Делал задачу'),
(3, 4, 3, 9, 'Делал задачу'),
(3, 6, 3, 12, 'Делал задачу'),
(3, 6, 3, 29, 'Делал задачу'),
(4, 7, 3, 13, 'Делал задачу'),
(4, 8, 3, 1, 'Делал задачу'),
(4, 7, 3, 7, 'Делал задачу'),
(4, 9, 3, 5, 'Делал задачу'),
(4, 9, 3, 3, 'Делал задачу'),
(4, 10, 3, 4, 'Делал задачу'),
(1, 1, 2, 11, 'Делал задачу'),
(2, 3, 2, 17, 'Делал задачу'),
(3, 4, 1, 6, 'Делал задачу'),
(4, 9, 3, 3, 'Делал задачу');