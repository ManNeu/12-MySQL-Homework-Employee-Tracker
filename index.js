var mysql = require("mysql");
var inquirer = require("inquirer");



var connection = mysql.createConnection({
    host: "localhost",

    // Your port; 
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "Nepal123!",
    database: "employeeInformation_DB"
});
// connect to mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    runSearch();
});
// runSearch();
function runSearch() {
    inquirer
        .prompt({
            name: "action",
            type: "rawlist",
            message: "What would you like to do?",
            choices: [
                "Add departments, roles, employees.",
                "View departments, roles, employees.",
                "Update employee roles.",
                "exit"
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

                case "exit":
                    connection.end();
                    break;
            }
        });


    function addTable() {
        inquirer
            .prompt({
                name: "action",
                type: "rawlist",
                message: "what would you like to add?",
                choices: [
                    "Add department",
                    "Add Roles",
                    "Add employees",
                    "exit"
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

                    case "exit":
                        connection.end();
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
                // when finished prompting, insert a new item into the db with that info
                connection.query(
                    "INSERT INTO department SET ?",
                    {
                        dept_name: answer.addDepart
                    },
                    function (err) {
                        if (err) throw err;
                        console.log("department was added successfully!");
                        // re-prompt the user for if they want to add more department
                        addRoles();
                    });
            });
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
                connection.query(
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
                        addEmployees();


                    });
            });
    }
    function addEmployees() {
        inquirer.prompt([
            {
                name: "rolesID",
                type: "input",
                message: "enter roles-id"
            },
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
                connection.query(
                    "INSERT INTO employee SET ?",
                    {
                        first_name: answer.addFirstname,
                        last_name: answer.addLastname
                    },
                    function (err) {
                        if (err) throw err;


                        // re-prompt the user for if they want to add more department

                        console.log("Employee was added successfully!");
                        runSearch();
                    });
            });
    }
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
                "View Employees",
                "exit"
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
                case "exit":
                    connection.end();
                    break;
            }
        })
}
function viewDepartments() {
    var query = "SELECT * FROM department";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.log(res);
        connection.end();
    });
};

function viewRoles() {
    var query = "SELECT * FROM roles";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.log(res)
        connection.end();

    });
};
function viewEmployee() {
    var query = "SELECT * FROM employee";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.log(res);
        connection.end();
    });
}

function updateTable() {
    inquirer
        .prompt([
            {
                name: "change",
                type: "input",
                message: "what title you want to update?"
            },
            {
                name: "roles",
                type: "input",
                message: "Into what employee roles you want to update?"

            }])
        .then(function (answer) {
            // inserting the prompt result to db
            var query = `UPDATE roles SET title = '${answer.roles}' WHERE title = '${answer.change}'`;

            connection.query(query,
                function (err, res) {
                    if (err) throw err;
                    console.log("role was updated successfully");
                    // re-prompt the user
                    runSearch();


                });
        });
}
