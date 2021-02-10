// Require .env
require("dotenv").config();

// Require console.table
const cTable = require("console.table");

// Require mySQL
const mysql = require("mysql");

// Require inquirer
const inquirer = require("inquirer");

// Use createConnection() method to join node.js to mySQL
const db = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: process.env.PASSWORD,
  database: "employee-schema",
});

// Connect to db. Include a callback function to throw error if the database can't connect.
db.connect(function(err) {
  if (err) {
    return console.error("error: " + err.message);
  }
  console.log("Connected to the Tube City employee database!");
  runSearch()
});

function runSearch() {
  inquirer
  .prompt({
    name: "action",
    type: "rawlist",
    message: "What would you like to do?",
    choices: ["Add a department", "Add a role", "Add an employee", "View a department", "View a role", "View an employee", "Update an employee's role", "I'm finished"],
  })
  .then(function (response) {
    // console.log(response)
    switch (response.action) {
      case "Add a department":
      addDepartment();
      break;
      case "Add a role":
      addRole();
      break;
      case "Add an employee":
      addEmployee();
      break;
      
      case "View a department":
      viewDepartment();
      break;
      case "View a role":
      viewRole();
      break;
      case "View an employee":
      viewEmployee();
      break;
      
      case "Update an employee's role":
      updateRole();
      break;
      
      case "exit":
      db.end();
      break;
    }
  }
  )
}

function addDepartment() {
  inquirer
  .prompt({
    name: "addDepartment",
    type: "input",
    message: "What is the new department name?"
  })
  .then(function (response) {
    console.log(response.addDepartment);
    db.query("INSERT INTO department SET ?",
    {
      name: response.addDepartment
    }, function (err, res) {
      if (err) throw err;
      console.table(res);
      console.log("The department has been added. For further confirmation, please see the 'department' table in mySQL. \(Don't forget to click the blue refresh button.\)");
      runSearch()
    })
  }); 
}

function addRole() {
  inquirer
  .prompt({
    name: "addRole",
    type: "input",
    message: "Which role would you like to add? Please enter the new title as you'd like it to appear in the Tube City HR database."
  })
  .then(function (response) {
    console.log(response.addRole);
    db.query("INSERT INTO role SET ?",
    {
      title: response.addRole
    }, function (err, res) {
      if (err) throw err;
      console.table(res);
      console.log("The role has been added.");
      runSearch()
    })
  }); 
}

// function addEmployee() {
//   inquirer
//   .prompt({
//     type: "input",
//     message: "What is the employee's first name?",
//     name: "first_name",
//   },
//   {
//     type: "input",
//     message: "What is the employee's last name?",
//     name: "last_name",
//   },
//     {
//       type: "input",
//       message: "What is the employee's role ID? Choose an ID number between 1 and 8",
//       name: "role_id",
//     }
//   )
//   .then(function (response) {
//     console.log(response.addEmployee);
//     db.query("INSERT INTO employee SET ?",
//     {
//       ({ first_name, res.last_name, })
//     }, function (err, res) {
//       if (err) throw err;
//       console.table(res);
//       console.log("The employee has been added. For further confirmation, please see the 'employee' table in mySQL. \(Don't forget to click the blue refresh button.\)");
//         runSearch()
//     })
//   }); 
// }

function viewDepartment() {
  inquirer
  .prompt({
    name: "viewDepartment",
    type: "input",
    message: "Which department would you like to view?"
  })
  .then(function (response) {
    console.log(response.viewDepartment);
    db.query("SELECT * FROM department WHERE ?", [{
      name: response.viewDepartment,
    }],
    function (err, res) {
      if (err) throw err;
      console.table(res);
      runSearch()
    });
  })
}

function viewRole() {
  inquirer
  .prompt({
    name: "viewRole",
    type: "input",
    message: "Which role would you like to see?"
  })
  .then(function (response) {
    console.log(response.viewRole);
    db.query("SELECT * FROM role WHERE ?", [{
      title: response.viewRole,
    }],
    function (err, res) {
      if (err) throw err;
      console.table(res);
      runSearch();
    });
  })
}

function viewEmployee() {
  inquirer
  .prompt({
    name: "viewEmployee",
    type: "input",
    message: "Search by entering the employee's last name."
  })
  .then(function (response) {
    console.log(response.viewEmployee);
    db.query("SELECT * FROM employee WHERE ?", [{
      last_name: response.viewEmployee,
    }],
    function (err, res) {
      if (err) throw err;
      console.table(res);
      runSearch()
    });
  })
}

function updateRole() {
  let data = {}
  inquirer
  .prompt({
    name: "id",
    type: "input",
    message: "Which role ID would you like to update? Choose a role ID between 51 and 58."
  })
  .then(function (response) {
    data.id = response.id
    inquirer.prompt({
      name: "newTitle",
      type: "input",
      message: "What is the new title associated with this role ID?"
    })
    .then(function (response) {
      db.query("UPDATE role SET title = ? WHERE id = ?", [response.newTitle, Number(data.id)],
      function (err, res) {
        if (err) throw err;
        console.table(res)
        .then(console.log("The title has been updated. For further confirmation, please see the 'roles' table in mySQL. \(Don't forget to click the blue refresh button.\)"));
        runSearch()
      });
    })
  })
}
 
// Close connection cleanly
function quit() {
  db.end(function (err) {
    if (err) {
      return console.log("error:" + err.message);
    }
    console.log("Close the database connection.");
  }
  )
}