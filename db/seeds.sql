insert into departments (department_name)
values ('Engineering'),
('Finance'),
('Legal'),
('Sales');

insert into roles (title, salary, department_id)
values ('Accountant', 125000, 2),
('Account Manager', 160000, 2),
('Lawyer', 190000, 3),
('Lead Engineer', 150000, 1),
('Legal Team Lead', 250000, 3),
('Salesperson', 80000, 4),
('Software Engineer', 120000, 1),
('Sales Manager', 130000, 4);

insert into employees (first_name, last_name, role_id, manager_id)
values ('Mike', 'Chan', 6, 2),
('John', 'Doe', 8, null),
('Ashley', 'Rodriguez', 4, null),
('Kevin', 'Tupik', 7, 3),
('Kunal', 'Singh', 2, null),
('Malia', 'Brown', 1, 5),
('Sarah', 'Lourd', 5, null),
('Tom', 'Allen', 3, 7);