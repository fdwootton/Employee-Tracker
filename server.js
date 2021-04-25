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


const start = () => {
    inquirer
      .prompt({
        name: 'chooseAction',
        type: 'list',
        message: 'What would you like to do?',
        choices: ['View All Employees', 
        'View All Employees By Department', 
        'View All Employees By Manager',
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
        else {
          connection.end();
        }
      });
};


const viewAllEmployees = () => {
    connection.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name 
    AS department, role.salary, 
    CONCAT(manager.first_name, " ", manager.last_name) 
    AS manager
    FROM employee 
    LEFT JOIN employee manager on manager.id = employee.manager_id
    INNER JOIN role 
    ON (role.id = employee.role_id) 
    INNER JOIN department 
    ON (department.id = role.department_id)
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
        choices: ['Continue', 
        'Exit']
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
        viewEngineerDept();
      } else if (answer.chooseAction === 'Finance') {
        viewFinanceDept();
      } else if (answer.chooseAction === 'Legal'){
        viewLegalDept();
      } else if (answer.chooseAction === 'Sales'){
        viewSalesDept();
      }
      else {
        connection.end();
      }
    });
};


const viewEngineerDept = () => {
    connection.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name 
    AS department, role.salary, 
    CONCAT(manager.first_name, " ", manager.last_name) 
    AS manager
    FROM employee 
    LEFT JOIN employee manager on manager.id = employee.manager_id
    INNER JOIN role 
    ON (role.id = employee.role_id) 
    INNER JOIN department 
    ON (department.id = role.department_id)
    ORDER BY department`, (err, results) => {
        if (err) throw err;
        console.table(results);
        continueOrExit();
    })
};


const viewFinanceDept = () => {
    connection.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name 
    AS department, role.salary, 
    CONCAT(manager.first_name, " ", manager.last_name) 
    AS manager
    FROM employee 
    LEFT JOIN employee manager on manager.id = employee.manager_id
    INNER JOIN role 
    ON (role.id = employee.role_id) 
    INNER JOIN department 
    ON (department.id = role.department_id)
    ORDER BY department`, (err, results) => {
        if (err) throw err;
        console.table(results);
        continueOrExit();
    })
};


const viewLegalDept = () => {
    connection.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name 
    AS department, role.salary, 
    CONCAT(manager.first_name, " ", manager.last_name) 
    AS manager
    FROM employee 
    LEFT JOIN employee manager on manager.id = employee.manager_id
    INNER JOIN role 
    ON (role.id = employee.role_id) 
    INNER JOIN department 
    ON (department.id = role.department_id)
    ORDER BY department`, (err, results) => {
        if (err) throw err;
        console.table(results);
        continueOrExit();
    })
};


const viewSalesDept = () => {
    connection.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name 
    AS department, role.salary, 
    CONCAT(manager.first_name, " ", manager.last_name) 
    AS manager
    FROM employee 
    LEFT JOIN employee manager on manager.id = employee.manager_id
    INNER JOIN role 
    ON (role.id = employee.role_id) 
    INNER JOIN department 
    ON (department.id = role.department_id)
    ORDER BY department`, (err, results) => {
        if (err) throw err;
        console.table(results);
        continueOrExit();
    })
};


