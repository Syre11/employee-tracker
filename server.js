const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Tried using dotenv, but I was struggling to get it to work and I didn't want to waste any time on it when I know this will work and we will learn more about .env later
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'asdf',
    database: 'team_db',
  },
  console.log('Connected to the team_db database.')
);

mainMenu = () => {
  inquirer
  .prompt({
    name: 'choice',
    type: 'list',
    message: 'What would you like to do?',
    choices: [
      'View all Departments',
      'View all Roles',
      'View all Employees',
      'View Employees by Manager',
      'View Employees by Department',
      'Add new Department',
      'Add new Role',
      'Add new Employee',
      'Update Employee',
      'Update Employees Manager',
      'Delete Department',
      'Delete Role',
      'Delete Employee',
      'View total utilized budget by Department',
      'Quit'
    ]
  })
  .then((response) => {
    if (response.choice === 'View all Departments') {
      viewDepartments()
    }

    if (response.choice === 'View all Roles') {
      viewRoles()
    }

    if (response.choice === 'View all Employees') {
      viewEmployees()
    }

    if (response.choice === 'View Employees by Manager') {
      viewEmployeeByManager()
    }

    if (response.choice === 'View Employees by Department') {
      viewEmployeeByDepartment()
    }

    if (response.choice === 'Add new Department') {
      addDepartment()
    }

    if (response.choice === 'Add new Role') {
      addRole()
    }

    if (response.choice === 'Add new Employee') {
      addEmployee()
    }
    if (response.choice === 'Update Employee') {
      updateEmployee()
    }

    if (response.choice === 'Update Employees Manager') {
      updateEmployeeManager()
    }

    if (response.choice === 'Delete Department') {
      deleteDepartment()
    }

    if (response.choice === 'Delete Role') {
      deleteRole()
    }

    if (response.choice === 'Delete Employee') {
      deleteEmployee()
    }

    if (response.choice === 'View total utilized budget by Department') {
      viewDepartmentBudget()
    }

    if (response.choice === 'Quit') {
      db.end()
    }
  })
};

// Displays table of current Departments
viewDepartments = () => {
  db.query('select * from departments', (err, result) => {
    if (err) {
      console.log(err);
    }
    console.table(result);
    mainMenu()
  });
};

// Displays table of current Roles
viewRoles = () => {
  db.query('select * from roles', (err, response) => {
    if (err) {
      console.log(err);
    }
    console.table(response);
    mainMenu()
  });
};

// Displays table of current Employees
viewEmployees = () => {
  db.query('select * from employees', (err, response) => {
    if (err) {
      console.log(err);
    }
    console.table(response);
    mainMenu()
  });
};

// *******************EXTRA**********************
viewEmployeeByManager = () => {

};

// *******************EXTRA**********************
viewEmployeeByDepartment = () => {

}

// Adds new Department
addDepartment = () => {

};

// Adds new Role
addRole = () => {

};

// Adds new Employee
addEmployee = () => {

};

// Updates Employee role
updateEmployee = () => {

};

// Updates Employee's Manager
updateEmployeeManager = () => {

};

// *******************EXTRA**********************
// Delete's Department
deleteDepartment = () => {

};

// *******************EXTRA**********************
// Delete's Role
deleteRole = () => {

};

// *******************EXTRA**********************
// Delete's Employee
deleteEmployee = () => {

};

// *******************EXTRA**********************
// Shows table of total cost of salaries by Department
viewDepartmentBudget = () => {

};

mainMenu()