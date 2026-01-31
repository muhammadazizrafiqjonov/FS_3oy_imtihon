CREATE table branches(
    id serial PRIMARY KEY,
    name varchar(100) not null,
    time TIMESTAMP(true),
    address VARCHAR(255)
);

CREATE table transports(
    id serial PRIMARY KEY,
    branch varchar(100),
    model varchar(50),
    color varchar(20),
    img varchar(20),
    price VARCHAR(20),
    time TIMESTAMP(true)
);

create table staffs(
    id serial PRIMARY KEY,
    branch VARCHAR(50),
    username varchar(50),
    password varchar(50),
    birthdate DATE,
    gender VARCHAR(10),
    role varchar(15)
);

create table adminPermissions(
    id serial PRIMARY KEY,
    adminId int not null,
    permissionModel VARCHAR(50),
    permission VARCHAR(50)
);

