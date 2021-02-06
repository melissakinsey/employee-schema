// Require node.js and mySQL

// const express = require("express");

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

db.connect(function (err) {
    if (err) {
        return console.error("error: " + err.message);
    }
    console.log("Connected to the Tube City employee database!");
});

// const app = express();

app.get("/createdb", (req, res) => {

    // let sql = "CREATE DATABASE nodemysql";
  
    db.query(sql, (err) => {
      if (err) {
        throw err;
      }
      res.send("Tube City employee database created");
    });
  });

// const MySQL = require("MySQL")
// function queryEmployees(query, config) {
//   // Create new MySQL connection using credentials from cypress.json env's
//   const connection = MySQL.createConnection(config.env.db)
//   // Connect to db
//   connection.connect()
//   // Execute query and disconnect to db as a promise
//   return new Promise((resolve, reject) => {
//    connection.query(query, (error, results) => {
//       if (error) reject(error)
//       else {
//         connection.end()
//         // console.log(results)
//         return resolve(results)
//       }
//     })
//   })
// }
// 
// module.exports = (on, config) => {
//   // Usage: cy.task("queryDb", query)
//   on("task", {
//     queryDb : query =>  {
//       return queryEmployees(query, config)
//     },
//   })
// }
