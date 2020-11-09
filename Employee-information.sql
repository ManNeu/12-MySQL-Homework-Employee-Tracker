DROP DATABASE IF EXISTS employeeInformation_DB;
CREATE database employeeInformation_DB;

USE employeeInformation_DB;

CREATE TABLE department
(
    id INT NOT NULL
    auto_increment,
    dept_name VARCHAR
    (30) NOT NULL,
        PRIMARY KEY
    (id)
);

    CREATE TABLE roles
    (
        id INT NOT NULL
        auto_increment,
         
    department_id INT NOT NULL,
    title VARCHAR
        (30) NULL,
    salary DECIMAL
        (10,2) NOT NULL,
    PRIMARY KEY
        (id),
     
    FOREIGN KEY
        (department_id) REFERENCES department
        (id)
);



        CREATE TABLE employee
        (
            id INT NOT NULL
            auto_increment,
            roles_id INT, 
            manager_id INT NULL,
            first_name VARCHAR
            (30) NOT NULL,
            last_name VARCHAR
            (30) NOT NULL,
            PRIMARY KEY
            (id),
            --  manager_id INT NULL REFERNCES employee(id),
            FOREIGN KEY
            (roles_id) REFERENCES roles
            (id),
            FOREIGN KEY
            (manager_id) REFERENCES employee
            (id)
        );
            INSERT INTO department
                (dept_name)
            values('engineering'),
                ('accounting'),
                ('auditing');


            INSERT INTO roles
                (department_id, title, salary)
            VALUES
                (1, 'engineer', 90000),
                (2, "accountant", 78000.78),
                (3, "Nurse", 90000);

            INSERT INTO employee
                (roles_id, manager_id, first_name, last_name)
            values
                (1, null, "Sid", "Bastola"),
                (2, 1, "yalambar", "Thakur"),
                (3, 2, "Som", "Baidhya");

            SELECT
                department.dept_name,
                roles.title,
                roles.salary,
                employee.manager_id,
                employee.first_name,
                employee.last_name
            FROM employee
                INNER JOIN roles on roles.id = employee.roles_id
                INNER JOIN department on department.id = roles.department_id
            ORDER BY roles.title;