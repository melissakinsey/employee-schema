// Require .env
require("dotenv").config();

// Require console.table
const cTable = require("console.table");

console.table([{name:'John',age:32},{name:'John2',age:42}])

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

// function addDepartment() {
//   inquirer
//     .prompt({
//       name: "id",
//       type: "input",
//       message: "What is the new department ID?"
//     })
//     .then(function (response) {
//       console.log(response.addDepartment);
//       db.query("INSERT INTO department(id)"); 
//     })
//   
// }

function viewDepartment() {
  inquirer
  .prompt({
    name: "viewDepartment",
    type: "input",
    message: "What is the new department ID?"
  })
  .then(function (response) {
    console.log(response.viewDepartment);
    db.query("SELECT * FROM department WHERE ?", [{
      id: response.viewDepartment,
    }],
    function (err, res) {
      if (err) throw err;
      console.table(res);
    }); 
  })
}

function updateRole() {
  let data={}
  inquirer
  .prompt({
    name: "id",
    type: "input",
    message: "Which role ID would you like to update? Choose 51 through 58."
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



// // Log the actual query being run
// console.log(query.sql);
// connection.end();


//   else if (response.role === "view") {
//     viewPrompt()
//   }
//   else if (response.role === "update") {
//     updatePrompt()
//   }
//   else if (response.role === "delete") {
//     deletePrompt()
//   }
//   else {
//     // console.log("I"m finished.")
//     //invoke html generator function
//     generateHTML(team)
//   }
// },
// )
// init()
// 




// Close connection cleanly
function quit(){db.end(function(err) {
  if (err) {
    return console.log("error:" + err.message);
  }
  console.log("Close the database connection.");
});
}