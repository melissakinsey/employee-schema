CREATE TABLE role (
    id INT AUTO_INCREMENT NOT NULL, PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL DEFAULT 110000,
    department_id INT NOT NULL
);