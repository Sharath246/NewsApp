CREATE TABLE IF NOT EXISTS USER (
    id int AUTO_INCREMENT PRIMARY KEY,
    email varchar(50) NOT NULL,
    name varchar(50) NOT NULL,
    password varchar(50) NOT NULL
);
CREATE TABLE IF NOT EXISTS Bookmarks (
    id int AUTO_INCREMENT PRIMARY KEY,
    email varchar(50) NOT NULL,
    sourceId varchar(50) NOT NULL,
    sourceName varchar(50) NOT NULL,
    author varchar(50) NOT NULL,
    title varchar(50) NOT NULL,
    newsdescription varchar(50) NOT NULL,
    newsurl varchar(50) NOT NULL,
    imageurl varchar(50) NOT NULL,
    publishDate varchar(50) NOT NULL,
    content varchar(50) NOT NULL
);
CREATE TABLE IF NOT EXISTS Likes (
    id int AUTO_INCREMENT PRIMARY KEY,
    email varchar(50) NOT NULL,
    sourceId varchar(50) NOT NULL,
    sourceName varchar(50) NOT NULL,
    author varchar(50) NOT NULL,
    title varchar(50) NOT NULL,
    newsdescription varchar(50) NOT NULL,
    newsurl varchar(50) NOT NULL,
    imageurl varchar(50) NOT NULL,
    publishDate varchar(50) NOT NULL,
    content varchar(50) NOT NULL
);