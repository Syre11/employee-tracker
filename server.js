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
  db.query(`select concat(manager.first_name, ' ', manager.last_name) as Managers, concat(employees.first_name, ' ', employees.last_name) as Employees, departments.department_name as Department from employees left join employees manager on manager.id = employees.manager_id join roles on (roles.id = employees.role_id && employees.manager_id != 'NULL') join departments on (departments.id = roles.department_id)`, (err, response) => {
    if (err) {
      console.log(err)
    }
    console.table(response)
    mainMenu()
  })
};

// *******************EXTRA**********************
viewEmployeeByDepartment = () => {
  // Can just use join (default is inner join) to filter out the employees without a department. I figured in this use case it would be valuable to see those employees without a department as that is most likely an error
  db.query(`select employees.first_name, employees.last_name, departments.department_name as department from employees left join roles on employees.role_id = roles.id left join departments on roles.department_id = departments.id`, (err, response) => {
    if (err) {
      console.log(err);
    }
    console.table(response);
    mainMenu();
  })
}

// Adds new Department
addDepartment = () => {
  inquirer
  .prompt({
    name: 'newDept',
    type: 'input',
    message: 'What is the department name?'
  })
  .then((response) => {
    db.query('insert into departments (department_name) values (?)', [response.newDept], (err, response) => {
      if (err) {
        console.log(err);
      } else {
      console.log(`Successfully added ${response.newDept} to Departments.`);
      }
      viewDepartments()
    });
  });
};

// Adds new Role
addRole = () => {
  let deptArray = []
  db.query('select * from departments', (err, response) => {
    if (err) {
      console.log(err);
    }
    response.forEach(({ department_name, id }) => {
      deptArray.push({        
        name: id + "-" + department_name
      })
    })
  });

  inquirer
  .prompt([
  {
    name: 'title',
    type: 'input',
    message: 'What is the title of the new role?'
  },
  {
    name: 'salary',
    type: 'input',
    message: 'What is the salary for the new role?'
  },
  {
    name: 'department',
    type: 'list',
    message: 'What department is this role in?',
    choices: deptArray
  }
])
  .then(response => {
    let getDeptID = response.department.split("-")
    db.query(`insert into roles (title, salary, department_id) values ('${response.title}', '${response.salary}', '${getDeptID[0]}')`, (err, response) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`Succesfully added ${response.title} to roles.`);
      }
      viewRoles();
    })
  })
};

// Adds new Employee
addEmployee = () => {
  const managerArray = []
  db.query('select * from employees', (err, response) => {
    if (err) {
      console.log(err)
    }
    response.forEach(({ first_name, last_name, id }) => {
      managerArray.push({
        name: id + "-" + first_name + " " + last_name
      })
    })
  });

  const roleArray = []
  db.query('select * from roles', (err, response) => {
    if (err) {
      console.log(err)
    }
    response.forEach(({ title, id }) => {
      roleArray.push({
        name: id + "-" + title
      });
    });
  })

  inquirer
  .prompt([{
    name: 'first_name',
    type: 'input',
    message: "What is the employee's first name?"
  },
  {
    name: 'last_name',
    type: 'input',
    message: "What is the employee's last name?"
  },
  {
    name: 'role_id',
    type: 'list',
    message: "What is the employee's role?",
    choices: roleArray
  },
  {
    name: 'manager_id',
    type: 'list',
    message: "Who is the employee's manager?",
    choices: managerArray
  }
])
  .then(response => {
    let getManagerId = response.manager_id.split("-")
    let getRoleId = response.role_id.split("-")
    db.query(`insert into employees (first_name, last_name, role_id, manager_id) values ('${response.first_name}', '${response.last_name}', '${getRoleId[0]}', '${getManagerId[0]}')`, (err, response) => {
      if (err) {
        console.log(err);
      } else {
      console.log(`Succesfully added to employees.`);
      }
      viewEmployees();
    })
  })
};

