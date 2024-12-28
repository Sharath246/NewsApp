CREATE TABLE IF NOT EXISTS USER (
    id int AUTO_INCREMENT PRIMARY KEY,
    email varchar(50) NOT NULL,
    name varchar(50) NOT NULL,
    password varchar(50) NOT NULL
);
CREATE TABLE IF NOT EXISTS Bookmarks (
    id int AUTO_INCREMENT PRIMARY KEY,
    email varchar(50) NOT NULL,
    title varchar(250) NOT NULL,
    newsurl varchar(2048) NOT NULL,
    imageurl varchar(2048) NOT NULL
);
CREATE TABLE IF NOT EXISTS Likes (
    id int AUTO_INCREMENT PRIMARY KEY,
    email varchar(50) NOT NULL,
    title varchar(250) NOT NULL,
    newsurl varchar(2048) NOT NULL,
    imageurl varchar(2048) NOT NULL
);