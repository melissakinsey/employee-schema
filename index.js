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

const mysql = require("mySQL");

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
  var query = connection.query("SELECT * FROM employees", function(err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].first_name + res[i].last_name + " | " + res[i].role_id + " | " + res[i].manager_id);
    }
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
