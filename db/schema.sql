DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;

USE employee_db;


-- Department Table
CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30),

  PRIMARY KEY (id)
);


-- Role Table
CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INT, -- FOREIGN KEY

  PRIMARY KEY (id)
);


-- Employee Table
CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  manager_id INT, -- FOREIGN KEY
  role_id INT, -- FOREIGN KEY

  PRIMARY KEY (id)
);

-- Seeds for Department Table
INSERT INTO department (name)
VALUES ("Sales"), ("Engineering"), ("Finance"), ("Legal");


-- Seeds for the Role Table
INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 100000, 1), ("Salesperson", 80000, 1), ("Lead Engineer", 150000, 2), 
("Software Engineer", 120000, 2), ("Accountant", 125000, 3), ("Legal Team Lead", 250000, 4), ("Lawyer", 190000, 4);


-- Seeds for Employee Table
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUES ("John", "Doe", 3, 1), ("Mike", "Chan", 1, 2), ("Ashley", "Rodriguez", null, 3), ("Kevin", "Tupik", 3, 4),
("Malia", "Brown", null, 5), ("Sarah", "Lourd", null, 6), ("Tom", "Allen", 6, 7), ("Christian", "Eckenrode", 2, 3);