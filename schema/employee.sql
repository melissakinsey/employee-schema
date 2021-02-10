CREATE TABLE employee (
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT AUTO_INCREMENT PRIMARY KEY,
    manager_id INT
);