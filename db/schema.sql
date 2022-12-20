drop database if exists team_db;
create database team_db;

use team_db;

create table department (
  id int not null auto_increment,
  department_name varchar(30) not null,
  primary key (id)
);

create table role (
  id int not null auto_increment,
  title varchar(30) not null,
  salary decimal not null,
  department_id int,
  primary key (id)
  foreign key (department_id)
  references department(id)
  on delete set null
);

create table employee (
  id int not null auto_increment,
  first_name varchar(30) not null,
  last_name varchar(30) not null,
  role_id int,
  manager_id int,
  primary key (id)
  foreign key (role_id)
  references role(id)
  on delete set null
);