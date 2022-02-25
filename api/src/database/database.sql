create database template;

use template;

create table users (
    id int primary key auto_increment,
    username varchar(100),
    firstname varchar(100),
    lastname varchar(100),
    email varchar(100),
    password varchar (255)
);

