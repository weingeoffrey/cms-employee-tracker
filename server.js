const db = require('./db/connection');
const inquirer = require('inquirer');
const cTable = require('console.table');
const { allowedNodeEnvironmentFlags } = require('process');

// Begin Functions
function initialPrompt() {
    inquirer.prompt({
        type: "list",
        name: "task",
        message: "What would you like to do?",
        loop: false,
        pageSize: 9,
        choices: [
            "View all Departments",
            "View all Roles",
            "View all Employees",
            "Add a Department",
            "Add a Role",
            "Add an Employee",
            "Update an Employee's Role",
            new inquirer.Separator(),
            "End"
        ]
    })
    .then(function ({task}) {
        switch (task) {
            case "View all Departments":
                console.log("=====================================================")
                viewDepartments();
                console.log("=====================================================")
                break;
            case "View all Roles":
                console.log("=====================================================")
                viewRoles();
                console.log("=====================================================")
                break;
            case "View all Employees":
                console.log("=====================================================")
                viewEmployees();
                console.log("=====================================================")
                break;
            case "Add a Department":
                addDepartment();
                break;
            case "Add a Role":
                addRole();
                break;
            case "Add an Employee":
                addEmployee();
                break;
            case "Update an Employee's Role":
                updateEmployee();
                break;
            case "End":
                console.log("=====================================================")
                console.log("Goodbye!");
                console.log("=====================================================")
                db.end();
        }
    })
}
function init() {
    console.log(
`

█▀▀ █▀▄▀█ █▀█ █░░ █▀█ █▄█ █▀▀ █▀▀   ▀█▀ █▀█ ▄▀█ █▀▀ █▄▀ █▀▀ █▀█
██▄ █░▀░█ █▀▀ █▄▄ █▄█ ░█░ ██▄ ██▄   ░█░ █▀▄ █▀█ █▄▄ █░█ ██▄ █▀▄

`        
)
    initialPrompt();
}
function viewDepartments() {
    let query = "SELECT * FROM department"
    db.promise().query(query)
      .then(([rows,fields]) => {
          console.table(rows);
          console.log("=====================================================")
          initialPrompt();
      })
      .catch(console.log);
}

function viewRoles() {
    let query = `SELECT r.title, r.id, d.name, r.salary 
                 FROM roles r
                 LEFT JOIN department d ON r.department_id = d.id`
    db.promise().query(query)
      .then(([rows,fields]) => {
          console.table(rows);
          console.log("=====================================================")
          initialPrompt();
      })
      .catch(console.log);
}

function viewEmployees() {
    let query = `SELECT e.id, e.first_name, e.last_name, r.title, d.name, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
                 FROM employee e
                 LEFT JOIN roles r ON e.role_id = r.id
                 LEFT JOIN department d ON r.department_id = d.id
                 LEFT JOIN employee m ON m.id = e.manager_id`
    db.promise().query(query)
      .then(([rows,fields]) => {
          console.table(rows);
          console.log("=====================================================")
          initialPrompt();
      })
      .catch(console.log);
}

function addDepartment() {
    inquirer.prompt([
        {
            type: "input",
            name: "department_name",
            message: "Enter department name:"
        },
    ])
      .then((answer) => {
          let query =  `INSERT INTO department (name)
                        VALUES ('${answer.department_name}')`
          db.promise().query(query).then(([rows,fields]) => {
              console.log("Department added!");
              console.log("=====================================================")
              initialPrompt();
            })
            .catch(console.log);
        })
}

function addRole() {
    let query = 'SELECT * FROM department';
    db.promise().query(query).then(([rows, fields]) => {
        choices = rows.map(({id, name}) => (
            `${id} ${name}`
        ));
        inquirer.prompt([
            {
                type: "input",
                name: "role_title",
                message: "Enter the role title:"
            },
            {
                type: "number",
                name: "salary_amount",
                message: "Enter the salary amount:"
            },
            {
                type: "list",
                name: "department",
                message: "Select the department:",
                loop: false,
                choices: choices
            }
        ])
        .then((answer) => {
            let query = `INSERT INTO roles 
                            (title, salary, department_id)
                         VALUES
                            ('${answer.role_title}', ${answer.salary_amount}, ${answer.department.charAt(0)})`;
            db.promise().query(query).then(([rows,fields]) => {
              console.log("Role added!");
              console.log("=====================================================")
              initialPrompt();
            })
            .catch(console.log);
        })
    })
}

function addEmployee() {
    let query = `SELECT id, title FROM roles`;
    db.promise().query(query).then(([rows, fields]) => {
        roleChoices = rows.map(({id, title}) => (
            `${id} ${title}`
        ));
        
        let query = `SELECT id, CONCAT(first_name, " ", last_name) AS manager from employee`
        db.promise().query(query).then(([rows, fields]) => {
            managerChoices = rows.map(({id, manager}) => (
                `${id} ${manager}`
            ));
            inquirer.prompt([
                {
                    type: "input",
                    name: "first_name",
                    message: "Enter the Employee's First Name:"
                },
                {
                    type: "input",
                    name: "last_name",
                    message: "Enter the Employee's Last Name:"
                },
                {
                    type: "list",
                    name: "role",
                    message: "Select the role:",
                    loop: false,
                    choices: roleChoices
                },
                {
                    type: "list",
                    name: "manager",
                    message: "Select the manager:",
                    loop: false,
                    choices: managerChoices
                }
            ])
            .then((answer) => {
                let query = `INSERT INTO employee
                                (first_name, last_name, role_id, manager_id)
                             VALUES
                                ('${answer.first_name}', '${answer.last_name}', ${answer.role.charAt(0)}, ${answer.manager.charAt(0)})`;
                db.promise().query(query).then(([rows,fields]) => {
                    console.log("Employee added!");
                    console.log("=====================================================")
                    initialPrompt();
                })
                .catch(console.log);
            })
        })
    })
}

function updateEmployee() {
    let query = `SELECT id, title FROM roles`;
    db.promise().query(query).then(([rows, fields]) => {
        roleChoices = rows.map(({id, title}) => (
            `${id} ${title}`
        ));
        
        let query = `SELECT id, CONCAT(first_name, " ", last_name) AS employee from employee`
        db.promise().query(query).then(([rows, fields]) => {
            employeeChoices = rows.map(({id, employee}) => (
                `${id} ${employee}`
            ));
            inquirer.prompt([
                {
                    type: "list",
                    name: "employee",
                    message: "Select the Employee you'd like to update:",
                    choices: employeeChoices
                },
                {
                    type: "list",
                    name: "role",
                    message: "Select the role:",
                    loop: false,
                    choices: roleChoices
                },
            ])
            .then((answer) => {
                let query = `UPDATE employee
                             SET role_id = ${answer.role.charAt(0)}
                             WHERE id = ${answer.employee.charAt(0)}`;
                db.promise().query(query).then(([rows,fields]) => {
                    console.log("=====================================================")
                    console.log("Employee Role Updated!");
                    initialPrompt();
                })
                .catch(console.log);
            })
        })
    })
}

init();