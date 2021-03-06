const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');


const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'rooT1518!',
    database: 'employee_db',
});


connection.connect((err) => {
  if (err) throw err;
  console.log(`Welcome to the Employee Tracker!`);
  start();
});


const start = () => {
    inquirer
      .prompt({
        name: 'chooseAction',
        type: 'list',
        message: 'What would you like to do?',
        choices: ['View All Employees', 
        'View All Employees By Department', 
        'View All Employees By Manager',
        'View All Departments',
        'View All Roles',
        'Add Employee',
        'Add Role',
        'Add Department', 
        'Update Employee Role',
        'Exit'],
      })
      .then((answer) => {
        if (answer.chooseAction === 'View All Employees') {
          viewAllEmployees();
        } else if (answer.chooseAction === 'View All Employees By Department') {
          viewByDept();
        } else if (answer.chooseAction === 'View All Employees By Manager'){
          viewByManager();
        } else if (answer.chooseAction === 'View All Departments'){
          viewAllDepts();
        } else if (answer.chooseAction === 'View All Roles'){
          viewAllRoles();
        } else if (answer.chooseAction === 'Add Employee'){
          addEmployee();
        } else if (answer.chooseAction === 'Add Role'){
          addRole();
        } else if (answer.chooseAction === 'Add Department'){
          addDept();
        } else if (answer.chooseAction === 'Update Employee Role'){
          updateEmployeeRole();
        } else if (answer.chooseAction === 'Exit'){
            console.log('Good-Bye!');
            connection.end();
        }
      });
};


const viewAllEmployees = () => {
    connection.query(`SELECT employee.id, 
    CONCAT(employee.first_name, " ", employee.last_name) AS name, 
    role.title, 
    department.name AS department, 
    role.salary, 
    CONCAT(newTable.first_name, " ", newTable.last_name) AS manager
    FROM employee 
    LEFT JOIN employee AS newTable 
    ON newTable.id = employee.manager_id
    INNER JOIN role 
    ON role.id = employee.role_id 
    INNER JOIN department 
    ON department.id = role.department_id
    ORDER BY employee.id`, (err, results) => {
        if (err) throw err;
        console.table(results);
        continueOrExit();
    })
};


const continueOrExit = () => {
    inquirer
      .prompt({
        name: 'continueOrExit',
        type: 'list',
        message: 'Would you like to continue or exit?',
        choices: ['Continue', 'Exit']
      })
      .then((answer) => {
        if (answer.continueOrExit === 'Continue') {
          start();
        }
        else {
          console.log('Good-Bye!')
          connection.end();
        }
      });
};


const viewByDept = () => {
    inquirer
    .prompt({
      name: 'chooseDept',
      type: 'list',
      message: 'Choose a department:',
      choices: ['Engineering', 
      'Finance', 
      'Legal', 
      'Sales']
    })
    .then((answer) => {
      if (answer.chooseDept === 'Engineering') {
        connection.query('SELECT employee.id, employee.first_name, employee.last_name FROM employee WHERE role_id in (3, 4)', 
        (err, results) => {
            if (err) throw err;
            console.table(results);
            continueOrExit();
        })
      } else if (answer.chooseDept === 'Finance') {
        connection.query('SELECT employee.id, employee.first_name, employee.last_name FROM employee WHERE role_id=5', 
        (err, results) => {
            if (err) throw err;
            console.table(results);
            continueOrExit();
        })
      } else if (answer.chooseDept === 'Legal'){
        connection.query('SELECT employee.id, employee.first_name, employee.last_name FROM employee WHERE role_id in (6, 7)', 
        (err, results) => {
            if (err) throw err;
            console.table(results);
            continueOrExit();
        })
      } else if (answer.chooseDept === 'Sales'){
        connection.query('SELECT employee.id, employee.first_name, employee.last_name FROM employee WHERE role_id in (1, 2)', 
        (err, results) => {
            if (err) throw err;
            console.table(results);
            continueOrExit();
        })
      }
    });
};


