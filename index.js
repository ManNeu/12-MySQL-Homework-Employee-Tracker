var mysql = require("mysql");
var inquirer = require("inquirer");
var express = require("express");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; 
    port: 8008,

    // Your username
    user: "root",

    // Your password
    password: "Nepal123!",
    database: "Employee-information"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("server started at 8008");
    runSearch();
});
function runSearch() {
    inquirer
        .prompt({
            name: "action",
            type: "rawlist",
            message: "What would you like to do?",
            choices: [
                "Add departments, roles, employees.",
                "View departments, roles, employees.",
                "Update employee roles"
            ]

        })
        .then((answer) => {
            switch (answer.action) {
                case "Add departments, roles, employees.":
                    addTable();
                    break;
                case "View departments, roles, employees.":
                    viewTable();
                    break;
                case "Update employee roles":
                    updateTable();
                    break;
            }
        })
}

function addTable() {
    inquirer
        .prompt({
            name: "action",
            type: "rawlist",
            message: "what would you like to add?",
            choices: [
                "Add department",
                "Add Roles",
                "Add employees"
            ]
        })
        .then((answer) => {
            switch (answer.action) {
                case "Add department":
                    addDepartment();
                    break;
                case "Add Roles":
                    addRoles();
                    break;
                case "Add employees":
                    addEmployees();
                    break;
            }
        })
}
function addDepartment() {
    inquirer.prompt(
        {
            name: "addDepart",
            type: "input",
            message: "what department would you like to add?",

        })
        .then(function (answer) {
            "INSERT INTO department SET ?",
            {
                dept_name: answer.addDepart
            },
                function (err) {
                    if (err) throw err;
                    console.log("department was added successfully!");
                    // re-prompt the user for if they want to add more department
                    addDepartment();
                }
        })
}
function addRoles() {
    inquirer.prompt([
        {
            name: "depID",
            type: "input",
            message: "enter the integer value for department id"

        },
        {
            name: "addTitle",
            type: "input",
            message: "what title role are we adding?"
        },
        {
            name: "addSalary",
            Type: "Input",
            message: "what is the salary?"
        }

    ])
        .then(function (answer) {
            "INSERT INTO roles SET ?",
            {
                department_id: answer.depID,
                title: answer.addTitle,
                salary: answer.addSalary
            },
                function (err) {
                    if (err) throw err;
                    console.log("Role was added successfully!");
                    // re-prompt the user for if they want to add more department
                    addRoles();
                }
        })
}
function addEmployees() {
    inquirer.prompt([
        {
            name: "addFirstname",
            type: "input",
            message: "Enter first name of new employee?"
        },

        {
            name: "addLastname",
            type: "input",
            message: "Enter last name of employee"
        }
    ])
        .then(function (answer) {
            "INSERT INTO employee SET ?",
            {
                first_name: answer.addFirstname,
                last_name: answer.addLastname
            },
                function (err) {
                    if (err) throw err;
                    console.log("Employee was added successfully!");
                    // re-prompt the user for if they want to add more department
                    addEmployees();
                }
        })
}
function viewTable() {

    inquirer
        .prompt({
            name: "action",
            type: "rawlist",
            message: "What you want to view?",
            choices: [
                "View Departments",
                "View Roles",
                "View Employees"
            ]
        })
        .then((answer) => {
            switch (answer.action) {
                case "View Departments":
                    viewDepartments()
                    break;
                case "View Roles":
                    viewRoles();
                    break;
                case "View Employees":
                    viewEmployee();
                    break;

            }
        })
}
function viewDepartments() {
    var query = "SELECT * FROM department";
    connection.query(query, function (err, res) {
        if (err) throw err;
        res.send(result);
    });
};

function viewRoles() {
    var query = "SELECT * FROM roles";
    connection.query(query, function (err, res) {
        if (err) throw err;
        res.send(result);

    });
};
function viewEmployee() {
    var query = "SELECT * FROM employee";
    connection.query(query, function (err, res) {
        if (err) throw err;
        res.send(result);
    });
}

function updateTable() {
    inquirer
        .prompt(
            {
                name: "roles",
                type: "input",
                message: "What employee roles you want to update?"

            })
        .then(function (answer) {
            // inserting the prompt result to db
            connection.query(
                "UPDATE roles SET ?",
                {
                    title: answer.roles
                },
                function (err) {
                    if (err) throw err;
                    console.log("role was updated successfully");
                    // re-prompt the user for if they want to update any role
                    updateTable();
                });
        })
}