// Updates Employee role
updateEmployee = () => {
  db.query('select * from employees', (err, response) => {
    if (err) {
      console.log(err)
    }

    inquirer
    .prompt([{
        name: 'employee',
        type: 'list',
        message: 'Which employee would you like to update?',
        choices:  function () {
          let updateEmployeeArray = response.map(response => response.id + '-' + response.first_name + ' ' + response.last_name)
          return updateEmployeeArray
        }
    }])
    .then(response => {
      let getEmployeeId = response.employee.split("-")
      db.query('select * from roles', (err, response) => {
        if (err) {
          console.log(err)
        }
        inquirer
        .prompt([{
            name: 'role',
            type: 'list',
            message: 'What is the employees new role?',
            choices: function () {
              let updateRoleArray = response.map(response => response.id + '-' + response.title)
              return updateRoleArray
            }
        }])
        .then(response => {
          let getRoleId = response.role.split('-')
          db.query(`update employees set role_id = '${getRoleId[0]}' where id = '${getEmployeeId[0]}'`)
          console.log(`Successfully updated role for ${response.role}.`)
          viewEmployees()
        })
      })
    })
  })
};

// Updates Employee's Manager
updateEmployeeManager = () => {
  db.query('select * from employees', (err, response) => {
    if (err) {
      console.log(err)
    }

    inquirer
    .prompt([{
        name: 'employee',
        type: 'list',
        message: 'Which employee would you like to update?',
        choices:  function () {
          let updateEmployeeArray = response.map(response => response.id + '-' + response.first_name + ' ' + response.last_name)
          return updateEmployeeArray
        }
    }])
    .then(response => {
      let getEmployeeId = response.employee.split("-")
      db.query('select * from employees', (err, response) => {
        if (err) {
          console.log(err)
        }
        inquirer
        .prompt([{
            name: 'manager',
            type: 'list',
            message: "Who is the employee's new manager?",
            choices: function () {
              let updateManagerArray = response.map(response => response.id + '-' + response.first_name + " " + response.last_name)
              return updateManagerArray
            }
        }])
        .then(response => {
          let getManagerId = response.manager.split('-')
          db.query(`update employees set manager_id = '${getManagerId[0]}' where id = '${getEmployeeId[0]}'`)
          console.log(`Successfully updated employee's manager to ${response.manager}.`)
          viewEmployees()
        })
      })
   })
  })
};

// *******************EXTRA**********************
// Delete's Department
deleteDepartment = () => {
  db.query('select * from departments', (err, response) => {
    if (err) {
      console.log(err)
    }

    inquirer
    .prompt([{
      name: 'department',
      type: 'list',
      message: 'Which department would you like to delete?',
      choices: function () {
        let deleteDeptArray = response.map(response => response.department_name)
        return deleteDeptArray
      }
    }])
    .then(response => {
      db.query(`delete from departments where department_name = '${response.department}'`)
      console.log(`Successfully deleted ${response.department} department.`)
      viewDepartments()
    })
  })
};

// *******************EXTRA**********************
// Delete's Role
deleteRole = () => {
  db.query('select * from roles', (err, response) => {
    if (err) {
      console.log(err)
    }

    inquirer
    .prompt([{
      name: 'role',
      type: 'list',
      message: 'Which role would you like to delete?',
      choices: function () {
        let deleteRoleArray = response.map(response => response.title)
        return deleteRoleArray
      }
    }])
    .then(response => {
      db.query(`delete from roles where title = '${response.role}'`)
      console.log(`Successfully deleted ${response.role} role.`)
      viewRoles()
    })
  })
};

// *******************EXTRA**********************
// Delete's Employee
deleteEmployee = () => {
  db.query('select * from employees', (err, response) => {
    if (err) {
      console.log(err)
    }

    inquirer
    .prompt([{
      name: 'employee',
      type: 'list',
      message: 'Which employee would you like to delete?',
      choices: function () {
        let deleteEmployeeArray = response.map(response => response.id + '-' + response.first_name + ' ' + response.last_name)
        return deleteEmployeeArray
      }
    }])
    .then(response => {
      let employeeID = response.employee.split('-')
      db.query(`delete from employees where id = '${employeeID[0]}'`)
      console.log(`Successfully deleted ${response.employee} from employees.`)
      viewEmployees()
    })
  })
};

// *******************EXTRA**********************
// Shows table of total cost of salaries by Department
viewDepartmentBudget = () => {
  db.query(`select department_id, departments.department_name, sum(salary) as budget from roles join departments on roles.department_id = departments.id group by department_id`, (err, response) => {
    if (err) {
      console.log(err)
    }
    console.table(response)
    mainMenu()
  })
};

mainMenu()