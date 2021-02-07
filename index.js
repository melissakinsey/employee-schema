// Require .env
require("dotenv").config()

// Require console.table
const cTable = require("console.table");

// Require mySQL
const mysql = require("mysql");

// Require inquirer
const inquirer = require("inquirer");

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
  var query = db.query("DROP TABLE employees.dept_emp_latest_date", function(err, res) {
    if (err) throw err;
      console.table(res);
  });

  // Log the actual query being run
  console.log(query.sql);
  connection.end();
}

// Throw error if connection fails
db.connect(function (err) {
    if (err) {
        return console.error("error: " + err.message);
    }
    console.log("Connected to the Tube City employee database!");
});

// Close connection cleanly
db.end(function(err) {
  if (err) {
    return console.log("error:" + err.message);
  }
  console.log("Close the database connection.");
});

inquirer
  .prompt([
    {
      type: "list",
      cTable: "role",
      message: "What would you like to do?",
      choices: ["Add", "View", "Update", "Delete", "I'm finished"],
    },
  ]);

prompt.then(response => {
// console.log(response)
if (response.role === "add") {
addPrompt()
}
else if (response.role === "view") {
viewPrompt()
}
else if (response.role === "update") {
updatePrompt()
}
else if (response.role === "delete") {
  deletePrompt()
  }
else {
// console.log("I"m finished.")
//invoke html generator function
generateHTML(team)
}
},
)
init()