const viewByManager = () => {
    inquirer
    .prompt({
      name: 'chooseManager',
      type: 'list',
      message: 'Choose a manager:',
      choices: ['Ashley Rodriguez', 
      'John Doe', 
      'Mike Chan', 
      'Sarah Lourd']
    })
    .then((answer) => {
        if(answer.chooseManager === 'Ashley Rodriguez') {
            connection.query('SELECT employee.id, employee.first_name, employee.last_name FROM employee WHERE manager_id=3', (err, results) => {
                if (err) throw err;
                console.table(results);
                continueOrExit();
            })
        } else if(answer.chooseManager === 'John Doe') {
            connection.query('SELECT employee.id, employee.first_name, employee.last_name FROM employee WHERE manager_id=1', (err, results) => {
                if (err) throw err;
                console.table(results);
                continueOrExit();
            })
        } else if(answer.chooseManager === 'Mike Chan') {
            connection.query('SELECT employee.id, employee.first_name, employee.last_name FROM employee WHERE manager_id=2', (err, results) => {
                if (err) throw err;
                console.table(results);
                continueOrExit();
            })
        } else if(answer.chooseManager === 'Sarah Lourd') {
            connection.query('SELECT employee.id, employee.first_name, employee.last_name FROM employee WHERE manager_id=6', (err, results) => {
                if (err) throw err;
                console.table(results);
                continueOrExit();
            })
        }
    })
};


const viewAllDepts = () => {
  connection.query(`SELECT * FROM department`, (err, results) => {
      if (err) throw err;
      console.table(results);
      continueOrExit();
  })
};

const viewAllRoles = () => {
  connection.query(`SELECT role.id, role.title FROM role`, (err, results) => {
      if (err) throw err;
      console.table(results);
      continueOrExit();
  })
};



const addEmployee = () => {
    inquirer
      .prompt([
        {
          name: 'first_name',
          type: 'input',
          message: "Enter employee's first name:",
        },
        {
          name: 'last_name',
          type: 'input',
          message: "Enter employee's last name:",
        },
        {
            name: 'role_id',
            type: 'input',
            message: "Enter employee's role ID:",
        },
        {
            name: 'manager_id',
            type: 'input',
            message: "Enter employee's manager ID:",
        }
      ])
      .then((answer) => {
        connection.query(
          'INSERT INTO employee SET ?',
        {
          first_name: answer.first_name,
          last_name: answer.last_name,
          manager_id: answer.manager_id,
          role_id: answer.role_id,
        },
          (err, results) => {
            if (err) throw err;
          }
        );
        
        console.log('Employee successfully added!');
        continueOrExit();
      });
};


const addRole = () => {
  inquirer
    .prompt([
      {
        name: 'title',
        type: 'input',
        message: "Enter title of new role:",
      },
      {
        name: 'salary',
        type: 'input',
        message: "Enter salary of role:",
      },
      {
          name: 'department_id',
          type: 'input',
          message: "Enter department ID of role:",
      },
    ])
    .then((answer) => {
      connection.query(
        'INSERT INTO role SET ?',
      {
        title: answer.title,
        salary: answer.salary,
        department_id: answer.department_id,
      },
        (err, results) => {
          if (err) throw err;
        }
      );
      
      console.log('Role successfully added!');
      continueOrExit();
    });
};


const addDept = () => {
  inquirer
    .prompt([
      {
        name: 'name',
        type: 'input',
        message: "Enter name of new department:",
      },
    ])
    .then((answer) => {
      connection.query(
        'INSERT INTO department SET ?',
      {
        name: answer.name,
      },
        (err, results) => {
          if (err) throw err;
        }
      );
      
      console.log('Department successfully added!');
      continueOrExit();
    });
};


// const updateEmployeeRole = () => {

//   const roles = getRoles();
//   const employees = getEmployees();
//   //get all employees
//   //get all roles

//   inquirer
//     .prompt([
//       {
//         name: 'employee_name',
//         type: 'list',
//         message: "Select an employee to update:",
//         choices: [employees], //results from get all employees //map
//       },
//       {
//         name: 'employee_role',
//         type: 'list',
//         message: "Select a new role:",
//         choices: [roles], //results from get all roles //map
//       },
//     ])
//     .then((answer) => {
//       connection.query(
//         'UPDATE employee SET ? WHERE ?',
//             [
//               {
//                 ???: answer.employee_role,
//               },
//               {
//                 ???: ???,
//               },
//             ],
//         (err, results) => {
//           if (err) throw err;
//         }
//       );
      
//       // console.log('Employee role successfully updated!')
//       continueOrExit();
//     });
// };


const getRoles = () => {
  return new Promise(function(resolve, reject){
    connection.query('SELECT role.title FROM role', (err, results) => {
      if (err) reject(new Error("there was an error"));
      console.log(results);
      resolve(results);
    })
  })
}

const getEmployees = () => {
  return new Promise(function(resolve, reject){
    connection.query('SELECT CONCAT(employee.first_name, " ", employee.last_name) AS name FROM employee', (err, results) => {
      if (err) reject(new Error("there was an error"));
      console.log(results);
      resolve(results);
    })
  })
}


