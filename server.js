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
                viewDepartments();
                break;
            case "View all Roles":
                viewRoles();
                break;
            case "View all Employees":
                viewEmployees();
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
                console.log("Goodbye!");
                db.end();
        }
    })
}
function init() {
    initialPrompt();
}
function viewDepartments() {
    let query = "SELECT * FROM department"
    db.promise().query(query)
      .then(([rows,fields]) => {
          console.table(rows);
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
              viewDepartments();
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
              initialPrompt();
            })
            .catch(console.log);
        })
    })
}

init();