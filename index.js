require('dotenv').config()

var inquirer = require("inquirer");

// Require console.table
const cTable = require("console.table");
// Object {getTable: function()}
// console.table([
//   {
//     name: "foo",
//     age: 10
//   }, {
//     name: "bar",
//     age: 20
//   }
// ]);

// Require mySQL

const mysql = require("mysql");

// Use createConnection() method to join node.js to mySQL

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "#MySQL555",
    database: "employees",
});

// Use node.js to connect to employees test_db. Include a callback function to throw error if the database can't connect.
// Install mySQL Connector/Node.js to upgrade authentication protocol: https://dev.mysql.com/doc/dev/connector-nodejs/8.0/

function getEmployees() {
  var query = db.query("SELECT employees.name,employees.age FROM employees", function(err, res) {
    if (err) throw err;
      console.table(res);
    
  });

  // logs the actual query being run
  console.log(query.sql);
  connection.end();
}


db.connect(function (err) {
    if (err) {
        return console.error("error: " + err.message);
    }
    console.log("Connected to the Tube City employee database!");
});

connection.end(function(err) {
  if (err) {
    return console.log("error:" + err.message);
  }
  console.log("Close the database connection.");
});

inquirer
  .prompt([
    /* Pass your questions in here */
  ])
  .then(answers => {
    // Use user feedback for... whatever!!
  })
  .catch(error => {
    if(error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else when wrong
    }
  });