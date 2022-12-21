drop database if exists team_db;
create database team_db;

use team_db;

create table departments (
  id int not null auto_increment,
  department_name varchar(30) not null,
  primary key (id)
);

create table roles (
  id int not null auto_increment,
  title varchar(30) not null,
  salary decimal not null,
  department_id int,
  primary key (id),
  foreign key (department_id)
  references departments(id)
  on delete set null
);

create table employees (
  id int not null auto_increment,
  first_name varchar(30) not null,
  last_name varchar(30) not null,
  role_id int,
  manager_id int,
  primary key (id),
  foreign key (role_id)
  references roles(id)
  on delete set null
);