const viewByManager = () => {
    connection.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name 
    AS department, role.salary, 
    CONCAT(manager.first_name, " ", manager.last_name) 
    AS manager
    FROM employee 
    LEFT JOIN employee manager on manager.id = employee.manager_id
    INNER JOIN role 
    ON (role.id = employee.role_id) 
    INNER JOIN department 
    ON (department.id = role.department_id)
    ORDER BY manager.id`, (err, results) => {
        if (err) throw err;
        console.table(results);
        continueOrExit();
    })
};


const addEmployee = () => {
    inquirer
      .prompt([
        {
          name: 'employeeFirstName',
          type: 'input',
          message: "Enter employee's first name:",
        },
        {
          name: 'employeeLastName',
          type: 'input',
          message: "Enter employee's last name:",
        },
        {
            name: 'employeeRole',
            type: 'list',
            message: "Select employee's role:",
            choices: ['Salesperson', 
            'Sales Lead', 
            'Software Engineer', 
            'Lead Engineer',
            'Lawyer', 
            'Legal Team Lead',
            'Accountant']
        },
        {
            name: 'employeeManager',
            type: 'list',
            message: "Select employee's manager:",
            choices: ['Ashley Rodriguez', 
            'Mike Chan', 
            'John Doe', 
            'Sarah Lourde',
            'None']
        }
      ])
      .then((answer) => {
        connection.query(
          'INSERT INTO employee SET ?',
          // QUESTION: What does the || 0 do?
          {
            item_name: answer.item,
            category: answer.category,
            starting_bid: answer.startingBid || 0,
            highest_bid: answer.startingBid || 0,
          },
          (err) => {
            if (err) throw err;
            console.log('Your auction was created successfully!');
            start();
          }
        );
      });
};

const addDept = () => {
inquirer
    .prompt([
    {
        name: 'employeeFirstName',
        type: 'input',
        message: "Enter employee's first name:",
    },
    {
        name: 'employeeLastName',
        type: 'input',
        message: "Enter employee's last name:",
    },
    {
        name: 'employeeRole',
        type: 'list',
        message: "Select employee's role:",
        choices: ['Salesperson', 
        'Sales Lead', 
        'Software Engineer', 
        'Lead Engineer',
        'Lawyer', 
        'Legal Team Lead',
        'Accountant']
    },
    {
        name: 'employeeManager',
        type: 'list',
        message: "Select employee's manager:",
        choices: ['Ashley Rodriguez', 
        'Mike Chan', 
        'John Doe', 
        'Sarah Lourde',
        'None']
    }
    ])
    .then((answer) => {
    connection.query(
        'INSERT INTO employee SET ?',
        // QUESTION: What does the || 0 do?
        {
        item_name: answer.item,
        category: answer.category,
        starting_bid: answer.startingBid || 0,
        highest_bid: answer.startingBid || 0,
        },
        (err) => {
        if (err) throw err;
        console.log('Your auction was created successfully!');
        start();
        }
    );
    });
};

const addRole = () => {
inquirer
    .prompt([
    {
        name: 'employeeFirstName',
        type: 'input',
        message: "Enter employee's first name:",
    },
    {
        name: 'employeeLastName',
        type: 'input',
        message: "Enter employee's last name:",
    },
    {
        name: 'employeeRole',
        type: 'list',
        message: "Select employee's role:",
        choices: ['Salesperson', 
        'Sales Lead', 
        'Software Engineer', 
        'Lead Engineer',
        'Lawyer', 
        'Legal Team Lead',
        'Accountant']
    },
    {
        name: 'employeeManager',
        type: 'list',
        message: "Select employee's manager:",
        choices: ['Ashley Rodriguez', 
        'Mike Chan', 
        'John Doe', 
        'Sarah Lourde',
        'None']
    }
    ])
    .then((answer) => {
    connection.query(
        'INSERT INTO employee SET ?',
        // QUESTION: What does the || 0 do?
        {
        item_name: answer.item,
        category: answer.category,
        starting_bid: answer.startingBid || 0,
        highest_bid: answer.startingBid || 0,
        },
        (err) => {
        if (err) throw err;
        console.log('Your auction was created successfully!');
        start();
        }
    );
    });
};
  

const updateEmployeeRole = () => {
    inquirer
        .prompt([
        {
            name: 'employeeFirstName',
            type: 'input',
            message: "Enter employee's first name:",
        },
        {
            name: 'employeeLastName',
            type: 'input',
            message: "Enter employee's last name:",
        },
        {
            name: 'employeeRole',
            type: 'list',
            message: "Select employee's role:",
            choices: ['Salesperson', 
            'Sales Lead', 
            'Software Engineer', 
            'Lead Engineer',
            'Lawyer', 
            'Legal Team Lead',
            'Accountant']
        },
        {
            name: 'employeeManager',
            type: 'list',
            message: "Select employee's manager:",
            choices: ['Ashley Rodriguez', 
            'Mike Chan', 
            'John Doe', 
            'Sarah Lourde',
            'None']
        }
        ])
        .then((answer) => {
            connection.query(
                'INSERT INTO employee SET ?',
                // QUESTION: What does the || 0 do?
                {
                item_name: answer.item,
                category: answer.category,
                starting_bid: answer.startingBid || 0,
                highest_bid: answer.startingBid || 0,
                },
                (err) => {
                if (err) throw err;
                console.log('Your auction was created successfully!');
                start();
                }
            );
        });
};


connection.connect((err) => {
    if (err) throw err;
    console.log(`Welcome to the Employee Tracker!`);
    start();
});
