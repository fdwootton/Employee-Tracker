const mysql = require('mysql');
const inquirer = require('inquirer');
require('console.table');


const connection = mysql.createConnection({
    host: 'localhost',
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: 'root',
  
    // Your password
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
        'Exit'],
      })
      .then((answer) => {
        if (answer.chooseAction === 'View All Employees') {
          viewAllEmployees();
        } else if (answer.chooseAction === 'View All Employees By Department') {
          viewByDept();
        } else if (answer.chooseAction === 'View All Employees By Manager'){
          viewByManager();
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
      connection.query('SELECT * FROM employee_db.employee', (err, results) => {
          if (err) throw err;
          console.log(results);
      })
  }

  connection.connect((err) => {
    if (err) throw err;
    console.log(`Welcome to the Employee Tracker!`);
    start();
  });
