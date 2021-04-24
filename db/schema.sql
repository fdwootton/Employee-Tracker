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
  department_id INT, --FOREIGN KEY

  PRIMARY KEY (id)
);


-- Employee Table
CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  manager_id INT, --FOREIGN KEY
  role_id INT, --FOREIGN KEY

  PRIMARY KEY (id)
);