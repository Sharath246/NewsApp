CREATE TABLE IF NOT EXISTS USER (
    id int AUTO_INCREMENT PRIMARY KEY,
    email varchar(50) NOT NULL,
    name varchar(50) NOT NULL,
    password varchar(50) NOT NULL
);